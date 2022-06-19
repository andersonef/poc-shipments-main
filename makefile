up:
	docker compose -f dev-docker-compose.yml build
	docker compose -f dev-docker-compose.yml up -d
	docker exec poc-entregas-main npx prisma generate
	docker exec poc-entregas-main npx prisma db push
	docker exec poc-entregas-main npx prisma db seed

down:
	docker compose -f dev-docker-compose.yml down

bash:
	docker exec -it poc-entregas-main bash

listen-logs:
	docker logs poc-entregas-main --follow