const frida = require('frida');
//import frida from 'frida';

// 要监控的函数
const functionName = "test3";

// 启动进程并附加到它
async function attachProcess(processName) {
  const targetProcess = await frida.attach(processName);
  return targetProcess;
}

// 找到要监控的模块
async function findModule(targetProcess, moduleName) {
  const module = await targetProcess.getModuleByName(moduleName);
  return module;
}

// 找到要监控的函数
async function findFunction(module, functionName) {
  const exports = await module.enumerateExports();
  const targetExport = exports.find(e => e.name === functionName);
  return targetExport;
}

// 追踪函数的执行并打印相关信息
async function traceFunction(targetExport) {
  await targetExport.intercept({
    onEnter: function(args) {
      console.log(`${targetExport.name} called with args: ${args}`);
    },
    onLeave: function(retval) {
      console.log(`${targetExport.name} returned: ${retval}`);
    }
  });
}

// 启动进程并附加到它
attachProcess("targetProcess")
  .then(targetProcess => {
    // 找到要监控的模块
    return findModule(targetProcess, "targetModule");
  })
  .then(module => {
    // 找到要监控的函数
    return findFunction(module, functionName);
  })
  .then(targetExport => {
    // 追踪函数的执行并打印相关信息
    traceFunction(targetExport);
  })
  .catch(error => {
    console.error(error);
  });
