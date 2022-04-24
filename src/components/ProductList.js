import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

// ? here we have layout of grids and the column layout so we can switch to the list layout 
// ?so we can diaplay each item and the second, its that if we runout of product display
// ?there is not producst 
const ProductList = () => {
  // invoke the filter_contect hook 
  // get the grid_view 
  const { filtered_products: products, grid_view } = useFilterContext();
  // ? if we have an empty array we display this 
  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products match your search...
      </h5>
    )
  }

  if (grid_view === false) {
    // ListView and we pass in the products pros 
    // equal to the product that we get from the product filterContext
    return <ListView products={products} />
  }
  return (
    <>
      <GridView products={products} >product list</GridView>
    </>
  )
}

export default ProductList
