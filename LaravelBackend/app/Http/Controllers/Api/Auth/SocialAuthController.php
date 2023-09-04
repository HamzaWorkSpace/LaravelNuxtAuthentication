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
        
         $email         = $serviceUser->getId().'@'.$service.'.local';

         $user = $this->getExistingUser($serviceUser, $email, $service);

         $newUser = false;

        if(!$user){
            
            $newUser = true;

            $user = User::create([
                'name' => $serviceUser->getName(),
                'email' => $email,
                'password' => ''
            ]);
        }

         if ($this->chkHasSocialAccount($user, $service)) {
            UserSocial::create([
                'user_id' => $user->id,
                'social_id' => $serviceUser->getId(),
                'service' => $service
            ]);
        }

        Auth::login($user);
        
        return redirect(env('CLIENT_BASE_URL') . '/auth/social-callback?token=' .$serviceUser->token.'&name='.$serviceUser->getName().'&origin=' . ($newUser ? 'register' : 'login').'&avatar='.$serviceUser->getAvatar());
    
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
    // protected function _registerOrLoginUser($data){

    //     $user = User::where('email','=',$data->email)->first();
        
    //     if(!$user){

    //         $user = new User();
    //         $user->name = $data->name;
    //         $user->email = $data->email;
    //         $user->provider_id = $data->id;
    //         $user->avatar = $data->avatar;

    //         $user->save();

    //     }
    //     Auth::login($user);
    // }

    public function getGoogleUserData(){
       // $userdata= User::where('email','=',$this->user->email)->first();

             return response()->json([

                'googleData'=>''
 
            ]);

    }

    // public function logout(Request $request)
    // {
    //     Auth::logout();
    //     $request->session()->invalidate();
    //     $request->session()->regenerateToken();
    //     return redirect('/');
    // }
}
//php artisan config:cache

