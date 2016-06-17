<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');


include 'includes/conf.audit.php';
include 'includes/DBConn2.php';


$postData = json_decode(file_get_contents("php://input"));


$username = $postData->username;
$password = $postData->password;

 // $user = 'kukks';
 // $pass = '112233445';


$sql ="select
p.user_id,
p.level_userid,u.username,u.`password`,
concat(p.firstname,'  ',p.lastname) as fullname,
p.dep_id as hoscode,
concat(h.hosptype,h.`name`) as hospname
from `profiles` as p
join users as u on u.id = p.user_id
join hospcode as h on h.hospcode = p.dep_id
where username='$username' and `password`=MD5('$password') ";

$stm =  $db2->prepare($sql);

$stm->execute();

$count = $stm->rowCount();

//echo $count;

if($count>0):

$obj = $stm->fetchAll(PDO::FETCH_ASSOC);
$json_data = [];

array_push($json_data,['status'=>'Success']);

foreach ($obj as $k) {
    array_push($json_data, $k);
}

$txt = json_encode($json_data);

print_r($txt);

else:

	$json_data = [];

array_push($json_data,['status'=>'Fail']);
$txt = json_encode($json_data);

print_r($txt);

endif;

?>