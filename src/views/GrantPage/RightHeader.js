import { Checkbox, FormControlLabel, MenuItem, MenuList, Paper } from '@material-ui/core';
import { mdiCalendar, mdiCalendarMonth, mdiCheckboxBlankCircle, mdiCheckboxBlankOutline, mdiCheckboxMarked, mdiChevronUp, mdiDotsVertical, mdiFullscreen, mdiFullscreenExit, mdiMagnify, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { Col, Dropdown, Row } from 'antd';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { changeShowFullChart, changeShowHeader } from '../../actions/gantt';
import { changeVisibleConfigGantt, changeVisibleExportPdfDrawer } from '../../actions/system/system';
import CustomModal from '../../components/CustomModal';
import { apiService } from '../../constants/axiosInstance';
import './calendarModal.css';
import IconComponent from './IconComponent';

const pathSettingIcon = "M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z"


const menuuu = <Paper><MenuList style={{ zIndex: 1 }}>
  <MenuItem  >
    <p className="right-header-more">
      Xóa mặc định
  </p>
  </MenuItem>
  <MenuItem>
    <p className="right-header-more">
      Sửa
  </p>
  </MenuItem>
  <MenuItem>
    <p className="right-header-more">
      Xóa
  </p>
  </MenuItem>
</MenuList>
</Paper>
const TableDayWork = ({ workDay, notWorkDay }) => {
  const renderTable = () => {
    const rowList = []
    const length = workDay.length > notWorkDay.length ? workDay.length : notWorkDay.length
    for (let i = 0; i < length; i++) {
      rowList.push(
        <tr>
          <td>
            <div>
              {workDay[i] ? workDay[i].label : ''}
            </div>
          </td>
          <td>
            <div>
              {notWorkDay[i] ? notWorkDay[i].label : ''}
            </div>
          </td>
        </tr>
      )
    }
    return rowList
  }
  return (<div>
    <table id="customers">
      <tr>
        <th>
          <div className="header-table-day-work">
            <Icon path={mdiCheckboxBlankCircle} />
            <div>Ngày làm việc</div>
          </div>
        </th>
        <th>
          <div className="header-table-day-work">
            <Icon path={mdiCheckboxBlankCircle} />
            <div>Ngày làm việc</div>
          </div>
        </th>
      </tr>
      {renderTable()}
    </table>
  </div>)
}

const TableHourWork = ({ workHourAll, workHour }) => {
  const renderWorkHourAll = () => {
    const list = []
    console.log(workHourAll)
    list.push(
      <tr>
        <td className="table-hourwork-left" rowSpan={workHourAll.length}>
          <div>
            Toàn bộ thời gian
      </div>
        </td>
        <td className="table-hourwork-right--border-bottom-none">
          <div className="calendar--hour-work__td">
            <div className="calendar--hour-work__name">
              {get(workHourAll, '[0].name')}
            </div>
            <div >
              {`${get(workHourAll, '[0].start')} - ${get(workHourAll, '[0].end')}`}
            </div>
          </div>
        </td>
      </tr>
    )
    for (let i = 1; i < workHourAll.length; i++) {
      list.push(
        <tr>
          <td className="table-hourwork-right--border-top-none">
            <div className="calendar--hour-work__td">
              <div className="calendar--hour-work__name">
                {workHourAll[i].name}
              </div>
              <div >
                {`${workHourAll[i].start} - ${workHourAll[i].end}`}
              </div>
            </div>
          </td>
        </tr>
      )
    }
    return list
  }
  const renderWorkHour = () => {
    const list = []
    if (!workHour.length) return
    workHour.forEach((detail, index) => {
      list.push(
        <tr>
          <td className="table-hourwork-left" rowSpan={get(detail, 'shifts.length', 1)}>
            <div>
              {`${detail.start} - ${detail.end}`}
            </div>
          </td>
          <td className={index === workHour.length && workHour.length === 1 ? "table-hourwork-right--border-bottom-none" : "table-hourwork-right--border-top-none"}>
            <div className="calendar--hour-work__td">
              <div className="calendar--hour-work__name">
                {get(detail, 'shifts[0].name')}
              </div>
              <div >
                {`${get(detail, 'shifts[0].start')} - ${get(detail, 'shifts[0].end')}`}
              </div>
            </div>
          </td>
        </tr>
      )
      for (let i = 1; i < detail.shifts.length; i++)
        list.push(
          <tr>
            <td className="table-hourwork-right--border-top-none">
              <div className="calendar--hour-work__td">
                <div className="calendar--hour-work__name">
                  {get(detail, 'shifts[i].name')}
                </div>
                <div >
                  {`${get(detail, `shifts[${i}].start`)} - ${get(detail, `shifts[${i}].end`)}`}
                </div>
              </div>
            </td>
          </tr>
        )
    })
    return list
  }
  return (<div>
    <table id="hourwork">
      <tr>
        <th>
          <div className="header-table-day-work">
            <div>Thời gian</div>
          </div>
        </th>
        <th>
          <div className="header-table-day-work">
            <div>Giờ làm việc</div>
          </div>
        </th>
      </tr>
      {renderWorkHourAll()}
      {renderWorkHour()}
    </table>
  </div>)
}
const CheckBoxWeek = ({ title, worked }) => (<div className="custom-checkbox--calendar">
  <Checkbox
    // checked={statusFilter[key]}
    color="primary"
    checked={worked}
    style={{
      width: 30,
      height: 30
    }}
    icon={<Icon path={mdiCheckboxBlankOutline} size={2} />}
    checkedIcon={<Icon className="custom-checkbox-icon--calendar" path={mdiCheckboxMarked} size={2} />}
  // onChange={() => setstatusFilter(key)}
  // name={optionEntities[key].value}
  />
  <div style={{ whiteSpace: 'nowrap' }}>
    {title}
  </div>
</div>
)
const CalendarButton = ({ zIndex, id = 1, title, defaultCalendar, handleChooseCalendar, click, setClickId }) => {
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)
  const handleMouseEnter = () => {
    setHover(true)
  }
  const handleMouseOut = () => !visible && setHover(false)
  const background = click ? { background: "#b9b9b9" } : {}
  return (<div style={{ zIndex, position: 'relative', ...background }} onClick={() => {
    setClickId(id)
    handleChooseCalendar(id)
  }} onMouseLeave={handleMouseOut} onMouseOver={handleMouseEnter} className="calendar--button--item__container">
    <div className="calendar--button">
      <Icon path={mdiCalendarMonth} size={1} />
      <div className="calendar--button--title">
        {title}
        {defaultCalendar && <div className="calendar--button--tag-default">
          Mặc định
    </div>}
      </div>
      {hover && <div className="pull-right">
        <Dropdown onVisibleChange={visible => setVisible(visible)} getPopupContainer={() => document.getElementById(id)} overlay={menuuu} placement="bottomRight" trigger={['click']}>
          <div id={id} style={{
            position: 'relative',
          }}>
            <Icon path={mdiDotsVertical} size={1} />
          </div>
        </Dropdown>
      </div>
      }
    </div>
  </div>)
}

