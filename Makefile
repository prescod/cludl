.ONESHELL: # Applies to every targets in the file!
.PHONY: build

build:
	rm -rf build/js build/css
	npm run build

publish:
	npm run build
	date > build/date.txt
	git rev-parse --short HEAD > build/commit.txt
	cp -r build/* gh-pages/
	cd gh-pages && git rm static/js/* static/css/* ; git restore --source origin/gh-pages CNAME && git add --all && git commit -m "$$(cat commit.txt)" && git push origin gh-pages --force

serve:
	npm run start