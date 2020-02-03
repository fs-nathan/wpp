import React from 'react'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'

const QuoteMessDetail = styled(Typography)`
    width: auto;
    height: auto;
    border-radius: 10px;
    background-color: #f7f7f7;
    border-left: 3px solid #4e9bff;
    padding: 10px;
    margin-bottom: 13px;
    & > *:first-child {
        font-size: 12px;
        color: #a5a0a0;
        margin-bottom: 2px;
    }
    & > *:last-child {
        font-size: 13px;
        color: #a5a0a0;
        font-weight: 500;
    }
`

export default function QuoteMessage ({ name, content }) {
  return (
      <QuoteMessDetail component='div'>
          <Typography component='div'>{name}</Typography>
          <Typography component='div'>{content}</Typography>
      </QuoteMessDetail>
  )
}