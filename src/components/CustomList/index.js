import React from 'react';
import { List, ListItem } from '@material-ui/core';
import './style.scss';

export const StyledList = ({ className = '', ...props }) => <List className={`comp_CustomList___list ${className}`} {...props} />;

export const StyledListItem = ({ className = '', ...props }) => <ListItem className={`comp_CustomList___list-item ${className}`} {...props} />;

export const Primary = ({ className = '', ...props }) => <span className={`comp_CustomList___primary ${className}`} {...props} />;

export const Secondary = ({ className = '', ...props }) => <small className={`comp_CustomList___secondary ${className}`} {...props} />;