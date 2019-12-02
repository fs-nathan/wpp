import React, { useEffect } from 'react';
import CustomModal from '../CustomModal';
import ColorTypo from '../ColorTypo';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
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
    border: 1px solid #05b50c;
  }
  & > p {
    font-size: 14px;
    font-weight: 500;
  }
`;

const CROP_TYPE = {
  LOGO: 'LOGO',
  COVER: 'COVER'
};

function ImageCropper({ open, setOpen, image, uploadImage, cropType }) {
  const cropper = React.useRef(null);
  const [src, setSrc] = React.useState();

  React.useEffect(() => {
    if (image === null) return;
    const reader = new FileReader();
    reader.onload = () => setSrc(reader.result);
    reader.readAsDataURL(image);
  }, [image]);

  useEffect(() => {
    if (cropper && cropper.current && cropper.current.cropper) {
      if (cropType === CROP_TYPE.LOGO) {
        cropper.current.cropper.options.data = {
          x: 0,
          y: 0,
          width: 120,
          height: 120
        };
      } else {
        cropper.current.cropper.options.data = {
          x: 0,
          y: 0,
          width: 1200,
          height: 400
        };
      }
    }
  });

  function cropImage(callback) {
    if (typeof cropper.current.getCroppedCanvas === 'undefined') {
      return;
    }
    if (typeof cropper.current.getCroppedCanvas() === 'undefined') {
      return;
    }
    callback(cropper.current.getCroppedCanvas().toDataURL(), cropType);
  }

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title="Cắt ảnh"
      onConfirm={() => cropImage(uploadImage)}
    >
      <Container>
        <Cropper
          style={{ height: 230, width: '100%' }}
          aspectRatio={cropType === CROP_TYPE.LOGO ? 1 : NaN}
          preview=".img-preview"
          zoomable={false}
          guides={false}
          responsive={false}
          // viewMode={3}
          movable={false}
          cropBoxResizable={false}
          dragMode="move"
          // minCropBoxWidth={120}
          // minCropBoxHeight={120}
          src={src}
          ref={cropper}
        />
        <PreviewBox>
          <ColorTypo uppercase color={'gray'}>
            Xem trước
          </ColorTypo>
          <div className="img-preview" />
        </PreviewBox>
      </Container>
    </CustomModal>
  );
}

export default ImageCropper;
