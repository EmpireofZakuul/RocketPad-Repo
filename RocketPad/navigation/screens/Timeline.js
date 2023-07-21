import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import moment from 'moment';
import { FAB, Card, } from 'react-native-paper';

// import DropShadow from "react-native-drop-shadow";  
// import {getStorage, ref, getDownloadURL} from 'firebase/storage';
// import LinearGradient from 'react-native-linear-gradient';

const formatDate = (date) => {
  const formattedDate = moment(date, "DD MMMM YYYY").format("DD MMMM YYYY");
  return formattedDate;
};

// const imgg = "https://designshack.net/wp-content/uploads/placeholder-image.png";

const Timeline = ({ navigation }) => {
  const [rockets, setRockets] = useState([]);

  useEffect(() => {
    const rocketsRef = collection(FIRESTORE_DB, "Rockets");
    const sortedRocketsQuery = query(
      rocketsRef,
      orderBy("FirstLaunch", "asc")
    );
    const subscribe = onSnapshot(sortedRocketsQuery, {
      next: (snapshot) => {
        const RocketData = [];

        snapshot.docs.forEach((doc) => {
          const formattedDate = formatDate(doc.data().FirstLaunch);
          const { Name, RocketCapacity, Stages, Variant, images, img } = doc.data();
          const rocket = {
            id: doc.id,
            Name,
            image: img,
            rocketImage: images,
            rocketCapacity: RocketCapacity,
            stages: Stages,
            FirstLaunch: formattedDate,
            variant: Variant,
      
          };

          if (rocket.variant === "No") {
            RocketData.push(rocket);
          }
        });
        console.log(RocketData),
          console.log("Number of documents:", snapshot.docs.length);

        RocketData.sort((a, b) =>
          moment(b.FirstLaunch, "DD MMMM YYYY").diff(moment(a.FirstLaunch, "DD MMMM YYYY"))
        );
        setRockets(RocketData);
      },
    });

    return () => subscribe();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>

      <FAB
    icon="family-tree"
    // icon="timeline-clock"
    style={styles.fab}
    onPress={() => navigation.navigate("familytree")}
  />


        <Text style={styles.topText}>Present Day</Text>
        <View style={styles.timeline}>
          <View style={styles.lineContainer}>
            <View style={styles.horizLine}></View>
            <View style={styles.vertLine}></View>
          </View>
          {rockets.map((rocket, index) => (
            <View
              style={[
                styles.rocketContainer,
                index % 2 !== 0 && styles.mirroredContainer,
              ]}
              key={index}
            >
              <View style={styles.dateContainer}>
                <Text style={styles.date}>{rocket.FirstLaunch}</Text>
              </View>
              <View style={styles.line} />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("rocket", { rocketId: rocket.id, rocketsImage: rocket.rocketImage})
                }
              >
                 <Card>
                <View style={styles.cardContainer}>
                  <View style={styles.card}>
                    <ImageBackground
                      source={{ uri: rocket.image }}
                      style={styles.image}
                    >
                      {/* <LinearGradient
                colors={['rgba(0, 0, 0, 0.9)', 'transparent']}
                style={styles.gradient}
                start={[0.5, 1]}
                end={[0.5, 0.5]}
              /> */}
                     <Text style={styles.rocketName}>{rocket.Name}</Text>
                    </ImageBackground>
                  </View>
                
                </View>
                </Card>
              </TouchableOpacity> 
   
            </View>

          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Timeline;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingTop: 10,
    // borderColor: 'black',
    // borderWidth: 2,
  },
  timeline: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  rocketContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 40,
  },

  cardContainer: {
    borderRadius: 12,
    overflow: "hidden",
  

    // elevation: 5,
  },
  dateContainer: {
    width: 150,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  date: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  line: {
    flex: 1,
    borderBottomColor: "black",
    borderBottomWidth: 4,
  },
  card: {
    width: 160,
    height: 200,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  // gradient: {
  //   position: 'absolute',
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   top: '10%',
  // },
  rocketName: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
    marginBottom: 20,
    zIndex: 1,
    textAlign: "center",
  },

  lineContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "50%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  horizLine: {
    borderBottomColor: "black",
    borderBottomWidth: 4,
    width: "7000%",
    top: 0,
  },
  vertLine: {
    borderLeftColor: "black",
    borderLeftWidth: 4,
    height: "100%",
  },
  topText: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 80,
  },

  mirroredContainer: {
    flexDirection: "row-reverse",
  },

  fab: {
    position: 'absolute',
    margin: 16,
    top: 0,
    right: 0,
    marginBottom: 40,
  },

});









