const dateNow = document.getElementById("date");

let currDate = new Date();
dateNow.textContent = currDate.toLocaleDateString('en-GB');

const noteBox = document.getElementById("note");

const noteInput = function() {
    noteBox.classList.remove("hidden");
    noteBox.classList.add("block");
}

const notelist = document.getElementById("noteList");
const form = document.getElementById('inputForm');

const onDivClick = function(id) {
    console.log(`task ${id} was clicked`);

    const para = document.getElementById(id);
    let classes = para.classList;

    if (classes.contains("line-through")) {
        para.classList.remove("line-through");
    } else {
        para.classList.add("line-through");
    }
}

const onImgClick = function(divId) {
    const element = document.getElementById(divId);
    element.remove();
}

const onEditClick = function(divId, note) {
    let og = note;
    const editForm = document.createElement("form");
    const editInput = document.createElement("input");

    editForm.classList.add("absolute", "-inset-3");

    editInput.classList.add("mx-auto", "relative", "justify-center", "align-center", "w-[510px]", "h-[85px]", "mt-4", "mb-6", "pl-2", "rounded-md");

    editForm.appendChild(editInput);

    editInput.value = og;

    const element = document.getElementById(divId);

    element.appendChild(editForm);

    editForm.addEventListener("submit", function(e) {
        e.preventDefault();

        let newEntry = element.querySelector("p");

        newEntry.textContent = editInput.value;

        element.removeChild(editForm);
    })
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    notelist.classList.remove("hidden");
    notelist.classList.add("block");

    let notetext = document.getElementById("noteText");

    const mainDiv = document.createElement('div');
    mainDiv.classList.add("mx-auto", "relative", "justify-start", "align-center", "w-[650px]", "mt-6", "mb-10", "h-[85px]", "flex", "flex-col-reverse", "animate-fade-in-left");
    mainDiv.id = Math.floor(Math.random() * 100);

    const newDiv = document.createElement('div');
    newDiv.classList.add("mx-auto", "relative", "justify-center", "align-center", "w-[510px]", "mb-6");
    newDiv.id = Math.floor(Math.random() * 100);

    mainDiv.appendChild(newDiv);

    const newImg = document.createElement('img');
    newImg.src = './trash.png';
    newImg.classList.add("absolute", "bottom-0", "right-0", "w-8", "h-8");
    newImg.addEventListener("click", function() {
        onImgClick(mainDiv.id);
    })

    const editImg = document.createElement('img');
    editImg.src = './pencil.png';
    editImg.classList.add("absolute", "bottom-0", "left-0", "w-8", "h-8");

    mainDiv.appendChild(newImg);
    mainDiv.appendChild(editImg);

    const newEntry = document.createElement('p');

    newEntry.textContent = notetext.value;
    newEntry.classList.add("text-white", "text-center", "text-2xl", "cursor-pointer", "align-center");
    newEntry.id = Math.floor(Math.random() * 100);
    newEntry.addEventListener('click', function() {
        onDivClick(newEntry.id);
    });

    editImg.addEventListener("click", function() {
        onEditClick(newDiv.id, newEntry.textContent);
    })

    newDiv.appendChild(newEntry);
    notelist.appendChild(mainDiv);

    notetext.value = "";
})