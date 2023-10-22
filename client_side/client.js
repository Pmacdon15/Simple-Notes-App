document.addEventListener("DOMContentLoaded", () => {
    const notesList = document.getElementById("notes");
    const form = document.querySelector("form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = document.querySelector('input[name="title"]').value;
        const contents = document.querySelector('input[name="contents"]').value;

        fetch("/notes", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, contents }),
        })
        .then(response => response.json())
        .then(data => {
            const li = document.createElement("li");

            // Create a remove button and attach a click event listener
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", () => {
                // Handle the remove button click event
                removeNote(data.note.id); // Call a function to remove the note
                li.remove(); // Remove the list item from the DOM
            });

            li.textContent = `${data.note.title}: ${data.note.contents} `;
            li.appendChild(removeButton);
            notesList.appendChild(li);

            document.querySelector('input[name="title"]').value = "";
            document.querySelector('input[name="contents"]').value = "";
        })
        .catch(error => {
            console.error("Error creating a new note:", error);
        });
    });

    fetch("/notes", {
        headers: {
            "Accept": "application/json",
        }
    })
    .then(response => response.json())
    .then(data => {
        data.notes.forEach(note => {
            const li = document.createElement("li");

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", () => {
                removeNote(note.id);
                li.remove();
            });

            li.textContent = `${note.title}: ${note.contents} `;
            li.appendChild(removeButton);
            notesList.appendChild(li);
        });
    })
    .catch(error => {
        console.error("Error fetching notes:", error);
    });

    function removeNote(noteId) {
        // Send a DELETE request to remove the note by its ID
        fetch(`/notes/${noteId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            // console.log("Note removed successfully");
        })
        .catch(error => {
            console.error("Error removing the note:", error);
        });
    }
});
