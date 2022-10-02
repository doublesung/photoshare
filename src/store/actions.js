import {
  reqFeaturedPhotos,
  reqSearchPhotos,
  reqSearchVideos,
  reqFeaturedVideos,
  reqFeaturedCollections,
  reqCollectionPexel
} from '../api/pexelAPI'

import {
  reqCollections,
  reqCollectionJsonSever,
  reqSearchRecords,
  reqPhotoCover,
  reqVideoCover
} from '../api/jsonServerAPI'

export default {
  // pexel
  async getFeaturedPhotos(contest, value) {
    const result = await reqFeaturedPhotos(value)

    contest.commit('RECEIVE_FEARTUREDPHOTOS', result)
  },
  async getFeaturedVideos(contest, value) {
    const result = await reqFeaturedVideos(value)

    contest.commit('RECEIVE_FEARTUREDVIDEOS', result)
  },
  async getFeaturedCollections(contest, value) {
    const result = await reqFeaturedCollections(value)
    const featuredCollections = result.collections

    contest.commit('RECEIVE_FEATUREDCOLLECTIONS', featuredCollections)
  },
  async getSearchPhotos(contest, value) {
    const result = await reqSearchPhotos(value)

    contest.commit('RECEIVE_SEARCHPHOTOS', result)
  },
  async getSearchVideos(contest, value) {
    const result = await reqSearchVideos(value)

    contest.commit('RECEIVE_SEARCHVIDEOS', result)
  },
  async getCollectionPexel(contest, value) {
    const result = await reqCollectionPexel(value)

    contest.commit('RECEIVE_COLLECTION_PEXEL', result)
  },

  // json-server
  async getCollections(contest, value) {
    const collections = await reqCollections(value)

    contest.commit('RECEIVE_COLLECTIONS', collections)
  },
  async getCollectionJsonSever(contest, value) {
    const collection = await reqCollectionJsonSever(value)
    
    contest.commit('RECEIVE_COLLECTION_JSONSERVER', collection)
  },
  async getSearchRecords(contest, value) {
    const searchRecords = await reqSearchRecords(value)

    contest.commit('RECEIVE_SEARCHRECORDS', searchRecords)
  },
  async getPhotoCover(contest, value) {
    const photoCover = await reqPhotoCover(value)

    contest.commit('RECEIVE_PHOTOCOVER', photoCover)
  },
  async getVideoCover(contest, value) {
    const videoCover = await reqVideoCover(value)

    contest.commit('RECEIVE_VIDEOCOVER', videoCover)
  },

  // local
  setColletion(contest, newCollection) {
    contest.commit('NEW_COLLECTION', newCollection)
  },
  setMedium(contest, medium) {
    contest.commit('SET_MEDIUM', medium)
  },
  setTotalResult(contest, totalResult) {
    contest.commit('SET_TOTALRESULT', totalResult)
  }
}