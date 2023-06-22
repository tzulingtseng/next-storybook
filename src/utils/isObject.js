export function isObject(obj, value) {
    return Object.prototype.hasOwnProperty.call(obj, value)
}