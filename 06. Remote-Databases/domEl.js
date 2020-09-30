export default function el(type, content, attributes) {
    let result = document.createElement(type);

    if (Array.isArray(content)) {
        content.forEach(append);
    } else if (content !== null && content !== undefined){
		append(content);
	}

    if (attributes) {
        Object.assign(result, attributes);
    }
	
	function append(node) {
		if(typeof node === "string" || typeof node === "number") {
			node = document.createTextNode(node);
		}
		
		result.appendChild(node);
	}

    return result;
}