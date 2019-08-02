(function ($) {
    $.fn.calculator = function () {
        var id = Math.floor(Math.random() * 1000);
        var that;
        var addToInput = function (input, toAdd) {
            var content = input.val() + toAdd;
            input.val(content);
        };
        var evalInput = function (input) {
            var content = input.val();
            input.val(eval(content));
        };
        var clearInput = function (input) {
            input.val("");
        }

        this.replaceWith("<table id='" + id + "' class='calculator'>");
        that = $("#" + id);
        that.removeAttr("id");
        $.getJSON("data.json", function (data) {
            var idx = 0;
            var firstRow = $("<tr>");
            var inputTd = $("<td>");
            var clearTd = $("<td>");
            var input = $("<input>");
            var clearButton = $("<button>cl</button>");

            clearButton.click(function (e) {
                clearInput(input);
            })
            inputTd.attr("colspan", "3");
            input.addClass("input");
            input.prop("disabled", true);
            inputTd.append(input);
            clearTd.append(clearButton);
            firstRow.append(inputTd);
            firstRow.append(clearTd);

            that.append(firstRow);
            for (var i = 0; i < 4; i += 1) {
                var row = $("<tr>");

                for (var j = 0; j < 4; j += 1) {
                    var td = $("<td>");
                    var button = $("<button>");

                    button.addClass(data[idx]["class"]);
                    button.html(data[idx]["html"]);
                    if (button.hasClass("number"))
                        button.click(function (e) {
                            addToInput(input, e.target.innerHTML);
                        });
                    else {
                        switch (button.html()) {
                            case "=":
                            button.click(function (e) {
                                evalInput(input);
                            })
                            break;
                            default:
                            button.click(function (e) {
                                addToInput(input, e.target.innerHTML);
                            });
                            break;
                        }
                    }
                    idx++;
                    td.append(button);
                    row.append(td);
                }
                that.append(row);
            }
        });
        return that;
    }

    $(function () {
        $(".calculator").calculator();
    });
}(jQuery));