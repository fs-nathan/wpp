import React, { useContext } from "react";
import Block from "views/JobPage/views/Overview/Block";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import GroupDetailContext from "../GroupDetailContext";

function Middle() {
  const { cover } = useContext(GroupDetailContext);
  return (
    <Stack>
      <Block title="Bảng tin nội bộ"></Block>
      <Block title="Tạo bài viết"></Block>
      <Block title="Timeline"></Block>
    </Stack>
  );
}

export default Middle;
