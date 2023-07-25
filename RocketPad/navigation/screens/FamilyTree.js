import { View, Text,  StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import {ActivityIndicator, MD2Colors,FAB, Card, Button, Modal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FamilyTree = ({ navigation }) => {

const [rocketPostion, setRocketPostion] = useState([]);
const [filterValue, setFilterValue] = useState('');
const [modalVisible, setModalVisible] = useState(false);
const [loadingNews, setLoadingNews] = useState([]);
const [rocketsFamilyTree, setRocketsFamilyTree] = useState([]);
const [selectedCountry, setSelectedCountry] = useState([]);


const rocketOrder = {
Europe: ['Diamant A', 'Europa', 'Black Arrow','Diamant B','Diamant BP.4','Ariane 1', 'Ariane 2', 'Ariane 3','Ariane 40','Ariane 42P','Ariane 42L','Ariane 44P', 'Ariane 44LP', 'Ariane 44L','Ariane 5G (Generic)','Ariane 5G+','Ariane 5GS','Ariane 5 ECA','Ariane 5 ES','Vega','Vega C',]
};



  useEffect(() => {
    setLoadingNews(true);
    const rocketTreeRef = collection(FIRESTORE_DB, "Rockets");
    const subscribe = onSnapshot(rocketTreeRef, {
      next: (snapshot) => {
        const RocketDataTree = [];

        snapshot.docs.forEach((doc) => {
          const { Name, RocketCapacity, Stages, Variant, images, img } = doc.data();
          const rocketTree = {
            id: doc.id,
            Name,
            image: img,
            rocketImage: images,
            rocketCapacity: RocketCapacity,
            stages: Stages,
            variant: Variant,
            
            // top: 0,
            // left: 0,
          };


            RocketDataTree.push(rocketTree);
          
        });

        setRocketsFamilyTree(RocketDataTree);
        setLoadingNews(false);
      },
    });

    return () => subscribe();
  }, []);

  const FilterValue = (value) =>{
    setFilterValue(value);
    console.log(value);
  }

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
    icon="timeline-clock"
    style={styles.fab}
    onPress={() => navigation.navigate("timeline")}
  />

{/* <View style={styles.filterButtonContainer}>
<Button icon="cursor-pointer" mode="elevated" onPress={() => FilterValue('Europe')} style={styles.filterButton}>
    Europe
</Button>

<Button icon="cursor-pointer" mode="elevated" onPress={() => FilterValue('United States')}style={styles.filterButton}>
    United States
</Button>

<Button icon="cursor-pointer" mode="elevated" onPress={() => FilterValue('Russia')} style={styles.filterButton}>
    Russia
</Button>
</View> */}

{/* <View> 
<Pressable style={styles.button} onPress={() => setModalVisible(modalVisible)}>
<Text style={styles.filterText}> Filter </Text> 
 <Icon style={styles.icon} name="filter-menu" size={30} color="black" />
</Pressable>
 <FAB
    icon="filter-menu"
    style={styles.fabFilter}
    onPress={() => setModalVisible(modalVisible)}
  />
  
  </View> */}


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

        
            </View>
          </View>
        </Modal>
      <View style={styles.rocketContainer}>  
{/* {rocketPostion.map((rocket) => (   
<View key={rocket.id}> */}

{rocketsFamilyTree.map((rocket, index) => (   
<View key={index}>
  <View style={styles.rocketPosition}>
<TouchableOpacity 
                onPress={() =>
                  navigation.navigate("rocket", { rocketId: rocket.id, rocketsImage: rocket.rocketImage })
                }>
                {/* <View style={[styles.cardContainer, {top: rocket.top, left: rocket.left }]}> */}
                <Card style={styles.cards}>
                <View style={styles.cardContainer}>
                
                  <View style={styles.card}>
                    <ImageBackground
                      source={{ uri: rocket.image }}
                      style={styles.image}
                    >
                      <Text style={styles.rocketName}>{rocket.Name}</Text>
                    </ImageBackground>
                  </View>
                  
                </View>
                </Card>
              </TouchableOpacity>
              </View>
              </View>
              
))}
</View>
      </ScrollView>
       )}
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

      // fabFilter: {
      //   position: 'absolute',
      //   margin: 16,
      //   top: 0,
      //   // right: 300,
      //   marginBottom: 40,
      //   justifyContent: 'flex-start',
      // },
      container: {
        marginHorizontal: 10,
        paddingTop: 10,
    // flex: 1,
      },
      rocketContainer:{
marginTop:60,
      },



//       filterButton:{
// width: 110,
// marginHorizontal:10,
//       },

//       filterButtonContainer:{
//         flexDirection:'row',

//       },


      cardContainer: {
        borderRadius: 12,
        overflow: "hidden",
        // marginBottom: 40,
        // marginTop: 40,
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
      cards:{
        marginBottom: 40,
        marginTop: 40,
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
        alignItems: 'center',
       
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
})