import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css';
// import App from './App.tsx';

import StarRating from './StarRating.tsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={10} />
    <StarRating
      maxRating={5}
      color={'blue'}
      size={24}
      messages={['first', 'second', 'third', 'fourth', 'fifth']}
      defaultRating={3}
    />
  </React.StrictMode>
)
