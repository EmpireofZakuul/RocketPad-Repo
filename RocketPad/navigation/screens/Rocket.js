import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, where, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';
import { FIRESTORE_DB, FIRESTORE_STORAGE } from '../../firebaseConfig';
import { useRoute } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import moment from 'moment';
import { color } from 'react-native-elements/dist/helpers';

const Rocket = () => {
  const [rocket, setRocket] = useState({});
  const [rocketImage, setRocketImage] = useState({});
  const route = useRoute();
  const rocketId = route.params?.rocketId;

  useEffect(() => {
    console.log("Fetching data for rocket:", rocketId);
    const rocketRef = doc(FIRESTORE_DB, "Rockets", rocketId);
    const fetchData = async () => {
      const rocketDocument = await getDoc(rocketRef);

      if (rocketDocument.exists()) {
        const rocketData = rocketDocument.data();
        // console.log('Fetched rocket data:', rocketData);
        // console.log('RocketCapacity:', rocketData.RocketCapacity);
        // console.log('Stages:', rocketData.Stages);
        setRocket({
          id: rocketDocument.id,
          ...rocketData,
          RocketCapacity: rocketData.RocketCapacity,
          Stages: rocketData.Stages,
        });
        // console.log('Rocket Document:', rocketDocument.data());
      } else {
        console.log("No such document!");
      }
    };
    fetchData();
  }, [rocketId]);

//   useEffect(() => {
//     const getImages = async () => {
//       const storage = getStorage(FIRESTORE_STORAGE);
//       const rocketImages = ref(storage, rocket.imageFolderPath);
//       const imageList = await listAll(rocketImages);
//       const urls = await Promise.all(imageList.items.map((rocketImages) => getDownloadURL(rocketImages)));
//       setRocketImage(urls)
//     }
// getImages();
//   }, [rocket.imageFolderPath])


useEffect(() => {
  console.log('rocket.imageFolderPath:', rocket.imageFolderPath);
  console.log('getImages function called');
  const getImages = async () => {
    try {
      const storage = getStorage(FIRESTORE_STORAGE);
      const rocketImages = ref(storage, rocket.imageFolderPath);
      const imageList = await listAll(rocketImages);
      const urls = await Promise.all(
        imageList.items.map((rocketImage) => getDownloadURL(rocketImage))
      );
      setRocketImage(urls);
    } catch (error) {
      console.log("Error retrieving images:", error);
    }
  };

  getImages();
}, [rocket.imageFolderPath]);

  const imgg =
    "https://designshack.net/wp-content/uploads/placeholder-image.png";

  // console.log('Rocket:', rocket); // Add this console.log statement

  return (
    <ScrollView>
      <Text style={styles.Header}>{rocket.Name}</Text>
      <View style={styles.container}>
      <View style={styles.imageContainer}>
      {rocketImage.slice(0,4).map((url, index) => (
            <View key={index} style={styles.smallImageContainer}>
            <Image source={{ uri: url }} style={styles.image} />
            </View>
          ))}
        {rocketImage.length > 4 && (
          <View style={styles.numberImages}>
            <Text style={styles.numberText}>
              +{rocketImage.length - 4}
              
            </Text>
          </View>
        )}
       
      </View>
      </View>
      <View style={styles.dividerColour}>
        <Divider style={styles.divider} />
        <Text style={styles.dividerText}> {rocket.Name} Information</Text>
        <Divider style={styles.divider} />
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.leftSideText}>Country of Origin:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.rightSideText}>{rocket.Country}</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.leftSideText}>Rocket Function:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.rightSideText}>{rocket.RocketFunction}</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.leftSideText}>Cost Per Launch:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.rightSideText}>{rocket.LaunchCost}</Text>
        </View>
      </View>

      <View style={styles.dividerColour}>
        <Divider style={styles.divider} />
        <Text style={styles.dividerText}> {rocket.Name} Launch History</Text>
        <Divider style={styles.divider} />
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.leftSideText}>Staus:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.rightSideText}>{rocket.Status}</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.leftSideText}>Launch Location:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.rightSideText}>{rocket.LaunchSite}</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.leftSideText}>Total Launches:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.rightSideText}>{rocket.TotalLaunches}</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.leftSideText}>Successes:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.rightSideText}>{rocket.Success}</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.leftSideText}>Failures:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.rightSideText}>{rocket.Failures}</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.leftSideText}>Rocket Success Rate:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.rightSideText}>{((rocket.Success / (rocket.TotalLaunches)) * 100).toFixed(2)}%</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.leftSideText}>First Launch:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.rightSideText}>{rocket.FirstLaunch}</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.leftSideText}>Last Launch:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.rightSideText}>{rocket.LastLaunch}</Text>
        </View>
      </View>


      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imgg }} style={styles.image} />
        </View>
      </View>

      <View style={styles.dividerColour}>
        <Divider style={styles.divider} />
        <Text style={styles.dividerText}>
          {" "}
          {rocket.Name} Technical Specifications
        </Text>
        <Divider style={styles.divider} />
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.leftSideText}>Rocket Height:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.rightSideText}>{rocket.RocketHeight}</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.leftSideText}>Rocket Diameter:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.rightSideText}>{rocket.RocketDiameter}</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.leftSideText}>Mass:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.rightSideText}>{rocket.Mass}</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.leftSideText}>Fairing Height:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.rightSideText}>{rocket.FairingHeight}</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.leftSideText}>Fairing Diameter:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.rightSideText}>{rocket.FairingDiameter}</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.leftSideText}>Rocket Stages:</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.rightSideText}>{rocket.RocketStages}</Text>
        </View>
      </View>

      {rocket.Stages &&
        rocket.Stages.map((stage, index) => (
          <View key={`stage_${index}`}>
            <View style={styles.dividerColour}>
              <Divider style={styles.divider} />
              <Text style={styles.dividerText}>{stage.Stage} </Text>
              <Divider style={styles.divider} />
            </View>

            <View style={styles.tableContainer}>
              <View style={styles.leftContainer}>
                <Text style={styles.leftSideText}>Powered By:</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.rightSideText}>
                  {stage.EngineNumbers} - {stage.PoweredBy} {stage.EngineType}
                </Text>
              </View>
            </View>

            {/* <View style={styles.tableContainer}>
              <View style={styles.leftContainer}>
                <Text style={styles.leftSideText}>Engine:</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.rightSideText}>{stage.EngineType}</Text>
              </View>
            </View> */}

            <View style={styles.tableContainer}>
              <View style={styles.leftContainer}>
                <Text style={styles.leftSideText}>Engine Cycle:</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.rightSideText}>{stage.EngineCycle}</Text>
              </View>
            </View>

            <View style={styles.tableContainer}>
              <View style={styles.leftContainer}>
                <Text style={styles.leftSideText}>Thrust:</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.rightSideText}>{stage.RocketThrust}</Text>
              </View>
            </View>

            <View style={styles.tableContainer}>
              <View style={styles.leftContainer}>
                <Text style={styles.leftSideText}>Propellant:</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.rightSideText}>{stage.RocketPropellant}</Text>
              </View>
            </View>

            <View style={styles.tableContainer}>
              <View style={styles.leftContainer}>
                <Text style={styles.leftSideText}>Burn Time:</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.rightSideText}>{stage.BurnTime}</Text>
              </View>
            </View>
          </View>
        ))}

      <View style={styles.dividerColour}>
        <Divider style={styles.divider} />
        <Text style={styles.dividerText}> {rocket.Name} Launch Capacity </Text>
        <Divider style={styles.divider} />
      </View>

      {rocket.RocketCapacity &&
        rocket.RocketCapacity.map((capacity, index) => (
          <View style={styles.tableContainer} key={`capacity_${index}`}>
            <View style={styles.container}>
              <Text style={styles.payloadTitle}>{capacity.Description}</Text>
              <Text style={styles.payloadText}>{capacity.Value}</Text>
            </View>
          </View>
        ))}
    </ScrollView>
  );
};

