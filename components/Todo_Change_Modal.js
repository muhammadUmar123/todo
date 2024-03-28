// ModalScreen.js

import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image,StyleSheet } from 'react-native';

const ModalScreen = ({ isVisible, toggleModal, sortOrder, toggleSortOrder, filterButtons, setFilter, filter }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={toggleModal}>
      <View style={styles.modalContainer}>
          <View style={styles.modalInnerContainer}>
            <View style={{ padding: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Apply Filter</Text>
              <TouchableOpacity onPress={toggleModal}>
                <Image style={styles.imgStyle} source={require('../assets/close.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.sortContainer}>
              <Text style={styles.sortLabel}>Order By:</Text>
              <TouchableOpacity  onPress={toggleSortOrder}>
                <Text style={{color:'#3badfb',fontWeight:'bold',marginLeft:15}}>{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Show Filter</Text>
            <View style={{ height: 20 }} />
            {filterButtons.map((button, index) => (
              <TouchableOpacity key={index} onPress={() => setFilter(button.filter)} style={[styles.filterButton, filter === button.filter && styles.selectedFilterButton]}>
                <Text style={[styles.filterButtonText, filter === button.filter ? { color: '#fff' } : { color: '#000' }]}>
                  {button.title}
                </Text>
                {filter === button.filter && <Text style={[styles.checkmark, filter === button.filter ? { color: '#fff' } : { color: '#000' }]}>✓</Text>}
              </TouchableOpacity>
            ))}
            {/* <Button title="Close" onPress={toggleModal} /> */}
          </View>
        </View>
    </Modal>
  );
}

const styles=StyleSheet.create({
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
})

export default ModalScreen;
