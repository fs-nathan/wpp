import { TOKEN } from "constants/constants";
const ValidateNoLogin = ({ fallback = null, children }) => {
  const isLogin = localStorage.getItem(TOKEN);
  if (isLogin) return fallback;
  return children;
};
export default ValidateNoLogin;
