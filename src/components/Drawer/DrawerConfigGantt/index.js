import 'antd/lib/drawer/style/index.css'
import 'antd/lib/menu/style/index.css'
import React from 'react'
import CommonConfig from './CommonConfig'
import TimeUnitConfig from './TimeUnitConfig'
export default ({ height }) => (
    <React.Fragment>
        <div className="">
            <TimeUnitConfig height={height} />
            <CommonConfig height={height} />
        </div>
    </React.Fragment>
)