window.onload = function () {
    function newElement (father, type, className) {
        let currentFather = document.querySelector(father);
        let newSon = document.createElement(type);
        newSon.className = className;
        currentFather.appendChild(newSon);
    }

    function generateMesh (size) { 
        let meshSize;
        let userValue = document.querySelector('.mesh-size').value;
        if (typeof(size) === 'number') {
            meshSize = size;
        } else if (userValue === '') {
            alert('Coloque um valor para sua malha!');
            return;
        } else {
            meshSize = userValue;
        }

        resetSquares();
        let meshSquares = document.querySelectorAll('.meshSquare');
        for (let index = 0; index < meshSize*meshSize; index += 1) {
            newElement('.meshPixels','div','meshSquare');
        }
        
        setMeshSize(meshSize);
    }

    function saveLocalPixel (event) {
        let blockColors = [];
        let meshSquares = document.querySelectorAll('.meshSquare');  
        for (let index = 0; index < meshSquares.length; index += 1) {
            let backgroundToPush = meshSquares[index].style.background;
            blockColors.push(backgroundToPush);
        }
        let saveSlot = event.target.className;
        let checkText = document.querySelector('.mesh-size').value;
        if (checkText > 0) {
            localStorage.setItem(saveSlot,JSON.stringify(blockColors));
        } else {
            alert('Sua malha está vazia!');
            return;
        }
        alert('Sua imagem foi salva no Slot' + saveSlot[4]);       
    }

    function loadLocalPixel (event) {
        let saveName = event.target.className.replace('load','save');
        let blockColors = JSON.parse(localStorage.getItem(saveName)); 
        if (blockColors == null) {
            alert('Você não tem nenhum arquivo salvo neste slot!')
            return;
        } else {
            generateMesh(Math.sqrt(blockColors.length));
            paintAll(blockColors);
        }
        alert('Carregado Slot' + saveName[4]);       
    }

    function paintAll (mesh) {
        let meshSquares = document.querySelectorAll('.meshSquare');       
        for (let index = 0; index < meshSquares.length; index += 1) {
            meshSquares[index].style.background = mesh[index]; 
        }
    }
    
    function changeColor(originevent) {
        let color = document.querySelector('input');
        if (originevent.target.style.background != 'white') {
            originevent.target.style.background = 'white';
        }
        else {
            originevent.target.style.background = color.value;
        }
    }

    function resetSquares() {
        let meshSquares = document.querySelectorAll('.meshSquare');
        if (meshSquares != null) {
            for (let index = 0; index < meshSquares.length; index += 1)
            {
                meshSquares[index].remove();               
            }
        }
    }

    function setMeshSize (meshSize) {
        let mesh = document.querySelector('.meshPixels');
        let meshSquares = document.querySelectorAll('.meshSquare');
        mesh.style.height = 30*(meshSize)+2*meshSize +'px';
        mesh.style.width = 30*(meshSize )+2*meshSize +'px';
        for (let indexSquare = 0; indexSquare < meshSize*meshSize; indexSquare += 1) {
            meshSquares[indexSquare].style.height = 30 + 'px';
            meshSquares[indexSquare].style.width = 30 + 'px'; 
            meshSquares[indexSquare].style.background = 'white'; 
            meshSquares[indexSquare].addEventListener('click',changeColor);
        }
    }

    let generateMeshButton = document.querySelector('.generate');
    let saveSlot1 = document.querySelector('.save1');
    let saveSlot2 = document.querySelector('.save2');
    let saveSlot3 = document.querySelector('.save3');
    let loadSlot1 = document.querySelector('.load1');
    let loadSlot2 = document.querySelector('.load2');
    let loadSlot3 = document.querySelector('.load3');
    saveSlot1.addEventListener('click', saveLocalPixel);
    saveSlot2.addEventListener('click', saveLocalPixel);
    saveSlot3.addEventListener('click', saveLocalPixel);
    loadSlot1.addEventListener('click', loadLocalPixel);
    loadSlot2.addEventListener('click', loadLocalPixel);
    loadSlot3.addEventListener('click', loadLocalPixel);
    generateMeshButton.addEventListener('click', generateMesh);
}   