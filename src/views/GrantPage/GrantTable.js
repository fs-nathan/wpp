import React, {useState} from 'react'
import { Table, Tooltip } from 'antd';
import {connect} from 'react-redux'
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import {Resizable} from 'react-resizable'
import ConfigDrawer from '../../components/Drawer/DrawerConfigGantt'
import CustomBadge from '../../components/CustomBadge';
import { mdiSettings, mdiAccount, mdiMenuUp , mdiMenuDown, mdiDragVertical   } from '@mdi/js';
import DragTable from './DragableHOC';
import { get } from 'lodash'
import moment from 'moment'
import Icon from '@mdi/react';
import Header from './Header'
import { apiService } from '../../constants/axiosInstance'
import {
  IconButton,
} from '@material-ui/core';
import { changeRowHover } from '../../actions/gantt';
import DragableBodyRow from './DragableBodyRow'
import 'antd/dist/antd.css';
import './table.css'

const getDateFromString = (dateString) => {
  try{
   let date =  moment(dateString, "MM/DD/YYYY");
   if(!date.isValid())
    date = moment(new Date())
    return date
  } catch(e){
    console.log(e)
    return false
  }
}
function decodePriorityCode(priorityCode) {
  switch (priorityCode) {
    case 0:   
      return ({
        color: '#4caf50',
        background: '#4caf5042',
        name: 'Thấp',
      });
    case 1: 
      return ({
        color: '#ff9800',
        background: '#ff980038',
        name: 'Trung bình',
      });
    case 2: 
      return ({
        color: '#fe0707',
        background: '#ff050524',
        name: 'Cao',
      });
      case 'WAIT': 
      return ({
        color: '#ffffff',
        background: '#596fff',
        name: 'Cao',
      });
      case 'DOING': 
      return ({
        color: '#fe0707',
        background: '#ff050524',
        name: 'Cao',
      });
      case 'DONE': 
      return ({
        color: '#fe0707',
        background: '#ff050524',
        name: 'Cao',
      });
      case 'EXPIRE': 
      return ({
        color: '#fe0707',
        background: '#ff050524',
        name: 'Cao',
      });
      case 'MEMBER': 
      return ({
        color: '#f1ff26',
        background: 'rgb(255, 218, 5)',
        name: 'Cao',
      });
    default:
      return ({
        color: '#53d7fc',
        name: 'Thấp',
      });
  }
}

const ResizeableTitle = props => {
    const { onResize, width,setShowIconResize,showIconResize,  ...restProps } = props;
    if (!width) {
      return <th {...restProps} />;
    }
    return (
      <Resizable
        width={width}
        onMouseEnter={() =>setShowIconResize(true)}
        onMouseLeave={() =>setShowIconResize(false)}
        handle={resizeHandle => (
          <span
            className={`gantt-table-col react-resizable-handle react-resizable-handle-${resizeHandle}`}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            {showIconResize &&<Icon path={mdiDragVertical}/>}
          </span>
        )}
        onResize={onResize}
        draggableOpts={{ enableUserSelectHack: false }}
      >
        <th {...restProps} />
      </Resizable>
    );
  };

