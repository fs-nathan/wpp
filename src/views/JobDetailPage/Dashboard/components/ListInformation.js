import React, { useState } from "react";
import CardInfo from "./CardInfo";
import styled from "styled-components";

const fakeData = [
  {
    title: "Mục tiêu thực hiện",
    description: "Hoàn thành nhanh sản phẩn để tung ra thị trường kịp thời",
  },
  {
    title: "Ngân sách tối đa",
    description: "100 triệu đồng",
  },
];

const ListInformation = () => {
  const [data, setData] = useState(fakeData);
  const [isHideAddLink, setIsHideAddLink] = useState(false);

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

  return (
    <>
      {data.map((item, index) => (
        <CardInfo key={index} {...item} onCloseAdd={_handleCloseAdd} />
      ))}
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
