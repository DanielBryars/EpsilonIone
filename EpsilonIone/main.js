require.config({
    shim: {
        "bootstrap": { "deps": ['jquery'] }
    },
    paths: {
        jquery: 'Scripts/jquery-2.1.1',
        bootstrap: 'Scripts/bootstrap',
        d3: 'Scripts/d3',
        knockout: 'Scripts/knockout-3.2.0',
        domReady: 'modules/requireJs/domReady',
        text: 'modules/requireJs/text',
        sparql: 'modules/sparql',
        viewModel: 'modules/viewModel',
        visualisation: 'modules/visualisation',
        sparqlQueries: 'rdf/sparql',
        mustache: 'Scripts/mustache'
    }
});

require(['app'], function (app) {
    app.initialize();
});