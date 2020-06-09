import LoadingBox from 'components/LoadingBox';
import React from 'react';
import { connect } from 'react-redux';
import CustomModal from '../CustomModal';
import './previewModal.css';

const PreviewPdfModal = ({ title, previewContent, open, setOpen, srcPreview, isLoading }) => {
    return (
        <CustomModal fullWidth={true} maxWidth="md" height='tall' setOpen={setOpen} open={open} title={"MẪU FILE PDF"}>
            <div className="gantt--preview-pdf__container">
                <div className="gantt--preview-pdf__title">{title}</div>
                <div className="gantt--preview-pdf__content">
                    <div>{previewContent[0]}</div>
                    <div>{previewContent[1]}</div>
                    <div>{previewContent[2]}</div>
                </div>
                <div>
                    {isLoading ? <div style={{ height: 500 }}><LoadingBox /></div> : <iframe width="100%" height={500} src={`${srcPreview}`}></iframe>}
                </div>
                <div className="gantt--preview-pdf__content">
                    <div>{previewContent[3]}</div>
                    <div>{previewContent[4]}</div>
                    <div>{previewContent[5]}</div>
                </div>
            </div>
        </CustomModal>
    )
}


const mapStateToProps = state => ({
    previewContent: state.gantt.previewContent
})
export default connect(mapStateToProps)(PreviewPdfModal)