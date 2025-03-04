<?php


namespace App\Services;


class TarPayment extends ApiFilter
{
    protected $safeParms = [
        'transactionId' => ['eq'],
        'user_id' => ['eq'],
        'amount' => ['eq','lt','gt'],
        'tarToken' => ['eq','lt','gt'],
    ];

}
