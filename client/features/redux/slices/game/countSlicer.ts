import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameType } from '../../../../types/game/game';

type CountType = {
    count: GameType['count'];
}
const initialState: CountType = {
    count: ''
}

export const countSlice = createSlice({
    name: 'count',
    initialState,
    reducers: {
        setCount: (state, action) => {
            state.count = action.payload
        }
    }
})


export const { setCount } = countSlice.actions;

export default countSlice.reducer;