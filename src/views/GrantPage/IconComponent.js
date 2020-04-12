import React from 'react'
import Icon from '@mdi/react';
import {
    IconButton,
  } from '@material-ui/core';
  
const IconComponent = ({  path, title,size,onClick }) =>{
    return( <React.Fragment> 
    <div>
    <IconButton
    onClick={(e) =>onClick(e)}
    classes={{
         root: 'header-button-custom ',
      }}
    aria-controls="simple-menu"
    style={{padding: 0}}
    aria-haspopup="true"
    size="small"
>
  <div>
<Icon style={{fill: 'rgba(0, 0, 0, 0.54)'}} path={path} size={size || 1}/>

</div>
<span>{title}</span>
</IconButton>
</div>
</React.Fragment>)
}
export default IconComponent