import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameType } from '../../../../types/game/game';

type NumberType = {
    number: GameType['pin'];
}
const initialState: NumberType = {
    number: 0
}

export const numberSlice = createSlice({
    name: 'number',
    initialState,
    reducers: {
        setNumber: (state, action) => {
            state.number = action.payload
        }
    }
})


export const { setNumber } = numberSlice.actions;

export default numberSlice.reducer;