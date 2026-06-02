# Critical Minerals & REEs Powering the AI Industry — Supply Chain Atlas

An interactive D3 microsite visualizing the global supply chain (mining,
processing, refining) for the critical minerals and rare-earth elements that
underpin the AI hardware industry.

## Project structure

```
CMs Substrate Microsite (Personal)/
├── index.html        # Page shell + markup
├── css/
│   └── styles.css    # All styling (extracted from the original inline <style>)
├── js/
│   ├── data.js       # COORDS, MINERALS, and GROUPS datasets (loaded first)
│   └── main.js       # Rendering, map, interaction, and modal logic
└── README.md
```

`data.js` and `main.js` are plain (non-module) scripts loaded in order, so the
datasets are available as globals to the logic in `main.js`.

## Running locally

The page fetches a world TopoJSON at runtime, so it must be served over HTTP
(opening `index.html` via `file://` will fail the fetch). From the project root:

```sh
# Python
python -m http.server 8000

# or Node
npx serve .
```

Then open <http://localhost:8000>.

## Dependencies

Loaded from CDN (no build step, no install):

- [D3](https://d3js.org/) 7.8.5
- [topojson-client](https://github.com/topojson/topojson-client) 3.1.0
- Google Fonts: Fraunces, DM Sans, JetBrains Mono

## Data sources

Shares are approximate 2024–2025 global percentages, compiled from USGS Mineral
Commodity Summaries 2025, IEA Critical Minerals Outlook 2025, CSIS, Visual
Capitalist, Bernreuter, the Cobalt Institute, Mining Technology, and Statista.