class DragSortingTable extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      rowHover: null,
      startTimeProject: '',
      endTimeProject: '',
      monthArray: [],
      showIconResize: false,
      daysRender: [],
      data: [
        ],
      columns: [
          {
            title: 'Tên công việc',
            dataIndex: 'name',
            width: 400,
            height: 100,
            render: (text, record) => {
              return (record.isMainTask ?
                <React.Fragment>
               <div onClick={() =>this.handleClickMainTask(record.id)} style={{display: 'flex', cursor: 'auto'}}> <div>
                 <Icon style={{width: 19, fill:"#777"}} path={record.show ? mdiMenuDown : mdiMenuUp}/>
                 </div>{record.name} </div>
               </React.Fragment> :
               <React.Fragment> 
              <div onMouseMove={() => this.setState({
                rowHover: record.key
              })}  style={{display: "flex", height: 20}}>
                <Icon style={{margin: '0 10px', cursor: 'grab', fill: "#ccc"}} path={mdiDragVertical } size={1} />
              <div className="name-task-gantt" style={{
                overflow: 'hidden',
                width: "200px",
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                flexGrow: 1,
              }}><Tooltip title={record.name}><span>{record.name}</span></Tooltip></div>
            <div style={
              {
                display: 'flex',
              }
            }>
            {this.state.rowHover === record.key &&  
              <IconButton
          aria-controls="simple-menu"
          style={{padding: 0}}
          aria-haspopup="true"
          size="small"
        >
          <Icon className="gantt--icon-setting-task" path={mdiSettings} size={1}/>
          </IconButton>}
            <CustomBadge style={{margin: '0px 4px',...decodePriorityCode('WAIT')}}
                                 {...decodePriorityCode('WAIT')}
                                >
                                 Đang chờ
                                </CustomBadge>
                                <CustomBadge style={{margin: '0px 4px',...decodePriorityCode('MEMBER')}}
                              {...decodePriorityCode('MEMBER')}
                                >
                                <Icon style={{ transform: "translateY(-50%)",
    width: 12,
    top: "57%",
    fill: 'white',
    position: "relative" }} path={mdiAccount }/>
        3
                                </CustomBadge>
                                </div>
                                </div>
            </React.Fragment>)}
          },
          {
            title: 'Bắt đầu',
            dataIndex: 'start_date',
            width: 100,
            height: 100
          },
          {
            title: 'Kết thúc',
            dataIndex: 'end_date',
            width: 100,
            height: 100
          },
          {
            title: 'Tiến độ',
            dataIndex: 'time',
            width: 100,
            height: 100
          }, 
          {
            title: 'Hoàn thành',
            dataIndex: 'process',
            width: 100,
            height: 100
          },
         
        ],
    };
    this.tableRef = React.createRef()
  }
  changeDatasourceCallback = (data) => {
    this.setState({
      data
    })
  }
  handleClickMainTask = ( id) => {
    const newData = this.state.data.map(item => {
      if(item.id !== id && item.parentId !== id) return item
      item.show= !item.show
      return item
    })
    this.setState({
      data: newData
    })
  }
  async componentDidMount(){
    this.setState({
      height: window.innerHeight - this.tableRef.current.offsetTop
    })
    const  [resultListTask, resultListTableTask ] =await Promise.all([apiService({
      url: 'group-task/list?project_id=5e8f096bf8185239dd864704'
    }), apiService({
      url: 'project/list-task-table?project_id=5e8f096bf8185239dd864704'
    })])
    let data =[];
    let startTimeProject
    let endTimeProject
    if(!resultListTask.data.group_tasks)
      return
    resultListTask.data.group_tasks.forEach((task, index) => {
      let startTimeMainTask;
      let endTimeMainTask;
      const addType = {
        ...task,
        isMainTask: true,
        show: true
      }
      const detail = get(resultListTableTask, `data.tasks[${index}].tasks`, []).map(item => {
        item.show = true;
        item.parentId = task.id
        const currentStartTime =  getDateFromString(item.start_date)
        console.log(currentStartTime.isValid())
        const currentEndTime = getDateFromString(item.end_date)

        if(! startTimeProject){
          startTimeProject = currentStartTime
          endTimeProject = currentEndTime
        }
        if(!startTimeMainTask){
          startTimeMainTask = currentStartTime
          endTimeMainTask = currentEndTime
        }
          if(startTimeMainTask.valueOf() > currentStartTime )
          startTimeMainTask = currentStartTime
          if(endTimeMainTask.valueOf() < currentEndTime )
             endTimeMainTask = currentStartTime
          if(startTimeProject.valueOf() > currentStartTime)
            startTimeProject = currentStartTime
          if(endTimeProject.valueOf() < currentEndTime)
            endTimeProject = currentEndTime
        return ({
        ...item,
        key: item.id
      })
    })
    addType.start_date = startTimeMainTask ?startTimeMainTask.format("MM/DD/YYYY") : null;
    addType.end_date = endTimeMainTask ? endTimeMainTask.format("MM/DD/YYYY") : null;
      data.push(...[addType, ...detail])
    })
    startTimeProject = startTimeProject.subtract('3', 'days')
    endTimeProject = endTimeProject.add(3, 'days')
    let dateEnd =endTimeProject;
    let dateStart = new moment(startTimeProject)
    const allMonth = [{
      text: '',
      width: ''
    }]
    let index = 0
    const daysRender = []
    while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
      let width = dateStart.daysInMonth() * 48
      if(index === 0){
        width = (dateStart.daysInMonth() - dateStart.format('DD') + 1) * 48
      }
      allMonth.push({
        text: dateStart.format('MM/YYYY'),
        width: width
      })
      dateStart.add(1,'month');
      index++
   }
   allMonth.shift()
   let temp = new moment(startTimeProject)
   for(let i = 0; i < 40; i++ ){
     const newDate = new moment(temp)
     newDate.add(i, 'days')
     daysRender.push(newDate)
   }
    this.setState({
      startTimeProject: startTimeProject,
      endTimeProject: endTimeProject,
      monthArray: allMonth,
      daysRender: daysRender
    })
    this.setState({
      data
    })
  }
  components = {
    body: {
      row: DragableBodyRow,
    },
    header:{
        cell: (props) => <ResizeableTitle setShowIconResize={(show) => this.setState({showIconResize: show})} showIconResize={this.state.showIconResize} {...props} />,
      },
  };
  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };
  
  moveRow = (dragIndex, hoverIndex) => {
    const { data } = this.state;
    const dragRow = data[dragIndex];
    this.setState(
      update(this.state, {
        data: {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        },
      }),
    );
  };
  render() {
      const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));
    return (
        <React.Fragment>
          <ConfigDrawer/>
<Header/>
          <div style={{display: 'flex'}}>
            <div
            style={{
              height: this.state.height
            }}
            ref={this.tableRef}
            >
      <DndProvider backend={HTML5Backend}>
        <Table
          columns={columns}
          size="small"
          className="table-gantt-header"
          bordered
          rowClassName={(record, index) => {
            if(this.props.rowHover === index)
              return 'row-background-yellow';
            if(this.state.data[index]&&this.state.data[index].isMainTask)
              return 'row-grey-table'
            return ''
          }}
          pagination={false}
          dataSource={this.state.data.filter(item => item.isMainTask || item.show)}
          components={this.components}
          onRow={(record, index) => ({
            index,
            moveRow: this.moveRow,
          })}
        />
      </DndProvider>
      </div>
      <DragTable daysRender={this.state.daysRender} monthArray={this.state.monthArray} start={this.state.startTimeProject} end={this.state.endTimeProject} dataSource={this.state.data} minX={100}/>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state => ({
  rowHover: state.gantt.rowHover
})

const mapDispatchToProps = {
  changeRowHover
}
export default connect(mapStateToProps, mapDispatchToProps)(DragSortingTable)
