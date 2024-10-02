import { RootState } from "@/store";
import { User } from "@elearning/lib/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  payload?: User | null;
}

const initialState: UserState = {
  payload: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null | undefined>) => {
      state.payload = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState): UserState["payload"] =>
  state.user.payload;

export default userSlice.reducer;
