# Laravel

## Backend (api)


Please run before start:

```bash
cp .env.prod .env                  # setup env
php artisan key:generate           # set application key

php composer.phar install --no-dev # install vendor

touch database.sqlite               # create clear database sqlite
php artisan migrate                 # run db migrations

php artisan user:add                # add user with credentials

php artisan db:seed                 # populate entities to db 

php artisan serve                   # run php server
```



