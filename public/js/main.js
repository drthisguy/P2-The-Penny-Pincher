$(".create-bill").on("submit", function(event) {
    event.preventDefault();

    var newBill = {
        name: $("#bill").val.trim(),
        complete: $("[name=created]:checked").val.trim()

    };

    $ajax("/api/bills", {
        type: "POST",
        data: newBill
    }).then(
        function() {
            console.log("created new bill");
            
        }
    )
})

$(".edit-bill").on("click", function(event) {
    var id = $(this).data("id");

    $.ajax("/api/bill/" + id, {
        type: "DELETE"
    }).then(
        function() {
            console.log("edited bill", id);
        }
    )


})