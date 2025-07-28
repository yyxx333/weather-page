/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */
//封装渲染函数
function getWeather(cityCode){
    myAxios({
        url:'https://hmajax.itheima.net/api/weather',
        params:{
            city:cityCode
        }
    }).then(res=>{
        console.log(res);
        const wObj = res.data
        //将数据渲染到页面
        //日期，农历
        const titleInner = `<span class="dateShort">${wObj.date}</span>
        <span class="calendar">农历&nbsp;
          <span class="dateLunar">${wObj.dateLunar}</span>
        </span>` 
        document.querySelector('.title').innerHTML = titleInner
        //城市名字
        document.querySelector('.area').innerHTML = wObj.area
        //天气温度
        document.querySelector('.temperature').innerHTML = wObj.temperature
        //pm2.5
        document.querySelector('.air').innerHTML = `
          <span class="psPm25">${wObj.psPm25}</span>
          <span class="psPm25Level">${wObj.psPm25Level}</span>`
        //天气img
        document.querySelector('.weatherImg').src = wObj.weatherImg
        //天气描述
        document.querySelector('.weather').innerHTML = wObj.weather
        //风向
        document.querySelector('.windDirection').innerHTML = wObj.windDirection
        //风力
        document.querySelector('.windPower').innerHTML = wObj.windPower
        //今天的天气
        document.querySelector('.range-box').innerHTML = `
        <span>今天：</span>
        <span class="range">
          <span class="weather">${wObj.todayWeather.weather}</span>
          <span class="temNight">${wObj.todayWeather.temNight}</span>
          <span>-</span>
          <span class="temDay">${wObj.todayWeather.temDay}</span>
          <span>℃</span>
        </span>`
        //太阳紫外线，日出日落情况
        document.querySelector('.sun-list').innerHTML = `
        <li>
          <span>紫外线</span>
          <span class="ultraviolet">${wObj.todayWeather.ultraviolet}</span>
        </li>
        <li>
          <span>湿度</span>
          <span class="humidity">${wObj.todayWeather.humidity}</span>%
        </li>
        <li>
          <span>日出</span>
          <span class="sunriseTime">${wObj.todayWeather.sunriseTime}</span>
        </li>
        <li>
          <span>日落</span>
          <span class="sunsetTime">${wObj.todayWeather.sunsetTime}</span>
        </li>`
        // 一周的天气
        const weekArr = wObj.dayForecast
        // console.log(weekArr);
        
        for(let i = 1;i < 8;i++){
            const dayArr =weekArr[i-1]
            document.querySelector(`.week-wrap .item:nth-child(${i})`).innerHTML = `
          <div class="date-box">
            <span class="dateFormat">${dayArr.dateFormat}</span>
            <span class="date">${dayArr.date}</span>
          </div>
          <img src="${dayArr.weatherImg}" alt="" class="weatherImg">
          <span class="weather">${dayArr.weather}</span>
          <div class="temp">
            <span class="temNight">${dayArr.temNight}</span>-
            <span class="temDay">${dayArr.temDay}</span>
            <span>℃</span>
          </div>
          <div class="wind">
            <span class="windDirection">${dayArr.windDirection}</span>
            <span class="windPower">&lt;${dayArr.windPower}</span>
          </div>
          `
            
        }

    })
}
//北京市默认cityCode为'110100'
getWeather('110100');
//搜索框智能匹配查询
document.querySelector('.search-city').addEventListener('input',e=>{
    console.log(e.target.value);
    myAxios({
        url:'https://hmajax.itheima.net/api/weather/city',
        params:{
            city:e.target.value
        }
    }).then(res=>{
        console.log(res);
        cityArr = res.data
        const showStr = cityArr.map(item=>{
            return `<li class="city-item" data-code ='${item.code}'>${item.name}</li>`
        }).join(' ')
        document.querySelector('.show').innerHTML = showStr
        
    })
    
})

//点击搜索出的那个城市，渲染数据到页面
document.querySelector('.search-list').addEventListener('click',e=>{
    if(e.target.tagName === 'LI'){
        const cityCode = e.target.dataset.code
        console.log(cityCode);
        getWeather(cityCode)
        document.querySelector('.search-city').value = ''
    } 
})
