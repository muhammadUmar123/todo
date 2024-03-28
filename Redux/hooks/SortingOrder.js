// useSortingOrder.js

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useSortingOrder = () => {
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const loadSortingOrder = async () => {
      try {
        const order = await AsyncStorage.getItem('@sorting_order');
        setSortOrder(order !== null ? order : 'asc');
      } catch (error) {
        console.error('Error loading sorting order:', error);
      }
    };

    loadSortingOrder();

    return () => {
      // Cleanup
    };
  }, []);

  const storeSortingOrder = async (order) => {
    try {
      await AsyncStorage.setItem('@sorting_order', order);
      setSortOrder(order);
    } catch (error) {
      console.error('Error storing sorting order:', error);
    }
  };

  return [sortOrder, storeSortingOrder];
};

export default useSortingOrder;
