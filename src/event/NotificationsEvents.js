class NotificationsEvents {

    constructor () {
        this.events = {};
    }

    addEvent (name, callback) {
        this.events[name] = callback;
    }

    triggerEvent (caller, data) {
        if (this.events[caller]) {
            this.events[caller](data)
        }
    }
}

export default new NotificationsEvents();
