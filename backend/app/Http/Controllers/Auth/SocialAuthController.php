<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider)
    {
        try {
            $frontendUrl = env('FRONTEND_URL');
            $oauthUser = Socialite::driver($provider)->stateless()->user();
            $user = User::updateOrCreate(
                ["{$provider}_id" => $oauthUser->getId()],
                [
                    'name' => $oauthUser->getName(),
                    'email' => $oauthUser->getEmail(),
                    "{$provider}_id" => $oauthUser->getId(),
                    'password' => null,
                ]
            );
            Auth::login($user);
            return redirect()->to("{$frontendUrl}/dashboard");
        } catch (\Exception $e) {
            return redirect()->to("{$frontendUrl}/login");
        }
    }
}
