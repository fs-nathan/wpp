import AddIcon from "@mui/icons-material/Add";
import {
  chooseTask,
  getMemberNotAssigned,
} from "actions/taskDetail/taskDetailActions";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
import AvatarCircleList from "components/AvatarCircleList";
import { get } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AddMemberModal from "views/JobDetailPage/ListPart/ListHeader/AddMemberModal";
import MembersSettingModal from "views/ProjectPage/Modals/MembersSetting";

const ColumnMembers = ({
  value = [],
  dataCell,
  taskId = null,
  isGetDataUser = false,
}) => {
  const [isOpenAddModal, setIsOpenAddModal] = React.useState(false);
  // const usersList = useSelector(({ userRole }) => userRole.listUserRole.data.userRoles.data);
  const project = useSelector(
    ({ project }) => project.detailProject.data.project
  );
  const dispatch = useDispatch();

  const _handleAddMember = () => {
    setIsOpenAddModal(true);

    if (isGetDataUser) {
      dispatch(chooseTask(taskId));
      dispatch(getMemberNotAssigned({ task_id: taskId }));
    }
  };

  return (
    <>
      <AvatarCircleList
        users={value.map((member) => ({
          name: get(member, "name"),
          avatar: get(member, "avatar"),
        }))}
        display={3}
      />

      <WrapperCircle className="icon_add" onClick={_handleAddMember}>
        <AddIcon />
      </WrapperCircle>

      {isGetDataUser ? (
        <ErrorBoundary>
          <AddMemberModal
            isOpen={isOpenAddModal}
            setOpen={setIsOpenAddModal}
            task_id={taskId}
            projectActive={project.id}
          />
        </ErrorBoundary>
      ) : (
        <MembersSettingModal
          open={isOpenAddModal}
          setOpen={setIsOpenAddModal}
          project_id={dataCell.id}
        />
      )}
    </>
  );
};

const WrapperCircle = styled.div`
  align-items: center;
  border: 1px dashed #6d6e6f;
  border-radius: 50%;
  display: flex;
  fill: #6d6e6f;
  flex-grow: 0;
  flex-shrink: 0;
  height: 20px;
  justify-content: center;
  margin-left: 5px;
  width: 20px;
  cursor: pointer;
  svg {
    width: 13px;
    height: 13px;
    fill: #6d6e6f;
  }
`;

export default ColumnMembers;
