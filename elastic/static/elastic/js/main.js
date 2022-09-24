
let flag = 0; //버튼 클릭 제어 하려고 눌러야 무조건 분석하기 눌리게 flag 1일때만 버튼 눌리게 !
let flag1 = 0 ;
    $(document).ready(function(){
    $("#searchInput").autocomplete({  //오토 컴플릿트 시작
         source: List,   // source는 gudata.js파일 내부의 List 배열
         focus : function(event, ui) { // 방향키로 자동완성단어 선택 가능하게 만들어줌
            return false;
         },
         minLength: 1,// 최소 글자수
         delay: 100,   //autocomplete 딜레이 시간(ms)
         //disabled: true, //자동완성 기능 끄기
      });
   });
var servicecode2 = document.getElementsByClassName("servicecode");

function handleClick(event) {

  console.log(event.target);
  // console.log(this);
  // 콘솔창을 보면 둘다 동일한 값이 나온다

  console.log(event.target.classList);
    flag = 1;
    console.log(flag);
      btnActive();
  if (event.target.classList[1] === "clicked") {
    event.target.classList.remove("clicked");
  } else {
    for (var i = 0; i < servicecode2.length; i++) {
        servicecode2[i].classList.remove("clicked");
    }

    event.target.classList.add("clicked");
  }
}

function init() {

  for (var i = 0; i < servicecode2.length; i++) {
    servicecode2[i].addEventListener("click", handleClick);
  }

}

init();
//분석하기 버튼 활성화 함수
function btnActive()  {
  const target = document.getElementById('report');
  if (flag===1&& flag1===1) {
      target.disabled = false;
  }

}
var Target = document.getElementById("clock");
        function clock() {
            var time = new Date();

            var month = time.getMonth();
            var date = time.getDate();
            var day = time.getDay();
            var week = ['일', '월', '화', '수', '목', '금', '토'];

            Target.innerText =
            `${month + 1}월 ${date}일 ${week[day]}요일 `
        }
        clock();
function closeReport(){

        $('.ResultReport').hide();

}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var urlguname = getParameterByName('guName');


let thislink = "http://127.0.0.1:8000/test/?cCode=%EC%97%B0%EC%8B%A0%EB%82%B4%EC%97%AD&serviceCode=%EB%B6%84%EC%8B%9D%EC%A0%84%EB%AC%B8%EC%A0%90"




 function panTo(lat,lng) {
            // 이동할 위도 경도 위치를 생성합니다

             // 지도 중심을 부드럽게 이동시킵니다
             // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
             //클릭 이벤트가 발생했을 때 그 당시의 위도 경도를 파라미터로 넘겨받아서 그때 그때 만들어주는것 ...!
            moveLatLon= new kakao.maps.LatLng(lat, lng)
            // 지도 레벨을 4로 설정하고 특정 좌표를 기준으로 확대 또는 축소되도록 한다
            map.setLevel(5, {anchor: new kakao.maps.LatLng(lat, lng)});
            map.panTo(moveLatLon);



    }
let reportGuname;
let reportsg;
let reportsgName;
function showReportHead(){
    let Guname = document.getElementById('reportHeadGuname');
    Guname.innerHTML = reportGuname;
    let sg = document.getElementById('reportHeadsg');
    sg.innerHTML = reportsg;
    let sgname = document.getElementById('reportHeadsgName');
    sgname.innerHTML = reportsgName;
    let serviceCode = document.getElementById('reportHeadservicecode')
   serviceCode.innerHTML =service;
}
function showguSearch(){
    let Guname = document.getElementById('selectArea');
    Guname.innerHTML =urlguname;
    console.log(urlguname);


}
function showgu(gu){

    let Guname = document.getElementById('selectArea');
        reportGuname = gu;
        Guname.innerHTML = gu;

        DrawPolygon();
        DrawPolygon2();

}
function showCommercialArea(CommercialArea){
    let sg = document.getElementById('cA1');
    sg.innerHTML =CommercialArea ;
    reportsg=CommercialArea;




}



function showCommercialAreaName(CommercialAreaName){
    reportsgName = CommercialAreaName;
    let sgName = document.getElementById('cA2');
    sgName.innerHTML =CommercialAreaName ;
    history.pushState(null, null, '?cCode='+reportsgName+'&serviceCode='+service) // 리로드 없이 주소창 변경하기
    var link =  document.location.href;

}


    var map = new kakao.maps.Map(document.getElementById('map'), { // 지도를 표시할 div
        center : new kakao.maps.LatLng(37.564214, 127.001699), // 지도의 중심좌표
        level :8  // 지도의 확대 레벨 , 8로 설정해야 서울시를 한눈에 보기 편함
    }); // 지도를 생성합니다
    let service;
    function bringClickValue(arg0){
        var value = $(arg0).val();
        service =value;
        history.pushState(null, null, '?cCode='+reportsgName+'&serviceCode='+service)

    }



      $('#reload').on("click",function(){
        location.reload();
        window.location = "http://127.0.0.1:8000/index/";

    })



