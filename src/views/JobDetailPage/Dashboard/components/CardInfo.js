import { Typography } from "@material-ui/core";
import ClearIcon from "@mui/icons-material/Clear";
import { Card, CardContent } from "@mui/material";
import Avatar from "components/CustomAvatar";
import React from "react";
import styled from "styled-components";
import TextWithEdit from "./TextWithEdit";

const CardInfo = ({ title, description, isNewData = false, onCloseAdd }) => {
  const _handleClear = () => {
    if (isNewData) onCloseAdd();
  };
  return (
    <StyledCard style={{ marginBottom: 15 }}>
      <CardContent style={{ position: "relative" }}>
        <WrapperTitle>
          <TextWithEdit
            variant="h5"
            isTitle
            defaultValue={title}
            isNewData={isNewData}
            placeholder={"Nhập tiêu đề..."}
            styleTitle={{
              fontWeight: 500,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "calc(100% - 25px)",
              margin: 0,
            }}
            styleInput={{
              height: "28px",
              margin: "0",
              border: "0",
              outline: "none",
              fontSize: "1.5rem",
              fontWeight: "500",
            }}
          />
          <div
            className="wp-wrapper-button"
            style={{ marginRight: -10, color: "#878787" }}
            onClick={_handleClear}
          >
            <ClearIcon />
          </div>
        </WrapperTitle>

        <TextWithEdit
          variant="p"
          placeholder="Nhập nội dung"
          defaultValue={description}
          isNewData={isNewData}
          styleTitle={{ fontWeight: 400, fontSize: "1.2rem" }}
          styleInput={{
            height: "28px",
            margin: "0",
            border: "0",
            outline: "none",
            fontWeight: 400,
            fontSize: "1.2rem",
          }}
        />

        <WrapperFooter>
          <Avatar alt="Logo" style={{ width: 20, height: 20 }} />
          <Typography
            variant="p"
            component="div"
            style={{ fontWeight: 500, color: "#878787", marginLeft: 10 }}
          >
            Nguyễn Hữu Thành tạo lúc 12:30 ngày 12/08/2021
          </Typography>
        </WrapperFooter>
      </CardContent>
    </StyledCard>
  );
};

const WrapperTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StyledCard = styled(Card)`
  .wp-wrapper-button {
    visibility: hidden;
  }
  &:hover .wp-wrapper-button {
    visibility: visible;
  }
`;

const WrapperFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export default CardInfo;
