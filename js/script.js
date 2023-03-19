/*
    HERO EDITOR WINDOW
*/

document.getElementById('menu-toggle').addEventListener('click', function(event) {
    event.currentTarget.classList.toggle('active');
})

const editorWindow = document.querySelector('.code-editor__window');

function getRandomInt(min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}

function minimizeEditor() {
    editorWindow.classList.remove('maximized');
    editorWindow.classList.add('minimized');
}

function maximizeEditor() {
    editorWindow.classList.add('maximized');
}

function restoreEditor() {
    editorWindow.classList.remove('minimized', 'maximized');
    editorWindow.style.left = '';
    editorWindow.style.top = '';
}

function closeEditor() {
    editorWindow.classList.add('closed');
    editorWindow.addEventListener('transitionend', function() {
        restoreEditor();
    }, { once: true });

    window.setTimeout(function() {
        editorWindow.classList.remove('closed');
    }, 3000);
}


// const draggableElements = document.querySelectorAll('.draggable');

// draggableElements.forEach((draggable) => {
//     const DraggableHandle = draggable.querySelector('.draggable-handle')
//                             ?? draggable;

//     DraggableHandle.addEventListener('mousedown', dragItem);
// })

// function dragItem(event) {
//     const draggable = event.currentTarget.closest('.draggable');
//     const container = draggable.closest('.draggable-area');
//     const draggableRect = draggable.getBoundingClientRect();

//     let bounds = {
//         left: 0,
//         top: 0,
//     }

//     if (container.classList.contains('draggable-area')) {
//         bounds = container.getBoundingClientRect();
//     }

//     const clickPosition = {
//         x: event.clientX - draggableRect.left,
//         y: event.clientY - draggableRect.top,
//     }

//     function moveItem(event) {
//         const moveTo = {
//             x: event.clientX - clickPosition.x - bounds.left,
//             y: event.clientY - clickPosition.y - bounds.top,
//         }

//         draggable.style.left = moveTo.x + 'px';
//         draggable.style.top = moveTo.y + 'px';
//     }

//     document.addEventListener('mousemove', moveItem);

//     draggable.addEventListener('mouseup', function() {
//         document.removeEventListener('mousemove', moveItem);
//         draggable.addEventListener('mouseup', null);
//     });
// }