import React from 'react';
import styled from 'styled-components';
import { Avatar, IconButton, Dialog, withStyles, Typography, ListItemText, ListItem, GridListTile } from '@material-ui/core';
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
// import { WrapperContext } from './index'
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
    padding: 10px 15px;
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
        margin: 0
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
    padding: 7px 0 0 0;
    & > div:nth-child(2) {
        height: 750px;
        width: 1100px;
        background-repeat: no-repeat;
        background-size: cover;
        & > img {
            opacity: 1;
            width: 100%;
            height: 100%;
        }
    }
`

const WrapperImage = styled(GridListTile)`
    height: 80px
`
const FooterDialog = styled(DialogActions)`
    padding : 0;
    background: #161616c9;
    display: flex;
    justify-content: center;
    padding: 5px 0 5px 0;
    & > div {
        display: flex;
        background: #00000091;
        padding: 3px;
        border-radius: 2px;
        width: 1200px;
        z-index: 999;
        overflow-x: scroll;
        ::-webkit-scrollbar {
            display: none;
        }
        & > * {
            list-style-type: none;
            margin: 2px 3px;
        }
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
// const MediaImage = styled.div`
//   width: auto !important;
//   height: auto !important;
// `
// const WrapImage = styled.div`
//   display: flex;
//   flex-wrap: wrap;
// `
// const ImageMedia = styled(GridListTile)`
//   margin-right: 7px;
// `
const Image = styled.img`
  height: 80px;
  width: 80px;
  margin: 0;
  padding: 0;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.7
  }
`
const ModalImage = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
    // const value = React.useContext(WrapperContext);
    // let data = []
    // if (value && value.image) {
    //     data = value.image
    // }
    return (
        // {/* Modal chinh sua cong viec con */}
        <StyledDialog
            aria-labelledby="customized-dialog-title"
            open={props.isOpen}
            fullScreen={fullScreen}
        >
            <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
            </DialogTitle>
            <ContentDialog>
                <ButtonImage>
                    <Icon path={mdiChevronLeftCircle} size={5} />
                </ButtonImage>
                <div>
                    <img alt="vtask" src={ImageTest} />
                </div>
                <ButtonImage>
                    <Icon path={mdiChevronRightCircle} size={5} />
                </ButtonImage>
            </ContentDialog>
            <FooterDialog>
                {/* footer image */}
                {/* <GridList cellHeight={60} cols={5} style={{ display: "inline-block" }}>
                    {/* {data.images.map((image, key) => { 
                        return (
                            <MediaImage>
                                {/* <GridListTile cols={5}>
                                    <SubHeader component='div'>{image.date_create}</SubHeader>
                                </GridListTile>
                                <WrapImage>
                                    {image.images.map((item, idx) => {
                                        return (
                                            <ImageMedia key={idx}>
                                                <Image src={item.url} alt='avatar' />
                                            </ImageMedia>
                                        )
                                    })}
                                </WrapImage>
                            </MediaImage>
                        );
                    })} 
                </GridList> */}
                {/* end footer image */}
                <div>
                    {Array.from({ length: 17 }).map((_, index) => {
                        return (
                            <WrapperImage key={`1-${index}`
                            }>
                                <Image src={avatar} alt='avatar' />
                            </WrapperImage>
                        );
                    })}
                </div>
            </FooterDialog >
        </StyledDialog >
    )
}

export default ModalImage;