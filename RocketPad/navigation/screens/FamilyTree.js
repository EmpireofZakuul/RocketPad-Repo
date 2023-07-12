import { View, Text,  StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { FAB } from 'react-native-paper';
import { Button } from 'react-native-paper';

const FamilyTree = ({ navigation }) => {

const [rocketPostion, setRocketPostion] = useState([]);
//   // {id: 1, name: 'Ariane 1', top: 0, left: 0}
//   {name: 'Ariane 1', top: 0, left: 0}
// ]);

// const rocketOrder = {
// Europe: ['Diamant A', 'Europa', 'Black Arrow','Diamant B','Diamant BP.4','Ariane 1', 'Ariane 2', 'Ariane 3','Ariane 40','Ariane 42 P','Ariane 42 L','Ariane 44 P', 'Ariane 44 LP', 'Ariane 44 L','Ariane 5 G','Ariane 5 G+','Ariane 5 GS','Ariane 5 ECA','Ariane 5 ES','Vega','Vega C',]
// };
    const [rocketsFamilyTree, setRocketsFamilyTree] = useState([]);
    const imgg = "https://designshack.net/wp-content/uploads/placeholder-image.png";
    // const [selectedCountry, setSelectedCountry] = useState([]);

  useEffect(() => {
    const rocketTreeRef = collection(FIRESTORE_DB, "Rockets");
    const subscribe = onSnapshot(rocketTreeRef, {
      next: (snapshot) => {
        const RocketDataTree = [];

        snapshot.docs.forEach((doc) => {
          const { Name, RocketCapacity, Stages, Variant } = doc.data();
          const rocketTree = {
            id: doc.id,
            Name,
            rocketCapacity: RocketCapacity,
            stages: Stages,
            variant: Variant,
            
            // top: 0,
            // left: 0,
          };


            RocketDataTree.push(rocketTree);
          
        });
        setRocketsFamilyTree(RocketDataTree);
      },
    });

    return () => subscribe();
  }, []);

  // useEffect(()=> {
  //   const rocketPositionsUpdated = rocketsFamilyTree.map((rocket) => {
  //     if(rocket.Name === 'Diamant A'){
  //       return {...rocket, top: 0, left: 100};
  //     }
     
  //     return rocket;
  //   });

  //   setRocketPostion(rocketPositionsUpdated);
  // }, [rocketsFamilyTree]);

  return (
    <View style={styles.container}>
      <ScrollView>
      <FAB
    icon="timeline-clock"
    style={styles.fab}
    onPress={() => navigation.navigate("timeline")}
  />


      <View>  
{/* {rocketPostion.map((rocket) => (   
<View key={rocket.id}> */}

{rocketsFamilyTree.map((rocket, index) => (   
<View key={index}>
  <View style={styles.rocketPosition}>
<TouchableOpacity 
                onPress={() =>
                  navigation.navigate("rocket", { rocketId: rocket.id })
                }
              >
                {/* <View style={[styles.cardContainer, {top: rocket.top, left: rocket.left }]}> */}
                <View style={styles.cardContainer}>
                  <View style={styles.card}>
                    <ImageBackground
                      source={{ uri: imgg }}
                      style={styles.image}
                    >
                      <Text style={styles.rocketName}>{rocket.Name}</Text>
                    </ImageBackground>
                  </View>
                </View>
              </TouchableOpacity>
              </View>
              </View>
              
))}
</View>
      </ScrollView>
    </View>
  )
}

export default FamilyTree

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        top: 0,
        right: 0,
        marginBottom: 40,
      },
      container: {
        marginHorizontal: 10,
        paddingTop: 10,
    // flex: 1,
      },
      cardContainer: {
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 40,
        marginTop: 40,
        // width: 160,
        // height: 160,
        // position: 'absolute',
        // top: 0,
        // left: 0,
      },

      card: {
      //  flex: 1,
      width: 160,
      height: 200,
      },
      image: {
        flex: 1,
        resizeMode: "contain",
        justifyContent: "flex-end",
        alignItems: "center",
      },
      rocketName: {
        fontWeight: "bold",
        fontSize: 18,
        color: "white",
        marginBottom: 20,
        zIndex: 1,
        textAlign: "center",
      },

      rocketPosition: {
        // position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
      }
})