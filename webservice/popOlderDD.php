<?php

 header('Access-Control-Allow-Origin: *');
 header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

include 'includes/conf.ini.php';
include 'includes/DBConn.php';

$postData = json_decode(file_get_contents("php://input"));

//$hospcode ='07065';
$hospcode = $postData->hospcode;

$row = $db->prepare("select p.person_id,p.cid,concat(p.pname,p.fname,' ',p.lname) as ptname,left(address_id,4) as amp,
p.age_y,p.birthdate,p.village_id,h.address,v.village_moo,v.village_name,concat(hos.hosptype,hos.`name`) as hospname,hos.hospcode
from
person as p
join house h on h.hospcode=p.hospcode and h.house_id=p.house_id
join village v on v.hospcode=h.hospcode and v.village_id=h.village_id
join hospcode hos on hos.hospcode=h.hospcode
where p.death<>'Y' and p.person_discharge_id='9' 
and p.house_regist_type_id in (1,3)
and p.age_y>59 and p.hospcode='$hospcode'
order by v.village_id,h.address");

$row->execute(); //execute the query  
$obj = $row->fetchAll(PDO::FETCH_ASSOC);
$json_data = [];

foreach ($obj as $k) {
    array_push($json_data, $k);
}

$txt = json_encode($json_data);

print_r($txt);

//echo $hospcode;
?>

