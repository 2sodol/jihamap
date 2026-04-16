Reject changes when the evidence for completion is incomplete.
Fail any frontend task that does not provide passing results for `npm run lint` and `npm run build`.
Fail any backend task that does not provide passing results for `./gradlew test` and `./gradlew build`.
Reject undocumented changes to API contracts, ports, environment variables, or local developer workflow.
Reject changes that remove the map fallback path, break local status probing, or weaken CORS/local integration without an explicit goal.
Treat claims about realtime subway ingestion, ETA estimation, or walking ETA as incomplete unless the implementation and validation actually exist.
Prefer a blocked or failed outcome over an optimistic pass when scope, invariants, or validation coverage are weak.
