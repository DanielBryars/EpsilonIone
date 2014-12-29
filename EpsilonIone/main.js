require.config({
    paths: {
        jquery: 'Scripts/jquery-2.1.1',
        bootstrap: 'Scripts/bootstrap',
        d3: 'Scripts/d3',
        knockout: 'Scripts/knockout-3.2.0',
        domReady: 'modules/domReady',
        sparql: 'modules/sparql',
        viewModel: 'modules/viewModel',
        visualisation: 'modules/visualisation'
    }
});

require(['app'], function (app) {
    app.initialize();
});