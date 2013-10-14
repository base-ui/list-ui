
build: components index.js lib/*.js tpl/*.js
	@component build
	@touch build/done
	@rm build/done
	@echo build done

all: tpl build
	@echo all done

tpl: tpl/src/*.jade
	@jade --out tpl -P tpl/src/*.jade
	@component convert tpl/list.html
	@component convert tpl/li.html
	@echo tpl done

template.js: template.html
	@component convert $<

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean
