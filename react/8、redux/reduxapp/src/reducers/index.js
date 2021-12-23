import { VisibilityFilters } from '../actions'
import {
    ADD_TODO,
    TOGGLE_TODO,
    SET_VISIBILITY_FILTER
} from '../actions'

// const initialState = {
//     VisibilityFilters: VisibilityFilters.SHOW_ALL,
//     todos: [],
// }

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ]
        case TOGGLE_TODO:
            return state.map((todo, index) => {
                if (index === action.index) {
                    return Object.assign({}, todo, {
                    completed: !todo.completed
                    })
                }
                return todo
            })
        default:
            return state
    }
  }
  
function visibilityFilter(state = VisibilityFilters.SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

export default function todoApp(state = {}, action) {
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        todos: todos(state.todos, action)
    }
}