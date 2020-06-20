import { Avatar, Chip, Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { mdiPlusCircle } from '@mdi/js';
import Icon from '@mdi/react';
import { listUserOfGroup } from 'actions/user/listUserOfGroup';
import CustomModal from 'components/CustomModal';
import CustomSelect from 'components/CustomSelect';
import { bgColorSelector } from 'components/LoadingOverlay/selectors';
import TitleSectionModal from 'components/TitleSectionModal';
import { DEFAULT_OFFER_ITEM } from 'helpers/jobDetail/arrayHelper';
import { findIndex, get, isNaN, keys } from "lodash";
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { allMembersSelector } from 'reducers/user/listOfUserGroup/selectors';
import AddOfferMemberModal from 'views/JobDetailPage/TabPart/OfferTab/AddOfferMemberModal';
import { updateOfferApprovalCondition } from 'views/OfferPage/redux/actions';

const useStyles = makeStyles((theme) => ({
  listChips: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  labelOnlyLogic: {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '4px',
    padding: theme.spacing('5px', '10px'),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    width: '35px',
    height: '28px'
  }
}));

function ApprovalConditionModal({
  open, setOpen, item: offerItem, additionQuery,
  members, doListMemebers, bgColor, doUpdateApprovalConditions
}) {
  const classes = useStyles();
  const { t } = useTranslation();
  const CONDITION_LOGIC_MEMBER = [
    { label: t("VIEW_OFFER_TEXT_CONDITION_LOGIC_OR"), value: "OR" },
    { label: t("VIEW_OFFER_TEXT_CONDITION_LOGIC_AND"), value: "AND" },
  ];
  const CONDITION_LOGIC = [
    { label: t("VIEW_OFFER_LABEL_CONDITION_LOGIC_OR"), value: "OR" },
    { label: t("VIEW_OFFER_LABEL_CONDITION_LOGIC_AND"), value: "AND" }
  ];
  const priorityList = [
    { id: 0, value: t("VIEW_OFFER_LABEL_FILTER_BY_PRIORITY_LEVEL_1") },
    { id: 1, value: t("VIEW_OFFER_LABEL_FILTER_BY_PRIORITY_LEVEL_2") },
    { id: 2, value: t("VIEW_OFFER_LABEL_FILTER_BY_PRIORITY_LEVEL_3") }
  ];

  const defaultOffer = { ...DEFAULT_OFFER_ITEM, priority: priorityList[0], condition_logic: "OR", condition_logic_member: "OR", min_rate_accept: 100 }
  const [tempSelectedItem, setTempSelectedItem] = React.useState(defaultOffer);
  const [handlers, setHandlers] = React.useState([]);
  const [approvers, setApprovers] = React.useState([]);
  const [isOpenAddApproverModal, setOpenAddApproverModal] = React.useState(false);
  const [allMembers, setAllMembers] = React.useState([]);

  const setParams = (nameParam, value) => {
    setTempSelectedItem(prevState => ({ ...prevState, [nameParam]: value }));
  }

  React.useEffect(() => {
    if (members.members.length === 0) {
      doListMemebers(false);
    }
  }, [doListMemebers]);

  React.useEffect(() => {
    if (members.members.length !== 0) setAllMembers(members.members);
  }, [members]);

  const handlersToAddInApprovalCondition = useMemo(() => {
    return (
      handlers.length > 0
        ? allMembers.filter((_, idx) => handlers.includes(idx))
        : []
    );
  }, [handlers]);

  React.useEffect(() => {
    if (offerItem) {
      const {
        user_can_handers,
        priority_code,
        id,
        handlers,   // member object
        approvers,  // member object
      } = offerItem;
      if (user_can_handers) {
        const handlerIndexes = user_can_handers.map(
          handler => findIndex(allMembers, member => member.id === handler.id))
        setHandlers(handlerIndexes.filter(idx => idx !== -1))
      }
      // handlers & approvers are used when editing approval conditions
      if (handlers) {
        const handlerIndexes = handlers.map(
          handler => findIndex(allMembers, member => member.id === handler.id));
        setHandlers(handlerIndexes.filter(idx => idx !== -1)); // use indexes of all members to set
      }
      if (approvers) {
        const keysArr = keys(approvers);
        setApprovers(keysArr.map(item => parseInt(item))); // use indexes of all members to set
      }
      if (priority_code != null) offerItem.priority = priorityList[priority_code];
      if (id != null) offerItem.offer_id = id;
      setTempSelectedItem(offerItem);
    }
  }, [offerItem, allMembers]);

  function handleDeleteApprover(i) {
    return () => {
      approvers.splice(i, 1)
      setApprovers([...approvers])
    }
  }

  function validate() {
    const { condition_logic, min_rate_accept } = tempSelectedItem;
    return condition_logic !== null && !isNaN(parseInt(min_rate_accept));
  }

  function updateApprovalConditions() {
    const approverIds = [];
    approvers.forEach(idx => {
      approverIds.push(handlersToAddInApprovalCondition[idx].id)
    })
    const dataToUpdate = {
      offerId: tempSelectedItem.offer_id,
      minRateAccept: tempSelectedItem.min_rate_accept,
      conditionLogic: tempSelectedItem.condition_logic,
      additionQuery
    }
    if (tempSelectedItem.min_rate_accept < 100 || (tempSelectedItem.min_rate_accept === 100 && tempSelectedItem.condition_logic === 'OR')) {
      dataToUpdate.conditionLogicMember = tempSelectedItem.condition_logic_member;
      dataToUpdate.memberAcceptedImportantIds = approverIds;
    }
    doUpdateApprovalConditions(dataToUpdate);
  }

  function handleRateChange(value) {
    var rateAccept = parseInt(value, 10);
    if (!isNaN(rateAccept)) {
      if (rateAccept > 100) rateAccept = 100;
      else if (rateAccept < 0) rateAccept = 0;
    } else rateAccept = '';
    if (rateAccept == 100) {
      setParams("condition_logic", 'OR');
    }
    setParams("min_rate_accept", rateAccept);
  }

  return (
    <>
      <CustomModal
        title={t('VIEW_OFFER_LABEL_UPDATE_APPROVAL_CONDITION')}
        height='mini'
        open={open}
        setOpen={setOpen}
        confirmRender={t('LABEL_CHAT_TASK_CHINH_SUA')}
        canConfirm={validate()}
        onConfirm={updateApprovalConditions}
      >
        <>
          <TitleSectionModal label={t("VIEW_OFFER_LABEL_APPROVAL_CONDITION")} />
          <Grid container spacing={2} className="offerModal__updateOfferApprovalCondition">
            <Grid item xs={7}>
              <Grid container alignItems="center">
                <div className="offerModal--input_rate_prefix_1">
                  <div>{t("VIEW_OFFER_LABEL_RATE_AGREE")} ≥</div>
                </div>
                <div className="offerModal--input__rate">
                  <input
                    value={tempSelectedItem.min_rate_accept}
                    placeholder={tempSelectedItem.min_rate_accept}
                    onChange={(e) => handleRateChange(e.target.value)}
                    type="number"
                    min="0"
                    max="100"
                    oninput="validity.valid||(value='');"
                  />
                </div>
                <div className="offerModal--input_rate_suffix">
                  <div>%</div>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              {
                tempSelectedItem.min_rate_accept === 100 ?
                  <div className={classes.labelOnlyLogic}>{CONDITION_LOGIC[0].label}</div>
                  :
                  <CustomSelect
                    className="offerModal--custom_select"
                    options={CONDITION_LOGIC}
                    value={CONDITION_LOGIC.find(option =>
                      option.value.toLowerCase() === tempSelectedItem.condition_logic.toLowerCase()
                    )}
                    onChange={(condition_logic) => setParams("condition_logic", condition_logic.value)}
                  />
              }
            </Grid>
            {
              (tempSelectedItem.min_rate_accept < 100 || (tempSelectedItem.min_rate_accept === 100 && tempSelectedItem.condition_logic === 'OR')) &&
              (
                <>
                  <Grid item xs={7}>
                    <Grid container >
                      <CustomSelect
                        options={CONDITION_LOGIC_MEMBER}
                        value={CONDITION_LOGIC_MEMBER.find(option =>
                          option.value.toLowerCase() === tempSelectedItem.condition_logic_member.toLowerCase()
                        )}
                        onChange={(condition_logic_member) => setParams('condition_logic_member', condition_logic_member.value)}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <IconButton className="offerModal-buttonAdd" onClick={() => setOpenAddApproverModal(true)}>
                      <Icon size={0.8} path={mdiPlusCircle} color={bgColor.color} />
                      <span className="offerModal-buttonAdd-title">{t('LABEL_CHAT_TASK_THEM')}</span>
                    </IconButton>
                  </Grid>
                </>
              )
            }
            <Grid xs={12}>
              <div className={classes.listChips}>
                {handlersToAddInApprovalCondition && approvers.map((handlersToAddIdx, idx) => {
                  return (
                    <Chip
                      key={handlersToAddIdx}
                      avatar={<Avatar alt="avatar" src={get(handlersToAddInApprovalCondition, `[${handlersToAddIdx}].avatar`)} />}
                      label={get(handlersToAddInApprovalCondition, `[${handlersToAddIdx}].name`)}
                      onDelete={handleDeleteApprover(idx)}
                    />
                  )
                }
                )}
              </div>
            </Grid>
          </Grid>
        </>
      </CustomModal>
      <AddOfferMemberModal
        isOpen={isOpenAddApproverModal}
        setOpen={setOpenAddApproverModal}
        value={approvers}
        onChange={setApprovers}
        members={handlersToAddInApprovalCondition}
        disableIndexes={[]}
        isUpdate={true}
      />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doListMemebers: (quite) => dispatch(listUserOfGroup(quite)),
    doUpdateApprovalConditions: (dataToUpdate) => dispatch(updateOfferApprovalCondition(dataToUpdate))
  };
};

export default connect(
  state => ({
    members: allMembersSelector(state),
    bgColor: bgColorSelector(state)
  }),
  mapDispatchToProps
)(ApprovalConditionModal);