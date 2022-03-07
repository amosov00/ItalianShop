import "./Footer.scss"
import {menuItems} from "../../consts";
import {NavLink} from "react-router-dom";
import LightInput from "../LightInput/LightInput";
import facebook from "../../images/vk.svg"
import instagram from "../../images/instagram.svg"
import {contacts} from "../../consts";
import {useDispatch, useSelector} from "react-redux";
import {sendEmailAction} from "../../redux/emails/actionCreators";



export default function Footer() {

  const dispatch = useDispatch()
  const loading = useSelector(s => s.emailReducer.loading)


  return (
    <footer className="footer">
      <div className="wrapper">
        <div className="footer__content">
          <ul className="footer__menu">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink title={item.text} to={item.to}>{item.text}</NavLink>
              </li>
            ))}
          </ul>

          <div className="footer__contacts">
            <div>контакты</div>
            <a href={`mailto:${contacts.moscow.email}`}>{contacts.moscow.email}</a>
            <div>{contacts.moscow.address} | {contacts.moscow.phone}</div>
            <div>{contacts.piter.address} | {contacts.piter.phone}</div>
          </div>

          <div className="footer__social footer__social--high-screen">
            <div>Подписаться</div>
            <LightInput fontSize={14} loading={loading} placeholder={'Ваш e-mail'} onSubmit={(val) => {dispatch(sendEmailAction(val))}}/>
            <div className="footer__images">
              <img src={facebook} alt="facebook"/>
              <img src={instagram} alt="instagram"/>
            </div>
          </div>

        </div>
        <div className="footer__social footer__social--low-screen">
          <div>
            <div>Подписаться</div>
            <LightInput fontSize={14} loading={loading} placeholder={'Ваш e-mail'} onSubmit={(val) => {dispatch(sendEmailAction(val))}}/>
          </div>
          <div className="footer__images">
            <img src={facebook} alt="facebook"/>
            <img src={instagram} alt="instagram"/>
          </div>
        </div>
        <div className="footer__small-info">
          <div className="footer__small-contact">
            <div className="footer__small-adress">{contacts.moscow.address}</div>
            <div className="footer__small-phone">{contacts.moscow.phone}</div>
          </div>
          <div className="footer__small-contact">
            <div className="footer__small-adress">{contacts.piter.address}</div>
            <div className="footer__small-phone">{contacts.piter.phone}</div>
          </div>
          <div className="footer__small-email">
            <a href={`mailto:${contacts.moscow.email}`} style={{color: 'black'}}>{contacts.moscow.email}</a>
          </div>
        </div>
        <p className="footer__alert">Цены носят информационный характер, не является публичной офертой.</p>
      </div>
    </footer>
  )
}