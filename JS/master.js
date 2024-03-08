        // show setting box 
let gear = document.getElementById("gear");
// to make gear spin
let spin = document.getElementsByClassName("gear")[0];
let settingBox = document.getElementById("settings")

// add class open to the gear icon and class spin 
// class open opens the setting sectoin 
gear.addEventListener("click", _=>{
    settingBox.classList.toggle("open")
    spin.classList.toggle("fa-spin")
})

    // Sectoin: change the web color

let colorLis = document.querySelectorAll(".color-list li");

// check local storge
if (localStorage.getItem("colorWeb")){
    document.documentElement.style.setProperty(`--mineColor`, localStorage.getItem("colorWeb"))
    // remove active class form all and add to color in local storge
    colorLis.forEach(li =>{
            li.classList.remove("active")
            // give class active
            if(li.dataset.color === localStorage.getItem("colorWeb")){
                li.classList.add("active")
            }
        })
}
// loop for all eles
colorLis.forEach(li => {
    li.addEventListener("click", (e) =>{
        // change the main color from :rood
        document.documentElement.style.setProperty(`--mineColor`, e.target.dataset.color)
        // set color in local storge
        window.localStorage.setItem("colorWeb" , e.target.dataset.color)
        // add and remve active class to Lis
        colorLis.forEach(li =>{
            li.classList.remove("active")
        })
        e.target.classList.toggle("active")
    })
})


    //Sectoin: change font Size
let rangeSize = document.getElementById("rangeSize")
rangeSize.value = 17

// check in local storge
if(localStorage.getItem("fontSize")){
    // change font from root
    document.documentElement.style.setProperty("--fontSize", localStorage.getItem("fontSize"));
    // give the value's range 
    rangeSize.value = localStorage.getItem("fontSize").slice(0,-2)
}

// if range change, change the font size
rangeSize.addEventListener("input", _=>{
    document.documentElement.style.setProperty("--fontSize", `${rangeSize.value}px`);
    // save in local storge
    localStorage.setItem("fontSize", `${rangeSize.value}px`)
})


    // Sectoin: optoin change background
let optoinsBack = document.querySelectorAll(`.options span`)
// this var use for optoin if the option yes = true
let changing = true;
// this var use to put set interval the background
let backInterval;

// check the local Storage
if (localStorage.getItem("optoinBack")){ 
    optoinsBack.forEach(ele => {
            // remove class active from all eles
            ele.classList.remove("active")
            // ckeck if the option in local storge
            if(localStorage.getItem("optoinBack") === "yes"){
                if(ele.classList.contains("yes")){
                    ele.classList.add("active")
                }
            }else{
                // the backgroumd change false
                changing = false
                // stop changing backgroun
                // give class active
                clearInterval(backInterval)
                if(ele.classList.contains("no")){
                    ele.classList.add("active")
                }
            }
        })
}

//add and remove class active from yes or no optoin
optoinsBack.forEach(ele =>{
    ele.addEventListener("click", _=>{
        optoinsBack.forEach(ele => {
            // remove class active from all eles
            ele.classList.remove("active")
        })
        // add class active to clicked ele
        ele.classList.add("active")

        // if yes back ground change
        if(ele.dataset.optoin === "yes"){
            changing = true
            // function change background
            localStorage.setItem("optoinBack", ele.dataset.optoin)
        }else{
            changing = false
            // stop changing background
            clearInterval(backInterval)
            localStorage.setItem("optoinBack", ele.dataset.optoin)
        }
    })
})


    // choose background
let chooseBack = document.querySelectorAll(`ul.chooseBack li`);
let header = document.getElementById("header");

// check local storge 
if(! changing || localStorage.getItem("optoinBack") === "no"){
    if(localStorage.getItem("chooseBack")){
        // change the back ground
        header.style.backgroundImage = localStorage.getItem("chooseBack")
        // give class active to same back ground in screen 
        chooseBack.forEach(ele =>{
            if(localStorage.getItem("chooseBack")[11] == ele.dataset.img){
                ele.classList.add("active")
            }
        })
    }
}
// if the optoin = yes remove class active from all
if(localStorage.getItem("optoinBack")){
    if(localStorage.getItem("optoinBack") === "yes"){    
        chooseBack.forEach(ele =>{
        ele.classList.remove("active")
        })
    }else{
        chooseBack[--(header.style.backgroundImage[11])].classList.add("active")
    }
}


// add class active if optoin = no and remove it if = yes 
optoinsBack.forEach(ele =>{
    ele.addEventListener("click", ()=>{
        if(ele.dataset.optoin === "yes"){
            chooseBack.forEach(ele =>{
                ele.classList.remove("active")
            })
        }else{
            chooseBack[--(header.style.backgroundImage[11])].classList.add("active")
        }
    })
})

chooseBack.forEach(ele =>{
    ele.addEventListener("click", () => {
        if (changing == false){
                header.style.backgroundImage = `url("/imgs/${ele.dataset.img}.jpg")`
                localStorage.setItem("chooseBack" , `url("/imgs/${ele.dataset.img}.jpg")`)

                chooseBack.forEach(ele =>{
                    ele.classList.remove("active")
                })
                ele.classList.add("active")
        }
    })
})


    // start bullets and nav  
let bullets = document.querySelectorAll(`.bullet`)
let nav = document.querySelectorAll(`nav li a`)

// move between sectoin by any Ele
function moveBetweenSec(ElementS){
    ElementS.forEach(Element => {
    Element.addEventListener("click", e =>{
        e.preventDefault()
        // if click on the Element will take you to the sectoin
        document.querySelector(Element.dataset.sec).scrollIntoView({
            behavior: "smooth"
        })
    })
})
}

