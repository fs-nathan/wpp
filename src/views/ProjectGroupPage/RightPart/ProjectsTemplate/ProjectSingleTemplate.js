import { Avatar, Breadcrumbs, Button, Link, Typography } from "@mui/material";
import { DETAIL_TEMPLATE } from "mocks/detail-template";
import React from "react";
import { useHistory } from "react-router-dom";
import SearchBar from "./components/SearchBar/SearchBar";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "./index.scss";

const ProjectSingleTemplate = () => {
  const history = useHistory();
  function handleClick() {}

  return (
    <div className="project-single-template__wrapper">
      <div className="project-single-template">
        <div className="project-single-template__header">
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/projects/template">
                Thư viện mẫu
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href={`/projects/group/{DETAIL_TEMPLATE.parent}`}
              >
                {DETAIL_TEMPLATE.parent}
              </Link>
              <Typography color="text.primary">
                {DETAIL_TEMPLATE.title}
              </Typography>
            </Breadcrumbs>
          </div>
          <div style={{ width: 300 }}>
            <SearchBar />
          </div>
        </div>

        <div className="project-single-template__overview">
          <div className="project-single-template__overview__avatar">
            <Avatar
              alt="Remy Sharp"
              src="/images/avatar.jpeg"
              sx={{
                width: 72,
                height: 72,
                border: "2px solid white",
              }}
            />
          </div>
          <div className="project-single-template__overview__info">
            <Typography variant="h5" color="black">
              {DETAIL_TEMPLATE.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Chia sẻ bởi @{DETAIL_TEMPLATE.author}
            </Typography>
            <div className="action">
              <div className="copied">
                <ContentCopyRoundedIcon />
                <Typography variant="body2" color="text.secondary">
                  {DETAIL_TEMPLATE.copied} lần sao chép
                </Typography>
              </div>
              <div className="views">
                <RemoveRedEyeIcon />

                <Typography variant="body2" color="text.secondary">
                  {DETAIL_TEMPLATE.views} lượt xem
                </Typography>
              </div>
            </div>
          </div>
          <div className="project-single-template__overview__action">
            <div>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#e7e9ec",
                  color: "red",
                  "&:hover": {
                    backgroundColor: "#e7e9ec",
                  },
                }}
              >
                Huỷ chia sẻ
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                color="info"
                sx={{
                  backgroundColor: "#e7e9ec",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#e7e9ec",
                  },
                }}
              >
                Giới thiệu
              </Button>
            </div>
            <div>
              <Button variant="contained" color="primary">
                Sử dụng mẫu
              </Button>
            </div>
          </div>
        </div>

        <div className="project-single-template__description">
          <Typography variant="h5" color="black">
            Về mẫu này
          </Typography>
          <div
            dangerouslySetInnerHTML={{ __html: DETAIL_TEMPLATE.description }}
          ></div>
          <Typography variant="h6" color="black">
            <Link href="#" variant="h6" color="inherit" underline="always">
              Xem mẫu
            </Link>
          </Typography>
          <div>
            <Typography variant="h6" color="black ">
              <Link href="#" color="inherit" variant="h6" underline="always">
                Sử dụng mẫu
              </Link>{" "}
              hoặc{" "}
              <Link href="#" variant="h6" color="inherit" underline="always">
                Bắt đầu với bảng trống
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSingleTemplate;
