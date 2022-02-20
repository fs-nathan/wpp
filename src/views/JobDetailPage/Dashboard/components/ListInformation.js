import { apiService } from "constants/axiosInstance";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CardInfo from "./CardInfo";

const ListInformation = ({ list = [] }) => {
  const { projectId } = useParams();
  const [data, setData] = useState(list);
  const [isHideAddLink, setIsHideAddLink] = useState(false);

  React.useEffect(() => {
    setData(list || []);
  }, [list]);

  const _handleAdd = () => {
    setData((data) => [
      ...data,
      { title: "", description: "", isNewData: true },
    ]);
    setIsHideAddLink(true);
  };

  const _handleCloseAdd = () => {
    setIsHideAddLink(false);
    setData((data) => [...data].filter((item) => !item.isNewData));
  };

  const _handleSubmit = (valueSubmit, isNewData) => {
    if (isNewData) return _handleSubmitAdd(valueSubmit);
    _handleSubmitUpdate(valueSubmit);
  };

  const _handleSubmitAdd = async (valueSubmit) => {
    const result = await apiService({
      url: "/project/create-more-data",
      method: "POST",
      data: { ...valueSubmit, project_id: projectId },
    });

    setData((data) => {
      const removedNewBox = data.filter((item) => !item.isNewData);
      return [...removedNewBox, result.data.data];
    });

    setIsHideAddLink(false);
  };

  const _handleSubmitUpdate = async (valueSubmit) => {
    const result = await apiService({
      url: "/project/update-more-data",
      method: "POST",
      data: { ...valueSubmit, project_id: projectId },
    });

    setData((data) => {
      return data.map((item) => {
        if (item.id === valueSubmit.data_id)
          return { ...item, ...result.data.data };
        return item;
      });
    });

    setIsHideAddLink(false);
  };

  return (
    <>
      {data.map((item, index) => (
        <CardInfo
          key={index}
          {...item}
          onCloseAdd={_handleCloseAdd}
          onSubmit={_handleSubmit}
        />
      ))}
      {!data.length && <p style={{ textAlign: "center" }}>No Data</p>}
      {!isHideAddLink && (
        <AddInformation onClick={_handleAdd}>+ Thêm thông tin</AddInformation>
      )}
    </>
  );
};

const AddInformation = styled.div`
  display: flex;
  align-items: center;
  color: #878787;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
`;

export default ListInformation;
