import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Product extends Component {
  render() {
    const { price, inventory, title } = this.props
    return (
      <div>
        {title} - &#36;{price} {inventory ? `x ${inventory}` : null}
      </div>
    )
  }
}

Product.propTypes = {
  price: PropTypes.number,
  inventory: PropTypes.number,
  title: PropTypes.string
}