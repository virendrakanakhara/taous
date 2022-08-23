import { useSelector } from 'react-redux';
import { showMessage, hideMessage } from "react-native-flash-message";
import {
  GET_BOOKS,
  ADD_TO_BOOKMARK_LIST,
  REMOVE_FROM_BOOKMARK_LIST,
  CLEAR_CART,
  
  SET_LANG,
  ADD_TO_CART,
  ADD_TO_CART_WITH_QTY,
  REMOVE_FROM_CART,
  ADD_QTY_CART,
  MINUS_QTY_CART,
  ADD_MULTIPLE_TO_CART,
  CREATE_AND_ADD_TO_WISHLIST,
  SET_WISHLIST,

  SIGNIN_SUCCESS,
  SET_FIRSTTIME,
  USER_UPDATE,
  USER_ADDRESS_UPDATE,
  UPDATE_USER_DETAILS,
  UPDATE_CART_CHARGES
  
} from './actions';
import { act } from 'react-test-renderer';
const initialState = {
    books: [],
    bookmarks: [],
    cart:[],
    cartCharges:{couponcode:'',giftcardcode:'',coupon_discount:0,gift_discount:0,shipping_method:'',shipping_charge:0,subtotal:0,total:0},
    wishlist:[],
    lang:"en",
    user:{},
    isFirstTime:"1",
    gettingStart:1
    
  };

  function firsttimeReducer(state=initialState,action)
  {
    switch(action.type)
    {
      case SET_FIRSTTIME:
        return {...state,gettingStart:0};
      default:
        return state;
    }
  }

  function userReducer(state=initialState,action)
  {
    switch(action.type)
    {
      case SIGNIN_SUCCESS:
        //let userupdate1 = {"topitems":[],"topdepartments":[]};
        //let olduser = action.payload;
        //let newuser1 = {...olduser,...userupdate1};
        if(Object.keys(action.payload).length==0)
        return {...state,user:action.payload};
        else
        {
        let userupdate1 = {"topitems":[],"topdepartments":[],"addresses":[]};
        let olduser = action.payload;
        let newuser1 = {...olduser,...userupdate1};  
        return {...state,user:newuser1};
        }
      case USER_UPDATE:
        let topitems = action.payload.items;
        let topdepartments = action.payload.departments;
        let userupdate = {"topitems":topitems,"topdepartments":topdepartments};
        let newuser = {...state.user,...userupdate};
        return {...state,user:newuser};
      case USER_ADDRESS_UPDATE:
        let user_addresses = action.payload;
        let user_update = {"addresses":user_addresses}; 
        let newuser2 = {...state.user,...user_update}; 
        return {...state,user:newuser2} 
        
      case UPDATE_USER_DETAILS:
        let user_update_details = {"first_name":action.payload.first_name,"last_name":action.payload.last_name,"display_name":action.payload.display_name};
        let newuser3 = {...state.user,...user_update_details};
        return {...state,user:newuser3}  
      default:
        return state;
    }
  }
  function booksReducer(state = initialState, action) {
    switch (action.type) {
      case GET_BOOKS:
        return {...state, books: action.payload};
      case ADD_TO_BOOKMARK_LIST:
          return { ...state, bookmarks: [...state.bookmarks, action.payload] };
      case REMOVE_FROM_BOOKMARK_LIST:
          return {
            ...state,
            bookmarks: state.bookmarks.filter(book => book.id !== action.payload.id)
          };  
      default:
        return state;
    }
  }
  function wishlistReducer(state = initialState,action)
  { 
    switch(action.type)
    {
    case SET_WISHLIST:
        return { ...state, wishlist: action.payload };  
    case CREATE_AND_ADD_TO_WISHLIST:
      showMessage({
        message: "Wishlist created and Product added successfully !!",
        type: "success",
      });
        return {...state,wishlist:[...state.wishlist,{"name":action.payload.wishlistname,"products":[action.payload.product]}]};  
    default:
        return state;
    }    
  }

  /* function cartChargesReducer(state = initialState,action)
  {
    switch (action.type)
    {
      case UPDATE_CART_CHARGES:
        
        return {...state,cartCharges:{couponcode:'',giftcardcode:'',coupon_discount:0,gift_discount:0,shipping_method:'',shipping_charge:50,subtotal:state.cart.reduce((prevValue,curValue)=>parseFloat(Number(prevValue)+Number(curValue.product.full_item.price)).toFixed(2),0),total:state.cart.reduce((prevValue,curValue)=>parseFloat(Number(prevValue)+Number(curValue.product.full_item.price)).toFixed(2),50)}}
      default:
        return state;
    }
  } */

  function cartReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_MULTIPLE_TO_CART:
        const founditem1 = state.cart.find((item) => item.product.variation_id === action.payload.variation_id); 
        if (founditem1)
        {
          
          return {...state,cart:state.cart.map(item=>item.product.variation_id == action.payload.variation_id?{...item,qty:item.qty+1}:item) };
          
        }
        else 
        {
          
          return { ...state, cart: [...state.cart, {"product":action.payload,"qty":1}]};
        }
        
      case ADD_TO_CART:
        
        const founditem = state.cart.find((item) => item.product.variation_id === action.payload.variation_id); 
        if (founditem)
        {
          showMessage({
            message: "Product Already In the Cart,Product Qauntity Increased by 1 !!",
            type: "error",
          });
          return {...state,cart:state.cart.map(item=>item.product.variation_id == action.payload.variation_id?{...item,qty:item.qty+1}:item)}
          
        }
        else 
        {
          showMessage({
            message: "Product Added To Cart Successfully !!",
            type: "success",
          });
          return { ...state, cart: [...state.cart, {"product":action.payload,"qty":1}]}
        }

        case ADD_TO_CART_WITH_QTY:
        
        const founditem2 = state.cart.find((item) => item.product.variation_id === action.payload.product.variation_id); 
        if (founditem2)
        {
          showMessage({
            message: "Product Already In the Cart,Product Qauntity Increased by 1 !!",
            type: "error",
          });
          return {...state,cart:state.cart.map(item=>item.product.variation_id == action.payload.variation_id?{...item,qty:item.qty+action.payload.qty}:item)}
          
        }
        else 
        {
          showMessage({
            message: "Product Added To Cart Successfully !!",
            type: "success",
          });
          return { ...state, cart: [...state.cart, {"product":action.payload.product,"qty":action.payload.qty}]}
        }

         
      case REMOVE_FROM_CART:
          showMessage({
            message: "Product removed from cart successfully !!",
            type: "success",
          });
          return {
            ...state,
            cart: state.cart.filter(item => item.product.variation_id !== action.payload.variation_id)
          }; 
      case CLEAR_CART:
            
            return {
              ...state,
              cart: []
            };  
        case ADD_QTY_CART:
              //const productitem = state.cart.find((item) => item.product.id === action.payload.id);  
              showMessage({
                message: "Product Qauntity Increased by 1 !!",
                type: "success",
              });
              return {...state,cart:state.cart.map(item=>item.product.variation_id == action.payload.variation_id?{...item,qty:item.qty+1}:item)}
              
        case MINUS_QTY_CART:
          //const productitem = state.cart.find((item) => item.product.id === action.payload.id);  
          showMessage({
            message: "Product Qauntity Decreased by 1 !!",
            type: "success",
          });
          return {...state,cart:state.cart.map(item=>item.product.variation_id == action.payload.variation_id?{...item,qty:(item.qty-1)>1?(item.qty-1):1}:item)}
                
      default:
        return state;
    }
  }

  function langReducer(state = initialState, action) {

    switch (action.type) {
    
      case SET_LANG:
          
          return { ...state, lang: action.payload };
      
      default:
        return state;
    }
  }

  

  export  {booksReducer,langReducer,cartReducer,wishlistReducer,userReducer,firsttimeReducer};