import axios from 'axios';

const fetchData = (id, authKey, setProductData, setStylesData, setReviewsData, setCurrentStyleId, setSelectedStyle, setavailableQuantities, setCurrentSKUs, setErrorMessage, setError) => {
  // Fetching all data using Promise.all
  return Promise.all([
    axios.get(`/product:${id}`),
    axios.get(`/styles:${id}`),
    axios.get(`/meta:${id}`),
    // axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart?session_id=${id}`, authKey)
  ])
    .then(([productResponse, stylesResponse, reviewsResponse]) => {
      // Setting fetched data to state variables
      setProductData(productResponse.data);
      setStylesData(stylesResponse.data);
      setReviewsData(reviewsResponse.data);
      // Setting default style if available
      if (stylesResponse.data.results.length > 0) {
        const defaultStyleId = stylesResponse.data.results[0].style_id; // get the first style_id
        setCurrentStyleId(defaultStyleId); // set currentStyleId to pass it to the Styles component
        // set selectedStyle default data (using first item's data) -> {style_id: 404874, name: 'For...} to pass it to the ProductInformation component
        setSelectedStyle(stylesResponse.data.results[0]);
        // set the default sizes (first item) when page first loads || Not currently using it since we pass the current skus below and they have size and qty
        // setAvailableSizes(Object.values(stylesResponse.data.results[0].skus).map(sku => sku.size));

        // set the default quantity (using first item's data) when page first loads
        const quantities = Object.values(stylesResponse.data.results[0].skus).map(sku => sku.quantity);
        const totalQuantity = quantities.length > 0 ? Math.min(...quantities) : 0;
        setavailableQuantities(totalQuantity);
        // set current skus array to pass it to the SelectOptions component. Needed to set and then get the SKU number when addind to cart
        setCurrentSKUs(
          Object.entries(stylesResponse.data.results[0].skus).map(sku => {
            return sku;
          }));
      }
    })
    .catch(error => {
      // Handle errors gracefully
      console.error('Error fetching data:', error);
      //set a state variable to indicate an error occurred, and display an error message
      setError(true);
      setErrorMessage('An error occurred while fetching data. Please try again later.');
    });
};

export default fetchData;
