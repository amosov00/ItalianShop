import './Company.scss'
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearBrandsState, loadBrands} from "../../redux/brands/actionCreators";
import {PageLoader} from "../../components/PageLoader/PageLoader";
import {baseImgURL} from "../../api";
export default function Company() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loading = useSelector(s => s.brandsReducer.loading)
  const brands = useSelector(s => s.brandsReducer.brands)


  useEffect(() => {
    dispatch(loadBrands({page: null}))
    return () => {dispatch(clearBrandsState())}
  }, [])


  function goTo(id) {
    navigate(`/company/${id}`)
  }

  return <>
    {
      loading ? <PageLoader/> : <div className="article company">
        <div className="article__title">
          <h1>Бренды</h1>
          <h2>Лучшие фабрики из Европы и США</h2>
        </div>
        <div className="company__list">
          {brands.map(({title, main_photo, id}) => {
            return <div className="company__item" onClick={() => goTo(id)}>
              <img src={baseImgURL + main_photo}/>
              <p>{title}</p>
            </div>
          })}
        </div>
      </div>
    }
  </>
}