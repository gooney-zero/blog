import { CHANGE_IS_LOGIN, CHANGE_IS_ADMIN } from './mutation-types';
import { InitialReucer, Action } from 'src/types/store/state';

export const mutations = {
    [CHANGE_IS_LOGIN](state: InitialReucer, action: Action<'islogin'>): InitialReucer {
        return {
            ...state,
            islogin: action.payload
        };
    },
    [CHANGE_IS_ADMIN](state: InitialReucer, action: Action<'isAdmin'>): InitialReucer {
        return {
            ...state,
            isAdmin: action.payload
        };
    }
};
