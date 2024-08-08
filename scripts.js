document.addEventListener('DOMContentLoaded', function() {
    const main = document.querySelector('main');

    function createBlock() {
        const block = document.createElement('div');
        block.className = 'block';
        
        const heading = document.createElement('h2');
        heading.innerText = 'New Heading';
        block.appendChild(heading);
        
        const paragraph = document.createElement('p');
        paragraph.innerText = 'This is a new paragraph block.';
        block.appendChild(paragraph);
        
        main.appendChild(block);
    }

    document.body.addEventListener('click', function(event) {
        if (event.target.tagName === 'MAIN') {
            createBlock();
        }
    });
});
