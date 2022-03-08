export function apiCall(url: string) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}