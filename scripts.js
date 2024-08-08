document.addEventListener('DOMContentLoaded', function() {
    const content = document.getElementById('content');
    const addBlockButton = document.getElementById('addBlock');

    // Load content from localStorage
    loadContent();

    function createBlock(headingText = 'New Heading', paragraphText = 'This is a new paragraph block.') {
        const block = document.createElement('div');
        block.className = 'block';

        const heading = document.createElement('h2');
        heading.contentEditable = "true";
        heading.innerText = headingText;
        block.appendChild(heading);

        const paragraph = document.createElement('p');
        paragraph.contentEditable = "true";
        paragraph.innerText = paragraphText;
        block.appendChild(paragraph);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete Block';
        deleteButton.className = 'delete-block';
        deleteButton.addEventListener('click', function() {
            content.removeChild(block);
            saveContent();
        });
        block.appendChild(deleteButton);

        const styleButton = document.createElement('button');
        styleButton.innerText = 'Change Style';
        styleButton.addEventListener('click', function() {
            block.style.backgroundColor = block.style.backgroundColor === 'yellow' ? '#fff' : 'yellow';
            saveContent();
        });
        block.appendChild(styleButton);

        block.draggable = true;
        block.addEventListener('dragstart', dragStart);
        block.addEventListener('dragover', dragOver);
        block.addEventListener('drop', drop);

        content.appendChild(block);
        saveContent();
    }

    function saveContent() {
        const blocks = [];
        content.querySelectorAll('.block').forEach(block => {
            const heading = block.querySelector('h2').innerText;
            const paragraph = block.querySelector('p').innerText;
            const backgroundColor = block.style.backgroundColor;
            blocks.push({ heading, paragraph, backgroundColor });
        });
        localStorage.setItem('content', JSON.stringify(blocks));
    }

    function loadContent() {
        const savedBlocks = JSON.parse(localStorage.getItem('content'));
        if (savedBlocks) {
            savedBlocks.forEach(block => {
                createBlock(block.heading, block.paragraph, block.backgroundColor);
            });
        }
    }

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.outerHTML);
        e.dataTransfer.dropEffect = 'move';
        e.target.classList.add('dragging');
    }

    function dragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    function drop(e) {
        e.preventDefault();
        const draggedHTML = e.dataTransfer.getData('text/plain');
        e.target.insertAdjacentHTML('beforebegin', draggedHTML);
        const draggingElement = document.querySelector('.dragging');
        draggingElement.remove();
        const newElement = e.target.previousSibling;
        newElement.classList.remove('dragging');
        addDragEventListeners(newElement);
        saveContent();
    }

    function addDragEventListeners(block) {
        block.draggable = true;
        block.addEventListener('dragstart', dragStart);
        block.addEventListener('dragover', dragOver);
        block.addEventListener('drop', drop);
    }

    addBlockButton.addEventListener('click', createBlock);
});
