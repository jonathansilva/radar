const sonar = document.querySelector('.sonar');

const lines = sonar.querySelector('.lines');
const matrix = sonar.querySelector('.matrix');
const rotary = sonar.querySelector('.rotary');
const button = sonar.querySelector('button');

const circles = [...sonar.querySelectorAll('.circle')];
const persons = [...sonar.querySelectorAll('.person')];

const audio = new Audio('assets/audio/sonar-detector-beeps.wav');
audio.load();

const positions = {
    0: [
        [5, 67],
        [7, 65],
        [21, 63]
    ],
    1: [
        [14, 78],
        [20, 70]
    ],
    2: [
        [18, 78],
        [23, 84]
    ],
    3: [
        [5, 55],
        [14, 79],
        [30, 87]
    ],
    4: [
        [55, 90],
        [60, 90]
    ],
    5: [
        [70, 60],
        [80, 70]
    ],
    6: [
        [80, 30],
        [80, 40]
    ],
    7: [
        [55, 15],
        [58, 15],
        [60, 20]
    ],
    8: [
        [46, 12],
        [50, 10]
    ],
    9: [
        [22, 22],
        [25, 20],
        [30, 10]
    ]
}

const roles = [
    "\"eu codo\"",
    "Coda fofo",
    "Engenheiro de prompt",
    "Low coder",
    "No coder",
    "Vibe coder"
];

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const random = array => {
    return Math.floor(Math.random() * array.length);
}

button.addEventListener('click', e => handle(e));

const handle = async ({ target }) => {
    if (target.tagName === 'P') {
        return;
    }

    target.classList.add('hidden');

    // Inicia animação
    await start();

    // Encerra animação
    await finish();
}

const start = async () => {
    for (let i in circles) {
        await sleep(50);

        circles[i].classList.remove('hidden');
    }

    lines.classList.remove('hidden');

    for (let i in positions) {
        const array = positions[i];

        const index = random(array);

        const [ top, left ] = array[index];

        const person = persons[i];

        if (i == 3) {
            person.classList.add(`move-to-center-${index}`);
        }

        person.style.top = `${top}%`;
        person.style.left = `${left}%`;
    }

    rotary.classList.remove('hidden');

    await sleep(200);

    matrix.classList.add('matrix-background');

    audio.volume = 0.02;
    audio.loop = false;
    audio.play();

    for (let i in persons) {
        await sleep(200);

        persons[i].classList.remove('hidden');
    }

    await sleep(5000);
}

const finish = async () => {
    const woke = sonar.querySelector('.woke');

    const role = woke.querySelector('.role');

    const index = random(roles);

    lines.classList.add('fadeIn-reverse');

    for (let i in persons) {
        if (i == 3) {
            woke.classList.add('zoom');

            role.innerText = roles[index];

            continue;
        }

        persons[i].classList.add('hidden');
    }

    rotary.classList.add('hidden');

    for (let i = circles.length; i--;) {
        await sleep(120);

        circles[i].classList.add('pulse-reverse');
    }

    role.classList.remove('hidden');

    matrix.classList.remove('matrix-background');

    await sleep(5000);

    audio.pause();
}
