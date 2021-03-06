import React, { Component } from 'react';
import {  View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView}  from 'react-native';

import db from '../config';
import firebase from 'firebase';
import { RFValue } from "react-native-responsive-fontsize";

export default class WelcomeScreen extends Component{
 
  constructor(){
    super()
    this.state={
      emailId : '',
      password: '',
       firstName:'',
      lastName:'',
      address:'',
      contact:'',
      confirmPassword:'',
      currency : '',
      isModalVisible:'false'
    }
  }

    userSignUp = (emailId, password,confirmPassword) =>{
   if(password !== confirmPassword){
       return alert("password doesn't match\Check your password.")
   }else{
     firebase.auth().createUserWithEmailAndPassword(emailId, password)
     .then(()=>{
       this.props.navigation.navigate('ExchangeItems')
       db.collection('users').add({
         first_name:this.state.firstName,
         last_name:this.state.lastName,
         contact:this.state.contact,
         email_id:this.state.emailId,
         address:this.state.address
         
       })
        
       return  alert(
            'User Added Successfully',
            '',
            [
              {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
            ]
        );
     })
     .catch((error)=> {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       return alert(errorMessage)
     });
   }
 }

 userLogin = (emailId, password)=>{
   firebase.auth().signInWithEmailAndPassword(emailId, password)
   .then(()=>{
   this.props.navigation.navigate('ExchangeItems')
   })
   .catch((error)=> {
     var errorCode = error.code;
     var errorMessage = error.message;
     return alert(errorMessage)
   })
 }
showModal = ()=>{
  
  return(
       <Modal
    animationType="slide"
    transparent={true}
    visible = {this.state.isModalVisible}
    
    >
    <View style={styles.modalContainer}>
      <ScrollView style={{width:'100%'}}>
        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
   
        <Text
          style={styles.modalTitle}
          >Registration</Text>
        <TextInput
          style={styles.formTextInput}
          placeholder ={"First Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              firstName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Last Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              lastName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Contact"}
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              contact: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Address"}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Email"}
          keyboardType ={'email-address'}
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        /><TextInput
          style={styles.formTextInput}
          placeholder ={"Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        /><TextInput
          style={styles.formTextInput}
          placeholder ={"Confrim Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              confirmPassword: text
            })
          }}
        />
        <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={()=>
              this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
            }
          >
          <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.cancelButton}
        onPress={()=>{ 
              this.setState({isModalVisible : false})
              }}
          >
          <Text style={{color:'#ff5722'}}>Cancel</Text>
          </TouchableOpacity>
          
        </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
      </Modal>

)
}

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.profileContainer}>
      {
            this.showModal()
          }
          <Text style={styles.title}>Barter</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
          
          style={styles.loginBox}
          placeholder="example@barter.com"
          placeholderTextColor = "black"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="password"
          placeholderTextColor = "black"
           textColor = 'gold'
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
              <TextInput
          style={styles.loginBox}
          placeholder="Enter Country Currency Code "
          placeholderTextColor = "black"
           textColor = 'gold'
          onChangeText={(text)=>{
            this.setState({
              currency : text
            })
          }}
        />
          <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{ 
              this.setState({isModalVisible : true})
              }}
            >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:'gold',
   alignItems: 'center',
   justifyContent: 'center',
   
 },
 profileContainer:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
 },
 title :{
   fontSize:65,
   paddingBottom:30,
   color : 'black',
   fontFamily : 'TimesNewRoman',
   fontWeight : 'bold'

 },
 loginBox:{
   width: 300,
   height: RFValue(20),
   borderBottomWidth: RFValue(1.5),
   borderColor : 'black',
   fontSize: RFValue(7),
   margin:RFValue(10),
   paddingLeft:10,
     fontFamily : 'TimesNewRoman',
   fontWeight : 'bold'
 },
 KeyboardAvoidingView:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
   
 },
 modalTitle :{
   justifyContent:'center',
   alignSelf:'center',
   fontSize:30,
   color:'#ff5722',
   margin:RFValue(50),
    fontFamily : 'TimesNewRoman',
   fontWeight : 'bold'
 },
 modalContainer:{
   flex:1,
   borderRadius:20,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:"#ffff",
   marginRight:30,
   marginLeft : 30,
   marginTop:80,
   marginBottom:80,
 },
 formTextInput:{
   width:"75%",
   height:35,
   alignSelf:'center',
   borderColor:'#ffab91',
   borderRadius:10,
   borderWidth:1,
   marginTop:RFValue(20),
   padding:10,
    fontFamily : 'TimesNewRoman',
   fontWeight : 'bold'
 },
 registerButton:{
   width:200,
   height:40,
   alignItems:'center',
   justifyContent:'center',
   borderWidth:1,
   borderRadius:10,
   marginTop:RFValue(30)
 },
 registerButtonText:{
   color:'#ff5722',
   fontSize:15,
   fontWeight:'bold',
    fontFamily : 'TimesNewRoman',
 },
 cancelButton:{
   width:200,
   height:30,
   justifyContent:'center',
   alignItems:'center',
   marginTop:RFValue(5),
 },

 button:{
   width:300,
   height:50,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:RFValue(25),
   backgroundColor:"black",
   shadowColor: "#000",
   shadowOffset: {
      width: 0,
      height: 8,
   },
   shadowOpacity: 0.50,
   shadowRadius: 10.32,
   elevation: 20,
   padding: 10
 },
 buttonText:{
   fontSize:20,
    fontFamily : 'TimesNewRoman',
   fontWeight : 'bold',
    color:"gold",
 }
})