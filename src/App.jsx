import React from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import './styles/App.css'

function App() {
const handleSearch = (query) => {
    console.log('Searching for:', query);
    // We'll implement the actual search later
  };


  return (
    <div className="App">
      <Header />
      <SearchBar onSearch={handleSearch} />
      <main>
        <div className="container">
          <h2 style={{ padding: '2rem 0', color: 'white' }}>MovieMood - Coming Soon!</h2>
        </div>
      </main>
    </div>
  )
}

export default App
