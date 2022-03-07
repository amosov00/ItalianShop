import './Input.scss'
export function Input({className, placeholder, onChange, value, onBlur}) {
  return <>
    <input type="number" placeholder={placeholder} value={value} className={'input ' + className} onChange={onChange} onBlur={onBlur}/>
  </>
}