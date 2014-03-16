package AtomSQL;

#########################################################################
## Description : AtomSQL is Simple Database Query Language for SQL Like #
#                systems.                                               #
## Author      : Naresh <vnareshkumar [AT] GOOGLE MAIL DOT COM>         #
## Website     : http://nareshv.github.io/atomsql/                      #
## Project     : https://github.com/nareshv/atomsql                     #
## License     : MIT                                                    #
## Date        : Mar, 2014                                              #
#########################################################################
#
require Exporter;
@ISA = qw(Exporter);
@EXPORT = qw(atomsql_query);

my $regex = qr/
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
/sx;

sub get_limit_offset($) {
    my $limitoffset = shift;
    $limitoffset    =~ s/\[|\]//g;
    $limitoffset    =~ s/\s+//g;
    my @lo          = split(',', $limitoffset);
    $limit = "";
    if (defined $lo[0]) {
        $limit = " LIMIT ".$lo[0];
    }
    $offset = "";
    if (defined $lo[1]) {
        $offset = " OFFSET ".$lo[1];
    }
    return "$limit$offset";
}

sub atomsql_query($$) {
    my $p      = shift;
    my $driver = shift;
    my $qend   = "";
    my $sql    = $p;
    if ($p =~ $regex) {
        $qend = $+{qend};
        if (defined $+{general}) {
           if ($+{general} eq '*') {
                $sql = "SHOW TABLES";
           }
        } elsif (defined $+{dtable}) {
            $oper   = $+{doper};
            $infile = $+{dfile};
            $table  = $+{dtable};
            $infile =~ s/^\s*\<\s*//;
            if ($oper eq '<') {
                $file = $infile." REPLACE INTO TABLE $table";
            } elsif ($oper eq '<<') {
                $file = $infile." INTO TABLE $table";
            } elsif ($oper eq '&<') {
                $file = $infile." REPLACE IGNORE INTO TABLE $table";
            } elsif ($oper eq '&<<') {
                $file = $infile." IGNORE INTO TABLE $table";
            }
            $sql = "LOAD DATA LOCAL INFILE $file";
        } elsif (defined $+{utable}) {
            $set = $+{uoper};
            $where = "";
            $where = " WHERE ".$+{ucond} if length $+{ucond} > 0;
            $limit = "";
            if (length $+{ulimit} > 0) {
                $limit = $+{ulimit};
                $limit =~ s/^\[|\]$//g;
                $limit = " LIMIT $limit";
            }
            $sql = "UPDATE ".$+{utable}." SET $set$where$limit";
        } elsif (defined $+{itable}) {
            $col = "";
            if (length $+{icolumns} > 0) {
                $col = $+{icolumns};
                $col =~ s/^\<|\>$//g;
                $col = " ($col)";
            }
            $val = "";
            $val = $+{ituples} if length $+{ituples} > 0;
            $sql = "INSERT INTO ".$+{itable}."$col VALUES $val";
        } elsif (defined $+{tablea}) {
            if ($+{tableaboper} eq '=') {
                $sql = "CREATE TABLE ".$+{tablea}." LIKE ".$+{tableb};
            } elsif ($+{tableaboper} eq '>' or $+{tableaboper} eq '>>') {
                $acols = "";
                if (length $+{tableacol} > 0) {
                    $tmp = $+{tableacol};
                    $tmp =~ s/^\<|\>$//g;
                    $acols= " ($tmp)";
                }
                $bcols = "*";
                if (length $+{tablebcol} > 0) {
                    $tmp   = $+{tablebcol};
                    $tmp   =~ s/^\<|\>$//g;
                    $bcols = "($tmp)";
                }
                $bwhere = "";
                $bwhere = " WHERE $+{tablebcond}" if length $+{tablebcond} > 0;
                if ($+{tableaboper} eq '>') {
                    $sql = "REPLACE INTO ".$+{tablea}."$acols SELECT $bcols FROM ".$+{tableb}."$bwhere";
                } else {
                    $sql = "INSERT INTO ".$+{tablea}."$acols SELECT $bcols FROM ".$+{tableb}."$bwhere";
                }
            }
        } elsif (defined $+{deloper}) {
            if ($+{deloper} eq '!') {
                $where = "";
                $lo    = "";
                if (length($+{delwhere}) > 0) {
                    $where = " WHERE ".$+{delwhere};
                }
                if (length($+{dellimitoffset}) > 0) {
                    $lo = &get_limit_offset($+{dellimitoffset});
                }
                if ($where eq "" and $lo eq "") {
                    $sql = "TRUNCATE TABLE ".$+{deltable};
                } else {
                    $sql = "DELETE FROM ".$+{deltable}."$where$lo";
                }
            } elsif ($+{deloper} eq '!!') {
                $sql = "DROP TABLE ".$+{deltable};
            } elsif ($+{deloper} eq '=') {
                $sql = "SHOW CREATE TABLE ".$+{deltable};
            }
        } elsif (defined $+{alterspec}) {
            if (defined $+{alterop} and $+{alterop} eq "-") {
                $sql = "ALTER TABLE ".$+{altertable}." DROP COLUMN ".$+{alterspec};
            } else {
                $sql = "ALTER TABLE ".$+{altertable}." ADD COLUMN ".$+{alterspec};
            }
        } elsif (defined $+{createtable}) {
            if (defined $+{createoptions} and length $+{createoptions} > 0) {
                $sql = "CREATE TABLE ".$+{createtable}." (".$+{createspec}.") ".$+{createoptions};
            } else {
                $sql = "CREATE TABLE ".$+{createtable}." (".$+{createspec}.")";
            }
        } elsif (defined $+{selectcolumns}) {
            $table   = $+{selecttable};
            my $lo = &get_limit_offset($+{selectlimitoffset});
            $where = "";
            if (defined $+{selectwhere}) {
                $where = " WHERE ".$+{selectwhere};
            }
            if (length $+{selectoutfile} > 0) {
                $col     = "*";
                $col     = $+{selectcolumns} if length $+{selectcolumns} > 0;
                $o       = $+{selectoutfile};
                $o       =~ s/^\s*\>\s*//g;
                $table   = " FROM $table";
                $outfile = "";
                $outfile = " INTO OUTFILE $o";
                $sql = "SELECT $col$outfile$table$lo";
            } else {
                $sql = "SELECT ".$+{selectcolumns}." FROM $table$where$lo$outfile";
            }
        } elsif (defined $+{onlytable}) {
            if ($+{onlytable} eq '*') {
                $sql = "SHOW TABLES";
            } else {
                $sql = "DESCRIBE ".$+{onlytable};
            }
        }
        $sql = "$sql$qend";
    }
    return $sql;
}

1;
