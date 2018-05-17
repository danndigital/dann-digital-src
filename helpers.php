<?php

if (!function_exists('smart_quotes')) {
    /**
     * @param string $text
     * @return string
     */
    function smart_quotes(string $text): string
    {
        $output = '';
        $quotes = false;
        for ($i = 0; $i < strlen($text); $i++) {
            if ($text[$i] !== '"') {
                $output .= $text[$i];
                continue;
            }

            if ($quotes === false) {
                $output .= '&ldquo;';
                $quotes = true;
                continue;
            }

            $output .= '&rdquo;';
            $quotes = false;
        }
        return $output;
    }
}