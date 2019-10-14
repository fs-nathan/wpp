import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { 
  Fade, Dialog, DialogTitle, DialogContent, 
  DialogActions, IconButton,
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js'; 
import ColorButton from '../../../../components/ColorButton';
import ColorTypo from '../../../../components/ColorTypo';
import SearchInput from '../../../../components/SearchInput';

const StyledDialogContent = styled(DialogContent)`
  & > *:not(:last-child) {
    margin-bottom: 8px;
  }
  border-bottom: 1px solid rgba(0, 0, 0, .1);
`;

const StyledDialogTitle = styled(DialogTitle)`
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  & > h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade direction='down' ref={ref} {...props} />;
}); 

function SearchModal({ open, setOpen, onChange = () => null }) {

  const { t } = useTranslation();
  const [search, setSearch] = React.useState('');

  function handleSearch(evt) {
    onChange(search);
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-slide-title"
    >
      <StyledDialogTitle id="alert-dialog-slide-title">
        <ColorTypo uppercase>{t('views.user_page.modals.search_modal.search_title')}</ColorTypo>
        <IconButton onClick={() => setOpen(false)}>
          <Icon path={mdiClose} size={1} />
        </IconButton>
      </StyledDialogTitle>
      <StyledDialogContent>
        <SearchInput
          value={search}
          onChange={evt => setSearch(evt.target.value)} 
          fullWidth
          placeholder={t('views.user_page.modals.search_modal.search_label')}
        />
      </StyledDialogContent>
      <DialogActions>
        <ColorButton onClick={handleSearch} variant='text' variantColor='green'>
          {t('views.user_page.modals.search_modal.search_button')}
        </ColorButton>
      </DialogActions>
    </Dialog>
  )
}

export default SearchModal;
