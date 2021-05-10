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
import intro1 from '../../assets/img_introduce_in_detail_1.png';
import intro2 from '../../assets/img_introduce_in_detail_2.png';
import intro3 from '../../assets/img_introduce_in_detail_3.png';
import intro4 from '../../assets/img_introduce_in_detail_4.png';
import { currentColorSelector } from "./selectors";
import NavigatorMenu from "../../components/NavigatorMenu";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

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
        textAlign: "center",
        height: "89px",
        "& > *:first-child": {
            fontSize: "18px",
            fontWeight: 500,
            cursor: "pointer",
            margin: "5px 0",
            color: "#ff5722"
        },
        "& > *:last-child": {
            fontSize: "14px",
            margin: "5px 0"
        }
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

const StyledName = styled.span`
    color: ${props => props.color};
    font-weight: bold;
`

function Introduce() {
    const { t } = useTranslation();
    const tutorialSteps = [
        {
            label: t("TASK_DETAIL_INTRO_LABEL_1"),
            content: t("TASK_DETAIL_INTRO_CONTENT_1"),
            imgPath: intro1
        },
        {
            label: t("TASK_DETAIL_INTRO_LABEL_2"),
            content: t("TASK_DETAIL_INTRO_CONTENT_2"),
            imgPath: intro2
        },
        {
            label: t("TASK_DETAIL_INTRO_LABEL_3"),
            content: t("TASK_DETAIL_INTRO_CONTENT_3"),
            imgPath: intro3
        },
        {
            label: t("TASK_DETAIL_INTRO_LABEL_4"),
            content: t("TASK_DETAIL_INTRO_CONTENT_4"),
            imgPath: intro4
        }
    ];

    const classes = useStyles();
    const theme = useTheme();
    const userName = useSelector(state => state.system.profile.name);
    const groupActiveColor = useSelector(currentColorSelector)

    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;

    const handleStepChange = step => {
        setActiveStep(step);
    };

    return (
        <div className="container-intro">
            <div>
                <Typography>{t('LABEL_CHAT_TASK_LAM_VIEC_ME_LI_CUNG')}
                &nbsp;
                <b>Workplus PC!</b></Typography>
                <div style={{marginBottom: 50}}>
                    <NavigatorMenu />
                </div>
                <Typography>{t('LABEL_CHAT_TASK_HI')}
                &nbsp;
                <StyledName color={groupActiveColor}>{userName}</StyledName>
                    &nbsp; {t('LABEL_CHAT_TASK_CHAO_MUNG_BAN_DEN')}
                </Typography>
                <div className={classes.root}>
                    <AutoPlaySwipeableViews
                        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {tutorialSteps.map((step, index) => (
                            <div key={step.label}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <img
                                        className={classes.img}
                                        src={step.imgPath}
                                        alt={step.label}
                                    />
                                ) : null}
                            </div>
                        ))}
                    </AutoPlaySwipeableViews>
                    <Paper square elevation={0} className={classes.header}>
                        <Typography>{tutorialSteps[activeStep].label}</Typography>
                        <Typography>{tutorialSteps[activeStep].content}</Typography>
                    </Paper>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        className={classes.root}
                    />
                </div>
            </div>

        </div>
    );
}

export default Introduce;
