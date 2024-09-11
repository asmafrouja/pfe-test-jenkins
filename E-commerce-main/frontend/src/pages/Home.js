import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category={"fruitSec"} heading={"Fruits sec"}/>
      <HorizontalCardProduct category={"herbe"} heading={"Herbes médicinales"}/>
      <HorizontalCardProduct category={"miel"} heading={"Miel et produits de la ruche"}/>
      <VerticalCardProduct category={"huile"} heading={"Huiles naturelles"}/>
      
    </div>
  )
}

export default Home