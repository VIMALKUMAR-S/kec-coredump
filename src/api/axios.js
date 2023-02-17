import axios from 'axios';

export default axios.create({
    baseURL: 'https://kec-core-dump.herokuapp.com'
});
export const api = axios.create({
    baseURL: 'https://kec-core-dump.herokuapp.com'
});

export const getPostPage = async (options = {
    headers: {
        'Authorization': "Bearer " + localStorage.getItem("jwt")
    }
}) => {
    const responce = await api.get('/get-questions', options);
    console.log(responce);
    return responce.data;
}