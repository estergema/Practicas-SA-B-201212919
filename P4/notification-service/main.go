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

var notifications []Notification

func main() {
	// Initialize with some sample data
	notifications = []Notification{
		{
			ID:        "1",
			UserID:    "1",
			Type:      "email",
			Message:   "Orden enviada!",
			Status:    "sent",
			CreatedAt: time.Now().Add(-24 * time.Hour),
			SentAt:    time.Now().Add(-24 * time.Hour),
		},
		{
			ID:        "2",
			UserID:    "2",
			Type:      "email",
			Message:   "Orden recibida.",
			Status:    "sent",
			CreatedAt: time.Now().Add(-12 * time.Hour),
			SentAt:    time.Now().Add(-12 * time.Hour),
		},
	}

	// Define routes
	http.HandleFunc("/check", healthCheckHandler)
	http.HandleFunc("/notifications", getNotificationsHandler)
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


