import React, {useState, useRef, useEffect} from 'react'
import { useDrag, useDrop } from 'react-dnd'
import {Drawer} from 'antd'
import { connect } from 'react-redux'
import { Checkbox } from 'antd'
import Icon from '@mdi/react';
import CloseIcon from "@material-ui/icons/Close";
import {
  Box, IconButton
} from "@material-ui/core";
import { mdiDragVertical } from '@mdi/js'
import { ChromePicker } from 'react-color'
import { changeVisibleConfigGantt } from '../../../actions/system/system'
import { changeTimelineColor, changeVisible, actionChangeColorGanttSetting, actionChangeVisibaleGanttSetting } from '../../../actions/gantt'
import CheckboxIndex from './CheckBoxIndex'
import { Scrollbars } from 'react-custom-scrollbars';
import "../../../views/JobPage/components/QuickViewFilter.css";
import "../../../views/JobPage/Layout/QuickView.css";
const pathSettingIcon = "M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
const StyledScrollbarsSide = ({ className = '', height, ...props }) =>
  <Scrollbars className={`comp_CustomModal___scrollbar-side-${height} ${className}`} {...props} />;

const TagColor = ({color,setColor, type, projectInfo}) => {
  const [show, setShow ] = useState(false)
  const handleClickDocument = () => {
    if(!show){
      setShow(false)
    console.log('vo dayyyyyyyyyy')
    document.removeEventListener('click', handleClickDocument)
    }
  }
  const handleClick = () => {
    document.addEventListener('click', handleClickDocument)
    setShow(!show)
  }
  useEffect(() => {
   
  }, [show])
  const onChangeComplete = (value) => {
    actionChangeColorGanttSetting(projectInfo.id,type, value.hex)
  }
  return(
    <div className="checkbox-colortag--drawer__container">
      <div className="checkbox-colortag--drawer" onClick={handleClick}   style={{backgroundColor: color}}>
      </div>
  {show&& <div className="color-picker-drawer-config">
   <ChromePicker color={color} onChangeComplete={onChangeComplete} onChange={(value) =>setColor(type,value.hex)}/>
   </div>
   }
  </div> 
  )
}
const CheckboxColorTimeLine = ({text,projectInfo, color,type, setColor,changeVisible, checked}) => {
  const handleChangeCheckBox = (e) => {
    changeVisible(e.target.checked, 'gantt', type)
    actionChangeVisibaleGanttSetting(projectInfo.id, type, e.target.checked)
  }
  return (<div className="config--drawer--checkbox-wrapper" style={{display: 'flex', position: 'relative'}}>
    <Checkbox checked={checked} onChange={handleChangeCheckBox}   style={{
      display: 'flex',
      width: '100%',
      marginLeft: '8px !important'
    }}  className="config--drawer--checkbox">
        <CheckBoxLabel text={text}/>
    </Checkbox>
    <TagColor projectInfo={projectInfo} color={color} type={type} setColor={setColor}/>
    </div>
  )
}
const CheckBoxLabel = ({text, drag}) =>{
    return (
    <span className="checkbox-label--drawer ml-0" style={{position: 'relative'}}>
        <span>{text}</span>
        {drag&&<span ><Icon style={{margin: '0 10px'}} path={mdiDragVertical } size={1} /></span>}
    </span>
)}

