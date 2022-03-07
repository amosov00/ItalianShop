import { Form as FinalForm, Field } from 'react-final-form'
import Styles from './Styles'
import {submitForm} from "../../api";
import {setCartCount} from "../../redux/basket/actionCreators";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {useState} from "react";
export default function Form() {
  const dispatch = useDispatch()
  const [number, setNumber] = useState(null)

  async function onSubmit(data, {reset}) {
    const cartArray = JSON.parse(localStorage.getItem(`cartProducts`))
    if (cartArray.length !== 0) {
      if ((data.phone || data.email) && data.lastName && data.firstName) {
        const {data: {number}} = await submitForm({
          ...data,
          products: cartArray
        })
        setNumber(number)
        localStorage.setItem(`cartProducts`, '[]')
        dispatch(setCartCount(0))
        reset()
      } else {
        toast.error('Заполните необходимые поля')
      }
    } else {
      toast.error('Добавьте хоть один товар в корзину')
    }
  }

  return <>
    <Styles>
      <FinalForm
        onSubmit={(event, reset) => onSubmit(event, reset)}
        render={({ handleSubmit, form, values, reset }) => (
          <form onSubmit={(event) => handleSubmit(event, reset)}>
            <div>
              <label>Имя</label>
              <Field
                name="firstName"
                component="input"
                type="text"
                placeholder="Имя"
              />
            </div>
            <div>
              <label>Фамилия</label>
              <Field
                name="lastName"
                component="input"
                type="text"
                placeholder="Фамилия"
              />
            </div>
            <div>
              <label>E-mail</label>
              <Field
                name="email"
                component="input"
                type="email"
                placeholder="E-mail"
              />
            </div>
            <div>
              <label>Телефон</label>
              <Field
                name="phone"
                component="input"
                type="number"
                placeholder="Телефон"
              />
            </div>
            <div>
              <label>Примечания к заказу</label>
              <Field name="notes" component="textarea" placeholder="Примечания к заказу" />
            </div>
            <div className="buttons">
              <button type="submit">
                Отправить заявку
              </button>
            </div>
            {/*<pre>{JSON.stringify(values, 0, 2)}</pre>*/}
          </form>
        )}
      />
    </Styles>
    {number && <div style={{
      'text-align': 'center',
      'font-size': 20,
      'margin-top': 40
    }}>
      Номер вашего заказа: {number}. Наш менеджер скоро с вами свяжется
    </div>}
  </>
}