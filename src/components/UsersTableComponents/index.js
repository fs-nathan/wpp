import React from 'react';
import './style.scss';

export const Container = ({ className = '', ...props }) => 
  <div 
    className={`comp_UsersTableComponents___container ${className}`}
    {...props}
  />;

export const SubTitle = ({ className = '', ...props }) => 
  <span 
    className={`comp_UsersTableComponents___sub-title ${className}`}
    {...props}
  />;

export const NameSpan = ({ className = '', ...props }) => 
  <span 
    className={`comp_UsersTableComponents___name ${className}`}
    {...props}
  />;

export const SettingContainer = ({ className = '', ...props }) => 
  <div 
    className={`comp_UsersTableComponents___setting-container ${className}`}
    {...props}
  />;