const inputElement = document.getElementById('markdown-input')

const rawOutput = document.getElementById('html-output')

const previewField = document.getElementById('preview')



function convertMarkdown(){
  let html = inputElement.value

    // 1. Headings (h1, h2, h3)
    html = html.replace(/^[ \t]*(#{1,3})[ ]+(.*?)$/gm, (match, hashes, content) => {
        const level = hashes.length;
        return `<h${level}>${content.trim()}</h${level}>`;
    });

    // 2. Blockquotes (must be at start of line)
    html = html.replace(/^[ \t]*>[ ]+(.*?)$/gm, '<blockquote>$1</blockquote>');

    // 3. Images: ![alt](src)
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');

    // 4. Links: [text](url)
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // 5. Bold: **text** or __text__
    html = html.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>');

    // 6. Italics: *text* or _text_
    html = html.replace(/(\*|_)(.*?)\1/g, '<em>$2</em>');

    return html;
}

inputElement.addEventListener('input', () => {
let converted = convertMarkdown();
rawOutput.textContent = converted;
previewField.innerHTML = converted;

});