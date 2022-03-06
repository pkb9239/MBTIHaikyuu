const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const endPoint = 12;

function addAnswer(answerText, qIdx) {
    const a = document.querySelector(".aBox");
    const answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-2');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click", function() {
        const childern = document.querySelectorAll(".answerList");
        for (let i = 0; i < childern.length; i++) {
            childern[i].disabled = true;
            childern[i].style.WekitAnimation = "fadeOut 0.5s";
            childern[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
            for (let i = 0; i < childern.length; i++) {
                childern[i].style.display = "none";
            }
        goNext(++qIdx);
        }, 450);
    });
}

function goNext(qIdx) {
    const q = document.querySelector(".qBox");
    q.innerHTML = qnaList[qIdx].q; 
    for (let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx);
    }
    const status = document.querySelector('.statusBar');
    status.style.width = (100 / endPoint) * (qIdx + 1) + '%';
}


function begin() {
    main.style.WekitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(() => {
        qna.style.WekitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450);
        let qIdx = 0;
        goNext(qIdx);
    }, 450);
}