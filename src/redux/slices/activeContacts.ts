import { createAsyncThunk, createSlice }  from "@reduxjs/toolkit";
//interface
import { ContactsInterface, ContactContactsInterface } from "../../types/Contacts";
import { UserInterface } from "../../types/User";

export const fetchContacts = createAsyncThunk(
	"chats/fetchContacts", 
  async function(_, {rejectWithValue}) { 
    try {
      const response = await fetch("https://62b41a1b530b26da4cb65dda.mockapi.io/Users");
      const users = await response.json();
      const loggedUser = users.find((user: UserInterface) => user.email === localStorage.getItem("email"));
      const userContacts: ContactsInterface[] = [];

      for(let i = 0; i < loggedUser.contacts.length; i++) {
        userContacts.push(users.filter((user: UserInterface) => user.id === loggedUser.contacts[i].id));
      }
      
      let userContactChats = loggedUser.contacts.filter((contact: ContactContactsInterface) => contact.chats.length > 0);
      const contactChats = [];

      for(let i = 0; i < userContactChats.length; i++) {
        contactChats.push(users.filter((user: ContactsInterface) => user.id === userContactChats[i].id));
      }

      if(!response.ok) {
        throw new Error("server error");
      }

      const notFriendContacts = users.filter((user: ContactsInterface) => !userContacts.flat().includes(user) && user.id !== loggedUser.id);
      
      return {users, userContacts, loggedUser, notFriendContacts};
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
)

interface ContactsI {
  users: UserInterface[];
  notFriendContacts: ContactsInterface[];
  contacts: ContactsInterface[];
  currentUser: ContactsInterface | null;
  activeContactChat: ContactsInterface | any;
  status: string | null;
  error: string | null;
}

const initialState: ContactsI = {
  users: [],
  notFriendContacts: [],
  contacts: [],
  currentUser: null,
  activeContactChat: {},
  status: null,
  error: null,
}

const activeContacts = createSlice({
  name: "activeContacts",
  initialState,
  reducers: {
    setActiveContactChat(state, action) {
      const contact = state.contacts.find(contact => contact.id === action.payload.id)
      if(contact) state.activeContactChat = contact;
    },
    setContactChatEmpty(state, action) {
      for (const prop of Object.getOwnPropertyNames(state.activeContactChat)) {
        state.activeContactChat && delete state.activeContactChat[prop as keyof ContactsInterface];
      }
    },
    deleteUserContactChat(state, action) {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload.id);
    },
    clearContactChatHistory(state, action) {
      const user = state.contacts.find(contact => contact.id === action.payload.id);
      const currentChat = user?.contacts.find(contact => contact.id === state.currentUser?.id);
      if(currentChat) currentChat.chats = [];
    },
    sendNewMessage(state, action) {
      let messageConsumer = state.contacts.find(contact => contact.id === action.payload.id);
      
      if(messageConsumer) {
        let user = messageConsumer.contacts.find(chat => chat.id === state.currentUser?.id);
        user && user.chats.push(action.payload.message);
      }
    },
    addNewContactToLoggedUser(state, action) {
      state.contacts.push(action.payload.contact);
      state.notFriendContacts = state.notFriendContacts.filter(user => user.id !== action.payload.contact.id);

      // adding new contact to current logged user 
      state.currentUser?.contacts.push({id: action.payload.contact.id, muted: false, chats: []});
    },
    addNewContactToOtherUser(state, action) {
      const otherUser = state.contacts.find(contact => contact.id === action.payload.id);

      // adding new contact to other Person
      state.currentUser?.id && otherUser?.contacts.push({id: state.currentUser.id, muted: false, chats: []});
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.pending, (state) => { 
      state.status = "loading";
      state.error = null;
    })
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.status = "resolved";
      state.users = action.payload.users;
      state.notFriendContacts = action.payload.notFriendContacts;
      state.contacts = action.payload.userContacts.flat();
      state.currentUser = action.payload.loggedUser;
    })
    builder.addCase(fetchContacts.rejected, (state) => { 
			state.status = "rejected";
      state.error = "server rejected";
    })
  }
})

export const { 
  setActiveContactChat, 
  setContactChatEmpty, 
  sendNewMessage, 
  addNewContactToLoggedUser, 
  deleteUserContactChat, 
  clearContactChatHistory,
  addNewContactToOtherUser 
} = activeContacts.actions;

export default activeContacts.reducer;  