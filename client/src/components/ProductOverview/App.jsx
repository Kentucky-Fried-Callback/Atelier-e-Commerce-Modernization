//client/components/App.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { IoSearch } from "react-icons/io5";
import { PiBagBold } from "react-icons/pi";
import ProductOverview from './ProductOverview.jsx';

const App = () => {
  //-------------------------------------------------------
  // Shared App states and variables
  //-------------------------------------------------------
  const [productID, setProductID] = useState(65631);
  const [metaData, setMetaData] = useState({});
  const [cartData, setCartData] = useState([]);
  const ratingsAndReviewsRef = useRef(null); // to scroll down to ratings and reviews from product overview

  //-------------------------------------------------------
  // Functions
  //-------------------------------------------------------
  // function to scroll down to ratings and reviews on 'read all reviews click'
  const scrollToRatingsAndReviews = () => {
    ratingsAndReviewsRef.current.scrollToRatingsAndReviews();
  };

  const changeID = function (val) {
    setProductID(val);
  }
  //-------------------------------------------------------
  // Use Effect & relevant objects
  //-------------------------------------------------------
  const token = {
    headers: {
      'Authorization': process.env.REACT_APP_API_KEY,
    }
  };
    // Meta and Cart UseEffect
    useEffect(() => {
      // Fetching data using Promise.all
      Promise.all([
        axios.get(`/product:${productID}`),
        axios.get(`/cart:${productID}`)
      ])
        .then(([metaResponse, cartResponse]) => {
          setMetaData(metaResponse.data);
          setCartData(cartResponse.data);
       })
       .catch((err) => {
        console.log('Error retrieving data', err);
        // Fallback
        alert('We couldn\'t find what you are looking for... Let\'s try getting the Camo Onesie Jacket product id: 65631 ^_^')
        setProductID(65631);
       })
  }, [productID]);

  const handleSearch = (e) => {
    const inputValue = document.getElementById('searchInput').value || 65631;
    setProductID(parseInt(inputValue));
  }

  return (
    <div className="main-container">
      {/* Logo and search input, fake stuff to make it look more real */}
      <div className="widget-container nav-bar"><h1>KFC Logo</h1>
      <i><span className="fake-search"> <input id="searchInput" placeholder="Search" />
      <IoSearch className="searchIcon" onClick={handleSearch} /></span>
      <PiBagBold className="cartIcon" /></i> {cartData.length > 0 && (<span className="cart-info-icon">{cartData.length}</span>)}</div>
      <div className="global-announsment">
          <i>SITE-WIDE ANNOUSNMENT MESSAGE &mdash;  SALE /&nbsp;</i> DISCOUNT <b>&nbsp;OFFER &nbsp;</b> &mdash;  <u>&nbsp;NEW PRODUCT HIGHLIGHT</u>
      </div>

      <div className="widget-container p-o"><ProductOverview setCartData={setCartData} authKey={token} id={productID} onClickReadAllReviews={scrollToRatingsAndReviews}/></div>
      {/* <div className="widget-container r-i-container"><Related id={productID} meta={metaData} setID={changeID}/></div>
      <div className="widget-container"><RatingsAndReviews id={productID} token={token} ref={ratingsAndReviewsRef}/></div>
      <div className="widget-container"><QuestionsAndAnswers id={productID} token={token} productData={metaData}/></div> */}
    </div>
  );
};

export default App;