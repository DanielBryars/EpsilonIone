define(
    ['d3'],
    function (d3) {
        return {
            render: function render(graph, config, targetSvgSelector) {

                console.log('forcegraph');
                console.log(JSON.stringify(graph));

                var opts = {
                    "radius": config.radius || function (d) { return 1 + d.label.length; },
                    "charge": config.charge || -500,
                    "distance": config.distance || 50,
                    "width": config.width || 1000,
                    "height": config.height || 750,
                    "label": config.label || false,  // optional
                };

                var svg;

                if (targetSvgSelector) {
                    svg = d3.select(targetSvgSelector);

                    var jQuerySvg = $(targetSvgSelector);

                    opts.height = jQuerySvg.height();
                    opts.width = jQuerySvg.width();
                } else {
                    svg = d3.select("body")
                        .append("svg")
                        .attr("width", opts.width)
                        .attr("height", opts.height);
                }

                var link = svg.selectAll(".link")
                  .data(graph.links)
                  .enter()
                  .append("line")
                  .attr("class", "link");

                var node = svg.selectAll(".node")
                  .data(graph.nodes)
                  .enter()
                  .append("g");

                var circle = node.append("svg:image")
                    .attr("xlink:href", "icons/osa_server_database.svg")
                    .attr("class", "node")
                    .attr("width", 28)
                    .attr("height", 28);

                var text = node.append("text")
                  .text(function (d) { return d[opts.label || "label"]; })
                  .attr("class", "node");

                var force = d3.layout.force()
                  .charge(opts.charge)
                  .linkDistance(opts.distance)
                  .size([opts.width, opts.height])
                  .nodes(graph.nodes)
                  .links(graph.links)
                  .start();

                force.on("tick", function () {
                    link.attr("x1", function (d) { return d.source.x; })
                        .attr("y1", function (d) { return d.source.y; })
                        .attr("x2", function (d) { return d.target.x; })
                        .attr("y2", function (d) { return d.target.y; });
                    text.attr("x", function (d) { return d.x; })
                        .attr("y", function (d) { return d.y; });
                    circle.attr("x", function (d) { return d.x; })
                          .attr("y", function (d) { return d.y; });
                });
                node.call(force.drag); // default CSS/SVG
                link.attr({
                    "stroke": "#999999",
                });
                circle.attr({
                    "stroke": "black",
                    "stroke-width": "1px",
                    "fill": "lightblue",
                    "opacity": 1,
                });
                text.attr({
                    "font-size": "12px",
                    "font-family": "HelveticaNeue-Light, sans-serif",
                });
            }            
        };
    });