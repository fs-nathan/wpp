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

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
    {
        label: "Lập kế hoạch công việc, dự án",
        content: "Khởi tạo công việc, lập kế hoạch dự án, giao việc dễ dàng, nhanh chóng",
        imgPath: intro1
    },
    {
        label: "Chát, thảo luận",
        content: "Bám sát công việc từng giây. Tương tác 24/24 không lo hỏng việc",
        imgPath: intro2
    },
    {
        label: "File, tài liệu ?",
        content: "Chia sẻ file, tài liệu dễ dàng bằng cách kéo, thả, chụp màn hình... Chỉnh sửa file trực tuyến.",
        imgPath: intro3
    },
    {
        label: "Trợ lí ảo!",
        content: "Thông báo, cảnh báo, nhắc việc, nhắc hẹn...hãy để VTask lo",
        imgPath: intro4
    }
];

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

const StyledName = styled.span`
    color: ${props => props.color};
    font-weight: bold;
`

function Introduce() {
    const { t } = useTranslation();
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
                <Typography>{t('LABEL_CHAT_TASK_LAM_VIEC_ME_LI_CUNG')}<b>Workplus PC!</b></Typography>
                <Typography>{t('LABEL_CHAT_TASK_HI')}
                &nbsp;
                <StyledName color={groupActiveColor}>{userName}</StyledName>
                    {t('LABEL_CHAT_TASK_CHAO_MUNG_BAN_DEN')}
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
                        <Typography >{tutorialSteps[activeStep].label}</Typography>
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
