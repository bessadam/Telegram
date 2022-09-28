import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit';
import { 
  activeChatsReducer, 
  switchSideMenuReducer,
  handleResizedReducer,
  activeSettingsReducer,
  setAuthenticationReducer,
  activeSearchReducer,
  activeContactsReducer,
  activeModalWindowReducer
} from "./slices";

export const store = configureStore({
  reducer: {
    activeChats: activeChatsReducer,
    activeSideMenu: switchSideMenuReducer,
    handleResize: handleResizedReducer,
    activeSettings: activeSettingsReducer,
    authentication: setAuthenticationReducer,
    activeSearch: activeSearchReducer,
    activeContacts: activeContactsReducer,
    activeModalWindow: activeModalWindowReducer
  },
  middleware: (getDefaultMiddleware)({
    serializableCheck: false,
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
