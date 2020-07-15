$(function() {
  $(".eat").on("click", function(event) {
    var id = $(this).data("id");
    var consumed = $(this).data("eaten");

    var newConsumedState = {
      consumed
    };

    // Send the PUT request.
    $.ajax("/api/sandwiches/" + id, {
      type: "PUT",
      data: newConsumedState
    }).then(
      function() {
        console.log("changed consumed", consumed);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $("#createButton").click((event) => {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newSandwich = {
      name: $("#sandwichInput").val().trim(),
      consumed: 1
    };

    // Send the POST request.
    $.ajax("/api/sandwiches", {
      type: "POST",
      data: newSandwich
    }).then(
      function() {
        console.log("created new sandwich");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // if enter key is pressed within input then click the create button.
  $("#sandwichInput").on("keydown", (event) => {
    if(event.keyCode === 13) {
      $("#createButton").click();
    }
  });

  $(".delete-sandwich").on("click", function(event) {
    var id = $(this).data("id");
    // Send the DELETE request.
    $.ajax("/api/sandwiches/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted sandwich", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

});
