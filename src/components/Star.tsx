import React from 'react'

type StarPropsType = {
    starImg: string

}


export const Star = ({starImg}:StarPropsType) => {
  return(
      <>
          <img alt={"star"} src={starImg} style={{height: '50px', width: '100px'}}/>

      </>
  )
}
