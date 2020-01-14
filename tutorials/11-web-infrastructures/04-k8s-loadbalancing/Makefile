build:
	docker build -t helloworld:v0.0.1 .
push:
	docker tag helloworld:v0.0.1 mimuc/helloworld:v0.0.1
	docker push mimuc/helloworld:v0.0.1
deploy:
	kubectl apply -f kubernetes/deployments.yml
request:
	sh request.sh > out.txt
	cat out.txt | sort | uniq -c
