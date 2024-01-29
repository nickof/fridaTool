// enumerate_custom_so.js
// 过滤系统库的路径
function isSystemLibrary(path) {
  // 在这里添加系统库的路径或其他标识
  // 例如：/system/lib、/system/vendor/lib 等
  return path.startsWith("/system/");
}

// 过滤非/data/app目录下的SO文件
function isInDataAppDirectory(path) {
  return path.startsWith("/data/app/");
}

// 枚举加载的SO文件
function enumerateSOs() {
  try {
    // 你的 Frida 脚本代码
    var modules = Process.enumerateModules();
    for (var i = 0; i < modules.length; i++) {
      var modulePath = modules[i].path;
     if (!isSystemLibrary(modulePath) && isInDataAppDirectory(modulePath)) {
        console.log("Module:", modules[i].name, "Path:", modulePath, "Base Address:", modules[i].base);
     }
    }
  } catch (e) {
    console.error("Frida script error:", e);
  }
}

// 在应用启动时调用
setTimeout(enumerateSOs, 0);