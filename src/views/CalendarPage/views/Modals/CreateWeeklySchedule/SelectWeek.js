import SearchIcon from '@material-ui/icons/Search';
import DateRangeIcon from '@material-ui/icons/DateRange';
import SearchInput from 'components/SearchInput';
import React, { useMemo, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import CustomModal from 'components/CustomModal';
import styled from 'styled-components';
import { currentColorSelector } from 'views/Chat/selectors';
import {fetchListWeekOfYear} from 'actions/calendar/weeklyCalendar/listWeeksInYear'
import { useHistory } from "react-router-dom";
import { MenuItem, Select } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';


export const StyledDiv = styled.div`
  .line-option-selected {
    background: ${props => props.selectedColor}!important;
    color: #fff!important
  }
`

const Row = (props) => {
  const { t } = useTranslation();
  const classRow = props.isSelected ? "line-option-selected" : ""

  const handleSelect = () => {
    props.onSelect(props.weekData)
  }

  return (
    <StyledDiv selectedColor={props.appColor} onClick={handleSelect}>
      <div className={`line-option per-line-modal ${classRow}`}>
        <div className="icon-option">
          <DateRangeIcon />
        </div>
        <div className="name-option">
          {props.weekData.full_label}
          {
            props.weekData.is_curent && <span style={{color: props.appColor, marginLeft: "10px"}}>{t("IDS_WP_PRESENT")}</span>
          }
        </div>
      </div>
    </StyledDiv>
  )
}


function SelectWeek({
  isOpen,
  setOpen,
  onSubmit = () => {},
  selectedOption = () => {},
  weekSelected,
}) {
  const timeoutRef = useRef(null); 
  const history = useHistory();
  
 
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [weekOriginal, setWeekOriginal] = useState([]);
  const [weeks, setWeek] = useState(weekOriginal);
  const currentYear = (new Date()).getFullYear();
  const [scheduleYear, setScheduleYear] = React.useState(weekSelected ? weekSelected.year : currentYear);


  const appColor = useSelector(currentColorSelector)

  function handleChangeSearch(evt) {
    setSearchValue(evt.target.value)
    const value = evt.target.value
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(()=> {
      timeoutRef.current = null;
      let weekTemps = []
      weekOriginal.map(e => {
        if (String(e.full_label).toLowerCase().indexOf(String(value).toLowerCase()) >= 0) {
          weekTemps.push(e)
        }
      })
      setWeek(weekTemps)
    }, 200);    
  }

  async function fetchListGroup() {
    try {
      if (isOpen) {
        const res = await fetchListWeekOfYear({year: scheduleYear})
        setWeekOriginal(res.data.data)
        setWeek(res.data.data)
      }
    } catch (e){
      console.log(e)
    }
  }

  React.useEffect(() => {
    fetchListGroup();
  }, [isOpen, scheduleYear]);

  function handleSelect(week, year) {
    selectedOption(week, year)
    setOpen(false)
  }
  const getListyear = () => {
    let listYear = [];
    for (let i = 2020; i <= currentYear + 2; i++) {
      listYear.push(i)
    }
    return listYear;
  }

  return (
    <>
      <CustomModal
        title={t("LABEL_CHOOSE_WEEK")}
        open={isOpen}
        setOpen={setOpen}
        onCancle={
          () => {
            setOpen(false)
          }
        }
        height='tall'
        maxWidth='sm'
        actionLoading={false}
        manualClose={true}
        canConfirm={true}
        className="custom-select-modal"
        confirmRender={null}
        cancleRender={() => t("IDS_WP_EXIT")}
      >
        <div className="body-head">
          <div className="per-line-modal">
            <SearchInput className={"custom-search"} placeholder={t("LABEL_SEARCH")}
              value={searchValue}
              onChange={handleChangeSearch}
            />   
          </div>
          <div className="per-line-modal tip-line section-choose-week">
            <div>
              <span>
                {t("LABEL_SELECT_TIME")}
              </span>
              <div>
                <Select
                  className={"notify_setting_block__timeTypeSelector"}
                  variant="outlined"
                  value={scheduleYear}
                  onChange={({ target }) => setScheduleYear(target.value)}
                  MenuProps={{
                    className: "notify_setting_block__timeTypeSelector--paper",
                    MenuListProps: {
                      component: Scrollbars,
                    },
                    variant: 'menu'
                  }}
                >
                  {
                    getListyear().map(e => (
                      <MenuItem key={e} value={e}>{t('LABEL_YEAR_FULL', {
                        year: e
                      })}</MenuItem>
                    ))
                  }
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="body-main">
          {
             weeks.map(e =>
              <Row
                appColor={appColor}
                key={e.id}
                weekData={e}
                onSelect={handleSelect}
                isSelected={weekSelected && String(weekSelected.year) === String(e.year) && String(weekSelected.week) === String(e.week) ? true : false}
              />
            ) 
          }
        </div>
      </CustomModal>
    </>
  )
}

export default SelectWeek
