// App.js

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Redux/store/store';
import ToDoListApp from './ToDoListApp'; // Assuming your main component is named ToDoListApp
import { SafeAreaView } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{flex:1}}>
        <ToDoListApp />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}
