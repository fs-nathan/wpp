import { mdiDragVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { Checkbox } from 'antd';
import update from 'immutability-helper';
import React, { useCallback, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { changeColumnIndex, changeVisible } from '../../../actions/gantt';

const CheckBoxLabel = ({ text }) => {
  return (
    <span className="checkbox-label--drawer ml-0" style={{ position: 'relative' }}>
      <span>{text}</span>
    </span>
  )
}
const CheckBoxDragItem = ({ id, text, index, moveCheckbox, typeVisible, changeVisible, checked }) => {
  const ref = useRef(null)
  const [showIcon, setShowIcon] = useState(false)
  const [, drop] = useDrop({
    accept: 'card',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCheckbox(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'card', id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (<div className="config--drawer--drag-checkbox-wrapper" onMouseEnter={() => setShowIcon(true)} onMouseLeave={() => setShowIcon(false)} ref={ref} style={{ opacity, display: 'flex' }}>
    <div className="config--drawer--checkbox">
      <Icon style={{ margin: '0 10px', fill: showIcon ? 'black' : 'transparent' }} path={mdiDragVertical} size={1} />
    </div>
    <Checkbox checked={checked} onChange={(e) => changeVisible(e.target.checked, 'table', typeVisible)} className="config--drawer--checkbox" style={{
      display: 'flex',
      width: '100%',
      marginLeft: '8px !important'
    }}> <CheckBoxLabel drag={true} key={1} text={text} /></Checkbox>
  </div>
  )
}

const CheckBoxDragContainer = ({ changeColumnIndex, changeVisible, visibleTable }) => {
  const { t } = useTranslation()
  {
    const [cards, setCards] = useState([
      {
        id: 1,
        text: t('LABEL_GANTT_TASK_NAME_VISIBLE_CONFIG'),
        index: 0,
        typeVisible: 'name'

      },
      {
        id: 2,
        text: t('LABEL_GANTT_START_VISIBLE_CONFIG'),
        index: 1,
        typeVisible: 'start_time'
      },
      {
        id: 3,
        text: t('LABEL_GANTT_END_VISIBLE_CONFIG'),
        index: 2,
        typeVisible: 'end_time'
      },
      {
        id: 4,
        text: t('LABEL_GANTT_DURATION_VISIBLE_CONFIG'),
        index: 3,
        typeVisible: 'duration_actual'
      },
      {
        id: 5,
        text: t('LABEL_GANTT_COMPLETE_VISIBLE_CONFIG'),
        index: 4,
        typeVisible: 'complete'
      },
    ])
    const moveCheckbox = useCallback(
      (dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex]
        const newCard = update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
        changeColumnIndex(newCard.map(item => item.index))
        setCards(
          newCard
        )
      },
      [cards],
    )
    const renderCard = (card, index) => {
      return (
        <CheckBoxDragItem
          key={card.id}
          typeVisible={card.typeVisible}
          changeVisible={changeVisible}
          index={index}
          id={card.id}
          checked={visibleTable[card.typeVisible]}
          text={card.text}
          moveCheckbox={moveCheckbox}
        />
      )
    }
    return (
      <>
        <div >{cards.map((card, i) => renderCard(card, i))}</div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  visibleTable: state.gantt.visible.table,
})
const mapDispatchToProps = {
  changeColumnIndex,
  changeVisible
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckBoxDragContainer)