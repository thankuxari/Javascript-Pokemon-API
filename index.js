const searchBtn = document.getElementById('submit');
const loading = document.getElementById('js-spinner');

searchBtn.addEventListener('click',fetchData);

async function fetchData(){
    
    try {
        
        loading.classList.remove('hidden');
        searchBtn.disabled = true;
        //Get user input
        const inputBox = document.getElementById('input-box').value.toLowerCase();

        //Get API respone based on user input
        const respone = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputBox}`);
        
        //Error handling for empty input
        if(inputBox == ''){
            alert('Please write something valid');
        }

        if(!respone.ok){
            throw Error(respone.statusText);
        }
        

        //Get the data from the API 
        const data = await respone.json();
        
        //If Pokemon has over 1 Type then print both of his types or else print only the first type
        if(data.types.length >= 2){
            displayData(data.name,data.id,data.types[0].type.name,data.types[1].type.name,data.sprites.front_default);
        }else if(data.types.length < 2){
            displayData(data.name,data.id,data.types[0].type.name,undefined,data.sprites.front_default);
        }

    } catch (error) {
    console.log(error);
    alert('Failed to fetch the data');
    }finally{
        searchBtn.disabled = false;
        loading.classList.add('hidden');
    }
}


//Display the data on the html document
function displayData(name,id,type,type2,sprite){  
    const nameText = document.getElementById('name');
    nameText.innerText = 'Name: ' + name;

    const idText = document.getElementById('id');
    idText.innerText = 'Id: ' + id;

    const typeText = document.getElementById('type');
    typeText.innerText = 'Main Type: ' + type;

    //If pokemon has only 1 type (secondary type='undefined')
    if(type2 == undefined){
        const typeText2 = document.getElementById('type2');
        typeText2.innerText = '';
    }else{
        const typeText2 = document.getElementById('type2');
        typeText2.innerText = 'Second Type: ' + type2;
    }
    const spriteImage = document.getElementById('img');
    spriteImage.src = sprite;
}