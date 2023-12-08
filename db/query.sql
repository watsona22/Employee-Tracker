-- SELECT *
-- FROM title;
-- JOIN title ON title.movie_name = title.id;

SELECT
  employee.last_name AS first, employee.last_name AS last, AS rolle.salary
FROM employee
JOIN book_prices ON favorite_books.book_price = book_prices.id;