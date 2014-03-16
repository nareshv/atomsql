<?php
/*
 * Description : Atom SQL - Simple Database Query Language for SQL Like systems.
 * Author      : Naresh <vnareshkumar [AT] GOOGLE MAIL DOT COM>
 * Website     : http://nareshv.github.io/atomsql/
 * Project     : https://github.com/nareshv/atomsql
 * License     : MIT
 * Date        : Mar, 2014
 *
 */

$regex = <<<'PHP_REGEX'
    /
    ^\s*(
        (?P<general>(\*|exit|quit))
        |
        (?P<onlytable>(\*|\w+))
        |
        (?P<tableb>\w+)\s*(?P<tablebcol>\<.*?\>)?\s*(?P<tablebcond>\(.*\))?\s*(?P<tableaboper>(\>|\>\>|=))\s*(?P<tablea>\w+)\s*(?P<tableacol>\<.*?\>)?
        |
        (?P<itable>\w+)\s*(?P<icolumns>\<.*?\>)?\s*(?P<ioper>\=)\s*\[\s*(?P<ituples>.*?)\s*\]
        |
        (?P<deloper>(=|!|!!))\s*(?P<deltable>\w+)\s*(?P<delwhere>\(.*\))?\s*(?P<dellimitoffset>\[.*?\])?
        |
        (?P<altertable>\w+)\s*(?P<alterop>(\+|\-))(?P<alterspec>.*?)
        |
        (?P<createtable>\w+)\s*\{(?P<createspec>.*?)\}\s*(?P<createoptions>.*?)?
        |
        (?P<selecttable>\w+)\s*\<(?P<selectcolumns>.*?)\>\s*(?P<selectwhere>\(.*\))?\s*(?P<selectlimitoffset>\[.*?\])?(?P<selectoutfile>\s*\>\s*'.*')?
        |
        (?P<utable>\w+)\s*\/\s*(?P<uoper>.*?)\s*\/\s*(?P<ucond>\(.*?\))?\s*(?P<ulimit>\[\d+\])?
        |
        (?P<dtable>\w+)\s*(?P<doper>\&?(\<|\<\<))\s*(?P<dfile>'.*')\s*
    )\s*$
    /sx
PHP_REGEX;

function get_limit_offset($limitoffset) {
    $limitoffset = preg_replace('/\[|\]/', '', $limitoffset);
    $limitoffset = preg_replace('/\s+/', '', $limitoffset);
    $lo          = split(',', $limitoffset);
    $limit = "";
    if (!empty($lo[0])) {
        $limit = " LIMIT ".$lo[0];
    }
    $offset = "";
    if (!empty($lo[1])) {
        $offset = " OFFSET ".$lo[1];
    }
    return "$limit$offset";
}

