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

form.addEventListener("submit", (e) => {
    e.preventDefault();

    notelist.classList.remove("hidden");
    notelist.classList.add("block");

    const notetext = document.getElementById("noteText");

    const mainDiv = document.createElement('div');
    mainDiv.classList.add("mx-auto", "relative", "justify-center", "align-center", "w-[650px]", "mt-4", "mb-4");
    mainDiv.id = Math.floor(Math.random() * 100);

    const newDiv = document.createElement('div');
    newDiv.classList.add("mx-auto", "justify-center", "align-center", "w-[250px]", "mt-4", "mb-6");

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
    newEntry.classList.add("text-white", "text-center", "text-2xl", "cursor-pointer");
    newEntry.id = Math.floor(Math.random() * 100);
    newEntry.addEventListener('click', function() {
        onDivClick(newEntry.id);
    });

    newDiv.appendChild(newEntry);
    notelist.appendChild(mainDiv);

    notetext.value = "";
})