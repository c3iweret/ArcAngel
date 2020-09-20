import React from 'react'
import ReactDOM from 'react-dom'
import Main from './Main'
import { BrowserRouter } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter><Main /></BrowserRouter>,
  document.getElementById('root')
);
