// Simple API test without import.meta.env
const API_KEY = '8e1bda4db6f0c46f796119823a59d81b';  // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';

async function testAPI() {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    
    console.log('✅ API Working!');
    console.log('First 3 popular movies:');
    data.results.slice(0, 3).forEach(movie => {
      console.log(`- ${movie.title} (${movie.release_date?.split('-')[0]}) ⭐ ${movie.vote_average}`);
    });
  } catch (error) {
    console.error('❌ API Error:', error);
  }
}

testAPI();
