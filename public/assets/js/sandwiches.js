$(function () {

  //  createBurger creates a newSandwich object using value of #burgerInput
  //  then uses an ajax to send a post call to sandwichController
  //  then console logs and refreshes page

  $("#burgerInput").focus();


  let createBurger = () => {
    let burgerName = $("#burgerInput").val().trim();
    if (burgerName === "") {
      burgerName = "No-name Burger";
    } else {
      burgerName = $("#burgerInput").val().trim();
    }
    var newBurger = {
      name: burgerName,
      devoured: 1
    };

    // Send the POST request.
    $.ajax("/api/sandwiches", {
      type: "POST",
      data: newBurger
    }).then(
      function (id) {
        // Reload the page to get the updated list
        location.reload();
      }
    );
  }

  $(".eat").on("click", function (event) {
    var id = $(this).data("id");
    var devoured = $(this).data("eaten");

    var newdevouredState = {
      devoured
    };

    // Send the PUT request.
    $.ajax("/api/sandwiches/" + id, {
      type: "PUT",
      data: newdevouredState
    }).then(
      function () {
        console.log("changed devoured", devoured);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $("#createBtn").click((event) => {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    createBurger();
  });

  // if enter key is pressed within input then click the create button.
  $("#burgerInput").on("keydown", (event) => {
    if (event.keyCode === 13) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();

      createBurger();
    }
  });

  $(".delBtn").on("click", function (event) {
    var id = $(this).data("id");
    // Send the DELETE request.
    $.ajax("/api/sandwiches/" + id, {
      type: "DELETE"
    }).then(
      function () {
        console.log("deleted sandwich", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

});
