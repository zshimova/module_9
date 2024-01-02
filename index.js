// Переменные
const url = "https://api.thecatapi.com/v1/images/search?limit=10";
const getImgBtn = document.querySelector(".get-img-btn");
const cleanBtn = document.querySelector(".clean-btn");
const wrap = document.querySelector(".wrap");


// Fetch запрос изображений
async function fetchToDo() {
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data) {
            // Встраивание изображений в разметку
            function startLoadingImages() {
                let i = 0;
                const chunkSize = 50;

                function insertImagesChunk() {
                    let end = Math.min(i + chunkSize, data.length);
                    do {
                        let elem = `<img src=${data[i].url}></img>`;
                        wrap.innerHTML += elem;
                        i++;
                    } while (i < end);

                    if (i < data.length) {
                        setTimeout(insertImagesChunk, 0);
                    }
                }

                insertImagesChunk();
            }
            getImgBtn.addEventListener("click", startLoadingImages);
            // Удалить изображения
            const cleanData = () => {
                wrap.innerHTML = "";
            };
            cleanBtn.addEventListener("click", cleanData);
        }
    } catch (error) {
        console.log(error.message);
    } finally {
        console.log('функция отработала')
    };


}
fetchToDo();


// проверка загрузки изображений на скорость
function promiseHandler() {
    let randomNum = Math.random();
    return new Promise((resolve, reject) =>
        setTimeout(function() {
            if (randomNum > 0.5) {
                reject("Неудача");
            } else {
                resolve("Успех!");
            }
        }, 3000)
    );
}

// Loader
function showLoader() {
    document.getElementById("loader").style.display = "flex";
}

function hideLoader() {
    document.getElementById("loader").style.display = "none";
}
document.querySelector(".get-img-btn").addEventListener("click", async() => {
    try {
        showLoader();
        const result = await promiseHandler();
        console.log(result);
    } catch (err) {
        console.log(err);
    } finally {
        hideLoader();
    }
});