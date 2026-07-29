const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const demo1 = document.getElementById('img');

const arr = [
    'https://images.unsplash.com/photo-1682685790910-1e7f3c8d9b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1682685790910-1e7f3c8d9b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1682685790910-1e7f3c8d9b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1682685790910-1e7f3c8d9b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
];

let currentIndex = 0;

function updateImage() {
    demo1.src = arr[currentIndex];
}

btn1.addEventListener('click', function () {
    currentIndex = (currentIndex - 1 + arr.length) % arr.length;
    updateImage();
});

btn2.addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % arr.length;
    updateImage();
});

updateImage();