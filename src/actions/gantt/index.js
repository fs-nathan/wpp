import { GANTT_SHOW_HEADER, GANTT_SHOW_FULL_CHART, CHANGE_ROW_HOVER } from '../../constants/actions/gantt'

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
