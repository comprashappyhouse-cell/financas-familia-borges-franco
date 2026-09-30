CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`description` text NOT NULL,
	`category` text DEFAULT 'Outros' NOT NULL,
	`account` text NOT NULL,
	`type` text NOT NULL,
	`recurrence` text NOT NULL,
	`amount_cents` integer NOT NULL,
	`start_date` text NOT NULL,
	`installment_count` integer DEFAULT 1 NOT NULL,
	`created_at` text NOT NULL
);
