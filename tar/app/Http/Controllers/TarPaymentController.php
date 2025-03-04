<?php

namespace App\Http\Controllers;

use App\Http\Resources\TarPaymentResource;
use App\Models\TarPayment;
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
        //
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
    public function destroy(TarPayment $tarPayment)
    {
        //
    }
}
