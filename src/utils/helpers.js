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

// get the two parameter data and type as string 
export const getUniqueValues = (data, type) => {
    // get all the values accessing the props dynamicly
    let unique = data.map((item) => item[type])
    if (type === 'colors') {
        // id this is the case flatten the unique means get the array instead of arrays 
        unique = unique.flat()
    }
    // return the new array and spread the new set and get me the data for unique values
    return ['all', ...new Set(unique)]

}
