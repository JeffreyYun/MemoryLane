#quick start:
# express --view ejs --css sass --git
# npm install
# . ./exports.sh

view:
	google-chrome index.html

push:
	git add .
	echo -n "Message: "
	read msg; \
	echo "git commit -am" $$msg; \
	git commit -am "$$msg";
	git push origin master

update_all: update push



