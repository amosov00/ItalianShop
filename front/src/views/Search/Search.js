import {useNavigate, useParams} from "react-router-dom";
import './Search.scss'
import {BigButton} from "../../components/BigButton/BigButton";
import {useEffect, useState} from "react";
import {loadProducts, setText} from "../../redux/catalog/actionCreators";
import {setLimit} from "../../redux/catalog/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import {baseImgURL} from "../../api";
import faqs from "../../images/faqs.png";
import Pagination from "../../components/Pagination/Pagination";
import {loadBrands} from "../../redux/brands/actionCreators";

export default function Search() {
  const {search} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate('')

  const [desired, setDesired] = useState('products')

  const currentPageProducts = useSelector(s => s.categoryReducer.currentPage)
  const products = useSelector(s => s.categoryReducer.products)
  const loadingProducts = useSelector(s => s.categoryReducer.loading)
  const totalPagesProducts = useSelector(s => s.categoryReducer.totalPages)

  const text = useSelector(s => s.categoryReducer.text)

  const brands = useSelector(s => s.brandsReducer.brands)
  const currentPageBrands = useSelector(s => s.brandsReducer.currentPage)
  const loadingBrands = useSelector(s => s.brandsReducer.loading)
  const totalPagesBrands = useSelector(s => s.brandsReducer.pageCount)




  useEffect(() => {
    dispatch(setLimit(3))
    if (!text) {
      dispatch(setText(search))
      dispatch(loadProducts({page: 1}))
    }
    return () => {dispatch(setText(null))}
  }, [])


  useEffect(() => {
    if (desired === 'brands') {
      dispatch(loadBrands({page: 1}))
    }
  }, [desired])


  useEffect(() => {
    setDesired('products')
  }, [search])

  function paginationPropFn(number) {
    if (desired === 'products') {
      dispatch(loadProducts({page: number}))
    } else {
      dispatch(loadBrands({page: number}))
    }
  }


  function getProductsTemplate() {
    return <div className="search__items">
      { products.map(({main_photo, name, description, id}) => <div className="search__item" onClick={() => navigate(`/catalog/${id}`)}>
        <div className="search__photo">
          <img src={main_photo ? (baseImgURL + main_photo) : faqs} alt="product" className="search__image"/>
        </div>
        <div className="search__text-wrapper">
          <div className="search__name">{name}</div>
          <div className="search__description">{description}</div>
        </div>
      </div> )}
      <div className="search__pagination" key={desired}>
        {totalPagesProducts && <Pagination loading={loadingProducts} totalPages={totalPagesProducts} callPage={paginationPropFn} currentPage={currentPageProducts}/>}
        {!products.length &&
        <div className="catalog__products catalog__mock" style={{margin: 'auto'}}>
          Нет товаров по данному запросу
        </div>
        }
      </div>
    </div>
  }

  function getBrandsTemplate() {
    return <div className="search__items">
      { brands.map(({main_photo, title, body, id}) => <div className="search__item" onClick={() => navigate(`/company/${id}`)}>
        <div className="search__photo">
          <img src={main_photo ? (baseImgURL + main_photo) : faqs} alt="product" className="search__image"/>
        </div>
        <div className="search__text-wrapper">
          <div className="search__name">{title}</div>
          <div className="search__description">{body}</div>
        </div>
      </div> )}
      <div className="search__pagination" key={desired}>
        {totalPagesBrands && <Pagination loading={loadingBrands} totalPages={totalPagesBrands} callPage={paginationPropFn} currentPage={currentPageBrands}/>}
        {   !brands.length &&
          <div className="catalog__products catalog__mock" style={{margin: 'auto'}}>
            Нет брендов по данному запросу
          </div>
        }
      </div>
    </div>
  }

  return <>
    <div className="search">
      <div className="search__text">
        Результаты по запросу: <b>{search}</b>
      </div>
      <div className="search__button-group">
        <BigButton style={{width: 215}} onClick={() => setDesired('products')} isBlood={desired === 'products'}>По товарам</BigButton>
        <BigButton style={{width: 215}} onClick={() => setDesired('brands')} isBlood={desired === 'brands'}>По брендам</BigButton>
      </div>
      {desired === 'products' ? getProductsTemplate() : getBrandsTemplate()}
    </div>
  </>
}