<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\User;
use App\Http\Resources\Admin\UserResource;
use Sashsvamir\LaravelUserCRUD\Http\Requests\UserCreateRequest;
use Sashsvamir\LaravelUserCRUD\Http\Requests\UserUpdateRequest;
use Sashsvamir\LaravelUserCRUD\Services\UserService;
use Symfony\Component\HttpKernel\Exception\HttpException;


class UserController
{

    public function index()
    {
        $users = User::query()
            ->paginate(20);

        return UserResource::collection($users);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function store(UserCreateRequest $request)
    {
        $user = UserService::create($request->validated());

        return new UserResource($user);
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        UserService::update($user, $request->validated());

        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        if (!$user->delete()) {
            throw new HttpException(500, 'Model not deleted!');
        }

        return response(null, 204);
    }

}
