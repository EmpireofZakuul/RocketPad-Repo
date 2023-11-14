
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
    <Appbar.Header style={{backgroundColor: '#211F26'}}>
      <Appbar.Content title="Orbits" titleStyle={styles.appbarText}/>
    </Appbar.Header>

    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {orbits.map((RocketOrbit, index) => (
          <View key={index}>
            <Text style={styles.Header}>{RocketOrbit.Title}</Text>
            {/* <Image source={{ uri: RocketOrbit.Img3 }} style={styles.image} /> */}
            <Text style={styles.text}>{RocketOrbit.Text}</Text>
            <Text style={styles.text}>{RocketOrbit.Text2}</Text>
            <Text style={styles.Header}>{RocketOrbit.OrbitsTitle}</Text>

            <ScrollView horizontal={true} style={styles.horizontalContainer} showsHorizontalScrollIndicator={false}>
              <View style={styles.orbitsContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Orbit", {
                    documentName: "Low Earth Orbit (LEO)",
                  })
                }
              >
                <View style={styles.card}>
                  <ImageBackground
                    source={{uri: RocketOrbit.OrbitsImage}} style={styles.imageOrbit}>
                    <LinearGradient
                      colors={[
                        "rgba(0, 0, 0, 0.5)",
                        "rgba(0, 0, 0, 0.2)",
                        "transparent",
                      ]}
                      style={styles.gradient}
                      start={[0.5, 1]}
                      end={[0.5, 0.4]}
                    />
                    <Text style={styles.textOrbit}>{RocketOrbit.Orbits}</Text>
                  </ImageBackground>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Orbit", {
                    documentName: "Medium Earth Orbit (MEO)",
                  })
                }
              >
                <View style={styles.card}>
                  <ImageBackground source={{uri: RocketOrbit.OrbitsImage2}} style={styles.imageOrbit}>
                    <LinearGradient
                      colors={[
                        "rgba(0, 0, 0, 0.5)",
                        "rgba(0, 0, 0, 0.2)",
                        "transparent",
                      ]}
                      style={styles.gradient}
                      start={[0.5, 1]}
                      end={[0.5, 0.4]}
                    />
                    <Text style={styles.textOrbit}>{RocketOrbit.Orbits2}</Text>
                  </ImageBackground>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Orbit", {
                    documentName: "Geostationary Orbit (GEO)",
                  })
                }
              >
                <View style={styles.card}>
                  <ImageBackground
                    source={{uri: RocketOrbit.OrbitsImage3}} style={styles.imageOrbit}>
                    <LinearGradient
                      colors={[
                        "rgba(0, 0, 0, 0.5)",
                        "rgba(0, 0, 0, 0.2)",
                        "transparent",
                      ]}
                      style={styles.gradient}
                      start={[0.5, 1]}
                      end={[0.5, 0.4]}
                    />
                    <Text style={styles.textOrbit}>{RocketOrbit.Orbits3}</Text>
                  </ImageBackground>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Orbit", {
                    documentName: "Geosynchronous Orbit (GSO)",
                  })
                }
              >
                <View style={styles.card}>
                  <ImageBackground
                    source={{uri: RocketOrbit.OrbitsImage4}} style={styles.imageOrbit}>
                    <LinearGradient
                      colors={[
                        "rgba(0, 0, 0, 0.5)",
                        "rgba(0, 0, 0, 0.2)",
                        "transparent",
                      ]}
                      style={styles.gradient}
                      start={[0.5, 1]}
                      end={[0.5, 0.4]}
                    />
                    <Text style={styles.textOrbit}>{RocketOrbit.Orbits4}</Text>
                  </ImageBackground>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Orbit", {
                    documentName: "Semi - Synchronous Orbit ",
                  })
                }
              >
                <View style={styles.card}>
                  <ImageBackground
                    source={{uri: RocketOrbit.OrbitsImage5}} style={styles.imageOrbit}>
                    <LinearGradient
                      colors={[
                        "rgba(0, 0, 0, 0.5)",
                        "rgba(0, 0, 0, 0.2)",
                        "transparent",
                      ]}
                      style={styles.gradient}
                      start={[0.5, 1]}
                      end={[0.5, 0.4]}
                    />
                    <Text style={styles.textOrbit}>{RocketOrbit.Orbits5}</Text>
                  </ImageBackground>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Orbit", {
                    documentName: "Lagrange Points",
                  })
                }
              >
                <View style={styles.card}>
                  <ImageBackground
                    source={{uri: RocketOrbit.OrbitsImage6}} style={styles.imageOrbit}>
                    <LinearGradient
                      colors={[
                        "rgba(0, 0, 0, 0.5)",
                        "rgba(0, 0, 0, 0.2)",
                        "transparent",
                      ]}
                      style={styles.gradient}
                      start={[0.5, 1]}
                      end={[0.5, 0.4]}
                    />
                    <Text style={styles.textOrbit}>{RocketOrbit.Orbits6}</Text>
                  </ImageBackground>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Orbit", {
                    documentName: "Polar Orbit and Sun-Synchronous Orbit (SSO)",
                  })
                }
              >
                <View style={styles.card}>
                  <ImageBackground
                    source={{uri: RocketOrbit.OrbitsImage7}}style={styles.imageOrbit}>
                    <LinearGradient
                      colors={[
                        "rgba(0, 0, 0, 0.5)",
                        "rgba(0, 0, 0, 0.2)",
                        "transparent",
                      ]}
                      style={styles.gradient}
                      start={[0.5, 1]}
                      end={[0.5, 0.4]}
                    />
                    <Text style={styles.textOrbit}>{RocketOrbit.Orbits7}</Text>
                  </ImageBackground>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Orbit", {
                    documentName:
                      "Transfer Orbits and Geostationary Transfer Orbit (GTO)",
                  })
                }
              >
                <View style={styles.card}>
                  <ImageBackground
                    source={{uri: RocketOrbit.OrbitsImage8}} style={styles.imageOrbit}>
                    <LinearGradient
                      colors={[
                        "rgba(0, 0, 0, 0.5)",
                        "rgba(0, 0, 0, 0.2)",
                        "transparent",
                      ]}
                      style={styles.gradient}
                      start={[0.5, 1]}
                      end={[0.5, 0.4]}
                    />
                    <Text style={styles.textOrbit}>{RocketOrbit.Orbits8}</Text>
                  </ImageBackground>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Orbit", {
                    documentName: "Molniya Orbit",
                  })
                }
              >
                <View style={styles.card}>
                  <ImageBackground
                    source={{uri: RocketOrbit.OrbitsImage9}} style={styles.imageOrbit}>
                    <LinearGradient
                      colors={[
                        "rgba(0, 0, 0, 0.5)",
                        "rgba(0, 0, 0, 0.2)",
                        "transparent",
                      ]}
                      style={styles.gradient}
                      start={[0.5, 1]}
                      end={[0.5, 0.4]}
                    />
                    <Text style={styles.textOrbit}>{RocketOrbit.Orbits9}</Text>
                  </ImageBackground>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Orbit", { documentName: "Tundra Orbit" })
                }
              >
                <View style={styles.card}>
                  <ImageBackground
                    source={{uri: RocketOrbit.OrbitsImage10}} style={styles.imageOrbit}>
                    <LinearGradient
                      colors={[
                        "rgba(0, 0, 0, 0.5)",
                        "rgba(0, 0, 0, 0.2)",
                        "transparent",
                      ]}
                      style={styles.gradient}
                      start={[0.5, 1]}
                      end={[0.5, 0.4]}
                    />
                    <Text style={styles.textOrbit}>{RocketOrbit.Orbits10}</Text>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
              </View>
            </ScrollView>
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
  fontFamily: 'Roboto-Regular'
  },
  image:{
    width: '100%',
    height: 200,
    marginBottom: 20,
    
  },
  Header:{
    fontSize: 26,
    lineHeight: 40,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold'
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
    marginBottom: 20,
    marginHorizontal: 15,
    overflow: "hidden",
  },
  textOrbit:{
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: 'white',
    fontFamily: 'Roboto-Medium',
    textAlign: 'center'
  },

  orbitsContainer:{
    flexDirection: 'row',
  },

  horizontalContainer:{
    marginHorizontal: -20,
  },
  appbarText: {
    fontFamily: 'Roboto-Regular',
    color: '#FFFFFF'
  }

});