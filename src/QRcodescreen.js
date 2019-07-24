import React, { Component } from 'react';
import QRCode from 'qrcode.react'


class QrcodeScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      username:" "
    }
  }
  render() {
    return (
      <div>
          <QRCode
            id={this.state.username}
            value={this.state.username}
            size={290}
            level={"H"}
            includeMargin={true}
          />
      </div>  
    );
  }
}
export default QrcodeScreen;