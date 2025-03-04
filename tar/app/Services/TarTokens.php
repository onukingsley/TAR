<?php


namespace App\Services;


class TarTokens extends ApiFilter
{
    protected $safeParms = [
        'user_id' => ['eq'],
        'totalTar' => ['eq','lt','gt'],
        'balance' => ['eq','lt','gt'],
    ];

}
