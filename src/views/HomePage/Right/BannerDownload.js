import React from "react";
import url from "socket.io-client/lib/url";
import styled from "styled-components";
import bannerdownload from "assets/home_baner_right2.png";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const BannerDownloadContainer = styled.div`
  width: 100%;
  height: 20vh;
  background-repeat: no-repeat;
  background-position: center center, center top;
  background-size: cover;
  border-radius: 5px;
  background-image: url(${bannerdownload});
  position: relative;
  cursor: pointer;
  p {
    position: absolute;
    top: 0vh;
    left: 3vh;
    color: #fff;
    font-size: 2vh;
    width: 30vh;
    height: 50vh;
  }
`;

function BannerDownload() {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <BannerDownloadContainer
      onClick={() => window.open("https://workplus.vn/mobile-app/", "_blank")}
    >
      <p
        dangerouslySetInnerHTML={{
          __html: t("Tải app Workplus <br>dành cho điện thoại"),
        }}
      ></p>
    </BannerDownloadContainer>
  );
}

export default BannerDownload;
