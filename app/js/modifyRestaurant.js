$(function () {

    deleteRestuarant();   

});

// Open side search
function deleteRestuarant() {

    $('.delete-Restaurant').on('click', function () {

        var oThis = $(this);

        var r = confirm("Would you like to delete this restaurant listing?");
        if (r === true) {
            var restaurantId = {
                id: oThis.attr('data-indentify')
            };

            //JSON data
            var dataType = 'application/json; charset=utf-8';

            $.ajax({
                type: 'POST',
                url: Routing.generate('delete_listing'),
                dataType: 'json',
                contentType: dataType,
                data: JSON.stringify(restaurantId),
                success: function (output) {
                    if(output){
                        oThis.closest('.restaurant-list-card').remove();
                    }
                },
                error: function () {

                }
            });
        }
    }
    )
}