//Tema Dark ou White dinâmica
document.querySelector('.theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    
    const button = document.querySelector('.theme-toggle');
    button.textContent = document.body.classList.contains('dark-theme') ? 'Tema Claro' : 'Tema Escuro';
  });
  
  // Inicializa o texto do botão de tema
  document.querySelector('.theme-toggle').textContent = 'Tema Claro';



  const currentPlayer = document.querySelector(".currentPlayer");
  const myAlert = document.getElementById('myAlert'); // Seleciona o alerta


  let selected;
  let player = "X";

  let winnerpositions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
    ];

    function init(){
        selected = [];

        currentPlayer.innerHTML = `VEZ DE: ${player}`;

        document.querySelectorAll(".game button").forEach((item) => {
            item.innerHTML = '';
            item.addEventListener("click", newMove);


        });

        document.querySelector(".reset-button").addEventListener("click", function() {
            init();  // Reinicia o jogo
        });
        
    }

    init()  

    function newMove(event) {
    
        const index = event.target.getAttribute("data-i");
        event.target.innerHTML = player;
        event.target.removeEventListener("click", newMove);
        selected[index] = player;

        setTimeout(() => {
            check();
        }, [100])

        player = player === "X" ? "O" : "X";
        playerFront = player = "X" ?  "Player 1" : "Player 2"

        currentPlayer.innerHTML = `VEZ DE: ${player}`;

    }

    function check(){

      let Lastplayer = player === "X" ? "O" : "X";

        const items = selected
        .map((item, i) => [item, i])
        .filter((item) => item[0] === Lastplayer)
        .map((item) => item[1]);

        for (position of winnerpositions) {

            if(position.every((item) => items.includes(item))) {
                showAlert(`O Jogador '${Lastplayer}' venceu!!!`);
                init();
                return;
            }
        }

        if (selected.filter((item) => item).length === 9) {
            showAlert("Deu velha!");
            init();
            return;
        }
    }

    function showAlert(message) {
    myAlert.innerHTML = message;
    myAlert.style.display = 'block';  // Exibe o alerta

    setTimeout(() => {
        myAlert.style.display = 'none';  // Oculta o alerta
      }, 3000);
    
    }

   