import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import RevClaimsFullLogo from '../../assets/icons/RevClaimsFullLogo.jsx';
import Loading from '../../components/LoadingComponent/Loading.jsx';

import { login } from './actions.es6';

import './Login.scss';

class Login extends React.Component {
    render() {
        const { handleSubmit, pristine, submitting, onLoginClick, authReducer } = this.props;
        return (
            <form onSubmit={handleSubmit(onLoginClick)} className="login">
                <div className="login-header">
                    <RevClaimsFullLogo />
                </div>
                <div className="login-content">
                    <div className="login-form-wrapper">
                        <div className="login-form">
                            <h2>Welcome to RevClaims portal</h2>
                            <h3>Please sign in to access your account</h3>

                            <div>
                                <label>email/user ID</label>
                                <div>
                                    <Field
                                        name="UserName"
                                        component="input"
                                        type="text"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label>password</label>
                                <div>
                                    <Field
                                        name="Password"
                                        component="input"
                                        type="password"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="login-error">{authReducer.signInError}</div>
                            <div>
                                <button type="submit" disabled={pristine || submitting}>
                                    {!authReducer.signInLoading && <span>
                                        secure sign in
                                        &nbsp;
                                        <i className="fa fa-angle-right" />
                                    </span> || <Loading whiteCircle={true} />}
                                </button>
                            </div>
                        </div>
                        <div className="login-secure">
                            <p>
                                Add security info about data handling, two-steps authentication, or any other relevant copy here.
                                <br/><br/>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                <br/><br/>
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="login-footer">
                    © 2017 All RevClaims legal disclaimers, and a link to TOS, to be copied here.
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        authReducer: state.authReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoginClick: (formData) => {
            dispatch(login(formData));
        }
    };
};


Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default reduxForm({
    form: 'loginForm'
})(Login);