import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal, Pressable, Dimensions, Animated, Video  } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { collection, query, onSnapshot, where, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { FIRESTORE_DB, FIRESTORE_STORAGE} from '../../firebaseConfig';
import { useRoute, validatePathConfig, useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FAB, Appbar } from 'react-native-paper';
import ImageZoom from 'react-native-image-pan-zoom';


const Rocket = () => {
  const [rocket, setRocket] = useState({});
  const [rocketImage, setRocketImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [indexCol, setIndexCol] = useState(0);
  const route = useRoute();
  const rocketId = route.params?.rocketId;
  const rocketsImage = route.params?.rocketsImage;
  const { width, height } = Dimensions.get('screen');
  const carouselContainerWidth = width;
const carouselContainerHeight = height;
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const imageGalleryWidth = Dimensions.get('window').width * 0.92;  

  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ], 
      {
        useNativeDriver: false,
      }
    )(event);
  };

//   const handleItemsChanged = useRef(({ viewableItems }) => {
// setIndexCol(viewableItems[0].index);
//   }).current;

//   const viewabilityConfig = useRef({
//     itemVisiblePercentThreshold: 50,
//   }).current;

  useEffect(() => {
    console.log("Fetching data for rocket:", rocketId);
    const rocketRef = doc(FIRESTORE_DB, "Rockets", rocketId);
    const fetchData = async () => {
      const rocketDocument = await getDoc(rocketRef);

      if (rocketDocument.exists()) {
        const rocketData = rocketDocument.data();
        setRocket({
          id: rocketDocument.id,
          ...rocketData,
          RocketCapacity: rocketData.RocketCapacity,
          Stages: rocketData.Stages,
        });


        console.log("Rocket:", rocket);
      } else {
        console.log("No such document!");
      }
    };
    fetchData();
  }, [rocketId]);

  useEffect(() => {
    const rocketImageRef = doc(FIRESTORE_DB, "imagesVideos", rocketsImage);
    const fetchData = async () => {
      const rocketImageDocument = await getDoc(rocketImageRef);

      if (rocketImageDocument.exists()) {
        const rocketImages = rocketImageDocument.data();
        const imageArray = Object.values(rocketImages);
        setRocketImage(imageArray);
        console.log("Rocket:", rocketImage); // Add this line
      } else {
        console.log("No such document!");
      }
    };
    fetchData();
  }, [rocketsImage]);
 
useEffect(() =>{
  if(modalVisible){
    scrollX.setValue(0);
  }
}, [modalVisible]);

