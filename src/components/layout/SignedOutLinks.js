import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/signup">
          <strong>Sign Up</strong>
        </NavLink>
      </li>
      <li>
        <NavLink to="/signin">
          <strong>Sign In</strong>
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
