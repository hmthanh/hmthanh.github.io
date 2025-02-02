// export const fetchFrom = (url, method, data) => fetch(url, {
//                                                                 method: method, // *GET, POST, PUT, DELETE, etc.
//                                                                 mode: 'cors',
//                                                                 headers:{
//                                                                     'Content-Type': 'application-json'
//                                                                 },
//                                                                 credentials: 'same-origin',
//                                                                 body: JSON.stringify(data)
//                                                               })

export const fetchFrom = async (url = "", method = "POST", data = {}, accessToken = "") => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
      "x-access-token": accessToken,
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  return await response.json() // parses JSON response into native JavaScript objects
}
