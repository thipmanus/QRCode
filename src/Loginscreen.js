import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QRCode from 'qrcode.react'


class Loginscreen extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this); //bind event
    this.state={
      username:'',
      password:'',
      QRID:'',
      size:'',
    }
    
  }
  handleClick(){
    console.log(this.state.username +', ' +this.state.password);
    this.setState({QRID:this.state.username , size:290,})
  }

  render() {
    const style = {
      margin:30,
    }
    return (
      <div>
        {/*app bar section */}
        <MuiThemeProvider key = {"theme"}>
          <AppBar title="Login Page Exeriment"/>
        </MuiThemeProvider>
        {/*form section */}
          <MuiThemeProvider > 
        <div>
         <TextField
           hintText="Enter student ID"
           floatingLabelText="Student ID"
           onChange={(event,newValue,text) => this.setState({username:newValue , inputValue: text})}
           />
         <br/>
           <TextField
             type="password"
             hintText="Enter Password"
             floatingLabelText="Password"
             onChange={(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           
           <RaisedButton 
            label="Generate QR Code" 
            primary={true}
            style = {style}
            onClick={() => this.handleClick()}/>
 
       </div>
       <div>
          <QRCode
            value={this.state.QRID}
            size={this.state.size}
            level={"H"}
            includeMargin={true}
          />
      </div>    
        </MuiThemeProvider>  {/*end of form section */}
       </div>
    );
  }
}


export default Loginscreen;