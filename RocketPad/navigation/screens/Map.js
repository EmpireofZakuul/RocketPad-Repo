import { StyleSheet, Text, View} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import { collection, onSnapshot} from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { API_KEY } from '../../mapConfig';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Modal, Portal, PaperProvider, Appbar } from 'react-native-paper';
import {SafeAreaView } from 'react-native-safe-area-context';

const Map = () => {
  const [launchLocations, setLaunchLocations] = useState([]);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [markerSelected, setMarkerSelected] = useState(null);
  const mapRef = useRef(null);

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

  // const animateToRegion = (region) => {
  //   if (mapRef.current) {
  //     mapRef.current.animateToRegion(region, 3 * 1000);
  //   }
  // };

  const animateToRegion = (region) => {
    if (mapRef.current) {
      mapRef.current.animateCamera(
        {
          center: region,
        },
        { duration: 400 }
      );
    }
  };

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Map" />
      </Appbar.Header>

      <SafeAreaView style={styles.mapContainer}>
        <View style={styles.container}>
          <MapView
            style={styles.mapStyle}
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
            region={{
              latitude: 48.7485320459443,
              longitude: 10.464650688166566,
              latitudeDelta: 50,
              longitudeDelta: 50,
            }}
            customMapStyle={mapStyle}
            apiKey={API_KEY}
          >
            {launchLocations.map((sites, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: sites.Latitude,
                  longitude: sites.Longitude,
                }}
                pinColor={
                  markerSelected && markerSelected.id === sites.id
                    ? "#FF1694"
                    : sites.Status === "active"
                    ? "green"
                    : "red"
                }
                onPress={() => {
                  setMarkerSelected(sites);
                  // const newRegion = {
                  //   latitude: sites.Latitude,
                  //   longitude: sites.Longitude,
                  //   latitudeDelta: 10,
                  //   longitudeDelta: 10,
                  // };
                  // animateToRegion(newRegion);

                  animateToRegion({
                    latitude: sites.Latitude,
                    longitude: sites.Longitude,
                  });
                  showModal(sites);
                }}
              ></Marker>
            ))}
          </MapView>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColour, { backgroundColor: "#26a828" }]}
              />
              <Text style={styles.legendText}>Active Launch Sites</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={[styles.legendColour, { backgroundColor: "#fe3838" }]} />
              <Text style={styles.legendText}>Non-Active Launch Sites</Text>
            </View>
          </View>
          <Portal>
            <Modal
              visible={markerSelected && visible}
              onDismiss={() => {
                hideModal();
                setMarkerSelected(null);
              }}
            >
              <View
                style={[
                  styles.modalContainer,
                  { position: "absolute", top: 55, left: 15, right: 15 },
                ]}
              >
                <View style={styles.arrowContainer}>
                  <View style={styles.arrow} />
                </View>
                {markerSelected && (
                  <View style={styles.contentContainer}>
                    <Text style={styles.siteTitle}>{markerSelected.Name}</Text>
                    <Text style={styles.subTitle}>
                      <Text style={styles.bold}>County:</Text>{" "}
                      {markerSelected.Country}
                    </Text>
                    <Text style={styles.subTitle}>
                      <Text style={styles.bold}>Operationa Dates:</Text>{" "}
                      {markerSelected.OperationalDate}
                    </Text>
                    <Text style={styles.subTitle}>
                      <Text style={styles.bold}>Status:</Text>{" "}
                      {markerSelected.Status}
                    </Text>
                  </View>
                )}
              </View>
            </Modal>
          </Portal>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default Map;
const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8ec3b9",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1a3646",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#64779e",
      },
    ],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#334e87",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#283d6a",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6f9ba5",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3C7680",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#304a7d",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#2c6675",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#255763",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#b0d5ce",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#283d6a",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#3a4762",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#0e1626",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#4e6d70",
      },
    ],
  },
];
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
  mapContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  mapStyle: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    backgroundColor: "white",
    padding: 15,
  },
  modalContainer: {
    marginHorizontal: 15,
    backgroundColor: "white",
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
    fontSize: 20,
    textAlign: "center",
    marginBottom: 8,
    fontFamily: 'Roboto-Bold'
  },
  subTitle: {
    fontSize: 16,
    marginVertical: 3,
    fontFamily: 'Roboto-Regular',
  },
  bold: {
    fontFamily: 'Roboto-Bold'
  },

  arrowContainer: {
    position: "absolute",
    top: -5,
    left: "50%",
    width: 0,
    height: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
  },

  legend: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#1d2c4d",
    width: 260,
    height: 40,
    borderRadius: 4,
    overflow: "hidden",

    shadowColor: 'white',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 8,
  },
  legendItem: {
    alignItems: "center",
    width: 130,
  },
  legendColour: {
    width: 130,
    flex: 1,
    height: 10,
    borderColor: "transparent",
    borderWidth: 1,
    flexDirection: "row",
  },
  legendText: {
    fontSize: 10,
    color: "#8ec3b9",
    marginTop: 5,
    marginBottom: 5,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center'
  },
});