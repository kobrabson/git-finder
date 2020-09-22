import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get("https://api.github.com/users");
    this.setState({ users: res.data, loading: false });
  }

  //! Search Github Users passed by props from Search.js
  searchUsers = async (text) => {
    this.setState({ loading: true });
    // console.log(text);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}`
    );
    this.setState({ users: res.data.items, loading: false });
  };

  // ! Clear Users passed by props from Search.js
  clearUsers = async () => {
    this.setState({ loading: true });
    const res = await axios.get("https://api.github.com/users");
    this.setState({ users: res.data, loading: false });
  };

  // ! setAlert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { loading, users, alert } = this.state;

    return (
      <div className="App">
        <Navbar title="Github Finder" />
        <div className="container">
          <Alert alert={alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
