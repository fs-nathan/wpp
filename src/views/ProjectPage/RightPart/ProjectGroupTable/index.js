import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import {
  mdiDownload,
  mdiFilterOutline,
  mdiCalendar,
} from '@mdi/js';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import CustomTable from '../../../../components/CustomTable';
import ColorTypo from '../../../../components/ColorTypo';
import ColorButton from '../../../../components/ColorButton';

const Container = styled.div`
  grid-area: table;
`;

function ProjectsTable({ expand, handleExpand }) {
  return (
    <Container>
      <CustomTable
        options={{
          title: 'Tất cả',
          subTitle: '',
          subActions: [{
            label: 'Hoạt động',
            iconPath: mdiFilterOutline,
            onClick: () => null,
          }, {
            label: 'Tải xuống',
            iconPath: mdiDownload,
            onClick: () => null,
          }, {
            label: 'Năm 2019',
            iconPath: mdiCalendar,
            onClick: () => null,
          }],
          mainAction: {
            label: '+ Tạo dự án',
            onClick: () => null,  
          },
          expand: {
            bool: expand,
            toggleExpand: () => handleExpand(!expand),
          },
          moreMenu: [{
            label: 'Cài đặt bảng',
            onClick: () => null,
          }, {
            label: 'Thùng rác',
            onClick: () => null,
          }],
          grouped: {
            bool: false,
          },
          draggable: {
            bool: true,
            onDragEnd: result => {
              return;
            }, 
          },
        }}
        columns={[{
          label: '',
          field: (row) => null,
        }, {
          label: 'Dự án',
          field: 'name',
        }, {
          label: 'Trạng thái',
          field: 'position',
        }, {
          label: 'Hoàn thành',
          field: (row) => null,
        }, {
          label: 'Tiến độ',
          field: 'gender',
        }, {
          label: 'Ưu tiên',
          field: 'email',
        }, {
          label: 'Người dùng',
          field: 'phone',
        }, {
          label: 'Cài đặt',
          field: 'role',
        }]}
        data={[]}
      />
    </Container>
  )
}

export default ProjectsTable;
