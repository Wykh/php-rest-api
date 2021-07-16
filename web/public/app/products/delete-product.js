jQuery(function ($) {

    // будет работать, если была нажата кнопка удаления
    $(document).on('click', '.delete-product-button', function () {
        // получение ID товара
        var product_id = $(this).attr('data-id');

        // bootbox для подтверждения во всплывающем окне
        bootbox.confirm({

            message: "<h4>Вы уверены?</h4>",
            buttons: {
                confirm: {
                    label: '<span class="glyphicon glyphicon-ok"></span> Да',
                    className: 'btn-danger'
                },
                cancel: {
                    label: '<span class="glyphicon glyphicon-remove"></span> Нет',
                    className: 'btn-primary'
                }
            },
            callback: function (result) {
                if (result==true) {

                    // отправим запрос на удаление в API / удаленный сервер
                    $.ajax({
                        url: "http://localhost:8000/api/product/delete.php",
                        type : "POST",
                        dataType : 'json',
                        data : JSON.stringify({ id: product_id }),
                        success : function(result) {

                            // покажем список всех товаров
                            showProducts();
                        },
                        error: function(xhr, resp, text) {
                            console.log(xhr, resp, text);
                        }
                    });

                }
            }
        });
    });
});