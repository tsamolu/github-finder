import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Navbar from "./layout/Navbar";
import User from "./layout/User";
import Search from "./layout/Search";
import Alert from "./Alert"
import axios from "axios";
 

class App extends Component{
  state = {
    users: [],
    loading: false,
    alert: null
  }

  async componentDidMount  (){
    
    this.setState({loading: true});
    

    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.APP_ID}&CLIENT_SECRET=${process.env.APP_SECRET}`); 

    console.log(res);

    this.setState({users: res.data, loading: false});

  }

  // Search Github users

  searchUsers = async (text) => {

    this.setState({loading:true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.APP_ID}&CLIENT_SECRET=${process.env.APP_SECRET}`); 

    console.log(res);

    this.setState({users: res.data.items, loading: false});

  }
  
// CLear users from state
  clearUsers = async() => { 
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.APP_ID}&CLIENT_SECRET=${process.env.APP_SECRET}`);

    this.setState({users:res.data, loading: false});

  }

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({alert: {msg,type}});

    setTimeout(() => this.setState({alert: null}), 5000)
  };

  render(){
    
    return (
        <Router>
        <div>
          <Navbar icon = "fa fa-github" />

          <div className = "container">
            <Alert alert = {this.state.alert} />
            <Switch>
              <Route exact path="/" render={props => (
                <Fragment>
                  <Search 
                    searchUsers={this.searchUsers} 
                    clearUsers={this.clearUsers} 
                    showClear={this.state.users.length > 0 ? true: false}
                    setAlert={this.setAlert}/>
                    <User loading = {this.state.loading} users = {this.state.users}/>
                </Fragment>
              )} />
            </Switch>
            

            
          </div>
          
        </div>
        </Router>
    );
  
    }
}

export default App;
