import { mdiContentCopy, mdiNotePlusOutline } from '@mdi/js';
import Icon from '@mdi/react';
import CustomModal from 'components/CustomModal';
import { isNil } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import CopyGroupTask from '../CopyGroupTask';
import CreateNewGroupTask from '../CreateNewGroupTask';
import { currentColorSelector } from 'views/Chat/selectors';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import './style.scss';

const StyledDiv = styled.div`
  .btn-create-new-group-task:hover {
    border-color: ${props => props.appColor}!important;
    cursor: pointer;
  }
  .btn-create-new-group-task:hover span.step-title {
    color: ${props => props.appColor}!important;
  }
`

const Container = ({ className = '', ...props }) =>
  <div
    className={`view_Project_CreateGroup_Modal___container ${className}`}
    {...props}
  />;

const ButtonCase = ({ className = '', ...props }) =>
  <div
    className={`${className}`}
    {...props}
  />;

function CreateGroupTask({ fetchChart, open, setOpen, project_id = null }) {
  const [createNew, setCreateNew] = React.useState(false);
  const [copy, setCopy] = React.useState(false);
  const { t } = useTranslation();
  const { projectId: _projectId } = useParams();
  const [projectId, setProjectId] = React.useState(_projectId);
  const appColor = useSelector(currentColorSelector)

  React.useEffect(() => {
    setProjectId(isNil(project_id) ? _projectId : project_id);
  }, [project_id, _projectId]);

  return (
    <>
      <CustomModal
        title={t("DMH.VIEW.PP.MODAL.CREATE.TITLE")}
        open={open}
        setOpen={setOpen}
        confirmRender={null}
        height='short'
        className={'view_Project_CreateGroup_Modal___modal'}
      >
        <StyledDiv appColor={appColor}>
          <Container>
            <ButtonCase
              className={'view_Project_CreateGroup_Modal___button-new btn-create-new-group-task'}
              onClick={evt => {
                setCreateNew(true);
                setCopy(false);
                setOpen(false);
              }}>
              <div>
                <Icon path={mdiNotePlusOutline} size={2} />
              </div>
              <div>
                <span className="step-title">{t("DMH.VIEW.PP.MODAL.CREATE.CREATE.LABEL")}</span>
                <span>{t("DMH.VIEW.PP.MODAL.CREATE.CREATE.DESC")}</span>
              </div>
            </ButtonCase>
            <ButtonCase
              className={'view_Project_CreateGroup_Modal___button-copy btn-create-new-group-task'}
              onClick={evt => {
                setCreateNew(false);
                setCopy(true);
                setOpen(false);
              }}>
              <div>
                <Icon path={mdiContentCopy} size={2} />
              </div>
              <div>
                <span className="step-title">{t("DMH.VIEW.PP.MODAL.CREATE.COPY.LABEL")}</span>
                <span>{t("DMH.VIEW.PP.MODAL.CREATE.COPY.DESC")}</span>
              </div>
            </ButtonCase>
          </Container>
        </StyledDiv>
      </CustomModal>
      <CreateNewGroupTask open={createNew} setOpenModal={setOpen} setOpen={setCreateNew} project_id={projectId} />
      <CopyGroupTask fetchChart={fetchChart} open={copy} setOpen={setCopy} project_id={projectId} />
    </>
  )
}

export default CreateGroupTask;
