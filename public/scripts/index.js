$(function(){

    var _input = document.getElementById('upload');

    _input.addEventListener('change',function(){
        var files = _input.files;

        var formdata = new FormData(document.getElementById('form'));

        var xhr = new XMLHttpRequest();
        var upload = xhr.upload;

        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                $('.popout').show();
                $('.popout .content').html(xhr.responseText);
            }
        };

        xhr.open('POST',url); //url 是表单的提交地址。
        xhr.send(formdata);
    });


    $('.close').on('click',function(){
        $(this).parent().hide();
    });

});