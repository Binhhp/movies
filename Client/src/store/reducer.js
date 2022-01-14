import { combineReducers } from 'redux';
import castReducer from './Cast/reducer';

// reducer import
import customizationReducer from './Customization/customizationReducer';
import genresReducer from './Genres/reducer';
import { movieReducer, movieCreateReducer, movieInfoReducer, movieUpdateReducer } from './Movie/movieReducer';
import companyReducer from './Company/reducer';
import accountReducer from "./Account/reducer";
import dashboardReducer from './Dashboard/reducer'
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    movie: movieReducer,
    movieCreate: movieCreateReducer,
    movieInfo: movieInfoReducer,
    movieUpdate: movieUpdateReducer,
    genres: genresReducer,
    casts: castReducer,
    companies: companyReducer,
    account: accountReducer,
    dashboard: dashboardReducer
});

export default reducer;
