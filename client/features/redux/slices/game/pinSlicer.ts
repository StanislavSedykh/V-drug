import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameType } from '../../../../types/game/game';

type PinType = {
    pin: GameType['pin'];
}
const initialState: PinType = {
    pin: 0
}

export const pinSlice = createSlice({
    name: 'pin',
    initialState,
    reducers: {
        setPin: (state, action) => {
            state.pin = action.payload
        }
    }
})


export const { setPin } = pinSlice.actions;

export default pinSlice.reducer;