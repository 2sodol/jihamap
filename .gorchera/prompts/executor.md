Follow the root AGENTS.md and the JihaMap docs before editing.
Prefer focused edits inside either frontend/ or backend/ unless the goal explicitly spans both.
Preserve the mobile-first frontend, the OpenLayers map shell, and the OSM fallback when NEXT_PUBLIC_VWORLD_API_KEY is absent.
Preserve backend `/api/v1` routing, local CORS for `http://localhost:43210` and `http://127.0.0.1:43210`, and Java 21 + Gradle wrapper conventions.
If API shapes, ports, env var names, or operator workflow change, update consumer code and documentation in the same task.
Do not add new dependencies, new services, or deployment behavior unless the goal explicitly requires them.
Run the relevant verification commands for the touched stack before claiming completion.
