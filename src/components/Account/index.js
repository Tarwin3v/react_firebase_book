import React from "react";

import { withAuthorization } from "../Session/";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";

const AccountPage = () => (
  <div>
    <h1>Account</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>
);
const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
