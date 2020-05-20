import React from 'react'
import CheckBoxDrag from './CheckBoxDrag'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

export default () => <div >
<DndProvider backend={Backend}>
    <CheckBoxDrag />
</DndProvider>
</div>