import React from 'react'
import {Row, Col } from 'antd'
import './table.css';
import {connect} from 'react-redux'
import RightHeader from './RightHeader'
import { changeShowHeader } from '../../actions/gantt'
import IconComponent from './IconComponent'
import { mdiChevronDown   } from '@mdi/js';

const Header =  ({ showHeader, changeShowHeader }) => {
    return (
        showHeader ? <Row style={{margin: 0, borderBottom: '1px solid #e8e8e8'}} gutter={[16, 8]}>
        <Col span={12} ><div>
            <Row>
                <Col span={2}>
            <img height={50}
             width = {50}
             className="gantt--image-project"
             src="https://storage.googleapis.com/storage_vtask_net/1585844117647-blob"/>
             </Col>
             <Col>
             <p className="gantt--title-project" >Sản xuất phim "Sống chung với mẹ chồng"</p>
             <div className="gantt--navigation">
                 <p>Table</p>
                 <p>Gantt</p>
                 <p>Chart</p>
             </div>
             </Col>
             </Row>
            </div></Col>
        <Col offset={2} span={10} ><RightHeader/></Col>
      </Row> : <div className="icon-show-header">
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <IconComponent onClick={() => changeShowHeader(!showHeader)} size={1.3} title={""} path={mdiChevronDown }/>
            </div>
            </div>
    )
}

const mapStateToProps = state => ({
    showHeader: state.gantt.showHeader
})
const mapDispatchToProps = {
    changeShowHeader
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)


