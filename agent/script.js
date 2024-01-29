
// Java.perform(  function(){
//     console.log("aaaa");
//     console.log("bbbb");
// } )

var funcToTrack = "test3";

Java.perform(function() {
    var targetClass = Java.use("com.example.xposedemo.MainActivity");
    var targetFunc = targetClass[funcToTrack];
    console.log( "hookRun" )
    var tracedFunc = function() {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i].toString());
        }
        var ret = targetFunc.apply(this, arguments);
        logFunctionCall(funcToTrack, args, ret);
        return ret;
    };
    targetClass[funcToTrack] = tracedFunc;
});


function testMainActivity(){
    Java.perform(function () {
        // 获取 MainActivity 类的引用
        var MainActivity = Java.use('com.example.xposedemo.MainActivity');

        // 在 MainActivity 的 onCreate 方法前插入代码
        MainActivity.onCreate.implementation = function (savedInstanceState) {
            console.log('onCreate called');
            // 调用原始方法
            this.onCreate(savedInstanceState);
        };
    });
}

// Java.perform( 
//     function(){
//         traceFunction( "com.example.xposedemo.MainActivity","test3" )
//     }
//     )

//main()

function main() {
    setImmediate(main)
    Java.perform(function () {
        // 获取 MainActivity 类的引用
        var MainActivity = Java.use('com.example.xposedemo.MainActivity');

        // 在 MainActivity 的 onCreate 方法前插入代码
        MainActivity.onCreate.implementation = function (savedInstanceState) {
            console.log('onCreate called');
            // 调用原始方法
            this.onCreate(savedInstanceState);
        };
    })

    Java.perform()

    //java.perform( traceFunction( "com.example.xposedemo.MainActivity","test3" ) )

}

/**
 * trace function
 * @param {} className 
 * @param {*} funcName 
 */
function traceFunction(className, funcName) {
    var targetClass = Java.use(className);
    console.log(className)

    var targetFunc = targetClass[funcName];

    var tracedFunc = function() {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i].toString());
        }
        var ret = targetFunc.apply(this, arguments);
        logFunctionCall(funcToTrack, args, ret);
        return ret;
    };

    targetClass[funcName] = tracedFunc;
}

function logFunctionCall(name, args, ret) {
    console.log(name + "(" + args.join(", ") + ") = " + ret);
}


function hook_Method() {
    Java.perform(function () {
        var Class = Java.use('jp.naver.line.android');
        var Method = "a";
        //# overload参数类型和个数
        Class[Method].overload('android.content.Context', 'java.lang.String'
        ).implementation = function () {
            var result = this[Method]['apply'](this, arguments);
            console.log('----------------------');
            console.log('arg1:' + arguments[0]);
            console.log('arg2:' + arguments[1]);
            console.log('result:' + result);
            console.log('----------------------');
            return result;
        }
    })
}

function printStack() {
    Java.perform(function () {
        var Exception = Java.use("java.lang.Exception");
        var ins = Exception.$new("Exception");
        var straces = ins.getStackTrace();
        if (straces != undefined && straces != null) {
            var strace = straces.toString();
            var replaceStr = strace.replace(/,/g, "\r\n");
            console.log(
                "============================= Stack start ======================="
            );
            console.log(replaceStr);
            console.log(
                "============================= Stack end =======================\r\n"
            );
            Exception.$dispose();
        }
    });
}