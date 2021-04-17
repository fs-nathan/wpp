import React from "react";
import { useTranslation } from "react-i18next";
import * as images from "../../assets";
import {
  Redirect,
  Route,
  Switch,
  useHistory
} from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import "./MainAccount.scss";
import { Routes } from "constants/routes";
import loadable from "@loadable/component";
import ValidateNoLogin from "components/ValidateNoLogin/ValidateNoLogin";

const MainAccount = (props) => {
  const { t } = useTranslation();
  const LoginPage = loadable(() => import("../../views/AccountPage/LoginPage"), {
    fallback: <div />,
  });
  const RegisterPage = loadable(
    () => import("../../views/AccountPage/RegisterPage"),
    {
      fallback: <div />,
    }
  );
  const ForgotPasswordPage = loadable(
    () => import("../../views/AccountPage/ForgotPassword"),
    {
      fallback: <div />,
    }
  );
  return (
    <div className="MainAccount-background">
      <div className="MainAccount">
        <div className="left-content">
          <img className="bg-login" alt="" src={images.bg_login} />
        </div>
        <div className="right-content">
          <Scrollbars autoHide autoHideTimeout={500}>
            <div className="inner-right-content">
              <div className="main-account-container">
                  <Switch>
                    <Route
                      path={Routes.LOGIN}
                      component={() => (
                        <ValidateNoLogin fallback={<Redirect to={Routes.HOME} />}>
                          <LoginPage />
                        </ValidateNoLogin>
                      )}
                    />
                    <Route path={Routes.REGISTER} component={() => (
                        <ValidateNoLogin fallback={<Redirect to={Routes.HOME} />}>
                          <RegisterPage />
                        </ValidateNoLogin>
                    )} />
                    <Route path={Routes.FORGOT_PASSWORD} component={ForgotPasswordPage} />
                  </Switch>
              </div>
              <div className="bottom-content">
                <a
                  target="_blank"
                  href="https://resources.workplus.vn/"
                  className="link-item"
                >
                  {t("IDS_WP_HOME")}
                </a>
                <a
                  target="_blank"
                  href="https://workplus.vn/dieu-khoan-va-thoa-thuan-su-dung-workplus/"
                  className="link-item"
                >
                  {t("IDS_WP_TERM")}
                </a>
                <a
                  target="_blank"
                  href="https://support.workplus.vn/tai-lieu-huong-dan/"
                  className="link-item"
                >
                  {t("IDS_WP_DOCUMENT")}
                </a>
                <a
                  target="_blank"
                  href="https://workplus.vn/lien-he/"
                  className="link-item"
                >
                  {t("IDS_WP_CONTACT")}
                </a>
              </div>
            </div>
          </Scrollbars>
        </div>
      </div>
    </div>
  );
};

export default MainAccount;
