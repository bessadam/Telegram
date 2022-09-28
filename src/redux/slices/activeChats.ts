import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//interfaces
import { ChannelInterface } from "../../types/ChannelInterface";
import { UserInterface } from "../../types/User";
//mock channel
import { channelPlug } from "../db/dbChannels";

export const fetchChats = createAsyncThunk(
	"channels/fetchChannels", 
  async function(_, {rejectWithValue}) {
    try {
      const usersResponse = await fetch("https://62b41a1b530b26da4cb65dda.mockapi.io/Users");
      const users = await usersResponse.json();

      const channelsResponse = await fetch("https://62b41a1b530b26da4cb65dda.mockapi.io/Channels");
      const channels = await channelsResponse.json();
      const loggedUser = users.find((user: UserInterface) => user.email === localStorage.getItem("email"));
      const userChannels: ChannelInterface[] = [];

      for(let i = 0; i < loggedUser.channels.length; i++) {
        userChannels.push(channels.filter((channel: ChannelInterface) => channel.id === loggedUser.channels[i].id));
      }
      
      for(let i = 0; i < userChannels.length; i++) {
        userChannels.flat().forEach((channel: ChannelInterface) => {
          if(channel.id === loggedUser?.channels[i].id) {
            channel.muted = loggedUser?.channels[i].muted;
          }
        })  
      }

      const notActiveChannels = channels.filter((channel: ChannelInterface) => !userChannels.flat().includes(channel));
      
      if(!usersResponse.ok) {
        throw new Error("server error");
      }

      return {userChannels, channels, notActiveChannels};
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
)

interface ChannelState {
  channels: ChannelInterface[];
  userChannels: ChannelInterface[];
  notActiveChannels: ChannelInterface[];
  currentChannel: ChannelInterface;
  status: string | null;
  error: string | null;
  chatInfoIsActive: boolean;
}

const initialState: ChannelState = {
  channels: [],
  userChannels: [],
  notActiveChannels: [],
  currentChannel: channelPlug,
  status: null,
  error: null,
  chatInfoIsActive: false,
}

const activeChats = createSlice({
  name: "activeChats",
  initialState,
  reducers: {
    setActiveChannel(state, action) {
      const channel = state.channels.find(channel => channel.id === action.payload.id);
      if(channel) state.currentChannel = channel;
    },
    setChannelEmpty(state, action) {
      for (const prop of Object.getOwnPropertyNames(state.currentChannel)) {
        state.currentChannel && delete state.currentChannel[prop as keyof ChannelInterface];
      }
    },
    setChannelMuted(state, action) {
      const choosedChannel = state.userChannels.find(channel => channel.id === state.currentChannel?.id);
      if(choosedChannel) choosedChannel.muted = !choosedChannel.muted;
    },
    setChannels(state, action) {
      state.channels = action.payload.userChannels;
    },
    joinNewUserChannel(state, action) {
      state.userChannels.push(action.payload.newChannel);
    },
    removeUserChannel(state, action) {
      state.userChannels = state.userChannels.filter(channel => channel.id !== action.payload.id);
    },
    setChatInfoActive(state, action) {
      state.chatInfoIsActive = action.payload.active;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChats.pending, (state) => { 
      state.status = "loading";
      state.error = null;
    })
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.status = "resolved";
      state.userChannels = action.payload.userChannels.flat();
      state.channels = action.payload.channels;
      state.notActiveChannels = action.payload.notActiveChannels;
    })
    builder.addCase(fetchChats.rejected, (state) => { 
			state.status = "rejected";
      state.error = "server rejected";
    })
  }
})

export const { 
  setActiveChannel, 
  setChannelEmpty, 
  setChannelMuted, 
  setChannels, 
  joinNewUserChannel, 
  removeUserChannel, 
  setChatInfoActive
} = activeChats.actions;

export default activeChats.reducer;