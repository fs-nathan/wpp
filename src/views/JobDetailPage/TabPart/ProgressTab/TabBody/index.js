import React from 'react';
import styled from 'styled-components';
import { Avatar, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import ProgressBar from '../../../../../components/ProgressBar';
import colorPal from '../../../../../helpers/colorPalette';
import avatar from '../../../../../assets/avatar.jpg';

const Container = styled.div`
  padding: 10px 0;
  & > *:not(last-child) {
    margin-top: 10px;
  }
  & > hr {
    border-color: rgba(0, 0, 0, .1);
  }
`;

const StartEndDateBox = styled.div`
  padding: 8px 0;
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
`;

const EndDateBox = styled.div`
  text-align: right;
`;

const BlueTableCell = styled(TableCell)`
  color: ${colorPal['blue'][0]};
`;

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
      <ProgressBar percentDone={28} percentTarget={70} colorDone={colorPal['green'][0]} colorTarget={colorPal['orange'][0]} />
      <hr />
      <ColorTypo bold variant='subtitle1'>Lịch sử điều chỉnh tiến độ</ColorTypo>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Lần thứ</TableCell>
            <TableCell>Nội dung điều chỉnh</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Avatar style={{ width: 30, height: 30 }} src={avatar} alt='avatar' />
            </TableCell>
            <TableCell>
              Lần 1
            </TableCell>
            <BlueTableCell>
              Bắt đầu: 08:30 - 09/09/2019
              <br/>
              Kết thúc: 18:30 - 29/09/2019
            </BlueTableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Avatar style={{ width: 30, height: 30 }} src={avatar} alt='avatar' />
            </TableCell>
            <TableCell>
              Lần 2
            </TableCell>
            <BlueTableCell>
              Bắt đầu: 08:30 - 09/09/2019
            </BlueTableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Avatar style={{ width: 30, height: 30 }} src={avatar} alt='avatar' />
            </TableCell>
            <TableCell>
              Lần 3
            </TableCell>
            <BlueTableCell>
              Kết thúc: 18:30 - 29/09/2019
            </BlueTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  )
}

export default TabBody;
