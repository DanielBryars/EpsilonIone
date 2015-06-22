define(
    [   'domReady!',
        'jquery',
        'bootstrap',
        'knockout',
        'viewModel/sparqlForceViewModel'],
    function (dr, $, bs, ko, viewModel) {
    
        var initialize = function() {
            console.log("Initialising UI");
            viewModel
                .populateServicesUiDropDown()
                .then(function () { ko.applyBindings(viewModel); });
        };
    return {
        initialize: initialize
    };
});