
import React, { useState, useRef, useEffect } from 'react'
import {Table} from 'antd'
import Timeline from './TimeLine';
import moment from 'moment';
const arrrr = (start, end, renderTimeLine, startTimeProject, callback) => {
    const startInt = parseInt(start)
    const endInt = parseInt(end)
    const arrDate = []
    for (let i = startInt; i<=endInt; i++){
      arrDate.push({
        title: `${i}`,
        render: (text, record, index) =>{
          if(!renderTimeLine) return  <p style={{height: 20, margin: 0}}>{' '}</p>
          if(!record.start_date) return  <p style={{height: 20, margin: 0}}>{' '}</p>
          const startDate = moment(record.start_date, 'DD/MM/YYYY')
          const endDate =  moment(record.end_date, 'DD/MM/YYYY')
          const startPosition = startDate.diff(startTimeProject, 'days')
          const endPosition = parseInt(endDate.format('DD'))
          return <React.Fragment>
            <p style={{height: 20, margin: 0}}>{' '}</p>
          <Timeline handleCallBack={callback} index={index} startPosition={startPosition} endPosition={endPosition}/>
          </React.Fragment>
          },
        width: 48
      })
    }
      return arrDate
    
  }
function GanttChart({minX, start, end, dataSource, monthArray}){
  
      const [columnTime, setColumnTime] = useState([{
        title: '07/2017',
        children: arrrr(),
      }
      ])
    useEffect(() => {
      setColumnTime( monthArray.map((month, index) => {
        if(index === 0) return ({
          title: month,
          children: arrrr(start.format('DD'),start.daysInMonth(), true, start, handleCallBack),
        })
        if (index === (monthArray.length -1)) return ({
          title: month,
          children: arrrr(1,end.format('DD')),
        })
        return ({
          title: month,
          children: arrrr(1, moment(month, 'MM/YYYY').daysInMonth()),
        })
    }))
    }, [monthArray])
    const dragRef = useRef()
    const ganttRef = useRef()
    const tableRef = useRef()
    const [ left,   setLeft ] = useState(0)
    const [ currentX, setcurrentX ] = useState(0)
    const [ data, setData] = useState(dataSource)
    const [ drag, setDrag ] = useState(false)
    let offsetLeft = 0
    
    const handleMouseMove = (e) => {
        if(drag){
          const nextPosX = e.pageX - currentX
          if(nextPosX < minX) return
        setLeft(e.pageX - currentX)
        }
        e.stopPropagation()
        e.preventDefault()
    }
    const handleMouseDown = (e) => {
        if(dragRef.current){
            const dragLeft = dragRef.current.offsetLeft
            const grantLeft = ganttRef.current.offsetLeft
            offsetLeft = dragLeft + grantLeft
          }
        setDrag(true)
        setcurrentX(e.pageX - offsetLeft)
        e.stopPropagation()
        e.preventDefault()
    }
    const handleMouseUp = (e) => {
        setDrag(false)
        e.stopPropagation()
        e.preventDefault()
    }
    const handleCallBack = (index, newStart, newEnd) => {
     console.log(data)
    }
    useEffect(() => {
      setData(dataSource)
    }, [dataSource])
    useEffect(() =>{
        if(drag){
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        } else {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    })
    const b = left ? {left} : {}
    return (
        <div ref={ganttRef} style={{overflow: 'scroll',position: 'absolute', left: '60%',...b}}>
        <div style={{display: 'flex'}} >
            <div ref={dragRef }
           
            onMouseUp={() => {
              setDrag(false)
            }} 
            onMouseDown={(e) =>{
                handleMouseDown(e)}} onMouseMove={handleMouseMove} style={{width: '3px', cursor: 'col-resize',...b}}></div>
      <Table
          columns={columnTime}
          bordered
          scroll={{ x: 'max-content' }}
          className="grantt-header"
          dataSource={data}
          pagination={false}
        />
        </div>
            </div>
    )
}

export default GanttChart