import React from "react";

import { AuthUserContext, withAuthorization } from "../Session/";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";

const AccountPage = () => (
  <AuthUserContext>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext>
);
const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
