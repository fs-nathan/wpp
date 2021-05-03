import SearchIcon from '@material-ui/icons/Search';
import EmailIcon from '@material-ui/icons/Email';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SearchInput from 'components/SearchInput';
import React, { useMemo, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import CustomModal from 'components/CustomModal';
import styled from 'styled-components';
import { currentColorSelector } from 'views/Chat/selectors';
import { fetchListProjectGroup } from "actions/projectGroup/listProjectGroup";
import { useHistory } from "react-router-dom";
import CreateProjectGroup from '../CreateProjectGroup';
import { CREATE_PROJECT_GROUP, EDIT_PROJECT_GROUP, DELETE_PROJECT_GROUP, CustomEventDispose, CustomEventListener } from "constants/events";
import AlertModal from 'components/AlertModal';
import nodata from "assets/ic_no_data_2021.png";
import { deleteProjectGroup } from 'actions/projectGroup/deleteProjectGroup';

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
          <img src={props.group.icon} />
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
  groupSelected
}) {
  const timeoutRef = useRef(null); 
  const history = useHistory();
  
 
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [groupOriginal, setGroupOriginal] = useState([]);
  const [groupProject, setGroupProject] = useState(groupOriginal);
  const [loading, setLoading] = useState(false);
  
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
      setGroupProject(groupTemp)
    }, 300);    
  }

  async function fetchListGroup() {
    try {
      if (isOpen) {
        const groupData = await fetchListProjectGroup()
        setGroupOriginal(groupData.data.project_groups)
        setGroupProject(groupData.data.project_groups)
      }
    } catch (e){

    }
  }

  React.useEffect(() => {
    fetchListGroup();
  }, [isOpen]);

  React.useEffect(() => {
    CustomEventListener(CREATE_PROJECT_GROUP.SUCCESS, fetchListGroup);
    CustomEventListener(EDIT_PROJECT_GROUP.SUCCESS, fetchListGroup);
    CustomEventListener(DELETE_PROJECT_GROUP.SUCCESS, () => {
      fetchListGroup()
      if (groupDelete && groupSelected === groupDelete.id) {
        selectedOption(null)
      }
      setGroupDelete(null)
    });
    return () => {
      CustomEventDispose(CREATE_PROJECT_GROUP.SUCCESS, fetchListGroup)
      CustomEventListener(EDIT_PROJECT_GROUP.SUCCESS, fetchListGroup);
      CustomEventListener(DELETE_PROJECT_GROUP.SUCCESS, fetchListGroup);
    }
  }, []);


  function handleOpenCreateGroup() {
    setOpenModal(true)
    setGroupUpdate(null)
  }

  function handleOpenEditGroup(group) {
    setOpenModal(true)
    setGroupUpdate({
      id: group.id,
      name: group.name,
      description: group.description,
      icon: group.icon,
      sort_icon: group.short
    })
  }

  function confimDeleteGroup(group) {
    setOpenAlertDelete(true)
    setGroupDelete(group)
  }
  const handleDeleteGroup = () => {
    dispatch(deleteProjectGroup({ projectGroupId: groupDelete.id }))
  }

  function handleSelect(group) {
    selectedOption(group)
    setOpen(false)
  }

  return (
    <>
      <CustomModal
        title={t("DMH.VIEW.PGP.MODAL.CUP.GROUPS")}
        open={isOpen}
        setOpen={setOpen}
        onCancle={
          () => {
            setOpen(false)
          }
        }
        height='tall'
        maxWidth='sm'
        actionLoading={loading}
        manualClose={true}
        canConfirm={true}
        className="custom-select-modal"
        confirmRender={null}
        cancleRender={() => t("IDS_WP_EXIT")}
      >
        <div className="body-head">
          <div className="per-line-modal">
            <SearchInput className={"custom-search"} placeholder={t("LABEL_SEARCH_PROJECT_GROUP")}
              value={searchValue}
              onChange={handleChangeSearch}
            />   
          </div>
          <div className="per-line-modal tip-line">
            <b>{t("LABEL_TIP_IN_OFFER")}</b>
            <span>{t("LABEL_DESCRIPTION_TIP_IN_WORK_GROUP")}</span>
          </div>
          <div className="per-line-modal create-line">
            <span onClick={handleOpenCreateGroup} style={{color: appColor}}>&#43; {t("CREATE_NEW_WORK_GROUP")}</span>
          </div>
        </div>
        <div className="body-main">
          {
            groupProject.length ? groupProject.map(e =>
              <Row
                appColor={appColor}
                key={e.id}
                group={e}
                onSelect={handleSelect}
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
                  <p>{t("LABEL_NO_DATA_SELECT_MODAL_PROJECT_GROUP")}</p>
                  <p>{t("DESCRIPTION_NO_DATA_SELECT_MODAL_PROJECT_GROUP")}</p>
                </div>
              </div>
            )
          }
        </div>
      </CustomModal>
      {
        openModal &&
        <CreateProjectGroup
          open={true}
          setOpen={(value) => setOpenModal(value)}
          updatedProjectGroup={groupUpdate ? groupUpdate : null}
        />
      }
      {
        openAlertDelete &&
        <AlertModal
          setOpen={(value) => setOpenAlertDelete(value)}
          onConfirm={() => handleDeleteGroup()}
          open={true}
          content={t("DMH.VIEW.PGP.LEFT.INFO.ALERT")}
        />
      }
    </>
  )
}

export default SelectGroup
