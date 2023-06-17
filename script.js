let btnStart = document.querySelector('.btn-start');
let banner = document.querySelector('.wrapper__banner');
let gameContainer = document.querySelector('.wrapper__game');

let player = new Audio();
player.volume = .4;
let failSound = 'media/fail.mp3';
let nlo = 'media/nlo.mp3';

function playSound(sound) {
player.src = sound;
player.play();
}

btnStart.addEventListener('click', function(e){
    banner.classList.add('active');
    startGame();
});

let state = {}

function startGame() {
  state = {}
  makeMove(1)
}

function makeMove(id){
    const textNode = textNodes.find(textNode => textNode.id === id);
     newNode(textNode);
}



function newNode(node){
    let game = document.querySelector('.game');
    if(game){
        game.classList.add('last');
    }
    setTimeout(()=>{
        gameContainer.innerHTML= '';
    }, 300)
    

    let newGame = document.createElement('div');
    newGame.className='game';
    let newTitle = document.createElement('h2');
    newTitle.className='game__title';
    newTitle.textContent = `Хід ${node.count}`;
    let newText = document.createElement('h3');
    newText.className = 'game__text';
    newText.textContent = node.text;
    let newOptions = document.createElement('div');
    newOptions.className = 'game__grid';
   

    node.options.forEach(option => {
        if(showOption(option)){
          let btn = document.createElement('button');
          btn.classList.add('game__option');
          btn.textContent = option.text; 
          btn.addEventListener('click', () => selectOption(option));
          newOptions.append(btn);
        }
       
    });
    newGame.append(newTitle);
    newGame.append(newText);
    if(node.img){
        let img = document.createElement('img');
        img.classList.add('game__img');
        img.src=node.img;
        newGame.append(img);
    } 

    newGame.append(newOptions);

    setTimeout(()=>{
        gameContainer.append(newGame);
    }, 450)
    setTimeout(()=>{
        newGame.classList.add('active');
    }, 800)

}

