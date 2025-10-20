deploy-prod:
	npm run build
	aws s3 sync --endpoint-url=https://s3.fr-par.scw.cloud --region=fr-par  build/ s3://msg-prod

deploy-next:
	npm run build
	aws s3 sync --endpoint-url=https://s3.fr-par.scw.cloud --region=fr-par  build/ s3://msg-next

check-buckets:
	aws s3 ls --endpoint-url=https://s3.fr-par.scw.cloud --region=fr-par