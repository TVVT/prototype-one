$(function(){

    var _input = document.getElementById('upload');

    _input.addEventListener('change',function(){
        // var files = _input.files;
        var formdata = new FormData(document.getElementById('form'));

        var xhr = new XMLHttpRequest();
        var upload = xhr.upload;

        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200){
                console.log(xhr)
                $('.popout').show();
                $('.popout .content').html(xhr.responseText);
                var win = window.open(xhr.responseText, '_blank');
                win.focus();
            }
        };

        xhr.open('POST','/upload'); //url 是表单的提交地址。
        xhr.send(formdata);
    });




    $('.close').on('click',function(){
        $(this).parent().hide();
    });

});