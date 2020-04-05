import { IconButton } from '@material-ui/core';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { searchChat } from 'actions/chat/chat';
import SearchInput from 'components/SearchInput';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BodyPart from './BodyPart';
import FooterPart from './FooterPart';
import HeaderPart from './HeaderPart';

function ChatPart(props) {
  const dispatch = useDispatch();
  const [selectedChat, setSelectedChat] = React.useState();
  const [isShowSearch, setShowSearch] = React.useState(false);
  const searchChatKey = useSelector(state => state.chat.searchChatKey)
  function onChangeKey(evt) {
    dispatch(searchChat(evt.target.value))
  }

  function hideSearch() {
    setShowSearch(false)
  }

  return (
    <div className="container-chatpart">
      <div className="wrap-header">
        <HeaderPart {...props} setShowSearch={setShowSearch} />
      </div>
      {/* <div className="wrap-body"> */}
      {isShowSearch && (
        <div className="chatHeader--showSearch">
          <SearchInput className="chatHeader--search"
            placeholder='Tìm nội dung trong hội thảo' value={searchChatKey} onChange={onChangeKey} />
          <IconButton className="chatHeader--close" onClick={hideSearch}>
            <Icon path={mdiClose} size={1.2} className="job-detail-icon" />
          </IconButton>
        </div>
      )}
      <BodyPart {...props} setSelectedChat={setSelectedChat} isReply={Boolean(selectedChat)} />
      {/* </div> */}
      <div className="wrap-footer">
        <FooterPart {...props} parentMessage={selectedChat} setSelectedChat={setSelectedChat} />
      </div>
    </div>
  )
}

export default ChatPart;
