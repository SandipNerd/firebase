import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Button,
} from 'react-native';
import database from '@react-native-firebase/database';

const newReference = database().ref('/foods').push();

const AddFoodScreen = props => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState();
  const [calory, setCalory] = useState();

  const submitHandler = () => {
    setVisible(true);
    newReference
      .set({
        name: name,
        calory: calory,
      })
      .then(() => {
        setVisible(false);
        alert('food submitted successfully!');
        props.navigation.navigate('Food List');
      });
  };

  return (
    <View style={styles.formContainer}>
      <Modal visible={visible} transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <ActivityIndicator color="#2ecc71" size="large" />
        </View>
      </Modal>
      <View style={styles.formInput}>
        <Text style={styles.inputText}>Food Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={text => {
            setName(text);
          }}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.inputText}>Carbohydrates</Text>
        <TextInput
          style={styles.input}
          value={calory}
          onChangeText={text => {
            setCalory(text);
          }}
        />
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={submitHandler}>
        <View style={styles.submitButton}>
          <Text style={{color: '#FFF', fontSize: 18, fontWeight: 'bold'}}>
            Add New Food
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#fff',
  },
  formInput: {
    marginVertical: 10,
  },
  input: {
    width: '100%',
    height: 45,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#e5f6df',
  },
  inputText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2ecc71',
    marginVertical: 10,
  },
  submitButton: {
    marginVertical: 30,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#2ecc71',
    borderRadius: 10,
  },
});

export default AddFoodScreen;
