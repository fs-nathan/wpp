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
    className="MuiButtonBase-root MuiButton-root MuiButton-text comp_CustomTable_HeaderButtonGroup___button MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedText MuiButtonGroup-groupedTextHorizontal MuiButtonGroup-groupedText MuiButton-textSizeSmall MuiButton-sizeSmall"
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