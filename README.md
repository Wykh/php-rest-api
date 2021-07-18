# Документация по использованию API
## Инструкция по запуску сервера

1. Установить [Docker](https://docs.docker.com/engine/install/) и [Docker Compose](https://docs.docker.com/compose/install/);
2. Склонировать текущий репозиторий в удобное место;
3. В терминале (в корне проекта) ввести команду make docker-start;
4. Проверить, что открывается `http://localhost8000/`.

## Добавление данных в БД
1. Пройти по адресу `http://localhost8080/`;
2. Войти в PhpMyAdmin. Логин: "root". Пароль: "root";
3. Создать базу данных с названием `api_db`;
4. Создать таблицу категорий(типов):
   ```
   CREATE TABLE IF NOT EXISTS `categories` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(256) NOT NULL,
    `description` text NOT NULL,
    `created` datetime NOT NULL,
    `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;
   ```
5. Создать таблицу продуктов: 
   ```
    CREATE TABLE IF NOT EXISTS `products` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(32) NOT NULL,
    `description` text NOT NULL,
    `price` decimal(10,0) NOT NULL,
    `category_id` int(11) NOT NULL,
    `created` datetime NOT NULL,
    `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=65 ;
   ```

6. Наполнить таблицы:
   ```
   INSERT INTO `categories` (`id`, `name`, `description`, `created`, `modified`) VALUES
   (1, 'Fashion', 'Category for anything related to fashion.', '2014-06-01 00:35:07', '2014-05-30 17:34:33'),
   (2, 'Electronics', 'Gadgets, drones and more.', '2014-06-01 00:35:07', '2014-05-30 17:34:33'),
   (3, 'Motors', 'Motor sports and more', '2014-06-01 00:35:07', '2014-05-30 17:34:54'),
   (5, 'Movies', 'Movie products.', '2019-05-20 10:22:05', '2019-08-20 10:30:15'),
   (6, 'Books', 'Kindle books, audio books and more.', '2018-03-14 08:05:25', '2019-05-20 11:29:11'),
   (13, 'Sports', 'Drop into new winter gear.', '2016-01-09 02:24:24', '2016-01-09 01:24:24');
    ```
   ```
   INSERT INTO `products` (`id`, `name`, `description`, `price`, `category_id`, `created`, `modified`) VALUES
   (1, 'LG P880 4X HD', 'My first awesome phone!', '336', 3, '2014-06-01 01:12:26', '2014-05-31 17:12:26'),
   (2, 'Google Nexus 4', 'The most awesome phone of 2013!', '299', 2, '2014-06-01 01:12:26', '2014-05-31 17:12:26'),
   (3, 'Samsung Galaxy S4', 'How about no?', '600', 3, '2014-06-01 01:12:26', '2014-05-31 17:12:26'),
   (6, 'Bench Shirt', 'The best shirt!', '29', 1, '2014-06-01 01:12:26', '2014-05-31 02:12:21'),
   (7, 'Lenovo Laptop', 'My business partner.', '399', 2, '2014-06-01 01:13:45', '2014-05-31 02:13:39'),
   (8, 'Samsung Galaxy Tab 10.1', 'Good tablet.', '259', 2, '2014-06-01 01:14:13', '2014-05-31 02:14:08'),
   (9, 'Spalding Watch', 'My sports watch.', '199', 1, '2014-06-01 01:18:36', '2014-05-31 02:18:31'),
   (10, 'Sony Smart Watch', 'The coolest smart watch!', '300', 2, '2014-06-06 17:10:01', '2014-06-05 18:09:51'),
   (11, 'Huawei Y300', 'For testing purposes.', '100', 2, '2014-06-06 17:11:04', '2014-06-05 18:10:54'),
   (12, 'Abercrombie Lake Arnold Shirt', 'Perfect as gift!', '60', 1, '2014-06-06 17:12:21', '2014-06-05 18:12:11'),
   (13, 'Abercrombie Allen Brook Shirt', 'Cool red shirt!', '70', 1, '2014-06-06 17:12:59', '2014-06-05 18:12:49'),
   (26, 'Another product', 'Awesome product!', '555', 2, '2014-11-22 19:07:34', '2014-11-21 20:07:34'),
   (28, 'Wallet', 'You can absolutely use this one!', '799', 6, '2014-12-04 21:12:03', '2014-12-03 22:12:03'),
   (31, 'Amanda Waller Shirt', 'New awesome shirt!', '333', 1, '2014-12-13 00:52:54', '2014-12-12 01:52:54'),
   (42, 'Nike Shoes for Men', 'Nike Shoes', '12999', 3, '2015-12-12 06:47:08', '2015-12-12 05:47:08'),
   (48, 'Bristol Shoes', 'Awesome shoes.', '999', 5, '2016-01-08 06:36:37', '2016-01-08 05:36:37'),
   (60, 'Rolex Watch', 'Luxury watch.', '25000', 1, '2016-01-11 15:46:02', '2016-01-11 14:46:02');
   ```
   Можно наполнить также через UI по ссылке `http://localhost8000/`.


## Инструкция по работе с UI

По-умолчанию при переходе на `http://localhost8000/` будет открыт веб интерфейс 
позволяющий считывать, добавлять, обновлять и удалять элементы из таблицы.

Чтобы совершить определённое действие следует нажать на соответствующую кнопку.

## Инструкция по работе с REST API
### Чтение данных
1. По адресу `http://localhost:8000/api/product/read.php` можно получить JSON список
всех элементов БД
2. По адресу `http://localhost:8000/api/product/read_one.php?id={номер элемента таблицы}`
   можно получить элемент в формате JSON

### Добавление данных
Для добавления данных нужно послать POST запрос по ссылке `http://localhost:8000/api/product/create.php` с JSON тексом в теле запроса, например:

```
{
    "name": "{Название предмета}",
    "description": "{Описание предмета}",
    "price": "{Цена предмета в долларах}",
    "category_id": "{Номер категории предмета}",
}
```
### Обновление данных
Для обновления данных нужно послать POST запрос по ссылке `http://localhost:8000/api/product/update.php` с JSON текстом в теле запроса, например:
```
{
    "id": "{Идентификатор уникальный предмета}",
    "name": "{Название предмета}",
    "description": "{Описание предмета}",
    "price": "{Цена предмета в долларах}",
    "category_id": "{Номер категории предмета}",
}
```
Обязательно должен присутствовать `id` изменяемого предмета и все поля `name`, 
`description`, `price`, `category_id`

### Удаление данных
Для удаления данных достаточно послать POST запрос по ссылке `http://localhost:8000/api/product/delete.php` 
с JSON текстом в теле запроса, например:
```
{
   "id": "{Идентификатор предмета на удаление}"
}
```

# P.S.
Если SKU не был добавлен, то он может быть будет добавлен позднее