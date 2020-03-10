import React from 'react';
import { useDispatch } from 'react-redux';
import { searchFile } from '../../../../../actions/taskDetail/taskDetailActions';
import FileBox from './FileBox';
import SearchInput from '../../../../../components/SearchInput';

const FileContainer = (props) => {
  const dispatch = useDispatch();
  const searchFileTabPart = (e) => {
    dispatch(searchFile(e.target.value))
  }
  return (
    <React.Fragment>
      <SearchInput
        fullWidth
        placeholder='Nhập từ khóa file'
        onChange={e => searchFileTabPart(e)}
      />
      <FileBox {...props} />
    </React.Fragment>
  );
}

export default FileContainer