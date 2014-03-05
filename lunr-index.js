
var index = lunr(function () {
    this.field('body');
    this.ref('url');
});

var documentTitles = {};



documentTitles["index.html#atom-sql"] = "Atom SQL";
index.add({
    url: "index.html#atom-sql",
    title: "Atom SQL",
    body: "# Atom SQL  Alternative, Simpler SQL for most common queries. We can mix regular SQL with AtomSQL. The interpreter will work accordingly.  "
});

documentTitles["index.html#pre-requisites"] = "Pre-requisites";
index.add({
    url: "index.html#pre-requisites",
    title: "Pre-requisites",
    body: "# Pre-requisites  Already comfortable with RDBMS and knows how to use SQL  "
});

documentTitles["index.html#atomsql-grammar"] = "AtomSQL Grammar";
index.add({
    url: "index.html#atomsql-grammar",
    title: "AtomSQL Grammar",
    body: "# AtomSQL Grammar  * Tables Meta Information     * `*` - List Tables     * `table_name` - Describe the table     * `=` `table_name` - Show the CREATE TABLE * SELECT Flavor     * `table_name` `&lt;` `column1` `,column2` `, ...` `&gt;` - Select specified columns from table     * `table_name` `&lt;` `column1` `,column2` `, ...` `&gt;` `[` `LIMIT` `]` - Select specified columns from table with LIMIT     * `table_name` `&lt;` `column1` `,column2` `, ...` `&gt;` `[` `LIMIT` `,` `OFFSET` `]` - Select specified COLUMNS from table with LIMIT &amp; OFFSET     * `table_name` `&lt;` `column1` `,column2` `, ...` `&gt;` `(` `where_condition` `)` - Select specified COLUMNS from table with a condition.     * `table_name` `&lt;` `column1` `,column2` `, ...` `&gt;` `(` `where_condition` `)` `[` `LIMIT` `,` `OFFSET` `]` - Select specified COLUMNS from table with a condition. * SELECT &amp; JOINS Flavor     * `table_name1` `,` `table_name2`  `&lt;` `column` `,` `column2` `&gt;` `(` `where_condition` `)` - Join tables against a condition * GROUP BY, ORDER BY, HAVING Flavors     * `table_name` `&lt;` `column1` `,column2` `, ...` `&gt;` `(` `where_condition` `orderby_specification` `groupby_specification` `)` `[` `LIMIT` `,` `OFFSET` `]` - Select specified COLUMNS from table with a condition. * CREATE Flavor     * `table_name` `{` `column_name column_attributes` `, ...` `}` - Create table with defined columns * Table Deletion     * `!!` `table_name` - Drop table     * `!` `table_name` - Remove all records from table     * `!` `table_name` `(` `where_condition` `)` - Empty table contents of table matching condition * Alter Table     * `table_name` `+` `column_name` `column_attributes` - Add new column to the table     * `table_name` `-` `column_name` - Remove column from the table     * `table_name` `=` `column_name` `column_attributes` - Change column datatype * Table Copying     * `table_name1` `-&gt;` `table_name2` - Copy table structure from LH table to RH table     * `table_name2` `&lt;-` `table_name1` - Copy table structure from RH table to LH table     * `table_name2` `=` `table_name1` - Copy all records from RH table to LH table * INSERT Flavor     * `table_name` `[` `(column1_value, column2_value ...)` `]` - Insert Record into table     * `table_name` `[` `(column1_value, column2_value ...)` `, ...` `]` - Insert multiple records into table     * `table_name` `&lt;` `column1, column2, ...` `&gt;` `=` `[` `(column1_value, column2_value, ...)` `, ...` `]` - Insert multiple records into table via specified columns * UPDATE Flavor     * `table_name` `|` `column1_update_specification, ...` `|` `(condition_specification)` - Update columns according to specification  "
});

