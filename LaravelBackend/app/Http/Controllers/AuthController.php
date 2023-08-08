<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use illuminate\Auth\AuthenticationException;
use illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login (Request $request)
    {
        if(!Auth::attempt($request->only('email','password')))
        {
            throw new AuthenticationException();
        }
    }
    public function register (Request $request)
    {
        //using user model here to register user
        $user = new User;

        $user->name = $request->name;
        $user->email= $request->email;
        $user->password =  bycrypt($request->password);

        $user->save();
    }
    public function logout (Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regeneratetoken();
    }
}
