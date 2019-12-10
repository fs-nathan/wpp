import React from 'react';
import { IconButton, ListSubheader, List } from '@material-ui/core';
import { mdiClose , mdiDrag, mdiMenuUp } from '@mdi/js';
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
  margin-top: 9px;
  & > svg {
    color: rbga(0,0,0,0.54);
  }
  & > div {
    font-size: 15px;
    font-weight: normal;
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
  const ProjectsDetail = styled.div`
  padding: 12px 0;
  font-weight: 500;
  border-bottom: 1px solid #0000001a;
  cursor: pointer;
  & > *:first-child {
    border-top: 1px solid #0000001a;
  }
  `

  return (
    <ProjectsDetail  onClick={() => {console.log('hello')}}>{props.title}</ProjectsDetail>
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
          & > *:first-child {
            padding: 0;
            border-top: 1px solid #0000001a;
          }
        }
      }
    }
  }
`
const ButtonIcon = styled(IconButton)`
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`

function ListProjectHeader({ setShow }) {

  const closeListProject = () => {
    setShow(false)
  }

  return (
    <div style={{ marginBottom: 17 }}>
      <Header>
        <Icon path={mdiDrag} size={1} color={'#000000'}/>
        <div>DANH SÁCH DỰ ÁN</div>
        <ButtonIcon
          onClick={closeListProject}
        >
          <Icon path={mdiClose} size={1} />
        </ButtonIcon>
      </Header>
      <SearchInput placeholder='Tìm dự án' />
    </div>
  )
}

function ListProjectBody({ subPrimary }) {
  return (
    <StyledList>
      <StyledBodyTitle disableSticky>
        <ColorTypo style={{ color: '#828282', fontWeight: 500 }}>{subPrimary}</ColorTypo>
      </StyledBodyTitle>
    </StyledList>
  )
}

let fakeData = [
  {
    id: 1, name: 'Phòng quản lý dự án',
    projects: ['Dự án đầu tư khu đô thị Nam Từ Liêm', 'Dự án đầu tư khu đô thị Nam Từ Liêm', 'Dự án đầu tư khu đô thị Nam Từ Liêm'],
    open: true,
  },
  {
    id: 2, name: 'Phòng tổ chức hành chính',
    projects: ['Dự án đầu tư khu đô thị Nam Từ Liêm', 'Dự án đầu tư khu đô thị Nam Từ Liêm', 'Dự án đầu tư khu đô thị Nam Từ Liêm'],
    open: true
  }
]

function ListProject(props) {

  return (
    <Container {...props}>
      <ListProjectHeader {...props} />
      {
        fakeData.map(room => {
          return (
            <div key={room.id}>
              <ExpansionProject defaultExpanded>
                <ExpansionPanelSummary
                  expandIcon={<Icon path={mdiMenuUp} size={1} />}
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
  )
}

export default ListProject;