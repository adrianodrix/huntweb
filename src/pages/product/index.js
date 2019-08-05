import React, { Component } from 'react'
import api from '../../services/api'

import './styles.css'

export default class Product extends Component {
  state = {
    product: {}
  }

  async componentDidMount() {
    try {
      const { id } = this.props.match.params

      const response = await api.get(`/products/${id}`)

      this.setState({
        product: response.data
      })

    } catch( err ) {
      alert(err.message)
    }
  }

  render() {
    const { product } = this.state
    const createdAt = new Date(product.createdAt).toLocaleString()
    return (
      <div className="product-info">
        <span>{  createdAt }</span>
        <h1>{ product.title }</h1>
        <p>{ product.description }</p>
        <a href={ product.url } target="_blank">{ product.url }</a>
      </div>
    )
  }
}
