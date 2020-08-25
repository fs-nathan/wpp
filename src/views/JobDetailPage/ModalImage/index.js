import { Dialog, GridListTile, IconButton, withStyles } from '@material-ui/core';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import Icon from '@mdi/react';
import { openShareFileModal, showImagesList } from 'actions/chat/chat';
import { getDocumentDetail } from 'actions/documents';
import { openDocumentDetail } from 'actions/system/system';
import { getFileType } from 'helpers/jobDetail/stringHelper';
import React, { useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import DialogTitleModalImage from './DialogTitleModalImage';
import './styles.scss';
import * as fileType from 'assets/fileType';
import { FileType } from 'components/FileType';

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
    background: #3e4041;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    & > div:nth-child(2) {
        background-repeat: no-repeat;
        background-size: cover;
        overflow: hidden;
    }
    & > video:focus {
      outline: none;
    }
`

const WrapperImage = styled(GridListTile)`
    height: 80px
`
const FooterDialog = styled(DialogActions)`
    background: #3e4041;
    display: flex;
    justify-content: center;
    padding: 5px 0 5px 0;
    height: ${props => props.fullHeight ? 0 : '100px'};
`
const ButtonImage = styled(IconButton)`
    background: #353535;
    padding: 10px;
    margin 20px;
    & > span > svg {
        width: 30px !important;
        height: 30px !important;
        color: #ccc;
        &:hover {
          color: #fff;
        }
    }
    &:hover {
      background: #111;
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
  background: #fff;
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
  const [imageInfo, setImageInfo] = useState(createUser);
  const [rotate, setRotate] = useState(0);

  const { name = '', url } = imagesList[currentImage] || {};
  const type = getFileType(name);
  // console.log('imagesList', imagesList)

  function onClickShare() {
    dispatch(openShareFileModal(true, imagesList[currentImage]))
  }

  function onClickDetail() {
    dispatch(openDocumentDetail({ ...imagesList[currentImage], type }));
  }

  function checkSize() {
    const { offsetHeight, offsetWidth } = document.getElementById('ContentDialog-ImageModal');
    const { offsetWidth: offsetWidthButton } = document.getElementById('ContentDialog-buttonLeft');
    const transformImg = document.getElementById('transformImg');
    const vH = offsetHeight || 0;
    const vW = offsetWidth ? offsetWidth - offsetWidthButton * 2 : 0;
    let elmH = transformImg.naturalHeight || 0;
    let elmW = transformImg.naturalWidth || 0;
    while (elmH >= vH || elmW >= vW) {
      elmH *= 0.9;
      elmW *= 0.9;
    }
    transformImg.height = elmH;
    transformImg.width = elmW;
  }
  function onClickRotateLeft() {
    setRotate(rotate - 90)
    checkSize()
  }

  function onClickRotateRight() {
    setRotate(rotate + 90)
    checkSize()
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

  useEffect(() => {
    const { id } = imagesList[currentImage] || {}
    async function getDetail() {
      const { data } = await getDocumentDetail({ file_id: id })
      // console.log('currentImage', data)
      if (data.file) {
        const { user_create: { avatar, name }, size, name: file_name } = data.file;
        setImageInfo({
          user_create_avatar: avatar,
          user_create_name: name,
          time_create: data.file.created_at,
          size,
          file_name,
        })
      }
    }
    if (id) {
      getDetail()
    }
  }, [currentImage, imagesList]);

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
      className="ModalImage"
    >
      <DialogTitleModalImage id="customized-dialog-title"
        {...imageInfo}
        image={imagesList[currentImage]}
        onClickShare={onClickShare}
        onClickDetail={onClickDetail}
        onClickRotateLeft={onClickRotateLeft}
        onClickRotateRight={onClickRotateRight}
        onClose={handleClose}>
      </DialogTitleModalImage>
      <ContentDialog id="ContentDialog-ImageModal">
        {
          (FileType(type) === fileType.video) ?
            <ReactPlayer
              className="ModalImage--video"
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
              <div
                style={{ transform: `rotate(${rotate}deg)` }}
              >
                <img
                  id="transformImg"
                  onWheel={handleZoomImage}
                  onLoad={onLoadImage}
                  ref={transformRef}
                  alt="vtask"
                  // style={{ transform: `rotate(${rotate}deg)` }}
                  src={imagesList[currentImage] && (imagesList[currentImage].url || imagesList[currentImage].url_thumbnail)} />
              </div>
              <ButtonImage onClick={clickNext}>
                <Icon path={mdiChevronRight} size="30px" />
              </ButtonImage>
            </>
        }
      </ContentDialog>
      <FooterDialog fullHeight={FileType(type) === fileType.video}>
        <div className="ModalImage--scrollWrap">
          <Scrollbars
            autoHide autoHideTimeout={500} autoHideDuration={200}
            className="ModalImage--scroll"
            // renderTrackHorizontal={props => <div {...props} className="ModalImage--scrollTrack" />}
            renderView={props => <div {...props} className="ModalImage--scrollView" />}
          >
            <div className="ModalImage--imagesList">
              {
                (FileType(type) === fileType.video) ? null :
                  imagesList.map((image, index) => {
                    if (FileType(image.type) === fileType.video) return null;
                    return (
                      <WrapperImage
                        onClick={() => setCurrentImage(index)}
                        key={`1-${index}`}>
                        <Image src={image.url_thumbnail || image.url} alt='avatar' selected={currentImage === index} />
                      </WrapperImage>
                    );
                  })
              }
            </div>
          </Scrollbars>
        </div>
      </FooterDialog >
    </StyledDialog >
  )
}

export default ModalImage;