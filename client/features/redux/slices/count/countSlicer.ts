import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameType } from '../../../../types/game/game';

type NumberType = {
    count: GameType['count'];
}
const initialState: NumberType = {
    count: ''
}

export const pinSlice = createSlice({
    name: 'pin',
    initialState,
    reducers: {
        setCount: (state, action) => {
            state.count = action.payload
        }
    }
})


export const { setCount } = pinSlice.actions;

export default pinSlice.reducer;