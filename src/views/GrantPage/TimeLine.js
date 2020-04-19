import React, { useState,useEffect, useRef } from 'react'
import {ResizableBox}  from 'react-resizable'
import './test.css';
import Icon from '@mdi/react';
import { mdiTriangle   } from '@mdi/js'
import {connect} from 'react-redux'
import {   changeTimelineColor } from '../../actions/gantt'

const Circle = ({left, show}) => (
    <div style={{left, backgroundColor: show ? "#fafafa" : 'transparent', border: `1px solid ${show ? "rgba(59, 59, 59, 0.25)" : "transparent"}` }} className="gantt-dot-circle">

    </div>
)

const TimeLine = ({startPosition, endPosition, index, handleCallBack,dataSource, startDate, endDate, timelineColor,visibleGantt }) => {
    const totalTimeRef = useRef()
    const refProcess = useRef()
    const refResizeTotalTime = useRef()
    const refFirstResize = useRef()
    const [ left, setLeft ] = useState(startPosition *48)
    const [width, setWidth ] = useState(endPosition*48)
    const [showResize, setShowResize ] = useState(false)
    const [widthProcess, setWidthProcess ] = useState(0)
    const [ a, setA ] = useState(0)
    const [dragFirstResize, setDragFirstResize ] = useState(false)
    const [ drag, setDrag ] = useState(0)
    let offsetLeft = 0
    if(totalTimeRef.current){
          offsetLeft = totalTimeRef.current.offsetLeft
        }
    const handleMouseMove = (e) => {
        if(!drag) return
        const newPosition = e.pageX - a > 0 ? e.pageX - a : 0;
        if(dragFirstResize){
            const newWidth = width -(newPosition- left)
            setWidth(newWidth)
        }
        setLeft(newPosition)
        e.stopPropagation()
        e.preventDefault()
    }
    const handleMouseDown = (e) => {
        const className = e.target.className
       if(!className.indexOf ||className
            .indexOf("react-resizable-handle") !== -1 || className
            .indexOf("gantt-dot-circle") !== -1 ||className
            .indexOf("container-icon-drag-duration") !== -1) return
        setDrag(true)
        setA(e.pageX - offsetLeft)
    }
    const handleMouseUp = () => {
        const newLeft = left -left%48
        setLeft(newLeft)
        if(dragFirstResize)
            setWidth(width + left - newLeft)
        handleChange(newLeft/48,newLeft/48 + width/48)
       setDrag(false)
       setDragFirstResize(false)
     }
    const handleResizeStop = (e, node) => {
        const resizeWidth = node.size.width
        setWidth(resizeWidth - resizeWidth%48)
        const end = (resizeWidth - resizeWidth%48) / 48 + left /48
        handleChange(left,end)
    }
    const handleProcessResizeStop = (e, node) => {
        const currentProcessWidth = node.size.width
        const newProcess = Math.ceil((currentProcessWidth / width)*100)
        setWidthProcess(newProcess)
    }
    const handleChange = (start, end) => {
        console.log(dataSource)
        // handleCallBack(index,start, end)
    }
    const handleMouseUpFirstResize = () => {
        setDragFirstResize(false)
        setDrag(false)
    }
    // useEffect(() =>{
    //     if(drag){
    //         document.addEventListener('mouseup', handleMouseUp)
    //     } else {
    //         document.removeEventListener('mouseup', handleMouseUp)
    //     }
    //     return () => {
    //         document.removeEventListener('mouseup', handleMouseUp)
    //     }
    // })
    const b = left ? {left} : {}
    return (
        <React.Fragment>
            <div ref={totalTimeRef }
            //   onMouseOver={() => {
            //     setDrag(false)
            // }}
            onMouseLeave={() => setShowResize(false)}
            onMouseEnter={() => {
                setShowResize(true)}}
            onMouseUp={handleMouseUp} 
            onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}
            style={{display: 'flex',
            cursor:'move', 
            width:'100%',
            top: "50%", 
            transform: 'translateY(-50%)', 
            position: 'absolute',
            ...b}}>
                {visibleGantt.date && <p className="gantt--start-timeline">
                {startDate.format('MM/DD/YYYY')}
            </p>}
            <ResizableBox 
            minConstraints={[48, 0]}
            ref={refResizeTotalTime} 
            className="container-resizable"
            handle={() => (
                <span
                  className={`resize-width react-resizable-handle`}
                  onClick={e => {
                    e.stopPropagation();
                  }}
                >
                       <Circle show={showResize} left={9}/>
                </span>
              )}
            onResizeStop={handleResizeStop} 
            width={width}>
                <div
                    ref={refFirstResize}
                    onMouseDown={(e) =>{
                        setDrag(true)
                        setDragFirstResize(true)
                        setA(e.pageX - offsetLeft)
                    }}
                    className="resize-width"
                    onMouseUp={handleMouseUpFirstResize}
                >
                    <Circle show={showResize} left={-15}/>
                </div>
            <div style={{background: timelineColor.task}} className="gantt--time-task">
            </div>
            </ResizableBox>
            {visibleGantt.date &&<p className="gantt--end-timeline">
            {endDate.format('MM/DD/YYYY')}
            </p>}
</div>
            <div
                //  onMouseOver={() => {
                //     setDrag(false)
                // }}
                onMouseLeave={() =>   setShowResize(false)}
                onMouseEnter={() => {
                    setShowResize(true)}}
                onMouseUp={handleMouseUp} 
                onMouseDown={handleMouseDown} 
                onMouseMove={handleMouseMove} 
                style={{
                    display: 'flex',
                    top: "50%", 
                    transform: 'translateY(-50%)',
                    position: 'absolute',
                    cursor:'move',
                    ...b}}>
            <ResizableBox 
                onResize={handleProcessResizeStop} 
                minConstraints={[0, 0]} 
                maxConstraints={[width, width]} 
                width={0}
                handle={() => (
                    <span
                    // style ={{ 
                    //     display: showResize ? 'block' : 'none'
                    // }}
                      className={`resize-duration react-resizable-handle`}
                      onClick={e => {
                        e.stopPropagation();
                      }}
                    >
                        <span className="container-icon-drag-duration">
                            <span>
                           <Icon style={{fill:showResize? "#d1cfcf" : 'transparent'}} width={10} path={mdiTriangle }/>
                           </span>
                           </span>
                    </span>
                  )}
            >
            <div style={{background: timelineColor.duration}} className="gantt--duration-task" ref={refProcess} ><div  className="duration-text-gantt">{widthProcess}%</div></div>
            </ResizableBox>
            </div>
            </React.Fragment>
    )
}

const mapStateToProps = state =>({
    timelineColor: state.gantt.timelineColor,
    visibleGantt: state.gantt.visible.gantt,
})

export default connect(mapStateToProps)(TimeLine)