function Snake() {
    var CELL_SIZE = 20,
        INITIAL_DELAY = 200,
        MIN_DELAY = 50,
        SPEED_INCREASE = 10,
        INITIAL_LENGTH = 4;

    var self = this,
        paused = false,
        userName = 'anonymous',
        container = document.getElementById('#snake'),
        scores = document.createElement('div'),
        points = document.createElement('span'),
        speed = document.createElement('span'),
        width = Number.parseInt(window.getComputedStyle(container).width),
        height = Number.parseInt(window.getComputedStyle(container).height),
        timeout,
        pointedCell,
        startingCell,
        pathCell,
        startToGoForPath,
        currentDelay = INITIAL_DELAY,
        direction = {},
        field = [],
        snake,
        mousedown = false,
        path = [];

        points.classList.toggle('points');
        scores.classList.toggle('scores');
        speed.classList.toggle('speed');

    var reverse = function() {
        var nextX = snake.cells[0].X + direction.X,
            nextY = snake.cells[0].Y + direction.Y,
            result = false;
        if ((nextX === snake.cells[1].X) && (nextY === snake.cells[1].Y)) {
            result = true;
        }
        return result;
    }

    this.crush = function() {
        var nextX = snake.cells[0].X + direction.X,
            nextY = snake.cells[0].Y + direction.Y,
            lengthX = field[0].length,
            lengthY = field.length,
            result = false;
        if ((nextX < 0) || (nextY < 0) || (nextX >= lengthX) || (nextY >= lengthY)) {
            result = true;
        }
        else{
            if (field[nextY][nextX].classList.contains('snaked')) {
                result = true;
            }
        }
        return result;
    }

    // this.crush = function() {
    //     var lengthX = field[0].length,
    //         lengthY = field.length,
    //         result = false,
    //         nextX,
    //         nextY;
    //     if ((nextX < 0) || (nextY < 0) || (nextX >= lengthX) || (nextY >= lengthY)) {
    //         result = true;
    //     }
    //     var nextX = snake.cells[0].X + direction.X,
    //         nextY = snake.cells[0].Y + direction.Y;
            
    //     if (field[nextY][nextX].classList.contains('snaked')) {
    //         result = true;
    //     }
    //     return result;
    // }

    this.nextY = function(){
        var lengthX = field[0].length,
            lengthY = field.length,
            result = false,
            nextX = snake.cells[0].X + direction.X,
            nextY = snake.cells[0].Y + direction.Y;
    }

    this.nextX = function(){
        var lengthX = field[0].length,
            lengthY = field.length,
            result = false,
            nextX = snake.cells[0].X + direction.X,
            nextY = snake.cells[0].Y + direction.Y;
    }

    this.eatingApple = function() {
        var nextX = snake.cells[0].X + direction.X,
            nextY = snake.cells[0].Y + direction.Y,
            result = false;
        if (field[nextY][nextX].classList.contains('apple')) {
            result = true;
        }
        return result;
    }

    this.move = function() {
        if (this.crush()) {
            this.record();
            this.init();
        }
        else{
            if(path.length !== 0){
                if(!startToGoForPath){
                    startToGoForPath = field[snake.cells[0].Y][snake.cells[0].X];
                }
                this.pathDirection(startToGoForPath, path[0]);
            }
            else{
                if(pointedCell !== null){
                    this.mouseDirection();
                }   
            }
            if (this.eatingApple()) {
                snake.cells.unshift({
                    Y: snake.cells[0].Y + direction.Y,
                    X: snake.cells[0].X + direction.X
                });
                field[snake.cells[0].Y][snake.cells[0].X].classList.toggle('apple');
                field[snake.cells[0].Y][snake.cells[0].X].classList.toggle('snaked');
                this.createApple();
                if(currentDelay <= MIN_DELAY){
                    timeout = setTimeout(this.move.bind(this), MIN_DELAY);
                }
                else{
                    timeout = setTimeout(this.move.bind(this), currentDelay -= SPEED_INCREASE);
                    points.innerText = 'points:' + snake.cells.length;
                    speed.innerText = 'speed:' + ((INITIAL_DELAY - currentDelay)/10 + 1);
                }
            } else {
                field[snake.cells[snake.cells.length - 1].Y][snake.cells[snake.cells.length - 1].X].classList.toggle('snaked');

                var current = {},
                    next = {
                        X: snake.cells[0].X,
                        Y: snake.cells[0].Y
                    };

                snake.cells[0].X += direction.X;
                snake.cells[0].Y += direction.Y;

                for (var i = 1; i < snake.cells.length; i++) {
                    current.X = next.X;
                    current.Y = next.Y;

                    next.X = snake.cells[i].X;
                    next.Y = snake.cells[i].Y;

                    snake.cells[i].X = current.X;
                    snake.cells[i].Y = current.Y;
                }

                field[snake.cells[0].Y][snake.cells[0].X].classList.toggle('snaked');
                timeout = setTimeout(this.move.bind(this), currentDelay);
            }
        }
    };

    // this.mouseDirection = function(){
    //     var startX = Number.parseInt((startingCell.id.split('_'))[1]),
    //         startY = Number.parseInt((startingCell.id.split('_'))[0]),
    //         pointX = Number.parseInt((pointedCell.id.split('_'))[1]),
    //         pointY = Number.parseInt((pointedCell.id.split('_'))[0]),
    //         currentCell = {},
    //         past = {},
    //         left = {};
    //     currentCell.X = snake.cells[0].X;
    //     currentCell.Y = snake.cells[0].Y;
    //     past.X = Math.abs(currentCell.X - startX);
    //     past.Y = Math.abs(currentCell.Y - startY);
    //     left.X = Math.abs(pointX - currentCell.X);
    //     left.Y = Math.abs(pointY - currentCell.Y);
    //     if(left.X + left.Y === 0){
    //         pointedCell = null;
    //     }
    //     else{
    //         if((left.X / (past.X + 1)) > (left.Y / (past.Y + 1))){
    //             var oldDirX = direction.X;
    //             direction.Y = 0;
    //             direction.X = (pointX - startX) / Math.abs(pointX - startX);
    //             if(oldDirX / direction.X === -1){
    //                 if(pointY - startY === 0){
    //                     direction.Y = 1;
    //                     startingCell = document.getElementById('' + (currentCell.Y + direction.Y) + '_' + currentCell.X);
    //                 }
    //                 else{
    //                     direction.Y = (pointY - startY) / Math.abs(pointY - startY);
    //                 }
    //                 direction.X = 0;
    //             }
    //         }
    //         else {
    //             var oldDirY = direction.Y;
    //             direction.X = 0;
    //             direction.Y = (pointY - startY) / Math.abs(pointY - startY);
    //             if(oldDirY / direction.Y === -1){
    //                 if(pointX - startX === 0){
    //                     direction.X = 1;
    //                     startingCell = document.getElementById('' + currentCell.Y + '_' + (currentCell.X + direction.X));
    //                 }
    //                 else{
    //                     direction.X = (pointX - startX) / Math.abs(pointX - startX);
    //                 }
    //                 direction.Y = 0;
    //             }
    //         }
    //     }

    // };

    this.mouseDirection = function(){
        this.whereTo(startingCell, pointedCell);
    };

    this.pathDirection = function(){
        if(!startToGoForPath){
            startToGoForPath = field[snake.cells[0].Y][snake.cells[0].X];
        }
        if(this.startingPath()){
            startToGoForPath = null;
            if(path.length === 1){
                this.whereTo(path[0], path[0]);
            }
            else{
                this.whereTo(path[0], path[1]);
            }
            path[0].classList.remove('path');
            path.shift();
        }
        else{
            this.whereTo(startToGoForPath, path[0]);
        }
    };

    this.startingPath = function(){
        var result = false;
        if((Number.parseInt((path[0].id.split('_'))[1]) == snake.cells[0].X) 
        && (Number.parseInt((path[0].id.split('_'))[0]) == snake.cells[0].Y)){
            result = true;
        }
        return result;
    }

    this.whereTo = function(start, finish){
        var startX = Number.parseInt((start.id.split('_'))[1]),
            startY = Number.parseInt((start.id.split('_'))[0]),
            pointX = Number.parseInt((finish.id.split('_'))[1]),
            pointY = Number.parseInt((finish.id.split('_'))[0]),
            currentCell = {},
            past = {},
            left = {};
        currentCell.X = snake.cells[0].X;
        currentCell.Y = snake.cells[0].Y;
        past.X = Math.abs(currentCell.X - startX);
        past.Y = Math.abs(currentCell.Y - startY);
        left.X = Math.abs(pointX - currentCell.X);
        left.Y = Math.abs(pointY - currentCell.Y);
        if(left.X === 0 && left.Y === 0){
            finish = null;
            // startToGoForPath = null;
        }
        else{
            if((left.X / (past.X + 1)) > (left.Y / (past.Y + 1))){
                var oldDirX = direction.X;
                direction.Y = 0;
                direction.X = (pointX - startX) / Math.abs(pointX - startX);
                if(oldDirX / direction.X === -1){
                    if(pointY - startY === 0){
                        direction.Y = 1;
                        startingCell = document.getElementById('' + (currentCell.Y + direction.Y) + '_' + currentCell.X);
                    }
                    else{
                        direction.Y = (pointY - startY) / Math.abs(pointY - startY);
                    }
                    direction.X = 0;
                }
            }
            else {
                var oldDirY = direction.Y;
                direction.X = 0;
                direction.Y = (pointY - startY) / Math.abs(pointY - startY);
                if(oldDirY / direction.Y === -1){
                    if(pointX - startX === 0){
                        direction.X = 1;
                        startingCell = document.getElementById('' + currentCell.Y + '_' + (currentCell.X + direction.X));
                    }
                    else{
                        direction.X = (pointX - startX) / Math.abs(pointX - startX);
                    }
                    direction.Y = 0;
                }
            }
        }

    };

    this.init = function() {
        this.clear();
        var name = prompt("Please enter your name");

        if(name){
            userName = name;
        }

        snake = {
            cells: []
        };
        for(var i = 1; i < INITIAL_LENGTH + 1; i++){
            snake.cells.unshift({
                X: 0,
                Y: Math.floor(height / (CELL_SIZE + 1)) - i
            });
        }

        direction = {
            X: 0,
            Y: -1
        };

        points.innerText = 'points:' + snake.cells.length;
        speed.innerText = 'speed:' + 1;

        scores.appendChild(points);
        scores.appendChild(speed);
        container.appendChild(scores);

        var table = document.createElement('table');
        for (var i = 0; i < Math.floor(height / (CELL_SIZE + 1)); i++) {
            var tr = document.createElement('tr');
            field[i] = [];
            for (var j = 0; j < Math.floor(width / (CELL_SIZE + 1)); j++) {
                var td = document.createElement('td');
                td.id = '' + i + '_' + j;
                td.onmouseover = function(event) {
                    pointedCell = event.target;
                };
                td.onmouseenter = function(event) {
                    startingCell = document.getElementById('' + snake.cells[0].Y + '_' + snake.cells[0].X);
                };
                tr.appendChild(td);
                field[i][j] = td;
            }
            table.appendChild(tr);
            table.onmouseleave = function(){
                pointedCell = null;
                startingCell = null;
            }
        }
        container.appendChild(table);
        pointedCell = null;

        for (var i = 0; i < snake.cells.length; i++) {
            field[snake.cells[i].Y][snake.cells[i].X].classList.toggle('snaked');
        }
        this.createApple();
        timeout = setTimeout(this.move.bind(this), INITIAL_DELAY);
    };

    this.clear = function() {
        currentDelay = INITIAL_DELAY;
        clearInterval(timeout);
        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild);
        }
    };

    this.createApple = function() {
        var randX = Math.ceil(Math.random() * field[0].length - 1);
        var randY = Math.ceil(Math.random() * field.length - 1);
        if (field[randY][randX].classList.contains('snaked')) {
            this.createApple();
        } else {
            field[randY][randX].classList.toggle('apple');
        }
    }

    this.record = function(){
        if(typeof localStorage.records === 'undefined'){
            localStorage.records = JSON.stringify([]);
        }
        var array = (JSON.parse(localStorage.records));

        array = array.sort(function(a, b){
            return b.length - a.length;
        });

        array.reduce(function(prev, cur, index){
            if((prev.length >= snake.cells.length) && (cur.length < snake.cells.length)){
                array.splice(index, 1, {
                    name: userName,
                    length: snake.cells.length
                });
            }
            return cur;
        });

        while(array.length > 10){
            array.splice(10, 1);
        }

        var result = '';
        for(var i = 0; i < array.length; i++){
            result += (i + 1) + '. ' + array[i].name + ': ' + array[i].length + '\n';
        }
        alert(result);

        localStorage.records = JSON.stringify(array);
    }

    document.onkeydown = function(event) {
        var oldDirection = {};
        oldDirection.X = direction.X;
        oldDirection.Y = direction.Y;
        if (!event) {
            event = window.event;
        }
        var code = event.keyCode;
        if (event.charCode && code == 0) {
            code = event.charCode;
        }
        switch (code) {
            case 32:
                if(paused){
                    timeout = setTimeout(self.move.bind(self), currentDelay);
                    paused = false;
                }
                else{
                    clearInterval(timeout);
                    paused = true;
                }
                break;
            case 37:
                direction.X = -1;
                direction.Y = 0;
                if (reverse()) {
                    direction.X = oldDirection.X;
                    direction.Y = oldDirection.Y;
                }
                break;
            case 38:
                direction.X = 0;
                direction.Y = -1;
                if (reverse()) {
                    direction.X = oldDirection.X;
                    direction.Y = oldDirection.Y;
                }
                break;
            case 39:
                direction.X = 1;
                direction.Y = 0;
                if (reverse()) {
                    direction.X = oldDirection.X;
                    direction.Y = oldDirection.Y;
                }
                break;
            case 40:
                direction.X = 0;
                direction.Y = 1;
                if (reverse()) {
                    direction.X = oldDirection.X;
                    direction.Y = oldDirection.Y;
                }
                break;
        }
        // event.preventDefault();
    };

    document.onmousedown = function(event) {
        event.preventDefault();
        mousedown = true;
    };

    document.onmousemove = function(event) {
        if(event.target.tagName === 'TD'
         && mousedown && 
         !event.target.classList.contains('path')){
            event.target.classList.add('path');
            path.push(event.target);
        }
    };

    document.onmouseup = function(event) {
        if(event.target.tagName === 'TD'
         && mousedown && 
         !event.target.classList.contains('path')){
            event.target.classList.add('path');
            path.push(event.target);
        }
        mousedown = false;
    };

};

// (new Snake()).init();


var solid = new Snake()
solid.init();
