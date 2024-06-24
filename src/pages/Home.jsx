import React from 'react'
import Header from '../components/Header'
import Slider from '../components/Slider'

function Home() {

  return (
    <>
    <Header/>
    <div className="page-content">
      <Slider/>
    </div>
    </>
  )
}

export default Home