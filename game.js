console.clear();

(function gameSetup() {
    'use strict';


    var shipElem = document.getElementById('ship');
    var asterElem = document.querySelector(`aside`);
    // "main" class is the actual game container itself
    // these lets gives it a height and a width
    let clientHeight = document.querySelector(`main`).clientHeight;
    let clientWidth = document.querySelector(`main`).clientWidth;

    const ship = {
        velocity: 0,
        angle: 0,
        shipLives: 3,
        // this defines where in the height and width of the game the ship will start.
        top: (-clientHeight / 2),
        left: (clientWidth / 2)


    };

    let shipsCurrentAngle = ship.angle;
    let shipsCurrentVelocity = ship.velocity;

    // let shipsCurrentVelocity = ship.velocity;
    // let shipsCurrentAngle = ship.angle;
    // function livesLoss() {
    //     livesElem = lives
    //     if (lives > 0) {
    //         lives--;
    //     }
    //     console.log(livesLoss);
    //     console.log(livesElem);
    // };



    // Create your "ship" object and any other variables you might need...


    var allAsteroids = [];
    shipElem.addEventListener('asteroidDetected', function(event) {

        allAsteroids.push(event.detail);
        // You can detect when a new asteroid appears with this event.
        // The new asteroid's HTML element will be in:  event.detail

        // What might you need/want to do in here?
        console.dir(allAsteroids);
    });
    /**
     * Use this function to handle when a key is pressed. Which key? Use the
     * event.keyCode property to know:
     *
     * 37 = left
     * 38 = up
     * 39 = right
     * 40 = down
     *
     * @param  {Event} event   The "keyup" event object with a bunch of data in it
     * @return {void}          In other words, no need to return anything
     */
    function handleKeys(event) {
        //left
        if (event.keyCode == 37) {
            ship.angle -= 10;
            shipsCurrentAngle = ship.angle;


            //top
        } else if (event.keyCode == 38) {

            ship.velocity++;
            shipsCurrentVelocity = ship.velocity;

            //right
        } else if (event.keyCode == 39) {

            ship.angle += 10;
            shipsCurrentAngle = ship.angle;


            //down
        } else if (event.keyCode == 40) {


            // stops ship
            if (ship.velocity <= 0) {
                ship.velocity = 0;
            } else {
                ship.velocity--
            }
        }
        shipsCurrentVelocity = ship.velocity;
    };

    function gameRect() {

        allAsteroids.forEach(function(asteroid) {
            asteroid.style.display = "none";
        });
        ship.velocity = 0;

        const createH1 = document.createElement("h1");
        const gameOver = document.createTextNode("Game Over!!!");
        const reload = document.createElement("button");
        createH1.appendChild(gameOver);
        document.body.firstElementChild.appendChild(createH1);

        let h1 = document.body.firstElementChild.children[2].style;
        console.dir(h1);
        h1.color = "white";

    };

    // Implement me!

    // }
    document.querySelector('body').addEventListener('keydown', handleKeys);

    /**
     * This is the primary "game loop"... in traditional game development, things
     * happen in a loop like this. This function will execute every 20 milliseconds
     * in order to do various things. For example, this is when all game entities
     * (ships, etc) should be moved, and also when things like hit detection happen.
     *
     * @return {void}
     */
    function gameLoop() {
        // This function for getting ship movement is given to you (at the bottom).
        // NOTE: you will need to change these arguments to match your ship object!
        // What does this function return? What will be in the `move` variable?
        // Read the documentation!
        var move = getShipMovement(ship.velocity, ship.angle);
        move: {

        }
        ship.left += move.left;
        ship.top += move.top;

        shipElem.style.top = `${parseInt(-ship.top, 10)}px`;
        shipElem.style.left = `${parseInt(ship.left, 10)}px`;

        shipElem.style.transform = `rotate(${shipsCurrentAngle}deg)`;


        // Move the ship here!
        // Screen Wrapping
        if (ship.top > 50) {
            ship.top = -(clientHeight)
        };
        if (ship.top < -(clientHeight)) {
            ship.top = 50
        };
        if (ship.left < 0) {
            ship.left = (clientWidth)
        };
        if (ship.left > (clientWidth)) {
            ship.left = 0
        };
        // Time to check for any collisions (see below)...
        checkForCollisions();
    }

    /**
     * This function checks for any collisions between asteroids and the ship.
     * If a collision is detected, the crash method should be called with the
     * asteroid that was hit:
     *    crash(someAsteroidElement);
     *
     * You can get the bounding box of an element using:
     *    someElement.getBoundingClientRect();
     *
     * A bounding box is an object with top, left, width, and height properties
     * that you can use to detect whether one box is on top of another.
     *
     * @return void
     */
    function checkForCollisions() {


        // Implement me!
        allAsteroids.forEach((asteroid) => {
            let shipRect = (shipElem.getBoundingClientRect());
            let asterRect = asteroid.getBoundingClientRect();
            if (shipRect.top < asterRect.top + asterRect.width &&
                shipRect.top + shipRect.width > asterRect.top &&
                shipRect.left < asterRect.left + asterRect.height &&
                shipRect.height + shipRect.left > asterRect.left) {
                crash(asteroid);
            }

        });
    }
    /**
     * This event handler will execute when a crash occurs
     *
     * return {void}
     */
    document.querySelector('main').addEventListener('crash', function() {
        console.log('A crash occurred!');

        gameRect();

        // What might you need/want to do in here?

    });



    /** ************************************************************************
     *             These functions and code are given to you.
     *
     *                   !!! DO NOT EDIT BELOW HERE !!!
     ** ************************************************************************/

    var loopHandle = setInterval(gameLoop, 20);

    /**
     * Executes the code required when a crash has occurred. You should call
     * this function when a collision has been detected with the asteroid that
     * was hit as the only argument.
     *
     * @param  {HTMLElement} asteroidHit The HTML element of the hit asteroid
     * @return {void}
     */
    function crash(asteroidHit) {

        document.querySelector('body').removeEventListener('keyup', handleKeys);
        asteroidHit.classList.add('hit');
        document.querySelector('#ship').classList.add('crash');

        var event = new CustomEvent('crash', {
            detail: asteroidHit
        });
        document.querySelector('main').dispatchEvent(event);
    }


    /**
     * Get the change in ship position (movement) given the current velocity
     * and angle the ship is pointing.
     *
     * @param  {Number} velocity The current speed of the ship (no units)
     * @param  {Number} angle    The angle the ship is pointing (no units)
     * @return {Object}          The amount to move the ship by with regard to left and top position (object with two properties)
     */
    function getShipMovement(velocity, angle) {
        return {
            left: (velocity * Math.sin(angle * Math.PI / 180)),
            top: (velocity * Math.cos(angle * Math.PI / 180))
        };
    }

})();
