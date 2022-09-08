import {
  reqChosenPhotos
} from '../api'

export default {
  async getChosenPhotos(contest, value) {
    const result = await reqChosenPhotos(value)
    const chosenPhotos = result.items

    console.log(chosenPhotos)

    contest.commit('RECEIVE_CHOSENPHOTOS', chosenPhotos)
  }
}