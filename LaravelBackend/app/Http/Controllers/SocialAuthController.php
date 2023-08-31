<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\user;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Redirect;


class SocialAuthController extends Controller
{
   
    private $res='';

    public function SocialAuthRedirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function SocialAuthCallBack()
    {
         $user = Socialite::driver("google")->stateless()->user();       

          //OAuth Two Providers
          $token = $user->token;
          $refreshToken = $user->refreshToken; // not always provided
          $expiresIn = $user->expiresIn;

                // $user->getId();
                // $user->getName();
                // $user->getEmail();
                // $user->getAvatar();

       $this->_registerOrLoginUser($user);

    //    $response = new Response([
    //         'ID'=>$user->getId(),
    //         'Name'=>$user->getName(),
    //         'Email'=>$user->getEmail(),
    //         'Avatar'=>$user->getAvatar(),
    //         'token'=>$user->token,
    //         'refreshToken'=>$user->refreshToken,
    //         'expiresIn'=>$user->expiresIn
    //    ]);

    //    $response->withcookie(cookie('googleUserLogin',$user->token));
    

       return Redirect::to('http://localhost:3000?id='.$user->id);
       //return $response;
    //    Session::push('login_details',[
    //         'ID'=>$user->getId(),
    //         'Name'=>$user->getName(),
    //         'Email'=>$user->getEmail(),
    //         'Avatar'=>$user->getAvatar(),
    //         'token'=>$user->token,
    //         'refreshToken'=>$user->refreshToken,
    //         'expiresIn'=>$user->expiresIn
    // ]);
    // $login_details=Session::get('login_details');

    //     return response()->json([
            
    //         'ID'=>$user->getId(),
    //         'Name'=>$user->getName(),
    //         'Email'=>$user->getEmail(),
    //         'Avatar'=>$user->getAvatar(),
    //         'token'=>$user->token,
    //         'refreshToken'=>$user->refreshToken,
    //         'expiresIn'=>$user->expiresIn
    //     ]);
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

