import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';

const Task = ({ item, filter, editTasks, toggleTaskCompletion, removeTask }) => {
  if (filter === 'completed' && !item.completed) return null; // Skip rendering if filtering for completed tasks and current task is incomplete
  if (filter === 'incomplete' && item.completed) return null; // Skip rendering if filtering for incomplete tasks and current task is completed

  const handlePress = () => {
    if (editTasks) {
      Alert.alert('Edit Modal', 'Show Edit Modal');
    } else {
      toggleTaskCompletion(item.id);
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress} onLongPress={() => removeTask(item.id)}>
      <View style={[styles.task, { backgroundColor: '#fff' }]}>
        <Text style={[styles.taskText, item.completed && styles.completedTask]}>{item.title}</Text>
        {item.completed ? (
          <Image style={styles.imgStyle} source={require('../assets/check.png')} />
        ) : (
          <>
            {editTasks ? (
              <Image style={styles.imgStyle} source={require('../assets/edit.png')} />
            ) : (
              <Image style={styles.imgStyle} source={require('../assets/close.png')} />
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles= StyleSheet.create({
    task: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',
        borderRadius: 10,
        marginVertical: 5,
        shadowOpacity: 0.3,
        shadowOffset: { width: 1, height: 1 },
        height: 60,
        margin: 5,
        elevation: 3
    
    
      },
      taskText: {
        fontSize: 16,
      },
      completedTask: {
        textDecorationLine: 'line-through',
        color: '#ccc',
      },
})

export default Task;
