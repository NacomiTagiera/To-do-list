const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list"));

list.forEach(task => {
    toDoList(task);
});

formEl.addEventListener("submit", (event) => {
    if(inputEl.value === '')
    {        
        alert("Musisz coś napisać!")
    } else {
        event.preventDefault();
        toDoList();
    }
});

function toDoList(task)
{
    let newTask = inputEl.value;                 //bierzemy inputa

    if(task)
    {
        newTask = task.name;
    }  

    const liEl = document.createElement("li");  //robimy z niego kolejny element listy

    if(task && task.checked)
    {
        liEl.classList.add("checked");
    }
    
    liEl.innerText = newTask;                   
    ulEl.appendChild(liEl);                     //dodajemy do listy

    inputEl.value = ""; 

    const checkBtn = document.createElement("div");
    checkBtn.innerHTML = `<i class="fas fa-check-square">`;

    liEl.appendChild(checkBtn); 

    const trashBtn = document.createElement("div");
    trashBtn.innerHTML = `<i class="fas fa-trash">`;

    liEl.appendChild(trashBtn);


    checkBtn.addEventListener("click", () => {
        liEl.classList.toggle("checked");
        updateLocalStorage();
    });

    trashBtn.addEventListener("click", () => {
        liEl.remove();
        updateLocalStorage();
    });


    updateLocalStorage();
}

function updateLocalStorage()
{
    const liEls = document.querySelectorAll("li");
    list = [];

    liEls.forEach(liEl => {
        list.push({
            name: liEl.innerText,
            checked: liEl.classList.contains("checked")
        })
    });

    localStorage.setItem("list", JSON.stringify(list));
}