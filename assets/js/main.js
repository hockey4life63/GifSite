let gifObj = {
    apiKey: "api_key=dc6zaTOxFJmzC",
    url: "https://api.giphy.com/v1/gifs/search?",
    limit: "limit=10&",
    topics: ["cats", "dogs", "birds"],
    apiCall: function(query) {
        let search = "q=" + query + "&";
        let queryURL = this.url + this.limit + search + this.apiKey;
        $.ajax({
            url: queryURL,
            method: "get"
        }).done(function(response) {
            $(".gifContainer").empty();
            for (var i = 0; i < response.data.length; i++) {
                console.log(response.data[i])
                gifObj.buildGifs(response.data[i]);
            }
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
        this.addEventListner();
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
        item.append(rating);
        item.append(img);
        $(".gifContainer").append(item);


    },
    addButton: function(name) {
        this.topics.push(name);
        this.buildButtons();
    },
    addEventListner: function() {
        $(".listBtn").on("click", function() {
            gifObj.apiCall($(this).attr("data-search"));
        });
    }
}
gifObj.buildButtons();

$("#addBtn").on("click", function(event) {
    event.preventDefault();
    let name = $("#addBtnName").val();
    if (name !== "") {
        gifObj.addButton(name);
    }
})
