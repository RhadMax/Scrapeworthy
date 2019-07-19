$(document).on("click", ".scrape-new", function () {
    alert("Loading scraped articles, press accept and then page will refresh shortly...")
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
        window.location.href = '/'
    });
});

$(document).on("click", ".btn-outline-danger", function () {
    let id = $(this).attr("data-id");
    $.ajax({
        method: "PUT",
        url: "/unsave/" + id
    }).then((data) => {
        // console.log(data);
        window.location.href = '/saved'
    });
});

$(document).on("click", ".bootbox-close-button", function () {
    $(".modal").hide();
});

$(document).on("click", ".btn-outline-info", function () {
    $(".modal-text").text("Notes for Article: " + $(this).attr("data-title"))
    $(".modal").show();
});