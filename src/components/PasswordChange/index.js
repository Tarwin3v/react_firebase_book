import React from "react";

import { withFirebase } from "../Firebase/";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};
class PasswordChangeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    event.preventDefault();
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => this.setState({ error }));
  };

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === "" || passwordTwo === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="password"
          name="passwordOne"
          value={passwordOne}
          placeholder="New Password"
          onChange={this.onChange}
        />
        <input
          type="password"
          name="password"
          value={passwordTwo}
          placeholder="Confirm password"
          onChange={this.onChange}
        />
        <button disabled={isInvalid} type="submit">
          Save
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
export default withFirebase(PasswordChangeForm);
