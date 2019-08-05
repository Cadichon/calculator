(function ($) {
    $.fn.calculator = function () {
        var id = Math.floor(Math.random() * 1000);
        var that;
        var addToInput = function (input, toAdd) {
            var content = input.val() + toAdd;
            input.val(content);
        };
        var updateOutput = function (output) {
            $.ajax({
                url: "api/",
                method: "get",
                dataType: "json",
                success: function (data) {
                    output.empty();
                    for (var i = 0; i < data.length; i += 1) {
                        var option = $("<option value=result-" + i + ">" + data[i].calcul + " = " + data[i].result + "</option>");
                        if (i + 1 == data.length) {
                            option.prop("selected", true);
                        }
                        output.append(option);
                    }
                }
            });
        }
        var evalInput = function (input, output) {
            var content = input.val();
            if (content.length == 0)
                return;
            input.val("");
            $.ajax({
                url: "api/",
                method: "post",
                data: {
                    "calcul": content,
                    "result": eval(content)
                }
            });
            updateOutput(output);
        };
        var clearInput = function (input) {
            input.val("");
        };
        var createFirstRow = function () {
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
            return [firstRow, input];
        };
        var createSecondRow = function () {
            var secondRow = $("<tr>");
            var outputTd = $("<td>");
            var output = $("<select name='result'>");

            outputTd.attr("colspan", "4");
            output.addClass("output");
            outputTd.append(output);
            secondRow.append(outputTd);;
            return [secondRow, output];
        }

        this.replaceWith("<table id='" + id + "' class='calculator'>");
        that = $("#" + id);
        that.removeAttr("id");
        $.getJSON("data.json", function (data) {
            var idx = 0;
            var [firstRow, input] = createFirstRow();
            var [secondRow, output] = createSecondRow();

            updateOutput(output);
            that.append(firstRow);
            that.append(secondRow);
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
                                evalInput(input, output);
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