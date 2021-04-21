import SearchIcon from '@material-ui/icons/Search';
import EventIcon from '@material-ui/icons/Event';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SearchInput from 'components/SearchInput';
import React, { useMemo, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import CustomModal from 'components/CustomModal';
import styled from 'styled-components';
import { currentColorSelector } from 'views/Chat/selectors';
import { fetchListCategory } from 'actions/calendar/alarmCalendar/listPersonalRemindCategory';
import { useHistory } from "react-router-dom";
import { CREATE_PERSONAL_REMIND_CATEGORY, UPDATE_PERSONAL_REMIND_CATEGORY, DELETE_PERSONAL_REMIND_CATEGORY, CustomEventDispose, CustomEventListener } from "constants/events";
import AlertModal from 'components/AlertModal';
import nodata from "assets/ic_no_data_2021.png";
import { deletePersonalRemindCategory } from 'actions/calendar/alarmCalendar/deletePersonalRemindCategory';
import { createPersonalRemindCategory } from 'actions/calendar/alarmCalendar/createPersonalRemindCategory';
import { updatePersonalRemindCategory } from 'actions/calendar/alarmCalendar/updatePersonalRemindCategory';
import CreateModal from "views/CalendarPage/views/Modals/CreateGroupPersonalRemind";
import EditModal from "views/CalendarPage/views/Modals/UpdateGroupPersonalRemind";

export const StyledDiv = styled.div`
  .line-option-selected {
    background: ${props => props.selectedColor}!important;
    color: #fff!important
  }
`

const Row = (props) => {
  const classRow = props.isSelected ? "line-option-selected" : ""

  const handleSelect = () => {
    props.onSelect(props.group)
  }

  const editOfferGroup = (evt) => {
    evt.stopPropagation();
    props.handleOpenEditGroup(props.group)
  }
  const deleteOfferGroup = (evt) => {
    evt.stopPropagation();
    props.confimDeleteGroup(props.group)
  }

  return (
    <StyledDiv selectedColor={props.appColor} onClick={handleSelect}>
      <div className={`line-option per-line-modal ${classRow}`}>
        <div className="icon-option">
          <EventIcon />
        </div>
        <div className="name-option">
          {props.group.name}
        </div>
        {
          props.group.can_modify &&
          <div className="control-option">
            <CreateIcon onClick={editOfferGroup} />
            <DeleteOutlineIcon onClick={deleteOfferGroup} />
          </div>
        }
      </div>
    </StyledDiv>
  )
}


function SelectGroup({
  isOpen,
  setOpen,
  onSubmit = () => {},
  selectedOption = () => {},
  groupSelected,
}) {
  const timeoutRef = useRef(null); 
  const history = useHistory();
  
 
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [groupOriginal, setGroupOriginal] = useState([]);
  const [groupTask, setGroupTask] = useState(groupOriginal);
  const [isLoading, setIsLoading] = React.useState(false);
  
  const [openModal, setOpenModal] = useState(false);
  const [groupUpdate, setGroupUpdate] = useState(null);
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  const [groupDelete, setGroupDelete] = useState(null);

  const appColor = useSelector(currentColorSelector)

  function handleChangeSearch(evt) {
    setSearchValue(evt.target.value)
    const value = evt.target.value
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(()=> {
      timeoutRef.current = null;
      let groupTemp = []
      groupOriginal.map(e => {
        if (String(e.name).toLowerCase().indexOf(String(value).toLowerCase()) >= 0) {
          groupTemp.push(e)
        }
      })
      setGroupTask(groupTemp)
    }, 300);    
  }

  async function fetchListGroup() {
    try {
      if (isOpen) {
        const groupData = await fetchListCategory()
        setGroupOriginal(groupData.data.categories)
        setGroupTask(groupData.data.categories)
      }
    } catch (e){

    }
  }

  React.useEffect(() => {
    fetchListGroup();
  }, [isOpen]);

  React.useEffect(() => {
    CustomEventListener(CREATE_PERSONAL_REMIND_CATEGORY, fetchListGroup);
    CustomEventListener(UPDATE_PERSONAL_REMIND_CATEGORY, () => {
      setGroupUpdate(null)
      fetchListGroup()
    });
    CustomEventListener(DELETE_PERSONAL_REMIND_CATEGORY, () => {
      fetchListGroup()
      if (groupDelete && groupSelected === groupDelete.id) {
        selectedOption(null)
      }
      setGroupDelete(null)
    });
    return () => {
      CustomEventDispose(CREATE_PERSONAL_REMIND_CATEGORY, fetchListGroup);
      CustomEventDispose(UPDATE_PERSONAL_REMIND_CATEGORY, () => {
        setGroupUpdate(null)
        fetchListGroup()
      });
      CustomEventDispose(DELETE_PERSONAL_REMIND_CATEGORY, () => {
        fetchListGroup()
        if (groupDelete && groupSelected === groupDelete.id) {
          selectedOption(null)
        }
        setGroupDelete(null)
      });
    }
  }, []);


  function handleOpenCreateGroup() {
    setOpenModal(true)
    setGroupUpdate(null)
    setIsLoading(false)
  }

  function handleCreateGroupRemind(value) {
    dispatch(createPersonalRemindCategory({ name: value.title, color: value.color }, false))
  }

  function handleOpenEditGroup(group) {
    setGroupUpdate(group)
    setIsLoading(false)
  }

  function handleUpdateCategory(value) {
    dispatch(updatePersonalRemindCategory({ categoryID: value.id, name: value.title, color: value.color }, false))
  }

  function confimDeleteGroup(group) {
    setOpenAlertDelete(true)
    setGroupDelete(group)
  }
  const handleDeleteGroup = () => {
    dispatch(deletePersonalRemindCategory({ categoryID: groupDelete.id }))
  }

  return (
    <>
      <CustomModal
        title={t("views.calendar_page.modal.create_personal_remind.choose_category")}
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
            <SearchInput className={"custom-search"} placeholder={t("LABEL_SEARCH_PERSONAL_CATEGORY")}
              value={searchValue}
              onChange={handleChangeSearch}
            />   
          </div>
          <div className="per-line-modal tip-line">
            <b>{t("LABEL_TIP_IN_OFFER")}</b>
            <span>{t("LABEL_DESCRIPTION_TIP_IN_PERSONAL_CATEGORY")}</span>
          </div>
          <div className="per-line-modal create-line">
            <span onClick={handleOpenCreateGroup} style={{color: appColor}}>&#43; {t("CREATE_NEW_PERSONAL_CATEGORY")}</span>
          </div>
        </div>
        <div className="body-main">
          {
            groupTask.length ? groupTask.map(e =>
              <Row
                appColor={appColor}
                key={e.id}
                group={e}
                onSelect={selectedOption}
                isSelected={groupSelected === e.id ? true : false}
                handleOpenEditGroup={handleOpenEditGroup}
                confimDeleteGroup={confimDeleteGroup}
              />
            ) : (
              <div className="no-data-parent">
                <div className="no-data-selection">
                  <img
                    className="MuiAvatar-img"
                    src={nodata}
                  />
                  <p>{t("LABEL_NO_DATA_SELECT_MODAL_TASK_GROUP")}</p>
                  <p>{t("DESCRIPTION_NO_DATA_SELECT_MODAL_TASK_GROUP")}</p>
                </div>
              </div>
            )
          }
        </div>
      </CustomModal>
      {
        !groupUpdate ?
        <CreateModal
          open={openModal}
          setOpen={(value) => setOpenModal(value)}
          onConfirm={(value) => {
            setIsLoading(true);
            handleCreateGroupRemind(value);
          }}
          isLoading={isLoading}
        /> :
        <EditModal
          open={true}
          setOpen={(value) => {
            if (!value) {
              setGroupUpdate(null)
            }
          }}
          value={groupUpdate}
          onConfirm={(value) => {
            setIsLoading(true);
            handleUpdateCategory(value);
          }}
          isLoading={isLoading}
        />
      }
      
      {
        openAlertDelete &&
        <AlertModal
          setOpen={(value) => setOpenAlertDelete(value)}
          onConfirm={() => handleDeleteGroup()}
          open={true}
          content={t("DMH.VIEW.PP.MODAL.CUGT.ALERT")}
        />
      }
    </>
  )
}

export default SelectGroup
