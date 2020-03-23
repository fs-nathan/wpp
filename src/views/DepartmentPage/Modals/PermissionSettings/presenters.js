import React from 'react';
import { 
  Typography, Table, TableHead, TableRow, TableBody, TableCell, Tabs, Tab
} from '@material-ui/core';
import { mdiKey } from '@mdi/js';
import Icon from '@mdi/react';
import CustomModal from '../../../../components/CustomModal';
import './style.scss';

const Container = ({ className = '', ...props }) =>
  <div 
    className={`view_Department_Permission_Modal___container ${className}`}
    {...props}
  />

const PermissionBoxContainer = ({ className = '', ...props }) =>
  <div 
    className={`view_Department_Permission_Modal___boxes-container ${className}`}
    {...props}
  />

const PermissionBox = React.forwardRef(
  function PermissionBoxTab(props, ref) {
    const { className, children, ...rest } = props;
    return (
      <div 
        className={`view_Department_Permission_Modal___box ${className}`}
        {...rest}
        ref={ref}
      >
        {children[0]}
      </div>
    );
  }
)

function PermissionBoxes({ permissions }) {

  const [current, setCurrent] = React.useState(0)

  return (
    <PermissionBoxContainer>
      <Tabs 
        value={current}
        onChange={(evt, newValue) => setCurrent(newValue)}
      >
        {permissions.map((permission, index) => (
          <Tab 
            key={index}
            component={PermissionBox}
            label={permission.name}
          />
        ))}
      </Tabs>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell width='10%'></TableCell>
            <TableCell width='30%'>Tên quyền</TableCell>
            <TableCell width='60%'>Mô tả</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {permissions[current].rights.map((right, index) => (
            <TableRow key={index}>
              <TableCell>
                <Icon path={mdiKey} size={1} />
              </TableCell>
              <TableCell>{right.name}</TableCell>
              <TableCell>{right.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PermissionBoxContainer>
  )
}

function PermissionSettings({ open, setOpen }) {

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title='Phân quyền thành viên'
      height='tall'
    >
      <Container>
        <Typography variant='h4'>Chọn nhóm quyền</Typography>
        <span>Mỗi nhóm quyền bao gồm một số quyền. Nhóm quyền do chủ sở hữu hoặc người được phân quyền tạo lập.</span>
        <br/>
        <span>Nếu không có nhóm quyền phù hợp, hãy liên hệ Chủ sở hữu để thiết lập nhóm quyền mới.</span>
        <PermissionBoxes 
          permissions={[{
            name: 'Permission A',
            rights: [{
              name: 'Right 1',
              description: 'Description 1',
            }, {
              name: 'Right 3',
              description: 'Description 3',
            }]
          }, {
            name: 'Permission B',
            rights: [{
              name: 'Right 2',
              description: 'Description 2',
            }]
          }]}
        />
      </Container>
    </CustomModal>
  )
}

export default PermissionSettings;
