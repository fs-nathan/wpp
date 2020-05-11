import { Dialog, GridListTile, IconButton, withStyles } from '@material-ui/core';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import Icon from '@mdi/react';
import { showImagesList } from 'actions/chat/chat';
import { openDocumentDetail } from 'actions/system/system';
import { getFileType } from 'helpers/jobDetail/stringHelper';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ShareDocumentModal from 'views/DocumentPage/TablePart/DocumentComponent/ShareDocumentModal';
import DialogTitleModalImage from './DialogTitleModalImage';
import './styles.scss';

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
        background-repeat: no-repeat;
        background-size: cover;
        overflow: hidden;
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
        border-radius: 10px;
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

const Image = styled.img`
  height: 80px;
  width: 80px;
  margin: 0;
  padding: 0;
  border-radius: 5px;
  cursor: pointer;
  opacity: ${props => props.selected ? 1 : 0.4};
  object-fit: cover;
  &:hover {
    opacity: 1;
  }
`
const ModalImage = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
  const transformRef = useRef();
  const dispatch = useDispatch();
  const isOpenImagesListModal = useSelector(state => state.chat.isOpenImagesListModal);
  const imagesList = useSelector(state => state.chat.imagesList);
  const selectedImage = useSelector(state => state.chat.selectedImage);
  const createUser = useSelector(state => state.chat.createUser);

  const [currentImage, setCurrentImage] = useState(selectedImage);
  const [visible, setVisible] = useState(false);
  const [rotate, setRotate] = useState(0);

  const { name = '', url } = imagesList[currentImage] || {};
  const type = getFileType(name);
  // console.log(type, name)

  function onClickShare() {
    setVisible(true)
  }

  function onClickDetail() {
    dispatch(openDocumentDetail({ ...imagesList[currentImage], type }));
  }

  function onClickRotateLeft() {
    setRotate(rotate - 90)
  }

  function onClickRotateRight() {
    setRotate(rotate + 90)
  }

  function clickNext() {
    if (currentImage < imagesList.length - 1) {
      setCurrentImage(currentImage + 1)
    }
  }

  function clickBack() {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1)
    }
  }

  function handleClose() {
    dispatch(showImagesList(false))
  }

  useEffect(() => {
    setCurrentImage(selectedImage);
  }, [selectedImage]);

  useEffect(() => {
    // console.log('resetTransform', currentImage)
    setRotate(0)
  }, [currentImage]);

  const handleZoomImage = evt => {
    let currentTarget = evt.target;
    // console.log('deltaY', evt.deltaY)
    if (evt.deltaY > 0) {
      if (currentTarget.width < 100 || currentTarget.height < 100) return;
      let newWidth = currentTarget.width - currentTarget.width * 0.1;
      let newHeight = currentTarget.height - currentTarget.height * 0.1;
      evt.target.width = newWidth;
      evt.target.height = newHeight;
      evt.target.style.cursor = 'zoom-out';
      evt.target.style.maxWidth = 'initial';
      evt.target.style.maxHeight = 'initial';
    } else if (evt.deltaY < 0) {
      let newWidth = currentTarget.width + currentTarget.width * 0.1;
      let newHeight = currentTarget.height + currentTarget.height * 0.1;
      evt.target.width = newWidth;
      evt.target.height = newHeight;
      evt.target.style.cursor = 'zoom-in';
      evt.target.style.maxWidth = 'initial';
      evt.target.style.maxHeight = 'initial';
    }
  };

  function onLoadImage(evt) {
    // console.log('onLoadImage', evt.target.offsetHeight)
    // console.log('offsetWidth', evt.target.offsetWidth)
    // console.log(evt.target.naturalWidth, evt.target.naturalHeight);
    const { offsetHeight, offsetWidth } = document.getElementById('ContentDialog-ImageModal');
    const { offsetWidth: offsetWidthButton } = document.getElementById('ContentDialog-buttonLeft');
    const vH = offsetHeight || 0;
    const vW = offsetWidth ? offsetWidth - offsetWidthButton * 2 : 0;
    let elmH = evt.target.naturalHeight || 0;
    let elmW = evt.target.naturalWidth || 0;
    while (elmH >= vH || elmW >= vW) {
      elmH *= 0.9;
      elmW *= 0.9;
    }
    evt.target.height = elmH;
    evt.target.width = elmW;
  }

  return (
    <StyledDialog
      aria-labelledby="customized-dialog-title"
      open={isOpenImagesListModal}
      fullScreen={fullScreen}
    >
      <DialogTitleModalImage id="customized-dialog-title"
        {...createUser}
        image={imagesList[currentImage]}
        onClickShare={onClickShare}
        onClickDetail={onClickDetail}
        onClickRotateLeft={onClickRotateLeft}
        onClickRotateRight={onClickRotateRight}
        onClose={handleClose}>
      </DialogTitleModalImage>
      <ContentDialog id="ContentDialog-ImageModal">
        {
          (type === 'mp4') ?
            <ReactPlayer
              url={url} playing
              height="calc(100vh - 81px)" width="auto"
              controls
              style={{ margin: 'auto', transform: `rotate(${rotate}deg)` }}
            />
            :
            <>
              <ButtonImage onClick={clickBack} id="ContentDialog-buttonLeft">
                <Icon path={mdiChevronLeft} size="30px" />
              </ButtonImage>
              <div id="transformImg">
                <img
                  onWheel={handleZoomImage}
                  onLoad={onLoadImage}
                  ref={transformRef}
                  alt="vtask"
                  style={{ transform: `rotate(${rotate}deg)` }}
                  src={imagesList[currentImage] && imagesList[currentImage].url} />
              </div>
              <ButtonImage onClick={clickNext}>
                <Icon path={mdiChevronRight} size="30px" />
              </ButtonImage>
            </>
        }
      </ContentDialog>
      <FooterDialog>
        <div>
          {
            (type === 'mp4') ? null :
              imagesList.map((image, index) => {
                return (
                  <WrapperImage
                    onClick={() => setCurrentImage(index)}
                    key={`1-${index}`}>
                    <Image src={image.url} alt='avatar' selected={currentImage === index} />
                  </WrapperImage>
                );
              })
          }
        </div>
      </FooterDialog >
      {visible && (
        <ShareDocumentModal
          onClose={() => {
            setVisible(false);
          }}
          item={imagesList[currentImage]}
        />
      )}
    </StyledDialog >
  )
}

export default ModalImage;