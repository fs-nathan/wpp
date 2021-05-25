import React from 'react';
import { Menu, MenuItem, TableCell, TableRow } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiAccountPlus, mdiDeleteOutline ,mdiDotsVertical } from '@mdi/js';
import { get } from 'lodash';
import EditJobModal, { EDIT_MODE } from 'views/JobDetailPage/ListPart/ListHeader/CreateJobModal';
import AddMemberModal from 'views/JobDetailPage/ListPart/ListHeader/AddMemberModal';
import '../style.scss';
import compact from 'lodash/compact';
import { useSelector,useDispatch } from 'react-redux';
import { deleteTask } from 'actions/task/deleteTask';
import { useTranslation } from 'react-i18next';
import AlertModal from 'components/AlertModal';
import { cancelStopTask, chooseTask, getListGroupTask, getTaskDetailTabPart, pinTaskAction, stopTask, unPinTaskAction } from 'actions/taskDetail/taskDetailActions';
import { listTask } from 'actions/task/listTask';
 
const ListAction = ({ className = '', ...props })=> <div className="comp_CustomTable_list-action" {...props}/>
export const ActionList = ({index,row,group}) => {
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openCreateJobModal, setOpenCreateJobModal] = React.useState(false);
    const [editMode, setEditMode] = React.useState(null);
    const taskId = row?.id;
    const [onload, setOnload] = React.useState(false);
    const taskDetails = useSelector(state => get(state, 'taskDetail.detailTask.taskDetails'));
    let inSearch = false;  
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const detailTask = useSelector(state => state.taskDetail.detailTask.taskDetails);
    const {
      update_task,
      delete_task,
      stop_task,
    } = useSelector(state => get(state, 'taskDetail.detailTask.taskDetails.permissions', {}));
    const { is_ghim: isPinned, state_code, assign_code } = taskDetails || {};
    const pause = state_code === 4 ;
  
    const confirmDelete = () => {
      dispatch(deleteTask({ taskId, projectId: detailTask.project }));
    };
    function handleClick(evt) {
      dispatch(chooseTask(taskId));
      dispatch(getTaskDetailTabPart({ taskId: row.id }));
      setAnchorEl(evt.currentTarget);
  
    }
    let avatar, name, roles;
    if (detailTask) {
      let user_create = detailTask.user_create;
      if (user_create) {
        avatar = user_create.avatar;
        name = user_create.name;
        roles = compact([user_create.room, user_create.position]).join(' - ');
      }
    }
    const onClickEdit = (mode) => () => {
      setOpenCreateJobModal(true);
      dispatch(getListGroupTask({ project_id: taskDetails?.project }));
      setAnchorEl(null);
      setEditMode(mode);
      
    }
    const editList = [
      <MenuItem key="editList1"
        onClick={onClickEdit(EDIT_MODE.NAME_DES)}
      >{t('LABEL_CHAT_TASK_SUA_TEN_MO_TA_CONG_VIEC')}</MenuItem>,
      <MenuItem key="editList2"
        onClick={onClickEdit(EDIT_MODE.PRIORITY)}
      >{t('LABEL_CHAT_TASK_THAY_DOI_MUC_DO_UU_TIEN')}</MenuItem>,
      <MenuItem key="editList3"
        onClick={onClickEdit(EDIT_MODE.GROUP)}
      >{t('LABEL_CHAT_TASK_THAY_DOI_NHOM_VIEC')}</MenuItem>,
      /*<MenuItem key="editList4"
        onClick={onClickEdit(EDIT_MODE.ASSIGN_TYPE)}
      >{t('LABEL_CHAT_TASK_THAY_DOI_HINH_THUC_GIAO_VIEC')}</MenuItem>,*/
      <MenuItem key="editList5"
        onClick={onClickEdit(EDIT_MODE.WORK_DATE)}
      >{t('LABEL_CHAT_TASK_THAY_DOI_LICH_LAM_VIEC')}</MenuItem>,
    ]
    function onClickPin() {
      setAnchorEl(null);
      if (isPinned) {
        dispatch(unPinTaskAction({ task_id: taskId, projectId: detailTask.project }));
      } else {
        dispatch(pinTaskAction({ task_id: taskId, projectId: detailTask.project }));
      }
    }
   
   const handleAddMember = () => {
    if(row?.id){
      dispatch(chooseTask(row?.id));
      dispatch(getTaskDetailTabPart({ taskId: row.id }));
      setTimeout(() => {
        setOpenAdd(true)
      }, 1000);
    }
   }
    const onClickPause = () => {
      dispatch(stopTask(taskId));
      setAnchorEl(null);
      setTimeout(() => {
        setOnload(true);
      }, 1000);
    }
    const onClickResume = () => {
      dispatch(cancelStopTask(taskId));
      setAnchorEl(null);
      setTimeout(() => {
        setOnload(true);
      }, 1000);
    }
   
    function handleCloseMenu() {
      setAnchorEl(null);
    }
    React.useEffect(()=>{
      if(onload && detailTask){
        dispatch(listTask({projectId: detailTask.project}));
        setOnload(false)
      }
      
    },[onload, detailTask, dispatch])
   
    return (
      <div onMouseLeave={()=>setAnchorEl(null)}>
              <div >
                <ListAction >
                <div onClick={handleAddMember} className="action-add"><Icon path={mdiAccountPlus} color="#ffffff" width="17px"/></div>
                {get(row, 'can_delete') === true && <div onClick={()=> setOpenDelete(true)} className="action-delete"><Icon path={mdiDeleteOutline} color="#ffffff" width="17px"/></div>}
                <div onClick={handleClick} className="action-more"><Icon path={mdiDotsVertical} color="#ffffff" width="17px"/></div>
              </ListAction>
              <AddMemberModal projectActive={taskDetails.project} isOpen={openAdd} setOpen={setOpenAdd}/>
              <AlertModal
          open={openDelete}
          setOpen={setOpenDelete}
          content={t('IDS_WP_ALERT_CONTENT')}
          onConfirm={confirmDelete}
        />
      
        <Menu
          className="tabHeaderDefault--menu"
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          transformOrigin={{
            vertical: -30,
            horizontal: "right",
          }}
        >
          {update_task && editList}
          <MenuItem
            onClick={onClickPin}
          >
            {isPinned ? t('LABEL_CHAT_TASK_BO_GHIM') : t('LABEL_CHAT_TASK_GHIM_CONG_VIEC')}
          </MenuItem>
          {(detailTask && detailTask.state_code === 2) || !stop_task ? null :
            !pause ? (
              <MenuItem
                onClick={onClickPause}
              >{t('LABEL_CHAT_TASK_TAM_DUNG')}</MenuItem>
            ) : (
                <MenuItem
                  onClick={onClickResume}
                >{t('LABEL_CHAT_TASK_HUY_TAM_DUNG')}</MenuItem>
              )}
          
        </Menu>
        <EditJobModal
          isOpen={openCreateJobModal}
          setOpen={setOpenCreateJobModal}
          data={detailTask}
          editMode={editMode}
          setOnload={setOnload}
          projectId={detailTask.project}
        />
              </div>
              
             </div>
    )
  }