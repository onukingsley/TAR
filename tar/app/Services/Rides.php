<?php


namespace App\Services;


class Rides extends ApiFilter
{
    protected $safeParms = [
        'destinationAddress' => ['eq'],
        'originAddress' => ['eq'],
        'status' => ['eq'],
        'driver_id' => ['eq'],
        'user_id' => ['eq'],
        'distance' => ['eq','lt','gt'],
        'rideTime' => ['eq','lt','gt'],
        'price' => ['eq','lt','gt'],
    ];

}
