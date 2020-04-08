import { AppBar, Tab, Tabs } from '@material-ui/core';
import { getListMyDocument } from 'actions/documents';
import CustomModal from 'components/CustomModal';
import React, { useEffect, useState } from 'react';
import './styles.scss';

const DetailEmotionModal = ({ isOpen, setOpen }) => {
  const [listData, setListData] = useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchListMyDocument = async params => {
    try {
      const { data } = await getListMyDocument(params);
      let transformData = [];
      if (data.folders.length > 0) {
        transformData = data.folders.map(item => ({ ...item, type: 'folder' }));
      }
      if (data.documents.length > 0) {
        transformData = transformData.concat(data.documents);
      }
      setListData(transformData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListMyDocument();
  }, []);


  return (
    <CustomModal
      open={isOpen}
      setOpen={setOpen}
      fullWidth
      title="Biểu cảm"
      className="DetailEmotionModal"
      cancleRender={null}
      confirmRender={null}
    >
      <div className="DetailEmotionModal--container">
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="off"
            aria-label="scrollable prevent tabs example"
          >
            <Tab icon={<img alt="icon" />} aria-label="phone" />
            <Tab icon={<img alt="icon" />} aria-label="favorite" />

          </Tabs>
        </AppBar>
        <div value={value} index={0}>
          Item One
      </div>
        <div value={value} index={1}>
          Item Two
      </div>
        <div value={value} index={2}>
          Item Three
      </div>
        <div value={value} index={3}>
          Item Four
      </div>
        <div value={value} index={4}>
          Item Five
      </div>
        <div value={value} index={5}>
          Item Six
      </div>
        <div value={value} index={6}>
          Item Seven
      </div>
      </div>
    </CustomModal >
  );
};

export default DetailEmotionModal;
