import React from 'react';
import SimpleManagerTable from '../../../../components/SimpleManagerTable';
import TitleCreateAndUpdateModal from './TitleCreateAndUpdate';
import { listPosition } from '../../../../actions/position/listPosition';
import { deletePosition } from '../../../../actions/position/deletePosition';
import { connect } from 'react-redux'; 
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import CustomModal from '../../../../components/CustomModal';
import AlertModal from '../../../../components/AlertModal';
import { get } from 'lodash';
import { positionsSelector } from './selectors';
import TitleManagerPresenter from './presenters';

function TitleManager({ open, setOpen, positions, doDeletePosition }) {

  const [openCAU, setOpenCAU] = React.useState(false);
  const [CAUProps, setCAUProps] = React.useState({});
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'CREATE': {
        setOpenCAU(true);
        setCAUProps({});
        return;
      }
      case 'UPDATE': {
        setOpenCAU(true);
        setCAUProps(props);
        return;
      }
      case 'ALERT': {
        setOpenAlert(true);
        setAlertProps(props);
        return;
      }
      default: return;
    }
  }

  return (
    <>
      <TitleManagerPresenter 
        open={open} setOpen={setOpen} 
        positions={positions} 
        handleDeletePosition={position => doDeletePosition({ positionId: get(position, 'id') })} 
        handleOpenModal={doOpenModal}
      />
      <TitleCreateAndUpdateModal 
        open={openCAU} 
        setOpen={setOpenCAU} 
        {...CAUProps}
      />
      <AlertModal 
        open={openAlert}
        setOpen={setOpenAlert}
        {...alertProps}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    positions: positionsSelector(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doDeletePosition: ({ positionId }) => dispatch(deletePosition({ positionId })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TitleManager);
