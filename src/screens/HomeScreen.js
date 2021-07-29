'https://reactnativeproject-8198f-default-rtdb.firebaseio.com/';

import database from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';

const reference = database().ref('/foods/');

const HomeScreen = props => {
  const [foods, setFoods] = useState([]);
  const [check, setCheck] = useState(true);
  const [loading, setLoading] = useState(false);

  console.log(foods);
  useEffect(() => {
    getData();
    setCheck(!check);
  }, []);
  const getData = () => {
    database()
      .ref('/foods/')
      .on('value', snapshot => {
        let newFood = [];
        snapshot.forEach(data => {
          const dataVal = data.val();
          newFood.push({
            id: data.key,
            name: dataVal.name,
            calory: dataVal.calory,
          });
          setFoods(newFood);
        });
      });
  };
  const deleteHandler = async id => {
    console.log(id);
    await database().ref(`/foods/${id}`).remove();
  };

  const renderFood = ({item}) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 20}}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '50%'}}>
          <Image
            style={{width: 70, height: 70, borderRadius: 35}}
            source={{
              uri: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
            }}
          />
          <View style={{paddingHorizontal: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.name}</Text>
            <Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#2ecc71',
                }}>
                {item.calory}{' '}
              </Text>
              <Text>calories</Text>
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginLeft: 50}}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('New Food', {
                id: item.id,
                name: item.name,
                calory: item.calory,
              });
            }}>
            <View
              style={{
                backgroundColor: '#2ecc71',
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
              }}>
              <Text style={{fontWeight: 'bold', color: '#fff'}}>update</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteHandler(item.id);
            }}>
            <View
              style={{
                marginLeft: 10,
                backgroundColor: 'red',
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
              }}>
              <Text style={{fontWeight: 'bold', color: '#fff'}}>delete</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#2ecc71" />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={foods}
        keyExtractor={item => item.id}
        renderItem={renderFood}
      />
      <View style={{position: 'absolute', bottom: 30, right: 30}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            props.navigation.navigate('New Food');
          }}>
          <View style={styles.buttonContainer}>
            <Text style={{fontSize: 30, color: '#fff'}}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
