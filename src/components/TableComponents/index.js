import React from 'react';
import './style.scss';

export const Container = ({ className = '', ...props }) => 
  <div 
    className={`comp_TableComponents___container ${className}`}
    {...props}
  />;

export const SubTitle = ({ className = '', ...props }) => 
  <span 
    className={`comp_TableComponents___sub-title ${className}`}
    {...props}
  />;

export const LinkSpan = ({ className = '', ...props }) => 
  <span 
    className={`comp_TableComponents___link ${className}`}
    {...props}
  />;

export const SettingContainer = ({ className = '', ...props }) => 
  <div 
    className={`comp_TableComponents___setting-container ${className}`}
    {...props}
  />;


export const StateBox = ({ stateName, className = '', ...props }) => 
  <div 
    className={`comp_TableComponents___state-box-${stateName.toLowerCase()} ${className}`}
    {...props} 
  />;

export const DateBox = ({ stateName, className = '', ...props }) => 
  <div 
    className={`comp_TableComponents___date-box`}
    {...props} 
  />;