importScripts("https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js");

const firebaseConfig = {};

if (firebaseConfig.apiKey) {
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
        console.log("[firebase-messaging-sw.js] Received background message ", payload);

        const notificationTitle = payload.notification?.title || payload.data?.title || "New Notification";
        const notificationOptions = {
            body: payload.notification?.body || payload.data?.body,
            icon: payload.notification?.image || "/favicon.png",
            badge: "/favicon.png",
            data: payload.data || {},
            vibrate: [100, 50, 100],
            requireInteraction: false,
        };

        self.registration.showNotification(notificationTitle, notificationOptions);
    });
}

self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    const route = event.notification.data?.route || "/";
    const urlToOpen = new URL(route, self.location.origin).href;

    event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url.includes(self.location.origin) && "focus" in client) {
                    if ("navigate" in client) {
                        return client.navigate(urlToOpen).then(() => client.focus());
                    }
                    return client.focus();
                }
            }

            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
