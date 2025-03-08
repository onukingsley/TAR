<?php


namespace App\Services;


class UserQuery extends ApiFilter
{
    protected $safeParms = [
        'id' => ['eq'],

    ];

}
