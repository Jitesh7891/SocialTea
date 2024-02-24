import React from 'react'
import { RotatingLines } from "react-loader-spinner"
const Loader = () => {
  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:"center", height:"100vh"}} >


<RotatingLines
  visible={true}
  height="96"
  width="96"
  strokeColor='#9932cc'
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>
  )
}

export default Loader