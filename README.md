# microblog-frontend

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Environmental configuration

| Environment variable | Value | Description |
| --- | --- | --- |
| VUE_APP_BASE_API_URL | http://localhost:8000 | URL for the backend api |


## Deploying with Helm

In order to deploy this application with Helm you'll need to update a few fields either with a custom values.yaml file or passed in on the cli.

### Example deploy

You'll need to update all of these fields with your own values.

```shell
helm upgrade --install microblog-frontend ./chart \
  --set hostname=frontend.example.com \
  --set backendUrl=backend.example.com \
  --set image.repository=gcr.io/my_registry/frontend \
  --set image.tag=asd9f8
```
