import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css'
import App from './components/App';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from "./redux";
import 'react-toastify/dist/ReactToastify.css';
import 'rc-slider/assets/index.css';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import SwiperCore, {Navigation} from "swiper";
SwiperCore.use([Navigation]);

if (!localStorage.getItem(`likeProducts`)) {
  localStorage.setItem(`likeProducts`, '[]')
}
if (!localStorage.getItem(`cartProducts`)) {
  localStorage.setItem(`cartProducts`, '[]')
}

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
