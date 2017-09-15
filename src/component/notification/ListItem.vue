<template>
    <div>
        <div class="notif-item-wrapper" v-on:mouseover="read(notification.id)">
            <div class="notif-item-left">
                <div class="notif-item-top">
                    <div class="notif-item-message boxPadding">{{ notification.message }}</div>
                    <div class="notif-item-actions boxPadding" v-if="notification.action.type === 'link'">
                        <a v-show="notification.action.type == 'link'" :href="notification.action.data" target="_blank">{{ notification.action.title }}</a>
                    </div>
                </div>
                <div class="notif-item-center">
                    <div class="notif-item-timestamp boxPadding">{{ notification.created_at }}</div>
                </div>
                <!--<div class="notif-item-bottom">
                    <div class="notif-item-info-boxes">
                        <div v-if="notification.parentNotificationId != 0" class="notif-item-info-box boxPadding">{{ notification.parentNotificationId }}</div>
                        <div v-if="notification.extraData.forwarded != false" class="notif-item-info-box boxPadding">{{ notification.extraData.forwarded }}</div>
                    </div>
                </div>-->
            </div>
            <div class="notif-item-right" @click.stop="remove">
                <div class="notif-item-delete">
                    <i class="icon-cancel"></i>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
    import notificationStore from '../../store/NotificationsStore'

    export default {
        name: 'listItem',
        props: {
            notification: Object
        },
        methods: {
            remove () {
                this.$emit('remove');
            },
            read (id) {
                notificationStore.readNotification(id);
            }
        }
    }
</script>

<style>
    @import "./../../assets/css/components/list-item.css";
</style>
