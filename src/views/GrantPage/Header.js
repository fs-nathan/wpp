import { mdiChevronDown } from '@mdi/js';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { changeShowHeader } from '../../actions/gantt';
import ListProject from "../../views/JobDetailPage/ListPart/ListProject";
import IconComponent from './IconComponent';
import RightHeader from './RightHeader';
import './table.css';
const Header = ({ projectInfo, showHeader, changeShowHeader }) => {
    const [showProject, setShowSelectProject] = useState(false);
    return (
        showHeader ? <Row style={{ margin: 0, borderBottom: '1px solid #e8e8e8' }} gutter={[16, 8]}>
            <Col span={12} ><div>
                <Row>
                    <Col span={2}>
                        <img height={50}
                            width={50}
                            className="gantt--image-project"
                            src={projectInfo.group_icon} />
                    </Col>
                    <Col span={22}>
                        <p className="gantt--title-project" >{projectInfo.name}</p>
                        {/* <ListHeader show={showProject} setShow={setShowSelectProject} /> */}
                        <ListProject show={false} setShow={setShowSelectProject} />
                        <div className="gantt--navigation">
                            <p>Table</p>
                            <p>Gantt</p>
                            <p>Chart</p>
                        </div>
                    </Col>
                </Row>
            </div></Col>
            <Col offset={2} span={10} ><RightHeader /></Col>
        </Row> : <div className="icon-show-header">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <IconComponent onClick={() => changeShowHeader(!showHeader)} size={1.3} title={""} path={mdiChevronDown} />
                </div>
            </div>
    )
}

const mapStateToProps = state => ({
    showHeader: state.gantt.showHeader,
    projectInfo: state.gantt.projectInfo
})
const mapDispatchToProps = {
    changeShowHeader
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)


