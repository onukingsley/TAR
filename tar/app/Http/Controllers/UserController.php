<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserQuery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new UserQuery();
        $params = $filter->transform($request);

        $user = User::where($params);

        $include = [];

        if ($request['driver']){
            $include[] = 'Driver';
        }

        if ($request['location']){
            $include[] = 'location';
        }
        if ($request['TarPayment']){
            $include[] = 'TarPayment';
        }
        if ($request['TarToken']){
            $include[] = 'TarToken';
        }

        $user = $user->with($include);

        return UserResource::collection($user->latest()->paginate(10)->appends($request->query()));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function register(Request $request)
    {
       //Declaring the request
        $requests = $request->all();
        $pass = $requests['password'];
        $requests['password'] = bcrypt($pass);


        $user = User::create($requests);

        auth()->attempt(["email"=>$user->email, "password"=>$pass]);
        $token = $user->createToken($user->email,["create","update","delete"])->plainTextToken;

        return response()->json(['token'=>$token,"user"=>$user],200);
    }
    public function authenticate(Request $request)
    {
        $formrequest = $request->validate([
            'email' => "required",
            'password' => 'required'
        ]);

        //attempt to login
        if (!auth()->attempt($formrequest)){
            return response()->json([
                "message" => "Invalid User Credentials",
                "status" => "401"
            ],401);
        }elseif(auth()->attempt($formrequest)){
            $user = Auth::user();
            $token = $user->createToken($user->email,['create','update','delete'])->plainTextToken;
            return response()->json(['user'=>$user,'token'=>$token],200);
        }
    }

    public function logout(Request $request)
    {
        try {
            $user = $request->user();

            $user->currentAccessToken()->delete();

            return response()->json(['Logout successful'],200);
        }catch (\Exception $exception){
            return response()->json($exception);
        }


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
