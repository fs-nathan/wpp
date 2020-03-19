import React from 'react';
import ColorTypo from 'components/ColorTypo'
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

import './styles.scss';

const OfferFile = ({ file, handleDeleteFile }) => {
  return (
    <div className="offerFile">
      <span className="offerFile--name">{file.name}</span>
      <ColorTypo className="offerFile--size" variant='caption'>{file.size}</ColorTypo>
      <Icon className="offerFile--icon" onClick={() => handleDeleteFile(file.id)} path={mdiClose} size={0.5} />
    </div>
  )
}

export default OfferFile