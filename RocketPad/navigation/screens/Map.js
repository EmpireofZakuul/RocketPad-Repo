import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, onPress, Pressable} from 'react-native'
import React, {useEffect, useState} from 'react'
import { collection, query, onSnapshot, where, doc, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { API_KEY } from '../../mapConfig';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Modal, Portal, PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Map = () => {
  const [launchLocations, setLaunchLocations] = useState([]);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [markerSelected, setMarkerSelected] = useState(null);

  useEffect(() => {
    const orbitsRef = collection(FIRESTORE_DB, "LaunchSites");
    const subscribe = onSnapshot(orbitsRef, {
      next: (snapshot) => {
        console.log("updated");

        const locations = [];
        snapshot.docs.forEach((doc) => {
          console.log(doc.id);
          locations.push({ id: doc.id, ...doc.data() });
        });

        setLaunchLocations(locations);
      },
    });

    return () => subscribe();
  }, []);

  return (
   <PaperProvider>
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
<MapView
style={styles.mapStyle}
 provider= {PROVIDER_GOOGLE}
 initialRegion = {{
  latitude:  48.7485320459443,
  longitude: 10.464650688166566,
  latitudeDelta: 150,
  longitudeDelta:150,
 
    }}
    customMapStyle={mapStyle}
    apiKey={API_KEY}>
   {launchLocations.map((sites, index) => (
  

 <Marker
 key={index}
 coordinate={{
  latitude:sites.Latitude,
  longitude: sites.Longitude,
 }}
 pinColor={markerSelected && markerSelected.id === sites.id ? "#FF1694" : sites.Status === "active" ? "green" : "red"}
 onPress={() =>{
  setMarkerSelected(sites);
  // setVisible(true);
 showModal(sites)
 }}
  />
  ))} 
  </MapView>
 <Portal>
  <Modal visible={markerSelected && visible}  onDismiss={() => {hideModal(); setMarkerSelected(null); }}>
             {/* <Modal visible={markerSelected && visible}  onRequestClose={() => {
            setVisible(!visible);
          }}> */}
            <View style={styles.modalContainer}>
              {/* <Button onPress={() => setVisible(false)}></Button> */}

              
              {/* <Pressable
                style={styles.button}
                onPress={() => setVisible(!visible)}
              >
                <Icon
                  style={styles.icon}
                  name="window-close"
                  size={30}
                  color="black"
                />
              </Pressable> */}

              {markerSelected && (
                <View style={styles.contentContainer}>
              <Text style={styles.siteTitle}>{markerSelected.Name}</Text>
              <Text style={styles.subTitle}><Text style={styles.bold}>County:</Text> {markerSelected.Country}</Text>
              <Text style={styles.subTitle}><Text style={styles.bold}>Operationa Dates:</Text> {markerSelected.OperationalDate}</Text>
              <Text style={styles.subTitle}><Text style={styles.bold}>Status:</Text> {markerSelected.Status}</Text>
              </View>
              )}
            </View>
          </Modal>
          </Portal>
          </View>
          
    </SafeAreaView>
    </PaperProvider>
  );
}

export default Map
const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    backgroundColor: "white",
    padding: 15,
  },
  modalContainer: {
    marginHorizontal: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "transparent",
    width: 56,
    height: 56,
    zIndex: 2,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "black",
  },

  siteTitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
    // borderWidth: 1,
    // borderColor: 'green',
    // width: 300
  },
  subTitle: {
    fontSize: 13,
    marginVertical: 3,
  },
  bold:{
    fontWeight:'bold'
  }
});