import React from 'react'
import styled from 'styled-components'
import colors from '../../../helpers/colorPalette'
import { makeStyles } from '@material-ui/core/styles'
import {
    IconButton, Typography, Avatar, Grid,
    RadioGroup, Radio, FormControlLabel, FormControl
} from '@material-ui/core'
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import avatarType from '../../../constants/avatarType'
import fakeAvatar from '../../../assets/avatar.jpg'

// Fake data
const tabs = ['Chat', 'Table', 'Gantt']
const tabSelected = tabs[0]
const images = [fakeAvatar, fakeAvatar, fakeAvatar, fakeAvatar, fakeAvatar]

// Some override style of google material components
const useStyles = makeStyles({
    wrapRowAvatar: {
        paddingBottom: "0 !important",
    },
    smallAvatar: {
        width: 25,
        height: 25,
    },
})

const Container = styled.div`
    display: flex;
    align-items: center;
    height: 85px;
`

const WrapAvatars = styled.div`
    width: 64px;
`

const WrapRoomDescription = styled.div`
    flex: 1;
    padding: 0 10px;
`

const ProjectText = styled(Typography)`
    font-size: 24px;
    font-weight: 500;
`

// const WrapNotification = styled.div`
//     padding: 0 10px;
//     display: flex;
//     height: 20px;
//     position: sticky;
//     top: 0;
//     background-color: white;
//     width: 100%;
// `

const TabLabel = styled(FormControlLabel)`
  color: ${props => props.checked 
    ? colors['blue'][0] 
    : colors['gray'][0]};
  width: auto;
  margin-left: 0;
  margin-right: 10px;
  padding: 5px 0;
  & > span:first-child { display: none; }
`;


// const NotifyText = styled.div`
//     color: ${colors['black'][0]};
// `

// function renderNotify(props) {
//     return (
//         <NotifyText>09:30 22/10/2019 Gặp khách hàng để chốt hợp đồng</NotifyText>
//     )
// }

function TabForm(props) {
    const [value, setValue] = React.useState(tabSelected)
    // console.log(value)
    return (
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="position" name="position" value={value}
          onChange={event => setValue(event.target.value)} row>
          {
            props.tabs.map((label, idx) =>
              <TabLabel
                key={idx}
                value={label}
                control={<Radio />}
                label={label}
                checked={value === label}
              />
            )
          }
        </RadioGroup>
      </FormControl>
    )
  }

function renderAnAvatar(props) {
    const {
        type, styles, number, src
    } = props

    switch (type) {
        case avatarType.TEXT:
            return (
                <Grid item xs={6}>
                    <Avatar className={styles.smallAvatar}>
                        {number}
                    </Avatar>
                </Grid>
            )
        case avatarType.DEFAULT:
        default:
            return (
                <Grid item xs={6}>
                    <Avatar
                        className={styles.smallAvatar}
                        src={src}
                    />
                </Grid>
            )
    }
}

function renderAvatars(props) {

    const {
        styles, images
    } = props

    return (
        <WrapAvatars>
            <Grid
                container spacing={1}
                justify="center" alignItems="center">
                <Grid
                    container xs={12}
                    item classes={{ item: styles.wrapRowAvatar }}>
                {
                    images.length > 0 
                    && renderAnAvatar({ type: avatarType.DEFAULT, src: images[0], ...props })
                }
                {
                    images.length > 1 
                    && renderAnAvatar({ type: avatarType.DEFAULT, src: images[1], ...props })
                }
                </Grid>
                <Grid
                    container item xs={12}>
                {
                    images.length > 2 
                    && renderAnAvatar({ type: avatarType.DEFAULT, src: images[2], ...props })
                }
                {
                    images.length === 4 
                    && renderAnAvatar({ type: avatarType.DEFAULT, src: images[3], ...props })
                }
                {   
                    images.length > 4
                    && renderAnAvatar({ type: avatarType.TEXT, number: images.length-3, ...props })
                }

                </Grid>
            </Grid>
        </WrapAvatars>
    )
}

function renderRoomDescription(props) {
    return (
        <WrapRoomDescription>
            <ProjectText >
                Thảo Iuận
            </ProjectText>
            <TabForm tabs={tabs}/>
        </WrapRoomDescription>
    )
}

function renderFunctionBar(props) {
    return (
        <>
            <IconButton>
                <Icon path={mdiMagnify} size={1.2}/>
            </IconButton>
        </>
    )
}

export default function HeaderPart(props) {
    const classes = useStyles()

    return (
        <Container>
            {renderAvatars({ styles: classes, images })}
            {renderRoomDescription(props)}
            {renderFunctionBar(props)}
            {/* <WrapNotification>
                {renderNotify(props)}
            </WrapNotification> */}
        </Container>
    )
}