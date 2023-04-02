cd /app/T-WEB-800

docker-compose --file docker-compose.proxy.yml down
docker-compose --file docker-compose.yml --env-file ./env/.env down

docker rmi $(docker images -a -q)

docker network rm nginx-proxy
docker network create nginx-proxy

git pull

docker pull eliottclavier/tripi-discovery:latest
docker pull eliottclavier/tripi-gateway:latest
docker pull eliottclavier/tripi-app:latest
docker pull eliottclavier/tripi-accomodation:latest
docker pull eliottclavier/tripi-activity:latest
docker pull eliottclavier/tripi-bar:latest
docker pull eliottclavier/tripi-restaurant:latest
docker pull eliottclavier/tripi-transport:latest
docker pull eliottclavier/tripi-trip:latest
docker pull eliottclavier/tripi-user:latest

docker-compose --file docker-compose.yml --env-file ./env/.env up -d --build &&
docker-compose --file docker-compose.proxy.yml up -d --build
