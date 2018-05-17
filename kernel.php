<?php

namespace Site;

use Tapestry\Modules\Kernel\KernelInterface;
use Tapestry\Tapestry;

class Kernel implements KernelInterface
{
    /**
     * @var Tapestry
     */
    private $tapestry;

    /**
     * DefaultKernel constructor.
     *
     * @param Tapestry $tapestry
     */
    public function __construct(Tapestry $tapestry)
    {
        $this->tapestry = $tapestry;
    }

    public function register()
    {
        // Use project autoloader
        require_once(__DIR__ . '/vendor/autoload.php');
    }

    public function boot()
    {
        $this->tapestry->register(\TapestryCloud\Asset\ServiceProvider::class);
    }
}
