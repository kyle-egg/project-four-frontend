import { getToken } from './auth.js'
import axios from 'axios'

export function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}


//* GIN REQ

export function getAllGins() {
  return axios.get('/api/gins')
}

export function getGin(ginId) {
  return axios.get(`/api/gins/${ginId}`)
}

//* WISH / COMMENT REQ

export function wishGin(ginId) {
  return axios.post(`/api/gins/${ginId}/like/`, null, headers())
}

export function createReview(ginId, formData) {
  return axios.post(`/api/gins/${ginId}/comments/`, formData, headers())
}

//* AUTH REQ

export function userProfile(userId) {
  return axios.get(`/api/auth/profile/${userId}`, headers())
}