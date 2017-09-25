# Budapest Gourmet Guide - Demo Backend

Ahogy azt a kódból láthatod is, rendkívül egyszerű kis Node script szolgál most backendként. 

Amit a működésről érdemes tudni:
* Indításkor a data.json-ből tölti be azt a néhány adatot. Ezt majd később bővítem kicsit.
* Az adatokkal memóriában dolgozik, nem menti őket se diskre, se adatbázisba. 
* Lassúnak tűnhet a response, ez szándékos, van benne egy random 1-5 mp-es várakozás, így jobban lehet a loading animációkkal is dolgozni.
* A képeket az ./uploads könyvtárba tölti fel. 

Ennyi!

## Szerver setup

Mindenek előtt legyen telepítve a legfrissebb [*Node.js*](https://nodejs.org/en/). 

Innentől két parancs az egész:
* npm install
* npm run start

Ha elhasalna valahol azt a konzolból szépen látni fogod, ez esetben csak simán indítsd újra.

## Lekérdezések

Az összes étterem lekérése:
`curl localhost:8080/restaurants`

Egy konkrét étterem lekérése index alapján: 
`curl localhost:8080/restaurants/3`

Kép feltöltése (a test.jpg-et mellékeltem):
`curl -F "image=@test.jpg" localhost:8080/upload`

Kép elérése (ezt curl helyett a böngészőben nézd meg):
`localhost:8080/static/test.jpg`

Étterem feltöltése:
`curl -H "Content-Type: application/json" -X POST -d '{"name":"Sophie & Ben Garden","short-desc":"Csodás vidékies étterem Budapesten gyerekekkel!","image-url":"localhost:8080/static/test.jpg","user":{"first-name":"Tibor","last-name":"Molnár"},"liked":false}' localhost:8080/restaurants`