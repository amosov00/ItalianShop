import './SideBar.scss'
import close from '../../images/close.svg'
import {NavLink} from "react-router-dom"

export default function SideBar({closeSideBar, menuItems}) {
  return (
    <div className="sidebar">
      <div className="sidebar__close-section">
        <button onClick={() => closeSideBar()}>
          <img src={close} alt="close-btn"/>
        </button>
      </div>
      <ul className="sidebar__menu-list">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink onClick={() => closeSideBar()} to={item.to}>{item.text}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}