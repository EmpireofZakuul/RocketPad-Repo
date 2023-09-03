import { View,  StyleSheet, ScrollView, Image, TouchableOpacity, Linking,  } from 'react-native'
import React, { useState, useEffect } from 'react'
import { apiKey, endpoint, language, pageSize, searchTerm, domains, limit, offset} from '../../newsAPIConfig'
import axios from 'axios'
import moment from 'moment/moment'
import { ActivityIndicator, MD2Colors, Card, Text, } from 'react-native-paper';
import { collection,  onSnapshot, } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = ({ navigation }) => {
  const [newsArticles, setNewsArticles] = useState([]);
  const imgg = "https://pbs.twimg.com/media/Fvd3qcoWcAMaVs8?format=jpg&name=large";
  const [loadingNews, setLoadingNews] = useState(false);
  const [rocketImage, setRocketImage] = useState(null);
 

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
        console.log(RocketData),
          console.log("Number of documents:", snapshot.docs.length);

          const randomIndex  = Math.floor(Math.random() * RocketData.length);
          setRocketImage(RocketData[randomIndex]);
      },
    });

    return () => subscribe();
  }, []);
 

  const getNewsArticles = async () => {
    setLoadingNews(true);
    const allNewsArticles = [];

  //   try{
  //   // for (const term of searchTerm) {
  //     const response = await axios.get(endpoint, {
  //       params: {
  //         // category: category,
  //         // domains: domains,
  //         // q: term,
  //         // language: language,
  //         // apiKey: apiKey,
  //         limit: limit,
  //         offset: offset,
  //         // sortBy: 'publishedAt',
  //       },
  //     });
  //     const articles = response.data?.articles || [];
  //     console.log("API Response:", response.data);
  //     allNewsArticles.push(articles);
  //   // }
  //   } catch (error) {
  //     console.error('Error', error);
  //   } finally {
  //   // allNewsArticles.sort
  //   // const limitedArticles = allNewsArticles.slice(0, limit);
  //   setNewsArticles(allNewsArticles);
  //   setLoadingNews(false);
  //   }
  // };

  
    for (const term of searchTerm) {
      const response = await axios.get(endpoint, {
        params: {
          domains: domains,
          q: term,
          language: language,
          apiKey: apiKey,
          pageSize: pageSize,
          sortBy: 'publishedAt',
        },
      });
      const articles = response.data.articles;
      allNewsArticles.push(...articles);
    }
  
    allNewsArticles.sort
    const limitedArticles = allNewsArticles.slice(0, pageSize);
    setNewsArticles(limitedArticles);
    setLoadingNews(false);
    };

  useEffect(() => {
    getNewsArticles();
  }, []);

  return (
    
    <ScrollView>
      {rocketImage && (
<View>

<View key={rocketImage.id} style={styles.imageOfDay}>
                  <Image source={{ uri: rocketImage.img }} style={styles.image} />
                  <View style={styles.imageOfDayOverlay}></View>
                </View>
                
                <View style={styles.rocketNameContainer}>
                  <Text style={styles.imageOfTheDayText}>RocketPad's Rocket Spotlight</Text>
                  <Text style={styles.rocketName}>{rocketImage.name}</Text>
                  {/* <Button style={styles.rocketNameButton}> Explore <Icon style={styles.icon} name="arrow-right" size={20} color="white" /></Button> */}
                  {/* <Chip icon="arrow-right" mode="outlined" onPress={() => console.log('Pressed')}>Explore</Chip> */}
                  <TouchableOpacity
                onPress={() =>
                  navigation.navigate("rocket", { rocketId: rocketImage.id, rocketsImage: rocketImage.rocketImage})
                }
              >
                  <View style={styles.rocketNameButton}>
                    <Text style={styles.buttonText}>Explore</Text>
                    <Icon style={styles.icon} name="arrow-right" size={20} color="white" />
                    </View>
                    </TouchableOpacity >
                  </View>
</View>
      )}

      <Text style={styles.latestNews}>Latest News</Text>
      {loadingNews ?(
          <View style={styles.loadingContainer}>
<ActivityIndicator animating={true} color={MD2Colors.red800}  size="large"/>
          </View>
      ) : (
      <View style={styles.container}>
        {newsArticles.map((article, index) => {
          return(
          <View key={index}>
            <TouchableOpacity onPress={() => Linking.openURL(article.url)}>
<Card style={styles.card}>
    <Card.Cover source={{ uri: article.urlToImage }} />
    <Card.Content style={styles.articleContent}>
      <Text variant="titleLarge" style={styles.title}>{article.title}</Text>
      <Text variant="bodyMedium" style={styles.description}>{moment(article.publishedAt).format("DD MMMM YYYY")} | {article.source.name}</Text>
    </Card.Content>
  </Card>
            </TouchableOpacity>
            
           {/* <TouchableOpacity onPress={() => Linking.openURL(article.url)}>
<Card style={styles.card}>
    <Card.Cover source={{ uri: article.image_url}} />
    <Card.Content style={styles.articleContent}>
      <Text variant="titleLarge" style={styles.title}>{article.title}</Text>
      <Text variant="bodyMedium" style={styles.description}>{moment(article.published_at).format("DD MMMM YYYY")} | {article.news_site}</Text>
    </Card.Content>
  </Card>
            </TouchableOpacity> */}
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
    marginTop: 60,
  },

  imageOfDay: {
    width: "100%",
    height: 850,
    position: 'relative',

  },
  
  imageOfDayOverlay:{
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    top: 0,
    left: 0,
width: "100%",
height: 850,
  },

  imageOfTheDayText: {
    fontSize: 16,
    // textAlign: "center",
color: "white",
fontWeight: "bold",
  },

  latestNews: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 40,
    textAlign: "center",
    marginTop: 60,
  },

  rocketName:{
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginTop: 15,
  },

  rocketNameContainer:{
zIndex: 1,
position: 'absolute',
top: 450,
left: 20,

  },
  rocketNameButton:{
  borderColor: "white", 
  borderWidth: 2,
  borderRadius:8,
  marginTop: 15,
  flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    width:160,
  },

  icon:{
marginLeft: 10,
  },

  buttonText:{
    fontSize: 16,
    fontWeight: "bold",
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
  
  },
  image: {
    resizeMode: "cover",
    flex: 1,
    alignItems: "center",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
export default Home;