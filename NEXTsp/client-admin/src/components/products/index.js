import React from 'react'
import { Fragment } from 'react'
import AdminLayout from '../layout/AdminLayout'
import ProductMenu from './ProductsMenu'



const ProductComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <ProductMenu/>
    </div>
  )
}

const Products = (props) => {
  return (
    <Fragment>
      <AdminLayout children={<ProductComponent/>}/>
    </Fragment>
  )
}

export default Products
