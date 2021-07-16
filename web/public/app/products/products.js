// html список товаров
function readProductsTemplate(data, keywords) {

    var read_products_html = `
        <!-- форма поиска товаров -->
        <form id='search-product-form' action='#' method='post'>
            <div class='input-group pull-left w-30-pct'>

                <input type='text' value='` + keywords + `' name='keywords' class='form-control product-search-keywords' placeholder='Поиск товаров...' />

                <span class='input-group-btn'>
                    <button type='submit' class='btn btn-default' type='button'>
                        <span class='glyphicon glyphicon-search'></span>
                    </button>
                </span>

            </div>
        </form>

        <!-- при нажатии загружается форма создания продукта -->
        <div id='create-product' class='btn btn-primary pull-right m-b-15px create-product-button'>
            <span class='glyphicon glyphicon-plus'></span> Создать товар
        </div>

        <!-- начало таблицы -->
        <table class='table table-bordered table-hover'>

            <!-- создание заголовков таблицы -->
            <tr>
                <th class='w-25-pct'>Название</th>
                <th class='w-10-pct'>Цена</th>
                <th class='w-15-pct'>Категория</th>
                <th class='w-30-pct text-align-center'>Действие</th>                                
            </tr>`;

    // перебор возвращаемого списка данных
    $.each(data.records, function (key, val) {

        // создание новой строки таблицы для каждой записи
        read_products_html += `<tr>

            <td>` + val.name + `</td>
            <td>$` + val.price + `</td>
            <td>` + val.category_name + `</td>

            <!-- кнопки 'действий' -->
            <td>
                <!-- кнопка для просмотра товара -->
                <button class='btn btn-primary m-r-10px read-one-product-button' data-id='` + val.id + `'>
                    <span class='glyphicon glyphicon-eye-open'></span> Просмотр
                </button>

                <!-- кнопка для изменения товара -->
                <button class='btn btn-info m-r-10px update-product-button' data-id='` + val.id + `'>
                    <span class='glyphicon glyphicon-edit'></span> Редактировать
                </button>

                <!-- кнопка для удаления товара -->
                <button class='btn btn-danger delete-product-button' data-id='` + val.id + `'>
                    <span class='glyphicon glyphicon-remove'></span> Удалить
                </button>
            </td>
        </tr>`;
    });

    // конец таблицы
    read_products_html += `</table>`;

    // pagination
    if (data.paging) {
        read_products_html += "<ul class='pagination pull-left margin-zero padding-bottom-2em'>";

        // первая
        if (data.paging.first != "") {
            read_products_html += "<li><a data-page='" + data.paging.first + "'>Первая страница</a></li>";
        }

        // перебор страниц
        $.each(data.paging.pages, function (key, val) {
            var active_page = val.current_page == "yes" ? "class='active'" : "";
            read_products_html += "<li " + active_page + "><a data-page='" + val.url + "'>" + val.page + "</a></li>";
        });

        // последняя
        if (data.paging.last != "") {
            read_products_html += "<li><a data-page='" + data.paging.last + "'>Последняя страница</a></li>";
        }
        read_products_html += "</ul>";
    }

    // добавим в «page-content» нашего приложения
    $("#page-content").html(read_products_html);
}