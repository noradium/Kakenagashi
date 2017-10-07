import React from 'react'

class HeaderContainer extends React.Component {
  render() {
    return <div className="HeaderContainer">
      <div className="HeaderContainer_Logo">
        <img
          className="HeaderContainer_Logo_Image"
          src="//www.onsen.ag/common/img/head/logo.png"
          alt="logo"
        />
      </div>
    </div>;
  }
}

export { HeaderContainer }
