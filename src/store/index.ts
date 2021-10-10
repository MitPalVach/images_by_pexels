import photoReducer from "./reducers/photosReducer";
import thunk from "redux-thunk";
import {applyMiddleware, combineReducers, createStore} from "redux";


const rootReducer = combineReducers({
    photos: photoReducer,
})

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export type RootState = ReturnType<typeof rootReducer>

export default store






