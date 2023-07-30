import { ScrollView, StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment/moment'
import { ActivityIndicator, MD2Colors, Card, } from 'react-native-paper';
import { Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Launches = () => {
  const [launches, setLaunches] = useState([]);
  const [loadingLaunches, setLoadingLaunches] = useState([]);
 const url = 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?mode=detailed'
 const [remainingTime, setRemainingTime] = useState('');
const placeholder = 'https://www.tandempm.ie/wp-content/uploads/placeholder-85.png';


  const getLaunches = async () => {
    setLoadingLaunches(true);
try{
    const response = await axios.get(url, {
      params: {
        // mode: 'detailed',
        limit: '10',
        upcoming: 'hide_recent_previous=true',
      },
    });
  const launch = response.data.results;
  console.log(launch);
  setLaunches(launch);
} catch (error){
  console.error('Error fetching upcoming launches', error);
}
    setLoadingLaunches(false);
  };

  useEffect(() => {
    getLaunches();
  }, []);

  return (
   <ScrollView>
         {loadingLaunches ?(
     <View>
     <View style={styles.loadingContainer}>
<ActivityIndicator animating={true} color={MD2Colors.red800}  size="large"/>
     </View>
     <View style={styles.textLoadingContainer}><Text style={styles.textLoading}>Launching Rockets.......</Text></View>
     </View>
      ) : (
      <View style={styles.container}>
        {launches.map((rocketLaunches, index) => (
          <View key={index}>
            <Card style={styles.card}>
            <View style={styles.imageContainer}>
              {rocketLaunches.image ? (
 <Image source={{ uri: rocketLaunches.image}} style={styles.image}/>
              ) : (
                <Image source={{ uri: placeholder}} style={styles.image}/>
              )}
           
</View >
<View style={styles.contentContainer}>
            <Text style={styles.title}>{rocketLaunches.rocket?.configuration?.full_name} | {rocketLaunches.mission?.name}</Text>
            <Text style={styles.subTitle}><Text style={styles.boldText}>Launch Provider:</Text> {rocketLaunches.launch_service_provider?.name}</Text>
            <Text style={styles.subTitle}><Text style={styles.boldText}>Launch Location:</Text> {rocketLaunches.pad?.location?.name}</Text>
</View>           

<View style={styles.dividerContainer}>
<Divider style={styles.divider} />
            <View style={styles.dividerColour}>
                {/* <Divider style={styles.divider} /> */}
                <Text style={styles.timer}>T - Minus - {moment(rocketLaunches.net).fromNow()}</Text>
                {/* <Divider style={styles.divider} /> */}
              </View>
              <Divider style={styles.divider} />
              </View>

              <View style={styles.contentContainer}> 
              <Text style={styles.date}>{moment(rocketLaunches.net).format("DD MMMM YYYY @ h:mm A")}</Text>
            <View style={styles.mainContentContainer}>
            <Text style={styles.subTitle}><Text style={styles.boldText}>Status:</Text> {rocketLaunches.status?.name}</Text>
        
            <View>
            <Text style={styles.descriptionContainer}>Mission:</Text>
            <Text style={styles.subTitle}><Text style={styles.boldText}>Orbit:</Text> {rocketLaunches.mission?.orbit?.name} ({rocketLaunches.mission?.orbit?.abbrev})</Text>
            <Text style={styles.subTitle}><Text style={styles.boldText}>Mission Type:</Text> {rocketLaunches.mission?.type}</Text>
            <Text style={styles.subTitle}>{rocketLaunches.mission?.description}</Text>
            </View>
         
            </View>
            <View style={styles.mainButtonContainer}>
              <View>
        
                  <View style={styles.rocketNameButton}>
                    <Text style={styles.buttonText}>Watch</Text>
                    <Icon style={styles.icon} name="play" size={25} color="black" />
                    </View>
                   
                    </View>

                    {/* <View>
                  <View style={styles.rocketNameButton2}>
                    <Text style={styles.buttonText}>More Info</Text>
                    <Icon style={styles.icon} name="information-variant" size={30} color="black" />
                    </View>
                    </View> */}
            </View>
            </View>
            </Card>
            </View>
           ))}
</View>
)}
   </ScrollView>
  )
}

export default Launches

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingTop: 10,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },

  divider: {
    backgroundColor: "#CAC4D0",
    height: 2,
  },
  dividerColour: {
    backgroundColor: "rgba(193, 192, 249, 0.4)",
    height: 60,
    width: "100%",
    justifyContent: "center",
  },

  dividerContainer: {
    marginBottom: 10,
    marginTop: 10,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },

  textLoading: {
    fontWeight: "bold",
    fontSize: 22,
    color: "black",
  },
  textLoadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  card: {
    width: "100%",
    borderRadius: 12,
    marginBottom: 40,
  },

  title: {
    fontSize: 26,
    marginVertical: 15,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },

  timerContainer: {
    marginTop: 15,
  },
  // timerText:{
  //   fontSize: 26,
  //   marginVertical: 7,
  //   textAlign: 'center',
  //   justifyContent: "center",
  //   alignItems: "center",
  //   fontWeight: 'bold',
  // },

  timer: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
  },
  date:{
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
  },

  subTitle: {
    fontSize: 18,
    marginTop: 10,
    marginVertical: 5,
  },
  imageContainer: {
    overflow: "hidden",
    width: "100%",
    height: 250,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  image: {
    width: "100%",
    height: 250,
    flex: 1,
  },
  boldText: {
    fontWeight: "bold",
  },
  mainContentContainer: {
    marginVertical: 15,
  },
  descriptionContainer: {
    fontWeight: "bold",
    marginTop: 15,
    fontSize: 22,
  },
  mainButtonContainer: {
    flexDirection: "row",
    marginHorizontal: 5,
    marginBottom: 30,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  rocketNameButton: {
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: "#E0115F",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 60,
    marginHorizontal: 15,
  },
  rocketNameButton2: {
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: "#8CECE2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    height: 60,
    marginHorizontal: 15,
  },

  icon: {
    marginLeft: 5,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    paddingVertical: 6,
  },
});