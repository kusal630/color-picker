const getColor = document.getElementById('get-color')
const getScheme = document.getElementById('get-scheme')
const getSchemeBtn = document.getElementById('get-color-scheme-btn')
let colorCount=5
const colorIds=[]

document.addEventListener('click',function(e){
    for(let colorId of colorIds){
        const colorImg = document.getElementById(`hex-color-${colorId}`)
        colorImg.style.border='none'
        if(e.target.id===`hex-color-${colorId}` || e.target.id===`hex-code-${colorId}`)
        {
            changeColorBorder(colorImg)
            copyAndRenderMessage(colorImg)
        }
    }
    if (e.target.id==='get-color-scheme-btn'){
        renderColorScheme()
    }
    if(e.target.id==='change-color-count'){
        renderColorCount()
    }
})

function changeColorBorder(colorDom){
    colorDom.style.border='1px solid #00b4d8'
}

function copyAndRenderMessage(colorDom){
    navigator.clipboard.writeText(
        colorDom.dataset.hex
    )
    const messageEl =document.getElementById('message')
    messageEl.textContent = `Copied hex code ${colorDom.dataset.hex} to clipboard`
}

function renderColorScheme(){
    changeColorCount()
    const colorProperties  = getColorProperties()
    fetch(`https://www.thecolorapi.com/scheme?
    hex=${colorProperties.hex}&rgb=${colorProperties.rgb}
    &format=json&mode=${getScheme.value}&count=${colorCount}`)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        const colorsSection = document.getElementById('colors-section')
        const countSection = document.getElementById('count-section')
        const colorsArr = []
        for (let color of data.colors){
            const indexOfColor=data.colors.indexOf(color)
            colorIds.push(indexOfColor)
            colorsArr.push(`
                <div class='separate-color'>
                    <img 
                    id='hex-color-${indexOfColor}' 
                    class='color-scheme change-cursor' 
                    src=${color.image.bare}
                    data-hex=${color.hex.value}
                    alt=${color.name.value}>
                    <p 
                    class='hex-code change-cursor change-font' 
                    id='hex-code-${indexOfColor}'>
                    ${color.hex.value}</p>
                </div>`
            )
        }
        colorsSection.innerHTML=colorsArr.join('')
        tabSelector()
        const countHtml=[]
        countHtml.push(`
            <label class='change-font-color' for='color-count-input'>
                Enter the color count
            </label>
            <input 
            value='${colorCount}'
            id='color-count-input'
            type='number' 
            placeholder='Enter the count'
            name='count-of-colors'>
            <button 
            id="change-color-count"
            class="change-cursor"
            >Refresh Scheme</button>
        `)
        countSection.innerHTML=countHtml.join('')
    })
}

function changeColorCount(){
    if (document.getElementById('color-count-input')){
        const colorCountInput= document.getElementById('color-count-input')
        colorCount=Number(colorCountInput.value)
    }
}

function getColorProperties(){
    const colorCode = getColor.value
    const red = parseInt(getColor.value.substring(1,3),16)
    const green = parseInt(getColor.value.substring(3,5),16)
    const blue = parseInt(getColor.value.substring(5,7),16)
    return {
        hex:colorCode.substring(1),
        rgb:`${red},${green},${blue}`
    }
}

function tabSelector(){
    for (let colorId of colorIds){
        const colorImg = document.getElementById(`hex-color-${colorId}`)
        colorImg.tabIndex=0
    }
}

function renderColorCount(){
    changeColorCount()
    renderColorScheme()
}