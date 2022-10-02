import ajax from './jsonServerAjax'

const baseURL = 'https://my-json-server.typicode.com/doublesung/photoshare'
// const baseURL = '/api'

// 獲取收藏
export const reqCollections = () => ajax(baseURL + '/collections')

// 獲取指定收藏
export const reqCollectionJsonSever = (id) => ajax(baseURL + `/collections/${id}`)

// 獲取照片封面
export const reqPhotoCover = (id) => ajax(baseURL + `/photoCovers/${id}`)

// 獲取影片封面
export const reqVideoCover = (id) => ajax(baseURL + `/videoCovers/${id}`)

// 刪除收藏
export const reqDeleteCollection = (id) => ajax(baseURL + `/collections/${id}`, '', 'DELETE')

// 向收藏添加照片
export const reqCollectionPatchPhoto = (id, media) => ajax(baseURL + `/collections/${id}`, {media}, 'PATCH')

// 新增收藏
export const reqAddCollection = (collection) => ajax(baseURL + '/collections', collection, 'POST')

// 編輯收藏標題說明
export const reqEditCollection = (id, title, description) => ajax(baseURL + `/collections/${id}`, {title, description}, 'PATCH')

// 獲取搜尋紀錄
export const reqSearchRecords = () => ajax(baseURL + '/serchRecords')

// 新增搜尋紀錄
export const reqAddSearchRecord = (searchRecord) => ajax(baseURL + '/serchRecords', searchRecord, 'POST')

// 刪除搜尋紀錄
export const reqDeleteSearchRecord = (id) => ajax(baseURL + `/serchRecords/${id}`, '', 'DELETE')

// 重排搜尋紀錄
export const reqArraySearchRecords = (searchRecords) => ajax(baseURL + '/serchRecords', searchRecords, 'PUT')