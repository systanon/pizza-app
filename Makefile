.PHONY: run stop build dev lint

run:
	docker compose up --build -d

stop:
	docker compose down

build:
	docker compose build

dev:
	pnpm dev

lint:
	pnpm lint
