import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
//import App from './App';
import StarRating from "./StarRating.js"
import {useState} from 'react'


function Test() {
  const [movieRating, setMovieRating] = useState(0)
  return <div>
    <StarRating maxRating={10} color="blue" onSetRating = {setMovieRating}/>
    <p>Rating is {movieRating}</p>
  </div>
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating messages = {[ "Terrible", 'Okay', 'Good', 'Very Good', "Amazing"]}/>
    <StarRating color="red" size={25} defaultRating={3}/>
    <Test />
  </React.StrictMode>
);

