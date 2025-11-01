# Epsilon Ione

A web-based SPARQL query visualizer that renders RDF graph data as interactive force-directed graphs using D3.js.

## Overview

Epsilon Ione is a single-page application that allows users to query SPARQL endpoints and visualize the results as interactive network graphs. It provides an intuitive way to explore semantic web data and RDF ontologies through visual representation.

## Features

- **SPARQL Query Execution**: Connect to any SPARQL endpoint and execute queries
- **Force-Directed Graph Visualization**: Results rendered as interactive D3.js force layouts
- **Interactive Navigation**: Drag, zoom, and explore graph relationships
- **Modular Architecture**: Clean separation using AMD/RequireJS modules
- **Responsive Design**: Bootstrap-based UI with navbar navigation

## Architecture

The application follows a modular AMD pattern with clear separation of concerns:

```
modules/
├── sparql/
│   ├── sparqlClient.js       # SPARQL endpoint communication
│   └── sparqlToGraph.js      # Transform SPARQL results to graph structure
├── visualisation/
│   └── graphRenderer.js      # D3.js force-directed graph rendering
├── viewModel/
│   └── sparqlForceViewModel.js  # Knockout.js view model
└── requireJs/
    ├── text.js               # Text plugin for RequireJS
    └── domReady.js          # DOM ready plugin
```

## Technologies

- **D3.js**: Data visualization and force-directed graph layouts
- **Knockout.js**: MVVM pattern for UI binding
- **RequireJS**: AMD module loading
- **jQuery**: DOM manipulation and AJAX
- **Bootstrap**: Responsive UI framework
- **SPARQL**: Semantic web query language

## How It Works

1. User enters SPARQL query and endpoint URL
2. `sparqlClient` sends query to SPARQL endpoint
3. Results returned in JSON format (application/sparql-results+json)
4. `sparqlToGraph` transforms SPARQL JSON into graph nodes and edges
5. `graphRenderer` renders the graph using D3.js force simulation
6. User interacts with the visualization through drag, zoom, and pan

## SPARQL Query Example

```sparql
SELECT ?subject ?predicate ?object
WHERE {
  ?subject ?predicate ?object
}
LIMIT 100
```

## Use Cases

- RDF ontology exploration
- Semantic web data visualization
- Knowledge graph analysis
- Educational tool for understanding linked data
- Debugging SPARQL queries visually
- Exploring triple stores and RDF databases

## Getting Started

1. Open `Index.html` in a web browser
2. Enter a SPARQL endpoint URL
3. Write or paste a SPARQL query
4. View the resulting graph visualization

## Example SPARQL Endpoints

- DBpedia: `https://dbpedia.org/sparql`
- Wikidata: `https://query.wikidata.org/sparql`
- Local Fuseki: `http://localhost:3030/dataset/sparql`

## Visualization Features

- **Nodes**: Represent RDF resources
- **Edges**: Represent RDF predicates/relationships
- **Force Simulation**: Automatic layout using physics-based positioning
- **Interactive**: Click and drag nodes, zoom and pan the canvas

## Project Structure

- **Index.html**: Main application entry point
- **main.js**: RequireJS configuration and bootstrapping
- **app.js**: Application initialization
- **Scripts/**: Third-party libraries (D3, jQuery, Knockout, Bootstrap)
- **modules/**: Application modules

## Development

The project uses RequireJS for modular development. To modify:

1. Edit modules in the `modules/` directory
2. Main configuration in `main.js`
3. No build step required for development
4. For production, use `r.js` optimizer

## Browser Compatibility

Works in modern browsers supporting:
- SVG
- JavaScript ES5+
- XMLHttpRequest
- D3.js v3/v4
