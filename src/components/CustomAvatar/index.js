import React from 'react';
import PropTypes from 'prop-types';
import spinner from '../../assets/loading_spinner.gif';
import defaultImg from '../../assets/default.png';
import Img from 'react-image';
import { CustomEventListener, CustomEventDispose, DELETE_ICON } from '../../constants/events';

function CustomAvatar({ src, alt, srcSet, sizes, ...rest }) {

  const [imgSrc, setImgSrc] = React.useState({src});

  React.useEffect(() => {
    setImgSrc({src});
  }, [src]);

  React.useEffect(() => {
    const reloadSrcHandler = () => {
      setImgSrc({src});
    };

    CustomEventListener(DELETE_ICON, reloadSrcHandler);

    return () => {
      CustomEventDispose(DELETE_ICON, reloadSrcHandler);
    }
  }, [src]);

  return (
    <div className='MuiAvatar-root' 
      {...rest}
    >
      <Img 
        className='MuiAvatar-img'
        alt={alt}
        src={imgSrc.src}
        sizes={sizes}
        loader={<img className='MuiAvatar-img' src={spinner} alt={alt} sizes={sizes} />}
        unloader={<img className='MuiAvatar-img' src={defaultImg} alt={alt} sizes={sizes} />}
      />
    </div>
  )
}

CustomAvatar.propTypes = {
  src: PropTypes.string,
};

export default CustomAvatar;
