import { View,  StyleSheet, ImageBackground, ScrollView, Image, TouchableOpacity, Linking  } from 'react-native'
import React, { useState, useEffect } from 'react'
import { apiKey, endpoint, language, category, pageSize, searchTerm, domains} from '../../newsAPIConfig'
import axios from 'axios'
import moment from 'moment/moment'
import { ActivityIndicator, MD2Colors, Avatar, Button, Card, Text } from 'react-native-paper';


const Home = ({ navigation }) => {
  const [newsArticles, setNewsArticles] = useState([]);
  const imgg = "https://pbs.twimg.com/media/Fvd3qcoWcAMaVs8?format=jpg&name=large";
  const [loadingNews, setLoadingNews] = useState([]);

  const getNewsArticles = async () => {
    setLoadingNews(true);
    const allNewsArticles = [];

    for (const term of searchTerm) {
      const response = await axios.get(endpoint, {
        params: {
          // category: category,
          domains: domains,
          q: term,
          language: language,
          apiKey: apiKey,
          pageSize: pageSize,
        },
      });
      const articles = response.data.articles;
      
      allNewsArticles.push(...articles);
    }
    // console.log(allNewsArticles);
    const limitedArticles = allNewsArticles.slice(0, pageSize);
    setNewsArticles(limitedArticles);
    setLoadingNews(false);
  };

  useEffect(() => {
    getNewsArticles();
  }, []);

  return (
    <ScrollView>
      <Text style={styles.imageOfTheDayText}>Rocket image of the day</Text>
      <View style={styles.imageOfDay}>
        <ImageBackground source={{ uri: imgg }} style={styles.imageDay} />
      </View>


      <Text style={styles.imageOfTheDayText}>Latest News</Text>
      {loadingNews ?(
          <View style={styles.loadingContainer}>
{/* <ActivityIndicator size="large" color="blue"/> */}
<ActivityIndicator animating={true} color={MD2Colors.red800}  size="large"/>
          </View>
      ) : (
      <View style={styles.container}>
        {newsArticles.map((article, index) => {
          return(
          <View key={index}>
           <TouchableOpacity onPress={() =>
                  Linking.openURL(article.url)}>
            {/* <View style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: article.urlToImage }}style={styles.image}/>
              </View>
              <View style={styles.articleContent}>
                <Text style={styles.title}>{article.title}</Text>
                <Text style={styles.description}>{moment(article.publishedAt).format("DD MMMM YYYY")} | {article.source.name}</Text>
              </View>
            </View> */}

<Card style={styles.card}>
    <Card.Cover source={{ uri: article.urlToImage }} />
    <Card.Content style={styles.articleContent}>
      <Text variant="titleLarge" style={styles.title}>{article.title}</Text>
      <Text variant="bodyMedium" style={styles.description}>{moment(article.publishedAt).format("DD MMMM YYYY")} | {article.source.name}</Text>
    </Card.Content>
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
    paddingTop: 10,
  },

  imageOfDay: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    height: 500,
    marginTop: 30,
  },
  imageDay: {
    flex: 1,
    resizeMode: "contain",
    alignItems: "center",
  },
  imageOfTheDayText: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 40,
    textAlign: "center",
    marginTop: 30,
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
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
export default Home;