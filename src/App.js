import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    loading: false,
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

  render() {
    const { loading, users } = this.state;

    return (
      <div className="App">
        <Navbar title="Github Finder" />
        <div className="container">
          <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
