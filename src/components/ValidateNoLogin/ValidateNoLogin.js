import { TOKEN } from "constants/constants";
const ValidateNoLogin = ({ fallback = null, children }) => {
  const isLogin = localStorage.getItem(TOKEN);
  if (isLogin && isLogin !== null) return fallback;
  return children;
};
export default ValidateNoLogin;
