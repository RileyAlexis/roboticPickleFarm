//Some array objects are frozen by redux - in order to be used and to calculate correctly they must be unforzen and copied
//to new objects(copying will include the deep freeze and crash the calculations)
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