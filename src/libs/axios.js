import Vue from 'vue'
// axios
import axios from 'axios'

const axiosIns = axios.create({
  // timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
  headers: { 'Accept': 'application/json' },
  
  baseURL: 'http://127.0.0.1:8000/api/',
})


Vue.prototype.$http = axiosIns

export default axiosIns