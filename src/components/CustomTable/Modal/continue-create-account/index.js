import { mdiClose, mdiLockOutline, mdiUpload } from '@mdi/js';
import { actionAddMutipleMember } from 'actions/groupUser/addMembertoGroup';
import { actionToast } from 'actions/system/system';
import { detailUser } from 'actions/user/detailUser';
import { listUserOfGroup } from 'actions/user/listUserOfGroup';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';
import Icon from "@mdi/react";
import CustomModal from 'components/CustomModal';
import { Button, FormControl, InputAdornment, OutlinedInput } from '@material-ui/core';
import { searchUser, searchUserReset } from 'actions/groupUser/searchUser';
import { inviteUserJoinGroup } from 'actions/groupUser/inviteUserJoinGroup';
import { listRoom } from 'actions/room/listRoom';
import { CustomEventDispose, CustomEventListener } from 'constants/events';
import { UPDATE_USER } from 'constants/actions/user/updateUser';
import { DETAIL_USER } from 'constants/actions/user/detailUser';
import { LIST_USER_OF_GROUP } from 'constants/actions/user/listUserOfGroup';
import ReactParserHtml from 'react-html-parser';
import '../../HeaderButtonGroup/style.scss';
import { ic_loading } from 'assets';
import {memberProject} from "../../../../actions/project/memberProject";
import {isNil} from "lodash";
import {useParams} from "react-router-dom";