// 커스텀 오버레이에 표시할 내용입니다
// HTML 문자열 또는 Dom Element 입니다

let guname = new Array() ; // 구 이름을 저장할 배열선언
let gulat= new Array() ;
let gulng= new Array() ;
let moveLatLon= new Array() ;
var position; //// 커스텀 오버레이가 표시될 위치입니다

$.getJSON('http://127.0.0.1:8000/map/', function(data){

    var aJsonArray = new Array(); //json 데이터 저장할 배열

    $.each(data.positions, function(i, item ){ // 제이쿼리 each  == for문  position{} 에 접근해서 lat, lng, gu 하나씩 저장

        var jsondata = JSON.stringify(item); // 문자열변환
       //console.log(jsondata) // {"lat":"33.450690851406016","lng":"126.57040313031214"}
         // lat : "123", "lng" : 123 형식이어야 파싱 성공


        var obj = eval("("+jsondata+")"); //object 형태로 변경
       //console.log(obj) // {lat: "33.450690851406016", lng: "126.57040313031214"}


        var aJson = new Object(); //오브젝 생성

        aJson.lat = obj.lat;  //오브젝트에 값 저장
        aJson.lng = obj.lng;
        aJson.gu = obj.gu;
        aJson.cnt = obj.cnt;

        aJsonArray.push(aJson); //오브젝트값을 배열에 저장


    })
    console.log(aJsonArray);

    function show(){ //검색창에 입력시 이동

    let text = document.getElementsByClassName("searchInput")[0].value;

    let res = aJsonArray.find((element) => {
        return element.gu === text;
    });
    let lat = res.lat;
    let lng = res.lng;
    console.log(res);

    showgu(res.gu);

    let Guname = document.getElementById('selectArea');
        reportGuname = res.gu;
        //Guname.innerHTML = gu;

    panTo(lat,lng);
    DrawPolygon();
    DrawPolygon2();

}
document.getElementById("search_btn").addEventListener("click",show);

     $.each(aJsonArray, function (index, item) //for 문 index- 0,1,2,,, item- {lat, lng, gu}
    {
        position = new kakao.maps.LatLng(item.lat,item.lng);
        guname[index] = item.gu; //구 이름 저장
        gulat[index] = item.lat;
        gulng[index] = item.lng;

        var customOverlay = new kakao.maps.CustomOverlay({
        position: position,
       /*  content : '<div class ="label"><span class="left"></span><span class="center">'+item.gu+ item.cnt+'</span><span class="right"></span></div>' , */
        content : '<div class="circle" onclick="panTo('+item.lat+','+item.lng+'); showgu(\'' + item.gu + '\') " title="클릭"><span class ="circlegu">'+item.gu+ '</span><div class="circlecnt">'+item.cnt+'</div></div>'
        //함수를 실행할 때 현재 위도 경도를 넘겨줌
        });



        customOverlay.setMap(map);




    })

})







// 다각형을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 다각형을 표시합니다

        function DrawPolygon() {
            $.getJSON("polygon", function (geojson) {
                var data = geojson.features;
                var name = '';
                var code = '';
                var sgname= '' ;
                var coordinates = [];
                // console.log(data);

                $.each(data, function (index, val) {
                    name = val.properties.TRDAR_NM;
                    code = val.properties.TRDAR_NO;
                    sgname = val.properties.TRDAR_SE_1; //상권 이름
                    coordinates = val.geometry.coordinates;
                    // console.log(coordinates);
                    displayArea1(name, code, coordinates, sgname);

                });
            });
        }

        function DrawPolygon2() {
            $.getJSON("polygon2", function (geojson) {
                var data = geojson.features;
                var name = '';
                var code = '';
                var sgname= '' ;
                var coordinates = [];
                // console.log(data);

                $.each(data, function (index, val) {
                    name = val.properties.TRDAR_NM;
                    code = val.properties.TRDAR_NO;
                    sgname = val.properties.TRDAR_SE_1; //상권 이름
                    coordinates = val.geometry.coordinates;
                    // console.log(coordinates);
                    displayArea2(name, code, coordinates, sgname);


            })
                });

        }

        function displayArea1(name, code, coordinates ,sgname) {
            var polygonPath = [];
            $.each(coordinates[0], function (index, coordinate) {
                    polygonPath.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
                }
            );
// 지도에 표시할 다각형을 생성합니다
            var polygon = new kakao.maps.Polygon({
                path: polygonPath, // 그려질 다각형의 좌표 배열입니다
                strokeWeight: 3, // 선의 두께입니다
                strokeColor: '#39DE2A', // 선의 색깔입니다
                strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle: 'dash', // 선의 스타일입니다
                fillColor: '#A2FF99', // 채우기 색깔입니다
                fillOpacity: 0.7 // 채우기 불투명도 입니다
            });
            kakao.maps.event.addListener(polygon, 'mouseover', function(mouseEvent) { //마우스 올려놨을 때 색 변하게
             polygon.setOptions({fillColor: '#bb4bf5'});
            polygon.setOptions({strokeColor: '#991aad'});
            });
             kakao.maps.event.addListener(polygon, 'mouseout', function() { // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
                 polygon.setOptions({fillColor: '#A2FF99'});
                 polygon.setOptions({strokeColor: '#39DE2A'});

            });
              kakao.maps.event.addListener(polygon, 'mousedown', function() {
                  showCommercialArea(sgname);
                  showCommercialAreaName(name);
                  flag1=1;
                  console.log(flag1);

              });
            polygon.setMap(map);
        }


        function displayArea2(name, code, coordinates ,sgname) {
            var polygonPath = [];
            $.each(coordinates[0], function (index, coordinate) {
                    polygonPath.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
                }
            );
// 지도에 표시할 다각형을 생성합니다
            var polygon = new kakao.maps.Polygon({
                path: polygonPath, // 그려질 다각형의 좌표 배열입니다
                strokeWeight: 3, // 선의 두께입니다
                strokeColor: '#1400f5', // 선의 색깔입니다
                strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle: 'dash', // 선의 스타일입니다
                fillColor: '#52c2fa', // 채우기 색깔입니다
                fillOpacity: 0.7 // 채우기 불투명도 입니다
            });
             kakao.maps.event.addListener(polygon, 'mouseover', function(mouseEvent) { //마우스 올려놨을 때 색 변하게
             polygon.setOptions({fillColor: '#e3606c'});
             polygon.setOptions({strokeColor: '#ea2121'});

            });
             kakao.maps.event.addListener(polygon, 'mouseout', function() { // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
                 polygon.setOptions({fillColor: '#52c2fa'});
                 polygon.setOptions({strokeColor: '#1400f5'});

    });
             kakao.maps.event.addListener(polygon, 'mousedown', function() {
                  showCommercialArea(sgname);
                  showCommercialAreaName(name);
                  flag1=1;
                  console.log(flag1);

              });
            polygon.setMap(map);
        }
