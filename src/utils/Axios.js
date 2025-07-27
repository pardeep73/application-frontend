import axios from "axios";
import BaseUrl from "./BaseUrl";


export default async function Axios(urlPath, options, data) {
    try {
        if (data) {
            const result = await axios.post(`${BaseUrl}/${urlPath}`, data, options)
            return result;
        }
        else {
            const result = await axios.post(`${BaseUrl}/${urlPath}`, {}, options)
            return result;
        }
    } catch (error) {
        console.log('Axios Error', error)
        throw error

    }

}