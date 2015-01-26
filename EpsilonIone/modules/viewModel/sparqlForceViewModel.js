define(
    [
        'jquery',
        'd3',
        'knockout',
        'sparql/sparqlClient',
        'sparql/sparqlToGraph',
        'visualisation/graphRenderer'
    ],
    function($, d3, ko, sparqlClient, sparqlToGraph, graphRenderer) {

        var viewModel = function() {

            var model = this;

            this.endpoint = ko.observable('http://dandesktop:8090/brightstar/tronCmdb/sparql');
            this.sparqlQueryText = ko.observable('PREFIX cmdb: <http://purl.org/aer/cmdb/1.0/> ' +
                '' +
                'SELECT ?s ' +
                'WHERE ' +
                '            {' +
                '                GRAPH <http://aeriandi.com/cmdbTron/ServiceCatalog#Index> { ?s a cmdb:serviceDependencyGraph  }  ' +
                '            }');

            this.populateServicesUiDropDown = function populateServicesUiDropDown() {
                require(['text!sparqlQueries/allServiceDependencyGraphsInIndex.txt'], function(rq) {
                    console.log(rq);

                    var endpoint = model.endpoint();
                    var sparql = rq;


                    sparqlClient
                        .query(endpoint, sparql)
                        .then(function (queryResult) {

                            var bootStrapDropDownHtml = "<li class=\"dropdown\">"
                                + "    <a href=\"#\" data-toggle=\"dropdown\" class=\"dropdown-toggle\">Services <b class=\"caret\"></b></a>"
                                + "<ul class=\"dropdown-menu\">";

                            var arrayLength = queryResult.results.bindings.length;
                            for (var i = 0; i < arrayLength; i++) {

                                bootStrapDropDownHtml += "<li>";

                                var item = queryResult.results.bindings[i];
                                console.log(item.graphName.value + " " + item.label.value);

                                bootStrapDropDownHtml += "<a href=\"#\">" + item.label.value + "</a>";

                                bootStrapDropDownHtml += "</li>";
                            }

                            bootStrapDropDownHtml += "</ul>"
                                + "</li>";

                            $("#mainMenu").html(bootStrapDropDownHtml);
                            $('.dropdown-toggle').dropdown();

                        });                    
                });
            };

            this.executeSearch = function executeSearch() {
                require(['text!sparqlQueries/allServiceDependencyGraphsInIndex.txt'], function(rq) {
                    console.log(rq);

                    var endpoint = model.endpoint();
                    var sparql = rq; //model.sparqlQueryText();

                    var renderFromResult = function(results) {

                        var graph = sparqlToGraph.toGraph(results, {
                            "key1": "taxid1",
                            "key2": "taxid2",
                            "label1": "name1",
                            "label2": "name2"
                        });

                        graphRenderer.render(
                            graph, {
                                "radius": function(d) { return 1 + d.label.length; },
                                "charge": -500,
                                "distance": 50,
                                "width": '1000',
                                "height": '750'
                            },
                            '#mySvg');
                    }

                    sparqlClient
                        .query(endpoint, sparql)
                        .then(renderFromResult);
                });
            };

            this.scratch = function executeSearch() {

                var endpoint = 'http://dandesktop:8090/brightstar/MyGraph/sparql';
                var sparql = "select ?s ?p ?o where { ?s ?p ?o } LIMIT 5";

                var renderFromResult = function(results) {

                    var graph = sparqlToGraph.toGraph(results, {
                        "key1": "taxid1",
                        "key2": "taxid2",
                        "label1": "name1",
                        "label2": "name2"
                    });

                    graphRenderer.render(
                        graph, {
                            "radius": function(d) { return 1 + d.label.length; },
                            "charge": -500,
                            "distance": 50,
                            "width": '1000',
                            "height": '750'
                        },
                        '#mySvg');
                };

                sparqlClient
                    .query(endpoint, sparql)
                    .then(renderFromResult);
            };

            return this;
        };

        //Just one of these
        return viewModel();
    }
);