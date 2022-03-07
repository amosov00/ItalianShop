import './Catalog.scss'
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {
  loadCategory,
  loadCategorySuccess,
  loadProducts, resetCategory, setBrandsId,
  setCategory, setDiscountFilter, setLimit, setOrder, setPrice, setStyleId,
  setSubCategory
} from "../../redux/catalog/actionCreators";
import AnimateHeight from 'react-animate-height';
import {useEffect, useRef, useState} from "react";
import Pagination from "../../components/Pagination/Pagination";
import {ProductCard} from "../../components/ProductCard/ProductCard";
import _ from "lodash";
import {clearBrandsState, loadBrands} from "../../redux/brands/actionCreators";
import {Select} from "../../components/Select/Select";
import {BigButton} from "../../components/BigButton/BigButton";
import {Input} from "../../components/Input/Input";

export default function Catalog() {
  const categoryTree = useSelector(s => s.categoryReducer.categoryTree)
  const currentPage = useSelector(s => s.categoryReducer.currentPage)
  const products = useSelector(s => s.categoryReducer.products)
  const loading = useSelector(s => s.categoryReducer.loading)
  const totalPages = useSelector(s => s.categoryReducer.totalPages)
  const checkedBrandsId = useSelector(s => s.categoryReducer.checkedBrandsId)
  const checkedStylesId = useSelector(s => s.categoryReducer.checkedStylesId)
  const minimalPrice = useSelector(s => s.categoryReducer.minimalPrice)
  const maximalPrice = useSelector(s => s.categoryReducer.maximalPrice)
  const brands = useSelector(s => s.brandsReducer.brands)
  const dispatch = useDispatch()
  const checkboxRef = useRef({})
  const { state } = useLocation();
  const [refUsed, setRefUsed] = useState(false)
  const [brandRefUsed, setBrandRefUsed] = useState(false)

  useEffect(() => {
    for (let input in checkboxRef.current) {
      checkboxRef.current[input].checked = false
    }
    dispatch(loadCategory())
    dispatch(loadBrands({page: null}))
    dispatch(setLimit(9))
    dispatch(loadProducts({page: 1}))
    return () => {
      dispatch(resetCategory())
      dispatch(clearBrandsState())
    }
  }, [])



  function autoClick(elem, id) {
    if (id === state?.categoryId && !refUsed) {
      if (elem) {
        elem.click()
        setRefUsed(true)
      }
    }
  }
  function autoClickBrand(elem, id) {
    checkboxRef.current['brand_ref_' + id] = elem
    if (id === state?.brandId && !brandRefUsed) {
      if (elem) {
        elem.click()
        setBrandRefUsed(true)
      }
    }
  }


  function tabClick(tab) {
    if (tab.children.length !== 0) {
      dispatch(loadCategorySuccess(categoryTree.map(item => {
        if (item.id === tab.id) {
          item.opened = !item.opened
        } else {
          item.opened = false
        }
        return {
          ...item,
          children: item.children.map(item => ({
            ...item,
            checked: false
          }))
        }
      })))

      if (tab.opened) {
        dispatch(setCategory(tab.id))
      } else {
        dispatch(setCategory(null))
      }

      dispatch(setSubCategory(null))
      dispatch(loadProducts({page: 1}))
    }
  }

  function subCheck(subCategory) {
    dispatch(loadCategorySuccess(categoryTree.map(item => ({
      ...item,
      children: item.children.map(item => ({
        ...item,
        checked: item.id === subCategory.id && item.category_id === subCategory.category_id
      }))
    }))))
    dispatch(setSubCategory(subCategory.id))
    dispatch(loadProducts({page: 1}))
  }

  function paginationPropFn(number) {
    dispatch(loadProducts({page: number}))
  }

  function checkedBrand(id, checked) {
    const index = checkedBrandsId.indexOf(id)
    const clone = _.clone(checkedBrandsId)
    if (checked && index === -1) {
      //добавление
      dispatch(setBrandsId([...checkedBrandsId, id]))
    } else if (!checked && index !== -1) {
      //удаление
      clone.splice(index, 1)
      dispatch(setBrandsId(clone))
    }
    dispatch(loadProducts({page: 1}))
  }


  function checkedStyles(id, checked) {
    const index = checkedStylesId.indexOf(id)
    const clone = _.clone(checkedStylesId)
    if (checked && index === -1) {
      //добавление
      dispatch(setStyleId([...checkedStylesId, id]))
    } else if (!checked && index !== -1) {
      //удаление
      clone.splice(index, 1)
      dispatch(setStyleId(clone))
    }
    dispatch(loadProducts({page: 1}))
  }

  function checkedDiscount(checked) {
    dispatch(setDiscountFilter(checked.target.checked))
    dispatch(loadProducts({page: 1}))
  }


  function cleanLoad() {
    for (let input in checkboxRef.current) {
      checkboxRef.current[input].checked = false
    }
    dispatch(resetCategory())
    dispatch(clearBrandsState())
    dispatch(loadCategory())
    dispatch(loadBrands({page: null}))
    dispatch(loadProducts({page: 1}))
  }


  function setCurrentPrice(value, type) {
    const intValue = parseInt(value.target.value) ? parseInt(value.target.value) : null
    dispatch((setPrice(intValue, type)))
    if (type === 'min' && intValue > maximalPrice && maximalPrice) {
      dispatch(setPrice(intValue, 'max'))
    }
    dispatch(loadProducts({page: 1}))
  }

  function setMaxPrice(price) {
    if ((price || price === 0) && price < minimalPrice) {
      dispatch(setPrice(minimalPrice, 'max'))
      dispatch(loadProducts({page: 1}))
    }
  }

  function changeOrder(value) {
    dispatch(setOrder(value))
    dispatch(loadProducts({page: 1}))
  }

  return <>
    <div className="catalog">
      <div className="catalog__filter">
        <BigButton style={{width: 205}} onClick={cleanLoad}>Сброс фильтров</BigButton>
        <div className="catalog__brands-name">
          Фильтр по категорям
        </div>
        {categoryTree.map(item => <div key={'catalog__category-block_' + item.id} className="catalog__category-block">
          <div style={item.children.length === 0 ? {opacity: 0.5, cursor: 'default'} : {}} ref={el => autoClick(el, item.id)} className="catalog__category-name" onClick={() => tabClick(item)}>
            <div>{item.name}</div>
            <div>{!item.opened ? <span>+</span> : <span>-</span>}</div>
          </div>
          <AnimateHeight
            duration={ 300 }
            height={ item.opened ? 'auto' : 0 }
          >
            <div className={`catalog__sub-category`}>{item.children.map((child) =>
              <div
                className={`catalog__sub-category-item ${child.checked && 'catalog__sub-category-item--checked'}`}
                key={'catalog__sub-category-item_' + child.id}
                onClick={() => subCheck(child)}
              ><b>·</b> {child.name}</div>
            )}</div>
          </AnimateHeight>
        </div>)}
        <div className="catalog__brands">
          <div className="catalog__brands-name">
            Фильтр по брендам
          </div>

          {brands.map(({title, id}) => <label className="catalog__brand" for={'brand_ref_' + id}>
            <div>{title}</div>
            <input id={'brand_ref_' + id} type="checkbox" ref={el => autoClickBrand(el, id)} onChange={(value) => checkedBrand(id, value.target.checked)}/>
          </label>)}
        </div>
        <div className="catalog__brands">
          <div className="catalog__brands-name">
            Фильтр по стилям
          </div>

          {[{id:1, title: 'Классический'}, {id:2, title: 'Современный'}, {id:3, title: 'Смешанный'}].map(({title, id}) => <label className="catalog__brand" for={'style_ref_' + id}>
            <div>{title}</div>
            <input type="checkbox" id={'style_ref_' + id} ref={el => checkboxRef.current['style_ref_' + id] = el}  onChange={(value) => checkedStyles(id, value.target.checked)}/>
          </label>)}
        </div>
        <div>
          <div className="catalog__brands-name">
            Фильтр по цене
          </div>
          <div className="catalog__range">
            <Input className="catalog__range_input" placeholder="От" value={minimalPrice} onChange={(value) => setCurrentPrice(value, 'min')} />
            <div>-</div>
            <Input className="catalog__range_input" placeholder="До" value={maximalPrice} onBlur={value => setMaxPrice(parseInt(value.target.value))} onChange={(value) => setCurrentPrice(value, 'max')} />
          </div>
        </div>
        <div>
          <label className="catalog__brands-name" style={{
            textAlign: 'left',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            'border-bottom': '#1A1A1A solid 1px',
            'border-top': '#1A1A1A solid 1px',
            padding: '18px 18px 18px 10px',
          }}
                 htmlFor="sale"
          >
            <div>спецпредложения</div>
            <input type="checkbox" id="sale" ref={el => checkboxRef.current['sale'] = el}
                   onChange={(value) => checkedDiscount(value)}/>
          </label>
        </div>
      </div>
      <div className="catalog__products-wrapper">
        {
          products.length !== 0
            ?
            (
              <div>
                {totalPages && <Pagination loading={loading} totalPages={totalPages} callPage={paginationPropFn} currentPage={currentPage}/>}
                  <Select onChange={value => changeOrder(value)} className="catalog__select" items={[
                    {value: 'date DESC', name: 'Сначала новые'},
                    {value: 'price ASC', name: 'Сначала дешевле'},
                    {value: 'price DESC', name: 'Сначала дороже'},
                    {value: 'brand_name', name: 'По бренду'},
                    {value: 'name', name: 'По названию'},
                  ]}/>
                  <div className="catalog__products">
                    {totalPages && products.map(data => <ProductCard data={data} key={data.id}/>)}
                  </div>
                {totalPages && <Pagination loading={loading} totalPages={totalPages} callPage={paginationPropFn} currentPage={currentPage}/>}
              </div>
            )
            : <div className="catalog__products catalog__mock">Нет товаров по выбранным параметрам</div>
        }
      </div>
    </div>
  </>
}