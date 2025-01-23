
import {configureStore,combineReducers} from "@reduxjs/toolkit"
import userSlice from "./slices/UserSlice"
import storage from "redux-persist/lib/storage";
import {persistReducer,persistStore} from 'redux-persist'

const persistConfig={
    key:"root",
    storage,
}

const rootReducer=combineReducers({
    user:userSlice,
})

const persistedReducer=persistReducer(persistConfig,rootReducer);

const store = configureStore({
    reducer: persistedReducer,
   
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

const persistor=persistStore(store);
export {persistor}
// const store=configureStore({
//     reducer:{
//         user:userSlice
//     }
// })

export default store