import React from 'react';
import { IconButton, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiFilterOutline, mdiClose } from '@mdi/js';
import { includes } from 'lodash';
import './style.scss';

const Container = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_FilterSlider___container ${className}`}
    {...props}
  />

const Header = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_FilterSlider___header ${className}`}
    {...props}
  />

const Body = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_FilterSlider___body ${className}`}
    {...props}
  />

const Title = ({ className = '', ...props }) =>
  <span 
    className={`view_KanbanPage_FilterSlider___title ${className}`}
    {...props}
  />

const FilterBox = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_FilterSlider___filter-box ${className}`}
    {...props}
  />

const FilterTitle = ({ className = '', ...props }) =>
  <span 
    className={`view_KanbanPage_FilterSlider___filter-title ${className}`}
    {...props}
  />

const FilterHelper = ({ className = '', ...props }) =>
  <span 
    className={`view_KanbanPage_FilterSlider___filter-helper ${className}`}
    {...props}
  />

const FilterCheckBoxGroup = ({ className = '', ...props }) =>
  <FormGroup 
    className={`view_KanbanPage_FilterSlider___filter-checkbox-group ${className}`}
    {...props}
  />

const FilterCheckBox = ({ className = '', checked, ...props }) =>
  <Checkbox 
    className={`view_KanbanPage_FilterSlider___filter-checkbox${checked ? '-checked' : ''} ${className}`}
    checked={checked}
    {...props}
  />

function FilterSlider({
  statusFilter, setStatusFilter,
  priorityFilter, setPriorityFilter,
  handleCloseClick,
}) {

  const status = React.useMemo(() => ['Đang chờ', 'Đang làm', 'Hoàn thành', 'Quá hạn', 'Tạm dừng'], []);
  const priority = React.useMemo(() => ['Ưu tiên thấp', 'Ưu tiên trung bình', 'Ưu tiên cao']);

  return (
    <Container>
      <Header>
        <Icon
          path={mdiFilterOutline}
          size={1}
          color={"rgba(0, 0, 0, 0.54)"}
        />
        <Title>Lọc</Title>
        <IconButton
          onClick={evt => handleCloseClick()}
        >
          <Icon
            path={mdiClose}
            size={1}
            color={"rgba(0, 0, 0, 0.54)"}
          />
        </IconButton>
      </Header>
      <Body>
        <FilterBox>
          <FilterTitle>Lọc theo trạng thái công việc</FilterTitle>
          <FilterHelper>Chọn/bỏ chọn trạng thái để lọc công việc</FilterHelper>
          <FilterCheckBoxGroup>
            {status.map((value, index) => (
              <FormControlLabel
                control={
                  <FilterCheckBox
                    checked={includes(statusFilter, index)}
                    onChange={evt => setStatusFilter(index)}
                    name={`${value}-checkbox`}
                  />
                }
                label={value}
              />
            ))}
          </FilterCheckBoxGroup>
        </FilterBox>
        <FilterBox>
          <FilterTitle>Lọc theo mức độ ưu tiên</FilterTitle>
          <FilterHelper>Chọn/bỏ chọn mức độ ưu tiên để lọc công việc</FilterHelper>
          <FilterCheckBoxGroup>
            {priority.map((value, index) => (
              <FormControlLabel
                control={
                  <FilterCheckBox
                    checked={includes(priorityFilter, index)}
                    onChange={evt => setPriorityFilter(index)}
                    name={`${value}-checkbox`}
                  />
                }
                label={value}
              />
            ))}
          </FilterCheckBoxGroup>
        </FilterBox>
      </Body>
    </Container>
  );
}

export default FilterSlider; 