import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Page404 from './components/anonymous/Page404';
import './App.css';

const App = () => {
  return (
   <>
		<Routes> 
			<Route element={Page404}/>
  		</Routes>
   <h1 className="bg-green-200">Hello World!</h1>
   </>
  );
}

export default App;
