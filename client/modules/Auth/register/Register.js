import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Helmet from 'react-helmet';
import s from './Register.css';

// Import Actions
import { registerUserRequest} from '../AuthActions';

// Import Selectors
import { getToken } from '../AutReducer';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      inputError: false,
      passwordMismatchError: false,
      userExistError: false,
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
      case 'passwordMismatch' :
        return (
          <h4>
            <font color="red">{this.state.passwordMismatchError}</font>
          </h4>
        );
      case 'userExist' :
        return (
          <h4>
            <font color="red">{this.state.userExistError}</font>
          </h4>
        );
      default:
        return;
    }
  }

  registerUser = () => {
    const usernameRef = this.refs.username;
    const emailRef = this.refs.email;
    const password1Ref = this.refs.password1;
    const password2Ref = this.refs.password2;
    if (usernameRef.value && emailRef.value && password1Ref.value && password2Ref.value ) {
      if (password1Ref.value === password2Ref.value)
      {
        this.props.dispatch(registerUserRequest(usernameRef.value, password1Ref.value, {email: emailRef.value}))
          .then(error => {
            if (error) {
              this.setState({userExistError: error});
              usernameRef.value = emailRef.value = password1Ref.value = password2Ref.value = '';
            }
            else {
              this.setState({userExistError: false});
              usernameRef.value = emailRef.value = password1Ref.value = password2Ref.value = '';
              this.context.router.push('/');
            }
          });
        this.setState({passwordMismatchError: false});
      }
      else {
        this.setState({passwordMismatchError: 'password mismatch!'});
      }

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
              <div className={s.formGroup}>
                <span><font color="red">*</font></span>
                <label className={s.label} htmlFor="email">
                  Email:
                </label>
                <input
                  className={s.input}
                  id="email"
                  type="email"
                  name="email"
                  ref="email"
                />
              </div>
              <div className={s.formGroup}>
              <span><font color="red">*</font></span>
              <label className={s.label} htmlFor="password1">
                Password:
              </label>
              <input
                className={s.input}
                id="password1"
                type="password1"
                name="password1"
                ref="password1"
              />
            </div>
              {this.errorMessage('passwordMismatch')}
              <div className={s.formGroup}>
                <span><font color="red">*</font></span>
                <label className={s.label} htmlFor="password2">
                  Enter password again:
                </label>
                <input
                  className={s.input}
                  id="password2"
                  type="password2"
                  name="password2"
                  ref="password2"
                />
              </div>
              <div className={s.formGroup}>
                <a className={s.button} type="submit" onClick={this.registerUser}>
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

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

Register.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(Register);
