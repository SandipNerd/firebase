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

const newReference = database().ref('/foods');

const HomeScreen = props => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(foods);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    newReference.on('value', snapshot => {
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
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
            }}
          />
          <View style={styles.contentContainer}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text>
              <Text style={styles.caloryText}>{item.calory} </Text>
              <Text>calories</Text>
            </Text>
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('New_Food', {
                id: item.id,
                name: item.name,
                calory: item.calory,
              });
            }}>
            <View style={styles.updateButton}>
              <Text style={styles.updateText}>update</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteHandler(item.id);
            }}>
            <View style={styles.deleteButton}>
              <Text style={styles.deleteText}>delete</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
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
      <View style={styles.addButton}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            props.navigation.navigate('New_Food');
          }}>
          <View style={styles.buttonContainer}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {flexDirection: 'row', alignItems: 'center', padding: 20},
  imageContainer: {flexDirection: 'row', alignItems: 'center'},
  image: {width: 70, height: 70, borderRadius: 35},
  buttonContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {paddingHorizontal: 10},
  nameText: {fontWeight: 'bold', fontSize: 18},
  caloryText: {
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  buttonWrapper: {flexDirection: 'row', marginLeft: 50},
  updateButton: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  updateText: {fontWeight: 'bold', color: '#fff'},
  deleteButton: {
    marginLeft: 10,
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  deleteText: {fontWeight: 'bold', color: '#fff'},
  loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  addButton: {position: 'absolute', bottom: 30, right: 30},
  addText: {fontSize: 30, color: '#fff'},
});

export default HomeScreen;
