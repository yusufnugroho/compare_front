import * as types from '../constants/types'

export const getProducts = () =>
  dispatch =>
    fetch(`http://localhost:9000/products`)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: types.FETCH_PRODUCTS,
          payload: response.products
        })
      })

export const compare = product => ({
    type: types.COMPARE_PRODUCT,
    product
  })
