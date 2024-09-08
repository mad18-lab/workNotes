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

    setTimeout(() => {
        element.remove();
    }, 1000);

    // element.remove();
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
    mainDiv.classList.add("mx-auto", "relative", "transform", "transition", "hover:scale-110", "duration-500", "lg:w-[650px]", "md:w-[500px]", "w-[300px]", "mt-6", "mb-10", "bg-[#15065c]", "animate-left-fade-fast", "rounded-lg", "p-4", "flex", "flex-col", "space-y-4", "items-center", "justify-center");
    mainDiv.id = Math.floor(Math.random() * 100);

    // Inner div for note content
    const newDiv = document.createElement('div');
    newDiv.classList.add("w-full", "flex", "flex-col", "items-center");

    // New entry (text)
    const newEntry = document.createElement('p');
    newEntry.textContent = notetext.value;
    newEntry.classList.add("text-white", "text-center", "sm:text-2xl", "text-xl", "cursor-pointer", "font-ibm", "break-words", "whitespace-normal", "w-full");
    newEntry.id = Math.floor(Math.random() * 100);
    newEntry.addEventListener('click', function() {
        onDivClick(newEntry.id);
    });

    // Icons
    const iconDiv = document.createElement('div');
    iconDiv.classList.add("flex", "justify-between", "w-full", "mt-4");

    // Trash icon
    const newImg = document.createElement('img');
    newImg.src = './trash.png';
    newImg.classList.add("w-8", "h-8", "cursor-pointer");
    newImg.addEventListener("click", function() {
        onImgClick(mainDiv.id);
    });

    // Pencil icon
    const editImg = document.createElement('img');
    editImg.src = './pencil.png';
    editImg.classList.add("w-8", "h-8", "cursor-pointer");
    editImg.addEventListener("click", function() {
        onEditClick(newDiv.id, newEntry.textContent);
    });

    // Append the paragraph (text) to newDiv
    newDiv.appendChild(newEntry);

    // Append icons to iconDiv
    iconDiv.appendChild(editImg);
    iconDiv.appendChild(newImg);

    // Append iconDiv to newDiv
    newDiv.appendChild(iconDiv);

    // Append newDiv to mainDiv
    mainDiv.appendChild(newDiv);

    // Append mainDiv to notelist
    notelist.appendChild(mainDiv);

    // Clear input field
    notetext.value = "";
});
