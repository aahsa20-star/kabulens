self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title ?? "Kabu Lens";
  const options = {
    body: data.body ?? "",
    icon: "/android-chrome-192x192.png",
    badge: "/android-chrome-192x192.png",
    data: { url: data.url ?? "https://kabulens.jp" },
    tag: data.tag ?? "kabu-lens",
    renotify: true,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url ?? "https://kabulens.jp";
  event.waitUntil(clients.openWindow(url));
});
