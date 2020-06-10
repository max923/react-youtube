import { combineReducers } from 'redux'
import {
  SEARCH_VIDEOS,
  UPDATE_IS_PENDING,
  UPDATE_CURRENT_PAGE,
  UPDATE_MORE_VIDEOS,
  RESET_SEARCH
} from '../actions/index'
import { DefaultRootState } from '../../types/index'

const initialState: DefaultRootState = {
  keyword: '',
  currentPage: 1,
  isLoading: 0,
  items: [],
  nextPageToken: '',
  pageInfo: {
    totalResults: 0,
    resultsPerPage: 0
  }
}

function search(
  state = initialState,
  action: any
) {
  switch (action.type) {
    case RESET_SEARCH:
      return initialState
    case UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.value
      }
    case UPDATE_IS_PENDING:
      return {
        ...state,
        isLoading: action.value
      }
    case UPDATE_MORE_VIDEOS:
      const newItems = [...state.items, ...action.value.items ]
      return {
        ...state,
        items: newItems,
        pageInfo: action.value.pageInfo,
        isLoading: 0,
        nextPageToken: action.value.nextPageToken
      }
    case SEARCH_VIDEOS:  
      const { keyword, data } = action.value
      const { items, pageInfo, nextPageToken } = data
      return {
        ...state,
        keyword,
        items,
        pageInfo,
        isLoading: 0,
        nextPageToken
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  search
})

export default rootReducer