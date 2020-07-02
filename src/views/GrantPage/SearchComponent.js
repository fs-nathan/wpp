import { Grow, Popper } from "@material-ui/core"
import { mdiClose, mdiMagnify } from '@mdi/js'
import { changeKeyword } from 'actions/gantt'
import SearchInput from 'components/SearchInput'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import IconComponent from './IconComponent'
const SearchBox = ({ className = "", ...rest }) => (
  <div
    className={`comp_CustomTable_HeaderButtonGroup___search-box ${className}`}
    {...rest}
  />
);
const StyledPopper = ({ className = "", ...rest }) => (
  <Popper
    className={`comp_CustomTable_HeaderButtonGroup___popper ${className}`}
    {...rest}
  />
);
function SearchComponent({ changeKeyword }) {
  const [show, setShow] = useState(false)
  const [internalKeyword, setInternalKeyword] = useState('')
  const { t } = useTranslation()
  let checkTimeOut = null
  console.log('update')
  return (<React.Fragment
  >
    <IconComponent onClick={e => setShow(!show)} title={t('LABEL_GANTT_NAME_SEARCH_MENU')} path={show ? mdiClose : mdiMagnify} />
    {show && <StyledPopper
      className="gantt--right-menu__search"
      open={true}
      anchorEl={true}
      transition
      placement="left"
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps} timeout={100}>
          <SearchBox>
            <SearchInput
              className="gantt--search__icon"
              placeholder={t("Nhập nội dung cần tìm")}
              onClickSearch={() => {
                changeKeyword(internalKeyword)
              }}
              onChange={(evt) => {
                const value = evt.target.value
                setInternalKeyword(value)
              }
              }
            />
          </SearchBox>
        </Grow>
      )}
    </StyledPopper>}
  </React.Fragment>
  )
}

const mapDispatchToProps = {
  changeKeyword
}
export default connect(null, mapDispatchToProps)(SearchComponent)