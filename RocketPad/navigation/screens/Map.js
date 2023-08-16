import { StyleSheet, Text, View, Keyboard, TextInput, Button } from 'react-native'
import React from 'react'
import { Feather, Entypo } from "@expo/vector-icons";

const Map = ({ navigation, clicked, searchPhrase, setSearchPhrase, setClicked}) => {
  return (
//     <View style={styles.SearchBarContainer}>
//   <View style={clicked ? styles.clicked : styles.unClicked}>
// < Feather name="search" size={20} color="black" style={{marginLeft: 1}}/>

// <TextInput style={styles.input} placeholder='Search' value={searchPhrase} onChangeText={setSearchPhrase} onFocus={() => {
//   setClicked(true);
// }}/>

// {clicked && (
//   <Entypo name='cross' size={20} color="black" style={{padding: 1}} onPress={() => {
//     setSearchPhrase("")
//   }}/>
// )}
//   </View>

//   {clicked && (
//     <View>
//       <Button title='Cancel' onPress={() => {
//         Keyboard.dismiss();
//         setClicked(false);
//       }}></Button>
//     </View>
//   )}
//   </View>
<View>

</View>
  )
}

export default Map

const styles = StyleSheet.create({
  // SearchBarContainer:{
  //   margin: 15,
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   width: '95%',
  //     },
  //     clicked:{
  //   padding: 10,
  //   flexDirection: 'row',
  //   width: '80%',
  //   backgroundColor: '#d9dbda',
  //   borderRadius: 15,
  //   alignItems: 'center',
  //   justifyContent: 'space-evenly',
  //     },
  //     unClicked:{
  //   padding: 10,
  //   flexDirection: 'row',
  //   width: '95%',
  //   backgroundColor: '#d9dbda',
  //   borderRadius: 15,
  //   alignItems: 'center',
  //     },
  //     input:{
  //   fontSize: 20,
  //   marginLeft: 10,
  //   width: '90%',
  //     },
})