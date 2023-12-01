import { ScrollView, StyleSheet, Text, View , Image, TouchableOpacity, Linking, Pressable, LayoutAnimation} from 'react-native'
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
const placeholder = 'https://live.staticflickr.com/65535/52638633506_903d299d21_3k.jpg';
const [currentTime, setCurrentTime] = useState(Date.now());
const [showMoreAnimation, setShowMoreAnimation] = useState(false);
const [showMore, setShowMore] = useState({});
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
    <Appbar.Header style={{backgroundColor: '#211F26'}}>
   <Appbar.Content title="Upcoming Rocket Launches" titleStyle={styles.appbarText} />
   </Appbar.Header>
   
   <ScrollView showsVerticalScrollIndicator={false}>
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
const orbitName = rocketLaunches.mission?.orbit?.name;
const documentName = OrbitMap[orbitName];
return(

          <View key={index}>
               <Pressable onPress={() => {LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut,), setShowMore({...showMore, [index]: !showMore[index]})}}>
            <Card style={styles.card}>
            <View style={styles.imageContainer}>
              {rocketLaunches.image ? (
 <Image source={{ uri: rocketLaunches.image}} style={styles.image}/>
              ) : (
                <View style={styles.imageContainer}>
                <Image source={{ uri: placeholder}} style={styles.image}/>
                <Text style={styles.PlaceholderText}>Placeholder</Text>
                </View>
              )}
           
</View >
<View style={styles.contentContainer}>
            <Text style={styles.title}>{rocketLaunches.rocket?.configuration?.full_name} | {rocketLaunches.mission?.name}</Text>
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
    <Text style={rocketLaunches.status?.name === 'Launch Successful' ? styles.launchStatus : rocketLaunches.status?.name === 'Launch in Flight' ? styles.launchStatus : rocketLaunches.status?.name === 'Go for Launch' ? styles.launchStatus  : styles.launchStatusFailure}>{rocketLaunches.status?.name}</Text> 
    </View>
  )}


              </View>
              <Divider style={styles.divider} />
              </View>

              <View style={styles.contentContainer}> 
              <Text style={styles.date}>{moment.utc(rocketLaunches.net).format("DD MMMM YYYY @ HH:mm")} UTC</Text>
            <View style={styles.mainContentContainer}>
              <View>
            <Text style={styles.subTitle}><Text style={styles.boldText}>Status:</Text> <Text style={{color: rocketLaunches.status?.name === 'Go for Launch' ? '#00b300' : rocketLaunches.status?.name === 'Launch in Flight' ? '#00b300' : rocketLaunches.status?.name === 'Launch Successful' ? '#00b300': '#ff0000'}}>{rocketLaunches.status?.name}</Text></Text>
              </View>
       
            {/* {showMore ? ( */}
            {showMore[index] && (
            <View>
            <Text style={styles.subTitle}><Text style={styles.boldText}>Launch Provider:</Text> {rocketLaunches.launch_service_provider?.name}</Text>
            <Text style={styles.subTitle}><Text style={styles.boldText}>Launch Location:</Text> {rocketLaunches.pad?.name} - {rocketLaunches.pad?.location?.name}</Text>
            <View> 
            {(rocketLaunches.mission?.orbit?.name && rocketLaunches.mission?.orbit?.abbrev) || rocketLaunches.mission?.type || rocketLaunches.mission?.description ? (
           <Text style={styles.descriptionContainer}>Mission:</Text>
            ) : null}

            {rocketLaunches.mission?.orbit?.name && rocketLaunches.mission?.orbit?.abbrev && (
                <Pressable
                onPress={() =>{
                  if(documentName) {
                  navigation.navigate("Orbit", {
                    documentName: documentName,
                  })
                  } else {}
                }}>
           
            <Text style={documentName ? styles.orbitIncluded : styles.orbitNotIncluded}>
              <Text style={styles.boldText}>Orbit:</Text> {rocketLaunches.mission?.orbit?.name} ({rocketLaunches.mission?.orbit?.abbrev})</Text>
          
            </Pressable>
            )}
            {rocketLaunches.mission?.type && (
            <Text style={styles.subTitle}><Text style={styles.boldText}>Mission Type:</Text> {rocketLaunches.mission?.type}</Text>
            )}

            {rocketLaunches.mission?.description && (
            <Text style={styles.subTitle}>{rocketLaunches.mission?.description}</Text>
            )}
            </View>
            </View>
            // ): null}
            )}
                <View style={{flexDirection: 'row'}}>
                <Icon name={showMore[index] ? 'chevron-up' : 'chevron-down'} size={25} style={{marginTop: 2, color: 'blue'}}/>
                 <Text style={styles.showMore}>{showMore[index] ? 'Show Less' : 'Show More'}</Text>
                 </View>
            </View>
            </View>
            </Card>
            </Pressable>
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
    fontFamily:'Roboto-Bold',
    fontSize: 20,
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
fontFamily: 'Roboto-Bold'
    
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
fontFamily: 'Roboto-Bold'
  },

  launchStatus: {
    fontSize: 26,
    color: '#00b300',
fontFamily: 'Roboto-Bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  launchStatusFailure:{
  fontSize: 26,
    color: '#ff0000',
    fontFamily: 'Roboto-Bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  timerTime: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Roboto-Regular'
  },

  // timer: {
  //   fontSize: 26,
  //   textAlign: "center",
  //   fontWeight: "bold",
  //   marginBottom: 15,
  // },
  date:{
    fontSize: 20,
    textAlign: "center",
    fontFamily: 'Roboto-Bold'
  },

  subTitle: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    marginVertical: 5,
    fontFamily: 'Roboto-Regular'
  },


  orbitIncluded: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    marginVertical: 5,
    fontFamily: 'Roboto-Regular',
    color: 'blue',
  },

  orbitNotIncluded: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    marginVertical: 5,
    fontFamily: 'Roboto-Regular',
    color: 'black'
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
    resizeMode:'cover'
  },
  boldText: {
    fontFamily: 'Roboto-Bold',
    color: 'black',
  },
  mainContentContainer: {
    marginVertical: 15,
  },
  descriptionContainer: {
    fontFamily: 'Roboto-Medium',
    marginTop: 15,
    fontSize: 20,
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
  OrbitIcon:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  PlaceholderText: {
    fontFamily: 'Roboto-Bold',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontSize: 26,
    position: 'absolute',
    top: '45%',
    left: 0,
    right: 0,
    bottom: 0,

  },
  showMore:{
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: 'blue',
    marginTop: 5,
  },
  appbarText: {
    fontFamily: 'Roboto-Regular',
    color: '#FFFFFF'
  }

});