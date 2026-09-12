CREATE TABLE `inquiries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`intent` text NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`company` text NOT NULL,
	`job_title` text DEFAULT '' NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`region` text DEFAULT '' NOT NULL,
	`application` text NOT NULL,
	`project_stage` text DEFAULT '' NOT NULL,
	`preferred_window` text DEFAULT '' NOT NULL,
	`time_zone` text DEFAULT '' NOT NULL,
	`quantity` text DEFAULT '' NOT NULL,
	`target_timing` text DEFAULT '' NOT NULL,
	`details` text NOT NULL,
	`consent` integer NOT NULL,
	`consent_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`owner` text DEFAULT '' NOT NULL,
	`follow_up_note` text DEFAULT '' NOT NULL,
	`source_path` text DEFAULT '/contact' NOT NULL
);
--> statement-breakpoint
CREATE INDEX `inquiries_created_at_idx` ON `inquiries` (`created_at`);--> statement-breakpoint
CREATE INDEX `inquiries_status_created_at_idx` ON `inquiries` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `inquiries_intent_created_at_idx` ON `inquiries` (`intent`,`created_at`);--> statement-breakpoint
CREATE INDEX `inquiries_email_idx` ON `inquiries` (`email`);