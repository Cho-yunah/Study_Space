import React, { createContext, useReducer, useContext, useRef } from "react";

// 초기상태 설정
const initialTodos = [
    {id: 1, text: '컴포넌트 스타일링 하기', done: false},
    {id: 2, text: '리듀서 만들기', done: true},
    {id: 3, text: 'API 만들기', done: false},
]

// 리듀서 함수
function todoReducer (state, action) {
    switch (action.type) {
        case 'CREATE' : 
            return state.concat(action.todo);
        case 'TOGGLE' : 
            return state.map(todo => todo.id === action.id? {...todo, done: !todo.done} : todo)
        case 'REMOVE' : 
            return state.filter (todo => todo.id !== action.id )
        default : throw new Error(`Unhandled action type: ${action.type}`)}
    }

const StateContext= createContext()
const DispatchContext = createContext()
const NextIdContext = createContext()


export function TodoProvider ({children}) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(4);

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <NextIdContext.Provider value ={nextId}>
                {children}
                </NextIdContext.Provider>
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
}
export function useTodoState() {
    const context = useContext(StateContext)
    if(!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}
export function useTodoDispatch () {
    const context= useContext(DispatchContext)
    if(!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}
export function useNextId(){
    const context= useContext(NextIdContext)
    if(!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}