package com.jihamap.backend.api;

import com.jihamap.backend.api.dto.SystemStatusResponse;
import java.time.Instant;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/system")
public class SystemController {

	private final String applicationName;
	private final String serviceVersion;

	public SystemController(
		@Value("${spring.application.name}") String applicationName,
		@Value("${jihamap.service.version}") String serviceVersion
	) {
		this.applicationName = applicationName;
		this.serviceVersion = serviceVersion;
	}

	@GetMapping("/status")
	public SystemStatusResponse status() {
		return new SystemStatusResponse(
			applicationName,
			serviceVersion,
			Instant.now(),
			List.of(
				"subway realtime ingestion ready",
				"eta estimation pipeline ready",
				"walking eta integration ready"
			)
		);
	}
}
