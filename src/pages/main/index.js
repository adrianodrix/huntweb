import React, { Component } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'

import './styles.css'

export default class Main extends Component {
  state = {
    products: [],
    productInfo: {},
    page: 1
  }

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    try {
      const response = await api.get(`/products?page=${page}`)
      const { data, ...productInfo } = response.data

      this.setState({
        products: data,
        productInfo,
        page
      })
    } catch (err) {
      alert(err.message)
    }
  }

  prevPage = () => {
    const { page, productInfo } = this.state
    if (!productInfo.hasPrevPage) return
    this.loadProducts(page - 1)
  }

  nextPage = () => {
    const { page, productInfo } = this.state

    if (!productInfo.hasNextPage) return

    this.loadProducts(page + 1)
  }

  render() {
    const { products } = this.state

    return (
      <div className="product-list">
        { products.map(product => (
          <article key={ product._id }>
            <strong>{ product.title }</strong>
            <p>{ product.description }</p>
            <Link to={`products/${ product._id}`}>Acessar</Link>
          </article>
        ))}
        <div className="actions">
          <button onClick={ this.prevPage } disabled={ !this.state.productInfo.hasPrevPage } >Anterior</button>
          <button onClick={ this.nextPage } disabled={ !this.state.productInfo.hasNextPage } >Próximo</button>
        </div>
      </div>
    )
  }
}
