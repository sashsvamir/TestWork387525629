# TestWork387525629


## ./back-end

### Backend, api (Laravel)


Please run before start:

```bash
cd ./back-end
cp .env.prod .env                  # setup env
php artisan key:generate           # set application key

php composer.phar install --no-dev # install vendor

touch database.sqlite               # create clear database sqlite
php artisan migrate                 # run db migrations

php artisan user:add                # add user with credentials

php artisan db:seed                 # populate entities to db 

php artisan serve                   # run php server
```



## ./front

### Frontend (Vue 3 + Vite)



Please, run to start application:
```sh
cd ./front
npm ci
npm run dev
# or:
npm run build
npm run preview
```


To change backend api url, you should create `.env` file in root directory and use follow any params:
```bash
VITE_API_SCHEMA="http"
VITE_API_HOST="localhost"
VITE_API_PORT="8000"
```