export default Rocket;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  leftSideText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },

  rightSideText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'right'
  },

  Header: {
    fontSize: 32,
    lineHeight: 40,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
  },
  image: {
    flex: 1,
    // justifyContent: "flex-end",
    // alignItems: "center",
    resizeMode: 'cover',
  },
  imageContainer: {
    borderRadius: 12,
    width: 380,
    height: 260,
    borderColor: "black",
    borderWidth: 5,
    overflow: "hidden",
  },
  divider: {
    backgroundColor: "#CAC4D0",
    height: 5,
  },
  dividerColour: {
    backgroundColor: "rgba(193, 192, 249, 0.4)",
    marginBottom: 10,
    marginTop: 10,
  },

  dividerText: {
    fontSize: 22,
    lineHeight: 28,
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 15,
    paddingTop: 15,
  },

  leftContainer: {
    flex: 1,
    // borderColor: 'black',
    // borderWidth: 1,
    marginLeft: 20,
  },

  rightContainer: {
    flex: 1,
    // borderColor: 'black',
    // borderWidth: 1,
    marginRight: 20,
    alignItems: 'flex-end'
  },

  tableContainer: {
    // flex: 1,
    flexDirection: "row",
    // alignItems: 'center',
  },

  payloadTitle: {
    fontSize: 22,
    lineHeight: 28,
    textAlign: "center",
    // fontWeight: "bold",
    marginBottom: 10,
  },

  payloadText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center'
  },
  smallImageContainer:{
    width: '50%',
    height: '50%',
  },
  numberImages:{
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  numberText:{
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

