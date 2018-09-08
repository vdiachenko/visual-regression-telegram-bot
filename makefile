install:
	npm i 

uninstall:
	rm -rf ./node_modules

reinstall: uninstall install

start:
	npm start

start-dev:
	npm run dev

deploy:
	git push heroku master & git push origin master
