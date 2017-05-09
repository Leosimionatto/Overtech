<?php
include_once("db_connection.php");
include_once("sql_queries/queries.php");

class Courses{
  private $conn;
  private $queries;
  private $table = 'courses';

  function __construct(){
    // Set the connection with DB
    $conn = new DB_Connection();
    $this -> conn = $conn -> Call_DB();

    // Instance queries
    $this -> queries = new Queries();
  }
  function select_all_courses(){
    // Connection with DB
    $conn = $this -> conn;

    // Query for find courses in database
    try{
      $sql = $this -> queries -> select('*',$this->table);
      $query = $conn -> prepare($sql);
      $query -> execute();
      if($query){
        $result["courses"] = $query -> fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
      }
    }catch(PDO_Exception $e){
      var_dump(http_response_code(406));
    }
  }
}


?>
