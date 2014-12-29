define(
    [   'domReady!',
        'jquery',
        'knockout',
        'viewModel/sparqlForceViewModel'],
    function (dr, $, ko, vm) {
    
        ko.applyBindings(vm);

        var initialize = function () {
            console.log("Initialise Me");
        };
    return {
        initialize: initialize
    };
});