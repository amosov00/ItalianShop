import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearNewsState, loadRandomNews, loadSingleNews} from "../../../redux/news/actionCreators";
import {ArticlePage} from "../../../components/ArticlePage/ArticlePage";
import { useNavigate } from "react-router-dom";
import {PageLoader} from "../../../components/PageLoader/PageLoader";


export default function Article() {
  const {article} = useParams()
  const dispatch = useDispatch()
  const singleNews = useSelector(s => s.newsReducer.singleNews)
  const news = useSelector(s => s.newsReducer.news)
  const loading = useSelector(s => s.newsReducer.loading)
  const navigate = useNavigate()

  function goTo(articleId, isNews) {
    dispatch((clearNewsState()))
    dispatch(loadRandomNews())
    dispatch(loadSingleNews(articleId))
    if (isNews) {
      navigate(`/news/${articleId}`)
    } else {
      navigate(`/examples/${articleId}`)
    }
  }

  useEffect(() => {
    dispatch(loadRandomNews())
    dispatch(loadSingleNews(article))
    return () => {
      dispatch((clearNewsState()))
    }
  }, [])


  return !loading ? <ArticlePage data={singleNews} news={news} goTo={goTo}/> : <PageLoader/>
}