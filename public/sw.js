self.addEventListener("push", (event) => {
  const data = event.data.json();
  console.log(JSON.stringify(data, null, "  "));
  self.registration.showNotification(data.title, data);
});
