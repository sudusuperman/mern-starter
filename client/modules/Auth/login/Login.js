import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Helmet from 'react-helmet';
import s from './Login.css';

// Import Actions
import { loginUserRequest} from '../AuthActions';

// Import Selectors
import { getToken } from '../AutReducer';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      inputError: false,
      passwordError: false,
    };
  }

  errorMessage = (type) =>
  {
    switch (type) {
      case 'input' :
        return (
          <h4>
            <font color="red">{this.state.inputError}</font>
          </h4>
        );
      case 'password' :
        return (
          <h4>
            <font color="red">{this.state.passwordError}</font>
          </h4>
        );
      default:
        return;
    }
  }

  loginUser = () => {
    const usernameRef = this.refs.username;
    const passwordRef = this.refs.password;
    if (usernameRef.value && passwordRef.value) {
      this.props.dispatch(loginUserRequest(usernameRef.value, passwordRef.value))
        .then(error => {
          if (error) {
            this.setState({passwordError: error});
            passwordRef.value = '';
          }
          else {
            this.setState({passwordError: false});
            usernameRef.value = passwordRef.value = '';
            this.context.router.push('/');
          }
        });
      this.setState({inputError: false});
    }
    else {
      this.setState({inputError: 'areas marked by * are required'});
    }
  };

  render() {
    return (
      <div>
        <Helmet title={'log in page'} />
        <div className={s.root}>
          <div className={s.container}>
            <h1>{'Log in with username and password'}</h1>
            {this.errorMessage('input')}
            <form method="post">
              <div className={s.formGroup}>
                <span><font color="red">*</font></span>
                <label className={s.label} htmlFor="username">
                    Username:
                </label>
                <input
                  className={s.input}
                  id="username"
                  type="text"
                  name="username"
                  ref="username"
                  autoFocus
                />
              </div>
              {this.errorMessage('password')}
              <div className={s.formGroup}>
                <span><font color="red">*</font></span>
                <label className={s.label} htmlFor="password">
                  Password:
                </label>
                <input
                  className={s.input}
                  id="password"
                  type="password"
                  name="password"
                  ref="password"
                />
              </div>
              <div className={s.formGroup}>
                <a className={s.button} type="submit" onClick={this.loginUser}>
                  Log in
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    token: getToken(state),
  };
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

Login.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(Login);
