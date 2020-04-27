import clsx from 'clsx';
import CustomModal from "components/CustomModal";
import React from 'react';
import './styles.scss';

function JobDetailModalWrap(props) {
  const { className, ...rest } = props
  return (
    <CustomModal
      className={clsx(className, "JobDetailModalWrap")}
      {...rest} />
  );
}

export default JobDetailModalWrap;