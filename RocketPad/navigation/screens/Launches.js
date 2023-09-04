import { ScrollView, StyleSheet, Text, View , Image, TouchableOpacity, Linking} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment/moment'
import { ActivityIndicator, MD2Colors, Card, Appbar } from 'react-native-paper';
import { Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Launches = ({navigation}) => {
  const [launches, setLaunches] = useState([]);
  const [loadingLaunches, setLoadingLaunches] = useState([]);
 const url = 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?mode=detailed'
 const [remainingTime, setRemainingTime] = useState('');
const placeholder = 'https://www.tandempm.ie/wp-content/uploads/placeholder-85.png';
const [currentTime, setCurrentTime] = useState(Date.now());


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


const countdown = (launchTime) => {
  const currentTime = Date.now();
  const timeBetweenTimes = new Date(launchTime).getTime() - currentTime;
const seconds = Math.floor((timeBetweenTimes / 1000) % 60);
const minutes = Math.floor((timeBetweenTimes / 1000 / 60) % 60);
const hours = Math.floor((timeBetweenTimes / (1000 * 60 * 60)) % 24);
const days = Math.floor(timeBetweenTimes / (1000 * 60 * 60 * 24));

// console.log('Days:', days, 'Hours:', hours, 'Minutes:', minutes, 'Seconds:', seconds);
return{ days, hours, minutes, seconds}
};

const formatCountdown = (countdown) => {
  const {days, hours, minutes, seconds} = countdown;

  // if(days < 0 && hours < 0 && minutes < 0 && seconds < 0){
  //   return "00 : 00 : 00 : 00"
  // }

  return (
`${days.toString().padStart(2, '0')} : ` +
`${hours.toString().padStart(2, '0')} : ` +
`${minutes.toString().padStart(2, '0')} : ` +
`${seconds.toString().padStart(2, '0')} ` 


  );
};


  useEffect(() => {
    getLaunches();
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <View>
    <Appbar.Header>
   <Appbar.Content title="Upcoming Rocket Launches" />
   </Appbar.Header>
   
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
        {launches.map((rocketLaunches, index) => {

const launchTime = new Date(rocketLaunches.net);
const time = countdown(launchTime);
const countdownFormated = formatCountdown(time);

return(

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
            <Text style={styles.subTitle}><Text style={styles.boldText}>Launch Location:</Text> {rocketLaunches.pad?.name} - {rocketLaunches.pad?.location?.name}</Text>
</View>           

<View style={styles.dividerContainer}>
<Divider style={styles.divider} />
            <View style={styles.dividerColour}>


{time.days >= 0 && time.hours >= 0 && time.minutes >= 0 && time.seconds >= 0  ? (
<View style={styles.containerTimer}>
<Text style={styles.timerText}>T - </Text>
  <View style={styles.itemTimer}>
    <Text style={styles.timerText}>{time.days.toString().padStart(2, '0')}</Text>
    <Text style={styles.timerTime}>Days</Text>
  </View>
  <View style={styles.dotContainer}>
    <Text style={styles.timerDots}>:</Text>
  </View>
  <View style={styles.itemTimer}>
    <Text style={styles.timerText}>{time.hours.toString().padStart(2, '0')}</Text>
    <Text style={styles.timerTime}>Hours</Text>
  </View>
  <View style={styles.dotContainer}>
    <Text style={styles.timerDots}>:</Text>
  </View>
  <View style={styles.itemTimer}>
    <Text style={styles.timerText}>{time.minutes.toString().padStart(2, '0')}</Text>
    <Text style={styles.timerTime}>Mins</Text>
  </View>
  <View style={styles.dotContainer}>
    <Text style={styles.timerDots}>:</Text>
  </View>
  <View style={styles.itemTimer}>
    <Text style={styles.timerText}>{time.seconds.toString().padStart(2, '0')}</Text>
    <Text style={styles.timerTime}>Secs</Text>
  </View>
  </View>
  ) : (
    <View style={styles.containerTimer}>
    <Text style={rocketLaunches.status?.name === 'Launch Successful' ? styles.launchStatus : rocketLaunches.status?.name === 'Go for Launch' ? styles.launchStatus  : styles.launchStatusFailure}>{rocketLaunches.status?.name}</Text> 
    </View>
  )}


              </View>
              <Divider style={styles.divider} />
              </View>

              <View style={styles.contentContainer}> 
              <Text style={styles.date}>{moment(rocketLaunches.net).format("DD MMMM YYYY @ h:mm A")}</Text>
            <View style={styles.mainContentContainer}>
            <Text style={styles.subTitle}><Text style={styles.boldText}>Status:</Text> <Text style={{color: rocketLaunches.status?.name === 'To Be Determined' ? '#ff0000' : rocketLaunches.status?.name === 'To Be Confirmed' ? '#ff0000' : '#00b300'}}>{rocketLaunches.status?.name}</Text></Text>
        
            <View>
            <Text style={styles.descriptionContainer}>Mission:</Text>
            {/* <TouchableOpacity  onPress={() => navigation.navigate('orbit', {documentName: rocketLaunches.mission?.orbit?.name})}> */}
            {/* <Text style={styles.subTitle}><Text style={styles.boldText}>Orbit:</Text> <Text style={styles.textLink}>{rocketLaunches.mission?.orbit?.name} ({rocketLaunches.mission?.orbit?.abbrev})</Text></Text> */}
            {/* </TouchableOpacity> */}
            <Text style={styles.subTitle}><Text style={styles.boldText}>Orbit:</Text> {rocketLaunches.mission?.orbit?.name} ({rocketLaunches.mission?.orbit?.abbrev})</Text>
            <Text style={styles.subTitle}><Text style={styles.boldText}>Mission Type:</Text> {rocketLaunches.mission?.type}</Text>
            <Text style={styles.subTitle}>{rocketLaunches.mission?.description}</Text>
            </View>
         
            </View>
            {/* <View style={styles.mainButtonContainer}>
              
        <TouchableOpacity onPress={() => Linking.openURL(rocketLaunches.agencies?.wiki_url)}>
                  <View style={styles.rocketNameButton}>
                    <Text style={styles.buttonText}>Watch</Text>
                    <Icon style={styles.icon} name="play" size={25} color="black" />
                    </View>
                    </TouchableOpacity>
                   

                    <TouchableOpacity  onPress={() => Linking.openURL(rocketLaunches.agencies?.wiki_url)}>
                  <View style={styles.rocketNameButton2}>
                    <Text style={styles.buttonText}>More Info</Text>
                    <Icon style={styles.icon} name="wikipedia" size={30} color="black" />
                    </View>
                    </TouchableOpacity>
            </View> */}
            </View>
            </Card>
            </View>
);
        })}
</View>
)}
   </ScrollView>
   </View>
  )
}

export default Launches

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingTop: 10,
    marginBottom: 100,
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
    // justifyContent: "center",
  },

  textLink:{
    textDecorationLine: 'underline',
    color: 'blue',
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

  containerTimer: {
    marginVertical: 5,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 5,
  },

  timerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', 
  },

  itemTimer:{
    alignItems: 'center',
    width: 50,
  },

  dotContainer:{
    alignItems: 'center',
    marginTop: -18,
    marginHorizontal: 1,
  },

  timerDots: {
    fontSize: 26,
    color: 'black',
    fontWeight: "bold",
    lineHeight: 30,
  },

  timerText:{
 fontSize: 26,
 color: 'black',
 fontWeight: "bold",
  },

  launchStatus: {
    fontSize: 26,
    color: '#00b300',
    fontWeight: "bold",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  launchStatusFailure:{
  fontSize: 26,
    color: '#ff0000',
    fontWeight: "bold",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  timerTime: {
    fontSize: 14,
    color: 'black',
  },

  // timer: {
  //   fontSize: 26,
  //   textAlign: "center",
  //   fontWeight: "bold",
  //   marginBottom: 15,
  // },
  date:{
    fontSize: 24,
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