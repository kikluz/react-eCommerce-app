import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

// ? here we have layout of grids and the column layout so we can switch to the list layout 
// ?so we can diaplay each item and the second, its that if we runout of product display
// ?there is not producst 
const ProductList = () => {
  // invoke the filter_contect hook 
  const { filtered_products: products } = useFilterContext();

  return (
    <>
      <GridView products={products} />
    </>
  )
}

export default ProductList