const HeaderLeft = ({ title, setopenModal, setOpenConfigCalendar }) => <div style={{ height: 30 }}>
  <div className="calendar--left-header">
    <div>
      {title}
    </div>
    <Icon onClick={() => setopenModal(true)} path={mdiPlus} size={1} />
  </div>
</div>
const Menuu = ({ changeVisibleExportPdfDrawer }) => {
  const [openConfigCalendar, setOpenConfigCalendar] = useState(false)
  const [selectCalendar, setSelectCalendar] = useState([1])
  const [openModal, setopenModal] = useState(false)
  const [listSchedule, setListSchedule] = useState(false)
  const [clickId, setClickId] = useState('')
  const [calendarChoose, setCalendarChoose] = useState({})
  const [calendarDetail, setCalendarDetail] = useState({})
  const clickConfigCalendar = () => {
    setOpenConfigCalendar(true)
  }
  const handleChangeCheckbox = (e) => {
    const { value, checked } = e.target
    if (checked) {
      const newSelect = [...selectCalendar]
      newSelect.push(value)
      setSelectCalendar(newSelect)
    } else setSelectCalendar(selectCalendar.filter(item => item !== value))
  }
  const handleChooseCalendar = (id) => {
    setCalendarChoose(listSchedule.filter(item => item.id === id)[0])
  }
  useEffect(() => {
    fetchListSchedule()
    return () => null
  }, [])
  useEffect(() => {
    console.log(clickId)
    fetchDetailSchedule(clickId)
    return () => null
  }, [clickId])
  const fetchListSchedule = async () => {
    try {
      const result = await apiService({
        url: 'group-schedule/list-schedule'
      })
      setListSchedule(result.data.schedules)
      setSelectCalendar(result.data.schedules[0])
      setClickId(result.data.schedules[0].id)
    } catch (e) {
      console.log(e)
    }
  }
  const fetchDetailSchedule = async (id) => {
    try {
      console.log(id)
      const result = await apiService({
        url: `group-schedule/detail-schedule?schedule_group_id=${id}`
      })
      console.log(result.data.schedule)
      setCalendarDetail(result.data.schedule)
    } catch (e) {
      console.log(e)
    }
  }
  const renderListSchedule = () => {
    const list = []
    list.push(...listSchedule.map((item) => <div>
      <CalendarButton setClickId={setClickId} click={clickId === item.id} zIndex={3} id={item.id} handleChooseCalendar={handleChooseCalendar} title={item.name} defaultCalendar={!item.can_delete} />
    </div>))
    return list
  }
  return (
    <React.Fragment>
      <CustomModal maxWidth="sm" height='short' setOpen={setopenModal} open={openModal} title={"GÁN LỊCH CHO DỰ ÁN"}>
        <div>
          <div className="calendar--modal__header">
            <div>Chọn lịch để gán cho dự án (lịch mặc định luôn được gán)</div>
            <div>Đã chọn: {selectCalendar.length} lịch</div>
          </div>
          <div className="calendar--modal__body">
            <table>
              <tr>
                <th>
                  <div>
                    <div>Tên lịch</div>
                  </div>
                </th>
                <th>
                  <div>
                    <div>Mô tả</div>
                  </div>
                </th>
              </tr>
              <tr>
                <td>
                  <div>
                    <FormControlLabel
                      control={<Checkbox color="primary" checked disabled />}
                      label="Lịch mặc định"
                    />

                  </div>
                </td>
                <td>
                  <div>
                    Lịch của hệ thống (luôn được gán)
      </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <FormControlLabel
                      control={<Checkbox onChange={(handleChangeCheckbox)} value={2} color="primary" />}
                      label="Lịch văn phòng"
                    />
                  </div>
                </td>
                <td>
                  <div>
                    Lịch CBNV văn phòng (làm từ T2-6)
      </div>
                </td>

              </tr>
              <tr>
                <td>
                  <div>
                    <FormControlLabel
                      control={<Checkbox onChange={(handleChangeCheckbox)} value={3} color="primary" />}
                      label="Lịch công trường"
                    />
                  </div>
                </td>
                <td>
                  <div>
                    Lịch công nhân công trường
      </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <FormControlLabel
                      control={<Checkbox onChange={(handleChangeCheckbox)} value={4} color="primary" />}
                      label="Lịch làm ca tối"
                    />
                  </div>
                </td>
                <td>
                  <div>
                    Lịch làm ca tối của thầu phụ
      </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </CustomModal>
      <CustomModal
        title={"CÀI ĐẶT LỊCH DỰ ÁN"}
        fullWidth={true}
        open={openConfigCalendar}
        setOpen={setOpenConfigCalendar}
        height='tall'
        confirmRender={() => "Chỉnh sửa"}
        columns={2}
        left={{
          title: <HeaderLeft setOpenConfigCalendar={setOpenConfigCalendar} setopenModal={setopenModal} title="LỊCH DỰ ÁN" />,
          maxWidth: 150,
          content: () => <div>
            {renderListSchedule()}
          </div>
        }}
        right={{
          title: <div style={{ height: 30 }}>
            <div className="calendar--right-header">
              <div>{calendarChoose.name}</div>
              {!calendarChoose.can_delete && <div>Lịch của hệ thống (luôn được gán)</div>}
            </div>
          </div>,
          content: () => <div>
            <div>
              <div className="section--calendar">
                NGÀY LÀM VIỆC
                  </div>
              <div>
                <div className="sub-section--calendar">
                  Ngày làm việc trong tuần
                    </div>
                <div className="custom-checkbox--calendar--container">
                  {calendarDetail && calendarDetail.work_days_of_week && calendarDetail.work_days_of_week.map(day => <CheckBoxWeek worked={day.worked} title={day.name} />)}
                </div>
              </div>
              <div>
                <div className="sub-section--calendar">
                  Thêm ngày làm việc/ ngày nghỉ
                    </div>
                <div>
                  <TableDayWork workDay={calendarDetail.work_days_of_schedule || []} notWorkDay={calendarDetail.day_not_work_of_schedule || []} />
                </div>
              </div>
            </div>
            <div>
              <div className="section--calendar">
                GIỜ LÀM VIỆC
                  </div>
              <div>
                <TableHourWork workHourAll={calendarDetail.work_hours_of_stage_all || []} workHour={calendarDetail.work_hours_of_stage || []} />
              </div>
            </div>
          </div>
        }}
      />
      <Paper><MenuList open={true}>
        <MenuItem onClick={clickConfigCalendar}>Lịch dự án</MenuItem>
        <MenuItem onClick={() => changeVisibleExportPdfDrawer(true)}>Xuất file PDF</MenuItem>
      </MenuList>
      </Paper>
    </React.Fragment>
  )
}
const RightHeader = ({
  changeShowFullChart,
  changeShowHeader,
  showFullChart,
  showHeader,
  changeVisibleConfigGantt,
  changeVisibleExportPdfDrawer
}) => {
  return (
    <Row justify="end">
      <IconComponent title={"TÌM KIẾM"} path={mdiMagnify} />
      <IconComponent onClick={() => changeVisibleConfigGantt(true, "TIME")} title={"TIẾN ĐỘ: NGÀY"} path={mdiCalendar} />
      <IconComponent onClick={() => changeShowFullChart(!showFullChart)} title={!showFullChart ? "MỞ RỘNG" : "Thu gọn"} path={!showFullChart ? mdiFullscreen : mdiFullscreenExit} />
      <IconComponent onClick={() => changeVisibleConfigGantt(true, "COMMON")} title={"CÀI ĐẶT"} path={pathSettingIcon} />
      <Col className="gantt--right-header__more" span={2}>
        <Dropdown overlay={() => <Menuu changeVisibleExportPdfDrawer={changeVisibleExportPdfDrawer} />} placement="bottomRight" trigger={['click']}>
          <div>
            <IconComponent onClick={(e) => e.preventDefault(e)} title={"THÊM"} path={mdiDotsVertical} />
          </div>
        </Dropdown>
      </Col>
      <Col span={2}>
        <div className="icon-invisible-header">
          <IconComponent onClick={() => changeShowHeader(!showHeader)} size={1.3} title={""} path={mdiChevronUp} />
        </div>
      </Col>
    </Row>
  )
}

const mapDispatchToProps = {
  changeVisibleConfigGantt,
  changeVisibleExportPdfDrawer,
  changeShowFullChart,
  changeShowHeader
}
const mapStateToProps = state => ({
  showFullChart: state.gantt.showFullChart,
  showHeader: state.gantt.showHeader
})
export default connect(mapStateToProps, mapDispatchToProps)(RightHeader)