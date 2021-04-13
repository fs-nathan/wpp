import React from 'react'
import styled from 'styled-components'
import { ListItemText, Typography } from '@material-ui/core'

const ContentMessageColor = styled(Typography)`
    color: gray;
`

const getSubColorRole = (role, authorityList) => {
  let color = ""
  switch (role) {
      case "Trưởng phòng":
          color = "#f0a626";
          break;
      case 'TGĐ':
          color = "#37ded3";
          break;
      case "Nhân viên":
          color = "#2b88d9";
          break;
      default:
          color = "black";
          break;
  }
  return (
      <Typography component='span' style={{ color: color }}>{`${role} - ${authorityList}`}</Typography>
  )
}

export default function OtherUserInfo ({ name, role, authorityList }) {
  return (
      <div className="wrap-other-user-info">
          <ListItemText
              style={{ margin: 0, minWidth: 300 }}
              primary={
                  <ContentMessageColor component='div' >
                      {name}
                  </ContentMessageColor>
              }
              secondary={
                  <React.Fragment>
                      {getSubColorRole(role, authorityList)}
                  </React.Fragment>
              }
          />
          <ContentMessageColor component='div'>09:30</ContentMessageColor>
      </div>
  )
}