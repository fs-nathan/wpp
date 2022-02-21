import { Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import ListInformation from "./ListInformation";
import { apiService } from "constants/axiosInstance.js";
import { useParams } from "react-router-dom";

const RightPart = ({ handleOpenModal = () => {} }) => {
  const { projectId } = useParams();
  const [moreData, setMoreData] = React.useState([]);

  React.useEffect(() => {
    const _getMoreData = async (data) => {
      const result = await apiService({
        url: "/project/get-list-more-data",
        method: "get",
        params: { project_id: projectId },
      });

      setMoreData(result.data.data);
    };

    _getMoreData();
  }, [projectId]);

  return (
    <WrapperRightPart>
      <Title variant="h5" component="div" style={{ fontSize: 20 }}>
        Thông tin bổ sung
      </Title>
      <ListInformation list={moreData} />
      <DeleteGroup onClick={() => handleOpenModal("ALERT")}>
        Xoá bảng việc
      </DeleteGroup>
    </WrapperRightPart>
  );
};

const WrapperRightPart = styled.div`
  background-color: #f3f6f7;
  padding: 20px;
  min-height: 100vh;
  height: 100%;
`;

const Title = styled(Typography)`
  color: #878787;
  font-weight: 500;
  margin-bottom: 20px;
  font-size: 18px;
`;

const DeleteGroup = styled.div`
  padding: 1.5rem;
  cursor: pointer;
  border-radius: 5px;
  font-weight: 400;
  font-size: 1.3rem;
  text-align: center;
  margin-top: 30px;
  color: red;
  border: 1px solid red;
`;

export default RightPart;
