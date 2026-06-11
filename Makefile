.PHONY: install openapi mock dev gen-api start all

install:
	npm --prefix docs install
	npm --prefix frontend install

docs/openapi.json: docs/api.tsp
	npx --prefix docs tsp compile docs/api.tsp
	node -e "
		const a = require('./docs/openapi.Admin.json');
		const g = require('./docs/openapi.Guest.json');
		const m = {
			openapi: '3.0.0',
			info: { title: 'CalClone API', version: '0.1.0' },
			servers: [{ url: 'http://localhost:4010' }],
			tags: [],
			paths: { ...a.paths, ...g.paths },
			components: { schemas: { ...a.components.schemas, ...g.components.schemas } },
		};
		require('fs').writeFileSync('docs/openapi.json', JSON.stringify(m, null, 2));
	"

openapi: docs/openapi.json

mock: openapi
	npx @stoplight/prism-cli mock docs/openapi.json --port 4010

dev:
	npm --prefix frontend run dev

gen-api: openapi
	npm --prefix frontend run gen:api

start:
	@trap 'kill 0' EXIT; \
	npx @stoplight/prism-cli mock docs/openapi.json --port 4010 & \
	npm --prefix frontend run dev

all: install openapi gen-api
	@echo "All set. Run 'make start' to launch the project."
