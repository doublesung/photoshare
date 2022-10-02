import ajax from './pexelAjax'

const baseURL = 'https://api.pexels.com'
// const baseURL = '/apiDev'

// 獲取精選相片
export const reqFeaturedPhotos = (page) => ajax(baseURL + '/v1/curated', page)

// 獲取精選影片
export const reqFeaturedVideos = (page) => ajax(baseURL + '/videos/popular', page)

// 搜尋相片
export const reqSearchPhotos = ({page, query, orientation, size, color}) => {
  return ajax(baseURL + '/v1/search', {page, query, orientation, size, color})
}

// 搜尋影片
export const reqSearchVideos = ({page, query, orientation, size}) => {
  return ajax(baseURL + '/videos/search', {page, query, orientation, size})
}

// 獲取收藏
export const reqCollectionPexel = ({id, page}) => ajax(baseURL + `/v1/collections/${id}`, {page})

// 獲取精選收藏
export const reqFeaturedCollections = ({page, per_page}) => ajax(baseURL + '/v1/collections/featured', {page, per_page})
