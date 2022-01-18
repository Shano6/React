import NewsList from "./components/NewsList";
import NewsDetail from "./components/NewsDetail";
import Error from "./components/Error";
import {BrowserRouter as  Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<NewsList />}/>
          <Route exact path='/404' element={<Error />}/>
          <Route path='/:title' element={<NewsDetail />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
