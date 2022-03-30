import React from "react";
import "./UpgradeAccount.scss";
import CheckIcon from "@mui/icons-material/Check";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import colorPal from "helpers/colorPalette";
import { darken } from "@material-ui/core/styles";
import { useHistory, withRouter } from "react-router-dom";
import { Routes } from "constants/routes";

export const StyledButton = styled(Button)`
  background-color: ${colorPal["blue"][0]};
  color: #fff;
  padding: 12px 30px;
  &:hover {
    background-color: ${darken(colorPal["blue"][0], 0.1)};
  }
`;

function CardItem(props) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="--card-title">{props.title}</h2>
        <p className="--card-content">
          {props.customSubTitle ? (
            <>
              <props.subTitle />
            </>
          ) : (
            <>{props.subTitle}</>
          )}
        </p>
      </div>
      <div className="card-body">
        {props.checkList.map((item) => {
          return (
            <div className="card-body-content-list">
              <div>
                <CheckIcon
                  sx={{ color: `${item.check ? "#2E70E7" : "#E83C52"}` }}
                />
              </div>
              <p>{item.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function UpgradeAccount() {
  const history = useHistory();

  const UPGRADE_ACCOUNT = [
    {
      title: "Miễn Phí",
      subTitle:
        "Phù hợp cho doanh nghiệp đội nhóm, cá nhân bước đầu chuyển đối số",
      customSubTitle: false,
      checkList: [
        { title: "Toàn bộ tính năng có trên Workplus", check: true },
        { title: "Không hạn chế thời gian sử dụng", check: true },
        {
          title: "Không hạn chế số lượng người dùng tham gia nhóm",
          check: true,
        },
        {
          title: "Không hạn chế số lượng công việc trong mỗi bảng việc",
          check: true,
        },
        { title: "Không hạn chế số bảng việc", check: true },
        { title: "Lưu trữ tối đa 3GB/nhóm", check: false },
      ],
    },
    {
      title: "Professional",
      subTitle: () => {
        return (
          <>
            <p className="card-content-value">55.0000</p>
            <p className="card-content-user">vnđ/người dùng/tháng</p>
            <StyledButton
              size="large"
              onClick={() => history.push(Routes.SETTING_GROUP_CREATE_ORDER)}
            >
              Bắt đầu
            </StyledButton>
          </>
        );
      },
      customSubTitle: true,
      checkList: [
        { title: "Toàn bộ tính năng có trên Workplus", check: true },
        { title: "Không hạn chế thời gian sử dụng", check: true },
        {
          title: "Không hạn chế số lượng người dùng tham gia nhóm",
          check: true,
        },
        {
          title: "Không hạn chế số lượng công việc trong mỗi bảng việc",
          check: true,
        },
        { title: "Không hạn chế số bảng việc", check: true },
        { title: "Lưu trữ tối đa 1GB/người dùng", check: true },
      ],
    },
  ];

  return (
    <div className="upgrade-account-container">
      {UPGRADE_ACCOUNT.map((item) => {
        return <CardItem {...item} />;
      })}
    </div>
  );
}

export default withRouter(UpgradeAccount);
