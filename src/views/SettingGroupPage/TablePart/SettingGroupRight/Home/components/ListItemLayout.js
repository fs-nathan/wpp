import { Grid, Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { Stack } from "./Stack";
const Title = styled((props) => <Typography noWrap {...props} />)`
  font-size: 15px;
  font-weight: bold;
`;
const SubTitle = styled((props) => <Typography noWrap {...props} />)`
  font-size: 15px;
  color: #8d8d8d;
`;
function ListItemLayout({ title, children, left, right, avatar, actions, subTitle }) {
  return (
    <Grid
      flex="1"
      item
      zeroMinWidth
      alignItems="center"
      container
      wrap="nowrap"
      spacing={1}
    >
      {left && <Grid item>{left}</Grid>}
      <Grid item container alignItems="center" xs zeroMinWidth>
        {children}
        <Stack space={"2px"}>
          <Title>{title}</Title>
          {subTitle && <SubTitle>{subTitle}</SubTitle>}
        </Stack>
      </Grid>
      {actions && <Grid item>{actions}</Grid>}
    </Grid>
  );
}

export default ListItemLayout;
