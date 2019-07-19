$(document).on("click", ".scrape-new", function () {
    $(".loader").show()
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then((data) => {
        // console.log(data);
        window.location.href = '/'
        // alert("Loading scraped articles, page will refresh shortly...")
        //pop up a modal/alert telling user it's loading
    });
});

$(document).on("click", ".clear", function () {
    $.ajax({
        method: "PUT",
        url: "/clear"
    }).then((data) => {
        // console.log(data);
        window.location.href = '/'
    });
});

$(document).on("click", ".btn-outline-success", function () {
    let id = $(this).attr("data-id");
    $.ajax({
        method: "PUT",
        url: "/save/" + id
    }).then((data) => {
        // console.log(data);
        document.location.reload()
    });
});

$(document).on("click", ".btn-outline-danger", function () {
    let id = $(this).attr("data-id");
    $.ajax({
        method: "PUT",
        url: "/unsave/" + id
    }).then((data) => {
        // console.log(data);
        document.location.reload()
    });
});

$(document).on("click", ".bootbox-close-button", function () {
    $(".note-box").hide();
});

$(document).on("click", ".btn-outline-info", function () {
    let articleId = $(this).attr("data-id")
    $(".modal-text").text("Notes for Article: " + $(this).attr("data-title"))
    $(".saver").attr("data-articleId", articleId);
    $.ajax({
        method: "GET",
        url: "/notes/" + articleId
    }).then((data) => {
        showNotes(data);
    });
});

$(document).on("click", ".saver", function () {
    let articleId = $(this).attr("data-articleId")
    $.ajax({
        method: "POST",
        url: "/notes/add/" + articleId,
        data: {
            body: $(".note-entry").val().trim()
        }
    }).then((data) => {
        $(".note-entry").val("");
        $.ajax({
            method: "GET",
            url: "/notes/" + articleId
        }).then((data) => {
            showNotes(data);
        });
    });
});

$(document).on("click", ".note-delete", function () {
    let noteId = $(this).attr("data-noteId");
    let articleId = $(".saver").attr("data-articleId");
    $.ajax({
        method: "DELETE",
        url: "/delete/" + noteId
    }).then((data) => {
        $.ajax({
            method: "GET",
            url: "/notes/" + articleId
        }).then((data) => {
            showNotes(data);
        });
    });
});

function showNotes(data) {
    $(".note-container").empty()
    if (data.note.length < 1) {
        $(".note-container").append(
            $("<li>").addClass("list-group-item")
                .text("No notes for this article yet.")
        );
    } else {
        (data.note).forEach(note => {
            let newNote = $("<li>").addClass("list-group-item").text(note.body);
            newNote.append($("<button>").attr("data-noteId", note._id).addClass("note-delete").text("X"));
            $(".note-container").append(newNote);
        })
    }
    $(".note-box").show();
};