const noteBox = document.getElementById("note");

const noteInput = function() {
    noteBox.classList.remove("hidden");
    noteBox.classList.add("block");
}

const notelist = document.getElementById("noteList");
const form = document.getElementById('inputForm');

form.addEventListener("submit", (e) => {
    e.preventDefault();

    notelist.classList.remove("hidden");
    notelist.classList.add("block");

    const notetext = document.getElementById("noteText");

    const newEntry = document.createElement('p');

    newEntry.textContent = notetext.value;
    newEntry.classList.add("text-white");
    newEntry.classList.add("text-center");
    newEntry.classList.add("text-3xl");

    notelist.appendChild(newEntry);
})