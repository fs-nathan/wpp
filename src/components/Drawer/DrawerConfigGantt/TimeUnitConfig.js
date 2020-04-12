import React from 'react'
import {Drawer} from 'antd'
import { connect } from 'react-redux'
import { Radio } from 'antd'
import { mdiCalendar } from '@mdi/js';
import Icon from '@mdi/react';
import { changeVisibleConfigGantt } from '../../../actions/system/system'

const TimeUnitConfig = ({ state, type, changeVisibleConfigGantt }) => {
    return (
        <Drawer title={<div className="title-drawer-config">    
<Icon style={{fill: 'rgba(0, 0, 0, 0.54)'}} path={mdiCalendar} size={1}/>
<p>TIẾN ĐỘ</p>
            </div>}
        placement="right"
        closable={true}
        onClose={() => changeVisibleConfigGantt(false)}
        visible={state && type === "TIME" }
        width={400}
      >
        <p className="config--drawer--section">Thiếp lập trục thời gian</p>
        <p className="config--drawer--title">Lựa chọn trục thời gian cho sơ đồ gantt</p>
        <div className="config--drawer--checkbox-section">
            <Radio.Group name="radiogroup" defaultValue={1}>
        <Radio value={1} checked={true} className="config--drawer--checkbox" style={{
            display: 'flex',
            width: '100%',
            marginLeft: '8px !important'
        }}>Giờ </Radio>
         <Radio value={2}  className="config--drawer--checkbox"> Tuần </Radio>
       <Radio value={3} className="config--drawer--checkbox"> Tháng</Radio>
        <Radio value={4} className="config--drawer--checkbox">Quý</Radio>
         <Radio value={5} className="config--drawer--checkbox">Năm </Radio>
         </Radio.Group>
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
export default connect(mapStateToProps, mapDispatchToProps)(TimeUnitConfig)