function selectOption(option){
    let id = option.nextText;
    if(id<0) playSound(failSound);
    else if(id!==1)playSound(nlo);
    if(id==-4){
      banner.classList.remove('active');
    } else{
      state = Object.assign(state, option.setState)
    if(id<0) state = {}; 
    makeMove(id);
    }
    
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

const textNodes = [
    {
      id: 1,
      count: 'Перший',
      text: 'Ти народилася. Яке перше слово?',
      img: 'media/05.jpg',
      options: [
        {
          text: 'Музика!',
          nextText: 2
        },
        {
          text: 'Зелена-зелена трава',
          nextText: 2
        },
        {
            text: 'Ніяка я не мила. Мех',
            nextText: 2
          },
          {
            text: 'Ммм... Шоколад',
            nextText: 2
          },
      ]
    },
    {
      id: 2,
      count: 'Другий',
      text: 'Ну, там усі відповіді були правильні. Тепер буде серйозно. Хто ти?',
      img: 'media/04.jpg',
      options: [
        {
          text: 'Не мила істота',
          nextText: -1
        },
        {
          text: 'Нявка',
          nextText: 3
        },
        {
          text: "Стерв'ятник",
          nextText: -1
        }
      ]
    },
    {
      id: -1,
      count: 'Завершився...',
      text: 'Ти - не Ксеня',
      img: 'media/03.jpg',
      options: [
        {
          text: 'НЕ ВІРЮ!',
          nextText: -2,
        },
      ]
    },
    {
      id: -2,
      count: 'Таки завершився...',
      text: 'Вибач, але ти мила, як Сімба з квіточкою',
      img: 'media/simba.jpg',
      options: [
        {
          text: 'Почати знову',
          nextText: 1,
        },
      ]
    },
    {
      id: 3,
      count: 'Третій',
      text: 'Тобі приснилося, що додому прийшов важливий лист',
      options: [
        {
          text: 'Ой, піду розбуджу домашніх. Це ж не просто так!',
          nextText: 4
        },
        {
          text: 'Та, це неважливо. Буду спати далі. Сни - це лише сни',
          nextText: -2
        }
      ]
    },
    {
      id: 4,
      count: 'Четвертий',
      text: "Ти б'єшся гілляками у двобої. Ти перемагаєш. Твої дії",
      options: [
        {
          text: "Гірко заплачу й пам'ятатиму це дуже довго",
          nextText: 5
        },
        {
          text: 'Я - кровожерлива. Ніяко жалю тюхтіям!',
          nextText: -1
        }
      ]
    },
    {
      id: -3,
      count: 'Завершився',
      text: 'На жаль, ти стала екстраверткою. І сердечко не витримало...',
      img: 'media/03.jpg',
      options: [
        {
          text: 'Почати знову',
          nextText: 1
        }
      ]
    },
    {
      id: 5,
      count: "П'ятий",
      text: "Ти зустріла голуба, який страждає",
      options: [
        { 
          text: 'Піду собі повз',
          nextText: -1
        },
        {
          text: 'Принесу це біднятко додому, щоб потурбуватися про нього',
          nextText: 6
        },
      ]
    },
    {
      id: 6,
      count: "Шостий",
      text: 'Тобі стало нудно. Що ти зробиш?',
      options: [
        {
          text: 'Завантажу Slowly, щоб листуватися',
          setState: {slowly: true},
          nextText: 7
        },
        {
          text: "Набридло бути розумною, завантажу тік-ток",
          nextText: 7,
          setState: {tik_tok: true},
        },
        {
          text: "Піду помалюю щось на асфальті крейдою",
          nextText: 7,
          setState: {chalk: true},
        },
      ]
    },
    {
      id: 7,
      count: "Сьомий",
      text: 'А далі що?',
      options: [
        {
          text: 'Мені пише якийсь маніяк... Треба би відписати',
          nextText: 8,
          requiredState: currentState=> currentState.slowly,
        },
        {
          text: 'Ммм... Тік-ток класний. Стану зіркою...',
          nextText: -3,
          requiredState: currentState=> currentState.tik_tok,
        },
        {
          text: 'Я буду художницею!',
          nextText: 9,
          requiredState: currentState=> currentState.chalk,
        },
        {
          text: 'Буду шукати щось красиве і цікаве. Може книгу про одноденок напишу.',
          nextText: 10,
        },
      ]
    },
    {
      id: 8,
      count: "Восьмий",
      text: 'Фух. Пронесло. Найгірше, що може статися, - мені відправлять коробку. Я жива',
      options: [
        {
          text: 'Продовжити спілкуватися',
          nextText: 11,
        },
        {
          text: 'Не продовжити спілкуватися',
          nextText: 12,
        }
      ]
    },
    {
      id: 9,
      count: "Восьмий",
      text: 'Тобі вдалося. Усі заглядаються на асфальтові графіті.',
      options: [
        {
          text: 'Уря! Буду жити довго і щасливо, а ще кольорово',
          nextText: 13,
        },
      ]
    },
    {
      id: 10,
      count: "Восьмий",
      text: 'В тебе завжди це вдавалося.',
      options: [
        {
          text: 'Уря! Буду жити довго і щасливо... і писати книги про одноденок і не тільки',
          nextText: 13,
        },
      ]
    },
    {
      id: 12,
      count: "Дев'ятий",
      text: "Не думаю, що ти щось втратила",
      options: [
        {
          text: 'І я так не думаю. Піду в ліс погуляю',
          nextText: 13,
        },
        {
          text: 'Давно не дивилася серіали щось',
          nextText: 13,
        },
      ]
    },
    {
      id: 11,
      count: "Дев'ятий",
      text: "В тебе з'явилися дивні стосунки. Може навіть про це зроблять гру..",
      options: [
        {
          text: 'Ну, буду якось жити',
          nextText: 13,
        },
      ]
    },
    {
      id: 13,
      count: "Десятий",
      text: "Радий, що ти є. Сподіваюся, було цікаво",
      options: [
        {
          text: 'Фу, який ти приторний',
          nextText: 14,
        },
        {
          text: 'І ніяка я не мила',
          nextText: 14,
        },

      ]
    },
    {
      id: 14,
      count: "Завершився",
      text: "Ну, це все, що я можу сказати:",
      img: 'media/08.jpg',
      options: [
        {
          text: 'Почати знову?',
          nextText: 1,
        },
      ]
    },
    

  ]