let Data;

//const urlParameter = window.location.search; // 현재 url 가져옴

// 분석하기 버튼 클릭했을 시 차트 띄우기

function clickReport(){

    var link =  document.location.href;
    var result = link.replace('index', 'test');
    thislink =result;
    console.log(thislink);
    if($('.ResultReport').css('display')== 'none'){
        $('.ResultReport').show();
    }//else{
       // $('.ResultReport').hide();


fetch(thislink)
  .then(res => res.json())
  .then(res => {
//막대 그래프
Chart.defaults.set('plugins.datalabels', {
  color: '#FE777B'
});
var chartArea = document.getElementById('점포수').getContext('2d');
// 차트를 생성한다.
      if(window.myChart != undefined){
          window.myChart.destroy();
      }
window.myChart = new Chart(chartArea, {
    // ①차트의 종류(String)
    type: 'line',
    // ②차트의 데이터(Object)
     plugins:[ChartDataLabels],
    data: {
        // ③x축에 들어갈 이름들(Array)
        labels: res["점포수"].label,
        // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
        datasets: [{
            // ⑤dataset의 이름(String)
            label: '분기 별 점포수',
            // ⑥dataset값(Array)
            data: res["점포수"].data,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
            backgroundColor: 'rgb(243,104,104)',
            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: 'rgba(255, 99, 132, 1)',
            // ⑨dataset의 선 두께(Number)
            borderWidth: 2,

        }]
    },
    // ⑩차트의 설정(Object)
    options:{
    plugins:{
      datalabels:{
           color:'black',
            font:{size:15},
        formatter:function(value,context){
          // data 에 넣은 데이타 순번. 물론 0 부터 시작
          var idx = context.dataIndex;
          // 여기선 첫번째 데이타엔 단위를 '원' 으로, 그 다음 데이타엔 'P' 를 사용
          // addComma() 는 여기서 기술하지 않았지만, 천단위 세팅. ChartJS 의 data 엔 숫자만 입력
          return context.chart.data[idx];

        }
      }
    },
        responsive: true,
        // ⑪축에 관한 설정(Object)
        scales: {
            // ⑫y축에 대한 설정(Object)
            y: {
                // ⑬시작을 0부터 하게끔 설정(최소값이 0보다 크더라도)(boolean)
                beginAtZero: true

            }
        }
    }
});
//프랜차이즈와 일반점포 비율 파이차트
var chartArea1 = document.getElementById('프랜차이즈').getContext('2d');
if(window.myChart1 != undefined){
          window.myChart1.destroy();
      }
window.myChart1 = new Chart(chartArea1, {
    // ①차트의 종류(String)
    type: 'pie',
    plugins:[ChartDataLabels],
    // ②차트의 데이터(Object)
    data: {
        // ③x축에 들어갈 이름들(Array)
        labels: res["일반/프랜차이즈"].label,
        // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
        datasets: [{
            // ⑤dataset의 이름(String)
            label: '일반/프랜차이즈',
            // ⑥dataset값(Array)
            data: res["일반/프랜차이즈"].data,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
             backgroundColor: ['#39b7ef', '#63ff7d'],

            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: 'rgb(253,253,254)',
            // ⑨dataset의 선 두께(Number)
            borderWidth: 1
        }]
    },
    // ⑩차트의 설정(Object)
    options: {
        responsive: false,
        plugins:{
      datalabels:{
           color:'black',
            font:{size:15},
        formatter:function(value,context){
          // data 에 넣은 데이타 순번. 물론 0 부터 시작
            var txt = Math.round(value*100)/100;

          var idx = context.dataIndex;
          // 여기선 첫번째 데이타엔 단위를 '원' 으로, 그 다음 데이타엔 'P' 를 사용
          // addComma() 는 여기서 기술하지 않았지만, 천단위 세팅. ChartJS 의 data 엔 숫자만 입력
          return context.chart.data[idx];

        }
      }
    }
        // responsive: false,

    }
});
// 개업수 막대그래프
var chartArea2 = document.getElementById('개업수').getContext('2d');
if(window.myChart2 != undefined){
          window.myChart2.destroy();
      }
window.myChart2 = new Chart(chartArea2, {
    // ①차트의 종류(String)
    type: 'bar',
    plugins:[ChartDataLabels],
    // ②차트의 데이터(Object)
    data: {
        // ③x축에 들어갈 이름들(Array)
        labels: res["개업수"].label,
        // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
        datasets: [{
            // ⑤dataset의 이름(String)
            label: '개업수',
            // ⑥dataset값(Array)
            data: res["개업수"].data,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
             backgroundColor: ['#f3e476'],

            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: 'rgb(242,242,250)',
            // ⑨dataset의 선 두께(Number)
            borderWidth: 1
        }]
    },
    // ⑩차트의 설정(Object)
    options: {
        responsive: true,
        plugins: {
            datalabels: {
                color: 'black',
                font: {size: 15},
                formatter: function (value, context) {
                    // data 에 넣은 데이타 순번. 물론 0 부터 시작
                    var idx = context.dataIndex;
                    // 여기선 첫번째 데이타엔 단위를 '원' 으로, 그 다음 데이타엔 'P' 를 사용
                    // addComma() 는 여기서 기술하지 않았지만, 천단위 세팅. ChartJS 의 data 엔 숫자만 입력
                    return context.chart.data[idx];

                }
            }
        },

        // ⑪축에 관한 설정(Object)
        scales: {
            // ⑫y축에 대한 설정(Object)
            y: {
                // ⑬시작을 0부터 하게끔 설정(최소값이 0보다 크더라도)(boolean)
                beginAtZero: true
            }
        }
    }
});
//폐업수 막대그래프
var chartArea3 = document.getElementById('폐업수').getContext('2d');
if(window.myChart3 != undefined){
          window.myChart3.destroy();

      }
window.myChart3 = new Chart(chartArea3, {
    // ①차트의 종류(String)
    type: 'bar',
     plugins:[ChartDataLabels],
    // ②차트의 데이터(Object)
    data: {
        // ③x축에 들어갈 이름들(Array)
        labels: res["폐업수"].label,
        // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
        datasets: [{
            // ⑤dataset의 이름(String)
            label: '폐업수',
            // ⑥dataset값(Array)
            data: res["폐업수"].data,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
             backgroundColor: ['#fd8484'],

            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: 'rgb(255,229,229)',
            // ⑨dataset의 선 두께(Number)
            borderWidth: 1
        }]
    },
    // ⑩차트의 설정(Object)
    options: {
        responsive: true,
        plugins:{
      datalabels:{
           color:'black',
            font:{size:15},
        formatter:function(value,context){
          // data 에 넣은 데이타 순번. 물론 0 부터 시작
          var idx = context.dataIndex;
          // 여기선 첫번째 데이타엔 단위를 '원' 으로, 그 다음 데이타엔 'P' 를 사용
          // addComma() 는 여기서 기술하지 않았지만, 천단위 세팅. ChartJS 의 data 엔 숫자만 입력
          return context.chart.data[idx];

        }
      }
    },
        // ⑪축에 관한 설정(Object)
        scales: {
            // ⑫y축에 대한 설정(Object)
            y: {
                // ⑬시작을 0부터 하게끔 설정(최소값이 0보다 크더라도)(boolean)
                beginAtZero: true
            }
        }
    }
});
//요일별 매출 막대그래프

var chartArea4 = document.getElementById('요일별매출').getContext('2d');
if(window.myChart4 != undefined){
          window.myChart4.destroy();

      }
window.myChart4 = new Chart(chartArea4, {
    // ①차트의 종류(String)
    type: 'bar',
    plugins:[ChartDataLabels],

    // ②차트의 데이터(Object)
    data: {
        // ③x축에 들어갈 이름들(Array)
        labels: res["매출-요일별"].label,
        // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
        datasets: [{
            // ⑤dataset의 이름(String)
            label: '매출-요일별',
            // ⑥dataset값(Array)
            data: res["매출-요일별"].data,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
             backgroundColor: ['#FCA5A4FF', '#fbd09f','#fbfdb3','#c2fdb9', '#96f1fc','#98BAFAFF','#B4A7F9FF'],

            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: 'rgb(255,255,255)',
            // ⑨dataset의 선 두께(Number)
            borderWidth: 1
        }]
    },
    // ⑩차트의 설정(Object)
    options: {
        responsive: true,
         plugins:{
      datalabels:{
           color:'black',
            font:{size:10},
        // formatter:function(value,context){
        //   // data 에 넣은 데이타 순번. 물론 0 부터 시작
        //   var idx = context.dataIndex;
        //   return context.chart.data[idx];
          // 여기선 첫번째 데이타엔 단위를 '원' 으로, 그 다음 데이타엔 'P' 를 사용
          // addComma() 는 여기서 기술하지 않았지만, 천단위 세팅. ChartJS 의 data 엔 숫자만 입력
           formatter:function(value, context) {
               return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"; },
        }
      }
      },

        // ⑪축에 관한 설정(Object)
        scales: {
            // ⑫y축에 대한 설정(Object)
          y: {
                // ⑬시작을 0부터 하게끔 설정(최소값이 0보다 크더라도)(boolean)
                beginAtZero: true
            }
        }


});
//매출 시간대별 막대그래프
var chartArea5 = document.getElementById('시간대별매출').getContext('2d');
// 차트를 생성한다.
      if(window.myChart5 != undefined){
          window.myChart5.destroy();

      }
window.myChart5 = new Chart(chartArea5, {
    // ①차트의 종류(String)
    type: 'line',
    plugins:[ChartDataLabels],
    // ②차트의 데이터(Object)
    data: {
        // ③x축에 들어갈 이름들(Array)
        labels: res["매출-시간대별"].label,
        // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
        datasets: [{
            // ⑤dataset의 이름(String)
            label: '# 시간대별 매출',
            // ⑥dataset값(Array)
            data: res["매출-시간대별"].data,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
            backgroundColor: 'rgb(243,104,104)',
            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: 'rgba(255, 99, 132, 1)',
            // ⑨dataset의 선 두께(Number)
            borderWidth: 2
        }]
    },

    // ⑩차트의 설정(Object)
    options: {
        responsive: true,
         plugins:{
      datalabels:{
           color:'black',
            font:{size:10},
         formatter:function(value, context) {
               return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"; },
      }
    },
        },
        // ⑪축에 관한 설정(Object)
        scales: {
            // ⑫y축에 대한 설정(Object)
            y: {
                // ⑬시작을 0부터 하게끔 설정(최소값이 0보다 크더라도)(boolean)
                beginAtZero: true
            }
        }

});
//성별 매출 -> 파이차트
var chartArea6 = document.getElementById('성별매출').getContext('2d');
if(window.myChart6 != undefined){
          window.myChart6.destroy();

      }
window.myChart6 = new Chart(chartArea6, {
    // ①차트의 종류(String)
    type: 'pie',
    plugins:[ChartDataLabels],
    // ②차트의 데이터(Object)
    data: {
        // ③x축에 들어갈 이름들(Array)
        labels: res["매출-성별"].label,
        // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
        datasets: [{
            // ⑤dataset의 이름(String)
            label: '매출-성별',
            // ⑥dataset값(Array)
            data: res["매출-성별"].data,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
            backgroundColor: ['#92dafa', '#ffa9a9'],

            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: 'rgb(253,253,254)',
            // ⑨dataset의 선 두께(Number)
            borderWidth: 1
        }]
    },
    // ⑩차트의 설정(Object)
    options: {
        responsive: false,
        // ⑪축에 관한 설정(Object)
         plugins:{
      datalabels:{
           color:'black',
            font:{size:15},
         formatter:function(value, context) {
               return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"; },
      }
    }
    }
});
// 연령대별 매출 - 막대 차트
var chartArea7 = document.getElementById('연령대별매출').getContext('2d');
if(window.myChart7 != undefined){
          window.myChart7.destroy();

      }
window.myChart7 = new Chart(chartArea7, {
    // ①차트의 종류(String)
    type: 'bar',
    plugins:[ChartDataLabels],

    // ②차트의 데이터(Object)
    data: {
        // ③x축에 들어갈 이름들(Array)
        labels: res["매출-연령대별"].label,
        // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
        datasets: [{
            // ⑤dataset의 이름(String)
            label: '매출-연령대별',
            // ⑥dataset값(Array)
            data: res["매출-연령대별"].data,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
             backgroundColor: ['#C5AAD3FF', '#FBC1D7FF','#faa6c6','#B5D9FBFF','#8D8DEFFF','#99C7F9FF'],

            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: 'rgb(245,245,255)',
            // ⑨dataset의 선 두께(Number)
            borderWidth: 1
        }]
    },
    // ⑩차트의 설정(Object)
    options: {
        responsive: true,
         plugins:{
      datalabels:{
           color:'black',
            font:{size:10},
        formatter:function(value, context) {
               return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"; },
      }
    },
        },
        // ⑪축에 관한 설정(Object)
        scales: {
            // ⑫y축에 대한 설정(Object)

          y: {
                // ⑬시작을 0부터 하게끔 설정(최소값이 0보다 크더라도)(boolean)
                beginAtZero: true
            }
        }


});
//성별 인구 -> 파이차트
var chartArea8 = document.getElementById('성별인구').getContext('2d');
if(window.myChart8 != undefined){
          window.myChart8.destroy();

      }
window.myChart8 = new Chart(chartArea8, {
    // ①차트의 종류(String)
    type: 'pie',
    plugins:[ChartDataLabels],
    // ②차트의 데이터(Object)
    data: {
        // ③x축에 들어갈 이름들(Array)
        labels: res["유동-성별"].label,
        // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
        datasets: [{
            // ⑤dataset의 이름(String)
            label: '유동-성별',
            // ⑥dataset값(Array)
            data: res["유동-성별"].data,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
             backgroundColor: ['#92dafa', '#ffa9a9'],

            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: 'rgb(253,253,254)',
            // ⑨dataset의 선 두께(Number)
            borderWidth: 1
        }]
    },
    // ⑩차트의 설정(Object)
    options: {
        responsive: false,
        // ⑪축에 관한 설정(Object)
         plugins:{
      datalabels:{
           color:'black',
            font:{size:15},
        formatter:function(value,context){
          // data 에 넣은 데이타 순번. 물론 0 부터 시작
          var idx = context.dataIndex;
          // 여기선 첫번째 데이타엔 단위를 '원' 으로, 그 다음 데이타엔 'P' 를 사용
          // addComma() 는 여기서 기술하지 않았지만, 천단위 세팅. ChartJS 의 data 엔 숫자만 입력
          return context.chart.data[idx];

        }
      }
    }
    }
});

// 연령대별 인구  - 막대 차트
var chartArea9 = document.getElementById('연령대인구').getContext('2d');
if(window.myChart9 != undefined){
          window.myChart9.destroy();

      }
window.myChart9 = new Chart(chartArea9, {
    // ①차트의 종류(String)
    type: 'bar',
    plugins:[ChartDataLabels],

    // ②차트의 데이터(Object)
    data: {
        // ③x축에 들어갈 이름들(Array)
        labels: res["유동-연령대별"].label,
        // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
        datasets: [{
            // ⑤dataset의 이름(String)
            label: '유동-연령대별',
            // ⑥dataset값(Array)
            data: res["유동-연령대별"].data,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
            backgroundColor: ['#C5AAD3FF', '#FBC1D7FF','#faa6c6','#B5D9FBFF','#8D8DEFFF','#99C7F9FF'],

            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: 'rgb(245,245,255)',
            // ⑨dataset의 선 두께(Number)
            borderWidth: 1
        }]
    },
    // ⑩차트의 설정(Object)
    options: {
        responsive: true,
         plugins:{
      datalabels:{
           color:'black',
            font:{size:15},
        formatter:function(value,context){
          // data 에 넣은 데이타 순번. 물론 0 부터 시작
          var idx = context.dataIndex;
          // 여기선 첫번째 데이타엔 단위를 '원' 으로, 그 다음 데이타엔 'P' 를 사용
          // addComma() 는 여기서 기술하지 않았지만, 천단위 세팅. ChartJS 의 data 엔 숫자만 입력
          return context.chart.data[idx];

        }
      }
    },
        },
        // ⑪축에 관한 설정(Object)
        scales: {
            // ⑫y축에 대한 설정(Object)

          y: {
                // ⑬시작을 0부터 하게끔 설정(최소값이 0보다 크더라도)(boolean)
                beginAtZero: true
            }
        }


});

// 요일 인구  - 막대 차트
var chartArea10 = document.getElementById('요일인구').getContext('2d');
if(window.myChart10 != undefined){
          window.myChart10.destroy();

      }
window.myChart10 = new Chart(chartArea10, {
    // ①차트의 종류(String)
    type: 'bar',
    plugins:[ChartDataLabels],
    // ②차트의 데이터(Object)
    data: {
        // ③x축에 들어갈 이름들(Array)
        labels: res["유동-요일별"].label,
        // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
        datasets: [{
            // ⑤dataset의 이름(String)
            label: '유동-요일별',
            // ⑥dataset값(Array)
            data: res["유동-요일별"].data,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
            backgroundColor: ['#FCA5A4FF', '#fbd09f','#fbfdb3','#c2fdb9', '#96f1fc','#98BAFAFF','#B4A7F9FF'],

            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: 'rgb(255,255,255)',
            // ⑨dataset의 선 두께(Number)
            borderWidth: 1
        }]
    },
    // ⑩차트의 설정(Object)
    options: {
        responsive: true,
         plugins:{
      datalabels:{
           color:'black',
            font:{size:15},
        formatter:function(value,context){
          // data 에 넣은 데이타 순번. 물론 0 부터 시작
          var idx = context.dataIndex;
          // 여기선 첫번째 데이타엔 단위를 '원' 으로, 그 다음 데이타엔 'P' 를 사용
          // addComma() 는 여기서 기술하지 않았지만, 천단위 세팅. ChartJS 의 data 엔 숫자만 입력
          return context.chart.data[idx];

        }
      }
    },
        },
        // ⑪축에 관한 설정(Object)
        scales: {
            // ⑫y축에 대한 설정(Object)

          y: {
                // ⑬시작을 0부터 하게끔 설정(최소값이 0보다 크더라도)(boolean)
                beginAtZero: true
            }
        }


});
//매출 시간대별 막대그래프
var chartArea11 = document.getElementById('시간대인구').getContext('2d');
if(window.myChart11 != undefined){
          window.myChart11.destroy();

      }
// 차트를 생성한다.
window.myChart11 = new Chart(chartArea11, {
    // ①차트의 종류(String)
    type: 'line',
    plugins:[ChartDataLabels],
    // ②차트의 데이터(Object)
    data: {
        // ③x축에 들어갈 이름들(Array)
        labels: res["유동-시간대별"].label,
        // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
        datasets: [{
            // ⑤dataset의 이름(String)
            label: '유동-시간대별',
            // ⑥dataset값(Array)
            data: res["유동-시간대별"].data,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
            backgroundColor: 'rgb(243,104,104)',
            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: 'rgba(255, 99, 132, 1)',
            // ⑨dataset의 선 두께(Number)
            borderWidth: 2
        }]
    },

    // ⑩차트의 설정(Object)
    options: {
        responsive: true,
         plugins:{
      datalabels:{
           color:'black',
            font:{size:10},
         formatter:function(value, context) {
               return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"; },
      }
    },
        },
        // ⑪축에 관한 설정(Object)
        scales: {
            // ⑫y축에 대한 설정(Object)
            y: {
                // ⑬시작을 0부터 하게끔 설정(최소값이 0보다 크더라도)(boolean)
                beginAtZero: true
            }
        }

});
// var totalpopulation = document.getElementById('totalpopulation');
// totalpopulation.innerHTML = res["유동-총"];

// 연령대별상주인구  - 막대 차트
var chartArea12 = document.getElementById('연령대별상주인구').getContext('2d');
if(window.myChart12 != undefined){
          window.myChart12.destroy();

      }
window.myChart12 = new Chart(chartArea12, {
    // ①차트의 종류(String)
    type: 'bar',
    plugins:[ChartDataLabels],
    // ②차트의 데이터(Object)
    data: {
        // ③x축에 들어갈 이름들(Array)
        labels: res["주거-연령대별"].label,
        // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
        datasets: [{
            // ⑤dataset의 이름(String)
            label: '주거-연령대별',
            // ⑥dataset값(Array)
            data: res["주거-연령대별"].data,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
            backgroundColor: ['#C5AAD3FF', '#FBC1D7FF','#faa6c6','#B5D9FBFF','#8D8DEFFF','#99C7F9FF'],

            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: 'rgb(245,245,255)',
            // ⑨dataset의 선 두께(Number)
            borderWidth: 1
        }]
    },
    // ⑩차트의 설정(Object)
    options: {
        responsive: true,
         plugins:{
      datalabels:{
           color:'black',
            font:{size:15},
        formatter:function(value,context){
          // data 에 넣은 데이타 순번. 물론 0 부터 시작
          var idx = context.dataIndex;
          // 여기선 첫번째 데이타엔 단위를 '원' 으로, 그 다음 데이타엔 'P' 를 사용
          // addComma() 는 여기서 기술하지 않았지만, 천단위 세팅. ChartJS 의 data 엔 숫자만 입력
          return context.chart.data[idx];

        }
      }
    },
        },
        // ⑪축에 관한 설정(Object)
        scales: {
            // ⑫y축에 대한 설정(Object)

          y: {
                // ⑬시작을 0부터 하게끔 설정(최소값이 0보다 크더라도)(boolean)
                beginAtZero: true
            }
        }


});
var totaldwellingpopulation = document.getElementById('totaldwellingpopulation');
totaldwellingpopulation.innerHTML = res["주거-총"];

// 연령대별상주인구  - 막대 차트
var chartArea13 = document.getElementById('연령대별직장인구').getContext('2d');
if(window.myChart13 != undefined){
          window.myChart13.destroy();

      }
window.myChart13 = new Chart(chartArea13, {
    // ①차트의 종류(String)
    type: 'bar',
    plugins:[ChartDataLabels],
    // ②차트의 데이터(Object)
    data: {
        // ③x축에 들어갈 이름들(Array)
        labels: res["직장-연령대별"].label,
        // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
        datasets: [{
            // ⑤dataset의 이름(String)
            label: '직장-연령대별',
            // ⑥dataset값(Array)
            data: res["직장-연령대별"].data,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
             backgroundColor: ['#C5AAD3FF', '#FBC1D7FF','#faa6c6','#B5D9FBFF','#8D8DEFFF','#99C7F9FF'],

            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: 'rgb(245,245,255)',
            // ⑨dataset의 선 두께(Number)
            borderWidth: 1
        }]
    },
    // ⑩차트의 설정(Object)
    options: {
        responsive: true,
         plugins:{
      datalabels:{
           color:'black',
            font:{size:15},
        formatter:function(value,context){
          // data 에 넣은 데이타 순번. 물론 0 부터 시작
          var idx = context.dataIndex;
          // 여기선 첫번째 데이타엔 단위를 '원' 으로, 그 다음 데이타엔 'P' 를 사용
          // addComma() 는 여기서 기술하지 않았지만, 천단위 세팅. ChartJS 의 data 엔 숫자만 입력
          return context.chart.data[idx];

        }
      }
    },
        },
        // ⑪축에 관한 설정(Object)
        scales: {
            // ⑫y축에 대한 설정(Object)

          y: {
                // ⑬시작을 0부터 하게끔 설정(최소값이 0보다 크더라도)(boolean)
                beginAtZero: true
            }
        }


});
var totalworkplacepopulation = document.getElementById('totalworkplacepopulation');
totalworkplacepopulation.innerHTML = res["직장-총"];

var totalvisitorfacilities = document.getElementById('totalvisitorfacilities');
totalvisitorfacilities.innerHTML = res["집객시설수"];



var maxStore = document.getElementById('m1');
if(res["일반/프랜차이즈"].max == "데이터 없음") {
    $("#m1").text("");
    $("#m1").text("데이터가 없어요.");
}else {
    $("#m1").text("");
    maxStore.innerHTML = res["일반/프랜차이즈"].max +" 비율이 더 높아요!";

}
var maxDay = document.getElementById('m2');
if(res["매출-요일별"].max == "데이터 없음") {
    $("#m2").text("데이터가 없어요.");
}else {
     $("#m2").text("");
    maxDay.innerHTML = res["매출-요일별"].max + " 매출이 가장 높아요!";
}

var maxTime = document.getElementById('m3');
if(res["매출-시간대별"].max == "데이터 없음") {
    $("#m3").text("데이터가 없어요.");
}else {
     $("#m3").text("");
    maxTime.innerHTML = res["매출-시간대별"].max+"시 매출이 가장 높아요!";
}


var maxSex = document.getElementById('m4');
if(res["매출-성별"].max == "데이터 없음") {
    $("#m4").text("데이터가 없어요.");
}else {
     $("#m4").text("");
   maxSex.innerHTML = res["매출-성별"].max+" 매출이 가장 높아요!";
}

var maxAge = document.getElementById('m5');
if(res["매출-연령대별"].max == "데이터 없음") {
    $("#m5").text("데이터가 없어요.");
}else {
     $("#m5").text("");
   maxAge.innerHTML = res["매출-연령대별"].max+" 매출이 가장 높아요!";
}

var maxSexPeople = document.getElementById('m6');
if(res["유동-성별"].max == "데이터 없음") {
    $("#m6").text("데이터가 없어요.");
}else {
     $("#m6").text("");
    maxSexPeople.innerHTML =res["유동-성별"].max+ " 유동인구가 가장 많아요!";
}
var maxAgePeople = document.getElementById('m7');
if(res["유동-연령대별"].max == "데이터 없음") {
    $("#m7").text("데이터가 없어요.");
}else {
     $("#m7").text("");
    maxAgePeople.innerHTML =res["유동-연령대별"].max+ " 유동인구가 가장 많아요!";
}

var maxDayPeople = document.getElementById('m8');
if(res["유동-요일별"].max == "데이터 없음") {
    $("#m8").text("데이터가 없어요.");
}else {
     $("#m8").text("");
    maxDayPeople.innerHTML =res["유동-요일별"].max + " 유동인구가 가장 많아요!";
}

var maxTimePeople = document.getElementById('m9');
if(res["유동-시간대별"].max == "데이터 없음") {
    $("#m9").text("데이터가 없어요.");
}else {
     $("#m9").text("");
    maxTimePeople.innerHTML =res["유동-시간대별"].max+ "시 유동인구가 가장 많아요!";
}



var maxAgeLive = document.getElementById('maxAgeLive');
if(res["주거-연령대별"].max == "데이터 없음") {
    $("#m10").text("데이터가 없어요.");
}else {
     // {#$("#m10").text("");#}
    maxAgeLive.innerHTML =res["주거-연령대별"].max ;
}

var maxAgeLive2 = document.getElementById('maxAgeLive2');
if(res["직장-연령대별"].max == "데이터 없음") {
    $("#m11").text("데이터가 없어요.");
}else {
     // {#$("#m11").text("");#}
    maxAgeLive2.innerHTML =res["직장-연령대별"].max;
}



});}

