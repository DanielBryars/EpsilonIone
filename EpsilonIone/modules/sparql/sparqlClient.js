define(
    ['d3'],
    function (d3) {
        return {
            query: function query(endpoint, sparql) {
                var url = endpoint + "?query=" + encodeURIComponent(sparql);
                console.log(endpoint);
                console.log(url);
                var mime = "application/sparql-results+json";

                var deferred = new $.Deferred();

                d3.xhr(url, mime, function (error, request) {
                    var json = request.responseText;
                    var jsonParsed = JSON.parse(json);

                    console.log(json);

                    deferred.resolve(jsonParsed);
                });

                return deferred.promise();
            }
        };
});