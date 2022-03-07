import {useEffect, useMemo, useState} from "react";
import {fetchProduct} from "../../api";
import {PageLoader} from "../../components/PageLoader/PageLoader";
import {baseImgURL} from "../../api";
import './Cart.scss'
import faqs from "../../images/faqs.png";
import {BigButton} from "../../components/BigButton/BigButton";
import _ from 'lodash'
import {useDispatch, useSelector} from "react-redux";
import {setCartCount} from "../../redux/basket/actionCreators";
import {NavLink} from "react-router-dom"

export default function Cart() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const cartCount = useSelector(s => s.basketReducer.cartCount)

  useEffect(async () => {
    setLoading(true)
    const likeArray = JSON.parse(localStorage.getItem(`cartProducts`))
    const result = []
    for (let i in likeArray) {
      const {data} = await fetchProduct(likeArray[i].id)
      result.push({...data, count: likeArray[i].count})
    }
    setLoading(false)
    setProducts(result)
  }, [])


  const total = useMemo(() => {
    return products.reduce((prev, {count, price}) => {
      return prev + count * price
    }, 0)
  }, [products])

  function remove(item) {
    const cartArray = JSON.parse(localStorage.getItem(`cartProducts`))
    const clone = _.cloneDeep(products)
    const index = products.indexOf(item)
    const storageIndex = cartArray.findIndex((i) => i.id === item.id)
    cartArray.splice(storageIndex, 1)
    clone.splice(index, 1)
    setProducts(clone)
    dispatch(setCartCount(cartCount - 1))
    localStorage.setItem(`cartProducts`, JSON.stringify(cartArray));
  }

  function changeCount(item, operation) {
    const cartArray = JSON.parse(localStorage.getItem(`cartProducts`))
    const storageIndex = cartArray.findIndex((i) => i.id === item.id)
    const clone = _.cloneDeep(products)
    if (operation === 'add') {
      cartArray[storageIndex].count++
      clone[storageIndex].count++
    }
    if (operation === 'sub' && clone[storageIndex].count !== 1) {
      cartArray[storageIndex].count--
      clone[storageIndex].count--
    }
    setProducts(clone)
    localStorage.setItem(`cartProducts`, JSON.stringify(cartArray));
  }

  return <>
    {
      loading ?
        <PageLoader/> :
        <div className="cart">
          <div className="cart__table">
            <div className="cart__row to-upper-case" style={{height: 50}}>
              <BigButton style={{width: 45, opacity: 0}}>Х</BigButton>
              <div className="cart__row--image"></div>
              <div className="cart__row--name">Товар</div>
              <div className="cart__row--price">Цена</div>
              <div className="cart__row--count">Количество</div>
              <div className="cart__row--amount">Подытог</div>
            </div>
            {products.map(item => <div className="cart__row">
              <BigButton onClick={() => remove(item)} style={{width: 45}}>Х</BigButton>
              <div className="cart__row--image"><img src={item.main_photo ? (baseImgURL + item.main_photo) : faqs} alt="item-photo"/></div>
              <div className="cart__row--name">{item.name}</div>
              <div className="cart__row--price">{item.price && `${item.price}₽`}</div>
              <div className="cart__row--count">
                <BigButton style={{width: 45}} onClick={() => changeCount(item, 'sub')}>-</BigButton>
                <div>{item.count}</div>
                <BigButton style={{width: 45}} onClick={() => changeCount(item, 'add')}>+</BigButton>
              </div>
              <div className="cart__row--amount">{item.count * item.price}₽</div>
            </div>)}
          </div>
          <div className="cart__order">
            <div className="cart__order-amount to-upper-case">Сумма заказов</div>
            <div style={{display: 'flex', 'justify-content': 'space-between', margin: '20px 0'}} className="to-upper-case cart__order-amount">
              <div>Итого:</div>
              <div>{total}₽</div>
            </div>
            <NavLink to="/cart/form">
              <BigButton style={{width: '100%', margin: 0}} className="to-upper-case">Оформить заказ</BigButton>
            </NavLink>
          </div>
      </div>
    }
  </>
}