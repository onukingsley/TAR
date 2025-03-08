<?php

namespace App\Http\Controllers;

use App\Http\Resources\TarPaymentResource;
use App\Models\TarPayment;
use App\Models\TarToken;
use Illuminate\Http\Request;

class TarPaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new \App\Services\TarPayment();
        $param = $filter->transform($request);

        $tarPayment = TarPayment::where($param);

        $include = [];
        if ($request['user']){
            $include[] = 'user';
        }

        $tarPayment = $tarPayment->with($include);

        return TarPaymentResource::collection($tarPayment->latest()->paginate(10)->appends($request->query()));
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
        $payload = $request->all();

        $result = TarPayment::create($payload);
        $token = TarToken::where('user_id', '=' ,$request['user_id'])->first();

        if ($token){
            $balance = (int)$token->balance + $result->tarToken;
            $totalTar = (int)$token->totalTar + $result->tarToken;
            $tokenUpdate = $token->update(['balance'=>$balance,'totalTar'=>$totalTar]);
            return response()->json([
                'balance' => $balance,
                'totalTar' => $totalTar,
                'tarPayment' => $result
            ],200);

        }else{
            $tokenUpdate = TarToken::create([
                'user_id' => $request['user_id'],
                'balance' => $request['tarToken'],
                'totalTar' => $request['tarToken']
            ]);
            return response()->json([
                'balance' => $tokenUpdate->balance,
                'totalTar' => $tokenUpdate->totaltar,
                'tarPayment' => $result
            ],200);
        }




    }

    /**
     * Display the specified resource.
     */
    public function show(TarPayment $tarPayment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TarPayment $tarPayment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TarPayment $tarPayment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
       /* $results = TarPayment::where('user_id','=',$request['user_id'])->get();

        foreach ($results as $result){
            $delete = $result->delete();
        }*/
        TarPayment::where('user_id','=',$request['user_id'])->delete();

        return response()->json(['message'=>'Payment transaction deleted successfully']);
    }
}
