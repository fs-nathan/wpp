import {
  Avatar,
  Box,
  ButtonBase,
  Dialog,
  IconButton,
  List,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import { mdiPin, mdiStarHalf } from "@mdi/js";
import Icon from "@mdi/react";
import StyledTypo from "components/ColorTypo";
import { apiService } from "constants/axiosInstance";
import colors from "helpers/colorPalette";
import linkify from "linkifyjs/string";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToggle } from "react-use";
import ModalCommon from "views/DocumentPage/TablePart/DocumentComponent/ModalCommon";
import EmptyHolder from "views/JobPage/components/EmptyHolder";
import { emptyArray, emptyObject } from "views/JobPage/contants/defaultValue";
import {
  createMapPropsFromAttrs,
  encodeQueryData,
  injectClassName,
  template,
} from "views/JobPage/utils";
import { ItemMenu } from "views/SettingGroupPage/GroupPermissionSettings/components/ItemMenu";
import TasksScrollbar from "views/SettingGroupPage/GroupPermissionSettings/components/TasksScrollbar";
import ListItemLayout from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/ListItemLayout";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import AsyncTracker from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/components/AyncTracker";
import useAsyncTracker from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/useAsyncTracker";
import TasksCard from "../components/TasksCard";
import { postAttr } from "../contant/attrs";
import { comment, like, love } from "../contant/icons";
import { routes } from "../contant/routes";
import PostEditor from "../Middle/PostEditor";
import { postModule } from "../redux/post";
import AvatarGroup from "./AvatarGroup";
import { CommentInput } from "./CommentInput";
import { FileListItem } from "./FileListItem";
import nodataimg from "./ic_no_data.png";
import likeImage from "./like-image.jpg";
import loveImage from "./love-image.png";
import Message from "./Message";
import "./Post.css";
import { PostActionButton } from "./PostActionButton";

