const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0];

function calResult() {
    const result = select.indexOf(Math.max(...select)); //indexOf는 인덱스값을 반환함 Math.max로 인해 최대값반환함
    return result;
}

function setResult() {
    let point = calResult();
    const $resultName = document.querySelector('.resultName');
    $resultName.innerHTML = infoList[point].name;

    const resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    const imgURL = 'img/image-'+point+'.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}   

function goResult() {
    qna.style.WekitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(() => {
        result.style.WekitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)});
        setResult();
}

function addAnswer(answerText, qIdx, idx) {
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
            const target = qnaList[qIdx].a[idx].type; //target에 첫번쨰 질문에대한 대답이 담김
            for (let i = 0; i < target.length; i++) {
                select[target[i]] += 1; 
            }
            for (let i = 0; i < childern.length; i++) {
                childern[i].style.display = "none";
            }
        goNext(++qIdx);
        }, 450);
    });
}

function goNext(qIdx) {
    if (qIdx+1=== endPoint) {
        goResult();
        return;
    }
    const q = document.querySelector(".qBox");
    q.innerHTML = qnaList[qIdx].q; 
    for (let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
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