function atomsql_query($p, $driver) {
    global $regex;
    $sql    = $p;
    $qend   = "";
    if (preg_match($regex, $p, $matches) === 1) {
        if (!empty($matches['general'])) {
           if ($matches['general'] == '*') {
                $sql = "SHOW TABLES";
           }
        } else if (!empty($matches['dtable'])) {
            $oper   = $matches['doper'];
            $infile = $matches['dfile'];
            $table  = $matches['dtable'];
            $infile = preg_replace('/^\s*\<\s*/', '', $infile);
            if ($oper === '<') {
                $file = $infile." REPLACE INTO TABLE $table";
            } else if ($oper === '<<') {
                $file = $infile." INTO TABLE $table";
            } else if ($oper === '&<') {
                $file = $infile." REPLACE IGNORE INTO TABLE $table";
            } else if ($oper === '&<<') {
                $file = $infile." IGNORE INTO TABLE $table";
            }
            $sql = "LOAD DATA LOCAL INFILE $file";
        } else if (!empty($matches['utable'])) {
            $set = $matches['uoper'];
            $where = "";
            if(!empty($matches['ucond']) and strlen($matches['ucond']) > 0) {
                $where = " WHERE ".$matches['ucond'];
            }
            $limit = "";
            if (!empty($matches['ulimit']) and strlen($matches['ulimit']) > 0) {
                $limit = $matches['ulimit'];
                $limit = preg_replace('/^\[|\]$/', '', $limit);
                $limit = " LIMIT $limit";
            }
            $sql = "UPDATE ".$matches['utable']." SET $set$where$limit";
        } else if (!empty($matches['itable'])) {
            $col = "";
            if (!empty($matches['icolumns']) and strlen($matches['icolumns']) > 0) {
                $col = $matches['icolumns'];
                $col = preg_replace('/^\<|\>$/', '', $col);
                $col = " ($col)";
            }
            $val = "";
            if(!empty($matches['ituples']) and strlen($matches['ituples']) > 0) {
                $val = $matches['ituples'];
            }
            $sql = "INSERT INTO ".$matches['itable']."$col VALUES $val";
        } else if (!empty($matches['tablea'])) {
            if ($matches['tableaboper'] === '=') {
                $sql = "CREATE TABLE ".$matches['tablea']." LIKE ".$matches['tableb'];
            } else if ($matches['tableaboper'] === '>' or $matches['tableaboper'] === '>>') {
                $acols = "";
                if (!empty($matches['tableacol']) and strlen($matches['tableacol']) > 0) {
                    $tmp = $matches['tableacol'];
                    $tmp = preg_replace('/^\<|\>$/', '', $tmp);
                    $acols= " ($tmp)";
                }
                $bcols = "*";
                if (!empty($matches['tablebcol']) and strlen($matches['tablebcol']) > 0) {
                    $tmp   = $matches['tablebcol'];
                    $tmp   = preg_replace('/^\<|\>$/', '', $tmp);
                    $bcols = "($tmp)";
                }
                $bwhere = "";
		if (strlen($matches['tablebcond']) > 0) {
                   $bwhere = " WHERE ".$matches['tablebcond'];
		}
                if ($matches['tableaboper'] === '>') {
                    $sql = "REPLACE INTO ".$matches['tablea']."$acols SELECT $bcols FROM ".$matches['tableb']."$bwhere";
                } else {
                    $sql = "INSERT INTO ".$matches['tablea']."$acols SELECT $bcols FROM ".$matches['tableb']."$bwhere";
                }
            }
        } else if (!empty($matches['deloper'])) {
            if ($matches['deloper'] === '!') {
                $where = "";
                $lo    = "";
                if (!empty($matches['delwhere']) and strlen($matches['delwhere']) > 0) {
                    $where = " WHERE ".$matches['delwhere'];
                }
                if (!empty($matches['dellimitoffset']) and strlen($matches['dellimitoffset']) > 0) {
                    $lo = &get_limit_offset($matches['dellimitoffset']);
                }
                if ($where === "" and $lo === "") {
                    $sql = "TRUNCATE TABLE ".$matches['deltable'];
                } else {
                    $sql = "DELETE FROM ".$matches['deltable']."$where$lo";
                }
            } else if ($matches['deloper'] === '!!') {
                $sql = "DROP TABLE ".$matches['deltable'];
            } else if ($matches['deloper'] === '=') {
                $sql = "SHOW CREATE TABLE ".$matches['deltable'];
            }
        } else if (!empty($matches['alterspec'])) {
            if (!empty($matches['alterop']) and $matches['alterop'] === "-") {
                $sql = "ALTER TABLE ".$matches['altertable']." DROP COLUMN ".$matches['alterspec'];
            } else {
                $sql = "ALTER TABLE ".$matches['altertable']." ADD COLUMN ".$matches['alterspec'];
            }
        } else if (!empty($matches['createtable'])) {
            if (!empty($matches['createoptions'])) {
                $sql = "CREATE TABLE ".$matches['createtable']." (".$matches['createspec'].") ".$matches['createoptions'];
            } else {
                $sql = "CREATE TABLE ".$matches['createtable']." (".$matches['createspec'].")";
            }
        } else if (!empty($matches['selectcolumns'])) {
            $table   = $matches['selecttable'];
            $lo = "";
            if(!empty($matches['selectlimitoffset'])) {
               $lo = get_limit_offset($matches['selectlimitoffset']);
            }
            $where = "";
	    $outfile = "";
            if (!empty($matches['selectwhere'])) {
                $where = " WHERE ".$matches['selectwhere'];
            }
            if (!empty($matches['selectoutfile']) and strlen($matches['selectoutfile']) > 0) {
                $col     = "*";
                if(strlen($matches['selectcolumns']) > 0) {
                    $col = $matches['selectcolumns'];
                }
                $o       = $matches['selectoutfile'];
                $o       = preg_replace('/^\s*\>\s*/', '', $o);
                $table   = " FROM $table";
                $outfile = " INTO OUTFILE $o";
                $sql = "SELECT $col$outfile$table$lo";
            } else {
                $sql = "SELECT ".$matches['selectcolumns']." FROM $table$where$lo$outfile";
            }
        } else if (!empty($matches['onlytable'])) {
            if ($matches['onlytable'] === '*') {
                $sql = "SHOW TABLES";
            } else {
                $sql = "DESCRIBE ".$matches['onlytable'];
            }
        }
        $sql = "$sql$qend";
    }
    return $sql;
}
