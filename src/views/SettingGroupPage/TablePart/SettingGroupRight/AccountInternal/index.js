import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Popover from '@material-ui/core/Popover';
import './style.scss';
import Icon from '@mdi/react';
import  ReactParserHtml  from 'react-html-parser';
import { mdiDotsVertical } from '@mdi/js';

const AccountInternal = () => {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];

      const handleOpenMore = (event) => {
            setAnchorEl(event.currentTarget);
      }
      const handleClose = () => {
        setAnchorEl(null);
      };
      const open = Boolean(anchorEl);
      const id = open ? 'simple-popover' : undefined;
    return (
       <div className="account-internal">
           <div className="account-internal_header">
              <h4>{t('IDS_WP_ACCOUNT_INTERNAL_MANAGE')}</h4>
              <span>Đã tạo: 4 tài khoản</span>
              <Button className="account-internal_btn-create-account" variant="contained" color="primary">{t('IDS_WP_ACCOUNT_INTERNAL_CREATE')}</Button>
           </div>
           <div className="account-internal_content">
               <div className="account-internal_content-message">
                   <p>{t('IDS_WP_ACCOUNT_INTERNAL_MESSAGE_1')}</p>
                   <p style={{whiteSpace: 'break-spaces', marginTop: '20px'}}>{t('IDS_WP_ACCOUNT_INTERNAL_MESSAGE_2')}</p>
                   <p style={{marginTop: '20px'}}>{ReactParserHtml(t('IDS_WP_ACCOUNT_INTERNAL_MESSAGE_3'))}</p>
                   <div style={{textAlign: 'center', marginTop: '40px'}}>
                       <Button className="account-internal_btn-create-account" style={{height: "50px", width: "250px", fontSize: '18px'}} variant="contained" color="primary">{t('IDS_WP_ACCOUNT_INTERNAL_CREATE')}</Button></div>
               </div>
           </div>
           <div className="account-internal_table">
           <TableContainer component={Paper}>
      <Table className="table" size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left"></TableCell>
            <TableCell align="left">Dessert (100g serving)</TableCell>
            <TableCell align="left">Calories</TableCell>
            <TableCell align="left">Fat&nbsp;(g)</TableCell>
            <TableCell align="left">Carbs&nbsp;(g)</TableCell>
            <TableCell align="left">Protein&nbsp;(g)</TableCell>
            <TableCell align="left">Carbs&nbsp;(g)</TableCell>
            <TableCell align="left">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="left">image</TableCell>
              <TableCell align="left" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.calories}</TableCell>
              <TableCell align="left">{row.fat}</TableCell>
              <TableCell align="left">{row.carbs}</TableCell>
              <TableCell align="left">{row.protein}</TableCell>
              <TableCell align="left">Carbs&nbsp;(g)</TableCell>
                <TableCell align="left">
                <Button aria-describedby={id} onClick={handleOpenMore}><Icon path={mdiDotsVertical} size={1} color="rgba(0, 0, 0, 0.54)" /></Button>
                <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <p>The content of the Popover.</p>
      </Popover>
                </TableCell>
                
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
           </div>
       </div>
   )
}

export default AccountInternal;