let goTop = document.getElementsByClassName("go-top");
window.addEventListener('scroll',function(){
    if(window.pageYOffset > 100){
        goTop[0].classList.add('active');
    }else{
        goTop[0].classList.remove('active');
    }
})