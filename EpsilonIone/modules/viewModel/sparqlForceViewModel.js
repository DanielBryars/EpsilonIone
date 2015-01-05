define(
    [
        'jquery',
        'd3',
        'knockout',
        'sparql/sparqlClient',
        'sparql/sparqlToGraph',
        'visualisation/graphRenderer'
    ],
    function ($, d3, ko, sparqlClient, sparqlToGraph, graphRenderer) {
        
        var viewModelFactory = function() {
            var model = this;

            this.endpoint = ko.observable('http://togostanza.org/sparql');
            this.sparqlQueryText = ko.observable('PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n' +
                'PREFIX up: <http://purl.uniprot.org/core/> \n' +
                'PREFIX tax: <http://purl.uniprot.org/taxonomy/> \n' +
                'SELECT ?taxid1 ?taxid2 ?name1 ?name2 \n' +
                'FROM <http://togogenome.org/graph/uniprot/> \n' +
                'WHERE \n' +
                '{ \n' +
                '   ?taxon1 rdfs:subClassOf+ tax:58669 . \n' +
                '   ?taxon1 rdfs:subClassOf ?taxon2 . \n' +
                '   ?taxon1 up:scientificName ?name1 . \n' +
                '   ?taxon2 up:scientificName ?name2 . \n' +
                '   bind (strafter(str(?taxon1), \'taxonomy/\') as ?taxid1) \n' +
                '   bind (strafter(str(?taxon2), \'taxonomy/\') as ?taxid2) \n' +
                '}');

            this.executeSearch = function executeSearch() {

                var endpoint = model.endpoint();
                var sparql = model.sparqlQueryText();

                var renderFromResult = function (results) {

                    var graph = sparqlToGraph.toGraph(results, {
                        "key1": "taxid1",
                        "key2": "taxid2",
                        "label1": "name1",
                        "label2": "name2"
                    });

                    graphRenderer.render(
                        graph, {
                            "radius": function (d) { return 1 + d.label.length; },
                            "charge": -500,
                            "distance": 50,
                            "width": '1000',
                            "height": '750'}, 
                        '#mySvg');
                }

                sparqlClient
                    .query(endpoint, sparql)
                    .then(renderFromResult);
            }
        
            this.scratch =  function executeSearch() {

                var endpoint = 'http://dandesktop:8090/brightstar/MyGraph/sparql';
                var sparql = "select ?s ?p ?o where { ?s ?p ?o } LIMIT 5";

                var renderFromResult = function (results) {

                var graph = sparqlToGraph.toGraph(results, {
                    "key1": "taxid1",
                    "key2": "taxid2",
                    "label1": "name1",
                    "label2": "name2"
                });

                graphRenderer.render(
                    graph, {
                        "radius": function (d) { return 1 + d.label.length; },
                        "charge": -500,
                        "distance": 50,
                        "width": '1000',
                        "height": '750'}, 
                    '#mySvg');
            }

            sparqlClient
                .query(endpoint, sparql)
                .then(renderFromResult);
            }
        };

        //Just one of these
        return viewModelFactory();
    }
    );