
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import {DropdownButton, MenuItem } from 'react-bootstrap';


import cx from 'classnames';
import s from './Navigation.css';

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
          <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"><span className={s.link}>{this.props.token.username}</span>
              <span className="caret"></span></button>
            <ul className="dropdown-menu">
              <li><h4 href="#">XXX@XXX</h4></li>
              <li><a className={cx(s.link, s.highlight)} onClick={this.logoutUser}>Log out</a></li>
            </ul>
          </div>
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
