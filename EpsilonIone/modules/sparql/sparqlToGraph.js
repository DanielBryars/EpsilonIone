define(
    ['d3'],
    function (d3) {
        return {
            toDependencyGraph: function toDependencyGraph(json) {
                var data = json.results.bindings;                
                var graph = {
                    "nodes": [],
                    "links": []
                };
                var check = d3.map();
                var index = 0;
                for (var i = 0; i < data.length; i++) {
                    var fromNode = data[i]["fromNode"];
                    var toNode = data[i]["toNode"];
                    var fromNodeLabel = data[i]["fromNodeLabel"];
                    var toNodeLabel = data[i]["toNodeLabel"];

                    if (fromNode && !check.has(fromNode.value)) {
                        graph.nodes.push({ "key": fromNode.value });
                        check.set(fromNode.value, index);
                        index++;
                    }

                    if (toNode && !check.has(toNode.value)) {
                        graph.nodes.push({ "key": toNode.value });
                        check.set(toNode.value, index);
                        index++;
                    }

                    if (fromNodeLabel) {
                        //fromNodeLabel's always have a corresponding fromNode
                        graph.nodes[check.get(fromNode.value)].label = fromNodeLabel.value;
                    }

                    if (toNodeLabel) {
                        //toNodeLabel entries always have a corresponding toNode
                        graph.nodes[check.get(toNode.value)].label = toNodeLabel.value;
                    }

                    if (fromNode && toNode) {
                        graph.links.push({ "source": check.get(fromNode.value), "target": check.get(toNode.value), "value": 10 });
                    }
                }
                return graph;
            }
        };
    });