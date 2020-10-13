import React from 'react';
import CustomModal from 'components/CustomModal';
import CustomAvatar from 'components/CustomAvatar';
import CustomSelect from 'components/CustomSelect';
import { get } from 'lodash';
import './style.scss';

const Title = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_Modal_StageSetting___title ${className}`}
    {...props}
  />

const SubContainer = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_Modal_StageSetting___sub-container ${className}`}
    {...props}
  />

const SubTitle = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_Modal_StageSetting___sub-title ${className}`}
    {...props}
  />

const UserList = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_Modal_StageSetting___user-list ${className}`}
    {...props}
  />

const User = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_Modal_StageSetting___user ${className}`}
    {...props}
  />

const assignOptions = [{
  label: 'Giao việc thủ công theo từng công việc (mặc định)',
  value: 0,
}, {
  label: 'Tự động giao việc cho thành viên sau',
  value: 1,
}, {
  label: 'Giữ nguyên người nhận việc giai đoạn trước',
  value: 2,
}];

const changeOptions = [{
  label: 'Không bắt buộc',
  value: 0,
}, {
  label: 'Phải hoàn thành toàn bộ công việc',
  value: 1,
}];

function StageSetting({
  open, setOpen,
  stageName,
  groupTask,
  managers,
}) {

  const [assign, setAssign] = React.useState(assignOptions[0]);
  const [change, setChange] = React.useState(changeOptions[0]);

  console.log(managers);

  return (
    <React.Fragment>
      <CustomModal
        title={`Thiết lập ${stageName}`}
        open={open}
        setOpen={setOpen}
        canConfirm={true}
        onConfirm={() => setOpen(false)}
        onCancle={() => setOpen(false)}
        loading={false}
        activeLoading={false}
        manualClose={true}
      >
        <Title>{get(groupTask, 'name', '')}</Title>
        <SubContainer>
          <SubTitle>{'Người quản trị giai đoạn'}</SubTitle>
          <UserList>
            {get(groupTask, 'users', []).map((user, index) => (
              <User key={index}>
                <CustomAvatar 
                  alt={'avatar'}
                  src={get(user, 'avatar', '')}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
                <span>{get(user, 'name', '')}</span>
              </User>
            ))}
          </UserList>
        </SubContainer>
        <SubContainer>
          <SubTitle>{'Nguyên tắc giao việc tự động trong giai đoạn'}</SubTitle>
          <CustomSelect
            options={assignOptions}
            value={assign}
            onChange={newAssign => setAssign(newAssign)}
          /> 
          <UserList>
            {get(groupTask, 'users', []).map((user, index) => (
              <User key={index}>
                <CustomAvatar 
                  alt={'avatar'}
                  src={get(user, 'avatar', '')}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
                <span>{get(user, 'name', '')}</span>
              </User>
            ))}
          </UserList>
        </SubContainer>
        <SubContainer>
          <SubTitle>{'Nguyên tắc chọn giai đoạn'}</SubTitle>
          <CustomSelect
            options={changeOptions}
            value={change}
            onChange={newChange => setChange(newChange)}
          />
        </SubContainer>
      </CustomModal>
    </React.Fragment>
  )
}

export default StageSetting;
