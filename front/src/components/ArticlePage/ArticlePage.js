import {baseImgURL} from "../../api";
import {Swiper, SwiperSlide} from "swiper/react";
import ArticleCard from "../ArticleCard/ArticleCard";
import './ArticlePage.scss'
import moment from "moment";
import localization from 'moment/locale/ru';
import {BigButton} from "../BigButton/BigButton";
import _ from 'lodash'
import {useNavigate} from "react-router-dom";
import ReactHtmlParser from 'react-html-parser'
moment.locale('ru', localization);

export function ArticlePage({data, goTo, news}) {
  const navigate = useNavigate()
  function getFormatDate(date) {
    return moment(date).format('DD MMMM YYYY')
  }
  return <>
    <div className="article">
      <div className="article__title">
        <h1>{data.title}</h1>
        <h2>{data.description}</h2>
      </div>
      {!_.isEmpty(data.category) && <div className="article__category">
        {data.category.map(({name, id}) => <BigButton onClick={() => navigate('/catalog', {state: {categoryId: id, brandId: data.id}})}>{name}</BigButton>)}
      </div>}
      <div className="article__body">
        {data.date ? <div className="article__date">{getFormatDate(data.date)}</div> : false}
        <div>{ReactHtmlParser(data.body)}</div>
      </div>
      <div className="article__photos">
        {data?.photos?.map(image => <img src={baseImgURL + image} alt="article-image" className="article__photo"/>)}
      </div>
      {news ? <div className="my-swipe-wrapper article__swipe-wrapper">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          navigation={true}
          breakpoints={{
            "769": {
              "slidesPerView": 2,
              "spaceBetween": 50
            }
          }}
        >
          {news.map(item => <SwiperSlide>
            <ArticleCard
              boxShadow="small"
              title={item.title}
              description={item.description}
              src={item.main_photo}
              id={item.id}
              onClick={() => goTo(item.id, item.isnews)}
            />
          </SwiperSlide>)}
        </Swiper>
      </div> : false}
    </div>
  </>
}