const CommentList = ({ comments = emptyArray, onReplyClick }) => {
  return (
    <>
      {comments.map((c, i) => (
        <Message
          comments={c.comments}
          key={i}
          message={c}
          onReplyClick={c.id ? () => onReplyClick(c) : undefined}
        ></Message>
      ))}
    </>
  );
};
const profileSelector = (state) => state.system.profile;
const CommentListContainer = () => {
  const [reply, setReply] = useState();
  const [newComments, setNewComments] = useState({
    default: [],
  });
  const profile = useSelector(profileSelector);
  const { t } = useTranslation();
  const { comments, id, inputId, total_comments, number_comment } = useContext(
    PostContext
  );
  const [{}, handleDispatchAsyncAction] = useAsyncTracker();
  const handleComment = useCallback(
    (value) => {
      const asyncId = Date.now();
      if (!reply) {
        setNewComments({
          ...newComments,
          default: [
            ...newComments.default,
            {
              asyncId,
              parent: reply,
              content: value,
              user_create_name: profile.name,
              user_create_avatar: profile.avatar,
            },
          ],
        });
      } else {
        setNewComments({
          ...newComments,
          [reply.id]: [
            ...(newComments[reply.id] || emptyArray),
            {
              asyncId,
              content: value,
              user_create_name: profile.name,
              user_create_avatar: profile.avatar,
            },
          ],
        });
      }

      setReply(undefined);
      handleDispatchAsyncAction({
        asyncId,
        ...postModule.actions.comment({
          post_id: id,
          content: value,
          parent_id: reply && reply.id,
        }),
      });
    },
    [
      handleDispatchAsyncAction,
      id,
      newComments,
      profile.avatar,
      profile.name,
      reply,
    ]
  );
  const handleReplyClick = useCallback(
    (c) => {
      setReply(c);
      const e = document.querySelector("#" + inputId);
      e && e.focus();
    },
    [inputId]
  );
  const history = useHistory();
  return (
    <>
      <Box display="flex" alignItems="center">
        <ButtonBase
          className="comp_Post__viewAll"
          onClick={() =>
            history.push(routes.postDetail.path.replace(":id", id))
          }
        >
          {t("Xem tất cả bình luận")}
        </ButtonBase>
        <Box flex="1" />
        <Typography color="textSecondary">
          {total_comments}/{number_comment}
        </Typography>
      </Box>
      <CommentList
        {...{
          comments: comments.map((c) => ({
            ...c,
            comments: newComments[c.id],
          })),
        }}
        onReplyClick={handleReplyClick}
      />
      {newComments.default.map((c, i) => (
        <AsyncTracker asyncId={c.asyncId}>
          {({ data: { data_comment } = { data_comment: emptyObject } }) => {
            const comment = {
              ...c,
              ...data_comment,
            };
            const comments = newComments[comment.id];
            return (
              <Message
                key={i}
                onReplyClick={
                  comment.id ? () => handleReplyClick(comment) : undefined
                }
                comments={comments}
                message={comment}
              ></Message>
            );
          }}
        </AsyncTracker>
      ))}
      <Box display="flex" alignItems="flex-start">
        <Avatar src={profile.avatar}>{profile.name}</Avatar>
        <CommentInput
          setReply={setReply}
          reply={reply}
          inputId={inputId}
          handleComment={handleComment}
          placeholder={t("Viết bình luận")}
        />
      </Box>
    </>
  );
};
export const PostMenu = ({
  menuAnchor,
  options,
  handleActionClick,
  setMenuAnchor,
}) => {
  const handleItemClick = handleActionClick;
  const { can_modify } = useContext(PostContext);
  if (!can_modify) return null;
  return (
    <ItemMenu
      onItemClick={handleItemClick}
      menuAnchor={menuAnchor}
      options={options}
      onClose={() => setMenuAnchor(null)}
    ></ItemMenu>
  );
};
export const PostContext = React.createContext({});
export const ActionGroup = ({
  is_love,
  is_like,
  handleActionClick,
  inputId,
}) => {
  const { t } = useTranslation();
  return (
    <div className="comp_Post__actionsWrap">
      <PostActionButton
        active={is_love}
        color={colors.pink[0]}
        onClick={() => handleActionClick("love")}
        startIcon={
          <Icon
            className="comp_Post_iconLove"
            viewBox="0 0 24 24"
            path={love}
          />
        }
      >
        <label>{t("Yêu")}</label>
      </PostActionButton>
      <PostActionButton
        active={is_like}
        color={colors.blue[0]}
        onClick={() => handleActionClick("like")}
        startIcon={
          <Icon
            className="comp_Post_iconLike"
            viewBox="40 40 50 50"
            path={like}
          />
        }
      >
        <label>{t("Thích")}</label>
      </PostActionButton>
      <PostActionButton
        color={colors.blue[0]}
        startIcon={
          <Icon
            className="comp_Post_iconComment"
            viewBox="-21 -47 682.66669 682"
            path={comment}
          />
        }
      >
        <label htmlFor={inputId}>{t("Bình luận")}</label>
      </PostActionButton>
    </div>
  );
};

