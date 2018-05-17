<?php

return [
    /*
     * Some example global data, this is available from $this->site(...) in any phtml file
     */
    'site' => [
        'title'       => 'Dann Digital &ndash; Web designer/developer in Hampshire..',
        'url'         => 'http://localhost:3000',
        'description' => 'A multidisciplinary husband and wife team, with over 10 years digital media experience. Based in Andover, Hampshire.',
        'author'      => 'Simon Dann',
        'email'       => 'simon.dann@gmail.com',

        'twitter-card' => [
            'site' => '@carbontwelve',
            'creator' => '@carbontwelve'
        ],
    ],

    'plugins' => [
        'asset_manifest_path' => __DIR__ . '/source/manifest.json',
        'database' => [
            'driver' => 'pdo_sqlite',
            'path' => __DIR__ . DIRECTORY_SEPARATOR . 'db.sqlite'
        ]
    ],

    /*
     * Enable / Disable the publishing of files with `draft: true` in their front matter
     */
    'publish_drafts' => true,

    /*
     * The site kernel to be loaded during site building
     */
    'kernel' => \Site\Kernel::class,

    'ignore' => [
        'css',
        'img',
        'js'
    ],

    'copy' => [
        'css',
        'img',
        'js'
    ]
];
