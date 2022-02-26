import AddIcon from "@mui/icons-material/Add";
import AvatarCircleList from "components/AvatarCircleList";
import { get } from "lodash";
import React from "react";
import styled from "styled-components";
import MembersSettingModal from "views/ProjectPage/Modals/MembersSetting";

const ColumnMembers = ({ value = [], dataCell }) => {
  const [isOpenAddModal, setIsOpenAddModal] = React.useState(false);

  return (
    <>
      <AvatarCircleList
        users={value.map((member) => ({
          name: get(member, "name"),
          avatar: get(member, "avatar"),
        }))}
        display={3}
      />

      <WrapperCircle
        className="icon_add"
        onClick={() => setIsOpenAddModal(true)}
      >
        <AddIcon />
      </WrapperCircle>

      <MembersSettingModal
        open={isOpenAddModal}
        setOpen={setIsOpenAddModal}
        project_id={dataCell.id}
      />
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
