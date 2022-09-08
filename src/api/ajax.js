import axios from 'axios'

export default function ajax(url = '', data = {}) {
  return new Promise((resolve, reject) => {
    let promise 
    let dataStr = ''

    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })

    if(dataStr !== '') {
      dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }

    promise = axios({
      method: 'get',
      url: url,
      headers: {
        Authorization: 'Bearer StpG96pTKw0ZsWW5gu6Mal51X0UMb3QwJM4rrquOwNzP96I3dFTDqfGauGmz',
        Accept: 'application/json'
        // Authorization: '563492ad6f917000010000013c632f2578244bb3a86a6da7c961215c'
      }
    })

    promise.then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}