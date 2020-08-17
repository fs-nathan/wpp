import React from 'react';
import "./styles.scss";
import * as icon from "assets";
import {Box, Button} from "@material-ui/core";
import {useTranslation} from "react-i18next";

function ErrorPage({}) {
    const {t} = useTranslation();

    return (
        <Box className={"ErrorPage_Container"}>
            <img src={icon.ic_404} alt={"Error 404 code"} className={"ErrorPage_Icon"}/>
            <div className={"ErrorPage_Content"}>
                <p className={"ErrorPage_Content_Main"}>{t("IDS_WP_ERROR_PAGE_404_MSG")}</p>
                <p className={"ErrorPage_Content_SubContent"}>
                    {t("IDS_WP_ERROR_PAGE_404_MSG1")}
                    <br/>
                    {t("IDS_WP_ERROR_PAGE_404_MSG2")} <a href={"https://workplus.vn/lien-he/"} target={"_blank"}>{t("IDS_WP_ERROR_PAGE_404_SUPPORT_CENTER")}</a> Workplus.
                    <br/>
                    {t("IDS_WP_ERROR_PAGE_404_THANKS")}
                </p>
                <Button
                    variant="outlined"
                    className={"ErrorPage_ActionBtn"}
                    onClick={() => window.history.back()}
                >
                    {t("IDS_WP_LABEL_BACK_TO_PREVIOUS_PAGE")}
                </Button>
            </div>
        </Box>
    );
}

export default ErrorPage;