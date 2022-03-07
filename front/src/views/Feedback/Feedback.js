import { Form as FinalForm, Field } from 'react-final-form'
import Styles from '../Form/Styles'
import {submitFeedback} from "../../api";
import {toast} from "react-toastify";
export default function Feedback() {

  async function onSubmit(data, {reset}) {
    if ((data.phone || data.email) && data.lastName && data.firstName) {
      await submitFeedback(data)
      toast.success('Запрос успешно отправлен! С вами сяжутся в ближайшее время')
      reset()
    } else {
      toast.error('Заполните необходимые поля')
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
            <div className="buttons">
              <button type="submit">
                Отправить заявку на обратную связь
              </button>
            </div>
          </form>
        )}
      />
    </Styles>
  </>
}