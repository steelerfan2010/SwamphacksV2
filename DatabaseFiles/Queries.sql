SELECT *, COUNT(*) AS frequency 
FROM RegularNumbers
WHERE theDate >= '2015-09-07'
GROUP BY regularNumber;
