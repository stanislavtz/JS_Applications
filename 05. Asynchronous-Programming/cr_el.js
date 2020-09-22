export default function el(type, content, attributes) {
    let result = document.createElement(type);

    if (content) {
        result.textContent = content;
    }

    if (attributes) {
        Object.assign(result, attributes);
    }

    return result;
}