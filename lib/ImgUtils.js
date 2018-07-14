/**
 * 判断是否为空
 * @param obj
 * @returns {boolean}
 */
export const isEmpty = (obj) => {
    if (obj === null)
        return true;

    if (obj === undefined)
        return true;

    if (obj.length > 0)
        return false;

    if (obj.length === 0)
        return true;

    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
            return true
    }

    return true;
};