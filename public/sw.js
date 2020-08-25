// eslint-disable-next-line no-restricted-globals
const global = self;
global.addEventListener("push", (event) => {
  try {
    const data = event.data.json();
    console.log(JSON.stringify(data, null, "  "));
    global.registration.showNotification(data.title, {
      icon: "/logo.png",
      ...data,
    });
  } catch (error) {
    console.log(error);
    global.registration.showNotification("Vtask", {
      icon: "/logo.png",
      body: "You have new notifications !",
    });
  }
});
