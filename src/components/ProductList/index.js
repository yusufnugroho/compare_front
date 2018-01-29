import React, {Component} from 'react'
import {Product} from '../'

class ProductList extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const products = this.props.products
    const compare = this.props.compare
    return(
      <div>
        <div className="row mt-3">
            {
              products.map(product =>
                {
                  return <Product key={product.id} product={product} compare={compare} />
                }
            )}
        </div>
      </div>
    )
  }
}
export default ProductList
