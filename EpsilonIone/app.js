define(
    [   'domReady!',
        'jquery',
        'bootstrap',
        'knockout',
        'viewModel/sparqlForceViewModel'],
    function (dr, $, bs, ko, vm) {
    
        ko.applyBindings(vm);

        var initialize = function() {
            console.log("Initialising UI");
            vm.populateServicesUiDropDown();
        };
    return {
        initialize: initialize
    };
});