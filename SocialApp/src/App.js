import './App.css';
import './Reset.css';
import Header from './Components/Header';
import Login from './Components/Login/Login'
import Register from './Components/Login/Register'
import Addpost from './Components/Addpost';
import Posts from './Components/Posts';
import Chat from './Components/Chat'
import Profile from './Components/Profile'
import People from './Components/People'
import Searchresults from './Components/Searchresults'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';



function App(props) {

  return ( 
    <Router>
      <div className="App">
        {/* <p>{process.env.REACT_APP_BASE_URL}</p> */}
        <Header />
        <Switch>
          <Route exact path='/Login' render={()=><Login/>}/>
          <Route exact path='/Chat' render={()=><Chat {...props}/>}/>
          <Route exact path='/Register' render={()=><Register/>}/>
          <Route path='/Search/:keyword' render={(props)=><Searchresults {...props}/>}/>
          <Route path='/Profile/:id' render={(props)=><Profile {...props}/>}/>
          <Route exact path='/' render={()=><div><Addpost/>, <Posts/></div>}/>
          <Route path='/Friends' render={()=><People userNameFilter={null} key={window.location.pathname}/>}/>
          <Route path='/Requests' render={()=><People userNameFilter={null} key={window.location.pathname}/>}/>
          <Route path='/People' render={()=><People userNameFilter={null} key={window.location.pathname}/>}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;