documentTitles["index.html#remembering-the-syntax"] = "Remembering the Syntax";
index.add({
    url: "index.html#remembering-the-syntax",
    title: "Remembering the Syntax",
    body: "# Remembering the Syntax  Few tips to remember the syntax  1. Most of the Queries begin with tables, unless there is importance to the    operation (like delete, for example) 2. Queries are constructed in their Natural SQL Flow 2. () are used to represent Expressions in SELECT, INSERT, UPDATE queries 3. &lt;&gt; are used to select multiple columns in SELECT, INSERT queries 4. || are used for update Expressions in UPDATE query 5. [] are used for LIMIT, OFFSET in SELECT and INSERT  "
});

documentTitles["index.html#explanation-with-examples"] = "Explanation with examples";
index.add({
    url: "index.html#explanation-with-examples",
    title: "Explanation with examples",
    body: "# Explanation with examples  "
});

documentTitles["index.html#connect-to-server-and-choose-a-database"] = "Connect to server and choose a database";
index.add({
    url: "index.html#connect-to-server-and-choose-a-database",
    title: "Connect to server and choose a database",
    body: "## Connect to server and choose a database  ``` mysql -u root -p -h localhost ```  ``` mysql &gt; use test; Reading table information for completion of table and column names You can turn off this feature to get a quicker startup with -A  ```  "
});

documentTitles["index.html#view-the-list-of-all-tables"] = "View the list of all tables";
index.add({
    url: "index.html#view-the-list-of-all-tables",
    title: "View the list of all tables",
    body: "## View the list of all tables  ``` mysql &gt; *; Empty set (0.00 sec)  ```  "
});

documentTitles["index.html#create-a-new-table"] = "Create a new table";
index.add({
    url: "index.html#create-a-new-table",
    title: "Create a new table",
    body: "## Create a new table  ``` mysql &gt; employee { id integer primary key auto_increment, name varchar(255), gender char(1), phone varchar(20), email varchar(255) }; Query OK, 0 row affected (0.17 sec) Records: 0  Warnings: 0  mysql &gt;  ```  "
});

documentTitles["index.html#describe-the-table"] = "Describe the table";
index.add({
    url: "index.html#describe-the-table",
    title: "Describe the table",
    body: "## Describe the table  ``` mysql &gt; employee; ┏━━━━━━━━┳━━━━━━━━━━━━━━┳━━━━━━┳━━━━━┳━━━━━━━━━┳━━━━━━━━━━━━━━━━┓ ┃ Field  ┃ Type         ┃ Null ┃ Key ┃ Default ┃ Extra          ┃ ┡━━━━━━━━╇━━━━━━━━━━━━━━╇━━━━━━╇━━━━━╇━━━━━━━━━╇━━━━━━━━━━━━━━━━┩ │ id     │ int(11)      │ NO   │ PRI │ NULL    │ auto_increment │ │ name   │ varchar(255) │ YES  │     │ NULL    │                │ │ gender │ char(1)      │ YES  │     │ NULL    │                │ │ phone  │ varchar(20)  │ YES  │     │ NULL    │                │ │ email  │ varchar(255) │ YES  │     │ NULL    │                │ └────────┴──────────────┴──────┴─────┴─────────┴────────────────┘ 5 rows in set (0.00 sec)  mysql &gt;  ```  "
});

documentTitles["index.html#list-the-contents-of-the-table"] = "List the contents of the table";
index.add({
    url: "index.html#list-the-contents-of-the-table",
    title: "List the contents of the table",
    body: "## List the contents of the table  ``` mysql &gt; employee &lt;*&gt;; Empty set (0.00 sec)  mysql &gt;  ```  "
});

documentTitles["index.html#insert-few-records-into-the-table"] = "Insert few records into the table";
index.add({
    url: "index.html#insert-few-records-into-the-table",
    title: "Insert few records into the table",
    body: "## Insert few records into the table  ``` mysql &gt; employee &lt;name, gender, phone, email&gt; = [ ( \&quot;John Doe\&quot;, \&quot;M\&quot;, \&quot;+1 1234 567 890\&quot;, \&quot;john.doe@acme.org\&quot; ) ]; Query OK, 1 row affected (0.08 sec) Records: 1  Warnings: 0  mysql &gt;  ```  "
});

