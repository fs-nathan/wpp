import { Avatar, Box } from "@material-ui/core";
import colors from "helpers/colorPalette";
import React from "react";
import styled from "styled-components";
import QuickView from "../Layout/QuickView";
import InlineStatusBadge from "./InlineStatusBadge";
export const QuickViewTaskDetailHeaderWrap = styled.div`
  display: flex;
`;
export const QuickViewTaskDetailTitle = styled.div`
  flex: 1;
  padding: 0 1em;
`;
export const QuickViewTaskDetailHeader = ({ avatar, title }) => {
  return (
    <Box display="flex" alignItems="center">
      <Avatar
        style={{ marginRight: "15px", width: 60, height: 60 }}
        src={avatar}
      ></Avatar>
      <Box display="flex" flexDirection="column">
        <Box fontSize="15px" fontWeight="450">
          Thành nguyễn
        </Box>
        <Box fontSize="13px" marginTop="1px" color={colors.blue[0]}>
          Chuyên viên - Thực hiện
        </Box>
        <Box fontSize="13px" marginTop="0.6em" color={colors.gray[0]}>
          Đã được giao ngày 05/02/2020
        </Box>
      </Box>
    </Box>
  );
};
function QuickViewTaskDetail({ avatar, user_name }) {
  return (
    <QuickView title={<QuickViewTaskDetailHeader />}>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column" color={colors.gray[0]}>
          TÊN CÔNG VIỆC
        </Box>
        <Box marginTop="0.6em" fontSize="15px" fontWeight="450">
          Hiệu chỉnh kịch bản
        </Box>
      </Box>
      <Box marginTop="2em" display="block">
        <Box display="flex" flexDirection="column" color={colors.gray[0]}>
          MÔ TẢ CÔNG VIỆC
        </Box>
        <Box
          fontWeight="450"
          lineHeight="1.4"
          fontSize="14px"
          marginTop="0.6em"
        >
          Chỉnh sửa chi tiết kịch bản trước khi lên hình.
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        marginTop="2em"
        display="block"
      >
        <Box color={colors.gray[0]}>TIẾN ĐỘ</Box>
        <Box
          fontSize="14px"
          display="flex"
          flexDirection="column"
          marginTop="0.6em"
        >
          <Box fontWeight="450" fontSize="14px">
            Ngày bắt đầu: 08:30 12/02/2020
          </Box>
          <Box fontWeight="450" marginTop="0.5em" fontSize="14px">
            Ngày kết thúc: 08:30 12/02/2020
          </Box>
          <Box fontWeight="450" marginTop="0.5em" fontSize="14px">
            Hoàn thành: 12%
          </Box>
        </Box>
        <Box marginTop="2em" display="block">
          <Box display="flex" flexDirection="column" color={colors.gray[0]}>
            TRẠNG THÁI, ƯU TIÊN
          </Box>
          <Box marginTop="0.6em" display="flex">
            <InlineStatusBadge status="0">Đang làm</InlineStatusBadge>
            <InlineStatusBadge status="1">Trung bình</InlineStatusBadge>
          </Box>
        </Box>
      </Box>
    </QuickView>
  );
}

export default QuickViewTaskDetail;
