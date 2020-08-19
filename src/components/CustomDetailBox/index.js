import React from 'react';
import './style.scss';

export const Container = ({ className = '', ...props }) => <div className={`comp_CustomDetailBox___container ${className}`} {...props} />;

export const SubContainer = ({ className = '', ...props }) => <div className={`comp_CustomDetailBox___sub-container ${className}`} {...props} />;

export const ActionBox = ({ className = '', ...props }) => <div className={`comp_CustomDetailBox___action-box ${className}`} {...props} />;
