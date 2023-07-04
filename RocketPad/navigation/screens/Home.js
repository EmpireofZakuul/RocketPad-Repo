import { View, Text } from 'react-native'
import React from 'react'

const Home = ({navigation}) => {
  return (
    <View>
      <Text onPress={() => navigation.navigate('Home')}>Home</Text>
    </View>
  )
}

export default Home