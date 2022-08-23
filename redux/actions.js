export const GET_BOOKS = 'GET_BOOKS';
export const ADD_TO_BOOKMARK_LIST = 'ADD_TO_BOOKMARK_LIST';
export const REMOVE_FROM_BOOKMARK_LIST = 'REMOVE_FROM_BOOKMARK_LIST';
export const SET_LANG = 'SET_LANG';

export const ADD_MULTIPLE_TO_CART = 'ADD_MULTIPLE_TO_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_TO_CART_WITH_QTY = 'ADD_TO_CART_WITH_QTY';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const ADD_QTY_CART = 'ADD_QTY_CART';
export const MINUS_QTY_CART = 'MINUS_QTY_CART';

export const CREATE_AND_ADD_TO_WISHLIST = "CREATE_AND_ADD_TO_WISHLIST";
export const SET_WISHLIST = "SET_WISHLIST";

export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SET_FIRSTTIME = 'SET_FIRSTTIME';
export const USER_UPDATE = "USER_UPDATE";
export const USER_ADDRESS_UPDATE = "USER_ADDRESS_UPDATE";
export const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS";


export const UPDATE_CART_CHARGES = "UPDATE_CART_CHARGES";

import { APICONFIG } from "../config/api";
import base64 from 'react-native-base64';

import { useSelector } from 'react-redux';


import axios from 'axios';

import store from './store';

const BASE_URL = 'https://example-data.draftbit.com/books?_limit=10';


export const signinSuccess = user => dispatch => {

    dispatch({
      type:SIGNIN_SUCCESS,
      payload:user
    });
}



