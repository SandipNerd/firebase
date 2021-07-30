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

const AddFoodScreen = props => {
  const newReference = database().ref('/foods').push();

  const {name} = props.route.params ? props.route.params : '';
  const {calory} = props.route.params ? props.route.params : '';
  const {id} = props.route.params ? props.route.params : '';

  const [visible, setVisible] = useState(false);
  const [foodName, setFoodName] = useState(name);
  const [foodCalory, setFoodCalory] = useState(calory);

  const submitHandler = id => {
    if (foodName !== '' && foodCalory !== '' && id !== undefined) {
      database()
        .ref(`/foods/${id}`)
        .update({
          name: foodName,
          calory: foodCalory,
        })
        .then(() => {
          setVisible(false);
          alert('food updated successfully!');
          props.navigation.navigate('Food_List');
        });
    } else {
      setVisible(true);
      newReference
        .set({
          name: foodName,
          calory: foodCalory,
        })
        .then(() => {
          setVisible(false);
          alert('food submitted successfully!');
          props.navigation.navigate('Food_List');
        });
    }
  };

  return (
    <View style={styles.formContainer}>
      <Modal visible={visible} transparent={true}>
        <View style={styles.modalView}>
          <ActivityIndicator color="#2ecc71" size="large" />
        </View>
      </Modal>
      <View style={styles.formInput}>
        <Text style={styles.inputText}>Food Name</Text>
        <TextInput
          style={styles.input}
          value={foodName}
          onChangeText={text => {
            console.log(text);
            setFoodName(text);
          }}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.inputText}>Carbohydrates</Text>
        <TextInput
          style={styles.input}
          value={foodCalory}
          onChangeText={text => {
            setFoodCalory(text);
          }}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          submitHandler(id);
        }}>
        <View style={styles.submitButton}>
          {name ? (
            <Text style={styles.updateText}>Update Food</Text>
          ) : (
            <Text style={styles.addText}>Add New Food</Text>
          )}
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
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  updateText: {color: '#FFF', fontSize: 18, fontWeight: 'bold'},
  addText: {color: '#FFF', fontSize: 18, fontWeight: 'bold'},
});

export default AddFoodScreen;
