import {
  reqFeaturedPhotos,
  reqSearchPhotos,
  reqSearchVideos,
  reqFeaturedVideos,
  reqFeaturedCollections,
  reqCollectionPexel
} from '../api'

import { getDatabase, ref, child, get, onValue } from 'firebase/database'

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
    const featuredCollections = result.data.collections

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
  async getCollectionPexel(contest, { id, page, collection }) {
    const result = await reqCollectionPexel(id, page)

    contest.commit('RECEIVE_COLLECTION_PEXEL', { 
      result: result.data,
      collection
    })
  },

  // firebase
  getCover(contest, { id, path }) {
    const dbRef = ref(getDatabase())

    get(child(dbRef, path + '/' + id )).then(snapshot => {
      if (snapshot.exists()) {
        if (path === 'photoCovers') {
          contest.commit('RECEIVE_PHOTOCOVER', snapshot.val())
        } else {
          contest.commit('RECEIVE_VIDEOCOVER', snapshot.val())
        }
      }
    }).catch((error) => {
      console.error(error)
    })
  },
  getSearchRecords(contest) {
    const db = getDatabase()
    const searchRecordsRef = ref(db, 'searchRecords')

    onValue(searchRecordsRef, snapshot => {
      if (snapshot.exists()) {
        contest.commit('RECEIVE_SEARCHRECORDS', snapshot.val())
      } else {
        contest.commit('RECEIVE_SEARCHRECORDS', [])
      }
    })
  },
  getCollections(contest) {
    const db = getDatabase()
    const searchRecordsRef = ref(db, 'collections')

    onValue(searchRecordsRef, snapshot => {
      if (snapshot.exists()) {
        const collections =  Object.values(snapshot.val()).reverse()

        contest.commit('RECEIVE_COLLECTIONS', collections)
      } else {
        contest.commit('RECEIVE_COLLECTIONS', [])
      }
    })
  },
  getCollectionFirebase(contest, id) {
    const dbRef = ref(getDatabase())

    get(child(dbRef, 'collections/' + id )).then(snapshot => {
      if (snapshot.exists()) {
        const collection = snapshot.val()

        contest.commit('RECEIVE_COLLECTION_FIREBASE', collection)
      }
    }).catch((error) => {
      console.error(error)
    })
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