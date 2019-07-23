import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QRCode from 'qrcode.react';

class Loginscreen extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this); //bind event 
    var displayQRCode = [];
    var localloginComponent=[];
    const style = {
      margin: 30,
    };
    displayQRCode.push(
      <QRCode value = ""/>
    )
    localloginComponent.push(
      <MuiThemeProvider key={"theme"}>
        <div>
         <TextField
           hintText="Enter student ID"
           floatingLabelText="Student ID"
           onChange={(event,newValue) => this.setState({username:newValue})}
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
            style={style} 
            onClick={() => this.handleClick()}/>
       </div>
       
       </MuiThemeProvider>
    )
    this.state={
      username:'',
      password:'',
      loginComponent:localloginComponent,
      displayQRCode:displayQRCode,
      isDisplay:false
    }
    
  }
  handleClick(){
    //this.setState({isDisplay:!isDisplay})
    console.log(this.state.username +', ' +this.state.password);    
    //ReactDOM.render();
    //  this.qrcodeComponent.push(
    //     <QRCode value = "5910110573" />
    //  );

  }

  
  //   axios.post(apiBaseUrl+'login', payload)
  //  .then(function (response) {
  //    console.log(response);
  //    if(response.data.code === 200){
  //      console.log("Login successfull");
  //    }
  //    else if(response.data.code === 204){
  //      console.log("Username password do not match");
  //      alert(response.data.success)
  //    }
  //    else{
  //      console.log("Username does not exists");
  //      alert("Username does not exist");
  //    }
  //  })
  //  .catch(function (error) {
  //    console.log(error);
  //  });
  

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="Login Page Exeriment"/>
        </MuiThemeProvider>        
        {this.state.loginComponent}
        <p>qrcode section</p>
        {this.state.displayQRCode}
      
      </div>
    );
  }
}


export default Loginscreen;