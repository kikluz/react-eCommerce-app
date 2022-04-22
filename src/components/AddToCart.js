import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'

const AddToCart = ({ product }) => {
  const { id, stock, colors } = product;
  // console.log(colors);
  // state values 
  const [mainColor, setMainColor] = useState(colors[0]);
  // add item to the cart 
  const [amount, setAmount] = useState(1)
  // ? add two function one for decrease and for increase
  const increase = () => {
    // invoke setAmount value that controls the state value 
    setAmount((oldAmount) => {
      // oldAmount is increase by 1
      let tempAmount = oldAmount + 1;
      // if tempAmount is bigger the stock 
      if (tempAmount > stock) {
        // give me tempAmount
        tempAmount = stock
      }
      return tempAmount;
    })
  }
  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1;
      // check for the value that its less then 1 
      if (tempAmount < 1) {
        tempAmount = 1
      }
      return tempAmount;
    })
  }


  return (
    <Wrapper>
      <div className='colors'>
        <span>colors: </span>
        <div>
          {colors.map((color, index) => {
            return (
              <button
                key={index}
                style={{ background: color }}
                //  if mainColor === color in the state add color-btn active
                //  if not the case just add the color=btn
                className={`${mainColor === color ? 'color-btn active' : 'color-btn'}`}
                // by default I get the first one, once I click specific color 
                // I changed the value on color state 
                onClick={() => setMainColor(color)}
              >
                {/* if mainColor === to color return icon if not just return null  */}
                {mainColor === color ? <FaCheck /> : null}
              </button>
            )
          })}
        </div>
      </div>
      <div className='btn-container'>
        {/* here we are passing the amount and the increase and the decrease  */}
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        <Link to="/cart" className='btn'>add to cart</Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
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
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart
