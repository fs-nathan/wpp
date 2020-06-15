import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import './styles.scss';

const OfferFile = ({ file, handleDeleteFile }) => {
  const onClickDelete = () => handleDeleteFile(file.id)
  return (
    <div className="offerFile">
      <span className="offerFile--name">{file.name}</span>
      <Icon className="offerFile--icon" onClick={onClickDelete} path={mdiClose} size={1} />
    </div>
  )
}

export default OfferFile