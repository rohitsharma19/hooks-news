import React, {useState,useEffect,useRef} from 'react';
import axios from 'axios';


function App() {

  const[results, setResults] = useState([]);
  const[query, setQuery] = useState("react hooks");
  const[loading, setLoading] = useState(false);
  const searchInputRef = useRef();
  const[error, setError] = useState(null);

  useEffect(() => {
      // axios
      // .get('http://hn.algolia.com/api/v1/search?query=reacthooks')
      // .then(response => {
      //   console.log(response.data)
      //   setResults(response.data.hits)
      // })

      getResults();
  }, []) 

  const getResults = async () => {
    setLoading(true);
    try{
      const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
      setResults(response.data.hits);
    }catch(err){
      setError(err)
    }
    setLoading(false);
  }

  const handleSubmit = event =>{
    event.preventDefault();
    getResults();
  }

  const handleClearSearch = () => {
    setQuery('');
    searchInputRef.current.focus();
  }

  return (
    <div className="container max-w-screen-md mx-auto p-4 m-2 bg-gray-200 shadow-lg rounded">
      <img src="https://icon.now.sh/react/c0c" alt="React Logo" className="float-right h-12"></img>
      <h1 className="text-black text-2xl">Hooks News</h1>
      <form onSubmit={handleSubmit} className="mb-2">
        <input type="text" value={query} ref={searchInputRef} onChange={event => setQuery(event.target.value)} className="border p-1 rounded"></input>
        <button type="submit" className="bg-orange-300 text-white rounded m-1 p-1">Submit</button>
        <button type="button" onClick={handleClearSearch} className="bg-teal-300 text-white rounded p-1">Clear</button>
      </form>
      
      {
        loading ? 
        (
          <div className="font-bold text-orange-400"><h2>Loading Results..</h2></div>
        ) 
        : 
        (
          <ul className="list-inside leading-normal">
            {results.map(item => (
              <li key={item.objectID} className="p-1">
                <a href={item.url} className="text-indigo-400 hover:text-indigo-darkest">{item.title}</a>
              </li>
            ))}
          </ul>
        )
      }

    {error && <div text-red font-bold><h2>{error.message}</h2></div>}
      
      
    </div>
  );
}

export default App;
