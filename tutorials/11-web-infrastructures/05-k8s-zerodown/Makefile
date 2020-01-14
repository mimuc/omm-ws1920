build:
	docker build -t helloworld:v0.0.2 .
push:
	docker tag helloworld:v0.0.2 mimuc/helloworld:v0.0.2
	docker push mimuc/helloworld:v0.0.2
deploy:
	kubectl apply -f kubernetes/deployments.yml
request:
	sh request.sh > out.txt
	cat out.txt | sort | uniq -c
