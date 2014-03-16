<?php

require_once('./atomsql.php.inc');

$patterns = json_decode(file_get_contents('json-tests.json'));
$patterns = array(
  'test' => $patterns
);
$i = 1;
$f = 0;
foreach($patterns as $database => $queries) {
    foreach($queries as $a => $b) {
        if ($database == "nodb") {
            $database = null;
        }
        $c = atomsql_query($a, $database);
        $ea = str_replace("\t", '\t', str_replace("\n", '\n', $a));
        $ec = str_replace("\t", '\t', str_replace("\n", '\n', $c));
        $eb = str_replace("\t", '\t', str_replace("\n", '\n', $b));
        if ($c == $b) {
            //print "ok - $i $ea\n\t[OUTPUT = $ec]\n\t[EXPECTED = $eb]\n";
        } else {
            print "notok - $i $ea\n\t[OUTPUT = $ec]\n\t[EXPECTED = $eb]\n";
            $f++;
        }
        $i++;
    }
}
print "tests $i, failed $f, passed ".($i - $f)."\n";
if ($f > 0) {
    exit(1);
} else {
    exit(0);
}
