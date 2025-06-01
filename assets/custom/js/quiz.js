const QUESTIONS = [
    {
        label: '¿Qué hábito es fundamental para mejorar tu salud financiera a largo plazo?',
        answers: [
            'Crear y seguir un presupuesto mensual',
            'Usar tarjetas de crédito sin límite',
            'Gastar antes de ahorrar',
            'Evitar revisar tus cuentas bancarias',
        ],
    },
    {
        label: '¿Qué estrategia ayuda a reducir el impacto de una inversión fallida?',
        answers: [
            'Invertir en diferentes sectores o productos',
            'Arriesgar todo tu capital en un solo activo',
            'Ignorar la volatilidad del mercado',
            'Depender únicamente de recomendaciones informales',
        ],
    },
    {
        label: '¿Qué describe mejor la importancia del ahorro?',
        answers: [
            'Es una reserva que te protege ante emergencias',
            'Sirve para gastar sin límites en el futuro',
            'Implica evitar cualquier gasto, incluso necesario',
            'Es innecesario si tienes ingresos constantes',
        ],
    },
    {
        label: '¿Cuál es una señal clara de desorganización financiera?',
        answers: [
            'No saber en qué se gasta tu dinero cada mes',
            'Contar con un fondo de emergencia',
            'Registrar tus gastos regularmente',
            'Comparar opciones antes de comprar',
        ],
    },
    {
        label: '¿Qué puede ayudarte a alcanzar tus metas económicas con mayor eficacia?',
        answers: [
            'Definir objetivos específicos y medibles',
            'Esperar a que el dinero llegue por sí solo',
            'Ignorar tus deudas y compromisos',
            'No hacer seguimiento de tu progreso',
        ],
    },
];


const $container = document.getElementById('container');

const startStep = {
    render: () => {
        $container.innerHTML = `
            <div class="container quiz-wrapper">
                <div class="quiz-content">
                    <div class="content">
                        <h2 class="title">Evaluación de Conocimientos Financieros</h2>
                        <h5>Pon a prueba tu entendimiento sobre conceptos esenciales de educación financiera con este cuestionario interactivo y didáctico.</h5>
                        <div class="my-3 icons-wrapper">
                            <span
                                class="fables-iconphone fables-second-text-color pr-2 font-20 mt-1 d-inline-block"
                            ></span>
                            <p
                                class="font-14 fables-fifth-text-color mt-2 ml-4"
                            >
                                +542284425881
                            </p>
                        </div>
                        <div class="my-3 icons-wrapper">
                            <span
                                class="fables-iconemail fables-second-text-color pr-2 font-20 mt-1 d-inline-block"
                            ></span>
                            <p
                                class="font-14 fables-fifth-text-color mt-2 ml-4"
                            >
                                trusted_insight_co@gmail.com
                            </p>
                        </div>
                        <button class="btn btn-primary w-100 py-3 first-button" data-action="startQuiz">Iniciar Cuestionario</button>
                    </div>
                </div>
            </div>
      `;
    },
    onClick: (el) => {
        if (el.getAttribute('data-action') === 'startQuiz') {
            quiz.nextStep(questionsStep);
        }
    },
};

