<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
// use Illuminate\Auth\AuthenticationException;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

        /**
     * Handle unauthenticated users for API requests.
     */
    // protected function unauthenticated($request, AuthenticationException $exception)
    // {
             // Untuk request API (yang expect JSON), kembalikan error 401
    //     if ($request->expectsJson()) {
    //         return response()->json(['message' => 'Unauthenticated.'], 401);
    //     }

             // Untuk request biasa (non-API), redirect ke halaman login
    //     return redirect()->guest(route('login'));
    // }
}
