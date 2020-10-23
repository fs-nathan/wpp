import React from 'react';
import { ButtonGroup, CircularProgress, Grow, Menu, MenuItem } from '@material-ui/core';
import SearchInput from 'components/SearchInput';
import NavigatorMenu from 'components/NavigatorMenu';
import Avatar from 'components/CustomAvatar';
import Icon from '@mdi/react';
import { mdiChevronUp, mdiChevronDown, mdiMenuDown, mdiClose, mdiMagnify, mdiAccountCircle, mdiFilterOutline, mdiDownload, mdiDotsVertical } from '@mdi/js';
import { StyledButton as _StyledButton, StyledPopper, SearchBox } from 'components/CustomTable/HeaderButtonGroup';
import { DRAWER_TYPE } from 'constants/constants';
import { get, isNil, find } from 'lodash';
import './style.scss';

const Container = ({ className = '', ...props }) =>
  <div className={`view_KanbanHeader___container ${className}`} {...props} />;

const LogoBox = ({ className = '', ...props }) =>
  <div className={`view_KanbanHeader___logo ${className}`} {...props} />;

const InfoBox = ({ className = '', ...props }) =>
  <div className={`view_KanbanHeader___info ${className}`} {...props} />;

const NameBox = ({ className = '', ...props }) =>
  <div className={`view_KanbanHeader___name ${className}`} {...props} />;

const MiniContainer = ({ className = '', ...props }) =>
  <div className={`view_KanbanHeader___container-mini ${className}`} {...props} />;

const StyledButtonGroup = ({ className = '', ...props }) =>
  <ButtonGroup className={`view_KanbanHeader___button-group ${className}`} {...props} />;

const StyledButton = ({ className = '', ...props }) =>
  <_StyledButton className={`view_KanbanHeader___button ${className}`} {...props} />;

function KanbanPage({
  handleVisibleDrawerMessage,
  search, handleSearchChange,
  project,
  isOpen, setIsOpen,
  handleShowOrHideProject,
  handleOpenModal,
  showHidePendings,
}) {

  const [searchAnchor, setSearchAnchor] = React.useState(null);
  const [moreAnchor, setMoreAnchor] = React.useState(null);

  function handleSearchClick(evt) {
    if (searchAnchor) {
      setSearchAnchor(null);
      handleSearchChange('');
    } else {
      setSearchAnchor(evt.currentTarget);
    }
  }

  function handleMoreOpen(evt) {
    setMoreAnchor(evt.currentTarget);
  }

  function handleMoreClick(handler) {
    return (evt) => {
      setMoreAnchor(null);
      handler();
    };
  }

  function handleMoreClose() {
    setMoreAnchor(null);
  }

  return isOpen 
    ? (
      <>
        <Container>
          <LogoBox>
            <Avatar alt="Logo" src={get(project, 'group_icon', '')} style={{ width: 40, height: 40 }}/>
          </LogoBox>
          <InfoBox>
            <NameBox 
              onClick={() => handleVisibleDrawerMessage({
                type: DRAWER_TYPE.KANBAN.PROJECTS,
                anchor: 'left',
                options: {
                  projectId: get(project, 'id', ''),
                },
              })}
            >
              <span>{get(project, 'name', '')}</span>
              <Icon path={mdiMenuDown} size={1} />
            </NameBox>
            <NavigatorMenu />
          </InfoBox>
          <StyledButtonGroup>
            <StyledButton onClick={handleSearchClick}>
              <div>
                <Icon
                  path={Boolean(searchAnchor) ? mdiClose : mdiMagnify}
                  size={1}
                  color={"rgba(0, 0, 0, 0.54)"}
                />
              </div>
              <span>{Boolean(searchAnchor) ? "Hủy" : "Tìm kiếm"}</span>
            </StyledButton>
            <StyledButton
              onClick={() => handleVisibleDrawerMessage({
                type: DRAWER_TYPE.KANBAN.MEMBERS,
                anchor: 'right',
                options: {
                  projectId: get(project, 'id', ''),
                  handleOpenModal,
                },
              })}
            >
              <div>
                <Icon
                  path={mdiAccountCircle}
                  size={1}
                  color={"rgba(0, 0, 0, 0.54)"}
                />
              </div>
              <span>{"Thành viên"}</span>
            </StyledButton>
            <StyledButton 
              onClick={() => handleVisibleDrawerMessage({
                type: DRAWER_TYPE.KANBAN.FILTER,
                anchor: 'right',
                options: {},
              })}
            >
              <div>
                <Icon
                  path={mdiFilterOutline}
                  size={1}
                  color={"rgba(0, 0, 0, 0.54)"}
                />
              </div>
              <span>{"Lọc"}</span>
            </StyledButton>
            <StyledButton onClick={() => null}>
              <div>
                <Icon
                  path={mdiDownload}
                  size={1}
                  color={"rgba(0, 0, 0, 0.54)"}
                />
              </div>
              <span>{"Tải xuống"}</span>
            </StyledButton>
            <StyledButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleMoreOpen}
            >
              <div>
                <Icon
                  path={mdiDotsVertical}
                  size={1}
                  color={"rgba(0, 0, 0, 0.54)"}
                />
              </div>
              <span>{"Thêm"}</span>
            </StyledButton>
            <StyledButton
              onClick={() => null}
            >
              <div>
                <Icon
                  path={mdiChevronUp}
                  size={1}
                  color={"rgba(0, 0, 0, 0.54)"}
                  onClick={() => setIsOpen(false)}
                />
              </div>
            </StyledButton>
          </StyledButtonGroup>
        </Container>
        <StyledPopper
          open={Boolean(searchAnchor)}
          anchorEl={searchAnchor}
          transition
          placement="left"
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} timeout={100}>
              <SearchBox>
                <SearchInput
                  placeholder={"Nhập nội dung cần tìm"}
                  value={search}
                  onChange={evt => handleSearchChange(evt.target.value)}
                />
              </SearchBox>
            </Grow>
          )}
        </StyledPopper>
        <Menu
          id="simple-menu"
          anchorEl={moreAnchor}
          open={Boolean(moreAnchor)}
          onClose={handleMoreClose}
          transformOrigin={{
            vertical: -30,
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={handleMoreClick(() => handleOpenModal('EDIT_PROJECT', {
              curProject: project,
            }))}
            disabled={false}
          >
            Chỉnh sửa
          </MenuItem>
          <MenuItem
            onClick={handleMoreClick(() => handleOpenModal('SETTING_PROJECT', {
              curProject: project,
            }))}
            disabled={false}
          >
            Cài đặt
          </MenuItem>
          <MenuItem
            onClick={handleMoreClick(() => handleOpenModal('CALENDAR', {}))}
            disabled={false}
          >
            Lịch làm việc
          </MenuItem>
          <MenuItem
            onClick={handleMoreClick(() => handleShowOrHideProject(project))}
            disabled={
              !isNil(find(showHidePendings.pendings, pending => pending === get(project, 'id')))
            }
          >
            {!isNil(find(showHidePendings.pendings, pending => pending === get(project, 'id'))) && (
              <CircularProgress
                size={16}
                className="margin-circular"
                color="white"
              />
            )}
            {get(project, 'visibility') ? 'Ẩn quy trình' : 'Bỏ ẩn quy trình'}
          </MenuItem>
        </Menu>
      </>
    )
    : (
      <MiniContainer>
        <Icon
          path={mdiChevronDown}
          size={1}
          onClick={() => setIsOpen(true)}
        />
      </MiniContainer>
    )
}

export default KanbanPage;