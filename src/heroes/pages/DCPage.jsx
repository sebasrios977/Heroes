import React from 'react'
import { HeroList } from '../components'

export const DCPage = () => {
  return (
    <>
      <h1>DC Comics</h1>
      <hr />

      {<HeroList publisher={'DC Comics'} />}
    </>
  )
}
