//cartoon button array
var cartoonArray = ["Adventure Time", "Rick and Morty", "Futurama", "Steven Universe", "The Simpsons", "Bob's Burgers"];

$(document).ready(function() {
    for (var i = 0; i < cartoonArray.length; i++) {
        $("#cartoon-buttons").append("<button type='button' onclick='searchGif(\"" + cartoonArray[i] + "\")' class='btn btn-primary' value=' " + cartoonArray[i] + "'> " + cartoonArray[i] + " </button>");
    }
});

//function for button clicks
function cartoonButtonClicked() {
    var userInput = $('#cartoon-input').val();
    searchGif(userInput);
}

function submitButtonClicked() {
    var userInput = $('#cartoon-input').val();

    if (userInput) {
        $('#cartoon-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

//giphy api
function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=b73ba498bae64e0dbea23eba9be0da08',
            type: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}

//had to steal this. honestly still don't understand how it works
function displayGif(response) {
    $('#cartoons').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#cartoons').append(image);
    }

    //animate gif when clicked
    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}