const CommonConfig = ({visibleLabel,projectInfo,height,state, type, changeVisibleConfigGantt, timelineColor, changeTimelineColor,visibleGantt,changeVisible }) => {
    const handleChangeColor = (type, hex) => {
      changeTimelineColor(type, hex)
    }
    return (
        <Drawer
          closable={false}
          title={ <div style={{flexDirection: 'row'}} className="comp_QuickViewWrapper">
            <div className="comp_QuickViewHeaderLeft">
          <Box className="comp_QuickViewFilter__headerWrapper comp_QuickViewFilter__headerConfig">
          <Icon
            className="comp_QuickViewFilter__headerIcon"
            path={pathSettingIcon}
          ></Icon>
          <Box className="comp_QuickViewFilter__headerTitle">
            CÀI ĐẶT
          </Box>
        </Box>
        </div>
        <div className="comp_QuickViewHeaderRight">
          <IconButton >
            <CloseIcon onClick={() =>changeVisibleConfigGantt(false)}/>
          </IconButton>
        </div>
        </div>}
          placement="right"
          mask={false}
          visible={state && type === 'COMMON'}
          width={400}
          style={{height, top: `calc(100vh - ${height}px`}}
        >
           <StyledScrollbarsSide
          autoHide
          autoHideTimeout={500}
          height={'tail'}
        >
          <p className="config--drawer--section">Bảng dữ liệu</p>
          <p className="config--drawer--title">Ẩn / hiện / sắp xếp trường dữ liệu</p>
          <div className="config--drawer--checkbox-section ml-0">
         <CheckboxIndex/>
          </div>
          <p  style={{marginTop: '2em'}} className="config--drawer--section">Sơ đồ gantt</p>
          <div className="config--drawer--checkbox-section">
            <CheckboxColorTimeLine  
            text="Tổng tiến độ dự án" 
            color={timelineColor.total}
            checked={visibleGantt.total}
             setColor={handleChangeColor}
             changeVisible={changeVisible}
             projectInfo={projectInfo}
             type={"total"}/>
            <CheckboxColorTimeLine projectInfo={projectInfo}  checked={visibleGantt.group}  changeVisible={changeVisible} type={"group"}  text="Nhóm công việc" color={timelineColor.group}  setColor={handleChangeColor}/>
            <CheckboxColorTimeLine projectInfo={projectInfo}  checked={visibleGantt.task} changeVisible={changeVisible} type={"task"} text="Công việc" color={timelineColor.task}  setColor={handleChangeColor}/>
          <CheckboxColorTimeLine projectInfo={projectInfo}  checked={visibleGantt.duration} changeVisible={changeVisible} type={"duration"}  text="Hoàn thành" color={timelineColor.duration}  setColor={handleChangeColor}/>
          <div className="config--drawer--checkbox-wrapper">
           <Checkbox checked={visibleGantt.date} onChange={(e) => changeVisible(e.target.checked, 'gantt', 'date')} className="config--drawer--checkbox"> 
            Hiện ngày bắt đầu/kết thúc trên sơ đồ gantt
           </Checkbox>
           </div>
           <div className="config--drawer--checkbox-wrapper">
           <Checkbox checked={visibleGantt.name}  onChange={(e) => changeVisible(e.target.checked, 'gantt', 'name')} className="config--drawer--checkbox"> 
            Hiện tên công việc trên sơ đồ gantt
           </Checkbox>
           </div>
           <div className="config--drawer--checkbox-wrapper">
           <Checkbox checked={visibleGantt.numberDuration}  onChange={(e) => changeVisible(e.target.checked, 'gantt', 'numberDuration')}  className="config--drawer--checkbox"> 
            Hiện tiến độ hoàn thành trên sơ đồ gantt
           </Checkbox>
           </div>
           <div className="config--drawer--checkbox-wrapper">
           <Checkbox className="config--drawer--checkbox"> 
            Tiến độ kế hoạch đến ngày hôm nay
           </Checkbox>
           </div>
          </div>
          <p style={{marginTop: '2em'}}  className="config--drawer--section">Nhãn</p>
          <div className="config--drawer--checkbox-section">
            <div className="config--drawer--checkbox-wrapper">
          <Checkbox checked={visibleLabel.status}  onChange={(e) => changeVisible(e.target.checked, 'label', 'status')} className="config--drawer--checkbox" style={{
              display: 'flex',
              width: '100%',
              marginLeft: '8px !important'
          }}> Trạng thái</Checkbox>
          </div>
          <div className="config--drawer--checkbox-wrapper">
          <Checkbox checked={visibleLabel.member}  onChange={(e) => changeVisible(e.target.checked, 'label', 'member')} className="config--drawer--checkbox" style={{
              display: 'flex',
              width: '100%',
              marginLeft: '8px !important'
          }}> Thành viên</Checkbox>
          </div>
          <div className="config--drawer--checkbox-wrapper">
          <Checkbox checked={visibleLabel.prior}  onChange={(e) => changeVisible(e.target.checked, 'label', 'prior')} className="config--drawer--checkbox" style={{
              display: 'flex',
              width: '100%',
              marginLeft: '8px !important'
          }}> Mức độ ưu tiên</Checkbox>
          </div>
          </div>
          </StyledScrollbarsSide>
        </Drawer>
    )
}

const mapStateToProps = state => ({
  state: state.system.ganttConfig.state,
  type: state.system.ganttConfig.type,
  timelineColor: state.gantt.timelineColor,
  visibleGantt: state.gantt.visible.gantt,
  visibleLabel: state.gantt.visible.label,
  projectInfo: state.gantt.projectInfo,
})

const mapDispatchToProps = {
    changeVisibleConfigGantt,
    changeTimelineColor,
    changeVisible
}
export default connect(mapStateToProps, mapDispatchToProps)(CommonConfig)