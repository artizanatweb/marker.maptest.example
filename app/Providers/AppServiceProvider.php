<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\MapRepository;
use App\Repositories\MarkerRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(\App\Repositories\Interfaces\MapRepository::class, MapRepository::class);
        $this->app->bind(\App\Repositories\Interfaces\MarkerRepository::class, MarkerRepository::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
