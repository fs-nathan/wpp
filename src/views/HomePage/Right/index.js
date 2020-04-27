import React, { useContext } from "react";
import Block from "views/JobPage/views/Overview/Block";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import GroupDetailContext from "../GroupDetailContext";

function Right() {
  const { cover } = useContext(GroupDetailContext);
  return (
    <Stack>
      <Block title="Lịch tuần"></Block>
      <Block title="Tim nổi bật"></Block>
      <Block title="Thống kê"></Block>
    </Stack>
  );
}

export default Right;
