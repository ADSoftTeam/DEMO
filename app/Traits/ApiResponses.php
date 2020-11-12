<?php

namespace App\Traits;

trait ApiResponses
{
    public function payload($data = [], int $status = 200)
    {
        return response()->json([
            'status' => $status,
            'payload' => $data
        ], $status, [], JSON_UNESCAPED_UNICODE);
    }

    public function errorResponse($message = '', $status = 422)
    {
        return response()->json([
            'status' => $status,
            'payload' => $message
        ], $status, [],  JSON_UNESCAPED_UNICODE);
    }
}
