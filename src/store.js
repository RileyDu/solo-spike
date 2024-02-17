import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, take } from 'redux-saga/effects';
import axios from 'axios';


function* rootSaga() {

  };

  const sagaMiddleware = createSagaMiddleware();


  
const store = createStore(
  combineReducers({ REDUCERHERE }),
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);


export default store;