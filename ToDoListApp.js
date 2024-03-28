import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Image, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, toggleCompletion, deleteTask } from './Redux/actions/taskAction';
import useSortingOrder from './Redux/hooks/SortingOrder';
import usePersistentFilterState from './Redux/hooks/usePersistentFilterState'
import useModal from './Redux/hooks/useModal';
import filterButtons from './Redux/actionButtons/actionButtons'
import ModalScreen from './components/Todo_Change_Modal';
import Task from './components/Task';

export default function ToDoListApp() {
  const [task, setTask] = useState('');
  const [filter, setFilter] = usePersistentFilterState('all'); // Default to show all tasks
  const [isVisible, toggleModal] = useModal(); // Use the useModal hook
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTasks, setEditTasks] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  // const [filterModal, setFilterModal] = useState('all'); // Default to show all tasks
  const [sortOrder, setSortOrder] = useSortingOrder(); // Default to ascending order
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();

  const addNewTask = () => {
    if (task.trim() !== '') {
      dispatch(addTask({ id: Math.random().toString(), title: task, completed: false, dueDate: new Date() }));
      setTask('');
    }
  };

  const toggleTaskCompletion = id => {
    dispatch(toggleCompletion(id));
  };

  const removeTask = id => {
    dispatch(deleteTask(id));
  };


  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

  };

  const sortTasksByDueDate = (tasks, sortOrder) => {
    return tasks.slice().sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else {
        return new Date(b.dueDate) - new Date(a.dueDate);
      }
    });
  };





  const renderTask = ({ item }) => {
    if (filter === 'completed' && !item.completed) return null; // Skip rendering if filtering for completed tasks and current task is incomplete
    if (filter === 'incomplete' && item.completed) return null; // Skip rendering if filtering for incomplete tasks and current task is completed

    return (
      <TouchableOpacity activeOpacity={0.9} onPress={() => editTasks ? alert('Show Wdit Modal') : toggleTaskCompletion(item.id)} onLongPress={() => removeTask(item.id)}>
        <View style={[styles.task, { backgroundColor: '#fff' }]}>
          {/* <Text style={[styles.taskText, item.completed && styles.completedTask]}>{item.title}</Text> */}
          <Text style={[styles.taskText, item.completed && styles.completedTask]}>{item.title}</Text>
          {item.completed ? <Image style={styles.imgStyle} source={require('./assets/check.png')} /> :
            <>
              {editTasks ?
                <Image style={styles.imgStyle} source={require('./assets/edit.png')} /> :
                <Image style={styles.imgStyle} source={require('./assets/close.png')} />
              }
            </>
          }
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>Todo App</Text>
        <TouchableOpacity onPress={() => setEditTasks(!editTasks)}>
          <Image style={styles.actionButtonImage} source={require('./assets/edit.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={task}
          onChangeText={text => setTask(text)}
          placeholder="Add a new task"
        />
        <TouchableOpacity style={styles.actionButtonContainer} onPress={addNewTask}>
          <Image style={styles.actionButtonImage} source={require('./assets/add.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleModal(true)} style={styles.actionButtonContainer} >
          <Image style={styles.actionButtonImage} source={require('./assets/filter.png')} />
        </TouchableOpacity>

      </View>

      <FlatList
        style={styles.taskList}
        data={sortTasksByDueDate(tasks, sortOrder)}
        renderItem={({ item }) => (
          <Task
            item={item}
            filter={filter}
            editTasks={editTasks}
            toggleTaskCompletion={toggleTaskCompletion}
            removeTask={removeTask}
          />
        )}
        keyExtractor={item => item.id}
      />

      <ModalScreen
        isVisible={isVisible}
        toggleModal={toggleModal}
        sortOrder={sortOrder}
        toggleSortOrder={toggleSortOrder}
        filterButtons={filterButtons}
        setFilter={setFilter}
        filter={filter}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },

  sortLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '70%',
    paddingHorizontal: 10,
    borderRadius: 5
  },
  taskList: {
    marginTop: 20,
  },
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
  imgStyle: {
    resizeMode: 'contain',
    width: 25,
    height: 25
  },
  actionButtonImage: {

    resizeMode: 'contain',
    width: 20,
    height: 20

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
  },
  modalInnerContainer: {
    width: 300,
    height: 300,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 5
  },
  actionButtonContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 2,
    width: 35,
    height: 35,
    shadowOpacity: 0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedFilterButton: {
    backgroundColor: '#3badfb',
    borderRadius: 5,
  },
  applyFilterContainer: {
    padding: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButtonText: {
    fontSize: 16,
  },
});