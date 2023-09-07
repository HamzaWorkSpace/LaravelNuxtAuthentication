<?php

namespace App\Http\Controllers\Api\Auth;


use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\user;
use App\Models\UserSocial;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\Controller;
use Laravel\Socialite\Two\InvalidStateException;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Redirect;


class SocialAuthController extends Controller
{

    protected $auth;

    public function __construct()
    {
        $this->middleware(['social']);
    }

    public function SocialAuthRedirect($service)
    {
        return Socialite::driver($service)->stateless()->redirect();
    }

    public function SocialAuthCallBack($service)
    {
        try{
            $serviceUser = Socialite::driver($service)->stateless()->user();
        }
        catch(\Exception $e){
            return redirect(env('CLIENT_BASE_URL').'?/auth/social-callback?ERROR= Unable to login using'.$service.'. Please try again');
        }
        

        //dd($serviceUser);
   
       // $token          = $serviceUser->token;
        //$refreshToken   = $serviceUser->refreshToken;
        //$expiresIn      = $serviceUser->expiresIn;
        //$id           = $serviceUser->getId();
        //$name         = $serviceUser->getName();
        //$email         = $serviceUser->getEmail();
        //$avatar       = $serviceUser->getAvatar();
        
         $email     = $serviceUser->getId().'@'.$service.'.local';
         $user      = $this->getExistingUser($serviceUser, $email, $service);
         $newUser   = false;

        if(!$user){
            
            $newUser = true;

            $user = User::create([
                'name' => $serviceUser->getName(),
                'email' => $email,
                'password' => '',
            ]);
        }

         if ($this->chkHasSocialAccount($user, $service)) {
            //if does not have social account registerd create one
            UserSocial::create([
                'user_id' => $user->id,
                'social_id' => $serviceUser->getId(),
                'service' => $service
            ]);
        }
        //Auth::guard('admin')->login($user);


        Auth::login($user); //logging in user
        $user = Auth::user();

        if (Auth::check()) {
            // The user is logged in then redirect to front end...
            return redirect(env('CLIENT_BASE_URL') . '/auth/social-callback?token='.$serviceUser->token.'&origin='.($newUser ? 'register' : 'login').'&authservice='.$service.'&avatar='.$serviceUser->getAvatar().'&isSocialLogin=true'.'&email='.$serviceUser->getEmail().'&name='.$serviceUser->getName());
        }
        else {
            //user not authenticated redirect to 401 page
            return redirect(env('CLIENT_BASE_URL') . '/auth/401');
        }
        
       // return redirect(env('CLIENT_BASE_URL') . '/auth/social-callback?token=' .$serviceUser->token.'&name='.$serviceUser->getName().'&origin=' . ($newUser ? 'register' : 'login').'&avatar='.$serviceUser->getAvatar());
    
    }


    public function getExistingUser($serviceUser, $email, $service){

            return User::where('email', $email)->orWhereHas('social', function($q) use ($serviceUser, $service) {
                    $q->where('social_id', $serviceUser->getId())->where('service', $service);
            })->first();
    }

            //Auth::login($user);
    
    public function chkHasSocialAccount(User $user, $service){

        //if the user does not have social account linked
        return !$user->hasSocialLinked($service);
    }




    public function SocialLogoutUser(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect(env('CLIENT_BASE_URL').'?/logout='.true);
    }
}
//php artisan config:cache

