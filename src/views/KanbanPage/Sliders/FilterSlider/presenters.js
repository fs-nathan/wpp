import React from 'react';
import { IconButton, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiFilterOutline, mdiClose } from '@mdi/js';
import { includes } from 'lodash';
import { useTranslation } from 'react-i18next';
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

  const { t } = useTranslation();

  const status = React.useMemo(() => [t("LABEL_CHAT_TASK_DANG_CHO"), t("LABEL_CHAT_TASK_DANG_LAM"), t("LABEL_CHAT_TASK_HOAN_THANH"), t("LABEL_CHAT_TASK_DA_QUA_HAN"), t("LABEL_CHAT_TASK_TAM_DUNG")], [t]);
  const priority = React.useMemo(() => [t("LABEL_CHAT_TASK_UU_TIEN_THAP"), t("LABEL_CHAT_TASK_UU_TIEN_TRUNG_BINH"), t("LABEL_CHAT_TASK_UU_TIEN_CAO")], [t]);

  return (
    <Container>
      <Header>
        <Icon
          path={mdiFilterOutline}
          size={1}
          color={"rgba(0, 0, 0, 0.54)"}
        />
        <Title>{t("IDS_WP_FILTER")}</Title>
        <abbr title={t("LABEL_CHAT_TASK_DONG")}>
          <IconButton
            onClick={evt => handleCloseClick()}
          >
            <Icon
              path={mdiClose}
              size={1}
              color={"rgba(0, 0, 0, 0.54)"}
            />
          </IconButton>
        </abbr>
      </Header>
      <Body>
        <FilterBox>
          <FilterTitle>{t("Lọc theo trạng thái công việc")}</FilterTitle>
          <FilterHelper>{t("Chọn/bỏ chọn trạng thái để lọc công việc")}</FilterHelper>
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
          <FilterTitle>{t("Lọc theo mức độ ưu tiên")}</FilterTitle>
          <FilterHelper>{t("Chọn/bỏ chọn mức độ ưu tiên để lọc công việc")}</FilterHelper>
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