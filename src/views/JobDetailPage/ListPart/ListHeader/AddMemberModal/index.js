import React from 'react';
import Button from '@material-ui/core/Button';

import SearchInput from 'components/SearchInput';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import DialogWrap from 'components/DialogWrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ProjectMember from './ProjectMember';
import TableMember from './TableMember';

const GridArea = styled(Typography)`
    display: grid;
    grid-template-columns: 1fr 2fr;
    border: 1px solid #e0e0e0;
`
const ButtonAddAll = styled(Button)`
    color: #417cbf;
    margin: 10px 5px;
`

const BorderGrid = styled(Typography)`
    border-right: 1px solid #e0e0e0;
    min-height: 660px;
`
const FlexMemberProject = styled(Typography)` 
    display: flex;
    justify-content: center;
    align-items: center
    height: 60px;
    border-bottom: 1px solid #e0e0e0;
`

const MemberProject = styled(Typography)`
    margin-bottom: 5px;
    color: #686868;
    font-size: 16px;
    text-transform: uppercase;
`
const FlexJobMember = styled(Typography)`
    display: flex;
    align-items: center
    height: 60px;
    border-bottom: 1px solid #e0e0e0;
    padding-left: 25px;
`

function AddMemberModal(props) {
  const { t } = useTranslation()
  const memberNotAssigned = useSelector(state => state.taskDetail.taskMember.memberNotAssigned);

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <DialogWrap
      title={'Thành viên công việc'}
      isOpen={props.isOpen}
      handleClickClose={handleClose}
      successLabel={"Cập nhật"}
      onClickSuccess={handleClose}
      maxWidth="xl"
    >
      <React.Fragment>
        <GridArea component={'div'} style={{ borderBottom: 'none' }} >
          <BorderGrid component={'div'}>
            <FlexMemberProject component={'span'}>
              <MemberProject component={'div'} >Thành viên dự án</MemberProject>
            </FlexMemberProject>
            <Typography component="span">
              <div style={{ margin: '10px 10px 0 10px' }}>
                <SearchInput placeholder='Tìm thành viên' />
              </div>
              <ButtonAddAll
              // onClick={handleAddAll}
              >
                {t('+ Thêm tất cả')}
              </ButtonAddAll>
              <div className="table-scroll-add-member">
                {
                  memberNotAssigned.map((item, key) =>
                    (
                      <ProjectMember avatar={item.avatar} key={item.id}
                        id={item.id}
                        name={item.name} email={item.email}
                        label={item.permission}
                      />
                    )
                  )}
              </div>
            </Typography>
          </BorderGrid>
          <Typography component="div">
            <FlexJobMember component="div">
              <MemberProject component={'div'}>Thành viên công việc</MemberProject>
            </FlexJobMember>
            <TableMember style={{ boxShadow: 'none' }} />
          </Typography>
        </GridArea>
      </React.Fragment>
    </DialogWrap>
  );
}

export default AddMemberModal;