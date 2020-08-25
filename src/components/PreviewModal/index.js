import LoadingBox from 'components/LoadingBox';
import React from 'react';
import { connect } from 'react-redux';
import CustomModal from '../CustomModalGantt';
import './previewModal.css';

const PreviewPdfModal = ({ title, onConfirm, previewContent, open, setOpen, srcPreview, isLoading }) => {
    return (
        <CustomModal className="gantt-export-pdf--modal__container" notAutoCloseWhenConfirm={true} onConfirm={onConfirm} fullWidth={true} maxWidth="md" height='tall' setOpen={setOpen} open={open} title={title}>
            <div className="gantt--preview-pdf__container">
                <div style={{
                    height: "calc(100% - 71px)"
                }}>
                    {isLoading ? <div style={{ height: "100%" }}><LoadingBox /></div> : <iframe width="100%" height="100%" src={`${srcPreview}`}></iframe>}
                </div>
            </div>
        </CustomModal>
    )
}


const mapStateToProps = state => ({
    previewContent: state.gantt.previewContent
})
export default connect(mapStateToProps)(PreviewPdfModal)