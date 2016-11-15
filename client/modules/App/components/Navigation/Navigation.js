
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';

import cx from 'classnames';
import s from './Navigation.css';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

// Import Actions
import { logoutUserRequest} from '../../../Auth/AuthActions';

// Import Selectors
import { getToken } from '../../../Auth/AutReducer';

class Navigation extends Component {
  logoutUser = () =>{
    this.props.dispatch(logoutUserRequest(this.props.token));
  }

  render() {
    if (this.props.token){
      return (
        <div className={cx(s.root, this.props.className)} role="navigation">
          <Dropdown show = {false}>
            <DropdownTrigger>
              <span className={s.link}>{this.props.token.username}</span>
            </DropdownTrigger>
            <DropdownContent>
              Username
              <ul>
                <li>
                  <a href="/profile">Profile</a>
                </li>
                <li>
                  <a href="/favorites">Favorites</a>
                </li>
                <li>
                  <a href="/logout">Log Out</a>
                </li>
              </ul>
            </DropdownContent>
          </Dropdown>
          <span className={s.spacer}>or</span>
          <a className={cx(s.link, s.highlight)} onClick={this.logoutUser}>Log out</a>
        </div>
      );
    }
    else{
      return (
        <div className={cx(s.root, this.props.className)} role="navigation">
          <Link className={s.link} to="/login">Log in</Link>
          <span className={s.spacer}>or</span>
          <Link className={cx(s.link, s.highlight)} to="/register">Sign up</Link>
        </div>
      );
    }
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    token: getToken(state),
  };
}

Navigation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Navigation.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(Navigation);
