<?php

namespace App\Http\Controllers\Api\Auth;

use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;


class LoginController //extends Controller
{
    use ThrottlesLoginsTrait;

    protected $maxAttempts = 3;
    protected $decayMinutes = 3;

    protected string $username = 'email';

    public function login(Request $request)
    {
        $request->validate([
            $this->username => 'required|string',
            'password' => 'required|string',
        ]);

        if (method_exists($this, 'hasTooManyLoginAttempts') && $this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            $this->sendLockoutResponse($request);
        }

        if ( ! Auth::attempt($request->only($this->username, 'password'), $request->boolean('remember'))) {
            // If the login attempt was unsuccessful we will increment the number of attempts
            // to login and redirect the user back to the login form. Of course, when this
            // user surpasses their maximum number of attempts they will get locked out.
            $this->incrementLoginAttempts($request);

            throw ValidationException::withMessages([
                $this->username => [trans('auth.failed')],
            ]);
        }

        $request->session()->regenerate();

        $this->clearLoginAttempts($request);

        return response()->json(['two_factor' => false]);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return new JsonResponse('', 204);
    }

}
