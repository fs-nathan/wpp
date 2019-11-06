import React from 'react';
import { Slide, IconButton, ListSubheader, List } from '@material-ui/core';
import { mdiWindowClose, mdiApps, mdiMenuUp } from '@mdi/js';
import Icon from '@mdi/react';
import styled from 'styled-components';
import SearchInput from '../../../components/SearchInput';
import ColorTypo from '../../../components/ColorTypo';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const Container = styled.div`
  padding: 0 15px;
  display: ${props => props.show ? 'block' : 'none'};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 17px;
  & > *:first-child {
    display: flex;
    align-items: center;
  & > svg {
    fill: #c9c9c9;
  }
  & > div {
    font-size: 15px;
    font-weight: 500;
    padding: 0 15px;
  }
  }
  & > *:last-child {
    margin-left: 10px;
    padding: 7px;    
  }
`
const StyledBodyTitle = styled(ListSubheader)`
  padding: 0;
  display: flex;
  align-items: center;
  
`
const StyledList = styled(List)`
  padding: 10px 0; 
  & > li {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
`;

const ExpansionPanelDetails = styled(MuiExpansionPanelDetails)`
  flex-direction: column;
  padding: 10px 0;
`

const Projects = (props) => {
  return (
    <div>{props.title}</div>
  )
}

const ExpansionProject = styled(ExpansionPanel)`
  box-shadow: none !important;
  & > *:first-child {
    flex-direction: row-reverse;
    padding: 0;
    margin: 0;
    min-height: 0;

    & > div {
      margin: 0;
    }
  }
  & > *:last-child {
    margin-left: 43px;
    & > div {
      & > div {
        & > div {
          & > div {
            border-bottom: 1px solid #0000001a;
            // padding: 12px 0;
          }
          & > *:first-child {
            border-top: 1px solid #0000001a;
          }
        }
      }
    }
  }
`

function ListProjectHeader({setShow}) {

  const closeListProject = () => {
    setShow(false)
  }

  return (
    <div style={{ marginBottom: 17 }}>
      <Header>
        <div>
          <Icon path={mdiApps} size={1.5} />
          <div>DANH SÁCH DỰ ÁN</div>
        </div>
        <IconButton
        onClick={closeListProject}
        >
          <Icon path={mdiWindowClose} size={1.2} />
        </IconButton>
      </Header>
      <SearchInput placeholder='Tìm dự án' />
    </div>
  )
}

function ListProjectBody({ subPrimary }) {
  return (
    <StyledList>
      <StyledBodyTitle disableSticky>
        <ColorTypo style={{ color: '#828282',  fontWeight: 500 }}>{subPrimary}</ColorTypo>
      </StyledBodyTitle>
    </StyledList>
  )
}

let fakeData = [
  {
    id: 1, name: 'Phòng quản lý dự án',
    projects: ['Dự án đầu tư khu đô thị Nam Từ Liêm 1', 'Dự án đầu tư khu đô thị Nam Từ Liêm 2', 'Dự án đầu tư khu đô thị Nam Từ Liêm 3'],
    open: true,
  },
  {
    id: 2, name: 'Phòng tổ chức hành chính',
    projects: ['Dự án đầu tư khu đô thị Nam Từ Liêm 4', 'Dự án đầu tư khu đô thị Nam Từ Liêm 5', 'Dự án đầu tư khu đô thị Nam Từ Liêm 6'],
    open: true
  }
]

function ListProject(props) {

  const [open, setOpen] = React.useState(1)

  const handleChange = id => (event, isExpanded) => {
    // console.log(id)
    // let idx = rooms.findIndex(room => room.id === id)
    // if (idx !== -1) {
    //   rooms[idx].open = !isExpanded
    //   setRooms(rooms)
    // }
  };

  return (
    // <Slide in={show} direction='left' mountOnEnter unmountOnExit>
    <Container {...props}>
      <ListProjectHeader {...props}/>
      {
        fakeData.map(room => {
          return (
            <div key={room.id}>
              <ExpansionProject>
                <ExpansionPanelSummary
                  expandIcon={<Icon path={mdiMenuUp} size={1} />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header">
                  <ListProjectBody subPrimary={room.name.toUpperCase()} />
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                {
                  room.projects.map((project, projectIdx) => <Projects key={projectIdx} title={project} />)
                }
                </ExpansionPanelDetails>
              </ExpansionProject>
            </div>
          )
        })
      }
    </Container>
    // </Slide>
  )
}

export default ListProject;