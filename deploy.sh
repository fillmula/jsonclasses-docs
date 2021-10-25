npm run build
scp -i ~/.ssh/fillmula.pem -r ./build ubuntu@18.163.62.89:/var/www
