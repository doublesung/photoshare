export default {
  // pexel
  RECEIVE_FEARTUREDPHOTOS(state, result) {
    if (result.status) {
      state.newMedia = result.data.photos
      state.page = result.data.page
      state.totalResult = result.data.total_results
      state.isOverLimitRequest = false
      state.isRequestError = false
    } else {
      if (result.response.status == 429) {
        state.isOverLimitRequest = true
      } else {
        state.isRequestError = true
      }
    }
  },
  RECEIVE_FEARTUREDVIDEOS(state, result) {
    if (result.status) {
      state.newMedia = result.data.videos
      state.page = result.data.page
      state.totalResult = result.data.total_results
      state.isOverLimitRequest = false
      state.isRequestError = false
    } else {
      if (result.response.status == 429) {
        state.isOverLimitRequest = true
      } else {
        state.isRequestError = true
      }
    }
  },
  RECEIVE_SEARCHPHOTOS(state, result) {
    if (result.status) {
      state.newMedia = result.data.photos
      state.page = result.data.page
      state.totalResult = result.data.total_results
    } else {
      if (result.response.status == 429) {
        state.isOverLimitRequest = true
      } else {
        state.isRequestError = true
      }
    }
  },
  RECEIVE_SEARCHVIDEOS(state, result) {
    if (result.status) {
      state.newMedia = result.data.videos
      state.page = result.data.page
      state.totalResult = result.data.total_results
    } else {
      if (result.response.status == 429) {
        state.isOverLimitRequest = true
      } else {
        state.isRequestError = true
      }
    }
  },
  RECEIVE_FEATUREDCOLLECTIONS(state, featuredCollections) {
    state.featuredCollections = featuredCollections
  },
  RECEIVE_COLLECTION_PEXEL(state, { result, collection }) {
    state.collection = collection
    state.newMedia = result.media
    state.totalResult = result.total_results
  },
  

  // firebase
  RECEIVE_COLLECTIONS(state, collections) {
    state.collections = collections
  },
  RECEIVE_COLLECTION_FIREBASE(state, collection) {
    state.collection = collection

    if (collection.media) {
      state.newMedia = Object.values(collection.media).reverse()
      state.totalResult = Object.values(collection.media).length
    } else {
      state.newMedia = [],
      state.totalResult = 0
    }
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