import './BigButton.scss'
export function BigButton({children, style, onClick, disabled, className, isBlood}) {
  let bloodClass
  if (isBlood) {
    bloodClass = ' blood'
  } else  {
    bloodClass = ''
  }
  return <button className={'big-button ' + className + bloodClass} style={style} onClick={onClick} disabled={disabled}>{children}</button>
}