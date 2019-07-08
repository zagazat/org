import { combineReducers } from 'redux';
import companyProcess from './companies/reducers';
import { reducer as formReducer } from 'redux-form'


const rootReducers = combineReducers({
    companyProcess,
    form: formReducer
});

export default rootReducers;
