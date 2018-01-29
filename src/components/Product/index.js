import React, {Component} from 'react'
import './styles.css'

class Product extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const product = this.props.product
        const compare = this.props.compare
        return(
            <div key={product.id} className="col-sm-6 col-md-3">
                <div className={"product " + (product.compare ? "compare" : "")} >
                    <img src={product.image} alt={product.name} />
                    <div className="image_overlay"></div>
                    <div className="view_details" onClick={() => compare(product)}>
                    {product.compare ? "Remove" : "Compare"}
                    </div>
                    <div className="stats">
                        <div className="stats-container">
                            <span className="product_price">{product.price}</span>
                            <span className="product_name">{product.name}</span>
                            <p>{product.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Product