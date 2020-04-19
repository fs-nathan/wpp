
import React, { useState, useRef, useEffect, lazy, Suspense } from 'react'
import Timeline from './TimeLine';
import { connect } from 'react-redux'
import MonthHeader from './MonthHeader'
import Icon from '@mdi/react';
import moment from 'moment';
import {  mdiDragVerticalVariant  } from '@mdi/js'
import { changeRowHover } from '../../actions/gantt';

function GanttChart({minX, start,showHeader, end,changeRowHover, dataSource, monthArray, daysRender, showFullChart,rowHover}){
    const dragRef = useRef()
    const ganttRef = useRef()
    const [ left, setLeft ] = useState(0)
    const [ scrollWidth,   setScrollWidth ] = useState(0)
    const [showResizeIcon, setShowResizeIcon ] = useState(false)
    const [ currentX, setcurrentX ] = useState(0)
    const [ drag, setDrag ] = useState(false)
    const [heightChart, setHeightChart ] = useState(600)
    const [ leftHeader, setLeftHeader ] = useState(false)
    let offsetLeft = 0
    const handleMouseMove = (e) => {
        if(drag){
          const nextPosX = e.clientX - currentX
          if(nextPosX < minX) return
        setLeft(e.clientX - currentX)
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
        setcurrentX(e.clientX - offsetLeft)
        e.stopPropagation()
        e.preventDefault()
    }
    const handleMouseUp = (e) => {
        setDrag(false)
        e.stopPropagation()
        e.preventDefault()
    }
    const handleCallBack = (index, newStart, newEnd) => {
     console.log(minX, dataSource)
    }
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
    useEffect(() => {
      if(ganttRef.current){
        setHeightChart(window.innerHeight - ganttRef.current.offsetTop)
        console.log(window.innerWidth - ganttRef.current.offsetLeft)
      }
    }, [showHeader])
    const b = left ? {left: showFullChart ? 80 : left} : {}
    const timeline = dataSource.map((item,index) => {
      const startDate = moment(item.start_date, 'MM/DD/YYYY')
      const endDate =  moment(item.end_date, 'MM/DD/YYYY')
      const startPosition = startDate.diff(start, 'days')
      const endPosition = endDate.diff(startDate, 'days') + 1
      return <React.Fragment>
        <div
        key={item.id}
        onMouseEnter={() =>changeRowHover(index)}
        onMouseLeave={() =>changeRowHover(-1)}
         className="gantt--top-timeline-tr" style={{position: 'relative',
          padding: '8.5px 0px',
          display: 'flex',
          backgroundColor: rowHover === index ?  '#fffae6' : ''
      }}>
         <div className="gantt--top-timeline"></div>
        <Timeline startDate={startDate} endDate={endDate}key={item.id} dataSource={dataSource} index={index} startPosition={startPosition} endPosition={endPosition}/>
        </div>
        </React.Fragment>
      
  })
    return (
      <React.Fragment>
        <div
        onMouseUp={() => {
          setDrag(false)
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowResizeIcon(true)}
        onMouseLeave={() => setShowResizeIcon(false)}
        className="icon-resize-gantt-chart" 
        style={{
          left:showFullChart ?80 : '40%',
           ...b,
           display: showResizeIcon ? 'block' : 'none',
          height:heightChart}}>
          <Icon path={mdiDragVerticalVariant} size={1}/>
        </div>
        <div 
          ref={ganttRef} 
          style={{
            width:'100%', 
            position: 'absolute', 
            left: showFullChart ? 80: '40%',
            overflow: 'hidden',
            background: 'white',
            ...b
            }}>
              <div ref={dragRef }
            onMouseUp={() => {
              setDrag(false)
            }}
            onMouseLeave={() => setShowResizeIcon(false)}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setShowResizeIcon(true)}
            style={{
              width:  showResizeIcon? '7px' : '3px', 
              cursor: 'col-resize',
              position: 'absolute',
              zIndex: 10,
              backgroundColor: '#e8e8e8',
              height: '100%',
            }}
            >
            </div>
        <div 
        style={{
          display: 'flex', 
          height: heightChart,
          overflow: 'scroll',
          width: "100%"
          }}
          onScroll={(e) => {
            if(Math.floor(e.target.scrollLeft / 48) !== scrollWidth){
              const newScrollWidth = Math.floor(e.target.scrollLeft /48)
              setScrollWidth(newScrollWidth)
            } else {
            setLeftHeader(e.target.scrollLeft % 48)
            }
          }}
          >
            <div
            style={{
              borderRight: '2px solid #e8e8e8'
            }}
            >
            <MonthHeader 
              scrollWidth={scrollWidth} 
              daysRender={daysRender} 
              allMonth={monthArray}
              startTimeProject={start}
              dataSource={dataSource}
              leftHeader={leftHeader}
            />
            <div className="gantt--timeline--container">
          {timeline}
          </div>
</div>
        </div>
            </div>
            
            </React.Fragment>
    )
}


const mapDispatchToProps = {
  changeRowHover
}
const mapStateToProps =(state) => ({
  showFullChart: state.gantt.showFullChart,
  showHeader: state.gantt.showHeader,
  rowHover: state.gantt.rowHover
})
export default connect(mapStateToProps,mapDispatchToProps)(GanttChart)