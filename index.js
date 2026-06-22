const getColor = document.getElementById('get-color')
const getScheme = document.getElementById('get-scheme')
const getSchemeBtn = document.getElementById('get-color-scheme-btn')
let colorCount=5

document.addEventListener('click',function(e){
    if (e.target.id==='get-color-scheme-btn'){
        renderColorScheme()
    }
    if (e.target.id==='hex-code'){
        
        navigator.clipboard.writeText(
            getColorProperties().hex
        )
    }
    if(e.target.id==='change-color-count'){
        changeColorCount()
    }
})

function changeColorCount(){
    if (document.getElementById('color-count-input')){
        const colorCountInput= document.getElementById('color-count-input')
        colorCount=Number(colorCountInput.value)
        renderColorScheme()
        // colorCountInput.value=colorCount
        console.log(colorCountInput)
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

function renderColorScheme(){

    const colorProperties  = getColorProperties()
    console.log(colorProperties)
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
            colorsArr.push(`
                <div class='separate-color'>
                    <img class='color-scheme' src=${color.image.bare}>
                    <p id='hex-code'>${color.hex.value}</p>
                </div>`)
        }
        colorsSection.innerHTML=colorsArr.join('')
        const countHtml=[]
        countHtml.push(`
        <div class='count-change-container'>
            <button id="change-color-count">Change color count</button>
            <input 
            value='${colorCount}'
            id='color-count-input'
            type='number' 
            placeholder='Enter the count'
            name='count-of-colors'>
        </div>
        `)
        countSection.innerHTML=countHtml.join('')
    })
}

