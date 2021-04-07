import React from 'react';
import Header from './Header';
import KanbanBoard from './KanbanBoard';
import './style.scss';

const Container = ({ className = '', isOpen, ...props }) =>
  <div className={`view_KanbanPage___container${isOpen ? '' : '-closed'} ${className}`} {...props} />;

function KanbanPage({ 
  projectId, handleOpenModal,
  isOpen,
}) {

  return (
    <Container isOpen={isOpen}>
      <Header 
        projectId={projectId} 
        handleOpenModal={handleOpenModal}
      />
      <KanbanBoard 
        projectId={projectId} 
        handleOpenModal={handleOpenModal}
      />
    </Container>
  );
}

export default KanbanPage;