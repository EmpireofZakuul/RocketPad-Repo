import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity, ScrollView , Keyboard, TextInput} from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import moment from 'moment';
import { ActivityIndicator, MD2Colors, FAB, Card, Appbar, SegmentedButtons   } from 'react-native-paper';
import { Feather, Entypo } from "@expo/vector-icons";
// import {LinearGradient} from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';

const formatDate = (date) => {
  const formattedDate = moment(date, "DD MMMM YYYY").format("DD MMMM YYYY");
  return formattedDate;
};

// const imgg = "https://designshack.net/wp-content/uploads/placeholder-image.png";

const Timeline = ({ navigation, clicked, searchPhrase, setSearchPhrase, setClicked}) => {
  const [rockets, setRockets] = useState([]);
  const [loadingNews, setLoadingNews] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [countrySelected, setCountrySelected] = useState('');

  useEffect(() => {
    setLoadingNews(true);
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
          const { Name, RocketCapacity, Stages, Variant, images, img, ID } = doc.data();
          const rocket = {
            id: doc.id,
            Name,
            image: img,
            rocketImage: images,
            rocketCapacity: RocketCapacity,
            stages: Stages,
            FirstLaunch: formattedDate,
            variant: Variant,
            ID: ID
          };

          // if (rocket.variant === "No") {
            RocketData.push(rocket);
          // }
        });

        const rocketsFiltered = countrySelected === '' ? RocketData: RocketData.filter((rocket) => rocket.ID === countrySelected);
        console.log(RocketData),
          console.log("Number of documents:", snapshot.docs.length);

          rocketsFiltered.sort((a, b) =>
          moment(b.FirstLaunch, "DD MMMM YYYY").diff(moment(a.FirstLaunch, "DD MMMM YYYY"))
        );
        setRockets(rocketsFiltered);
        console.log("Number of documents Filtered :", rocketsFiltered.length);
        setLoadingNews(false);
      },
    });

    return () => subscribe();
  }, [countrySelected]);


  // const searchRockets = rockets.filter((rocket) =>{
  //   const rocketName = rocket.Name.toLowerCase().includes(searchPhrase.toLowerCase());
  //   // const rocketContinent = rocket.id.toLowerCase().includes(searchPhrase.toLowerCase());
  //   return rocketName 
  // }, [searchPhrase]);

  return (
   <View>
     <Appbar.Header>
   
    <Appbar.Content title="Rocket Timeline" />
    <Appbar.Action icon="magnify" onPress={() => setShowSearchBar(true)} />
  </Appbar.Header>

  {showSearchBar && (
  <View style={styles.SearchBarContainer}>

    <View style={styles.searchItems}>
  <View style={styles.searchBar}>
< Feather name="search" size={20} color="black" style={{marginLeft: 1}}/>

<TextInput style={styles.input} placeholder='Search' value={searchPhrase} onChangeText={setSearchPhrase} onFocus={() => {
  setClicked(true);
}}/>

{searchPhrase !== ""  && (
  <Entypo name='cross' size={20} color="black" style={{padding: 1}} onPress={() => {
    setSearchPhrase("")
  }}/>
)}
 </View>

    <View>
      <Button title='Cancel' onPress={() => {
        Keyboard.dismiss();
        setShowSearchBar(false);
      }}></Button>
  </View >
  </View>
  

  <View style={styles.filterContainer}>
  <SegmentedButtons
        value={countrySelected}
        onValueChange={(country) => {
          setCountrySelected((prevCountry) => (prevCountry === country ? '' : country));
        }}
        buttons={[
          {
            value: 'United States',
            label: 'USA',
          },
          {
            value: 'Europe',
            label: 'Europe',
          },
          { 
            value: 'India', 
            label: 'India' 
          },
          { 
            value: 'Japan', 
            label: 'Japan' 
          },
        ]}
      />
  </View>

  </View>

  )} 
    <View style={styles.container}>
      {loadingNews ?(
        <View>
          <View style={styles.loadingContainer}>
<ActivityIndicator animating={true} color={MD2Colors.red800}  size="large"/>
          </View>
          <View style={styles.textLoadingContainer}><Text style={styles.textLoading}>Launching Rockets.......</Text></View>
          </View>
      ) : (
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
                  navigation.navigate("rocket", { rocketId: rocket.id, rocketsImage: rocket.rocketImage, })
                }
              >
                 <Card>
                <View style={styles.cardContainer}>
                  <View style={styles.card}>
                    <ImageBackground
                      source={{ uri: rocket.image }}
                      style={styles.image}
                    >
                      <LinearGradient
                colors={['rgba(0, 0, 0, 0.9)','rgba(0, 0, 0, 0.2)', 'transparent']}
                style={styles.gradient}
                start={[0.5, 1]}
                end={[0.5, 0.5]}
              />
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
      )}
    </View>

  </View>
    
  );
};

export default Timeline;

const styles = StyleSheet.create({

  container: {
    marginHorizontal: 10,
    marginBottom: 220,
  
  },
//   rockets:{
// marginTop: 30,
//   },
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
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
textLoading:{
    fontWeight: "bold",
    fontSize: 22,
    color: "black",
},
textLoadingContainer:{
  justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
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
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: '10%',
  },
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

  SearchBarContainer:{
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '90%',
    alignSelf: 'center',
      },

      searchItems:{
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'center',
        lignItems: 'center',
      },
      
      searchBar:{
    padding: 10,
    flexDirection: 'row',
    width: '85%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
      },
      input:{
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
      },

      filterContainer: {
      marginTop: 10,
      width: '90%',
    },

});









