define(
    ['d3'],
    function (d3) {
        return {
            toGraph: function toGraph(json, config) {
                var head = json.head.vars;
                var data = json.results.bindings;
                var opts = {
                    "key1": config.key1 || head[0] || "key1",
                    "key2": config.key2 || head[1] || "key2",
                    "label1": config.label1 || head[2] || false,  // optional
                    "label2": config.label2 || head[3] || false,  // optional
                };
                var graph = {
                    "nodes": [],
                    "links": []
                };
                var check = d3.map();
                var index = 0;
                for (var i = 0; i < data.length; i++) {
                    var key1 = data[i][opts.key1].value;
                    var key2 = data[i][opts.key2].value;
                    var label1 = opts.label1 ? data[i][opts.label1].value : key1;
                    var label2 = opts.label2 ? data[i][opts.label2].value : key2;
                    if (!check.has(key1)) {
                        graph.nodes.push({ "key": key1, "label": label1 });
                        check.set(key1, index);
                        index++;
                    }
                    if (!check.has(key2)) {
                        graph.nodes.push({ "key": key2, "label": label2 });
                        check.set(key2, index);
                        index++;
                    }
                    graph.links.push({ "source": check.get(key1), "target": check.get(key2) });
                }
                return graph;
            }
        };
    });