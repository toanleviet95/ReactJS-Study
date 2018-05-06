class Product extends React.Component {
  constructor(props) {
    super(props);

    // Bind custom methods to React.Component
    this.handleUpVote = this.handleUpVote.bind(this);
  }

  // Custom methods
  handleUpVote() {
    this.props.onVote(this.props.id);
  }

  // Use arrow function below if we don't need binding
  // So you can remove constructor function
  // handleUpVote = () => {
  //   this.props.onVote(this.props.id);
  // }

  // Lifecycle methods
  render() {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.productImageUrl} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleUpVote}><i className='large caret up icon'></i></a>
            {this.props.votes}
          </div>
          <div className='description'>
            <a href={this.props.url}>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className='extra'>
            <span>Submitted:</span>
            <img className='ui avatar image' src={this.props.submitterAvatarUrl} />
          </div>
        </div>
      </div>
    );
  }
}

class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };

    // Bind custom methods to React.Component
    this.handleProductUpVote = this.handleProductUpVote.bind(this);
  }

  // We can definde state outside without constructor function
  // state = {
  //   products: []
  // };

  // Custom methods
  handleProductUpVote(productId) {
    const nextProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        // Ensure the immutablity for this.state.products
        return Object.assign({}, product, {
          votes: product.votes + 1
        });
      } else {
        return product;
      }
    });
    this.setState({
      products: nextProducts
    });
  }

  // Lifecycle methods
  componentDidMount() {
    this.setState({ products: Data }); 
  }

  render() {
    const products = this.state.products.sort((a, b) => {
      return b.votes - a.votes;
    });
    const productComponents = products.map((product) => {
      return (<Product
        key={'product-'+product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote}
      />)
    });
    return (
      <div className="ui unstackable items">
        {productComponents}
      </div>
    );
    // return React.createElement('div', {className: 'ui unstackable items'}, 'Hello World');
  }
}

ReactDOM.render(
  <ProductList/>,
  document.getElementById('content')
);