const ModalContinueCreateAccount = ({
    doReloadUser,
    setOpenResultCreateAccount,
    profile,
    setOpenUploadExcel,
    room,
    doListRoom,
    fileExcel,
    updatedUser = null,
    openContinueCreateAccount,
      setOpenContinueCreateAccount,
      colors,
      result,setResult,
}) => {
   
    const [loading,setLoading] = React.useState(false);
    const [disable, setDisable] = React.useState(false);
    const [activeMask, setActiveMask] = React.useState(-1);
    const [roomList, setRoomList] = React.useState(null);
    const { projectId: _projectId } = useParams();
    const [rowTable, setRowTable] = React.useState([
      {
        email: "",
        name: "",
        room: "",
      }
    ]);
    
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const bgColor = colors.find((item) => item.selected === true);

    const handleOnchange = (key, index) => (e) => {
      const valueInput = e.target.value;
      const NewRowTable = rowTable.map((item, indexItem) => {
        if (indexItem === index) {
          return { ...item, [key]: valueInput };
        }
        return item;
      });
      //  const newData = {...rowTable[index], [key]: valueInput};
      setRowTable(NewRowTable);
    };
      const handleAddRowTable = () => {
        if (rowTable.length === 99) {
          setDisable(true);
        }
        setRowTable([...rowTable, { email: "", name: "", room: "" }]);
      };
      const handleDeleRowTable = (index) => {
        const newTable = rowTable.filter((el, indexEl) => indexEl !== index);
        setRowTable(newTable);
      };
      
      React.useEffect(()=> {
        if(Array.isArray(fileExcel)){
          fileExcel.map(item => {
            if(item){
             rowTable.push({email: item[1], name: item[2], room: ''});
             
            }
            return null;
         })
        }
       
      },[fileExcel])
       const handleToast = (type, message) => {
        dispatch(actionToast(type,message))
       }
      const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
      try {
       const {data} = await actionAddMutipleMember({account_list: rowTable, password: e.target.elements.password.value})
        if(data.state){
          setLoading(false);
          handleToast('success', t('IDS_WP_CREATE_ACCOUNT_SUCCESS'))
           setOpenContinueCreateAccount(false);
           setRowTable([{
            email: "",
            name: "",
            room: "",
          }])
           setOpenResultCreateAccount(true);
           doReloadUser({userId: profile.id, projectId: _projectId});
           setResult(data.account_list);
        }
      } catch (error) {
        setLoading(false);
        handleToast('error', t('SNACK_MUTATE_FAIL'))
      }
        
       
      };
    
      const handleDeleteAllRow = () => {
        setRowTable([]);
      };

      React.useEffect(() => {
        doListRoom();
        // eslint-disable-next-line
      }, []);
      
      React.useEffect(()=> {
        if(fileExcel){
          
        }
  },[fileExcel])
      React.useEffect(() => {
        const fail = () => {
          setActiveMask(-1);
        };
        CustomEventListener(UPDATE_USER.SUCCESS, doReloadUser);
        CustomEventListener(UPDATE_USER.FAIL, fail);
        return () => {
          CustomEventDispose(UPDATE_USER.SUCCESS, doReloadUser);
          CustomEventDispose(UPDATE_USER.FAIL, fail);
        };
        // eslint-disable-next-line
      }, [updatedUser]);
      React.useEffect(()=>{
        if(room){
          setRoomList(room.data.rooms)
        }
      },[room])
      React.useEffect(() => {
        const success = (bit) => () => {
          setActiveMask((oldMask) => oldMask | (1 << bit));
        };
        const fail = () => {
          setActiveMask(-1);
        };
        CustomEventListener(DETAIL_USER.SUCCESS, success(0));
        CustomEventListener(LIST_USER_OF_GROUP.SUCCESS, success(1));
        CustomEventListener(DETAIL_USER.FAIL, fail);
        CustomEventListener(LIST_USER_OF_GROUP.FAIL, fail);
        return () => {
          CustomEventDispose(DETAIL_USER.SUCCESS, success(0));
          CustomEventDispose(LIST_USER_OF_GROUP.SUCCESS, success(1));
          CustomEventDispose(DETAIL_USER.FAIL, fail);
          CustomEventDispose(LIST_USER_OF_GROUP.FAIL, fail);
        };
      }, [updatedUser]);

     
    return (
        <CustomModal
        title={t("IDS_WP_SIGN_UP")}
        open={openContinueCreateAccount}
        manualClose={true}
        setOpen={setOpenContinueCreateAccount}
        activeLoading={loading}
        onCancle={() => {setRowTable([{
          email: "",
          name: "",
          room: "",
        }]);
        setOpenContinueCreateAccount(false)}}
        confirmRender={()=>(t("IDS_WP_SIGN_UP"))}
        type="submit"
        form="form-create-multile-account"
        className={`modal_continue-create ${loading && 'modal_continue-create-loading'}`}
      >
        <form id="form-create-multile-account" onSubmit={handleSubmit}>
          <div className="modal_continue-create_header">
            <Button
              disabled={disable}
              className="account-internal_btn-create-account"
              style={{ textTransform: "unset" }}
              onClick={handleAddRowTable}
            >
              + {t("IDS_WP_ACCOUNT_INTERNAL_ADD_ROW")}
            </Button>
            <h3>{t("IDS_WP_ACCOUNT_INTERNAL_CREATE_LIST_ACCOUNT")}</h3>
            <div
              className="upload-excel"
              onClick={() => {
                setOpenContinueCreateAccount(false);
                setOpenUploadExcel(true);
              }}
            >
              <input
                className="display-none"
                id="upload_file"
                multiple
                type="file"
                // onChange={onChangeFile}
              />
              <Icon
                path={mdiUpload}
                size={1}
                color={"rgba(0, 0, 0, 0.54)"}
              />

              <div>{t("IDS_WP_ACCOUNT_INTERNAL_UPLOAD_EXCEL")}</div>
            </div>
          </div>
          <div className="modal_continue-create_table">
            <table style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>{t("IDS_WP_ACCOUNT_INTERNAL_TABLE_NO")}</th>
                  <th>{t("IDS_WP_ACCOUNT_INTERNAL_TABLE_ACCOUNT")}</th>
                  <th>
                    {t("IDS_WP_ACCOUNT_INTERNAL_TABLE_NAME_MEMBER")}
                  </th>
                  <th>{t("IDS_WP_ACCOUNT_INTERNAL_TABLE_PART")}</th>
                  <th>
                    <div
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={handleDeleteAllRow}
                    >
                      {t("IDS_WP_ACCOUNT_INTERNAL_TABLE_DELETE_ALL")}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rowTable &&
                  rowTable.map((item, index) => (
                    <tr key={`${index}`}>
                      <td
                        style={{ textAlign: "center", padding: "0 10px" }}
                      >
                        {index + 1}
                      </td>
                      <td>
                        <input
                          onChange={handleOnchange("email", index)}
                          required
                          type="email"
                          placeholder={t('IDS_WP_CREATE_ACCOUNT_ENTER_EMAIL')}
                          value={item.email && item.email}
                        />
                      </td>
                      <td>
                        <input
                          onChange={handleOnchange("name", index)}
                          required
                          placeholder={t('IDS_WP_CREATE_ACCOUNT_ENTER_NAME')}
                          value={item.name && item.name}
                        />
                      </td>
                      <td>
                        <select
                          onChange={handleOnchange("room", index)}
                        >
                          {roomList && roomList.map((items,indexs)=>(
                            <option key={indexs} value={items.id}>{items.name}</option>
                          ))}
                          
                        </select>
                      </td>

                      <td>
                        <Button onClick={() => handleDeleRowTable(index)}>
                          <Icon
                            path={mdiClose}
                            size={1}
                            color={"rgba(0, 0, 0, 0.54)"}
                          />{" "}
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <p style={{ color: "red" }}>
              {t("IDS_WP_ACCOUNT_INTERNAL_ADDED")}: {rowTable.length}/100{" "}
              {t("IDS_WP_ACCOUNT_INTERNAL_ADDED_NOTE")}
            </p>
            <h5>
              {t("IDS_WP_MODAL_CHANGE_ACCOUNT_LABEL_PASSWORD")}{" "}
              <span style={{ color: "red" }}>*</span>
            </h5>
            <div
              style={{ whiteSpace: "break-spaces", lineHeight: "24px" }}
            >
              {ReactParserHtml(t("IDS_WP_ACCOUNT_INTERNAL_SET_PASSWORD"))}
            </div>
            <FormControl
              margin="normal"
              variant="outlined"
              className="input-affix-wrapper custom-input item-pwd"
            >
              <OutlinedInput
                id="password"
                required
                type="password"
                autoComplete="new-password"
                placeholder={t("IDS_WP_PASSWORD")}
                size="small"
                // onBlur={handleCheckPwd}
                inputProps={{ maxLength: 20, minLength: 8 }}
                startAdornment={
                  <InputAdornment position="start">
                    <Icon
                      className="icon-prefix"
                      path={mdiLockOutline}
                      size={1}
                    />
                  </InputAdornment>
                }
              />
              <div
                className="suggest-password"
                style={{ marginTop: "15px" }}
              >
                {t("IDS_WP_ENTER_REGISTER_PASSWORD_SUGGESTED")}
              </div>
            </FormControl>
          </div>
          {loading && <div className="loading">
          <img src={ic_loading} alt=""/>
          <div style={{color: bgColor.color, fontSize: '16px'}}>{t('IDS_WP_CREATING_ACOUNT')}</div>
          <div style={{marginTop: '5px'}}>{t('IDS_WP_CREATING_ACCOUNT_TIME_OUT')}</div>
        </div>}
        </form>
      </CustomModal>
    )
}
const mapStateToProps = (state) => {
    return {
      profile: state.system.profile,
      room: state.room.listRoom,
      colors: state.setting.colors
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      actionToast,
      doReloadUser: ({ userId, projectId = null }) => {
        dispatch(detailUser({ userId }, true));
        dispatch(listUserOfGroup(true));
        if(!isNil(projectId)) dispatch(memberProject({projectId}));
      },
      doSearchUser: ({ info }, quite) => dispatch(searchUser({ info }, quite)),
      doSearchUserReset: () => dispatch(searchUserReset()),
      doInviteUserJoinGroup: ({ userId }) =>
        dispatch(inviteUserJoinGroup({ userId })),
        doListRoom: (quite) => dispatch(listRoom(quite)),
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)(ModalContinueCreateAccount);