export const PostHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    user_create_avatar,
    user_create_name,
    handleActionClick,
    menuoptions,
    position,
    category_name,
    category_id,
    time_label,
    is_highlight,
    is_pin,
    room,
  } = useContext(PostContext);
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <>
      <TasksCard.Header
        avatar={
          <TasksCard.HeaderAvatar
            aria-label="tasks"
            src={user_create_avatar}
          ></TasksCard.HeaderAvatar>
        }
        action={
          ((menuoptions && menuoptions.length) || null) && (
            <div>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setAnchorEl(e.currentTarget);
                }}
                size="small"
                aria-label="settings"
              >
                <MoreVert />
              </IconButton>
            </div>
          )
        }
        title={
          <TasksCard.HeaderTitle>
            <div className="comp_Post__creatorName">{user_create_name}</div>
            <div className="comp_Post__creatorPostition">
              {position} {(position || room) && "-"} {room}
            </div>
          </TasksCard.HeaderTitle>
        }
        subheader={
          <TasksCard.HeaderSubTitle>
            {t("Đã đăng")}{" "}
            <div
              onClick={() => {
                history.push(routes.category.path.replace(":id", category_id));
              }}
              className="comp_Post__creatorHeaderCategory"
            >
              {category_name}{" "}
            </div>
            {time_label}{" "}
            {is_pin && (
              <SvgIcon className="comp_Post__pin">
                <path d={mdiPin}></path>
              </SvgIcon>
            )}
            {is_highlight && (
              <SvgIcon className="comp_Post__highlight">
                <path d={mdiStarHalf}></path>
              </SvgIcon>
            )}
          </TasksCard.HeaderSubTitle>
        }
      />{" "}
      <PostMenu
        menuAnchor={anchorEl}
        handleActionClick={handleActionClick}
        setMenuAnchor={setAnchorEl}
        options={menuoptions}
      />
    </>
  );
};
function generate(files, e) {
  return files.map((value) =>
    React.cloneElement(e, {
      key: value,
      file: value,
    })
  );
}
export const PostFiles = () => {
  const { files = emptyArray } = useContext(PostContext);
  if (files && files.length)
    return (
      <TasksCard.Content>
        <TasksCard.Container>
          <List className="comp_Post__fileList">
            {generate(files, <FileListItem />)}
          </List>
        </TasksCard.Container>
      </TasksCard.Content>
    );
  return null;
};

