function countdown() {
    const targetDate = new Date('2024-12-04T08:30:00-03:00'); // Horário de Brasília (GMT-3)
    const now = new Date();
    const difference = targetDate - now;


    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (difference <= 0) {
        document.getElementById("time").innerHTML =
            `
           <div id="tm">
                <h1 id="cdays">00</h1>
                <h5>Dias</h5>
            </div>
            <div id="tm">
                <h1 id="chours">00</h1>
                <h5>Horas</h5>
            </div>
            <div id="tm">
                <h1 id="cminutes">00</h1>
                <h5>Minutos</h5>
            </div>
            <div id="tm">
                <h1 id="cseconds">00</h1>
                <h5>Segundos</h5>
           `
        return
    }

    document.getElementById("time").innerHTML =
        `
           <div id="tm">
                <h1 id="cdays">${days}</h1>
                <h5>Dias</h5>
            </div>
            <div id="tm">
                <h1 id="chours">${hours}</h1>
                <h5>Horas</h5>
            </div>
            <div id="tm">
                <h1 id="cminutes">${minutes}</h1>
                <h5>Minutos</h5>
            </div>
            <div id="tm">
                <h1 id="cseconds">${seconds}</h1>
                <h5>Segundos</h5>
            </div>
        `
}

setInterval(countdown, 1000);


const table = document.querySelectorAll("#item.item")
const table_elements = document.querySelectorAll("#elements.items")

table.forEach((element, index) => {
    element.addEventListener("click", (e) => {
        table.forEach((_element, index_) => {
            _element.classList.remove("active")
            if (index === index_) {
                _element.classList.add("active")
            }


            table_elements.forEach((_el, _i) => {

                _el.classList.remove("active")
                if (index === _i) {
                    _el.children[0].children[1].classList.add("active")
                    
                    _el.classList.add("active")
                }
            })
        })
    })
})

const table_element = document.querySelectorAll("#element.item")

table_element.forEach((element, key) => {
    element.addEventListener("click", (e) => {
        // console.log(e, key, element);
        table_element.forEach((element_) => {
            element_.childNodes[3].classList.remove("active")
        })
        table_element[key].childNodes[3].classList.add("active")
        
        
    })
})