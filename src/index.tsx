import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter} from 'react-router-dom';
import Router from './Router';
import rootReducer from './_reducers/root.reducer';
import './index.css';
import'./main.js';
import gitInfo from './generatedGitInfo.json'; //If you have compilation problem here just run `npm run git-info`

type GitInfo = typeof gitInfo
declare global {
    interface Window { gitInfo: GitInfo; }
}
Object.assign(window, { gitInfo })

const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
