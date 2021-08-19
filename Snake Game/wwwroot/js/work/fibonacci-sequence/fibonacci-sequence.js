function fibonacci(num) {
    if (num < 2) {
        return num
    }
    else {
        return fibonacci(num - 1) + fibonacci(num - 2)
    }
}

function myfunction() {
    var number = document.getElementById('input').value
    if (number > 40) {
        alert("number can't bigger than 40!")
        return
    }
    else if (number == 0) {
        return
    }
    var fibo = []
    for (let i = 0; i < number; i++) {
        fibo.push(fibonacci(i))
    }
    $.ajax({
        method: 'POST',
        url: '/Work/FibonacciPartial',
        data: { fibonacci: fibo }
    }).done(function (result) {
        $('#fibo_result').html(result)
    });
}

document.addEventListener("keydown", function (e) {
    if (e.key == 'Enter') {
        myfunction()
    }
    else ret
})

// input and button animations
//$(document).ready(function () {
//    $("#showFib").click(function () {
//        $("#fib").animate({
//            //hidden: 'toggle',
//            top: 'toggle'
            
//        });
//    });
//});