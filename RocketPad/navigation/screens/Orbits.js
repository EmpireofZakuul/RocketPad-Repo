
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, where, doc, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';

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

      <ScrollView>
          <View style={styles.container}>
        {orbits.map((RocketOrbit, index) => (
          <View key={index}>
             <Text style={styles.Header}>{RocketOrbit.Title}</Text>
             <Text style={styles.text}>{RocketOrbit.Text}</Text>
             <Text style={styles.text}>{RocketOrbit.Text2}</Text>
             <Text style={styles.Header}>{RocketOrbit.OrbitsTitle}</Text>

            <TouchableOpacity onPress={() => navigation.navigate('orbit' , { documentName: 'Low Earth Orbit (LEO)' })}>
            <Text style={styles.textLink}>{RocketOrbit.Orbits}</Text>    
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('orbit', {documentName: 'Medium Earth Orbit (MEO)'})}>
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
          </TouchableOpacity>
             
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
     
  );
};
export default Orbits

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
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
  }


});