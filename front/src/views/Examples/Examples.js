import {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearNewsState, loadNews} from "../../redux/news/actionCreators";
import _ from 'lodash'
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import '../News/News.scss'
import Pagination from "../../components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";

export default function Examples() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const news = useSelector(s => s.newsReducer.news)
  const totalPages = useSelector(s => s.newsReducer.totalPages)
  const loading = useSelector(s => s.newsReducer.loading)
  const currentPage = useSelector(s => s.newsReducer.currentPage)

  useEffect(() => {
    dispatch(loadNews({page: 1, isNews: false}))
    return () => {
      dispatch(clearNewsState())
    }
  }, [])

  const chunckedNews = useMemo(() => {
    return _.chunk(news, 2)
  }, [news])


  function paginationPropFn(number) {
    dispatch(loadNews({page: number, isNews: false}))
  }


  function goTo(articleId) {
    navigate(`/examples/${articleId}`)
  }

  return (
    <div className="news">
      <div className="wrapper">
        <h1 className="title news__title">Объекты</h1>
        {totalPages && <Pagination loading={loading} totalPages={totalPages} callPage={paginationPropFn} currentPage={currentPage}/>}
        <div className="news__items">
          {chunckedNews.map(([object1, object2]) => {
            if (object2) {
              return <div className="news__section">
                <ArticleCard title={object1.title} description={object1.description} src={object1.main_photo} id={object1.id} onClick={() => goTo(object1.id)}/>
                <ArticleCard title={object2.title} description={object2?.description} src={object2.main_photo} id={object2.id} onClick={() => goTo(object2.id)}/>
              </div>
            } else {
              return <div className="news__section">
                <ArticleCard title={object1.title} description={object1.description} src={object1.main_photo} id={object1.id} onClick={() => goTo(object1.id)}/>
              </div>
            }
          })}
        </div>
        {totalPages && <Pagination loading={loading} totalPages={totalPages} callPage={paginationPropFn} currentPage={currentPage}/>}
      </div>
    </div>
  )
}