const OrbitMap ={
  'Low Earth Orbit': 'Low Earth Orbit (LEO)',
  'Geostationary Orbit': 'Geostationary Orbit (GEO)',
  'Medium Earth Orbit': 'Medium Earth Orbit (MEO)',
  'Geosynchronous Orbit': 'Geosynchronous Orbit (GSO)',
  'Semi-Synchronous Orbit': 'Semi - Synchronous Orbit',
  'Sun-Synchronous Orbit': 'Polar Orbit and Sun-Synchronous Orbit (SSO)',
  'Polar Orbit': 'Polar Orbit and Sun-Synchronous Orbit (SSO)',
  'Geostationary Transfer Orbit': 'Transfer Orbits and Geostationary Transfer Orbit (GTO)',
  'Molniya Orbit': 'Molniya Orbit',
  'Tundra Orbit': 'Tundra Orbit'
}

  return (
    <View>
      <Appbar.Header>
    <Appbar.BackAction onPress={() => navigation.goBack()} />
    <Appbar.Content title="Rocket Information" />
  </Appbar.Header>

      <ScrollView style={styles.rocketContainer}>
        <Text style={styles.Header}>{rocket.Name}</Text>

        <View style={styles.container}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={[styles.imageContainer, {width: imageGalleryWidth}]}>
              {rocketImage.slice(0, 4).map((url, index) => (
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
          </TouchableOpacity>
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
            <Text style={styles.rightSideText}>{rocket.ID}</Text>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.leftSideText}>Launch Provider:</Text>
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
            <Text style={styles.rightSideText}>
              {((rocket.Success / rocket.TotalLaunches) * 100).toFixed(2)}%
            </Text>
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

        {/* <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imgg }} style={styles.image} />
        </View>
      </View> */}

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
                  <Text style={styles.rightSideText}>
                    {stage.RocketPropellant}
                  </Text>
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
          <Text style={styles.dividerText}>
            {" "}
            {rocket.Name} Launch Capacity{" "}
          </Text>
          <Divider style={styles.divider} />
        </View>

        {rocket.RocketCapacity &&
          rocket.RocketCapacity.map((capacity, index) => (
            <View style={styles.tableContainer} key={`capacity_${index}`}>
              <View style={styles.container}>
              {/* <Pressable
                onPress={() =>{
                  if(documentName) {
                  navigation.navigate("orbit", {
                    documentName: documentName,
                  })
                  } else {}
                }}> */}
                <Text style={styles.payloadTitle}>{capacity.Description}</Text>
                {/* </Pressable> */}
                <Text style={styles.payloadText}>{capacity.Value}</Text>
              </View>
            </View>
          ))}
      </ScrollView>

      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Icon
                  style={styles.icon}
                  name="window-close"
                  size={30}
                  color="black"
                />
              </Pressable>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToAlignment="center"
                onScroll={handleOnScroll}
                // onViewableItemsChanged={handleItemsChanged}
                // viewabilityConfig={viewabilityConfig}
              >
                {rocketImage.map((url, index) => (
                  <View key={index} style={[styles.carouselConatiner, { width: carouselContainerWidth, height: carouselContainerHeight }]}>
                    <View style={styles.carouselItem}>

                            {/* <ImageZoom cropWidth={width}
                                      cropHeight={height}
                                      imageWidth={width}
                                      imageHeight={750}
                                      >
                                      
                                      
                                   
                            <Image
                                  source={{ uri: url }}
                                  style={styles.imageCarousel} />
                            </ImageZoom> */}

            
                        <Image
                        source={{ uri: url }}
                        style={styles.imageCarousel}
                      />

  
                   
                    </View>
                  </View>
                ))}
              </ScrollView>

              <View style={styles.dotConatainer}>
  {rocketImage.map((_, index) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width
    ];
    const dotWidth = scrollX.interpolate({
      inputRange,
      outputRange: [12, 30, 12],
      extrapolate:'clamp',
    });
    const backgroundColor = scrollX.interpolate({
      inputRange,
      outputRange: ['#ccc', '#FFFFFF', '#ccc'],
      extrapolate:'clamp',
    });
    return (
      <Animated.View
        key={index.toString()}
        style={[styles.dot, { width: dotWidth, backgroundColor },]}
      />
    );
  })}
</View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
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
  rocketContainer: {
marginBottom: 120,
  },
  leftSideText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    fontFamily: 'Roboto-Bold'
  },

  rightSideText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: "right",
    fontFamily: 'Roboto-Regular'
  },

  Header: {
    fontSize: 26,
    lineHeight: 40,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: 'Roboto-Bold',
    marginTop: 20,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  imageContainer: {
    borderRadius: 12,
    // width: 380,
    height: 260,
    borderColor: "black",
    borderWidth: 5,
    overflow: "hidden",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  divider: {
    backgroundColor: "#CAC4D0",
    height: 5,
  },
  dividerColour: {
    backgroundColor: "rgba(193, 192, 249, 0.4)",
    marginBottom: 25,
    marginTop: 10,
  },

  dividerText: {
    fontSize: 20,
    lineHeight: 28,
    textAlign: "center",
    fontFamily: 'Roboto-Bold',
    paddingBottom: 15,
    paddingTop: 15,
  },

  leftContainer: {
    flex: 1,
    marginLeft: 20,
    // borderColor: 'red',
    // borderWidth: 1,
  },

  rightContainer: {
    flex: 1,
    marginRight: 20,
    alignItems: "flex-end",
    // borderColor: 'red',
    // borderWidth: 1,
  },

  tableContainer: {
    flexDirection: "row",
  },

  payloadTitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 5,
    fontFamily: 'Roboto-Bold'
   
  },

  payloadText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 5,
    fontFamily: 'Roboto-Regular'
  },
  smallImageContainer: {
    width: "50%",
    height: "50%",
    borderColor: "black",
    borderWidth: 2,
  },
  numberImages: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(128,128,128, 0.5)',
    borderRadius: 20,
    padding: 5,
  },
  numberText: {
    // color: "#ff0000",
    color: "white",
    fontSize: 26,
    fontFamily: 'Roboto-Bold',
  },
  carouselConatiner: {
    // borderColor: "red",
    // borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselItem: {
    width: "100%",
    height: 750,
    // borderColor: "white",
    // borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  imageCarousel: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    flex: 1,
    margin: 0,
    backgroundColor: "black",
    borderRadius: 20,
    width: "100%",
    height: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    position: "absolute",
    top: 25,
    right: 25,
    backgroundColor: "transparent",
    width: 56,
    height: 56,
    zIndex: 1,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ccc",
    marginHorizontal: 3,
  },
  dotConatainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  video:{
    width: "100%",
    height: "100%",
  }
});

