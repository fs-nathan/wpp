import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(1, 2, 1, 2),
    },
    button : { 
        color :"#000000",
    }
}));

export function EditPopover() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <IconButton aria-label="delete" aria-describedby={id} variant="contained" className={classes.button} onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Popover
                id={id}
                // anchorReference="anchorPosition"
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorPosition={{ top: 300, left: 1050 }}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                  }}
            >
                <Typography className={classes.typography}>Chỉnh sửa</Typography>
                <Typography className={classes.typography}>Xoá</Typography>
            </Popover>
        </div>
    );
}