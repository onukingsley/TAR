<?php

namespace App\Http\Controllers;


use App\Http\Resources\DriverResource;
use App\Models\Driver;
use App\Services\ApiFilter;


use Illuminate\Http\Request;

class DriverController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new \App\Services\Driver();
        $params = $filter->transform($request);

        $driver = Driver::where($params);

        $include = [];
        if ($request['user']){
            $include[] = 'user';
        }

        $driver = $driver->with($include);

        return response($driver->latest()->paginate(10)->appends($request->query()));

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
    public function show(Driver $driver, Request $request)
    {
        $include = [];
        if ($request['user']){
            $include[] = 'user';
        }

        $driver = $driver->loadMissing($include);

        return  response()->json(new DriverResource($driver));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Driver $driver)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Driver $driver)
    {
        $payload = $request->all();
        $result = $driver->update($payload);

        return response()->json(new DriverResource($result),200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Driver $driver)
    {
        $result = $driver->delete();

        return response()->json($result,200);
    }
}
