import React from 'react'
import { Table } from 'antd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import {Resizable, ResizableBox} from 'react-resizable'
import CustomBadge from '../../components/CustomBadge';
import { mdiSettings } from '@mdi/js';
import DragTable from './DragableHOC';
import { get } from 'lodash'
import moment from 'moment'
import Icon from '@mdi/react';
import { apiService } from '../../constants/axiosInstance'
import {
  IconButton,
} from '@material-ui/core';

import 'antd/dist/antd.css';
import './table.css'


const arrrr = () => {
  const arrDate = []
  for (let i = 1; i<=31; i++){
    arrDate.push({
      title: `${i}/07/2017`,
    })
  }
    return arrDate
  
}

const getDateFromString = (dateString) => {
  try{
   return moment(dateString, "DD/MM/YYYY");
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

const type = 'DragbleBodyRow';
const ResizeableTitle = props => {
    const { onResize, width, ...restProps } = props;
    if (!width) {
      return <th {...restProps} />;
    }
    return (
      <Resizable
        width={width}
        handle={resizeHandle => (
          <span
            className={`react-resizable-handle react-resizable-handle-${resizeHandle}`}
            onClick={e => {
              e.stopPropagation();
            }}
          />
        )}
        onResize={onResize}
        draggableOpts={{ enableUserSelectHack: false }}
      >
        <th {...restProps} />
      </Resizable>
    );
  };
const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
  const ref = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'grab', ...style }}
      {...restProps}
    />
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
               <div>{record.name} </div>
               </React.Fragment> :
               <React.Fragment> 
              <div onMouseMove={() => this.setState({
                rowHover: record.key
              })}  style={{display: "flex", height: 20}}>
              <div>{record.name}</div>
            <div style={{flexGrow: 1}}></div>
            {this.state.rowHover === record.key &&  <IconButton
          aria-controls="simple-menu"
          style={{padding: 0}}
          aria-haspopup="true"
          size="small"
        >
          <Icon path={mdiSettings} size={1}/>
          </IconButton>}
            <CustomBadge style={{margin: '0px 4px',...decodePriorityCode('WAIT')}}
                                 {...decodePriorityCode('WAIT')}
                                >
                                 Đang chờ
                                </CustomBadge>
                                <CustomBadge style={{margin: '0px 4px',...decodePriorityCode('MEMBER')}}
                              {...decodePriorityCode('MEMBER')}
                                >
                                 3
                                </CustomBadge>
                                
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
        columnTime: [{
          title: '07/2017',
          children: arrrr()
        }
        ]
    };
  }
  changeDatasourceCallback = (data) => {
    this.setState({
      data
    })
  }
  async componentDidMount(){
    const  [resultListTask, resultListTableTask ] =await Promise.all([apiService({
      url: 'group-task/list?project_id=5e5dd811abaa0b738ab80556'
    }), apiService({
      url: 'project/list-task-table?project_id=5e5e22771e1763bff85c0dcd'
    })])
    let data =[];
    let startTimeProject
    let endTimeProject
    let monthArray = []
    resultListTask.data.group_tasks.forEach((item, index) => {
      let startTimeMainTask;
      let endTimeMainTask;
      const addType = {
        ...item,
        isMainTask: true
      }
      const detail = get(resultListTableTask, `data.tasks[${index}].tasks`, []).map(item => {
        const currentStartTime =  getDateFromString(item.start_date)
        const currentEndTime = getDateFromString(item.end_date)
        const monthStartTask = currentStartTime.format('MM/YYYY')
        const monthEndTask = currentStartTime.format('MM/YYYY')
        if(!monthArray.includes(monthStartTask)) monthArray.push(monthStartTask)
        if(!monthArray.includes(monthEndTask)) monthArray.push(monthEndTask)
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
    addType.start_date = startTimeMainTask ?startTimeMainTask.format("DD/MM/YYYY") : null;
    addType.end_date = endTimeMainTask ? endTimeMainTask.format("DD/MM/YYYY") : null;
      data.push(...[addType, ...detail])
    })
    startTimeProject = startTimeProject.subtract('3', 'days')
    endTimeProject = endTimeProject.add(3, 'days')
    const getMonthStartTimeProjecet = startTimeProject.format('MM/YYYY')
    const getMonthEndimeProjecet = endTimeProject.format('MM/YYYY')
    if(!monthArray.includes(getMonthStartTimeProjecet)) monthArray.unshift(getMonthStartTimeProjecet)
    if(!monthArray.includes(getMonthEndimeProjecet)) monthArray.push(getMonthEndimeProjecet)
    this.setState({
      startTimeProject: startTimeProject,
      endTimeProject: endTimeProject,
      monthArray: monthArray
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
        cell: ResizeableTitle,
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
          <div style={{display: 'flex'}}>
      <DndProvider backend={HTML5Backend}>
        <Table
          columns={columns}
          className="table-gantt-header"
          bordered
          pagination={false}
          dataSource={this.state.data}
          components={this.components}
          onRow={(record, index) => ({
            index,
            moveRow: this.moveRow,
          })}
        />
      </DndProvider>
      <DragTable monthArray={this.state.monthArray} start={this.state.startTimeProject} end={this.state.endTimeProject} dataSource={this.state.data} minX={100}/>
        </div>
      </React.Fragment>
    );
  }
}

export default DragSortingTable
