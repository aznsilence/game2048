<?php
if(isset($_POST['score']) && isset($_POST['add_score']))
{
    $score = $_POST['score']+$_POST['add_score'];
    echo $score;
}
?>