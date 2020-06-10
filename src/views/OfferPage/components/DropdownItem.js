import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { mdiMenuUp } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import ColorTypo from 'components/ColorTypo';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from '../contants/routes';
import './DropdownItem.scss';

const DropdownItem = ({ name, subMenu }) => {
  const history = useHistory();
  const projectID = window.location.pathname.split("/")[3];

  return (
    <>
      <ExpansionPanel
        defaultExpanded
        className="OfferView-project__contentPanel"
      >
        <ExpansionPanelSummary
          expandIcon={<Icon path={mdiMenuUp} size={1} />}
          id="panel1bh-header"
          className="OfferView-project__contentPanel_Summary"
        >
          <List className="listProjectBody" key="OfferView-project-name">
            <ListSubheader disableSticky className="listProjectBody--header">
              <ColorTypo style={{ color: '#828282', fontWeight: 500 }}>
                {name.toUpperCase()}
              </ColorTypo>
            </ListSubheader>
          </List>
        </ExpansionPanelSummary>
        <MuiExpansionPanelDetails className="OfferView-project_projectPanelDetail">
          {subMenu.map((project, projectIdx) => (
            <div
              className={clsx("OfferView-project_projectItem", { "OfferView-project_projectItem__selected": projectID == project.id })}
              onClick={() => {
                history.push(Routes.OFFERBYPROJECT + "/" + project.id)
              }}
              key={`OfferView-project-item-${projectIdx}`}
            >
              {project.name}
            </div>
          ))}
        </MuiExpansionPanelDetails>
      </ExpansionPanel>
    </>
  )
}
export default DropdownItem