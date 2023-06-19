import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class AllProductsSection extends Component {
  state = {
    apiStatus: '',
    productsList: [],
    activeOptionId: sortbyOptions[0].optionId,
    inputValue: '',
    activeCategoryId: '',
    activeRatingId: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const {
      activeOptionId,
      inputValue,
      activeCategoryId,
      activeRatingId,
    } = this.state
    this.setState({
      apiStatus: apiConstants.inprogress,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${inputValue}&rating=${activeRatingId}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state
    console.log(productsList)

    // TODO: Add No Products View

    const getNoProductsView = () => (
      <div className="no-products-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          alt="no products"
          className="no-products-img"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p>We could not find any products. Try other filters.</p>
      </div>
    )

    return (
      <>
        {productsList.length === 0 ? (
          getNoProductsView()
        ) : (
          <div className="all-products-container">
            <ProductsHeader
              activeOptionId={activeOptionId}
              sortbyOptions={sortbyOptions}
              changeSortby={this.changeSortby}
            />
            <ul className="products-list">
              {productsList.map(product => (
                <ProductCard productData={product} key={product.id} />
              ))}
            </ul>
            )
          </div>
        )}
      </>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="product-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="products-failure-img"
      />
      <h1 className="wrong-message">Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  onChangeSearchInput = inputValue => {
    this.setState({inputValue})
  }

  enterSearchInput = () => {
    this.getProducts()
  }

  onClickCategory = activeCategoryId => {
    this.setState({activeCategoryId}, this.getProducts)
  }

  onClickRating = ratingId => {
    this.setState({activeRatingId: ratingId}, this.getProducts)
  }

  onClickClearFilter = () => {
    this.setState(
      {
        inputValue: '',
        activeCategoryId: '',
        activeRatingId: '',
      },
      this.getProducts,
    )
  }

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderProductsList()
      case apiConstants.failure:
        return this.renderFailure()
      case apiConstants.inprogress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {inputValue, activeCategoryId} = this.state

    return (
      <div className="all-products-section">
        <FiltersGroup
          onChangeSearchInput={this.onChangeSearchInput}
          enterSearchInput={this.enterSearchInput}
          inputValue={inputValue}
          categoryOptions={categoryOptions}
          onClickCategory={this.onClickCategory}
          activeCategoryId={activeCategoryId}
          ratingsList={ratingsList}
          onClickRating={this.onClickRating}
          onClickClearFilter={this.onClickClearFilter}
        />

        {this.renderSwitch()}
      </div>
    )
  }
}

export default AllProductsSection
