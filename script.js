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
    para.classList.add("line-through");
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    notelist.classList.remove("hidden");
    notelist.classList.add("block");

    const notetext = document.getElementById("noteText");

    const newDiv = document.createElement('div');
    newDiv.classList.add("mx-auto");
    newDiv.classList.add("justify-center");
    newDiv.classList.add("align-center");
    newDiv.classList.add("w-[450px]");
    newDiv.classList.add("mt-4");
    newDiv.classList.add("mb-4");
    newDiv.classList.add("cursor-pointer");

    const newEntry = document.createElement('p');

    newEntry.textContent = notetext.value;
    newEntry.classList.add("text-white");
    newEntry.classList.add("text-center");
    newEntry.classList.add("text-3xl");
    newEntry.id = Math.floor(Math.random() * 100);
    newDiv.addEventListener('click', function() {
        onDivClick(newEntry.id);
    });

    newDiv.appendChild(newEntry);
    notelist.appendChild(newDiv);

    notetext.value = "";
})