import axios from "axios";

export const login = (username, clave) => {
    return new Promise(function (resolve, reject) {
        axios.post(`/login`, { username, clave })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }else {
                    reject(response)
                }
            }).catch((err) => {
                reject(err)
            })
    });
};

export const getMoves = (user) => {
    return new Promise(function (resolve, reject) {
        axios.get(`/users/${user}/bills`)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }else {
                    reject(response)
                }
            }).catch((err) => {
                reject(err)
            })
    });
};

export const createMove = (data, user) => {
    return new Promise(function (resolve, reject) {
        axios.post(`/users/${user}/bills`, data)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }else {
                    reject(response)
                }
            }).catch((err) => {
                reject(err)
            })
    });
};

export const getMove = (id, user) => {
    return new Promise(function (resolve, reject) {
        axios.get(`/users/${user}/bills/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }else {
                    reject(response)
                }
            }).catch((err) => {
                reject(err)
            })
    });
};

export const deleteMove = (id, user) => {
    return new Promise(function (resolve, reject) {
        axios.delete(`/users/${user}/bills/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }else {
                    reject(response)
                }
            }).catch((err) => {
                reject(err)
            })
    });
};