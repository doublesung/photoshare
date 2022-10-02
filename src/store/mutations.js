export default {
  // pexel
  RECEIVE_FEARTUREDPHOTOS(state, result) {
    state.newMedia = result.photos
    state.page = result.page
    state.totalResult = result.total_results
  },
  RECEIVE_FEARTUREDVIDEOS(state, result) {
    state.newMedia = result.videos
    state.page = result.page
    state.totalResult = result.total_results
  },
  RECEIVE_SEARCHPHOTOS(state, result) {
    state.newMedia = result.photos
    state.page = result.page
    state.totalResult = result.total_results
  },
  RECEIVE_SEARCHVIDEOS(state, result) {
    state.newMedia = result.videos
    state.page = result.page
    state.totalResult = result.total_results
  },
  RECEIVE_FEATUREDCOLLECTIONS(state, featuredCollections) {
    state.featuredCollections = featuredCollections
  },
  RECEIVE_COLLECTION_PEXEL(state, result) {
    state.newMedia = result.media
    state.totalResult = result.total_results
  },
  

  // json-server
  RECEIVE_COLLECTIONS(state, collections) {
    state.collections = collections
  },
  RECEIVE_COLLECTION_JSONSERVER(state, collection) {
    state.collection = collection
    state.newMedia = collection.media
    state.totalResult = collection.media.length
  },
  RECEIVE_SEARCHRECORDS(state, searchRecords) {
    state.searchRecords = searchRecords
  },
  RECEIVE_PHOTOCOVER(state, photoCover) {
    state.photoCover = photoCover
  },
  RECEIVE_VIDEOCOVER(state, videoCover) {
    state.videoCover = videoCover
  },
  

  // local
  NEW_COLLECTION(state, newCollection) {
    state.collection = newCollection
  },
  SET_MEDIUM(state, medium) {
    state.medium = medium
  },
  SET_TOTALRESULT(state, totalResult) {
    state.totalResult = totalResult
  }
}