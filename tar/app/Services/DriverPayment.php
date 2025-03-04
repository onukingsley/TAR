<?php


namespace App\Services;


class DriverPayment extends ApiFilter
{
    protected $safeParms = [
        'transactionId' => ['eq'],
        'driver_id' => ['eq'],
        'amount' => ['eq','lt','gt'],
    ];

}
