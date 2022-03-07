import './Select.scss'
export function Select({className, items, item, onChange}) {
  return <>
    <select onChange={(v) => onChange(v.target.value)} className={className + ' select'} value={item}>
      {items.map(({name, value}) => <option value={value}>{name}</option>)}
    </select>
  </>
}