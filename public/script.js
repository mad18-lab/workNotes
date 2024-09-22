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

const isPriority = function(divId, buttonId) {
    const element = document.getElementById(divId);
    const button = document.getElementById(buttonId);

    let list = element.classList;

    if (list.contains("bg-[#042d6b]")) {
        element.classList.remove("bg-[#042d6b]");
        button.classList.remove("outline-red-700", "text-red-400");
        element.classList.add("bg-[#bf0a0a]");
        button.classList.add("outline-black", "text-black");
        button.textContent = "Mark as Regular";
    } else if (list.contains("bg-[#bf0a0a]")) {
        element.classList.remove("bg-[#bf0a0a]");
        button.classList.remove("outline-black", "text-black");
        element.classList.add("bg-[#042d6b]");
        button.classList.add("outline-red-700", "text-red-400");
        button.textContent = "Mark as Priority";
    }
}

const onEditClick = function(divId, noteId) {
    const textDiv = document.getElementById(divId);
    const note = document.getElementById(noteId);

    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.value = note.textContent;

    newInput.classList.add("w-full", "p-2", "rounded-lg", "bg-white", "text-black", "text-center", "sm:text-2xl", "text-xl", "cursor-pointer", "font-ibm", "break-words", "whitespace-normal");

    textDiv.replaceWith(newInput);

    newInput.addEventListener("keydown", function(e) {
        if (e.key == "Enter") {
            const updatedText = newInput.value;

            note.textContent = updatedText;

            newInput.replaceWith(textDiv);
        }
    });
}

const saveEntry = async function(entryId, divId) {
    let entry = document.getElementById(entryId);
    let main = document.getElementById(divId);

    let note = {
        date: dateNow.textContent,
        entry: entry.textContent,
        completed: entry.classList.contains("line-through") ? "Yes" : "No",
        priority: main.classList.contains("bg-[#042d6b]") ? "No" : "Yes",
    }

    try {
        const response = await fetch('http://localhost:7878/', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify(note),
        });

        const data = await response.json()

        console.log("Note saved: ", data);
    } catch (error) {
        console.log("Error saving note: ", error);
    }
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    notelist.classList.remove("hidden");
    notelist.classList.add("block");

    let notetext = document.getElementById("noteText");

    // Main div with hover scaling
    const mainDiv = document.createElement('div');
    mainDiv.classList.add("mx-auto", "relative", "transform", "transition", "hover:scale-110", "duration-500", "lg:w-[650px]", "md:w-[500px]", "w-[300px]", "mt-6", "mb-10", "bg-[#042d6b]", "animate-left-fade-fast", "rounded-lg", "p-4", "flex", "flex-col", "space-y-4", "items-center", "justify-center");
    mainDiv.id = Math.floor(Math.random() * 100);

    // Inner div for note content
    const newDiv = document.createElement('div');
    newDiv.classList.add("w-full", "flex", "flex-col", "items-center");
    newDiv.id = Math.floor(Math.random() * 100);

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

    //priority button
    const redButt = document.createElement('button');
    redButt.id = Math.floor(Math.random() * 100);
    redButt.textContent = 'Mark as Priority';
    redButt.classList.add("p-2", "text-red-400", "font-bold", "font-ibm", "outline", "outline-2", "outline-offset-2", "outline-red-700", "rounded-lg")
    redButt.addEventListener("click", function() {
        isPriority(mainDiv.id, redButt.id);
    });

    // Trash icon
    const newImg = document.createElement('img');
    newImg.src = './images/trash.png';
    newImg.classList.add("w-8", "h-8", "cursor-pointer");
    newImg.addEventListener("click", function() {
        onImgClick(mainDiv.id);
        saveEntry(newEntry.id, mainDiv.id);
    });

    // Pencil icon
    const editImg = document.createElement('img');
    editImg.src = './images/pencil.png';
    editImg.classList.add("w-8", "h-8", "cursor-pointer");
    editImg.addEventListener("click", function() {
        onEditClick(newDiv.id, newEntry.id);
    });

    // Append the paragraph (text) to newDiv
    newDiv.appendChild(newEntry);

    // Append icons to iconDiv
    iconDiv.appendChild(editImg);
    iconDiv.appendChild(redButt);
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
