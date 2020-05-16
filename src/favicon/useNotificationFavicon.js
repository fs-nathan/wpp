import { useSelector } from "react-redux";
import favicon from "./favicon.png";
import useDynamicFavicon from "./useDynamicFavicon";
const useNotificationFavicon = ({ image = favicon } = {}) => {
  const notificationNumber = useSelector((state) =>
    Number(state.system.numberNotificationNotView || 0)
  );
  useDynamicFavicon({
    image,
    number: notificationNumber > 5 ? "+5" : notificationNumber,
  });
};
export default useNotificationFavicon;
