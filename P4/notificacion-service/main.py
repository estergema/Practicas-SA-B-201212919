from flask import Flask, request, jsonify
from datetime import datetime

app = Flask(__name__)

# Simulación de base de datos en memoria
notifications = [
    {
        "id": "1",
        "userId": "1",
        "type": "email",
        "message": "Your order #1 has been shipped!",
        "status": "sent",
        "createdAt": (datetime.utcnow().timestamp() - 86400),
        "sentAt": (datetime.utcnow().timestamp() - 86400),
    },
    {
        "id": "2",
        "userId": "2",
        "type": "email",
        "message": "Your order #2 is being processed.",
        "status": "sent",
        "createdAt": (datetime.utcnow().timestamp() - 43200),
        "sentAt": (datetime.utcnow().timestamp() - 43200),
    },
]

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "service": "notifications"})

@app.route("/notifications", methods=["GET"])
def get_notifications():
    return jsonify(notifications)

@app.route("/notifications/send", methods=["POST"])
def send_notification():
    data = request.get_json()
    if not data or "userId" not in data or "message" not in data:
        return jsonify({"error": "Missing required fields"}), 400

    notification_type = data.get("type", "email")
    if notification_type not in ["email", "sms"]:
        notification_type = "email"

    new_notification = {
        "id": str(len(notifications) + 1),
        "userId": data["userId"],
        "type": notification_type,
        "message": data["message"],
        "status": "sent",
        "createdAt": datetime.utcnow().timestamp(),
        "sentAt": datetime.utcnow().timestamp(),
    }
    notifications.append(new_notification)

    print(f"Sending {new_notification['type']} notification to user {new_notification['userId']}: {new_notification['message']}")
    return jsonify(new_notification), 201

@app.route("/users/<user_id>/notifications", methods=["GET"])
def get_user_notifications(user_id):
    user_notifications = [n for n in notifications if n["userId"] == user_id]
    return jsonify(user_notifications)

if __name__ == "__main__":
    app.run(port=4004, debug=True)
