<?php


namespace App\Services;


class Driver extends ApiFilter
{
    protected $safeParms = [
        'UUID' => ['eq'],
        'vehicleColor' => ['like','eq'],
        'carType' => ['like','eq'],
        'carSeat' => ['eq'],
        'user_id' => ['eq'],
        'liveAddress' => ['eq','like']
    ];


}
