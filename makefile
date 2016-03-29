all:
	rm -rf ~/public_html
	mkdir ~/public_html
	
	chmod 711 ~
	chmod 755 ~/public_html
	cp -r www/. ~/public_html
	
	chmod 644 ~/public_html/htaccess
	chmod 644 ~/public_html/index.html
	chmod 644 ~/public_html/ChartInfo.js
	chmod 644 ~/public_html/MainPage.css
	chmod 711 ~/public_html/credentials.php
	chmod 711 ~/public_html/query.php
	
	
	
	
	
	
	
	
	