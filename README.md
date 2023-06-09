# Segment admin panel (frontend)

Этот проект был создан с помощью [Create React App](https://github.com/facebook/create-react-app).

## Скрипты

`yarn start` - запускает проект в режиме разработки.

`yarn build` - запускает сборку проекта в папку `/build`.

`yarn lint` - запускает проверку кода линтером.

## Docker образ

### Сборка образа

Для сборки docker образа необходимо выполнить команду:

```sh
  docker build -t segment-front .
```

### Запуск контейнера

Запуск контейнера на Windows и MacOS:

```sh
  docker run -d --rm --name segment-front -p 80:80 segment-front
```

Запуск на Linux:

```sh
  docker run -d --rm --name segment-front --add-host host.docker.internal:host-gateway -p 80:80 segment-front
```

По умолчанию для API сервера установлен адрес и порт соответственно `localhost` и `8080`. Для изменения этих значений в команду запуска контейнера необходимо добавить значения переменных окружения `API_HOST` и `API_PORT`, например:

```sh
  docker run -d --rm --name segment-front -e API_PORT=3000 -p 80:80 segment-front
```

API будет доступен по адресу [http://localhost/api](http://localhost/api).

### Остановка контейнера

Для остановки контейнера выполните команду:

```sh
  docker stop segment-front
```