documentTitles["index.html#insert-records-in-bulk"] = "Insert records in bulk";
index.add({
    url: "index.html#insert-records-in-bulk",
    title: "Insert records in bulk",
    body: "## Insert records in bulk  ``` mysql &gt; employee &lt;name, gender, phone, email&gt; = [ ( \&quot;Armando Rodriquez\&quot;, \&quot;M\&quot;, \&quot;+1 1234 567 891\&quot;, \&quot;armando.rodiriquez@acme.org\&quot; ), (\&quot;Ignacio Hopkins\&quot;, \&quot;M\&quot;, \&quot;+1 1234 567 892\&quot;, \&quot;ignacio.hopkins@acme.org\&quot;) ]; Query OK, 2 rows affected (0.14 sec) Records: 2  Warnings: 0  mysql &gt;  ```  "
});

documentTitles["index.html#count-the-records-from-the-table"] = "Count the records from the table";
index.add({
    url: "index.html#count-the-records-from-the-table",
    title: "Count the records from the table",
    body: "## Count the records from the table  ``` mysql &gt; employee &lt;count(*)&gt;; ┏━━━━━━━━━━┓ ┃ count(*) ┃ ┡━━━━━━━━━━┩ │        3 │ └──────────┘ 1 rows in set (0.00 sec)  mysql &gt;  ```  "
});

documentTitles["index.html#display-the-records-from-the-table"] = "Display the records from the table";
index.add({
    url: "index.html#display-the-records-from-the-table",
    title: "Display the records from the table",
    body: "## Display the records from the table  ``` mysql &gt; employee &lt;*&gt;; ┏━━━━┳━━━━━━━━━━━━━━━━━━━┳━━━━━━━━┳━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ ┃ id ┃ name              ┃ gender ┃ phone           ┃ email                       ┃ ┡━━━━╇━━━━━━━━━━━━━━━━━━━╇━━━━━━━━╇━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩ │  1 │ John Doe          │ M      │ +1 1234 567 890 │ john.doe@acme.org           │ │  2 │ Armando Rodriquez │ M      │ +1 1234 567 891 │ armando.rodiriquez@acme.org │ │  3 │ Ignacio Hopkins   │ M      │ +1 1234 567 892 │ ignacio.hopkins@acme.org    │ └────┴───────────────────┴────────┴─────────────────┴─────────────────────────────┘ 3 rows in set (0.00 sec)  mysql &gt;  ```  "
});

documentTitles["index.html#display-the-records-from-the-table-with-limit"] = "Display the records from the table with LIMIT";
index.add({
    url: "index.html#display-the-records-from-the-table-with-limit",
    title: "Display the records from the table with LIMIT",
    body: "## Display the records from the table with LIMIT  ``` mysql &gt; employee &lt;*&gt;[1]; ┏━━━━┳━━━━━━━━━━┳━━━━━━━━┳━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━┓ ┃ id ┃ name     ┃ gender ┃ phone           ┃ email             ┃ ┡━━━━╇━━━━━━━━━━╇━━━━━━━━╇━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━┩ │  1 │ John Doe │ M      │ +1 1234 567 890 │ john.doe@acme.org │ └────┴──────────┴────────┴─────────────────┴───────────────────┘ 1 rows in set (0.00 sec)  ```  "
});

