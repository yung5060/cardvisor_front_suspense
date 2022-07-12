import axios from 'axios';

export const fetchData = (url) => {
    const resultsPromise = fetchApi(url);
    return {
        data: wrapPromise(resultsPromise)
    }
}

const fetchApi = (url) => {
    console.log('Fetching Data ...');
    return axios.get(url)
    .then(res => res.data)
    .catch(err => console.log(err))
}


const wrapPromise = (promise) => {
    let status = 'pending';
    let result;
    let suspender = promise.then(
        res => {
            status = 'success';
            result = res;
        },
        err => {
            status = 'error';
            result = err;
        }
        );
        
        return {
            read() {
                if(status === 'pending') {
                    throw suspender;
                } else if(status === 'error') {
                throw result;
            } else if(status === 'success') {
                return result;
            }
        }
    }
}