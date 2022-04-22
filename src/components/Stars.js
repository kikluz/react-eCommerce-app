import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
// ? we need to pass the reviews and the starts
const Stars = ({ stars, reviews }) => {
  // console.log(stars)
  // setup a new array  the second argument is the callback function agains every item
  // dont giv the first parameter so pass (_) so index is the one i use and for everu item
  // I will return BsStarFill, BsStarHalf, BsStar
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    // index it's between 0-4 
    // console.log(index) and plus 0.5 till 4.5
    const number = index + 0.5
    return (
      <span key={index}>
        {/* if stars is bigger or equal to index(initial index is 0) plus 1(wnat to start with 1) */}
        {stars >= index + 1 ? (
          <BsStarFill />
        ) : stars >= number ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    )
  })
  // console.log(tempStars)
  return (
    <Wrapper>
      <div className="stars">
        {tempStars}
      </div>
      <p className='reviews'>
        {reviews} customer reviews
      </p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
