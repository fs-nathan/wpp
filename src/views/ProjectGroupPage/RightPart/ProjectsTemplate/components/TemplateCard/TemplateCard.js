import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import React from "react";
import "./index.scss";
import { useHistory } from "react-router-dom";

const TemplateCard = ({ template, isEmpty }) => {
  const history = useHistory();

  function onTemplateClick() {
    history.push("/projects/template/" + template.id);
  }
  function onAddNewClick() {
    history.push("/projects/add-new/");
  }

  if (isEmpty) {
    return (
      <Card
        sx={{
          position: "relative",
          // width: 345,
          width: "100%",
          height: 194,
          boxShadow: "none",
          border: "none",
          backgroundColor: "#ebebeb",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="template-card"
        onClick={onAddNewClick}
      >
        <Typography variant="body1" color="text.secondary" fontSize={18}>
          Bắt đầu với bảng trống
        </Typography>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        position: "relative",
        // width: 345,
        width: "100%",

        boxShadow: "none",
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
      }}
      className="template-card"
      onClick={onTemplateClick}
    >
      <CardMedia component="img" height="194" image={template.banner} />
      <Avatar
        alt={template.user_share_name}
        src={template.user_share_avatar}
        sx={{
          width: 56,
          height: 56,
          border: "2px solid white",
          marginTop: "-30px",
          marginLeft: "20px",
        }}
      />
      <CardContent sx={{ padding: "16px 0" }}>
        <Typography variant="h6" color="#172B4D" mb={2} fontSize="14px">
          {template.name}
        </Typography>
        <Typography
          variant="body2"
          color="#6B778C"
          mb={1}
          fontSize="12px"
          lineHeight={1.5}
        >
          Chia sẻ bởi @{template.user_share_name}
        </Typography>
        <div
          style={{
            color: "#172B4D",
            marginBottom: "16px",
            lineHeight: 1.5,
            fontSize: "12px",
          }}
          dangerouslySetInnerHTML={{ __html: template.description }}
        ></div>
        <div className="template-card__action">
          <div className="template-card__action__copied">
            <ContentCopyRoundedIcon />
            <Typography variant="body2" color="text.secondary">
              {template.total_use}
            </Typography>
          </div>
          <div className="template-card__action__views">
            <RemoveRedEyeIcon />
            <Typography variant="body2" color="text.secondary">
              {template.total_view}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
