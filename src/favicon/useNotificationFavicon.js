import { useSelector } from "react-redux";
import favicon from "./favicon.png";
import favicon_0 from "./favicon_0.png";
import favicon_1 from "./favicon_1.png";
import favicon_2 from "./favicon_2.png";
import favicon_3 from "./favicon_3.png";
import favicon_4 from "./favicon_4.png";
import favicon_5 from "./favicon_5.png";
import favicon_5_plus from "./favicon_5_plus.png";
import useDynamicFavicon from "./useDynamicFavicon";
const favicons = [
  favicon_0,
  favicon_1,
  favicon_2,
  favicon_3,
  favicon_4,
  favicon_5,
  favicon_5_plus,
];
const useNotificationFavicon = ({ image = favicon } = {}) => {
  const notificationNumber = useSelector(
    (state) =>
      Number(state.system.numberNotificationNotView || 0) +
      Number(state.system.numberMessageNotView || 0)
  );
  useDynamicFavicon({
    image:
      notificationNumber > 5 ? favicon_5_plus : favicons[notificationNumber],
    number: 0,
  });
};
export default useNotificationFavicon;
