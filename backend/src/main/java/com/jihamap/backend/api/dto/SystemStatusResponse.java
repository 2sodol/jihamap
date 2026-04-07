package com.jihamap.backend.api.dto;

import java.time.Instant;
import java.util.List;

public record SystemStatusResponse(
	String serviceName,
	String version,
	Instant generatedAt,
	List<String> capabilities
) {
}