export const getBooks = () => {
    try {
      return async dispatch => {
        const res = await axios.get(`${BASE_URL}`);
        
        if (res.data) {
          dispatch({
            type: GET_BOOKS,
            payload: res.data,
          });
        } else {
          
        }
      };
    } catch (error) {
      // Add custom logic to handle errors
    }
  };

  



  export const addBookmark = book => dispatch => {
    dispatch({
      type: ADD_TO_BOOKMARK_LIST,
      payload: book
    });
  };
  
  export const removeBookmark = book => dispatch => {
    dispatch({
      type: REMOVE_FROM_BOOKMARK_LIST,
      payload: book
    });
  };

  export const addMultipleToCart = product => dispatch => {

    dispatch({
      type:ADD_MULTIPLE_TO_CART,
      payload:product
    })

  }

  export const addToCart = product => dispatch => {
    dispatch({
      type: ADD_TO_CART,
      payload: product
    });
  };
  export const addToCartWithQty = payload => dispatch => {
    dispatch({
      type: ADD_TO_CART_WITH_QTY,
      payload: payload
    });
  };

  export const removeFromCart = product => dispatch => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: product
    });
    
  };

  export const clearCart = () => {
    return {
      type: CLEAR_CART,
    };
  };
  
  export const addQtyToCart = product => dispatch => {
    dispatch({
      type: ADD_QTY_CART,
      payload: product
    });
  };
  export const minusQtyToCart = product => dispatch => {
    dispatch({
      type: MINUS_QTY_CART,
      payload: product
    });
  };

  export const createAndAddToWishlist = payload => dispatch => {
    dispatch({
      type: CREATE_AND_ADD_TO_WISHLIST,
      payload: payload
    });
  };

  export const setWishlist = wishlistdata => dispatch => {
    
    dispatch({
      type: SET_WISHLIST,
      payload: wishlistdata
    });
  };
  

  export const setLang = lang => dispatch => {
    
    dispatch({
      type: SET_LANG,
      payload: lang
    });
  };

  export const setFirstTime = value => dispatch => {
    
    dispatch({
      type: SET_FIRSTTIME,
      payload: value
    });
  };

  export const getUserAddresses = () => {
    return (dispatch, getState) => {
      const {lang} = getState().langReducer;
      const {user} = getState().userReducer;
  
      
      dispatch(getUserAddressesFinal(user,lang));
    }
  }

  export const getUserAddressesFinal = (user,lang) => {
    
                  try {
                    return async dispatch => {
                      const res = await fetch(APICONFIG.REST_WC_URL+"/user_profile_addresses",
                                                          {
                                                            method:"POST",
                                                            body: JSON.stringify({
                                                            lang: lang,
                                                            user_id:user.ID
                                                            }),
                                                            headers : {
                                                              Accept: 'application/json',
                                                              'Content-Type': 'application/json',
                                                              Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                                            }
                                                      });
                            
                      const response = await res.json();
                      
                      if (response && !response.errors) {
                        dispatch({
                          type: USER_ADDRESS_UPDATE,
                          payload: response,
                        });
                      } else {
                        
                      }
                    };
                  } catch (error) {
                    alert(error)
                    // Add custom logic to handle errors
                  } 

   
  };

  export const updateUserAddresses = address_id  => {
    
    return (dispatch, getState) => {
      const {lang} = getState().langReducer;
      const {user} = getState().userReducer;
  
      
      dispatch(updateUserAddressesFinal(user,lang,address_id));
    }
  }

  export const updateUserAddressesFinal = (user,lang,address_id) => {
    
                  try {
                    return async dispatch => {
                      const res = await fetch(APICONFIG.REST_WC_URL+"/update_user_pref_addr",
                                                          {
                                                            method:"POST",
                                                            body: JSON.stringify({
                                                            address_id: address_id,
                                                            user_id:user.ID
                                                            }),
                                                            headers : {
                                                              Accept: 'application/json',
                                                              'Content-Type': 'application/json',
                                                              Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                                            }
                                                      });
                            
                      const response = await res.json();
                      
                      if (response && !response.errors) {
                        dispatch(getUserAddresses())
                      } else {
                        
                      }
                    };
                  } catch (error) {
                    alert(error)
                    // Add custom logic to handle errors
                  } 

   
  };
  
  export const getTopItems = () => {

   

    return (dispatch, getState) => {
      const {lang} = getState().langReducer;
      const {user} = getState().userReducer;
  
      
      dispatch(getTopItemsFinal(user,lang));
    }
  }
  export const getTopItemsFinal = (user,lang) => {
    

    

                  try {
                    return async dispatch => {
                      const res = await fetch(APICONFIG.REST_WC_URL+"/user_top_ordered_items?",
                                                          {
                                                            method:"POST",
                                                            body: JSON.stringify({
                                                            lang: lang,
                                                            user_id:user.ID
                                                            }),
                                                            headers : {
                                                              Accept: 'application/json',
                                                              'Content-Type': 'application/json',
                                                              Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                                            }
                                                      });
                            
                      const response = await res.json();
                      
                      if (response && !response.errors) {
                        dispatch({
                          type: USER_UPDATE,
                          payload: response,
                        });
                      } else {
                        
                      }
                    };
                  } catch (error) {
                    alert(error)
                    // Add custom logic to handle errors
                  } 

   
  };

  export const getUserWishlists = () => {

   

    return (dispatch, getState) => {
      const {lang} = getState().langReducer;
      const {user} = getState().userReducer;
  
      
      dispatch(getUserWishlistsFinal(user,lang));
    }
  }
  export const getUserWishlistsFinal = (user,lang) => {
    

    

                  try {
                    return async dispatch => {
                      const res = await fetch(APICONFIG.REST_WC_URL+"/user_wishlists?user_id="+user.ID+"&lang="+lang+"&include_products=1&include_product_details=1",
                                                          {
                                                            method:"GET",
                                                            
                                                            headers : {
                                                              Accept: 'application/json',
                                                              'Content-Type': 'application/json',
                                                              Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                                            }
                                                      });
                            
                      const response = await res.json();
                      
                      
                      if (response && !response.errors) {
                        dispatch({
                          type: SET_WISHLIST,
                          payload: response,
                        });
                      } else {
                        
                        dispatch({
                          type: SET_WISHLIST,
                          payload: [],
                        });
                      }
                    };
                  } catch (error) {
                    alert(error)
                    // Add custom logic to handle errors
                  } 

   
  };


  export const updateUserAcountDetails = newdetails => dispatch => {
    
    dispatch({
      type: UPDATE_USER_DETAILS,
      payload: newdetails
    });
  };

  /* export const setCartCharges = newdetails => dispatch => {
    
    dispatch({
      type: UPDATE_CART_CHARGES,
      payload: newdetails
    });
  }; */

  