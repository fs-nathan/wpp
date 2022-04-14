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

const TemplateCard = ({ template }) => {
  const history = useHistory();

  function onTemplateClick() {
    history.push("/projects/template/" + template.id);
  }

  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: "none",
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
      }}
      className="template-card"
      onClick={onTemplateClick}
    >
      <CardMedia component="img" height="194" image={template.thumbnail} />
      <Avatar
        alt="Remy Sharp"
        src="/images/avatar.jpeg"
        sx={{
          width: 56,
          height: 56,
          border: "2px solid white",
          marginTop: "-30px",
          marginLeft: "20px",
        }}
      />
      <CardContent>
        <Typography variant="h6" color="black" mb={2}>
          {template.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={1}>
          Chia sẻ bởi @{template.author}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {template.description}
        </Typography>
        <div className="template-card__action">
          <div className="template-card__action__copied">
            <ContentCopyRoundedIcon />
            <Typography variant="body2" color="text.secondary">
              {template.copied}
            </Typography>
          </div>
          <div className="template-card__action__views">
            <RemoveRedEyeIcon />
            <Typography variant="body2" color="text.secondary">
              {template.views}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
