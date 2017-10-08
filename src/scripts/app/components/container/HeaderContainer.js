import React from 'react';
import Context from '../../Context';
import SessionStorage from "../../../storage/SessionStorage";

class HeaderContainer extends React.Component {
  render() {
    return <div className="HeaderContainer">
      <a href="https://app.onsen.ag/top">
        <img
          className="HeaderContainer_Logo"
          src="//www.onsen.ag/common/img/head/logo.png"
          alt="logo"
        />
      </a>
      {this._renderLoginButton()}
    </div>;
  }

  _renderLoginButton() {
    if (!Context.oauthAccessToken) {
      return <div className="HeaderContainer_LoginButton" onClick={this._onLoginButtonClick}>
        ログイン
      </div>;
    }
    return <div className="HeaderContainer_LogoutButton" onClick={this._onLogoutButtonClick}>
      ログアウト
    </div>;
  }

  _onLoginButtonClick = () => {
    location.href = 'https://app.onsen.ag/users/sign_in';
  };

  _onLogoutButtonClick = () => {
    SessionStorage.delete('access_token');
    location.href = 'https://app.onsen.ag/users/sign_out';
  }
}

export { HeaderContainer }
