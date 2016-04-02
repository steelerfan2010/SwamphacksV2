all: www/credentials.php
	rm -rf ~/public_html
	mkdir ~/public_html
	
	chmod 711 ~
	chmod 755 ~/public_html
	cp -r www/. ~/public_html
	
	chmod 644 ~/public_html/htaccess
	chmod 644 ~/public_html/index.html
	chmod 644 ~/public_html/genRandTables.html
	chmod 644 ~/public_html/ChartInfo.js
	chmod 644 ~/public_html/queries.js
	chmod 644 ~/public_html/alg.js
	chmod 644 ~/public_html/genRandTables.js
	chmod 644 ~/public_html/MainPage.css
	chmod 644 ~/public_html/home.css
	chmod 644 ~/public_html/Lottery.jpg
	chmod 711 ~/public_html/credentials.php
	chmod 711 ~/public_html/query.php
	
www/credentials.php:
	#UPDATE YOUR CREDENTIALS.PHP FILE. A BLANK ONE HAS BEEN INSERTED.
	#After updating, make again.
	cp etc/credentials_blank.php www/credentials.php
	
	
	
	
	
	
	
	
	