const Description = ({ children = "", limit = 100 }) => {
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(false);
  const hasMore = children.length >= limit;
  if (!hasMore)
    return (
      <span
        className="comp_Left__description"
        dangerouslySetInnerHTML={{
          __html: linkify(children),
        }}
      ></span>
    );
  const sub = children.substring(0, limit);
  return (
    <>
      {hasMore && !showMore ? (
        <span>{sub}</span>
      ) : (
        <span
          className="comp_Left__description"
          dangerouslySetInnerHTML={{
            __html: linkify(children),
          }}
        ></span>
      )}
      {hasMore && showMore ? (
        <span>
          {" "}
          <b className="u-colorBlue" onClick={() => setShowMore(false)}>
            {t("see less")}
          </b>
        </span>
      ) : (
        <span>
          ...{" "}
          <b className="u-colorBlue" onClick={() => setShowMore(true)}>
            {t("see more")}
          </b>
        </span>
      )}
    </>
  );
};
export const PostContent = () => {
  const history = useHistory();
  const { title, content, id } = useContext(PostContext);
  return (
    <TasksCard.Content>
      <Stack>
        <b
          className="cursor-pointer comp_Post__title"
          onClick={() =>
            history.push(routes.postDetail.path.replace(":id", id))
          }
        >
          {title}
        </b>

        <Typography component="div">
          <Description>{content}</Description>
        </Typography>
      </Stack>
    </TasksCard.Content>
  );
};
const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: "#1890ff",
  },
})(Tabs);
const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#40a9ff",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const MemberLikeAndLoveModal = ({ open, setModal }) => {
  const [data, setData] = useState({
    members_like: emptyArray,
    members_love: emptyArray,
    state: false,
  });
  const [tab, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { id } = useContext(PostContext);
  const { t } = useTranslation();
  useEffect(() => {
    setData(
      apiService({
        url:
          "/posts/get-member-like-and-love?" +
          encodeQueryData({
            post_id: id,
          }),
        method: "get",
      }).then((res) => setData(res.data))
    );
  }, [id]);
  let list = [];
  if (data.state) {
    switch (tab) {
      case 0:
        list = [...data.members_like, ...data.members_love];
        break;
      case 1:
        list = data.members_like;
        break;
      case 2:
        list = data.members_love;
        break;
      default:
        break;
    }
  }

  return (
    <ModalCommon
      loading={data.then}
      title={t("love and like")}
      onClose={() => setModal(false)}
      footerAction={[]}
    >
      <Box height="400px">
        <TasksScrollbar>
          <AntTabs
            value={tab}
            onChange={handleChange}
            aria-label="love and like tab"
          >
            <AntTab label={t("all")} />
            <AntTab label={t("like")} />
            <AntTab label={t("love")} />
          </AntTabs>
          {data.state && (
            <Box padding="24px">
              {list.map(({ avatar, id, name, postion, room }) => (
                <ListItemLayout
                  key={id}
                  left={<Avatar src={avatar}></Avatar>}
                  title={name}
                  subTitle={postion}
                ></ListItemLayout>
              ))}
              {!list.length && (
                <EmptyHolder
                  image={
                    <img
                      style={{ width: "80%" }}
                      src={nodataimg}
                      alt="empty"
                    ></img>
                  }
                  title={""}
                  description={""}
                />
              )}
            </Box>
          )}
        </TasksScrollbar>
      </Box>
    </ModalCommon>
  );
};
export const PostStats = () => {
  const [open, toggle] = useToggle();
  const { t } = useTranslation();
  const {
    inputId,
    number_like,
    number_comment,
    last_like_user,
    last_love_user,
    number_love,
    handleActionClick,
    is_love,
    is_like,
  } = useContext(PostContext);
  let otherNumber = Number(number_like) + Number(number_love);
  const hadLikeUser = last_like_user && last_like_user !== null;
  const hadLoveUser = last_love_user && last_love_user !== null;
  if (hadLikeUser) otherNumber = otherNumber - 1;
  if (hadLoveUser) otherNumber = otherNumber - 1;
  return (
    <Stack small>
      <div />
      <div
        onClick={() => toggle(true)}
        className="comp_Post__statWrap cursor-pointer"
      >
        <Box display="flex" alignItems="center">
          <AvatarGroup
            size={20}
            offset={-4}
            images={[hadLikeUser && likeImage, hadLoveUser && loveImage].filter(
              (item) => item
            )}
          ></AvatarGroup>
        </Box>
        <Box padding="0 4px" flex="1" whiteSpace="now-wrap">
          {[
            hadLikeUser && <span href="#">{last_like_user}</span>,
            hadLoveUser && <span href="#">{last_love_user}</span>,
            !!otherNumber && (
              <span>
                {template(t("<%= numner %> người khác"))({
                  numner: otherNumber,
                })}
              </span>
            ),
          ]
            .filter((item) => item)
            .map((item, i, array) => {
              if (i === array.length - 2) {
                return (
                  <>
                    {item}
                    {" và "}
                  </>
                );
              }
              if (i < array.length - 1) {
                return (
                  <>
                    {item}
                    {" ,"}
                  </>
                );
              }
              return item;
            })}
        </Box>
        {!!number_comment && (
          <ButtonBase htmlFor={inputId} component="label">
            <StyledTypo
              className="comp_Post__statWrap__comment"
              component="span"
              variant="subtitle1"
            >
              {number_comment} {t("bình luận")}
            </StyledTypo>
          </ButtonBase>
        )}
      </div>
      <ActionGroup {...{ is_love, is_like, handleActionClick, inputId }} />
      {open && <MemberLikeAndLoveModal open={open} setModal={toggle} />}
    </Stack>
  );
};
export const PostMedia = () => {
  const { images } = useContext(PostContext);
  return <TasksCard.Media images={images}></TasksCard.Media>;
};
export const PostCategory = () => {
  const { category_name, category_id } = useContext(PostContext);
  const history = useHistory();
  if (!category_name) return null;
  return (
    <ButtonBase
      className="comp_Post__category u-link"
      onClick={() => {
        history.push(routes.category.path.replace(":id", category_id));
      }}
    >
      # {category_name}
    </ButtonBase>
  );
};
export const PostWrapper = injectClassName("comp_Post")(TasksCard.Container);
export const PostTimeline = () => {
  return (
    <PostWrapper>
      <PostHeader />
      <PostContent />
      <PostFiles />
      <PostMedia />
      <PostCategory />
      <PostStats />
      <TasksCard.Content>
        <Stack>
          <CommentListContainer />
        </Stack>
      </TasksCard.Content>
    </PostWrapper>
  );
};
export const PostContainer = ({ post, children }) => {
  const [
    id,
    title,
    content,
    user_create_id,
    user_create_name,
    user_create_avatar,
    files,
    images,
    position,
    room,
    number_like,
    number_comment,
    comments,
    time_label,
    last_like_user,
    last_love_user,
    category_name,
    category_id,
    total_comments,
    number_love,
    is_highlight,
    is_pin,
    is_love,
    is_like,
    can_modify,
  ] = createMapPropsFromAttrs([
    postAttr.id,
    postAttr.title,
    postAttr.content,
    postAttr.user_create_id,
    postAttr.user_create_name,
    postAttr.user_create_avatar,
    postAttr.files,
    postAttr.images,
    postAttr.position,
    postAttr.room,
    postAttr.number_like,
    postAttr.number_comment,
    postAttr.comments,
    postAttr.time_label,
    postAttr.last_like_user,
    postAttr.last_love_user,
    postAttr.category_name,
    postAttr.category_id,
    postAttr.total_comments,
    postAttr.number_love,
    postAttr.is_highlight,
    postAttr.is_pin,
    postAttr.is_love,
    postAttr.is_like,
    postAttr.can_modify,
  ])(post);
  const dispatch = useDispatch();
  const [modal, setModal] = useState();
  const handleActionClick = useCallback(
    (key) => {
      switch (key) {
        case "highLight":
          dispatch(postModule.actions.makePostHighLight({ post_id: id }));
          break;
        case "cancel-highLight":
          dispatch(postModule.actions.cancelPostHighLight({ post_id: id }));
          break;
        case "pin":
          dispatch(postModule.actions.pinPost({ post_id: id }));
          break;
        case "cancel-pin":
          dispatch(postModule.actions.cancelPinPost({ post_id: id }));
          break;
        case "delete":
          dispatch(postModule.actions.deletePost({ post_id: id }));
          break;
        case "edit":
          setModal(
            <Dialog
              id={"PostCreator"}
              PaperProps={{
                tabIndex: -1,
              }}
              onClose={() => setModal(undefined)}
              fullWidth={true}
              maxWidth={"sm"}
              open={true}
            >
              <PostEditor onClose={() => setModal(undefined)} post={post} />
            </Dialog>
          );
          break;
        case "like":
          dispatch(postModule.actions.like({ post_id: id }));
          break;
        case "love":
          dispatch(postModule.actions.love({ post_id: id }));
          break;
        default:
          break;
      }
    },
    [dispatch, id, post]
  );
  const { t } = useTranslation();
  const menuoptions = useMemo(() => {
    return can_modify
      ? [
          { key: "edit", label: t("Sửa") },
          !is_pin
            ? { key: "pin", label: t("Ghim") }
            : { key: "cancel-pin", label: t("Bỏ ghim") },
          !is_highlight
            ? { key: "highLight", label: t("Nổi bật") }
            : { key: "cancel-highLight", label: t("Bỏ nổi bật") },
          { key: "delete", label: t("Xóa") },
        ]
      : emptyArray;
  }, [can_modify, is_pin, t, is_highlight]);

  const handleComment = useCallback(
    (value) => {
      dispatch(postModule.actions.comment({ post_id: id, content: value }));
    },
    [dispatch, id]
  );
  const inputId = useMemo(() => {
    return "post-" + id;
  }, [id]);
  return (
    <PostContext.Provider
      value={{
        inputId,
        id,
        title,
        content,
        user_create_id,
        user_create_name,
        category_id,
        user_create_avatar,
        files,
        images,
        position,
        room,
        number_like,
        number_comment,
        comments,
        time_label,
        last_like_user,
        last_love_user,
        category_name,
        total_comments,
        number_love,
        is_highlight,
        is_pin,
        is_love,
        is_like,
        can_modify,
        menuoptions,
        handleActionClick,
        handleComment,
      }}
    >
      <>
        {children}
        {!!modal && modal}
      </>
    </PostContext.Provider>
  );
};

export default ({ post }) => {
  return (
    <PostContainer post={post}>
      <PostTimeline />
    </PostContainer>
  );
};
