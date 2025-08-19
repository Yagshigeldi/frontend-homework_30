import axios from "axios";

export const api = axios.create({
    baseURL: "https://backendfrontend-production-f105.up.railway.app/"
})