const canvas = document.getElementById('pol');
const context = canvas.getContext('2d');
context.width = 500;
context.height = 500;
context.strokeStyle = 'rgba(197, 34, 140, 0.319)';
let score_a = document.getElementById('score');

function getRandomInRange() {
    return Math.floor(Math.random() * ZONE);
}

const ZONE = 10;
class pole {

    restart = ()=>{
        this.width = canvas.width;
        this.height = this.width;
        this.snake_in_pole = []; // y,x
        this.scor = 2;
        score_a.innerText = this.scor - 2;
        this.snake_head = {x:0, y:0};
        this.food = {x: 5, y: 5};
        this.compas = 'r'; // направление right left top bottom
        for(let i = 0; i<ZONE; i++){
            this.snake_in_pole[i] = [];
            for(let j = 0; j < ZONE; j++){
                this.snake_in_pole[i][j] = 0;
            }
        }
    };
    write = ()=>{
        context.clearRect(0, 0, this.width, this.height);
        let step = Math.round(this.width / ZONE);

        context.fillStyle = '#c5228c';
        context.fillRect(this.food.x*step, this.food.y*step, step, step);

        context.fillStyle = '#12607f';
        this.snake_in_pole.forEach((val, ind)=>{
            val.forEach((value, index)=>{
                if(value > 0) context.fillRect(index*step, ind*step, step, step);
            });
        });
        context.fillStyle = '#1e8cb8';
        context.fillRect(this.snake_head.x*step, this.snake_head.y*step, step, step);
        let x = 0, y = 0;
        for(let i = 0; i<ZONE-1; i++){
            x += step;
            context.beginPath();
            context.moveTo(x-0.5,0);
            context.lineTo(x-0.5, this.height);
            context.stroke();

            y += step;
            context.beginPath();
            context.moveTo(0,y-0.5);
            context.lineTo(this.width, y-0.5);
            context.stroke();
        }     
    };
    move = ()=>{
        this.snake_in_pole[this.snake_head.y][this.snake_head.x] = this.scor - 1;
        this.snake_in_pole.forEach((value, index)=>{
            value.forEach((value, index, arr)=>{
                if(value > 0) arr[index] -= 1;
            });
        });
        if(this.compas === 'r') {
            if(this.snake_head.x === ZONE-1){
                this.snake_head.x = 0;
            } else{
                this.snake_head.x += 1;
            }
            if(this.snake_in_pole[this.snake_head.y][this.snake_head.x]) end_game();
            
            return;
        }
        if(this.compas === 'l') {
            if(this.snake_head.x === 0){
                this.snake_head.x = ZONE-1;
            } else{
                this.snake_head.x -= 1;
            }
            if(this.snake_in_pole[this.snake_head.y][this.snake_head.x]) end_game();
            return;
        }
        if(this.compas === 't') {
            if(this.snake_head.y === 0){
                this.snake_head.y = ZONE-1;
            } else{
                this.snake_head.y -= 1;
            }
            if(this.snake_in_pole[this.snake_head.y][this.snake_head.x]) end_game();
            return;
        }
        if(this.compas === 'b') {
            if(this.snake_head.y === ZONE-1){
                this.snake_head.y = 0;
            } else{
                this.snake_head.y += 1;
            }
            if(this.snake_in_pole[this.snake_head.y][this.snake_head.x]) end_game();
            return;
        }
    };
    eating = ()=>{
        if(this.snake_head.x === this.food.x && this.snake_head.y === this.food.y){
            this.food.x = getRandomInRange();
            this.food.y = getRandomInRange();
            while(this.snake_in_pole[this.food.y][this.food.x]){
                this.food.x = getRandomInRange();
                this.food.y = getRandomInRange();
            }
            this.scor++;
            score_a.innerText = this.scor - 2;
        }
    };
}
let end_game = ()=>{
    window.clearInterval(window.animation);
    console.log('end_game');
    
}
let start_game = ()=>{
    game_pole.restart();
    game_pole.write();
    window.animation = setInterval(()=>{
        game_pole.move();
        game_pole.eating();
        game_pole.write();
    }, 500);
}
let game_pole = new pole;

window.onkeydown = (e) => {
    if(e.key === 'ArrowRight' && game_pole.compas !== 'l') return (game_pole.compas = 'r');
    if(e.key === 'ArrowDown' && game_pole.compas !== 't') return (game_pole.compas = 'b');
    if(e.key === 'ArrowLeft' && game_pole.compas !== 'r') return (game_pole.compas = 'l');
    if(e.key === 'ArrowUp' && game_pole.compas !== 'b') return (game_pole.compas = 't');
}

document.getElementById('start').onclick = (e)=>{
    window.clearInterval(window.animation);
    start_game();
}

