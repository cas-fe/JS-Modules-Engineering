"use strict";

;$(function() {

    setInterval(function(){
        showData();
    }, 10);

    function createAnimalEntry(animal,id ) {

        let oldValue = $("#animal" + id);

        if (oldValue.length> 0 ) {
            $("span", oldValue[0]).text(animal.toString());
            if(animal.foodRequired()) {
                $("input", oldValue).show();
            }
            else
            {
                $("input", oldValue).hide();
            }
            return;
        }

        let div = $("<div>", {id : "animal" + id});
        let span = $("<span>").text(animal.toString());
        div.append(span);
        let input = $("<input>", {value: "Feed", type: "button"});
        input.click(function () {
            if (animal.feed()) {
                showFood();
                showData();
            }
            else
            {
                input.val("No foood!");
            }
        });
        div.append(input);
        if(animal.foodRequired()) {
            input.show();
        }
        else
        {
            input.hide();
        }

        $("#containerAnimals").append(div);

    }

    function showData(){
        for(let i = 0; i< animals.length; ++i) {
            createAnimalEntry(animals[i],i);
        }
    }

    function createFoodEntry(food,id ) {
        let oldValue = $("#food" + id);
        if(oldValue.length> 0 )
        {
            $("span", oldValue[0]).text(food.name + "[amount: " + food.amount+" ]");
            return;
        }
        let div = $("<div>", { id: "food" + id} );
        let span = $("<span>").text(food.name + "[amount: " + food.amount+" ]").attr("data-id", id);
        let reorder = $("<input>", {value: "Order", type: "button"});
        reorder.click(function() {
            reorder.prop("disabled", true);
            setTimeout(
                function () {
                    food.amount += food.amountPerDelivery;
                    localStorage.setItem("foodStorage_v20", JSON.stringify(foodStorage));
                    span.text(food.name + "[amount: " + food.amount + " ]");
                    reorder.prop("disabled", false);
                }, 2000)
        });
        div.append(span);
        div.append(reorder);
        $("#containerFood").append(div);

    }

    function showFood(){
        for(let i = 0; i< foodStorage.length; ++i) {
            createFoodEntry(foodStorage[i],i);
        }
    }

    $("#createPanda").click(
        function() {  // creates Panda Object
            animals.push(createPanda($("#name").val()));
            showData();
        });

    $("#createLion").click(
        function() { // creates Lion Object
            animals.push(createLion($("#name").val()));
            showData();
        });

    showFood();
    showData();
});