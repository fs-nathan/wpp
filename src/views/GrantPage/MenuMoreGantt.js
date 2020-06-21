import { Checkbox, FormControlLabel, MenuItem, MenuList, Paper } from "@material-ui/core";
import { changeFlagFetchProjectSchedules } from 'actions/gantt';
import 'antd/lib/menu/style/index.css';
import { default as React, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import CustomModal from "../../components/CustomModalGantt";
import { apiService } from "../../constants/axiosInstance";
import CalendarProjectPage from "../../views/CalendarProjectPageClone";
import "./calendarModal.css";

const MenuMoreGantt = ({
  changeVisibleExportPdfDrawer,
  scheduleDetailGantt,
  projectSchedules,
  changeVisibleMenu,
  changeFlagFetchProjectSchedules
}) => {
  const [openConfigCalendar, setOpenConfigCalendar] = useState(false);
  const [selectCalendar, setSelectCalendar] = useState([1]);
  const [openModal, setopenModal] = useState(false);
  const [listSchedule, setListSchedule] = useState([]);
  const [listProjectSchedule, setListProjectSchedule] = useState([]);
  const clickConfigCalendar = () => {
    setOpenConfigCalendar(true);
    changeVisibleMenu(false);
  };
  const params = useParams()
  const handleChangeCheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      const newSelect = [...selectCalendar];
      newSelect.push(value);
      setSelectCalendar(newSelect);
    } else setSelectCalendar(selectCalendar.filter((item) => item !== value));
  };

  useEffect(() => {
    fetchListSchedule();
    return () => null;
  }, []);

  const fetchListSchedule = async () => {
    try {
      const listSchedule = await apiService({
        url: "group-schedule/list-schedule",
      })
      setListSchedule(listSchedule.data.schedules);
    } catch (e) {
      console.log(e);
    }
  };
  const assignProjectSchedule = async (projectId, scheduleId, check) => {
    try {
      const url = check ? 'project/assign-schedules' : 'project/delete-schedules'
      const result = await apiService({
        url,
        method: 'post',
        data: {
          schedule_id: scheduleId,
          project_id: projectId
        }
      })
      console.log(result)
      changeFlagFetchProjectSchedules(true)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    setListProjectSchedule(projectSchedules.map(item => item._id))
  }, [projectSchedules])
  const renderListCalendarModal = useMemo(
    () =>
      listSchedule.map((item) => (
        <tr>
          <td>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked={listProjectSchedule.includes(item.id)}
                    disabled={!item.can_delete}
                  />
                }
                onClick={e => {
                  const { projectId } = params
                  assignProjectSchedule(projectId, item.id, e.target.checked)
                }}
                label={item.name}
              />
            </div>
          </td>
          <td>
            <div>{item.description}</div>
          </td>
        </tr>
      )),
    [listSchedule, listProjectSchedule]
  );
  return (
    <React.Fragment>
      <CustomModal
        maxWidth="sm"
        height="short"
        setOpen={setopenModal}
        open={openModal}
        title={"GÁN LỊCH CHO DỰ ÁN"}
      >
        <div className="calendar--modal__container">
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
              {renderListCalendarModal}
            </table>
          </div>
        </div>
      </CustomModal>
      <CustomModal
        title={"CÀI ĐẶT LỊCH DỰ ÁN"}
        className="gantt--calendar-modal__container"
        fullWidth={true}
        open={openConfigCalendar}
        setOpen={setOpenConfigCalendar}
        style={{}}
        height="tall"
        confirmRender={() => null}
        isScrollContainer = {false}
      >
        <CalendarProjectPage
          setopenModal={setopenModal}
          scheduleDetailGantt={scheduleDetailGantt}
        />
      </CustomModal>
      <Paper>
        <MenuList open={true}>
          <MenuItem onClick={clickConfigCalendar}>Lịch dự án</MenuItem>
          <MenuItem
            onClick={() => {
              changeVisibleExportPdfDrawer(true);
              changeVisibleMenu(false);
            }}
          >
            Xuất file PDF
          </MenuItem>
        </MenuList>
      </Paper>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  scheduleDetailGantt: state.gantt.scheduleDetailGantt,
  projectSchedules: state.gantt.projectSchedules,
});
const mapDispatchToProps = {
  changeFlagFetchProjectSchedules
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuMoreGantt);
