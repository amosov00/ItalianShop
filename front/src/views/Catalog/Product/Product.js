import {useEffect, useState, useRef} from "react";
import LightGallery from 'lightgallery/react';
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';
import lgZoom from 'lightgallery/plugins/zoom';
import './Product.scss'
import {useDispatch, useSelector} from "react-redux";
import {loadProduct} from "../../../redux/catalog/actionCreators";
import {useNavigate, useParams} from "react-router-dom";
import {PageLoader} from "../../../components/PageLoader/PageLoader";
import {Swiper, SwiperSlide} from "swiper/react";
import faqs from '../../../images/faqs.png'
import measure from '../../../images/measure.svg'
import pinkHeart from '../../../images/pink-heart.png'
import whiteHeart from '../../../images/white-heart.png'
import ReactHtmlParser from 'react-html-parser'

import {baseImgURL} from "../../../api/index";
import {BigButton} from "../../../components/BigButton/BigButton";
import {setCartCount, setLikeCount} from "../../../redux/basket/actionCreators";
import {toast} from "react-toastify";

export default function Product() {
  const photoRefs = useRef({})
  const dispatch = useDispatch()
  const {id} = useParams()
  const navigate = useNavigate('')
  const loading = useSelector(s => s.categoryReducer.loading)
  const product = useSelector(s => s.categoryReducer.product)
  const likeCount = useSelector(s => s.basketReducer.likeCount)
  const cartCount = useSelector(s => s.basketReducer.cartCount)
  const [count, setCount] = useState(1)
  const [like, setLike] = useState(whiteHeart)


  useEffect(() => {
    dispatch(loadProduct(id))
  }, [])

  useEffect(() => {
    const likeArray = JSON.parse(localStorage.getItem(`likeProducts`))
    if (likeArray.includes(product.id)) {
      setLike(pinkHeart)
    } else {
      setLike(whiteHeart)
    }
  }, [product])


  function inCart() {
    const cartArray = JSON.parse(localStorage.getItem(`cartProducts`))
    const likeArray = JSON.parse(localStorage.getItem(`likeProducts`))
    const oldItem = cartArray.find(item => item.id === product.id)
    if (oldItem) {
      const index = cartArray.indexOf(oldItem)
      cartArray[index] = {
        ...oldItem,
        count: oldItem.count + count
      }
      localStorage.setItem(`cartProducts`, JSON.stringify(cartArray));
      setCount(1)

    } else {
      cartArray.push({id: product.id, count})
      setCount(1)
      localStorage.setItem(`cartProducts`, JSON.stringify(cartArray));
      dispatch(setCartCount(cartCount + 1))
    }
    toast.success('Товар добавлен в корзину!')
    if (likeArray.includes(product.id)) {
      setLike(whiteHeart)
      dispatch(setLikeCount(likeCount - 1))
      likeArray.splice(likeArray.indexOf(product.id), 1)
      localStorage.setItem(`likeProducts`, JSON.stringify(likeArray));
    }
  }


  function inLike() {
    const likeArray = JSON.parse(localStorage.getItem(`likeProducts`))
    if (likeArray.includes(product.id)) {
      setLike(whiteHeart)
      likeArray.splice(likeArray.indexOf(product.id), 1)
      localStorage.setItem(`likeProducts`, JSON.stringify(likeArray));
      dispatch(setLikeCount(likeCount - 1))
    } else {
      setLike(pinkHeart)
      likeArray.push(product.id)
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

  function toBrand() {
    navigate(`/company/${product.brand_id}`)
  }

  function openPhoto(name) {
    console.log(name)
    photoRefs.current[name].click()
  }

  return <>
    {
        loading ?
        <PageLoader/> :
        <div className="product">
          <div>
            <Swiper
              slidesPerView={1}
              navigation={true}
              className="product__swiper"
            >
              <SwiperSlide>
                {product.main_photo ?
                  <img className="product__swiper-item" src={baseImgURL + product.main_photo} alt="main" onClick={() => openPhoto(product.main_photo)}/> :
                  <img className="product__swiper-item" src={faqs} alt="alt"/> }
              </SwiperSlide>
              {product.photos && product.photos.map(photo => <SwiperSlide>
                <img className="product__swiper-item" src={baseImgURL + photo} alt="photo" onClick={() => openPhoto(photo)}/>
              </SwiperSlide>)}
            </Swiper>
            <div>
              <LightGallery
                speed={500}
                plugins={[lgZoom]}
              >
                {
                  product.main_photo &&
                  <a href={baseImgURL + product.main_photo} ref={el => photoRefs.current[product.main_photo] = el}>
                    <img src={baseImgURL + product.main_photo} style={{width: 0}}/>
                  </a>
                }
                {
                  product.photos && product.photos.map(photo => <a href={baseImgURL + photo} ref={el => photoRefs.current[photo] = el}>
                    <img src={baseImgURL + photo} style={{width: 0}}/>
                  </a>)
                }
              </LightGallery>
            </div>
          </div>

          <div className="product__info">
            <div className="product__info_name">{product.name}</div>
            <div className="product__info_brand" onClick={toBrand}>{product.brand_name}</div>
            {
              product.size && <div className="product__info_size">
                <img src={measure} alt="line"/>
                <div>{product.size}</div>
              </div>
            }
            <div className="product__info_description">{ReactHtmlParser(product.description)}</div>
            {product.last_price && <div className="product__special_price">СПЕЦПРЕДЛОЖЕНИЕ</div>}
            <div className="product__info_price">
              {product.last_price && <div className="last-price">{product.last_price} руб.</div>}
              <div>{product.price && `${product.price} руб.`}</div>
            </div>
            <div className="product__buttons">
              <BigButton style={{width: 215}} onClick={() => {inCart()}}>Добавить в корзину</BigButton>
              <BigButton style={{width: 45}} onClick={() => {inLike()}}>
                <img src={like} alt="heart" style={{width: 20}}/>
              </BigButton>
            </div>
            <div style={{display: 'flex'}}>
              <BigButton style={{width: 45}} onClick={(e) => {setNewCount(e, count - 1)}}>-</BigButton>
              <BigButton style={{width: 154}}>{count}</BigButton>
              <BigButton style={{width: 45}}  onClick={(e) => {setNewCount(e, count + 1)}}>+</BigButton>
            </div>
          </div>
        </div>
    }

  </>
}