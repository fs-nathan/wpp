import {Collapse, List} from '@material-ui/core';
import {getMember, getMemberNotAssigned} from 'actions/taskDetail/taskDetailActions';
import SearchInput from 'components/SearchInput';
import React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import AddMemberModal from 'views/JobDetailPage/ListPart/ListHeader/AddMemberModal';
import MemberListItem from './MemberListItem';
import {filter, map, size, forEach} from "lodash";
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import './styles.scss';
import * as images from '../../../../../assets/index';
import MembersSettingModal from "../../../../ProjectPage/Modals/MembersSetting";
import OptionModal from "../OptionModal";

function TabBody() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const members = useSelector(state => state.taskDetail.taskMember.membersByRole);
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const projectId = useSelector(
    (state) => state.taskDetail.commonTaskDetail.activeProjectId
  );
  const [open, setOpen] = React.useState(false);
  const [openMemberSettingModal, setOpenMemberSettingModal] = React.useState(false);
  const [openOption, setOpenOption] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState(null);
  const [isExpandTypes, setIsExpandTypes] = React.useState({});
  const [listMembers, setListMembers] = React.useState(members);

  const searchMemberTabPart = (e) => {
    const _members = map(members, function (item) {
      const m = filter(item.members, function (member) {
        return member.name.toLowerCase().includes(e.target.value.toLowerCase());
      });
      return {...item, members: m};
    });
    setListMembers(_members);
  }
  function handleClickPermission() {
    setOpen(true)
    dispatch(getMember({ task_id: taskId }));
    dispatch(getMemberNotAssigned({ task_id: taskId }));
  }

  React.useEffect(() => {
    setListMembers(members);
  }, [members]);

  React.useEffect(() => {
    forEach(listMembers, function (item, index) {
      setIsExpandTypes(prevState => ({...prevState, [index]: true}));
    });
  }, [listMembers]);
  return (
    <>
      <Scrollbars className="memberTabBody"
                  renderView={props => <div {...props} className="memberTabBody--container" />}
                  autoHide autoHideTimeout={500} autoHideDuration={200}>
        <div className="container-member-tabbody">
          <div
            className="memberTabBody--search"
          >
            <SearchInput
              placeholder={t('LABEL_CHAT_TASK_NHAP_TU_KHOA')}
              fullWidth
              onChange={e => searchMemberTabPart(e)}
            />
            <div className={"memberTabBody--joinedUsers"}>
              <img src={images.workplace_app} width={20} height={15}/>
              <span className={"memberTabBody--joinedUsers_label"}>
              {t("LABEL_JOINED_USERS_COUNT", {counts: listMembers.reduce((sum, item) => sum + size(item.members), 0)})}
            </span>
              <Typography className={"memberTabBody--joinedUsers_link"}>
                <Link onClick={() => handleClickPermission()} style={{cursor: "pointer"}}>
                  + {t("LABEL_CHAT_TASK_THEM_THANH_VIEN")}
                </Link>
              </Typography>
            </div>
          </div>
          {map(listMembers, function (item, key) {
            if(size(item.members) === 0) return <></>;
            return (
              <List
                className={"memberTabBody--memberList"}
                onClick={() => {
                  isExpandTypes[key] = !isExpandTypes[key];
                  setIsExpandTypes({...isExpandTypes});
                }}
              >
                <div className={"memberTabBody--memberList_header"}>
                  {item.name} ({size(item.members) < 10 ? "0" + size(item.members) : size(item.members)})
                  {isExpandTypes[key] ? <ExpandMore /> : <ExpandLess />}
                </div>
                <Collapse in={isExpandTypes[key] ?? true} timeout={"auto"} unmountOnExit>
                  {item.members.map((element) => {
                    return (
                      <MemberListItem
                        key={element.id} {...element}
                        handleClickPermission={handleClickPermission}
                        handleClickOptionModal={() => {
                          setOpenOption(true);
                          setSelectedMember(element);
                        }}
                      />
                    );
                  })}
                </Collapse>
              </List>
            );
          })}
          <AddMemberModal isOpen={open} setOpen={setOpen} />
          <MembersSettingModal
            open={openMemberSettingModal}
            setOpen={setOpenMemberSettingModal}
            project_id={projectId}
          />
        </div>
      </Scrollbars>
      <OptionModal open={openOption} setOpen={setOpenOption} member={selectedMember}/>
    </>
  )
}

export default TabBody;
