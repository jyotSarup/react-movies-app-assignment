import React from 'react';
import './App.css';
import Header from './components/layout/Header'
import MoviesPage from './components/pages/MoviesPage'
function App() {
  return (
    <div className="App">
      <Header/>
      <MoviesPage/>
    </div>
  );
}

export default React.memo(App);
