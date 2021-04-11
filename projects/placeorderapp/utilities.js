export function getfromLS(key) {
    return localStorage.getItem(key)
}
export function writeToLS(key, data) {
    localStorage.setItem(key, data);
}
export function querySelector(selector) {
    return document.querySelector(selector);
}
export function getId(selector) {
    return document.getElementById(selector);
}

export async function getData(name) {
    const response = await fetch(`data/${name}.json`);
    return await response.json();
}