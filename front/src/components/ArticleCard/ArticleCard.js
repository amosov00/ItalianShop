import './ArticleCard.scss'
import {baseImgURL} from "../../api";

export default function ArticleCard({src, title, description, onClick, id, boxShadow}) {
  let classes


  if (!boxShadow) {
    classes = 'article-card__big-box-shadow'
  } else if (boxShadow === 'small') {
    classes = 'article-card__small-box-shadow'
  }


  return (
    <div className={`article-card ${classes}`} onClick={onClick} id={id}>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <img src={baseImgURL + src} alt="card_image"/>
      </div>
      <div className="article-card__text">
        <div className="article-card__title">{title}</div>
        <div className="article-card__description">{description}</div>
      </div>
    </div>
  )
}