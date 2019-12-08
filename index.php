<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="img/favicon.ico" rel="icon" type="image/x-icon"/>
    <title>Rubik Timer</title>
    <link href="https://fonts.googleapis.com/css?family=Hind:700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/main.css">
</head>
<body>

    <div id="main" class="container-fluid h-100 align-self-center d-flex flex-column align-items-center justify-content-around text-light">
        
        <div class="text-center">
            <h1 class="text-center pb-5">Rubik Timer</h1>
            <h2 id="time" class="text-muted">0.00</h2>
        </div>

        <div id="finger-container">
            <div class="circle"></div>
            <div class="circle2"></div>
            <div class="finger">
                <img id="huellaPulgar" src="img/fingerprint-solid.svg" alt="">
            </div>
        </div>
            
    </div>


    <div id="stats" class="timer-stats text-light">
        <div class="text-center">
            <img id="openStats" src="img/angle-up-solid.svg" class="pt-1" width="25" style="filter: invert(100%);">
            <h2>Tiempos</h2>
        </div>

        <div id="time-list" class="container">

            

        </div>
        
    </div>








    <script src="js/main.js"></script>
</body>
</html>