#!/usr/local/bin/php
<?php

require_once 'script/load_phalcon.php';

use OPNsense\Core\Config;

$theme = 'opnids';
$cnf = Config::getInstance();

if ((string) $cnf->object()->theme != $theme) {
    $cnf->object()->theme = $theme;
    $cnf->save();
}