import './Menu.scss'
import search from '../../images/search.svg'
import {useEffect} from "react";
import search_black from '../../images/search_black.svg'
import burger from '../../images/mobil_btn.png'
import close from '../../images/close.svg'
import like from '../../images/like.png'
import basket from '../../images/shopping-cart.png'
import SideBar from "../SideBar/SideBar";
import {useState, useRef} from "react";
import {NavLink} from "react-router-dom"
import {menuItems} from "../../consts";
import logotype from "../../images/logotype.jpg"
import {useSelector, useDispatch} from "react-redux";
import {setCartCount, setLikeCount} from "../../redux/basket/actionCreators";
import {useNavigate} from "react-router-dom";
import {loadProducts, setLimit, setText as setTextAction} from "../../redux/catalog/actionCreators";


export default function Menu() {
  const [activeInput, setActiveInput] = useState(false)
  const [showSideBar, setShowSideBar] = useState(false)
  const [text, setText] = useState('')
  const inputRef = useRef()
  const likeCount = useSelector(s => s.basketReducer.likeCount)
  const cartCount = useSelector(s => s.basketReducer.cartCount)
  const dispatch =  useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    const likeArray = JSON.parse(localStorage.getItem(`likeProducts`))
    const cartArray = JSON.parse(localStorage.getItem(`cartProducts`))
    dispatch(setCartCount(cartArray.length))
    dispatch(setLikeCount(likeArray.length))
    document.addEventListener("keydown", listener)
  }, [])

  let inputClasses = 'menu__input'
  if (activeInput) {
    inputClasses += ' menu__input--show'
  } else {
    inputClasses += ' menu__input--hide'
  }

  function closeSideBar() {
    document.body.classList.remove('overflow-hidden')
    setShowSideBar(false)
  }

  function openSideBar() {
    document.body.classList.add('overflow-hidden')
    setShowSideBar(true)
  }

  function goSearch() {
    if (text !== '') {
        dispatch(setLimit(3))
        dispatch(setTextAction(text))
        dispatch(loadProducts({page: 1}))
        navigate(`/search/${text}`)
        setActiveInput(false)
        setText('')
    }
  }

  function listener(event) {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      event.preventDefault();
      goSearch()
    }
  }




  return (
    <div className="menu">
      {showSideBar && <SideBar menuItems={menuItems} closeSideBar={closeSideBar}/>}
      <div className="wrapper">
        <button onClick={() => openSideBar()} className="menu__burger-btn">
          <img src={burger} alt="menu"/>
        </button>
        <NavLink to="/">
          <div className="menu__logo">
            <img src={logotype} alt="logo"/>
          </div>
        </NavLink>
        <ul className="menu__items">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink title={item.text} to={item.to}>{item.text}</NavLink>
            </li>
          ))}
        </ul>
        <NavLink to="/like-products">
          <div className="menu__button-wrapper">
            {likeCount ? <div>{likeCount}</div> : ''}
            <img src={like} alt="like" className="menu__like"/>
          </div>
        </NavLink>
        <NavLink to="/cart">
          <div className="menu__button-wrapper">
            {cartCount ? <div>{cartCount}</div> : ''}
            <img src={basket} alt="basket" className="menu__basket"/>
          </div>
        </NavLink>
        <div className="menu__search-btn">
          <button onClick={() => {
            if (!activeInput) {
              inputRef.current.focus()
            } else {
              inputRef.current.blur()
            }
            setActiveInput(!activeInput)
          }}>
            <img src={activeInput ? close : search} alt="lupa"/>
          </button>
          <div className={inputClasses}>
            <input type="text" onInput={(e) => setText(e.target.value)} value={text} onKeyDown={(e) => listener(e)} ref={inputRef}/>
            <button onClick={() => goSearch()}>
              <img src={search_black} alt="search_btn"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}