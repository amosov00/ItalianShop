import './ProductCard.scss'
import {BigButton} from "../BigButton/BigButton";
import faqs from '../../images/faqs.png'
import {baseImgURL} from "../../api";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import pinkHeart from '../../images/pink-heart.png'
import whiteHeart from '../../images/white-heart.png'
import {setCartCount, setLikeCount} from "../../redux/basket/actionCreators";
import {toast} from "react-toastify";



export function ProductCard({data, toCart}) {
  const navigate = useNavigate('')
  const [like, setLike] = useState(whiteHeart)
  const [count, setCount] = useState(1)
  const [brandClass, setBrandClass] = useState('product-card__brand')
  const likeCount = useSelector(s => s.basketReducer.likeCount)
  const cartCount = useSelector(s => s.basketReducer.cartCount)
  const dispatch = useDispatch()


  useEffect(() => {
    const likeArray = JSON.parse(localStorage.getItem(`likeProducts`))
    if (!data.price && !data.name) {
      setBrandClass('product-card__brand product-card__only-brand')
    }
    if (likeArray.includes(data.id)) {
      setLike(pinkHeart)
    } else {
      setLike(whiteHeart)
    }
  }, [])



  function inCart(e) {
    e.stopPropagation();
    const cartArray = JSON.parse(localStorage.getItem(`cartProducts`))
    const likeArray = JSON.parse(localStorage.getItem(`likeProducts`))
    const oldItem = cartArray.find(item => item.id === data.id)
    if (oldItem) {
      const index = cartArray.indexOf(oldItem)
      cartArray[index] = {
        ...oldItem,
        count: oldItem.count + count
      }
      localStorage.setItem(`cartProducts`, JSON.stringify(cartArray));
      setCount(1)

    } else {
      cartArray.push({id: data.id, count})
      setCount(1)
      localStorage.setItem(`cartProducts`, JSON.stringify(cartArray));
      dispatch(setCartCount(cartCount + 1))
    }
    toast.success('Товар добавлен в корзину!')
    if (likeArray.includes(data.id)) {
      setLike(whiteHeart)
      dispatch(setLikeCount(likeCount - 1))
      likeArray.splice(likeArray.indexOf(data.id), 1)
      localStorage.setItem(`likeProducts`, JSON.stringify(likeArray));
    }
  }


  function inLike(e, {id}) {
    e.stopPropagation();
    const likeArray = JSON.parse(localStorage.getItem(`likeProducts`))
    if (likeArray.includes(id)) {
      setLike(whiteHeart)
      likeArray.splice(likeArray.indexOf(id), 1)
      localStorage.setItem(`likeProducts`, JSON.stringify(likeArray));
      dispatch(setLikeCount(likeCount - 1))
    } else {
      setLike(pinkHeart)
      likeArray.push(id)
      localStorage.setItem(`likeProducts`, JSON.stringify(likeArray));
      dispatch(setLikeCount(likeCount + 1))
    }
  }

  function setNewCount(e, number) {
    e.stopPropagation()
    if (number) {
      setCount(number)
    }
  }

  function toBrand(e) {
    e.stopPropagation()
    navigate(`/company/${data.brand_id}`)
  }


  return <div className="product-card" onClick={() => navigate(`/catalog/${data.id}`)}>
    <img src={like}  onClick={(e) => inLike(e, data)} alt="heart" className="product-card__heart"/>
    <div className="product-card__image-wrapper">
      <img src={data.main_photo ? (baseImgURL + data.main_photo) : faqs} alt="product-name" className="product-card__image"/>
    </div>
    <div className={brandClass} onClick={toBrand}>
      {data.brand_name}
    </div>
    <div className="product-card__name">
      {data.name}
    </div>
    <div className="product-card__size">
      {data.size}
    </div>
    <div className="product-card__promotion">
      {data.last_price && 'Спецпредложение'}
    </div>
    <div className="product-card__last-price">
      {data.last_price && `${data.last_price} руб.`}
    </div>
    <div className="product-card__price">
      {data.price && `${data.price} руб.`}
    </div>
    <div className="product-card__buttons">
      <div style={{display: 'flex'}}>
        <BigButton style={{width: '20%', margin: 'auto'}} onClick={(e) => {setNewCount(e, count - 1)}}>-</BigButton>
        <BigButton style={{width: '100%', margin: 'auto'}} onClick={(e) => {e.stopPropagation()}}>{count}</BigButton>
        <BigButton style={{width: '20%', margin: 'auto'}}  onClick={(e) => {setNewCount(e, count + 1)}}>+</BigButton>
      </div>
      <BigButton style={{width: '100%', margin: 'auto'}} onClick={(e) => {inCart(e)}}>Добавить в корзину</BigButton>
    </div>
  </div>
}