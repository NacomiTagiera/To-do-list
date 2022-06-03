const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");


formEl.addEventListener("submit", (event) => {
    if(inputEl.value !== '') 
    {
        event.preventDefault();
        toDoList();
    }  else {
        inputEl.value = 'Learn how to use my to-do list';
        event.preventDefault();
        toDoList();
    }
});

function toDoList(task)
{
    let newTask = inputEl.value;                 

    if(task)
    {
        newTask = task.name;
    }  

    const liEl = document.createElement("li");  

    if(task && task.checked)
    {
        liEl.classList.add("checked");
    }
    
    liEl.innerText = newTask;
    ulEl.appendChild(liEl);                     

    inputEl.value = ""; 

    const checkBtn = document.createElement("div");
    checkBtn.innerHTML = `<i class="fas fa-check-square">`;

    liEl.appendChild(checkBtn); 

    const trashBtn = document.createElement("div");
    trashBtn.innerHTML = `<i class="fas fa-trash">`;

    liEl.appendChild(trashBtn);


    checkBtn.addEventListener("click", () => {
        liEl.classList.toggle("checked");        
    });

    trashBtn.addEventListener("click", () => {
        liEl.remove();
    });
}