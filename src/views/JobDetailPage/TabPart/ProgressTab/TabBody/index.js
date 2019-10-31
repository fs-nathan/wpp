import React from 'react';
import styled from 'styled-components';
import { Avatar, Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import ProgressBar from '../../../../../components/ProgressBar';
import colorPal from '../../../../../helpers/colorPalette';
import avatar from '../../../../../assets/avatar.jpg';

const Container = styled.div`
  padding: 10px 0;

  & > *:not(last-child) {
    margin-top: 30px;
  }
  & > hr {
    border-color: rgba(0, 0, 0, .1);
  }
`;

const StartEndDateBox = styled.div`
  padding: 8px 0 0 0;
  display: flex;
  align-items: center;
  & > *:first-child {
    margin-right: auto;
  }
  & > *:last-child {
    margin-left: auto;
  }
`;

const StartDateBox = styled.div`
  text-align: left;
  margin-left: 20px;
`;

const EndDateBox = styled.div`
  text-align: right;
  margin-right: 20px;
`;

const BlueTableCell = styled(TableCell)`
  color: ${colorPal['blue'][0]};
`;

const RedTableCell = styled.p`
  color: ${colorPal['red'][0]}
  padding: 0;
  margin: 0;
  border: 0;
  font-size: 11px
`
const CellAvatar = styled(TableCell)`
  padding-left: 0;
`

const TypoTitle = styled(ColorTypo)`
  color: ${colorPal['gray'][0]};
  margin-left: 20px;
`
const Progress  = styled(ProgressBar)`
  margin: 0 20px 85px 20px;
`
const TableHistory = styled(Table)`
  margin-left: 20px;
  border-bottom-style: dashed;
  & > *:first-child {
    border-bottom-style: dashed;
  }
`

const TableRowItem = styled(TableRow)`
  border-bottom-style: dashed;
`

function TabBody() {
  return (
    <Container>
      <StartEndDateBox>
        <StartDateBox>
          <ColorTypo>08:30</ColorTypo>
          <ColorTypo>10/06/2019</ColorTypo>
        </StartDateBox>
        <EndDateBox>
          <ColorTypo>08:30</ColorTypo>
          <ColorTypo>10/06/2019</ColorTypo>
        </EndDateBox>
      </StartEndDateBox>
      <Progress percentDone={28} percentTarget={70} colorDone={colorPal['green'][0]} colorTarget={colorPal['orange'][0]}  />
      <Typography style={{ marginBottom: 50}} />
      <hr />
      <TypoTitle bold variant='subtitle1' >Lịch sử điều chỉnh tiến độ</TypoTitle>
      <TableHistory style={{ marginLeft: 20, marginRight: 20, borderBottomStyle: "dashed"}}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Lần thứ</TableCell>
            <TableCell>Nội dung điều chỉnh</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRowItem>
            <CellAvatar>
              <Avatar style={{ width: 30, height: 30 }} src={avatar} alt='avatar' />
            </CellAvatar>
            <TableCell>
              Lần 1
              <RedTableCell>18:30 - 29/09/2019</RedTableCell>
            </TableCell>
            <BlueTableCell>
              Bắt đầu: 08:30 - 09/09/2019
              <br/>
              Kết thúc: 18:30 - 29/09/2019
            </BlueTableCell>
          </TableRowItem>
          <TableRowItem>
            <CellAvatar>
              <Avatar style={{ width: 30, height: 30 }} src={avatar} alt='avatar' />
            </CellAvatar>
            <TableCell>
              Lần 2
              <RedTableCell>18:30 - 29/09/2019</RedTableCell>
            </TableCell>
            <BlueTableCell>
              Bắt đầu: 08:30 - 09/09/2019
            </BlueTableCell>
          </TableRowItem>
          <TableRowItem>
            <CellAvatar>
              <Avatar style={{ width: 30, height: 30 }} src={avatar} alt='avatar' />
            </CellAvatar>
            <TableCell>
              Lần 3
              <RedTableCell>18:30 - 29/09/2019</RedTableCell>
            </TableCell>
            <BlueTableCell>
              Kết thúc: 18:30 - 29/09/2019
            </BlueTableCell>
          </TableRowItem>
        </TableBody>
      </TableHistory>
    </Container>
  )
}

export default TabBody;
