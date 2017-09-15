class Notification {

    //constructor(id, origin, recipient, event, message, type, createdAt, status, parentNotificationId, contexts, action) {
    constructor(notification) {
        this.id = notification.id;
        this.origin = notification.origin;
        this.recipient = notification.recipient;
        this.event = notification.event;
        this.message = notification.message;
        this.type = notification.type;
        this.created_at = notification.created_at;
        this.status = notification.status;
        this.parentNotificationId = notification.parentNotificationId;
        this.context = notification.contexts;
        this.action = notification.action;
    }
}

export default Notification;
