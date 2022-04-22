import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleProductPage = () => {
  // console.log(useParams())
  // get the props name id of this object 
  const { id } = useParams();
  const history = useHistory();
  const {
    single_product_loading: loadin,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct
  } = useProductsContext();

  // ? when  load page invoke useEffetc and 
  // ? setup fetchSingleProduct and pass the url from constants + id
  useEffect(() => {
    fetchSingleProduct(`${url}${id}`)
  }, [id]);
  // in three sencods, if error is true programaticly redirect to home 
  useEffect(() => {
    if (error === true) {
      setTimeout(() => {
        history.push('/')
      }, 3000)
    }
  }, [error])
  // check for loading 
  if (loadin) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  // console.log(product);
  const { id: sku, name, price, reviews, shipping, stars, stock, description,
    company, images, } = product
  return (
    <Wrapper>
      {/* passin the product props  */}
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link to="/products" className='btn'>
          back to products
        </Link>
        <div className="product-center">
          {/* this component is looking for images array,images prop into the
           product images 
          */}
          <ProductImages images={images} />
          <section className='content'>
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className='price'>
              {formatPrice(price)}
            </h5>
            <p className='desc'>{description}</p>
            <p className='info'>
              <span>Avialabel: </span>
              {/* check if stock is bigger then 0 display it*/}
              {stock > 0 ? 'In stock' : 'out of stock'}
            </p>
            <p className='info'>
              <span>SKU: </span>
              {sku}
            </p>
            <p className='info'>
              <span>Brand: </span>
              {company}
            </p>
            <hr />
            {stock > 0 && < AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
