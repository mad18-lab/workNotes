const dateNow = document.getElementById("date");

let currDate = new Date();
dateNow.textContent = currDate.toLocaleDateString('en-GB');

const noteBox = document.getElementById("note");

const noteInput = function() {
    let noteClass = noteBox.classList;

    if (noteClass.contains("hidden")) {
        noteBox.classList.remove("hidden")
    } else {
        noteBox.classList.add("hidden");
    }
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
    element.classList.add("animate-fade-out-right");
    // element.remove();
}

const onDelClick = function(divId) {
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

    // Main div with hover scaling
    const mainDiv = document.createElement('div');
    mainDiv.classList.add("mx-auto", "relative", "transform", "transition", "hover:scale-110", "duration-500", "flex", "lg:w-[650px]", "md:w-[500px]", "sm:w-[300px]", "w-[150px]", "mt-6", "mb-10", "h-[85px]", "flex-col-reverse", "bg-[#15065c]");
    mainDiv.id = Math.floor(Math.random() * 100);

    // Inner div for note content
    const newDiv = document.createElement('div');
    newDiv.classList.add("flex", "justify-between", "items-center", "lg:w-[510px]", "md:w-[400px]", "sm:w-[200px]", "w-[50px]", "mb-6");
    newDiv.id = Math.floor(Math.random() * 100);

    // Trash icon
    const newImg = document.createElement('img');
    newImg.src = './trash.png';
    newImg.classList.add("w-8", "h-8", "cursor-pointer");
    newImg.addEventListener("click", function() {
        onImgClick(mainDiv.id);
        onDelClick(mainDiv.id);
    });

    // Pencil icon
    const editImg = document.createElement('img');
    editImg.src = './pencil.png';
    editImg.classList.add("w-8", "h-8", "cursor-pointer");
    editImg.addEventListener("click", function() {
        onEditClick(newDiv.id, newEntry.textContent);
    });

    // New entry (text)
    const newEntry = document.createElement('p');
    newEntry.textContent = notetext.value;
    newEntry.classList.add("text-white", "text-center", "text-2xl", "cursor-pointer", "font-ibm");
    newEntry.id = Math.floor(Math.random() * 100);
    newEntry.addEventListener('click', function() {
        onDivClick(newEntry.id);
    });

    // Append icons and text to the note div
    newDiv.appendChild(newEntry);
    newDiv.appendChild(editImg);
    newDiv.appendChild(newImg);

    // Append note content to the main div
    mainDiv.appendChild(newDiv);

    // Append the main div to the note list
    notelist.appendChild(mainDiv);

    // Clear input field
    notetext.value = "";
});