import React, {useState, useEffect } from 'react'
import {Drawer} from 'antd'
import { connect } from 'react-redux'
import {
    Radio,
    FormControlLabel,
  Box,
  IconButton
  } from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";
import { changeVisibleSubtaskDrawer } from '../../../actions/system/system'
import SearchInput from '../../../components/SearchInput';
import { Scrollbars } from 'react-custom-scrollbars';
import { apiService } from '../../../constants/axiosInstance'
import "../../../views/JobPage/components/QuickViewFilter.css";
import "../../../views/JobPage/Layout/QuickView.css";
import './SubTaskDrawer.css'

const ItemSubTask = ({taskDetail,completed} ) => {
return <div className="subtask-drawer--item">
<div>
    <img src ={taskDetail.user_create_avatar}/>
</div>
<div>
    <div className="subtask-drawer--item__title">{taskDetail.name}</div>
    <div style={{display: 'flex'}}>
    {completed && <img className="subtask-drawer--item__complete-avatar" src={taskDetail.user_complete_avatar}/>}
    <div>{completed ? `Hoàn thành lúc ${taskDetail.time_complete.split('-')[0]}` : 'Tạo'} ngày {taskDetail.created_at}</div>
    </div>
</div>
</div> }
const StyledScrollbarsSide = ({ className = '', height, ...props }) =>
  <Scrollbars className={`comp_CustomModal___scrollbar-side-${height} ${className}`} {...props} />;
const TimeUnitConfig = ({height,detailSubTaskDrawer, visibleSubtaskDrawer,changeVisibleSubtaskDrawer}) => {
    const [listNotDone, setListNotDone] = useState([])
    const [listDone, setListDone] = useState([])
    const [listNotDoneFilter, setListNotDoneFilter] = useState([])
    const [listDoneFilter, setListDoneFilter] = useState([])
    const handleChangeSearch = (value) => {
        setListDoneFilter(listDone.filter(task => task.name.toLowerCase().match(value.toLowerCase())))
        setListNotDoneFilter(listNotDone.filter(task => task.name.toLowerCase().match(value.toLowerCase())))
    }
    const fetchListSubTask =async (task_id) => {
        try{
            if(detailSubTaskDrawer.id){
            const result = await apiService({
                url: `task/get-subtask?task_id=${task_id}`
            })
            const {sub_tasks} = result.data
            setListDone(sub_tasks.filter(item => item.status))
            setListNotDone(sub_tasks.filter(item => !item.status))
            setListDoneFilter(sub_tasks.filter(item => item.status))
            setListNotDoneFilter(sub_tasks.filter(item => !item.status))
        }
        
        } catch(e){
            console.log(e)
        }
    }
    useEffect(() => {
        fetchListSubTask(detailSubTaskDrawer.id)
    }, [detailSubTaskDrawer])

    return (
        <Drawer
        closable={false}
          title={ <div style={{flexDirection: 'row'}} className="comp_QuickViewWrapper">
            <div className="comp_QuickViewHeaderLeft">
          <Box className="comp_QuickViewFilter__headerWrapper comp_QuickViewFilter__headerConfig">
          <Box className="comp_QuickViewFilter__headerTitle">
              <div>
              <div className="subtask-drawer--header">CÔNG VIỆC CON</div>
                <div className="subtask-drawer--sub-header">Công việc chính: {detailSubTaskDrawer.name}</div>
            </div>
          </Box>
        </Box>
        </div>
        <div className="comp_QuickViewHeaderRight">
          <IconButton >
            <CloseIcon onClick={() =>changeVisibleSubtaskDrawer(false,'')}/>
          </IconButton>
        </div>
        </div>
        }
          placement="right"
          mask={false}
          visible={visibleSubtaskDrawer}
          width={400}
          style={{height, top: `calc(100vh - ${height}px`}}
        >
           <StyledScrollbarsSide
          autoHide
          autoHideTimeout={500}
          height={'tail'}
        >
          <div className="subtask-drawer-search">
          <SearchInput
            placeholder="Nhập từ khóa"
            style={{ height: 'auto' }}
            onChange={e => handleChangeSearch(e.target.value)}
          />
          </div>
          <div className="subtask-drawer--group-status__container">
         <div className="subtask-drawer--group-status__name">ĐANG THỰC HIỆN ({listNotDoneFilter.length})</div>
         <div className="subtask-drawer--container-item">
            {listNotDoneFilter.map(taskDetail =><ItemSubTask key={taskDetail.id} taskDetail={taskDetail} completed={false}/>) 
            }
         </div>
         </div>
         <div className="subtask-drawer--group-status__container">
         <div className="subtask-drawer--group-status__name">ĐÃ THỰC HIỆN ({listDoneFilter.length})</div>
         <div className="subtask-drawer--container-item">
         {listDoneFilter.map(taskDetail =><ItemSubTask key={taskDetail.id} taskDetail={taskDetail} completed={true}/>) 
            }
         </div>
         </div>
          </StyledScrollbarsSide>
        </Drawer>
    )
}

const mapStateToProps = state => ({
    visibleSubtaskDrawer: state.system.visibleSubtaskDrawer,
    detailSubTaskDrawer: state.system.detailSubTaskDrawer,
})

const mapDispatchToProps = {
    changeVisibleSubtaskDrawer,
}
export default connect(mapStateToProps, mapDispatchToProps)(TimeUnitConfig)