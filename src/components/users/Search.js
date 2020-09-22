import React, { Component } from "react";
import PropTypes from "prop-types";

export class Search extends Component {
  state = {
    text: "",
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    // console.log(event.target.value);
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.searchUsers(this.state.text);
    this.setState({ text: "" });
    // console.log(this.state.text);
  };

  render() {
    const { clearUsers } = this.props;

    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            type="text"
            name="text"
            value={this.state.text}
            onChange={this.onChange}
            placeholder="Search Users..."
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>

        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      </div>
    );
  }
}

export default Search;
