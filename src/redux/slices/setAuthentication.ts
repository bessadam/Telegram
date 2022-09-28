import { createAsyncThunk, createSlice }  from "@reduxjs/toolkit";
import { UserInterface } from "../../types/User";
import { ContactsInterface } from "../../types/Contacts";

export const fetchUsers = createAsyncThunk(
	"users/fetchUsers", 
  async function(_, {rejectWithValue}) { 
    try {
      const usersResponse = await fetch("https://62b41a1b530b26da4cb65dda.mockapi.io/Users");
      const users = await usersResponse.json();
      const currentUser = users.find((user: UserInterface) => user.email === localStorage.getItem("email"));

      if(!usersResponse.ok) {
        throw new Error("server error");
      }
      
      return {users, currentUser};
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
)

export const registerNewUser = createAsyncThunk(
  "users/registerNewUser",
  async function (value: ContactsInterface, {rejectWithValue}) {
    try {
      const response = await fetch('https://62b41a1b530b26da4cb65dda.mockapi.io/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      });

      if (!response.ok) {
        throw new Error('Regiester is unsuccessful. Server error.');
      }
  } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

interface SignI {
  id: number;
  signIsActive: boolean;
  users: ContactsInterface[];
  user: UserInterface | null;
  status: string | null;
  error: string | null;
}

/*
  Id===0 - SignIn component
  Id===1 - SingUp component
*/

const initialState: SignI = {
  id: 0,
  signIsActive: true,
  users: [],
  user: null,
  status: null,
  error: null,
}

const setAuthentication = createSlice({
  name: "handleResize",
  initialState,
  reducers: {
    setRegistredUser(state, action) {
      state.users.push(action.payload);
    },
    switchSign(state, action) {
      state.id = action.payload.id
    },
    completeSign(state, action) {
      state.signIsActive = action.payload.active
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => { 
      state.status = "loading";
      state.error = null;
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = "resolved";
      state.users = action.payload.users;
      state.user = action.payload.currentUser;
    })
    builder.addCase(fetchUsers.rejected, (state) => { 
			state.status = "rejected";
      state.error = "server rejected";
    })
  }
});

export const { setRegistredUser, switchSign, completeSign } = setAuthentication.actions;

export default setAuthentication.reducer;

