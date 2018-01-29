import React, {Component} from 'react'
import './styles.css'

class Compare extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const products = this.props.products
    const arrayProductsColor = products.colors
    console.log("Array Products : ",(arrayProductsColor))
    return(
      <div className="row compare">
      <div className="col-12 mt-5 text-center">
        <table className="table">
          <thead className="thead-default">
            <tr>
              <th></th>
              {products.map(product =>
                <th key={product.id}>
                  {product.name}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            <tr className="price">
              <th scope="row">Price</th>
              {products.map(product =>
                <td key={product.id} className="text-center">{product.price}</td>
              )}
            </tr>
            <tr className="colors">
              <th scope="row">Colors</th>
              {products.map(product =>
                <td key={product.id}>
                  {product.colors.map((color, index) => {
                      return <span key={index} className={"bg-" + color}></span>
                    }
                  )}
                </td>
              )}
            </tr>
            <tr className="condition">
              <th scope="row">Condition</th>
              {products.map(product =>
                <td key={product.id} className={product.conditions === "Used" ? "bg-red" : "bg-green"}>
                  {product.conditions}
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    )
  }
}

export default Compare
