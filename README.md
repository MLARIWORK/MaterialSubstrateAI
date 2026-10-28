# Critical Minerals & REEs Powering the AI Industry — Supply Chain Atlas

An interactive D3 microsite visualizing the global supply chain (mining,
processing, refining) for the critical minerals and rare-earth elements that
underpin the AI hardware industry.

## Project structure

```
MaterialSubstrateAI/ (repo root)
├── index.html        # The entire site — markup, CSS, and JS all inline
└── README.md
```

Everything lives in the single self-contained `index.html` (HTML + inline
`<style>` + inline `<script>` with the embedded datasets). It is served via
GitHub Pages at <https://mlariwork.github.io/MaterialSubstrateAI/>.

## Running locally

`index.html` works on its own. Double-clicking it opens it in a browser; the
only thing that needs a network connection is the world map, which is fetched
from a CDN at runtime. For the most reliable result (and to mirror hosting),
serve it over HTTP from the project folder:

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

Shares are approximate global percentages, mostly 2025 estimates, refreshed in
October 2026. They are compiled from USGS Mineral Commodity Summaries 2026, IEA
Rare Earth Elements 2026 and Global Critical Minerals Outlook 2026, Benchmark
Mineral Intelligence, CSIS, TrendForce, Bernreuter, the Cobalt Institute, ICSG,
and company reports. Export-control and project status is current to late
October 2026.
