import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const {
    filters: { text, category, company, color, min_price, price, max_price, shipping },
    updateFilters,
    clearFilters,
    all_products
  } = useFilterContext();
  // get unitque categories
  const categories = getUniqueValues(all_products, 'category');
  const companies = getUniqueValues(all_products, 'company');
  // this is array of colors 
  const colors = getUniqueValues(all_products, 'colors');

  // console.log(colors)

  return (
    <Wrapper>
      <div className='content'>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='form-control'>
            <input
              type="text"
              name='text'
              placeholder='search'
              className='search-input'
              // something change run the updateFilters 
              value={text}
              onChange={updateFilters}
            />
          </div>

          {/* Categories  */}
          <div className='form-control'>
            <h5>category</h5>
            <div>
              {categories.map((categoryItem, index) => {
                return (
                  <button
                    key={index}
                    // run the updateFilters and pass the name has to match to category this is the value 
                    // that will change from the filters component 
                    onClick={updateFilters}
                    name='category'
                    type='button'
                    // setup the active class name  if they match if state value category is coming fromthe state 
                    // matches the indiviual category 
                    className={`${category === categoryItem.toLowerCase() ? 'active' : null}`}
                  >
                    {categoryItem}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="form-control">
            <h5>company</h5>
            {/* important to match the name to the state  */}
            <select
              name="company"
              value={company}
              onChange={updateFilters}
              className='company'
            >
              {companies.map((companyItem, index) => {
                return (
                  <option key={index} value={companyItem}>{companyItem}</option>
                )
              })}
            </select>
          </div>

          {/* setup colors form and we are passing the data with dataSet  */}
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {
                colors.map((colorItem, index) => {
                  if (colorItem === 'all') {
                    return (
                      <button
                        key={index}
                        bame="color"
                        onClick={updateFilters}
                        data-color="all"
                        className={`${color === 'all' ? 'all-btn active' : 'all-btn'}`}
                      >
                        all
                      </button>
                    )
                  }
                  return (

                    <button
                      key={index}
                      name="color"
                      // get the color with inlie css 
                      style={{ background: colorItem }}
                      // add a className if the button is active has to match value
                      // also add the colorItem hex color to the data ? somehow passs from the button the 
                      // filter context  
                      className={`${color === colorItem ? 'color-btn active' : 'color-btn'}`}
                      data-color={colorItem}
                      onClick={updateFilters}
                    >
                      {/* if the state color matches current button then display FaCheck */}
                      {color === colorItem ? <FaCheck /> : null}
                    </button>
                  )
                })
              }
            </div>
          </div>

          {/* Filter price by range  */}
          <div className="form-control">
            <h5>price</h5>
            <p className='price'>
              {formatPrice(price)}
            </p>
            <input
              type="range"
              name="price"
              onChange={updateFilters}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    /* if add spacing input get bigger  */
    /* letter-spacing: var(--spacing); */
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
