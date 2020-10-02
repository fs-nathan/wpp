import React from 'react';
import KanbanPresenter from './presenters';
import { useParams } from 'react-router-dom';

function KanbanPage() {

  const { projectId } = useParams();
  const [ openHeader, setOpenHeader ] = React.useState(true);

  return (
    <KanbanPresenter 
      projectId={projectId} 
      isOpen={openHeader} setIsOpen={setOpenHeader} 
    />
  );
}

export default KanbanPage;