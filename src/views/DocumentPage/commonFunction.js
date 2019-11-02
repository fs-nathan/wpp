import * as TABS from '../../constants/documentTab'

export const getActiveTab = activeTabId => {
    // Find current active tab
    // - Init object that hold the result tab
    let activeTab = {}
    // - Cause tab in constant file is object
    // So we need convert to array
    // Then compare current active tab id with each object's id
    const obj = Object.entries(TABS).find(obj => obj[1].id === activeTabId)
    // - If found tab => Set it to result tab
    if (obj) activeTab = obj[1]

    return activeTab
}