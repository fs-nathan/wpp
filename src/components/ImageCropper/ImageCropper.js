import React, { useEffect, useRef, useState } from 'react';
import CustomModal from '../CustomModal';
import ColorTypo from '../ColorTypo';
import Cropper from 'react-cropper';
import { Slider } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiMinusCircleOutline, mdiPlusCircleOutline } from '@mdi/js';
import 'cropperjs/dist/cropper.css';
import styled from 'styled-components';
import './ImageCropper.scss';

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
  const cropper = useRef(null);
  const [src, setSrc] = useState();
  const [updateOption, setUpdateOption] = useState(true);
  const [sliderValue, setSliderValue] = useState(50);

  React.useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => setSrc(reader.result);
      reader.readAsDataURL(image);
    }
  }, [image]);

  useEffect(() => {
    if (updateOption && cropper && cropper.current && cropper.current.cropper) {
      if (cropType === CROP_TYPE.LOGO) {
        cropper.current.cropper.options.data = {
          width: 600,
          height: 600
        };
      } else {
        cropper.current.cropper.options.data = {
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
    if (cropType === CROP_TYPE.COVER) {
      cropper.current
        .getCroppedCanvas({
          width: 1200,
          height: 400,
          imageSmoothingQuality: 'high'
        })
        .toBlob(blob => callback(blob, cropType));
    } else {
      cropper.current
        .getCroppedCanvas({
          width: 120,
          height: 120,
          imageSmoothingQuality: 'high'
        })
        .toBlob(blob => callback(blob, cropType));
    }
  }

  const handleChangeZoom = (event, newValue) => {
    if (sliderValue === newValue) return;
    if (sliderValue > newValue) {
      cropper.current.cropper.zoom(-(sliderValue - newValue) / 100);
    } else {
      cropper.current.cropper.zoom((newValue - sliderValue) / 100);
    }
    setSliderValue(newValue);
    if (updateOption) {
      setUpdateOption(false);
    }
  };

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
          aspectRatio={cropType === CROP_TYPE.LOGO ? 1 / 1 : 3 / 1}
          preview=".img-preview"
          zoomable={true}
          guides={false}
          responsive={false}
          // viewMode={3}
          movable={true}
          cropBoxResizable={false}
          dragMode="move"
          zoomOnWheel={false}
          // minCropBoxWidth={120}
          // minCropBoxHeight={120}
          src={src}
          ref={cropper}
        />
        {cropper && (
          <div className="zoom-slider">
            <Icon
              className="zoom-ic zoom-out-ic"
              path={mdiMinusCircleOutline}
              size={1.8}
              color={'#777'}
            />
            <Slider
              max={100}
              min={0}
              step={5}
              value={sliderValue}
              onChange={handleChangeZoom}
              aria-labelledby="continuous-slider"
            />
            <Icon
              className="zoom-ic zoom-in-ic"
              path={mdiPlusCircleOutline}
              size={1.8}
              color={'#777'}
            />
          </div>
        )}
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
