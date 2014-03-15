//选择关卡
function chooseHurdle(){
    var _js = document.getElementById("main");
//    被选中的选项，可以单选按钮来决定； 
    switch(){ 
            case "hurdle01":_js.src = "scripts/main1.js";break;
            case "hurdle02":_js.src = "scripts/main2.js";break;
            case "hurdle03":_js.src = "scripts/main3.js";break;
    }
    window.location.reload(true);
}