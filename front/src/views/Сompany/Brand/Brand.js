import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {loadBrand} from "../../../redux/brands/actionCreators";
import {useParams} from "react-router-dom";
import {ArticlePage} from "../../../components/ArticlePage/ArticlePage";
import {PageLoader} from "../../../components/PageLoader/PageLoader";

export default function Brand() {
  const dispatch = useDispatch()
  const {id} = useParams()
  const loading = useSelector(s => s.brandsReducer.loading)
  const brand = useSelector(s => s.brandsReducer.brand)

  useEffect(() => {
    dispatch(loadBrand(id))
  }, [])
  return loading ? <PageLoader/> : <ArticlePage data={brand}/>
}