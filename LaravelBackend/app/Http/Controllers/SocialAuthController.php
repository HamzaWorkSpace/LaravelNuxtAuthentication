<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\user;

class SocialAuthController extends Controller
{
    public function SocialAuthRedirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function SocialAuthCallBack()
    {
        //$this->AuthProvider
        print_r('call back function Hamza');
        
        $user = Socialite::driver("google")->stateless()->user();

        return $this->_registerOrLoginUser($user);
    }

    protected function _registerOrLoginUser($data){

        $user = User::where('email','=',$data->email)->first();

        if(!$user){

            $user = new User();
            $user->name = $data->name;
            $user->email = $data->email;
            $user->provider_id = $data->id;
            $user->avatar = $data->avatar;

            $user->save();

        }
        Auth::login($user);
    }
}
//php artisan config:cache

