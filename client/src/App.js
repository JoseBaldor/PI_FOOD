import './App.css';
import Detail from './components/Detail/Detail';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Form from './components/Form/Form'
import {Route} from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';


function App() {
  return (
    <div className="App">
      <Route exact path='/'>
        <LandingPage/>
      </Route>
      <Route path='/food'>
        <Navbar/>
      </Route>
      <Route exact path='/food/home'>
        <Home/>
      </Route>
      <Route path='/food/recipe'>
        <Form/>
      </Route>
      <Route exact path='/food/detail/:id' component = {Detail}/>
      {/* <Route path="*">
          <NotFound />
        </Route> */}
    </div>
  );
}

export default App;
