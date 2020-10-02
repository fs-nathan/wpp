import React from 'react';
import Header from './Header';
import KanbanBoard from './KanbanBoard';
import './style.scss';

const Container = ({ className = '', isOpen, ...props }) =>
  <div className={`view_KanbanPage___container${isOpen ? '' : '-closed'} ${className}`} {...props} />;

function KanbanPage({ projectId, isOpen, setIsOpen }) {

  return (
    <Container isOpen={isOpen}>
      <Header projectId={projectId} isOpen={isOpen} setIsOpen={setIsOpen} />
      <KanbanBoard projectId={projectId} />
    </Container>
  );
}

export default KanbanPage;