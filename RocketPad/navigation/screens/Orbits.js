
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, where, doc, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { Appbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const Orbits = ({navigation}) => {
  const [orbits, setOrbit] = useState([]);

//   useEffect(() => {
//   const orbitsRef = collection(FIRESTORE_DB, 'Orbits'); 
//   const queryRef = query(orbitsRef, where('Name', '==', 'Rocket Orbits'));
//   const subscribe = onSnapshot(queryRef, (querySnapshot) => {
//     const orbit: any[] = [];
//     querySnapshot.forEach((doc) => {
//       orbit.push(doc.data());
//     });
//     setOrbit(orbit);
//   });

//   return () => subscribe();
// }, []);

useEffect(() => {

  const orbitsRef = collection(FIRESTORE_DB, 'Orbits'); 
  const queryRef = query(orbitsRef, where('Name', '==', 'Rocket Orbits'));
  const subscribe = onSnapshot(queryRef, {
    next: (snapshot) => {
      console.log('updated');
  
      const orbit = [];
      snapshot.docs.forEach((doc) => {
        console.log(doc.id);
        orbit.push({ id:doc.id, ...doc.data(),
          
      });
      });
  
      setOrbit(orbit);
      
    },
  });
  
  return () => subscribe();
  }, []);

return (

  <View>
    <Appbar.Header>
      <Appbar.Content title="Orbits" />
    </Appbar.Header>
 
      <ScrollView>
          <View style={styles.container}>
        {orbits.map((RocketOrbit, index) => (
          <View key={index}>
             <Text style={styles.Header}>{RocketOrbit.Title}</Text>
             <Text style={styles.text}>{RocketOrbit.Text}</Text>
             <Text style={styles.text}>{RocketOrbit.Text2}</Text>
             <Text style={styles.Header}>{RocketOrbit.OrbitsTitle}</Text>

            <TouchableOpacity onPress={() => navigation.navigate('orbit' , { documentName: 'Low Earth Orbit (LEO)' })}>
              <View style={styles.card}>
              <ImageBackground source={{ uri: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2020/03/low_earth_orbit/21862713-4-eng-GB/Low_Earth_orbit_article.png"}} style={styles.imageOrbit}>
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.5)','rgba(0, 0, 0, 0.2)', 'transparent']}
                style={styles.gradient}
                start={[0.5, 1]}
                end={[0.5, 0.4]}
              />
            <Text style={styles.textOrbit}>{RocketOrbit.Orbits}</Text>  
            </ImageBackground>
            </View> 
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => navigation.navigate('orbit', {documentName: 'Medium Earth Orbit (MEO)'})}>
            <Text style={styles.textLink}>{RocketOrbit.Orbits2}</Text>    
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('orbit', {documentName: 'Geostationary Orbit (GEO)'})}>
            <Text style={styles.textLink}>{RocketOrbit.Orbits3}</Text>    
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('orbit', {documentName: 'Geosynchronous Orbit (GSO)'})}>
            <Text style={styles.textLink}>{RocketOrbit.Orbits4}</Text>    
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('orbit', {documentName: 'Semi - Synchronous Orbit '})}>
            <Text style={styles.textLink}>{RocketOrbit.Orbits5}</Text>    
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('orbit', {documentName: 'Lagrange Points'})}>
            <Text style={styles.textLink}>{RocketOrbit.Orbits6}</Text>    
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('orbit', {documentName: 'Polar Orbit and Sun-Synchronous Orbit (SSO)'})}>
            <Text style={styles.textLink}>{RocketOrbit.Orbits7}</Text>    
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('orbit', {documentName: 'Transfer Orbits and Geostationary Transfer Orbit (GTO)'})}>
            <Text style={styles.textLink}>{RocketOrbit.Orbits8}</Text>    
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('orbit', {documentName: 'Molniya Orbit'})}>
            <Text style={styles.textLink}>{RocketOrbit.Orbits9}</Text>    
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('orbit', {documentName: 'Tundra Orbit'})}>
            <Text style={styles.textLink}>{RocketOrbit.Orbits10}</Text>    
          </TouchableOpacity> */}
             
             <Text style={styles.Header}>{RocketOrbit.OrbitsTitle2}</Text>
             <Text style={styles.text}>{RocketOrbit.Text3}</Text>
             <Text style={styles.text}>{RocketOrbit.Text5}</Text>
             <Image source={{ uri: RocketOrbit.Img }} style={styles.image} />
             <Text style={styles.text}>{RocketOrbit.Text6}</Text>
             <Text style={styles.text}>{RocketOrbit.Text7}</Text>
             <Text style={styles.text}>{RocketOrbit.Text8}</Text>
             <Text style={styles.text}>{RocketOrbit.Text9}</Text>
             <Text style={styles.text}>{RocketOrbit.Text10}</Text>
             <Image source={{ uri: RocketOrbit.Img2 }} style={styles.image} />
             <Text style={styles.text}>{RocketOrbit.Text11}</Text>
             <Text style={styles.text}>{RocketOrbit.Text12}</Text>
             <Text style={styles.text}>{RocketOrbit.Text13}</Text>
             
            
          </View>
      ))}
      </View>
      </ScrollView>
      </View>
  );
};
export default Orbits

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
   marginTop: 30,
   marginBottom: 120,
  },
  text:{
  fontSize: 16,
  lineHeight: 24,
  marginBottom: 20,
  },
  image:{
    width: '100%',
    height: 200,
    marginBottom: 20,
    
  },
  Header:{
    fontSize: 32,
    lineHeight: 40,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textLink:{
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textDecorationLine: 'underline',
    color: 'blue',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: '5%',
  },
  imageOrbit: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  card:{
    height: 200,
    width: 250,
    borderRadius: 12,
    // borderWidth: 2,
    // borderColor: 'red',
    marginBottom: 20,
    overflow: "hidden",
  },
  textOrbit:{
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: 'white',
    fontWeight: 'bold',
  },

});