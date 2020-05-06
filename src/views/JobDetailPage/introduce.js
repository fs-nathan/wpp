import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useSelector } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import intro1 from '../../assets/img_introduce_in_detail_1.png';
import intro2 from '../../assets/img_introduce_in_detail_2.png';
import intro3 from '../../assets/img_introduce_in_detail_3.png';
import intro4 from '../../assets/img_introduce_in_detail_4.png';

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

function Introduce() {
    const classes = useStyles();
    const theme = useTheme();
    const userName = useSelector(state => state.system.profile.name);

    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;
    const handleStepChange = step => {
        setActiveStep(step);
    };

    return (
        <div className="container-intro">
            <div>
                <Typography>Làm việc mê li cùng <b>VTask PC!</b></Typography>
                <Typography>Hi <b>{userName}</b>, chào mừng bạn đến với VTask. Hãy tạo mới những công việc, chia sẻ và thảo luận cùng đồng nghiệp để hoàn thành chúng tốt nhất.</Typography>
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
