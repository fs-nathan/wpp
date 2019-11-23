import React from 'react';
import CustomModal from '../../../../../components/CustomModal';
import ColorTypo from '../../../../../components/ColorTypo';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PreviewBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 16px;
  width: 80%;
  & > div {
    overflow: hidden;
    width: 100px;
    height: 100px;
    border-radius: 100%;
    border: 1px solid #05b50c;
  }
  & > p {
    font-size: 14px;
    font-weight: 500;
  }
`;

function ImageCropper({ open, setOpen, image, uploadImage, }) {

  const cropper = React.useRef(null);
  const [src, setSrc] = React.useState();

  React.useEffect(() => {
    if (image === null) return;
    const reader = new FileReader();
    reader.onload = () => setSrc(reader.result);
    reader.readAsDataURL(image);
  }, [image]);

  function cropImage(callback) {
    if (typeof(cropper.current.getCroppedCanvas) === "undefined") {
      return;
    }
    if (typeof(cropper.current.getCroppedCanvas()) === "undefined") {
      return;
    }
    cropper.current.getCroppedCanvas().toBlob(blob => callback(blob));
  }

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title='Cắt ảnh'
      onConfirm={() => cropImage(uploadImage)}
    >
      <Container>
        <Cropper 
          style={{ height: 230, width: '70%' }}
          aspectRatio={1}
          preview=".img-preview"
          zoomable={false}
          minCropBoxWidth={100}
          minCropBoxHeight={100}
          src={src}
          ref={cropper}
        />
        <PreviewBox>
          <ColorTypo uppercase color={'gray'}>Xem trước</ColorTypo>
          <div className='img-preview' />
        </PreviewBox>
      </Container>
    </CustomModal>
  )
}

export default ImageCropper;
