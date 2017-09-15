# Notification Center

Notification Center is a javascript component displaying notifications.

# Installation

You can install this component in any application you want by issuing the following command:

```
composer require fei/notification-center
```

But keep in mind that you need to insert this script in your composer.json. So it can link the assets (js, css, etc...) in the public accessible directory. Vendor should not be accessible publicly by your web server.

```
	{
		"require" : {
			"fei/notification-center": "^1.0.0"
		},
		"scripts": {
          "post-update-cmd": "Fei\\Service\\Notification\\Command\\InstallAssets::postUpdate"
      },
      "extra": {
          "notification-center": {
              "public-path":  "public/assets"
          }
      }
	}
```
## Integration

Notification Center needs a WebSocket server to connect to receive and emit messages.
IP and port are configurable.


An example below :
```
<div id="notifications"></div>
<link href="/assets/notification-center/css/notification-center.min.css" rel="stylesheet">
<script src="/assets/notification-center/js/notification-center.min.js"></script>
<script>
  var nc = new NotificationCenter('#notifications', {
    identifier: 'juan carlos'
  }, '127.0.0.1:8889');
  nc = nc.build();
</script>
```

## Callbacks

You can attach callbacks to different events like this :

```
nb.on('newNotification', function (data) {
  switch (data.event) {
    case 'chat.new':
    // ...
});
```

This callback will be trigger when a new notification is put into the Notification Center
Data is in this case the Notification entity added into the NC.

## Events

Reactivly on external action

| Event    | Triggered              | Data |
|----------|-------------------|----------|
| newNotification       | When a new notification is created         | `Notification`      | 
| addNotification       | When a notification is added into the Notification Center in any way  | `Notification`      |
| updateNotification    | When a notification is updated          | `Notification`      |
| loadNotifications     | After NC initialisation with existing Notification        | `Array of Notifications`      |


With a inside action in NC

| Event    | Triggered              | Data |
|----------|-------------------|----------|
| removeNotification       | When you remove a Notification         | `Notification`      | 
| removeAllNotifications       | When you remove all Notifications         | `Array of Notifications`      |
| readNotification       | When you read a Notification          | `Notification`      |
