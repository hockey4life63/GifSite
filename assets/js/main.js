let gifObj = {
    apiKey: "api_key=dc6zaTOxFJmzC",
    url: "https://api.giphy.com/v1/gifs/search?",
    limit: "limit=10&",
    topics: ["Breaking Bad", "Curb Your Enthusiasm", "West Wing", "Longmire", "The x-Files",
        "SNL"
    ],
    apiCall: function(query) {
        let search = "q=" + query + "&";
        let queryURL = this.url + this.limit + search + this.apiKey;
        $.ajax({
            url: queryURL,
            method: "get"
        }).done(function(response) {
            $(".gifContainer").empty();
            $(".gifContainer").append($("<h1>").text(query).addClass("gifTitle"));
            for (var i = 0; i < response.data.length; i++) {
                gifObj.buildGifs(response.data[i]);
            }
            gifObj.addGifLisnter();
        })

    },
    buildButtons: function() {
        $(".nav").empty();
        for (var i = 0; i < this.topics.length; i++) {
            let item = $("<button>");
            item.addClass("listBtn");
            item.text(this.topics[i]);
            item.attr("data-search", this.topics[i]);
            $(".nav").append(item);
        }
        this.addBtnListner();
    },
    buildGifs: function(gif) {
        let item = $("<div>");
        item.addClass("gifDiv");
        let rating = $("<p>");
        rating.text("Rating: " + gif.rating);
        rating.addClass("rating");
        let img = $("<img>");
        img.addClass("gifDisplay");
        img.attr("data-still", gif.images.fixed_height_still.url);
        img.attr("data-animated", gif.images.fixed_height.url);
        img.attr("state", "still");
        img.attr("src", gif.images.fixed_height_still.url);
        item.append(img);
        item.append(rating);
        $(".gifContainer").append(item);
    },
    addButton: function(name) {
        this.topics.push(name);
        this.buildButtons();
    },
    addBtnListner: function() {
        $(".listBtn").on("click", function() {
            gifObj.apiCall($(this).attr("data-search"));
        });
    },
    addGifLisnter: function() {
        $(".gifDisplay").on("click", function() {
            let img = $(this);
            let state = img.attr("state");
            if (state === "still") {
                img.attr("state", "animated");
                img.attr("src", img.attr("data-animated"));
            } else {
                img.attr("state", "still");
                img.attr("src", img.attr("data-still"));
            }
        })
    },
    startUpCall: function() {
        $.ajax({
            url: "http://api.giphy.com/v1/gifs/trending?limit=10&api_key=dc6zaTOxFJmzC",
            method: "get"
        }).done(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                gifObj.buildGifs(response.data[i]);
            }
            gifObj.addGifLisnter();
        })
    }

}
gifObj.buildButtons();
gifObj.startUpCall();

$("#addBtn").on("click", function(event) {
    event.preventDefault();
    let name = $("#addBtnName").val();
    if (name !== "") {
        gifObj.addButton(name);
    }
    $("#addBtnName").val("")
})
