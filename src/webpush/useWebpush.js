import { apiService } from "constants/axiosInstance";
import { TOKEN } from "constants/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiKeyModule } from "webpush";

const useWebpush = () => {
  const dispatch = useDispatch();
  const webpushApikey = useSelector(
    apiKeyModule.selectors.web_push_public_key_selector
  );
  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      dispatch(apiKeyModule.actions.loadApiKey());
    }
  }, [dispatch]);
  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    window.apiService = apiService;
    if (token && webpushApikey && webpushApikey !== null) {
      function urlBase64ToUint8Array(base64String) {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
          .replace(/-/g, "+")
          .replace(/_/g, "/");

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
      }
      async function triggerPushNotification() {
        if ("serviceWorker" in navigator) {
          const register = await navigator.serviceWorker
            .register("/sw.js", {
              scope: "/",
            })
            .then(function (swReg) {
              console.log("Service Worker is registered", swReg);
              return swReg;
            })
            .catch(function (error) {
              console.error("Service Worker Error", error);
            });
          let subscription = await register.pushManager.getSubscription();
          if (subscription === null) {
            // Update UI to ask user to register for Push
            console.log("Not subscribed to push service!");

            subscription = await register.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(webpushApikey),
            });
          } else {
            // We have a subscription, update the database
            console.log("Subscription object: ", subscription);
          }
          const config = {
            url: "/web-push/subscription",
            method: "post",
            data: subscription,
          };
          apiService(config).then(() => {
            console.log("subscribed to push service!");
          });
        } else {
          console.error("Service workers are not supported in this browser");
        }
      }
      triggerPushNotification().catch((error) => console.error({ error }));
    }
  }, [webpushApikey]);
};
export default useWebpush;
