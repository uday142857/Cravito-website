import React, { useState } from 'react'
import "./Home.css"
import Header from '../../components/header/Header'
import MenuItems from '../../components/menu items/MenuItems'
import FoodDisply from '../../components/food disply/FoodDisply'
import AppDownload from '../../components/app download/AppDownload'

function Home() {
    const[category,setCategory]=useState("Off")
  return (
    
    <div>
        <Header/>
        <MenuItems category={category} setCategory={setCategory}/>
        <FoodDisply category={category}/>
        <AppDownload/>
    </div>
  )
}

export default Home