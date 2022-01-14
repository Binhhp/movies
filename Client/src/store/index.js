import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore } from 'redux-persist'
import reducer from "./reducer";
// ==============================|| REDUX - MAIN STORE ||============================== //

const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);
const persistor = persistStore(store);

const config = { store, persistor };
export default config;
