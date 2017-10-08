import React from 'react';
import { observer } from 'mobx-react';
import Context from '../../Context';
import SessionStorage from "../../../storage/SessionStorage";
import {user} from '../../states/UserState';

@observer
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
      <div className="HeaderContainer_Account">
        {this._renderAccountInfo()}
        {this._renderLoginButton()}
      </div>
    </div>;
  }

  _renderAccountInfo() {
    if (!user.myInfo) {
      return null;
    }
    return <div className="HeaderContainer_AccountInfo">
      <div className={`HeaderContainer_AccountType ${user.isPremium ? 'is-premium' : ''}`}>
        {user.isPremium ? 'プレミアム' : '一般'}サポーター
      </div>
      <div className="HeaderContainer_AccountId">
        ID: {user.myInfo.uid}
      </div>
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
