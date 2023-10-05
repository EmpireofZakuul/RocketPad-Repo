import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity, ScrollView , Keyboard, TextInput, LayoutAnimation, KeyboardAvoidingView, Dimensions } from 'react-native';
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

const Timeline = ({ navigation}) => {
  const [rockets, setRockets] = useState([]);
  const [loadingNews, setLoadingNews] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [countrySelected, setCountrySelected] = useState('');
  const [search, setSearch] = useState("");
  const resultsHeight = Dimensions.get('window').height * 0.35;  
  const CountryButtonSelected = (country) => {
    if (countrySelected === country) {
      setCountrySelected('');
    } else {
      setCountrySelected(country);
    }
  };

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

          RocketData.push(rocket);
        });

        const rocketsFiltered = countrySelected === '' ? RocketData : RocketData.filter((rocket) => rocket.ID === countrySelected);
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

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Rocket Timeline" />
      </Appbar.Header>

        <View style={styles.SearchBarContainer}>
        <View style={styles.SearchBarContainerItem}>
            <View style={ showSearchBar ? styles.searchBarClicked : styles.searchBarUnclicked}>
              < Feather name="search" size={20} color="grey" style={{ marginLeft: 1 }} />
              <TextInput style={styles.input} placeholder='Search' value={search} onChangeText={setSearch} onFocus={() =>  { LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut), setShowSearchBar(true)}}/>
            </View>

            {showSearchBar && (
            <View>
              <Button title="Cancel" onPress={() => {
                Keyboard.dismiss();
                setShowSearchBar(false);
                setSearch("");
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              }}></Button>
            </View >
            )}
          </View >
          
          {showSearchBar && (
          <View style={styles.filterContainer}>
            <TouchableOpacity style={[styles.buttons, countrySelected === 'United States' && styles.selectedButton]} onPress={() => CountryButtonSelected('United States')}><Text style={styles.buttonText}>USA</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.buttons, countrySelected === 'Europe' && styles.selectedButton]} onPress={() => CountryButtonSelected('Europe')}><Text style={styles.buttonText}>Europe</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.buttons, countrySelected === 'India' && styles.selectedButton]} onPress={() => CountryButtonSelected('India')}><Text style={styles.buttonText}>India</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.buttons, countrySelected === 'Japan' && styles.selectedButton]} onPress={() => CountryButtonSelected('Japan')}><Text style={styles.buttonText}>Japan</Text></TouchableOpacity>
          </View>
          )}
          
         

          {/* <KeyboardAvoidingView style={styles.searchResultsContainer} behavior="padding" enabled> */}
          <View style={styles.searchResultsContainer}>
            <ScrollView style={search.length > 0 ? { height: resultsHeight} : {}} keyboardShouldPersistTaps="always">
          {search !== "" && (
            rockets.filter((rocket) => rocket.Name.toLowerCase().startsWith(search.toLowerCase())).map((rocket) => (   
          <TouchableOpacity key={rocket.id} onPress={() =>{
            navigation.navigate("Rocket", { rocketId: rocket.id, rocketsImage: rocket.rocketImage, }); Keyboard.dismiss();}}>
            <View style={styles.searchResultsItems}>
          <Text style={styles.searchResultsText}>{rocket.Name}</Text>
          </View>
          </TouchableOpacity>
          )))}   
          </ScrollView>
          </View>
          {/* </KeyboardAvoidingView> */}
        </View>

      <View style={styles.container}>
        {loadingNews ? (
          <View>
            <View style={styles.loadingContainer}>
              <ActivityIndicator animating={true} color={MD2Colors.red800} size="large" />
            </View>
            <View style={styles.textLoadingContainer}><Text style={styles.textLoading}>Launching Rockets.......</Text></View>
          </View>
        ) : (
          <ScrollView>

            <FAB
              icon="family-tree"
              // icon="timeline-clock"
              style={styles.fab}
              onPress={() => navigation.navigate("Familytree")}
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
                      navigation.navigate("Rocket", { rocketId: rocket.id, rocketsImage: rocket.rocketImage, })
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
                              colors={['rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.2)', 'transparent']}
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
    marginBottom: 340,

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
    marginBottom: 30,
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
  textLoading: {
    fontFamily:'Roboto-Bold',
    fontSize: 20,
    color: "black",
  },
  textLoadingContainer: {
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
    fontSize: 16,
    textAlign: "center",
    fontFamily: 'Roboto-Bold'
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
    fontFamily: 'Roboto-Bold',
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
    fontSize: 26,
    fontFamily: 'Roboto-Bold',
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

  SearchBarContainer: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#fffbfe',
  },
  SearchBarContainerItem:{
    alignItems: 'center',
    flexDirection: 'row',
  },

  searchBarUnclicked: {
    padding: 10,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchBarClicked: {
    padding: 10,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
    fontFamily:'Roboto-Medium',
  },

  filterContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textContainer: {
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFilter: {
    fontSize: 20,
    fontFamily: 'Roboto-Medium'
  },

  buttons: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'transparent',
    backgroundColor: 'rgba(237, 237, 237, 0.8)',
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },

  buttonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: 'black'
  },
  selectedButton: {
    // backgroundColor: "#00b300"
    backgroundColor: "rgba(193, 192, 249, 1)",
  },
  cancelButton:{
    fontFamily:'Roboto-Regular',
    fontSize: 16,
  },

searchResultsContainer:{
  width: '100%',
},

  searchResultsItems:{
    paddingHorizontal: 10,
    justifyContent: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
searchResultsText:{
  fontFamily:'Roboto-Regular',
  fontSize: 16,
}
});









