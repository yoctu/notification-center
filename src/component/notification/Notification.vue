<template>
    <div id="notification-wrapper">
        <div id="notification-button" @click.stop="toggle" :class="cls">
            <div class="notif-button-wrapper">
                <div class="notif-button-icon">
                    <i class="icon-bell"></i>
                </div>
                <div class="notif-button-count" v-if="store.getUnreadCount() > 0">
                    {{ store.getUnreadCount() }}
                </div>
            </div>
        </div>
        <notification-panel v-if="cls === 'opened'"></notification-panel>
    </div>
</template>

<script>
    import NotificationPanel from './NotificationPanel.vue'
    import notificationStore from '../../store/NotificationsStore'

    export default {
        name: 'notification',
        components: {
            NotificationPanel
        },
        data () {
            return {
                store: notificationStore,
                cls: 'closed'
            }
        },
        methods: {
            toggle () {
                return this.cls = this.cls === 'closed' ? 'opened' : 'closed';
            },
        }


    }

</script>

<style>
    @import "./../../assets/css/components/notification.css";
    @import "./../../assets/css/font_custom.css";
</style>
