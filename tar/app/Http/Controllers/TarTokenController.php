<?php

namespace App\Http\Controllers;

use App\Models\TarToken;
use App\Services\TarTokens;
use http\Env\Response;
use Illuminate\Http\Request;

class TarTokenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new TarTokens();
        $params = $filter->transform($request);

        $allTokens = TarToken::where($params);

        $include = [];
        if ($request['user']){
            $include[] = 'user';
        }
        $allTokens = $allTokens->with($include);
        return response()->json($allTokens->latest()->paginate(10)->appends($request->query()));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $token = TarToken::where('user_id', '=' ,$request['user_id'])->first();

        if ($token){
            $balance = (int)$token->balance + $request->tarToken;
            $totalTar = (int)$token->totalTar + $request->tarToken;
            $tokenUpdate = $token->update(['balance'=>$balance,'totalTar'=>$totalTar]);

        }else{
            $tokenUpdate = TarToken::create([
                'user_id' => $request['user_id'],
                'balance' => $request['tarToken'],
                'totalTar' => $request['tarToken']
            ]);
        }
        return response()->json([
            'token' => $tokenUpdate,

        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(TarToken $tarToken)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TarToken $tarToken)
    {
        //
    }

    public function charge(Request $request){
        $token = TarToken::where('user_id', '=' ,$request->user_id)->first();

        if ($token){
            $balance = (int)$token->balance - $request['tarToken'];
            $tokenUpdate = $token->update(['balance'=>$balance]);

        }else{
            return response()->json([
                'message' => 'No token Records found '
            ]);
        }
        return response()->json([
            'token' => $token,
            'balance' => $balance,

        ],200);
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TarToken $tarToken)
    {

        $token = TarToken::where('user_id', '=' ,$request->user_id)->get();
        return response()->json(['message'=>$token]);
        if ($token){
            $balance = (int)$token->balance - $request['tarToken'];
            $tokenUpdate = $token->update(['balance'=>$balance]);

        }else{
            return response()->json([
                'message' => 'No token Records found '
            ]);
        }
        return response()->json([
            'token' => $tokenUpdate,
            'balance' => $balance,

        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TarToken $tarToken,Request $request)
    {
       $deleted =  TarToken::where('user_id', '=', $request['user_id'])->delete();
        if ($deleted){
            return \response()->json([
                'message' => 'Tokens Deleted Successfully'
            ]);
        }else{
            return \response()->json([
                'message' => 'No Tokens Found'
            ],404);
        }

    }
}
