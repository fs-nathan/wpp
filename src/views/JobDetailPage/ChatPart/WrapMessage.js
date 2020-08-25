import React from 'react'
import styled from 'styled-components'
import { mdiShare } from '@mdi/js'
import Icon from '@mdi/react'
import {
  IconButton, Avatar
} from '@material-ui/core'
import * as MaterialIcon from '@material-ui/icons'
import fakeAvatar from '../../../assets/avatar.jpg'
import OtherUserInfo from './OtherUserInfo'

const FunctionButton = styled(IconButton)`
    max-height: 40px;
    max-width: 40px;
    &:hover {
        //background-color: transparent;
    }
`

export default function WrapMessage ({ children, isUser, hideAvatar, ...props }) {
  return (
      <div className={"wrap-message-row " + (isUser ? "wmr-row-reverse" : "wmr-row")}>            
          {!isUser && !hideAvatar && <Avatar src={fakeAvatar} />}
          <div className= {"wrap-message " + (isUser ? "wm-bg-color-blue" : "wm-bg-color-white") }>
              {!isUser && <OtherUserInfo {...props}/>}
              {children}
          </div>
          <div className="wrap-function-bar-bp">
              <FunctionButton>
                  <Icon path={mdiShare} size={1} color={'rgba(0, 0, 0, 0.54)'} />
              </FunctionButton>
              <FunctionButton>
                  <MaterialIcon.ThumbUp size="small" />
              </FunctionButton>
              <FunctionButton>
                  <MaterialIcon.FormatQuote size="small" />
              </FunctionButton>
              <FunctionButton>
                  <MaterialIcon.MoreVert size="small" />
              </FunctionButton>
          </div>
      </div>
  )
}