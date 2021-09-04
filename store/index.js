import { createStore } from 'redux'
import appReducer from './reducer'

let store = createStore(appReducer)

store.subscribe(() => console.log("Store Changed",store.getState()))


export default store

