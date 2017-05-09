<?php
class DB_Connection{
  private $conn;
  function __construct(){
    try{
      $connection = new PDO("mysql:dbname=overtech;host=localhost","root","");
      $connection -> exec("SET CHARACTER SET utf8");
      $connection -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $this -> conn = $connection;
    }catch(PDO_Exception $e){
      echo $e;
    }
  }
  function Call_DB(){
    return $this -> conn;
  }
}



?>
