import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameType } from '../../../../types/game/game';

type NumberType = {
    number: GameType['pin'];
}
const initialState: NumberType = {
    number: 0
}

export const pinSlice = createSlice({
    name: 'pin',
    initialState,
    reducers: {
        setPin: (state, action) => {
            state.number = action.payload
        }
    }
})


export const { setPin } = pinSlice.actions;

export default pinSlice.reducer;