//Plants array-object must be deeep unfrozen prior to calculations
export function deepUnfreeze(item) {

    if (Array.isArray(item)) {
        // If it's an array, create a new array and recursively deep unfreeze its elements
        return item.map(deepUnfreeze);
    } else if (typeof item === 'object' && item !== null && Object.isFrozen(item)) {
        // If it's a frozen object, create a shallow copy and recursively deep unfreeze its properties
        const unfrozenObject = Object.assign({}, item);
        Object.keys(unfrozenObject).forEach(function (key) {
            unfrozenObject[key] = deepUnfreeze(unfrozenObject[key]);
        });
        return unfrozenObject;
    }
    // If it's not an array or a frozen object, return it directly
    return item;
}