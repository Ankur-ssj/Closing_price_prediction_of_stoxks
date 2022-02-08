import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Results from './components/Results'
import Home from './components/Home'
import Particles from './components/Particles'
import Hamburger from './components/Hamburger'
import Header from './components/Header';

function App() {
  return (
    <div className="App">
       <Router>
       <Header/>
         <Switch>
           <Route path= "/" exact component={Home}/>
           <Route path= "/Home" exact component={Home}/>
           <Route path= "/Particles" exact component={Particles}/>
           <Route path= "/Results" exact component={Results}/>
           <Route path= "/Hamburger" excat component={Hamburger}/>
         </Switch>
       </Router>
    </div>
  );
}

export default App;
