import Vue from 'vue'
import vueNotification from '../component/notification/Notification.vue'
import store from '../store/NotificationsStore'
import NotificationsEvents from '../event/NotificationsEvents'


export default class NotificationCenter
{
    constructor(selector, notifyParams, webSocketUrl = '127.0.0.1:8889')
    {
        this.selector = selector;
        store.setWebSocketUrl(webSocketUrl);
        store.setIdentifyParams(notifyParams.identifier, notifyParams.context || {});
    }

    build()
    {
        store.init();

        return new Vue ({
            el: this.selector,
            render: h => h(vueNotification),
            methods: {
                on: function(name, callback) {
                    NotificationsEvents.addEvent(name, callback);
                }
            }
        });
    }
}
