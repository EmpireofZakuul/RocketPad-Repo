import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, where, doc, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { useRoute } from '@react-navigation/native';
import { useNavigation} from '@react-navigation/native';


const Orbit = () => {
  
  const [rocketOrbits, setRocketOrbit] = useState([]);

// const route = useRoute();
// const documentName = route.params?.documentName;

const route = useRoute();
const documentName = route.params?.documentName;


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

    <ScrollView>
      <View style={styles.container}>
        {rocketOrbits.map((rocketOrbit, index) => (
          <View key={index}>

{documentName === 'Low Earth Orbit (LEO)' && (
    <View>
      <Text style={styles.Header}>{rocketOrbit.Title}</Text>
      <Text style={styles.text}>{rocketOrbit.Text}</Text>
      <Text style={styles.text}>{rocketOrbit.Text2}</Text>
      <Image source={{ uri: rocketOrbit.Img }} style={styles.image} />
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
      <Text style={styles.text}>{rocketOrbit.Text2}</Text>
      <Image source={{ uri: rocketOrbit.Img }} style={styles.image} />
    </View>
  )}

{documentName === 'Geostationary Orbit (GEO)' && (
    <View>
      <Text style={styles.Header}>{rocketOrbit.Title}</Text>
      <Text style={styles.text}>{rocketOrbit.Text}</Text>
      <Text style={styles.text}>{rocketOrbit.Text2}</Text>
      <Image source={{ uri: rocketOrbit.Img }} style={styles.image} />
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
      <Image source={{ uri: rocketOrbit.Img }} style={styles.image} />
      <Text style={styles.Header}>{rocketOrbit.Title2}</Text>
      <Text style={styles.text}>{rocketOrbit.Text4}</Text>
      <Text style={styles.text}>{rocketOrbit.Text5}</Text>
      <Text style={styles.text}>{rocketOrbit.Text6}</Text>
      <Text style={styles.text}>{rocketOrbit.Text7}</Text>
      <Image source={{ uri: rocketOrbit.Img2 }} style={styles.image} />
    </View>
  )}

{documentName === 'Semi - Synchronous Orbit ' && (
    <View>
      <Text style={styles.Header}>{rocketOrbit.Title}</Text>
      <Text style={styles.text}>{rocketOrbit.Text}</Text>
      <Text style={styles.text}>{rocketOrbit.Text2}</Text>
      <Image source={{ uri: rocketOrbit.Img }} style={styles.image} />
      <Text style={styles.text}>{rocketOrbit.Text3}</Text>
      <Text style={styles.text}>{rocketOrbit.Text4}</Text>
    </View>
  )}

{documentName === 'Lagrange Points' && (
    <View>
      <Text style={styles.Header}>{rocketOrbit.Title}</Text>
      <Text style={styles.text}>{rocketOrbit.Text}</Text>
      <Text style={styles.text}>{rocketOrbit.Text2}</Text>
      <Image source={{ uri: rocketOrbit.Img }} style={styles.image} />
      <Text style={styles.text}>{rocketOrbit.Text3}</Text>
      <Text style={styles.text}>{rocketOrbit.Text4}</Text>
      <Image source={{ uri: rocketOrbit.Img2 }} style={styles.image} />
    </View>
  )}

{documentName === 'Polar Orbit and Sun-Synchronous Orbit (SSO)' && (
    <View>
      <Text style={styles.Header}>{rocketOrbit.Title}</Text>
      <Text style={styles.text}>{rocketOrbit.Text}</Text>
      <Text style={styles.text}>{rocketOrbit.Text2}</Text>
      <Image source={{ uri: rocketOrbit.Img }} style={styles.image} />
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
      <Image source={{ uri: rocketOrbit.Img }} style={styles.image} />
      <Text style={styles.text}>{rocketOrbit.Text3}</Text>
      <Text style={styles.text}>{rocketOrbit.Text4}</Text>
      <Text style={styles.text}>{rocketOrbit.Text5}</Text>
      <Text style={styles.text}>{rocketOrbit.Text6}</Text>
      <Image source={{ uri: rocketOrbit.Img2 }} style={styles.image} />
    </View>
  )}

  {documentName === 'Molniya Orbit' && (
    <View>
      <Text style={styles.Header}>{rocketOrbit.Title}</Text>
      <Text style={styles.text}>{rocketOrbit.Text}</Text>
      <Text style={styles.text}>{rocketOrbit.Text2}</Text>
      <Text style={styles.text}>{rocketOrbit.Text3}</Text>
      <Image source={{ uri: rocketOrbit.Img }} style={styles.image2} />
      <Text style={styles.text}>{rocketOrbit.Text4}</Text>
      <Text style={styles.text}>{rocketOrbit.Text5}</Text>
      <Text style={styles.text}>{rocketOrbit.Text6}</Text>
      <Text style={styles.text}>{rocketOrbit.Text7}</Text>
      <Text style={styles.text}>{rocketOrbit.Text8}</Text>
      <Text style={styles.text}>{rocketOrbit.Text9}</Text>
      <Image source={{ uri: rocketOrbit.Img2 }} style={styles.image2} />
    </View>
  )}

{documentName === 'Tundra Orbit' && (
    <View>
      <Text style={styles.Header}>{rocketOrbit.Title}</Text>
      <Text style={styles.text}>{rocketOrbit.Text}</Text>
      <Text style={styles.text}>{rocketOrbit.Text2}</Text>
      <Image source={{ uri: rocketOrbit.Img }} style={styles.image} />
      <Text style={styles.text}>{rocketOrbit.Tex3}</Text>
      <Text style={styles.text}>{rocketOrbit.Text4}</Text>
      <Text style={styles.text}>{rocketOrbit.Text5}</Text>

    </View>
  )}
         
          </View>
        ))}
      </View>
    </ScrollView>

    
  );
};



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
    maxWidth: '100%',
    height: 300,
    marginBottom: 20,
    
  },

  image2:{
    width: '100%',
    height: 600,
    marginBottom: 20,
    
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