import './index.css'
import {BsSearch} from 'react-icons/bs'

const FiltersGroup = props => {
  const {
    onChangeSearchInput,
    enterSearchInput,
    inputValue,
    categoryOptions,
    onClickCategory,
    activeCategoryId,
    ratingsList,
    onClickRating,
    onClickClearFilter,
  } = props

  const onChangeInput = event => {
    onChangeSearchInput(event.target.value)
  }

  const enterSearchInputValue = event => {
    if (event.key === 'Enter') {
      enterSearchInput()
      console.log(event.key)
    }
  }

  const onClickCategoryBtn = categoryId => {
    console.log(categoryId)
    onClickCategory(categoryId)
  }

  const onClickBtn = id => {
    onClickRating(id)
  }

  const onClickClearFilterBtn = () => {
    onClickClearFilter()
  }

  return (
    <div className="filters-group-container">
      <div className="input-search-icon-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeInput}
          onKeyDown={enterSearchInputValue}
          value={inputValue}
        />
        <BsSearch className="search-icon" />
      </div>
      <div>
        <h1 className="category-heading">Category</h1>
        <ul className="ul-category-list">
          {categoryOptions.map(eachItem => (
            <li className="category-list" key={eachItem.categoryId}>
              <button
                className={`category-button ${
                  eachItem.categoryId === activeCategoryId ? 'add-color' : ''
                }`}
                type="button"
                onClick={() => onClickCategoryBtn(eachItem.categoryId)}
              >
                <p>{eachItem.name}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p>Rating</p>
        <ul className="ul-category-list">
          {ratingsList.map(eachItem => (
            <li key={eachItem.ratingId}>
              <button
                type="button"
                className="rating-button"
                onClick={() => onClickBtn(eachItem.ratingId)}
              >
                <img
                  src={eachItem.imageUrl}
                  alt={`rating ${eachItem.ratingId}`}
                  className="rating-img"
                />
                &up
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className="clear-filter-btn"
        onClick={onClickClearFilterBtn}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
