import React from 'react';
import './style.scss'

const ImagePlus = ({plusImage}) => {
  return (
    <div className="avatar-square-group-images-plus">
     <span>+{`${plusImage}`}</span>
    </div>
  )
}

const AvatarSquareGroup = props => {
  let { images = [] } = props;
  const widthImage = props.widthImage
  const classMore = props.classMore
  let showImages = images;
  const imgNum = 4;
  let plusImage = images.length - imgNum;
  if (plusImage > 0) {
    showImages = images.slice(0, imgNum - 1);
    plusImage ++
  }
  return (
    <div className={`avatar-square-group avatar-square-group-${showImages.length + (plusImage > 0 ? 1 : 0)} ${classMore}`}>
      {
        showImages.map(avatar =>
          <div className="avatar-square-group-per-step" key={avatar.id}>
            <img src={avatar.avatar} title={avatar.name} />
          </div>
        )
      }
      {
        plusImage > 0 && (<ImagePlus plusImage={plusImage} />)
      }
    </div>
  );
};

export default AvatarSquareGroup