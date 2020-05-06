import React, { useReducer, createContext, Context } from 'react';
import { mutations } from './mutations';
import { initialReucer } from './state';
import { InitialReucer, Action, InitContent } from 'src/types/store/state';

function reducer(state: InitialReucer, action: Action) {
    return action.type && mutations[action.type] ? mutations[action.type](state, action) : state;
}
// 创建上下文实例
const ProviderContext: Context<InitContent> = createContext({}) as any;

// 高阶组件，给函数组件注入上下文
const providerHoc = (reduce: typeof reducer, initialState: InitialReucer) => (
    Com: React.FC<any>
) => {
    return () => {
        const [state, dispatch] = useReducer(reduce, initialState);
        return (
            <ProviderContext.Provider value={{ state, dispatch }}>
                <Com />
            </ProviderContext.Provider>
        );
    };
};
// 注入reducer,initialReucer到Test组件中，通过高阶组件对Test组件进行包裹注入

const StoreHOC = providerHoc(reducer, initialReucer);

export { ProviderContext, StoreHOC };
