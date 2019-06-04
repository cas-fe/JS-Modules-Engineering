# CAS FEE - OOD-Übung / v0.5

## Ziele der Übung
Vertiefen und praktisches Anwenden von Klassen und Modulen im Zusammehang mit dem Model-View-Controller Pattern.

## Vorbereitung
* Kopieren/klonen Sie die Aufgabe von github.com/IFS-Web/HSR.CAS-FEE.JS-ENG2 auf Ihren Rechner.
* Öffnen Sie eine Command Prompt (z.B. Windows Console, cmd.exe) und navigieren Sie in den Ordner "/vorlage"
* Führen Sie den Command "npm install" aus um das npm-Paket mit dessen Abhängigkeiten zu installieren.
* Starten Sie den Server mit "npm start"
* Die Webseite ist unter http://localhost:3000/ erreichbar.


## API
Der Server gibt das zoo.html File zurück. Eine zusätzliche Server-API ist nicht notwendig.

-----

## Ihre Aufgabe
Sie finden die Ausgangslage im Ordner 'vorlage' vor.

*In der Übersicht: In den folgenden Übungen werden Sie eine bestehende Applikation strukturieren und schrittweise modularisieren. Dabei gilt es das JavaScript OOP-Handwerk zu üben und in einem praxisnahen Umfeld einzusetzen.*

1. Bestehenden Code auf File-System Basis gemäss Layering strukturieren (logische Gliederung der JavaScript-Konstrukte).
2. Strukturiertes (objektbasiertes) JavaScript in objektorientierte Klassen umbauen.
3. Klassen in JavaScript Module platzieren und mittels Import-/Export-Syntax referenzieren.

*Ihre Aufgabe ist es also, den bestehenden Programmcode in der Vorlage zu "verschönern" (refactoring).*

## Hinweise
* Wenn Sie beim Vorgehen unsicher sind, können Sie den TODOs in der Vorlage folgen. Diese definieren eine strukturierte Vorgehensweise, wie Sie die Übung lösen könnten.
* Die Lösungen befinden sich jeweils im Ordner 'solutions-exerciseNr', wobei Nr für die aktuelle Übungsnummer steht. Bei Unklarheiten kann die Lösung ebenfalls zurate gezogen werden.
* Falls Sie mit der vorherigen Lösung noch nicht fertig sind, können Sie auch mit der letzten Lösung aus dem Ordner 'solutions-exerciseNr' fortfahren.
* Um eingeschlichene Fehler möglichst effizient zu erkennen, sollten Sie Ihre Lösung in möglichst granularen Schritten testen.

-----

# Mögliche Vorgehensweise

## Exercise 1
In dieser Übung werden Sie sich mit der Vorlage vertraut machen und die verwendeten JavaScript Konstrukte innerhalb der Applikation analysieren. Sie finden die Tipps unter // TODO: Step 1.

* Erstellen Sie pro Konstrukt/Funktion ein eigenes File. Benennen Sie die Files nach dem kebap-case Schema, beispielsweise wird die Klasse FoodStorage ins File food-storage.js platziert.
* Bauen Sie die folgende Ordnerstruktur auf und platzieren Sie die Files entsprechend der logischen Zugehörigkeit. Platzieren Sie die Verlinkungen ebenfalls im zoo.html.
* scripts
  * bl (Model: "Business" Logic)
  * dl (Data Persistance / Data Access)
  * ui (UI Dependent Logic)
    * zoo-controller.js (Controller: UI <-> BL Connection)
  * utils.js
  * stylesheets
  * zoo.html (View)


## Exercise 2
Bauen Sie die objektbasierten Konstrukte in echte Klassen und Objekte um. Sie finden die Tipps unter // TODO: Step 2.

* Übersetzen Sie zuerst die Funktion createFood() in eine Klasse mit sämtlichen Instanzfeldern/Eigenschaften (id, name, amount, ...). Verwenden Sie nun im food-service.js den Konstruktor new Food(...) anstatt createFood(...).
* Übersetzen Sie das foodService-Konstrukt in eine Klasse. Im Vergleich zu Object Literal's müssen Klassen instanziiert werden, platzieren Sie die Instanziierung in die Methode start() des Bootstrappers (const foodService = new FoodService()). Übergeben Sie den foodService dem ZooController als Konstruktor-Argument. Speichern Sie den foodService als Instanzfeld/Eigenschaft im ZooController und ersetzen Sie die globalen Zugriffe auf foodService durch den Zugriff auf die foodService-Eigenschaft.
* Gehen Sie bei der Übersetzung des animalService-Konstrukts analog zum Punkt foodService vor.
* Das Konstrukt createAnimal soll als Basis-Klasse für die Lion/Panda's dienen. Übersetzen Sie createAnimal entsprechend in eine eigene Klasse. Legen Sie nun die Klasse Lion entsprechend zu createPanda an. Leiten Sie diese von Animal ab und überschreiben (overriding) Sie die notwendigen Attribute / Methoden. Verwenden Sie im Anschluss nicht mehr createLion(...) sondern new Lion(...) (d.h. anpassen des AnimalService).
* Erstellen Sie die Klasse Panda aus dem Konstrukt in createPanda und leiten Sie Panda von Animal ab. Setzen Sie die notwendigen Attribute im Panda-Konstruktor. Passen Sie den AnimalService an, damit dieser nun new Panda(...) aufruft.
* Packen Sie als nächstes die Funktionalität in food-storage.js in eine eigene FoodStorage Klasse.
* Instanziieren Sie den FoodStorage im Bootstrapper, übergeben Sie die Instanz als Konstruktor-Argument dem FoodService und speichern Sie den foodStorage Parameter in das storage Instanzfeld/Eigenschaft.

## Exercise 3
Führen Sie nun ES2015 Modules ein. Sie finden die Tipps unter // TODO: Step 3.

* Ihre Lösung ist nun optimal vorbereitet für den Einsatz von ES2015 Modules. Achtung: Ihre Lösung lässt sich bis zum kompletten Abschluss des Step 3 nicht mehr ausführen.
* Definieren Sie die Files als Modules. Exportieren Sie die Klassen, welche von anderen Files wiederverwendet werden sollen.
* Importieren Sie wo nötig die Klassen mittels Import-Syntax.
* Deklarieren Sie ebenfalls den Bootstrapper-Aufruf im zoo.html im <script type="module">-Syntax.
* Entfernen Sie schlussendlich die nicht mehr benötigten script-Tags im zoo.html File.

-----

# Lösung
Eine mögliche Komplettlösung ist im Ordner "solution-exercise3" abgelegt.
