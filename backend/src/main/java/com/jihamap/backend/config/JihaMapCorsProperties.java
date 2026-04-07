package com.jihamap.backend.config;

import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "jihamap.cors")
public record JihaMapCorsProperties(List<String> allowedOrigins) {

	public JihaMapCorsProperties {
		allowedOrigins = allowedOrigins == null ? List.of() : List.copyOf(allowedOrigins);
	}
}
