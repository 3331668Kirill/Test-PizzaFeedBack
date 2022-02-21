import React from 'react'
import starImg from './star.png'
import starGoldImg from './star-gold.png'
import {Star} from "./Star";

type StarsPropsType = {
    setStar: (star:number)=>void
    star:number
}


export const Stars = ({setStar, star}:StarsPropsType) => {
  return(
      <>
         <span onClick={() => {
             setStar(1)
         }}>{star > 0
             ? <Star starImg={starGoldImg}/>
             : <Star starImg={starImg}/>}</span>
          <span onClick={() => {
              setStar(2)
          }}>{star > 1
              ? <Star starImg={starGoldImg}/>
              : <Star starImg={starImg}/>}</span>
          <span onClick={() => {
              setStar(3)
          }}>{star > 2
              ? <Star starImg={starGoldImg}/>
              : <Star starImg={starImg}/>}</span>
          <span onClick={() => {
              setStar(4)
          }}>{star > 3
              ? <Star starImg={starGoldImg}/>
              : <Star starImg={starImg}/>}</span>
          <span onClick={() => {
              setStar(5)
          }}>{star > 4
              ? <Star starImg={starGoldImg}/>
              : <Star starImg={starImg}/>}</span>

      </>
  )
}
