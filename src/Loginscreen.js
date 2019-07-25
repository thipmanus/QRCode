import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QRCode from 'qrcode.react'
function pad(number, length) {
   
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
   
    return str;

}
function getRndInteger() {
  var keyNumber = '';
  keyNumber = Math.floor(Math.random() * (999) ) + 1;
  keyNumber = pad(keyNumber, 3)
  return keyNumber;
}
function getDate(select){
  var dateNow = '';
  var dateTime = '';
  var today = new Date();
  var timetoday = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  var HH = today.getHours();
  var MM = today.getMinutes();
  var SS = today.getSeconds();
  if(dd<10) 
  {
      dd='0'+dd;
  } 
  if(mm<10) 
  {
      mm='0'+mm;
  }
  if(HH<10) 
  {
      HH='0'+HH;
  } 
  if(MM<10) 
  {
      MM='0'+MM;
  }
  if(SS<10) 
  {
      SS='0'+SS;
  }  
  today = dd+mm+HH+MM+SS;
  dateNow = today;
  timetoday = dd+'/'+mm+'/'+yyyy+' '+HH+':'+MM+':'+SS;
  dateTime = 'เวลาเข้าใช้งาน : ' + timetoday
  if(select === 'stamp'){
    return dateTime;
  }
  else if (select === 'gen'){
    return dateNow;
  }
}

class Loginscreen extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this); //bind event
    this.state={
      username:'',
      password:'',
      QRID:'',
      size:0,
      //UserNumber:0,
      key:getRndInteger(),
      dateTime:'',
      genKey:'',
      setResult:'start',
    }
  }
  handleClick(){
    console.log(this.state.username +', ' +this.state.password);
    //this.setState({UserNumber:this.state.UserNumber + 1})
    this.setState({genKey:this.state.key})
    this.setState({key:getRndInteger()})
    this.setState({dateTime:getDate('stamp')})
    this.setState({QRID:'TM' + this.state.username + /* pad(this.state.UserNumber + 1, 3)+ */ this.state.key + getDate('gen'), size:250,})
    this.setState({setResult:'qrcode'})
  }
  render() {
    const style = {
      margin:30,
    }
    if(this.state.setResult === 'qrcode' ){
      return(
        <div>
          <MuiThemeProvider key = {"theme"}>
          <AppBar title="QrCode Page"/>
        </MuiThemeProvider>
        <MuiThemeProvider > 
        <div>
        <br/>
         {'ID : ' + this.state.username}
        <br/>
        <br/>
         {'Key : ' + this.state.genKey}
        <br/>
        <br/>
        {'QRCODE ID : ' + this.state.QRID}
         <br/>
        <br/>
           <QRCode
             value={this.state.QRID}
             size={this.state.size}
             level={"H"}
             includeMargin={true}
           />
           <br/>
           <br/>
            {this.state.dateTime}
       </div> 
       </MuiThemeProvider>
       </div>
      );
    }
    return (
      <div>
        <MuiThemeProvider key = {"theme"}>
          <AppBar title="Login Page Exeriment"/>
        </MuiThemeProvider>
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
        </MuiThemeProvider>
       </div>
    );
  }
}


export default Loginscreen;