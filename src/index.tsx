import '@gouvfr/dsfr/dist/dsfr/dsfr.module';
import '@gouvfr/dsfr/dist/dsfr/dsfr.nomodule';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './App';
import gitInfo from './generatedGitInfo.json'; //If you have compilation problem here just run `npm run git-info`
import './index.css';
import reportWebVitals from './reportWebVitals';

type GitInfo = typeof gitInfo;
declare global {
  interface Window {
    gitInfo: GitInfo;
  }
}
Object.assign(window, { gitInfo });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
