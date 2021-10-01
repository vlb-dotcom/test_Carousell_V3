let tokenUrl = 'https://accounts.zoho.com/oauth/v2/token?refresh_token=1000.7b3877758eee5d19902f66c591ef1563.df24ebfe89662ed0c0a16019cd3a47c2&client_id=1000.09ODQ6CRGHXKVMSA0EHHWG29LJ9HPK&client_secret=6e7e8c803f4ad6b0e089df99ea9336f36a4309b389&grant_type=refresh_token'

// Receive data from chatbot
function onChatBotReady() {
    var btnName = BotStarWebview('getParameter', 'buttonName');
    let zToken = BotStarWebview('getParameter', 'zohoToken')

    fetchZohoData(zToken)
}

function fetchZohoData(z_token) {
    console.log(z_token)

    fetch('https://creator.zoho.com/api/v2/denniscsanjuan/chatbuddyportal/report/typedb', {
        mode: 'cors',
        headers: { 
            'Authorization': z_token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
    })
        .then(res => console.log(res.json()))
        .then(json => console.log(json));
}


// fetch data from api
async function fetchData() {
    const res = await fetch('https://usesql.com/sql?query=SELECT%20*%20FROM%20%22https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1oN7KAyLuBEMziI5KlDBvVneA6LZEzpOmptVU7mobefM%2Fedit%23gid%3D0%22%0AORDER%20BY%20Title%20ASC&format=json&key=KKFX4GliUTO8a4vecESd')
    const items = await res.json()

    // renderData(items)
    TestReverseTitle(items)
    RenderByPage()
}

function filterOut() {
    let divs = document.getElementsByClassName('item-layout')

    let searchBox = document.querySelector('.search-input').value
    // console.log(searchBox)

    for (let i = 0; i < divs.length; i++) {
        let divTitle = divs[i].lastChild.id.toLowerCase()

        if (divTitle.includes(searchBox.toLowerCase())) {
            // divs[i].classList.add('visible')
            divs[i].classList.remove('hidden')
            // RenderByPage()
        } else {
            divs[i].classList.add('hidden')
            // divs[i].classList.remove('visible')
            // RenderByPage()
        }

        if (searchBox.length <= 1) {
            RenderByPage()
        }

    }
}

// Sort Data Functionality
async function TestReverseTitle(items) {
    let tempItems = []
    let titleArr = []
    items.map(item => {
        // if(item.Title !== "infamous First Light"){

        //     titleArr.push(item.Title)
        //     console.log(item.Title)
        // }
        titleArr.push(item.Title)
    })

    for (let i = 0; i <= titleArr.length; i++) {
        title_m = titleArr[i]

        items.map(item => {
            if (title_m == items[i]) {
                tempItems.push(item)
            }

        })
    }

    renderData(tempItems)

    let elSort = document.querySelector(".fa-select")

    elSort.addEventListener("change", () => {
        let divDefault = document.getElementsByClassName("item-layout")
        const normTemp = tempItems

        switch (elSort.value) {
            case "asc" || "default":

                for (let i = 0; i < divDefault.length; i++) {
                    divDefault[i].classList.add("div-hidden")
                }

                // remove el with div-hidden
                for (let i = 0; i < divDefault.length; i++) {
                    // divDefault[i].classList.add("div-hidden")
                    if (divDefault[i].classList.contains("div-hidden")) {
                        divDefault[i].remove()
                    }
                }

                // console.log(normTemp)
                renderData(tempItems.reverse())
                for (let i = 0; i < divDefault.length; i++) {
                    // divDefault[i].classList.add("div-hidden")
                    if (divDefault[i].classList.contains("div-hidden")) {
                        divDefault[i].remove()
                    }
                }
                // filterOut()
                RenderByPage()
                break

            case "des":

                for (let i = 0; i < divDefault.length; i++) {
                    divDefault[i].classList.add("div-hidden")
                }

                // remove el with div-hidden
                for (let i = 0; i < divDefault.length; i++) {
                    // divDefault[i].classList.add("div-hidden")
                    if (divDefault[i].classList.contains("div-hidden")) {
                        divDefault[i].remove()
                    }
                }

                let normTempV = normTemp.reverse()
                renderData(normTempV)
                // remove el with div-hidden
                for (let i = 0; i < divDefault.length; i++) {
                    // normTempV[i].classList.add("div-hidden")
                    // console.log(divDefault[i].firstElementChild.lastChild.id)

                    if (divDefault[i].firstElementChild.lastChild.id.includes("infamous First Light")) {
                        divDefault[i].classList.add("hidden")
                    }
                }
                // remove el with div-hidden
                for (let i = 0; i < divDefault.length; i++) {
                    // divDefault[i].classList.add("div-hidden")
                    if (divDefault[i].classList.contains("div-hidden")) {
                        divDefault[i].remove()
                    }
                }
                // filterOut()
                RenderByPage()
                break
        }
    })

    totalItems()
}

// count total items
function totalItems() {
    let divs = document.getElementsByClassName("item-layout")
    pageRender(divs.length)

    return divs
}

function renderData(items) {

    let counterID = 0

    items.map(item => {

        counterID++
        // console.log(counterID)
        let layout = document.querySelector('.layout')

        let mainLayout = document.querySelector('.main')

        let newItemLayout = document.createElement('div')
        newItemLayout.classList.add('item-layout')

        let newItemContent = document.createElement('div')
        newItemContent.classList.add('item-content')

        let newItemImg = document.createElement('img')
        newItemImg.src = item.Image_URL

        let newItemTitle = document.createElement('h4')
        newItemTitle.textContent = item.Title
        newItemTitle.classList.add('item-text')
        newItemTitle.setAttribute('id', `${item.Title}-${counterID}`)

        // let newItemPrice = document.createElement('h4')
        // newItemPrice.textContent = item.Display_Price
        // newItemPrice.classList.add('item-text')

        let newBtnSell = document.createElement('button')
        newBtnSell.textContent = 'Sell'
        newBtnSell.classList.add('btn-sell')
        newBtnSell.setAttribute('onClick', 'getId(this)')
        // newBtnSell.setAttribute('onClick', 'sendResponse(this)')
        newBtnSell.setAttribute('id', `${item.Title}`)


        // append
        layout.appendChild(mainLayout)
        mainLayout.appendChild(newItemLayout)
        newItemLayout.appendChild(newItemContent)
        newItemContent.appendChild(newItemImg)
        newItemContent.appendChild(newItemTitle)
        // newItemContent.appendChild(newItemPrice)
        newItemLayout.appendChild(newBtnSell)

        // console.log(item.Title)

    })
}

// render pagination
function pageRender(total) {
    let totalItems = total
    let totalpages = Math.ceil(totalItems / 10)

    let pageIndexDiv = document.querySelector(".pagination-indexes")

    // console.log(totalpages)

    for (let i = 1; i <= totalpages; i++) {
        // console.log(i)
        // create element pages
        let pageNum = document.createElement('label')
        pageNum.textContent = i
        pageNum.classList.add('nav-page-num')
        pageNum.classList.add('pages')
        pageNum.setAttribute('id', `page-${i}`)
        // pageNum.classList.add(`page-${i}`)
        pageNum.setAttribute('onClick', 'pageClick(this)')
        // append page
        pageIndexDiv.appendChild(pageNum)
    }

    document.querySelector("#page-1").classList.add("selected-page")


}

var pagesNum = document.getElementsByClassName('nav-page-num')
console.log(pagesNum)

function pageClick(btnPage) {

    for (let i = 0; i < pagesNum.length; i++) {
        // console.log(pagesNum[i])
        if (pagesNum[i].classList.contains("selected-page")) {
            pagesNum[i].classList.remove('selected-page')
        }
        // pagesNum[i].classList.remove('selected-page')
    }
    btnPage.classList.add('selected-page')
    RenderByPage()
}

function pageLeftArrowClick() {
    let currentSelectedPage = document.querySelector(".selected-page")
    let currPageID = currentSelectedPage.id
    // console.log(currentSelectedPage.id)
    let numId = currPageID.substring(5)
    // console.log(currentSelectedPage.id)
    // remove current selected page class
    if (numId > 1) {
        let pageNum = parseInt(numId) - 1
        for (let i = 0; i < pagesNum.length; i++) {
            // console.log(pagesNum[i])
            if (pagesNum[i].classList.contains("selected-page")) {
                pagesNum[i].classList.remove('selected-page')
            }
            // pagesNum[i].classList.remove('selected-page')
        }

        document.querySelector(`#page-${pageNum}`).classList.add("selected-page")
    }
    RenderByPage()

}

function pageRightArrowClick() {
    let currentSelectedPage = document.querySelector(".selected-page")
    let currPageID = currentSelectedPage.id
    // console.log(currentSelectedPage.id)
    let numId = currPageID.substring(5)
    let pageNum = parseInt(numId) + 1

    if (numId < 25) {
        // remove current selected page class
        for (let i = 0; i < pagesNum.length; i++) {
            // console.log(pagesNum[i])
            if (pagesNum[i].classList.contains("selected-page")) {
                pagesNum[i].classList.remove('selected-page')
            }
            // pagesNum[i].classList.remove('selected-page')
        }
        document.querySelector(`#page-${pageNum}`).classList.add("selected-page")
    }
    RenderByPage()
}

function RenderByPage() {
    let divs = document.getElementsByClassName("item-layout")
    let divsFiltered = []

    for (let i = 0; i < divs.length; i++) {
        // console.log(divs[i].lastChild.id)
        // console.log(i)
        // if(!divs[i].classList.contains("div-hidden") && divs[i].lastChild.id !== "infamous First Light"){
        //     divsFiltered.push(divs[i])
        // }
        if (!divs[i].classList.contains("div-hidden")) {
            divsFiltered.push(divs[i])
        }
    }

    // console.log(divsFiltered.length)

    let currentSelectedPage = document.querySelector(".selected-page")
    let currPageID = currentSelectedPage.id
    let numId = currPageID.substring(5)

    let startNum = numId * 10 - 10
    let endNum = numId * 10

    // for(let i = 0; i < divs.length; i++){
    //     divs[i].classList.add("hidden")
    //     // divs[i].classList.add("div-hidden")
    //     // divs[i].classList.remove("div-hidden")
    // }

    // for(let i = startNum; i <= endNum; i++) {
    //     divs[i].classList.remove("hidden")
    //     divs[i].classList.remove("div-hidden")
    //     // console.log(divs[i])
    // }

    for (let i = 0; i < divsFiltered.length; i++) {
        divsFiltered[i].classList.add("hidden")
        // divs[i].classList.add("div-hidden")
        // divs[i].classList.remove("div-hidden")
    }

    for (let i = startNum; i <= endNum; i++) {
        divsFiltered[i].classList.remove("hidden")
        divsFiltered[i].classList.remove("div-hidden")
        // console.log(divs[i])
    }

    // console.log(`${startNum} : ${endNum}`)

    // console.log(divs)



}

// return item name after click
function getId(btn) {
    // 'alert(btn.id)
    sendResponse(btn.id)
    console.log(btn.id)
    // return btn.id
}

// Send Data to Chatbot
function sendResponse(btn) {
    // alert("button is clicked")
    var selected = btn

    var outputs = {
        selectedGame: selected
    };

    BotStarWebview('sendResponse', '', outputs, 'Button Clicked').catch((err) => {
        console.log(err);
    });

}

