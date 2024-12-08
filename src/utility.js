export function generateID (type) {
    return `${type}-${Math.floor(Math.random() * 1000000)}`;

}