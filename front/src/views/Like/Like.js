import '../Catalog/Catalog.scss'
import {ProductCard} from "../../components/ProductCard/ProductCard";
import {useEffect, useState} from "react";
import {fetchProduct} from "../../api";
import {PageLoader} from "../../components/PageLoader/PageLoader";

export default function Like() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(async () => {
    setLoading(true)
    const likeArray = JSON.parse(localStorage.getItem(`likeProducts`))
    const result = []
    for (let i in likeArray) {
      const {data} = await fetchProduct(likeArray[i])
      result.push(data)
    }
    setLoading(false)
    setProducts(result)
  }, [])

  return <>
    {
      loading
        ? <PageLoader/>
        : <div className="catalog">
          <div className="catalog__products-wrapper">
            {
              products.length !== 0
                ?
                (
                  <div className="catalog__products">
                    {products.map(data => <ProductCard data={data}/>)}
                  </div>
                )
                : <div className="catalog__products catalog__mock">Нет избранных товаров</div>
            }
          </div>
        </div>
    }
  </>
}