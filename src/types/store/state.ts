import * as ACTION_TYPES from 'src/store/mutation-types';

export interface InitialReucer {
    islogin: boolean;
    isAdmin: boolean;
}

export interface Action<T = keyof InitialReucer> {
    type: keyof typeof ACTION_TYPES;
    payload: Payload<T>;
}
export type Payload<T> = InitialReucer[T extends keyof InitialReucer ? T : any];
export interface InitContent {
    state: InitialReucer;
    dispatch: React.Dispatch<Action>;
}
