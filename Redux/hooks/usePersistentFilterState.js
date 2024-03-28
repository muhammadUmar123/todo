import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const usePersistentFilterState = (defaultValue) => {
  const [filter, setFilter] = useState(defaultValue);

  // Load filter state from AsyncStorage on component mount
  useEffect(() => {
    const loadFilterState = async () => {
      try {
        const savedFilter = await AsyncStorage.getItem('@filter');
        if (savedFilter !== null) {
          setFilter(savedFilter);
        }
      } catch (error) {
        console.error('Error loading filter state:', error);
      }
    };
    loadFilterState();
  }, []); // Empty dependency array to run effect only once on component mount

  // Save filter state to AsyncStorage whenever it changes
  const setPersistentFilter = async (newFilter) => {
    try {
      await AsyncStorage.setItem('@filter', newFilter);
      setFilter(newFilter);
    } catch (error) {
      console.error('Error saving filter state:', error);
    }
  };

  return [filter, setPersistentFilter];
};

export default usePersistentFilterState;
