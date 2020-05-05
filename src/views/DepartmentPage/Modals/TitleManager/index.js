import { deletePosition } from 'actions/position/deletePosition';
import { listPosition } from 'actions/position/listPosition';
import AlertModal from 'components/AlertModal';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import TitleManagerPresenter from './presenters';
import { positionsSelector } from './selectors';
import TitleCreateAndUpdateModal from './TitleCreateAndUpdate';

function TitleManager({ open, setOpen, positions, doDeletePosition, doListPosition }) {

  React.useEffect(() => {
    if (open) doListPosition();
    // eslint-disable-next-line
  }, [open]);

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
    doListPosition: (quite) => dispatch(listPosition(quite)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TitleManager);
