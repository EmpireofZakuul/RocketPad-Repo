import { View, Text } from 'react-native'
import React from 'react'
import { apiKey, endpoint, language, category, pageSize, searchTerm } from '../../newsAPIConfig'

const Home = ({navigation}) => {
  return (
    <View>
      <Text onPress={() => navigation.navigate('Home')}>Home</Text>
    </View>
  )
}

export default Home