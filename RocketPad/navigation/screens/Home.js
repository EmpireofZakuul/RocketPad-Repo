import { View,  StyleSheet, ScrollView, Image, TouchableOpacity, Linking, ImageBackground, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { apiKey, endpoint, endpoint2, language, pageSize, searchTerm, domains, limit, offset} from '../../newsAPIConfig'
import axios from 'axios'
import moment from 'moment/moment'
import { ActivityIndicator, MD2Colors, Card, Text, } from 'react-native-paper';
import { collection,  onSnapshot, } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = ({ navigation }) => {
  const [newsArticles, setNewsArticles] = useState([]);
  const placeholder = "https://pbs.twimg.com/media/Fvd3qcoWcAMaVs8?format=jpg&name=large";
  const [loadingNews, setLoadingNews] = useState(false);
  const [rocketImage, setRocketImage] = useState(null);
  const rocketSpotlightHeight = Dimensions.get('window').height;  

  useEffect(() => {
    const rocketsRef = collection(FIRESTORE_DB, "ImageOfTheDay");
    const subscribe = onSnapshot(rocketsRef, {
      next: (snapshot) => {
        const RocketData = [];

        snapshot.docs.forEach((doc) => {
          const { name, img, images, id } = doc.data();
          const rocket = {
            id: id,
            name,
            img: img,
            rocketImage: images,
          };
          RocketData.push(rocket);
        });
        // console.log(RocketData),
        //   console.log("Number of documents:", snapshot.docs.length);

        const randomIndex = Math.floor(Math.random() * RocketData.length);
        setRocketImage(RocketData[randomIndex]);
      },
    });

    return () => subscribe();
  }, []);

  const getNewsArticles = async () => {
    setLoadingNews(true);
    const allNewsArticles = [];

    try {
      const response = await axios.get(endpoint2, {
        params: {
          limit: limit,
          // offset: offset,
        },
      });
      const articles = response.data?.results;
      console.log("API Response:", response.data);
      allNewsArticles.push(...articles);
    } catch (error) {
      console.error("Error", error);
      setLoadingNews(false);
    } finally {
      // allNewsArticles.sort
      // const limitedArticles = allNewsArticles.slice(0, limit);
      setNewsArticles(allNewsArticles);
      setLoadingNews(false);
    }
  };

  useEffect(() => {
    getNewsArticles();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}> 
      {rocketImage && (
        <View>
          <View key={rocketImage.id} style={{...styles.imageOfDay, height: rocketSpotlightHeight - 80}}>
            <Image source={{ uri: rocketImage.img }} style={styles.image} />
            <View style={{...styles.imageOfDayOverlay, height: rocketSpotlightHeight - 80}}></View>
          <View style={styles.rocketNameContainer}>
            <Text style={styles.imageOfTheDayText}>
              RocketPad's Rocket Spotlight
            </Text>
            <Text style={styles.rocketName}>{rocketImage.name}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Rocket", {
                  rocketId: rocketImage.id,
                  rocketsImage: rocketImage.rocketImage,
                })}>
              <View style={styles.rocketNameButton}>
                <Text style={styles.buttonText}>View Rocket</Text>
                <Icon
                  style={styles.icon}
                  name="arrow-right"
                  size={20}
                  color="white"
                />
              </View>
            </TouchableOpacity>
            
          </View>
          <View style={styles.viewMore}>
                <Icon
                  style={styles.icon}
                  name="chevron-up"
                  size={30}
                  color="white"
                />
                 <Text style={styles.moreText}>Swipe up for more</Text>
              </View>
              </View>
        </View>
      )}


      {loadingNews ? (
        <View style={{...styles.loadingContainer, marginTop: rocketSpotlightHeight}}>
          <ActivityIndicator
            animating={true}
            color={MD2Colors.red800}
            size="large"
          />
        </View>
      ) : (
        
        <View style={{...styles.container,   marginTop: rocketSpotlightHeight - 80}}>
       <Text style={styles.latestNews}>Latest News</Text>
          {newsArticles.map((article, index) => {
            return (
              <View key={index}>
                <TouchableOpacity onPress={() => Linking.openURL(article.url)}> 
                  <Card style={styles.newNewsCard}>
                  <ImageBackground source={{ uri: article.image_url}} style={styles.imageContainerNews}>
                    <View  style={styles.newsOverlay}>
                    <Card.Content style={styles.articleContent2}>
                      <Text style={styles.title2}>{article.title}</Text>
                      <Text style={styles.summary} numberOfLines={3}>{article.summary}</Text>
                      <Text style={styles.newsSource}>
                        {moment(article.published_at).format("DD MMMM YYYY")} |{" "}
                        {article.news_site}
                      </Text>
                      <View style={styles.readMoreContainer}>
                      <Icon name="view-headline" size={20}color="white"/>
                      <Text style={styles.readMore}> Read Article</Text>
                      </View>
                    </Card.Content>
                    </View>
                    </ImageBackground>
                  </Card>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    zIndex: 0,
  },

  imageOfDay: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },

  imageOfDayOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1,
  },

  imageOfTheDayText: {
    fontSize: 16,
    // textAlign: "center",
    color: "white",
    fontFamily:'Roboto-Bold',
  },

  latestNews: {
    fontSize: 26,
    fontFamily: 'Roboto-Bold',
    lineHeight: 40,
    textAlign: "center",
    paddingVertical: 25
  },

  rocketName: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: "white",
    marginTop: 15,
    marginRight: 10,
  },

  rocketNameContainer: {
    zIndex: 2,
    position: "absolute",
    // top: 450,
    top: '50%',
    left: 20,
  },
  rocketNameButton: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 8,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 160,
  },

  icon: {
    marginLeft: 10,
  },

  buttonText: {
    fontSize: 16,
    fontFamily:'Roboto-Bold',
    textAlign: "center",
    color: "white",
    paddingVertical: 6,
  },

  title: {
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 20,
  },
  description: {
    color: "red",
    fontWeight: "bold",
  },
  articleContent: {
    padding: 12,
  },
  card: {
    width: "100%",
    // height: 300,
    borderRadius: 12,
    // overflow: "hidden",
    marginBottom: 40,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    overflow: "hidden",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  image: {
    resizeMode: "cover",
    flex: 1,
    alignItems: "center",
  },

  imageNews: {
    width: "100%",
    height: 200,
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 20,
    zIndex:0,
  },

  newNewsCard:{
    width: "100%",
    height: 400,
    borderRadius: 12,
    marginBottom: 40,
  },

  newsOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    flex: 1,
    justifyContent: 'flex-end',
  },

  imageContainerNews: {
    width: "100%",
    height: 400,
    overflow: "hidden",
    borderRadius: 12,
  },
  title2: {
    fontFamily: 'Roboto-Bold',
    textAlign: "center",
    marginBottom: 15,
    color: "white",
    fontSize: 26,
  },
 
  summary: {
    color: "white",
    fontFamily: 'Roboto-Regular',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    marginTop:  10,
  },
  newsSource: {
    color: "white",
    fontFamily: 'Roboto-Regular',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 12,
    marginTop:  15,
  },
  readMore:{
    color: "white",
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
  },
  readMoreContainer:{
  flexDirection: 'row',
  alignItems: 'center',
  position: 'absolute',
  justifyContent: 'center',
  left: 0,
  right: 0,
  bottom: 50
  },
  articleContent2: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    flex: 1,
  },

  viewMore:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    zIndex: 2,
    position: "absolute",
    top: '80%',
    left: -10,
  },

  moreText:{
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    textAlign: "center",
    color: "white",
  }

});
export default Home;