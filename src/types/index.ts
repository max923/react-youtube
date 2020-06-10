export interface Snippet {
  channelId: string
  description: string
  title: string
  thumbnails: {
    high: {
      url: string
    }
  }
}

interface Item {
  etag: string
  id: {
    videoId: string
    kind: string
  }
  snippet: Snippet
}

export interface DefaultRootState {
  keyword?: string
  isLoading: number
  currentPage: 1
  items?: Item[]
  nextPageToken?: string
  pageInfo?: {
    totalResults: number
    resultsPerPage: number
  }
}