documentTitles["index.html#display-the-records-from-the-table-with-limit-offset"] = "Display the records from the table with LIMIT, OFFSET";
index.add({
    url: "index.html#display-the-records-from-the-table-with-limit-offset",
    title: "Display the records from the table with LIMIT, OFFSET",
    body: "## Display the records from the table with LIMIT, OFFSET  ``` mysql &gt; employee &lt;*&gt;[1,1]; ┏━━━━┳━━━━━━━━━━━━━━━━━━━┳━━━━━━━━┳━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ ┃ id ┃ name              ┃ gender ┃ phone           ┃ email                       ┃ ┡━━━━╇━━━━━━━━━━━━━━━━━━━╇━━━━━━━━╇━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩ │  2 │ Armando Rodriquez │ M      │ +1 1234 567 891 │ armando.rodiriquez@acme.org │ └────┴───────────────────┴────────┴─────────────────┴─────────────────────────────┘ 1 rows in set (0.00 sec)  mysql &gt;  ```   "
});

documentTitles["index.html#display-the-records-from-the-table-with-where-clause"] = "Display the records from the table with WHERE Clause";
index.add({
    url: "index.html#display-the-records-from-the-table-with-where-clause",
    title: "Display the records from the table with WHERE Clause",
    body: "## Display the records from the table with WHERE Clause  ``` mysql &gt; employee &lt;*&gt;(id &gt; 1); ┏━━━━┳━━━━━━━━━━━━━━━━━━━┳━━━━━━━━┳━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ ┃ id ┃ name              ┃ gender ┃ phone           ┃ email                       ┃ ┡━━━━╇━━━━━━━━━━━━━━━━━━━╇━━━━━━━━╇━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩ │  2 │ Armando Rodriquez │ M      │ +1 1234 567 891 │ armando.rodiriquez@acme.org │ │  3 │ Ignacio Hopkins   │ M      │ +1 1234 567 892 │ ignacio.hopkins@acme.org    │ └────┴───────────────────┴────────┴─────────────────┴─────────────────────────────┘ 2 rows in set (0.00 sec)  mysql &gt;  ```  "
});

documentTitles["index.html#display-the-records-from-the-table-with-where-clause-column-aliasing"] = "Display the records from the table with WHERE Clause &amp; Column Aliasing";
index.add({
    url: "index.html#display-the-records-from-the-table-with-where-clause-column-aliasing",
    title: "Display the records from the table with WHERE Clause &amp; Column Aliasing",
    body: "## Display the records from the table with WHERE Clause &amp; Column Aliasing  ``` mysql &gt; employee &lt;name \&quot;Name\&quot;, gender Gender, phone 'Mobile', email \&quot;E-Mail\&quot;&gt; (id &gt; 1 or id &gt; 2); ┏━━━━━━━━━━━━━━━━━━━┳━━━━━━━━┳━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ ┃ Name              ┃ Gender ┃ Mobile          ┃ E-Mail                      ┃ ┡━━━━━━━━━━━━━━━━━━━╇━━━━━━━━╇━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩ │ Armando Rodriquez │ M      │ +1 1234 567 891 │ armando.rodiriquez@acme.org │ │ Ignacio Hopkins   │ M      │ +1 1234 567 892 │ ignacio.hopkins@acme.org    │ └───────────────────┴────────┴─────────────────┴─────────────────────────────┘ 2 rows in set (0.01 sec)  mysql &gt;  ```  "
});

documentTitles["index.html#copy-table-definition"] = "Copy Table Definition";
index.add({
    url: "index.html#copy-table-definition",
    title: "Copy Table Definition",
    body: "## Copy Table Definition  ``` mysql &gt; employee -&gt; employee_backup; Query OK, 0 row affected (0.17 sec) Records: 0  Warnings: 0  mysql &gt;  ```  "
});

documentTitles["index.html#copy-table-data-into-another-table"] = "Copy Table Data into another table";
index.add({
    url: "index.html#copy-table-data-into-another-table",
    title: "Copy Table Data into another table",
    body: "## Copy Table Data into another table  ``` mysql &gt; employee_backup = employee; Query OK, 3 rows affected (0.09 sec) Records: 3  Warnings: 0  mysql &gt; ```  "
});

