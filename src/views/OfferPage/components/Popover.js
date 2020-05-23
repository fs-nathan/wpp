import { IconButton } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import "./Popover.scss";
import { OfferPageContext } from '../OfferPageContext';
import { getOfferItemPopoverViewTask, getOfferItemPopoverDetail } from '../utils/i18nSelectors';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(1, 2, 1, 2),
    },
    button: {
        color: "#000000",
    }
}));

function ExpandPopover({ offer_id, url_redirect }) {
    const {
        setDetailOfferModalOpen,
        setCurrentDetailOfferId,
    } = useContext(OfferPageContext);
    const classes = useStyles();
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [deleteModal, setDeleteModal] = React.useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    function renderPopoverOption(title, onClickHandler) {
        return (
            <Typography
                className={classNames(classes.typography, "Tasktable_option")}
                onClick={onClickHandler}
            >
                {title}
            </Typography>
        );
    }

    return (
        <div>
            <IconButton aria-label="delete" a variant="contained" className={classes.button} onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
            >
                <div className="TaskTable_popover_item">
                    {renderPopoverOption(getOfferItemPopoverDetail(t), () => {
                        // Hide popup menu
                        setAnchorEl(null);
                        // For triggering offer detail data fetching from OfferPage component
                        setCurrentDetailOfferId(offer_id);
                        // Show offer detail modal
                        setDetailOfferModalOpen(true);
                    })}
                    {url_redirect && renderPopoverOption(getOfferItemPopoverViewTask(t), () => {
                        // Hide popup menu
                        setAnchorEl(null);
                        // Go to view task page
                        history.push(url_redirect);
                    })}
                </div>
            </Popover>
        </div >
    );
}

export default withRouter(ExpandPopover);
