import { Button } from '@material-ui/core';
import { appendChat, chatFile, onUploading } from 'actions/chat/chat';
import { file as file_icon } from 'assets/fileType';
import { CHAT_TYPE, getFileUrl } from 'helpers/jobDetail/arrayHelper';
import { humanFileSize } from 'helpers/jobDetail/stringHelper';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../../../../components/CustomModal';
import './SendFileModal.scss';

const SendFileModal = ({ open, setOpen, onClickShareFromLibrary }) => {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const userId = useSelector(state => state.system.profile.id)

  function onUploadingHandler(percent) {
    dispatch(onUploading(percent));
  }

  const handleUploadFile = async e => {
    const { files } = e.target;
    // console.log('upload file', files);
    const images = [];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const url = await getFileUrl(file)
      images.push({
        url, name: file.name, file_icon,
        size: humanFileSize(file.size)
      })
    }
    const data_chat = {
      type: CHAT_TYPE.UPLOADING_FILE, files: images,
      isUploading: true,
      user_create_id: userId,
      is_me: true,
    }
    dispatch(appendChat({ data_chat }));
    let data = new FormData()
    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i], files[i].name)
    }
    dispatch(chatFile(taskId, data, onUploadingHandler));
    setOpen(false)
  };

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      height="mini"
      title="Chọn tài liệu"
      className="send-file-modal"
      confirmRender={null}
      cancleRender={() => 'Thoát'}
    >
      <div className="send-file-content">
        <div className="btn-upload">
          <input
            className="display-none"
            id="upload_file"
            multiple
            type="file"
            onChange={handleUploadFile}
          />
          <label htmlFor="upload_file">
            <Button variant="outlined" component="span">
              Tải file từ máy tính
            </Button>
          </label>
        </div>
        <div className="btn-upload">
          <Button
            variant="outlined"
            onClick={onClickShareFromLibrary}
          >
            Chọn từ thư viện
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default SendFileModal;
