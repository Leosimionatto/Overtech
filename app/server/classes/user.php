<?php
session_start();

include_once("db_connection.php");
include_once("sql_queries/queries.php");

class User{
  private $conn;
  private $queries;
  private $table = "users";

  // Function to return a response for alert user: var_dump(http_response_code(406));

  function __construct(){
    // Instance the db_connection class
    $conn = new DB_Connection();
    $this->conn = $conn -> Call_DB();

    // Instance queries
    $this->queries = new Queries();
  }
  function find_all_users($fields,$condition=1){
    // Connect with DB
    $conn = $this->conn;

    // Construct the query to BD
    try{
      $sql = $this->queries->select($fields,$this->table,$condition);
      $query = $conn->prepare($sql);
      $query->execute();
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
      echo json_encode($result);
    }catch(PDO_Exception $e){
      header("HTTP/1.0 503 Erro ao realizar a query!");
    }
    // return $result;
  }
  function find_specific_user($fields,$params,$condition){
    // Connect with DB
    $conn = $this->conn;

    // Construct the query to BD
    try{
      $sql = $this->queries->select($fields,$this->table,$condition);
      $query = $conn->prepare($sql);
      isset($params["id"]) ? $query -> bindParam(':id',$params["id"],PDO::PARAM_INT) : false;
      isset($params["name"]) ? $query -> bindParam(':name',$params["name"],PDO::PARAM_STR) : false;
      isset($params["course"]) ? $query -> bindParam(':course',$params["course"],PDO::PARAM_INT) : false;
      isset($params["email"]) ? $query -> bindParam(':email',$params["email"],PDO::PARAM_STR) : false;
      $query->execute();
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
      if(count($result) > 0){
        echo json_encode($result);
      }else{
        header("HTTP/1.0 204 Nenhum registro encontrado!");
      }
    }catch(PDO_Exception $e){
      // header("HTTP/1.0 503 Erro ao realizar a query!");
    }
    return $result;
  }
  function register_user($fields){
    // Connect with DB
    $conn = $this->conn;

    // Check for verify if the user isn't registered
    $condition = "email = :email";
    $params["email"] = $fields["email"];
    $user = $this->find_specific_user("*",$params,$condition);

    if($user){
      header("HTTP/1.0 406 E-mail inválido!");
    }else{
      // Construct the query to BD
      $table_fields = "(`name`, `course`, `semester`, `age`, `email`, `password`, `creation_date`, `last_login`)";
      $insert_values = "(:name,:course,:semester,:age,:email,:password,:creation_date,:last_login)";
      $sql = $this->queries->insert($table_fields,$insert_values,$this->table);
      $password_hash = password_hash($fields["password"], PASSWORD_DEFAULT);

      // Run the query in server
      try{
        $query = $this->conn->prepare($sql);
        $query -> bindParam(':name',$fields["name"],PDO::PARAM_STR);
        $query -> bindParam(':course',$fields["course"],PDO::PARAM_INT);
        $query -> bindParam(':semester',$fields["semester"],PDO::PARAM_INT);
        $query -> bindParam(':age',$fields["age"],PDO::PARAM_INT);
        $query -> bindParam(':email',$fields["email"],PDO::PARAM_STR);
        $query -> bindParam(':password',$password_hash,PDO::PARAM_STR);
        $query -> bindParam(':creation_date',$fields["creation_date"]);
        $query -> bindParam(':last_login',$fields["last_login"]);
        $query -> execute();
      }catch(PDO_Exception $e){
        header("HTTP/1.0 503 Erro ao realizar a query!");
      }
      return true;
    }
  }
  function user_login($fields){
    // Connect with DB
    $conn = $this->conn;

    // Find user profile
    $condition = "`email` = :email";
    try{
      $sql = $this->queries->select("`id`,`password`,`semester`,`course`",$this->table,$condition);
      $query = $conn->prepare($sql);
      $query->bindParam(':email',$fields["email"],PDO::PARAM_STR);
      $query->execute();

      // Find result
      $result = $query->fetchAll(PDO::FETCH_ASSOC);

      // Check user information
      if(count($result) > 0){
        $hash = $result[0]["password"];
        if(password_verify($fields["password"], $hash)){
          $update = $this->last_login($result[0]["id"]);
          if($update){
            $_SESSION["user_id"] = $result[0]["id"];
            $_SESSION["semester"] = $result[0]["semester"];
            $_SESSION["course"] = $result[0]["course"];
            echo $result[0]["id"];
          }else{
            header("HTTP/1.0 503 Erro ao realizar a query!");
          }
        }else{
          header("HTTP/1.0 406 Informações inválidas!");
        }
      }else{
        header("HTTP/1.0 406 Informações inválidas!");
      }
    }catch(PDO_Exception $e){
      header("HTTP/1.0 503 Erro ao realizar a query!");
    }
  }
  public function update_user($params,$new_values,$condition){
    // Set Connection
    $conn = $this->conn;
    // Set Query
    $sql = $this->queries->update($new_values,$this->table,$condition);

    try{
      $query = $conn->prepare($sql);
      $query->bindParam(':id',$params["id"],PDO::PARAM_INT);
      $query->bindParam(':name',$params["name"],PDO::PARAM_STR);
      $query->bindParam(':email',$params["email"],PDO::PARAM_STR);
      $query->bindParam(':age',$params["age"],PDO::PARAM_INT);
      $query->bindParam(':course',$params["course"],PDO::PARAM_INT);
      $query->bindParam(':semester',$params["semester"],PDO::PARAM_INT);
      $query->execute();
      if($query){
        return true;
      }
    }catch(PDO_Exception $e){
      header("HTTP/1.0 503 Erro ao realizar a query!");
    }
    return false;
  }
  public function last_login($user){
    // Set the connection with database
    $conn = $this->conn;

    // Today date and condition
    $last_login = date('Y-m-d');
    $condition = '`id` = :user';

    // Update user last_login field
    try{
      $sql = $this->queries->update('`last_login` = :last_login',$this->table,$condition);
      $query = $conn->prepare($sql);
      $query->bindParam(':user',$user,PDO::PARAM_INT);
      $query->bindParam(':last_login',$last_login);
      $query->execute();
      if($query){
        return true;
      }
    }catch(PDO_Exception $e){
      header("HTTP/1.0 503 Erro ao realizar a query!");
    }
    return false;
  }
}


?>