// move between sectoin by bullets
moveBetweenSec(bullets)
// move between sectoin by nav
moveBetweenSec(nav)


    // setting-box option if you bullets or not
let optoinsBull = document.querySelectorAll(`.options-bull span`)
let bullParent = document.querySelector(`.bullets`)

// check the localStorge

if (localStorage.getItem("optoinsBull")){
    bullParent.style.display = localStorage.getItem("optoinsBull")
    optoinsBull.forEach(ele => {
        // remove class active from all eles
        ele.classList.remove("active")
    })
    if (localStorage.getItem("optoinsBull") == "flex"){
        optoinsBull[0].classList.add("active")
    }else{
        optoinsBull[1].classList.add("active")
    }
}

// add and remove class active and hide the bullets 
optoinsBull.forEach(ele =>{
    ele.addEventListener("click", _=>{
        optoinsBull.forEach(ele => {
            // remove class active from all eles
            ele.classList.remove("active")
        })
        // add class active to clicked ele
        ele.classList.add("active")
        // if no the bullets will hide
        if(ele.dataset.optoin === "yes"){
            bullParent.style.display = "flex"
            localStorage.setItem("optoinsBull", "flex")

        }else{
            bullParent.style.display = "none"
            localStorage.setItem("optoinsBull", "none")
    }
    })
})



//add and remove class active from yes or no optoin

optoinsBack.forEach(ele =>{
    ele.addEventListener("click", _=>{
        optoinsBack.forEach(ele => {
            // remove class active from all eles
            ele.classList.remove("active")
        })
        // add class active to clicked ele
        ele.classList.add("active")

        // if yes back ground change
        if(ele.dataset.optoin === "yes"){
            changing = true
            // function change background
            changeBackground()
            localStorage.setItem("optoinBack", ele.dataset.optoin)
        }else{
            changing = false
            // stop changing background
            clearInterval(backInterval)
            localStorage.setItem("optoinBack", ele.dataset.optoin)
    }
    })
})


    // Rest optoin
document.querySelector(`#rest button`).onclick = function(){
    localStorage.clear()
    window.location.reload()
}

    // to top button 
let toTop = document.querySelector(".to-top")

toTop.addEventListener("click", _=>{
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
})

window.addEventListener("scroll", _=> {
    if(this.pageYOffset >= document.querySelector(".about-sec").offsetTop){
        toTop.style.display = "block"
    }else{
        toTop.style.display = "none"
    }
})


// ########################
// ########################


        // show manu for small screens
let manu = document.querySelector(".icon-manu");
let links = document.getElementById("links");

manu.addEventListener("click", _ => {
    // add and remve open class to links
    links.classList.toggle("open")
    // show cancel icon and hide manu icon onclick
    manu.classList.toggle("show")
})

        // change background
// add the imgs in list
let imgs = ["1.jpg" , "2.jpg", "3.jpg", "4.jpg"];

// check local storge 
if(localStorage.getItem("backgroundImage")){
    if(localStorage.getItem("optoinBack") === "yes"){
        header.style.backgroundImage = localStorage.getItem("backgroundImage")
    }
}
// change the back ground image after 8s

function changeBackground(){
    if(changing){
        backInterval = setInterval(() => {
        let randomNum = Math.floor(Math.random() * imgs.length + 1);

        header.style.backgroundImage = `url("/imgs/${randomNum}.jpg")`

        // save the current img in local storge
        localStorage.setItem("backgroundImage", `url("/imgs/${randomNum}.jpg")`)
    },8000)
    }
}
changeBackground()



// #########################

// skilles sectoin 
let skills = document.querySelector(`.skill-sec`);
// if we reach to sectoin the width will fall
window.onscroll = function(){
    // get skills Offset Top
    let skillsOffsetTop = skills.offsetTop;
    // get skills Outer Height
    let skillsOuterHeight = skills.offsetHeight;
    // get window Height
    let windowHeight = this.innerHeight;
    // get window Height
    let windowScrollTop = this.pageYOffset;
    // if we reach to sectoin the width will fall
    if ((windowScrollTop + 200) > (skillsOffsetTop + skillsOuterHeight - windowHeight)){
        let spanskill = document.querySelectorAll(`.skill-progress span`);
        spanskill.forEach(skill =>{
            skill.style.width = `${skill.dataset.pro}%`
        })
    }
}

// ########################

// gallery sectoin 
let galleryImgs = document.querySelectorAll(`.gallery-sec .img-gall`)

galleryImgs.forEach(ele => {
    ele.addEventListener("click", () => {
        // creat overlay Element
        let overlay = document.createElement(`div`);
        // add class to overlay
        overlay.className = "overlay-popup";
        // add to body
        document.body.appendChild(overlay);
        // create the popup
        let popupBox = document.createElement("div");
        // add class to popup-box
        popupBox.className = `popup-box`

        // if the alt in the ELE will be show
        if(ele.firstElementChild.alt !== null){
            // creat alt to H3
            let altText = document.createElement(`h3`)
            altText.className = `alt-text`
            altText.textContent = ele.firstElementChild.alt
            // append to popup-box
            popupBox.appendChild(altText)
        }

        // create the img Element
        let imgEle = document.createElement("img")
        // append the src img
        imgEle.src = ele.firstElementChild.src
        // imgEle append to popup Box 
        popupBox.appendChild(imgEle)
        // popup Box append to overlay
        overlay.appendChild(popupBox)
        // create cancel button
        let cancelBtn = document.createElement(`span`)
        cancelBtn.textContent = `X`
        cancelBtn.className = `cancel-Btn`
        // append to popup-box
        popupBox.appendChild(cancelBtn)
    })
})

document.addEventListener("click", (e) => {
    if(e.target.className === "cancel-Btn"){
        e.target.parentElement.parentElement.remove()
    }
})


