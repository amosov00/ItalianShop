import strelka from '../../images/strelka.svg'
import './LightInput.scss'
import {useState} from "react";
import { Ring } from 'react-spinners-css';


const getStyle = (size) => ({
  top: '0',
  transform: 'translate(0, -100%)',
  fontSize: `${size * 1.15}px`
})


export default function LightInput({fontSize, placeholder, propsValue, onSubmit, loading}) {


  const [value, setValue] = useState(propsValue)

  const [classes, setClasses] = useState('light-input--normal')


  function submitValue(value) {
    if (!value || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      setClasses('light-input--wrong')
    } else {
      setClasses('light-input--normal')
      setValue('')
      onSubmit(value)
    }
  }
  return (
      <div className={`light-input ${classes}`}>
        <input type="text" style={{fontSize}} value={value} onInput={(e) => setValue(e.target.value)}/>
        <div className="light-input__placeholder" style={value ? getStyle(fontSize) : {fontSize: `${fontSize * 1.15}px`}}>{placeholder}</div>
        {loading
          ? <Ring size={24} color="black" style={{margin: 0}}/>
          : <button onClick={() => {submitValue(value)}} style={{width: 24, height: 24, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img src={strelka} alt="стрелка"/>
          </button>}
      </div>
  )
}