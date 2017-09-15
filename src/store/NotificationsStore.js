import Notification from './../component/notification/class/Notification'
import NotificationsEvents from './../event/NotificationsEvents'
import WsClient from '@objective-js/ws-client/dist/WsClient'
var moment = require('moment');

class NotificationsStore {

    constructor () {
        this.notifications = [];
        this.unreadNotifications = 0;
        this.notificationsEvents = NotificationsEvents;
        this.identity = null;
        this.socket = null;
        this.wsUrl = null;
        this.identifyParams = null;
    }

    init()
    {
        this.socket = new WsClient(this.wsUrl);
        this.initListeners();
    }

    formatDate (notification) {
        let dateTime = new Date(notification.created_at);
        notification.created_at = moment(dateTime).format('YYYY-MM-DD HH:mm');

        return notification;
    }

    addNotification (notification, begin) {
        notification = this.formatDate(notification);

        (begin === true) ?
            this.notifications.push(notification) :
            this.notifications.unshift(notification);

        this.notificationsEvents.triggerEvent('addNotification', notification);
        if (notification.status === 0) {
            this.unreadNotifications++;
        }
    }

    updateNotification (notification) {
        let id = notification.id;
        let index = this.findWithId(id);
        if (!index) {
            return;
        }
        let oldNotification = this.notifications[index];

        notification = this.formatDate(notification);

        this.notifications[index] = notification;
        // changement de status
        if (notification.status >= 2) {
            this.removeFromNotifications(index);
        }

        if (oldNotification.status === 0 && notification.status > 0) {
            this.unreadNotifications--;
        }
    }

    setNotifications (notifications) {
        this.notifications = notifications;
    }

    getNumberNotifications () {
        return this.notifications.length;
    }

    getUnreadCount () {
        return this.unreadNotifications;
    }

    removeFromNotifications (index) {
        let notification = this.notifications[index];
        if (!notification) {
            return;
        }
        this.notificationsEvents.triggerEvent('removeNotification', notification);
        let id = notification.id;
        if (!notification) {
            return;
        }
        this.notifications.splice(index, 1);
        if (notification.status === 0) {
            this.unreadNotifications--;
        }
        this.socket.emit('acknowledgeNotification', {'recipient':this.identity, 'id' : id});
    }

    findWithId (id) {
        for (let index in this.notifications) {
            if (parseInt(this.notifications[index].id) === parseInt(id)) {
                return index;
            }
        }
    }

    removeFromNotificationWithId (id) {
        let index = this.findWithId(id);
        if (index !== false) {
            this.removeFromNotifications(index);
        }

    }

    removeAllNotifications () {
        if (confirm("Are you sure to mark as acknowledge all notifications ?")) {
            this.unreadNotifications = 0;
            this.notificationsEvents.triggerEvent('removeAllNotifications', this.notifications);
            this.notifications.splice(0, this.getNumberNotifications());

            this.socket.emit('acknowledgeAllNotifications', {'recipient':this.identity});

        }
    }

    readNotification (index, status) {
        if (status !== 0) {
            return;
        }
        let id = this.notifications[index].id;
        this.notifications[index].status = 1;
        this.unreadNotifications--;

        this.notificationsEvents.triggerEvent('readNotification', this.notifications[index]);
        this.socket.emit('readNotification', {'recipient': this.identity, 'id' : id});
    }

    initListeners () {

        document.addEventListener('click', function(event) {
            let specifiedElement = document.getElementById('notification');
            let specifiedElement2 = document.getElementById('notification-button');
            if (!specifiedElement) {
                return;
            }
            let isClickInside = specifiedElement.contains(event.target);

            if (!isClickInside) {
                specifiedElement2.click();
            }
        });

        window.addEventListener("focus", () => {
            this.socket.current(this.identity);
        });

        this.socket.on('open', () => {
            this.socket.identify(this.identifyParams);
        });

        this.socket.on('identified', (data) => {
            this.identity = data.identity;
            this.socket.current(this.identity);
            this.socket.emit('getNotifications', {'recipient':data.identity})
        })


        this.socket.on("acknowledge", (data) => {
            let id = data.message;
            this.removeFromNotificationWithId(id);
        });

        this.socket.on('close', () => {

        });

        this.socket.on('getNotifications', (data) => {
            let notifications = data.message;
            this.loadNotifications(notifications)
        });

        this.socket.on('newNotification', (data) => {
            let notification = data.message;
            this.notificationsEvents.triggerEvent('newNotification', notification);
            this.addNotification(notification);
        });

        this.socket.on('updateNotification', (data) => {
            let notification = data.message;
            this.notificationsEvents.triggerEvent('updateNotification', notification);
            this.updateNotification(notification);
        });
    }

    loadNotifications (data) {

        for(let i in data) {
            let notification = data[i];
            this.addNotification(notification);
        }

        this.notificationsEvents.triggerEvent('loadNotifications', data);
    }

    setWebSocketUrl(wsUrl)
    {
        this.wsUrl = wsUrl;
    }

    setIdentifyParams(identifier, context = {})
    {
        this.identifyParams = {
            identifier,
            context
        };
    }
}

export default new NotificationsStore();
