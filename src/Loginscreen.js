import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QRCode from 'qrcode.react'
/*
function pad(number, length) {
   
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
   
    return str;

}
function firstgetRndInteger() {
  var keyNumber = '';
  keyNumber = Math.floor(Math.random() * (500) ) + 1;
  keyNumber = pad(keyNumber, 3)
  return keyNumber;
}
function lastgetRndInteger() {
  var keyNumber = '';
  keyNumber = Math.floor(Math.random() * (499) ) + 501;
  keyNumber = pad(keyNumber, 3)
  return keyNumber;
}
*/
function getDate(select){
  var dateNext = '';
  var dateTime = '';
  var dateExpire = '';
  var today = new Date();
  var timetoday = new Date();
  var expiretoday = new Date();
  var days = today.getDate();
  var year = today.getFullYear();
  var month = (today.getMonth()+1);
  var hours = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();
  var nexttime =  new Date(today.getTime() + 5*60000);
  var nextdays = nexttime.getDate();
  var nextyear = nexttime.getFullYear();
  var nextmonth = (nexttime.getMonth()+1);
  var nexthours = nexttime.getHours();
  var nextminutes = nexttime.getMinutes();
  var nextseconds = nexttime.getSeconds();
  days = days < 10 ? '0' + days : days;
  month = month < 10 ? '0' + month : month;
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  nextdays = nextdays < 10 ? '0' + nextdays : nextdays;
  nextmonth = nextmonth < 10 ? '0' + nextmonth : nextmonth;
  nexthours = nexthours < 10 ? '0' + nexthours : nexthours;
  nextminutes = nextminutes < 10 ? '0' + nextminutes : nextminutes;
  nextseconds = nextseconds < 10 ? '0' + nextseconds : nextseconds;  
  today = days + month + year + hours + minutes + seconds;
  nexttime = nextdays + nextmonth + nextyear + nexthours + nextminutes + nextseconds;
  dateNext = nexttime;
  timetoday = days + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
  dateTime = 'เวลาเข้าใช้งาน : ' + timetoday
  expiretoday = nextdays + '/' + nextmonth + '/' + nextyear + ' ' + nexthours + ':' + nextminutes + ':' + nextseconds;
  dateExpire = 'Qrcode สามารถใช้งานได้ถึง : ' + expiretoday
  if(select === 'stamp'){
    return dateTime;
  }
  else if (select === 'gen'){
    return dateNext;
  }
  else if (select === 'expire'){
    return dateExpire;
  }
}
function encrypt(word){
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,-.:;=?@[]^_`{|}~";
 //input
  var i=0;
  var result = "";　
  //loop receive
  while (i < word.length) {
      //ถ้า word ไม่อยู่ใน alphabet จะออกมาเป็นตัวเดิม
  　　var ind = alphabet.indexOf(word.charAt(i));
      result = result + permuted.charAt(ind); //expected is 28KTKScS_ZF
      i++;
  }
  return result;
}
var testId;
var testPassword;
class Loginscreen extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this); //bind event
    this.state={
      username:'',
      password:'',
      QRID:'',
      previousID:'',
      size:0,
      //firstkey:firstgetRndInteger(),
      //lastkey:lastgetRndInteger(),
      dateTime:'',
      expireTime:'',
      firstgenKey:'',
      lastgenKey:'',
      setResult:'start',
      userEncrypt:'',
      passEncrypt:'',
    }
  }
  sendRequest() {
    var resultFromXml
    var axios = require('axios')
    let xmls = '<?xml version="1.0" encoding="utf-8"?>' +
                '<soap:Envelope ' +
                    'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                    'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' + 
                    'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> ' +
                    '<soap:Body> ' +
                        '<GetPatron xmlns="http://opac.psu.ac.th/">' +
                            '<username>'+testId+'</username> ' +
                            '<password>'+testPassword+'</password> ' +
                        '</GetPatron> ' +
                    '</soap:Body> ' +
                '</soap:Envelope>' ;

    axios.post('http://opac.psu.ac.th/PatronService.asmx?op=GetPatron',
    xmls,
    {headers:
      {'Content-Type': 'text/xml',
        'Access-Control-Allow-Origin':'*'
      }
    }).then(res=>{
      var resultxml = res.data;
      var i = 0
      while(i < resultxml.length){
        if(resultxml.substring(i,i+17) === "<GetPatronResult>"){
            resultFromXml = resultxml.substr(i+17,1)
            this.setState({setResult:resultFromXml});
            console.log('จาก xml ' + resultFromXml)
        }
        i++
      }
      console.log(res);
    }).catch(err=>{console.log(err)});
    }
  handleClick(){
    testId = encrypt(this.state.username)
    testPassword = encrypt(this.state.password)
    this.sendRequest()
    this.setState({userEncrypt:encrypt(this.state.username)})
    this.setState({passEncrypt:encrypt(this.state.password)})
    this.setState({firstgenKey:this.state.firstkey})
    this.setState({lastgenKey:this.state.lastkey})
    //this.setState({firstkey:firstgetRndInteger()})
    //this.setState({lastkey:firstgetRndInteger()})
    this.setState({dateTime:getDate('stamp')})
    this.setState({expireTime:getDate('expire')})
    this.setState({previousID:'TM'+ getDate('gen') + this.state.username})
    this.setState({QRID:'TM'+ encrypt(getDate('gen') + this.state.username), size:250,})
  }
  signOutWeb(){
    this.setState({username:''})
    this.setState({password:''})
    this.setState({userEncrypt:''})
    this.setState({passEncrypt:''})
    this.setState({firstgenKey:''})
    this.setState({lastgenKey:''})
    //this.setState({firstkey:firstgetRndInteger()})
    //this.setState({lastkey:lastgetRndInteger()})
    this.setState({dateTime:''})
    this.setState({expireTime:''})
    this.setState({previousID:''})
    this.setState({QRID:'', size:0,})
    this.setState({setResult:'start'})
  }
  render() {
    const style = {
      margin:30,
    }
    //console.log('ใน render ' + val)
    if(this.state.setResult === '1' ){
      return(
        <div>
          <MuiThemeProvider key = {"theme"}>
          <AppBar title="QrCode" showMenuIconButton={false}/>
        </MuiThemeProvider>
        <MuiThemeProvider > 
        <div>
        <br/>
        <br/>
        {'ขอบคุณที่ใช้บริการค่ะ'}
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
            {this.state.expireTime}
            <br/>
            <br/>
            หากไม่สามารถเข้าใช้งานห้องสมุดได้ทันในเวลาที่กำหนด
            <br/>
            สามารถลงชื่อเข้าใช้ใหม่อีกครั้งเพื่อสร้าง QrCode ได้ค่ะ
           <br/>
            <RaisedButton 
              label="Sign Out" 
              primary={true}
              style = {style}
              onClick={() => this.signOutWeb()}/>
       </div> 
       </MuiThemeProvider>
       <br/>
       {'username : ' + this.state.username}
       <br/>
       {'userEncrypt : ' + this.state.userEncrypt}
       <br/>
       {'setResult : ' + this.state.setResult}
       <br/>
       {'Previous ID : ' + this.state.previousID}
       <br/>
       {'QRCODE ID : ' + this.state.QRID}
       <br/>
       {'dateTime : ' + this.state.dateTime}
       <br/>
       {'expireTime : ' + this.state.expireTime}
       </div>
      );
    }
    else if(this.state.setResult === '0' ){
      return (
        <div>
          <MuiThemeProvider key = {"theme"}>
            <AppBar title="Sign in PSU Passport" showMenuIconButton={false}/>
          </MuiThemeProvider>
            <MuiThemeProvider > 
          <div>
          <br/>
             {'id หรือ password ไม่ถูกต้อง '}
             <br/>
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
              label="Sign In" 
              primary={true}
              style = {style}
              onClick={() => this.handleClick()}/>
  
         </div>   
          </MuiThemeProvider>
          <br/>
       {'username : ' + this.state.username}
       <br/>
       {'userEncrypt : ' + this.state.userEncrypt}
       <br/>
       {'setResult : ' + this.state.setResult}
       <br/>
       {'Previous ID : ' + this.state.previousID}
       <br/>
       {'QRCODE ID : ' + this.state.QRID}
       <br/>
       {'dateTime : ' + this.state.dateTime}
       <br/>
       {'expireTime : ' + this.state.expireTime}
         </div>
      );
    }
    return (
      <div>
        <MuiThemeProvider key = {"theme"}>
          <AppBar title="Sign in PSU Passport" showMenuIconButton={false}/>
        </MuiThemeProvider>
          <MuiThemeProvider > 
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
            label="Sign In" 
            primary={true}
            style = {style}
            onClick={() => this.handleClick()}/>
            <br/>
       </div>   
        </MuiThemeProvider>
        <br/>
       {'username : ' + this.state.username}
       <br/>
       {'userEncrypt : ' + this.state.userEncrypt}
       <br/>
       {'setResult : ' + this.state.setResult}
       <br/>
       {'Previous ID : ' + this.state.previousID}
       <br/>
       {'QRCODE ID : ' + this.state.QRID}
       <br/>
       {'dateTime : ' + this.state.dateTime}
       <br/>
       {'expireTime : ' + this.state.expireTime}
       </div>
    );
  }
}


export default Loginscreen;