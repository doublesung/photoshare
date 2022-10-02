import axios from 'axios'

export default function ajax(url = '', data = {}) {
  return new Promise((resolve, reject) => {
    let dataStr = ''
     
    Object.keys(data).forEach(key => {
      if(data[key]) dataStr += key + '=' + data[key] + '&'
    })
    
    if(dataStr !== '') {
      dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
    
    axios({
      method: 'get',
      url: url,
      headers: {
        Authorization: '563492ad6f917000010000013c632f2578244bb3a86a6da7c961215c'
      }  
    })
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      reject(error)
    })
  })
}