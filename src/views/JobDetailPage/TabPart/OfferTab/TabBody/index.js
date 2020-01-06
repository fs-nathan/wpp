import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiDotsHorizontal } from '@mdi/js';
import {
  Avatar, IconButton, Menu, MenuItem, ButtonGroup, Collapse, Button,
} from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import ColorChip from '../../../../../components/ColorChip';
import ColorButton from '../../../../../components/ColorButton';
import SearchInput from '../../../../../components/SearchInput';
// import avatar from '../../../../../assets/avatar.jpg';
import OfferModal from '../OfferModal';
import ApproveModal from '../ApproveModal'
import { Scrollbars } from 'react-custom-scrollbars';
import ModalDeleteConfirm from '../../ModalDeleteConfirm';
import { DEFAULT_OFFER_ITEM } from '../../../../../helpers/jobDetail/arrayHelper'

// const Container = styled.div`
//   padding: 10px 20px 50px 20px;
// `;

// const ApprovedContainer = styled.div`
//   margin-left: 30px;
//   margin-top: 10px;
// `;

// const StyledButton = styled(({ color, ...rest }) => <Button {...rest} />)`
//   font-size: 11px;
//   border-radius: 999px;
//   & > span {
//     color : ${props => props.color ? props.color : 'rgba(0, 0, 0, .4)'};
//       display: flex;
//   }
// `

const StyledButton = styled(Button)`
  box-shadow: none;
  background: none;
  color: #2196F3;
  padding: 3px 9px;
  border : 1px solid #2196F3;
  &:hover {
    box-shadow: none;
  background: #2196F3;
  color: white;
  }
`
const Body = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
  
`;

const StyleContent = styled(ColorTypo)`
  font-size: 14px;
`
const Badge = styled(ColorChip)`
  border-radius: 3px !important;
`
const UserHanderAvatar = styled(Avatar)`
  width: 25px;
  height: 25px;
`
// const StyledMenuApprove = styled.div`
//   opacity: 0 ;
//   ${ApprovedContainer}:hover & {
//     opacity: 1;
//   }
// `
const ApprovedBox = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }
  // bien của modal phe duyet
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const DENIED_VALUE = {
    offer_id: props.offer.id,
    content: "Từ chối phê duyệt",
    status: 2
  }
 
  return (
    <React.Fragment>
      {props.approved && (
        <React.Fragment>
          <div className="approved-container">
            <div className="styled-title-box">
              <UserHanderAvatar src={props.offer.dataHander.user_hander_avatar} alt='avatar' />
              <div>
                <StyleContent variant='body1' bold>{props.offer.dataHander.user_hander_name}</StyleContent>
                <ColorTypo variant='caption'>
                  <Badge component='small' color='bluelight' badge size='small' label={'Duyệt'} />
                </ColorTypo>
              </div>
              <div className="styled-menu-approve">
                <ButtonIcon size='small' onClick={handleClick} >
                  <Icon path={mdiDotsHorizontal} size={1} />
                </ButtonIcon>
              </div>
            </div>
            <div className="styled-content-box">
              <ColorTypo variant='caption'>{props.offer.dataHander.date_hander}</ColorTypo>
              <StyleContent >{props.offer.dataHander.content_hander}</StyleContent>
            </div>
          </div>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => props.handleClickOpen()}>Chỉnh sửa</MenuItem>
            <MenuItem onClick={handleClose}>Xóa</MenuItem>
          </Menu>
        </React.Fragment>
      )}
      {!props.approved && (
        <React.Fragment>
          <div className="approved-container">
            <div className="styled-title-box">
              <StyledButton variant="contained" size="small" onClick={handleClickOpen}>Phê duyệt</StyledButton>
              <Button variant="outlined" size="small"
                onClick={() => {
                  props.handleOfferById({data: DENIED_VALUE, taskId: props.taskId})
                }}
              >Từ chối</Button>
              <span />
            </div>
            <ApproveModal {...props} isOpen={open} handleClickClose={handleClickClose} handleClickOpen={handleClickOpen} />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

// const StyledListItem = styled.li`
//   display: flex;
//   flex-direction: column;
// `;

// const StyledTitleBox = styled.div`
//   display: flex;
//   align-items: center;
//   & > *:not(:first-child) {
//     margin-left: 5px;
//   }
//   & > *:last-child   {
//     margin-left: auto;
//   }
// `;

// const StyledContentBox = styled.div`
//   margin-left: 30px;
//   margin-top: 10px;
//   background-color: #f9f9f9;
//   padding: 8px 10px;
//   border-radius: 5px;
//   font-weight: bold;
// `;

const ButtonIcon = styled(IconButton)`
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`
// const WrapperCommon = styled.div``
// const StyledMenuOffer = styled.div`
//   opacity: 0 ;
//   ${WrapperCommon}:hover & {
//     opacity: 1;
//   }
// `
const CustomListItem = (props) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    content, dataHander, date_create,
    user_create_avatar, user_create_name, user_can_handers
  } = props.offer

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <React.Fragment>
      <li className="styled-list-item">
        <div className="wrapper-list-item">
          <div className="styled-title-box">
            <UserHanderAvatar src={user_create_avatar} alt='avatar' />
            <div>
              <StyleContent variant='body1' bold>{user_create_name}</StyleContent>
              <ColorTypo variant='caption'>
                <Badge component='small' size='small' badge color='orangelight' label={'Đề xuất'} />
                &nbsp;
                với
                &nbsp;
            <ColorTypo color='orange' variant='caption'>{user_can_handers.join(", ")}</ColorTypo> lúc {date_create}
              </ColorTypo>
            </div>
            <div className="styled-menu-offer">
              <ButtonIcon size='small' onClick={handleClick} >
                <Icon path={mdiDotsHorizontal} size={1} />
              </ButtonIcon>
            </div>
          </div>
          <div className="styled-content-box">
            <StyleContent>{content}</StyleContent>
          </div>
        </div>
        <ApprovedBox {...props} approved={dataHander} handleClickOpen={() => props.handleClickOpen()} />
      </li>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => {
          props.handleClickOpen()
          setAnchorEl(null)
        }}>Chỉnh sửa</MenuItem>
        <MenuItem onClick={() => {
          props.handleOpenModalDelete(props.offer)
          setAnchorEl(null)
        }}>Xóa</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

