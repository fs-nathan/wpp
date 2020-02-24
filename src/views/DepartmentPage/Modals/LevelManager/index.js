import React from 'react';
import LevelCreateAndUpdateModal from './LevelCreateAndUpdate';
import { deleteLevel } from '../../../../actions/level/deleteLevel';
import { connect } from 'react-redux'; 
import AlertModal from '../../../../components/AlertModal';
import { get } from 'lodash';
import { levelsSelector } from './selectors';
import LevelManagerPresenter from './presenters';

function LevelManager({ 
  open, setOpen, 
  levels, 
  doDeleteLevel, 
}) {

  const [openCAUModal, setOpenCAUModal] = React.useState(false);
  const [CAUProps, setCAUProps] = React.useState({});
  const [openAlertModal, setOpenAlertModal] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'CREATE': {
        setOpenCAUModal(true);
        setCAUProps({});
        return;
      }
      case 'UPDATE': {
        setOpenCAUModal(true);
        setCAUProps(props);
        return;
      }
      case 'ALERT': {
        setOpenAlertModal(true);
        setAlertProps(props);
        return;
      }
      default: return;
    }
  }

  return (
    <>
      <LevelManagerPresenter 
        open={open} setOpen={setOpen}
        levels={levels}
        handleDeleteLevel={level => doDeleteLevel({ levelId: get(level, 'id') })}
        handleOpenModal={doOpenModal}
      />
      <LevelCreateAndUpdateModal 
        open={openCAUModal}
        setOpen={setOpenCAUModal}
        {...CAUProps}
      />
      <AlertModal 
        open={openAlertModal}
        setOpen={setOpenAlertModal}
        {...alertProps}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    levels: levelsSelector(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doDeleteLevel: ({ levelId }) => dispatch(deleteLevel({ levelId })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LevelManager);
