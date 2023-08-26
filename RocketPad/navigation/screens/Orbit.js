import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, where, doc, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

const Orbit = () => {
  
  const [rocketOrbits, setRocketOrbit] = useState([]);

// const route = useRoute();
// const documentName = route.params?.documentName;

const route = useRoute();
const documentName = route.params?.documentName;
const navigation = useNavigation();

useEffect(() => {
  console.log('Fetching data for documentName:', documentName);
  const orbitsRef = collection(FIRESTORE_DB, 'Orbits');
  const queryRef = query(orbitsRef, where('Name', '==', documentName));
  const subscribe = onSnapshot(queryRef, {
    next: (snapshot) =>{
    const orbitRocket = [];
    snapshot.docs.forEach((doc) => {
      console.log('Document ID:', doc.id);
      orbitRocket.push({ id: doc.id, ...doc.data() });
    });
    setRocketOrbit(orbitRocket);
  },
  });

  return () => subscribe();
}, [documentName]);


  return (

    <View>
         
      <Appbar.Header>
    <Appbar.BackAction onPress={() => navigation.goBack()} />
    <Appbar.Content title={documentName} />
  </Appbar.Header>
  
    <ScrollView>
      <View style={styles.container}>
        {rocketOrbits.map((rocketOrbit, index) => (
          <View key={index}>

{documentName === 'Low Earth Orbit (LEO)' && (
    <View>
      <Text style={styles.Header}>{rocketOrbit.Title}</Text>
      <Text style={styles.text}>{rocketOrbit.Text}</Text>
      <Text style={styles.text}>{rocketOrbit.Text2}</Text>
      <View style={styles.imageContainer}>
      <Image source={{ uri: rocketOrbit.Img }} style={styles.image} />
      </View>
      <Text style={styles.text}>{rocketOrbit.Text3}</Text>
      <Text style={styles.text}>{rocketOrbit.Text4}</Text>
      <Text style={styles.text}>{rocketOrbit.Text5}</Text>
      <Text style={styles.text}>{rocketOrbit.Text6}</Text>
    </View>
  )}

{documentName === 'Medium Earth Orbit (MEO)' && (
    <View>
      <Text style={styles.Header}>{rocketOrbit.Title}</Text>
      <Text style={styles.text}>{rocketOrbit.Text}</Text>
      <View style={styles.imageContainer4}>
      <Image source={{ uri: rocketOrbit.Img2 }} style={styles.image} />
      </View>
      <Text style={styles.text}>{rocketOrbit.Text3}</Text>
      <Text style={styles.text}>{rocketOrbit.Text2}</Text>
      <View style={styles.imageContainer}>
      <Image source={{ uri: rocketOrbit.Img }} style={styles.image} />
      </View>
     
    </View>
  )}

{documentName === 'Geostationary Orbit (GEO)' && (
    <View>
      <Text style={styles.Header}>{rocketOrbit.Title}</Text>
      <Text style={styles.text}>{rocketOrbit.Text}</Text>
      <Text style={styles.text}>{rocketOrbit.Text2}</Text>
      <View style={styles.imageContainer}>
      <Image source={{ uri: rocketOrbit.Img }} style={styles.image} />
      </View>
      <Text style={styles.text}>{rocketOrbit.Text3}</Text>
      <Text style={styles.text}>{rocketOrbit.Text4}</Text>
    
    </View>
  )}

{documentName === 'Geosynchronous Orbit (GSO)' && (
    <View>
      <Text style={styles.Header}>{rocketOrbit.Title}</Text>
      <Text style={styles.text}>{rocketOrbit.Text}</Text>
      <Text style={styles.text}>{rocketOrbit.Text2}</Text>
      <Text style={styles.text}>{rocketOrbit.Text3}</Text>
      <View style={styles.imageContainer4}>
      <Image source={{ uri: rocketOrbit.Img }} style={styles.image} />
      </View>
      <Text style={styles.Header}>{rocketOrbit.Title2}</Text>
      <Text style={styles.text}>{rocketOrbit.Text4}</Text>
      <Text style={styles.text}>{rocketOrbit.Text5}</Text>
      <Text style={styles.text}>{rocketOrbit.Text6}</Text>
      <Text style={styles.text}>{rocketOrbit.Text7}</Text>
      <View style={styles.imageContainer3}>
      <Image source={{ uri: rocketOrbit.Img2 }} style={styles.image} />
      </View>
    </View>
  )}

{documentName === 'Semi - Synchronous Orbit ' && (
    <View>
      <Text style={styles.Header}>{rocketOrbit.Title}</Text>
      <Text style={styles.text}>{rocketOrbit.Text}</Text>
      <Text style={styles.text}>{rocketOrbit.Text2}</Text>
      <View style={styles.imageContainer4}>
      <Image source={{ uri: rocketOrbit.Img }} style={styles.image} />
      </View>
      <Text style={styles.text}>{rocketOrbit.Text3}</Text>
      <Text style={styles.text}>{rocketOrbit.Text4}</Text>
    </View>
  )}

{documentName === 'Lagrange Points' && (
    <View>
      <Text style={styles.Header}>{rocketOrbit.Title}</Text>
      <Text style={styles.text}>{rocketOrbit.Text}</Text>
      <Text style={styles.text}>{rocketOrbit.Text2}</Text>
      <View style={styles.imageContainer}>
      <Image source={{ uri: rocketOrbit.Img }} style={styles.image} />
      </View>
      <Text style={styles.text}>{rocketOrbit.Text3}</Text>
      <Text style={styles.text}>{rocketOrbit.Text4}</Text>
      <View style={styles.imageContainer}>
      <Image source={{ uri: rocketOrbit.Img2 }} style={styles.image} />
      </View>
    </View>
  )}

{documentName === 'Polar Orbit and Sun-Synchronous Orbit (SSO)' && (
    <View>
      <Text style={styles.Header}>{rocketOrbit.Title}</Text>
      <Text style={styles.text}>{rocketOrbit.Text}</Text>
      <Text style={styles.text}>{rocketOrbit.Text2}</Text>
      <View style={styles.imageContainer}>
      <Image source={{ uri: rocketOrbit.Img }} style={styles.image} />
      </View>
      <Text style={styles.text}>{rocketOrbit.Text3}</Text>
      <Text style={styles.text}>{rocketOrbit.Text4}</Text>
      <Text style={styles.text}>{rocketOrbit.Text5}</Text>
      <Text style={styles.text}>{rocketOrbit.Text6}</Text>
    </View>
  )}

{documentName === 'Transfer Orbits and Geostationary Transfer Orbit (GTO)' && (
    <View>
      <Text style={styles.Header}>{rocketOrbit.Title}</Text>
      <Text style={styles.text}>{rocketOrbit.Text}</Text>
      <Text style={styles.text}>{rocketOrbit.Text2}</Text>
      <View style={styles.imageContainer}>
      <Image source={{ uri: rocketOrbit.Img }} style={styles.image} />
      </View>
      <Text style={styles.text}>{rocketOrbit.Text3}</Text>
      <Text style={styles.text}>{rocketOrbit.Text4}</Text>
      <Text style={styles.text}>{rocketOrbit.Text5}</Text>
      <Text style={styles.text}>{rocketOrbit.Text6}</Text>
      <View style={styles.imageContainer}>
      <Image source={{ uri: rocketOrbit.Img2 }} style={styles.image} />
      </View>
    </View>
  )}

  {documentName === 'Molniya Orbit' && (
    <View>
      <Text style={styles.Header}>{rocketOrbit.Title}</Text>
      <Text style={styles.text}>{rocketOrbit.Text}</Text>
      <Text style={styles.text}>{rocketOrbit.Text2}</Text>
      <Text style={styles.text}>{rocketOrbit.Text3}</Text>
      <View style={styles.imageContainer5}>
      <Image source={{ uri: rocketOrbit.Img }} style={styles.image2} />
      </View>
      <Text style={styles.text}>{rocketOrbit.Text4}</Text>
      <Text style={styles.text}>{rocketOrbit.Text5}</Text>
      <Text style={styles.text}>{rocketOrbit.Text6}</Text>
      <Text style={styles.text}>{rocketOrbit.Text7}</Text>
      <Text style={styles.text}>{rocketOrbit.Text8}</Text>
      <Text style={styles.text}>{rocketOrbit.Text9}</Text>
      <View style={styles.imageContainer2}>
      <Image source={{ uri: rocketOrbit.Img2 }} style={styles.image2} />
      </View>
    </View>
  )}

{documentName === 'Tundra Orbit' && (
    <View>
      <Text style={styles.Header}>{rocketOrbit.Title}</Text>
      <Text style={styles.text}>{rocketOrbit.Text}</Text>
      <Text style={styles.text}>{rocketOrbit.Text2}</Text>
      <View style={styles.imageContainer3}>
      <Image source={{ uri: rocketOrbit.Img }} style={styles.image} />
      </View>
      <Text style={styles.text}>{rocketOrbit.Tex3}</Text>
      <Text style={styles.text}>{rocketOrbit.Text4}</Text>
      <Text style={styles.text}>{rocketOrbit.Text5}</Text>

    </View>
  )}
         
          </View>
        ))}
      </View>
    </ScrollView>
    </View>
    
  );
};



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
  imageContainer:{
    width: "100%",
    height: 300,
    marginBottom: 20,
  },

  imageContainer2:{
    width: "100%",
    height: 600,
    marginBottom: 20,
  },

  imageContainer3:{
    width: "100%",
    height: 230,
    marginBottom: 20,
  },

  imageContainer4:{
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  imageContainer5:{
    width: "100%",
    height: 400,
    marginBottom: 20,
  },

  image:{
    resizeMode: "contain",
    flex:1,
  },

  image2:{
    resizeMode: "contain",
    flex:1,
    
  },
  Header:{
    fontSize: 32,
    lineHeight: 40,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },

});

export default Orbit