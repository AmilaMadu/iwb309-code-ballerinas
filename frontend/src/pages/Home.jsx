import React from 'react'
import Header from '../Components/Header'
import SpecialityMenu from '../Components/SpecialityMenu'
import TopDoctors from '../Components/TopDoctors'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialityMenu />
      <TopDoctors/>
    </div>
  )
}

export default Home