import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CompanyList from "./components/company/CompanyList";
import CompanyDetail from "./components/company/CompanyDetail";
import EditForm from "./components/company/Edit";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import rootReducers from './store/reducer';

const store = createStore(rootReducers);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route exact path="/" component={CompanyList} />
            <Route exact path="/company/:pk" component={CompanyDetail} />
            <Route path="/company/edit/:pk" component={EditForm} />
        </Router>
    </Provider>,
    document.getElementById('root')
);
