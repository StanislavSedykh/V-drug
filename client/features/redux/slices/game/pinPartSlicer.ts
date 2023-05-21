import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameType } from '../../../../types/game/game';

type PinPartType = {
    pinPart: GameType['pin'];
}
const initialState: PinPartType = {
    pinPart: 0
}

export const pinPartSlice = createSlice({
    name: 'pinPart',
    initialState,
    reducers: {
        setPinPart: (state, action) => {
            state.pinPart = action.payload
        }
    }
})


export const { setPinPart } = pinPartSlice.actions;

export default pinPartSlice.reducer;