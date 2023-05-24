import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { ApiError, apiErrorHandler } from 'api';
import sleep from 'helpers/sleep';
import { RootState } from 'store';

export interface Role {
    id: number;
    name: string;
}
export type RolesList = Role[];

interface RolesState {
    items: RolesList;
    isLoading: boolean;
    error: ApiError | null;
}

const fetchRoles = createAsyncThunk<RolesList, undefined, { rejectValue: ApiError }>(
    'roles/fetchRoles',
    async (_, thunkApi) => {
        let response: AxiosResponse<RolesList>;

        try {
            await sleep(2000);
            response = await axios.get<RolesList>('/mocks/roles.json');
        } catch (error) {
            return thunkApi.rejectWithValue(apiErrorHandler(error));
        }

        return response.data;
    }
);

const initialState: RolesState = {
    items: [],
    isLoading: true,
    error: null,
};

const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        reset: (state) => {
            state = initialState;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoles.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || { message: 'Произошла непредвиденная ошибка' };
            });
    },
});

const selectRoles = (state: RootState): RolesList => state.roles.items;
const selectRolesError = (state: RootState): ApiError | null => state.roles.error;
const selectRolesLoadingStatus = (state: RootState): boolean => state.roles.isLoading;

const { reset } = rolesSlice.actions;

export default rolesSlice.reducer;
export { reset, fetchRoles, selectRoles, selectRolesError, selectRolesLoadingStatus };
