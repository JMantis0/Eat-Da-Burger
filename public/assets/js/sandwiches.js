// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-consumed").on("click", function(event) {
    var id = $(this).data("id");
    var newConsumed = $(this).data("newconsumed");

    var newConsumedState = {
      consumed: newConsumed
    };

    // Send the PUT request.
    $.ajax("/api/sandwiches/" + id, {
      type: "PUT",
      data: newConsumedState
    }).then(
      function() {
        console.log("changed sleep to", newConsumed);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
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
