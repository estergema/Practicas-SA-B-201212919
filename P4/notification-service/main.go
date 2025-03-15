package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

// Notification represents a notification to be sent
type Notification struct {
	ID        string    `json:"id"`
	UserID    string    `json:"userId"`
	Type      string    `json:"type"` // email, sms
	Message   string    `json:"message"`
	Status    string    `json:"status"` // pending, sent, failed
	CreatedAt time.Time `json:"createdAt"`
	SentAt    time.Time `json:"sentAt,omitempty"`
}

// In-memory database for demonstration
var notifications []Notification

func main() {
	// Initialize with some sample data
	notifications = []Notification{
		{
			ID:        "1",
			UserID:    "1",
			Type:      "email",
			Message:   "Your order #1 has been shipped!",
			Status:    "sent",
			CreatedAt: time.Now().Add(-24 * time.Hour),
			SentAt:    time.Now().Add(-24 * time.Hour),
		},
		{
			ID:        "2",
			UserID:    "2",
			Type:      "email",
			Message:   "Your order #2 is being processed.",
			Status:    "sent",
			CreatedAt: time.Now().Add(-12 * time.Hour),
			SentAt:    time.Now().Add(-12 * time.Hour),
		},
	}

	// Define routes
	http.HandleFunc("/check", healthCheckHandler)
	http.HandleFunc("/notifications", getNotificationsHandler)
	http.HandleFunc("/notifications/send", sendNotificationHandler)
	http.HandleFunc("/users/", getUserNotificationsHandler)

	// Start server
	port := 4004
	fmt.Printf("Notification service running at http://localhost:%d\n", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}

// Health check endpoint
func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	response := map[string]string{
		"status":  "ok",
		"service": "notifications",
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// Get all notifications
func getNotificationsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(notifications)
}

// Send a new notification
func sendNotificationHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var notificationRequest struct {
		UserID  string `json:"userId"`
		Type    string `json:"type"`
		Message string `json:"message"`
	}

	if err := json.NewDecoder(r.Body).Decode(&notificationRequest); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if notificationRequest.UserID == "" || notificationRequest.Message == "" {
		http.Error(w, "Missing required fields", http.StatusBadRequest)
		return
	}

	if notificationRequest.Type != "email" && notificationRequest.Type != "sms" {
		notificationRequest.Type = "email" // Default to email
	}

	// Create new notification
	newNotification := Notification{
		ID:        fmt.Sprintf("%d", len(notifications)+1),
		UserID:    notificationRequest.UserID,
		Type:      notificationRequest.Type,
		Message:   notificationRequest.Message,
		Status:    "sent", // In a real system, this would be "pending" until actually sent
		CreatedAt: time.Now(),
		SentAt:    time.Now(), // In a real system, this would be set after sending
	}

	notifications = append(notifications, newNotification)

	// In a real system, we would actually send the notification here
	fmt.Printf("Sending %s notification to user %s: %s\n", 
		newNotification.Type, newNotification.UserID, newNotification.Message)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newNotification)
}