const questionsStep = {
    questionIndex: 0,
    answers: {},
    render: () => {
        const question = QUESTIONS[questionsStep.questionIndex];

        $container.innerHTML = `
          <div class="container quiz-wrapper">
            <div class="quiz-content text-center quiz-start">
                <div class="question-wrapper">
                    <h3 class="question mt-4">${question.label}</h3>
                </div>

                <div class="row answers">
                    ${question.answers
                        .map(
                            (answer, index) =>
                                `
                                <button class="answer border rounded" data-action="selectAnswer" data-answer-index="${index}">
                                    ${answer}
                                </button>
                            `,
                        )
                        .join('')}
                </div>

                <div class="bar-wrapper" style="width: 100%; padding-left: 20px; padding-right: 20px">
                    <div class="progress" style="padding-left: 0 !important; padding-right: 0 !important;">
                        <div class="progress-bar" style="width: ${questionsStep.getProgress()}%"></div>
                    </div>
                </div>
            </div>
        </div>
      `;
    },
    getProgress: () =>
        Math.floor((questionsStep.questionIndex / QUESTIONS.length) * 100),
    onClick: (el) => {
        switch (el.getAttribute('data-action')) {
            case 'goToNextQuestion':
                return questionsStep.goToNextQuestion();
            case 'goToPreviousQuestion':
                return questionsStep.goToPreviousQuestion();
            case 'selectAnswer':
                return questionsStep.selectAnswer(
                    parseInt(el.getAttribute('data-answer-index'), 10),
                );
        }
    },
    goToPreviousQuestion: () => {
        questionsStep.questionIndex -= 1;
        questionsStep.render();
    },
    selectAnswer: (answerIndex) => {
        const question = QUESTIONS[questionsStep.questionIndex];
        const selectedAnswer = question.answers[answerIndex];

        questionsStep.answers = {
            ...questionsStep.answers,
            [question.label]: selectedAnswer,
        };

        if (questionsStep.isFinalQuestion()) {
            questionsStep.completeStep();
        } else {
            questionsStep.goToNextQuestion();
        }
    },
    isFinalQuestion: () => questionsStep.questionIndex === QUESTIONS.length - 1,
    goToNextQuestion: () => {
        questionsStep.questionIndex += 1;
        questionsStep.render();
    },
    completeStep: () => {
        quiz.setAnswers(questionsStep.answers);
        quiz.nextStep(finalStep);
    },
};

//   <h2 class="title">Formulario de contacto financiero</h2>
//   <h3 class="mb-4">Por favor, completa el formulario para recibir tus resultados financieros</h3>

const finalStep = {
    render: () => {
        $container.innerHTML = `
        <div class="container quiz-wrapper">
            <div class="row quiz-content form-content">
                <div class="col-lg-6 col-md-6 col-sm-12 form-block">
                  
                    <form id="quiz-form">
                        <h2 class="title">Formulario de contacto financiero</h2>
                        <input class="form-control" name="name" type="text" placeholder="Nombre" required>
                        <input class="form-control" name="surname" type="text" placeholder="Apellido" required>
                        <input class="form-control" name="email" type="email" placeholder="E-mail" required>
                        <div class="checkbox">
                            <input type="checkbox" required>
                            <label>Estoy de acuerdo con los <a class="form-link" href="terms-of-use.html">términos de uso y la política de privacidad</a></label>
                        </div>
                        <div class="checkbox">
                            <input type="checkbox" checked disabled>
                            <label>Acepto recibir boletines informativos por correo electrónico</label>
                        </div>

                        ${Object.keys(quiz.answers)
                            .map(
                                (question) =>
                                    `<input name="${question}" value="${quiz.answers[question]}" hidden>`,
                            )
                            .join('')}

                        <button type="submit" class="btn btn-primary w-100 py-3 first-button">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
      `;

        // Agrega aquí el manejador de envío del formulario
        document.getElementById('quiz-form').addEventListener('submit', function (e) {
            e.preventDefault(); // evita el envío tradicional del formulario
            localStorage.setItem('quizDone', true);
            window.location.href = 'thanks.html';
        });
    },

    // Ya no necesitas esto si no se usa en ningún sitio:
    onClick: (el) => {
        const newPath = 'thanks.html';
        if (el.getAttribute('data-action') === 'submitAnswers') {
            localStorage.setItem('quizDone', true);
            document.getElementById('main-page').classList.remove('hide');
            document.getElementById('quiz-page').classList.add('hide');
            document.getElementById('footer').classList.add('hide');
            window.location.href = newPath;
        }
    },
};

const quiz = {
    activeStep: startStep,
    answers: {},
    clear: () => ($container.innerHTML = ''),
    init: () => {
        $container.addEventListener('click', (event) =>
            quiz.activeStep.onClick(event.target),
        );
        $container.addEventListener('submit', (event) =>
            event.preventDefault(),
        );
    },
    render: () => {
        quiz.clear();
        quiz.activeStep.render();
    },
    nextStep: (step) => {
        quiz.activeStep = step;
        quiz.render();
    },
    setAnswers: (answers) => (quiz.answers = answers),
};

if (!localStorage.getItem('quizDone')) {
    document.getElementById('main-page').classList.add('hide');
    quiz.init();
    quiz.render();
}
