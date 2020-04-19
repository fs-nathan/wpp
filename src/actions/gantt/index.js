import { 
    GANTT_SHOW_HEADER,
    GANTT_SHOW_FULL_CHART, 
    CHANGE_ROW_HOVER,
    CHANGE_TIMELINE_COLOR,
    CHANGE_COLUMN_INDEX,
    CHANGE_VISIBLE
    } from '../../constants/actions/gantt'

export const changeShowFullChart = (flag) => {
    console.log(flag)
    return {
    type: GANTT_SHOW_FULL_CHART,
    payload: flag
    }
}

export const changeShowHeader = (flag) => ({
    type: GANTT_SHOW_HEADER,
    payload: flag
})

export const changeRowHover = (index) => ({
    type: CHANGE_ROW_HOVER,
    payload: index
})

export const changeTimelineColor = (type, color) => ({
    type: CHANGE_TIMELINE_COLOR,
    payload: {
        type,
        color
    }
})

export const changeColumnIndex = indexes => ({
    type: CHANGE_COLUMN_INDEX,
    payload: indexes
})

export const changeVisible = (visible, section, type) => ({
    type: CHANGE_VISIBLE,
    payload: {
        visible,
        type,
        section
    }
})

