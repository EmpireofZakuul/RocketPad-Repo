import { ScrollView, StyleSheet, Text, View , Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment/moment'
import { ActivityIndicator, MD2Colors, Card, } from 'react-native-paper';
import { Divider } from 'react-native-elements';

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
        limit: '20',
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
            <Text style={styles.title}>{rocketLaunches.rocket?.configuration?.name} | {rocketLaunches.mission?.name}</Text>
            {/* <Divider style={styles.divider} /> */}
            <View style={styles.timerContainer}>
            {/* <Text style={styles.timerText}>Countdown</Text> */}
            <Text style={styles.timer}>T - {moment(rocketLaunches.net).fromNow()}</Text>
            </View>
            {/* <Divider style={styles.divider} /> */}
            <Text style={styles.subTitle}><Text style={styles.boldText}>Launch Provider:</Text> {rocketLaunches.launch_service_provider?.name}</Text>
            <Text style={styles.subTitle}><Text style={styles.boldText}>Launch Location:</Text> {rocketLaunches.pad?.location?.name}</Text>
            <Text style={styles.subTitle}><Text style={styles.boldText}>Status:</Text> {rocketLaunches.status?.name}</Text>
            {/* <Divider style={styles.divider} /> */}
            <Text style={styles.subTitle}><Text style={styles.boldText}>Orbit:</Text> {rocketLaunches.mission?.orbit?.name}</Text>
            <Text style={styles.subTitle}>{rocketLaunches.mission?.description}</Text>
           
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
  contentContainer:{
paddingHorizontal: 10,
  },

  divider: {
    backgroundColor: "#CAC4D0",
    height: 2,
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
card: {
  width: "100%",
  borderRadius: 12,
  marginBottom: 40,
},

title:{
  fontSize: 22,
  marginVertical: 15,
  textAlign: 'center',
  justifyContent: "center",
  alignItems: "center",
  fontWeight: 'bold',
},

timerContainer:{

},
// timerText:{
//   fontSize: 26,
//   marginVertical: 7,
//   textAlign: 'center',
//   justifyContent: "center",
//   alignItems: "center",
//   fontWeight: 'bold',
// },

timer:{
  fontSize: 26,
  marginVertical: 7,
  textAlign: 'center',
  justifyContent: "center",
  alignItems: "center",
  fontWeight: 'bold',
},

subTitle:{
  fontSize: 16,
  marginTop:10,
  marginVertical: 5,
  // textAlign: 'center',
  // justifyContent: "center",
  // alignItems: "center",
},
imageContainer:{
overflow: 'hidden',
width: '100%',
height: 250,
borderColor: 'black',
borderWidth: 1,
borderTopLeftRadius: 12,
borderTopRightRadius: 12,

},

image:{
  width: '100%',
  height: 250,
  flex: 1,

},
boldText:{
  fontWeight: 'bold',
}
})