import React, { useState, useRef } from 'react'
import {ResizableBox}  from 'react-resizable'
import './test.css';
const TimeLine = ({startPosition, endPosition, index, handleCallBack }) => {
    const totalTimeRef = useRef()
    const refProcess = useRef()
    const refResizeTotalTime = useRef()
    const refResizeProcess = useRef()
    const [ left, setLeft ] = useState(startPosition *48)
    const [width, setWidth ] = useState((endPosition - startPosition +1)*48)
    const [widthProcess, setWidthProcess ] = useState(0)
    const [ a, setA ] = useState(0)
    const [ drag, setDrag ] = useState(0)
    let offsetLeft = 0
    if(totalTimeRef.current){
          offsetLeft = totalTimeRef.current.offsetLeft
        }
    const handleMouseMove = (e) => {
        if(drag)
        setLeft(e.pageX - a)
        e.stopPropagation()
        e.preventDefault()
    }
    const handleMouseDown = (e) => {
       if(e
            .target
            .className
            .indexOf("react-resizable-handle") !== -1) return
        setDrag(true)
        setA(e.pageX - offsetLeft)
    }
    const handleMouseUp = () => {
        const newLeft = left -left%48
        setLeft(newLeft)
        handleChange(newLeft/48,newLeft/48 + width/48)
       setDrag(false)
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
        handleCallBack(index,start, end)
    }
    const b = left ? {left} : {}
    let process
    return (
        <React.Fragment>
            <div ref={totalTimeRef }
            onMouseOver={() => {
                setDrag(false)
            }}
            onMouseUp={handleMouseUp} 
            onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} style={{display: 'flex',zIndex:1000,top: "50%", transform: 'translateY(-50%)', position: 'absolute',...b}}>
            <ResizableBox minConstraints={[48, 0]} ref={refResizeTotalTime} onResizeStop={handleResizeStop} width={width}>
            <div style={{width: '100%',height:'20px',  background: 'green', zIndex: 1}}>
            </div>
            </ResizableBox>
</div>
<div  onMouseOver={() => {
                setDrag(false)
            }}
            onMouseUp={handleMouseUp} 
            onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} style={{display: 'flex',top: "50%", transform: 'translateY(-50%)',zIndex:1000,position: 'absolute',...b}}>
            <ResizableBox onResizeStop={handleProcessResizeStop} ref={refResizeProcess} minConstraints={[0, 0]} width={0}>
            <div ref={refProcess} style={{overflow: 'hidden', width: '100%', height: '20px',background: 'red', zIndex: 3} }>{widthProcess}%</div>
            </ResizableBox>
            </div>
            </React.Fragment>
    )
}

export default TimeLine