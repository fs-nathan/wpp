import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './DocumentDetail.scss';
// import * as icons from '../../assets';
import { closeDocumentDetail } from '../../actions/system/system';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const fileUrl =
  'https://storage.googleapis.com/storage_vtask_net/1570269502161-%5B19_12_2018%5D.cv_en.docx';

const DocumentDetail = props => {
  const classes = useStyles();

  const handleClose = () => {
    props.closeDocumentDetail();
  };

  return (
    <Dialog
      fullScreen
      open={props.isDocumentDetail}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Sound
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <div className="document-detail-container">
        <div className="view-file-wrapper">
          <iframe
            className="google-view-file"
            title="read-file"
            src={`https://docs.google.com/gview?url=${fileUrl}&embedded=true`}
          ></iframe>
        </div>
        <div className="comment-wrapper">Comment</div>
      </div>
    </Dialog>
  );
};

export default connect(
  state => ({
    isDocumentDetail: state.system.isDocumentDetail,
    documentFile: state.system.documentFile
  }),
  {
    closeDocumentDetail
  }
)(withRouter(DocumentDetail));
