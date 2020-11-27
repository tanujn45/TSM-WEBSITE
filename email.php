
<?php 

$to = 'apathak431@gmail.com';
$sub = 'TSM Enquiry form';

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$web = $_POST['web'];
$desc = $_POST['describe-selector'];
$help = $_POST['help-selector'];
$query = $_POST['query'];

$message = "Name - $name\nPhone - $phone\nemail - $email\nWebsite/LinkedIn - $web\ndesc - $desc\nhelp - $help\nquery - $query";

$confirm = mail($to, $sub, $message);
if($confirm) {
    header("Location: success.html");
} else {
    echo "Error sending the message!";
}

?>