const StyledList = styled.ul`
  margin-top: 20px;
  padding-inline-start: 0 !important;
  list-style-type: none;
  & > li {
    padding: 8px 0 20px 0;
    border-bottom: 1px solid #dedede;
    margin: 17px 0;
  }
`;

const ListOffer = (props) => {
  const searchOfferTabPart = (e) => {
    props.searchOffer(e.target.value)
  }
  return (
    <React.Fragment>
      <SearchInput
        fullWidth
        placeholder="Nhập từ khóa"
        onChange={e => searchOfferTabPart(e)}
      />
      <StyledList>

        {props.offer.map((item) => {
          return (
            <CustomListItem
              {...props}
              key={item.id}
              offer={item}
              handleClickOpen={() => {
                props.handleClickEditItem(item)
              }}
              handleOpenModalDelete={() => {
                props.handleOpenModalDelete(item)
              }}


              handleClickClose={() => props.handleClickClose()} />
          )
        })}


      </StyledList>
    </React.Fragment>
  );
}

const StyledButtonGroup = styled(ButtonGroup)`
  margin: 8px 0 20px 0;
`;

function TabBody(props) {


  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);
  const [isOffer] = React.useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  const [selectedItem, setSelectedItem] = React.useState(DEFAULT_OFFER_ITEM)
  const handleClickEditItem = item => {
    setSelectedItem({ ...item, offer_id: item.id })
    setOpen(true)
  };
  const [isOpenDelete, setOpenDelete] = React.useState(false);
  const confirmDelete = () => {

    props.deleteOfferByTaskId({offerId: selectedItem.offer_id, taskId: props.taskId})
  }
  const handleOpenModalDelete = item => {
    setSelectedItem({ ...item, offer_id: item.id })

    setOpenDelete(true);
  };
  const handleCloseModalDelete = () => {
    setOpenDelete(false);
  };

  return (
    <Body autoHide autoHideTimeout={500} autoHideDuration={200}>
      <div className="container-offer-tabbody">
        <StyledButtonGroup fullWidth variant="text" >
          <ColorButton
            onClick={evt => handleChange(evt, 0)}
          >
            {value === 0
              ? <ColorTypo bold>Tất cả({props.offer.length})</ColorTypo>
              : <ColorTypo color='gray'>Tất cả ({props.offer.length})</ColorTypo>}
          </ColorButton>
          <ColorButton
            onClick={evt => handleChange(evt, 1)}
          >
            {value === 1
              ? <ColorTypo bold>Đã duyệt ({props.approvedItems.length})</ColorTypo>
              : <ColorTypo color='gray'>Đã duyệt ({props.approvedItems.length})</ColorTypo>}
          </ColorButton>
          <ColorButton
            onClick={evt => handleChange(evt, 2)}
          >
            {value === 2
              ? <ColorTypo bold>Chờ duyệt ({props.pendingItems.length})</ColorTypo>
              : <ColorTypo color='gray'>Chờ duyệt ({props.pendingItems.length})</ColorTypo>}
          </ColorButton>
        </StyledButtonGroup>
        <Collapse in={value === 0} mountOnEnter unmountOnExit>
          <ListOffer
            handleClickClose={() => handleClickClose()}
            handleClickOpen={() => handleClickOpen()}
            handleOpenModalDelete={(data) => handleOpenModalDelete(data)}
            handleClickEditItem={(data) => handleClickEditItem(data)}
            {...props}
            offer={props.offer}
          />
        </Collapse>
        <Collapse in={value === 1} mountOnEnter unmountOnExit>
          <ListOffer
            handleClickClose={() => handleClickClose()}
            handleClickOpen={() => handleClickOpen()}
            handleOpenModalDelete={(data) => handleOpenModalDelete(data)}
            handleClickEditItem={(data) => handleClickEditItem(data)}
            {...props}
            offer={props.approvedItems}
          />
        </Collapse>
        <Collapse in={value === 2} mountOnEnter unmountOnExit>
          <ListOffer
            handleClickClose={() => handleClickClose()}
            handleClickOpen={() => handleClickOpen()}
            handleOpenModalDelete={(data) => handleOpenModalDelete(data)}
            handleClickEditItem={(data) => handleClickEditItem(data)}
            {...props}
            offer={props.pendingItems}
          />
        </Collapse>
        <OfferModal
          {...props}
          isOpen={open}
          handleClickClose={handleClickClose}
          handleClickOpen={handleClickOpen}
          isOffer={isOffer}
          item={selectedItem}
        />
        <ModalDeleteConfirm
          confirmDelete={confirmDelete}
          isOpen={isOpenDelete}
          handleCloseModalDelete={handleCloseModalDelete}
          item={selectedItem}
          {...props} />
      </div>
    </Body>
  )
}

export default TabBody;
