import axios from 'axios'

let apiUrl = '';

var token = ''
const tokenAddition = ''
var acceptLanguage = 'en-EN'

export const setApiUrl = (payload) => {
  apiUrl = payload
}

export const setToken = (payload) => {
  token = payload
}

const useTokenAddition = (isTokenAddition) => {
  if(isTokenAddition){
    return tokenAddition
  }

  return token
}

export const setAcceptLanguage = (lang) => {
  // if(lang == 'uk') {
  //   acceptLanguage = 'uk-UA'
  // } else {
  //   acceptLanguage = 'ru-RU'
  // }
}

const getPromiseWithPreparedResponse = (promise) => {
  return new Promise((resolve, reject) => {
    promise.then(response => {
      resolve(response.data || {});
    })
    .catch((error) => {
      // let message = _.get(error.response, 'data.message')
      // if (_.isEmpty(message)) {
      //   // Сообщения в случае если не пройдена валидация формы(модели)
      //   const messages = _.get(error.response, 'data.errors')
      //   if (messages) {
      //       if(Array.isArray(messages)){
      //         message = messages
      //       }
      //       else{
      //         message = messages[Object.keys(messages)[0]][0];
      //       }
      //   }
      // }
      reject(error);
    })
  });
};

export const get = (isTokenAddition, urlPath, data) => {
  return getPromiseWithPreparedResponse(
    axios.get(`${apiUrl}/${urlPath}`, {
      headers: {
        'Content-Type': 'application/json', 
        'Accept-Language': acceptLanguage,
        'Authorization': `${useTokenAddition(isTokenAddition)}`, 
        'mode': "no-cors",
      },
      params: data
    })
  )
};

export const post = (isTokenAddition, urlPath, data, contentType) => {
  return getPromiseWithPreparedResponse(
    axios.post(`${apiUrl}/${urlPath}`, data, {
      headers: {
        'Content-Type': contentType || 'application/json', 
        'Accept-Language': acceptLanguage,
        'Authorization': `${useTokenAddition(isTokenAddition)}`, 
        'mode': "no-cors",
      }
    })
  )
}

export const put = (isTokenAddition,urlPath, data, contentType) => {
  return getPromiseWithPreparedResponse(
    axios.put(`${apiUrl}/${urlPath}`, data, {
      headers: {
        'Content-Type': contentType || 'application/json', 
        'Accept-Language': acceptLanguage,
        'Authorization': `${useTokenAddition(isTokenAddition)}`, 
        'mode': "no-cors",
      }
    })
  )
}

export const del = (isTokenAddition, urlPath, data) => {
  return getPromiseWithPreparedResponse(
    axios.delete(`${apiUrl}/${urlPath}`, {
      headers: {
        'Content-Type': 'application/json', 
        'Accept-Language': acceptLanguage,
        'Authorization': `${useTokenAddition(isTokenAddition)}`, 
        'mode': "no-cors",
      },
      params: data
    })
  )
}

export const patch = (isTokenAddition, urlPath, data, contentType) => {
  return getPromiseWithPreparedResponse(
    axios.patch(`${apiUrl}/${urlPath}`, data, {
      headers: {
        'Content-Type': contentType || 'application/json', 
        'Accept-Language': acceptLanguage,
        'Authorization': `${useTokenAddition(isTokenAddition)}`, 
        'mode': "no-cors",
      }
    })
  )
}
