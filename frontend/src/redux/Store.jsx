import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import rootReducer from './slices/RootReducer.jsx';
//import rootReducer from '../reducers/index.jsx';
const middleware = [thunk];

//-----------------------|| REDUX - MAIN STORE ||-----------------------//

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export { store };

