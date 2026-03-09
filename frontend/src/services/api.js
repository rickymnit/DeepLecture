import axios from "axios"

const API = axios.create({
    baseURL: "http://127.0.0.1:8000"
})

export const addYoutube = (url) =>
    API.post("/add_youtube", { url })

export const chat = (question) =>
    API.post("/chat", { question })