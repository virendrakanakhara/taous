import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  
  whitelist:['lang','userlang','bookmarks','cart','wishlist','user','isFirstTime','gettingStart']
};

import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {booksReducer,cartReducer,langReducer,userReducer,wishlistReducer,firsttimeReducer} from './reducers';
const rootReducer = combineReducers({
  
  langReducer:persistReducer(persistConfig,langReducer),
  
  booksReducer: persistReducer(persistConfig, booksReducer),

  cartReducer:persistReducer(persistConfig,cartReducer),

  wishlistReducer:persistReducer(persistConfig,wishlistReducer),

  userReducer:persistReducer(persistConfig,userReducer),

  firsttimeReducer:persistReducer(persistConfig,firsttimeReducer),

  /* cartChargesReducer:persistReducer(persistConfig,cartChargesReducer), */
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);