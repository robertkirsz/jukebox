export const handleError = error => {
  if (error.response) {
    // The request was made, but the server responded with a status code
    // that falls out of the range of 2xx
    return `${error.response.status} ${error.response.statusText}: ${error.response.data.error.message}`
  } else {
    // Something happened in setting up the request that triggered an Error
    return `Error: ${error.message}`
  }
}
