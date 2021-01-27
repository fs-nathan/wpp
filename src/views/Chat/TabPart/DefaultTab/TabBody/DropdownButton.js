import React from 'react';
import Icon from '@mdi/react';
import {
  mdiCheckCircle, mdiCheckboxBlankCircleOutline,
} from '@mdi/js';
import {
  Divider, ListItemText, ListItemIcon, Menu, MenuItem
} from '@material-ui/core';
import ColorButton from '../../../../../components/ColorButton';
import ModalStatus from './ModalStatus';
import HtmlTooltip from './HtmlTooltip';
import colorPal from '../../../../../helpers/colorPalette';

function DropdownButton({ values, handleChangeItem, selectedIndex }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selected, setSelected] = React.useState(0)
  const [hideTooltip, setHideTooltip] = React.useState(false)

  React.useEffect(() => {
    if (values[selectedIndex]) setSelected(selectedIndex)
  }, [selectedIndex, values])

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget)
    setHideTooltip(true)
  }

  function handleClose() {
    setAnchorEl(null)
    setHideTooltip(false)
  }

  function handleSelect(index) {
    setSelected(index)
    handleChangeItem(index)
    handleClose()
  }

  if (values.length === 0) return (
    <ColorButton variantColor='teal' size='small' aria-haspopup="true" variant="outlined" style={{ margin: '0 15px 10px 0' }}
    // endIcon={
    //   <Icon path={mdiArrowRightBoldCircle} size={0.7} color={colorPal['greenlight'][1]} />
    // }
    />
  );
  else return (
    <React.Fragment>
      <HtmlTooltip
        disableFocusListener={hideTooltip}
        title={<ModalStatus values={values[selected]} />}
        placement="top-start">
        <div>
          <ColorButton
            variantColor='teal' size='small' onClick={handleClick}
            aria-haspopup="true" variant="outlined" style={{ margin: '0 15px 10px 0' }}>
            {values[selected]}
          </ColorButton>
        </div>
      </HtmlTooltip>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: 130,
          horizontal: 0,
        }}
      >
        {
          values.map((value, index) => {
            return (
              <MenuItem key={index} onClick={() => handleSelect(index)}>
                {index === selected ? (
                  <ListItemIcon >
                    <Icon path={mdiCheckCircle} size={1} color={colorPal['green'][0]} />
                  </ListItemIcon>

                ) : (
                    <ListItemIcon>
                      <Icon path={mdiCheckboxBlankCircleOutline} size={1} color={colorPal['default'][0]} />
                    </ListItemIcon>
                  )}
                <ListItemText >
                  {value}
                </ListItemText>
                <Divider />
              </MenuItem>
            );
          })
        }
      </Menu>
    </React.Fragment>
  );
}
export default DropdownButton