import { useTranslation } from 'react-i18next';
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useSelector } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import styled from 'styled-components';
import intro from '../../assets/ic_messeger_intro.png';
import { currentColorSelector } from "./selectors";
import CreateGroupChat from './CreateGroupChat'

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 400,
        flexGrow: 1,
        justifyContent: "center",
        background: "none",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center"
    },
    img: {
        height: 280,
        display: "block",
        maxWidth: 400,
        overflow: "hidden",
        width: "100%",
        minWidth: 400,
    }
}));

function Introduce() {
    const { t } = useTranslation();
    const classes = useStyles();
    const theme = useTheme();
    const groupActiveColor = useSelector(currentColorSelector)
    const [isOpenCreateGroupChat, setOpenCreateGroupChat] = React.useState(false)

    function openCreateGroupChat(stateOpen = false) {
        setOpenCreateGroupChat(stateOpen)
      }

    return (
        <div className="container-intro">
            <div>
                <div className={classes.root}>
                    <img
                        className={classes.img}
                        src={intro}
                        alt={t("TITLE_INTRO_MESSENGER")}
                    />
                    <Paper square elevation={0} className={classes.header}>
                        <div className="title-intro-messenger" style={{color: groupActiveColor}}>{t("TITLE_INTRO_MESSENGER")}</div>
                        <div className="description-intro-messenger">{t("DESCRIPTION_INTRO_MESSENGER")}</div>
                        <button className="btn-create-group-intro-messenger" style={{background: groupActiveColor}} onClick={() => openCreateGroupChat(true)}>{t("THREAD_CHAT_CREATE_GROUP_CHAT")}</button>
                    </Paper>
                </div>
            </div>
            <CreateGroupChat
                isOpen={isOpenCreateGroupChat}
                setOpen={openCreateGroupChat}
            />
        </div>
    );
}

export default Introduce;
