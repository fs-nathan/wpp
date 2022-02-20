import { Typography } from "@material-ui/core";
import ClearIcon from "@mui/icons-material/Clear";
import { Card, CardContent } from "@mui/material";
import Avatar from "components/CustomAvatar";
import React, { useRef } from "react";
import styled from "styled-components";
import TextWithEdit from "./TextWithEdit";

const CardInfo = ({
  id,
  title,
  content,
  user_modify_name,
  user_modify_avatar,
  isNewData = false,
  onCloseAdd = () => {},
  onSubmit = () => {},
}) => {
  const refForm = useRef(null);

  const _handleClear = () => {
    if (isNewData) onCloseAdd();
  };

  const _handleSubmit = () => {
    const dataSubmit = {};
    const elements = refForm.current.elements;

    if (id) dataSubmit["data_id"] = id;
    for (let index = 0; index < elements.length; index++) {
      const { name, value, type } = elements[index];
      if (type === "text") dataSubmit[name] = value;
    }

    onSubmit(dataSubmit, isNewData);
  };

  return (
    <StyledCard style={{ marginBottom: 15 }}>
      <CardContent style={{ position: "relative" }}>
        <form ref={refForm}>
          <WrapperTitle>
            <TextWithEdit
              variant="h5"
              isTitle
              name="title"
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
              onSubmit={_handleSubmit}
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
            name="content"
            defaultValue={content}
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
            onSubmit={_handleSubmit}
          />

          {!isNewData && (
            <WrapperFooter>
              <Avatar
                srcSet={user_modify_avatar}
                alt="Logo"
                style={{ width: 20, height: 20 }}
              />
              <Typography
                variant="p"
                component="div"
                style={{ fontWeight: 500, color: "#878787", marginLeft: 10 }}
              >
                {user_modify_name}
              </Typography>
            </WrapperFooter>
          )}
        </form>
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
