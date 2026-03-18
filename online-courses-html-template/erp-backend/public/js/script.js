$(document).ready(function () {

    // Add Event
    $("#event-form").on("submit", function (e) {
        e.preventDefault();
        
        // Get form data
        var eventTitle = $("#event-title").val();
        var eventDate = $("#event-date").val();
        var eventDescription = $("#event-description").val();

        // Show a success message or process the data
        alert("Event Added Successfully:\n" + eventTitle + "\n" + eventDate + "\n" + eventDescription);

        // Reset the form after submission
        $(this).trigger("reset");
        $('#add_event').modal('hide');
    });

});
