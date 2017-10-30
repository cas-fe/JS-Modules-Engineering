# HSR.CAS-FEE.JS-ENG2
CAS-FEE Übungen für "Engineering mit ES6+ (2) Modularisierung im Browser".

## Übungsserie 1

Machen Sie sich mit der Vorlage vertraut (siehe [zoo.html im Root Directory](zoo.html))
* Gibt es unschöne Stellen im Code, wurde Code kopiert?
* Könnte man solche Code-Fragmente anhand deren Logik und benötigten Daten zusammen fassen?
1. Erstellen Sie jeweils fürs Model (model.js) und den Controller (zoo.js) ein eigenes Script-File.
2. Verlinken Sie die benötigten JavaScript Files im zoo.html .
3. Verbessern Sie die Lesbarkeit des Codes, indem Sie die Funktionalitäten aufspalten und gemäss MVC in die jeweiligen MVC-Files auslagern.
   Tip: Das zoo.html-File sollte schlussendlich keinen JavaScript-Code mehr enthalten.
4. Lagern Sie die Daten-spezifischen Funktionalitäten sowie Copy/Paste Code in eigene Prozeduren aus.
   Tip: Siehe Create Lion/Panda Kommentare bzw. die Animal Objekt-Literale sowie deren Methoden.
5. Führen Sie in den Script-Files ```"use strict"``` ein.

Die Lösungen befinden sich im [Unterordner v1](v1).


## Übungsserie 2

Arbeiten Sie weiter an Ihrer Lösung aus Übung 1.
* Implementieren Sie für die Daten-spezifischen Funktionalitäten eine eigene Klasse im Model File.
  * Instanziieren Sie die Klasse mit den Daten-Funktionalitäten direkt im globalen Scope.
  * Nutzen Sie die class Syntax von ES2015.
* Erstellen Sie die Klassen für die Tiere (Löwe, Panda, …) (Business Logik des Model).
  * Lagern Sie die existierende Funktionalität in die neuen Klassen aus.
* Schreiben Sie eine Basis-Klasse «Animal» mit den Gemeinsamkeiten.
  * Leiten Sie die «Löwe», «Panda», … mittels Vererbung von der neuen Basis-Klasse ab.
* Erweitern Sie die nativen Prototypen und lagern Sie so Utility-Funktionen aus.
  * Verwenden Sie die ```[Klasse].prototype.my_Util = function() { };``` Schreibweise.

Die Lösungen befinden sich im [Unterordner v2](v2).

## Übungsserie 3

Arbeiten Sie weiter an Ihrer Lösung aus Übung 2.
* Analysieren Sie Ihre bestehende Lösung.
  * Welche Patterns haben Sie bereits eingesetzt?
* Kapseln Sie Ihre Funktionalitäten in den MVC-Files in Modules.
  * Verwenden Sie dafür das Module Pattern (als Übung fürs Projekt 1).
    * *Alternativ*: Verwenden Sie die ES2015 Module Syntax mit Google Chrome. Damit die Modules geladen werden, müssen die Sourcen des Zoo's (beispielsweise in node.js) gehosted werden.
    * *Optional*: Setzen Sie weitere Patterns wie z.B. Namespace ein.
  * Stellen Sie sicher, dass die MVC-Architektur (View -> Model -> Data) aus der Vorlesung eingehalten wird.
  1. Erstellen Sie ein Modul fürs Model.
  2. Platzieren Sie den Controller ebenfalls in ein eigenes Module.
  3. Lagern Sie die Persistenz-Features (LocalStorage-Aufruf des Food Storage) in ein weiteres Module (= Data Persistence Module) aus.

*Hinweis: Bei grösseren Projekten ist es empfehlenswert, das Model/Controller/usw. in weitere Folders und Files aufzuteilen und die Script-Files anhand der enthaltenen Features zu benennen, z.B. data/food-storage.js, model/panda.js, model/lion.js, usw.*


* **Optional/Advanced**: Machen Sie den Controller-Code lesbarer ([handlebars](http://handlebarsjs.com/) Übung)
  * Verwenden Sie fürs Rendern der UI-Components handlebar Templates.
  * Im zoo.js File sollten schlussendlich keine DOM-Elemente mehr generiert werden.
  1. Registrieren Sie die Button Events Handlers auf dem document (DOM Event Bubbling nutzen).

     Tip: mit jQuery ```$(document).on("click", function(event) { /**/ });```
  3. Erweitern Sie die Buttons um ein data-* Attribute (z.B. data-animal-id="1"), welches Sie in den Event Handlers abfragen können. Somit können Sie trotz Template das zu fütternde Animal im Code wieder identifizieren.

     Tip: mit jQuery ```$(event.target).data("animal-id")```

*Hinweis: Für Ihr Projekt 1 werden Sie ähnliche Event Handling Mechanismen in Zusammenhang mit MVC und dem handlebars Templating benötigen.*


Die ES5-Modul basierten Lösungen befinden sich im [Unterordner v3.1](v3.1).

Die ESM basierten Lösungen befinden sich im [Unterordner v3.2](v3.2) sowie im [Unterordner v3.2-hbs](v3.2-hbs) für den optionalen Teil. Die "unschönen" Timeouts wurden absichtlich nicht behoben, da ansonsten ein zu grosses Delta mit der vorherigen Lösung entsteht (Einsatz einer Clock Engine nötig). Zusätzlich sollten Model/Controller/usw. in weitere Folders und Files (z.B pro Klasse ein File) aufgeteilt werden.


## Lisence

| Document | License |
| --- | --- |
| Exercises | <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />by <a xmlns:cc="http://creativecommons.org/ns#" href="www.ifs.hsr.ch" property="cc:attributionName" rel="cc:attributionURL"> IFS, HSR Hochschule für Technik, Rapperswil</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>. <br />Based on a work at<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/IFS-Web/HSR.CAS-FEE.Testing" rel="dct:source">    https://github.com/IFS-Web/HSR.CAS-FEE.Testing</a>. |
| Code examples | The code examples are licensed under [The MIT License (MIT)](./LICENSE). |
