define(function (require) {
    var $ = require('jquery');

    function toHtmlTable(grid) {
        var $table = $('<table>');
        var $body = $('<tbody>');

        for (var row = grid.height - 1; row >= 0; row--) {
            $body.append($('<tr>').data("row", row));
        }

        for (var col = 0; col < grid.width; col++) {
            $.each($('tr', $body), function (idx, row) {
                var $row = $(row);

                $row.append($('<td>')
                    .attr("data-col", col)
                    .attr("data-row", $row.data("row")));
            });
        }

        $body.appendTo($table);

        return $table;
    };

    function Graphics() {

    };

    Graphics.prototype = {
        constructor: Graphics,

        paintWell: function paintWell(tetris) {
            var table;

            var elem = $('#tetris');

            if (!elem.length) {
                throw 'Could not find tetris element!';
            }

            table = elem.find('table');

            if (!table.length) {
                table = toHtmlTable(tetris.well);
                table.appendTo(elem);
            }

            var piece = tetris.getPiece();
            var location = tetris.getPieceLocation();

            tetris.well.forEach(function (x, y, block) {
                var td = $('td[data-col=' + x + '][data-row=' + y + ']', table);

                td.css('background-color', block.color);
            });

            piece.grid.forEach(function (x, y, block) {
                x = location.x + x;
                y = location.y + y;

                var td = $('td[data-col=' + x + '][data-row=' + y + ']', table);

                if (td.length && block.isSolid) {
                    td.css('background-color', piece.color);
                }
            });
        }
    }

    return Graphics;
});
