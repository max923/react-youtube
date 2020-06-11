export const SEARCH_VIDEOS = 'SEARCH_VIDEOS'
export const UPDATE_IS_PENDING = 'UPDATE_IS_PENDING'
export const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE'
export const UPDATE_MORE_VIDEOS = 'UPDATE_MORE_VIDEOS'
export const RESET_SEARCH = 'RESET_SEARCH'
import { isEmpty, isEqual } from 'lodash'
import { DefaultRootState } from '../../types'
import config from '../../../config'

const { API_KEY } = config

export const searchViedos = (value: {
  keyword: string,
  data: any
}) => ({
  type: SEARCH_VIDEOS,
  value
})

const shouldFetchVideos = (currentPage: number, state: DefaultRootState): boolean => {
  if(currentPage * 10 > state.items.length) return true
  return false
}

const updateCurrentPage = (currentPage: number) => {
  return ({
    type: UPDATE_CURRENT_PAGE,
    value: currentPage
  })
}

const UpdateIsPaending = (status: number) => ({
  type: UPDATE_IS_PENDING,
  value: status
})

const updateMoreVideos = (value: any) => ({
  type: UPDATE_MORE_VIDEOS,
  value
})

const resetSearch = () => ({
  type: RESET_SEARCH,
})

export const fetchVideosIfNeeded = (currentPage: number) => (dispatch: Function, getState: Function) => {
  const searchStore = getState().search
  if(shouldFetchVideos(currentPage, searchStore)){
    dispatch(UpdateIsPaending(1))
    const { nextPageToken, keyword } = searchStore
    return fetch(`https://www.googleapis.com/youtube/v3/search?q=${keyword}&pageToken=${nextPageToken}&part=snippet&type=video&maxResults=30&key=${API_KEY}`)
      .then((response) => response.json())
      .then((jsonData) => {
        dispatch(updateCurrentPage(currentPage))
        dispatch(updateMoreVideos(jsonData))
      })
  } else {
    dispatch(updateCurrentPage(currentPage))
  }
}

export const fetchVideos = (text: string) => (dispatch: Function, getState: Function) => {
  if(isEmpty(text)) dispatch(resetSearch())
  else {
    const keyword = getState().search.keyword
    if(!isEqual(keyword, text)) {
      dispatch(UpdateIsPaending(1))
      return fetch(`https://www.googleapis.com/youtube/v3/search?q=${text}&part=snippet&type=video&maxResults=30&key=${API_KEY}`)
        .then((response) => response.json())
        .then((jsonData) => {
          dispatch(searchViedos({
            keyword: text,
            data: jsonData,
          }))
        })
    }
  }
}
