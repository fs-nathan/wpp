import React from 'react'
import CommonConfig from './CommonConfig'
import TimeUnitConfig from './TimeUnitConfig'

export default ({height}) => ( 
    <React.Fragment>
    <TimeUnitConfig height={height}/>
    <CommonConfig  height={height}/>
    </React.Fragment>
)