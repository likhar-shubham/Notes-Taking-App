let noteBoxNode = document.getElementById('note-box');
let noteCardNode = document.getElementById('notes-card');
let localStorageNoteList = JSON.parse(localStorage.getItem('notes'));
let resetBtn = document.getElementById("reset-btn");
let inputSearchValue = document.getElementById('search-notes');
let delBtnNode = [];
let delBtnIds = [];
let InputNote = ``;

// Variables for setting the HTML for the element
let newNoteHeading1 = `<h3>Note `;
let newNoteHeading2 = `</h3>
<p>`
let delBtn1 = `</p>
<button class="note-btn del-btn" id="del-btn-`
let delBtn2 = `">Delete Note</button>`;

// Initial call to show the notes according to data present in the localStorage
displayNotes();
delBtnDetector();

let addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', onAddBtnClick);

function onAddBtnClick(event) {
    displayNotes();
    event.preventDefault();
}

// Function to show the notes and saving the notes in the local storage
function displayNotes() {
    if (localStorageNoteList === null) localStorageNoteList = [];
    noteBoxNode.value !== "" && localStorageNoteList.push(noteBoxNode.value);
    noteCardNode.innerHTML = "";
    if (localStorageNoteList.length !== 0) {
        localStorageNoteList.forEach((elem, index) => {
            let noteData = document.createElement('div');
            noteData.className = 'note-list';
            noteData.id = 'note-list-' + (index + 1);
            InputNote = (newNoteHeading1 + (index + 1) + newNoteHeading2 + elem + delBtn1 + (index + 1) + delBtn2);
            noteData.innerHTML = InputNote;
            noteCardNode.appendChild(noteData);
        });
        localStorage.setItem('notes', JSON.stringify(localStorageNoteList));
    }
    noteBoxNode.value = "";
    delBtnDetector();
}

// Function to detect the delete button and assign events to them
function delBtnDetector() {
    delBtnNode = document.querySelectorAll(".del-btn");
    Array.from(delBtnNode).forEach(delBtn => {
        delBtn.addEventListener('click', onClickDel);
    });
}

// Function to delete the notes node and remove the same from localStorage
function onClickDel(event) {
    let currElement = document.getElementById(event.srcElement.id);
    noteCardNode.removeChild(currElement.parentElement);
    displayNotes();
    let noteToBeRemoveFromLocalStorage = currElement.parentElement.getElementsByTagName('p')[0].innerHTML;
    localStorageNoteList.splice(localStorageNoteList.indexOf(noteToBeRemoveFromLocalStorage), 1);
    localStorage.setItem('notes', JSON.stringify(localStorageNoteList));
    event.preventDefault();
}

let searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', searchNotes);

// Function to search the notes
function searchNotes(event) {
    let noteCardArray = Array.from(noteCardNode.children);
    noteCardArray.forEach((obj, index) => {
        let noteContent = obj.getElementsByTagName('p')[0].innerText.toLowerCase();
        console.log("noteContent", noteContent);
        if (noteContent.includes(inputSearchValue.value.toLowerCase())) {
            noteCardArray[index].style.display = 'block';
            console.log("value present");
        }
        else
            noteCardArray[index].style.display = 'none';
        console.log("value not present");
    })
}

// Resetting the data according to localStorage
resetBtn.addEventListener('click', resetToDefaultView);

function resetToDefaultView(event) {
    displayNotes();
    delBtnDetector();
    inputSearchValue.value = "";
    event.preventDefault();
}