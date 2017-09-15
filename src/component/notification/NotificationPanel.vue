<template>
    <div id="notification">
        <div id="notif-header">
            <div id="notif-delete-all" @click.stop="removeAllNotifications">
                <i class="icon-cancel"></i>
            </div>
            <div class="clear"></div>
        </div>
        <ul id="notif-list">
            <li class="notif-item" v-on:mouseover="read(index, notification.status)" v-for="(notification, index) in notifications" :key="notification.id" :class="{'unread' : notification.status === 0}" >
                <!-- :class="{'even': index % 2 === 0, 'odd': index % 2 !== 0 }" -->
                <list-item :notification="notification" :index="index" @remove="remove(index)"  ></list-item>
            </li>
            <li class="notif-item-none" v-if="showEmpty.getNumberNotifications() === 0">
                <i class="icon-block"></i>
            </li>
            <!--<li class="notif-item-loadMore" v-show="!loading && !showEmpty" @click.stop="loadNotifications">
                <i class="icon-down-open"></i>
            </li>-->
            <li class="notif-item-loader" v-show="loading">
                <i class="icon-spin5 animate-spin"></i>
            </li>
        </ul>
    </div>
</template>

<script>
    import Notification from './class/Notification'
    import notificationStore from '../../store/NotificationsStore'
    import listItem from './ListItem.vue'

    export default {
        name: 'notificationPanel',
        data () {
            return {
                loading: false,
                showEmpty: notificationStore,
                notifications : notificationStore.notifications,
            }
        },
        components: {
            listItem
        },
        methods: {
            remove (index) {
                //TODO send ajax query to change something ???
                notificationStore.removeFromNotifications(index);
            },
            removeAllNotifications () {
                notificationStore.removeAllNotifications();
            },
            read (index, status) {
                notificationStore.readNotification(index, status);
            }
        }
    }
</script>

<style>
    @import "./../../assets/css/font_custom.css";
    @import "./../../assets/css/animation.css";
    @import "./../../assets/css/components/notification-panel.css";
</style>
