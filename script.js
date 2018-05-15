window.onwheel = function(){return false;};

setTimeout(() => {
    document.getElementById('screen_overlay').style.opacity = '0';
}, 1500);
setTimeout(() => {
    RemoveAnimElement(0,'down');
    window.onwheel =  function(e) {
        if (AllowedToMove) {
            if (!ScrollIsBusy){
                ScrollIsBusy = true;
                if (e.deltaY < 0){
                    MoveToPage(page - 1);
                }
                else {
                    MoveToPage(page + 1);
                }
            }
        }
    };
}, 1750);
setTimeout(() => {
    document.getElementById('screen_overlay').remove();
}, 2000);
window.onload = function(){
    $('html, body').animate({
        scrollTop: $("#main").offset().top
    }, 1);

    configureButtons();

    document.getElementById('age').innerHTML = Math.floor(Math.abs(new Date() - new Date(1997,1,10))/31536000000);
    document.getElementById('schooljaar').innerHTML = Math.ceil(Math.abs(new Date()-new Date(2016,9,1))/31536000000);

    var main = document.getElementById('main');
}
var previous = 0;
var page = 0;
var MenuOpen = false;
var ScrollIsBusy = false;
var AllowedToMove = true;

async function MoveToPage(pagenumero){
    if (pagenumero >= 0 && pagenumero <= 4){
        $('html, body').animate({
            scrollTop: $("#"+pagenumero).offset().top
        }, 1000);
    }
    setTimeout( () => { ScrollIsBusy = false; },1000)
} 

window.onscroll = function() {
    if (AllowedToMove) {
        for (var i = 0; i < 5;i++){
            var halfwindow = window.innerHeight / 2;
            if ((window.innerHeight * i)-1 < (window.scrollY + halfwindow) && (window.scrollY + halfwindow) < (window.innerHeight * (i+1))){
                
                if (page != i){
                    previous = page;
                    if (i > previous){
                        UpdateView(i,'up');
                    }
                    else {
                        UpdateView(i,'down');
                    }
                    highlightSideMenu(i);
                }
                page = i;
                if (window.innerWidth > 768){
                    if (page > 0) {
                        document.getElementById('side_menu').style.transform = 'translateX(0px)';
                    }
                    else {
                        document.getElementById('side_menu').style.transform = 'translateX(-100px)';
                    }
                }
                //document.getElementById('homo').innerHTML = 'Page: '+page+" prev: "+previous+" | scroll: "+window.scrollY;
                var prgrs = ((window.scrollY*100)/(main.offsetHeight*100))*100;
                document.getElementById('prgrs').style.height = 'calc('+prgrs + '% - 10px)';
            }
        }
    }
}
function defectit() {
    var modalname = document.getElementsByClassName('active')[0].children[0].dataset.target;
    AllowedToMove = false;
    $(modalname).on("hidden.bs.modal", function (e) {
        AllowedToMove = true;
    });
}

function UpdateView(i,direction){
    RemoveAnimElement(i);
    AddAnimElements(previous, direction);
}
function AddAnimElements(pagenum,dir){
    var targets = document.getElementsByClassName(pagenum);
    var animations = ['up','down','left','right','blur']
    for (var i = 0; i < targets.length;i++){
        for (var k = 0;k < animations.length;k++){
            targets[i].classList.add('smoothstyle');
            if (targets[i].classList.contains('anim_page')){
                targets[i].classList.add('from_'+dir);
            }
            else if (targets[i].classList.contains('anim_up_or_down')){
                if (dir == 'down'){
                    targets[i].classList.add('from_up');
                }
                else {
                    targets[i].classList.add('from_down');
                }
            }
            else if (targets[i].classList.contains('anim_'+animations[k])){
                targets[i].classList.add('from_'+animations[k]);
            }
        }
        SmoothAddOrDel(pagenum,'add');
    }
}
async function SmoothAddOrDel(pagenum,operation) {
    if (operation == 'del'){
        setTimeout( () => {
            var targets = document.getElementsByClassName(pagenum);
            for (var i = 0; i < targets.length;i++){
                targets[i].classList.remove('smoothstyle');
            }
        },1000);
    }
    else if (operation == 'add') {
        setTimeout( () => {
            var targets = document.getElementsByClassName(pagenum);
            for (var i = 0; i < targets.length;i++){
                targets[i].classList.add('smoothstyle');
            }
        },1010);
    }
    else {
        console.log("operation doesn't exist");
    }
}
function RemoveAnimElement(pagenum){
    var targets = document.getElementsByClassName(pagenum);
    for (var i = 0; i < targets.length;i++){
        targets[i].classList.remove('from_up');
        targets[i].classList.remove('from_down');
        targets[i].classList.remove('from_left');
        targets[i].classList.remove('from_right');
        targets[i].classList.remove('from_blur');

        SmoothAddOrDel(pagenum,'del');
    }
}
function highlightSideMenu(pagenumber){
    var docs = document.getElementsByClassName('side_menu_icon_afbeelding');
    for (var i = 0;i<docs.length;i++){
        if (i == pagenumber){
            docs[i].style.opacity = '1';
        }
        else {
            docs[i].style.opacity = '0.3';
        }
    }
}
function configureButtons(){
    $("#home").click(function() {
        $('html, body').animate({
            scrollTop: $("#0").offset().top
        }, 1000);
    });
    $("#about").click(function() {
        $('html, body').animate({
            scrollTop: $("#1").offset().top
        }, 1000);
    });
    $("#pff").click(function() {
        $('html, body').animate({
            scrollTop: $("#1").offset().top
        }, 1000);
    });

    $("#projects").click(function() {
        $('html, body').animate({
            scrollTop: $("#2").offset().top
        }, 1000);
    });
    
    $("#skills").click(function() {
        $('html, body').animate({
            scrollTop: $("#3").offset().top
        }, 1000);
    });
    
    $("#contact").click(function() {
        $('html, body').animate({
            scrollTop: $("#4").offset().top
        }, 1000);
    });

    $("#menu_home").click(function() {
        $('html, body').animate({
            scrollTop: $("#0").offset().top
        }, 1000);
    });
    $("#menu_about").click(function() {
        $('html, body').animate({
            scrollTop: $("#1").offset().top
        }, 1000);
    });

    $("#menu_projects").click(function() {
        $('html, body').animate({
            scrollTop: $("#2").offset().top
        }, 1000);
    });
    
    $("#menu_skills").click(function() {
        $('html, body').animate({
            scrollTop: $("#3").offset().top
        }, 1000);
    });
    
    $("#menu_contact").click(function() {
        $('html, body').animate({
            scrollTop: $("#4").offset().top
        }, 1000);
    });
}
