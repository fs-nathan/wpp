import React from 'react'
import {Drawer} from 'antd'
import { connect } from 'react-redux'
import { Checkbox } from 'antd'
import Icon from '@mdi/react';
import { mdiDragVertical } from '@mdi/js'

import { changeVisibleConfigGantt } from '../../../actions/system/system'

const pathSettingIcon = "M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"

const CheckBoxLabel = ({text, tagColor}) =>{
    const leftSide = tagColor ?  <span className="checkbox-colortag--drawer" style={{
        backgroundColor: tagColor,
    }}>
    </span> : <span><Icon style={{margin: '0 10px'}} path={mdiDragVertical } size={1} /></span>
    return (
    <span className="checkbox-label--drawer ml-0">
        <span>{text}</span>
        {leftSide}
    </span>
)}

const CommonConfig = ({ state, type, changeVisibleConfigGantt }) => {
    return (
        <Drawer
          title={<div className="title-drawer-config">    
<Icon style={{fill: 'rgba(0, 0, 0, 0.54)'}} path={pathSettingIcon} size={1}/>
<p>CÀI ĐẶT</p>
              </div>}
          placement="right"
          closable={true}
          onClose={() => {
            changeVisibleConfigGantt(false, '')}}
          visible={state && type === 'COMMON'}
          width={400}
        >
          <p className="config--drawer--section">Bảng dữ liệu</p>
          <p className="config--drawer--title">Ẩn / hiện / sắp xếp trường dữ liệu</p>
          <div className="config--drawer--checkbox-section">
          <Checkbox className="config--drawer--checkbox" style={{
              display: 'flex',
              width: '100%',
              marginLeft: '8px !important'
          }}> <CheckBoxLabel text="Tên công việc"/></Checkbox>
           <Checkbox className="config--drawer--checkbox"> <CheckBoxLabel text="Bắt đầu (ngày bắt đầu)"/></Checkbox>
         <Checkbox className="config--drawer--checkbox"> <CheckBoxLabel text="Kết thúc (ngày kết thúc)"/></Checkbox>
          <Checkbox className="config--drawer--checkbox"> <CheckBoxLabel text="Tiến độ (ngày)"/></Checkbox>
           <Checkbox className="config--drawer--checkbox"> <CheckBoxLabel text="Hoàn thành"/></Checkbox>
          </div>
          <p className="config--drawer--section">Sơ đồ gantt</p>
          <div className="config--drawer--checkbox-section">
          <Checkbox className="config--drawer--checkbox"
            style={{
              display: 'flex',
              width: '100%',
              marginLeft: '8px !important'
            }}
          > 
            <CheckBoxLabel 
                text="Tổng tiến độ dự án" 
                tagColor="#fcba03"
            />
            </Checkbox>
           <Checkbox className="config--drawer--checkbox">
                <CheckBoxLabel text="Nhóm công việc" tagColor="red"/>
            </Checkbox>
          <Checkbox className="config--drawer--checkbox"> 
            <CheckBoxLabel text="Công việc" tagColor="green"/>
          </Checkbox>
          <Checkbox className="config--drawer--checkbox"> 
            <CheckBoxLabel text="Hoàn thành" tagColor="#e629e6"/>
          </Checkbox>
           <Checkbox className="config--drawer--checkbox"> 
            Hiện ngày bắt đầu/kết thúc trên sơ đồ gantt
           </Checkbox>
           <Checkbox className="config--drawer--checkbox"> 
            Hiện tên công việc trên sơ đồ gantt
           </Checkbox>
           <Checkbox className="config--drawer--checkbox"> 
            Hiện tiến độ hoàn thành trên sơ đồ gantt
           </Checkbox>
           <Checkbox className="config--drawer--checkbox"> 
            Tiến độ kế hoạch đến ngày hôm nay
           </Checkbox>
          </div>
          <p className="config--drawer--section">Nhãn</p>
          <div className="config--drawer--checkbox-section">
          <Checkbox className="config--drawer--checkbox" style={{
              display: 'flex',
              width: '100%',
              marginLeft: '8px !important'
          }}> Trạng thái</Checkbox>
          <Checkbox className="config--drawer--checkbox" style={{
              display: 'flex',
              width: '100%',
              marginLeft: '8px !important'
          }}> Mức độ ưu tiên</Checkbox>
          </div>
        </Drawer>
    )
}

const mapStateToProps = state => ({
  state: state.system.ganttConfig.state,
  type: state.system.ganttConfig.type,
})

const mapDispatchToProps = {
    changeVisibleConfigGantt: changeVisibleConfigGantt
}
export default connect(mapStateToProps, mapDispatchToProps)(CommonConfig)