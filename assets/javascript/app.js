$(document).ready(function() {
  var topics = ["fail", "yas", "corgi", "side eye", "smh", "trending", "comedy", "politics", "SNL"];
  for (var i = 0; i < topics.length; i++) {
    var button = $("<button class='topic_button'>").attr("topic", topics[i]).text(topics[i]);
    $("#buttons-go-here").append(button);
  }
  $("#search_button").on("click", function() {
    var userChoice = $("#userInput").val();
    console.log(userChoice);
    topics.push(userChoice);
    addButtons();
  });

  var addButtons = function() {
    for (var i = 0; i < topics.length; i++) {
      var button = $("<button class='topic_button'>").attr("topic", topics[i]).text(topics[i]);
      $("#buttons-go-here").append(button);
    }
};

  $(".topic_button").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var topic = $(this).attr("topic");


    console.log(topic);

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      topic + "&api_key=UqKLNuUwCYlpk5JIP7BxKsOn8XXOCFhV&limit=10";


          $.ajax({
            url: queryURL,
            method: "GET"
          })
            // After the data comes back from the API
            .then(function(response) {
              // Storing an array of results in the results variable
              var results = response.data;

              // Looping over every result item
              for (var i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                  // Creating a div with the class "item"
                  var gifDiv = $("<div class='item'>");

                  // Storing the result item's rating
                  var rating = results[i].rating;

                  // Creating a paragraph tag with the result item's rating
                  var p = $("<p>").text("Rating: " + rating);

                  // Creating an image tag
                  var gifImage = $("<img>");


                  gifImage.attr("src", results[i].images.fixed_height.url);

                  // Appending the paragraph and personImage we created to the "gifDiv" div we created
                  gifDiv.append(p);
                  gifDiv.append(gifImage);

                  // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                  $("#gifs-appear-here").prepend(gifDiv);
                }
              }
            });
            });
        });