documentTitles["index.html#add-new-column-to-the-table"] = "Add New Column to the table";
index.add({
    url: "index.html#add-new-column-to-the-table",
    title: "Add New Column to the table",
    body: "## Add New Column to the table  ``` mysql &gt; employee +country char(2) default NULL; Query OK, 3 rows affected (0.33 sec) Records: 3  Warnings: 0  mysql &gt; employee; SQL : DESC employee ┏━━━━━━━━━┳━━━━━━━━━━━━━━┳━━━━━━┳━━━━━┳━━━━━━━━━┳━━━━━━━━━━━━━━━━┓ ┃ Field   ┃ Type         ┃ Null ┃ Key ┃ Default ┃ Extra          ┃ ┡━━━━━━━━━╇━━━━━━━━━━━━━━╇━━━━━━╇━━━━━╇━━━━━━━━━╇━━━━━━━━━━━━━━━━┩ │ id      │ int(11)      │ NO   │ PRI │ NULL    │ auto_increment │ │ name    │ varchar(255) │ YES  │     │ NULL    │                │ │ gender  │ char(1)      │ YES  │     │ NULL    │                │ │ phone   │ varchar(20)  │ YES  │     │ NULL    │                │ │ email   │ varchar(255) │ YES  │     │ NULL    │                │ │ country │ char(2)      │ YES  │     │ NULL    │                │ └─────────┴──────────────┴──────┴─────┴─────────┴────────────────┘ 6 rows in set (0.00 sec)  ```  "
});

documentTitles["index.html#add-another-column-to-the-table"] = "Add another column to the table";
index.add({
    url: "index.html#add-another-column-to-the-table",
    title: "Add another column to the table",
    body: "## Add another column to the table  ``` mysql &gt; employee +pin varchar(8) default NULL; Query OK, 3 rows affected (0.49 sec) Records: 3  Warnings: 0  mysql &gt;  ```  "
});

documentTitles["index.html#remove-column-from-the-table"] = "Remove Column from the table";
index.add({
    url: "index.html#remove-column-from-the-table",
    title: "Remove Column from the table",
    body: "## Remove Column from the table  ``` mysql &gt; employee -pin; Query OK, 3 rows affected (0.32 sec) Records: 3  Warnings: 0  mysql &gt;  ```  "
});

documentTitles["index.html#update-table-contents"] = "Update table contents";
index.add({
    url: "index.html#update-table-contents",
    title: "Update table contents",
    body: "## Update table contents  ``` mysql &gt; employee | country = 'US' | ( id = 1 ); Query OK, 1 row affected (0.08 sec) Records: 1  Warnings: 0  mysql &gt; employee | country = 'JP' | ( id = 2 ); Query OK, 1 row affected (0.09 sec) Records: 1  Warnings: 0  mysql &gt; employee | country = 'AR' | ( id = 3 ); Query OK, 1 row affected (0.08 sec) Records: 1  Warnings: 0  mysql &gt; ```  "
});

documentTitles["index.html#delete-records-from-table"] = "Delete Records from Table";
index.add({
    url: "index.html#delete-records-from-table",
    title: "Delete Records from Table",
    body: "## Delete Records from Table  ``` mysql &gt; ! employee; Query OK, 0 row affected (0.14 sec) Records: 0  Warnings: 0  mysql &gt;  ```  TIP: Alternatively, `-employee` could've been used in the grammar. But, `!` or (bang) actually tells something big is happening.  "
});

documentTitles["index.html#drop-the-table"] = "Drop the table";
index.add({
    url: "index.html#drop-the-table",
    title: "Drop the table",
    body: "## Drop the table  ``` mysql &gt; !! employee; Query OK, 0 row affected (0.08 sec) Records: 0  Warnings: 0  mysql &gt;  TIP: Double `bang` actually tells that something huge is going to happen.  ```  *Revision: 0.1 - nareshv@ 1-Mar-2014*"
});


