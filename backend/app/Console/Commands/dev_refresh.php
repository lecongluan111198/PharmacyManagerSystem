<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class dev_refresh extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'dev:refresh';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate again database & run seeder';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        Artisan::call("migrate:refresh", [
            "--seed"=>true,
        ], $this->getOutput());
        Artisan::call("passport:install", [], $this->getOutput());
        Artisan::call("config:cache", [], $this->getOutput());
    }
}
