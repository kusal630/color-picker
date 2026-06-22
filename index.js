const getColor = document.getElementById('get-color')
const getScheme = document.getElementById('get-scheme')
const getSchemeBtn = document.getElementById('get-color-scheme-btn')
let colorCount=5
const colorIds=[]
document.addEventListener('click',function(e){
    for(let colorId of colorIds){
        const colorImg = document.getElementById(`hex-${colorId}`)
        colorImg.style.border='none'
        if(e.target.id===`hex-${colorId}`){
            navigator.clipboard.writeText(
                document.getElementById(`hex-${colorId}`).dataset.hex
            )
             colorImg.focus({
                focusVisible:true
            })
           colorImg.style.border='1px solid #00b4d8'
        }
        if(e.target.id===`hex-code-${colorId}`){
            colorImg.focus({
                focusVisible:true
            })
           colorImg.style.border='1px solid #00b4d8'
            navigator.clipboard.writeText(
                document.getElementById(`hex-${colorId}`).dataset.hex
            )
        }
    }
    if (e.target.id==='get-color-scheme-btn'){
        renderColorScheme()
    }
    if(e.target.id==='change-color-count'){
        renderColorCount()
    }
})

function changeColorCount(){
    if (document.getElementById('color-count-input')){
        const colorCountInput= document.getElementById('color-count-input')
        colorCount=Number(colorCountInput.value)
    }
}

function renderColorCount(){
    changeColorCount()
    renderColorScheme()
    // document.getElementById('color-count-input').style.display='block'
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
                    id='hex-${indexOfColor}' 
                    class='color-scheme' 
                    src=${color.image.bare}
                    data-hex=${color.hex.value}>
                    <p class='hex-code' id='hex-code-${indexOfColor}'>${color.hex.value}</p>
                </div>`
            )
        }
        colorsSection.innerHTML=colorsArr.join('')
        const countHtml=[]
        countHtml.push(`
            <button id="change-color-count">Change color count</button>
            <input 
            value='${colorCount}'
            id='color-count-input'
            type='number' 
            placeholder='Enter the count'
            name='count-of-colors'>
        `)
        countSection.innerHTML=countHtml.join('')
    })
}

