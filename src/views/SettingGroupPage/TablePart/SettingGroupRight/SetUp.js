import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Divider,
  FormControlLabel,
  Checkbox,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';

import { List, arrayMove } from 'react-movable';
import Icon from '@mdi/react';
import { mdiDragVertical, mdiDotsVertical } from '@mdi/js';
import PickColorModal from './PickColorModal';
import './SettingGroupRight.scss';

function MoreAction({ idx, onUpdate }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnChangeStatus = status => {
    onUpdate(idx, status);
    setAnchorEl(null);
  };

  return (
    <div onClick={evt => evt.stopPropagation()}>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        size="small"
        onClick={handleClick}
      >
        <Icon path={mdiDotsVertical} size={1} color="rgba(0, 0, 0, 0.7)" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={() => handleOnChangeStatus(1)}>Bật</MenuItem>
        <MenuItem onClick={() => handleOnChangeStatus(0)}>Tắt</MenuItem>
      </Menu>
    </div>
  );
}

function SetUp(props) {
  const [items, setItems] = useState([
    { name: 'Lịch tuần', status: 1 },
    { name: 'Công việc đến hạn', status: 1 },
    { name: 'Thành viên nổi bật', status: 1 },
    { name: 'Tư vấn pháp luật', status: 0 }
  ]);
  const [visibleModal, setVisibleModal] = useState(false);
  const { colors } = props;
  const bgColor = colors.find(item => item.selected === true);

  const handleChangeStatus = (idx, status) => {
    const newArr = [...items];
    newArr[idx].status = status;
    setItems(newArr);
  };

  return (
    <div className="setup-info">
      <div className="setup-info-left">
        <div className="title">Cài đặt menu trái</div>
        <div className="sub-title">
          Thiết lập hiển thị chức năng trên menu trái
        </div>
        <div className="setup-content">
          <div className="setup-menu-list">
            <FormControlLabel
              disabled
              checked
              className="cb-item"
              control={<Checkbox ccolor="primary" />}
              label="Trang chủ"
            />
            <FormControlLabel
              disabled
              checked
              className="cb-item"
              control={<Checkbox color="primary" />}
              label="Dự án"
            />
            <FormControlLabel
              disabled
              checked
              className="cb-item"
              control={<Checkbox color="primary" />}
              label="Công việc"
            />
            <FormControlLabel
              disabled
              checked
              className="cb-item"
              control={<Checkbox color="primary" />}
              label="Báo cáo"
            />
            <FormControlLabel
              className="cb-item"
              control={<Checkbox color="primary" />}
              label="Ngân sách"
            />
            <FormControlLabel
              className="cb-item"
              control={<Checkbox color="primary" />}
              label="Đề xuất"
            />
            <FormControlLabel
              className="cb-item"
              control={<Checkbox color="primary" />}
              label="Quy trình"
            />
            <FormControlLabel
              className="cb-item"
              control={<Checkbox color="primary" />}
              label="Văn thư"
            />
            <FormControlLabel
              disabled
              checked
              className="cb-item"
              control={<Checkbox color="primary" />}
              label="Tài liệu"
            />
            <FormControlLabel
              className="cb-item"
              control={<Checkbox color="primary" />}
              label="Lịch, nhắc hẹn"
            />
            <FormControlLabel
              className="cb-item"
              control={<Checkbox color="primary" />}
              label="Vị trí"
            />
            <FormControlLabel
              disabled
              checked
              className="cb-item"
              control={<Checkbox color="primary" />}
              label="Thành viên"
            />
          </div>

          <div className="setting-bg-left-menu">
            <span className="lb-text">Chọn màu sắc menu trái</span>
            <span
              className="pick-color"
              style={{ background: bgColor.value }}
              onClick={() => setVisibleModal(true)}
            ></span>
            <PickColorModal
              open={visibleModal}
              setOpen={val => setVisibleModal(val || false)}
            />
          </div>
        </div>
      </div>
      <Divider orientation="vertical" className="divider-vertical"/>
      <div className="setup-info-right">
        <div className="title">Thiết lập plugin trang chủ</div>
        <div className="sub-title">
          Sắp xếp, bật tắt các plugin trên trang chủ
        </div>
        <div className="plugin-content">
          <List
            values={items}
            onChange={({ oldIndex, newIndex }) =>
              setItems(arrayMove(items, oldIndex, newIndex))
            }
            renderList={({ children, props, isDragged }) => (
              <ul
                {...props}
                style={{
                  cursor: isDragged ? 'grabbing' : 'inherit'
                }}
                className="drag-drop-wrapper"
              >
                {children}
              </ul>
            )}
            renderItem={({ value, index, props, isDragged, isSelected }) => (
              <li
                {...props}
                style={{
                  ...props.style,
                  cursor: isDragged ? 'grabbing' : 'inherit',
                  backgroundColor: isDragged || isSelected ? '#EEE' : '#FFF'
                }}
                className="drag-item "
              >
                <div className="item-wrapper">
                  <div className="drag-content">
                    <span
                      data-movable-handle
                      style={{
                        cursor: isDragged ? 'grabbing' : 'grab'
                      }}
                      tabIndex={-1}
                    >
                      <Icon path={mdiDragVertical} size={1} />
                    </span>
                    <div className="ml-3">{value.name}</div>
                  </div>
                  <div className="action-item">
                    <span
                      className={
                        'status-plugin ' + (value.status ? 'is-active' : '')
                      }
                    >
                      {value.status ? 'Bật' : 'Tắt'}
                    </span>
                    <MoreAction idx={index} onUpdate={handleChangeStatus} />
                  </div>
                </div>
              </li>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default connect(
  state => ({
    colors: state.setting.colors
  }),
  {}
)(SetUp);
