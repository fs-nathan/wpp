import React from 'react';
import styled from 'styled-components';
import { Avatar, IconButton, Dialog, withStyles, Typography, ListItemText, ListItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import avatar from '../../assets/avatar.jpg'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { mdiDownload, mdiShare, mdiInformation, mdiChevronLeftCircle, mdiChevronRightCircle } from '@mdi/js';
import Icon from '@mdi/react'
import ImageTest from '../../assets/imageChatTest.jpg'
const styles = theme => ({
    closeButton: {
        color: theme.palette.grey[500],
    },
});
const GroupTitle = styled(MuiDialogTitle)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #000;
    align-items: center;
    padding: 5px 15px;
`
const TitleImg = styled(Typography)`
    & > li {
        padding: 10px 10px 10px 0;
        & > div:nth-child(1) {
            margin-right: 7px;
        }
        & > div:nth-child(2) {
            & > div:nth-child(1) {
                color: white;
                font-size: 15px
            }
            & > div:nth-child(2) {
                color: white;
                font-size: 13px
            }
        }
    }
`
const GroupActionButton = styled(Typography)`
    display : flex;
    margin-left: -150px;
`
const ButtonAction = styled(Typography)`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    &&:not(:last-child) {
        margin-right: 20px;
    }
    & > *:first-child {
        margin-bottom: 3px;
    }
    & > *:last-child {
        text-transform: uppercase;
        font-size: 12px;
        color: #fff;
        font-weight: 200;
    }
`

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <GroupTitle disableTypography {...other}>
            <Typography component={'div'}>
                <TitleImg component='div'>
                    <ListItem>
                        <Avatar src={avatar} />
                        <ListItemText
                            style={{ margin: 0 }}
                            primary={
                                <Typography component='div'>
                                    Thiết kế giao diện Website
                                </Typography>
                            }
                            secondary={
                                <Typography component='div'>
                                    Nguyễn Thu Huyền - 09:12 20/12/2019
                                </Typography>
                            }
                        />
                    </ListItem>
                </TitleImg>
            </Typography>
            <GroupActionButton component='div'>
                <ButtonAction component='div'>
                    <Icon path={mdiDownload} size={1} color={'#fff'} />
                    <Typography component='div'>Tải xuống</Typography>
                </ButtonAction>
                <ButtonAction component='div'>
                    <Icon path={mdiShare} size={1} color={'#fff'} />
                    <Typography component='div'>Chia sẻ</Typography>
                </ButtonAction>
                <ButtonAction component='div'>
                    <Icon path={mdiInformation} size={1} color={'#fff'} />
                    <Typography component='div'>Chi tiết</Typography>
                </ButtonAction>
            </GroupActionButton>
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
            </IconButton>
        </GroupTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);
const StyledDialog = styled(Dialog)`
    & > div > div {    
        background: transparent;
    }
`
const ContentDialog = styled(DialogContent)`
    overflow: hidden;
    background: #161616c9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > img {
        max-height: 700px;
        max-width: 1300px;
        opacity: 1;
    }
`
const ButtonImage = styled(IconButton)`
    padding: 0;
    & > span > svg {
        width: 6.5rem !important;
        height: 6.5rem !important;
        &:hover {
            fill: #ccc;
          }
    }
`

const ModalImage = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
    return (
        // {/* Modal chinh sua cong viec con */}
        <StyledDialog
            aria-labelledby="customized-dialog-title"
            open={props.isOpen}
            fullScreen={fullScreen}
        >
            <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
            </DialogTitle>
            <ContentDialog dividers>
                <ButtonImage>
                    <Icon path={mdiChevronLeftCircle} size={5} />
                </ButtonImage>
                <img alt="vtask" src={ImageTest} />
                <ButtonImage>
                    <Icon path={mdiChevronRightCircle} size={5} />
                </ButtonImage>
            </ContentDialog>
            <DialogActions>

            </DialogActions>
        </StyledDialog>
    )
}

export default ModalImage;