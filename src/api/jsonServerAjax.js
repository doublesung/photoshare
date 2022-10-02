import axios from 'axios'

export default function ajax(url = '', data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    
    if(type === 'GET') {
      let dataStr = ''

      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] +'&'
      })

      if(dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }

      promise = axios.get(url)
    }

    if(type === 'POST') promise = axios.post(url, data)

    if(type === 'PUT') promise = axios.put(url, data)

    if(type === 'PATCH') promise = axios.patch(url, data)
    
    if(type === 'DELETE') promise = axios.delete(url)
    
    promise
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      reject(error)
    })
  })
}