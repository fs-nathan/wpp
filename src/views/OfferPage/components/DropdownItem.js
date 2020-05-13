import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { Routes } from '../contants/routes';
import './DropdownItem.scss';
const DropdownItem = ({ name, subMenu }) => {
  const [showSubMenu, setShowSubMenu] = useState(false)
  const listRef = useRef()
  const handleToggle = () => {
    setShowSubMenu(!showSubMenu)
    const list = document.getElementsByClassName('Dropdown-item')
    for (let i = 0; i < list.length; i++) {
      list[i].classList.remove('item-actived')
    }
    listRef.current.classList.add('item-actived')
  }
  return (
    <>
      <li ref={listRef} className="Dropdown-item" onClick={handleToggle}>
        <a href="javascript:void(0)" className="Dropdown-item_title">
          {name}
          {!showSubMenu ? <ArrowDropDownIcon className="Dropdown-item__icon" /> : <ArrowDropUpIcon className="Dropdown-item__icon" />}
        </a>
      </li>
      {showSubMenu &&
        <ul className="Dropdown-item__sub_menu">
          {subMenu.map(sub => (
            <li><Link to={Routes.OFFERBYPROJECT + "/" + sub.id} >{sub.name}</Link></li>
          ))}
        </ul>
      }
    </>
  )
}


export default DropdownItem