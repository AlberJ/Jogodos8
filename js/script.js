(function () {
    var tiles = [],
        answer = [],
        movement = 0;
    var startScreen = document.querySelector("#startScreen");
    startScreen.addEventListener("click", startGame, false);
    var overScreen = document.querySelector("#overScreen");
    var qtdeMovement = document.querySelector("#qtdeMovement");

    function init() {
        for (var i = 1; i < 9; i++) {
            var tile = document.querySelector("#n" + i);
            tile.style.background = "url('img/n" + i + ".png')";
            tile.addEventListener("click", moveTile, false);
            tiles.push(tile);
        }
        tiles.push(null);
        answer = tiles;
        movement = 0;

        render();
    }

    function render() {
        for (var i in tiles) {
            var tile = tiles[i];
            if (tile) {
                tile.style.left = (i % 3) * 100 + 5 + "px";
                if (i < 3) {
                    tile.style.top = "5px";
                } else if (i < 6) {
                    tile.style.top = "105px";
                } else {
                    tile.style.top = "205px";
                }
            }
        }
        qtdeMovement.innerHTML = movement;
    }

    function moveTile() {
        var index = tiles.indexOf(this);
        // console.log("Index of tile clicked: " + index);

        // Verifica se é possivel a movimentação do tile para a esquerda 
        if (index % 3 !== 0) {
            if (!tiles[index - 1]) {
                // Sendo possivel, move o tile para a esquerda
                tiles[index - 1] = this;
                tiles[index] = null;
                movement++;
            }
        }
        // Verifica se é possivel a movimentação do tile para a direita 
        if (index % 3 !== 2) {
            if (!tiles[index + 1]) {
                // Sendo possivel, move o tile para a direita
                tiles[index + 1] = this;
                tiles[index] = null;
                movement++;
            }
        }
        // Verifica se é possivel a movimentação do tile para cima 
        if (index > 2) {
            if (!tiles[index - 3]) {
                // Sendo possivel, move o tile para cima
                tiles[index - 3] = this;
                tiles[index] = null;
                movement++;
            }
        }
        // Verifica se é possivel a movimentação do tile para baixo 
        if (index < 6) {
            if (!tiles[index + 3]) {
                // Sendo possivel, move o tile para baixo
                tiles[index + 3] = this;
                tiles[index] = null;
                movement++;
            }
        }

        render();

        if(checkWin()){
            gameOver();
        }
    }

    function checkWin() {
        for(var i in tiles){
            var a = tiles[i];
            var b = answer[i];

            if(a !== b){
                return false;
            }
        }
        return true;
    }

    function gameOver() {
        overScreen.style.opacity = "1";
        overScreen.style.zIndex = "1";
        setTimeout(function(){
            overScreen.addEventListener("click", startGame, false)
        }, 500);
    }

    function randomSort(oldArray) {
        var newArray;
        var cont = 0;

        do {
            newArray = [];
            while (newArray.length < oldArray.length) {
                var i = Math.floor(Math.random() * oldArray.length);
                if (newArray.indexOf(oldArray[i]) < 0) {
                    newArray.push(oldArray[i]);
                }
            }
            cont++;
            // console.log("Invalid arrays: " + cont);
        } while (!validGame(newArray));

        return newArray;
    }

    function validGame(array) {
        var inversions = 0;
        var len = array.length;

        for (var i = 0; i < len - 1; i++) {
            for (var j = i + 1; j < len; j++) {
                if (array[i] && array[j] && array[i].dataset.value < array[j].dataset.value) {
                    inversions++;
                }
            }
        }
        return inversions % 2 === 0;
    }

    function startGame() {
        tiles = randomSort(tiles);
        this.style.opacity = "0";
        this.style.zIndex = "-1";
        this.removeEventListener("click", startGame, false);

        render();
    }

    init();
}());
