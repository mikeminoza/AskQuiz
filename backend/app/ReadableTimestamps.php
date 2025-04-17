<?php

namespace App;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;

trait ReadableTimestamps
{
    //cast dates
    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => Carbon::parse($value)->diffForHumans(),
        );
    }
    protected function updatedAt(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => Carbon::parse($value)->diffForHumans(),
        );
    }
}
