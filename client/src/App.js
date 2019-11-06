import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Landing from './components/Layout/Landing';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/auth/login';
import Register from './components/auth/register';
import {setCurrentUser, logoutUser} from './actions/authAction';
import {clearCurrentProfile} from './actions/profileActions';
import setAuthToken from './utils/setAuthToken';
import jwt_decoded from 'jwt-decode';
import store from './store';
import {connect} from 'react-redux';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from '../../client/src/components/update-profile/updateProfile';
import AddExperiences from './components/add-credentials/AddExperiences';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/common/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post'

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decoded(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    window.location.href= '/login'
  }
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
         <Route path="/" component={Landing} exact />
         <Route path="/login" component={Login} exact />
         <Route path="/register" component={Register} exact />
         <Route path='/dashboard' component={Dashboard} exact />
         <Route path='/create-profile' component={CreateProfile} exact />
         <Route path='/edit-profile' component={EditProfile} exact />
         <Route path='/add-experiences' component={AddExperiences} exact />
         <Route path='/add-education' component={AddEducation} exact />
         <Route path='/profiles' component={Profiles} exact />
         <Route path='/profile/:handle' component={Profile} exact />
         <Route path='/not-found' component={NotFound} exact /> 
         <Route path="/feed" component={Posts} exact /> 
         <Route path="/post/:id" component={Post} exact /> 
        <Footer />
      </div>
    </Router> 
    
  );
}

const mapStateToProps = (state) =>({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps)(App);
