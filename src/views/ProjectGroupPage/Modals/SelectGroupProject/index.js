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
import { getListGroupOffer } from "actions/offer";
import { useHistory } from "react-router-dom";
import { action } from "views/OfferPage/contants/attrs";
import CreateOfferGroup from "views/OfferPage/views/OfferByGroup/modal";
import { CREATE_OFFER_GROUP_SUCCESS, UPDATE_OFFER_GROUP_SUCCESS, DELETE_OFFER_GROUP_SUCCESS, CustomEventDispose, CustomEventListener } from "constants/events";
import AlertModal from 'components/AlertModal';
import { deleteGroupOffer } from 'views/OfferPage/redux/actions';
import nodata from "assets/no-data.png";

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
    props.handleOpenEditOfferGroup(props.group)
  }
  const deleteOfferGroup = (evt) => {
    evt.stopPropagation();
    props.confimDeleteOfferGroup(props.group)
  }

  return (
    <StyledDiv selectedColor={props.appColor} onClick={handleSelect}>
      <div className={`line-option per-line-modal ${classRow}`}>
        <div className="icon-option">
          <EmailIcon />
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
  offerGroupSelected
}) {
  const timeoutRef = useRef(null); 
  const history = useHistory();
  
 
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [groupOfferOriginal, setGroupOfferOriginal] = useState([]);
  const [groupOffer, setGroupOffer] = useState(groupOfferOriginal);
  const [loading, setLoading] = useState(false);
  
  const [openModalOfferGroup, setOpenModalOfferGroup] = useState(false);
  const [modalOfferGroupType, setModalOfferGroupType] = useState(action.CREATE_OFFER);
  const [groupOfferUpdate, setGroupOfferUpdate] = useState(null);
  const [openAlertDeleteOfferGroup, setOpenAlertDeleteOfferGroup] = useState(false);
  const [groupOfferDelete, setGroupOfferDelete] = useState(null);

  const appColor = useSelector(currentColorSelector)

  function handleChangeSearch(evt) {
    setSearchValue(evt.target.value)
    const value = evt.target.value
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(()=> {
      timeoutRef.current = null;
      let groupOfferTemp = []
      groupOfferOriginal.map(e => {
        if (String(e.name).toLowerCase().indexOf(String(value).toLowerCase()) >= 0) {
          groupOfferTemp.push(e)
        }
      })
      setGroupOffer(groupOfferTemp)
    }, 300);    
  }

  async function fetchListOfferGroup() {
    try {
      if (isOpen) {
        const groupData = await getListGroupOffer()
        setGroupOfferOriginal(groupData.data.offers_group)
        setGroupOffer(groupData.data.offers_group)
      }
    } catch (e){

    }
  }

  React.useEffect(() => {
    fetchListOfferGroup();
  }, [isOpen]);

  React.useEffect(() => {
    CustomEventListener(CREATE_OFFER_GROUP_SUCCESS, fetchListOfferGroup);
    CustomEventListener(UPDATE_OFFER_GROUP_SUCCESS, fetchListOfferGroup);
    CustomEventListener(DELETE_OFFER_GROUP_SUCCESS, () => {
      fetchListOfferGroup()
      if (groupOfferDelete && offerGroupSelected === groupOfferDelete.id) {
        selectedOption(null)
      }
      setGroupOfferDelete(null)
    });
    return () => {
      CustomEventDispose(CREATE_OFFER_GROUP_SUCCESS, fetchListOfferGroup)
      CustomEventDispose(UPDATE_OFFER_GROUP_SUCCESS, fetchListOfferGroup)
      CustomEventDispose(DELETE_OFFER_GROUP_SUCCESS, fetchListOfferGroup)
    }
  }, []);


  function handleOpenCreateOfferGroup() {
    setOpenModalOfferGroup(true)
    setModalOfferGroupType(action.CREATE_OFFER)
    setGroupOfferUpdate(null)
  }

  function handleOpenEditOfferGroup(group) {
    setOpenModalOfferGroup(true)
    setModalOfferGroupType(action.UPDATE_OFFER)
    setGroupOfferUpdate(group)
  }

  function confimDeleteOfferGroup(group) {
    setOpenAlertDeleteOfferGroup(true)
    setGroupOfferDelete(group)
  }
  const handleDeleteGroupOffer = () => {
    dispatch(deleteGroupOffer({ id: groupOfferDelete.id }))
  }

  return (
    <>
      <CustomModal
        title={t("LABEL_CHAT_TASK_CHON_NHOM_DE_XUAT")}
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
            <SearchInput className={"custom-search"} placeholder={t("LABEL_SEARCH_OFFER_GROUP")}
              value={searchValue}
              onChange={handleChangeSearch}
            />   
          </div>
          <div className="per-line-modal tip-line">
            <b>{t("LABEL_TIP_IN_OFFER")}</b>
            <span>{t("LABEL_DESCRIPTION_TIP_IN_ORDER")}</span>
          </div>
          <div className="per-line-modal create-line">
            <span onClick={handleOpenCreateOfferGroup} style={{color: appColor}}>&#43; {t("CREATE_NEW_OFFER_GROUP")}</span>
          </div>
        </div>
        <div className="body-main">
          {
            groupOffer.length ? groupOffer.map(e =>
              <Row
                appColor={appColor}
                key={e.id}
                group={e}
                onSelect={selectedOption}
                isSelected={offerGroupSelected === e.id ? true : false}
                handleOpenEditOfferGroup={handleOpenEditOfferGroup}
                confimDeleteOfferGroup={confimDeleteOfferGroup}
              />
            ) : (
              <div class="no-data-parent">
                <div class="no-data-selection">
                  <img
                    className="MuiAvatar-img"
                    src={nodata}
                  />
                  <p>{t("LABEL_NO_DATA_SELECT_MODAL_OFFER_GROUP")}</p>
                  <p>{t("DESCRIPTION_NO_DATA_SELECT_MODAL_OFFER_GROUP")}</p>
                </div>
              </div>
            )
          }
        </div>
      </CustomModal>
      {
        openModalOfferGroup &&
        <CreateOfferGroup
          type={modalOfferGroupType}
          open={true}
          setOpen={(value) => setOpenModalOfferGroup(value)}
          name={groupOfferUpdate ? groupOfferUpdate.name : ""}
          description={groupOfferUpdate ? groupOfferUpdate.description : ""}
          offer_group_id={groupOfferUpdate ? groupOfferUpdate.id : ""}
        />
      }
      {
        openAlertDeleteOfferGroup &&
        <AlertModal
          setOpen={(value) => setOpenAlertDeleteOfferGroup(value)}
          onConfirm={() => handleDeleteGroupOffer()}
          open={true}
          content={t("VIEW_OFFER_TEXT_DELETE_GROUP_OFFER_WARNING")}
        />
      }
    </>
  )
}

export default SelectGroup
