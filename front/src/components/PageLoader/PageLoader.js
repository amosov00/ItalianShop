import {Ring} from "react-spinners-css";
import "./pageLoader.scss"

export function PageLoader() {
  return (
    <div className="page-loader">
      <Ring size={150} color="black"/>
    </div>
  )
}