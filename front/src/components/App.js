import './App.scss'
import Menu from "./Menu/Menu";
import {Route, Routes} from "react-router-dom"
import About from "../views/About/About";
import Contacts from "../views/Contacts/Contacts";
import Examples from "../views/Examples/Examples";
import Catalog from "../views/Catalog/Catalog";
import News from "../views/News/News";
import Company from "../views/Сompany/Company";
import Home from "../views/Home/Home";
import Article from "../views/News/Article/Article";
import Footer from "./Footer/Footer";
import Brand from "../views/Сompany/Brand/Brand"
import Product from "../views/Catalog/Product/Product";
import Like from "../views/Like/Like";
import { ToastContainer } from 'react-toastify';
import Cart from "../views/Cart/Cart";
import Form from "../views/Form/Form";
import Search from "../views/Search/Search";
import ExamplesArticle from "../views/Examples/Article/ExamplesArticle";
import Feedback from "../views/Feedback/Feedback";

export default function App() {
  return (
    <>
      <ToastContainer style={{top: 75}}/>
      <Menu/>
      <main className="main">
        <Routes>
          <Route path="/about" element={<About/>}/>
          <Route path="/contacts" element={<Contacts/>}/>
          <Route path="/examples" element={<Examples/>}/>
          <Route path="/examples/:article" element={<ExamplesArticle/>}/>
          <Route path="/catalog" element={<Catalog/>}/>
          <Route path="/news" element={<News/>}/>
          <Route path="/company" element={<Company/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/catalog/:id" element={<Product/>}/>
          <Route path="/company/:id" element={<Brand/>}/>
          <Route path="/news/:article" element={<Article/>}/>
          <Route path="/like-products" element={<Like/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/cart/form" element={<Form/>}/>
          <Route path="/feedback" element={<Feedback/>}/>
          <Route path="/search/:search" element={<Search/>}/>
          <Route path="*" element={<h1>
            404. Нет такой страницы!
          </h1>}/>
        </Routes>
      </main>
      <Footer/>
    </>
  )
}