import ajax from './ajax'
// import axios from 'axios'

// const baseURL = 'https://api.pexels.com'

// 請求精選相片
export const reqChosenPhotos = () => ajax('https://challenge.thef2e.com/api/thef2e2019/stage6/rooms')
// export const reqChosenPhotos = (page) => ajax(baseURL + '/v1/curated', page)


// export const reqChosenPhotos = () => {
//   return new Promise((resolve, reject) => {
//     let promise = axios({
//       method: 'get',
//       url: 'https://api.pexels.com/v1/curated',
//       headers: {
//         Authorization: '563492ad6f917000010000013c632f2578244bb3a86a6da7c961215c'
//       }
//     })

//     promise.then((response) => {
//       resolve(response.data)
//     }).catch((error) => {
//       reject(error)
//     })
//   })
// }