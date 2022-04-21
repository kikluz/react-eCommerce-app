// ?setup the function for dipslay the price nicely
// ?pass in the psrameter
export const formatPrice = (number) => {
    // newNumber = to international and the NumberFormat
    // first argument is es-us and pass in the object  
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(number / 100) //? number we / 100

}

export const getUniqueValues = () => { }
