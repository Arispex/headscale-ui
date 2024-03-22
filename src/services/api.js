export function verifyApiKey(url, apikey) {
    return fetch(url + "/api/v1/apikey", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + apikey,
            Accept: "application/json",
        },
    })
}