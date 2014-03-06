
var Module;
if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');
if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
    function fetchRemotePackage(packageName, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        if (event.loaded && event.total) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: event.total
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onload = function(event) {
        var packageData = xhr.response;
        callback(packageData);
      };
      xhr.send(null);
    };
    function handleError(error) {
      console.error('package error:', error);
    };
      var fetched = null, fetchedCallback = null;
      fetchRemotePackage('index.data', function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
  function runWithFS() {
function assert(check, msg) {
  if (!check) throw msg + new Error().stack;
}
Module['FS_createPath']('/', 'assets', true, true);
    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
      },
      finish: function(byteArray) {
        var that = this;
        Module['FS_createPreloadedFile'](this.name, null, byteArray, true, true, function() {
          Module['removeRunDependency']('fp ' + that.name);
        }, function() {
          if (that.audio) {
            Module['removeRunDependency']('fp ' + that.name); // workaround for chromium bug 124926 (still no audio with this, but at least we don't hang)
          } else {
            Module.printErr('Preloading file ' + that.name + ' failed');
          }
        }, false, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        this.requests[this.name] = null;
      },
    };
      new DataRequest(0, 132, 0, 0).open('GET', '/assets/fulltri.vs');
    new DataRequest(132, 399, 0, 0).open('GET', '/assets/display.fs');
    new DataRequest(399, 1623, 0, 0).open('GET', '/assets/compute.fs');
    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    }
    var PACKAGE_NAME = 'build/index.data';
    var REMOTE_PACKAGE_NAME = 'index.data';
    var PACKAGE_UUID = 'af4045a7-7788-4fbe-8720-02011c50f7db';
    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though.
      var ptr = Module['_malloc'](byteArray.length);
      Module['HEAPU8'].set(byteArray, ptr);
      DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
          DataRequest.prototype.requests["/assets/fulltri.vs"].onload();
          DataRequest.prototype.requests["/assets/display.fs"].onload();
          DataRequest.prototype.requests["/assets/compute.fs"].onload();
          Module['removeRunDependency']('datafile_build/index.data');
    };
    Module['addRunDependency']('datafile_build/index.data');
    if (!Module.preloadResults) Module.preloadResults = {};
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }
})();
// Note: For maximum-speed code, see "Optimizing Code" on the Emscripten wiki, https://github.com/kripken/emscripten/wiki/Optimizing-Code
// Note: Some Emscripten settings may limit the speed of the generated code.
// The Module object: Our interface to the outside world. We import
// and export values on it, and do the work to get that through
// closure compiler if necessary. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to do an eval in order to handle the closure compiler
// case, where this code here is minified but Module was defined
// elsewhere (e.g. case 4 above). We also need to check if Module
// already exists (e.g. case 3 above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module;
if (!Module) Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');
// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
for (var key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}
// The environment setup code below is customized to use Module.
// *** Environment setup code ***
var ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function';
var ENVIRONMENT_IS_WEB = typeof window === 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
if (ENVIRONMENT_IS_NODE) {
  // Expose functionality in the same simple way that the shells work
  // Note that we pollute the global namespace here, otherwise we break in node
  Module['print'] = function print(x) {
    process['stdout'].write(x + '\n');
  };
  Module['printErr'] = function printErr(x) {
    process['stderr'].write(x + '\n');
  };
  var nodeFS = require('fs');
  var nodePath = require('path');
  Module['read'] = function read(filename, binary) {
    filename = nodePath['normalize'](filename);
    var ret = nodeFS['readFileSync'](filename);
    // The path is absolute if the normalized version is the same as the resolved.
    if (!ret && filename != nodePath['resolve'](filename)) {
      filename = path.join(__dirname, '..', 'src', filename);
      ret = nodeFS['readFileSync'](filename);
    }
    if (ret && !binary) ret = ret.toString();
    return ret;
  };
  Module['readBinary'] = function readBinary(filename) { return Module['read'](filename, true) };
  Module['load'] = function load(f) {
    globalEval(read(f));
  };
  Module['arguments'] = process['argv'].slice(2);
  module['exports'] = Module;
}
else if (ENVIRONMENT_IS_SHELL) {
  Module['print'] = print;
  if (typeof printErr != 'undefined') Module['printErr'] = printErr; // not present in v8 or older sm
  if (typeof read != 'undefined') {
    Module['read'] = read;
  } else {
    Module['read'] = function read() { throw 'no read() available (jsc?)' };
  }
  Module['readBinary'] = function readBinary(f) {
    return read(f, 'binary');
  };
  if (typeof scriptArgs != 'undefined') {
    Module['arguments'] = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }
  this['Module'] = Module;
  eval("if (typeof gc === 'function' && gc.toString().indexOf('[native code]') > 0) var gc = undefined"); // wipe out the SpiderMonkey shell 'gc' function, which can confuse closure (uses it as a minified name, and it is then initted to a non-falsey value unexpectedly)
}
else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  Module['read'] = function read(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  };
  if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }
  if (typeof console !== 'undefined') {
    Module['print'] = function print(x) {
      console.log(x);
    };
    Module['printErr'] = function printErr(x) {
      console.log(x);
    };
  } else {
    // Probably a worker, and without console.log. We can do very little here...
    var TRY_USE_DUMP = false;
    Module['print'] = (TRY_USE_DUMP && (typeof(dump) !== "undefined") ? (function(x) {
      dump(x);
    }) : (function(x) {
      // self.postMessage(x); // enable this if you want stdout to be sent as messages
    }));
  }
  if (ENVIRONMENT_IS_WEB) {
    this['Module'] = Module;
  } else {
    Module['load'] = importScripts;
  }
}
else {
  // Unreachable because SHELL is dependant on the others
  throw 'Unknown runtime environment. Where are we?';
}
function globalEval(x) {
  eval.call(null, x);
}
if (!Module['load'] == 'undefined' && Module['read']) {
  Module['load'] = function load(f) {
    globalEval(Module['read'](f));
  };
}
if (!Module['print']) {
  Module['print'] = function(){};
}
if (!Module['printErr']) {
  Module['printErr'] = Module['print'];
}
if (!Module['arguments']) {
  Module['arguments'] = [];
}
// *** Environment setup code ***
// Closure helpers
Module.print = Module['print'];
Module.printErr = Module['printErr'];
// Callbacks
Module['preRun'] = [];
Module['postRun'] = [];
// Merge back in the overrides
for (var key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}
// === Auto-generated preamble library stuff ===
//========================================
// Runtime code shared with compiler
//========================================
var Runtime = {
  stackSave: function () {
    return STACKTOP;
  },
  stackRestore: function (stackTop) {
    STACKTOP = stackTop;
  },
  forceAlign: function (target, quantum) {
    quantum = quantum || 4;
    if (quantum == 1) return target;
    if (isNumber(target) && isNumber(quantum)) {
      return Math.ceil(target/quantum)*quantum;
    } else if (isNumber(quantum) && isPowerOfTwo(quantum)) {
      return '(((' +target + ')+' + (quantum-1) + ')&' + -quantum + ')';
    }
    return 'Math.ceil((' + target + ')/' + quantum + ')*' + quantum;
  },
  isNumberType: function (type) {
    return type in Runtime.INT_TYPES || type in Runtime.FLOAT_TYPES;
  },
  isPointerType: function isPointerType(type) {
  return type[type.length-1] == '*';
},
  isStructType: function isStructType(type) {
  if (isPointerType(type)) return false;
  if (isArrayType(type)) return true;
  if (/<?{ ?[^}]* ?}>?/.test(type)) return true; // { i32, i8 } etc. - anonymous struct types
  // See comment in isStructPointerType()
  return type[0] == '%';
},
  INT_TYPES: {"i1":0,"i8":0,"i16":0,"i32":0,"i64":0},
  FLOAT_TYPES: {"float":0,"double":0},
  or64: function (x, y) {
    var l = (x | 0) | (y | 0);
    var h = (Math.round(x / 4294967296) | Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  and64: function (x, y) {
    var l = (x | 0) & (y | 0);
    var h = (Math.round(x / 4294967296) & Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  xor64: function (x, y) {
    var l = (x | 0) ^ (y | 0);
    var h = (Math.round(x / 4294967296) ^ Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  getNativeTypeSize: function (type) {
    switch (type) {
      case 'i1': case 'i8': return 1;
      case 'i16': return 2;
      case 'i32': return 4;
      case 'i64': return 8;
      case 'float': return 4;
      case 'double': return 8;
      default: {
        if (type[type.length-1] === '*') {
          return Runtime.QUANTUM_SIZE; // A pointer
        } else if (type[0] === 'i') {
          var bits = parseInt(type.substr(1));
          assert(bits % 8 === 0);
          return bits/8;
        } else {
          return 0;
        }
      }
    }
  },
  getNativeFieldSize: function (type) {
    return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
  },
  dedup: function dedup(items, ident) {
  var seen = {};
  if (ident) {
    return items.filter(function(item) {
      if (seen[item[ident]]) return false;
      seen[item[ident]] = true;
      return true;
    });
  } else {
    return items.filter(function(item) {
      if (seen[item]) return false;
      seen[item] = true;
      return true;
    });
  }
},
  set: function set() {
  var args = typeof arguments[0] === 'object' ? arguments[0] : arguments;
  var ret = {};
  for (var i = 0; i < args.length; i++) {
    ret[args[i]] = 0;
  }
  return ret;
},
  STACK_ALIGN: 8,
  getAlignSize: function (type, size, vararg) {
    // we align i64s and doubles on 64-bit boundaries, unlike x86
    if (vararg) return 8;
    if (!vararg && (type == 'i64' || type == 'double')) return 8;
    if (!type) return Math.min(size, 8); // align structures internally to 64 bits
    return Math.min(size || (type ? Runtime.getNativeFieldSize(type) : 0), Runtime.QUANTUM_SIZE);
  },
  calculateStructAlignment: function calculateStructAlignment(type) {
    type.flatSize = 0;
    type.alignSize = 0;
    var diffs = [];
    var prev = -1;
    var index = 0;
    type.flatIndexes = type.fields.map(function(field) {
      index++;
      var size, alignSize;
      if (Runtime.isNumberType(field) || Runtime.isPointerType(field)) {
        size = Runtime.getNativeTypeSize(field); // pack char; char; in structs, also char[X]s.
        alignSize = Runtime.getAlignSize(field, size);
      } else if (Runtime.isStructType(field)) {
        if (field[1] === '0') {
          // this is [0 x something]. When inside another structure like here, it must be at the end,
          // and it adds no size
          // XXX this happens in java-nbody for example... assert(index === type.fields.length, 'zero-length in the middle!');
          size = 0;
          if (Types.types[field]) {
            alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
          } else {
            alignSize = type.alignSize || QUANTUM_SIZE;
          }
        } else {
          size = Types.types[field].flatSize;
          alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
        }
      } else if (field[0] == 'b') {
        // bN, large number field, like a [N x i8]
        size = field.substr(1)|0;
        alignSize = 1;
      } else if (field[0] === '<') {
        // vector type
        size = alignSize = Types.types[field].flatSize; // fully aligned
      } else if (field[0] === 'i') {
        // illegal integer field, that could not be legalized because it is an internal structure field
        // it is ok to have such fields, if we just use them as markers of field size and nothing more complex
        size = alignSize = parseInt(field.substr(1))/8;
        assert(size % 1 === 0, 'cannot handle non-byte-size field ' + field);
      } else {
        assert(false, 'invalid type for calculateStructAlignment');
      }
      if (type.packed) alignSize = 1;
      type.alignSize = Math.max(type.alignSize, alignSize);
      var curr = Runtime.alignMemory(type.flatSize, alignSize); // if necessary, place this on aligned memory
      type.flatSize = curr + size;
      if (prev >= 0) {
        diffs.push(curr-prev);
      }
      prev = curr;
      return curr;
    });
    if (type.name_[0] === '[') {
      // arrays have 2 elements, so we get the proper difference. then we scale here. that way we avoid
      // allocating a potentially huge array for [999999 x i8] etc.
      type.flatSize = parseInt(type.name_.substr(1))*type.flatSize/2;
    }
    type.flatSize = Runtime.alignMemory(type.flatSize, type.alignSize);
    if (diffs.length == 0) {
      type.flatFactor = type.flatSize;
    } else if (Runtime.dedup(diffs).length == 1) {
      type.flatFactor = diffs[0];
    }
    type.needsFlattening = (type.flatFactor != 1);
    return type.flatIndexes;
  },
  generateStructInfo: function (struct, typeName, offset) {
    var type, alignment;
    if (typeName) {
      offset = offset || 0;
      type = (typeof Types === 'undefined' ? Runtime.typeInfo : Types.types)[typeName];
      if (!type) return null;
      if (type.fields.length != struct.length) {
        printErr('Number of named fields must match the type for ' + typeName + ': possibly duplicate struct names. Cannot return structInfo');
        return null;
      }
      alignment = type.flatIndexes;
    } else {
      var type = { fields: struct.map(function(item) { return item[0] }) };
      alignment = Runtime.calculateStructAlignment(type);
    }
    var ret = {
      __size__: type.flatSize
    };
    if (typeName) {
      struct.forEach(function(item, i) {
        if (typeof item === 'string') {
          ret[item] = alignment[i] + offset;
        } else {
          // embedded struct
          var key;
          for (var k in item) key = k;
          ret[key] = Runtime.generateStructInfo(item[key], type.fields[i], alignment[i]);
        }
      });
    } else {
      struct.forEach(function(item, i) {
        ret[item[1]] = alignment[i];
      });
    }
    return ret;
  },
  dynCall: function (sig, ptr, args) {
    if (args && args.length) {
      if (!args.splice) args = Array.prototype.slice.call(args);
      args.splice(0, 0, ptr);
      return Module['dynCall_' + sig].apply(null, args);
    } else {
      return Module['dynCall_' + sig].call(null, ptr);
    }
  },
  functionPointers: [],
  addFunction: function (func) {
    for (var i = 0; i < Runtime.functionPointers.length; i++) {
      if (!Runtime.functionPointers[i]) {
        Runtime.functionPointers[i] = func;
        return 2*(1 + i);
      }
    }
    throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
  },
  removeFunction: function (index) {
    Runtime.functionPointers[(index-2)/2] = null;
  },
  getAsmConst: function (code, numArgs) {
    // code is a constant string on the heap, so we can cache these
    if (!Runtime.asmConstCache) Runtime.asmConstCache = {};
    var func = Runtime.asmConstCache[code];
    if (func) return func;
    var args = [];
    for (var i = 0; i < numArgs; i++) {
      args.push(String.fromCharCode(36) + i); // $0, $1 etc
    }
    return Runtime.asmConstCache[code] = eval('(function(' + args.join(',') + '){ ' + Pointer_stringify(code) + ' })'); // new Function does not allow upvars in node
  },
  warnOnce: function (text) {
    if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};
    if (!Runtime.warnOnce.shown[text]) {
      Runtime.warnOnce.shown[text] = 1;
      Module.printErr(text);
    }
  },
  funcWrappers: {},
  getFuncWrapper: function (func, sig) {
    assert(sig);
    if (!Runtime.funcWrappers[func]) {
      Runtime.funcWrappers[func] = function dynCall_wrapper() {
        return Runtime.dynCall(sig, func, arguments);
      };
    }
    return Runtime.funcWrappers[func];
  },
  UTF8Processor: function () {
    var buffer = [];
    var needed = 0;
    this.processCChar = function (code) {
      code = code & 0xFF;
      if (buffer.length == 0) {
        if ((code & 0x80) == 0x00) {        // 0xxxxxxx
          return String.fromCharCode(code);
        }
        buffer.push(code);
        if ((code & 0xE0) == 0xC0) {        // 110xxxxx
          needed = 1;
        } else if ((code & 0xF0) == 0xE0) { // 1110xxxx
          needed = 2;
        } else {                            // 11110xxx
          needed = 3;
        }
        return '';
      }
      if (needed) {
        buffer.push(code);
        needed--;
        if (needed > 0) return '';
      }
      var c1 = buffer[0];
      var c2 = buffer[1];
      var c3 = buffer[2];
      var c4 = buffer[3];
      var ret;
      if (buffer.length == 2) {
        ret = String.fromCharCode(((c1 & 0x1F) << 6)  | (c2 & 0x3F));
      } else if (buffer.length == 3) {
        ret = String.fromCharCode(((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6)  | (c3 & 0x3F));
      } else {
        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        var codePoint = ((c1 & 0x07) << 18) | ((c2 & 0x3F) << 12) |
                        ((c3 & 0x3F) << 6)  | (c4 & 0x3F);
        ret = String.fromCharCode(
          Math.floor((codePoint - 0x10000) / 0x400) + 0xD800,
          (codePoint - 0x10000) % 0x400 + 0xDC00);
      }
      buffer.length = 0;
      return ret;
    }
    this.processJSString = function processJSString(string) {
      string = unescape(encodeURIComponent(string));
      var ret = [];
      for (var i = 0; i < string.length; i++) {
        ret.push(string.charCodeAt(i));
      }
      return ret;
    }
  },
  stackAlloc: function (size) { var ret = STACKTOP;STACKTOP = (STACKTOP + size)|0;STACKTOP = (((STACKTOP)+7)&-8); return ret; },
  staticAlloc: function (size) { var ret = STATICTOP;STATICTOP = (STATICTOP + size)|0;STATICTOP = (((STATICTOP)+7)&-8); return ret; },
  dynamicAlloc: function (size) { var ret = DYNAMICTOP;DYNAMICTOP = (DYNAMICTOP + size)|0;DYNAMICTOP = (((DYNAMICTOP)+7)&-8); if (DYNAMICTOP >= TOTAL_MEMORY) enlargeMemory();; return ret; },
  alignMemory: function (size,quantum) { var ret = size = Math.ceil((size)/(quantum ? quantum : 8))*(quantum ? quantum : 8); return ret; },
  makeBigInt: function (low,high,unsigned) { var ret = (unsigned ? ((+((low>>>0)))+((+((high>>>0)))*(+4294967296))) : ((+((low>>>0)))+((+((high|0)))*(+4294967296)))); return ret; },
  GLOBAL_BASE: 8,
  QUANTUM_SIZE: 4,
  __dummy__: 0
}
//========================================
// Runtime essentials
//========================================
var __THREW__ = 0; // Used in checking for thrown exceptions.
var ABORT = false; // whether we are quitting the application. no code should run after this. set in exit() and abort()
var EXITSTATUS = 0;
var undef = 0;
// tempInt is used for 32-bit signed values or smaller. tempBigInt is used
// for 32-bit unsigned values or more than 32 bits. TODO: audit all uses of tempInt
var tempValue, tempInt, tempBigInt, tempInt2, tempBigInt2, tempPair, tempBigIntI, tempBigIntR, tempBigIntS, tempBigIntP, tempBigIntD, tempDouble, tempFloat;
var tempI64, tempI64b;
var tempRet0, tempRet1, tempRet2, tempRet3, tempRet4, tempRet5, tempRet6, tempRet7, tempRet8, tempRet9;
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}
var globalScope = this;
// C calling interface. A convenient way to call C functions (in C files, or
// defined with extern "C").
//
// Note: LLVM optimizations can inline and remove functions, after which you will not be
//       able to call them. Closure can also do so. To avoid that, add your function to
//       the exports using something like
//
//         -s EXPORTED_FUNCTIONS='["_main", "_myfunc"]'
//
// @param ident      The name of the C function (note that C++ functions will be name-mangled - use extern "C")
// @param returnType The return type of the function, one of the JS types 'number', 'string' or 'array' (use 'number' for any C pointer, and
//                   'array' for JavaScript arrays and typed arrays; note that arrays are 8-bit).
// @param argTypes   An array of the types of arguments for the function (if there are no arguments, this can be ommitted). Types are as in returnType,
//                   except that 'array' is not possible (there is no way for us to know the length of the array)
// @param args       An array of the arguments to the function, as native JS values (as in returnType)
//                   Note that string arguments will be stored on the stack (the JS string will become a C string on the stack).
// @return           The return value, as a native JS value (as in returnType)
function ccall(ident, returnType, argTypes, args) {
  return ccallFunc(getCFunc(ident), returnType, argTypes, args);
}
Module["ccall"] = ccall;
// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  try {
    var func = Module['_' + ident]; // closure exported function
    if (!func) func = eval('_' + ident); // explicit lookup
  } catch(e) {
  }
  assert(func, 'Cannot call unknown function ' + ident + ' (perhaps LLVM optimizations or closure removed it?)');
  return func;
}
// Internal function that does a C call using a function, not an identifier
function ccallFunc(func, returnType, argTypes, args) {
  var stack = 0;
  function toC(value, type) {
    if (type == 'string') {
      if (value === null || value === undefined || value === 0) return 0; // null string
      value = intArrayFromString(value);
      type = 'array';
    }
    if (type == 'array') {
      if (!stack) stack = Runtime.stackSave();
      var ret = Runtime.stackAlloc(value.length);
      writeArrayToMemory(value, ret);
      return ret;
    }
    return value;
  }
  function fromC(value, type) {
    if (type == 'string') {
      return Pointer_stringify(value);
    }
    assert(type != 'array');
    return value;
  }
  var i = 0;
  var cArgs = args ? args.map(function(arg) {
    return toC(arg, argTypes[i++]);
  }) : [];
  var ret = fromC(func.apply(null, cArgs), returnType);
  if (stack) Runtime.stackRestore(stack);
  return ret;
}
// Returns a native JS wrapper for a C function. This is similar to ccall, but
// returns a function you can call repeatedly in a normal way. For example:
//
//   var my_function = cwrap('my_c_function', 'number', ['number', 'number']);
//   alert(my_function(5, 22));
//   alert(my_function(99, 12));
//
function cwrap(ident, returnType, argTypes) {
  var func = getCFunc(ident);
  return function() {
    return ccallFunc(func, returnType, argTypes, Array.prototype.slice.call(arguments));
  }
}
Module["cwrap"] = cwrap;
// Sets a value in memory in a dynamic way at run-time. Uses the
// type data. This is the same as makeSetValue, except that
// makeSetValue is done at compile-time and generates the needed
// code then, whereas this function picks the right code at
// run-time.
// Note that setValue and getValue only do *aligned* writes and reads!
// Note that ccall uses JS types as for defining types, while setValue and
// getValue need LLVM types ('i8', 'i32') - this is a lower-level operation
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[(ptr)]=value; break;
      case 'i8': HEAP8[(ptr)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= (+1) ? (tempDouble > (+0) ? ((Math_min((+(Math_floor((tempDouble)/(+4294967296)))), (+4294967295)))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/(+4294967296))))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}
Module['setValue'] = setValue;
// Parallel to setValue.
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[(ptr)];
      case 'i8': return HEAP8[(ptr)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for setValue: ' + type);
    }
  return null;
}
Module['getValue'] = getValue;
var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_STATIC = 2; // Cannot be freed
var ALLOC_DYNAMIC = 3; // Cannot be freed except through sbrk
var ALLOC_NONE = 4; // Do not allocate
Module['ALLOC_NORMAL'] = ALLOC_NORMAL;
Module['ALLOC_STACK'] = ALLOC_STACK;
Module['ALLOC_STATIC'] = ALLOC_STATIC;
Module['ALLOC_DYNAMIC'] = ALLOC_DYNAMIC;
Module['ALLOC_NONE'] = ALLOC_NONE;
// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }
  var singleType = typeof types === 'string' ? types : null;
  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc, Runtime.stackAlloc, Runtime.staticAlloc, Runtime.dynamicAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
  }
  if (zeroinit) {
    var ptr = ret, stop;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)|0)]=0;
    }
    return ret;
  }
  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(slab, ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }
  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];
    if (typeof curr === 'function') {
      curr = Runtime.getFunctionIndex(curr);
    }
    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }
    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later
    setValue(ret+i, curr, type);
    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = Runtime.getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }
  return ret;
}
Module['allocate'] = allocate;
function Pointer_stringify(ptr, /* optional */ length) {
  // TODO: use TextDecoder
  // Find the length, and check for UTF while doing so
  var hasUtf = false;
  var t;
  var i = 0;
  while (1) {
    t = HEAPU8[(((ptr)+(i))|0)];
    if (t >= 128) hasUtf = true;
    else if (t == 0 && !length) break;
    i++;
    if (length && i == length) break;
  }
  if (!length) length = i;
  var ret = '';
  if (!hasUtf) {
    var MAX_CHUNK = 1024; // split up into chunks, because .apply on a huge string can overflow the stack
    var curr;
    while (length > 0) {
      curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
      ret = ret ? ret + curr : curr;
      ptr += MAX_CHUNK;
      length -= MAX_CHUNK;
    }
    return ret;
  }
  var utf8 = new Runtime.UTF8Processor();
  for (i = 0; i < length; i++) {
    t = HEAPU8[(((ptr)+(i))|0)];
    ret += utf8.processCChar(t);
  }
  return ret;
}
Module['Pointer_stringify'] = Pointer_stringify;
// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.
function UTF16ToString(ptr) {
  var i = 0;
  var str = '';
  while (1) {
    var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
    if (codeUnit == 0)
      return str;
    ++i;
    // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
    str += String.fromCharCode(codeUnit);
  }
}
Module['UTF16ToString'] = UTF16ToString;
// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16LE form. The copy will require at most (str.length*2+1)*2 bytes of space in the HEAP.
function stringToUTF16(str, outPtr) {
  for(var i = 0; i < str.length; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[(((outPtr)+(i*2))>>1)]=codeUnit;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[(((outPtr)+(str.length*2))>>1)]=0;
}
Module['stringToUTF16'] = stringToUTF16;
// Given a pointer 'ptr' to a null-terminated UTF32LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.
function UTF32ToString(ptr) {
  var i = 0;
  var str = '';
  while (1) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0)
      return str;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
}
Module['UTF32ToString'] = UTF32ToString;
// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32LE form. The copy will require at most (str.length+1)*4 bytes of space in the HEAP,
// but can use less, since str.length does not return the number of characters in the string, but the number of UTF-16 code units in the string.
function stringToUTF32(str, outPtr) {
  var iChar = 0;
  for(var iCodeUnit = 0; iCodeUnit < str.length; ++iCodeUnit) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    var codeUnit = str.charCodeAt(iCodeUnit); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++iCodeUnit);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[(((outPtr)+(iChar*4))>>2)]=codeUnit;
    ++iChar;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[(((outPtr)+(iChar*4))>>2)]=0;
}
Module['stringToUTF32'] = stringToUTF32;
function demangle(func) {
  try {
    if (typeof func === 'number') func = Pointer_stringify(func);
    if (func[0] !== '_') return func;
    if (func[1] !== '_') return func; // C function
    if (func[2] !== 'Z') return func;
    switch (func[3]) {
      case 'n': return 'operator new()';
      case 'd': return 'operator delete()';
    }
    var i = 3;
    // params, etc.
    var basicTypes = {
      'v': 'void',
      'b': 'bool',
      'c': 'char',
      's': 'short',
      'i': 'int',
      'l': 'long',
      'f': 'float',
      'd': 'double',
      'w': 'wchar_t',
      'a': 'signed char',
      'h': 'unsigned char',
      't': 'unsigned short',
      'j': 'unsigned int',
      'm': 'unsigned long',
      'x': 'long long',
      'y': 'unsigned long long',
      'z': '...'
    };
    function dump(x) {
      //return;
      if (x) Module.print(x);
      Module.print(func);
      var pre = '';
      for (var a = 0; a < i; a++) pre += ' ';
      Module.print (pre + '^');
    }
    var subs = [];
    function parseNested() {
      i++;
      if (func[i] === 'K') i++; // ignore const
      var parts = [];
      while (func[i] !== 'E') {
        if (func[i] === 'S') { // substitution
          i++;
          var next = func.indexOf('_', i);
          var num = func.substring(i, next) || 0;
          parts.push(subs[num] || '?');
          i = next+1;
          continue;
        }
        if (func[i] === 'C') { // constructor
          parts.push(parts[parts.length-1]);
          i += 2;
          continue;
        }
        var size = parseInt(func.substr(i));
        var pre = size.toString().length;
        if (!size || !pre) { i--; break; } // counter i++ below us
        var curr = func.substr(i + pre, size);
        parts.push(curr);
        subs.push(curr);
        i += pre + size;
      }
      i++; // skip E
      return parts;
    }
    var first = true;
    function parse(rawList, limit, allowVoid) { // main parser
      limit = limit || Infinity;
      var ret = '', list = [];
      function flushList() {
        return '(' + list.join(', ') + ')';
      }
      var name;
      if (func[i] === 'N') {
        // namespaced N-E
        name = parseNested().join('::');
        limit--;
        if (limit === 0) return rawList ? [name] : name;
      } else {
        // not namespaced
        if (func[i] === 'K' || (first && func[i] === 'L')) i++; // ignore const and first 'L'
        var size = parseInt(func.substr(i));
        if (size) {
          var pre = size.toString().length;
          name = func.substr(i + pre, size);
          i += pre + size;
        }
      }
      first = false;
      if (func[i] === 'I') {
        i++;
        var iList = parse(true);
        var iRet = parse(true, 1, true);
        ret += iRet[0] + ' ' + name + '<' + iList.join(', ') + '>';
      } else {
        ret = name;
      }
      paramLoop: while (i < func.length && limit-- > 0) {
        //dump('paramLoop');
        var c = func[i++];
        if (c in basicTypes) {
          list.push(basicTypes[c]);
        } else {
          switch (c) {
            case 'P': list.push(parse(true, 1, true)[0] + '*'); break; // pointer
            case 'R': list.push(parse(true, 1, true)[0] + '&'); break; // reference
            case 'L': { // literal
              i++; // skip basic type
              var end = func.indexOf('E', i);
              var size = end - i;
              list.push(func.substr(i, size));
              i += size + 2; // size + 'EE'
              break;
            }
            case 'A': { // array
              var size = parseInt(func.substr(i));
              i += size.toString().length;
              if (func[i] !== '_') throw '?';
              i++; // skip _
              list.push(parse(true, 1, true)[0] + ' [' + size + ']');
              break;
            }
            case 'E': break paramLoop;
            default: ret += '?' + c; break paramLoop;
          }
        }
      }
      if (!allowVoid && list.length === 1 && list[0] === 'void') list = []; // avoid (void)
      return rawList ? list : ret + flushList();
    }
    return parse();
  } catch(e) {
    return func;
  }
}
function demangleAll(text) {
  return text.replace(/__Z[\w\d_]+/g, function(x) { var y = demangle(x); return x === y ? x : (x + ' [' + y + ']') });
}
function stackTrace() {
  var stack = new Error().stack;
  return stack ? demangleAll(stack) : '(no stack trace available)'; // Stack trace is not available at least on IE10 and Safari 6.
}
// Memory management
var PAGE_SIZE = 4096;
function alignMemoryPage(x) {
  return (x+4095)&-4096;
}
var HEAP;
var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
var STATIC_BASE = 0, STATICTOP = 0, staticSealed = false; // static area
var STACK_BASE = 0, STACKTOP = 0, STACK_MAX = 0; // stack area
var DYNAMIC_BASE = 0, DYNAMICTOP = 0; // dynamic area handled by sbrk
function enlargeMemory() {
  abort('Cannot enlarge memory arrays in asm.js. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value ' + TOTAL_MEMORY + ', or (2) set Module.TOTAL_MEMORY before the program runs.');
}
var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 134217728;
var FAST_MEMORY = Module['FAST_MEMORY'] || 2097152;
// Initialize the runtime's memory
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && !!(new Int32Array(1)['subarray']) && !!(new Int32Array(1)['set']),
       'Cannot fallback to non-typed array case: Code is too specialized');
var buffer = new ArrayBuffer(TOTAL_MEMORY);
HEAP8 = new Int8Array(buffer);
HEAP16 = new Int16Array(buffer);
HEAP32 = new Int32Array(buffer);
HEAPU8 = new Uint8Array(buffer);
HEAPU16 = new Uint16Array(buffer);
HEAPU32 = new Uint32Array(buffer);
HEAPF32 = new Float32Array(buffer);
HEAPF64 = new Float64Array(buffer);
// Endianness check (note: assumes compiler arch was little-endian)
HEAP32[0] = 255;
assert(HEAPU8[0] === 255 && HEAPU8[3] === 0, 'Typed arrays 2 must be run on a little-endian system');
Module['HEAP'] = HEAP;
Module['HEAP8'] = HEAP8;
Module['HEAP16'] = HEAP16;
Module['HEAP32'] = HEAP32;
Module['HEAPU8'] = HEAPU8;
Module['HEAPU16'] = HEAPU16;
Module['HEAPU32'] = HEAPU32;
Module['HEAPF32'] = HEAPF32;
Module['HEAPF64'] = HEAPF64;
function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Runtime.dynCall('v', func);
      } else {
        Runtime.dynCall('vi', func, [callback.arg]);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}
var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the runtime has exited
var runtimeInitialized = false;
function preRun() {
  // compatibility - merge in anything from Module['preRun'] at this time
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}
function ensureInitRuntime() {
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  callRuntimeCallbacks(__ATINIT__);
}
function preMain() {
  callRuntimeCallbacks(__ATMAIN__);
}
function exitRuntime() {
  callRuntimeCallbacks(__ATEXIT__);
}
function postRun() {
  // compatibility - merge in anything from Module['postRun'] at this time
  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}
function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}
Module['addOnPreRun'] = Module.addOnPreRun = addOnPreRun;
function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}
Module['addOnInit'] = Module.addOnInit = addOnInit;
function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}
Module['addOnPreMain'] = Module.addOnPreMain = addOnPreMain;
function addOnExit(cb) {
  __ATEXIT__.unshift(cb);
}
Module['addOnExit'] = Module.addOnExit = addOnExit;
function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}
Module['addOnPostRun'] = Module.addOnPostRun = addOnPostRun;
// Tools
// This processes a JS string into a C-line array of numbers, 0-terminated.
// For LLVM-originating strings, see parser.js:parseLLVMString function
function intArrayFromString(stringy, dontAddNull, length /* optional */) {
  var ret = (new Runtime.UTF8Processor()).processJSString(stringy);
  if (length) {
    ret.length = length;
  }
  if (!dontAddNull) {
    ret.push(0);
  }
  return ret;
}
Module['intArrayFromString'] = intArrayFromString;
function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}
Module['intArrayToString'] = intArrayToString;
// Write a Javascript array to somewhere in the heap
function writeStringToMemory(string, buffer, dontAddNull) {
  var array = intArrayFromString(string, dontAddNull);
  var i = 0;
  while (i < array.length) {
    var chr = array[i];
    HEAP8[(((buffer)+(i))|0)]=chr;
    i = i + 1;
  }
}
Module['writeStringToMemory'] = writeStringToMemory;
function writeArrayToMemory(array, buffer) {
  for (var i = 0; i < array.length; i++) {
    HEAP8[(((buffer)+(i))|0)]=array[i];
  }
}
Module['writeArrayToMemory'] = writeArrayToMemory;
function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; i++) {
    HEAP8[(((buffer)+(i))|0)]=str.charCodeAt(i);
  }
  if (!dontAddNull) HEAP8[(((buffer)+(str.length))|0)]=0;
}
Module['writeAsciiToMemory'] = writeAsciiToMemory;
function unSign(value, bits, ignore, sig) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore, sig) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}
if (!Math['imul']) Math['imul'] = function imul(a, b) {
  var ah  = a >>> 16;
  var al = a & 0xffff;
  var bh  = b >>> 16;
  var bl = b & 0xffff;
  return (al*bl + ((ah*bl + al*bh) << 16))|0;
};
Math.imul = Math['imul'];
var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_min = Math.min;
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// PRE_RUN_ADDITIONS (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
}
Module['addRunDependency'] = addRunDependency;
function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}
Module['removeRunDependency'] = removeRunDependency;
Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data
var memoryInitializer = null;
// === Body ===
STATIC_BASE = 8;
STATICTOP = STATIC_BASE + 16384;
var _stdout;
var _stdout=_stdout=allocate([0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
var _stdin;
var _stdin=_stdin=allocate([0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
var _stderr;
var _stderr=_stderr=allocate([0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
/* global initializers */ __ATINIT__.push({ func: function() { runPostSets() } },{ func: function() { __GLOBAL__I_a() } });
var ___fsmu8;
var ___dso_handle;
var ___dso_handle=___dso_handle=allocate([0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
var __ZTVN10__cxxabiv120__si_class_type_infoE;
__ZTVN10__cxxabiv120__si_class_type_infoE=allocate([0,0,0,0,160,45,0,0,22,1,0,0,16,1,0,0,76,0,0,0,172,0,0,0,10,0,0,0,10,0,0,0,2,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
var __ZTVN10__cxxabiv117__class_type_infoE;
__ZTVN10__cxxabiv117__class_type_infoE=allocate([0,0,0,0,176,45,0,0,22,1,0,0,98,0,0,0,76,0,0,0,172,0,0,0,10,0,0,0,30,0,0,0,4,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
var __ZN8RendererC1Ev;
var __ZN8RendererD1Ev;
var __ZNSt13runtime_errorC1EPKc;
var __ZNSt13runtime_errorD1Ev;
var __ZNSt12length_errorD1Ev;
var __ZNSt14overflow_errorD1Ev;
var __ZNSt3__16localeC1Ev;
var __ZNSt3__16localeC1ERKS0_;
var __ZNSt3__16localeD1Ev;
var __ZNSt8bad_castC1Ev;
var __ZNSt8bad_castD1Ev;
/* memory initializer */ allocate([0,0,0,0,0,0,36,64,0,0,0,0,0,0,89,64,0,0,0,0,0,136,195,64,0,0,0,0,132,215,151,65,0,128,224,55,121,195,65,67,23,110,5,181,181,184,147,70,245,249,63,233,3,79,56,77,50,29,48,249,72,119,130,90,60,191,115,127,221,79,21,117,74,117,108,0,0,0,0,0,74,117,110,0,0,0,0,0,65,112,114,0,0,0,0,0,77,97,114,0,0,0,0,0,70,101,98,0,0,0,0,0,74,97,110,0,0,0,0,0,117,110,107,110,111,119,110,0,68,101,99,101,109,98,101,114,0,0,0,0,0,0,0,0,78,111,118,101,109,98,101,114,0,0,0,0,0,0,0,0,117,110,115,117,112,112,111,114,116,101,100,32,108,111,99,97,108,101,32,102,111,114,32,115,116,97,110,100,97,114,100,32,105,110,112,117,116,0,0,0,79,99,116,111,98,101,114,0,83,101,112,116,101,109,98,101,114,0,0,0,0,0,0,0,99,97,110,118,97,115,87,105,100,116,104,32,60,61,32,109,97,120,82,101,110,100,101,114,98,117,102,102,101,114,83,105,122,101,32,38,38,32,99,97,110,118,97,115,72,101,105,103,104,116,32,60,61,32,109,97,120,82,101,110,100,101,114,98,117,102,102,101,114,83,105,122,101,0,0,0,0,0,0,0,65,117,103,117,115,116,0,0,74,117,108,121,0,0,0,0,74,117,110,101,0,0,0,0,77,97,121,0,0,0,0,0,65,112,114,105,108,0,0,0,77,97,114,99,104,0,0,0,116,97,98,108,101,32,116,111,111,32,108,97,114,103,101,0,70,101,98,114,117,97,114,121,0,0,0,0,0,0,0,0,74,97,110,117,97,114,121,0,98,97,115,105,99,95,115,116,114,105,110,103,0,0,0,0,68,0,0,0,101,0,0,0,99,0,0,0,0,0,0,0,77,97,120,32,114,101,110,100,101,114,98,117,102,102,101,114,32,115,105,122,101,58,32,0,78,0,0,0,111,0,0,0,118,0,0,0,0,0,0,0,79,0,0,0,99,0,0,0,116,0,0,0,0,0,0,0,83,0,0,0,101,0,0,0,112,0,0,0,0,0,0,0,65,0,0,0,117,0,0,0,103,0,0,0,0,0,0,0,74,0,0,0,117,0,0,0,108,0,0,0,0,0,0,0,74,0,0,0,117,0,0,0,110,0,0,0,0,0,0,0,111,117,116,32,111,102,32,109,101,109,111,114,121,0,0,0,77,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,65,0,0,0,112,0,0,0,114,0,0,0,0,0,0,0,77,0,0,0,97,0,0,0,114,0,0,0,0,0,0,0,70,0,0,0,101,0,0,0,98,0,0,0,0,0,0,0,82,101,110,100,101,114,101,114,58,32,0,0,0,0,0,0,74,0,0,0,97,0,0,0,110,0,0,0,0,0,0,0,68,0,0,0,101,0,0,0,99,0,0,0,101,0,0,0,109,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,0,0,0,0,78,0,0,0,111,0,0,0,118,0,0,0,101,0,0,0,109,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,0,0,0,0,79,0,0,0,99,0,0,0,116,0,0,0,111,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,83,0,0,0,101,0,0,0,112,0,0,0,116,0,0,0,101,0,0,0,109,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,65,0,0,0,117,0,0,0,103,0,0,0,117,0,0,0,115,0,0,0,116,0,0,0,0,0,0,0,0,0,0,0,115,116,97,99,107,32,111,118,101,114,102,108,111,119,0,0,74,0,0,0,117,0,0,0,108,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,95,95,110,101,120,116,95,112,114,105,109,101,32,111,118,101,114,102,108,111,119,0,0,0,74,0,0,0,117,0,0,0,110,0,0,0,101,0,0,0,0,0,0,0,0,0,0,0,65,0,0,0,112,0,0,0,114,0,0,0,105,0,0,0,108,0,0,0,0,0,0,0,86,101,110,100,111,114,58,32,0,0,0,0,0,0,0,0,77,0,0,0,97,0,0,0,114,0,0,0,99,0,0,0,104,0,0,0,0,0,0,0,70,0,0,0,101,0,0,0,98,0,0,0,114,0,0,0,117,0,0,0,97,0,0,0,114,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,74,0,0,0,97,0,0,0,110,0,0,0,117,0,0,0,97,0,0,0,114,0,0,0,121,0,0,0,0,0,0,0,80,77,0,0,0,0,0,0,65,77,0,0,0,0,0,0,105,110,118,97,108,105,100,32,111,112,101,114,97,116,105,111,110,0,0,0,0,0,0,0,80,0,0,0,77,0,0,0,0,0,0,0,0,0,0,0,65,0,0,0,77,0,0,0,0,0,0,0,0,0,0,0,71,76,83,76,32,118,101,114,115,105,111,110,58,32,0,0,115,116,100,58,58,98,97,100,95,99,97,115,116,0,0,0,105,110,118,97,108,105,100,32,118,97,108,117,101,0,0,0,79,112,101,110,71,76,32,118,101,114,115,105,111,110,58,32,0,0,0,0,0,0,0,0,108,111,99,97,108,101,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,0,0,0,37,0,0,0,73,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,32,0,0,0,37,0,0,0,112,0,0,0,0,0,0,0,37,73,58,37,77,58,37,83,32,37,112,0,0,0,0,0,37,0,0,0,97,0,0,0,32,0,0,0,37,0,0,0,98,0,0,0,32,0,0,0,37,0,0,0,100,0,0,0,32,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,32,0,0,0,37,0,0,0,89,0,0,0,0,0,0,0,0,0,0,0,115,116,100,58,58,98,97,100,95,97,108,108,111,99,0,0,37,97,32,37,98,32,37,100,32,37,72,58,37,77,58,37,83,32,37,89,0,0,0,0,105,110,118,97,108,105,100,32,101,110,117,109,0,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,0,0,0,0,0,0,0,0,99,111,109,109,111,110,46,99,112,112,0,0,0,0,0,0,37,72,58,37,77,58,37,83,0,0,0,0,0,0,0,0,37,0,0,0,109,0,0,0,47,0,0,0,37,0,0,0,100,0,0,0,47,0,0,0,37,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,37,109,47,37,100,47,37,121,0,0,0,0,0,0,0,0,120,0,0,0,0,0,0,0,79,112,101,110,71,76,32,101,114,114,111,114,32,40,0,0,102,0,0,0,97,0,0,0,108,0,0,0,115,0,0,0,101,0,0,0,0,0,0,0,37,112,0,0,0,0,0,0,102,97,108,115,101,0,0,0,116,0,0,0,114,0,0,0,117,0,0,0,101,0,0,0,0,0,0,0,0,0,0,0,116,114,117,101,0,0,0,0,58,32,0,0,0,0,0,0,115,104,97,100,101,114,45,62,117,110,105,102,111,114,109,115,46,102,105,110,100,40,110,97,109,101,41,32,33,61,32,115,104,97,100,101,114,45,62,117,110,105,102,111,114,109,115,46,101,110,100,40,41,0,0,0,115,104,97,100,101,114,32,62,61,32,48,32,38,38,32,115,104,97,100,101,114,32,60,32,115,104,97,100,101,114,115,46,115,105,122,101,40,41,0,0,41,58,32,0,0,0,0,0,70,97,105,108,101,100,32,116,111,32,114,101,97,100,32,0,32,43,32,0,0,0,0,0,102,97,108,115,101,0,0,0,84,101,114,109,105,110,97,116,105,110,103,46,46,46,0,0,85,112,108,111,97,100,105,110,103,32,115,104,97,100,101,114,32,0,0,0,0,0,0,0,105,111,115,95,98,97,115,101,58,58,99,108,101,97,114,0,87,101,98,71,76,32,111,117,116,112,117,116,32,116,101,115,116,115,0,0,0,0,0,0,32,108,111,99,97,116,105,111,110,33,0,0,0,0,0,0,70,97,105,108,101,100,32,116,111,32,111,112,101,110,32,97,32,119,105,110,100,111,119,33,0,0,0,0,0,0,0,0,67,97,110,118,97,115,32,115,105,122,101,58,32,0,0,0,70,97,105,108,101,100,32,116,111,32,103,101,116,32,117,110,105,102,111,114,109,32,0,0,70,97,105,108,101,100,32,116,111,32,105,110,105,116,32,103,108,102,119,33,0,0,0,0,108,105,110,107,101,100,0,0,115,97,109,0,0,0,0,0,97,116,116,114,105,98,117,116,101,0,0,0,0,0,0,0,67,0,0,0,0,0,0,0,105,110,118,67,97,110,118,97,115,83,105,122,101,0,0,0,91,32,59,0,0,0,0,0,118,101,99,116,111,114,0,0,33,0,0,0,0,0,0,0,117,110,105,102,111,114,109,0,37,46,48,76,102,0,0,0,70,97,105,108,101,100,32,116,111,32,98,117,105,108,100,32,97,32,102,114,97,109,101,98,117,102,102,101,114,58,32,0,109,97,105,110,0,0,0,0,109,111,110,101,121,95,103,101,116,32,101,114,114,111,114,0,99,97,110,118,97,115,87,105,100,116,104,32,61,61,32,53,49,50,32,38,38,32,99,97,110,118,97,115,72,101,105,103,104,116,32,61,61,32,53,49,50,0,0,0,0,0,0,0,70,97,105,108,101,100,32,116,111,32,99,111,109,112,105,108,101,58,0,0,0,0,0,0,83,97,116,0,0,0,0,0,70,114,105,0,0,0,0,0,105,111,115,116,114,101,97,109,0,0,0,0,0,0,0,0,37,76,102,0,0,0,0,0,114,98,0,0,0,0,0,0,84,104,117,0,0,0,0,0,87,101,100,0,0,0,0,0,84,117,101,0,0,0,0,0,58,0,0,0,0,0,0,0,97,115,115,101,116,115,47,99,111,109,112,117,116,101,46,102,115,0,0,0,0,0,0,0,77,111,110,0,0,0,0,0,83,117,110,0,0,0,0,0,83,97,116,117,114,100,97,121,0,0,0,0,0,0,0,0,70,114,105,100,97,121,0,0,84,104,117,114,115,100,97,121,0,0,0,0,0,0,0,0,87,101,100,110,101,115,100,97,121,0,0,0,0,0,0,0,118,115,83,111,117,114,99,101,46,115,105,122,101,40,41,32,62,32,48,32,38,38,32,102,115,83,111,117,114,99,101,46,115,105,122,101,40,41,32,62,32,48,0,0,0,0,0,0,33,0,0,0,0,0,0,0,84,117,101,115,100,97,121,0,77,111,110,100,97,121,0,0,83,117,110,100,97,121,0,0,97,115,115,101,116,115,47,100,105,115,112,108,97,121,46,102,115,0,0,0,0,0,0,0,83,0,0,0,97,0,0,0,116,0,0,0,0,0,0,0,70,0,0,0,114,0,0,0,105,0,0,0,0,0,0,0,84,0,0,0,104,0,0,0,117,0,0,0,0,0,0,0,87,0,0,0,101,0,0,0,100,0,0,0,0,0,0,0,84,0,0,0,117,0,0,0,101,0,0,0,0,0,0,0,114,101,110,100,101,114,101,114,46,99,112,112,0,0,0,0,77,0,0,0,111,0,0,0,110,0,0,0,0,0,0,0,117,110,115,112,101,99,105,102,105,101,100,32,105,111,115,116,114,101,97,109,95,99,97,116,101,103,111,114,121,32,101,114,114,111,114,0,0,0,0,0,83,0,0,0,117,0,0,0,110,0,0,0,0,0,0,0,83,0,0,0,97,0,0,0,116,0,0,0,117,0,0,0,114,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,70,0,0,0,114,0,0,0,105,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,84,0,0,0,104,0,0,0,117,0,0,0,114,0,0,0,115,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,97,115,115,101,116,115,47,102,117,108,108,116,114,105,46,118,115,0,0,0,0,0,0,0,87,0,0,0,101,0,0,0,100,0,0,0,110,0,0,0,101,0,0,0,115,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,84,0,0,0,117,0,0,0,101,0,0,0,115,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,77,0,0,0,111,0,0,0,110,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,83,0,0,0,117,0,0,0,110,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,68,101,99,0,0,0,0,0,102,97,108,115,101,0,0,0,78,111,118,0,0,0,0,0,79,99,116,0,0,0,0,0,83,101,112,0,0,0,0,0,65,117,103,0,0,0,0,0,77,111,100,117,108,101,46,99,116,120,46,112,105,120,101,108,83,116,111,114,101,105,40,48,120,57,50,52,51,44,32,48,41,59,32,77,111,100,117,108,101,46,99,116,120,46,112,105,120,101,108,83,116,111,114,101,105,40,48,120,57,50,52,48,44,32,48,41,59,0,0,0,109,97,105,110,46,99,112,112,0,0,0,0,0,0,0,0,103,65,112,112,32,33,61,32,110,117,108,108,112,116,114,0,115,101,116,65,112,112,86,97,108,117,101,0,0,0,0,0,115,101,116,83,104,97,100,101,114,0,0,0,0,0,0,0,97,100,100,83,104,97,100,101,114,70,114,111,109,83,111,117,114,99,101,0,0,0,0,0,115,101,116,85,110,105,102,111,114,109,50,102,118,0,0,0,115,101,116,85,110,105,102,111,114,109,49,105,0,0,0,0,115,101,116,117,112,0,0,0,99,104,101,99,107,80,108,97,116,102,111,114,109,0,0,0,103,101,116,70,105,108,101,67,111,110,116,101,110,116,115,0,99,104,101,99,107,71,76,69,114,114,111,114,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,49,50,51,52,53,54,55,56,57,0,0,0,0,0,0,48,49,50,51,52,53,54,55,56,57,0,0,0,0,0,0,37,0,0,0,89,0,0,0,45,0,0,0,37,0,0,0,109,0,0,0,45,0,0,0,37,0,0,0,100,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,0,0,0,0,37,0,0,0,73,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,32,0,0,0,37,0,0,0,112,0,0,0,0,0,0,0,37,0,0,0,109,0,0,0,47,0,0,0,37,0,0,0,100,0,0,0,47,0,0,0,37,0,0,0,121,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,37,72,58,37,77,58,37,83,37,72,58,37,77,0,0,0,37,73,58,37,77,58,37,83,32,37,112,0,0,0,0,0,37,89,45,37,109,45,37,100,37,109,47,37,100,47,37,121,37,72,58,37,77,58,37,83,37,0,0,0,0,0,0,0,37,112,0,0,0,0,0,0,49,139,0,0,48,139,0,0,0,0,64,192,0,0,128,191,0,0,0,63,0,0,128,191,0,0,0,0,0,0,128,63,0,0,128,191,0,0,0,63,0,0,128,63,0,0,0,0,0,0,128,63,0,0,64,64,0,0,0,63,0,0,128,63,0,0,0,64,0,0,0,0,0,0,0,0,72,39,0,0,36,0,0,0,138,0,0,0,70,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,88,39,0,0,218,0,0,0,184,0,0,0,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,104,39,0,0,84,0,0,0,24,0,0,0,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,120,39,0,0,84,0,0,0,36,1,0,0,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,136,39,0,0,114,0,0,0,8,0,0,0,108,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,152,39,0,0,114,0,0,0,22,0,0,0,108,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,176,39,0,0,190,0,0,0,100,0,0,0,60,0,0,0,2,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,208,39,0,0,26,1,0,0,210,0,0,0,60,0,0,0,4,0,0,0,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,39,0,0,182,0,0,0,212,0,0,0,60,0,0,0,8,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,40,0,0,28,1,0,0,160,0,0,0,60,0,0,0,6,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,176,40,0,0,24,1,0,0,112,0,0,0,60,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,208,40,0,0,180,0,0,0,130,0,0,0,60,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,40,0,0,46,0,0,0,132,0,0,0,60,0,0,0,122,0,0,0,4,0,0,0,30,0,0,0,6,0,0,0,20,0,0,0,54,0,0,0,2,0,0,0,248,255,255,255,240,40,0,0,20,0,0,0,10,0,0,0,32,0,0,0,14,0,0,0,2,0,0,0,30,0,0,0,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,41,0,0,14,1,0,0,0,1,0,0,60,0,0,0,18,0,0,0,16,0,0,0,58,0,0,0,26,0,0,0,18,0,0,0,2,0,0,0,4,0,0,0,248,255,255,255,24,41,0,0,64,0,0,0,104,0,0,0,116,0,0,0,126,0,0,0,92,0,0,0,42,0,0,0,54,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,41,0,0,90,0,0,0,214,0,0,0,60,0,0,0,46,0,0,0,38,0,0,0,10,0,0,0,46,0,0,0,56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,41,0,0,74,0,0,0,80,0,0,0,60,0,0,0,40,0,0,0,78,0,0,0,14,0,0,0,62,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,41,0,0,18,1,0,0,2,0,0,0,60,0,0,0,28,0,0,0,34,0,0,0,68,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,128,41,0,0,54,0,0,0,238,0,0,0,60,0,0,0,12,0,0,0,14,0,0,0,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,160,41,0,0,244,0,0,0,134,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,168,41,0,0,32,0,0,0,158,0,0,0,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,184,41,0,0,6,0,0,0,196,0,0,0,60,0,0,0,8,0,0,0,6,0,0,0,12,0,0,0,4,0,0,0,10,0,0,0,4,0,0,0,2,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,216,41,0,0,118,0,0,0,20,0,0,0,60,0,0,0,22,0,0,0,26,0,0,0,32,0,0,0,24,0,0,0,22,0,0,0,8,0,0,0,6,0,0,0,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,248,41,0,0,48,0,0,0,28,0,0,0,60,0,0,0,46,0,0,0,44,0,0,0,36,0,0,0,38,0,0,0,28,0,0,0,42,0,0,0,34,0,0,0,52,0,0,0,50,0,0,0,48,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,42,0,0,66,0,0,0,4,0,0,0,60,0,0,0,76,0,0,0,68,0,0,0,62,0,0,0,64,0,0,0,56,0,0,0,66,0,0,0,60,0,0,0,74,0,0,0,72,0,0,0,70,0,0,0,40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,56,42,0,0,86,0,0,0,110,0,0,0,60,0,0,0,6,0,0,0,14,0,0,0,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,72,42,0,0,30,0,0,0,198,0,0,0,60,0,0,0,16,0,0,0,18,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,88,42,0,0,12,0,0,0,208,0,0,0,60,0,0,0,2,0,0,0,10,0,0,0,14,0,0,0,120,0,0,0,98,0,0,0,24,0,0,0,112,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,120,42,0,0,202,0,0,0,152,0,0,0,60,0,0,0,14,0,0,0,16,0,0,0,18,0,0,0,50,0,0,0,8,0,0,0,20,0,0,0,88,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,152,42,0,0,202,0,0,0,96,0,0,0,60,0,0,0,6,0,0,0,4,0,0,0,4,0,0,0,96,0,0,0,60,0,0,0,10,0,0,0,130,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,184,42,0,0,202,0,0,0,120,0,0,0,60,0,0,0,12,0,0,0,8,0,0,0,22,0,0,0,28,0,0,0,68,0,0,0,8,0,0,0,132,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,216,42,0,0,202,0,0,0,40,0,0,0,60,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,232,42,0,0,70,0,0,0,146,0,0,0,60,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,248,42,0,0,202,0,0,0,92,0,0,0,60,0,0,0,24,0,0,0,2,0,0,0,4,0,0,0,10,0,0,0,16,0,0,0,34,0,0,0,28,0,0,0,8,0,0,0,4,0,0,0,8,0,0,0,14,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,43,0,0,34,1,0,0,42,0,0,0,60,0,0,0,10,0,0,0,6,0,0,0,22,0,0,0,42,0,0,0,8,0,0,0,6,0,0,0,30,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,72,43,0,0,82,0,0,0,252,0,0,0,72,0,0,0,2,0,0,0,18,0,0,0,40,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,88,43,0,0,226,0,0,0,30,1,0,0,56,0,0,0,248,255,255,255,88,43,0,0,56,0,0,0,72,0,0,0,192,255,255,255,192,255,255,255,88,43,0,0,224,0,0,0,228,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,104,43,0,0,202,0,0,0,102,0,0,0,60,0,0,0,12,0,0,0,8,0,0,0,22,0,0,0,28,0,0,0,68,0,0,0,8,0,0,0,132,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,120,43,0,0,202,0,0,0,186,0,0,0,60,0,0,0,12,0,0,0,8,0,0,0,22,0,0,0,28,0,0,0,68,0,0,0,8,0,0,0,132,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,136,43,0,0,62,0,0,0,242,0,0,0,66,0,0,0,44,0,0,0,28,0,0,0,2,0,0,0,48,0,0,0,80,0,0,0,22,0,0,0,124,0,0,0,12,0,0,0,30,0,0,0,20,0,0,0,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,152,43,0,0,150,0,0,0,8,1,0,0,22,0,0,0,26,0,0,0,16,0,0,0,16,0,0,0,82,0,0,0,100,0,0,0,38,0,0,0,26,0,0,0,24,0,0,0,6,0,0,0,2,0,0,0,26,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,160,43,0,0,10,0,0,0,140,0,0,0,66,0,0,0,44,0,0,0,32,0,0,0,12,0,0,0,48,0,0,0,80,0,0,0,22,0,0,0,6,0,0,0,12,0,0,0,34,0,0,0,20,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,108,0,0,0,0,0,0,0,208,43,0,0,176,0,0,0,200,0,0,0,148,255,255,255,148,255,255,255,208,43,0,0,122,0,0,0,34,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,44,0,0,52,0,0,0,236,0,0,0,252,255,255,255,252,255,255,255,0,44,0,0,166,0,0,0,148,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,24,44,0,0,246,0,0,0,10,1,0,0,252,255,255,255,252,255,255,255,24,44,0,0,128,0,0,0,222,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,48,44,0,0,104,0,0,0,38,1,0,0,248,255,255,255,248,255,255,255,48,44,0,0,204,0,0,0,6,1,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,72,44,0,0,126,0,0,0,232,0,0,0,248,255,255,255,248,255,255,255,72,44,0,0,156,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,44,0,0,240,0,0,0,78,0,0,0,48,0,0,0,32,0,0,0,18,0,0,0,4,0,0,0,44,0,0,0,80,0,0,0,22,0,0,0,86,0,0,0,12,0,0,0,20,0,0,0,20,0,0,0,32,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,112,44,0,0,230,0,0,0,206,0,0,0,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,152,44,0,0,20,1,0,0,4,1,0,0,18,0,0,0,26,0,0,0,16,0,0,0,16,0,0,0,56,0,0,0,100,0,0,0,38,0,0,0,26,0,0,0,24,0,0,0,6,0,0,0,36,0,0,0,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,168,44,0,0,174,0,0,0,234,0,0,0,40,0,0,0,44,0,0,0,32,0,0,0,12,0,0,0,84,0,0,0,80,0,0,0,22,0,0,0,6,0,0,0,12,0,0,0,34,0,0,0,46,0,0,0,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,216,44,0,0,254,0,0,0,164,0,0,0,60,0,0,0,62,0,0,0,118,0,0,0,38,0,0,0,88,0,0,0,6,0,0,0,34,0,0,0,52,0,0,0,26,0,0,0,44,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,248,44,0,0,124,0,0,0,68,0,0,0,60,0,0,0,110,0,0,0,4,0,0,0,72,0,0,0,82,0,0,0,84,0,0,0,28,0,0,0,114,0,0,0,58,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,45,0,0,2,1,0,0,136,0,0,0,60,0,0,0,16,0,0,0,58,0,0,0,8,0,0,0,50,0,0,0,90,0,0,0,60,0,0,0,90,0,0,0,64,0,0,0,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,56,45,0,0,88,0,0,0,194,0,0,0,60,0,0,0,102,0,0,0,106,0,0,0,32,0,0,0,80,0,0,0,30,0,0,0,24,0,0,0,74,0,0,0,78,0,0,0,76,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,112,45,0,0,106,0,0,0,18,0,0,0,42,0,0,0,26,0,0,0,16,0,0,0,16,0,0,0,82,0,0,0,100,0,0,0,38,0,0,0,66,0,0,0,76,0,0,0,12,0,0,0,2,0,0,0,26,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,128,45,0,0,16,0,0,0,248,0,0,0,70,0,0,0,44,0,0,0,32,0,0,0,12,0,0,0,48,0,0,0,80,0,0,0,22,0,0,0,94,0,0,0,22,0,0,0,2,0,0,0,20,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,144,45,0,0,22,1,0,0,220,0,0,0,76,0,0,0,172,0,0,0,10,0,0,0,2,0,0,0,6,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,83,116,57,116,121,112,101,95,105,110,102,111,0,0,0,0,83,116,57,101,120,99,101,112,116,105,111,110,0,0,0,0,83,116,57,98,97,100,95,97,108,108,111,99,0,0,0,0,83,116,56,98,97,100,95,99,97,115,116,0,0,0,0,0,83,116,49,52,111,118,101,114,102,108,111,119,95,101,114,114,111,114,0,0,0,0,0,0,83,116,49,51,114,117,110,116,105,109,101,95,101,114,114,111,114,0,0,0,0,0,0,0,83,116,49,50,108,101,110,103,116,104,95,101,114,114,111,114,0,0,0,0,0,0,0,0,83,116,49,49,108,111,103,105,99,95,101,114,114,111,114,0,78,83,116,51,95,95,49,57,116,105,109,101,95,98,97,115,101,69,0,0,0,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,112,117,116,73,119,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,112,117,116,73,99,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,103,101,116,73,119,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,103,101,116,73,99,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,57,98,97,115,105,99,95,105,111,115,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,57,98,97,115,105,99,95,105,111,115,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,112,117,116,73,119,69,69,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,112,117,116,73,99,69,69,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,103,101,116,73,119,69,69,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,103,101,116,73,99,69,69,0,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,112,117,116,73,119,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,112,117,116,73,99,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,103,101,116,73,119,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,103,101,116,73,99,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,56,110,117,109,112,117,110,99,116,73,119,69,69,0,0,0,0,78,83,116,51,95,95,49,56,110,117,109,112,117,110,99,116,73,99,69,69,0,0,0,0,78,83,116,51,95,95,49,56,109,101,115,115,97,103,101,115,73,119,69,69,0,0,0,0,78,83,116,51,95,95,49,56,109,101,115,115,97,103,101,115,73,99,69,69,0,0,0,0,78,83,116,51,95,95,49,56,105,111,115,95,98,97,115,101,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,56,105,111,115,95,98,97,115,101,55,102,97,105,108,117,114,101,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,55,110,117,109,95,112,117,116,73,119,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,55,110,117,109,95,112,117,116,73,99,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,55,110,117,109,95,103,101,116,73,119,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,55,110,117,109,95,103,101,116,73,99,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,55,99,111,108,108,97,116,101,73,119,69,69,0,0,0,0,0,78,83,116,51,95,95,49,55,99,111,108,108,97,116,101,73,99,69,69,0,0,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,119,99,49,49,95,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,99,99,49,49,95,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,68,115,99,49,49,95,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,68,105,99,49,49,95,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,0,0,0,78,83,116,51,95,95,49,54,108,111,99,97,108,101,53,102,97,99,101,116,69,0,0,0,78,83,116,51,95,95,49,54,108,111,99,97,108,101,53,95,95,105,109,112,69,0,0,0,78,83,116,51,95,95,49,53,99,116,121,112,101,73,119,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,53,99,116,121,112,101,73,99,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,116,105,109,101,95,103,101,116,95,99,95,115,116,111,114,97,103,101,73,119,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,116,105,109,101,95,103,101,116,95,99,95,115,116,111,114,97,103,101,73,99,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,57,95,95,105,111,115,116,114,101,97,109,95,99,97,116,101,103,111,114,121,69,0,0,0,78,83,116,51,95,95,49,49,56,98,97,115,105,99,95,115,116,114,105,110,103,115,116,114,101,97,109,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,99,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,49,55,95,95,119,105,100,101,110,95,102,114,111,109,95,117,116,102,56,73,76,106,51,50,69,69,69,0,0,0,0,0,0,78,83,116,51,95,95,49,49,54,95,95,110,97,114,114,111,119,95,116,111,95,117,116,102,56,73,76,106,51,50,69,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,53,98,97,115,105,99,95,115,116,114,105,110,103,98,117,102,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,99,69,69,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,53,98,97,115,105,99,95,115,116,114,101,97,109,98,117,102,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,53,98,97,115,105,99,95,115,116,114,101,97,109,98,117,102,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,101,114,114,111,114,95,99,97,116,101,103,111,114,121,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,98,97,115,105,99,95,105,111,115,116,114,101,97,109,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,78,83,116,51,95,95,49,49,52,98,97,115,105,99,95,105,102,115,116,114,101,97,109,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,78,83,116,51,95,95,49,49,52,95,95,115,104,97,114,101,100,95,99,111,117,110,116,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,95,95,110,117,109,95,112,117,116,95,98,97,115,101,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,95,95,110,117,109,95,103,101,116,95,98,97,115,101,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,51,109,101,115,115,97,103,101,115,95,98,97,115,101,69,0,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,111,115,116,114,101,97,109,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,111,115,116,114,101,97,109,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,105,115,116,114,101,97,109,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,105,115,116,114,101,97,109,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,102,105,108,101,98,117,102,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,78,83,116,51,95,95,49,49,50,115,121,115,116,101,109,95,101,114,114,111,114,69,0,0,78,83,116,51,95,95,49,49,50,99,111,100,101,99,118,116,95,98,97,115,101,69,0,0,78,83,116,51,95,95,49,49,50,95,95,100,111,95,109,101,115,115,97,103,101,69,0,0,78,83,116,51,95,95,49,49,49,95,95,115,116,100,111,117,116,98,117,102,73,119,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,49,95,95,115,116,100,111,117,116,98,117,102,73,99,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,112,117,116,73,119,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,112,117,116,73,99,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,103,101,116,73,119,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,103,101,116,73,99,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,119,76,98,49,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,119,76,98,48,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,99,76,98,49,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,99,76,98,48,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,95,98,97,115,101,69,0,0,0,0,78,83,116,51,95,95,49,49,48,99,116,121,112,101,95,98,97,115,101,69,0,0,0,0,78,83,116,51,95,95,49,49,48,95,95,116,105,109,101,95,112,117,116,69,0,0,0,0,78,83,116,51,95,95,49,49,48,95,95,115,116,100,105,110,98,117,102,73,119,69,69,0,78,83,116,51,95,95,49,49,48,95,95,115,116,100,105,110,98,117,102,73,99,69,69,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,49,95,95,118,109,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,48,95,95,115,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,55,95,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,54,95,95,115,104,105,109,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,0,0,0,0,0,0,0,0,88,26,0,0,0,0,0,0,104,26,0,0,0,0,0,0,120,26,0,0,64,39,0,0,0,0,0,0,0,0,0,0,136,26,0,0,64,39,0,0,0,0,0,0,0,0,0,0,152,26,0,0,120,39,0,0,0,0,0,0,0,0,0,0,176,26,0,0,64,39,0,0,0,0,0,0,0,0,0,0,200,26,0,0,152,39,0,0,0,0,0,0,0,0,0,0,224,26,0,0,64,39,0,0,0,0,0,0,0,0,0,0,240,26,0,0,48,26,0,0,8,27,0,0,0,0,0,0,2,0,0,0,216,42,0,0,2,0,0,0,184,44,0,0,0,0,0,0,48,26,0,0,80,27,0,0,0,0,0,0,2,0,0,0,216,42,0,0,2,0,0,0,192,44,0,0,0,0,0,0,48,26,0,0,152,27,0,0,0,0,0,0,2,0,0,0,216,42,0,0,2,0,0,0].concat([200,44,0,0,0,0,0,0,48,26,0,0,224,27,0,0,0,0,0,0,2,0,0,0,216,42,0,0,2,0,0,0,208,44,0,0,0,0,0,0,0,0,0,0,40,28,0,0,160,41,0,0,0,0,0,0,0,0,0,0,88,28,0,0,160,41,0,0,0,0,0,0,48,26,0,0,136,28,0,0,0,0,0,0,1,0,0,0,232,43,0,0,0,0,0,0,48,26,0,0,160,28,0,0,0,0,0,0,1,0,0,0,232,43,0,0,0,0,0,0,48,26,0,0,184,28,0,0,0,0,0,0,1,0,0,0,240,43,0,0,0,0,0,0,48,26,0,0,208,28,0,0,0,0,0,0,1,0,0,0,240,43,0,0,0,0,0,0,48,26,0,0,232,28,0,0,0,0,0,0,2,0,0,0,216,42,0,0,2,0,0,0,104,45,0,0,0,8,0,0,48,26,0,0,48,29,0,0,0,0,0,0,2,0,0,0,216,42,0,0,2,0,0,0,104,45,0,0,0,8,0,0,48,26,0,0,120,29,0,0,0,0,0,0,3,0,0,0,216,42,0,0,2,0,0,0,168,39,0,0,2,0,0,0,56,43,0,0,0,8,0,0,48,26,0,0,192,29,0,0,0,0,0,0,3,0,0,0,216,42,0,0,2,0,0,0,168,39,0,0,2,0,0,0,64,43,0,0,0,8,0,0,0,0,0,0,8,30,0,0,216,42,0,0,0,0,0,0,0,0,0,0,32,30,0,0,216,42,0,0,0,0,0,0,48,26,0,0,56,30,0,0,0,0,0,0,2,0,0,0,216,42,0,0,2,0,0,0,248,43,0,0,2,0,0,0,48,26,0,0,80,30,0,0,0,0,0,0,2,0,0,0,216,42,0,0,2,0,0,0,248,43,0,0,2,0,0,0,0,0,0,0,104,30,0,0,0,0,0,0,128,30,0,0,112,44,0,0,0,0,0,0,48,26,0,0,160,30,0,0,0,0,0,0,2,0,0,0,216,42,0,0,2,0,0,0,80,40,0,0,0,0,0,0,48,26,0,0,232,30,0,0,0,0,0,0,2,0,0,0,216,42,0,0,2,0,0,0,104,40,0,0,0,0,0,0,48,26,0,0,48,31,0,0,0,0,0,0,2,0,0,0,216,42,0,0,2,0,0,0,128,40,0,0,0,0,0,0,48,26,0,0,120,31,0,0,0,0,0,0,2,0,0,0,216,42,0,0,2,0,0,0,152,40,0,0,0,0,0,0,0,0,0,0,192,31,0,0,216,42,0,0,0,0,0,0,0,0,0,0,216,31,0,0,216,42,0,0,0,0,0,0,48,26,0,0,240,31,0,0,0,0,0,0,2,0,0,0,216,42,0,0,2,0,0,0,128,44,0,0,2,0,0,0,48,26,0,0,24,32,0,0,0,0,0,0,2,0,0,0,216,42,0,0,2,0,0,0,128,44,0,0,2,0,0,0,48,26,0,0,64,32,0,0,0,0,0,0,2,0,0,0,216,42,0,0,2,0,0,0,128,44,0,0,2,0,0,0,48,26,0,0,104,32,0,0,0,0,0,0,2,0,0,0,216,42,0,0,2,0,0,0,128,44,0,0,2,0,0,0,0,0,0,0,144,32,0,0,224,43,0,0,0,0,0,0,0,0,0,0,168,32,0,0,216,42,0,0,0,0,0,0,48,26,0,0,192,32,0,0,0,0,0,0,2,0,0,0,216,42,0,0,2,0,0,0,96,45,0,0,2,0,0,0,48,26,0,0,216,32,0,0,0,0,0,0,2,0,0,0,216,42,0,0,2,0,0,0,96,45,0,0,2,0,0,0,0,0,0,0,240,32,0,0,0,0,0,0,24,33,0,0,0,0,0,0,64,33,0,0,136,44,0,0,0,0,0,0,0,0,0,0,96,33,0,0,176,43,0,0,0,0,0,0,0,0,0,0,168,33,0,0,184,42,0,0,0,0,0,0,0,0,0,0,208,33,0,0,184,42,0,0,0,0,0,0,0,0,0,0,248,33,0,0,160,43,0,0,0,0,0,0,0,0,0,0,64,34,0,0,0,0,0,0,120,34,0,0,0,0,0,0,176,34,0,0,48,26,0,0,208,34,0,0,3,0,0,0,2,0,0,0,72,44,0,0,2,0,0,0,24,44,0,0,2,8,0,0,0,0,0,0,0,35,0,0,72,44,0,0,0,0,0,0,0,0,0,0,48,35,0,0,0,0,0,0,80,35,0,0,0,0,0,0,112,35,0,0,0,0,0,0,144,35,0,0,48,26,0,0,168,35,0,0,0,0,0,0,1,0,0,0,48,40,0,0,3,244,255,255,48,26,0,0,216,35,0,0,0,0,0,0,1,0,0,0,64,40,0,0,3,244,255,255,48,26,0,0,8,36,0,0,0,0,0,0,1,0,0,0,48,40,0,0,3,244,255,255,48,26,0,0,56,36,0,0,0,0,0,0,1,0,0,0,64,40,0,0,3,244,255,255,0,0,0,0,104,36,0,0,160,43,0,0,0,0,0,0,0,0,0,0,152,36,0,0,120,39,0,0,0,0,0,0,0,0,0,0,176,36,0,0,0,0,0,0,200,36,0,0,168,43,0,0,0,0,0,0,0,0,0,0,224,36,0,0,152,43,0,0,0,0,0,0,0,0,0,0,0,37,0,0,160,43,0,0,0,0,0,0,0,0,0,0,32,37,0,0,0,0,0,0,64,37,0,0,0,0,0,0,96,37,0,0,0,0,0,0,128,37,0,0,48,26,0,0,160,37,0,0,0,0,0,0,2,0,0,0,216,42,0,0,2,0,0,0,88,45,0,0,2,0,0,0,48,26,0,0,192,37,0,0,0,0,0,0,2,0,0,0,216,42,0,0,2,0,0,0,88,45,0,0,2,0,0,0,48,26,0,0,224,37,0,0,0,0,0,0,2,0,0,0,216,42,0,0,2,0,0,0,88,45,0,0,2,0,0,0,48,26,0,0,0,38,0,0,0,0,0,0,2,0,0,0,216,42,0,0,2,0,0,0,88,45,0,0,2,0,0,0,0,0,0,0,32,38,0,0,0,0,0,0,56,38,0,0,0,0,0,0,80,38,0,0,0,0,0,0,104,38,0,0,152,43,0,0,0,0,0,0,0,0,0,0,128,38,0,0,160,43,0,0,0,0,0,0,0,0,0,0,152,38,0,0,176,45,0,0,0,0,0,0,0,0,0,0,192,38,0,0,176,45,0,0,0,0,0,0,0,0,0,0,232,38,0,0,192,45,0,0,0,0,0,0,0,0,0,0,16,39,0,0,56,39,0,0,0,0,0,0,64,0,0,0,0,0,0,0,72,44,0,0,126,0,0,0,232,0,0,0,192,255,255,255,192,255,255,255,72,44,0,0,156,0,0,0,64,0,0,0,108,0,0,0,0,0,0,0,72,44,0,0,126,0,0,0,232,0,0,0,148,255,255,255,148,255,255,255,72,44,0,0,156,0,0,0,64,0,0,0,48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102,65,66,67,68,69,70,120,88,43,45,112,80,105,73,110,78,0,0,0,0,0,0,0,0,1,0,0,0,11,0,0,0,13,0,0,0,17,0,0,0,19,0,0,0,23,0,0,0,29,0,0,0,31,0,0,0,37,0,0,0,41,0,0,0,43,0,0,0,47,0,0,0,53,0,0,0,59,0,0,0,61,0,0,0,67,0,0,0,71,0,0,0,73,0,0,0,79,0,0,0,83,0,0,0,89,0,0,0,97,0,0,0,101,0,0,0,103,0,0,0,107,0,0,0,109,0,0,0,113,0,0,0,121,0,0,0,127,0,0,0,131,0,0,0,137,0,0,0,139,0,0,0,143,0,0,0,149,0,0,0,151,0,0,0,157,0,0,0,163,0,0,0,167,0,0,0,169,0,0,0,173,0,0,0,179,0,0,0,181,0,0,0,187,0,0,0,191,0,0,0,193,0,0,0,197,0,0,0,199,0,0,0,209,0,0,0,0,0,0,0,2,0,0,0,3,0,0,0,5,0,0,0,7,0,0,0,11,0,0,0,13,0,0,0,17,0,0,0,19,0,0,0,23,0,0,0,29,0,0,0,31,0,0,0,37,0,0,0,41,0,0,0,43,0,0,0,47,0,0,0,53,0,0,0,59,0,0,0,61,0,0,0,67,0,0,0,71,0,0,0,73,0,0,0,79,0,0,0,83,0,0,0,89,0,0,0,97,0,0,0,101,0,0,0,103,0,0,0,107,0,0,0,109,0,0,0,113,0,0,0,127,0,0,0,131,0,0,0,137,0,0,0,139,0,0,0,149,0,0,0,151,0,0,0,157,0,0,0,163,0,0,0,167,0,0,0,173,0,0,0,179,0,0,0,181,0,0,0,191,0,0,0,193,0,0,0,197,0,0,0,199,0,0,0,211,0,0,0])
, "i8", ALLOC_NONE, Runtime.GLOBAL_BASE)
var tempDoublePtr = Runtime.alignMemory(allocate(12, "i8", ALLOC_STATIC), 8);
assert(tempDoublePtr % 8 == 0);
function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];
  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];
  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];
}
function copyTempDouble(ptr) {
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];
  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];
  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];
  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];
  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];
  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];
  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];
}
  function ___assert_fail(condition, filename, line, func) {
      ABORT = true;
      throw 'Assertion failed: ' + Pointer_stringify(condition) + ', at: ' + [filename ? Pointer_stringify(filename) : 'unknown filename', line, func ? Pointer_stringify(func) : 'unknown function'] + ' at ' + stackTrace();
    }
  function ___gxx_personality_v0() {
    }
  var GL={counter:1,lastError:0,buffers:[],programs:[],framebuffers:[],renderbuffers:[],textures:[],uniforms:[],shaders:[],currArrayBuffer:0,currElementArrayBuffer:0,byteSizeByTypeRoot:5120,byteSizeByType:[1,1,2,2,4,4,4,2,3,4,8],programInfos:{},stringCache:{},packAlignment:4,unpackAlignment:4,init:function () {
        Browser.moduleContextCreatedCallbacks.push(GL.initExtensions);
      },recordError:function recordError(errorCode) {
        if (!GL.lastError) {
          GL.lastError = errorCode;
        }
      },getNewId:function (table) {
        var ret = GL.counter++;
        for (var i = table.length; i < ret; i++) {
          table[i] = null;
        }
        return ret;
      },MINI_TEMP_BUFFER_SIZE:16,miniTempBuffer:null,miniTempBufferViews:[0],MAX_TEMP_BUFFER_SIZE:2097152,tempBufferIndexLookup:null,tempVertexBuffers:null,tempIndexBuffers:null,tempQuadIndexBuffer:null,generateTempBuffers:function (quads) {
        GL.tempBufferIndexLookup = new Uint8Array(GL.MAX_TEMP_BUFFER_SIZE+1);
        GL.tempVertexBuffers = [];
        GL.tempIndexBuffers = [];
        var last = -1, curr = -1;
        var size = 1;
        for (var i = 0; i <= GL.MAX_TEMP_BUFFER_SIZE; i++) {
          if (i > size) {
            size <<= 1;
          }
          if (size != last) {
            curr++;
            GL.tempVertexBuffers[curr] = Module.ctx.createBuffer();
            Module.ctx.bindBuffer(Module.ctx.ARRAY_BUFFER, GL.tempVertexBuffers[curr]);
            Module.ctx.bufferData(Module.ctx.ARRAY_BUFFER, size, Module.ctx.DYNAMIC_DRAW);
            Module.ctx.bindBuffer(Module.ctx.ARRAY_BUFFER, null);
            GL.tempIndexBuffers[curr] = Module.ctx.createBuffer();
            Module.ctx.bindBuffer(Module.ctx.ELEMENT_ARRAY_BUFFER, GL.tempIndexBuffers[curr]);
            Module.ctx.bufferData(Module.ctx.ELEMENT_ARRAY_BUFFER, size, Module.ctx.DYNAMIC_DRAW);
            Module.ctx.bindBuffer(Module.ctx.ELEMENT_ARRAY_BUFFER, null);
            last = size;
          }
          GL.tempBufferIndexLookup[i] = curr;
        }
        if (quads) {
          // GL_QUAD indexes can be precalculated
          GL.tempQuadIndexBuffer = Module.ctx.createBuffer();
          Module.ctx.bindBuffer(Module.ctx.ELEMENT_ARRAY_BUFFER, GL.tempQuadIndexBuffer);
          var numIndexes = GL.MAX_TEMP_BUFFER_SIZE >> 1;
          var quadIndexes = new Uint16Array(numIndexes);
          var i = 0, v = 0;
          while (1) {
            quadIndexes[i++] = v;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+1;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+2;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+2;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+3;
            if (i >= numIndexes) break;
            v += 4;
          }
          Module.ctx.bufferData(Module.ctx.ELEMENT_ARRAY_BUFFER, quadIndexes, Module.ctx.STATIC_DRAW);
          Module.ctx.bindBuffer(Module.ctx.ELEMENT_ARRAY_BUFFER, null);
        }
      },findToken:function (source, token) {
        function isIdentChar(ch) {
          if (ch >= 48 && ch <= 57) // 0-9
            return true;
          if (ch >= 65 && ch <= 90) // A-Z
            return true;
          if (ch >= 97 && ch <= 122) // a-z
            return true;
          return false;
        }
        var i = -1;
        do {
          i = source.indexOf(token, i + 1);
          if (i < 0) {
            break;
          }
          if (i > 0 && isIdentChar(source[i - 1])) {
            continue;
          }
          i += token.length;
          if (i < source.length - 1 && isIdentChar(source[i + 1])) {
            continue;
          }
          return true;
        } while (true);
        return false;
      },getSource:function (shader, count, string, length) {
        var source = '';
        for (var i = 0; i < count; ++i) {
          var frag;
          if (length) {
            var len = HEAP32[(((length)+(i*4))>>2)];
            if (len < 0) {
              frag = Pointer_stringify(HEAP32[(((string)+(i*4))>>2)]);
            } else {
              frag = Pointer_stringify(HEAP32[(((string)+(i*4))>>2)], len);
            }
          } else {
            frag = Pointer_stringify(HEAP32[(((string)+(i*4))>>2)]);
          }
          source += frag;
        }
        // Let's see if we need to enable the standard derivatives extension
        type = Module.ctx.getShaderParameter(GL.shaders[shader], 0x8B4F /* GL_SHADER_TYPE */);
        if (type == 0x8B30 /* GL_FRAGMENT_SHADER */) {
          if (GL.findToken(source, "dFdx") ||
              GL.findToken(source, "dFdy") ||
              GL.findToken(source, "fwidth")) {
            source = "#extension GL_OES_standard_derivatives : enable\n" + source;
            var extension = Module.ctx.getExtension("OES_standard_derivatives");
          }
        }
        return source;
      },computeImageSize:function (width, height, sizePerPixel, alignment) {
        function roundedToNextMultipleOf(x, y) {
          return Math.floor((x + y - 1) / y) * y
        }
        var plainRowSize = width * sizePerPixel;
        var alignedRowSize = roundedToNextMultipleOf(plainRowSize, alignment);
        return (height <= 0) ? 0 :
                 ((height - 1) * alignedRowSize + plainRowSize);
      },get:function (name_, p, type) {
        var ret = undefined;
        switch(name_) { // Handle a few trivial GLES values
          case 0x8DFA: // GL_SHADER_COMPILER
            ret = 1;
            break;
          case 0x8DF8: // GL_SHADER_BINARY_FORMATS
            if (type === 'Integer') {
              // fall through, see gles2_conformance.cpp
            } else {
              GL.recordError(0x0500); // GL_INVALID_ENUM
              return;
            }
          case 0x8DF9: // GL_NUM_SHADER_BINARY_FORMATS
            ret = 0;
            break;
          case 0x86A2: // GL_NUM_COMPRESSED_TEXTURE_FORMATS
            // WebGL doesn't have GL_NUM_COMPRESSED_TEXTURE_FORMATS (it's obsolete since GL_COMPRESSED_TEXTURE_FORMATS returns a JS array that can be queried for length),
            // so implement it ourselves to allow C++ GLES2 code get the length.
            var formats = Module.ctx.getParameter(0x86A3 /*GL_COMPRESSED_TEXTURE_FORMATS*/);
            ret = formats.length;
            break;
          case 0x8B9A: // GL_IMPLEMENTATION_COLOR_READ_TYPE
            ret = 0x1401; // GL_UNSIGNED_BYTE
            break;
          case 0x8B9B: // GL_IMPLEMENTATION_COLOR_READ_FORMAT
            ret = 0x1908; // GL_RGBA
            break;
        }
        if (ret === undefined) {
          var result = Module.ctx.getParameter(name_);
          switch (typeof(result)) {
            case "number":
              ret = result;
              break;
            case "boolean":
              ret = result ? 1 : 0;
              break;
            case "string":
              GL.recordError(0x0500); // GL_INVALID_ENUM
              return;
            case "object":
              if (result === null) {
                GL.recordError(0x0500); // GL_INVALID_ENUM
                return;
              } else if (result instanceof Float32Array ||
                         result instanceof Uint32Array ||
                         result instanceof Int32Array ||
                         result instanceof Array) {
                for (var i = 0; i < result.length; ++i) {
                  switch (type) {
                    case 'Integer': HEAP32[(((p)+(i*4))>>2)]=result[i];   break;
                    case 'Float':   HEAPF32[(((p)+(i*4))>>2)]=result[i]; break;
                    case 'Boolean': HEAP8[(((p)+(i))|0)]=result[i] ? 1 : 0;    break;
                    default: throw 'internal glGet error, bad type: ' + type;
                  }
                }
                return;
              } else if (result instanceof WebGLBuffer ||
                         result instanceof WebGLProgram ||
                         result instanceof WebGLFramebuffer ||
                         result instanceof WebGLRenderbuffer ||
                         result instanceof WebGLTexture) {
                ret = result.name | 0;
              } else {
                GL.recordError(0x0500); // GL_INVALID_ENUM
                return;
              }
              break;
            default:
              GL.recordError(0x0500); // GL_INVALID_ENUM
              return;
          }
        }
        switch (type) {
          case 'Integer': HEAP32[((p)>>2)]=ret;    break;
          case 'Float':   HEAPF32[((p)>>2)]=ret;  break;
          case 'Boolean': HEAP8[(p)]=ret ? 1 : 0; break;
          default: throw 'internal glGet error, bad type: ' + type;
        }
      },getTexPixelData:function (type, format, width, height, pixels, internalFormat) {
        var sizePerPixel;
        switch (type) {
          case 0x1401 /* GL_UNSIGNED_BYTE */:
            switch (format) {
              case 0x1906 /* GL_ALPHA */:
              case 0x1909 /* GL_LUMINANCE */:
                sizePerPixel = 1;
                break;
              case 0x1907 /* GL_RGB */:
                sizePerPixel = 3;
                break;
              case 0x1908 /* GL_RGBA */:
                sizePerPixel = 4;
                break;
              case 0x190A /* GL_LUMINANCE_ALPHA */:
                sizePerPixel = 2;
                break;
              default:
                throw 'Invalid format (' + format + ')';
            }
            break;
          case 0x1403 /* GL_UNSIGNED_SHORT */:
            if (format == 0x1902 /* GL_DEPTH_COMPONENT */) {
              sizePerPixel = 2;
            } else {
              throw 'Invalid format (' + format + ')';
            }
            break;
          case 0x1405 /* GL_UNSIGNED_INT */:
            if (format == 0x1902 /* GL_DEPTH_COMPONENT */) {
              sizePerPixel = 4;
            } else {
              throw 'Invalid format (' + format + ')';
            }
            break;
          case 0x84FA /* UNSIGNED_INT_24_8_WEBGL */:
            sizePerPixel = 4;
            break;
          case 0x8363 /* GL_UNSIGNED_SHORT_5_6_5 */:
          case 0x8033 /* GL_UNSIGNED_SHORT_4_4_4_4 */:
          case 0x8034 /* GL_UNSIGNED_SHORT_5_5_5_1 */:
            sizePerPixel = 2;
            break;
          case 0x1406 /* GL_FLOAT */:
            switch (format) {
              case 0x1907 /* GL_RGB */:
                sizePerPixel = 3*4;
                break;
              case 0x1908 /* GL_RGBA */:
                sizePerPixel = 4*4;
                break;
              default:
                throw 'Invalid format (' + format + ')';
            }
            internalFormat = Module.ctx.RGBA;
            break;
          default:
            throw 'Invalid type (' + type + ')';
        }
        var bytes = GL.computeImageSize(width, height, sizePerPixel, GL.unpackAlignment);
        if (type == 0x1401 /* GL_UNSIGNED_BYTE */) {
          pixels = HEAPU8.subarray((pixels),(pixels+bytes));
        } else if (type == 0x1406 /* GL_FLOAT */) {
          pixels = HEAPF32.subarray((pixels)>>2,(pixels+bytes)>>2);
        } else if (type == 0x1405 /* GL_UNSIGNED_INT */ || type == 0x84FA /* UNSIGNED_INT_24_8_WEBGL */) {
          pixels = HEAPU32.subarray((pixels)>>2,(pixels+bytes)>>2);
        } else {
          pixels = HEAPU16.subarray((pixels)>>1,(pixels+bytes)>>1);
        }
        return {
          pixels: pixels,
          internalFormat: internalFormat
        }
      },initExtensions:function () {
        if (GL.initExtensions.done) return;
        GL.initExtensions.done = true;
        if (!Module.useWebGL) return; // an app might link both gl and 2d backends
        GL.miniTempBuffer = new Float32Array(GL.MINI_TEMP_BUFFER_SIZE);
        for (var i = 0; i < GL.MINI_TEMP_BUFFER_SIZE; i++) {
          GL.miniTempBufferViews[i] = GL.miniTempBuffer.subarray(0, i+1);
        }
        GL.maxVertexAttribs = Module.ctx.getParameter(Module.ctx.MAX_VERTEX_ATTRIBS);
        // Detect the presence of a few extensions manually, this GL interop layer itself will need to know if they exist. 
        GL.compressionExt = Module.ctx.getExtension('WEBGL_compressed_texture_s3tc') ||
                            Module.ctx.getExtension('MOZ_WEBGL_compressed_texture_s3tc') ||
                            Module.ctx.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');
        GL.anisotropicExt = Module.ctx.getExtension('EXT_texture_filter_anisotropic') ||
                            Module.ctx.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
                            Module.ctx.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
        GL.floatExt = Module.ctx.getExtension('OES_texture_float');
        // These are the 'safe' feature-enabling extensions that don't add any performance impact related to e.g. debugging, and
        // should be enabled by default so that client GLES2/GL code will not need to go through extra hoops to get its stuff working.
        // As new extensions are ratified at http://www.khronos.org/registry/webgl/extensions/ , feel free to add your new extensions
        // here, as long as they don't produce a performance impact for users that might not be using those extensions.
        // E.g. debugging-related extensions should probably be off by default.
        var automaticallyEnabledExtensions = [ "OES_texture_float", "OES_texture_half_float", "OES_standard_derivatives",
                                               "OES_vertex_array_object", "WEBGL_compressed_texture_s3tc", "WEBGL_depth_texture",
                                               "OES_element_index_uint", "EXT_texture_filter_anisotropic", "ANGLE_instanced_arrays",
                                               "OES_texture_float_linear", "OES_texture_half_float_linear", "WEBGL_compressed_texture_atc",
                                               "WEBGL_compressed_texture_pvrtc", "EXT_color_buffer_half_float", "WEBGL_color_buffer_float",
                                               "EXT_frag_depth", "EXT_sRGB", "WEBGL_draw_buffers", "WEBGL_shared_resources" ];
        function shouldEnableAutomatically(extension) {
          for(var i in automaticallyEnabledExtensions) {
            var include = automaticallyEnabledExtensions[i];
            if (ext.indexOf(include) != -1) {
              return true;
            }
          }
          return false;
        }
        var extensions = Module.ctx.getSupportedExtensions();
        for(var e in extensions) {
          var ext = extensions[e].replace('MOZ_', '').replace('WEBKIT_', '');
          if (automaticallyEnabledExtensions.indexOf(ext) != -1) {
            Module.ctx.getExtension(ext); // Calling .getExtension enables that extension permanently, no need to store the return value to be enabled.
          }
        }
      },populateUniformTable:function (program) {
        var p = GL.programs[program];
        GL.programInfos[program] = {
          uniforms: {},
          maxUniformLength: 0, // This is eagerly computed below, since we already enumerate all uniforms anyway.
          maxAttributeLength: -1 // This is lazily computed and cached, computed when/if first asked, "-1" meaning not computed yet.
        };
        var ptable = GL.programInfos[program];
        var utable = ptable.uniforms;
        // A program's uniform table maps the string name of an uniform to an integer location of that uniform.
        // The global GL.uniforms map maps integer locations to WebGLUniformLocations.
        var numUniforms = Module.ctx.getProgramParameter(p, Module.ctx.ACTIVE_UNIFORMS);
        for (var i = 0; i < numUniforms; ++i) {
          var u = Module.ctx.getActiveUniform(p, i);
          var name = u.name;
          ptable.maxUniformLength = Math.max(ptable.maxUniformLength, name.length+1);
          // Strip off any trailing array specifier we might have got, e.g. "[0]".
          if (name.indexOf(']', name.length-1) !== -1) {
            var ls = name.lastIndexOf('[');
            name = name.slice(0, ls);
          }
          // Optimize memory usage slightly: If we have an array of uniforms, e.g. 'vec3 colors[3];', then 
          // only store the string 'colors' in utable, and 'colors[0]', 'colors[1]' and 'colors[2]' will be parsed as 'colors'+i.
          // Note that for the GL.uniforms table, we still need to fetch the all WebGLUniformLocations for all the indices.
          var loc = Module.ctx.getUniformLocation(p, name);
          var id = GL.getNewId(GL.uniforms);
          utable[name] = [u.size, id];
          GL.uniforms[id] = loc;
          for (var j = 1; j < u.size; ++j) {
            var n = name + '['+j+']';
            loc = Module.ctx.getUniformLocation(p, n);
            id = GL.getNewId(GL.uniforms);
            GL.uniforms[id] = loc;
          }
        }
      }};function _glGetString(name_) {
      if (GL.stringCache[name_]) return GL.stringCache[name_];
      var ret; 
      switch(name_) {
        case 0x1F00 /* GL_VENDOR */:
        case 0x1F01 /* GL_RENDERER */:
        case 0x1F02 /* GL_VERSION */:
          ret = allocate(intArrayFromString(Module.ctx.getParameter(name_)), 'i8', ALLOC_NORMAL);
          break;
        case 0x1F03 /* GL_EXTENSIONS */:
          var exts = Module.ctx.getSupportedExtensions();
          var gl_exts = [];
          for (i in exts) {
            gl_exts.push(exts[i]);
            gl_exts.push("GL_" + exts[i]);
          }
          ret = allocate(intArrayFromString(gl_exts.join(' ')), 'i8', ALLOC_NORMAL);
          break;
        case 0x8B8C /* GL_SHADING_LANGUAGE_VERSION */:
          ret = allocate(intArrayFromString('OpenGL ES GLSL 1.00 (WebGL)'), 'i8', ALLOC_NORMAL);
          break;
        default:
          GL.recordError(0x0500/*GL_INVALID_ENUM*/);
          return 0;
      }
      GL.stringCache[name_] = ret;
      return ret;
    }
  function _glGetIntegerv(name_, p) {
      return GL.get(name_, p, 'Integer');
    }
  function _emscripten_asm_const(code) {
      Runtime.getAsmConst(code, 0)();
    }
  function _glViewport(x0, x1, x2, x3) { Module.ctx.viewport(x0, x1, x2, x3) }
  function _glGenBuffers(n, buffers) {
      for (var i = 0; i < n; i++) {
        var id = GL.getNewId(GL.buffers);
        var buffer = Module.ctx.createBuffer();
        buffer.name = id;
        GL.buffers[id] = buffer;
        HEAP32[(((buffers)+(i*4))>>2)]=id;
      }
    }
  function _glBindBuffer(target, buffer) {
      var bufferObj = buffer ? GL.buffers[buffer] : null;
      if (target == Module.ctx.ARRAY_BUFFER) {
        GL.currArrayBuffer = buffer;
      } else if (target == Module.ctx.ELEMENT_ARRAY_BUFFER) {
        GL.currElementArrayBuffer = buffer;
      }
      Module.ctx.bindBuffer(target, bufferObj);
    }
  function _glBufferData(target, size, data, usage) {
      switch (usage) { // fix usages, WebGL only has *_DRAW
        case 0x88E1: // GL_STREAM_READ
        case 0x88E2: // GL_STREAM_COPY
          usage = 0x88E0; // GL_STREAM_DRAW
          break;
        case 0x88E5: // GL_STATIC_READ
        case 0x88E6: // GL_STATIC_COPY
          usage = 0x88E4; // GL_STATIC_DRAW
          break;
        case 0x88E9: // GL_DYNAMIC_READ
        case 0x88EA: // GL_DYNAMIC_COPY
          usage = 0x88E8; // GL_DYNAMIC_DRAW
          break;
      }
      Module.ctx.bufferData(target, HEAPU8.subarray(data, data+size), usage);
    }
  function _glGenFramebuffers(n, ids) {
      for (var i = 0; i < n; ++i) {
        var id = GL.getNewId(GL.framebuffers);
        var framebuffer = Module.ctx.createFramebuffer();
        framebuffer.name = id;
        GL.framebuffers[id] = framebuffer;
        HEAP32[(((ids)+(i*4))>>2)]=id;
      }
    }
  function _glGenTextures(n, textures) {
      for (var i = 0; i < n; i++) {
        var id = GL.getNewId(GL.textures);
        var texture = Module.ctx.createTexture();
        texture.name = id;
        GL.textures[id] = texture;
        HEAP32[(((textures)+(i*4))>>2)]=id;
      }
    }
  function _glBindTexture(target, texture) {
      Module.ctx.bindTexture(target, texture ? GL.textures[texture] : null);
    }
  function _glTexImage2D(target, level, internalFormat, width, height, border, format, type, pixels) {
      if (pixels) {
        var data = GL.getTexPixelData(type, format, width, height, pixels, internalFormat);
        pixels = data.pixels;
        internalFormat = data.internalFormat;
      } else {
        pixels = null;
      }
      Module.ctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
    }
  function _glTexParameteri(x0, x1, x2) { Module.ctx.texParameteri(x0, x1, x2) }
  function _glBindFramebuffer(target, framebuffer) {
      Module.ctx.bindFramebuffer(target, framebuffer ? GL.framebuffers[framebuffer] : null);
    }
  function _glFramebufferTexture2D(target, attachment, textarget, texture, level) {
      Module.ctx.framebufferTexture2D(target, attachment, textarget,
                                      GL.textures[texture], level);
    }
  function _glCheckFramebufferStatus(x0) { return Module.ctx.checkFramebufferStatus(x0) }
  function _glDisable(x0) { Module.ctx.disable(x0) }
  function _glClearColor(x0, x1, x2, x3) { Module.ctx.clearColor(x0, x1, x2, x3) }
  function _glClear(x0) { Module.ctx.clear(x0) }
  function _glEnableVertexAttribArray(index) {
      Module.ctx.enableVertexAttribArray(index);
    }
  function _glVertexAttribPointer(index, size, type, normalized, stride, ptr) {
      Module.ctx.vertexAttribPointer(index, size, type, normalized, stride, ptr);
    }
  function _glDrawArrays(mode, first, count) {
      Module.ctx.drawArrays(mode, first, count);
    }
  function _glDisableVertexAttribArray(index) {
      Module.ctx.disableVertexAttribArray(index);
    }
  function _glActiveTexture(x0) { Module.ctx.activeTexture(x0) }
  var GLFW={keyFunc:null,charFunc:null,mouseButtonFunc:null,mousePosFunc:null,mouseWheelFunc:null,resizeFunc:null,closeFunc:null,refreshFunc:null,params:null,initTime:null,wheelPos:0,buttons:0,keys:0,initWindowWidth:640,initWindowHeight:480,windowX:0,windowY:0,windowWidth:0,windowHeight:0,DOMToGLFWKeyCode:function (keycode) {
        switch (keycode) {
          case 0x09: return 295 ; //DOM_VK_TAB -> GLFW_KEY_TAB
          case 0x1B: return 255 ; //DOM_VK_ESCAPE -> GLFW_KEY_ESC
          case 0x6A: return 313 ; //DOM_VK_MULTIPLY -> GLFW_KEY_KP_MULTIPLY
          case 0x6B: return 315 ; //DOM_VK_ADD -> GLFW_KEY_KP_ADD
          case 0x6D: return 314 ; //DOM_VK_SUBTRACT -> GLFW_KEY_KP_SUBTRACT
          case 0x6E: return 316 ; //DOM_VK_DECIMAL -> GLFW_KEY_KP_DECIMAL
          case 0x6F: return 312 ; //DOM_VK_DIVIDE -> GLFW_KEY_KP_DIVIDE
          case 0x70: return 258 ; //DOM_VK_F1 -> GLFW_KEY_F1
          case 0x71: return 259 ; //DOM_VK_F2 -> GLFW_KEY_F2
          case 0x72: return 260 ; //DOM_VK_F3 -> GLFW_KEY_F3
          case 0x73: return 261 ; //DOM_VK_F4 -> GLFW_KEY_F4
          case 0x74: return 262 ; //DOM_VK_F5 -> GLFW_KEY_F5
          case 0x75: return 263 ; //DOM_VK_F6 -> GLFW_KEY_F6
          case 0x76: return 264 ; //DOM_VK_F7 -> GLFW_KEY_F7
          case 0x77: return 265 ; //DOM_VK_F8 -> GLFW_KEY_F8
          case 0x78: return 266 ; //DOM_VK_F9 -> GLFW_KEY_F9
          case 0x79: return 267 ; //DOM_VK_F10 -> GLFW_KEY_F10
          case 0x7a: return 268 ; //DOM_VK_F11 -> GLFW_KEY_F11
          case 0x7b: return 269 ; //DOM_VK_F12 -> GLFW_KEY_F12
          case 0x25: return 285 ; //DOM_VK_LEFT -> GLFW_KEY_LEFT
          case 0x26: return 283 ; //DOM_VK_UP -> GLFW_KEY_UP
          case 0x27: return 286 ; //DOM_VK_RIGHT -> GLFW_KEY_RIGHT
          case 0x28: return 284 ; //DOM_VK_DOWN -> GLFW_KEY_DOWN
          case 0x21: return 298 ; //DOM_VK_PAGE_UP -> GLFW_KEY_PAGEUP
          case 0x22: return 299 ; //DOM_VK_PAGE_DOWN -> GLFW_KEY_PAGEDOWN
          case 0x24: return 300 ; //DOM_VK_HOME -> GLFW_KEY_HOME
          case 0x23: return 301 ; //DOM_VK_END -> GLFW_KEY_END
          case 0x2d: return 296 ; //DOM_VK_INSERT -> GLFW_KEY_INSERT
          case 16  : return 287 ; //DOM_VK_SHIFT -> GLFW_KEY_LSHIFT
          case 0x05: return 287 ; //DOM_VK_LEFT_SHIFT -> GLFW_KEY_LSHIFT
          case 0x06: return 288 ; //DOM_VK_RIGHT_SHIFT -> GLFW_KEY_RSHIFT
          case 17  : return 289 ; //DOM_VK_CONTROL -> GLFW_KEY_LCTRL
          case 0x03: return 289 ; //DOM_VK_LEFT_CONTROL -> GLFW_KEY_LCTRL
          case 0x04: return 290 ; //DOM_VK_RIGHT_CONTROL -> GLFW_KEY_RCTRL
          case 18  : return 291 ; //DOM_VK_ALT -> GLFW_KEY_LALT
          case 0x02: return 291 ; //DOM_VK_LEFT_ALT -> GLFW_KEY_LALT
          case 0x01: return 292 ; //DOM_VK_RIGHT_ALT -> GLFW_KEY_RALT
          case 96  : return 302 ; //GLFW_KEY_KP_0
          case 97  : return 303 ; //GLFW_KEY_KP_1
          case 98  : return 304 ; //GLFW_KEY_KP_2
          case 99  : return 305 ; //GLFW_KEY_KP_3
          case 100 : return 306 ; //GLFW_KEY_KP_4
          case 101 : return 307 ; //GLFW_KEY_KP_5
          case 102 : return 308 ; //GLFW_KEY_KP_6
          case 103 : return 309 ; //GLFW_KEY_KP_7
          case 104 : return 310 ; //GLFW_KEY_KP_8
          case 105 : return 311 ; //GLFW_KEY_KP_9
          default  : return keycode;
        };
      },getUnicodeChar:function (value) {
        var output = '';
        if (value > 0xFFFF) {
          value -= 0x10000;
          output += String.fromCharCode(value >>> 10 & 0x3FF | 0xD800);
          value = 0xDC00 | value & 0x3FF;
        }
        output += String.fromCharCode(value);
        return output;
      },onKeyPress:function (event) {
        //charCode is only available whith onKeyPress event
        var char = GLFW.getUnicodeChar(event.charCode);
        if (event.charCode) {
          var char = GLFW.getUnicodeChar(event.charCode);
          if (char !== null && GLFW.charFunc) {
            event.preventDefault();
            Runtime.dynCall('vii', GLFW.charFunc, [event.charCode, 1]);
          }
        }
      },onKeyChanged:function (event, status) {
        var key = GLFW.DOMToGLFWKeyCode(event.keyCode);
        if (key && GLFW.keyFunc) {
          GLFW.keys[key] = status;
          event.preventDefault();
          Runtime.dynCall('vii', GLFW.keyFunc, [key, status]);
        }
      },onKeydown:function (event) {
        GLFW.onKeyChanged(event, 1);//GLFW_PRESS
      },onKeyup:function (event) {
        GLFW.onKeyChanged(event, 0);//GLFW_RELEASE
      },onMousemove:function (event) {
        /* Send motion event only if the motion changed, prevents
         * spamming our app with uncessary callback call. It does happen in
         * Chrome on Windows.
         */
        var lastX = Browser.mouseX;
        var lastY = Browser.mouseY;
        Browser.calculateMouseEvent(event);
        var newX = Browser.mouseX;
        var newY = Browser.mouseY;
        if (event.target == Module["canvas"] && GLFW.mousePosFunc) {
          event.preventDefault();
          Runtime.dynCall('vii', GLFW.mousePosFunc, [lastX, lastY]);
        }
      },onMouseButtonChanged:function (event, status) {
        if (GLFW.mouseButtonFunc == null) {
          return;
        }
        Browser.calculateMouseEvent(event);
        if (event.target != Module["canvas"]) {
          return;
        }
        if (status == 1) {//GLFW_PRESS
          try {
            event.target.setCapture();
          } catch (e) {}
        }
        event.preventDefault();
        //DOM and glfw have the same button codes
        Runtime.dynCall('vii', GLFW.mouseButtonFunc, [event['button'], status]);
      },onMouseButtonDown:function (event) {
        GLFW.buttons |= (1 << event['button']);
        GLFW.onMouseButtonChanged(event, 1);//GLFW_PRESS
      },onMouseButtonUp:function (event) {
        GLFW.buttons &= ~(1 << event['button']);
        GLFW.onMouseButtonChanged(event, 0);//GLFW_RELEASE
      },onMouseWheel:function (event) {
        if (event.detail > 0) {
          GLFW.wheelPos++;
        }
        if (event.detail < 0) {
          GLFW.wheelPos--;
        }
        if (GLFW.mouseWheelFunc && event.target == Module["canvas"]) {
          Runtime.dynCall('vi', GLFW.mouseWheelFunc, [GLFW.wheelPos]);
          event.preventDefault();
        }
      },onFullScreenEventChange:function (event) {
        var width;
        var height;
        if (document["fullScreen"] || document["mozFullScreen"] || document["webkitIsFullScreen"]) {
          width = screen["width"];
          height = screen["height"];
        }
        else {
          width = GLFW.windowWidth;
          height = GLFW.windowHeight;
          // TODO set position
          document.removeEventListener('fullscreenchange', GLFW.onFullScreenEventChange, true);
          document.removeEventListener('mozfullscreenchange', GLFW.onFullScreenEventChange, true);
          document.removeEventListener('webkitfullscreenchange', GLFW.onFullScreenEventChange, true);
        }
        Browser.setCanvasSize(width, height);
        if (GLFW.resizeFunc) {
          Runtime.dynCall('vii', GLFW.resizeFunc, [width, height]);
        }
      },requestFullScreen:function () {
        var RFS = Module["canvas"]['requestFullscreen'] ||
                  Module["canvas"]['requestFullScreen'] ||
                  Module["canvas"]['mozRequestFullScreen'] ||
                  Module["canvas"]['webkitRequestFullScreen'] ||
                  (function() {});
        RFS.apply(Module["canvas"], []);
      },cancelFullScreen:function () {
        var CFS = document['exitFullscreen'] ||
                  document['cancelFullScreen'] ||
                  document['mozCancelFullScreen'] ||
                  document['webkitCancelFullScreen'] ||
            (function() {});
        CFS.apply(document, []);
      }};function _glfwInit() {
      GLFW.initTime = Date.now() / 1000;
      window.addEventListener("keydown", GLFW.onKeydown, true);
      window.addEventListener("keypress", GLFW.onKeyPress, true);
      window.addEventListener("keyup", GLFW.onKeyup, true);
      window.addEventListener("mousemove", GLFW.onMousemove, true);
      window.addEventListener("mousedown", GLFW.onMouseButtonDown, true);
      window.addEventListener("mouseup", GLFW.onMouseButtonUp, true);
      window.addEventListener('DOMMouseScroll', GLFW.onMouseWheel, true);
      window.addEventListener('mousewheel', GLFW.onMouseWheel, true);
      __ATEXIT__.push({ func: function() {
        window.removeEventListener("keydown", GLFW.onKeydown, true);
        window.removeEventListener("keypress", GLFW.onKeyPress, true);
        window.removeEventListener("keyup", GLFW.onKeyup, true);
        window.removeEventListener("mousemove", GLFW.onMousemove, true);
        window.removeEventListener("mousedown", GLFW.onMouseButtonDown, true);
        window.removeEventListener("mouseup", GLFW.onMouseButtonUp, true);
        window.removeEventListener('DOMMouseScroll', GLFW.onMouseWheel, true);
        window.removeEventListener('mousewheel', GLFW.onMouseWheel, true);
        Module["canvas"].width = Module["canvas"].height = 1;
      }});
      //TODO: Init with correct values
      GLFW.params = new Array();
      GLFW.params[0x00030001] = true; //GLFW_MOUSE_CURSOR
      GLFW.params[0x00030002] = false; //GLFW_STICKY_KEYS
      GLFW.params[0x00030003] = true; //GLFW_STICKY_MOUSE_BUTTONS
      GLFW.params[0x00030004] = false; //GLFW_SYSTEM_KEYS
      GLFW.params[0x00030005] = false; //GLFW_KEY_REPEAT
      GLFW.params[0x00030006] = true; //GLFW_AUTO_POLL_EVENTS
      GLFW.params[0x00020001] = true; //GLFW_OPENED
      GLFW.params[0x00020002] = true; //GLFW_ACTIVE
      GLFW.params[0x00020003] = false; //GLFW_ICONIFIED
      GLFW.params[0x00020004] = true; //GLFW_ACCELERATED
      GLFW.params[0x00020005] = 0; //GLFW_RED_BITS
      GLFW.params[0x00020006] = 0; //GLFW_GREEN_BITS
      GLFW.params[0x00020007] = 0; //GLFW_BLUE_BITS
      GLFW.params[0x00020008] = 0; //GLFW_ALPHA_BITS
      GLFW.params[0x00020009] = 0; //GLFW_DEPTH_BITS
      GLFW.params[0x0002000A] = 0; //GLFW_STENCIL_BITS
      GLFW.params[0x0002000B] = 0; //GLFW_REFRESH_RATE
      GLFW.params[0x0002000C] = 0; //GLFW_ACCUM_RED_BITS
      GLFW.params[0x0002000D] = 0; //GLFW_ACCUM_GREEN_BITS
      GLFW.params[0x0002000E] = 0; //GLFW_ACCUM_BLUE_BITS
      GLFW.params[0x0002000F] = 0; //GLFW_ACCUM_ALPHA_BITS
      GLFW.params[0x00020010] = 0; //GLFW_AUX_BUFFERS
      GLFW.params[0x00020011] = 0; //GLFW_STEREO
      GLFW.params[0x00020012] = 0; //GLFW_WINDOW_NO_RESIZE
      GLFW.params[0x00020013] = 0; //GLFW_FSAA_SAMPLES
      GLFW.params[0x00020014] = 0; //GLFW_OPENGL_VERSION_MAJOR
      GLFW.params[0x00020015] = 0; //GLFW_OPENGL_VERSION_MINOR
      GLFW.params[0x00020016] = 0; //GLFW_OPENGL_FORWARD_COMPAT
      GLFW.params[0x00020017] = 0; //GLFW_OPENGL_DEBUG_CONTEXT
      GLFW.params[0x00020018] = 0; //GLFW_OPENGL_PROFILE
      GLFW.keys = new Array();
      return 1; //GL_TRUE
    }
  function _glfwOpenWindowHint(target, hint) {
      GLFW.params[target] = hint;
    }
  var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};
  var ERRNO_MESSAGES={0:"Success",1:"Not super-user",2:"No such file or directory",3:"No such process",4:"Interrupted system call",5:"I/O error",6:"No such device or address",7:"Arg list too long",8:"Exec format error",9:"Bad file number",10:"No children",11:"No more processes",12:"Not enough core",13:"Permission denied",14:"Bad address",15:"Block device required",16:"Mount device busy",17:"File exists",18:"Cross-device link",19:"No such device",20:"Not a directory",21:"Is a directory",22:"Invalid argument",23:"Too many open files in system",24:"Too many open files",25:"Not a typewriter",26:"Text file busy",27:"File too large",28:"No space left on device",29:"Illegal seek",30:"Read only file system",31:"Too many links",32:"Broken pipe",33:"Math arg out of domain of func",34:"Math result not representable",35:"File locking deadlock error",36:"File or path name too long",37:"No record locks available",38:"Function not implemented",39:"Directory not empty",40:"Too many symbolic links",42:"No message of desired type",43:"Identifier removed",44:"Channel number out of range",45:"Level 2 not synchronized",46:"Level 3 halted",47:"Level 3 reset",48:"Link number out of range",49:"Protocol driver not attached",50:"No CSI structure available",51:"Level 2 halted",52:"Invalid exchange",53:"Invalid request descriptor",54:"Exchange full",55:"No anode",56:"Invalid request code",57:"Invalid slot",59:"Bad font file fmt",60:"Device not a stream",61:"No data (for no delay io)",62:"Timer expired",63:"Out of streams resources",64:"Machine is not on the network",65:"Package not installed",66:"The object is remote",67:"The link has been severed",68:"Advertise error",69:"Srmount error",70:"Communication error on send",71:"Protocol error",72:"Multihop attempted",73:"Cross mount point (not really error)",74:"Trying to read unreadable message",75:"Value too large for defined data type",76:"Given log. name not unique",77:"f.d. invalid for this operation",78:"Remote address changed",79:"Can   access a needed shared lib",80:"Accessing a corrupted shared lib",81:".lib section in a.out corrupted",82:"Attempting to link in too many libs",83:"Attempting to exec a shared library",84:"Illegal byte sequence",86:"Streams pipe error",87:"Too many users",88:"Socket operation on non-socket",89:"Destination address required",90:"Message too long",91:"Protocol wrong type for socket",92:"Protocol not available",93:"Unknown protocol",94:"Socket type not supported",95:"Not supported",96:"Protocol family not supported",97:"Address family not supported by protocol family",98:"Address already in use",99:"Address not available",100:"Network interface is not configured",101:"Network is unreachable",102:"Connection reset by network",103:"Connection aborted",104:"Connection reset by peer",105:"No buffer space available",106:"Socket is already connected",107:"Socket is not connected",108:"Can't send after socket shutdown",109:"Too many references",110:"Connection timed out",111:"Connection refused",112:"Host is down",113:"Host is unreachable",114:"Socket already connected",115:"Connection already in progress",116:"Stale file handle",122:"Quota exceeded",123:"No medium (in tape drive)",125:"Operation canceled",130:"Previous owner died",131:"State not recoverable"};
  var ___errno_state=0;function ___setErrNo(value) {
      // For convenient setting and returning of errno.
      HEAP32[((___errno_state)>>2)]=value
      return value;
    }
  var TTY={ttys:[],init:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },shutdown:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },register:function (dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function (stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function (stream) {
          // flush any pending line data
          if (stream.tty.output.length) {
            stream.tty.ops.put_char(stream.tty, 10);
          }
        },read:function (stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          for (var i = 0; i < length; i++) {
            try {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function (tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              result = process['stdin']['read']();
              if (!result) {
                if (process['stdin']['_readableState'] && process['stdin']['_readableState']['ended']) {
                  return null;  // EOF
                }
                return undefined;  // no data available
              }
            } else if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['print'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }},default_tty1_ops:{put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['printErr'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }}};
  var MEMFS={ops_table:null,CONTENT_OWNING:1,CONTENT_FLEXIBLE:2,CONTENT_FIXED:3,mount:function (mount) {
        return MEMFS.createNode(null, '/', 16384 | 0777, 0);
      },createNode:function (parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            },
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.contents = [];
          node.contentMode = MEMFS.CONTENT_FLEXIBLE;
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },ensureFlexible:function (node) {
        if (node.contentMode !== MEMFS.CONTENT_FLEXIBLE) {
          var contents = node.contents;
          node.contents = Array.prototype.slice.call(contents);
          node.contentMode = MEMFS.CONTENT_FLEXIBLE;
        }
      },node_ops:{getattr:function (node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.contents.length;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.ensureFlexible(node);
            var contents = node.contents;
            if (attr.size < contents.length) contents.length = attr.size;
            else while (attr.size > contents.length) contents.push(0);
          }
        },lookup:function (parent, name) {
          throw FS.genericErrors[ERRNO_CODES.ENOENT];
        },mknod:function (parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function (old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          old_node.parent = new_dir;
        },unlink:function (parent, name) {
          delete parent.contents[name];
        },rmdir:function (parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
          }
          delete parent.contents[name];
        },readdir:function (node) {
          var entries = ['.', '..']
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function (parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 0777 | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function (node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return node.link;
        }},stream_ops:{read:function (stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else
          {
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          }
          return size;
        },write:function (stream, buffer, offset, length, position, canOwn) {
          var node = stream.node;
          node.timestamp = Date.now();
          var contents = node.contents;
          if (length && contents.length === 0 && position === 0 && buffer.subarray) {
            // just replace it with the new data
            if (canOwn && offset === 0) {
              node.contents = buffer; // this could be a subarray of Emscripten HEAP, or allocated from some other source.
              node.contentMode = (buffer.buffer === HEAP8.buffer) ? MEMFS.CONTENT_OWNING : MEMFS.CONTENT_FIXED;
            } else {
              node.contents = new Uint8Array(buffer.subarray(offset, offset+length));
              node.contentMode = MEMFS.CONTENT_FIXED;
            }
            return length;
          }
          MEMFS.ensureFlexible(node);
          var contents = node.contents;
          while (contents.length < position) contents.push(0);
          for (var i = 0; i < length; i++) {
            contents[position + i] = buffer[offset + i];
          }
          return length;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.contents.length;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          stream.ungotten = [];
          stream.position = position;
          return position;
        },allocate:function (stream, offset, length) {
          MEMFS.ensureFlexible(stream.node);
          var contents = stream.node.contents;
          var limit = offset + length;
          while (limit > contents.length) contents.push(0);
        },mmap:function (stream, buffer, offset, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if ( !(flags & 2) &&
                (contents.buffer === buffer || contents.buffer === buffer.buffer) ) {
            // We can't emulate MAP_SHARED when the file is not backed by the buffer
            // we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = _malloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOMEM);
            }
            buffer.set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        }}};
  var IDBFS={dbs:{},indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",mount:function (mount) {
        return MEMFS.mount.apply(null, arguments);
      },syncfs:function (mount, populate, callback) {
        IDBFS.getLocalSet(mount, function(err, local) {
          if (err) return callback(err);
          IDBFS.getRemoteSet(mount, function(err, remote) {
            if (err) return callback(err);
            var src = populate ? remote : local;
            var dst = populate ? local : remote;
            IDBFS.reconcile(src, dst, callback);
          });
        });
      },reconcile:function (src, dst, callback) {
        var total = 0;
        var create = {};
        for (var key in src.files) {
          if (!src.files.hasOwnProperty(key)) continue;
          var e = src.files[key];
          var e2 = dst.files[key];
          if (!e2 || e.timestamp > e2.timestamp) {
            create[key] = e;
            total++;
          }
        }
        var remove = {};
        for (var key in dst.files) {
          if (!dst.files.hasOwnProperty(key)) continue;
          var e = dst.files[key];
          var e2 = src.files[key];
          if (!e2) {
            remove[key] = e;
            total++;
          }
        }
        if (!total) {
          // early out
          return callback(null);
        }
        var completed = 0;
        function done(err) {
          if (err) return callback(err);
          if (++completed >= total) {
            return callback(null);
          }
        };
        // create a single transaction to handle and IDB reads / writes we'll need to do
        var db = src.type === 'remote' ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite');
        transaction.onerror = function transaction_onerror() { callback(this.error); };
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
        for (var path in create) {
          if (!create.hasOwnProperty(path)) continue;
          var entry = create[path];
          if (dst.type === 'local') {
            // save file to local
            try {
              if (FS.isDir(entry.mode)) {
                FS.mkdir(path, entry.mode);
              } else if (FS.isFile(entry.mode)) {
                var stream = FS.open(path, 'w+', 0666);
                FS.write(stream, entry.contents, 0, entry.contents.length, 0, true /* canOwn */);
                FS.close(stream);
              }
              done(null);
            } catch (e) {
              return done(e);
            }
          } else {
            // save file to IDB
            var req = store.put(entry, path);
            req.onsuccess = function req_onsuccess() { done(null); };
            req.onerror = function req_onerror() { done(this.error); };
          }
        }
        for (var path in remove) {
          if (!remove.hasOwnProperty(path)) continue;
          var entry = remove[path];
          if (dst.type === 'local') {
            // delete file from local
            try {
              if (FS.isDir(entry.mode)) {
                // TODO recursive delete?
                FS.rmdir(path);
              } else if (FS.isFile(entry.mode)) {
                FS.unlink(path);
              }
              done(null);
            } catch (e) {
              return done(e);
            }
          } else {
            // delete file from IDB
            var req = store.delete(path);
            req.onsuccess = function req_onsuccess() { done(null); };
            req.onerror = function req_onerror() { done(this.error); };
          }
        }
      },getLocalSet:function (mount, callback) {
        var files = {};
        function isRealDir(p) {
          return p !== '.' && p !== '..';
        };
        function toAbsolute(root) {
          return function(p) {
            return PATH.join2(root, p);
          }
        };
        var check = FS.readdir(mount.mountpoint)
          .filter(isRealDir)
          .map(toAbsolute(mount.mountpoint));
        while (check.length) {
          var path = check.pop();
          var stat, node;
          try {
            var lookup = FS.lookupPath(path);
            node = lookup.node;
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
          if (FS.isDir(stat.mode)) {
            check.push.apply(check, FS.readdir(path)
              .filter(isRealDir)
              .map(toAbsolute(path)));
            files[path] = { mode: stat.mode, timestamp: stat.mtime };
          } else if (FS.isFile(stat.mode)) {
            files[path] = { contents: node.contents, mode: stat.mode, timestamp: stat.mtime };
          } else {
            return callback(new Error('node type not supported'));
          }
        }
        return callback(null, { type: 'local', files: files });
      },getDB:function (name, callback) {
        // look it up in the cache
        var db = IDBFS.dbs[name];
        if (db) {
          return callback(null, db);
        }
        var req;
        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        req.onupgradeneeded = function req_onupgradeneeded() {
          db = req.result;
          db.createObjectStore(IDBFS.DB_STORE_NAME);
        };
        req.onsuccess = function req_onsuccess() {
          db = req.result;
          // add to the cache
          IDBFS.dbs[name] = db;
          callback(null, db);
        };
        req.onerror = function req_onerror() {
          callback(this.error);
        };
      },getRemoteSet:function (mount, callback) {
        var files = {};
        IDBFS.getDB(mount.mountpoint, function(err, db) {
          if (err) return callback(err);
          var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly');
          transaction.onerror = function transaction_onerror() { callback(this.error); };
          var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
          store.openCursor().onsuccess = function store_openCursor_onsuccess(event) {
            var cursor = event.target.result;
            if (!cursor) {
              return callback(null, { type: 'remote', db: db, files: files });
            }
            files[cursor.key] = cursor.value;
            cursor.continue();
          };
        });
      }};
  var NODEFS={isWindows:false,staticInit:function () {
        NODEFS.isWindows = !!process.platform.match(/^win/);
      },mount:function (mount) {
        assert(ENVIRONMENT_IS_NODE);
        return NODEFS.createNode(null, '/', NODEFS.getMode(mount.opts.root), 0);
      },createNode:function (parent, name, mode, dev) {
        if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node = FS.createNode(parent, name, mode);
        node.node_ops = NODEFS.node_ops;
        node.stream_ops = NODEFS.stream_ops;
        return node;
      },getMode:function (path) {
        var stat;
        try {
          stat = fs.lstatSync(path);
          if (NODEFS.isWindows) {
            // On Windows, directories return permission bits 'rw-rw-rw-', even though they have 'rwxrwxrwx', so 
            // propagate write bits to execute bits.
            stat.mode = stat.mode | ((stat.mode & 146) >> 1);
          }
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(ERRNO_CODES[e.code]);
        }
        return stat.mode;
      },realPath:function (node) {
        var parts = [];
        while (node.parent !== node) {
          parts.push(node.name);
          node = node.parent;
        }
        parts.push(node.mount.opts.root);
        parts.reverse();
        return PATH.join.apply(null, parts);
      },flagsToPermissionStringMap:{0:"r",1:"r+",2:"r+",64:"r",65:"r+",66:"r+",129:"rx+",193:"rx+",514:"w+",577:"w",578:"w+",705:"wx",706:"wx+",1024:"a",1025:"a",1026:"a+",1089:"a",1090:"a+",1153:"ax",1154:"ax+",1217:"ax",1218:"ax+",4096:"rs",4098:"rs+"},flagsToPermissionString:function (flags) {
        if (flags in NODEFS.flagsToPermissionStringMap) {
          return NODEFS.flagsToPermissionStringMap[flags];
        } else {
          return flags;
        }
      },node_ops:{getattr:function (node) {
          var path = NODEFS.realPath(node);
          var stat;
          try {
            stat = fs.lstatSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          // node.js v0.10.20 doesn't report blksize and blocks on Windows. Fake them with default blksize of 4096.
          // See http://support.microsoft.com/kb/140365
          if (NODEFS.isWindows && !stat.blksize) {
            stat.blksize = 4096;
          }
          if (NODEFS.isWindows && !stat.blocks) {
            stat.blocks = (stat.size+stat.blksize-1)/stat.blksize|0;
          }
          return {
            dev: stat.dev,
            ino: stat.ino,
            mode: stat.mode,
            nlink: stat.nlink,
            uid: stat.uid,
            gid: stat.gid,
            rdev: stat.rdev,
            size: stat.size,
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime,
            blksize: stat.blksize,
            blocks: stat.blocks
          };
        },setattr:function (node, attr) {
          var path = NODEFS.realPath(node);
          try {
            if (attr.mode !== undefined) {
              fs.chmodSync(path, attr.mode);
              // update the common node structure mode as well
              node.mode = attr.mode;
            }
            if (attr.timestamp !== undefined) {
              var date = new Date(attr.timestamp);
              fs.utimesSync(path, date, date);
            }
            if (attr.size !== undefined) {
              fs.truncateSync(path, attr.size);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },lookup:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          var mode = NODEFS.getMode(path);
          return NODEFS.createNode(parent, name, mode);
        },mknod:function (parent, name, mode, dev) {
          var node = NODEFS.createNode(parent, name, mode, dev);
          // create the backing node for this in the fs root as well
          var path = NODEFS.realPath(node);
          try {
            if (FS.isDir(node.mode)) {
              fs.mkdirSync(path, node.mode);
            } else {
              fs.writeFileSync(path, '', { mode: node.mode });
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return node;
        },rename:function (oldNode, newDir, newName) {
          var oldPath = NODEFS.realPath(oldNode);
          var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
          try {
            fs.renameSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },unlink:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.unlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },rmdir:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.rmdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readdir:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },symlink:function (parent, newName, oldPath) {
          var newPath = PATH.join2(NODEFS.realPath(parent), newName);
          try {
            fs.symlinkSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readlink:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        }},stream_ops:{open:function (stream) {
          var path = NODEFS.realPath(stream.node);
          try {
            if (FS.isFile(stream.node.mode)) {
              stream.nfd = fs.openSync(path, NODEFS.flagsToPermissionString(stream.flags));
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },close:function (stream) {
          try {
            if (FS.isFile(stream.node.mode) && stream.nfd) {
              fs.closeSync(stream.nfd);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },read:function (stream, buffer, offset, length, position) {
          // FIXME this is terrible.
          var nbuffer = new Buffer(length);
          var res;
          try {
            res = fs.readSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          if (res > 0) {
            for (var i = 0; i < res; i++) {
              buffer[offset + i] = nbuffer[i];
            }
          }
          return res;
        },write:function (stream, buffer, offset, length, position) {
          // FIXME this is terrible.
          var nbuffer = new Buffer(buffer.subarray(offset, offset + length));
          var res;
          try {
            res = fs.writeSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return res;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              try {
                var stat = fs.fstatSync(stream.nfd);
                position += stat.size;
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES[e.code]);
              }
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          stream.position = position;
          return position;
        }}};
  var _stdin=allocate(1, "i32*", ALLOC_STATIC);
  var _stdout=allocate(1, "i32*", ALLOC_STATIC);
  var _stderr=allocate(1, "i32*", ALLOC_STATIC);
  function _fflush(stream) {
      // int fflush(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fflush.html
      // we don't currently perform any user-space buffering of data
    }var FS={root:null,mounts:[],devices:[null],streams:[null],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,ErrnoError:null,genericErrors:{},handleFSError:function (e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
        return ___setErrNo(e.errno);
      },lookupPath:function (path, opts) {
        path = PATH.resolve(FS.cwd(), path);
        opts = opts || { recurse_count: 0 };
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
        }
        // split the path
        var parts = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), false);
        // start at the root
        var current = FS.root;
        var current_path = '/';
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            current = current.mount.root;
          }
          // follow symlinks
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH.resolve(PATH.dirname(current_path), link);
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
              current = lookup.node;
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
              }
            }
          }
        }
        return { path: current_path, node: current };
      },getPath:function (node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:function (parentid, name) {
        var hash = 0;
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:function (parent, name) {
        var err = FS.mayLookup(parent);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:function (parent, name, mode, rdev) {
        if (!FS.FSNode) {
          FS.FSNode = function(parent, name, mode, rdev) {
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
            this.parent = null;
            this.mount = null;
            if (!parent) {
              parent = this;  // root node sets parent to itself
            }
            this.parent = parent;
            this.mount = parent.mount;
            FS.hashAddNode(this);
          };
          // compatibility
          var readMode = 292 | 73;
          var writeMode = 146;
          FS.FSNode.prototype = {};
          // NOTE we must use Object.defineProperties instead of individual calls to
          // Object.defineProperty in order to make closure compiler happy
          Object.defineProperties(FS.FSNode.prototype, {
            read: {
              get: function() { return (this.mode & readMode) === readMode; },
              set: function(val) { val ? this.mode |= readMode : this.mode &= ~readMode; }
            },
            write: {
              get: function() { return (this.mode & writeMode) === writeMode; },
              set: function(val) { val ? this.mode |= writeMode : this.mode &= ~writeMode; }
            },
            isFolder: {
              get: function() { return FS.isDir(this.mode); },
            },
            isDevice: {
              get: function() { return FS.isChrdev(this.mode); },
            },
          });
        }
        return new FS.FSNode(parent, name, mode, rdev);
      },destroyNode:function (node) {
        FS.hashRemoveNode(node);
      },isRoot:function (node) {
        return node === node.parent;
      },isMountpoint:function (node) {
        return node.mounted;
      },isFile:function (mode) {
        return (mode & 61440) === 32768;
      },isDir:function (mode) {
        return (mode & 61440) === 16384;
      },isLink:function (mode) {
        return (mode & 61440) === 40960;
      },isChrdev:function (mode) {
        return (mode & 61440) === 8192;
      },isBlkdev:function (mode) {
        return (mode & 61440) === 24576;
      },isFIFO:function (mode) {
        return (mode & 61440) === 4096;
      },isSocket:function (mode) {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:function (str) {
        var flags = FS.flagModes[str];
        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:function (flag) {
        var accmode = flag & 2097155;
        var perms = ['r', 'w', 'rw'][accmode];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:function (node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
          return ERRNO_CODES.EACCES;
        }
        return 0;
      },mayLookup:function (dir) {
        return FS.nodePermissions(dir, 'x');
      },mayCreate:function (dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return ERRNO_CODES.EEXIST;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:function (dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var err = FS.nodePermissions(dir, 'wx');
        if (err) {
          return err;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return ERRNO_CODES.ENOTDIR;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return ERRNO_CODES.EBUSY;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return 0;
      },mayOpen:function (node, flags) {
        if (!node) {
          return ERRNO_CODES.ENOENT;
        }
        if (FS.isLink(node.mode)) {
          return ERRNO_CODES.ELOOP;
        } else if (FS.isDir(node.mode)) {
          if ((flags & 2097155) !== 0 ||  // opening for write
              (flags & 512)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:function (fd_start, fd_end) {
        fd_start = fd_start || 1;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(ERRNO_CODES.EMFILE);
      },getStream:function (fd) {
        return FS.streams[fd];
      },createStream:function (stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = function(){};
          FS.FSStream.prototype = {};
          // compatibility
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              get: function() { return this.node; },
              set: function(val) { this.node = val; }
            },
            isRead: {
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              get: function() { return (this.flags & 1024); }
            }
          });
        }
        if (stream.__proto__) {
          // reuse the object
          stream.__proto__ = FS.FSStream.prototype;
        } else {
          var newStream = new FS.FSStream();
          for (var p in stream) {
            newStream[p] = stream[p];
          }
          stream = newStream;
        }
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:function (fd) {
        FS.streams[fd] = null;
      },chrdev_stream_ops:{open:function (stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:function () {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }},major:function (dev) {
        return ((dev) >> 8);
      },minor:function (dev) {
        return ((dev) & 0xff);
      },makedev:function (ma, mi) {
        return ((ma) << 8 | (mi));
      },registerDevice:function (dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:function (dev) {
        return FS.devices[dev];
      },syncfs:function (populate, callback) {
        if (typeof(populate) === 'function') {
          callback = populate;
          populate = false;
        }
        var completed = 0;
        var total = FS.mounts.length;
        function done(err) {
          if (err) {
            return callback(err);
          }
          if (++completed >= total) {
            callback(null);
          }
        };
        // sync all mounts
        for (var i = 0; i < FS.mounts.length; i++) {
          var mount = FS.mounts[i];
          if (!mount.type.syncfs) {
            done(null);
            continue;
          }
          mount.type.syncfs(mount, populate, done);
        }
      },mount:function (type, opts, mountpoint) {
        var lookup;
        if (mountpoint) {
          lookup = FS.lookupPath(mountpoint, { follow: false });
          mountpoint = lookup.path;  // use the absolute path
        }
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          root: null
        };
        // create a root node for the fs
        var root = type.mount(mount);
        root.mount = mount;
        mount.root = root;
        // assign the mount info to the mountpoint's node
        if (lookup) {
          lookup.node.mount = mount;
          lookup.node.mounted = true;
          // compatibility update FS.root if we mount to /
          if (mountpoint === '/') {
            FS.root = mount.root;
          }
        }
        // add to our cached list of mounts
        FS.mounts.push(mount);
        return root;
      },lookup:function (parent, name) {
        return parent.node_ops.lookup(parent, name);
      },mknod:function (path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var err = FS.mayCreate(parent, name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:function (path, mode) {
        mode = mode !== undefined ? mode : 0666;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:function (path, mode) {
        mode = mode !== undefined ? mode : 0777;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdev:function (path, mode, dev) {
        if (typeof(dev) === 'undefined') {
          dev = mode;
          mode = 0666;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:function (oldpath, newpath) {
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        var newname = PATH.basename(newpath);
        var err = FS.mayCreate(parent, newname);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:function (old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
        try {
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;
        } catch (e) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(ERRNO_CODES.EXDEV);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        // new path should not be an ancestor of the old path
        relative = PATH.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var err = FS.mayDelete(old_dir, old_name, isdir);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        err = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          err = FS.nodePermissions(old_dir, 'w');
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },rmdir:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, true);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },readdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        return node.node_ops.readdir(node);
      },unlink:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, false);
        if (err) {
          // POSIX says unlink should set EPERM, not EISDIR
          if (err === ERRNO_CODES.EISDIR) err = ERRNO_CODES.EPERM;
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },readlink:function (path) {
        var lookup = FS.lookupPath(path, { follow: false });
        var link = lookup.node;
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        return link.node_ops.readlink(link);
      },stat:function (path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return node.node_ops.getattr(node);
      },lstat:function (path) {
        return FS.stat(path, true);
      },chmod:function (path, mode, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:function (path, mode) {
        FS.chmod(path, mode, true);
      },fchmod:function (fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chmod(stream.node, mode);
      },chown:function (path, uid, gid, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:function (path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },fchown:function (fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:function (path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var err = FS.nodePermissions(node, 'w');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:function (fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        FS.truncate(stream.node, len);
      },utime:function (path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:function (path, flags, mode, fd_start, fd_end) {
        flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === 'undefined' ? 0666 : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path === 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(ERRNO_CODES.EEXIST);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
          }
        }
        if (!node) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // check permissions
        var err = FS.mayOpen(node, flags);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // do truncation if necessary
        if ((flags & 512)) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512);
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        }, fd_start, fd_end);
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
            Module['printErr']('read file: ' + path);
          }
        }
        return stream;
      },close:function (stream) {
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
      },llseek:function (stream, offset, whence) {
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        return stream.stream_ops.llseek(stream, offset, whence);
      },read:function (stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:function (stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        if (stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },allocate:function (stream, offset, length) {
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:function (stream, buffer, offset, length, position, prot, flags) {
        // TODO if PROT is PROT_WRITE, make sure we have write access
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EACCES);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.errnoError(ERRNO_CODES.ENODEV);
        }
        return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
      },ioctl:function (stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTTY);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:function (path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'r';
        opts.encoding = opts.encoding || 'binary';
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = '';
          var utf8 = new Runtime.UTF8Processor();
          for (var i = 0; i < length; i++) {
            ret += utf8.processCChar(buf[i]);
          }
        } else if (opts.encoding === 'binary') {
          ret = buf;
        } else {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        FS.close(stream);
        return ret;
      },writeFile:function (path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'w';
        opts.encoding = opts.encoding || 'utf8';
        var stream = FS.open(path, opts.flags, opts.mode);
        if (opts.encoding === 'utf8') {
          var utf8 = new Runtime.UTF8Processor();
          var buf = new Uint8Array(utf8.processJSString(data));
          FS.write(stream, buf, 0, buf.length, 0);
        } else if (opts.encoding === 'binary') {
          FS.write(stream, data, 0, data.length, 0);
        } else {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        FS.close(stream);
      },cwd:function () {
        return FS.currentPath;
      },chdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        var err = FS.nodePermissions(lookup.node, 'x');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:function () {
        FS.mkdir('/tmp');
      },createDefaultDevices:function () {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: function() { return 0; },
          write: function() { return 0; }
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using Module['printErr']
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createStandardStreams:function () {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 'r');
        HEAP32[((_stdin)>>2)]=stdin.fd;
        assert(stdin.fd === 1, 'invalid handle for stdin (' + stdin.fd + ')');
        var stdout = FS.open('/dev/stdout', 'w');
        HEAP32[((_stdout)>>2)]=stdout.fd;
        assert(stdout.fd === 2, 'invalid handle for stdout (' + stdout.fd + ')');
        var stderr = FS.open('/dev/stderr', 'w');
        HEAP32[((_stderr)>>2)]=stderr.fd;
        assert(stderr.fd === 3, 'invalid handle for stderr (' + stderr.fd + ')');
      },ensureErrnoError:function () {
        if (FS.ErrnoError) return;
        FS.ErrnoError = function ErrnoError(errno) {
          this.errno = errno;
          for (var key in ERRNO_CODES) {
            if (ERRNO_CODES[key] === errno) {
              this.code = key;
              break;
            }
          }
          this.message = ERRNO_MESSAGES[errno];
          this.stack = stackTrace();
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [ERRNO_CODES.ENOENT].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:function () {
        FS.ensureErrnoError();
        FS.nameTable = new Array(4096);
        FS.root = FS.createNode(null, '/', 16384 | 0777, 0);
        FS.mount(MEMFS, {}, '/');
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
      },init:function (input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
        FS.ensureErrnoError();
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
        FS.createStandardStreams();
      },quit:function () {
        FS.init.initialized = false;
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },getMode:function (canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },joinPath:function (parts, forceRelative) {
        var path = PATH.join.apply(null, parts);
        if (forceRelative && path[0] == '/') path = path.substr(1);
        return path;
      },absolutePath:function (relative, base) {
        return PATH.resolve(base, relative);
      },standardizePath:function (path) {
        return PATH.normalize(path);
      },findObject:function (path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          ___setErrNo(ret.error);
          return null;
        }
      },analyzePath:function (path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },createFolder:function (parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.mkdir(path, mode);
      },createPath:function (parent, path, canRead, canWrite) {
        parent = typeof parent === 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:function (parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:function (parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data === 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 'w');
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:function (parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: function(stream) {
            stream.seekable = false;
          },
          close: function(stream) {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: function(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },createLink:function (parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        return FS.symlink(target, path);
      },forceLoadFile:function (obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (Module['read']) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(Module['read'](obj.url), true);
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
        if (!success) ___setErrNo(ERRNO_CODES.EIO);
        return success;
      },createLazyFile:function (parent, name, url, canRead, canWrite) {
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
          function LazyUint8Array() {
            this.lengthKnown = false;
            this.chunks = []; // Loaded chunks. Index is the chunk number
          }
          LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
            if (idx > this.length-1 || idx < 0) {
              return undefined;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = Math.floor(idx / this.chunkSize);
            return this.getter(chunkNum)[chunkOffset];
          }
          LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
            this.getter = getter;
          }
          LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
              // Find length
              var xhr = new XMLHttpRequest();
              xhr.open('HEAD', url, false);
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              var datalength = Number(xhr.getResponseHeader("Content-length"));
              var header;
              var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
              var chunkSize = 1024*1024; // Chunk size in bytes
              if (!hasByteServing) chunkSize = datalength;
              // Function to get a range from the remote URL.
              var doXHR = (function(from, to) {
                if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
                if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
                // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, false);
                if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
                // Some hints to the browser that we want binary data.
                if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
                if (xhr.overrideMimeType) {
                  xhr.overrideMimeType('text/plain; charset=x-user-defined');
                }
                xhr.send(null);
                if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
                if (xhr.response !== undefined) {
                  return new Uint8Array(xhr.response || []);
                } else {
                  return intArrayFromString(xhr.responseText || '', true);
                }
              });
              var lazyArray = this;
              lazyArray.setDataGetter(function(chunkNum) {
                var start = chunkNum * chunkSize;
                var end = (chunkNum+1) * chunkSize - 1; // including this byte
                end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
                if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
                  lazyArray.chunks[chunkNum] = doXHR(start, end);
                }
                if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
                return lazyArray.chunks[chunkNum];
              });
              this._length = datalength;
              this._chunkSize = chunkSize;
              this.lengthKnown = true;
          }
          var lazyArray = new LazyUint8Array();
          Object.defineProperty(lazyArray, "length", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._length;
              }
          });
          Object.defineProperty(lazyArray, "chunkSize", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._chunkSize;
              }
          });
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key) {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            return fn.apply(null, arguments);
          };
        });
        // use a custom read function
        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EIO);
          }
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      },createPreloadedFile:function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn) {
        Browser.init();
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways
        var fullname = name ? PATH.resolve(PATH.join2(parent, name)) : parent;
        function processData(byteArray) {
          function finish(byteArray) {
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }
            if (onload) onload();
            removeRunDependency('cp ' + fullname);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency('cp ' + fullname);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency('cp ' + fullname);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_NAME:function () {
        return 'EM_FS_' + window.location.pathname;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          console.log('creating db');
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() { ok++; if (ok + fail == total) finish() };
            putRequest.onerror = function putRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },loadFilesFromDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror; // no database to load from
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
          } catch(e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = function getRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      }};var PATH={splitPath:function (filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:function (parts, allowAboveRoot) {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up--; up) {
            parts.unshift('..');
          }
        }
        return parts;
      },normalize:function (path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:function (path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },basename:function (path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },extname:function (path) {
        return PATH.splitPath(path)[3];
      },join:function () {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },join2:function (l, r) {
        return PATH.normalize(l + '/' + r);
      },resolve:function () {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            continue;
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:function (from, to) {
        from = PATH.resolve(from).substr(1);
        to = PATH.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }};var Browser={mainLoop:{scheduler:null,shouldPause:false,paused:false,queue:[],pause:function () {
          Browser.mainLoop.shouldPause = true;
        },resume:function () {
          if (Browser.mainLoop.paused) {
            Browser.mainLoop.paused = false;
            Browser.mainLoop.scheduler();
          }
          Browser.mainLoop.shouldPause = false;
        },updateStatus:function () {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')');
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        }},isFullScreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function () {
        if (!Module["preloadPlugins"]) Module["preloadPlugins"] = []; // needs to exist even in workers
        if (Browser.initted || ENVIRONMENT_IS_WORKER) return;
        Browser.initted = true;
        try {
          new Blob();
          Browser.hasBlobConstructor = true;
        } catch(e) {
          Browser.hasBlobConstructor = false;
          console.log("warning: no blob constructor, cannot create blobs with mimetypes");
        }
        Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : (typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : (!Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null));
        Browser.URLObject = typeof window != "undefined" ? (window.URL ? window.URL : window.webkitURL) : undefined;
        if (!Module.noImageDecoding && typeof Browser.URLObject === 'undefined') {
          console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
          Module.noImageDecoding = true;
        }
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to Module.preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = null;
          if (Browser.hasBlobConstructor) {
            try {
              b = new Blob([byteArray], { type: Browser.getMimetype(name) });
              if (b.size !== byteArray.length) { // Safari bug #118630
                // Safari's Blob can only take an ArrayBuffer
                b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
              }
            } catch(e) {
              Runtime.warnOnce('Blob constructor present but fails: ' + e + '; falling back to blob builder');
            }
          }
          if (!b) {
            var bb = new Browser.BlobBuilder();
            bb.append((new Uint8Array(byteArray)).buffer); // we need to pass a buffer, and must copy the array to get the right data range
            b = bb.getBlob();
          }
          var url = Browser.URLObject.createObjectURL(b);
          var img = new Image();
          img.onload = function img_onload() {
            assert(img.complete, 'Image ' + name + ' could not be decoded');
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            Module["preloadedImages"][name] = canvas;
            Browser.URLObject.revokeObjectURL(url);
            if (onload) onload(byteArray);
          };
          img.onerror = function img_onerror(event) {
            console.log('Image ' + url + ' could not be decoded');
            if (onerror) onerror();
          };
          img.src = url;
        };
        Module['preloadPlugins'].push(imagePlugin);
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = audio;
            if (onload) onload(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = new Audio(); // empty shim
            if (onerror) onerror();
          }
          if (Browser.hasBlobConstructor) {
            try {
              var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
            } catch(e) {
              return fail();
            }
            var url = Browser.URLObject.createObjectURL(b); // XXX we never revoke this!
            var audio = new Audio();
            audio.addEventListener('canplaythrough', function() { finish(audio) }, false); // use addEventListener due to chromium bug 124926
            audio.onerror = function audio_onerror(event) {
              if (done) return;
              console.log('warning: browser could not fully decode audio ' + name + ', trying slower base64 approach');
              function encode64(data) {
                var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var PAD = '=';
                var ret = '';
                var leftchar = 0;
                var leftbits = 0;
                for (var i = 0; i < data.length; i++) {
                  leftchar = (leftchar << 8) | data[i];
                  leftbits += 8;
                  while (leftbits >= 6) {
                    var curr = (leftchar >> (leftbits-6)) & 0x3f;
                    leftbits -= 6;
                    ret += BASE[curr];
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar&3) << 4];
                  ret += PAD + PAD;
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar&0xf) << 2];
                  ret += PAD;
                }
                return ret;
              }
              audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
              finish(audio); // we don't wait for confirmation this worked - but it's worth trying
            };
            audio.src = url;
            // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
            Browser.safeSetTimeout(function() {
              finish(audio); // try to use it even though it is not necessarily ready to play
            }, 10000);
          } else {
            return fail();
          }
        };
        Module['preloadPlugins'].push(audioPlugin);
        // Canvas event setup
        var canvas = Module['canvas'];
        canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                    canvas['mozRequestPointerLock'] ||
                                    canvas['webkitRequestPointerLock'];
        canvas.exitPointerLock = document['exitPointerLock'] ||
                                 document['mozExitPointerLock'] ||
                                 document['webkitExitPointerLock'] ||
                                 function(){}; // no-op if function does not exist
        canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === canvas ||
                                document['mozPointerLockElement'] === canvas ||
                                document['webkitPointerLockElement'] === canvas;
        }
        document.addEventListener('pointerlockchange', pointerLockChange, false);
        document.addEventListener('mozpointerlockchange', pointerLockChange, false);
        document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
        if (Module['elementPointerLock']) {
          canvas.addEventListener("click", function(ev) {
            if (!Browser.pointerLock && canvas.requestPointerLock) {
              canvas.requestPointerLock();
              ev.preventDefault();
            }
          }, false);
        }
      },createContext:function (canvas, useWebGL, setInModule, webGLContextAttributes) {
        var ctx;
        try {
          if (useWebGL) {
            var contextAttributes = {
              antialias: false,
              alpha: false
            };
            if (webGLContextAttributes) {
              for (var attribute in webGLContextAttributes) {
                contextAttributes[attribute] = webGLContextAttributes[attribute];
              }
            }
            var errorInfo = '?';
            function onContextCreationError(event) {
              errorInfo = event.statusMessage || errorInfo;
            }
            canvas.addEventListener('webglcontextcreationerror', onContextCreationError, false);
            try {
              ['experimental-webgl', 'webgl'].some(function(webglId) {
                return ctx = canvas.getContext(webglId, contextAttributes);
              });
            } finally {
              canvas.removeEventListener('webglcontextcreationerror', onContextCreationError, false);
            }
          } else {
            ctx = canvas.getContext('2d');
          }
          if (!ctx) throw ':(';
        } catch (e) {
          Module.print('Could not create canvas: ' + [errorInfo, e]);
          return null;
        }
        if (useWebGL) {
          // Set the background of the WebGL canvas to black
          canvas.style.backgroundColor = "black";
          // Warn on context loss
          canvas.addEventListener('webglcontextlost', function(event) {
            alert('WebGL context lost. You will need to reload the page.');
          }, false);
        }
        if (setInModule) {
          Module.ctx = ctx;
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach(function(callback) { callback() });
          Browser.init();
        }
        return ctx;
      },destroyContext:function (canvas, useWebGL, setInModule) {},fullScreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullScreen:function (lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer === 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas === 'undefined') Browser.resizeCanvas = false;
        var canvas = Module['canvas'];
        function fullScreenChange() {
          Browser.isFullScreen = false;
          if ((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
               document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
               document['fullScreenElement'] || document['fullscreenElement']) === canvas) {
            canvas.cancelFullScreen = document['cancelFullScreen'] ||
                                      document['mozCancelFullScreen'] ||
                                      document['webkitCancelFullScreen'];
            canvas.cancelFullScreen = canvas.cancelFullScreen.bind(document);
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullScreen = true;
            if (Browser.resizeCanvas) Browser.setFullScreenCanvasSize();
          } else if (Browser.resizeCanvas){
            Browser.setWindowedCanvasSize();
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullScreen);
        }
        if (!Browser.fullScreenHandlersInstalled) {
          Browser.fullScreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullScreenChange, false);
          document.addEventListener('mozfullscreenchange', fullScreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullScreenChange, false);
        }
        canvas.requestFullScreen = canvas['requestFullScreen'] ||
                                   canvas['mozRequestFullScreen'] ||
                                   (canvas['webkitRequestFullScreen'] ? function() { canvas['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) } : null);
        canvas.requestFullScreen();
      },requestAnimationFrame:function requestAnimationFrame(func) {
        if (typeof window === 'undefined') { // Provide fallback to setTimeout if window is undefined (e.g. in Node.js)
          setTimeout(func, 1000/60);
        } else {
          if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = window['requestAnimationFrame'] ||
                                           window['mozRequestAnimationFrame'] ||
                                           window['webkitRequestAnimationFrame'] ||
                                           window['msRequestAnimationFrame'] ||
                                           window['oRequestAnimationFrame'] ||
                                           window['setTimeout'];
          }
          window.requestAnimationFrame(func);
        }
      },safeCallback:function (func) {
        return function() {
          if (!ABORT) return func.apply(null, arguments);
        };
      },safeRequestAnimationFrame:function (func) {
        return Browser.requestAnimationFrame(function() {
          if (!ABORT) func();
        });
      },safeSetTimeout:function (func, timeout) {
        return setTimeout(function() {
          if (!ABORT) func();
        }, timeout);
      },safeSetInterval:function (func, timeout) {
        return setInterval(function() {
          if (!ABORT) func();
        }, timeout);
      },getMimetype:function (name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.')+1)];
      },getUserMedia:function (func) {
        if(!window.getUserMedia) {
          window.getUserMedia = navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        }
        window.getUserMedia(func);
      },getMovementX:function (event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },getMovementY:function (event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,calculateMouseEvent:function (event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
          // check if SDL is available
          if (typeof SDL != "undefined") {
          	Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
          	Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
          } else {
          	// just add the mouse delta to the current absolut mouse position
          	// FIXME: ideally this should be clamped against the canvas size and zero
          	Browser.mouseX += Browser.mouseMovementX;
          	Browser.mouseY += Browser.mouseMovementY;
          }        
        } else {
          // Otherwise, calculate the movement based on the changes
          // in the coordinates.
          var rect = Module["canvas"].getBoundingClientRect();
          var x, y;
          if (event.type == 'touchstart' ||
              event.type == 'touchend' ||
              event.type == 'touchmove') {
            var t = event.touches.item(0);
            if (t) {
              x = t.pageX - (window.scrollX + rect.left);
              y = t.pageY - (window.scrollY + rect.top);
            } else {
              return;
            }
          } else {
            x = event.pageX - (window.scrollX + rect.left);
            y = event.pageY - (window.scrollY + rect.top);
          }
          // the canvas might be CSS-scaled compared to its backbuffer;
          // SDL-using content will want mouse coordinates in terms
          // of backbuffer units.
          var cw = Module["canvas"].width;
          var ch = Module["canvas"].height;
          x = x * (cw / rect.width);
          y = y * (ch / rect.height);
          Browser.mouseMovementX = x - Browser.mouseX;
          Browser.mouseMovementY = y - Browser.mouseY;
          Browser.mouseX = x;
          Browser.mouseY = y;
        }
      },xhrLoad:function (url, onload, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function xhr_onload() {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            onload(xhr.response);
          } else {
            onerror();
          }
        };
        xhr.onerror = onerror;
        xhr.send(null);
      },asyncLoad:function (url, onload, onerror, noRunDep) {
        Browser.xhrLoad(url, function(arrayBuffer) {
          assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
          onload(new Uint8Array(arrayBuffer));
          if (!noRunDep) removeRunDependency('al ' + url);
        }, function(event) {
          if (onerror) {
            onerror();
          } else {
            throw 'Loading data file "' + url + '" failed.';
          }
        });
        if (!noRunDep) addRunDependency('al ' + url);
      },resizeListeners:[],updateResizeListeners:function () {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach(function(listener) {
          listener(canvas.width, canvas.height);
        });
      },setCanvasSize:function (width, height, noUpdates) {
        var canvas = Module['canvas'];
        canvas.width = width;
        canvas.height = height;
        if (!noUpdates) Browser.updateResizeListeners();
      },windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:function () {
        var canvas = Module['canvas'];
        this.windowedWidth = canvas.width;
        this.windowedHeight = canvas.height;
        canvas.width = screen.width;
        canvas.height = screen.height;
        // check if SDL is available   
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },setWindowedCanvasSize:function () {
        var canvas = Module['canvas'];
        canvas.width = this.windowedWidth;
        canvas.height = this.windowedHeight;
        // check if SDL is available       
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      }};function _glfwOpenWindow(width, height, redbits, greenbits, bluebits, alphabits, depthbits, stencilbits, mode) {
      if (width == 0 && height > 0) {
        width = 4 * height / 3;
      }
      if (width > 0 && height == 0) {
        height = 3 * width / 4;
      }
      GLFW.params[0x00020005] = redbits; //GLFW_RED_BITS
      GLFW.params[0x00020006] = greenbits; //GLFW_GREEN_BITS
      GLFW.params[0x00020007] = bluebits; //GLFW_BLUE_BITS
      GLFW.params[0x00020008] = alphabits; //GLFW_ALPHA_BITS
      GLFW.params[0x00020009] = depthbits; //GLFW_DEPTH_BITS
      GLFW.params[0x0002000A] = stencilbits; //GLFW_STENCIL_BITS
      if (mode == 0x00010001) {//GLFW_WINDOW
        Browser.setCanvasSize(GLFW.initWindowWidth = width,
                              GLFW.initWindowHeight = height);
        GLFW.params[0x00030003] = true; //GLFW_STICKY_MOUSE_BUTTONS
      }
      else if (mode == 0x00010002) {//GLFW_FULLSCREEN
        GLFW.requestFullScreen();
        GLFW.params[0x00030003] = false; //GLFW_STICKY_MOUSE_BUTTONS
      }
      else{
        throw "Invalid glfwOpenWindow mode.";
      }
      var contextAttributes = {
        antialias: (GLFW.params[0x00020013] > 1), //GLFW_FSAA_SAMPLES
        depth: (GLFW.params[0x00020009] > 0), //GLFW_DEPTH_BITS
        stencil: (GLFW.params[0x0002000A] > 0) //GLFW_STENCIL_BITS
      }
      Module.ctx = Browser.createContext(Module['canvas'], true, true, contextAttributes);
      return 1; //GL_TRUE
    }
  function _glfwTerminate() {}
  function _glfwGetWindowSize(width, height) {
      setValue(width, Module['canvas'].width, 'i32');
      setValue(height, Module['canvas'].height, 'i32');
    }
  function _glfwSetWindowTitle(title) {
      document.title = Pointer_stringify(title);
    }
  function _glfwSetKeyCallback(cbfun) {
      GLFW.keyFunc = cbfun;
    }
  function _glfwSetCharCallback(cbfun) {
      GLFW.charFunc = cbfun;
    }
  function _glfwSetMousePosCallback(cbfun) {
      GLFW.mousePosFunc = cbfun;
    }
  function _glfwSetMouseButtonCallback(cbfun) {
      GLFW.mouseButtonFunc = cbfun;
    }
  function _glfwSetMouseWheelCallback(cbfun) {
      GLFW.mouseWheelFunc = cbfun;
    }
  function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop) {
      Module['noExitRuntime'] = true;
      Browser.mainLoop.runner = function Browser_mainLoop_runner() {
        if (ABORT) return;
        if (Browser.mainLoop.queue.length > 0) {
          var start = Date.now();
          var blocker = Browser.mainLoop.queue.shift();
          blocker.func(blocker.arg);
          if (Browser.mainLoop.remainingBlockers) {
            var remaining = Browser.mainLoop.remainingBlockers;
            var next = remaining%1 == 0 ? remaining-1 : Math.floor(remaining);
            if (blocker.counted) {
              Browser.mainLoop.remainingBlockers = next;
            } else {
              // not counted, but move the progress along a tiny bit
              next = next + 0.5; // do not steal all the next one's progress
              Browser.mainLoop.remainingBlockers = (8*remaining + next)/9;
            }
          }
          console.log('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + ' ms'); //, left: ' + Browser.mainLoop.remainingBlockers);
          Browser.mainLoop.updateStatus();
          setTimeout(Browser.mainLoop.runner, 0);
          return;
        }
        if (Browser.mainLoop.shouldPause) {
          // catch pauses from non-main loop sources
          Browser.mainLoop.paused = true;
          Browser.mainLoop.shouldPause = false;
          return;
        }
        if (Module['preMainLoop']) {
          Module['preMainLoop']();
        }
        try {
          Runtime.dynCall('v', func);
        } catch (e) {
          if (e instanceof ExitStatus) {
            return;
          } else {
            if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
            throw e;
          }
        }
        if (Module['postMainLoop']) {
          Module['postMainLoop']();
        }
        if (Browser.mainLoop.shouldPause) {
          // catch pauses from the main loop itself
          Browser.mainLoop.paused = true;
          Browser.mainLoop.shouldPause = false;
          return;
        }
        Browser.mainLoop.scheduler();
      }
      if (fps && fps > 0) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler() {
          setTimeout(Browser.mainLoop.runner, 1000/fps); // doing this each time means that on exception, we stop
        }
      } else {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler() {
          Browser.requestAnimationFrame(Browser.mainLoop.runner);
        }
      }
      Browser.mainLoop.scheduler();
      if (simulateInfiniteLoop) {
        throw 'SimulateInfiniteLoop';
      }
    }
  function __ZSt18uncaught_exceptionv() { // std::uncaught_exception()
      return !!__ZSt18uncaught_exceptionv.uncaught_exception;
    }function ___cxa_begin_catch(ptr) {
      __ZSt18uncaught_exceptionv.uncaught_exception--;
      return ptr;
    }
  function _llvm_eh_exception() {
      return HEAP32[((_llvm_eh_exception.buf)>>2)];
    }
  function ___cxa_free_exception(ptr) {
      try {
        return _free(ptr);
      } catch(e) { // XXX FIXME
      }
    }function ___cxa_end_catch() {
      if (___cxa_end_catch.rethrown) {
        ___cxa_end_catch.rethrown = false;
        return;
      }
      // Clear state flag.
      asm['setThrew'](0);
      // Clear type.
      HEAP32[(((_llvm_eh_exception.buf)+(4))>>2)]=0
      // Call destructor if one is registered then clear it.
      var ptr = HEAP32[((_llvm_eh_exception.buf)>>2)];
      var destructor = HEAP32[(((_llvm_eh_exception.buf)+(8))>>2)];
      if (destructor) {
        Runtime.dynCall('vi', destructor, [ptr]);
        HEAP32[(((_llvm_eh_exception.buf)+(8))>>2)]=0
      }
      // Free ptr if it isn't null.
      if (ptr) {
        ___cxa_free_exception(ptr);
        HEAP32[((_llvm_eh_exception.buf)>>2)]=0
      }
    }
  function __exit(status) {
      // void _exit(int status);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
      Module['exit'](status);
    }function _exit(status) {
      __exit(status);
    }function __ZSt9terminatev() {
      _exit(-1234);
    }
  Module["_memcpy"] = _memcpy;var _llvm_memcpy_p0i8_p0i8_i32=_memcpy;
  Module["_memset"] = _memset;var _llvm_memset_p0i8_i32=_memset;
  function ___cxa_allocate_exception(size) {
      return _malloc(size);
    }
  function ___cxa_is_number_type(type) {
      var isNumber = false;
      try { if (type == __ZTIi) isNumber = true } catch(e){}
      try { if (type == __ZTIj) isNumber = true } catch(e){}
      try { if (type == __ZTIl) isNumber = true } catch(e){}
      try { if (type == __ZTIm) isNumber = true } catch(e){}
      try { if (type == __ZTIx) isNumber = true } catch(e){}
      try { if (type == __ZTIy) isNumber = true } catch(e){}
      try { if (type == __ZTIf) isNumber = true } catch(e){}
      try { if (type == __ZTId) isNumber = true } catch(e){}
      try { if (type == __ZTIe) isNumber = true } catch(e){}
      try { if (type == __ZTIc) isNumber = true } catch(e){}
      try { if (type == __ZTIa) isNumber = true } catch(e){}
      try { if (type == __ZTIh) isNumber = true } catch(e){}
      try { if (type == __ZTIs) isNumber = true } catch(e){}
      try { if (type == __ZTIt) isNumber = true } catch(e){}
      return isNumber;
    }function ___cxa_does_inherit(definiteType, possibilityType, possibility) {
      if (possibility == 0) return false;
      if (possibilityType == 0 || possibilityType == definiteType)
        return true;
      var possibility_type_info;
      if (___cxa_is_number_type(possibilityType)) {
        possibility_type_info = possibilityType;
      } else {
        var possibility_type_infoAddr = HEAP32[((possibilityType)>>2)] - 8;
        possibility_type_info = HEAP32[((possibility_type_infoAddr)>>2)];
      }
      switch (possibility_type_info) {
      case 0: // possibility is a pointer
        // See if definite type is a pointer
        var definite_type_infoAddr = HEAP32[((definiteType)>>2)] - 8;
        var definite_type_info = HEAP32[((definite_type_infoAddr)>>2)];
        if (definite_type_info == 0) {
          // Also a pointer; compare base types of pointers
          var defPointerBaseAddr = definiteType+8;
          var defPointerBaseType = HEAP32[((defPointerBaseAddr)>>2)];
          var possPointerBaseAddr = possibilityType+8;
          var possPointerBaseType = HEAP32[((possPointerBaseAddr)>>2)];
          return ___cxa_does_inherit(defPointerBaseType, possPointerBaseType, possibility);
        } else
          return false; // one pointer and one non-pointer
      case 1: // class with no base class
        return false;
      case 2: // class with base class
        var parentTypeAddr = possibilityType + 8;
        var parentType = HEAP32[((parentTypeAddr)>>2)];
        return ___cxa_does_inherit(definiteType, parentType, possibility);
      default:
        return false; // some unencountered type
      }
    }
  function ___resumeException(ptr) {
      if (HEAP32[((_llvm_eh_exception.buf)>>2)] == 0) HEAP32[((_llvm_eh_exception.buf)>>2)]=ptr;
      throw ptr + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";;
    }function ___cxa_find_matching_catch(thrown, throwntype) {
      if (thrown == -1) thrown = HEAP32[((_llvm_eh_exception.buf)>>2)];
      if (throwntype == -1) throwntype = HEAP32[(((_llvm_eh_exception.buf)+(4))>>2)];
      var typeArray = Array.prototype.slice.call(arguments, 2);
      // If throwntype is a pointer, this means a pointer has been
      // thrown. When a pointer is thrown, actually what's thrown
      // is a pointer to the pointer. We'll dereference it.
      if (throwntype != 0 && !___cxa_is_number_type(throwntype)) {
        var throwntypeInfoAddr= HEAP32[((throwntype)>>2)] - 8;
        var throwntypeInfo= HEAP32[((throwntypeInfoAddr)>>2)];
        if (throwntypeInfo == 0)
          thrown = HEAP32[((thrown)>>2)];
      }
      // The different catch blocks are denoted by different types.
      // Due to inheritance, those types may not precisely match the
      // type of the thrown object. Find one which matches, and
      // return the type of the catch block which should be called.
      for (var i = 0; i < typeArray.length; i++) {
        if (___cxa_does_inherit(typeArray[i], throwntype, thrown))
          return ((asm["setTempRet0"](typeArray[i]),thrown)|0);
      }
      // Shouldn't happen unless we have bogus data in typeArray
      // or encounter a type for which emscripten doesn't have suitable
      // typeinfo defined. Best-efforts match just in case.
      return ((asm["setTempRet0"](throwntype),thrown)|0);
    }function ___cxa_throw(ptr, type, destructor) {
      if (!___cxa_throw.initialized) {
        try {
          HEAP32[((__ZTVN10__cxxabiv119__pointer_type_infoE)>>2)]=0; // Workaround for libcxxabi integration bug
        } catch(e){}
        try {
          HEAP32[((__ZTVN10__cxxabiv117__class_type_infoE)>>2)]=1; // Workaround for libcxxabi integration bug
        } catch(e){}
        try {
          HEAP32[((__ZTVN10__cxxabiv120__si_class_type_infoE)>>2)]=2; // Workaround for libcxxabi integration bug
        } catch(e){}
        ___cxa_throw.initialized = true;
      }
      HEAP32[((_llvm_eh_exception.buf)>>2)]=ptr
      HEAP32[(((_llvm_eh_exception.buf)+(4))>>2)]=type
      HEAP32[(((_llvm_eh_exception.buf)+(8))>>2)]=destructor
      if (!("uncaught_exception" in __ZSt18uncaught_exceptionv)) {
        __ZSt18uncaught_exceptionv.uncaught_exception = 1;
      } else {
        __ZSt18uncaught_exceptionv.uncaught_exception++;
      }
      throw ptr + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";;
    }
  Module["_strlen"] = _strlen;
  function _llvm_lifetime_start() {}
  function _llvm_lifetime_end() {}
  var _llvm_memset_p0i8_i64=_memset;
  function _close(fildes) {
      // int close(int fildes);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/close.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        FS.close(stream);
        return 0;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }
  function _fsync(fildes) {
      // int fsync(int fildes);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fsync.html
      var stream = FS.getStream(fildes);
      if (stream) {
        // We write directly to the file system, so there's nothing to do here.
        return 0;
      } else {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
    }function _fclose(stream) {
      // int fclose(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fclose.html
      _fsync(stream);
      return _close(stream);
    }
  var _mkport=undefined;var SOCKFS={mount:function (mount) {
        return FS.createNode(null, '/', 16384 | 0777, 0);
      },createSocket:function (family, type, protocol) {
        var streaming = type == 1;
        if (protocol) {
          assert(streaming == (protocol == 6)); // if SOCK_STREAM, must be tcp
        }
        // create our internal socket structure
        var sock = {
          family: family,
          type: type,
          protocol: protocol,
          server: null,
          peers: {},
          pending: [],
          recv_queue: [],
          sock_ops: SOCKFS.websocket_sock_ops
        };
        // create the filesystem node to store the socket structure
        var name = SOCKFS.nextname();
        var node = FS.createNode(SOCKFS.root, name, 49152, 0);
        node.sock = sock;
        // and the wrapping stream that enables library functions such
        // as read and write to indirectly interact with the socket
        var stream = FS.createStream({
          path: name,
          node: node,
          flags: FS.modeStringToFlags('r+'),
          seekable: false,
          stream_ops: SOCKFS.stream_ops
        });
        // map the new stream to the socket structure (sockets have a 1:1
        // relationship with a stream)
        sock.stream = stream;
        return sock;
      },getSocket:function (fd) {
        var stream = FS.getStream(fd);
        if (!stream || !FS.isSocket(stream.node.mode)) {
          return null;
        }
        return stream.node.sock;
      },stream_ops:{poll:function (stream) {
          var sock = stream.node.sock;
          return sock.sock_ops.poll(sock);
        },ioctl:function (stream, request, varargs) {
          var sock = stream.node.sock;
          return sock.sock_ops.ioctl(sock, request, varargs);
        },read:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          var msg = sock.sock_ops.recvmsg(sock, length);
          if (!msg) {
            // socket is closed
            return 0;
          }
          buffer.set(msg.buffer, offset);
          return msg.buffer.length;
        },write:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          return sock.sock_ops.sendmsg(sock, buffer, offset, length);
        },close:function (stream) {
          var sock = stream.node.sock;
          sock.sock_ops.close(sock);
        }},nextname:function () {
        if (!SOCKFS.nextname.current) {
          SOCKFS.nextname.current = 0;
        }
        return 'socket[' + (SOCKFS.nextname.current++) + ']';
      },websocket_sock_ops:{createPeer:function (sock, addr, port) {
          var ws;
          if (typeof addr === 'object') {
            ws = addr;
            addr = null;
            port = null;
          }
          if (ws) {
            // for sockets that've already connected (e.g. we're the server)
            // we can inspect the _socket property for the address
            if (ws._socket) {
              addr = ws._socket.remoteAddress;
              port = ws._socket.remotePort;
            }
            // if we're just now initializing a connection to the remote,
            // inspect the url property
            else {
              var result = /ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);
              if (!result) {
                throw new Error('WebSocket URL must be in the format ws(s)://address:port');
              }
              addr = result[1];
              port = parseInt(result[2], 10);
            }
          } else {
            // create the actual websocket object and connect
            try {
              var url = 'ws://' + addr + ':' + port;
              // the node ws library API is slightly different than the browser's
              var opts = ENVIRONMENT_IS_NODE ? {headers: {'websocket-protocol': ['binary']}} : ['binary'];
              // If node we use the ws library.
              var WebSocket = ENVIRONMENT_IS_NODE ? require('ws') : window['WebSocket'];
              ws = new WebSocket(url, opts);
              ws.binaryType = 'arraybuffer';
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EHOSTUNREACH);
            }
          }
          var peer = {
            addr: addr,
            port: port,
            socket: ws,
            dgram_send_queue: []
          };
          SOCKFS.websocket_sock_ops.addPeer(sock, peer);
          SOCKFS.websocket_sock_ops.handlePeerEvents(sock, peer);
          // if this is a bound dgram socket, send the port number first to allow
          // us to override the ephemeral port reported to us by remotePort on the
          // remote end.
          if (sock.type === 2 && typeof sock.sport !== 'undefined') {
            peer.dgram_send_queue.push(new Uint8Array([
                255, 255, 255, 255,
                'p'.charCodeAt(0), 'o'.charCodeAt(0), 'r'.charCodeAt(0), 't'.charCodeAt(0),
                ((sock.sport & 0xff00) >> 8) , (sock.sport & 0xff)
            ]));
          }
          return peer;
        },getPeer:function (sock, addr, port) {
          return sock.peers[addr + ':' + port];
        },addPeer:function (sock, peer) {
          sock.peers[peer.addr + ':' + peer.port] = peer;
        },removePeer:function (sock, peer) {
          delete sock.peers[peer.addr + ':' + peer.port];
        },handlePeerEvents:function (sock, peer) {
          var first = true;
          var handleOpen = function () {
            try {
              var queued = peer.dgram_send_queue.shift();
              while (queued) {
                peer.socket.send(queued);
                queued = peer.dgram_send_queue.shift();
              }
            } catch (e) {
              // not much we can do here in the way of proper error handling as we've already
              // lied and said this data was sent. shut it down.
              peer.socket.close();
            }
          };
          function handleMessage(data) {
            assert(typeof data !== 'string' && data.byteLength !== undefined);  // must receive an ArrayBuffer
            data = new Uint8Array(data);  // make a typed array view on the array buffer
            // if this is the port message, override the peer's port with it
            var wasfirst = first;
            first = false;
            if (wasfirst &&
                data.length === 10 &&
                data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] === 255 &&
                data[4] === 'p'.charCodeAt(0) && data[5] === 'o'.charCodeAt(0) && data[6] === 'r'.charCodeAt(0) && data[7] === 't'.charCodeAt(0)) {
              // update the peer's port and it's key in the peer map
              var newport = ((data[8] << 8) | data[9]);
              SOCKFS.websocket_sock_ops.removePeer(sock, peer);
              peer.port = newport;
              SOCKFS.websocket_sock_ops.addPeer(sock, peer);
              return;
            }
            sock.recv_queue.push({ addr: peer.addr, port: peer.port, data: data });
          };
          if (ENVIRONMENT_IS_NODE) {
            peer.socket.on('open', handleOpen);
            peer.socket.on('message', function(data, flags) {
              if (!flags.binary) {
                return;
              }
              handleMessage((new Uint8Array(data)).buffer);  // copy from node Buffer -> ArrayBuffer
            });
            peer.socket.on('error', function() {
              // don't throw
            });
          } else {
            peer.socket.onopen = handleOpen;
            peer.socket.onmessage = function peer_socket_onmessage(event) {
              handleMessage(event.data);
            };
          }
        },poll:function (sock) {
          if (sock.type === 1 && sock.server) {
            // listen sockets should only say they're available for reading
            // if there are pending clients.
            return sock.pending.length ? (64 | 1) : 0;
          }
          var mask = 0;
          var dest = sock.type === 1 ?  // we only care about the socket state for connection-based sockets
            SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport) :
            null;
          if (sock.recv_queue.length ||
              !dest ||  // connection-less sockets are always ready to read
              (dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {  // let recv return 0 once closed
            mask |= (64 | 1);
          }
          if (!dest ||  // connection-less sockets are always ready to write
              (dest && dest.socket.readyState === dest.socket.OPEN)) {
            mask |= 4;
          }
          if ((dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {
            mask |= 16;
          }
          return mask;
        },ioctl:function (sock, request, arg) {
          switch (request) {
            case 21531:
              var bytes = 0;
              if (sock.recv_queue.length) {
                bytes = sock.recv_queue[0].data.length;
              }
              HEAP32[((arg)>>2)]=bytes;
              return 0;
            default:
              return ERRNO_CODES.EINVAL;
          }
        },close:function (sock) {
          // if we've spawned a listen server, close it
          if (sock.server) {
            try {
              sock.server.close();
            } catch (e) {
            }
            sock.server = null;
          }
          // close any peer connections
          var peers = Object.keys(sock.peers);
          for (var i = 0; i < peers.length; i++) {
            var peer = sock.peers[peers[i]];
            try {
              peer.socket.close();
            } catch (e) {
            }
            SOCKFS.websocket_sock_ops.removePeer(sock, peer);
          }
          return 0;
        },bind:function (sock, addr, port) {
          if (typeof sock.saddr !== 'undefined' || typeof sock.sport !== 'undefined') {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already bound
          }
          sock.saddr = addr;
          sock.sport = port || _mkport();
          // in order to emulate dgram sockets, we need to launch a listen server when
          // binding on a connection-less socket
          // note: this is only required on the server side
          if (sock.type === 2) {
            // close the existing server if it exists
            if (sock.server) {
              sock.server.close();
              sock.server = null;
            }
            // swallow error operation not supported error that occurs when binding in the
            // browser where this isn't supported
            try {
              sock.sock_ops.listen(sock, 0);
            } catch (e) {
              if (!(e instanceof FS.ErrnoError)) throw e;
              if (e.errno !== ERRNO_CODES.EOPNOTSUPP) throw e;
            }
          }
        },connect:function (sock, addr, port) {
          if (sock.server) {
            throw new FS.ErrnoError(ERRNO_CODS.EOPNOTSUPP);
          }
          // TODO autobind
          // if (!sock.addr && sock.type == 2) {
          // }
          // early out if we're already connected / in the middle of connecting
          if (typeof sock.daddr !== 'undefined' && typeof sock.dport !== 'undefined') {
            var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
            if (dest) {
              if (dest.socket.readyState === dest.socket.CONNECTING) {
                throw new FS.ErrnoError(ERRNO_CODES.EALREADY);
              } else {
                throw new FS.ErrnoError(ERRNO_CODES.EISCONN);
              }
            }
          }
          // add the socket to our peer list and set our
          // destination address / port to match
          var peer = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
          sock.daddr = peer.addr;
          sock.dport = peer.port;
          // always "fail" in non-blocking mode
          throw new FS.ErrnoError(ERRNO_CODES.EINPROGRESS);
        },listen:function (sock, backlog) {
          if (!ENVIRONMENT_IS_NODE) {
            throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
          }
          if (sock.server) {
             throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already listening
          }
          var WebSocketServer = require('ws').Server;
          var host = sock.saddr;
          sock.server = new WebSocketServer({
            host: host,
            port: sock.sport
            // TODO support backlog
          });
          sock.server.on('connection', function(ws) {
            if (sock.type === 1) {
              var newsock = SOCKFS.createSocket(sock.family, sock.type, sock.protocol);
              // create a peer on the new socket
              var peer = SOCKFS.websocket_sock_ops.createPeer(newsock, ws);
              newsock.daddr = peer.addr;
              newsock.dport = peer.port;
              // push to queue for accept to pick up
              sock.pending.push(newsock);
            } else {
              // create a peer on the listen socket so calling sendto
              // with the listen socket and an address will resolve
              // to the correct client
              SOCKFS.websocket_sock_ops.createPeer(sock, ws);
            }
          });
          sock.server.on('closed', function() {
            sock.server = null;
          });
          sock.server.on('error', function() {
            // don't throw
          });
        },accept:function (listensock) {
          if (!listensock.server) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          var newsock = listensock.pending.shift();
          newsock.stream.flags = listensock.stream.flags;
          return newsock;
        },getname:function (sock, peer) {
          var addr, port;
          if (peer) {
            if (sock.daddr === undefined || sock.dport === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            }
            addr = sock.daddr;
            port = sock.dport;
          } else {
            // TODO saddr and sport will be set for bind()'d UDP sockets, but what
            // should we be returning for TCP sockets that've been connect()'d?
            addr = sock.saddr || 0;
            port = sock.sport || 0;
          }
          return { addr: addr, port: port };
        },sendmsg:function (sock, buffer, offset, length, addr, port) {
          if (sock.type === 2) {
            // connection-less sockets will honor the message address,
            // and otherwise fall back to the bound destination address
            if (addr === undefined || port === undefined) {
              addr = sock.daddr;
              port = sock.dport;
            }
            // if there was no address to fall back to, error out
            if (addr === undefined || port === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.EDESTADDRREQ);
            }
          } else {
            // connection-based sockets will only use the bound
            addr = sock.daddr;
            port = sock.dport;
          }
          // find the peer for the destination address
          var dest = SOCKFS.websocket_sock_ops.getPeer(sock, addr, port);
          // early out if not connected with a connection-based socket
          if (sock.type === 1) {
            if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            } else if (dest.socket.readyState === dest.socket.CONNECTING) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
          // create a copy of the incoming data to send, as the WebSocket API
          // doesn't work entirely with an ArrayBufferView, it'll just send
          // the entire underlying buffer
          var data;
          if (buffer instanceof Array || buffer instanceof ArrayBuffer) {
            data = buffer.slice(offset, offset + length);
          } else {  // ArrayBufferView
            data = buffer.buffer.slice(buffer.byteOffset + offset, buffer.byteOffset + offset + length);
          }
          // if we're emulating a connection-less dgram socket and don't have
          // a cached connection, queue the buffer to send upon connect and
          // lie, saying the data was sent now.
          if (sock.type === 2) {
            if (!dest || dest.socket.readyState !== dest.socket.OPEN) {
              // if we're not connected, open a new connection
              if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                dest = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
              }
              dest.dgram_send_queue.push(data);
              return length;
            }
          }
          try {
            // send the actual data
            dest.socket.send(data);
            return length;
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
        },recvmsg:function (sock, length) {
          // http://pubs.opengroup.org/onlinepubs/7908799/xns/recvmsg.html
          if (sock.type === 1 && sock.server) {
            // tcp servers should not be recv()'ing on the listen socket
            throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
          }
          var queued = sock.recv_queue.shift();
          if (!queued) {
            if (sock.type === 1) {
              var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
              if (!dest) {
                // if we have a destination address but are not connected, error out
                throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
              }
              else if (dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                // return null if the socket has closed
                return null;
              }
              else {
                // else, our socket is in a valid state but truly has nothing available
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
            } else {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
          // queued.data will be an ArrayBuffer if it's unadulterated, but if it's
          // requeued TCP data it'll be an ArrayBufferView
          var queuedLength = queued.data.byteLength || queued.data.length;
          var queuedOffset = queued.data.byteOffset || 0;
          var queuedBuffer = queued.data.buffer || queued.data;
          var bytesRead = Math.min(length, queuedLength);
          var res = {
            buffer: new Uint8Array(queuedBuffer, queuedOffset, bytesRead),
            addr: queued.addr,
            port: queued.port
          };
          // push back any unread data for TCP connections
          if (sock.type === 1 && bytesRead < queuedLength) {
            var bytesRemaining = queuedLength - bytesRead;
            queued.data = new Uint8Array(queuedBuffer, queuedOffset + bytesRead, bytesRemaining);
            sock.recv_queue.unshift(queued);
          }
          return res;
        }}};function _send(fd, buf, len, flags) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      // TODO honor flags
      return _write(fd, buf, len);
    }
  function _pwrite(fildes, buf, nbyte, offset) {
      // ssize_t pwrite(int fildes, const void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte, offset);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _write(fildes, buf, nbyte) {
      // ssize_t write(int fildes, const void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fwrite(ptr, size, nitems, stream) {
      // size_t fwrite(const void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fwrite.html
      var bytesToWrite = nitems * size;
      if (bytesToWrite == 0) return 0;
      var bytesWritten = _write(stream, ptr, bytesToWrite);
      if (bytesWritten == -1) {
        var streamObj = FS.getStream(stream);
        if (streamObj) streamObj.error = true;
        return 0;
      } else {
        return Math.floor(bytesWritten / size);
      }
    }
  Module["_memmove"] = _memmove;var _llvm_memmove_p0i8_p0i8_i32=_memmove;
  function _recv(fd, buf, len, flags) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      // TODO honor flags
      return _read(fd, buf, len);
    }
  function _pread(fildes, buf, nbyte, offset) {
      // ssize_t pread(int fildes, void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.read(stream, slab, buf, nbyte, offset);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _read(fildes, buf, nbyte) {
      // ssize_t read(int fildes, void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.read(stream, slab, buf, nbyte);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fread(ptr, size, nitems, stream) {
      // size_t fread(void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fread.html
      var bytesToRead = nitems * size;
      if (bytesToRead == 0) {
        return 0;
      }
      var bytesRead = 0;
      var streamObj = FS.getStream(stream);
      if (!streamObj) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return 0;
      }
      while (streamObj.ungotten.length && bytesToRead > 0) {
        HEAP8[((ptr++)|0)]=streamObj.ungotten.pop()
        bytesToRead--;
        bytesRead++;
      }
      var err = _read(stream, ptr, bytesToRead);
      if (err == -1) {
        if (streamObj) streamObj.error = true;
        return 0;
      }
      bytesRead += err;
      if (bytesRead < bytesToRead) streamObj.eof = true;
      return Math.floor(bytesRead / size);
    }
  function _lseek(fildes, offset, whence) {
      // off_t lseek(int fildes, off_t offset, int whence);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/lseek.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        return FS.llseek(stream, offset, whence);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fseek(stream, offset, whence) {
      // int fseek(FILE *stream, long offset, int whence);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fseek.html
      var ret = _lseek(stream, offset, whence);
      if (ret == -1) {
        return -1;
      }
      stream = FS.getStream(stream);
      stream.eof = false;
      return 0;
    }var _fseeko=_fseek;
  function _ftell(stream) {
      // long ftell(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/ftell.html
      stream = FS.getStream(stream);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      if (FS.isChrdev(stream.node.mode)) {
        ___setErrNo(ERRNO_CODES.ESPIPE);
        return -1;
      } else {
        return stream.position;
      }
    }var _ftello=_ftell;
  function _open(path, oflag, varargs) {
      // int open(const char *path, int oflag, ...);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/open.html
      var mode = HEAP32[((varargs)>>2)];
      path = Pointer_stringify(path);
      try {
        var stream = FS.open(path, oflag, mode);
        return stream.fd;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fopen(filename, mode) {
      // FILE *fopen(const char *restrict filename, const char *restrict mode);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fopen.html
      var flags;
      mode = Pointer_stringify(mode);
      if (mode[0] == 'r') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 0;
        }
      } else if (mode[0] == 'w') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 1;
        }
        flags |= 64;
        flags |= 512;
      } else if (mode[0] == 'a') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 1;
        }
        flags |= 64;
        flags |= 1024;
      } else {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return 0;
      }
      var ret = _open(filename, flags, allocate([0x1FF, 0, 0, 0], 'i32', ALLOC_STACK));  // All creation permissions.
      return (ret == -1) ? 0 : ret;
    }
  function _glGetError() {
      // First return any GL error generated by the emscripten library_gl.js interop layer.
      if (GL.lastError) {
        var error = GL.lastError;
        GL.lastError = 0/*GL_NO_ERROR*/;
        return error;
      } else { // If there were none, return the GL error from the browser GL context.
        return Module.ctx.getError();
      }
    }
  function _glCreateShader(shaderType) {
      var id = GL.getNewId(GL.shaders);
      GL.shaders[id] = Module.ctx.createShader(shaderType);
      return id;
    }
  function _glShaderSource(shader, count, string, length) {
      var source = GL.getSource(shader, count, string, length);
      Module.ctx.shaderSource(GL.shaders[shader], source);
    }
  function _glCompileShader(shader) {
      Module.ctx.compileShader(GL.shaders[shader]);
    }
  function _glGetShaderiv(shader, pname, p) {
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        HEAP32[((p)>>2)]=Module.ctx.getShaderInfoLog(GL.shaders[shader]).length + 1;
      } else {
        HEAP32[((p)>>2)]=Module.ctx.getShaderParameter(GL.shaders[shader], pname);
      }
    }
  function _glGetShaderInfoLog(shader, maxLength, length, infoLog) {
      var log = Module.ctx.getShaderInfoLog(GL.shaders[shader]);
      // Work around a bug in Chromium which causes getShaderInfoLog to return null
      if (!log) {
        log = "";
      }
      log = log.substr(0, maxLength - 1);
      writeStringToMemory(log, infoLog);
      if (length) {
        HEAP32[((length)>>2)]=log.length
      }
    }
  function _glCreateProgram() {
      var id = GL.getNewId(GL.programs);
      var program = Module.ctx.createProgram();
      program.name = id;
      GL.programs[id] = program;
      return id;
    }
  function _glAttachShader(program, shader) {
      Module.ctx.attachShader(GL.programs[program],
                              GL.shaders[shader]);
    }
  function _glBindAttribLocation(program, index, name) {
      name = Pointer_stringify(name);
      Module.ctx.bindAttribLocation(GL.programs[program], index, name);
    }
  function _glLinkProgram(program) {
      Module.ctx.linkProgram(GL.programs[program]);
      GL.programInfos[program] = null; // uniforms no longer keep the same names after linking
      GL.populateUniformTable(program);
    }
  function _glGetProgramiv(program, pname, p) {
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        HEAP32[((p)>>2)]=Module.ctx.getProgramInfoLog(GL.programs[program]).length + 1;
      } else if (pname == 0x8B87 /* GL_ACTIVE_UNIFORM_MAX_LENGTH */) {
        var ptable = GL.programInfos[program];
        if (ptable) {
          HEAP32[((p)>>2)]=ptable.maxUniformLength;
          return;
        } else if (program < GL.counter) {
          GL.recordError(0x0502 /* GL_INVALID_OPERATION */);
        } else {
          GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        }
      } else if (pname == 0x8B8A /* GL_ACTIVE_ATTRIBUTE_MAX_LENGTH */) {
        var ptable = GL.programInfos[program];
        if (ptable) {
          if (ptable.maxAttributeLength == -1) {
            var program = GL.programs[program];
            var numAttribs = Module.ctx.getProgramParameter(program, Module.ctx.ACTIVE_ATTRIBUTES);
            ptable.maxAttributeLength = 0; // Spec says if there are no active attribs, 0 must be returned.
            for(var i = 0; i < numAttribs; ++i) {
              var activeAttrib = Module.ctx.getActiveAttrib(program, i);
              ptable.maxAttributeLength = Math.max(ptable.maxAttributeLength, activeAttrib.name.length+1);
            }
          }
          HEAP32[((p)>>2)]=ptable.maxAttributeLength;
          return;
        } else if (program < GL.counter) {
          GL.recordError(0x0502 /* GL_INVALID_OPERATION */);
        } else {
          GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        }
      } else {
        HEAP32[((p)>>2)]=Module.ctx.getProgramParameter(GL.programs[program], pname);
      }
    }
  function _glGetUniformLocation(program, name) {
      name = Pointer_stringify(name);
      var arrayOffset = 0;
      // If user passed an array accessor "[index]", parse the array index off the accessor.
      if (name.indexOf(']', name.length-1) !== -1) {
        var ls = name.lastIndexOf('[');
        var arrayIndex = name.slice(ls+1, -1);
        if (arrayIndex.length > 0) {
          arrayOffset = parseInt(arrayIndex);
          if (arrayOffset < 0) {
            return -1;
          }
        }
        name = name.slice(0, ls);
      }
      var ptable = GL.programInfos[program];
      if (!ptable) {
        return -1;
      }
      var utable = ptable.uniforms;
      var uniformInfo = utable[name]; // returns pair [ dimension_of_uniform_array, uniform_location ]
      if (uniformInfo && arrayOffset < uniformInfo[0]) { // Check if user asked for an out-of-bounds element, i.e. for 'vec4 colors[3];' user could ask for 'colors[10]' which should return -1.
        return uniformInfo[1]+arrayOffset;
      } else {
        return -1;
      }
    }
  function _glUseProgram(program) {
      Module.ctx.useProgram(program ? GL.programs[program] : null);
    }
  function _glUniform1i(location, v0) {
      location = GL.uniforms[location];
      Module.ctx.uniform1i(location, v0);
    }
  function _glUniform2fv(location, count, value) {
      location = GL.uniforms[location];
      var view;
      if (count == 1) {
        // avoid allocation for the common case of uploading one uniform
        view = GL.miniTempBufferViews[1];
        view[0] = HEAPF32[((value)>>2)];
        view[1] = HEAPF32[(((value)+(4))>>2)];
      } else {
        view = HEAPF32.subarray((value)>>2,(value+count*8)>>2);
      }
      Module.ctx.uniform2fv(location, view);
    }
  Module["_memcmp"] = _memcmp;
  var _ceilf=Math_ceil;
  var ctlz_i8 = allocate([8,7,6,6,5,5,5,5,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC); 
  Module["_llvm_ctlz_i32"] = _llvm_ctlz_i32;
  function _isascii(chr) {
      return chr >= 0 && (chr & 0x80) == 0;
    }
  function _pthread_mutex_lock() {}
  function _pthread_mutex_unlock() {}
  function ___cxa_guard_acquire(variable) {
      if (!HEAP8[(variable)]) { // ignore SAFE_HEAP stuff because llvm mixes i64 and i8 here
        HEAP8[(variable)]=1;
        return 1;
      }
      return 0;
    }
  function ___cxa_guard_release() {}
  function _pthread_cond_broadcast() {
      return 0;
    }
  function _pthread_cond_wait() {
      return 0;
    }
  function _atexit(func, arg) {
      __ATEXIT__.unshift({ func: func, arg: arg });
    }var ___cxa_atexit=_atexit;
  function _ungetc(c, stream) {
      // int ungetc(int c, FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/ungetc.html
      stream = FS.getStream(stream);
      if (!stream) {
        return -1;
      }
      if (c === -1) {
        // do nothing for EOF character
        return c;
      }
      c = unSign(c & 0xFF);
      stream.ungotten.push(c);
      stream.eof = false;
      return c;
    }
  function _fgetc(stream) {
      // int fgetc(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fgetc.html
      var streamObj = FS.getStream(stream);
      if (!streamObj) return -1;
      if (streamObj.eof || streamObj.error) return -1;
      var ret = _fread(_fgetc.ret, 1, 1, stream);
      if (ret == 0) {
        return -1;
      } else if (ret == -1) {
        streamObj.error = true;
        return -1;
      } else {
        return HEAPU8[((_fgetc.ret)|0)];
      }
    }var _getc=_fgetc;
  function ___errno_location() {
      return ___errno_state;
    }
  function _strerror_r(errnum, strerrbuf, buflen) {
      if (errnum in ERRNO_MESSAGES) {
        if (ERRNO_MESSAGES[errnum].length > buflen - 1) {
          return ___setErrNo(ERRNO_CODES.ERANGE);
        } else {
          var msg = ERRNO_MESSAGES[errnum];
          writeAsciiToMemory(msg, strerrbuf);
          return 0;
        }
      } else {
        return ___setErrNo(ERRNO_CODES.EINVAL);
      }
    }function _strerror(errnum) {
      if (!_strerror.buffer) _strerror.buffer = _malloc(256);
      _strerror_r(errnum, _strerror.buffer, 256);
      return _strerror.buffer;
    }
  function _abort() {
      Module['abort']();
    }
  function ___cxa_rethrow() {
      ___cxa_end_catch.rethrown = true;
      throw HEAP32[((_llvm_eh_exception.buf)>>2)] + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";;
    }
  function __reallyNegative(x) {
      return x < 0 || (x === 0 && (1/x) === -Infinity);
    }function __formatString(format, varargs) {
      var textIndex = format;
      var argIndex = 0;
      function getNextArg(type) {
        // NOTE: Explicitly ignoring type safety. Otherwise this fails:
        //       int x = 4; printf("%c\n", (char)x);
        var ret;
        if (type === 'double') {
          ret = HEAPF64[(((varargs)+(argIndex))>>3)];
        } else if (type == 'i64') {
          ret = [HEAP32[(((varargs)+(argIndex))>>2)],
                 HEAP32[(((varargs)+(argIndex+8))>>2)]];
          argIndex += 8; // each 32-bit chunk is in a 64-bit block
        } else {
          type = 'i32'; // varargs are always i32, i64, or double
          ret = HEAP32[(((varargs)+(argIndex))>>2)];
        }
        argIndex += Math.max(Runtime.getNativeFieldSize(type), Runtime.getAlignSize(type, null, true));
        return ret;
      }
      var ret = [];
      var curr, next, currArg;
      while(1) {
        var startTextIndex = textIndex;
        curr = HEAP8[(textIndex)];
        if (curr === 0) break;
        next = HEAP8[((textIndex+1)|0)];
        if (curr == 37) {
          // Handle flags.
          var flagAlwaysSigned = false;
          var flagLeftAlign = false;
          var flagAlternative = false;
          var flagZeroPad = false;
          var flagPadSign = false;
          flagsLoop: while (1) {
            switch (next) {
              case 43:
                flagAlwaysSigned = true;
                break;
              case 45:
                flagLeftAlign = true;
                break;
              case 35:
                flagAlternative = true;
                break;
              case 48:
                if (flagZeroPad) {
                  break flagsLoop;
                } else {
                  flagZeroPad = true;
                  break;
                }
              case 32:
                flagPadSign = true;
                break;
              default:
                break flagsLoop;
            }
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          }
          // Handle width.
          var width = 0;
          if (next == 42) {
            width = getNextArg('i32');
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          } else {
            while (next >= 48 && next <= 57) {
              width = width * 10 + (next - 48);
              textIndex++;
              next = HEAP8[((textIndex+1)|0)];
            }
          }
          // Handle precision.
          var precisionSet = false;
          if (next == 46) {
            var precision = 0;
            precisionSet = true;
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
            if (next == 42) {
              precision = getNextArg('i32');
              textIndex++;
            } else {
              while(1) {
                var precisionChr = HEAP8[((textIndex+1)|0)];
                if (precisionChr < 48 ||
                    precisionChr > 57) break;
                precision = precision * 10 + (precisionChr - 48);
                textIndex++;
              }
            }
            next = HEAP8[((textIndex+1)|0)];
          } else {
            var precision = 6; // Standard default.
          }
          // Handle integer sizes. WARNING: These assume a 32-bit architecture!
          var argSize;
          switch (String.fromCharCode(next)) {
            case 'h':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 104) {
                textIndex++;
                argSize = 1; // char (actually i32 in varargs)
              } else {
                argSize = 2; // short (actually i32 in varargs)
              }
              break;
            case 'l':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 108) {
                textIndex++;
                argSize = 8; // long long
              } else {
                argSize = 4; // long
              }
              break;
            case 'L': // long long
            case 'q': // int64_t
            case 'j': // intmax_t
              argSize = 8;
              break;
            case 'z': // size_t
            case 't': // ptrdiff_t
            case 'I': // signed ptrdiff_t or unsigned size_t
              argSize = 4;
              break;
            default:
              argSize = null;
          }
          if (argSize) textIndex++;
          next = HEAP8[((textIndex+1)|0)];
          // Handle type specifier.
          switch (String.fromCharCode(next)) {
            case 'd': case 'i': case 'u': case 'o': case 'x': case 'X': case 'p': {
              // Integer.
              var signed = next == 100 || next == 105;
              argSize = argSize || 4;
              var currArg = getNextArg('i' + (argSize * 8));
              var origArg = currArg;
              var argText;
              // Flatten i64-1 [low, high] into a (slightly rounded) double
              if (argSize == 8) {
                currArg = Runtime.makeBigInt(currArg[0], currArg[1], next == 117);
              }
              // Truncate to requested size.
              if (argSize <= 4) {
                var limit = Math.pow(256, argSize) - 1;
                currArg = (signed ? reSign : unSign)(currArg & limit, argSize * 8);
              }
              // Format the number.
              var currAbsArg = Math.abs(currArg);
              var prefix = '';
              if (next == 100 || next == 105) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], null); else
                argText = reSign(currArg, 8 * argSize, 1).toString(10);
              } else if (next == 117) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], true); else
                argText = unSign(currArg, 8 * argSize, 1).toString(10);
                currArg = Math.abs(currArg);
              } else if (next == 111) {
                argText = (flagAlternative ? '0' : '') + currAbsArg.toString(8);
              } else if (next == 120 || next == 88) {
                prefix = (flagAlternative && currArg != 0) ? '0x' : '';
                if (argSize == 8 && i64Math) {
                  if (origArg[1]) {
                    argText = (origArg[1]>>>0).toString(16);
                    var lower = (origArg[0]>>>0).toString(16);
                    while (lower.length < 8) lower = '0' + lower;
                    argText += lower;
                  } else {
                    argText = (origArg[0]>>>0).toString(16);
                  }
                } else
                if (currArg < 0) {
                  // Represent negative numbers in hex as 2's complement.
                  currArg = -currArg;
                  argText = (currAbsArg - 1).toString(16);
                  var buffer = [];
                  for (var i = 0; i < argText.length; i++) {
                    buffer.push((0xF - parseInt(argText[i], 16)).toString(16));
                  }
                  argText = buffer.join('');
                  while (argText.length < argSize * 2) argText = 'f' + argText;
                } else {
                  argText = currAbsArg.toString(16);
                }
                if (next == 88) {
                  prefix = prefix.toUpperCase();
                  argText = argText.toUpperCase();
                }
              } else if (next == 112) {
                if (currAbsArg === 0) {
                  argText = '(nil)';
                } else {
                  prefix = '0x';
                  argText = currAbsArg.toString(16);
                }
              }
              if (precisionSet) {
                while (argText.length < precision) {
                  argText = '0' + argText;
                }
              }
              // Add sign if needed
              if (currArg >= 0) {
                if (flagAlwaysSigned) {
                  prefix = '+' + prefix;
                } else if (flagPadSign) {
                  prefix = ' ' + prefix;
                }
              }
              // Move sign to prefix so we zero-pad after the sign
              if (argText.charAt(0) == '-') {
                prefix = '-' + prefix;
                argText = argText.substr(1);
              }
              // Add padding.
              while (prefix.length + argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad) {
                    argText = '0' + argText;
                  } else {
                    prefix = ' ' + prefix;
                  }
                }
              }
              // Insert the result into the buffer.
              argText = prefix + argText;
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 'f': case 'F': case 'e': case 'E': case 'g': case 'G': {
              // Float.
              var currArg = getNextArg('double');
              var argText;
              if (isNaN(currArg)) {
                argText = 'nan';
                flagZeroPad = false;
              } else if (!isFinite(currArg)) {
                argText = (currArg < 0 ? '-' : '') + 'inf';
                flagZeroPad = false;
              } else {
                var isGeneral = false;
                var effectivePrecision = Math.min(precision, 20);
                // Convert g/G to f/F or e/E, as per:
                // http://pubs.opengroup.org/onlinepubs/9699919799/functions/printf.html
                if (next == 103 || next == 71) {
                  isGeneral = true;
                  precision = precision || 1;
                  var exponent = parseInt(currArg.toExponential(effectivePrecision).split('e')[1], 10);
                  if (precision > exponent && exponent >= -4) {
                    next = ((next == 103) ? 'f' : 'F').charCodeAt(0);
                    precision -= exponent + 1;
                  } else {
                    next = ((next == 103) ? 'e' : 'E').charCodeAt(0);
                    precision--;
                  }
                  effectivePrecision = Math.min(precision, 20);
                }
                if (next == 101 || next == 69) {
                  argText = currArg.toExponential(effectivePrecision);
                  // Make sure the exponent has at least 2 digits.
                  if (/[eE][-+]\d$/.test(argText)) {
                    argText = argText.slice(0, -1) + '0' + argText.slice(-1);
                  }
                } else if (next == 102 || next == 70) {
                  argText = currArg.toFixed(effectivePrecision);
                  if (currArg === 0 && __reallyNegative(currArg)) {
                    argText = '-' + argText;
                  }
                }
                var parts = argText.split('e');
                if (isGeneral && !flagAlternative) {
                  // Discard trailing zeros and periods.
                  while (parts[0].length > 1 && parts[0].indexOf('.') != -1 &&
                         (parts[0].slice(-1) == '0' || parts[0].slice(-1) == '.')) {
                    parts[0] = parts[0].slice(0, -1);
                  }
                } else {
                  // Make sure we have a period in alternative mode.
                  if (flagAlternative && argText.indexOf('.') == -1) parts[0] += '.';
                  // Zero pad until required precision.
                  while (precision > effectivePrecision++) parts[0] += '0';
                }
                argText = parts[0] + (parts.length > 1 ? 'e' + parts[1] : '');
                // Capitalize 'E' if needed.
                if (next == 69) argText = argText.toUpperCase();
                // Add sign.
                if (currArg >= 0) {
                  if (flagAlwaysSigned) {
                    argText = '+' + argText;
                  } else if (flagPadSign) {
                    argText = ' ' + argText;
                  }
                }
              }
              // Add padding.
              while (argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad && (argText[0] == '-' || argText[0] == '+')) {
                    argText = argText[0] + '0' + argText.slice(1);
                  } else {
                    argText = (flagZeroPad ? '0' : ' ') + argText;
                  }
                }
              }
              // Adjust case.
              if (next < 97) argText = argText.toUpperCase();
              // Insert the result into the buffer.
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 's': {
              // String.
              var arg = getNextArg('i8*');
              var argLength = arg ? _strlen(arg) : '(null)'.length;
              if (precisionSet) argLength = Math.min(argLength, precision);
              if (!flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              if (arg) {
                for (var i = 0; i < argLength; i++) {
                  ret.push(HEAPU8[((arg++)|0)]);
                }
              } else {
                ret = ret.concat(intArrayFromString('(null)'.substr(0, argLength), true));
              }
              if (flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              break;
            }
            case 'c': {
              // Character.
              if (flagLeftAlign) ret.push(getNextArg('i8'));
              while (--width > 0) {
                ret.push(32);
              }
              if (!flagLeftAlign) ret.push(getNextArg('i8'));
              break;
            }
            case 'n': {
              // Write the length written so far to the next parameter.
              var ptr = getNextArg('i32*');
              HEAP32[((ptr)>>2)]=ret.length
              break;
            }
            case '%': {
              // Literal percent sign.
              ret.push(curr);
              break;
            }
            default: {
              // Unknown specifiers remain untouched.
              for (var i = startTextIndex; i < textIndex + 2; i++) {
                ret.push(HEAP8[(i)]);
              }
            }
          }
          textIndex += 2;
          // TODO: Support a/A (hex float) and m (last error) specifiers.
          // TODO: Support %1${specifier} for arg selection.
        } else {
          ret.push(curr);
          textIndex += 1;
        }
      }
      return ret;
    }function _snprintf(s, n, format, varargs) {
      // int snprintf(char *restrict s, size_t n, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var result = __formatString(format, varargs);
      var limit = (n === undefined) ? result.length
                                    : Math.min(result.length, Math.max(n - 1, 0));
      if (s < 0) {
        s = -s;
        var buf = _malloc(limit+1);
        HEAP32[((s)>>2)]=buf;
        s = buf;
      }
      for (var i = 0; i < limit; i++) {
        HEAP8[(((s)+(i))|0)]=result[i];
      }
      if (limit < n || (n === undefined)) HEAP8[(((s)+(i))|0)]=0;
      return result.length;
    }
  function _sysconf(name) {
      // long sysconf(int name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/sysconf.html
      switch(name) {
        case 30: return PAGE_SIZE;
        case 132:
        case 133:
        case 12:
        case 137:
        case 138:
        case 15:
        case 235:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 149:
        case 13:
        case 10:
        case 236:
        case 153:
        case 9:
        case 21:
        case 22:
        case 159:
        case 154:
        case 14:
        case 77:
        case 78:
        case 139:
        case 80:
        case 81:
        case 79:
        case 82:
        case 68:
        case 67:
        case 164:
        case 11:
        case 29:
        case 47:
        case 48:
        case 95:
        case 52:
        case 51:
        case 46:
          return 200809;
        case 27:
        case 246:
        case 127:
        case 128:
        case 23:
        case 24:
        case 160:
        case 161:
        case 181:
        case 182:
        case 242:
        case 183:
        case 184:
        case 243:
        case 244:
        case 245:
        case 165:
        case 178:
        case 179:
        case 49:
        case 50:
        case 168:
        case 169:
        case 175:
        case 170:
        case 171:
        case 172:
        case 97:
        case 76:
        case 32:
        case 173:
        case 35:
          return -1;
        case 176:
        case 177:
        case 7:
        case 155:
        case 8:
        case 157:
        case 125:
        case 126:
        case 92:
        case 93:
        case 129:
        case 130:
        case 131:
        case 94:
        case 91:
          return 1;
        case 74:
        case 60:
        case 69:
        case 70:
        case 4:
          return 1024;
        case 31:
        case 42:
        case 72:
          return 32;
        case 87:
        case 26:
        case 33:
          return 2147483647;
        case 34:
        case 1:
          return 47839;
        case 38:
        case 36:
          return 99;
        case 43:
        case 37:
          return 2048;
        case 0: return 2097152;
        case 3: return 65536;
        case 28: return 32768;
        case 44: return 32767;
        case 75: return 16384;
        case 39: return 1000;
        case 89: return 700;
        case 71: return 256;
        case 40: return 255;
        case 2: return 100;
        case 180: return 64;
        case 25: return 20;
        case 5: return 16;
        case 6: return 6;
        case 73: return 4;
        case 84: return 1;
      }
      ___setErrNo(ERRNO_CODES.EINVAL);
      return -1;
    }
  function ___cxa_guard_abort() {}
  function _isxdigit(chr) {
      return (chr >= 48 && chr <= 57) ||
             (chr >= 97 && chr <= 102) ||
             (chr >= 65 && chr <= 70);
    }var _isxdigit_l=_isxdigit;
  function _isdigit(chr) {
      return chr >= 48 && chr <= 57;
    }var _isdigit_l=_isdigit;
  function __getFloat(text) {
      return /^[+-]?[0-9]*\.?[0-9]+([eE][+-]?[0-9]+)?/.exec(text);
    }function __scanString(format, get, unget, varargs) {
      if (!__scanString.whiteSpace) {
        __scanString.whiteSpace = {};
        __scanString.whiteSpace[32] = 1;
        __scanString.whiteSpace[9] = 1;
        __scanString.whiteSpace[10] = 1;
        __scanString.whiteSpace[11] = 1;
        __scanString.whiteSpace[12] = 1;
        __scanString.whiteSpace[13] = 1;
      }
      // Supports %x, %4x, %d.%d, %lld, %s, %f, %lf.
      // TODO: Support all format specifiers.
      format = Pointer_stringify(format);
      var soFar = 0;
      if (format.indexOf('%n') >= 0) {
        // need to track soFar
        var _get = get;
        get = function get() {
          soFar++;
          return _get();
        }
        var _unget = unget;
        unget = function unget() {
          soFar--;
          return _unget();
        }
      }
      var formatIndex = 0;
      var argsi = 0;
      var fields = 0;
      var argIndex = 0;
      var next;
      mainLoop:
      for (var formatIndex = 0; formatIndex < format.length;) {
        if (format[formatIndex] === '%' && format[formatIndex+1] == 'n') {
          var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
          argIndex += Runtime.getAlignSize('void*', null, true);
          HEAP32[((argPtr)>>2)]=soFar;
          formatIndex += 2;
          continue;
        }
        if (format[formatIndex] === '%') {
          var nextC = format.indexOf('c', formatIndex+1);
          if (nextC > 0) {
            var maxx = 1;
            if (nextC > formatIndex+1) {
              var sub = format.substring(formatIndex+1, nextC);
              maxx = parseInt(sub);
              if (maxx != sub) maxx = 0;
            }
            if (maxx) {
              var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
              argIndex += Runtime.getAlignSize('void*', null, true);
              fields++;
              for (var i = 0; i < maxx; i++) {
                next = get();
                HEAP8[((argPtr++)|0)]=next;
              }
              formatIndex += nextC - formatIndex + 1;
              continue;
            }
          }
        }
        // handle %[...]
        if (format[formatIndex] === '%' && format.indexOf('[', formatIndex+1) > 0) {
          var match = /\%([0-9]*)\[(\^)?(\]?[^\]]*)\]/.exec(format.substring(formatIndex));
          if (match) {
            var maxNumCharacters = parseInt(match[1]) || Infinity;
            var negateScanList = (match[2] === '^');
            var scanList = match[3];
            // expand "middle" dashs into character sets
            var middleDashMatch;
            while ((middleDashMatch = /([^\-])\-([^\-])/.exec(scanList))) {
              var rangeStartCharCode = middleDashMatch[1].charCodeAt(0);
              var rangeEndCharCode = middleDashMatch[2].charCodeAt(0);
              for (var expanded = ''; rangeStartCharCode <= rangeEndCharCode; expanded += String.fromCharCode(rangeStartCharCode++));
              scanList = scanList.replace(middleDashMatch[1] + '-' + middleDashMatch[2], expanded);
            }
            var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
            argIndex += Runtime.getAlignSize('void*', null, true);
            fields++;
            for (var i = 0; i < maxNumCharacters; i++) {
              next = get();
              if (negateScanList) {
                if (scanList.indexOf(String.fromCharCode(next)) < 0) {
                  HEAP8[((argPtr++)|0)]=next;
                } else {
                  unget();
                  break;
                }
              } else {
                if (scanList.indexOf(String.fromCharCode(next)) >= 0) {
                  HEAP8[((argPtr++)|0)]=next;
                } else {
                  unget();
                  break;
                }
              }
            }
            // write out null-terminating character
            HEAP8[((argPtr++)|0)]=0;
            formatIndex += match[0].length;
            continue;
          }
        }      
        // remove whitespace
        while (1) {
          next = get();
          if (next == 0) return fields;
          if (!(next in __scanString.whiteSpace)) break;
        }
        unget();
        if (format[formatIndex] === '%') {
          formatIndex++;
          var suppressAssignment = false;
          if (format[formatIndex] == '*') {
            suppressAssignment = true;
            formatIndex++;
          }
          var maxSpecifierStart = formatIndex;
          while (format[formatIndex].charCodeAt(0) >= 48 &&
                 format[formatIndex].charCodeAt(0) <= 57) {
            formatIndex++;
          }
          var max_;
          if (formatIndex != maxSpecifierStart) {
            max_ = parseInt(format.slice(maxSpecifierStart, formatIndex), 10);
          }
          var long_ = false;
          var half = false;
          var longLong = false;
          if (format[formatIndex] == 'l') {
            long_ = true;
            formatIndex++;
            if (format[formatIndex] == 'l') {
              longLong = true;
              formatIndex++;
            }
          } else if (format[formatIndex] == 'h') {
            half = true;
            formatIndex++;
          }
          var type = format[formatIndex];
          formatIndex++;
          var curr = 0;
          var buffer = [];
          // Read characters according to the format. floats are trickier, they may be in an unfloat state in the middle, then be a valid float later
          if (type == 'f' || type == 'e' || type == 'g' ||
              type == 'F' || type == 'E' || type == 'G') {
            next = get();
            while (next > 0 && (!(next in __scanString.whiteSpace)))  {
              buffer.push(String.fromCharCode(next));
              next = get();
            }
            var m = __getFloat(buffer.join(''));
            var last = m ? m[0].length : 0;
            for (var i = 0; i < buffer.length - last + 1; i++) {
              unget();
            }
            buffer.length = last;
          } else {
            next = get();
            var first = true;
            // Strip the optional 0x prefix for %x.
            if ((type == 'x' || type == 'X') && (next == 48)) {
              var peek = get();
              if (peek == 120 || peek == 88) {
                next = get();
              } else {
                unget();
              }
            }
            while ((curr < max_ || isNaN(max_)) && next > 0) {
              if (!(next in __scanString.whiteSpace) && // stop on whitespace
                  (type == 's' ||
                   ((type === 'd' || type == 'u' || type == 'i') && ((next >= 48 && next <= 57) ||
                                                                     (first && next == 45))) ||
                   ((type === 'x' || type === 'X') && (next >= 48 && next <= 57 ||
                                     next >= 97 && next <= 102 ||
                                     next >= 65 && next <= 70))) &&
                  (formatIndex >= format.length || next !== format[formatIndex].charCodeAt(0))) { // Stop when we read something that is coming up
                buffer.push(String.fromCharCode(next));
                next = get();
                curr++;
                first = false;
              } else {
                break;
              }
            }
            unget();
          }
          if (buffer.length === 0) return 0;  // Failure.
          if (suppressAssignment) continue;
          var text = buffer.join('');
          var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
          argIndex += Runtime.getAlignSize('void*', null, true);
          switch (type) {
            case 'd': case 'u': case 'i':
              if (half) {
                HEAP16[((argPtr)>>1)]=parseInt(text, 10);
              } else if (longLong) {
                (tempI64 = [parseInt(text, 10)>>>0,(tempDouble=parseInt(text, 10),(+(Math_abs(tempDouble))) >= (+1) ? (tempDouble > (+0) ? ((Math_min((+(Math_floor((tempDouble)/(+4294967296)))), (+4294967295)))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/(+4294967296))))))>>>0) : 0)],HEAP32[((argPtr)>>2)]=tempI64[0],HEAP32[(((argPtr)+(4))>>2)]=tempI64[1]);
              } else {
                HEAP32[((argPtr)>>2)]=parseInt(text, 10);
              }
              break;
            case 'X':
            case 'x':
              HEAP32[((argPtr)>>2)]=parseInt(text, 16)
              break;
            case 'F':
            case 'f':
            case 'E':
            case 'e':
            case 'G':
            case 'g':
            case 'E':
              // fallthrough intended
              if (long_) {
                HEAPF64[((argPtr)>>3)]=parseFloat(text)
              } else {
                HEAPF32[((argPtr)>>2)]=parseFloat(text)
              }
              break;
            case 's':
              var array = intArrayFromString(text);
              for (var j = 0; j < array.length; j++) {
                HEAP8[(((argPtr)+(j))|0)]=array[j]
              }
              break;
          }
          fields++;
        } else if (format[formatIndex].charCodeAt(0) in __scanString.whiteSpace) {
          next = get();
          while (next in __scanString.whiteSpace) {
            if (next <= 0) break mainLoop;  // End of input.
            next = get();
          }
          unget(next);
          formatIndex++;
        } else {
          // Not a specifier.
          next = get();
          if (format[formatIndex].charCodeAt(0) !== next) {
            unget(next);
            break mainLoop;
          }
          formatIndex++;
        }
      }
      return fields;
    }function _sscanf(s, format, varargs) {
      // int sscanf(const char *restrict s, const char *restrict format, ... );
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/scanf.html
      var index = 0;
      function get() { return HEAP8[(((s)+(index++))|0)]; };
      function unget() { index--; };
      return __scanString(format, get, unget, varargs);
    }
  function _catopen() { throw 'TODO: ' + aborter }
  function _catgets() { throw 'TODO: ' + aborter }
  function _catclose() { throw 'TODO: ' + aborter }
  function _newlocale(mask, locale, base) {
      return _malloc(4);
    }
  function _freelocale(locale) {
      _free(locale);
    }
  function ___ctype_b_loc() {
      // http://refspecs.freestandards.org/LSB_3.0.0/LSB-Core-generic/LSB-Core-generic/baselib---ctype-b-loc.html
      var me = ___ctype_b_loc;
      if (!me.ret) {
        var values = [
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,8195,8194,8194,8194,8194,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,24577,49156,49156,49156,
          49156,49156,49156,49156,49156,49156,49156,49156,49156,49156,49156,49156,55304,55304,55304,55304,55304,55304,55304,55304,
          55304,55304,49156,49156,49156,49156,49156,49156,49156,54536,54536,54536,54536,54536,54536,50440,50440,50440,50440,50440,
          50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,49156,49156,49156,49156,49156,
          49156,54792,54792,54792,54792,54792,54792,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,
          50696,50696,50696,50696,50696,50696,50696,49156,49156,49156,49156,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ];
        var i16size = 2;
        var arr = _malloc(values.length * i16size);
        for (var i = 0; i < values.length; i++) {
          HEAP16[(((arr)+(i * i16size))>>1)]=values[i]
        }
        me.ret = allocate([arr + 128 * i16size], 'i16*', ALLOC_NORMAL);
      }
      return me.ret;
    }
  function ___ctype_tolower_loc() {
      // http://refspecs.freestandards.org/LSB_3.1.1/LSB-Core-generic/LSB-Core-generic/libutil---ctype-tolower-loc.html
      var me = ___ctype_tolower_loc;
      if (!me.ret) {
        var values = [
          128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,
          158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,
          188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,
          218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,
          248,249,250,251,252,253,254,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,
          33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,97,98,99,100,101,102,103,
          104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,91,92,93,94,95,96,97,98,99,100,101,102,103,
          104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,
          134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,
          164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,
          194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,
          224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,
          254,255
        ];
        var i32size = 4;
        var arr = _malloc(values.length * i32size);
        for (var i = 0; i < values.length; i++) {
          HEAP32[(((arr)+(i * i32size))>>2)]=values[i]
        }
        me.ret = allocate([arr + 128 * i32size], 'i32*', ALLOC_NORMAL);
      }
      return me.ret;
    }
  function ___ctype_toupper_loc() {
      // http://refspecs.freestandards.org/LSB_3.1.1/LSB-Core-generic/LSB-Core-generic/libutil---ctype-toupper-loc.html
      var me = ___ctype_toupper_loc;
      if (!me.ret) {
        var values = [
          128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,
          158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,
          188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,
          218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,
          248,249,250,251,252,253,254,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,
          33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,
          73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,
          81,82,83,84,85,86,87,88,89,90,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,
          145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,
          175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,
          205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,
          235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255
        ];
        var i32size = 4;
        var arr = _malloc(values.length * i32size);
        for (var i = 0; i < values.length; i++) {
          HEAP32[(((arr)+(i * i32size))>>2)]=values[i]
        }
        me.ret = allocate([arr + 128 * i32size], 'i32*', ALLOC_NORMAL);
      }
      return me.ret;
    }
  function __isLeapYear(year) {
        return year%4 === 0 && (year%100 !== 0 || year%400 === 0);
    }
  function __arraySum(array, index) {
      var sum = 0;
      for (var i = 0; i <= index; sum += array[i++]);
      return sum;
    }
  var __MONTH_DAYS_LEAP=[31,29,31,30,31,30,31,31,30,31,30,31];
  var __MONTH_DAYS_REGULAR=[31,28,31,30,31,30,31,31,30,31,30,31];function __addDays(date, days) {
      var newDate = new Date(date.getTime());
      while(days > 0) {
        var leap = __isLeapYear(newDate.getFullYear());
        var currentMonth = newDate.getMonth();
        var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];
        if (days > daysInCurrentMonth-newDate.getDate()) {
          // we spill over to next month
          days -= (daysInCurrentMonth-newDate.getDate()+1);
          newDate.setDate(1);
          if (currentMonth < 11) {
            newDate.setMonth(currentMonth+1)
          } else {
            newDate.setMonth(0);
            newDate.setFullYear(newDate.getFullYear()+1);
          }
        } else {
          // we stay in current month 
          newDate.setDate(newDate.getDate()+days);
          return newDate;
        }
      }
      return newDate;
    }function _strftime(s, maxsize, format, tm) {
      // size_t strftime(char *restrict s, size_t maxsize, const char *restrict format, const struct tm *restrict timeptr);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/strftime.html
      var date = {
        tm_sec: HEAP32[((tm)>>2)],
        tm_min: HEAP32[(((tm)+(4))>>2)],
        tm_hour: HEAP32[(((tm)+(8))>>2)],
        tm_mday: HEAP32[(((tm)+(12))>>2)],
        tm_mon: HEAP32[(((tm)+(16))>>2)],
        tm_year: HEAP32[(((tm)+(20))>>2)],
        tm_wday: HEAP32[(((tm)+(24))>>2)],
        tm_yday: HEAP32[(((tm)+(28))>>2)],
        tm_isdst: HEAP32[(((tm)+(32))>>2)]
      };
      var pattern = Pointer_stringify(format);
      // expand format
      var EXPANSION_RULES_1 = {
        '%c': '%a %b %d %H:%M:%S %Y',     // Replaced by the locale's appropriate date and time representation - e.g., Mon Aug  3 14:02:01 2013
        '%D': '%m/%d/%y',                 // Equivalent to %m / %d / %y
        '%F': '%Y-%m-%d',                 // Equivalent to %Y - %m - %d
        '%h': '%b',                       // Equivalent to %b
        '%r': '%I:%M:%S %p',              // Replaced by the time in a.m. and p.m. notation
        '%R': '%H:%M',                    // Replaced by the time in 24-hour notation
        '%T': '%H:%M:%S',                 // Replaced by the time
        '%x': '%m/%d/%y',                 // Replaced by the locale's appropriate date representation
        '%X': '%H:%M:%S',                 // Replaced by the locale's appropriate date representation
      };
      for (var rule in EXPANSION_RULES_1) {
        pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_1[rule]);
      }
      var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      function leadingSomething(value, digits, character) {
        var str = typeof value === 'number' ? value.toString() : (value || '');
        while (str.length < digits) {
          str = character[0]+str;
        }
        return str;
      };
      function leadingNulls(value, digits) {
        return leadingSomething(value, digits, '0');
      };
      function compareByDay(date1, date2) {
        function sgn(value) {
          return value < 0 ? -1 : (value > 0 ? 1 : 0);
        };
        var compare;
        if ((compare = sgn(date1.getFullYear()-date2.getFullYear())) === 0) {
          if ((compare = sgn(date1.getMonth()-date2.getMonth())) === 0) {
            compare = sgn(date1.getDate()-date2.getDate());
          }
        }
        return compare;
      };
      function getFirstWeekStartDate(janFourth) {
          switch (janFourth.getDay()) {
            case 0: // Sunday
              return new Date(janFourth.getFullYear()-1, 11, 29);
            case 1: // Monday
              return janFourth;
            case 2: // Tuesday
              return new Date(janFourth.getFullYear(), 0, 3);
            case 3: // Wednesday
              return new Date(janFourth.getFullYear(), 0, 2);
            case 4: // Thursday
              return new Date(janFourth.getFullYear(), 0, 1);
            case 5: // Friday
              return new Date(janFourth.getFullYear()-1, 11, 31);
            case 6: // Saturday
              return new Date(janFourth.getFullYear()-1, 11, 30);
          }
      };
      function getWeekBasedYear(date) {
          var thisDate = __addDays(new Date(date.tm_year+1900, 0, 1), date.tm_yday);
          var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
          var janFourthNextYear = new Date(thisDate.getFullYear()+1, 0, 4);
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
          if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
            // this date is after the start of the first week of this year
            if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
              return thisDate.getFullYear()+1;
            } else {
              return thisDate.getFullYear();
            }
          } else { 
            return thisDate.getFullYear()-1;
          }
      };
      var EXPANSION_RULES_2 = {
        '%a': function(date) {
          return WEEKDAYS[date.tm_wday].substring(0,3);
        },
        '%A': function(date) {
          return WEEKDAYS[date.tm_wday];
        },
        '%b': function(date) {
          return MONTHS[date.tm_mon].substring(0,3);
        },
        '%B': function(date) {
          return MONTHS[date.tm_mon];
        },
        '%C': function(date) {
          var year = date.tm_year+1900;
          return leadingNulls(Math.floor(year/100),2);
        },
        '%d': function(date) {
          return leadingNulls(date.tm_mday, 2);
        },
        '%e': function(date) {
          return leadingSomething(date.tm_mday, 2, ' ');
        },
        '%g': function(date) {
          // %g, %G, and %V give values according to the ISO 8601:2000 standard week-based year. 
          // In this system, weeks begin on a Monday and week 1 of the year is the week that includes 
          // January 4th, which is also the week that includes the first Thursday of the year, and 
          // is also the first week that contains at least four days in the year. 
          // If the first Monday of January is the 2nd, 3rd, or 4th, the preceding days are part of 
          // the last week of the preceding year; thus, for Saturday 2nd January 1999, 
          // %G is replaced by 1998 and %V is replaced by 53. If December 29th, 30th, 
          // or 31st is a Monday, it and any following days are part of week 1 of the following year. 
          // Thus, for Tuesday 30th December 1997, %G is replaced by 1998 and %V is replaced by 01.
          return getWeekBasedYear(date).toString().substring(2);
        },
        '%G': function(date) {
          return getWeekBasedYear(date);
        },
        '%H': function(date) {
          return leadingNulls(date.tm_hour, 2);
        },
        '%I': function(date) {
          return leadingNulls(date.tm_hour < 13 ? date.tm_hour : date.tm_hour-12, 2);
        },
        '%j': function(date) {
          // Day of the year (001-366)
          return leadingNulls(date.tm_mday+__arraySum(__isLeapYear(date.tm_year+1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon-1), 3);
        },
        '%m': function(date) {
          return leadingNulls(date.tm_mon+1, 2);
        },
        '%M': function(date) {
          return leadingNulls(date.tm_min, 2);
        },
        '%n': function() {
          return '\n';
        },
        '%p': function(date) {
          if (date.tm_hour > 0 && date.tm_hour < 13) {
            return 'AM';
          } else {
            return 'PM';
          }
        },
        '%S': function(date) {
          return leadingNulls(date.tm_sec, 2);
        },
        '%t': function() {
          return '\t';
        },
        '%u': function(date) {
          var day = new Date(date.tm_year+1900, date.tm_mon+1, date.tm_mday, 0, 0, 0, 0);
          return day.getDay() || 7;
        },
        '%U': function(date) {
          // Replaced by the week number of the year as a decimal number [00,53]. 
          // The first Sunday of January is the first day of week 1; 
          // days in the new year before this are in week 0. [ tm_year, tm_wday, tm_yday]
          var janFirst = new Date(date.tm_year+1900, 0, 1);
          var firstSunday = janFirst.getDay() === 0 ? janFirst : __addDays(janFirst, 7-janFirst.getDay());
          var endDate = new Date(date.tm_year+1900, date.tm_mon, date.tm_mday);
          // is target date after the first Sunday?
          if (compareByDay(firstSunday, endDate) < 0) {
            // calculate difference in days between first Sunday and endDate
            var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth()-1)-31;
            var firstSundayUntilEndJanuary = 31-firstSunday.getDate();
            var days = firstSundayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();
            return leadingNulls(Math.ceil(days/7), 2);
          }
          return compareByDay(firstSunday, janFirst) === 0 ? '01': '00';
        },
        '%V': function(date) {
          // Replaced by the week number of the year (Monday as the first day of the week) 
          // as a decimal number [01,53]. If the week containing 1 January has four 
          // or more days in the new year, then it is considered week 1. 
          // Otherwise, it is the last week of the previous year, and the next week is week 1. 
          // Both January 4th and the first Thursday of January are always in week 1. [ tm_year, tm_wday, tm_yday]
          var janFourthThisYear = new Date(date.tm_year+1900, 0, 4);
          var janFourthNextYear = new Date(date.tm_year+1901, 0, 4);
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
          var endDate = __addDays(new Date(date.tm_year+1900, 0, 1), date.tm_yday);
          if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
            // if given date is before this years first week, then it belongs to the 53rd week of last year
            return '53';
          } 
          if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
            // if given date is after next years first week, then it belongs to the 01th week of next year
            return '01';
          }
          // given date is in between CW 01..53 of this calendar year
          var daysDifference;
          if (firstWeekStartThisYear.getFullYear() < date.tm_year+1900) {
            // first CW of this year starts last year
            daysDifference = date.tm_yday+32-firstWeekStartThisYear.getDate()
          } else {
            // first CW of this year starts this year
            daysDifference = date.tm_yday+1-firstWeekStartThisYear.getDate();
          }
          return leadingNulls(Math.ceil(daysDifference/7), 2);
        },
        '%w': function(date) {
          var day = new Date(date.tm_year+1900, date.tm_mon+1, date.tm_mday, 0, 0, 0, 0);
          return day.getDay();
        },
        '%W': function(date) {
          // Replaced by the week number of the year as a decimal number [00,53]. 
          // The first Monday of January is the first day of week 1; 
          // days in the new year before this are in week 0. [ tm_year, tm_wday, tm_yday]
          var janFirst = new Date(date.tm_year, 0, 1);
          var firstMonday = janFirst.getDay() === 1 ? janFirst : __addDays(janFirst, janFirst.getDay() === 0 ? 1 : 7-janFirst.getDay()+1);
          var endDate = new Date(date.tm_year+1900, date.tm_mon, date.tm_mday);
          // is target date after the first Monday?
          if (compareByDay(firstMonday, endDate) < 0) {
            var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth()-1)-31;
            var firstMondayUntilEndJanuary = 31-firstMonday.getDate();
            var days = firstMondayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();
            return leadingNulls(Math.ceil(days/7), 2);
          }
          return compareByDay(firstMonday, janFirst) === 0 ? '01': '00';
        },
        '%y': function(date) {
          // Replaced by the last two digits of the year as a decimal number [00,99]. [ tm_year]
          return (date.tm_year+1900).toString().substring(2);
        },
        '%Y': function(date) {
          // Replaced by the year as a decimal number (for example, 1997). [ tm_year]
          return date.tm_year+1900;
        },
        '%z': function(date) {
          // Replaced by the offset from UTC in the ISO 8601:2000 standard format ( +hhmm or -hhmm ),
          // or by no characters if no timezone is determinable. 
          // For example, "-0430" means 4 hours 30 minutes behind UTC (west of Greenwich). 
          // If tm_isdst is zero, the standard time offset is used. 
          // If tm_isdst is greater than zero, the daylight savings time offset is used. 
          // If tm_isdst is negative, no characters are returned. 
          // FIXME: we cannot determine time zone (or can we?)
          return '';
        },
        '%Z': function(date) {
          // Replaced by the timezone name or abbreviation, or by no bytes if no timezone information exists. [ tm_isdst]
          // FIXME: we cannot determine time zone (or can we?)
          return '';
        },
        '%%': function() {
          return '%';
        }
      };
      for (var rule in EXPANSION_RULES_2) {
        if (pattern.indexOf(rule) >= 0) {
          pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_2[rule](date));
        }
      }
      var bytes = intArrayFromString(pattern, false);
      if (bytes.length > maxsize) {
        return 0;
      } 
      writeArrayToMemory(bytes, s);
      return bytes.length-1;
    }var _strftime_l=_strftime;
  function _isspace(chr) {
      return (chr == 32) || (chr >= 9 && chr <= 13);
    }
  function __parseInt64(str, endptr, base, min, max, unsign) {
      var isNegative = false;
      // Skip space.
      while (_isspace(HEAP8[(str)])) str++;
      // Check for a plus/minus sign.
      if (HEAP8[(str)] == 45) {
        str++;
        isNegative = true;
      } else if (HEAP8[(str)] == 43) {
        str++;
      }
      // Find base.
      var ok = false;
      var finalBase = base;
      if (!finalBase) {
        if (HEAP8[(str)] == 48) {
          if (HEAP8[((str+1)|0)] == 120 ||
              HEAP8[((str+1)|0)] == 88) {
            finalBase = 16;
            str += 2;
          } else {
            finalBase = 8;
            ok = true; // we saw an initial zero, perhaps the entire thing is just "0"
          }
        }
      } else if (finalBase==16) {
        if (HEAP8[(str)] == 48) {
          if (HEAP8[((str+1)|0)] == 120 ||
              HEAP8[((str+1)|0)] == 88) {
            str += 2;
          }
        }
      }
      if (!finalBase) finalBase = 10;
      var start = str;
      // Get digits.
      var chr;
      while ((chr = HEAP8[(str)]) != 0) {
        var digit = parseInt(String.fromCharCode(chr), finalBase);
        if (isNaN(digit)) {
          break;
        } else {
          str++;
          ok = true;
        }
      }
      if (!ok) {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return ((asm["setTempRet0"](0),0)|0);
      }
      // Set end pointer.
      if (endptr) {
        HEAP32[((endptr)>>2)]=str
      }
      try {
        var numberString = isNegative ? '-'+Pointer_stringify(start, str - start) : Pointer_stringify(start, str - start);
        i64Math.fromString(numberString, finalBase, min, max, unsign);
      } catch(e) {
        ___setErrNo(ERRNO_CODES.ERANGE); // not quite correct
      }
      return ((asm["setTempRet0"](((HEAP32[(((tempDoublePtr)+(4))>>2)])|0)),((HEAP32[((tempDoublePtr)>>2)])|0))|0);
    }function _strtoull(str, endptr, base) {
      return __parseInt64(str, endptr, base, 0, '18446744073709551615', true);  // ULONG_MAX.
    }var _strtoull_l=_strtoull;
  function _strtoll(str, endptr, base) {
      return __parseInt64(str, endptr, base, '-9223372036854775808', '9223372036854775807');  // LLONG_MIN, LLONG_MAX.
    }var _strtoll_l=_strtoll;
  function _uselocale(locale) {
      return 0;
    }
  var _llvm_va_start=undefined;
  function _sprintf(s, format, varargs) {
      // int sprintf(char *restrict s, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      return _snprintf(s, undefined, format, varargs);
    }function _asprintf(s, format, varargs) {
      return _sprintf(-s, format, varargs);
    }function _vasprintf(s, format, va_arg) {
      return _asprintf(s, format, HEAP32[((va_arg)>>2)]);
    }
  function _llvm_va_end() {}
  function _vsnprintf(s, n, format, va_arg) {
      return _snprintf(s, n, format, HEAP32[((va_arg)>>2)]);
    }
  function _vsscanf(s, format, va_arg) {
      return _sscanf(s, format, HEAP32[((va_arg)>>2)]);
    }
  function _sbrk(bytes) {
      // Implement a Linux-like 'memory area' for our 'process'.
      // Changes the size of the memory area by |bytes|; returns the
      // address of the previous top ('break') of the memory area
      // We control the "dynamic" memory - DYNAMIC_BASE to DYNAMICTOP
      var self = _sbrk;
      if (!self.called) {
        DYNAMICTOP = alignMemoryPage(DYNAMICTOP); // make sure we start out aligned
        self.called = true;
        assert(Runtime.dynamicAlloc);
        self.alloc = Runtime.dynamicAlloc;
        Runtime.dynamicAlloc = function() { abort('cannot dynamically allocate, sbrk now has control') };
      }
      var ret = DYNAMICTOP;
      if (bytes != 0) self.alloc(bytes);
      return ret;  // Previous break location.
    }
  function _time(ptr) {
      var ret = Math.floor(Date.now()/1000);
      if (ptr) {
        HEAP32[((ptr)>>2)]=ret
      }
      return ret;
    }
  function ___cxa_call_unexpected(exception) {
      Module.printErr('Unexpected exception thrown, this is not properly supported - aborting');
      ABORT = true;
      throw exception;
    }
GL.init()
Module["requestFullScreen"] = function Module_requestFullScreen(lockPointer, resizeCanvas) { Browser.requestFullScreen(lockPointer, resizeCanvas) };
  Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) { Browser.requestAnimationFrame(func) };
  Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) { Browser.setCanvasSize(width, height, noUpdates) };
  Module["pauseMainLoop"] = function Module_pauseMainLoop() { Browser.mainLoop.pause() };
  Module["resumeMainLoop"] = function Module_resumeMainLoop() { Browser.mainLoop.resume() };
  Module["getUserMedia"] = function Module_getUserMedia() { Browser.getUserMedia() }
FS.staticInit();__ATINIT__.unshift({ func: function() { if (!Module["noFSInit"] && !FS.init.initialized) FS.init() } });__ATMAIN__.push({ func: function() { FS.ignorePermissions = false } });__ATEXIT__.push({ func: function() { FS.quit() } });Module["FS_createFolder"] = FS.createFolder;Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createLink"] = FS.createLink;Module["FS_createDevice"] = FS.createDevice;
___errno_state = Runtime.staticAlloc(4); HEAP32[((___errno_state)>>2)]=0;
__ATINIT__.unshift({ func: function() { TTY.init() } });__ATEXIT__.push({ func: function() { TTY.shutdown() } });TTY.utf8 = new Runtime.UTF8Processor();
if (ENVIRONMENT_IS_NODE) { var fs = require("fs"); NODEFS.staticInit(); }
_llvm_eh_exception.buf = allocate(12, "void*", ALLOC_STATIC);
__ATINIT__.push({ func: function() { SOCKFS.root = FS.mount(SOCKFS, {}, null); } });
_fgetc.ret = allocate([0], "i8", ALLOC_STATIC);
STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP);
staticSealed = true; // seal the static portion of memory
STACK_MAX = STACK_BASE + 5242880;
DYNAMIC_BASE = DYNAMICTOP = Runtime.alignMemory(STACK_MAX);
assert(DYNAMIC_BASE < TOTAL_MEMORY); // Stack must fit in TOTAL_MEMORY; allocations from here on may enlarge TOTAL_MEMORY
 var cttz_i8 = allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0], "i8", ALLOC_DYNAMIC);
var Math_min = Math.min;
function invoke_viiiii(index,a1,a2,a3,a4,a5) {
  try {
    Module["dynCall_viiiii"](index,a1,a2,a3,a4,a5);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_viii(index,a1,a2,a3) {
  try {
    Module["dynCall_viii"](index,a1,a2,a3);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_vi(index,a1) {
  try {
    Module["dynCall_vi"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_vii(index,a1,a2) {
  try {
    Module["dynCall_vii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_iii(index,a1,a2) {
  try {
    return Module["dynCall_iii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_iiii(index,a1,a2,a3) {
  try {
    return Module["dynCall_iiii"](index,a1,a2,a3);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_viiiiiid(index,a1,a2,a3,a4,a5,a6,a7) {
  try {
    Module["dynCall_viiiiiid"](index,a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_ii(index,a1) {
  try {
    return Module["dynCall_ii"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_viiiiiii(index,a1,a2,a3,a4,a5,a6,a7) {
  try {
    Module["dynCall_viiiiiii"](index,a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_viiiiid(index,a1,a2,a3,a4,a5,a6) {
  try {
    Module["dynCall_viiiiid"](index,a1,a2,a3,a4,a5,a6);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_v(index) {
  try {
    Module["dynCall_v"](index);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_iiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8) {
  try {
    return Module["dynCall_iiiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7,a8);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_viiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9) {
  try {
    Module["dynCall_viiiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7,a8,a9);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_viiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8) {
  try {
    Module["dynCall_viiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7,a8);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_viiiiii(index,a1,a2,a3,a4,a5,a6) {
  try {
    Module["dynCall_viiiiii"](index,a1,a2,a3,a4,a5,a6);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_iiiii(index,a1,a2,a3,a4) {
  try {
    return Module["dynCall_iiiii"](index,a1,a2,a3,a4);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_iiiiii(index,a1,a2,a3,a4,a5) {
  try {
    return Module["dynCall_iiiiii"](index,a1,a2,a3,a4,a5);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_viiii(index,a1,a2,a3,a4) {
  try {
    Module["dynCall_viiii"](index,a1,a2,a3,a4);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function asmPrintInt(x, y) {
  Module.print('int ' + x + ',' + y);// + ' ' + new Error().stack);
}
function asmPrintFloat(x, y) {
  Module.print('float ' + x + ',' + y);// + ' ' + new Error().stack);
}
// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer){"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.STACKTOP|0;var j=env.STACK_MAX|0;var k=env.tempDoublePtr|0;var l=env.ABORT|0;var m=env.cttz_i8|0;var n=env.ctlz_i8|0;var o=env._stdin|0;var p=env.__ZTVN10__cxxabiv120__si_class_type_infoE|0;var q=env._stderr|0;var r=env.___fsmu8|0;var s=env._stdout|0;var t=env.___dso_handle|0;var u=env.__ZTVN10__cxxabiv117__class_type_infoE|0;var v=+env.NaN;var w=+env.Infinity;var x=0;var y=0;var z=0;var A=0;var B=0,C=0,D=0,E=0,F=0.0,G=0,H=0,I=0,J=0.0;var K=0;var L=0;var M=0;var N=0;var O=0;var P=0;var Q=0;var R=0;var S=0;var T=0;var U=global.Math.floor;var V=global.Math.abs;var W=global.Math.sqrt;var X=global.Math.pow;var Y=global.Math.cos;var Z=global.Math.sin;var _=global.Math.tan;var $=global.Math.acos;var aa=global.Math.asin;var ab=global.Math.atan;var ac=global.Math.atan2;var ad=global.Math.exp;var ae=global.Math.log;var af=global.Math.ceil;var ag=global.Math.imul;var ah=env.abort;var ai=env.assert;var aj=env.asmPrintInt;var ak=env.asmPrintFloat;var al=env.min;var am=env.invoke_viiiii;var an=env.invoke_viii;var ao=env.invoke_vi;var ap=env.invoke_vii;var aq=env.invoke_iii;var ar=env.invoke_iiii;var as=env.invoke_viiiiiid;var at=env.invoke_ii;var au=env.invoke_viiiiiii;var av=env.invoke_viiiiid;var aw=env.invoke_v;var ax=env.invoke_iiiiiiiii;var ay=env.invoke_viiiiiiiii;var az=env.invoke_viiiiiiii;var aA=env.invoke_viiiiii;var aB=env.invoke_iiiii;var aC=env.invoke_iiiiii;var aD=env.invoke_viiii;var aE=env._llvm_lifetime_end;var aF=env._lseek;var aG=env._glClearColor;var aH=env._sysconf;var aI=env.__scanString;var aJ=env._fclose;var aK=env._pthread_mutex_lock;var aL=env.___cxa_end_catch;var aM=env._glfwSetMouseWheelCallback;var aN=env._strtoull;var aO=env._glBindTexture;var aP=env._fflush;var aQ=env.__isLeapYear;var aR=env._glGetString;var aS=env._fwrite;var aT=env._llvm_eh_exception;var aU=env._glUniform2fv;var aV=env._glCompileShader;var aW=env._isspace;var aX=env._read;var aY=env._glfwSetWindowTitle;var aZ=env._glfwSetMousePosCallback;var a_=env._fsync;var a$=env._glGenTextures;var a0=env._newlocale;var a1=env.___gxx_personality_v0;var a2=env._pthread_cond_wait;var a3=env.___cxa_rethrow;var a4=env.___resumeException;var a5=env._glCreateShader;var a6=env._glUniform1i;var a7=env._llvm_va_end;var a8=env._vsscanf;var a9=env._glLinkProgram;var ba=env._glDisable;var bb=env._fgetc;var bc=env._glGetProgramiv;var bd=env._glVertexAttribPointer;var be=env.__getFloat;var bf=env._atexit;var bg=env._glGetIntegerv;var bh=env.___cxa_free_exception;var bi=env._glGetUniformLocation;var bj=env._close;var bk=env._glBindFramebuffer;var bl=env.___setErrNo;var bm=env.___cxa_guard_abort;var bn=env._isxdigit;var bo=env._ftell;var bp=env._exit;var bq=env._sprintf;var br=env.___ctype_b_loc;var bs=env._freelocale;var bt=env._glAttachShader;var bu=env._catgets;var bv=env._glCheckFramebufferStatus;var bw=env._asprintf;var bx=env.___cxa_is_number_type;var by=env.___cxa_does_inherit;var bz=env.___cxa_guard_acquire;var bA=env._glBindAttribLocation;var bB=env.___cxa_begin_catch;var bC=env._glfwTerminate;var bD=env._recv;var bE=env.__parseInt64;var bF=env.__ZSt18uncaught_exceptionv;var bG=env.___cxa_call_unexpected;var bH=env._glGetShaderiv;var bI=env.__exit;var bJ=env._strftime;var bK=env.___cxa_throw;var bL=env._glUseProgram;var bM=env._send;var bN=env._glShaderSource;var bO=env._pread;var bP=env._fopen;var bQ=env._open;var bR=env._glDrawArrays;var bS=env.__arraySum;var bT=env._snprintf;var bU=env._glClear;var bV=env._glfwSetCharCallback;var bW=env._glActiveTexture;var bX=env._glEnableVertexAttribArray;var bY=env._glBindBuffer;var bZ=env.___cxa_find_matching_catch;var b_=env._glFramebufferTexture2D;var b$=env._glfwOpenWindow;var b0=env._glBufferData;var b1=env.__formatString;var b2=env._pthread_cond_broadcast;var b3=env._glGetError;var b4=env._isascii;var b5=env._pthread_mutex_unlock;var b6=env._glGenFramebuffers;var b7=env._sbrk;var b8=env.___errno_location;var b9=env._strerror;var ca=env._glfwInit;var cb=env._catclose;var cc=env._llvm_lifetime_start;var cd=env.___cxa_guard_release;var ce=env._ungetc;var cf=env._uselocale;var cg=env._vsnprintf;var ch=env._glDisableVertexAttribArray;var ci=env._sscanf;var cj=env._glTexImage2D;var ck=env.___assert_fail;var cl=env._glfwGetWindowSize;var cm=env._fread;var cn=env._glGetShaderInfoLog;var co=env._abort;var cp=env._isdigit;var cq=env._strtoll;var cr=env._glfwOpenWindowHint;var cs=env._emscripten_asm_const;var ct=env.__reallyNegative;var cu=env._fseek;var cv=env.__addDays;var cw=env._write;var cx=env._glGenBuffers;var cy=env.___cxa_allocate_exception;var cz=env._glCreateProgram;var cA=env._ceilf;var cB=env._vasprintf;var cC=env._glViewport;var cD=env._emscripten_set_main_loop;var cE=env._catopen;var cF=env.___ctype_toupper_loc;var cG=env.___ctype_tolower_loc;var cH=env._pwrite;var cI=env.__ZSt9terminatev;var cJ=env._strerror_r;var cK=env._glTexParameteri;var cL=env._glfwSetKeyCallback;var cM=env._glfwSetMouseButtonCallback;var cN=env._time;var cO=0.0;
// EMSCRIPTEN_START_FUNCS
function c5(a){a=a|0;var b=0;b=i;i=i+a|0;i=i+7&-8;return b|0}function c6(){return i|0}function c7(a){a=a|0;i=a}function c8(a,b){a=a|0;b=b|0;if((x|0)==0){x=a;y=b}}function c9(b){b=b|0;a[k]=a[b];a[k+1|0]=a[b+1|0];a[k+2|0]=a[b+2|0];a[k+3|0]=a[b+3|0]}function da(b){b=b|0;a[k]=a[b];a[k+1|0]=a[b+1|0];a[k+2|0]=a[b+2|0];a[k+3|0]=a[b+3|0];a[k+4|0]=a[b+4|0];a[k+5|0]=a[b+5|0];a[k+6|0]=a[b+6|0];a[k+7|0]=a[b+7|0]}function db(a){a=a|0;K=a}function dc(a){a=a|0;L=a}function dd(a){a=a|0;M=a}function de(a){a=a|0;N=a}function df(a){a=a|0;O=a}function dg(a){a=a|0;P=a}function dh(a){a=a|0;Q=a}function di(a){a=a|0;R=a}function dj(a){a=a|0;S=a}function dk(a){a=a|0;T=a}function dl(){c[2510]=u+8;c[2512]=u+8;c[2514]=p+8;c[2518]=p+8;c[2522]=p+8;c[2526]=p+8;c[2530]=p+8;c[2534]=p+8;c[2538]=u+8;c[2572]=p+8;c[2576]=p+8;c[2640]=p+8;c[2644]=p+8;c[2664]=u+8;c[2666]=p+8;c[2702]=p+8;c[2706]=p+8;c[2742]=p+8;c[2746]=p+8;c[2766]=u+8;c[2768]=u+8;c[2770]=p+8;c[2774]=p+8;c[2778]=p+8;c[2782]=p+8;c[2786]=p+8;c[2790]=u+8;c[2792]=u+8;c[2794]=u+8;c[2804]=p+8;c[2808]=u+8;c[2810]=u+8;c[2812]=u+8;c[2814]=u+8;c[2840]=p+8;c[2844]=p+8;c[2848]=u+8;c[2850]=p+8;c[2854]=p+8;c[2858]=p+8;c[2862]=u+8;c[2864]=u+8;c[2866]=u+8;c[2868]=u+8;c[2902]=u+8;c[2904]=u+8;c[2906]=u+8;c[2908]=p+8;c[2912]=p+8;c[2916]=p+8;c[2920]=p+8;c[2924]=p+8;c[2928]=p+8}function dm(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;e=i;i=i+32|0;f=e|0;g=e+16|0;if((c[3068]|0)==0){ck(3088,3072,65,3104)}h=mG(b|0)|0;if(h>>>0>4294967279>>>0){fd(0)}if(h>>>0<11>>>0){j=h<<1&255;a[f]=j;k=f+1|0;l=j}else{j=h+16&-16;m=mu(j)|0;c[f+8>>2]=m;n=j|1;c[f>>2]=n;c[f+4>>2]=h;k=m;l=n&255}mE(k|0,b|0,h)|0;a[k+h|0]=0;h=mG(d|0)|0;if(h>>>0>4294967279>>>0){fd(0)}if(h>>>0<11>>>0){k=h<<1&255;a[g]=k;o=g+1|0;p=k}else{k=h+16&-16;b=mu(k)|0;c[g+8>>2]=b;n=k|1;c[g>>2]=n;c[g+4>>2]=h;o=b;p=n&255}mE(o|0,d|0,h)|0;a[o+h|0]=0;if((p&1)!=0){mw(c[g+8>>2]|0)}if((l&1)==0){i=e;return}mw(c[f+8>>2]|0);i=e;return}function dn(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;b=i;i=i+56|0;d=b|0;e=b+8|0;f=b+16|0;g=b+24|0;h=b+32|0;j=b+40|0;k=b+48|0;l=dp(15800,1944)|0;m=a|0;n=dp(gn(l,c[m>>2]|0)|0,1576)|0;l=a+4|0;a=gn(n,c[l>>2]|0)|0;fB(j,a+(c[(c[a>>2]|0)-12>>2]|0)|0);n=j7(j,15704)|0;o=cT[c[(c[n>>2]|0)+28>>2]&63](n,10)|0;j5(j);gp(a,o)|0;f8(a)|0;a=dp(15800,1192)|0;o=dq(a,aR(7938)|0)|0;fB(h,o+(c[(c[o>>2]|0)-12>>2]|0)|0);a=j7(h,15704)|0;j=cT[c[(c[a>>2]|0)+28>>2]&63](a,10)|0;j5(h);gp(o,j)|0;f8(o)|0;o=dp(15800,1144)|0;j=dq(o,aR(35724)|0)|0;fB(g,j+(c[(c[j>>2]|0)-12>>2]|0)|0);o=j7(g,15704)|0;h=cT[c[(c[o>>2]|0)+28>>2]&63](o,10)|0;j5(g);gp(j,h)|0;f8(j)|0;j=dp(15800,960)|0;h=dq(j,aR(7936)|0)|0;fB(f,h+(c[(c[h>>2]|0)-12>>2]|0)|0);j=j7(f,15704)|0;g=cT[c[(c[j>>2]|0)+28>>2]&63](j,10)|0;j5(f);gp(h,g)|0;f8(h)|0;h=dp(15800,632)|0;g=dq(h,aR(7937)|0)|0;fB(e,g+(c[(c[g>>2]|0)-12>>2]|0)|0);h=j7(e,15704)|0;f=cT[c[(c[h>>2]|0)+28>>2]&63](h,10)|0;j5(e);gp(g,f)|0;f8(g)|0;bg(34024,k|0);g=dp(15800,432)|0;f=gn(g,c[k>>2]|0)|0;fB(d,f+(c[(c[f>>2]|0)-12>>2]|0)|0);g=j7(d,15704)|0;e=cT[c[(c[g>>2]|0)+28>>2]&63](g,10)|0;j5(d);gp(f,e)|0;f8(f)|0;f=c[k>>2]|0;if((c[m>>2]|0)>(f|0)){ck(232,3072,94,3200);return 0}if((c[l>>2]|0)>(f|0)){ck(232,3072,94,3200);return 0}else{cs(3e3);i=b;return 1}return 0}function dp(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;e=i;i=i+32|0;f=e|0;g=e+8|0;h=e+16|0;j=e+24|0;k=g|0;a[k]=0;c[g+4>>2]=b;l=b;m=c[(c[l>>2]|0)-12>>2]|0;n=b;do{if((c[n+(m+16)>>2]|0)==0){o=c[n+(m+72)>>2]|0;if((o|0)!=0){f8(o)|0}a[k]=1;o=mG(d|0)|0;p=c[(c[l>>2]|0)-12>>2]|0;c[h>>2]=c[n+(p+24)>>2];q=d+o|0;o=(c[n+(p+4)>>2]&176|0)==32?q:d;r=n+p|0;s=n+(p+76)|0;p=c[s>>2]|0;if((p|0)==-1){fB(f,r);t=j7(f,15704)|0;u=cT[c[(c[t>>2]|0)+28>>2]&63](t,32)|0;j5(f);c[s>>2]=u<<24>>24;v=u}else{v=p&255}dA(j,h,d,o,q,r,v);if((c[j>>2]|0)!=0){break}r=c[(c[l>>2]|0)-12>>2]|0;fz(n+r|0,c[n+(r+16)>>2]|5)}}while(0);gm(g);i=e;return b|0}function dq(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;e=i;i=i+32|0;f=e|0;g=e+8|0;h=e+16|0;j=e+24|0;k=g|0;a[k]=0;c[g+4>>2]=b;l=b;m=c[(c[l>>2]|0)-12>>2]|0;n=b;do{if((c[n+(m+16)>>2]|0)==0){o=c[n+(m+72)>>2]|0;if((o|0)!=0){f8(o)|0}a[k]=1;o=mG(d|0)|0;p=c[(c[l>>2]|0)-12>>2]|0;c[h>>2]=c[n+(p+24)>>2];q=d+o|0;o=(c[n+(p+4)>>2]&176|0)==32?q:d;r=n+p|0;s=n+(p+76)|0;p=c[s>>2]|0;if((p|0)==-1){fB(f,r);t=j7(f,15704)|0;u=cT[c[(c[t>>2]|0)+28>>2]&63](t,32)|0;j5(f);c[s>>2]=u<<24>>24;v=u}else{v=p&255}dA(j,h,d,o,q,r,v);if((c[j>>2]|0)!=0){break}r=c[(c[l>>2]|0)-12>>2]|0;fz(n+r|0,c[n+(r+16)>>2]|5)}}while(0);gm(g);i=e;return b|0}function dr(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=i;i=i+72|0;e=d|0;f=d+8|0;g=d+24|0;h=d+40|0;j=d+56|0;dn(b)|0;k=b|0;l=b+4|0;cC(0,0,c[k>>2]|0,c[l>>2]|0);m=mu(40)|0;dU(m);n=b+8|0;c[n>>2]=m;o=mu(32)|0;p=f+8|0;c[p>>2]=o;c[f>>2]=33;c[f+4>>2]=17;mE(o|0,2792,17)|0;a[o+17|0]=0;o=mu(32)|0;q=g+8|0;c[q>>2]=o;c[g>>2]=33;c[g+4>>2]=17;mE(o|0,2488,17)|0;a[o+17|0]=0;c[b+16>>2]=d_(m,f,g)|0;if((a[g]&1)!=0){mw(c[q>>2]|0)}if((a[f]&1)!=0){mw(c[p>>2]|0)}p=c[n>>2]|0;n=mu(32)|0;f=h+8|0;c[f>>2]=n;c[h>>2]=33;c[h+4>>2]=17;mE(n|0,2792,17)|0;a[n+17|0]=0;n=mu(32)|0;q=j+8|0;c[q>>2]=n;c[j>>2]=33;c[j+4>>2]=17;mE(n|0,2312,17)|0;a[n+17|0]=0;c[b+20>>2]=d_(p,h,j)|0;if((a[j]&1)!=0){mw(c[q>>2]|0)}if((a[h]&1)!=0){mw(c[f>>2]|0)}dT(3072,119);f=b+12|0;cx(1,f|0);bY(34962,c[f>>2]|0);b0(34962,60,3672,35044);bY(34962,0);f=b+24|0;b6(1,f|0);h=b+28|0;a$(1,h|0);dT(3072,187);if((c[k>>2]|0)!=512){ck(2160,3072,189,3192);return 0}if((c[l>>2]|0)!=512){ck(2160,3072,189,3192);return 0}aO(3553,c[h>>2]|0);cj(3553,0,6407,512,512,0,6407,5121,0);cK(3553,10242,33071);cK(3553,10243,33071);cK(3553,10240,9728);cK(3553,10241,9728);dT(3072,196);bk(36160,c[f>>2]|0);b_(36160,36064,3553,c[h>>2]|0,0);h=bv(36160)|0;if((h|0)==36053){dT(3072,204);bk(36160,0);i=d;return 1}f=dp(go(dp(15800,2104)|0,h)|0,2080)|0;fB(e,f+(c[(c[f>>2]|0)-12>>2]|0)|0);h=j7(e,15704)|0;l=cT[c[(c[h>>2]|0)+28>>2]&63](h,10)|0;j5(e);gp(f,l)|0;f8(f)|0;dT(3072,204);bk(36160,0);i=d;return 1}function ds(b){b=b|0;var d=0,e=0,f=0,h=0,j=0,k=0.0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;d=i;i=i+56|0;e=d|0;f=d+8|0;h=d+24|0;j=d+40|0;k=1.0/+(c[b+4>>2]|0);l=e|0;g[l>>2]=1.0/+(c[b>>2]|0);g[e+4>>2]=k;ba(2929);ba(2884);e=b+32|0;if((a[e]&1)==0){bk(36160,c[b+24>>2]|0);aG(+0.0,+0.0,+0.0,+0.0);bU(16384);m=b+8|0;d$(c[m>>2]|0,c[b+20>>2]|0);n=c[m>>2]|0;o=mu(16)|0;p=f+8|0;c[p>>2]=o;c[f>>2]=17;c[f+4>>2]=13;mE(o|0,2048,13)|0;a[o+13|0]=0;d1(n,f,1,l);if((a[f]&1)!=0){mw(c[p>>2]|0)}bY(34962,c[b+12>>2]|0);bY(34963,0);bX(0);bX(1);bd(0,3,5126,0,20,0);bd(1,2,5126,0,20,12);bR(4,0,3);ch(0);ch(1);a[e]=1;q=m}else{q=b+8|0}bk(36160,0);d$(c[q>>2]|0,c[b+16>>2]|0);m=c[q>>2]|0;e=mu(16)|0;p=h+8|0;c[p>>2]=e;c[h>>2]=17;c[h+4>>2]=13;mE(e|0,2048,13)|0;a[e+13|0]=0;d1(m,h,1,l);if((a[h]&1)!=0){mw(c[p>>2]|0)}p=c[q>>2]|0;q=j;a[q]=6;h=j+1|0;a[h]=a[2016]|0;a[h+1|0]=a[2017]|0;a[h+2|0]=a[2018]|0;a[j+4|0]=0;d0(p,j,0);if((a[q]&1)==0){bW(33984);r=b+28|0;s=c[r>>2]|0;aO(3553,s|0);t=b+12|0;u=c[t>>2]|0;bY(34962,u|0);bY(34963,0);bX(0);bX(1);bd(0,3,5126,0,20,0);bd(1,2,5126,0,20,12);bR(4,0,3);ch(0);ch(1);i=d;return}mw(c[j+8>>2]|0);bW(33984);r=b+28|0;s=c[r>>2]|0;aO(3553,s|0);t=b+12|0;u=c[t>>2]|0;bY(34962,u|0);bY(34963,0);bX(0);bX(1);bd(0,3,5126,0,20,0);bd(1,2,5126,0,20,12);bR(4,0,3);ch(0);ch(1);i=d;return}function dt(a,b){a=a|0;b=b|0;return}function du(a,b){a=a|0;b=b|0;return}function dv(a){a=a|0;return}function dw(a,b){a=a|0;b=b|0;return}function dx(a,b){a=a|0;b=b|0;return}function dy(){ds(c[3068]|0);return}function dz(){var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;b=i;i=i+40|0;d=b|0;e=b+8|0;f=b+16|0;g=b+24|0;h=b+32|0;if((ca()|0)!=1){j=dp(15800,1984)|0;fB(f,j+(c[(c[j>>2]|0)-12>>2]|0)|0);k=j7(f,15704)|0;l=cT[c[(c[k>>2]|0)+28>>2]&63](k,10)|0;j5(f);gp(j,l)|0;f8(j)|0;m=1;i=b;return m|0}cr(131090,1);if((b$(512,512,8,8,8,0,0,0,65537)|0)!=1){j=dp(15800,1912)|0;fB(e,j+(c[(c[j>>2]|0)-12>>2]|0)|0);l=j7(e,15704)|0;f=cT[c[(c[l>>2]|0)+28>>2]&63](l,10)|0;j5(e);gp(j,f)|0;f8(j)|0;m=2;i=b;return m|0}cl(g|0,h|0);j=mu(60)|0;f=j;e=c[h>>2]|0;c[j>>2]=c[g>>2];c[j+4>>2]=e;c[j+8>>2]=0;a[j+32|0]=0;e=j+36|0;mF(e|0,0,24)|0;c[3068]=f;aY(1872);cL(86);bV(74);aZ(4);cM(54);aM(58);dr(c[3068]|0)|0;cD(2,0,1);f=dp(15800,1816)|0;fB(d,f+(c[(c[f>>2]|0)-12>>2]|0)|0);e=j7(d,15704)|0;j=cT[c[(c[e>>2]|0)+28>>2]&63](e,10)|0;j5(d);gp(f,j)|0;f8(f)|0;f=c[3068]|0;if((f|0)!=0){j=c[f+8>>2]|0;if((j|0)!=0){dV(j);mw(j)}if((a[f+48|0]&1)!=0){mw(c[f+56>>2]|0)}if((a[f+36|0]&1)!=0){mw(c[f+44>>2]|0)}mw(f)}m=0;i=b;return m|0}function dA(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;k=i;i=i+16|0;l=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[l>>2];l=k|0;m=d|0;d=c[m>>2]|0;if((d|0)==0){c[b>>2]=0;i=k;return}n=g;g=e;o=n-g|0;p=h+12|0;h=c[p>>2]|0;q=(h|0)>(o|0)?h-o|0:0;o=f;h=o-g|0;do{if((h|0)>0){if((cU[c[(c[d>>2]|0)+48>>2]&63](d,e,h)|0)==(h|0)){break}c[m>>2]=0;c[b>>2]=0;i=k;return}}while(0);do{if((q|0)>0){if(q>>>0<11>>>0){h=q<<1&255;e=l;a[e]=h;r=l+1|0;s=h;t=e}else{e=q+16&-16;h=mu(e)|0;c[l+8>>2]=h;g=e|1;c[l>>2]=g;c[l+4>>2]=q;r=h;s=g&255;t=l}mF(r|0,j|0,q|0)|0;a[r+q|0]=0;if((s&1)==0){u=l+1|0}else{u=c[l+8>>2]|0}if((cU[c[(c[d>>2]|0)+48>>2]&63](d,u,q)|0)==(q|0)){if((a[t]&1)==0){break}mw(c[l+8>>2]|0);break}c[m>>2]=0;c[b>>2]=0;if((a[t]&1)==0){i=k;return}mw(c[l+8>>2]|0);i=k;return}}while(0);l=n-o|0;do{if((l|0)>0){if((cU[c[(c[d>>2]|0)+48>>2]&63](d,f,l)|0)==(l|0)){break}c[m>>2]=0;c[b>>2]=0;i=k;return}}while(0);c[p>>2]=0;c[b>>2]=d;i=k;return}function dB(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;e=i;i=i+216|0;f=e|0;g=e+8|0;h=e+200|0;j=h;k=i;i=i+16|0;l=g;m=g|0;n=g;o=g+8|0;p=g;c[m>>2]=11780;q=g+108|0;c[q>>2]=11800;c[g+4>>2]=0;fC(g+108|0,o);c[g+180>>2]=0;c[g+184>>2]=-1;c[m>>2]=5820;c[g+108>>2]=5840;dS(o);if((a[d]&1)==0){r=d+1|0}else{r=c[d+8>>2]|0}s=g+72|0;do{if((c[s>>2]|0)==0){t=bP(r|0,2272)|0;c[s>>2]=t;if((t|0)==0){u=225;break}c[g+96>>2]=12}else{u=225}}while(0);if((u|0)==225){u=c[(c[p>>2]|0)-12>>2]|0;fz(l+u|0,c[l+(u+16)>>2]|4)}if((c[l+((c[(c[p>>2]|0)-12>>2]|0)+16)>>2]&5|0)!=0){u=dp(dC(dp(15800,1784)|0,d)|0,2456)|0;fB(f,u+(c[(c[u>>2]|0)-12>>2]|0)|0);d=j7(f,15704)|0;r=cT[c[(c[d>>2]|0)+28>>2]&63](d,10)|0;j5(f);gp(u,r)|0;f8(u)|0;ck(1808,1488,23,3216)}mF(j|0,0,12)|0;gc(n,0,0,2)|0;gb(k,n);u=c[k+8>>2]|0;k=h;if((u|0)==0){a[k+1+u|0]=0;a[j]=u<<1&255}else{fk(h,u,0)|0}gc(n,0,0,0)|0;u=a[j]|0;if((u&1)==0){v=k+1|0}else{v=c[h+8>>2]|0}k=u&255;if((k&1|0)==0){w=k>>>1}else{w=c[h+4>>2]|0}ga(n,v,w)|0;w=c[s>>2]|0;do{if((w|0)!=0){v=cW[c[(c[o>>2]|0)+24>>2]&255](o)|0;if((aJ(w|0)|0)!=0){break}c[s>>2]=0;if((v|0)!=0){break}x=b;c[x>>2]=c[j>>2];c[x+4>>2]=c[j+4>>2];c[x+8>>2]=c[j+8>>2];mF(j|0,0,12)|0;c[m>>2]=5820;c[q>>2]=5840;dI(o);y=g+108|0;fA(y);i=e;return}}while(0);s=c[(c[p>>2]|0)-12>>2]|0;fz(l+s|0,c[l+(s+16)>>2]|4);x=b;c[x>>2]=c[j>>2];c[x+4>>2]=c[j+4>>2];c[x+8>>2]=c[j+8>>2];mF(j|0,0,12)|0;c[m>>2]=5820;c[q>>2]=5840;dI(o);y=g+108|0;fA(y);i=e;return}function dC(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;e=i;i=i+32|0;f=e|0;g=e+8|0;h=e+16|0;j=e+24|0;k=g|0;a[k]=0;c[g+4>>2]=b;l=b;m=c[(c[l>>2]|0)-12>>2]|0;n=b;do{if((c[n+(m+16)>>2]|0)==0){o=c[n+(m+72)>>2]|0;if((o|0)!=0){f8(o)|0}a[k]=1;o=d;p=a[d]|0;q=p&255;if((q&1|0)==0){r=q>>>1}else{r=c[d+4>>2]|0}q=c[(c[l>>2]|0)-12>>2]|0;c[h>>2]=c[n+(q+24)>>2];s=(p&1)==0;if(s){t=o+1|0}else{t=c[d+8>>2]|0}do{if((c[n+(q+4)>>2]&176|0)==32){if(s){u=o+1+r|0;v=287;break}else{w=(c[d+8>>2]|0)+r|0;v=286;break}}else{if(s){u=o+1|0;v=287;break}else{w=c[d+8>>2]|0;v=286;break}}}while(0);if((v|0)==287){x=o+1|0;y=u}else if((v|0)==286){x=c[d+8>>2]|0;y=w}s=n+q|0;p=n+(q+76)|0;z=c[p>>2]|0;if((z|0)==-1){fB(f,s);A=j7(f,15704)|0;B=cT[c[(c[A>>2]|0)+28>>2]&63](A,32)|0;j5(f);c[p>>2]=B<<24>>24;C=B}else{C=z&255}dA(j,h,t,y,x+r|0,s,C);if((c[j>>2]|0)!=0){break}s=c[(c[l>>2]|0)-12>>2]|0;fz(n+s|0,c[n+(s+16)>>2]|5)}}while(0);gm(g);i=e;return b|0}function dD(a){a=a|0;c[a>>2]=5820;c[a+108>>2]=5840;dI(a+8|0);fA(a+108|0);return}function dE(a){a=a|0;dI(a);return}function dF(a){a=a|0;c[a>>2]=5820;c[a+108>>2]=5840;dI(a+8|0);fA(a+108|0);mw(a);return}function dG(a){a=a|0;var b=0,d=0;b=a;d=c[(c[a>>2]|0)-12>>2]|0;c[b+d>>2]=5820;a=b+(d+108)|0;c[a>>2]=5840;dI(b+(d+8)|0);fA(a);return}function dH(a){a=a|0;var b=0,d=0,e=0;b=a;d=c[(c[a>>2]|0)-12>>2]|0;a=b+d|0;c[a>>2]=5820;e=b+(d+108)|0;c[e>>2]=5840;dI(b+(d+8)|0);fA(e);mw(a);return}function dI(b){b=b|0;var d=0,e=0,f=0;d=b|0;c[d>>2]=6056;e=b+64|0;f=c[e>>2]|0;do{if((f|0)!=0){dO(b)|0;if((aJ(f|0)|0)!=0){break}c[e>>2]=0}}while(0);do{if((a[b+96|0]&1)!=0){e=c[b+32>>2]|0;if((e|0)==0){break}mx(e)}}while(0);do{if((a[b+97|0]&1)!=0){e=c[b+56>>2]|0;if((e|0)==0){break}mx(e)}}while(0);c[d>>2]=5744;j5(b+4|0);return}function dJ(a){a=a|0;dI(a);mw(a);return}function dK(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;cW[c[(c[b>>2]|0)+24>>2]&255](b)|0;e=j7(d,15400)|0;d=e;c[b+68>>2]=d;f=b+98|0;g=a[f]&1;h=cW[c[(c[e>>2]|0)+28>>2]&255](d)|0;a[f]=h&1;if((g&255|0)==(h&1|0)){return}g=b+96|0;f=b+8|0;mF(f|0,0,24)|0;f=(a[g]&1)!=0;if(h){h=b+32|0;do{if(f){d=c[h>>2]|0;if((d|0)==0){break}mx(d)}}while(0);d=b+97|0;a[g]=a[d]&1;e=b+60|0;c[b+52>>2]=c[e>>2];i=b+56|0;c[h>>2]=c[i>>2];c[e>>2]=0;c[i>>2]=0;a[d]=0;return}do{if(!f){d=b+32|0;i=c[d>>2]|0;if((i|0)==(b+44|0)){break}e=c[b+52>>2]|0;c[b+60>>2]=e;c[b+56>>2]=i;a[b+97|0]=0;c[d>>2]=mv(e)|0;a[g]=1;return}}while(0);g=c[b+52>>2]|0;c[b+60>>2]=g;c[b+56>>2]=mv(g)|0;a[b+97|0]=1;return}function dL(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0;f=b|0;g=b+96|0;h=b+8|0;mF(h|0,0,24)|0;do{if((a[g]&1)!=0){h=c[b+32>>2]|0;if((h|0)==0){break}mx(h)}}while(0);h=b+97|0;do{if((a[h]&1)!=0){i=c[b+56>>2]|0;if((i|0)==0){break}mx(i)}}while(0);i=b+52|0;c[i>>2]=e;do{if(e>>>0>8>>>0){j=a[b+98|0]|0;if((j&1)==0|(d|0)==0){c[b+32>>2]=mv(e)|0;a[g]=1;k=j;break}else{c[b+32>>2]=d;a[g]=0;k=j;break}}else{c[b+32>>2]=b+44;c[i>>2]=8;a[g]=0;k=a[b+98|0]|0}}while(0);if((k&1)!=0){c[b+60>>2]=0;c[b+56>>2]=0;a[h]=0;return f|0}k=(e|0)<8?8:e;c[b+60>>2]=k;if((d|0)!=0&k>>>0>7>>>0){c[b+56>>2]=d;a[h]=0;return f|0}else{c[b+56>>2]=mv(k)|0;a[h]=1;return f|0}return 0}function dM(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0;g=c[b+68>>2]|0;if((g|0)==0){h=cy(4)|0;l4(h);bK(h|0,10072,154)}h=cW[c[(c[g>>2]|0)+24>>2]&255](g)|0;g=b+64|0;do{if((c[g>>2]|0)!=0){i=(h|0)>0;if(!(i|(d|0)==0&(e|0)==0)){break}if((cW[c[(c[b>>2]|0)+24>>2]&255](b)|0)!=0){break}if(f>>>0>=3>>>0){j=a;c[j>>2]=0;c[j+4>>2]=0;j=a+8|0;c[j>>2]=-1;c[j+4>>2]=-1;return}j=c[g>>2]|0;if(i){i=mT(h,(h|0)<0|0?-1:0,d,e)|0;k=i}else{k=0}if((cu(j|0,k|0,f|0)|0)==0){j=bo(c[g>>2]|0)|0;i=b+72|0;l=c[i+4>>2]|0;m=a;c[m>>2]=c[i>>2];c[m+4>>2]=l;l=a+8|0;c[l>>2]=j;c[l+4>>2]=(j|0)<0|0?-1:0;return}else{j=a;c[j>>2]=0;c[j+4>>2]=0;j=a+8|0;c[j>>2]=-1;c[j+4>>2]=-1;return}}}while(0);b=a;c[b>>2]=0;c[b+4>>2]=0;b=a+8|0;c[b>>2]=-1;c[b+4>>2]=-1;return}function dN(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;e=i;f=d;d=i;i=i+16|0;c[d>>2]=c[f>>2];c[d+4>>2]=c[f+4>>2];c[d+8>>2]=c[f+8>>2];c[d+12>>2]=c[f+12>>2];f=b+64|0;do{if((c[f>>2]|0)!=0){if((cW[c[(c[b>>2]|0)+24>>2]&255](b)|0)!=0){break}if((cu(c[f>>2]|0,c[d+8>>2]|0,0)|0)==0){g=d;h=c[g+4>>2]|0;j=b+72|0;c[j>>2]=c[g>>2];c[j+4>>2]=h;h=a;j=d;c[h>>2]=c[j>>2];c[h+4>>2]=c[j+4>>2];c[h+8>>2]=c[j+8>>2];c[h+12>>2]=c[j+12>>2];i=e;return}else{j=a;c[j>>2]=0;c[j+4>>2]=0;j=a+8|0;c[j>>2]=-1;c[j+4>>2]=-1;i=e;return}}}while(0);d=a;c[d>>2]=0;c[d+4>>2]=0;d=a+8|0;c[d>>2]=-1;c[d+4>>2]=-1;i=e;return}function dO(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;d=i;i=i+16|0;e=d|0;f=d+8|0;g=f;h=b+64|0;if((c[h>>2]|0)==0){j=0;i=d;return j|0}k=b+68|0;l=c[k>>2]|0;if((l|0)==0){m=cy(4)|0;l4(m);bK(m|0,10072,154);return 0}m=b+92|0;n=c[m>>2]|0;do{if((n&16|0)==0){if((n&8|0)==0){break}o=b+80|0;p=c[o+4>>2]|0;c[f>>2]=c[o>>2];c[f+4>>2]=p;do{if((a[b+98|0]&1)==0){p=cW[c[(c[l>>2]|0)+24>>2]&255](l)|0;o=b+36|0;q=c[o>>2]|0;r=(c[b+40>>2]|0)-q|0;if((p|0)>0){s=(ag((c[b+16>>2]|0)-(c[b+12>>2]|0)|0,p)|0)+r|0;t=0;break}p=c[b+12>>2]|0;if((p|0)==(c[b+16>>2]|0)){s=r;t=0;break}u=c[k>>2]|0;v=b+32|0;w=c3[c[(c[u>>2]|0)+32>>2]&31](u,g,c[v>>2]|0,q,p-(c[b+8>>2]|0)|0)|0;s=r-w+(c[o>>2]|0)-(c[v>>2]|0)|0;t=1}else{s=(c[b+16>>2]|0)-(c[b+12>>2]|0)|0;t=0}}while(0);if((cu(c[h>>2]|0,-s|0,1)|0)!=0){j=-1;i=d;return j|0}if(t){v=b+72|0;o=c[f+4>>2]|0;c[v>>2]=c[f>>2];c[v+4>>2]=o}o=c[b+32>>2]|0;c[b+40>>2]=o;c[b+36>>2]=o;c[b+8>>2]=0;c[b+12>>2]=0;c[b+16>>2]=0;c[m>>2]=0}else{do{if((c[b+24>>2]|0)!=(c[b+20>>2]|0)){if((cT[c[(c[b>>2]|0)+52>>2]&63](b,-1)|0)==-1){j=-1}else{break}i=d;return j|0}}while(0);o=b+72|0;v=b+32|0;w=b+52|0;while(1){r=c[k>>2]|0;p=c[v>>2]|0;q=c3[c[(c[r>>2]|0)+20>>2]&31](r,o,p,p+(c[w>>2]|0)|0,e)|0;p=c[v>>2]|0;r=(c[e>>2]|0)-p|0;if((aS(p|0,1,r|0,c[h>>2]|0)|0)!=(r|0)){j=-1;x=414;break}if((q|0)==2){j=-1;x=415;break}else if((q|0)!=1){x=398;break}}if((x|0)==398){if((aP(c[h>>2]|0)|0)==0){break}else{j=-1}i=d;return j|0}else if((x|0)==414){i=d;return j|0}else if((x|0)==415){i=d;return j|0}}}while(0);j=0;i=d;return j|0}function dP(b){b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0;e=i;i=i+16|0;f=e|0;g=e+8|0;h=b+64|0;if((c[h>>2]|0)==0){j=-1;i=e;return j|0}k=b+92|0;if((c[k>>2]&8|0)==0){c[b+24>>2]=0;c[b+20>>2]=0;c[b+28>>2]=0;if((a[b+98|0]&1)==0){l=c[b+56>>2]|0;m=l+(c[b+60>>2]|0)|0;c[b+8>>2]=l;c[b+12>>2]=m;c[b+16>>2]=m;n=m}else{m=c[b+32>>2]|0;l=m+(c[b+52>>2]|0)|0;c[b+8>>2]=m;c[b+12>>2]=l;c[b+16>>2]=l;n=l}c[k>>2]=8;o=1;p=n;q=b+12|0}else{n=b+12|0;o=0;p=c[n>>2]|0;q=n}if((p|0)==0){n=f+1|0;c[b+8>>2]=f;c[q>>2]=n;c[b+16>>2]=n;r=n}else{r=p}p=c[b+16>>2]|0;if(o){s=0}else{o=(p-(c[b+8>>2]|0)|0)/2|0;s=o>>>0>4>>>0?4:o}o=b+16|0;do{if((r|0)==(p|0)){n=b+8|0;k=c[n>>2]|0;l=r+(-s|0)|0;mH(k|0,l|0,s|0)|0;if((a[b+98|0]&1)!=0){l=c[n>>2]|0;k=cm(l+s|0,1,(c[o>>2]|0)-s-l|0,c[h>>2]|0)|0;if((k|0)==0){t=-1;u=n;break}l=c[n>>2]|0;m=l+s|0;c[q>>2]=m;c[o>>2]=l+(k+s);t=d[m]|0;u=n;break}m=b+32|0;k=c[m>>2]|0;l=b+36|0;v=c[l>>2]|0;w=b+40|0;x=(c[w>>2]|0)-v|0;mH(k|0,v|0,x|0)|0;x=c[m>>2]|0;v=x+((c[w>>2]|0)-(c[l>>2]|0))|0;c[l>>2]=v;if((x|0)==(b+44|0)){y=8}else{y=c[b+52>>2]|0}k=x+y|0;c[w>>2]=k;x=b+60|0;z=(c[x>>2]|0)-s|0;A=k-v|0;k=b+72|0;B=k;C=b+80|0;D=c[B+4>>2]|0;c[C>>2]=c[B>>2];c[C+4>>2]=D;D=cm(v|0,1,(A>>>0<z>>>0?A:z)|0,c[h>>2]|0)|0;if((D|0)==0){t=-1;u=n;break}z=c[b+68>>2]|0;if((z|0)==0){A=cy(4)|0;l4(A);bK(A|0,10072,154);return 0}A=(c[l>>2]|0)+D|0;c[w>>2]=A;D=c[n>>2]|0;if((c_[c[(c[z>>2]|0)+16>>2]&31](z,k,c[m>>2]|0,A,l,D+s|0,D+(c[x>>2]|0)|0,g)|0)==3){x=c[m>>2]|0;m=c[w>>2]|0;c[n>>2]=x;c[q>>2]=x;c[o>>2]=m;t=d[x]|0;u=n;break}x=c[g>>2]|0;m=c[n>>2]|0;w=m+s|0;if((x|0)==(w|0)){t=-1;u=n;break}c[n>>2]=m;c[q>>2]=w;c[o>>2]=x;t=d[w]|0;u=n}else{t=d[r]|0;u=b+8|0}}while(0);if((c[u>>2]|0)!=(f|0)){j=t;i=e;return j|0}c[u>>2]=0;c[q>>2]=0;c[o>>2]=0;j=t;i=e;return j|0}function dQ(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0;if((c[b+64>>2]|0)==0){e=-1;return e|0}f=b+12|0;g=c[f>>2]|0;if((c[b+8>>2]|0)>>>0>=g>>>0){e=-1;return e|0}if((d|0)==-1){c[f>>2]=g-1;e=0;return e|0}h=g-1|0;do{if((c[b+88>>2]&16|0)==0){if((d<<24>>24|0)==(a[h]|0)){break}else{e=-1}return e|0}}while(0);c[f>>2]=h;a[h]=d&255;e=d;return e|0}function dR(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0;e=i;i=i+24|0;f=e|0;g=e+8|0;h=e+16|0;j=b+64|0;if((c[j>>2]|0)==0){k=-1;i=e;return k|0}l=b+92|0;if((c[l>>2]&16|0)==0){c[b+8>>2]=0;c[b+12>>2]=0;c[b+16>>2]=0;m=c[b+52>>2]|0;do{if(m>>>0>8>>>0){if((a[b+98|0]&1)==0){n=c[b+56>>2]|0;o=n+((c[b+60>>2]|0)-1)|0;c[b+24>>2]=n;c[b+20>>2]=n;c[b+28>>2]=o;p=n;q=o;break}else{o=c[b+32>>2]|0;n=o+(m-1)|0;c[b+24>>2]=o;c[b+20>>2]=o;c[b+28>>2]=n;p=o;q=n;break}}else{c[b+24>>2]=0;c[b+20>>2]=0;c[b+28>>2]=0;p=0;q=0}}while(0);c[l>>2]=16;r=p;s=q;t=b+20|0;u=b+28|0}else{q=b+20|0;p=b+28|0;r=c[q>>2]|0;s=c[p>>2]|0;t=q;u=p}p=(d|0)==-1;q=b+24|0;l=c[q>>2]|0;if(p){v=r;w=l}else{if((l|0)==0){c[q>>2]=f;c[t>>2]=f;c[u>>2]=f+1;x=f}else{x=l}a[x]=d&255;x=(c[q>>2]|0)+1|0;c[q>>2]=x;v=c[t>>2]|0;w=x}x=b+24|0;if((w|0)!=(v|0)){L496:do{if((a[b+98|0]&1)==0){q=b+32|0;l=c[q>>2]|0;c[g>>2]=l;f=b+68|0;m=c[f>>2]|0;if((m|0)==0){y=cy(4)|0;z=y;l4(z);bK(y|0,10072,154);return 0}n=b+72|0;o=b+52|0;A=m;m=v;B=w;C=l;while(1){l=c_[c[(c[A>>2]|0)+12>>2]&31](A,n,m,B,h,C,C+(c[o>>2]|0)|0,g)|0;D=c[t>>2]|0;if((c[h>>2]|0)==(D|0)){k=-1;E=499;break}if((l|0)==3){E=484;break}if(l>>>0>=2>>>0){k=-1;E=497;break}F=c[q>>2]|0;G=(c[g>>2]|0)-F|0;if((aS(F|0,1,G|0,c[j>>2]|0)|0)!=(G|0)){k=-1;E=501;break}if((l|0)!=1){break L496}l=c[h>>2]|0;G=c[x>>2]|0;c[t>>2]=l;c[u>>2]=G;F=l+(G-l)|0;c[x>>2]=F;G=c[f>>2]|0;if((G|0)==0){E=493;break}A=G;m=l;B=F;C=c[q>>2]|0}if((E|0)==484){q=(c[x>>2]|0)-D|0;if((aS(D|0,1,q|0,c[j>>2]|0)|0)==(q|0)){break}else{k=-1}i=e;return k|0}else if((E|0)==493){y=cy(4)|0;z=y;l4(z);bK(y|0,10072,154);return 0}else if((E|0)==497){i=e;return k|0}else if((E|0)==499){i=e;return k|0}else if((E|0)==501){i=e;return k|0}}else{q=w-v|0;if((aS(v|0,1,q|0,c[j>>2]|0)|0)==(q|0)){break}else{k=-1}i=e;return k|0}}while(0);c[x>>2]=r;c[t>>2]=r;c[u>>2]=s}k=p?0:d;i=e;return k|0}function dS(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0;d=i;i=i+16|0;e=d|0;f=d+8|0;g=b|0;c[g>>2]=5744;h=b+4|0;j3(h);j=b+8|0;mF(j|0,0,24)|0;c[g>>2]=6056;c[b+32>>2]=0;c[b+36>>2]=0;c[b+40>>2]=0;g=b+68|0;j=b+98|0;k=b+52|0;mF(k|0,0,47)|0;j4(e,h);k=j6(e,15400)|0;j5(e);if(k){j4(f,h);c[g>>2]=j7(f,15400)|0;j5(f);f=c[g>>2]|0;a[j]=(cW[c[(c[f>>2]|0)+28>>2]&255](f)|0)&1}cU[c[(c[b>>2]|0)+12>>2]&63](b,0,4096)|0;i=d;return}function dT(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;d=i;i=i+8|0;e=d|0;f=b3()|0;if((f|0)==0){i=d;return}dp(gn(dp(dp(dp(15800,1584)|0,a)|0,2304)|0,b)|0,1776)|0;if((f|0)==1285){dp(15800,552)|0}else if((f|0)==1283){dp(15800,848)|0}else if((f|0)==1281){dp(15800,1176)|0}else if((f|0)==1280){dp(15800,1432)|0}else if((f|0)==1282){dp(15800,1088)|0}else if((f|0)==32817){dp(15800,360)|0}else{dp(15800,128)|0}fB(e,15800+(c[(c[3950]|0)-12>>2]|0)|0);f=j7(e,15704)|0;b=cT[c[(c[f>>2]|0)+28>>2]&63](f,10)|0;j5(e);gp(15800,b)|0;f8(15800)|0;ck(2960,2592,49,3232)}function dU(a){a=a|0;var b=0;b=a;mF(b|0,0,36)|0;return}function dV(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;d=b+12|0;e=c[d>>2]|0;f=b+16|0;g=c[f>>2]|0;if((e|0)!=(g|0)){h=e;do{e=c[h>>2]|0;if((e|0)!=0){i=c[e+12>>2]|0;if((i|0)!=0){j=i;while(1){i=c[j>>2]|0;if((a[j+8|0]&1)!=0){mw(c[j+16>>2]|0)}mw(j);if((i|0)==0){break}else{j=i}}}j=e+4|0;i=c[j>>2]|0;c[j>>2]=0;if((i|0)!=0){mw(i)}mw(e)}h=h+4|0;}while((h|0)!=(g|0))}g=b|0;h=c[g>>2]|0;i=b+4|0;j=c[i>>2]|0;if((h|0)!=(j|0)){k=h;do{h=c[k>>2]|0;if((h|0)!=0){mw(h)}k=k+4|0;}while((k|0)!=(j|0))}j=b+24|0;k=c[j>>2]|0;h=b+28|0;b=c[h>>2]|0;if((k|0)==(b|0)){l=k}else{m=k;do{k=c[m>>2]|0;if((k|0)!=0){mw(k)}m=m+4|0;}while((m|0)!=(b|0));l=c[j>>2]|0}j=l;if((l|0)!=0){b=c[h>>2]|0;if((l|0)!=(b|0)){c[h>>2]=b+(~((b-4+(-j|0)|0)>>>2)<<2)}mw(l)}l=c[d>>2]|0;d=l;if((l|0)!=0){j=c[f>>2]|0;if((l|0)!=(j|0)){c[f>>2]=j+(~((j-4+(-d|0)|0)>>>2)<<2)}mw(l)}l=c[g>>2]|0;if((l|0)==0){return}g=c[i>>2]|0;if((l|0)!=(g|0)){c[i>>2]=g+(~((g-4+(-l|0)|0)>>>2)<<2)}mw(l);return}function dW(b,e,f){b=b|0;e=e|0;f=f|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0,ax=0,ay=0,az=0,aA=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0,aH=0,aI=0,aJ=0,aK=0,aL=0,aM=0,aN=0,aO=0,aP=0,aQ=0,aR=0,aS=0,aT=0,aU=0,aW=0,aX=0,aY=0,aZ=0,a_=0,a$=0,a0=0,a1=0,a2=0,a3=0,a4=0,a6=0,a7=0,a8=0,ba=0,bb=0,bd=0,be=0,bf=0,bg=0;h=i;i=i+80|0;j=h|0;k=h+8|0;l=h+16|0;m=h+24|0;n=h+40|0;o=h+48|0;p=h+64|0;q=p;r=i;i=i+8|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;u=i;i=i+1024|0;v=i;i=i+4|0;i=i+7&-8;w=i;i=i+12|0;i=i+7&-8;x=i;i=i+12|0;i=i+7&-8;y=i;i=i+144|0;z=i;i=i+12|0;i=i+7&-8;A=z;B=i;i=i+12|0;i=i+7&-8;C=B;D=i;i=i+12|0;i=i+7&-8;E=D;F=i;i=i+12|0;i=i+7&-8;G=F;H=i;i=i+12|0;i=i+7&-8;I=H;J=i;i=i+12|0;i=i+7&-8;K=J;L=i;i=i+12|0;i=i+7&-8;M=L;N=i;i=i+4|0;i=i+7&-8;O=i;i=i+4|0;i=i+7&-8;P=i;i=i+12|0;i=i+7&-8;Q=e;R=d[Q]|0;if((R&1|0)==0){S=R>>>1}else{S=c[e+4>>2]|0}if((S|0)==0){ck(2408,2592,71,3136);return 0}S=f;R=d[S]|0;if((R&1|0)==0){T=R>>>1}else{T=c[f+4>>2]|0}if((T|0)==0){ck(2408,2592,71,3136);return 0}T=e+1|0;R=e+8|0;U=f+1|0;V=f+8|0;W=0;while(1){if((W|0)>=2){break}X=a5(c[3664+(W<<2)>>2]|0)|0;c[r+(W<<2)>>2]=X;do{if((W|0)==0){if((a[Q]&1)==0){Y=T;break}Y=c[R>>2]|0}else{if((a[S]&1)==0){Y=U;break}Y=c[V>>2]|0}}while(0);c[s>>2]=Y;bN(X|0,1,s|0,0);aV(X|0);c[t>>2]=0;bH(X|0,35713,t|0);if((c[t>>2]|0)==0){Z=578;break}else{W=W+1|0}}if((Z|0)==578){c[v>>2]=0;W=u|0;cn(X|0,1024,v|0,W|0);v=dp(15800,2208)|0;fB(l,v+(c[(c[v>>2]|0)-12>>2]|0)|0);X=j7(l,15704)|0;u=cT[c[(c[X>>2]|0)+28>>2]&63](X,10)|0;j5(l);gp(v,u)|0;f8(v)|0;u=dp(v,W)|0;fB(k,u+(c[(c[u>>2]|0)-12>>2]|0)|0);W=j7(k,15704)|0;v=cT[c[(c[W>>2]|0)+28>>2]&63](W,10)|0;j5(k);gp(u,v)|0;f8(u)|0;ck(2960,2592,86,3136);return 0}u=w|0;c[u>>2]=0;v=w+4|0;c[v>>2]=0;k=w+8|0;c[k>>2]=0;W=x|0;c[W>>2]=0;l=x+4|0;c[l>>2]=0;X=x+8|0;c[X>>2]=0;t=y;s=y+64|0;Y=y|0;V=y+8|0;U=V|0;S=y+12|0;R=y;T=y+64|0;Q=y+4|0;_=S;$=y+8|0;aa=S|0;ab=y+16|0;ac=y+20|0;ad=y+60|0;ae=V;af=n|0;ag=n+4|0;ah=V;ai=V;V=y;aj=z+1|0;ak=D+1|0;al=F+1|0;am=B+8|0;an=D+8|0;ao=D+4|0;ap=F+8|0;aq=F|0;ar=F+4|0;F=J+1|0;as=L+1|0;at=H+8|0;au=J+8|0;av=J+4|0;aw=L+8|0;ax=L|0;ay=L+4|0;L=z+8|0;az=z+4|0;aA=y+12|0;aB=y+44|0;aC=y+64|0;aD=y+52|0;aE=o+8|0;aF=p+8|0;aG=y+44|0;aH=0;L627:while(1){c[U>>2]=5440;c[Y>>2]=11740;c[T>>2]=11760;c[Q>>2]=0;fC(y+64|0,_);c[y+136>>2]=0;c[y+140>>2]=-1;c[Y>>2]=5420;c[s>>2]=5460;c[U>>2]=5440;c[aa>>2]=5744;j3(ab);mF(ac|0,0,24)|0;c[aa>>2]=5600;aI=aG;mF(aI|0,0,16)|0;c[ad>>2]=24;mF(q|0,0,12)|0;ek(S,p);if((a[q]&1)!=0){mw(c[aF>>2]|0)}if((aH|0)==0){dC(ae,e)|0}else{dC(ae,f)|0}a[af]=0;c[ag>>2]=ae;aI=c[(c[ah>>2]|0)-12>>2]|0;do{if((c[ai+(aI+16)>>2]|0)==0){aJ=c[ai+(aI+72)>>2]|0;if((aJ|0)!=0){f8(aJ)|0}a[af]=1;aJ=c[ai+((c[(c[ah>>2]|0)-12>>2]|0)+24)>>2]|0;aK=aJ;aL=c[(c[aJ>>2]|0)+20>>2]|0;aJ=m;mF(aJ|0,0,16)|0;c4[aL&31](o,aK,m,16);if(!((c[aE>>2]|0)==(-1|0)&(c[aE+4>>2]|0)==(-1|0))){break}aK=c[(c[ah>>2]|0)-12>>2]|0;fz(ai+aK|0,c[ai+(aK+16)>>2]|4)}}while(0);gm(n);mF(A|0,0,12)|0;dX(V,z)|0;while(1){aI=a[A]|0;aK=aI&255;aL=(aK&1|0)==0;aJ=aL?aK>>>1:c[az>>2]|0;aM=(aI&1)==0;aI=aJ>>>0>4>>>0;if((mI((aM?aj:c[L>>2]|0)|0,2136,(aI?4:aJ)|0)|0)==0){if(aJ>>>0>3>>>0&(aI^1)){break}}if((c[t+((c[(c[R>>2]|0)-12>>2]|0)+16)>>2]&2|0)!=0){break}aI=aL?aK>>>1:c[az>>2]|0;aJ=aI>>>0>7>>>0;do{if((mI((aM?aj:c[L>>2]|0)|0,2088,(aJ?7:aI)|0)|0)==0){if(!(aI>>>0>6>>>0&(aJ^1))){Z=668;break}mF(C|0,0,12)|0;mF(E|0,0,12)|0;aN=dX(V,B)|0;dX(aN,D)|0;aN=a[E]|0;aO=aN&255;aP=(aO&1|0)==0;aQ=aP?aO>>>1:c[ao>>2]|0;L657:do{if((aQ|0)==0){aR=-1}else{aS=(aN&1)==0?ak:c[an>>2]|0;aT=aS+aQ|0;aU=aS;L659:while(1){aW=2064;while(1){if((aW|0)==2067){break}if((a[aU]|0)==(a[aW]|0)){break L659}else{aW=aW+1|0}}aW=aU+1|0;if((aW|0)==(aT|0)){aR=-1;break L657}else{aU=aW}}if((aU|0)==(aT|0)){aR=-1;break}aR=aU-aS|0}}while(0);aQ=aP?aO>>>1:c[ao>>2]|0;aW=(aN&1)==0;aX=aW?ak:c[an>>2]|0;aY=aQ>>>0<aR>>>0?aQ:aR;if(aY>>>0>4294967279>>>0){Z=630;break L627}if(aY>>>0<11>>>0){a[G]=aY<<1&255;aZ=al}else{aQ=aY+16&-16;a_=mu(aQ)|0;c[ap>>2]=a_;c[aq>>2]=aQ|1;c[ar>>2]=aY;aZ=a_}mE(aZ|0,aX|0,aY)|0;a[aZ+aY|0]=0;if(aW){a[ak]=0;a[E]=0}else{a[c[an>>2]|0]=0;c[ao>>2]=0}fl(D,0);c[E>>2]=c[G>>2];c[E+4>>2]=c[G+4>>2];c[E+8>>2]=c[G+8>>2];mF(G|0,0,12)|0;aW=c[l>>2]|0;if((aW|0)==(c[X>>2]|0)){d7(x,D)}else{do{if((aW|0)!=0){if((a[E]&1)==0){aY=aW;c[aY>>2]=c[E>>2];c[aY+4>>2]=c[E+4>>2];c[aY+8>>2]=c[E+8>>2];break}aY=c[an>>2]|0;aX=c[ao>>2]|0;if(aX>>>0>4294967279>>>0){Z=646;break L627}if(aX>>>0<11>>>0){a[aW]=aX<<1&255;a$=aW+1|0}else{a_=aX+16&-16;aQ=mu(a_)|0;c[aW+8>>2]=aQ;c[aW>>2]=a_|1;c[aW+4>>2]=aX;a$=aQ}mE(a$|0,aY|0,aX)|0;a[a$+aX|0]=0}}while(0);c[l>>2]=(c[l>>2]|0)+12}if((a[E]&1)!=0){mw(c[an>>2]|0)}if((a[C]&1)==0){break}mw(c[am>>2]|0)}else{Z=668}}while(0);do{if((Z|0)==668){Z=0;aJ=aL?aK>>>1:c[az>>2]|0;aI=aJ>>>0>9>>>0;if((mI((aM?aj:c[L>>2]|0)|0,2024,(aI?9:aJ)|0)|0)!=0){break}if(!(aJ>>>0>8>>>0&(aI^1))){break}mF(I|0,0,12)|0;mF(K|0,0,12)|0;aI=dX(V,H)|0;dX(aI,J)|0;aI=a[K]|0;aJ=aI&255;aW=(aJ&1|0)==0;aN=aW?aJ>>>1:c[av>>2]|0;L705:do{if((aN|0)==0){a0=-1}else{aO=(aI&1)==0?F:c[au>>2]|0;aP=aO+aN|0;aX=aO;L707:while(1){aY=2064;while(1){if((aY|0)==2067){break}if((a[aX]|0)==(a[aY]|0)){break L707}else{aY=aY+1|0}}aY=aX+1|0;if((aY|0)==(aP|0)){a0=-1;break L705}else{aX=aY}}if((aX|0)==(aP|0)){a0=-1;break}a0=aX-aO|0}}while(0);aN=aW?aJ>>>1:c[av>>2]|0;aS=(aI&1)==0;aU=aS?F:c[au>>2]|0;aT=aN>>>0<a0>>>0?aN:a0;if(aT>>>0>4294967279>>>0){Z=681;break L627}if(aT>>>0<11>>>0){a[M]=aT<<1&255;a1=as}else{aN=aT+16&-16;aY=mu(aN)|0;c[aw>>2]=aY;c[ax>>2]=aN|1;c[ay>>2]=aT;a1=aY}mE(a1|0,aU|0,aT)|0;a[a1+aT|0]=0;if(aS){a[F]=0;a[K]=0}else{a[c[au>>2]|0]=0;c[av>>2]=0}fl(J,0);c[K>>2]=c[M>>2];c[K+4>>2]=c[M+4>>2];c[K+8>>2]=c[M+8>>2];mF(M|0,0,12)|0;aS=c[v>>2]|0;if((aS|0)==(c[k>>2]|0)){d7(w,J)}else{do{if((aS|0)!=0){if((a[K]&1)==0){aT=aS;c[aT>>2]=c[K>>2];c[aT+4>>2]=c[K+4>>2];c[aT+8>>2]=c[K+8>>2];break}aT=c[au>>2]|0;aU=c[av>>2]|0;if(aU>>>0>4294967279>>>0){Z=697;break L627}if(aU>>>0<11>>>0){a[aS]=aU<<1&255;a2=aS+1|0}else{aY=aU+16&-16;aN=mu(aY)|0;c[aS+8>>2]=aN;c[aS>>2]=aY|1;c[aS+4>>2]=aU;a2=aN}mE(a2|0,aT|0,aU)|0;a[a2+aU|0]=0}}while(0);c[v>>2]=(c[v>>2]|0)+12}if((a[K]&1)!=0){mw(c[au>>2]|0)}if((a[I]&1)==0){break}mw(c[at>>2]|0)}}while(0);dX(V,z)|0}if(!aM){mw(c[L>>2]|0)}c[Y>>2]=5420;c[T>>2]=5460;c[$>>2]=5440;c[aA>>2]=5600;if((a[aB]&1)!=0){mw(c[aD>>2]|0)}c[aA>>2]=5744;j5(ab);fA(aC);aK=aH+1|0;if((aK|0)<2){aH=aK}else{Z=727;break}}if((Z|0)==630){fd(0);return 0}else if((Z|0)==646){fd(0);return 0}else if((Z|0)==681){fd(0);return 0}else if((Z|0)==697){fd(0);return 0}else if((Z|0)==727){aH=mu(24)|0;aC=aH;ab=aH+4|0;aA=aH+20|0;mF(ab|0,0,16)|0;g[aA>>2]=1.0;c[N>>2]=aC;aA=cz()|0;ab=aH;c[ab>>2]=aA;bt(aA|0,c[r>>2]|0);bt(c[ab>>2]|0,c[r+4>>2]|0);r=c[u>>2]|0;aA=c[ab>>2]|0;if((c[v>>2]|0)==(r|0)){a3=aA}else{aD=0;aB=r;r=aA;while(1){aA=aB+(aD*12|0)|0;if((a[aA]&1)==0){a4=aA+1|0}else{a4=c[aB+(aD*12|0)+8>>2]|0}bA(r|0,aD|0,a4|0);aA=aD+1|0;$=c[u>>2]|0;T=c[ab>>2]|0;if(aA>>>0<(((c[v>>2]|0)-$|0)/12|0)>>>0){aD=aA;aB=$;r=T}else{a3=T;break}}}a9(a3|0);c[O>>2]=0;bc(c[ab>>2]|0,35714,O|0);if((c[O>>2]|0)==0){ck(2008,2592,130,3136);return 0}O=c[W>>2]|0;a3=c[l>>2]|0;L784:do{if((O|0)!=(a3|0)){r=P;aB=P+1|0;aD=P+8|0;a4=P|0;T=P+4|0;$=O;while(1){aA=$;if((a[aA]&1)==0){c[r>>2]=c[aA>>2];c[r+4>>2]=c[aA+4>>2];c[r+8>>2]=c[aA+8>>2];a6=a[r]|0}else{aA=c[$+8>>2]|0;Y=c[$+4>>2]|0;if(Y>>>0>4294967279>>>0){Z=747;break}if(Y>>>0<11>>>0){L=Y<<1&255;a[r]=L;a7=aB;a8=L}else{L=Y+16&-16;aM=mu(L)|0;c[aD>>2]=aM;z=L|1;c[a4>>2]=z;c[T>>2]=Y;a7=aM;a8=z&255}mE(a7|0,aA|0,Y)|0;a[a7+Y|0]=0;a6=a8}Y=bi(c[ab>>2]|0,((a6&1)==0?aB:c[aD>>2]|0)|0)|0;aA=aH+4|0;c[(dZ(aA,P)|0)>>2]=Y;if((c[(dZ(aA,P)|0)>>2]|0)==-1){break}if((a[r]&1)!=0){mw(c[aD>>2]|0)}$=$+12|0;if(($|0)==(a3|0)){break L784}}if((Z|0)==747){fd(0);return 0}$=dp(dC(dp(15800,1960)|0,P)|0,1896)|0;fB(j,$+(c[(c[$>>2]|0)-12>>2]|0)|0);aD=j7(j,15704)|0;r=cT[c[(c[aD>>2]|0)+28>>2]&63](aD,10)|0;j5(j);gp($,r)|0;f8($)|0;ck(2960,2592,135,3136);return 0}}while(0);j=b+12|0;P=b+16|0;Z=c[P>>2]|0;if((Z|0)==(c[b+20>>2]|0)){d3(j,N);ba=c[P>>2]|0}else{if((Z|0)==0){bb=0}else{c[Z>>2]=aC;bb=c[P>>2]|0}aC=bb+4|0;c[P>>2]=aC;ba=aC}aC=(ba-(c[j>>2]|0)>>2)-1|0;j=c[W>>2]|0;if((j|0)!=0){ba=c[l>>2]|0;if((j|0)==(ba|0)){bd=j}else{P=ba;while(1){ba=P-12|0;c[l>>2]=ba;if((a[ba]&1)==0){be=ba}else{mw(c[P-12+8>>2]|0);be=c[l>>2]|0}if((j|0)==(be|0)){break}else{P=be}}bd=c[W>>2]|0}mw(bd)}bd=c[u>>2]|0;if((bd|0)==0){i=h;return aC|0}W=c[v>>2]|0;if((bd|0)==(W|0)){bf=bd}else{be=W;while(1){W=be-12|0;c[v>>2]=W;if((a[W]&1)==0){bg=W}else{mw(c[be-12+8>>2]|0);bg=c[v>>2]|0}if((bd|0)==(bg|0)){break}else{be=bg}}bf=c[u>>2]|0}mw(bf);i=h;return aC|0}return 0}function dX(d,e){d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0;f=i;i=i+16|0;g=f|0;h=f+8|0;f7(g,d,0);if((a[g|0]&1)==0){g=c[(c[d>>2]|0)-12>>2]|0;j=d;fz(j+g|0,c[j+(g+16)>>2]|4);i=f;return d|0}g=e;if((a[g]&1)==0){a[e+1|0]=0;a[g]=0}else{a[c[e+8>>2]|0]=0;c[e+4>>2]=0}j=d;k=c[(c[j>>2]|0)-12>>2]|0;l=d;m=c[l+(k+12)>>2]|0;n=(m|0)<1?2147483647:m;fB(h,l+k|0);k=j7(h,15704)|0;j5(h);L862:do{if((n|0)>0){h=e+1|0;m=e+8|0;o=e+4|0;p=e|0;q=k+8|0;r=0;while(1){s=c[l+((c[(c[j>>2]|0)-12>>2]|0)+24)>>2]|0;t=c[s+12>>2]|0;if((t|0)==(c[s+16>>2]|0)){u=cW[c[(c[s>>2]|0)+36>>2]&255](s)|0;if((u|0)==-1){v=2;w=r;break L862}else{x=u&255}}else{x=a[t]|0}t=x<<24>>24;if((b4(t|0)|0)!=0){if((b[(c[q>>2]|0)+(t<<1)>>1]&8192)!=0){v=0;w=r;break L862}}t=a[g]|0;if((t&1)==0){y=(t&255)>>>1;z=10}else{y=c[o>>2]|0;z=(c[p>>2]&-2)-1|0}if((y|0)==(z|0)){fp(e,z,1,z,z,0,0);A=a[g]|0}else{A=t}if((A&1)==0){a[g]=(y<<1)+2&255;B=h;C=y+1|0}else{t=c[m>>2]|0;u=y+1|0;c[o>>2]=u;B=t;C=u}a[B+y|0]=x;a[B+C|0]=0;u=r+1|0;t=c[l+((c[(c[j>>2]|0)-12>>2]|0)+24)>>2]|0;s=t+12|0;D=c[s>>2]|0;if((D|0)==(c[t+16>>2]|0)){E=t;F=c[(c[t>>2]|0)+40>>2]|0;cW[F&255](E)|0}else{c[s>>2]=D+1}if((u|0)<(n|0)){r=u}else{v=0;w=u;break}}}else{v=0;w=0}}while(0);c[l+((c[(c[j>>2]|0)-12>>2]|0)+12)>>2]=0;n=c[(c[j>>2]|0)-12>>2]|0;fz(l+n|0,c[l+(n+16)>>2]|((w|0)==0?v|4:v));i=f;return d|0}function dY(b){b=b|0;var d=0;c[b>>2]=5420;c[b+64>>2]=5460;c[b+8>>2]=5440;d=b+12|0;c[d>>2]=5600;if((a[b+44|0]&1)!=0){mw(c[b+52>>2]|0)}c[d>>2]=5744;j5(b+16|0);fA(b+64|0);return}function dZ(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;e=i;i=i+16|0;f=e|0;g=e+8|0;h=b|0;d2(f,h,d);b=c[f>>2]|0;if((b|0)!=0){j=b;k=j+20|0;i=e;return k|0}b=mu(24)|0;f=b;l=b+8|0;do{if((l|0)!=0){m=d;if((a[m]&1)==0){c[l>>2]=c[m>>2];c[l+4>>2]=c[m+4>>2];c[l+8>>2]=c[m+8>>2];break}m=c[d+8>>2]|0;n=c[d+4>>2]|0;if(n>>>0>4294967279>>>0){fd(0);return 0}if(n>>>0<11>>>0){a[l]=n<<1&255;o=b+9|0}else{p=n+16&-16;q=mu(p)|0;c[b+16>>2]=q;c[l>>2]=p|1;c[b+12>>2]=n;o=q}mE(o|0,m|0,n)|0;a[o+n|0]=0}}while(0);o=b+20|0;if((o|0)!=0){c[o>>2]=0}d4(g,h,f);j=c[g>>2]|0;k=j+20|0;i=e;return k|0}function d_(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;i=i+40|0;g=f|0;h=f+8|0;j=f+24|0;k=dC(dp(dC(dp(15800,1832)|0,d)|0,1800)|0,e)|0;fB(g,k+(c[(c[k>>2]|0)-12>>2]|0)|0);l=j7(g,15704)|0;m=cT[c[(c[l>>2]|0)+28>>2]&63](l,10)|0;j5(g);gp(k,m)|0;f8(k)|0;dB(h,d);dB(j,e);e=dW(b,h,j)|0;if((a[j]&1)!=0){mw(c[j+8>>2]|0)}if((a[h]&1)==0){i=f;return e|0}mw(c[h+8>>2]|0);i=f;return e|0}function d$(a,b){a=a|0;b=b|0;var d=0;if((b|0)<=-1){ck(1736,2592,153,3120)}d=c[a+12>>2]|0;if((c[a+16>>2]|0)-d>>2>>>0>b>>>0){bL(c[c[d+(b<<2)>>2]>>2]|0);c[a+36>>2]=b;return}else{ck(1736,2592,153,3120)}}function d0(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;e=i;i=i+8|0;f=e|0;g=(c[(c[a+12>>2]|0)+(c[a+36>>2]<<2)>>2]|0)+4|0;d2(f,g|0,b);if((c[f>>2]|0)==0){ck(1680,2592,161,3176)}else{a6(c[(dZ(g,b)|0)>>2]|0,d|0);i=e;return}}function d1(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=i;i=i+8|0;g=f|0;h=(c[(c[a+12>>2]|0)+(c[a+36>>2]<<2)>>2]|0)+4|0;d2(g,h|0,b);if((c[g>>2]|0)==0){ck(1680,2592,196,3160)}else{aU(c[(dZ(h,b)|0)>>2]|0,d|0,e|0);i=f;return}}function d2(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0;g=f;h=a[f]|0;i=(h&1)==0;if(i){j=g+1|0}else{j=c[f+8>>2]|0}k=h&255;h=(k&1|0)==0;if(h){l=k>>>1}else{l=c[f+4>>2]|0}if(l>>>0>3>>>0){m=l;n=j;o=l;while(1){p=n;q=ag(d[p]|d[p+1|0]<<8|d[p+2|0]<<16|d[p+3|0]<<24|0,1540483477)|0;p=(ag(q>>>24^q,1540483477)|0)^(ag(m,1540483477)|0);q=n+4|0;r=o-4|0;if(r>>>0>3>>>0){m=p;n=q;o=r}else{s=p;t=q;u=r;break}}}else{s=l;t=j;u=l}if((u|0)==3){v=d[t+2|0]<<16^s;w=929}else if((u|0)==2){v=s;w=929}else if((u|0)==1){x=s;w=930}else{y=s}if((w|0)==929){x=d[t+1|0]<<8^v;w=930}if((w|0)==930){y=ag(d[t]^x,1540483477)|0}x=ag(y>>>13^y,1540483477)|0;y=x>>>15^x;x=c[e+4>>2]|0;L968:do{if((x|0)!=0){t=x-1|0;w=(t&x|0)!=0;if(w){z=(y>>>0)%(x>>>0)|0}else{z=y&t}v=c[(c[e>>2]|0)+(z<<2)>>2]|0;if((v|0)==0){break}s=c[v>>2]|0;if((s|0)==0){break}v=g+1|0;u=f+8|0;l=f+4|0;L976:do{if(w){j=s;while(1){if((((c[j+4>>2]|0)>>>0)%(x>>>0)|0|0)!=(z|0)){break L968}o=j+8|0;n=o;m=a[o]|0;o=m&255;if((o&1|0)==0){A=o>>>1}else{A=c[j+12>>2]|0}if(h){B=k>>>1}else{B=c[l>>2]|0}L988:do{if((A|0)==(B|0)){o=(m&1)==0;if(o){C=n+1|0}else{C=c[j+16>>2]|0}if(i){D=v}else{D=c[u>>2]|0}if(!o){if((mI(C|0,D|0,A|0)|0)==0){E=j;break L976}else{break}}if((A|0)==0){E=j;break L976}else{F=D;G=C;H=A}while(1){if((a[G]|0)!=(a[F]|0)){break L988}o=H-1|0;if((o|0)==0){E=j;break L976}else{F=F+1|0;G=G+1|0;H=o}}}}while(0);j=c[j>>2]|0;if((j|0)==0){break L968}}}else{j=s;while(1){if((c[j+4>>2]&t|0)!=(z|0)){break L968}n=j+8|0;m=n;o=a[n]|0;n=o&255;if((n&1|0)==0){I=n>>>1}else{I=c[j+12>>2]|0}if(h){J=k>>>1}else{J=c[l>>2]|0}L1015:do{if((I|0)==(J|0)){n=(o&1)==0;if(n){K=m+1|0}else{K=c[j+16>>2]|0}if(i){L=v}else{L=c[u>>2]|0}if(!n){if((mI(K|0,L|0,I|0)|0)==0){E=j;break L976}else{break}}if((I|0)==0){E=j;break L976}else{M=L;N=K;O=I}while(1){if((a[N]|0)!=(a[M]|0)){break L1015}n=O-1|0;if((n|0)==0){E=j;break L976}else{M=M+1|0;N=N+1|0;O=n}}}}while(0);j=c[j>>2]|0;if((j|0)==0){break L968}}}}while(0);c[b>>2]=E;return}}while(0);c[b>>2]=0;return}function d3(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;d=a+4|0;e=a|0;f=c[e>>2]|0;g=f;h=(c[d>>2]|0)-g|0;i=h>>2;j=i+1|0;if(j>>>0>1073741823>>>0){jZ(0)}k=a+8|0;a=(c[k>>2]|0)-g|0;if(a>>2>>>0>536870910>>>0){l=1073741823;m=985}else{g=a>>1;a=g>>>0<j>>>0?j:g;if((a|0)==0){n=0;o=0}else{l=a;m=985}}if((m|0)==985){n=mu(l<<2)|0;o=l}l=n+(i<<2)|0;i=n+(o<<2)|0;if((l|0)!=0){c[l>>2]=c[b>>2]}b=n+(j<<2)|0;j=n;l=f;mE(j|0,l|0,h)|0;c[e>>2]=n;c[d>>2]=b;c[k>>2]=i;if((f|0)==0){return}mw(l);return}function d4(b,e,f){b=b|0;e=e|0;f=f|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0.0,P=0.0,Q=0,R=0,S=0,T=0;h=f+8|0;i=h;j=a[h]|0;h=(j&1)==0;if(h){k=i+1|0}else{k=c[f+16>>2]|0}l=j&255;j=(l&1|0)==0;if(j){m=l>>>1}else{m=c[f+12>>2]|0}if(m>>>0>3>>>0){n=m;o=k;p=m;while(1){q=o;r=ag(d[q]|d[q+1|0]<<8|d[q+2|0]<<16|d[q+3|0]<<24|0,1540483477)|0;q=(ag(r>>>24^r,1540483477)|0)^(ag(n,1540483477)|0);r=o+4|0;s=p-4|0;if(s>>>0>3>>>0){n=q;o=r;p=s}else{t=q;u=r;v=s;break}}}else{t=m;u=k;v=m}if((v|0)==3){w=d[u+2|0]<<16^t;x=1003}else if((v|0)==2){w=t;x=1003}else if((v|0)==1){y=t;x=1004}else{z=t}if((x|0)==1003){y=d[u+1|0]<<8^w;x=1004}if((x|0)==1004){z=ag(d[u]^y,1540483477)|0}y=ag(z>>>13^z,1540483477)|0;z=y>>>15^y;y=f+4|0;c[y>>2]=z;u=e+4|0;w=c[u>>2]|0;t=(w|0)==0;L1071:do{if(t){A=0}else{v=w-1|0;m=(v&w|0)!=0;if(m){B=(z>>>0)%(w>>>0)|0}else{B=z&v}k=c[(c[e>>2]|0)+(B<<2)>>2]|0;if((k|0)==0){A=B;break}p=c[k>>2]|0;if((p|0)==0){A=B;break}k=i+1|0;o=f+16|0;n=f+12|0;s=p;L1079:while(1){p=c[s+4>>2]|0;if(m){C=(p>>>0)%(w>>>0)|0}else{C=p&v}if((C|0)!=(B|0)){A=B;break L1071}p=s+8|0;r=p;q=a[p]|0;p=q&255;if((p&1|0)==0){D=p>>>1}else{D=c[s+12>>2]|0}if(j){E=l>>>1}else{E=c[n>>2]|0}L1094:do{if((D|0)==(E|0)){p=(q&1)==0;if(p){F=r+1|0}else{F=c[s+16>>2]|0}if(h){G=k}else{G=c[o>>2]|0}if(!p){if((mI(F|0,G|0,D|0)|0)==0){H=s;I=0;x=1050;break L1079}else{break}}if((D|0)==0){H=s;I=0;x=1049;break L1079}else{J=G;K=F;L=D}while(1){if((a[K]|0)!=(a[J]|0)){break L1094}p=L-1|0;if((p|0)==0){H=s;I=0;x=1051;break L1079}else{J=J+1|0;K=K+1|0;L=p}}}}while(0);r=c[s>>2]|0;if((r|0)==0){A=B;break L1071}else{s=r}}if((x|0)==1049){M=b|0;c[M>>2]=H;N=b+4|0;a[N]=I;return}else if((x|0)==1050){M=b|0;c[M>>2]=H;N=b+4|0;a[N]=I;return}else if((x|0)==1051){M=b|0;c[M>>2]=H;N=b+4|0;a[N]=I;return}}}while(0);x=e+12|0;O=+(((c[x>>2]|0)+1|0)>>>0>>>0);P=+g[e+16>>2];do{if(O>+(w>>>0>>>0)*P|t){if(w>>>0>2>>>0){Q=(w-1&w|0)!=0|0}else{Q=1}B=Q|w<<1;L=~~+af(O/P);d5(e,B>>>0<L>>>0?L:B);B=c[u>>2]|0;L=c[y>>2]|0;K=B-1|0;if((K&B|0)==0){R=L&K;S=B;break}else{R=(L>>>0)%(B>>>0)|0;S=B;break}}else{R=A;S=w}}while(0);w=e|0;A=c[(c[w>>2]|0)+(R<<2)>>2]|0;do{if((A|0)==0){y=e+8|0;u=y|0;Q=f|0;c[Q>>2]=c[u>>2];c[u>>2]=f;c[(c[w>>2]|0)+(R<<2)>>2]=y;y=c[Q>>2]|0;if((y|0)==0){break}Q=c[y+4>>2]|0;y=S-1|0;if((y&S|0)==0){T=Q&y}else{T=(Q>>>0)%(S>>>0)|0}c[(c[w>>2]|0)+(T<<2)>>2]=f}else{Q=A|0;c[f>>2]=c[Q>>2];c[Q>>2]=f}}while(0);c[x>>2]=(c[x>>2]|0)+1;H=f;I=1;M=b|0;c[M>>2]=H;N=b+4|0;a[N]=I;return}function d5(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;do{if((b|0)==1){d=2}else{if((b-1&b|0)==0){d=b;break}d=fb(b)|0}}while(0);b=c[a+4>>2]|0;if(d>>>0>b>>>0){d6(a,d);return}if(d>>>0>=b>>>0){return}do{if(b>>>0>2>>>0){if((b-1&b|0)!=0){e=1062;break}f=1<<32-(mJ(~~+af(+((c[a+12>>2]|0)>>>0>>>0)/+g[a+16>>2])-1|0)|0)}else{e=1062}}while(0);if((e|0)==1062){f=fb(~~+af(+((c[a+12>>2]|0)>>>0>>>0)/+g[a+16>>2]))|0}e=d>>>0<f>>>0?f:d;if(e>>>0>=b>>>0){return}d6(a,e);return}function d6(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0;e=(d|0)!=0;if(e){f=mu(d<<2)|0}else{f=0}g=b|0;h=c[g>>2]|0;c[g>>2]=f;if((h|0)!=0){mw(h)}c[b+4>>2]=d;if(e){i=0}else{return}do{c[(c[g>>2]|0)+(i<<2)>>2]=0;i=i+1|0;}while(i>>>0<d>>>0);i=b+8|0;b=c[i>>2]|0;if((b|0)==0){return}e=c[b+4>>2]|0;h=d-1|0;f=(h&d|0)!=0;if(f){j=(e>>>0)%(d>>>0)|0}else{j=e&h}c[(c[g>>2]|0)+(j<<2)>>2]=i;i=b|0;e=c[i>>2]|0;if((e|0)==0){return}else{k=b;l=j;m=i;n=e}L1177:while(1){e=k;i=m;j=n;L1179:while(1){o=j;while(1){b=c[o+4>>2]|0;if(f){p=(b>>>0)%(d>>>0)|0}else{p=b&h}if((p|0)==(l|0)){break}q=(c[g>>2]|0)+(p<<2)|0;if((c[q>>2]|0)==0){break L1179}b=o|0;r=c[b>>2]|0;L1189:do{if((r|0)==0){s=b;t=0}else{u=o+8|0;v=a[u]|0;w=v&255;x=(w&1|0)==0;y=w>>>1;w=u+1|0;u=o+16|0;z=o+12|0;A=b;B=r;while(1){if(x){C=y}else{C=c[z>>2]|0}D=B+8|0;E=a[D]|0;F=E&255;if((F&1|0)==0){G=F>>>1}else{G=c[B+12>>2]|0}if((C|0)!=(G|0)){s=A;t=B;break L1189}F=(v&1)==0;if(F){H=w}else{H=c[u>>2]|0}if((E&1)==0){I=D+1|0}else{I=c[B+16>>2]|0}do{if(F){if((C|0)==0){break}else{J=I;K=H;L=C}while(1){if((a[K]|0)!=(a[J]|0)){s=A;t=B;break L1189}D=L-1|0;if((D|0)==0){break}else{J=J+1|0;K=K+1|0;L=D}}}else{if((mI(H|0,I|0,C|0)|0)!=0){s=A;t=B;break L1189}}}while(0);F=B|0;D=c[F>>2]|0;if((D|0)==0){s=F;t=0;break}else{A=F;B=D}}}}while(0);c[i>>2]=t;c[s>>2]=c[c[(c[g>>2]|0)+(p<<2)>>2]>>2];c[c[(c[g>>2]|0)+(p<<2)>>2]>>2]=o;r=c[i>>2]|0;if((r|0)==0){M=1116;break L1177}else{o=r}}r=o|0;b=c[r>>2]|0;if((b|0)==0){M=1114;break L1177}else{e=o;i=r;j=b}}c[q>>2]=e;j=o|0;i=c[j>>2]|0;if((i|0)==0){M=1115;break}else{k=o;l=p;m=j;n=i}}if((M|0)==1114){return}else if((M|0)==1115){return}else if((M|0)==1116){return}}function d7(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;e=b+4|0;f=c[e>>2]|0;g=b|0;h=c[g>>2]|0;i=h;j=(f-i|0)/12|0;k=j+1|0;if(k>>>0>357913941>>>0){jZ(0)}l=b+8|0;b=((c[l>>2]|0)-i|0)/12|0;if(b>>>0>178956969>>>0){m=357913941;n=1121}else{o=b<<1;b=o>>>0<k>>>0?k:o;if((b|0)==0){p=0;q=0}else{m=b;n=1121}}if((n|0)==1121){p=mu(m*12|0)|0;q=m}m=p+(j*12|0)|0;n=p+(q*12|0)|0;do{if((m|0)==0){r=f}else{q=d;if((a[q]&1)==0){b=m;c[b>>2]=c[q>>2];c[b+4>>2]=c[q+4>>2];c[b+8>>2]=c[q+8>>2];r=f;break}q=c[d+8>>2]|0;b=c[d+4>>2]|0;if(b>>>0>4294967279>>>0){fd(0)}if(b>>>0<11>>>0){a[m]=b<<1&255;s=m+1|0}else{o=b+16&-16;t=mu(o)|0;c[p+(j*12|0)+8>>2]=t;c[m>>2]=o|1;c[p+(j*12|0)+4>>2]=b;s=t}mE(s|0,q|0,b)|0;a[s+b|0]=0;r=c[e>>2]|0}}while(0);s=p+(k*12|0)|0;do{if((r|0)==(h|0)){c[g>>2]=m;c[e>>2]=s;c[l>>2]=n;u=h}else{k=j-1-(((r-12+(-i|0)|0)>>>0)/12|0)|0;d=r;f=0;b=m;while(1){q=b-12|0;t=d-12|0;if((q|0)!=0){o=r+(~f*12|0)|0;v=q;w=t;c[v>>2]=c[w>>2];c[v+4>>2]=c[w+4>>2];c[v+8>>2]=c[w+8>>2];mF(o|0,0,12)|0}if((t|0)==(h|0)){break}else{d=t;f=f+1|0;b=q}}b=c[g>>2]|0;f=c[e>>2]|0;c[g>>2]=p+(k*12|0);c[e>>2]=s;c[l>>2]=n;if((b|0)==(f|0)){u=b;break}else{x=f}while(1){f=x-12|0;if((a[f]&1)!=0){mw(c[x-12+8>>2]|0)}if((b|0)==(f|0)){u=b;break}else{x=f}}}}while(0);if((u|0)==0){return}mw(u);return}function d8(b){b=b|0;var d=0;c[b>>2]=5420;c[b+64>>2]=5460;c[b+8>>2]=5440;d=b+12|0;c[d>>2]=5600;if((a[b+44|0]&1)!=0){mw(c[b+52>>2]|0)}c[d>>2]=5744;j5(b+16|0);fA(b+64|0);mw(b);return}function d9(b){b=b|0;var d=0,e=0;d=b-144+136|0;c[d>>2]=5420;b=d+64|0;c[b>>2]=5460;c[d+8>>2]=5440;e=d+12|0;c[e>>2]=5600;if((a[d+44|0]&1)!=0){mw(c[d+52>>2]|0)}c[e>>2]=5744;j5(d+16|0);fA(b);return}function ea(b){b=b|0;var d=0,e=0;d=b-144+136|0;c[d>>2]=5420;b=d+64|0;c[b>>2]=5460;c[d+8>>2]=5440;e=d+12|0;c[e>>2]=5600;if((a[d+44|0]&1)!=0){mw(c[d+52>>2]|0)}c[e>>2]=5744;j5(d+16|0);fA(b);mw(d);return}function eb(b){b=b|0;var d=0,e=0,f=0;d=b;e=c[(c[b>>2]|0)-12>>2]|0;c[d+e>>2]=5420;b=d+(e+64)|0;c[b>>2]=5460;c[d+(e+8)>>2]=5440;f=d+(e+12)|0;c[f>>2]=5600;if((a[d+(e+44)|0]&1)!=0){mw(c[d+(e+52)>>2]|0)}c[f>>2]=5744;j5(d+(e+16)|0);fA(b);return}function ec(b){b=b|0;var d=0,e=0,f=0,g=0;d=b;e=c[(c[b>>2]|0)-12>>2]|0;b=d+e|0;c[b>>2]=5420;f=d+(e+64)|0;c[f>>2]=5460;c[d+(e+8)>>2]=5440;g=d+(e+12)|0;c[g>>2]=5600;if((a[d+(e+44)|0]&1)!=0){mw(c[d+(e+52)>>2]|0)}c[g>>2]=5744;j5(d+(e+16)|0);fA(f);mw(b);return}function ed(b){b=b|0;var d=0;d=b|0;c[d>>2]=5600;if((a[b+32|0]&1)!=0){mw(c[b+40>>2]|0)}c[d>>2]=5744;j5(b+4|0);return}function ee(b){b=b|0;var d=0;d=b|0;c[d>>2]=5600;if((a[b+32|0]&1)!=0){mw(c[b+40>>2]|0)}c[d>>2]=5744;j5(b+4|0);mw(b);return}function ef(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;i=d+44|0;j=c[i>>2]|0;k=d+24|0;l=c[k>>2]|0;if(j>>>0<l>>>0){c[i>>2]=l;m=l}else{m=j}j=h&24;do{if((j|0)==0){i=b;c[i>>2]=0;c[i+4>>2]=0;i=b+8|0;c[i>>2]=-1;c[i+4>>2]=-1;return}else if((j|0)==24){if((g|0)==2){n=1182;break}else if((g|0)==0){o=0;p=0;break}else if((g|0)!=1){n=1186;break}i=b;c[i>>2]=0;c[i+4>>2]=0;i=b+8|0;c[i>>2]=-1;c[i+4>>2]=-1;return}else{if((g|0)==2){n=1182;break}else if((g|0)==0){o=0;p=0;break}else if((g|0)!=1){n=1186;break}if((h&8|0)==0){i=l-(c[d+20>>2]|0)|0;o=(i|0)<0|0?-1:0;p=i;break}else{i=(c[d+12>>2]|0)-(c[d+8>>2]|0)|0;o=(i|0)<0|0?-1:0;p=i;break}}}while(0);if((n|0)==1186){g=b;c[g>>2]=0;c[g+4>>2]=0;g=b+8|0;c[g>>2]=-1;c[g+4>>2]=-1;return}if((n|0)==1182){n=d+32|0;if((a[n]&1)==0){q=n+1|0}else{q=c[d+40>>2]|0}n=m-q|0;o=(n|0)<0|0?-1:0;p=n}n=mK(p,o,e,f)|0;f=K;e=0;do{if(!((f|0)<(e|0)|(f|0)==(e|0)&n>>>0<0>>>0)){o=d+32|0;if((a[o]&1)==0){r=o+1|0}else{r=c[d+40>>2]|0}o=m-r|0;p=(o|0)<0|0?-1:0;if((p|0)<(f|0)|(p|0)==(f|0)&o>>>0<n>>>0){break}o=h&8;do{if(!((n|0)==0&(f|0)==0)){do{if((o|0)!=0){if((c[d+12>>2]|0)!=0){break}p=b;c[p>>2]=0;c[p+4>>2]=0;p=b+8|0;c[p>>2]=-1;c[p+4>>2]=-1;return}}while(0);if(!((h&16|0)!=0&(l|0)==0)){break}p=b;c[p>>2]=0;c[p+4>>2]=0;p=b+8|0;c[p>>2]=-1;c[p+4>>2]=-1;return}}while(0);if((o|0)!=0){c[d+12>>2]=(c[d+8>>2]|0)+n;c[d+16>>2]=m}if((h&16|0)!=0){c[k>>2]=(c[d+20>>2]|0)+n}p=b;c[p>>2]=0;c[p+4>>2]=0;p=b+8|0;c[p>>2]=n;c[p+4>>2]=f;return}}while(0);f=b;c[f>>2]=0;c[f+4>>2]=0;f=b+8|0;c[f>>2]=-1;c[f+4>>2]=-1;return}function eg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=i;g=d;d=i;i=i+16|0;c[d>>2]=c[g>>2];c[d+4>>2]=c[g+4>>2];c[d+8>>2]=c[g+8>>2];c[d+12>>2]=c[g+12>>2];g=d+8|0;c1[c[(c[b>>2]|0)+16>>2]&63](a,b,c[g>>2]|0,c[g+4>>2]|0,0,e);i=f;return}function eh(a){a=a|0;var b=0,e=0,f=0,g=0,h=0,i=0;b=a+44|0;e=c[b>>2]|0;f=c[a+24>>2]|0;if(e>>>0<f>>>0){c[b>>2]=f;g=f}else{g=e}if((c[a+48>>2]&8|0)==0){h=-1;return h|0}e=a+16|0;f=c[e>>2]|0;b=c[a+12>>2]|0;if(f>>>0<g>>>0){c[e>>2]=g;i=g}else{i=f}if(b>>>0>=i>>>0){h=-1;return h|0}h=d[b]|0;return h|0}function ei(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0;e=b+44|0;f=c[e>>2]|0;g=c[b+24>>2]|0;if(f>>>0<g>>>0){c[e>>2]=g;h=g}else{h=f}f=b+8|0;g=c[f>>2]|0;e=b+12|0;i=c[e>>2]|0;if(g>>>0>=i>>>0){j=-1;return j|0}if((d|0)==-1){c[f>>2]=g;c[e>>2]=i-1;c[b+16>>2]=h;j=0;return j|0}k=i-1|0;do{if((c[b+48>>2]&16|0)==0){if((d<<24>>24|0)==(a[k]|0)){break}else{j=-1}return j|0}}while(0);c[f>>2]=g;c[e>>2]=k;c[b+16>>2]=h;a[k]=d&255;j=d;return j|0}function ej(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0;if((d|0)==-1){e=0;return e|0}f=b|0;g=b+12|0;h=b+8|0;i=(c[g>>2]|0)-(c[h>>2]|0)|0;j=b+24|0;k=c[j>>2]|0;l=b+28|0;m=c[l>>2]|0;if((k|0)==(m|0)){n=b+48|0;if((c[n>>2]&16|0)==0){e=-1;return e|0}o=b+20|0;p=c[o>>2]|0;q=k-p|0;r=b+44|0;s=(c[r>>2]|0)-p|0;p=b+32|0;t=p;u=p;v=a[u]|0;if((v&1)==0){w=(v&255)>>>1;x=10}else{w=c[b+36>>2]|0;x=(c[p>>2]&-2)-1|0}if((w|0)==(x|0)){fp(p,x,1,x,x,0,0);y=a[u]|0}else{y=v}if((y&1)==0){a[u]=(w<<1)+2&255;z=t+1|0;A=w+1|0}else{y=c[b+40>>2]|0;v=w+1|0;c[b+36>>2]=v;z=y;A=v}a[z+w|0]=0;a[z+A|0]=0;A=a[u]|0;if((A&1)==0){B=10;C=A}else{A=c[p>>2]|0;B=(A&-2)-1|0;C=A&255}A=C&255;if((A&1|0)==0){D=A>>>1}else{D=c[b+36>>2]|0}do{if(D>>>0<B>>>0){A=B-D|0;fk(p,A,0)|0}else{if((C&1)==0){a[t+1+B|0]=0;a[u]=B<<1&255;break}else{a[(c[b+40>>2]|0)+B|0]=0;c[b+36>>2]=B;break}}}while(0);B=a[u]|0;if((B&1)==0){E=t+1|0}else{E=c[b+40>>2]|0}t=B&255;if((t&1|0)==0){F=t>>>1}else{F=c[b+36>>2]|0}t=E+F|0;c[o>>2]=E;c[l>>2]=t;l=E+q|0;c[j>>2]=l;q=E+s|0;c[r>>2]=q;G=l;H=t;I=q;J=n}else{G=k;H=m;I=c[b+44>>2]|0;J=b+48|0}m=G+1|0;k=m>>>0<I>>>0?I:m;c[b+44>>2]=k;if((c[J>>2]&8|0)!=0){J=b+32|0;if((a[J]&1)==0){K=J+1|0}else{K=c[b+40>>2]|0}c[h>>2]=K;c[g>>2]=K+i;c[b+16>>2]=k}if((G|0)==(H|0)){e=cT[c[(c[b>>2]|0)+52>>2]&63](f,d&255)|0;return e|0}else{c[j>>2]=m;a[G]=d&255;e=d&255;return e|0}return 0}function ek(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;e=b+32|0;do{if((e|0)!=(d|0)){f=a[d]|0;if((f&1)==0){g=d+1|0}else{g=c[d+8>>2]|0}h=f&255;if((h&1|0)==0){i=h>>>1}else{i=c[d+4>>2]|0}h=e;f=e;j=a[f]|0;if((j&1)==0){k=10;l=j}else{j=c[e>>2]|0;k=(j&-2)-1|0;l=j&255}if(k>>>0<i>>>0){j=l&255;if((j&1|0)==0){m=j>>>1}else{m=c[b+36>>2]|0}fo(e,k,i-k|0,m,0,m,i,g);break}if((l&1)==0){n=h+1|0}else{n=c[b+40>>2]|0}mH(n|0,g|0,i|0)|0;a[n+i|0]=0;if((a[f]&1)==0){a[f]=i<<1&255;break}else{c[b+36>>2]=i;break}}}while(0);i=b+44|0;c[i>>2]=0;n=b+48|0;g=c[n>>2]|0;if((g&8|0)!=0){l=e;m=a[e]|0;k=(m&1)==0;if(k){o=l+1|0}else{o=c[b+40>>2]|0}d=m&255;if((d&1|0)==0){p=d>>>1}else{p=c[b+36>>2]|0}d=o+p|0;c[i>>2]=d;if(k){q=l+1|0;r=l+1|0}else{l=c[b+40>>2]|0;q=l;r=l}c[b+8>>2]=r;c[b+12>>2]=q;c[b+16>>2]=d}if((g&16|0)==0){return}g=e;d=e;q=a[d]|0;r=q&255;if((r&1|0)==0){s=r>>>1}else{s=c[b+36>>2]|0}if((q&1)==0){c[i>>2]=g+1+s;t=10;u=q}else{c[i>>2]=(c[b+40>>2]|0)+s;i=c[e>>2]|0;t=(i&-2)-1|0;u=i&255}i=u&255;if((i&1|0)==0){v=i>>>1}else{v=c[b+36>>2]|0}do{if(v>>>0<t>>>0){i=t-v|0;fk(e,i,0)|0}else{if((u&1)==0){a[g+1+t|0]=0;a[d]=t<<1&255;break}else{a[(c[b+40>>2]|0)+t|0]=0;c[b+36>>2]=t;break}}}while(0);t=a[d]|0;if((t&1)==0){w=g+1|0;x=g+1|0}else{g=c[b+40>>2]|0;w=g;x=g}g=t&255;if((g&1|0)==0){y=g>>>1}else{y=c[b+36>>2]|0}g=b+24|0;c[g>>2]=x;c[b+20>>2]=x;c[b+28>>2]=w+y;if((c[n>>2]&3|0)==0){return}c[g>>2]=x+s;return}function el(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0;b=i;i=i+32|0;d=b|0;e=b+8|0;f=b+16|0;g=b+24|0;h=c[o>>2]|0;eH(15072,h,15200);c[4016]=6012;c[4018]=6032;c[4017]=0;fC(16072,15072);c[4036]=0;c[4037]=-1;j=c[s>>2]|0;c[3744]=5744;j3(14980);mF(14984,0,24)|0;c[3744]=6232;c[3752]=j;j4(g,14980);k=j7(g,15400)|0;l=k;j5(g);c[3753]=l;c[3754]=15208;a[15020]=(cW[c[(c[k>>2]|0)+28>>2]&255](l)|0)&1;c[3950]=5916;c[3951]=5936;fC(15804,14976);c[3969]=0;c[3970]=-1;l=c[q>>2]|0;c[3756]=5744;j3(15028);mF(15032,0,24)|0;c[3756]=6232;c[3764]=l;j4(f,15028);k=j7(f,15400)|0;g=k;j5(f);c[3765]=g;c[3766]=15216;a[15068]=(cW[c[(c[k>>2]|0)+28>>2]&255](g)|0)&1;c[3994]=5916;c[3995]=5936;fC(15980,15024);c[4013]=0;c[4014]=-1;g=c[(c[(c[3994]|0)-12>>2]|0)+16e3>>2]|0;c[3972]=5916;c[3973]=5936;fC(15892,g);c[3991]=0;c[3992]=-1;c[(c[(c[4016]|0)-12>>2]|0)+16136>>2]=15800;g=(c[(c[3994]|0)-12>>2]|0)+15980|0;c[g>>2]=c[g>>2]|8192;c[(c[(c[3994]|0)-12>>2]|0)+16048>>2]=15800;et(14920,h,15224);c[3928]=5964;c[3930]=5984;c[3929]=0;fC(15720,14920);c[3948]=0;c[3949]=-1;c[3706]=5672;j3(14828);mF(14832,0,24)|0;c[3706]=6160;c[3714]=j;j4(e,14828);j=j7(e,15392)|0;h=j;j5(e);c[3715]=h;c[3716]=15232;a[14868]=(cW[c[(c[j>>2]|0)+28>>2]&255](h)|0)&1;c[3858]=5868;c[3859]=5888;fC(15436,14824);c[3877]=0;c[3878]=-1;c[3718]=5672;j3(14876);mF(14880,0,24)|0;c[3718]=6160;c[3726]=l;j4(d,14876);l=j7(d,15392)|0;h=l;j5(d);c[3727]=h;c[3728]=15240;a[14916]=(cW[c[(c[l>>2]|0)+28>>2]&255](h)|0)&1;c[3902]=5868;c[3903]=5888;fC(15612,14872);c[3921]=0;c[3922]=-1;h=c[(c[(c[3902]|0)-12>>2]|0)+15632>>2]|0;c[3880]=5868;c[3881]=5888;fC(15524,h);c[3899]=0;c[3900]=-1;c[(c[(c[3928]|0)-12>>2]|0)+15784>>2]=15432;h=(c[(c[3902]|0)-12>>2]|0)+15612|0;c[h>>2]=c[h>>2]|8192;c[(c[(c[3902]|0)-12>>2]|0)+15680>>2]=15432;i=b;return}function em(a){a=a|0;f8(15800)|0;f8(15888)|0;gh(15432)|0;gh(15520)|0;return}function en(a){a=a|0;c[a>>2]=5672;j5(a+4|0);return}function eo(a){a=a|0;c[a>>2]=5672;j5(a+4|0);mw(a);return}function ep(b,d){b=b|0;d=d|0;var e=0;cW[c[(c[b>>2]|0)+24>>2]&255](b)|0;e=j7(d,15392)|0;d=e;c[b+36>>2]=d;a[b+44|0]=(cW[c[(c[e>>2]|0)+28>>2]&255](d)|0)&1;return}function eq(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;b=i;i=i+16|0;d=b|0;e=b+8|0;f=a+36|0;g=a+40|0;h=d|0;j=d+8|0;k=d;d=a+32|0;while(1){a=c[f>>2]|0;l=c3[c[(c[a>>2]|0)+20>>2]&31](a,c[g>>2]|0,h,j,e)|0;a=(c[e>>2]|0)-k|0;if((aS(h|0,1,a|0,c[d>>2]|0)|0)!=(a|0)){m=-1;n=1379;break}if((l|0)==2){m=-1;n=1378;break}else if((l|0)!=1){n=1376;break}}if((n|0)==1379){i=b;return m|0}else if((n|0)==1378){i=b;return m|0}else if((n|0)==1376){m=((aP(c[d>>2]|0)|0)!=0)<<31>>31;i=b;return m|0}return 0}function er(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0;if((a[b+44|0]&1)!=0){f=aS(d|0,4,e|0,c[b+32>>2]|0)|0;return f|0}g=b;if((e|0)>0){h=d;i=0}else{f=0;return f|0}while(1){if((cT[c[(c[g>>2]|0)+52>>2]&63](b,c[h>>2]|0)|0)==-1){f=i;j=1389;break}d=i+1|0;if((d|0)<(e|0)){h=h+4|0;i=d}else{f=d;j=1390;break}}if((j|0)==1389){return f|0}else if((j|0)==1390){return f|0}return 0}function es(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;e=i;i=i+32|0;f=e|0;g=e+8|0;h=e+16|0;j=e+24|0;k=(d|0)==-1;L1554:do{if(!k){c[g>>2]=d;if((a[b+44|0]&1)!=0){if((aS(g|0,4,1,c[b+32>>2]|0)|0)==1){break}else{l=-1}i=e;return l|0}m=f|0;c[h>>2]=m;n=g+4|0;o=b+36|0;p=b+40|0;q=f+8|0;r=f;s=b+32|0;t=g;while(1){u=c[o>>2]|0;v=c_[c[(c[u>>2]|0)+12>>2]&31](u,c[p>>2]|0,t,n,j,m,q,h)|0;if((c[j>>2]|0)==(t|0)){l=-1;w=1407;break}if((v|0)==3){w=1397;break}u=(v|0)==1;if(v>>>0>=2>>>0){l=-1;w=1406;break}v=(c[h>>2]|0)-r|0;if((aS(m|0,1,v|0,c[s>>2]|0)|0)!=(v|0)){l=-1;w=1408;break}if(u){t=u?c[j>>2]|0:t}else{break L1554}}if((w|0)==1397){if((aS(t|0,1,1,c[s>>2]|0)|0)==1){break}else{l=-1}i=e;return l|0}else if((w|0)==1408){i=e;return l|0}else if((w|0)==1406){i=e;return l|0}else if((w|0)==1407){i=e;return l|0}}}while(0);l=k?0:d;i=e;return l|0}function et(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;f=i;i=i+8|0;g=f|0;h=b|0;c[h>>2]=5672;j=b+4|0;j3(j);k=b+8|0;mF(k|0,0,24)|0;c[h>>2]=6560;c[b+32>>2]=d;c[b+40>>2]=e;c[b+48>>2]=-1;a[b+52|0]=0;j4(g,j);j=j7(g,15392)|0;e=j;d=b+36|0;c[d>>2]=e;h=b+44|0;c[h>>2]=cW[c[(c[j>>2]|0)+24>>2]&255](e)|0;e=c[d>>2]|0;a[b+53|0]=(cW[c[(c[e>>2]|0)+28>>2]&255](e)|0)&1;if((c[h>>2]|0)<=8){j5(g);i=f;return}jp(168);j5(g);i=f;return}function eu(a){a=a|0;c[a>>2]=5672;j5(a+4|0);return}function ev(a){a=a|0;c[a>>2]=5672;j5(a+4|0);mw(a);return}function ew(b,d){b=b|0;d=d|0;var e=0,f=0,g=0;e=j7(d,15392)|0;d=e;f=b+36|0;c[f>>2]=d;g=b+44|0;c[g>>2]=cW[c[(c[e>>2]|0)+24>>2]&255](d)|0;d=c[f>>2]|0;a[b+53|0]=(cW[c[(c[d>>2]|0)+28>>2]&255](d)|0)&1;if((c[g>>2]|0)<=8){return}jp(168);return}function ex(a){a=a|0;return eA(a,0)|0}function ey(a){a=a|0;return eA(a,1)|0}function ez(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;e=i;i=i+32|0;f=e|0;g=e+8|0;h=e+16|0;j=e+24|0;k=b+52|0;l=(a[k]&1)!=0;if((d|0)==-1){if(l){m=-1;i=e;return m|0}n=c[b+48>>2]|0;a[k]=(n|0)!=-1|0;m=n;i=e;return m|0}n=b+48|0;L1597:do{if(l){c[h>>2]=c[n>>2];o=c[b+36>>2]|0;p=f|0;q=c_[c[(c[o>>2]|0)+12>>2]&31](o,c[b+40>>2]|0,h,h+4|0,j,p,f+8|0,g)|0;if((q|0)==3){a[p]=c[n>>2]&255;c[g>>2]=f+1}else if((q|0)==2|(q|0)==1){m=-1;i=e;return m|0}q=b+32|0;while(1){o=c[g>>2]|0;if(o>>>0<=p>>>0){break L1597}r=o-1|0;c[g>>2]=r;if((ce(a[r]|0,c[q>>2]|0)|0)==-1){m=-1;break}}i=e;return m|0}}while(0);c[n>>2]=d;a[k]=1;m=d;i=e;return m|0}function eA(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;e=i;i=i+32|0;f=e|0;g=e+8|0;h=e+16|0;j=e+24|0;k=b+52|0;if((a[k]&1)!=0){l=b+48|0;m=c[l>>2]|0;if(!d){n=m;i=e;return n|0}c[l>>2]=-1;a[k]=0;n=m;i=e;return n|0}m=c[b+44>>2]|0;k=(m|0)>1?m:1;L1617:do{if((k|0)>0){m=b+32|0;l=0;while(1){o=bb(c[m>>2]|0)|0;if((o|0)==-1){n=-1;break}a[f+l|0]=o&255;l=l+1|0;if((l|0)>=(k|0)){break L1617}}i=e;return n|0}}while(0);L1624:do{if((a[b+53|0]&1)==0){l=b+40|0;m=b+36|0;o=f|0;p=g+4|0;q=b+32|0;r=k;while(1){s=c[l>>2]|0;t=s;u=c[t>>2]|0;v=c[t+4>>2]|0;t=c[m>>2]|0;w=f+r|0;x=c_[c[(c[t>>2]|0)+16>>2]&31](t,s,o,w,h,g,p,j)|0;if((x|0)==3){y=1454;break}else if((x|0)==2){n=-1;y=1464;break}else if((x|0)!=1){z=r;break L1624}x=c[l>>2]|0;c[x>>2]=u;c[x+4>>2]=v;if((r|0)==8){n=-1;y=1465;break}v=bb(c[q>>2]|0)|0;if((v|0)==-1){n=-1;y=1471;break}a[w]=v&255;r=r+1|0}if((y|0)==1454){c[g>>2]=a[o]|0;z=r;break}else if((y|0)==1464){i=e;return n|0}else if((y|0)==1465){i=e;return n|0}else if((y|0)==1471){i=e;return n|0}}else{c[g>>2]=a[f|0]|0;z=k}}while(0);if(d){d=c[g>>2]|0;c[b+48>>2]=d;n=d;i=e;return n|0}d=b+32|0;b=z;while(1){if((b|0)<=0){break}z=b-1|0;if((ce(a[f+z|0]|0,c[d>>2]|0)|0)==-1){n=-1;y=1468;break}else{b=z}}if((y|0)==1468){i=e;return n|0}n=c[g>>2]|0;i=e;return n|0}function eB(a){a=a|0;c[a>>2]=5744;j5(a+4|0);return}function eC(a){a=a|0;c[a>>2]=5744;j5(a+4|0);mw(a);return}function eD(b,d){b=b|0;d=d|0;var e=0;cW[c[(c[b>>2]|0)+24>>2]&255](b)|0;e=j7(d,15400)|0;d=e;c[b+36>>2]=d;a[b+44|0]=(cW[c[(c[e>>2]|0)+28>>2]&255](d)|0)&1;return}function eE(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;b=i;i=i+16|0;d=b|0;e=b+8|0;f=a+36|0;g=a+40|0;h=d|0;j=d+8|0;k=d;d=a+32|0;while(1){a=c[f>>2]|0;l=c3[c[(c[a>>2]|0)+20>>2]&31](a,c[g>>2]|0,h,j,e)|0;a=(c[e>>2]|0)-k|0;if((aS(h|0,1,a|0,c[d>>2]|0)|0)!=(a|0)){m=-1;n=1480;break}if((l|0)==2){m=-1;n=1481;break}else if((l|0)!=1){n=1478;break}}if((n|0)==1480){i=b;return m|0}else if((n|0)==1481){i=b;return m|0}else if((n|0)==1478){m=((aP(c[d>>2]|0)|0)!=0)<<31>>31;i=b;return m|0}return 0}function eF(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0;if((a[b+44|0]&1)!=0){g=aS(e|0,1,f|0,c[b+32>>2]|0)|0;return g|0}h=b;if((f|0)>0){i=e;j=0}else{g=0;return g|0}while(1){if((cT[c[(c[h>>2]|0)+52>>2]&63](b,d[i]|0)|0)==-1){g=j;k=1490;break}e=j+1|0;if((e|0)<(f|0)){i=i+1|0;j=e}else{g=e;k=1489;break}}if((k|0)==1490){return g|0}else if((k|0)==1489){return g|0}return 0}function eG(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;e=i;i=i+32|0;f=e|0;g=e+8|0;h=e+16|0;j=e+24|0;k=(d|0)==-1;L1675:do{if(!k){a[g]=d&255;if((a[b+44|0]&1)!=0){if((aS(g|0,1,1,c[b+32>>2]|0)|0)==1){break}else{l=-1}i=e;return l|0}m=f|0;c[h>>2]=m;n=g+1|0;o=b+36|0;p=b+40|0;q=f+8|0;r=f;s=b+32|0;t=g;while(1){u=c[o>>2]|0;v=c_[c[(c[u>>2]|0)+12>>2]&31](u,c[p>>2]|0,t,n,j,m,q,h)|0;if((c[j>>2]|0)==(t|0)){l=-1;w=1510;break}if((v|0)==3){w=1499;break}u=(v|0)==1;if(v>>>0>=2>>>0){l=-1;w=1507;break}v=(c[h>>2]|0)-r|0;if((aS(m|0,1,v|0,c[s>>2]|0)|0)!=(v|0)){l=-1;w=1509;break}if(u){t=u?c[j>>2]|0:t}else{break L1675}}if((w|0)==1509){i=e;return l|0}else if((w|0)==1510){i=e;return l|0}else if((w|0)==1499){if((aS(t|0,1,1,c[s>>2]|0)|0)==1){break}else{l=-1}i=e;return l|0}else if((w|0)==1507){i=e;return l|0}}}while(0);l=k?0:d;i=e;return l|0}function eH(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;f=i;i=i+8|0;g=f|0;h=b|0;c[h>>2]=5744;j=b+4|0;j3(j);k=b+8|0;mF(k|0,0,24)|0;c[h>>2]=6632;c[b+32>>2]=d;c[b+40>>2]=e;c[b+48>>2]=-1;a[b+52|0]=0;j4(g,j);j=j7(g,15400)|0;e=j;d=b+36|0;c[d>>2]=e;h=b+44|0;c[h>>2]=cW[c[(c[j>>2]|0)+24>>2]&255](e)|0;e=c[d>>2]|0;a[b+53|0]=(cW[c[(c[e>>2]|0)+28>>2]&255](e)|0)&1;if((c[h>>2]|0)<=8){j5(g);i=f;return}jp(168);j5(g);i=f;return}function eI(a){a=a|0;c[a>>2]=5744;j5(a+4|0);return}function eJ(a){a=a|0;c[a>>2]=5744;j5(a+4|0);mw(a);return}function eK(b,d){b=b|0;d=d|0;var e=0,f=0,g=0;e=j7(d,15400)|0;d=e;f=b+36|0;c[f>>2]=d;g=b+44|0;c[g>>2]=cW[c[(c[e>>2]|0)+24>>2]&255](d)|0;d=c[f>>2]|0;a[b+53|0]=(cW[c[(c[d>>2]|0)+28>>2]&255](d)|0)&1;if((c[g>>2]|0)<=8){return}jp(168);return}function eL(a){a=a|0;return eO(a,0)|0}function eM(a){a=a|0;return eO(a,1)|0}function eN(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;e=i;i=i+32|0;f=e|0;g=e+8|0;h=e+16|0;j=e+24|0;k=b+52|0;l=(a[k]&1)!=0;if((d|0)==-1){if(l){m=-1;i=e;return m|0}n=c[b+48>>2]|0;a[k]=(n|0)!=-1|0;m=n;i=e;return m|0}n=b+48|0;L1718:do{if(l){a[h]=c[n>>2]&255;o=c[b+36>>2]|0;p=f|0;q=c_[c[(c[o>>2]|0)+12>>2]&31](o,c[b+40>>2]|0,h,h+1|0,j,p,f+8|0,g)|0;if((q|0)==3){a[p]=c[n>>2]&255;c[g>>2]=f+1}else if((q|0)==2|(q|0)==1){m=-1;i=e;return m|0}q=b+32|0;while(1){o=c[g>>2]|0;if(o>>>0<=p>>>0){break L1718}r=o-1|0;c[g>>2]=r;if((ce(a[r]|0,c[q>>2]|0)|0)==-1){m=-1;break}}i=e;return m|0}}while(0);c[n>>2]=d;a[k]=1;m=d;i=e;return m|0}function eO(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0;f=i;i=i+32|0;g=f|0;h=f+8|0;j=f+16|0;k=f+24|0;l=b+52|0;if((a[l]&1)!=0){m=b+48|0;n=c[m>>2]|0;if(!e){o=n;i=f;return o|0}c[m>>2]=-1;a[l]=0;o=n;i=f;return o|0}n=c[b+44>>2]|0;l=(n|0)>1?n:1;L1738:do{if((l|0)>0){n=b+32|0;m=0;while(1){p=bb(c[n>>2]|0)|0;if((p|0)==-1){o=-1;break}a[g+m|0]=p&255;m=m+1|0;if((m|0)>=(l|0)){break L1738}}i=f;return o|0}}while(0);L1745:do{if((a[b+53|0]&1)==0){m=b+40|0;n=b+36|0;p=g|0;q=h+1|0;r=b+32|0;s=l;while(1){t=c[m>>2]|0;u=t;v=c[u>>2]|0;w=c[u+4>>2]|0;u=c[n>>2]|0;x=g+s|0;y=c_[c[(c[u>>2]|0)+16>>2]&31](u,t,p,x,j,h,q,k)|0;if((y|0)==3){z=1556;break}else if((y|0)==2){o=-1;z=1568;break}else if((y|0)!=1){A=s;break L1745}y=c[m>>2]|0;c[y>>2]=v;c[y+4>>2]=w;if((s|0)==8){o=-1;z=1569;break}w=bb(c[r>>2]|0)|0;if((w|0)==-1){o=-1;z=1573;break}a[x]=w&255;s=s+1|0}if((z|0)==1556){a[h]=a[p]|0;A=s;break}else if((z|0)==1573){i=f;return o|0}else if((z|0)==1568){i=f;return o|0}else if((z|0)==1569){i=f;return o|0}}else{a[h]=a[g|0]|0;A=l}}while(0);do{if(e){l=a[h]|0;c[b+48>>2]=l&255;B=l}else{l=b+32|0;k=A;while(1){if((k|0)<=0){z=1563;break}j=k-1|0;if((ce(d[g+j|0]|0|0,c[l>>2]|0)|0)==-1){o=-1;z=1572;break}else{k=j}}if((z|0)==1563){B=a[h]|0;break}else if((z|0)==1572){i=f;return o|0}}}while(0);o=B&255;i=f;return o|0}function eP(){el(0);bf(162,16152,t|0)|0;return}function eQ(a){a=a|0;return}function eR(a){a=a|0;var b=0;b=a+4|0;I=c[b>>2]|0,c[b>>2]=I+1,I;return}function eS(a){a=a|0;var b=0,d=0;b=a+4|0;if(((I=c[b>>2]|0,c[b>>2]=I+ -1,I)|0)!=0){d=0;return d|0}cR[c[(c[a>>2]|0)+8>>2]&511](a);d=1;return d|0}function eT(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;c[a>>2]=3904;d=a+4|0;if((d|0)==0){return}a=mG(b|0)|0;e=a+1|0;f=mv(a+13|0)|0;c[f+4>>2]=a;c[f>>2]=a;a=f+12|0;c[d>>2]=a;c[f+8>>2]=0;mE(a|0,b|0,e)|0;return}function eU(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=3904;b=a+4|0;d=(c[b>>2]|0)-4|0;if(((I=c[d>>2]|0,c[d>>2]=I+ -1,I)-1|0)>=0){e=a;mw(e);return}d=(c[b>>2]|0)-12|0;if((d|0)==0){e=a;mw(e);return}mx(d);e=a;mw(e);return}function eV(a){a=a|0;var b=0;c[a>>2]=3904;b=a+4|0;a=(c[b>>2]|0)-4|0;if(((I=c[a>>2]|0,c[a>>2]=I+ -1,I)-1|0)>=0){return}a=(c[b>>2]|0)-12|0;if((a|0)==0){return}mx(a);return}function eW(a){a=a|0;return c[a+4>>2]|0}function eX(b,d){b=b|0;d=d|0;var e=0,f=0,g=0;c[b>>2]=3840;e=b+4|0;if((e|0)==0){return}if((a[d]&1)==0){f=d+1|0}else{f=c[d+8>>2]|0}d=mG(f|0)|0;b=d+1|0;g=mv(d+13|0)|0;c[g+4>>2]=d;c[g>>2]=d;d=g+12|0;c[e>>2]=d;c[g+8>>2]=0;mE(d|0,f|0,b)|0;return}function eY(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;c[a>>2]=3840;d=a+4|0;if((d|0)==0){return}a=mG(b|0)|0;e=a+1|0;f=mv(a+13|0)|0;c[f+4>>2]=a;c[f>>2]=a;a=f+12|0;c[d>>2]=a;c[f+8>>2]=0;mE(a|0,b|0,e)|0;return}function eZ(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=3840;b=a+4|0;d=(c[b>>2]|0)-4|0;if(((I=c[d>>2]|0,c[d>>2]=I+ -1,I)-1|0)>=0){e=a;mw(e);return}d=(c[b>>2]|0)-12|0;if((d|0)==0){e=a;mw(e);return}mx(d);e=a;mw(e);return}function e_(a){a=a|0;var b=0;c[a>>2]=3840;b=a+4|0;a=(c[b>>2]|0)-4|0;if(((I=c[a>>2]|0,c[a>>2]=I+ -1,I)-1|0)>=0){return}a=(c[b>>2]|0)-12|0;if((a|0)==0){return}mx(a);return}function e$(a){a=a|0;return c[a+4>>2]|0}function e0(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=3904;b=a+4|0;d=(c[b>>2]|0)-4|0;if(((I=c[d>>2]|0,c[d>>2]=I+ -1,I)-1|0)>=0){e=a;mw(e);return}d=(c[b>>2]|0)-12|0;if((d|0)==0){e=a;mw(e);return}mx(d);e=a;mw(e);return}function e1(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=3840;b=a+4|0;d=(c[b>>2]|0)-4|0;if(((I=c[d>>2]|0,c[d>>2]=I+ -1,I)-1|0)>=0){e=a;mw(e);return}d=(c[b>>2]|0)-12|0;if((d|0)==0){e=a;mw(e);return}mx(d);e=a;mw(e);return}function e2(a){a=a|0;return}function e3(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=d;c[a+4>>2]=b;return}function e4(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;e=i;i=i+8|0;f=e|0;cQ[c[(c[a>>2]|0)+12>>2]&7](f,a,b);if((c[f+4>>2]|0)!=(c[d+4>>2]|0)){g=0;i=e;return g|0}g=(c[f>>2]|0)==(c[d>>2]|0);i=e;return g|0}function e5(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;if((c[b+4>>2]|0)!=(a|0)){e=0;return e|0}e=(c[b>>2]|0)==(d|0);return e|0}function e6(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;d=b9(e|0)|0;e=mG(d|0)|0;if(e>>>0>4294967279>>>0){fd(0)}if(e>>>0<11>>>0){a[b]=e<<1&255;f=b+1|0;mE(f|0,d|0,e)|0;g=f+e|0;a[g]=0;return}else{h=e+16&-16;i=mu(h)|0;c[b+8>>2]=i;c[b>>2]=h|1;c[b+4>>2]=e;f=i;mE(f|0,d|0,e)|0;g=f+e|0;a[g]=0;return}}function e7(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;g=i;h=f;j=i;i=i+12|0;i=i+7&-8;k=e|0;l=c[k>>2]|0;do{if((l|0)!=0){m=d[h]|0;if((m&1|0)==0){n=m>>>1}else{n=c[f+4>>2]|0}if((n|0)==0){o=l}else{fn(f,1672,2)|0;o=c[k>>2]|0}m=c[e+4>>2]|0;cQ[c[(c[m>>2]|0)+24>>2]&7](j,m,o);m=j;p=a[m]|0;if((p&1)==0){q=j+1|0}else{q=c[j+8>>2]|0}r=p&255;if((r&1|0)==0){s=r>>>1}else{s=c[j+4>>2]|0}fn(f,q,s)|0;if((a[m]&1)==0){break}mw(c[j+8>>2]|0)}}while(0);j=b;c[j>>2]=c[h>>2];c[j+4>>2]=c[h+4>>2];c[j+8>>2]=c[h+8>>2];mF(h|0,0,12)|0;i=g;return}function e8(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;i=i+32|0;g=d;d=i;i=i+8|0;c[d>>2]=c[g>>2];c[d+4>>2]=c[g+4>>2];g=f|0;h=f+16|0;j=mG(e|0)|0;if(j>>>0>4294967279>>>0){fd(0)}if(j>>>0<11>>>0){a[h]=j<<1&255;k=h+1|0}else{l=j+16&-16;m=mu(l)|0;c[h+8>>2]=m;c[h>>2]=l|1;c[h+4>>2]=j;k=m}mE(k|0,e|0,j)|0;a[k+j|0]=0;e7(g,d,h);eX(b|0,g);if((a[g]&1)!=0){mw(c[g+8>>2]|0)}if((a[h]&1)!=0){mw(c[h+8>>2]|0)}c[b>>2]=6128;h=d;d=b+8|0;b=c[h+4>>2]|0;c[d>>2]=c[h>>2];c[d+4>>2]=b;i=f;return}function e9(a){a=a|0;e_(a|0);mw(a);return}function fa(a){a=a|0;e_(a|0);return}function fb(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;if(a>>>0<212>>>0){b=12040;d=48;L1909:while(1){e=d;while(1){if((e|0)==0){break L1909}f=(e|0)/2|0;if((c[b+(f<<2)>>2]|0)>>>0<a>>>0){break}else{e=f}}b=b+(f+1<<2)|0;d=e-1-f|0}g=c[b>>2]|0;return g|0}if(a>>>0>4294967291>>>0){b=cy(8)|0;eY(b,888);c[b>>2]=3808;bK(b|0,10088,44);return 0}b=(a>>>0)/210|0;f=b*210|0;d=a-f|0;a=11848;h=48;L1922:while(1){i=h;while(1){if((i|0)==0){break L1922}j=(i|0)/2|0;if((c[a+(j<<2)>>2]|0)>>>0<d>>>0){break}else{i=j}}a=a+(j+1<<2)|0;h=i-1-j|0}j=a-11848>>2;a=b;b=j;h=(c[11848+(j<<2)>>2]|0)+f|0;L1929:while(1){f=5;while(1){if(f>>>0>=47>>>0){k=211;l=1723;break}j=c[12040+(f<<2)>>2]|0;d=(h>>>0)/(j>>>0)|0;if(d>>>0<j>>>0){g=h;l=1850;break L1929}if((h|0)==(ag(d,j)|0)){break}else{f=f+1|0}}L1935:do{if((l|0)==1723){while(1){l=0;f=(h>>>0)/(k>>>0)|0;if(f>>>0<k>>>0){g=h;l=1834;break L1929}if((h|0)==(ag(f,k)|0)){break L1935}f=k+10|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1821;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+12|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1863;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+16|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1844;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+18|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1855;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+22|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1826;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+28|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1822;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+30|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1835;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+36|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1854;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+40|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1853;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+42|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1823;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+46|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1862;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+52|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1837;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+58|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1851;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+60|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1852;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+66|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1864;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+70|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1848;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+72|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1824;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+78|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1827;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+82|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1849;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+88|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1836;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+96|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1832;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+100|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1833;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+102|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1856;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+106|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1857;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+108|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1869;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+112|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1870;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+120|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1845;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+126|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1846;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+130|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1847;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+136|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1858;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+138|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1859;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+142|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1860;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+148|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1861;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+150|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1838;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+156|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1839;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+162|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1840;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+166|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1841;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+168|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1842;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+172|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1828;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+178|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1829;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+180|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1830;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+186|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1831;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+190|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1843;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+192|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1865;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+196|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1866;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+198|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1867;break L1929}if((h|0)==(ag(i,f)|0)){break L1935}f=k+208|0;i=(h>>>0)/(f>>>0)|0;if(i>>>0<f>>>0){g=h;l=1868;break L1929}if((h|0)==(ag(i,f)|0)){break}else{k=k+210|0;l=1723}}}}while(0);f=b+1|0;i=(f|0)==48;j=i?0:f;f=(i&1)+a|0;a=f;b=j;h=(c[11848+(j<<2)>>2]|0)+(f*210|0)|0}if((l|0)==1830){return g|0}else if((l|0)==1831){return g|0}else if((l|0)==1832){return g|0}else if((l|0)==1833){return g|0}else if((l|0)==1834){return g|0}else if((l|0)==1835){return g|0}else if((l|0)==1836){return g|0}else if((l|0)==1837){return g|0}else if((l|0)==1838){return g|0}else if((l|0)==1839){return g|0}else if((l|0)==1840){return g|0}else if((l|0)==1841){return g|0}else if((l|0)==1842){return g|0}else if((l|0)==1843){return g|0}else if((l|0)==1844){return g|0}else if((l|0)==1845){return g|0}else if((l|0)==1846){return g|0}else if((l|0)==1847){return g|0}else if((l|0)==1848){return g|0}else if((l|0)==1849){return g|0}else if((l|0)==1850){return g|0}else if((l|0)==1851){return g|0}else if((l|0)==1852){return g|0}else if((l|0)==1853){return g|0}else if((l|0)==1854){return g|0}else if((l|0)==1855){return g|0}else if((l|0)==1856){return g|0}else if((l|0)==1857){return g|0}else if((l|0)==1858){return g|0}else if((l|0)==1859){return g|0}else if((l|0)==1860){return g|0}else if((l|0)==1861){return g|0}else if((l|0)==1862){return g|0}else if((l|0)==1863){return g|0}else if((l|0)==1864){return g|0}else if((l|0)==1865){return g|0}else if((l|0)==1866){return g|0}else if((l|0)==1867){return g|0}else if((l|0)==1868){return g|0}else if((l|0)==1869){return g|0}else if((l|0)==1870){return g|0}else if((l|0)==1821){return g|0}else if((l|0)==1822){return g|0}else if((l|0)==1823){return g|0}else if((l|0)==1824){return g|0}else if((l|0)==1826){return g|0}else if((l|0)==1827){return g|0}else if((l|0)==1828){return g|0}else if((l|0)==1829){return g|0}return 0}function fc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e;if((c[a>>2]|0)==1){do{a2(15152,15128)|0;}while((c[a>>2]|0)==1)}if((c[a>>2]|0)!=0){f;return}c[a>>2]=1;g;cR[d&511](b);h;c[a>>2]=-1;i;b2(15152)|0;return}function fd(a){a=a|0;a=cy(8)|0;eT(a,400);c[a>>2]=3872;bK(a|0,10120,38)}function fe(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=d;if((a[e]&1)==0){f=b;c[f>>2]=c[e>>2];c[f+4>>2]=c[e+4>>2];c[f+8>>2]=c[e+8>>2];return}e=c[d+8>>2]|0;f=c[d+4>>2]|0;if(f>>>0>4294967279>>>0){fd(0)}if(f>>>0<11>>>0){a[b]=f<<1&255;g=b+1|0}else{d=f+16&-16;h=mu(d)|0;c[b+8>>2]=h;c[b>>2]=d|1;c[b+4>>2]=f;g=h}mE(g|0,e|0,f)|0;a[g+f|0]=0;return}function ff(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;if(e>>>0>4294967279>>>0){fd(0)}if(e>>>0<11>>>0){a[b]=e<<1&255;f=b+1|0;mE(f|0,d|0,e)|0;g=f+e|0;a[g]=0;return}else{h=e+16&-16;i=mu(h)|0;c[b+8>>2]=i;c[b>>2]=h|1;c[b+4>>2]=e;f=i;mE(f|0,d|0,e)|0;g=f+e|0;a[g]=0;return}}function fg(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;if(d>>>0>4294967279>>>0){fd(0)}if(d>>>0<11>>>0){a[b]=d<<1&255;f=b+1|0}else{g=d+16&-16;h=mu(g)|0;c[b+8>>2]=h;c[b>>2]=g|1;c[b+4>>2]=d;f=h}mF(f|0,e|0,d|0)|0;a[f+d|0]=0;return}function fh(b){b=b|0;if((a[b]&1)==0){return}mw(c[b+8>>2]|0);return}function fi(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;e=mG(d|0)|0;f=b;g=b;h=a[g]|0;if((h&1)==0){i=10;j=h}else{h=c[b>>2]|0;i=(h&-2)-1|0;j=h&255}if(i>>>0<e>>>0){h=j&255;if((h&1|0)==0){k=h>>>1}else{k=c[b+4>>2]|0}fo(b,i,e-i|0,k,0,k,e,d);return b|0}if((j&1)==0){l=f+1|0}else{l=c[b+8>>2]|0}mH(l|0,d|0,e|0)|0;a[l+e|0]=0;if((a[g]&1)==0){a[g]=e<<1&255;return b|0}else{c[b+4>>2]=e;return b|0}return 0}function fj(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=b;g=a[f]|0;h=g&255;if((h&1|0)==0){i=h>>>1}else{i=c[b+4>>2]|0}if(i>>>0<d>>>0){h=d-i|0;fk(b,h,e)|0;return}if((g&1)==0){a[b+1+d|0]=0;a[f]=d<<1&255;return}else{a[(c[b+8>>2]|0)+d|0]=0;c[b+4>>2]=d;return}}function fk(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0;if((d|0)==0){return b|0}f=b;g=a[f]|0;if((g&1)==0){h=10;i=g}else{g=c[b>>2]|0;h=(g&-2)-1|0;i=g&255}g=i&255;if((g&1|0)==0){j=g>>>1}else{j=c[b+4>>2]|0}if((h-j|0)>>>0<d>>>0){fp(b,h,d-h+j|0,j,j,0,0);k=a[f]|0}else{k=i}if((k&1)==0){l=b+1|0}else{l=c[b+8>>2]|0}k=l+j|0;mF(k|0,e|0,d|0)|0;e=j+d|0;if((a[f]&1)==0){a[f]=e<<1&255}else{c[b+4>>2]=e}a[l+e|0]=0;return b|0}function fl(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;if(d>>>0>4294967279>>>0){fd(0)}e=b;f=b;g=a[f]|0;if((g&1)==0){h=10;i=g}else{g=c[b>>2]|0;h=(g&-2)-1|0;i=g&255}g=i&255;if((g&1|0)==0){j=g>>>1}else{j=c[b+4>>2]|0}g=j>>>0>d>>>0?j:d;if(g>>>0<11>>>0){k=11}else{k=g+16&-16}g=k-1|0;if((g|0)==(h|0)){return}if((g|0)==10){l=e+1|0;m=c[b+8>>2]|0;n=1;o=0}else{if(g>>>0>h>>>0){p=mu(k)|0}else{p=mu(k)|0}h=i&1;if(h<<24>>24==0){q=e+1|0}else{q=c[b+8>>2]|0}l=p;m=q;n=h<<24>>24!=0;o=1}h=i&255;if((h&1|0)==0){r=h>>>1}else{r=c[b+4>>2]|0}h=r+1|0;mE(l|0,m|0,h)|0;if(n){mw(m)}if(o){c[b>>2]=k|1;c[b+4>>2]=j;c[b+8>>2]=l;return}else{a[f]=j<<1&255;return}}function fm(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;e=b;f=a[e]|0;if((f&1)==0){g=(f&255)>>>1;h=10}else{g=c[b+4>>2]|0;h=(c[b>>2]&-2)-1|0}if((g|0)==(h|0)){fp(b,h,1,h,h,0,0);i=a[e]|0}else{i=f}if((i&1)==0){a[e]=(g<<1)+2&255;j=b+1|0;k=g+1|0;l=j+g|0;a[l]=d;m=j+k|0;a[m]=0;return}else{e=c[b+8>>2]|0;i=g+1|0;c[b+4>>2]=i;j=e;k=i;l=j+g|0;a[l]=d;m=j+k|0;a[m]=0;return}}function fn(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0;f=b;g=a[f]|0;if((g&1)==0){h=10;i=g}else{g=c[b>>2]|0;h=(g&-2)-1|0;i=g&255}g=i&255;if((g&1|0)==0){j=g>>>1}else{j=c[b+4>>2]|0}if((h-j|0)>>>0<e>>>0){fo(b,h,e-h+j|0,j,j,0,e,d);return b|0}if((e|0)==0){return b|0}if((i&1)==0){k=b+1|0}else{k=c[b+8>>2]|0}i=k+j|0;mE(i|0,d|0,e)|0;d=j+e|0;if((a[f]&1)==0){a[f]=d<<1&255}else{c[b+4>>2]=d}a[k+d|0]=0;return b|0}function fo(b,d,e,f,g,h,i,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;if((-18-d|0)>>>0<e>>>0){fd(0)}if((a[b]&1)==0){k=b+1|0}else{k=c[b+8>>2]|0}do{if(d>>>0<2147483623>>>0){l=e+d|0;m=d<<1;n=l>>>0<m>>>0?m:l;if(n>>>0<11>>>0){o=11;break}o=n+16&-16}else{o=-17}}while(0);e=mu(o)|0;if((g|0)!=0){mE(e|0,k|0,g)|0}if((i|0)!=0){n=e+g|0;mE(n|0,j|0,i)|0}j=f-h|0;if((j|0)!=(g|0)){f=j-g|0;n=e+(i+g)|0;l=k+(h+g)|0;mE(n|0,l|0,f)|0}if((d|0)==10){p=b+8|0;c[p>>2]=e;q=o|1;r=b|0;c[r>>2]=q;s=j+i|0;t=b+4|0;c[t>>2]=s;u=e+s|0;a[u]=0;return}mw(k);p=b+8|0;c[p>>2]=e;q=o|1;r=b|0;c[r>>2]=q;s=j+i|0;t=b+4|0;c[t>>2]=s;u=e+s|0;a[u]=0;return}function fp(b,d,e,f,g,h,i){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;if((-17-d|0)>>>0<e>>>0){fd(0)}if((a[b]&1)==0){j=b+1|0}else{j=c[b+8>>2]|0}do{if(d>>>0<2147483623>>>0){k=e+d|0;l=d<<1;m=k>>>0<l>>>0?l:k;if(m>>>0<11>>>0){n=11;break}n=m+16&-16}else{n=-17}}while(0);e=mu(n)|0;if((g|0)!=0){mE(e|0,j|0,g)|0}m=f-h|0;if((m|0)!=(g|0)){f=m-g|0;m=e+(i+g)|0;i=j+(h+g)|0;mE(m|0,i|0,f)|0}if((d|0)==10){o=b+8|0;c[o>>2]=e;p=n|1;q=b|0;c[q>>2]=p;return}mw(j);o=b+8|0;c[o>>2]=e;p=n|1;q=b|0;c[q>>2]=p;return}function fq(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0;if(e>>>0>1073741807>>>0){fd(0)}if(e>>>0<2>>>0){a[b]=e<<1&255;f=b+4|0;g=l0(f,d,e)|0;h=f+(e<<2)|0;c[h>>2]=0;return}else{i=e+4&-4;j=mu(i<<2)|0;c[b+8>>2]=j;c[b>>2]=i|1;c[b+4>>2]=e;f=j;g=l0(f,d,e)|0;h=f+(e<<2)|0;c[h>>2]=0;return}}function fr(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0;if(d>>>0>1073741807>>>0){fd(0)}if(d>>>0<2>>>0){a[b]=d<<1&255;f=b+4|0;g=l2(f,e,d)|0;h=f+(d<<2)|0;c[h>>2]=0;return}else{i=d+4&-4;j=mu(i<<2)|0;c[b+8>>2]=j;c[b>>2]=i|1;c[b+4>>2]=d;f=j;g=l2(f,e,d)|0;h=f+(d<<2)|0;c[h>>2]=0;return}}function fs(b){b=b|0;if((a[b]&1)==0){return}mw(c[b+8>>2]|0);return}function ft(a,b){a=a|0;b=b|0;return fu(a,b,l$(b)|0)|0}function fu(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0;f=b;g=a[f]|0;if((g&1)==0){h=1;i=g}else{g=c[b>>2]|0;h=(g&-2)-1|0;i=g&255}if(h>>>0<e>>>0){g=i&255;if((g&1|0)==0){j=g>>>1}else{j=c[b+4>>2]|0}fx(b,h,e-h|0,j,0,j,e,d);return b|0}if((i&1)==0){k=b+4|0}else{k=c[b+8>>2]|0}l1(k,d,e)|0;c[k+(e<<2)>>2]=0;if((a[f]&1)==0){a[f]=e<<1&255;return b|0}else{c[b+4>>2]=e;return b|0}return 0}function fv(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;if(d>>>0>1073741807>>>0){fd(0)}e=b;f=a[e]|0;if((f&1)==0){g=1;h=f}else{f=c[b>>2]|0;g=(f&-2)-1|0;h=f&255}f=h&255;if((f&1|0)==0){i=f>>>1}else{i=c[b+4>>2]|0}f=i>>>0>d>>>0?i:d;if(f>>>0<2>>>0){j=2}else{j=f+4&-4}f=j-1|0;if((f|0)==(g|0)){return}if((f|0)==1){k=b+4|0;l=c[b+8>>2]|0;m=1;n=0}else{d=j<<2;if(f>>>0>g>>>0){o=mu(d)|0}else{o=mu(d)|0}d=h&1;if(d<<24>>24==0){p=b+4|0}else{p=c[b+8>>2]|0}k=o;l=p;m=d<<24>>24!=0;n=1}d=k;k=h&255;if((k&1|0)==0){q=k>>>1}else{q=c[b+4>>2]|0}l0(d,l,q+1|0)|0;if(m){mw(l)}if(n){c[b>>2]=j|1;c[b+4>>2]=i;c[b+8>>2]=d;return}else{a[e]=i<<1&255;return}}function fw(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;e=b;f=a[e]|0;if((f&1)==0){g=(f&255)>>>1;h=1}else{g=c[b+4>>2]|0;h=(c[b>>2]&-2)-1|0}if((g|0)==(h|0)){fy(b,h,1,h,h,0,0);i=a[e]|0}else{i=f}if((i&1)==0){a[e]=(g<<1)+2&255;j=b+4|0;k=g+1|0;l=j+(g<<2)|0;c[l>>2]=d;m=j+(k<<2)|0;c[m>>2]=0;return}else{e=c[b+8>>2]|0;i=g+1|0;c[b+4>>2]=i;j=e;k=i;l=j+(g<<2)|0;c[l>>2]=d;m=j+(k<<2)|0;c[m>>2]=0;return}}function fx(b,d,e,f,g,h,i,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;if((1073741806-d|0)>>>0<e>>>0){fd(0)}if((a[b]&1)==0){k=b+4|0}else{k=c[b+8>>2]|0}do{if(d>>>0<536870887>>>0){l=e+d|0;m=d<<1;n=l>>>0<m>>>0?m:l;if(n>>>0<2>>>0){o=2;break}o=n+4&-4}else{o=1073741807}}while(0);e=mu(o<<2)|0;if((g|0)!=0){l0(e,k,g)|0}if((i|0)!=0){n=e+(g<<2)|0;l0(n,j,i)|0}j=f-h|0;if((j|0)!=(g|0)){f=j-g|0;n=e+(i+g<<2)|0;l=k+(h+g<<2)|0;l0(n,l,f)|0}if((d|0)==1){p=b+8|0;c[p>>2]=e;q=o|1;r=b|0;c[r>>2]=q;s=j+i|0;t=b+4|0;c[t>>2]=s;u=e+(s<<2)|0;c[u>>2]=0;return}mw(k);p=b+8|0;c[p>>2]=e;q=o|1;r=b|0;c[r>>2]=q;s=j+i|0;t=b+4|0;c[t>>2]=s;u=e+(s<<2)|0;c[u>>2]=0;return}function fy(b,d,e,f,g,h,i){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;if((1073741807-d|0)>>>0<e>>>0){fd(0)}if((a[b]&1)==0){j=b+4|0}else{j=c[b+8>>2]|0}do{if(d>>>0<536870887>>>0){k=e+d|0;l=d<<1;m=k>>>0<l>>>0?l:k;if(m>>>0<2>>>0){n=2;break}n=m+4&-4}else{n=1073741807}}while(0);e=mu(n<<2)|0;if((g|0)!=0){l0(e,j,g)|0}m=f-h|0;if((m|0)!=(g|0)){f=m-g|0;m=e+(i+g<<2)|0;i=j+(h+g<<2)|0;l0(m,i,f)|0}if((d|0)==1){o=b+8|0;c[o>>2]=e;p=n|1;q=b|0;c[q>>2]=p;return}mw(j);o=b+8|0;c[o>>2]=e;p=n|1;q=b|0;c[q>>2]=p;return}function fz(b,d){b=b|0;d=d|0;var e=0,f=0,g=0;e=i;i=i+8|0;f=e|0;g=(c[b+24>>2]|0)==0;if(g){c[b+16>>2]=d|1}else{c[b+16>>2]=d}if(((g&1|d)&c[b+20>>2]|0)==0){i=e;return}e=cy(16)|0;do{if((a[16272]|0)==0){if((bz(16272)|0)==0){break}c[3570]=5368;bf(82,14280,t|0)|0}}while(0);b=mM(14280,0,32)|0;c[f>>2]=b&0|1;c[f+4>>2]=K|0;e8(e,f,1856);c[e>>2]=4552;bK(e|0,10664,32)}function fA(a){a=a|0;var b=0,d=0,e=0,f=0;c[a>>2]=4528;b=c[a+40>>2]|0;d=a+32|0;e=a+36|0;if((b|0)!=0){f=b;do{f=f-1|0;cQ[c[(c[d>>2]|0)+(f<<2)>>2]&7](0,a,c[(c[e>>2]|0)+(f<<2)>>2]|0);}while((f|0)!=0)}j5(a+28|0);mq(c[d>>2]|0);mq(c[e>>2]|0);mq(c[a+48>>2]|0);mq(c[a+60>>2]|0);return}function fB(a,b){a=a|0;b=b|0;j4(a,b+28|0);return}function fC(a,b){a=a|0;b=b|0;var d=0,e=0;c[a+24>>2]=b;c[a+16>>2]=(b|0)==0;c[a+20>>2]=0;c[a+4>>2]=4098;c[a+12>>2]=0;c[a+8>>2]=6;b=a+28|0;d=(b|0)==0;e=a+32|0;mF(e|0,0,40)|0;if(d){return}j3(b);return}function fD(a){a=a|0;c[a>>2]=5744;j5(a+4|0);mw(a);return}function fE(a){a=a|0;c[a>>2]=5744;j5(a+4|0);return}function fF(a,b){a=a|0;b=b|0;return}function fG(a,b,c){a=a|0;b=b|0;c=c|0;return a|0}function fH(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;g=a;c[g>>2]=0;c[g+4>>2]=0;g=a+8|0;c[g>>2]=-1;c[g+4>>2]=-1;return}function fI(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;e=i;b=d;d=i;i=i+16|0;c[d>>2]=c[b>>2];c[d+4>>2]=c[b+4>>2];c[d+8>>2]=c[b+8>>2];c[d+12>>2]=c[b+12>>2];b=a;c[b>>2]=0;c[b+4>>2]=0;b=a+8|0;c[b>>2]=-1;c[b+4>>2]=-1;i=e;return}function fJ(a){a=a|0;return 0}function fK(a){a=a|0;return 0}function fL(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;f=b;if((e|0)<=0){g=0;return g|0}h=b+12|0;i=b+16|0;j=d;d=0;while(1){k=c[h>>2]|0;if(k>>>0<(c[i>>2]|0)>>>0){c[h>>2]=k+1;l=a[k]|0}else{k=cW[c[(c[f>>2]|0)+40>>2]&255](b)|0;if((k|0)==-1){g=d;m=2226;break}l=k&255}a[j]=l;k=d+1|0;if((k|0)<(e|0)){j=j+1|0;d=k}else{g=k;m=2225;break}}if((m|0)==2226){return g|0}else if((m|0)==2225){return g|0}return 0}function fM(a){a=a|0;return-1|0}function fN(a){a=a|0;var b=0,e=0;if((cW[c[(c[a>>2]|0)+36>>2]&255](a)|0)==-1){b=-1;return b|0}e=a+12|0;a=c[e>>2]|0;c[e>>2]=a+1;b=d[a]|0;return b|0}function fO(a,b){a=a|0;b=b|0;return-1|0}function fP(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=b;if((f|0)<=0){h=0;return h|0}i=b+24|0;j=b+28|0;k=0;l=e;while(1){e=c[i>>2]|0;if(e>>>0<(c[j>>2]|0)>>>0){m=a[l]|0;c[i>>2]=e+1;a[e]=m}else{if((cT[c[(c[g>>2]|0)+52>>2]&63](b,d[l]|0)|0)==-1){h=k;n=2243;break}}m=k+1|0;if((m|0)<(f|0)){k=m;l=l+1|0}else{h=m;n=2244;break}}if((n|0)==2243){return h|0}else if((n|0)==2244){return h|0}return 0}function fQ(a,b){a=a|0;b=b|0;return-1|0}function fR(a){a=a|0;c[a>>2]=5672;j5(a+4|0);mw(a);return}function fS(a){a=a|0;c[a>>2]=5672;j5(a+4|0);return}function fT(a,b){a=a|0;b=b|0;return}function fU(a,b,c){a=a|0;b=b|0;c=c|0;return a|0}function fV(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;g=a;c[g>>2]=0;c[g+4>>2]=0;g=a+8|0;c[g>>2]=-1;c[g+4>>2]=-1;return}function fW(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;e=i;b=d;d=i;i=i+16|0;c[d>>2]=c[b>>2];c[d+4>>2]=c[b+4>>2];c[d+8>>2]=c[b+8>>2];c[d+12>>2]=c[b+12>>2];b=a;c[b>>2]=0;c[b+4>>2]=0;b=a+8|0;c[b>>2]=-1;c[b+4>>2]=-1;i=e;return}function fX(a){a=a|0;return 0}function fY(a){a=a|0;return 0}function fZ(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;e=a;if((d|0)<=0){f=0;return f|0}g=a+12|0;h=a+16|0;i=b;b=0;while(1){j=c[g>>2]|0;if(j>>>0<(c[h>>2]|0)>>>0){c[g>>2]=j+4;k=c[j>>2]|0}else{j=cW[c[(c[e>>2]|0)+40>>2]&255](a)|0;if((j|0)==-1){f=b;l=2261;break}else{k=j}}c[i>>2]=k;j=b+1|0;if((j|0)<(d|0)){i=i+4|0;b=j}else{f=j;l=2263;break}}if((l|0)==2263){return f|0}else if((l|0)==2261){return f|0}return 0}function f_(a){a=a|0;return-1|0}function f$(a){a=a|0;var b=0,d=0;if((cW[c[(c[a>>2]|0)+36>>2]&255](a)|0)==-1){b=-1;return b|0}d=a+12|0;a=c[d>>2]|0;c[d>>2]=a+4;b=c[a>>2]|0;return b|0}function f0(a,b){a=a|0;b=b|0;return-1|0}function f1(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;e=a;if((d|0)<=0){f=0;return f|0}g=a+24|0;h=a+28|0;i=0;j=b;while(1){b=c[g>>2]|0;if(b>>>0<(c[h>>2]|0)>>>0){k=c[j>>2]|0;c[g>>2]=b+4;c[b>>2]=k}else{if((cT[c[(c[e>>2]|0)+52>>2]&63](a,c[j>>2]|0)|0)==-1){f=i;l=2278;break}}k=i+1|0;if((k|0)<(d|0)){i=k;j=j+4|0}else{f=k;l=2280;break}}if((l|0)==2280){return f|0}else if((l|0)==2278){return f|0}return 0}function f2(a,b){a=a|0;b=b|0;return-1|0}function f3(a){a=a|0;fA(a+8|0);mw(a);return}function f4(a){a=a|0;fA(a+8|0);return}function f5(a){a=a|0;var b=0,d=0;b=a;d=c[(c[a>>2]|0)-12>>2]|0;fA(b+(d+8)|0);mw(b+d|0);return}function f6(a){a=a|0;fA(a+((c[(c[a>>2]|0)-12>>2]|0)+8)|0);return}function f7(e,f,g){e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;h=i;i=i+8|0;j=h|0;k=e|0;a[k]=0;e=f;l=c[(c[e>>2]|0)-12>>2]|0;m=f;f=c[m+(l+16)>>2]|0;if((f|0)!=0){fz(m+l|0,f|4);i=h;return}f=c[m+(l+72)>>2]|0;if((f|0)!=0){f8(f)|0}do{if(!g){f=c[(c[e>>2]|0)-12>>2]|0;if((c[m+(f+4)>>2]&4096|0)==0){break}j4(j,m+(f+28)|0);f=j7(j,15704)|0;j5(j);l=f+8|0;f=c[m+((c[(c[e>>2]|0)-12>>2]|0)+24)>>2]|0;while(1){if((f|0)==0){break}n=c[f+12>>2]|0;if((n|0)==(c[f+16>>2]|0)){o=cW[c[(c[f>>2]|0)+36>>2]&255](f)|0}else{o=d[n]|0}p=(o|0)==-1?0:f;if((p|0)==0){break}q=p+12|0;n=c[q>>2]|0;r=p+16|0;if((n|0)==(c[r>>2]|0)){s=(cW[c[(c[p>>2]|0)+36>>2]&255](p)|0)&255}else{s=a[n]|0}if(s<<24>>24<0){t=2307;break}if((b[(c[l>>2]|0)+(s<<24>>24<<1)>>1]&8192)==0){t=2307;break}n=c[q>>2]|0;if((n|0)==(c[r>>2]|0)){u=c[(c[p>>2]|0)+40>>2]|0;cW[u&255](p)|0;f=p;continue}else{c[q>>2]=n+1;f=p;continue}}if((t|0)==2307){f=c[q>>2]|0;if((f|0)==(c[r>>2]|0)){v=cW[c[(c[p>>2]|0)+36>>2]&255](p)|0}else{v=d[f]|0}if(!((v|0)==-1|(p|0)==0)){break}}f=c[(c[e>>2]|0)-12>>2]|0;fz(m+f|0,c[m+(f+16)>>2]|6)}}while(0);a[k]=(c[m+((c[(c[e>>2]|0)-12>>2]|0)+16)>>2]|0)==0|0;i=h;return}function f8(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0;d=i;i=i+8|0;e=d|0;f=b;g=c[(c[f>>2]|0)-12>>2]|0;h=b;if((c[h+(g+24)>>2]|0)==0){i=d;return b|0}j=e|0;a[j]=0;c[e+4>>2]=b;do{if((c[h+(g+16)>>2]|0)==0){k=c[h+(g+72)>>2]|0;if((k|0)!=0){f8(k)|0}a[j]=1;k=c[h+((c[(c[f>>2]|0)-12>>2]|0)+24)>>2]|0;if((cW[c[(c[k>>2]|0)+24>>2]&255](k)|0)!=-1){break}k=c[(c[f>>2]|0)-12>>2]|0;fz(h+k|0,c[h+(k+16)>>2]|1)}}while(0);gm(e);i=d;return b|0}function f9(a){a=a|0;var b=0;b=a+16|0;c[b>>2]=c[b>>2]|1;if((c[a+20>>2]&1|0)==0){return}else{a3()}}function ga(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;e=a+4|0;c[e>>2]=0;f=a;g=c[(c[f>>2]|0)-12>>2]|0;h=a;i=c[h+(g+16)>>2]|0;do{if((i|0)==0){j=c[h+(g+72)>>2]|0;if((j|0)==0){k=g}else{f8(j)|0;k=c[(c[f>>2]|0)-12>>2]|0}if((c[h+(k+16)>>2]|0)!=0){l=k;break}j=c[h+(k+24)>>2]|0;m=cU[c[(c[j>>2]|0)+32>>2]&63](j,b,d)|0;c[e>>2]=m;if((m|0)==(d|0)){return a|0}m=c[(c[f>>2]|0)-12>>2]|0;fz(h+m|0,c[h+(m+16)>>2]|6);return a|0}else{fz(h+g|0,i|4);l=c[(c[f>>2]|0)-12>>2]|0}}while(0);fz(h+l|0,c[h+(l+16)>>2]|4);return a|0}function gb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0;d=i;i=i+16|0;e=d|0;f=a;c[f>>2]=0;c[f+4>>2]=0;f=a+8|0;c[f>>2]=-1;c[f+4>>2]=-1;f=b;g=c[(c[f>>2]|0)-12>>2]|0;h=b;b=c[h+(g+16)>>2]|0;if((b|0)!=0){fz(h+g|0,b|4);i=d;return}b=c[h+(g+72)>>2]|0;if((b|0)==0){j=g}else{f8(b)|0;j=c[(c[f>>2]|0)-12>>2]|0}if((c[h+(j+16)>>2]|0)!=0){i=d;return}f=c[h+(j+24)>>2]|0;c1[c[(c[f>>2]|0)+16>>2]&63](e,f,0,0,1,8);f=a;a=e;c[f>>2]=c[a>>2];c[f+4>>2]=c[a+4>>2];c[f+8>>2]=c[a+8>>2];c[f+12>>2]=c[a+12>>2];i=d;return}function gc(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;i=i+16|0;g=f|0;h=a;j=c[(c[h>>2]|0)-12>>2]|0;k=a;l=c[k+(j+16)>>2]|0;if((l|0)!=0){fz(k+j|0,l|4);i=f;return a|0}l=c[k+(j+72)>>2]|0;if((l|0)==0){m=j}else{f8(l)|0;m=c[(c[h>>2]|0)-12>>2]|0}if((c[k+(m+16)>>2]|0)!=0){i=f;return a|0}l=c[k+(m+24)>>2]|0;c1[c[(c[l>>2]|0)+16>>2]&63](g,l,b,d,e,8);e=g+8|0;if(!((c[e>>2]|0)==(-1|0)&(c[e+4>>2]|0)==(-1|0))){i=f;return a|0}e=c[(c[h>>2]|0)-12>>2]|0;fz(k+e|0,c[k+(e+16)>>2]|4);i=f;return a|0}function gd(a){a=a|0;fA(a+8|0);mw(a);return}function ge(a){a=a|0;fA(a+8|0);return}function gf(a){a=a|0;var b=0,d=0;b=a;d=c[(c[a>>2]|0)-12>>2]|0;fA(b+(d+8)|0);mw(b+d|0);return}function gg(a){a=a|0;fA(a+((c[(c[a>>2]|0)-12>>2]|0)+8)|0);return}function gh(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0;d=i;i=i+8|0;e=d|0;f=b;g=c[(c[f>>2]|0)-12>>2]|0;h=b;if((c[h+(g+24)>>2]|0)==0){i=d;return b|0}j=e|0;a[j]=0;c[e+4>>2]=b;do{if((c[h+(g+16)>>2]|0)==0){k=c[h+(g+72)>>2]|0;if((k|0)!=0){gh(k)|0}a[j]=1;k=c[h+((c[(c[f>>2]|0)-12>>2]|0)+24)>>2]|0;if((cW[c[(c[k>>2]|0)+24>>2]&255](k)|0)!=-1){break}k=c[(c[f>>2]|0)-12>>2]|0;fz(h+k|0,c[h+(k+16)>>2]|1)}}while(0);gu(e);i=d;return b|0}function gi(a){a=a|0;fA(a+4|0);mw(a);return}function gj(a){a=a|0;fA(a+4|0);return}function gk(a){a=a|0;var b=0,d=0;b=a;d=c[(c[a>>2]|0)-12>>2]|0;fA(b+(d+4)|0);mw(b+d|0);return}function gl(a){a=a|0;fA(a+((c[(c[a>>2]|0)-12>>2]|0)+4)|0);return}function gm(a){a=a|0;var b=0,d=0,e=0;b=a+4|0;a=c[b>>2]|0;d=c[(c[a>>2]|0)-12>>2]|0;e=a;if((c[e+(d+24)>>2]|0)==0){return}if((c[e+(d+16)>>2]|0)!=0){return}if((c[e+(d+4)>>2]&8192|0)==0){return}if(bF()|0){return}d=c[b>>2]|0;e=c[d+((c[(c[d>>2]|0)-12>>2]|0)+24)>>2]|0;if((cW[c[(c[e>>2]|0)+24>>2]&255](e)|0)!=-1){return}e=c[b>>2]|0;b=c[(c[e>>2]|0)-12>>2]|0;d=e;fz(d+b|0,c[d+(b+16)>>2]|1);return}function gn(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;e=i;i=i+40|0;f=e|0;g=e+8|0;h=e+16|0;j=e+24|0;k=e+32|0;l=h|0;a[l]=0;c[h+4>>2]=b;m=b;n=c[(c[m>>2]|0)-12>>2]|0;o=b;do{if((c[o+(n+16)>>2]|0)==0){p=c[o+(n+72)>>2]|0;if((p|0)!=0){f8(p)|0}a[l]=1;j4(j,o+((c[(c[m>>2]|0)-12>>2]|0)+28)|0);p=j7(j,15352)|0;j5(j);q=c[(c[m>>2]|0)-12>>2]|0;r=c[o+(q+24)>>2]|0;s=o+(q+76)|0;t=c[s>>2]|0;if((t|0)==-1){j4(g,o+(q+28)|0);u=j7(g,15704)|0;v=cT[c[(c[u>>2]|0)+28>>2]&63](u,32)|0;j5(g);c[s>>2]=v<<24>>24;w=v}else{w=t&255}t=c[(c[p>>2]|0)+16>>2]|0;c[f>>2]=r;c1[t&63](k,p,f,o+q|0,w,d);if((c[k>>2]|0)!=0){break}q=c[(c[m>>2]|0)-12>>2]|0;fz(o+q|0,c[o+(q+16)>>2]|5)}}while(0);gm(h);i=e;return b|0}function go(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;e=i;i=i+40|0;f=e|0;g=e+8|0;h=e+16|0;j=e+24|0;k=e+32|0;l=h|0;a[l]=0;c[h+4>>2]=b;m=b;n=c[(c[m>>2]|0)-12>>2]|0;o=b;do{if((c[o+(n+16)>>2]|0)==0){p=c[o+(n+72)>>2]|0;if((p|0)!=0){f8(p)|0}a[l]=1;j4(j,o+((c[(c[m>>2]|0)-12>>2]|0)+28)|0);p=j7(j,15352)|0;j5(j);q=c[(c[m>>2]|0)-12>>2]|0;r=c[o+(q+24)>>2]|0;s=o+(q+76)|0;t=c[s>>2]|0;if((t|0)==-1){j4(g,o+(q+28)|0);u=j7(g,15704)|0;v=cT[c[(c[u>>2]|0)+28>>2]&63](u,32)|0;j5(g);c[s>>2]=v<<24>>24;w=v}else{w=t&255}t=c[(c[p>>2]|0)+24>>2]|0;c[f>>2]=r;c1[t&63](k,p,f,o+q|0,w,d);if((c[k>>2]|0)!=0){break}q=c[(c[m>>2]|0)-12>>2]|0;fz(o+q|0,c[o+(q+16)>>2]|5)}}while(0);gm(h);i=e;return b|0}function gp(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;e=i;i=i+8|0;f=e|0;g=f|0;a[g]=0;c[f+4>>2]=b;h=b;j=c[(c[h>>2]|0)-12>>2]|0;k=b;do{if((c[k+(j+16)>>2]|0)==0){l=c[k+(j+72)>>2]|0;if((l|0)!=0){f8(l)|0}a[g]=1;l=c[k+((c[(c[h>>2]|0)-12>>2]|0)+24)>>2]|0;m=l;if((l|0)==0){n=m}else{o=l+24|0;p=c[o>>2]|0;if((p|0)==(c[l+28>>2]|0)){q=cT[c[(c[l>>2]|0)+52>>2]&63](m,d&255)|0}else{c[o>>2]=p+1;a[p]=d;q=d&255}n=(q|0)==-1?0:m}if((n|0)!=0){break}m=c[(c[h>>2]|0)-12>>2]|0;fz(k+m|0,c[k+(m+16)>>2]|1)}}while(0);gm(f);i=e;return b|0}function gq(a){a=a|0;fA(a+4|0);mw(a);return}function gr(a){a=a|0;fA(a+4|0);return}function gs(a){a=a|0;var b=0,d=0;b=a;d=c[(c[a>>2]|0)-12>>2]|0;fA(b+(d+4)|0);mw(b+d|0);return}function gt(a){a=a|0;fA(a+((c[(c[a>>2]|0)-12>>2]|0)+4)|0);return}function gu(a){a=a|0;var b=0,d=0,e=0;b=a+4|0;a=c[b>>2]|0;d=c[(c[a>>2]|0)-12>>2]|0;e=a;if((c[e+(d+24)>>2]|0)==0){return}if((c[e+(d+16)>>2]|0)!=0){return}if((c[e+(d+4)>>2]&8192|0)==0){return}if(bF()|0){return}d=c[b>>2]|0;e=c[d+((c[(c[d>>2]|0)-12>>2]|0)+24)>>2]|0;if((cW[c[(c[e>>2]|0)+24>>2]&255](e)|0)!=-1){return}e=c[b>>2]|0;b=c[(c[e>>2]|0)-12>>2]|0;d=e;fz(d+b|0,c[d+(b+16)>>2]|1);return}function gv(a){a=a|0;return 2248}function gw(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)==1){ff(a,2624,35);return}else{e6(a,b|0,c);return}}function gx(a){a=a|0;e2(a|0);return}function gy(a){a=a|0;fa(a|0);mw(a);return}function gz(a){a=a|0;fa(a|0);return}function gA(a){a=a|0;fA(a);mw(a);return}function gB(a){a=a|0;e2(a|0);mw(a);return}function gC(a){a=a|0;eQ(a|0);mw(a);return}function gD(a){a=a|0;eQ(a|0);return}function gE(a){a=a|0;eQ(a|0);return}function gF(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0;L2806:do{if((e|0)==(f|0)){g=c}else{b=c;h=e;while(1){if((b|0)==(d|0)){i=-1;j=2562;break}k=a[b]|0;l=a[h]|0;if(k<<24>>24<l<<24>>24){i=-1;j=2564;break}if(l<<24>>24<k<<24>>24){i=1;j=2563;break}k=b+1|0;l=h+1|0;if((l|0)==(f|0)){g=k;break L2806}else{b=k;h=l}}if((j|0)==2562){return i|0}else if((j|0)==2563){return i|0}else if((j|0)==2564){return i|0}}}while(0);i=(g|0)!=(d|0)|0;return i|0}function gG(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0;d=e;g=f-d|0;if(g>>>0>4294967279>>>0){fd(b)}if(g>>>0<11>>>0){a[b]=g<<1&255;h=b+1|0}else{i=g+16&-16;j=mu(i)|0;c[b+8>>2]=j;c[b>>2]=i|1;c[b+4>>2]=g;h=j}if((e|0)==(f|0)){k=h;a[k]=0;return}j=f+(-d|0)|0;d=h;g=e;while(1){a[d]=a[g]|0;e=g+1|0;if((e|0)==(f|0)){break}else{d=d+1|0;g=e}}k=h+j|0;a[k]=0;return}function gH(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;if((c|0)==(d|0)){e=0;return e|0}else{f=c;g=0}while(1){c=(a[f]|0)+(g<<4)|0;b=c&-268435456;h=(b>>>24|b)^c;c=f+1|0;if((c|0)==(d|0)){e=h;break}else{f=c;g=h}}return e|0}function gI(a){a=a|0;eQ(a|0);mw(a);return}function gJ(a){a=a|0;eQ(a|0);return}function gK(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0;L2842:do{if((e|0)==(f|0)){g=b}else{a=b;h=e;while(1){if((a|0)==(d|0)){i=-1;j=2592;break}k=c[a>>2]|0;l=c[h>>2]|0;if((k|0)<(l|0)){i=-1;j=2591;break}if((l|0)<(k|0)){i=1;j=2594;break}k=a+4|0;l=h+4|0;if((l|0)==(f|0)){g=k;break L2842}else{a=k;h=l}}if((j|0)==2591){return i|0}else if((j|0)==2592){return i|0}else if((j|0)==2594){return i|0}}}while(0);i=(g|0)!=(d|0)|0;return i|0}function gL(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0;d=e;g=f-d|0;h=g>>2;if(h>>>0>1073741807>>>0){fd(b)}if(h>>>0<2>>>0){a[b]=g>>>1&255;i=b+4|0}else{g=h+4&-4;j=mu(g<<2)|0;c[b+8>>2]=j;c[b>>2]=g|1;c[b+4>>2]=h;i=j}if((e|0)==(f|0)){k=i;c[k>>2]=0;return}j=(f-4+(-d|0)|0)>>>2;d=i;h=e;while(1){c[d>>2]=c[h>>2];e=h+4|0;if((e|0)==(f|0)){break}else{d=d+4|0;h=e}}k=i+(j+1<<2)|0;c[k>>2]=0;return}function gM(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;if((b|0)==(d|0)){e=0;return e|0}else{f=b;g=0}while(1){b=(c[f>>2]|0)+(g<<4)|0;a=b&-268435456;h=(a>>>24|a)^b;b=f+4|0;if((b|0)==(d|0)){e=h;break}else{f=b;g=h}}return e|0}function gN(a){a=a|0;eQ(a|0);mw(a);return}function gO(a){a=a|0;eQ(a|0);return}function gP(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;k=i;i=i+112|0;l=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[l>>2];l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=k|0;m=k+16|0;n=k+32|0;o=k+40|0;p=k+48|0;q=k+56|0;r=k+64|0;s=k+72|0;t=k+80|0;u=k+104|0;if((c[g+4>>2]&1|0)==0){c[n>>2]=-1;v=c[(c[d>>2]|0)+16>>2]|0;w=e|0;c[p>>2]=c[w>>2];c[q>>2]=c[f>>2];cX[v&127](o,d,p,q,g,h,n);q=c[o>>2]|0;c[w>>2]=q;w=c[n>>2]|0;if((w|0)==1){a[j]=1}else if((w|0)==0){a[j]=0}else{a[j]=1;c[h>>2]=4}c[b>>2]=q;i=k;return}fB(r,g);q=r|0;r=c[q>>2]|0;if((c[3926]|0)!=-1){c[m>>2]=15704;c[m+4>>2]=14;c[m+8>>2]=0;fc(15704,m,116)}m=(c[3927]|0)-1|0;w=c[r+8>>2]|0;do{if((c[r+12>>2]|0)-w>>2>>>0>m>>>0){n=c[w+(m<<2)>>2]|0;if((n|0)==0){break}o=n;n=c[q>>2]|0;eS(n)|0;fB(s,g);n=s|0;p=c[n>>2]|0;if((c[3830]|0)!=-1){c[l>>2]=15320;c[l+4>>2]=14;c[l+8>>2]=0;fc(15320,l,116)}d=(c[3831]|0)-1|0;v=c[p+8>>2]|0;do{if((c[p+12>>2]|0)-v>>2>>>0>d>>>0){x=c[v+(d<<2)>>2]|0;if((x|0)==0){break}y=x;z=c[n>>2]|0;eS(z)|0;z=t|0;A=x;cS[c[(c[A>>2]|0)+24>>2]&127](z,y);cS[c[(c[A>>2]|0)+28>>2]&127](t+12|0,y);c[u>>2]=c[f>>2];a[j]=(gQ(e,u,z,t+24|0,o,h,1)|0)==(z|0)|0;c[b>>2]=c[e>>2];fh(t+12|0);fh(t|0);i=k;return}}while(0);o=cy(4)|0;l4(o);bK(o|0,10072,154)}}while(0);k=cy(4)|0;l4(k);bK(k|0,10072,154)}function gQ(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0;l=i;i=i+104|0;m=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[m>>2];m=(g-f|0)/12|0;n=l|0;do{if(m>>>0>100>>>0){o=mp(m)|0;if((o|0)!=0){p=o;q=o;break}mB();p=0;q=0}else{p=n;q=0}}while(0);n=(f|0)==(g|0);if(n){r=m;s=0}else{o=m;m=0;t=p;u=f;while(1){v=d[u]|0;if((v&1|0)==0){w=v>>>1}else{w=c[u+4>>2]|0}if((w|0)==0){a[t]=2;x=m+1|0;y=o-1|0}else{a[t]=1;x=m;y=o}v=u+12|0;if((v|0)==(g|0)){r=y;s=x;break}else{o=y;m=x;t=t+1|0;u=v}}}u=b|0;b=e|0;e=h;t=0;x=s;s=r;while(1){r=c[u>>2]|0;do{if((r|0)==0){z=0}else{if((c[r+12>>2]|0)!=(c[r+16>>2]|0)){z=r;break}if((cW[c[(c[r>>2]|0)+36>>2]&255](r)|0)==-1){c[u>>2]=0;z=0;break}else{z=c[u>>2]|0;break}}}while(0);r=(z|0)==0;m=c[b>>2]|0;if((m|0)==0){A=z;B=0}else{do{if((c[m+12>>2]|0)==(c[m+16>>2]|0)){if((cW[c[(c[m>>2]|0)+36>>2]&255](m)|0)!=-1){C=m;break}c[b>>2]=0;C=0}else{C=m}}while(0);A=c[u>>2]|0;B=C}D=(B|0)==0;if(!((r^D)&(s|0)!=0)){break}m=c[A+12>>2]|0;if((m|0)==(c[A+16>>2]|0)){E=(cW[c[(c[A>>2]|0)+36>>2]&255](A)|0)&255}else{E=a[m]|0}if(k){F=E}else{F=cT[c[(c[e>>2]|0)+12>>2]&63](h,E)|0}do{if(n){G=x;H=s}else{m=t+1|0;L2953:do{if(k){y=s;o=x;w=p;v=0;I=f;while(1){do{if((a[w]|0)==1){J=I;if((a[J]&1)==0){K=I+1|0}else{K=c[I+8>>2]|0}if(F<<24>>24!=(a[K+t|0]|0)){a[w]=0;L=v;M=o;N=y-1|0;break}O=d[J]|0;if((O&1|0)==0){P=O>>>1}else{P=c[I+4>>2]|0}if((P|0)!=(m|0)){L=1;M=o;N=y;break}a[w]=2;L=1;M=o+1|0;N=y-1|0}else{L=v;M=o;N=y}}while(0);O=I+12|0;if((O|0)==(g|0)){Q=N;R=M;S=L;break L2953}y=N;o=M;w=w+1|0;v=L;I=O}}else{I=s;v=x;w=p;o=0;y=f;while(1){do{if((a[w]|0)==1){O=y;if((a[O]&1)==0){T=y+1|0}else{T=c[y+8>>2]|0}if(F<<24>>24!=(cT[c[(c[e>>2]|0)+12>>2]&63](h,a[T+t|0]|0)|0)<<24>>24){a[w]=0;U=o;V=v;W=I-1|0;break}J=d[O]|0;if((J&1|0)==0){X=J>>>1}else{X=c[y+4>>2]|0}if((X|0)!=(m|0)){U=1;V=v;W=I;break}a[w]=2;U=1;V=v+1|0;W=I-1|0}else{U=o;V=v;W=I}}while(0);J=y+12|0;if((J|0)==(g|0)){Q=W;R=V;S=U;break L2953}I=W;v=V;w=w+1|0;o=U;y=J}}}while(0);if(!S){G=R;H=Q;break}m=c[u>>2]|0;y=m+12|0;o=c[y>>2]|0;if((o|0)==(c[m+16>>2]|0)){w=c[(c[m>>2]|0)+40>>2]|0;cW[w&255](m)|0}else{c[y>>2]=o+1}if((R+Q|0)>>>0<2>>>0|n){G=R;H=Q;break}o=t+1|0;y=R;m=p;w=f;while(1){do{if((a[m]|0)==2){v=d[w]|0;if((v&1|0)==0){Y=v>>>1}else{Y=c[w+4>>2]|0}if((Y|0)==(o|0)){Z=y;break}a[m]=0;Z=y-1|0}else{Z=y}}while(0);v=w+12|0;if((v|0)==(g|0)){G=Z;H=Q;break}else{y=Z;m=m+1|0;w=v}}}}while(0);t=t+1|0;x=G;s=H}do{if((A|0)==0){_=0}else{if((c[A+12>>2]|0)!=(c[A+16>>2]|0)){_=A;break}if((cW[c[(c[A>>2]|0)+36>>2]&255](A)|0)==-1){c[u>>2]=0;_=0;break}else{_=c[u>>2]|0;break}}}while(0);u=(_|0)==0;do{if(D){$=2737}else{if((c[B+12>>2]|0)!=(c[B+16>>2]|0)){if(u){break}else{$=2739;break}}if((cW[c[(c[B>>2]|0)+36>>2]&255](B)|0)==-1){c[b>>2]=0;$=2737;break}else{if(u^(B|0)==0){break}else{$=2739;break}}}}while(0);if(($|0)==2737){if(u){$=2739}}if(($|0)==2739){c[j>>2]=c[j>>2]|2}L3032:do{if(n){$=2744}else{u=f;B=p;while(1){if((a[B]|0)==2){aa=u;break L3032}b=u+12|0;if((b|0)==(g|0)){$=2744;break L3032}u=b;B=B+1|0}}}while(0);if(($|0)==2744){c[j>>2]=c[j>>2]|4;aa=g}if((q|0)==0){i=l;return aa|0}mq(q);i=l;return aa|0}function gR(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];gS(a,0,j,k,f,g,h);i=b;return}function gS(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0;e=i;i=i+72|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+32|0;n=e+40|0;o=e+56|0;p=o;q=i;i=i+4|0;i=i+7&-8;r=i;i=i+160|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;u=c[h+4>>2]&74;if((u|0)==0){v=0}else if((u|0)==8){v=16}else if((u|0)==64){v=8}else{v=10}u=l|0;hy(n,h,u,m);mF(p|0,0,12)|0;h=o;fj(o,10,0);if((a[p]&1)==0){l=h+1|0;w=l;x=l;y=o+8|0}else{l=o+8|0;w=c[l>>2]|0;x=h+1|0;y=l}c[q>>2]=w;l=r|0;c[s>>2]=l;c[t>>2]=0;h=f|0;f=g|0;g=o|0;z=o+4|0;A=a[m]|0;m=w;w=c[h>>2]|0;L3056:while(1){do{if((w|0)==0){B=0}else{if((c[w+12>>2]|0)!=(c[w+16>>2]|0)){B=w;break}if((cW[c[(c[w>>2]|0)+36>>2]&255](w)|0)!=-1){B=w;break}c[h>>2]=0;B=0}}while(0);C=(B|0)==0;D=c[f>>2]|0;do{if((D|0)==0){E=2772}else{if((c[D+12>>2]|0)!=(c[D+16>>2]|0)){if(C){F=D;G=0;break}else{H=m;I=D;J=0;break L3056}}if((cW[c[(c[D>>2]|0)+36>>2]&255](D)|0)==-1){c[f>>2]=0;E=2772;break}else{K=(D|0)==0;if(C^K){F=D;G=K;break}else{H=m;I=D;J=K;break L3056}}}}while(0);if((E|0)==2772){E=0;if(C){H=m;I=0;J=1;break}else{F=0;G=1}}D=d[p]|0;K=(D&1|0)==0;if(((c[q>>2]|0)-m|0)==((K?D>>>1:c[z>>2]|0)|0)){if(K){L=D>>>1;M=D>>>1}else{D=c[z>>2]|0;L=D;M=D}fj(o,L<<1,0);if((a[p]&1)==0){N=10}else{N=(c[g>>2]&-2)-1|0}fj(o,N,0);if((a[p]&1)==0){O=x}else{O=c[y>>2]|0}c[q>>2]=O+M;P=O}else{P=m}D=B+12|0;K=c[D>>2]|0;Q=B+16|0;if((K|0)==(c[Q>>2]|0)){R=(cW[c[(c[B>>2]|0)+36>>2]&255](B)|0)&255}else{R=a[K]|0}if((g8(R,v,P,q,t,A,n,l,s,u)|0)!=0){H=P;I=F;J=G;break}K=c[D>>2]|0;if((K|0)==(c[Q>>2]|0)){Q=c[(c[B>>2]|0)+40>>2]|0;cW[Q&255](B)|0;m=P;w=B;continue}else{c[D>>2]=K+1;m=P;w=B;continue}}w=d[n]|0;if((w&1|0)==0){S=w>>>1}else{S=c[n+4>>2]|0}do{if((S|0)!=0){w=c[s>>2]|0;if((w-r|0)>=160){break}P=c[t>>2]|0;c[s>>2]=w+4;c[w>>2]=P}}while(0);c[k>>2]=lK(H,c[q>>2]|0,j,v)|0;jt(n,l,c[s>>2]|0,j);do{if(C){T=0}else{if((c[B+12>>2]|0)!=(c[B+16>>2]|0)){T=B;break}if((cW[c[(c[B>>2]|0)+36>>2]&255](B)|0)!=-1){T=B;break}c[h>>2]=0;T=0}}while(0);h=(T|0)==0;L3116:do{if(J){E=2813}else{do{if((c[I+12>>2]|0)==(c[I+16>>2]|0)){if((cW[c[(c[I>>2]|0)+36>>2]&255](I)|0)!=-1){break}c[f>>2]=0;E=2813;break L3116}}while(0);if(!(h^(I|0)==0)){break}U=b|0;c[U>>2]=T;fh(o);fh(n);i=e;return}}while(0);do{if((E|0)==2813){if(h){break}U=b|0;c[U>>2]=T;fh(o);fh(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;U=b|0;c[U>>2]=T;fh(o);fh(n);i=e;return}function gT(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];gU(a,0,j,k,f,g,h);i=b;return}function gU(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0;e=i;i=i+72|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+32|0;n=e+40|0;o=e+56|0;p=o;q=i;i=i+4|0;i=i+7&-8;r=i;i=i+160|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;u=c[h+4>>2]&74;if((u|0)==0){v=0}else if((u|0)==64){v=8}else if((u|0)==8){v=16}else{v=10}u=l|0;hy(n,h,u,m);mF(p|0,0,12)|0;h=o;fj(o,10,0);if((a[p]&1)==0){l=h+1|0;w=l;x=l;y=o+8|0}else{l=o+8|0;w=c[l>>2]|0;x=h+1|0;y=l}c[q>>2]=w;l=r|0;c[s>>2]=l;c[t>>2]=0;h=f|0;f=g|0;g=o|0;z=o+4|0;A=a[m]|0;m=w;w=c[h>>2]|0;L3141:while(1){do{if((w|0)==0){B=0}else{if((c[w+12>>2]|0)!=(c[w+16>>2]|0)){B=w;break}if((cW[c[(c[w>>2]|0)+36>>2]&255](w)|0)!=-1){B=w;break}c[h>>2]=0;B=0}}while(0);C=(B|0)==0;D=c[f>>2]|0;do{if((D|0)==0){E=2841}else{if((c[D+12>>2]|0)!=(c[D+16>>2]|0)){if(C){F=D;G=0;break}else{H=m;I=D;J=0;break L3141}}if((cW[c[(c[D>>2]|0)+36>>2]&255](D)|0)==-1){c[f>>2]=0;E=2841;break}else{L=(D|0)==0;if(C^L){F=D;G=L;break}else{H=m;I=D;J=L;break L3141}}}}while(0);if((E|0)==2841){E=0;if(C){H=m;I=0;J=1;break}else{F=0;G=1}}D=d[p]|0;L=(D&1|0)==0;if(((c[q>>2]|0)-m|0)==((L?D>>>1:c[z>>2]|0)|0)){if(L){M=D>>>1;N=D>>>1}else{D=c[z>>2]|0;M=D;N=D}fj(o,M<<1,0);if((a[p]&1)==0){O=10}else{O=(c[g>>2]&-2)-1|0}fj(o,O,0);if((a[p]&1)==0){P=x}else{P=c[y>>2]|0}c[q>>2]=P+N;Q=P}else{Q=m}D=B+12|0;L=c[D>>2]|0;R=B+16|0;if((L|0)==(c[R>>2]|0)){S=(cW[c[(c[B>>2]|0)+36>>2]&255](B)|0)&255}else{S=a[L]|0}if((g8(S,v,Q,q,t,A,n,l,s,u)|0)!=0){H=Q;I=F;J=G;break}L=c[D>>2]|0;if((L|0)==(c[R>>2]|0)){R=c[(c[B>>2]|0)+40>>2]|0;cW[R&255](B)|0;m=Q;w=B;continue}else{c[D>>2]=L+1;m=Q;w=B;continue}}w=d[n]|0;if((w&1|0)==0){T=w>>>1}else{T=c[n+4>>2]|0}do{if((T|0)!=0){w=c[s>>2]|0;if((w-r|0)>=160){break}Q=c[t>>2]|0;c[s>>2]=w+4;c[w>>2]=Q}}while(0);t=lJ(H,c[q>>2]|0,j,v)|0;c[k>>2]=t;c[k+4>>2]=K;jt(n,l,c[s>>2]|0,j);do{if(C){U=0}else{if((c[B+12>>2]|0)!=(c[B+16>>2]|0)){U=B;break}if((cW[c[(c[B>>2]|0)+36>>2]&255](B)|0)!=-1){U=B;break}c[h>>2]=0;U=0}}while(0);h=(U|0)==0;L3201:do{if(J){E=2882}else{do{if((c[I+12>>2]|0)==(c[I+16>>2]|0)){if((cW[c[(c[I>>2]|0)+36>>2]&255](I)|0)!=-1){break}c[f>>2]=0;E=2882;break L3201}}while(0);if(!(h^(I|0)==0)){break}V=b|0;c[V>>2]=U;fh(o);fh(n);i=e;return}}while(0);do{if((E|0)==2882){if(h){break}V=b|0;c[V>>2]=U;fh(o);fh(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;V=b|0;c[V>>2]=U;fh(o);fh(n);i=e;return}function gV(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];gW(a,0,j,k,f,g,h);i=b;return}function gW(e,f,g,h,j,k,l){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0;f=i;i=i+72|0;m=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[m>>2];m=h;h=i;i=i+4|0;i=i+7&-8;c[h>>2]=c[m>>2];m=f|0;n=f+32|0;o=f+40|0;p=f+56|0;q=p;r=i;i=i+4|0;i=i+7&-8;s=i;i=i+160|0;t=i;i=i+4|0;i=i+7&-8;u=i;i=i+4|0;i=i+7&-8;v=c[j+4>>2]&74;if((v|0)==0){w=0}else if((v|0)==8){w=16}else if((v|0)==64){w=8}else{w=10}v=m|0;hy(o,j,v,n);mF(q|0,0,12)|0;j=p;fj(p,10,0);if((a[q]&1)==0){m=j+1|0;x=m;y=m;z=p+8|0}else{m=p+8|0;x=c[m>>2]|0;y=j+1|0;z=m}c[r>>2]=x;m=s|0;c[t>>2]=m;c[u>>2]=0;j=g|0;g=h|0;h=p|0;A=p+4|0;B=a[n]|0;n=x;x=c[j>>2]|0;L3226:while(1){do{if((x|0)==0){C=0}else{if((c[x+12>>2]|0)!=(c[x+16>>2]|0)){C=x;break}if((cW[c[(c[x>>2]|0)+36>>2]&255](x)|0)!=-1){C=x;break}c[j>>2]=0;C=0}}while(0);D=(C|0)==0;E=c[g>>2]|0;do{if((E|0)==0){F=2910}else{if((c[E+12>>2]|0)!=(c[E+16>>2]|0)){if(D){G=E;H=0;break}else{I=n;J=E;K=0;break L3226}}if((cW[c[(c[E>>2]|0)+36>>2]&255](E)|0)==-1){c[g>>2]=0;F=2910;break}else{L=(E|0)==0;if(D^L){G=E;H=L;break}else{I=n;J=E;K=L;break L3226}}}}while(0);if((F|0)==2910){F=0;if(D){I=n;J=0;K=1;break}else{G=0;H=1}}E=d[q]|0;L=(E&1|0)==0;if(((c[r>>2]|0)-n|0)==((L?E>>>1:c[A>>2]|0)|0)){if(L){M=E>>>1;N=E>>>1}else{E=c[A>>2]|0;M=E;N=E}fj(p,M<<1,0);if((a[q]&1)==0){O=10}else{O=(c[h>>2]&-2)-1|0}fj(p,O,0);if((a[q]&1)==0){P=y}else{P=c[z>>2]|0}c[r>>2]=P+N;Q=P}else{Q=n}E=C+12|0;L=c[E>>2]|0;R=C+16|0;if((L|0)==(c[R>>2]|0)){S=(cW[c[(c[C>>2]|0)+36>>2]&255](C)|0)&255}else{S=a[L]|0}if((g8(S,w,Q,r,u,B,o,m,t,v)|0)!=0){I=Q;J=G;K=H;break}L=c[E>>2]|0;if((L|0)==(c[R>>2]|0)){R=c[(c[C>>2]|0)+40>>2]|0;cW[R&255](C)|0;n=Q;x=C;continue}else{c[E>>2]=L+1;n=Q;x=C;continue}}x=d[o]|0;if((x&1|0)==0){T=x>>>1}else{T=c[o+4>>2]|0}do{if((T|0)!=0){x=c[t>>2]|0;if((x-s|0)>=160){break}Q=c[u>>2]|0;c[t>>2]=x+4;c[x>>2]=Q}}while(0);b[l>>1]=lI(I,c[r>>2]|0,k,w)|0;jt(o,m,c[t>>2]|0,k);do{if(D){U=0}else{if((c[C+12>>2]|0)!=(c[C+16>>2]|0)){U=C;break}if((cW[c[(c[C>>2]|0)+36>>2]&255](C)|0)!=-1){U=C;break}c[j>>2]=0;U=0}}while(0);j=(U|0)==0;L3286:do{if(K){F=2951}else{do{if((c[J+12>>2]|0)==(c[J+16>>2]|0)){if((cW[c[(c[J>>2]|0)+36>>2]&255](J)|0)!=-1){break}c[g>>2]=0;F=2951;break L3286}}while(0);if(!(j^(J|0)==0)){break}V=e|0;c[V>>2]=U;fh(p);fh(o);i=f;return}}while(0);do{if((F|0)==2951){if(j){break}V=e|0;c[V>>2]=U;fh(p);fh(o);i=f;return}}while(0);c[k>>2]=c[k>>2]|2;V=e|0;c[V>>2]=U;fh(p);fh(o);i=f;return}function gX(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];gY(a,0,j,k,f,g,h);i=b;return}function gY(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0;e=i;i=i+72|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+32|0;n=e+40|0;o=e+56|0;p=o;q=i;i=i+4|0;i=i+7&-8;r=i;i=i+160|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;u=c[h+4>>2]&74;if((u|0)==0){v=0}else if((u|0)==64){v=8}else if((u|0)==8){v=16}else{v=10}u=l|0;hy(n,h,u,m);mF(p|0,0,12)|0;h=o;fj(o,10,0);if((a[p]&1)==0){l=h+1|0;w=l;x=l;y=o+8|0}else{l=o+8|0;w=c[l>>2]|0;x=h+1|0;y=l}c[q>>2]=w;l=r|0;c[s>>2]=l;c[t>>2]=0;h=f|0;f=g|0;g=o|0;z=o+4|0;A=a[m]|0;m=w;w=c[h>>2]|0;L3311:while(1){do{if((w|0)==0){B=0}else{if((c[w+12>>2]|0)!=(c[w+16>>2]|0)){B=w;break}if((cW[c[(c[w>>2]|0)+36>>2]&255](w)|0)!=-1){B=w;break}c[h>>2]=0;B=0}}while(0);C=(B|0)==0;D=c[f>>2]|0;do{if((D|0)==0){E=2979}else{if((c[D+12>>2]|0)!=(c[D+16>>2]|0)){if(C){F=D;G=0;break}else{H=m;I=D;J=0;break L3311}}if((cW[c[(c[D>>2]|0)+36>>2]&255](D)|0)==-1){c[f>>2]=0;E=2979;break}else{K=(D|0)==0;if(C^K){F=D;G=K;break}else{H=m;I=D;J=K;break L3311}}}}while(0);if((E|0)==2979){E=0;if(C){H=m;I=0;J=1;break}else{F=0;G=1}}D=d[p]|0;K=(D&1|0)==0;if(((c[q>>2]|0)-m|0)==((K?D>>>1:c[z>>2]|0)|0)){if(K){L=D>>>1;M=D>>>1}else{D=c[z>>2]|0;L=D;M=D}fj(o,L<<1,0);if((a[p]&1)==0){N=10}else{N=(c[g>>2]&-2)-1|0}fj(o,N,0);if((a[p]&1)==0){O=x}else{O=c[y>>2]|0}c[q>>2]=O+M;P=O}else{P=m}D=B+12|0;K=c[D>>2]|0;Q=B+16|0;if((K|0)==(c[Q>>2]|0)){R=(cW[c[(c[B>>2]|0)+36>>2]&255](B)|0)&255}else{R=a[K]|0}if((g8(R,v,P,q,t,A,n,l,s,u)|0)!=0){H=P;I=F;J=G;break}K=c[D>>2]|0;if((K|0)==(c[Q>>2]|0)){Q=c[(c[B>>2]|0)+40>>2]|0;cW[Q&255](B)|0;m=P;w=B;continue}else{c[D>>2]=K+1;m=P;w=B;continue}}w=d[n]|0;if((w&1|0)==0){S=w>>>1}else{S=c[n+4>>2]|0}do{if((S|0)!=0){w=c[s>>2]|0;if((w-r|0)>=160){break}P=c[t>>2]|0;c[s>>2]=w+4;c[w>>2]=P}}while(0);c[k>>2]=lH(H,c[q>>2]|0,j,v)|0;jt(n,l,c[s>>2]|0,j);do{if(C){T=0}else{if((c[B+12>>2]|0)!=(c[B+16>>2]|0)){T=B;break}if((cW[c[(c[B>>2]|0)+36>>2]&255](B)|0)!=-1){T=B;break}c[h>>2]=0;T=0}}while(0);h=(T|0)==0;L3371:do{if(J){E=3020}else{do{if((c[I+12>>2]|0)==(c[I+16>>2]|0)){if((cW[c[(c[I>>2]|0)+36>>2]&255](I)|0)!=-1){break}c[f>>2]=0;E=3020;break L3371}}while(0);if(!(h^(I|0)==0)){break}U=b|0;c[U>>2]=T;fh(o);fh(n);i=e;return}}while(0);do{if((E|0)==3020){if(h){break}U=b|0;c[U>>2]=T;fh(o);fh(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;U=b|0;c[U>>2]=T;fh(o);fh(n);i=e;return}function gZ(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];g_(a,0,j,k,f,g,h);i=b;return}function g_(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0;e=i;i=i+72|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+32|0;n=e+40|0;o=e+56|0;p=o;q=i;i=i+4|0;i=i+7&-8;r=i;i=i+160|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;u=c[h+4>>2]&74;if((u|0)==0){v=0}else if((u|0)==8){v=16}else if((u|0)==64){v=8}else{v=10}u=l|0;hy(n,h,u,m);mF(p|0,0,12)|0;h=o;fj(o,10,0);if((a[p]&1)==0){l=h+1|0;w=l;x=l;y=o+8|0}else{l=o+8|0;w=c[l>>2]|0;x=h+1|0;y=l}c[q>>2]=w;l=r|0;c[s>>2]=l;c[t>>2]=0;h=f|0;f=g|0;g=o|0;z=o+4|0;A=a[m]|0;m=w;w=c[h>>2]|0;L3396:while(1){do{if((w|0)==0){B=0}else{if((c[w+12>>2]|0)!=(c[w+16>>2]|0)){B=w;break}if((cW[c[(c[w>>2]|0)+36>>2]&255](w)|0)!=-1){B=w;break}c[h>>2]=0;B=0}}while(0);C=(B|0)==0;D=c[f>>2]|0;do{if((D|0)==0){E=3048}else{if((c[D+12>>2]|0)!=(c[D+16>>2]|0)){if(C){F=D;G=0;break}else{H=m;I=D;J=0;break L3396}}if((cW[c[(c[D>>2]|0)+36>>2]&255](D)|0)==-1){c[f>>2]=0;E=3048;break}else{K=(D|0)==0;if(C^K){F=D;G=K;break}else{H=m;I=D;J=K;break L3396}}}}while(0);if((E|0)==3048){E=0;if(C){H=m;I=0;J=1;break}else{F=0;G=1}}D=d[p]|0;K=(D&1|0)==0;if(((c[q>>2]|0)-m|0)==((K?D>>>1:c[z>>2]|0)|0)){if(K){L=D>>>1;M=D>>>1}else{D=c[z>>2]|0;L=D;M=D}fj(o,L<<1,0);if((a[p]&1)==0){N=10}else{N=(c[g>>2]&-2)-1|0}fj(o,N,0);if((a[p]&1)==0){O=x}else{O=c[y>>2]|0}c[q>>2]=O+M;P=O}else{P=m}D=B+12|0;K=c[D>>2]|0;Q=B+16|0;if((K|0)==(c[Q>>2]|0)){R=(cW[c[(c[B>>2]|0)+36>>2]&255](B)|0)&255}else{R=a[K]|0}if((g8(R,v,P,q,t,A,n,l,s,u)|0)!=0){H=P;I=F;J=G;break}K=c[D>>2]|0;if((K|0)==(c[Q>>2]|0)){Q=c[(c[B>>2]|0)+40>>2]|0;cW[Q&255](B)|0;m=P;w=B;continue}else{c[D>>2]=K+1;m=P;w=B;continue}}w=d[n]|0;if((w&1|0)==0){S=w>>>1}else{S=c[n+4>>2]|0}do{if((S|0)!=0){w=c[s>>2]|0;if((w-r|0)>=160){break}P=c[t>>2]|0;c[s>>2]=w+4;c[w>>2]=P}}while(0);c[k>>2]=lG(H,c[q>>2]|0,j,v)|0;jt(n,l,c[s>>2]|0,j);do{if(C){T=0}else{if((c[B+12>>2]|0)!=(c[B+16>>2]|0)){T=B;break}if((cW[c[(c[B>>2]|0)+36>>2]&255](B)|0)!=-1){T=B;break}c[h>>2]=0;T=0}}while(0);h=(T|0)==0;L3456:do{if(J){E=3089}else{do{if((c[I+12>>2]|0)==(c[I+16>>2]|0)){if((cW[c[(c[I>>2]|0)+36>>2]&255](I)|0)!=-1){break}c[f>>2]=0;E=3089;break L3456}}while(0);if(!(h^(I|0)==0)){break}U=b|0;c[U>>2]=T;fh(o);fh(n);i=e;return}}while(0);do{if((E|0)==3089){if(h){break}U=b|0;c[U>>2]=T;fh(o);fh(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;U=b|0;c[U>>2]=T;fh(o);fh(n);i=e;return}function g$(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];g0(a,0,j,k,f,g,h);i=b;return}function g0(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0;e=i;i=i+72|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+32|0;n=e+40|0;o=e+56|0;p=o;q=i;i=i+4|0;i=i+7&-8;r=i;i=i+160|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;u=c[h+4>>2]&74;if((u|0)==0){v=0}else if((u|0)==64){v=8}else if((u|0)==8){v=16}else{v=10}u=l|0;hy(n,h,u,m);mF(p|0,0,12)|0;h=o;fj(o,10,0);if((a[p]&1)==0){l=h+1|0;w=l;x=l;y=o+8|0}else{l=o+8|0;w=c[l>>2]|0;x=h+1|0;y=l}c[q>>2]=w;l=r|0;c[s>>2]=l;c[t>>2]=0;h=f|0;f=g|0;g=o|0;z=o+4|0;A=a[m]|0;m=w;w=c[h>>2]|0;L3481:while(1){do{if((w|0)==0){B=0}else{if((c[w+12>>2]|0)!=(c[w+16>>2]|0)){B=w;break}if((cW[c[(c[w>>2]|0)+36>>2]&255](w)|0)!=-1){B=w;break}c[h>>2]=0;B=0}}while(0);C=(B|0)==0;D=c[f>>2]|0;do{if((D|0)==0){E=3117}else{if((c[D+12>>2]|0)!=(c[D+16>>2]|0)){if(C){F=D;G=0;break}else{H=m;I=D;J=0;break L3481}}if((cW[c[(c[D>>2]|0)+36>>2]&255](D)|0)==-1){c[f>>2]=0;E=3117;break}else{L=(D|0)==0;if(C^L){F=D;G=L;break}else{H=m;I=D;J=L;break L3481}}}}while(0);if((E|0)==3117){E=0;if(C){H=m;I=0;J=1;break}else{F=0;G=1}}D=d[p]|0;L=(D&1|0)==0;if(((c[q>>2]|0)-m|0)==((L?D>>>1:c[z>>2]|0)|0)){if(L){M=D>>>1;N=D>>>1}else{D=c[z>>2]|0;M=D;N=D}fj(o,M<<1,0);if((a[p]&1)==0){O=10}else{O=(c[g>>2]&-2)-1|0}fj(o,O,0);if((a[p]&1)==0){P=x}else{P=c[y>>2]|0}c[q>>2]=P+N;Q=P}else{Q=m}D=B+12|0;L=c[D>>2]|0;R=B+16|0;if((L|0)==(c[R>>2]|0)){S=(cW[c[(c[B>>2]|0)+36>>2]&255](B)|0)&255}else{S=a[L]|0}if((g8(S,v,Q,q,t,A,n,l,s,u)|0)!=0){H=Q;I=F;J=G;break}L=c[D>>2]|0;if((L|0)==(c[R>>2]|0)){R=c[(c[B>>2]|0)+40>>2]|0;cW[R&255](B)|0;m=Q;w=B;continue}else{c[D>>2]=L+1;m=Q;w=B;continue}}w=d[n]|0;if((w&1|0)==0){T=w>>>1}else{T=c[n+4>>2]|0}do{if((T|0)!=0){w=c[s>>2]|0;if((w-r|0)>=160){break}Q=c[t>>2]|0;c[s>>2]=w+4;c[w>>2]=Q}}while(0);t=lF(H,c[q>>2]|0,j,v)|0;c[k>>2]=t;c[k+4>>2]=K;jt(n,l,c[s>>2]|0,j);do{if(C){U=0}else{if((c[B+12>>2]|0)!=(c[B+16>>2]|0)){U=B;break}if((cW[c[(c[B>>2]|0)+36>>2]&255](B)|0)!=-1){U=B;break}c[h>>2]=0;U=0}}while(0);h=(U|0)==0;L3541:do{if(J){E=3158}else{do{if((c[I+12>>2]|0)==(c[I+16>>2]|0)){if((cW[c[(c[I>>2]|0)+36>>2]&255](I)|0)!=-1){break}c[f>>2]=0;E=3158;break L3541}}while(0);if(!(h^(I|0)==0)){break}V=b|0;c[V>>2]=U;fh(o);fh(n);i=e;return}}while(0);do{if((E|0)==3158){if(h){break}V=b|0;c[V>>2]=U;fh(o);fh(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;V=b|0;c[V>>2]=U;fh(o);fh(n);i=e;return}function g1(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];g2(a,0,j,k,f,g,h);i=b;return}function g2(b,e,f,h,j,k,l){b=b|0;e=e|0;f=f|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0;e=i;i=i+80|0;m=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[m>>2];m=h;h=i;i=i+4|0;i=i+7&-8;c[h>>2]=c[m>>2];m=e+32|0;n=e+40|0;o=e+48|0;p=e+64|0;q=p;r=i;i=i+4|0;i=i+7&-8;s=i;i=i+160|0;t=i;i=i+4|0;i=i+7&-8;u=i;i=i+4|0;i=i+7&-8;v=i;i=i+1|0;i=i+7&-8;w=i;i=i+1|0;i=i+7&-8;x=e|0;hz(o,j,x,m,n);mF(q|0,0,12)|0;j=p;fj(p,10,0);if((a[q]&1)==0){y=j+1|0;z=y;A=y;B=p+8|0}else{y=p+8|0;z=c[y>>2]|0;A=j+1|0;B=y}c[r>>2]=z;y=s|0;c[t>>2]=y;c[u>>2]=0;a[v]=1;a[w]=69;j=f|0;f=h|0;h=p|0;C=p+4|0;D=a[m]|0;m=a[n]|0;n=z;z=c[j>>2]|0;L3561:while(1){do{if((z|0)==0){E=0}else{if((c[z+12>>2]|0)!=(c[z+16>>2]|0)){E=z;break}if((cW[c[(c[z>>2]|0)+36>>2]&255](z)|0)!=-1){E=z;break}c[j>>2]=0;E=0}}while(0);F=(E|0)==0;G=c[f>>2]|0;do{if((G|0)==0){H=3182}else{if((c[G+12>>2]|0)!=(c[G+16>>2]|0)){if(F){I=G;J=0;break}else{K=n;L=G;M=0;break L3561}}if((cW[c[(c[G>>2]|0)+36>>2]&255](G)|0)==-1){c[f>>2]=0;H=3182;break}else{N=(G|0)==0;if(F^N){I=G;J=N;break}else{K=n;L=G;M=N;break L3561}}}}while(0);if((H|0)==3182){H=0;if(F){K=n;L=0;M=1;break}else{I=0;J=1}}G=d[q]|0;N=(G&1|0)==0;if(((c[r>>2]|0)-n|0)==((N?G>>>1:c[C>>2]|0)|0)){if(N){O=G>>>1;P=G>>>1}else{G=c[C>>2]|0;O=G;P=G}fj(p,O<<1,0);if((a[q]&1)==0){Q=10}else{Q=(c[h>>2]&-2)-1|0}fj(p,Q,0);if((a[q]&1)==0){R=A}else{R=c[B>>2]|0}c[r>>2]=R+P;S=R}else{S=n}G=E+12|0;N=c[G>>2]|0;T=E+16|0;if((N|0)==(c[T>>2]|0)){U=(cW[c[(c[E>>2]|0)+36>>2]&255](E)|0)&255}else{U=a[N]|0}if((hA(U,v,w,S,r,D,m,o,y,t,u,x)|0)!=0){K=S;L=I;M=J;break}N=c[G>>2]|0;if((N|0)==(c[T>>2]|0)){T=c[(c[E>>2]|0)+40>>2]|0;cW[T&255](E)|0;n=S;z=E;continue}else{c[G>>2]=N+1;n=S;z=E;continue}}z=d[o]|0;if((z&1|0)==0){V=z>>>1}else{V=c[o+4>>2]|0}do{if((V|0)!=0){if((a[v]&1)==0){break}z=c[t>>2]|0;if((z-s|0)>=160){break}S=c[u>>2]|0;c[t>>2]=z+4;c[z>>2]=S}}while(0);g[l>>2]=+lE(K,c[r>>2]|0,k);jt(o,y,c[t>>2]|0,k);do{if(F){W=0}else{if((c[E+12>>2]|0)!=(c[E+16>>2]|0)){W=E;break}if((cW[c[(c[E>>2]|0)+36>>2]&255](E)|0)!=-1){W=E;break}c[j>>2]=0;W=0}}while(0);j=(W|0)==0;L3622:do{if(M){H=3224}else{do{if((c[L+12>>2]|0)==(c[L+16>>2]|0)){if((cW[c[(c[L>>2]|0)+36>>2]&255](L)|0)!=-1){break}c[f>>2]=0;H=3224;break L3622}}while(0);if(!(j^(L|0)==0)){break}X=b|0;c[X>>2]=W;fh(p);fh(o);i=e;return}}while(0);do{if((H|0)==3224){if(j){break}X=b|0;c[X>>2]=W;fh(p);fh(o);i=e;return}}while(0);c[k>>2]=c[k>>2]|2;X=b|0;c[X>>2]=W;fh(p);fh(o);i=e;return}function g3(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];g4(a,0,j,k,f,g,h);i=b;return}function g4(b,e,f,g,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0;e=i;i=i+80|0;m=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[m>>2];m=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[m>>2];m=e+32|0;n=e+40|0;o=e+48|0;p=e+64|0;q=p;r=i;i=i+4|0;i=i+7&-8;s=i;i=i+160|0;t=i;i=i+4|0;i=i+7&-8;u=i;i=i+4|0;i=i+7&-8;v=i;i=i+1|0;i=i+7&-8;w=i;i=i+1|0;i=i+7&-8;x=e|0;hz(o,j,x,m,n);mF(q|0,0,12)|0;j=p;fj(p,10,0);if((a[q]&1)==0){y=j+1|0;z=y;A=y;B=p+8|0}else{y=p+8|0;z=c[y>>2]|0;A=j+1|0;B=y}c[r>>2]=z;y=s|0;c[t>>2]=y;c[u>>2]=0;a[v]=1;a[w]=69;j=f|0;f=g|0;g=p|0;C=p+4|0;D=a[m]|0;m=a[n]|0;n=z;z=c[j>>2]|0;L3642:while(1){do{if((z|0)==0){E=0}else{if((c[z+12>>2]|0)!=(c[z+16>>2]|0)){E=z;break}if((cW[c[(c[z>>2]|0)+36>>2]&255](z)|0)!=-1){E=z;break}c[j>>2]=0;E=0}}while(0);F=(E|0)==0;G=c[f>>2]|0;do{if((G|0)==0){H=3248}else{if((c[G+12>>2]|0)!=(c[G+16>>2]|0)){if(F){I=G;J=0;break}else{K=n;L=G;M=0;break L3642}}if((cW[c[(c[G>>2]|0)+36>>2]&255](G)|0)==-1){c[f>>2]=0;H=3248;break}else{N=(G|0)==0;if(F^N){I=G;J=N;break}else{K=n;L=G;M=N;break L3642}}}}while(0);if((H|0)==3248){H=0;if(F){K=n;L=0;M=1;break}else{I=0;J=1}}G=d[q]|0;N=(G&1|0)==0;if(((c[r>>2]|0)-n|0)==((N?G>>>1:c[C>>2]|0)|0)){if(N){O=G>>>1;P=G>>>1}else{G=c[C>>2]|0;O=G;P=G}fj(p,O<<1,0);if((a[q]&1)==0){Q=10}else{Q=(c[g>>2]&-2)-1|0}fj(p,Q,0);if((a[q]&1)==0){R=A}else{R=c[B>>2]|0}c[r>>2]=R+P;S=R}else{S=n}G=E+12|0;N=c[G>>2]|0;T=E+16|0;if((N|0)==(c[T>>2]|0)){U=(cW[c[(c[E>>2]|0)+36>>2]&255](E)|0)&255}else{U=a[N]|0}if((hA(U,v,w,S,r,D,m,o,y,t,u,x)|0)!=0){K=S;L=I;M=J;break}N=c[G>>2]|0;if((N|0)==(c[T>>2]|0)){T=c[(c[E>>2]|0)+40>>2]|0;cW[T&255](E)|0;n=S;z=E;continue}else{c[G>>2]=N+1;n=S;z=E;continue}}z=d[o]|0;if((z&1|0)==0){V=z>>>1}else{V=c[o+4>>2]|0}do{if((V|0)!=0){if((a[v]&1)==0){break}z=c[t>>2]|0;if((z-s|0)>=160){break}S=c[u>>2]|0;c[t>>2]=z+4;c[z>>2]=S}}while(0);h[l>>3]=+lD(K,c[r>>2]|0,k);jt(o,y,c[t>>2]|0,k);do{if(F){W=0}else{if((c[E+12>>2]|0)!=(c[E+16>>2]|0)){W=E;break}if((cW[c[(c[E>>2]|0)+36>>2]&255](E)|0)!=-1){W=E;break}c[j>>2]=0;W=0}}while(0);j=(W|0)==0;L3703:do{if(M){H=3290}else{do{if((c[L+12>>2]|0)==(c[L+16>>2]|0)){if((cW[c[(c[L>>2]|0)+36>>2]&255](L)|0)!=-1){break}c[f>>2]=0;H=3290;break L3703}}while(0);if(!(j^(L|0)==0)){break}X=b|0;c[X>>2]=W;fh(p);fh(o);i=e;return}}while(0);do{if((H|0)==3290){if(j){break}X=b|0;c[X>>2]=W;fh(p);fh(o);i=e;return}}while(0);c[k>>2]=c[k>>2]|2;X=b|0;c[X>>2]=W;fh(p);fh(o);i=e;return}function g5(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];g6(a,0,j,k,f,g,h);i=b;return}function g6(b,e,f,g,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0;e=i;i=i+80|0;m=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[m>>2];m=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[m>>2];m=e+32|0;n=e+40|0;o=e+48|0;p=e+64|0;q=p;r=i;i=i+4|0;i=i+7&-8;s=i;i=i+160|0;t=i;i=i+4|0;i=i+7&-8;u=i;i=i+4|0;i=i+7&-8;v=i;i=i+1|0;i=i+7&-8;w=i;i=i+1|0;i=i+7&-8;x=e|0;hz(o,j,x,m,n);mF(q|0,0,12)|0;j=p;fj(p,10,0);if((a[q]&1)==0){y=j+1|0;z=y;A=y;B=p+8|0}else{y=p+8|0;z=c[y>>2]|0;A=j+1|0;B=y}c[r>>2]=z;y=s|0;c[t>>2]=y;c[u>>2]=0;a[v]=1;a[w]=69;j=f|0;f=g|0;g=p|0;C=p+4|0;D=a[m]|0;m=a[n]|0;n=z;z=c[j>>2]|0;L3723:while(1){do{if((z|0)==0){E=0}else{if((c[z+12>>2]|0)!=(c[z+16>>2]|0)){E=z;break}if((cW[c[(c[z>>2]|0)+36>>2]&255](z)|0)!=-1){E=z;break}c[j>>2]=0;E=0}}while(0);F=(E|0)==0;G=c[f>>2]|0;do{if((G|0)==0){H=3314}else{if((c[G+12>>2]|0)!=(c[G+16>>2]|0)){if(F){I=G;J=0;break}else{K=n;L=G;M=0;break L3723}}if((cW[c[(c[G>>2]|0)+36>>2]&255](G)|0)==-1){c[f>>2]=0;H=3314;break}else{N=(G|0)==0;if(F^N){I=G;J=N;break}else{K=n;L=G;M=N;break L3723}}}}while(0);if((H|0)==3314){H=0;if(F){K=n;L=0;M=1;break}else{I=0;J=1}}G=d[q]|0;N=(G&1|0)==0;if(((c[r>>2]|0)-n|0)==((N?G>>>1:c[C>>2]|0)|0)){if(N){O=G>>>1;P=G>>>1}else{G=c[C>>2]|0;O=G;P=G}fj(p,O<<1,0);if((a[q]&1)==0){Q=10}else{Q=(c[g>>2]&-2)-1|0}fj(p,Q,0);if((a[q]&1)==0){R=A}else{R=c[B>>2]|0}c[r>>2]=R+P;S=R}else{S=n}G=E+12|0;N=c[G>>2]|0;T=E+16|0;if((N|0)==(c[T>>2]|0)){U=(cW[c[(c[E>>2]|0)+36>>2]&255](E)|0)&255}else{U=a[N]|0}if((hA(U,v,w,S,r,D,m,o,y,t,u,x)|0)!=0){K=S;L=I;M=J;break}N=c[G>>2]|0;if((N|0)==(c[T>>2]|0)){T=c[(c[E>>2]|0)+40>>2]|0;cW[T&255](E)|0;n=S;z=E;continue}else{c[G>>2]=N+1;n=S;z=E;continue}}z=d[o]|0;if((z&1|0)==0){V=z>>>1}else{V=c[o+4>>2]|0}do{if((V|0)!=0){if((a[v]&1)==0){break}z=c[t>>2]|0;if((z-s|0)>=160){break}S=c[u>>2]|0;c[t>>2]=z+4;c[z>>2]=S}}while(0);h[l>>3]=+lC(K,c[r>>2]|0,k);jt(o,y,c[t>>2]|0,k);do{if(F){W=0}else{if((c[E+12>>2]|0)!=(c[E+16>>2]|0)){W=E;break}if((cW[c[(c[E>>2]|0)+36>>2]&255](E)|0)!=-1){W=E;break}c[j>>2]=0;W=0}}while(0);j=(W|0)==0;L3784:do{if(M){H=3356}else{do{if((c[L+12>>2]|0)==(c[L+16>>2]|0)){if((cW[c[(c[L>>2]|0)+36>>2]&255](L)|0)!=-1){break}c[f>>2]=0;H=3356;break L3784}}while(0);if(!(j^(L|0)==0)){break}X=b|0;c[X>>2]=W;fh(p);fh(o);i=e;return}}while(0);do{if((H|0)==3356){if(j){break}X=b|0;c[X>>2]=W;fh(p);fh(o);i=e;return}}while(0);c[k>>2]=c[k>>2]|2;X=b|0;c[X>>2]=W;fh(p);fh(o);i=e;return}function g7(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0;e=i;i=i+64|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+16|0;n=e+48|0;o=n;p=i;i=i+4|0;i=i+7&-8;q=i;i=i+12|0;i=i+7&-8;r=i;i=i+4|0;i=i+7&-8;s=i;i=i+160|0;t=i;i=i+4|0;i=i+7&-8;u=i;i=i+4|0;i=i+7&-8;mF(o|0,0,12)|0;o=q;fB(p,h);h=p|0;p=c[h>>2]|0;if((c[3926]|0)!=-1){c[l>>2]=15704;c[l+4>>2]=14;c[l+8>>2]=0;fc(15704,l,116)}l=(c[3927]|0)-1|0;v=c[p+8>>2]|0;do{if((c[p+12>>2]|0)-v>>2>>>0>l>>>0){w=c[v+(l<<2)>>2]|0;if((w|0)==0){break}x=w;y=m|0;z=c[(c[w>>2]|0)+32>>2]|0;c2[z&15](x,11808,11834,y)|0;x=c[h>>2]|0;eS(x)|0;mF(o|0,0,12)|0;x=q;fj(q,10,0);if((a[o]&1)==0){z=x+1|0;A=z;B=z;C=q+8|0}else{z=q+8|0;A=c[z>>2]|0;B=x+1|0;C=z}c[r>>2]=A;z=s|0;c[t>>2]=z;c[u>>2]=0;x=f|0;w=g|0;D=q|0;E=q+4|0;F=A;G=c[x>>2]|0;L3811:while(1){do{if((G|0)==0){H=0}else{if((c[G+12>>2]|0)!=(c[G+16>>2]|0)){H=G;break}if((cW[c[(c[G>>2]|0)+36>>2]&255](G)|0)!=-1){H=G;break}c[x>>2]=0;H=0}}while(0);I=(H|0)==0;J=c[w>>2]|0;do{if((J|0)==0){K=3387}else{if((c[J+12>>2]|0)!=(c[J+16>>2]|0)){if(I){break}else{L=F;break L3811}}if((cW[c[(c[J>>2]|0)+36>>2]&255](J)|0)==-1){c[w>>2]=0;K=3387;break}else{if(I^(J|0)==0){break}else{L=F;break L3811}}}}while(0);if((K|0)==3387){K=0;if(I){L=F;break}}J=d[o]|0;M=(J&1|0)==0;if(((c[r>>2]|0)-F|0)==((M?J>>>1:c[E>>2]|0)|0)){if(M){N=J>>>1;O=J>>>1}else{J=c[E>>2]|0;N=J;O=J}fj(q,N<<1,0);if((a[o]&1)==0){P=10}else{P=(c[D>>2]&-2)-1|0}fj(q,P,0);if((a[o]&1)==0){Q=B}else{Q=c[C>>2]|0}c[r>>2]=Q+O;R=Q}else{R=F}J=H+12|0;M=c[J>>2]|0;S=H+16|0;if((M|0)==(c[S>>2]|0)){T=(cW[c[(c[H>>2]|0)+36>>2]&255](H)|0)&255}else{T=a[M]|0}if((g8(T,16,R,r,u,0,n,z,t,y)|0)!=0){L=R;break}M=c[J>>2]|0;if((M|0)==(c[S>>2]|0)){S=c[(c[H>>2]|0)+40>>2]|0;cW[S&255](H)|0;F=R;G=H;continue}else{c[J>>2]=M+1;F=R;G=H;continue}}a[L+3|0]=0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);G=g9(L,c[3568]|0,1624,(F=i,i=i+8|0,c[F>>2]=k,F)|0)|0;i=F;if((G|0)!=1){c[j>>2]=4}G=c[x>>2]|0;do{if((G|0)==0){U=0}else{if((c[G+12>>2]|0)!=(c[G+16>>2]|0)){U=G;break}if((cW[c[(c[G>>2]|0)+36>>2]&255](G)|0)!=-1){U=G;break}c[x>>2]=0;U=0}}while(0);x=(U|0)==0;G=c[w>>2]|0;do{if((G|0)==0){K=3432}else{if((c[G+12>>2]|0)!=(c[G+16>>2]|0)){if(!x){break}V=b|0;c[V>>2]=U;fh(q);fh(n);i=e;return}if((cW[c[(c[G>>2]|0)+36>>2]&255](G)|0)==-1){c[w>>2]=0;K=3432;break}if(!(x^(G|0)==0)){break}V=b|0;c[V>>2]=U;fh(q);fh(n);i=e;return}}while(0);do{if((K|0)==3432){if(x){break}V=b|0;c[V>>2]=U;fh(q);fh(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;V=b|0;c[V>>2]=U;fh(q);fh(n);i=e;return}}while(0);e=cy(4)|0;l4(e);bK(e|0,10072,154)}function g8(b,e,f,g,h,i,j,k,l,m){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0;n=c[g>>2]|0;o=(n|0)==(f|0);do{if(o){p=(a[m+24|0]|0)==b<<24>>24;if(!p){if((a[m+25|0]|0)!=b<<24>>24){break}}c[g>>2]=f+1;a[f]=p?43:45;c[h>>2]=0;q=0;return q|0}}while(0);p=d[j]|0;if((p&1|0)==0){r=p>>>1}else{r=c[j+4>>2]|0}if((r|0)!=0&b<<24>>24==i<<24>>24){i=c[l>>2]|0;if((i-k|0)>=160){q=0;return q|0}k=c[h>>2]|0;c[l>>2]=i+4;c[i>>2]=k;c[h>>2]=0;q=0;return q|0}k=m+26|0;i=m;while(1){if((i|0)==(k|0)){s=k;break}if((a[i]|0)==b<<24>>24){s=i;break}else{i=i+1|0}}i=s-m|0;if((i|0)>23){q=-1;return q|0}do{if((e|0)==16){if((i|0)<22){break}if(o){q=-1;return q|0}if((n-f|0)>=3){q=-1;return q|0}if((a[n-1|0]|0)!=48){q=-1;return q|0}c[h>>2]=0;m=a[11808+i|0]|0;s=c[g>>2]|0;c[g>>2]=s+1;a[s]=m;q=0;return q|0}else if((e|0)==8|(e|0)==10){if((i|0)<(e|0)){break}else{q=-1}return q|0}}while(0);e=a[11808+i|0]|0;c[g>>2]=n+1;a[n]=e;c[h>>2]=(c[h>>2]|0)+1;q=0;return q|0}function g9(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=i;i=i+16|0;g=f|0;h=g;c[h>>2]=e;c[h+4>>2]=0;h=cf(b|0)|0;b=a8(a|0,d|0,g|0)|0;if((h|0)==0){i=f;return b|0}cf(h|0)|0;i=f;return b|0}function ha(a){a=a|0;eQ(a|0);mw(a);return}function hb(a){a=a|0;eQ(a|0);return}function hc(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;k=i;i=i+112|0;l=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[l>>2];l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=k|0;m=k+16|0;n=k+32|0;o=k+40|0;p=k+48|0;q=k+56|0;r=k+64|0;s=k+72|0;t=k+80|0;u=k+104|0;if((c[g+4>>2]&1|0)==0){c[n>>2]=-1;v=c[(c[d>>2]|0)+16>>2]|0;w=e|0;c[p>>2]=c[w>>2];c[q>>2]=c[f>>2];cX[v&127](o,d,p,q,g,h,n);q=c[o>>2]|0;c[w>>2]=q;w=c[n>>2]|0;if((w|0)==1){a[j]=1}else if((w|0)==0){a[j]=0}else{a[j]=1;c[h>>2]=4}c[b>>2]=q;i=k;return}fB(r,g);q=r|0;r=c[q>>2]|0;if((c[3924]|0)!=-1){c[m>>2]=15696;c[m+4>>2]=14;c[m+8>>2]=0;fc(15696,m,116)}m=(c[3925]|0)-1|0;w=c[r+8>>2]|0;do{if((c[r+12>>2]|0)-w>>2>>>0>m>>>0){n=c[w+(m<<2)>>2]|0;if((n|0)==0){break}o=n;n=c[q>>2]|0;eS(n)|0;fB(s,g);n=s|0;p=c[n>>2]|0;if((c[3828]|0)!=-1){c[l>>2]=15312;c[l+4>>2]=14;c[l+8>>2]=0;fc(15312,l,116)}d=(c[3829]|0)-1|0;v=c[p+8>>2]|0;do{if((c[p+12>>2]|0)-v>>2>>>0>d>>>0){x=c[v+(d<<2)>>2]|0;if((x|0)==0){break}y=x;z=c[n>>2]|0;eS(z)|0;z=t|0;A=x;cS[c[(c[A>>2]|0)+24>>2]&127](z,y);cS[c[(c[A>>2]|0)+28>>2]&127](t+12|0,y);c[u>>2]=c[f>>2];a[j]=(hd(e,u,z,t+24|0,o,h,1)|0)==(z|0)|0;c[b>>2]=c[e>>2];fs(t+12|0);fs(t|0);i=k;return}}while(0);o=cy(4)|0;l4(o);bK(o|0,10072,154)}}while(0);k=cy(4)|0;l4(k);bK(k|0,10072,154)}function hd(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0;l=i;i=i+104|0;m=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[m>>2];m=(g-f|0)/12|0;n=l|0;do{if(m>>>0>100>>>0){o=mp(m)|0;if((o|0)!=0){p=o;q=o;break}mB();p=0;q=0}else{p=n;q=0}}while(0);n=(f|0)==(g|0);if(n){r=m;s=0}else{o=m;m=0;t=p;u=f;while(1){v=d[u]|0;if((v&1|0)==0){w=v>>>1}else{w=c[u+4>>2]|0}if((w|0)==0){a[t]=2;x=m+1|0;y=o-1|0}else{a[t]=1;x=m;y=o}v=u+12|0;if((v|0)==(g|0)){r=y;s=x;break}else{o=y;m=x;t=t+1|0;u=v}}}u=b|0;b=e|0;e=h;t=0;x=s;s=r;while(1){r=c[u>>2]|0;do{if((r|0)==0){z=0}else{m=c[r+12>>2]|0;if((m|0)==(c[r+16>>2]|0)){A=cW[c[(c[r>>2]|0)+36>>2]&255](r)|0}else{A=c[m>>2]|0}if((A|0)==-1){c[u>>2]=0;z=0;break}else{z=c[u>>2]|0;break}}}while(0);r=(z|0)==0;m=c[b>>2]|0;if((m|0)==0){B=z;C=0}else{y=c[m+12>>2]|0;if((y|0)==(c[m+16>>2]|0)){D=cW[c[(c[m>>2]|0)+36>>2]&255](m)|0}else{D=c[y>>2]|0}if((D|0)==-1){c[b>>2]=0;E=0}else{E=m}B=c[u>>2]|0;C=E}F=(C|0)==0;if(!((r^F)&(s|0)!=0)){break}r=c[B+12>>2]|0;if((r|0)==(c[B+16>>2]|0)){G=cW[c[(c[B>>2]|0)+36>>2]&255](B)|0}else{G=c[r>>2]|0}if(k){H=G}else{H=cT[c[(c[e>>2]|0)+28>>2]&63](h,G)|0}do{if(n){I=x;J=s}else{r=t+1|0;L4018:do{if(k){m=s;y=x;o=p;w=0;v=f;while(1){do{if((a[o]|0)==1){K=v;if((a[K]&1)==0){L=v+4|0}else{L=c[v+8>>2]|0}if((H|0)!=(c[L+(t<<2)>>2]|0)){a[o]=0;M=w;N=y;O=m-1|0;break}P=d[K]|0;if((P&1|0)==0){Q=P>>>1}else{Q=c[v+4>>2]|0}if((Q|0)!=(r|0)){M=1;N=y;O=m;break}a[o]=2;M=1;N=y+1|0;O=m-1|0}else{M=w;N=y;O=m}}while(0);P=v+12|0;if((P|0)==(g|0)){R=O;S=N;T=M;break L4018}m=O;y=N;o=o+1|0;w=M;v=P}}else{v=s;w=x;o=p;y=0;m=f;while(1){do{if((a[o]|0)==1){P=m;if((a[P]&1)==0){U=m+4|0}else{U=c[m+8>>2]|0}if((H|0)!=(cT[c[(c[e>>2]|0)+28>>2]&63](h,c[U+(t<<2)>>2]|0)|0)){a[o]=0;V=y;W=w;X=v-1|0;break}K=d[P]|0;if((K&1|0)==0){Y=K>>>1}else{Y=c[m+4>>2]|0}if((Y|0)!=(r|0)){V=1;W=w;X=v;break}a[o]=2;V=1;W=w+1|0;X=v-1|0}else{V=y;W=w;X=v}}while(0);K=m+12|0;if((K|0)==(g|0)){R=X;S=W;T=V;break L4018}v=X;w=W;o=o+1|0;y=V;m=K}}}while(0);if(!T){I=S;J=R;break}r=c[u>>2]|0;m=r+12|0;y=c[m>>2]|0;if((y|0)==(c[r+16>>2]|0)){o=c[(c[r>>2]|0)+40>>2]|0;cW[o&255](r)|0}else{c[m>>2]=y+4}if((S+R|0)>>>0<2>>>0|n){I=S;J=R;break}y=t+1|0;m=S;r=p;o=f;while(1){do{if((a[r]|0)==2){w=d[o]|0;if((w&1|0)==0){Z=w>>>1}else{Z=c[o+4>>2]|0}if((Z|0)==(y|0)){_=m;break}a[r]=0;_=m-1|0}else{_=m}}while(0);w=o+12|0;if((w|0)==(g|0)){I=_;J=R;break}else{m=_;r=r+1|0;o=w}}}}while(0);t=t+1|0;x=I;s=J}do{if((B|0)==0){$=1}else{J=c[B+12>>2]|0;if((J|0)==(c[B+16>>2]|0)){aa=cW[c[(c[B>>2]|0)+36>>2]&255](B)|0}else{aa=c[J>>2]|0}if((aa|0)==-1){c[u>>2]=0;$=1;break}else{$=(c[u>>2]|0)==0;break}}}while(0);do{if(F){ab=3607}else{u=c[C+12>>2]|0;if((u|0)==(c[C+16>>2]|0)){ac=cW[c[(c[C>>2]|0)+36>>2]&255](C)|0}else{ac=c[u>>2]|0}if((ac|0)==-1){c[b>>2]=0;ab=3607;break}else{if($^(C|0)==0){break}else{ab=3609;break}}}}while(0);if((ab|0)==3607){if($){ab=3609}}if((ab|0)==3609){c[j>>2]=c[j>>2]|2}L4099:do{if(n){ab=3614}else{$=f;C=p;while(1){if((a[C]|0)==2){ad=$;break L4099}b=$+12|0;if((b|0)==(g|0)){ab=3614;break L4099}$=b;C=C+1|0}}}while(0);if((ab|0)==3614){c[j>>2]=c[j>>2]|4;ad=g}if((q|0)==0){i=l;return ad|0}mq(q);i=l;return ad|0}function he(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];hf(a,0,j,k,f,g,h);i=b;return}function hf(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0;e=i;i=i+144|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+104|0;n=e+112|0;o=e+128|0;p=o;q=i;i=i+4|0;i=i+7&-8;r=i;i=i+160|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;u=c[h+4>>2]&74;if((u|0)==64){v=8}else if((u|0)==8){v=16}else if((u|0)==0){v=0}else{v=10}u=l|0;hB(n,h,u,m);mF(p|0,0,12)|0;h=o;fj(o,10,0);if((a[p]&1)==0){l=h+1|0;w=l;x=l;y=o+8|0}else{l=o+8|0;w=c[l>>2]|0;x=h+1|0;y=l}c[q>>2]=w;l=r|0;c[s>>2]=l;c[t>>2]=0;h=f|0;f=g|0;g=o|0;z=o+4|0;A=c[m>>2]|0;m=w;w=c[h>>2]|0;L4123:while(1){do{if((w|0)==0){B=0}else{C=c[w+12>>2]|0;if((C|0)==(c[w+16>>2]|0)){D=cW[c[(c[w>>2]|0)+36>>2]&255](w)|0}else{D=c[C>>2]|0}if((D|0)!=-1){B=w;break}c[h>>2]=0;B=0}}while(0);E=(B|0)==0;C=c[f>>2]|0;do{if((C|0)==0){F=3643}else{G=c[C+12>>2]|0;if((G|0)==(c[C+16>>2]|0)){H=cW[c[(c[C>>2]|0)+36>>2]&255](C)|0}else{H=c[G>>2]|0}if((H|0)==-1){c[f>>2]=0;F=3643;break}else{G=(C|0)==0;if(E^G){I=C;J=G;break}else{K=m;L=C;M=G;break L4123}}}}while(0);if((F|0)==3643){F=0;if(E){K=m;L=0;M=1;break}else{I=0;J=1}}C=d[p]|0;G=(C&1|0)==0;if(((c[q>>2]|0)-m|0)==((G?C>>>1:c[z>>2]|0)|0)){if(G){N=C>>>1;O=C>>>1}else{C=c[z>>2]|0;N=C;O=C}fj(o,N<<1,0);if((a[p]&1)==0){P=10}else{P=(c[g>>2]&-2)-1|0}fj(o,P,0);if((a[p]&1)==0){Q=x}else{Q=c[y>>2]|0}c[q>>2]=Q+O;R=Q}else{R=m}C=B+12|0;G=c[C>>2]|0;S=B+16|0;if((G|0)==(c[S>>2]|0)){T=cW[c[(c[B>>2]|0)+36>>2]&255](B)|0}else{T=c[G>>2]|0}if((hx(T,v,R,q,t,A,n,l,s,u)|0)!=0){K=R;L=I;M=J;break}G=c[C>>2]|0;if((G|0)==(c[S>>2]|0)){S=c[(c[B>>2]|0)+40>>2]|0;cW[S&255](B)|0;m=R;w=B;continue}else{c[C>>2]=G+4;m=R;w=B;continue}}w=d[n]|0;if((w&1|0)==0){U=w>>>1}else{U=c[n+4>>2]|0}do{if((U|0)!=0){w=c[s>>2]|0;if((w-r|0)>=160){break}R=c[t>>2]|0;c[s>>2]=w+4;c[w>>2]=R}}while(0);c[k>>2]=lK(K,c[q>>2]|0,j,v)|0;jt(n,l,c[s>>2]|0,j);do{if(E){V=0}else{s=c[B+12>>2]|0;if((s|0)==(c[B+16>>2]|0)){W=cW[c[(c[B>>2]|0)+36>>2]&255](B)|0}else{W=c[s>>2]|0}if((W|0)!=-1){V=B;break}c[h>>2]=0;V=0}}while(0);h=(V|0)==0;do{if(M){F=3685}else{B=c[L+12>>2]|0;if((B|0)==(c[L+16>>2]|0)){X=cW[c[(c[L>>2]|0)+36>>2]&255](L)|0}else{X=c[B>>2]|0}if((X|0)==-1){c[f>>2]=0;F=3685;break}if(!(h^(L|0)==0)){break}Y=b|0;c[Y>>2]=V;fh(o);fh(n);i=e;return}}while(0);do{if((F|0)==3685){if(h){break}Y=b|0;c[Y>>2]=V;fh(o);fh(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;Y=b|0;c[Y>>2]=V;fh(o);fh(n);i=e;return}function hg(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];hh(a,0,j,k,f,g,h);i=b;return}function hh(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0;e=i;i=i+144|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+104|0;n=e+112|0;o=e+128|0;p=o;q=i;i=i+4|0;i=i+7&-8;r=i;i=i+160|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;u=c[h+4>>2]&74;if((u|0)==64){v=8}else if((u|0)==0){v=0}else if((u|0)==8){v=16}else{v=10}u=l|0;hB(n,h,u,m);mF(p|0,0,12)|0;h=o;fj(o,10,0);if((a[p]&1)==0){l=h+1|0;w=l;x=l;y=o+8|0}else{l=o+8|0;w=c[l>>2]|0;x=h+1|0;y=l}c[q>>2]=w;l=r|0;c[s>>2]=l;c[t>>2]=0;h=f|0;f=g|0;g=o|0;z=o+4|0;A=c[m>>2]|0;m=w;w=c[h>>2]|0;L4213:while(1){do{if((w|0)==0){B=0}else{C=c[w+12>>2]|0;if((C|0)==(c[w+16>>2]|0)){D=cW[c[(c[w>>2]|0)+36>>2]&255](w)|0}else{D=c[C>>2]|0}if((D|0)!=-1){B=w;break}c[h>>2]=0;B=0}}while(0);E=(B|0)==0;C=c[f>>2]|0;do{if((C|0)==0){F=3714}else{G=c[C+12>>2]|0;if((G|0)==(c[C+16>>2]|0)){H=cW[c[(c[C>>2]|0)+36>>2]&255](C)|0}else{H=c[G>>2]|0}if((H|0)==-1){c[f>>2]=0;F=3714;break}else{G=(C|0)==0;if(E^G){I=C;J=G;break}else{L=m;M=C;N=G;break L4213}}}}while(0);if((F|0)==3714){F=0;if(E){L=m;M=0;N=1;break}else{I=0;J=1}}C=d[p]|0;G=(C&1|0)==0;if(((c[q>>2]|0)-m|0)==((G?C>>>1:c[z>>2]|0)|0)){if(G){O=C>>>1;P=C>>>1}else{C=c[z>>2]|0;O=C;P=C}fj(o,O<<1,0);if((a[p]&1)==0){Q=10}else{Q=(c[g>>2]&-2)-1|0}fj(o,Q,0);if((a[p]&1)==0){R=x}else{R=c[y>>2]|0}c[q>>2]=R+P;S=R}else{S=m}C=B+12|0;G=c[C>>2]|0;T=B+16|0;if((G|0)==(c[T>>2]|0)){U=cW[c[(c[B>>2]|0)+36>>2]&255](B)|0}else{U=c[G>>2]|0}if((hx(U,v,S,q,t,A,n,l,s,u)|0)!=0){L=S;M=I;N=J;break}G=c[C>>2]|0;if((G|0)==(c[T>>2]|0)){T=c[(c[B>>2]|0)+40>>2]|0;cW[T&255](B)|0;m=S;w=B;continue}else{c[C>>2]=G+4;m=S;w=B;continue}}w=d[n]|0;if((w&1|0)==0){V=w>>>1}else{V=c[n+4>>2]|0}do{if((V|0)!=0){w=c[s>>2]|0;if((w-r|0)>=160){break}S=c[t>>2]|0;c[s>>2]=w+4;c[w>>2]=S}}while(0);t=lJ(L,c[q>>2]|0,j,v)|0;c[k>>2]=t;c[k+4>>2]=K;jt(n,l,c[s>>2]|0,j);do{if(E){W=0}else{s=c[B+12>>2]|0;if((s|0)==(c[B+16>>2]|0)){X=cW[c[(c[B>>2]|0)+36>>2]&255](B)|0}else{X=c[s>>2]|0}if((X|0)!=-1){W=B;break}c[h>>2]=0;W=0}}while(0);h=(W|0)==0;do{if(N){F=3756}else{B=c[M+12>>2]|0;if((B|0)==(c[M+16>>2]|0)){Y=cW[c[(c[M>>2]|0)+36>>2]&255](M)|0}else{Y=c[B>>2]|0}if((Y|0)==-1){c[f>>2]=0;F=3756;break}if(!(h^(M|0)==0)){break}Z=b|0;c[Z>>2]=W;fh(o);fh(n);i=e;return}}while(0);do{if((F|0)==3756){if(h){break}Z=b|0;c[Z>>2]=W;fh(o);fh(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;Z=b|0;c[Z>>2]=W;fh(o);fh(n);i=e;return}function hi(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];hj(a,0,j,k,f,g,h);i=b;return}function hj(e,f,g,h,j,k,l){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0;f=i;i=i+144|0;m=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[m>>2];m=h;h=i;i=i+4|0;i=i+7&-8;c[h>>2]=c[m>>2];m=f|0;n=f+104|0;o=f+112|0;p=f+128|0;q=p;r=i;i=i+4|0;i=i+7&-8;s=i;i=i+160|0;t=i;i=i+4|0;i=i+7&-8;u=i;i=i+4|0;i=i+7&-8;v=c[j+4>>2]&74;if((v|0)==8){w=16}else if((v|0)==0){w=0}else if((v|0)==64){w=8}else{w=10}v=m|0;hB(o,j,v,n);mF(q|0,0,12)|0;j=p;fj(p,10,0);if((a[q]&1)==0){m=j+1|0;x=m;y=m;z=p+8|0}else{m=p+8|0;x=c[m>>2]|0;y=j+1|0;z=m}c[r>>2]=x;m=s|0;c[t>>2]=m;c[u>>2]=0;j=g|0;g=h|0;h=p|0;A=p+4|0;B=c[n>>2]|0;n=x;x=c[j>>2]|0;L4303:while(1){do{if((x|0)==0){C=0}else{D=c[x+12>>2]|0;if((D|0)==(c[x+16>>2]|0)){E=cW[c[(c[x>>2]|0)+36>>2]&255](x)|0}else{E=c[D>>2]|0}if((E|0)!=-1){C=x;break}c[j>>2]=0;C=0}}while(0);F=(C|0)==0;D=c[g>>2]|0;do{if((D|0)==0){G=3785}else{H=c[D+12>>2]|0;if((H|0)==(c[D+16>>2]|0)){I=cW[c[(c[D>>2]|0)+36>>2]&255](D)|0}else{I=c[H>>2]|0}if((I|0)==-1){c[g>>2]=0;G=3785;break}else{H=(D|0)==0;if(F^H){J=D;K=H;break}else{L=n;M=D;N=H;break L4303}}}}while(0);if((G|0)==3785){G=0;if(F){L=n;M=0;N=1;break}else{J=0;K=1}}D=d[q]|0;H=(D&1|0)==0;if(((c[r>>2]|0)-n|0)==((H?D>>>1:c[A>>2]|0)|0)){if(H){O=D>>>1;P=D>>>1}else{D=c[A>>2]|0;O=D;P=D}fj(p,O<<1,0);if((a[q]&1)==0){Q=10}else{Q=(c[h>>2]&-2)-1|0}fj(p,Q,0);if((a[q]&1)==0){R=y}else{R=c[z>>2]|0}c[r>>2]=R+P;S=R}else{S=n}D=C+12|0;H=c[D>>2]|0;T=C+16|0;if((H|0)==(c[T>>2]|0)){U=cW[c[(c[C>>2]|0)+36>>2]&255](C)|0}else{U=c[H>>2]|0}if((hx(U,w,S,r,u,B,o,m,t,v)|0)!=0){L=S;M=J;N=K;break}H=c[D>>2]|0;if((H|0)==(c[T>>2]|0)){T=c[(c[C>>2]|0)+40>>2]|0;cW[T&255](C)|0;n=S;x=C;continue}else{c[D>>2]=H+4;n=S;x=C;continue}}x=d[o]|0;if((x&1|0)==0){V=x>>>1}else{V=c[o+4>>2]|0}do{if((V|0)!=0){x=c[t>>2]|0;if((x-s|0)>=160){break}S=c[u>>2]|0;c[t>>2]=x+4;c[x>>2]=S}}while(0);b[l>>1]=lI(L,c[r>>2]|0,k,w)|0;jt(o,m,c[t>>2]|0,k);do{if(F){W=0}else{t=c[C+12>>2]|0;if((t|0)==(c[C+16>>2]|0)){X=cW[c[(c[C>>2]|0)+36>>2]&255](C)|0}else{X=c[t>>2]|0}if((X|0)!=-1){W=C;break}c[j>>2]=0;W=0}}while(0);j=(W|0)==0;do{if(N){G=3827}else{C=c[M+12>>2]|0;if((C|0)==(c[M+16>>2]|0)){Y=cW[c[(c[M>>2]|0)+36>>2]&255](M)|0}else{Y=c[C>>2]|0}if((Y|0)==-1){c[g>>2]=0;G=3827;break}if(!(j^(M|0)==0)){break}Z=e|0;c[Z>>2]=W;fh(p);fh(o);i=f;return}}while(0);do{if((G|0)==3827){if(j){break}Z=e|0;c[Z>>2]=W;fh(p);fh(o);i=f;return}}while(0);c[k>>2]=c[k>>2]|2;Z=e|0;c[Z>>2]=W;fh(p);fh(o);i=f;return}function hk(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];hl(a,0,j,k,f,g,h);i=b;return}function hl(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0;e=i;i=i+144|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+104|0;n=e+112|0;o=e+128|0;p=o;q=i;i=i+4|0;i=i+7&-8;r=i;i=i+160|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;u=c[h+4>>2]&74;if((u|0)==0){v=0}else if((u|0)==64){v=8}else if((u|0)==8){v=16}else{v=10}u=l|0;hB(n,h,u,m);mF(p|0,0,12)|0;h=o;fj(o,10,0);if((a[p]&1)==0){l=h+1|0;w=l;x=l;y=o+8|0}else{l=o+8|0;w=c[l>>2]|0;x=h+1|0;y=l}c[q>>2]=w;l=r|0;c[s>>2]=l;c[t>>2]=0;h=f|0;f=g|0;g=o|0;z=o+4|0;A=c[m>>2]|0;m=w;w=c[h>>2]|0;L4393:while(1){do{if((w|0)==0){B=0}else{C=c[w+12>>2]|0;if((C|0)==(c[w+16>>2]|0)){D=cW[c[(c[w>>2]|0)+36>>2]&255](w)|0}else{D=c[C>>2]|0}if((D|0)!=-1){B=w;break}c[h>>2]=0;B=0}}while(0);E=(B|0)==0;C=c[f>>2]|0;do{if((C|0)==0){F=3856}else{G=c[C+12>>2]|0;if((G|0)==(c[C+16>>2]|0)){H=cW[c[(c[C>>2]|0)+36>>2]&255](C)|0}else{H=c[G>>2]|0}if((H|0)==-1){c[f>>2]=0;F=3856;break}else{G=(C|0)==0;if(E^G){I=C;J=G;break}else{K=m;L=C;M=G;break L4393}}}}while(0);if((F|0)==3856){F=0;if(E){K=m;L=0;M=1;break}else{I=0;J=1}}C=d[p]|0;G=(C&1|0)==0;if(((c[q>>2]|0)-m|0)==((G?C>>>1:c[z>>2]|0)|0)){if(G){N=C>>>1;O=C>>>1}else{C=c[z>>2]|0;N=C;O=C}fj(o,N<<1,0);if((a[p]&1)==0){P=10}else{P=(c[g>>2]&-2)-1|0}fj(o,P,0);if((a[p]&1)==0){Q=x}else{Q=c[y>>2]|0}c[q>>2]=Q+O;R=Q}else{R=m}C=B+12|0;G=c[C>>2]|0;S=B+16|0;if((G|0)==(c[S>>2]|0)){T=cW[c[(c[B>>2]|0)+36>>2]&255](B)|0}else{T=c[G>>2]|0}if((hx(T,v,R,q,t,A,n,l,s,u)|0)!=0){K=R;L=I;M=J;break}G=c[C>>2]|0;if((G|0)==(c[S>>2]|0)){S=c[(c[B>>2]|0)+40>>2]|0;cW[S&255](B)|0;m=R;w=B;continue}else{c[C>>2]=G+4;m=R;w=B;continue}}w=d[n]|0;if((w&1|0)==0){U=w>>>1}else{U=c[n+4>>2]|0}do{if((U|0)!=0){w=c[s>>2]|0;if((w-r|0)>=160){break}R=c[t>>2]|0;c[s>>2]=w+4;c[w>>2]=R}}while(0);c[k>>2]=lH(K,c[q>>2]|0,j,v)|0;jt(n,l,c[s>>2]|0,j);do{if(E){V=0}else{s=c[B+12>>2]|0;if((s|0)==(c[B+16>>2]|0)){W=cW[c[(c[B>>2]|0)+36>>2]&255](B)|0}else{W=c[s>>2]|0}if((W|0)!=-1){V=B;break}c[h>>2]=0;V=0}}while(0);h=(V|0)==0;do{if(M){F=3898}else{B=c[L+12>>2]|0;if((B|0)==(c[L+16>>2]|0)){X=cW[c[(c[L>>2]|0)+36>>2]&255](L)|0}else{X=c[B>>2]|0}if((X|0)==-1){c[f>>2]=0;F=3898;break}if(!(h^(L|0)==0)){break}Y=b|0;c[Y>>2]=V;fh(o);fh(n);i=e;return}}while(0);do{if((F|0)==3898){if(h){break}Y=b|0;c[Y>>2]=V;fh(o);fh(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;Y=b|0;c[Y>>2]=V;fh(o);fh(n);i=e;return}function hm(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];hn(a,0,j,k,f,g,h);i=b;return}function hn(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0;e=i;i=i+144|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+104|0;n=e+112|0;o=e+128|0;p=o;q=i;i=i+4|0;i=i+7&-8;r=i;i=i+160|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;u=c[h+4>>2]&74;if((u|0)==64){v=8}else if((u|0)==8){v=16}else if((u|0)==0){v=0}else{v=10}u=l|0;hB(n,h,u,m);mF(p|0,0,12)|0;h=o;fj(o,10,0);if((a[p]&1)==0){l=h+1|0;w=l;x=l;y=o+8|0}else{l=o+8|0;w=c[l>>2]|0;x=h+1|0;y=l}c[q>>2]=w;l=r|0;c[s>>2]=l;c[t>>2]=0;h=f|0;f=g|0;g=o|0;z=o+4|0;A=c[m>>2]|0;m=w;w=c[h>>2]|0;L4483:while(1){do{if((w|0)==0){B=0}else{C=c[w+12>>2]|0;if((C|0)==(c[w+16>>2]|0)){D=cW[c[(c[w>>2]|0)+36>>2]&255](w)|0}else{D=c[C>>2]|0}if((D|0)!=-1){B=w;break}c[h>>2]=0;B=0}}while(0);E=(B|0)==0;C=c[f>>2]|0;do{if((C|0)==0){F=3927}else{G=c[C+12>>2]|0;if((G|0)==(c[C+16>>2]|0)){H=cW[c[(c[C>>2]|0)+36>>2]&255](C)|0}else{H=c[G>>2]|0}if((H|0)==-1){c[f>>2]=0;F=3927;break}else{G=(C|0)==0;if(E^G){I=C;J=G;break}else{K=m;L=C;M=G;break L4483}}}}while(0);if((F|0)==3927){F=0;if(E){K=m;L=0;M=1;break}else{I=0;J=1}}C=d[p]|0;G=(C&1|0)==0;if(((c[q>>2]|0)-m|0)==((G?C>>>1:c[z>>2]|0)|0)){if(G){N=C>>>1;O=C>>>1}else{C=c[z>>2]|0;N=C;O=C}fj(o,N<<1,0);if((a[p]&1)==0){P=10}else{P=(c[g>>2]&-2)-1|0}fj(o,P,0);if((a[p]&1)==0){Q=x}else{Q=c[y>>2]|0}c[q>>2]=Q+O;R=Q}else{R=m}C=B+12|0;G=c[C>>2]|0;S=B+16|0;if((G|0)==(c[S>>2]|0)){T=cW[c[(c[B>>2]|0)+36>>2]&255](B)|0}else{T=c[G>>2]|0}if((hx(T,v,R,q,t,A,n,l,s,u)|0)!=0){K=R;L=I;M=J;break}G=c[C>>2]|0;if((G|0)==(c[S>>2]|0)){S=c[(c[B>>2]|0)+40>>2]|0;cW[S&255](B)|0;m=R;w=B;continue}else{c[C>>2]=G+4;m=R;w=B;continue}}w=d[n]|0;if((w&1|0)==0){U=w>>>1}else{U=c[n+4>>2]|0}do{if((U|0)!=0){w=c[s>>2]|0;if((w-r|0)>=160){break}R=c[t>>2]|0;c[s>>2]=w+4;c[w>>2]=R}}while(0);c[k>>2]=lG(K,c[q>>2]|0,j,v)|0;jt(n,l,c[s>>2]|0,j);do{if(E){V=0}else{s=c[B+12>>2]|0;if((s|0)==(c[B+16>>2]|0)){W=cW[c[(c[B>>2]|0)+36>>2]&255](B)|0}else{W=c[s>>2]|0}if((W|0)!=-1){V=B;break}c[h>>2]=0;V=0}}while(0);h=(V|0)==0;do{if(M){F=3969}else{B=c[L+12>>2]|0;if((B|0)==(c[L+16>>2]|0)){X=cW[c[(c[L>>2]|0)+36>>2]&255](L)|0}else{X=c[B>>2]|0}if((X|0)==-1){c[f>>2]=0;F=3969;break}if(!(h^(L|0)==0)){break}Y=b|0;c[Y>>2]=V;fh(o);fh(n);i=e;return}}while(0);do{if((F|0)==3969){if(h){break}Y=b|0;c[Y>>2]=V;fh(o);fh(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;Y=b|0;c[Y>>2]=V;fh(o);fh(n);i=e;return}function ho(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];hp(a,0,j,k,f,g,h);i=b;return}function hp(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0;e=i;i=i+144|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+104|0;n=e+112|0;o=e+128|0;p=o;q=i;i=i+4|0;i=i+7&-8;r=i;i=i+160|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;u=c[h+4>>2]&74;if((u|0)==64){v=8}else if((u|0)==0){v=0}else if((u|0)==8){v=16}else{v=10}u=l|0;hB(n,h,u,m);mF(p|0,0,12)|0;h=o;fj(o,10,0);if((a[p]&1)==0){l=h+1|0;w=l;x=l;y=o+8|0}else{l=o+8|0;w=c[l>>2]|0;x=h+1|0;y=l}c[q>>2]=w;l=r|0;c[s>>2]=l;c[t>>2]=0;h=f|0;f=g|0;g=o|0;z=o+4|0;A=c[m>>2]|0;m=w;w=c[h>>2]|0;L4573:while(1){do{if((w|0)==0){B=0}else{C=c[w+12>>2]|0;if((C|0)==(c[w+16>>2]|0)){D=cW[c[(c[w>>2]|0)+36>>2]&255](w)|0}else{D=c[C>>2]|0}if((D|0)!=-1){B=w;break}c[h>>2]=0;B=0}}while(0);E=(B|0)==0;C=c[f>>2]|0;do{if((C|0)==0){F=3998}else{G=c[C+12>>2]|0;if((G|0)==(c[C+16>>2]|0)){H=cW[c[(c[C>>2]|0)+36>>2]&255](C)|0}else{H=c[G>>2]|0}if((H|0)==-1){c[f>>2]=0;F=3998;break}else{G=(C|0)==0;if(E^G){I=C;J=G;break}else{L=m;M=C;N=G;break L4573}}}}while(0);if((F|0)==3998){F=0;if(E){L=m;M=0;N=1;break}else{I=0;J=1}}C=d[p]|0;G=(C&1|0)==0;if(((c[q>>2]|0)-m|0)==((G?C>>>1:c[z>>2]|0)|0)){if(G){O=C>>>1;P=C>>>1}else{C=c[z>>2]|0;O=C;P=C}fj(o,O<<1,0);if((a[p]&1)==0){Q=10}else{Q=(c[g>>2]&-2)-1|0}fj(o,Q,0);if((a[p]&1)==0){R=x}else{R=c[y>>2]|0}c[q>>2]=R+P;S=R}else{S=m}C=B+12|0;G=c[C>>2]|0;T=B+16|0;if((G|0)==(c[T>>2]|0)){U=cW[c[(c[B>>2]|0)+36>>2]&255](B)|0}else{U=c[G>>2]|0}if((hx(U,v,S,q,t,A,n,l,s,u)|0)!=0){L=S;M=I;N=J;break}G=c[C>>2]|0;if((G|0)==(c[T>>2]|0)){T=c[(c[B>>2]|0)+40>>2]|0;cW[T&255](B)|0;m=S;w=B;continue}else{c[C>>2]=G+4;m=S;w=B;continue}}w=d[n]|0;if((w&1|0)==0){V=w>>>1}else{V=c[n+4>>2]|0}do{if((V|0)!=0){w=c[s>>2]|0;if((w-r|0)>=160){break}S=c[t>>2]|0;c[s>>2]=w+4;c[w>>2]=S}}while(0);t=lF(L,c[q>>2]|0,j,v)|0;c[k>>2]=t;c[k+4>>2]=K;jt(n,l,c[s>>2]|0,j);do{if(E){W=0}else{s=c[B+12>>2]|0;if((s|0)==(c[B+16>>2]|0)){X=cW[c[(c[B>>2]|0)+36>>2]&255](B)|0}else{X=c[s>>2]|0}if((X|0)!=-1){W=B;break}c[h>>2]=0;W=0}}while(0);h=(W|0)==0;do{if(N){F=4040}else{B=c[M+12>>2]|0;if((B|0)==(c[M+16>>2]|0)){Y=cW[c[(c[M>>2]|0)+36>>2]&255](M)|0}else{Y=c[B>>2]|0}if((Y|0)==-1){c[f>>2]=0;F=4040;break}if(!(h^(M|0)==0)){break}Z=b|0;c[Z>>2]=W;fh(o);fh(n);i=e;return}}while(0);do{if((F|0)==4040){if(h){break}Z=b|0;c[Z>>2]=W;fh(o);fh(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;Z=b|0;c[Z>>2]=W;fh(o);fh(n);i=e;return}function hq(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];hr(a,0,j,k,f,g,h);i=b;return}function hr(b,e,f,h,j,k,l){b=b|0;e=e|0;f=f|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0;e=i;i=i+176|0;m=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[m>>2];m=h;h=i;i=i+4|0;i=i+7&-8;c[h>>2]=c[m>>2];m=e+128|0;n=e+136|0;o=e+144|0;p=e+160|0;q=p;r=i;i=i+4|0;i=i+7&-8;s=i;i=i+160|0;t=i;i=i+4|0;i=i+7&-8;u=i;i=i+4|0;i=i+7&-8;v=i;i=i+1|0;i=i+7&-8;w=i;i=i+1|0;i=i+7&-8;x=e|0;hC(o,j,x,m,n);mF(q|0,0,12)|0;j=p;fj(p,10,0);if((a[q]&1)==0){y=j+1|0;z=y;A=y;B=p+8|0}else{y=p+8|0;z=c[y>>2]|0;A=j+1|0;B=y}c[r>>2]=z;y=s|0;c[t>>2]=y;c[u>>2]=0;a[v]=1;a[w]=69;j=f|0;f=h|0;h=p|0;C=p+4|0;D=c[m>>2]|0;m=c[n>>2]|0;n=z;z=c[j>>2]|0;L4658:while(1){do{if((z|0)==0){E=0}else{F=c[z+12>>2]|0;if((F|0)==(c[z+16>>2]|0)){G=cW[c[(c[z>>2]|0)+36>>2]&255](z)|0}else{G=c[F>>2]|0}if((G|0)!=-1){E=z;break}c[j>>2]=0;E=0}}while(0);H=(E|0)==0;F=c[f>>2]|0;do{if((F|0)==0){I=4065}else{J=c[F+12>>2]|0;if((J|0)==(c[F+16>>2]|0)){K=cW[c[(c[F>>2]|0)+36>>2]&255](F)|0}else{K=c[J>>2]|0}if((K|0)==-1){c[f>>2]=0;I=4065;break}else{J=(F|0)==0;if(H^J){L=F;M=J;break}else{N=n;O=F;P=J;break L4658}}}}while(0);if((I|0)==4065){I=0;if(H){N=n;O=0;P=1;break}else{L=0;M=1}}F=d[q]|0;J=(F&1|0)==0;if(((c[r>>2]|0)-n|0)==((J?F>>>1:c[C>>2]|0)|0)){if(J){Q=F>>>1;R=F>>>1}else{F=c[C>>2]|0;Q=F;R=F}fj(p,Q<<1,0);if((a[q]&1)==0){S=10}else{S=(c[h>>2]&-2)-1|0}fj(p,S,0);if((a[q]&1)==0){T=A}else{T=c[B>>2]|0}c[r>>2]=T+R;U=T}else{U=n}F=E+12|0;J=c[F>>2]|0;V=E+16|0;if((J|0)==(c[V>>2]|0)){W=cW[c[(c[E>>2]|0)+36>>2]&255](E)|0}else{W=c[J>>2]|0}if((hD(W,v,w,U,r,D,m,o,y,t,u,x)|0)!=0){N=U;O=L;P=M;break}J=c[F>>2]|0;if((J|0)==(c[V>>2]|0)){V=c[(c[E>>2]|0)+40>>2]|0;cW[V&255](E)|0;n=U;z=E;continue}else{c[F>>2]=J+4;n=U;z=E;continue}}z=d[o]|0;if((z&1|0)==0){X=z>>>1}else{X=c[o+4>>2]|0}do{if((X|0)!=0){if((a[v]&1)==0){break}z=c[t>>2]|0;if((z-s|0)>=160){break}U=c[u>>2]|0;c[t>>2]=z+4;c[z>>2]=U}}while(0);g[l>>2]=+lE(N,c[r>>2]|0,k);jt(o,y,c[t>>2]|0,k);do{if(H){Y=0}else{t=c[E+12>>2]|0;if((t|0)==(c[E+16>>2]|0)){Z=cW[c[(c[E>>2]|0)+36>>2]&255](E)|0}else{Z=c[t>>2]|0}if((Z|0)!=-1){Y=E;break}c[j>>2]=0;Y=0}}while(0);j=(Y|0)==0;do{if(P){I=4108}else{E=c[O+12>>2]|0;if((E|0)==(c[O+16>>2]|0)){_=cW[c[(c[O>>2]|0)+36>>2]&255](O)|0}else{_=c[E>>2]|0}if((_|0)==-1){c[f>>2]=0;I=4108;break}if(!(j^(O|0)==0)){break}$=b|0;c[$>>2]=Y;fh(p);fh(o);i=e;return}}while(0);do{if((I|0)==4108){if(j){break}$=b|0;c[$>>2]=Y;fh(p);fh(o);i=e;return}}while(0);c[k>>2]=c[k>>2]|2;$=b|0;c[$>>2]=Y;fh(p);fh(o);i=e;return}function hs(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];ht(a,0,j,k,f,g,h);i=b;return}function ht(b,e,f,g,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0;e=i;i=i+176|0;m=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[m>>2];m=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[m>>2];m=e+128|0;n=e+136|0;o=e+144|0;p=e+160|0;q=p;r=i;i=i+4|0;i=i+7&-8;s=i;i=i+160|0;t=i;i=i+4|0;i=i+7&-8;u=i;i=i+4|0;i=i+7&-8;v=i;i=i+1|0;i=i+7&-8;w=i;i=i+1|0;i=i+7&-8;x=e|0;hC(o,j,x,m,n);mF(q|0,0,12)|0;j=p;fj(p,10,0);if((a[q]&1)==0){y=j+1|0;z=y;A=y;B=p+8|0}else{y=p+8|0;z=c[y>>2]|0;A=j+1|0;B=y}c[r>>2]=z;y=s|0;c[t>>2]=y;c[u>>2]=0;a[v]=1;a[w]=69;j=f|0;f=g|0;g=p|0;C=p+4|0;D=c[m>>2]|0;m=c[n>>2]|0;n=z;z=c[j>>2]|0;L4744:while(1){do{if((z|0)==0){E=0}else{F=c[z+12>>2]|0;if((F|0)==(c[z+16>>2]|0)){G=cW[c[(c[z>>2]|0)+36>>2]&255](z)|0}else{G=c[F>>2]|0}if((G|0)!=-1){E=z;break}c[j>>2]=0;E=0}}while(0);H=(E|0)==0;F=c[f>>2]|0;do{if((F|0)==0){I=4133}else{J=c[F+12>>2]|0;if((J|0)==(c[F+16>>2]|0)){K=cW[c[(c[F>>2]|0)+36>>2]&255](F)|0}else{K=c[J>>2]|0}if((K|0)==-1){c[f>>2]=0;I=4133;break}else{J=(F|0)==0;if(H^J){L=F;M=J;break}else{N=n;O=F;P=J;break L4744}}}}while(0);if((I|0)==4133){I=0;if(H){N=n;O=0;P=1;break}else{L=0;M=1}}F=d[q]|0;J=(F&1|0)==0;if(((c[r>>2]|0)-n|0)==((J?F>>>1:c[C>>2]|0)|0)){if(J){Q=F>>>1;R=F>>>1}else{F=c[C>>2]|0;Q=F;R=F}fj(p,Q<<1,0);if((a[q]&1)==0){S=10}else{S=(c[g>>2]&-2)-1|0}fj(p,S,0);if((a[q]&1)==0){T=A}else{T=c[B>>2]|0}c[r>>2]=T+R;U=T}else{U=n}F=E+12|0;J=c[F>>2]|0;V=E+16|0;if((J|0)==(c[V>>2]|0)){W=cW[c[(c[E>>2]|0)+36>>2]&255](E)|0}else{W=c[J>>2]|0}if((hD(W,v,w,U,r,D,m,o,y,t,u,x)|0)!=0){N=U;O=L;P=M;break}J=c[F>>2]|0;if((J|0)==(c[V>>2]|0)){V=c[(c[E>>2]|0)+40>>2]|0;cW[V&255](E)|0;n=U;z=E;continue}else{c[F>>2]=J+4;n=U;z=E;continue}}z=d[o]|0;if((z&1|0)==0){X=z>>>1}else{X=c[o+4>>2]|0}do{if((X|0)!=0){if((a[v]&1)==0){break}z=c[t>>2]|0;if((z-s|0)>=160){break}U=c[u>>2]|0;c[t>>2]=z+4;c[z>>2]=U}}while(0);h[l>>3]=+lD(N,c[r>>2]|0,k);jt(o,y,c[t>>2]|0,k);do{if(H){Y=0}else{t=c[E+12>>2]|0;if((t|0)==(c[E+16>>2]|0)){Z=cW[c[(c[E>>2]|0)+36>>2]&255](E)|0}else{Z=c[t>>2]|0}if((Z|0)!=-1){Y=E;break}c[j>>2]=0;Y=0}}while(0);j=(Y|0)==0;do{if(P){I=4176}else{E=c[O+12>>2]|0;if((E|0)==(c[O+16>>2]|0)){_=cW[c[(c[O>>2]|0)+36>>2]&255](O)|0}else{_=c[E>>2]|0}if((_|0)==-1){c[f>>2]=0;I=4176;break}if(!(j^(O|0)==0)){break}$=b|0;c[$>>2]=Y;fh(p);fh(o);i=e;return}}while(0);do{if((I|0)==4176){if(j){break}$=b|0;c[$>>2]=Y;fh(p);fh(o);i=e;return}}while(0);c[k>>2]=c[k>>2]|2;$=b|0;c[$>>2]=Y;fh(p);fh(o);i=e;return}function hu(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];hv(a,0,j,k,f,g,h);i=b;return}function hv(b,e,f,g,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0;e=i;i=i+176|0;m=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[m>>2];m=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[m>>2];m=e+128|0;n=e+136|0;o=e+144|0;p=e+160|0;q=p;r=i;i=i+4|0;i=i+7&-8;s=i;i=i+160|0;t=i;i=i+4|0;i=i+7&-8;u=i;i=i+4|0;i=i+7&-8;v=i;i=i+1|0;i=i+7&-8;w=i;i=i+1|0;i=i+7&-8;x=e|0;hC(o,j,x,m,n);mF(q|0,0,12)|0;j=p;fj(p,10,0);if((a[q]&1)==0){y=j+1|0;z=y;A=y;B=p+8|0}else{y=p+8|0;z=c[y>>2]|0;A=j+1|0;B=y}c[r>>2]=z;y=s|0;c[t>>2]=y;c[u>>2]=0;a[v]=1;a[w]=69;j=f|0;f=g|0;g=p|0;C=p+4|0;D=c[m>>2]|0;m=c[n>>2]|0;n=z;z=c[j>>2]|0;L4830:while(1){do{if((z|0)==0){E=0}else{F=c[z+12>>2]|0;if((F|0)==(c[z+16>>2]|0)){G=cW[c[(c[z>>2]|0)+36>>2]&255](z)|0}else{G=c[F>>2]|0}if((G|0)!=-1){E=z;break}c[j>>2]=0;E=0}}while(0);H=(E|0)==0;F=c[f>>2]|0;do{if((F|0)==0){I=4201}else{J=c[F+12>>2]|0;if((J|0)==(c[F+16>>2]|0)){K=cW[c[(c[F>>2]|0)+36>>2]&255](F)|0}else{K=c[J>>2]|0}if((K|0)==-1){c[f>>2]=0;I=4201;break}else{J=(F|0)==0;if(H^J){L=F;M=J;break}else{N=n;O=F;P=J;break L4830}}}}while(0);if((I|0)==4201){I=0;if(H){N=n;O=0;P=1;break}else{L=0;M=1}}F=d[q]|0;J=(F&1|0)==0;if(((c[r>>2]|0)-n|0)==((J?F>>>1:c[C>>2]|0)|0)){if(J){Q=F>>>1;R=F>>>1}else{F=c[C>>2]|0;Q=F;R=F}fj(p,Q<<1,0);if((a[q]&1)==0){S=10}else{S=(c[g>>2]&-2)-1|0}fj(p,S,0);if((a[q]&1)==0){T=A}else{T=c[B>>2]|0}c[r>>2]=T+R;U=T}else{U=n}F=E+12|0;J=c[F>>2]|0;V=E+16|0;if((J|0)==(c[V>>2]|0)){W=cW[c[(c[E>>2]|0)+36>>2]&255](E)|0}else{W=c[J>>2]|0}if((hD(W,v,w,U,r,D,m,o,y,t,u,x)|0)!=0){N=U;O=L;P=M;break}J=c[F>>2]|0;if((J|0)==(c[V>>2]|0)){V=c[(c[E>>2]|0)+40>>2]|0;cW[V&255](E)|0;n=U;z=E;continue}else{c[F>>2]=J+4;n=U;z=E;continue}}z=d[o]|0;if((z&1|0)==0){X=z>>>1}else{X=c[o+4>>2]|0}do{if((X|0)!=0){if((a[v]&1)==0){break}z=c[t>>2]|0;if((z-s|0)>=160){break}U=c[u>>2]|0;c[t>>2]=z+4;c[z>>2]=U}}while(0);h[l>>3]=+lC(N,c[r>>2]|0,k);jt(o,y,c[t>>2]|0,k);do{if(H){Y=0}else{t=c[E+12>>2]|0;if((t|0)==(c[E+16>>2]|0)){Z=cW[c[(c[E>>2]|0)+36>>2]&255](E)|0}else{Z=c[t>>2]|0}if((Z|0)!=-1){Y=E;break}c[j>>2]=0;Y=0}}while(0);j=(Y|0)==0;do{if(P){I=4244}else{E=c[O+12>>2]|0;if((E|0)==(c[O+16>>2]|0)){_=cW[c[(c[O>>2]|0)+36>>2]&255](O)|0}else{_=c[E>>2]|0}if((_|0)==-1){c[f>>2]=0;I=4244;break}if(!(j^(O|0)==0)){break}$=b|0;c[$>>2]=Y;fh(p);fh(o);i=e;return}}while(0);do{if((I|0)==4244){if(j){break}$=b|0;c[$>>2]=Y;fh(p);fh(o);i=e;return}}while(0);c[k>>2]=c[k>>2]|2;$=b|0;c[$>>2]=Y;fh(p);fh(o);i=e;return}function hw(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0;e=i;i=i+136|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+16|0;n=e+120|0;o=n;p=i;i=i+4|0;i=i+7&-8;q=i;i=i+12|0;i=i+7&-8;r=i;i=i+4|0;i=i+7&-8;s=i;i=i+160|0;t=i;i=i+4|0;i=i+7&-8;u=i;i=i+4|0;i=i+7&-8;mF(o|0,0,12)|0;o=q;fB(p,h);h=p|0;p=c[h>>2]|0;if((c[3924]|0)!=-1){c[l>>2]=15696;c[l+4>>2]=14;c[l+8>>2]=0;fc(15696,l,116)}l=(c[3925]|0)-1|0;v=c[p+8>>2]|0;do{if((c[p+12>>2]|0)-v>>2>>>0>l>>>0){w=c[v+(l<<2)>>2]|0;if((w|0)==0){break}x=w;y=m|0;z=c[(c[w>>2]|0)+48>>2]|0;c2[z&15](x,11808,11834,y)|0;x=c[h>>2]|0;eS(x)|0;mF(o|0,0,12)|0;x=q;fj(q,10,0);if((a[o]&1)==0){z=x+1|0;A=z;B=z;C=q+8|0}else{z=q+8|0;A=c[z>>2]|0;B=x+1|0;C=z}c[r>>2]=A;z=s|0;c[t>>2]=z;c[u>>2]=0;x=f|0;w=g|0;D=q|0;E=q+4|0;F=A;G=c[x>>2]|0;L4923:while(1){do{if((G|0)==0){H=0}else{I=c[G+12>>2]|0;if((I|0)==(c[G+16>>2]|0)){J=cW[c[(c[G>>2]|0)+36>>2]&255](G)|0}else{J=c[I>>2]|0}if((J|0)!=-1){H=G;break}c[x>>2]=0;H=0}}while(0);I=(H|0)==0;K=c[w>>2]|0;do{if((K|0)==0){L=4276}else{M=c[K+12>>2]|0;if((M|0)==(c[K+16>>2]|0)){N=cW[c[(c[K>>2]|0)+36>>2]&255](K)|0}else{N=c[M>>2]|0}if((N|0)==-1){c[w>>2]=0;L=4276;break}else{if(I^(K|0)==0){break}else{O=F;break L4923}}}}while(0);if((L|0)==4276){L=0;if(I){O=F;break}}K=d[o]|0;M=(K&1|0)==0;if(((c[r>>2]|0)-F|0)==((M?K>>>1:c[E>>2]|0)|0)){if(M){P=K>>>1;Q=K>>>1}else{K=c[E>>2]|0;P=K;Q=K}fj(q,P<<1,0);if((a[o]&1)==0){R=10}else{R=(c[D>>2]&-2)-1|0}fj(q,R,0);if((a[o]&1)==0){S=B}else{S=c[C>>2]|0}c[r>>2]=S+Q;T=S}else{T=F}K=H+12|0;M=c[K>>2]|0;U=H+16|0;if((M|0)==(c[U>>2]|0)){V=cW[c[(c[H>>2]|0)+36>>2]&255](H)|0}else{V=c[M>>2]|0}if((hx(V,16,T,r,u,0,n,z,t,y)|0)!=0){O=T;break}M=c[K>>2]|0;if((M|0)==(c[U>>2]|0)){U=c[(c[H>>2]|0)+40>>2]|0;cW[U&255](H)|0;F=T;G=H;continue}else{c[K>>2]=M+4;F=T;G=H;continue}}a[O+3|0]=0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);G=g9(O,c[3568]|0,1624,(F=i,i=i+8|0,c[F>>2]=k,F)|0)|0;i=F;if((G|0)!=1){c[j>>2]=4}G=c[x>>2]|0;do{if((G|0)==0){W=0}else{F=c[G+12>>2]|0;if((F|0)==(c[G+16>>2]|0)){X=cW[c[(c[G>>2]|0)+36>>2]&255](G)|0}else{X=c[F>>2]|0}if((X|0)!=-1){W=G;break}c[x>>2]=0;W=0}}while(0);x=(W|0)==0;G=c[w>>2]|0;do{if((G|0)==0){L=4321}else{F=c[G+12>>2]|0;if((F|0)==(c[G+16>>2]|0)){Y=cW[c[(c[G>>2]|0)+36>>2]&255](G)|0}else{Y=c[F>>2]|0}if((Y|0)==-1){c[w>>2]=0;L=4321;break}if(!(x^(G|0)==0)){break}Z=b|0;c[Z>>2]=W;fh(q);fh(n);i=e;return}}while(0);do{if((L|0)==4321){if(x){break}Z=b|0;c[Z>>2]=W;fh(q);fh(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;Z=b|0;c[Z>>2]=W;fh(q);fh(n);i=e;return}}while(0);e=cy(4)|0;l4(e);bK(e|0,10072,154)}function hx(b,e,f,g,h,i,j,k,l,m){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0;n=c[g>>2]|0;o=(n|0)==(f|0);do{if(o){p=(c[m+96>>2]|0)==(b|0);if(!p){if((c[m+100>>2]|0)!=(b|0)){break}}c[g>>2]=f+1;a[f]=p?43:45;c[h>>2]=0;q=0;return q|0}}while(0);p=d[j]|0;if((p&1|0)==0){r=p>>>1}else{r=c[j+4>>2]|0}if((r|0)!=0&(b|0)==(i|0)){i=c[l>>2]|0;if((i-k|0)>=160){q=0;return q|0}k=c[h>>2]|0;c[l>>2]=i+4;c[i>>2]=k;c[h>>2]=0;q=0;return q|0}k=m+104|0;i=m;while(1){if((i|0)==(k|0)){s=k;break}if((c[i>>2]|0)==(b|0)){s=i;break}else{i=i+4|0}}i=s-m|0;m=i>>2;if((i|0)>92){q=-1;return q|0}do{if((e|0)==16){if((i|0)<88){break}if(o){q=-1;return q|0}if((n-f|0)>=3){q=-1;return q|0}if((a[n-1|0]|0)!=48){q=-1;return q|0}c[h>>2]=0;s=a[11808+m|0]|0;b=c[g>>2]|0;c[g>>2]=b+1;a[b]=s;q=0;return q|0}else if((e|0)==8|(e|0)==10){if((m|0)<(e|0)){break}else{q=-1}return q|0}}while(0);e=a[11808+m|0]|0;c[g>>2]=n+1;a[n]=e;c[h>>2]=(c[h>>2]|0)+1;q=0;return q|0}function hy(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;g=i;i=i+40|0;h=g|0;j=g+16|0;k=g+32|0;fB(k,d);d=k|0;k=c[d>>2]|0;if((c[3926]|0)!=-1){c[j>>2]=15704;c[j+4>>2]=14;c[j+8>>2]=0;fc(15704,j,116)}j=(c[3927]|0)-1|0;l=c[k+8>>2]|0;do{if((c[k+12>>2]|0)-l>>2>>>0>j>>>0){m=c[l+(j<<2)>>2]|0;if((m|0)==0){break}n=m;o=c[(c[m>>2]|0)+32>>2]|0;c2[o&15](n,11808,11834,e)|0;n=c[d>>2]|0;if((c[3830]|0)!=-1){c[h>>2]=15320;c[h+4>>2]=14;c[h+8>>2]=0;fc(15320,h,116)}o=(c[3831]|0)-1|0;m=c[n+8>>2]|0;do{if((c[n+12>>2]|0)-m>>2>>>0>o>>>0){p=c[m+(o<<2)>>2]|0;if((p|0)==0){break}q=p;a[f]=cW[c[(c[p>>2]|0)+16>>2]&255](q)|0;cS[c[(c[p>>2]|0)+20>>2]&127](b,q);q=c[d>>2]|0;eS(q)|0;i=g;return}}while(0);o=cy(4)|0;l4(o);bK(o|0,10072,154)}}while(0);g=cy(4)|0;l4(g);bK(g|0,10072,154)}function hz(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;h=i;i=i+40|0;j=h|0;k=h+16|0;l=h+32|0;fB(l,d);d=l|0;l=c[d>>2]|0;if((c[3926]|0)!=-1){c[k>>2]=15704;c[k+4>>2]=14;c[k+8>>2]=0;fc(15704,k,116)}k=(c[3927]|0)-1|0;m=c[l+8>>2]|0;do{if((c[l+12>>2]|0)-m>>2>>>0>k>>>0){n=c[m+(k<<2)>>2]|0;if((n|0)==0){break}o=n;p=c[(c[n>>2]|0)+32>>2]|0;c2[p&15](o,11808,11840,e)|0;o=c[d>>2]|0;if((c[3830]|0)!=-1){c[j>>2]=15320;c[j+4>>2]=14;c[j+8>>2]=0;fc(15320,j,116)}p=(c[3831]|0)-1|0;n=c[o+8>>2]|0;do{if((c[o+12>>2]|0)-n>>2>>>0>p>>>0){q=c[n+(p<<2)>>2]|0;if((q|0)==0){break}r=q;s=q;a[f]=cW[c[(c[s>>2]|0)+12>>2]&255](r)|0;a[g]=cW[c[(c[s>>2]|0)+16>>2]&255](r)|0;cS[c[(c[q>>2]|0)+20>>2]&127](b,r);r=c[d>>2]|0;eS(r)|0;i=h;return}}while(0);p=cy(4)|0;l4(p);bK(p|0,10072,154)}}while(0);h=cy(4)|0;l4(h);bK(h|0,10072,154)}function hA(b,e,f,g,h,i,j,k,l,m,n,o){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;var p=0,q=0,r=0,s=0,t=0;if(b<<24>>24==i<<24>>24){if((a[e]&1)==0){p=-1;return p|0}a[e]=0;i=c[h>>2]|0;c[h>>2]=i+1;a[i]=46;i=d[k]|0;if((i&1|0)==0){q=i>>>1}else{q=c[k+4>>2]|0}if((q|0)==0){p=0;return p|0}q=c[m>>2]|0;if((q-l|0)>=160){p=0;return p|0}i=c[n>>2]|0;c[m>>2]=q+4;c[q>>2]=i;p=0;return p|0}do{if(b<<24>>24==j<<24>>24){i=d[k]|0;if((i&1|0)==0){r=i>>>1}else{r=c[k+4>>2]|0}if((r|0)==0){break}if((a[e]&1)==0){p=-1;return p|0}i=c[m>>2]|0;if((i-l|0)>=160){p=0;return p|0}q=c[n>>2]|0;c[m>>2]=i+4;c[i>>2]=q;c[n>>2]=0;p=0;return p|0}}while(0);r=o+32|0;j=o;while(1){if((j|0)==(r|0)){s=r;break}if((a[j]|0)==b<<24>>24){s=j;break}else{j=j+1|0}}j=s-o|0;if((j|0)>31){p=-1;return p|0}o=a[11808+j|0]|0;if((j|0)==22|(j|0)==23){a[f]=80;s=c[h>>2]|0;c[h>>2]=s+1;a[s]=o;p=0;return p|0}else if((j|0)==25|(j|0)==24){s=c[h>>2]|0;do{if((s|0)!=(g|0)){if((a[s-1|0]&95|0)==(a[f]&127|0)){break}else{p=-1}return p|0}}while(0);c[h>>2]=s+1;a[s]=o;p=0;return p|0}else{s=a[f]|0;do{if((o&95|0)==(s<<24>>24|0)){a[f]=s|-128;if((a[e]&1)==0){break}a[e]=0;g=d[k]|0;if((g&1|0)==0){t=g>>>1}else{t=c[k+4>>2]|0}if((t|0)==0){break}g=c[m>>2]|0;if((g-l|0)>=160){break}b=c[n>>2]|0;c[m>>2]=g+4;c[g>>2]=b}}while(0);m=c[h>>2]|0;c[h>>2]=m+1;a[m]=o;if((j|0)>21){p=0;return p|0}c[n>>2]=(c[n>>2]|0)+1;p=0;return p|0}return 0}function hB(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;f=i;i=i+40|0;g=f|0;h=f+16|0;j=f+32|0;fB(j,b);b=j|0;j=c[b>>2]|0;if((c[3924]|0)!=-1){c[h>>2]=15696;c[h+4>>2]=14;c[h+8>>2]=0;fc(15696,h,116)}h=(c[3925]|0)-1|0;k=c[j+8>>2]|0;do{if((c[j+12>>2]|0)-k>>2>>>0>h>>>0){l=c[k+(h<<2)>>2]|0;if((l|0)==0){break}m=l;n=c[(c[l>>2]|0)+48>>2]|0;c2[n&15](m,11808,11834,d)|0;m=c[b>>2]|0;if((c[3828]|0)!=-1){c[g>>2]=15312;c[g+4>>2]=14;c[g+8>>2]=0;fc(15312,g,116)}n=(c[3829]|0)-1|0;l=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-l>>2>>>0>n>>>0){o=c[l+(n<<2)>>2]|0;if((o|0)==0){break}p=o;c[e>>2]=cW[c[(c[o>>2]|0)+16>>2]&255](p)|0;cS[c[(c[o>>2]|0)+20>>2]&127](a,p);p=c[b>>2]|0;eS(p)|0;i=f;return}}while(0);n=cy(4)|0;l4(n);bK(n|0,10072,154)}}while(0);f=cy(4)|0;l4(f);bK(f|0,10072,154)}function hC(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;g=i;i=i+40|0;h=g|0;j=g+16|0;k=g+32|0;fB(k,b);b=k|0;k=c[b>>2]|0;if((c[3924]|0)!=-1){c[j>>2]=15696;c[j+4>>2]=14;c[j+8>>2]=0;fc(15696,j,116)}j=(c[3925]|0)-1|0;l=c[k+8>>2]|0;do{if((c[k+12>>2]|0)-l>>2>>>0>j>>>0){m=c[l+(j<<2)>>2]|0;if((m|0)==0){break}n=m;o=c[(c[m>>2]|0)+48>>2]|0;c2[o&15](n,11808,11840,d)|0;n=c[b>>2]|0;if((c[3828]|0)!=-1){c[h>>2]=15312;c[h+4>>2]=14;c[h+8>>2]=0;fc(15312,h,116)}o=(c[3829]|0)-1|0;m=c[n+8>>2]|0;do{if((c[n+12>>2]|0)-m>>2>>>0>o>>>0){p=c[m+(o<<2)>>2]|0;if((p|0)==0){break}q=p;r=p;c[e>>2]=cW[c[(c[r>>2]|0)+12>>2]&255](q)|0;c[f>>2]=cW[c[(c[r>>2]|0)+16>>2]&255](q)|0;cS[c[(c[p>>2]|0)+20>>2]&127](a,q);q=c[b>>2]|0;eS(q)|0;i=g;return}}while(0);o=cy(4)|0;l4(o);bK(o|0,10072,154)}}while(0);g=cy(4)|0;l4(g);bK(g|0,10072,154)}function hD(b,e,f,g,h,i,j,k,l,m,n,o){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;var p=0,q=0,r=0,s=0,t=0;if((b|0)==(i|0)){if((a[e]&1)==0){p=-1;return p|0}a[e]=0;i=c[h>>2]|0;c[h>>2]=i+1;a[i]=46;i=d[k]|0;if((i&1|0)==0){q=i>>>1}else{q=c[k+4>>2]|0}if((q|0)==0){p=0;return p|0}q=c[m>>2]|0;if((q-l|0)>=160){p=0;return p|0}i=c[n>>2]|0;c[m>>2]=q+4;c[q>>2]=i;p=0;return p|0}do{if((b|0)==(j|0)){i=d[k]|0;if((i&1|0)==0){r=i>>>1}else{r=c[k+4>>2]|0}if((r|0)==0){break}if((a[e]&1)==0){p=-1;return p|0}i=c[m>>2]|0;if((i-l|0)>=160){p=0;return p|0}q=c[n>>2]|0;c[m>>2]=i+4;c[i>>2]=q;c[n>>2]=0;p=0;return p|0}}while(0);r=o+128|0;j=o;while(1){if((j|0)==(r|0)){s=r;break}if((c[j>>2]|0)==(b|0)){s=j;break}else{j=j+4|0}}j=s-o|0;o=j>>2;if((j|0)>124){p=-1;return p|0}s=a[11808+o|0]|0;do{if((o|0)==22|(o|0)==23){a[f]=80}else if((o|0)==25|(o|0)==24){b=c[h>>2]|0;do{if((b|0)!=(g|0)){if((a[b-1|0]&95|0)==(a[f]&127|0)){break}else{p=-1}return p|0}}while(0);c[h>>2]=b+1;a[b]=s;p=0;return p|0}else{r=a[f]|0;if((s&95|0)!=(r<<24>>24|0)){break}a[f]=r|-128;if((a[e]&1)==0){break}a[e]=0;r=d[k]|0;if((r&1|0)==0){t=r>>>1}else{t=c[k+4>>2]|0}if((t|0)==0){break}r=c[m>>2]|0;if((r-l|0)>=160){break}q=c[n>>2]|0;c[m>>2]=r+4;c[r>>2]=q}}while(0);m=c[h>>2]|0;c[h>>2]=m+1;a[m]=s;if((j|0)>84){p=0;return p|0}c[n>>2]=(c[n>>2]|0)+1;p=0;return p|0}function hE(a){a=a|0;eQ(a|0);mw(a);return}function hF(a){a=a|0;eQ(a|0);return}function hG(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;j=i;i=i+48|0;k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=j|0;l=j+16|0;m=j+24|0;n=j+32|0;if((c[f+4>>2]&1|0)==0){o=c[(c[d>>2]|0)+24>>2]|0;c[l>>2]=c[e>>2];c1[o&63](b,d,l,f,g,h&1);i=j;return}fB(m,f);f=m|0;m=c[f>>2]|0;if((c[3830]|0)!=-1){c[k>>2]=15320;c[k+4>>2]=14;c[k+8>>2]=0;fc(15320,k,116)}k=(c[3831]|0)-1|0;g=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-g>>2>>>0>k>>>0){l=c[g+(k<<2)>>2]|0;if((l|0)==0){break}d=l;o=c[f>>2]|0;eS(o)|0;o=c[l>>2]|0;if(h){cS[c[o+24>>2]&127](n,d)}else{cS[c[o+28>>2]&127](n,d)}d=n;o=n;l=a[o]|0;if((l&1)==0){p=d+1|0;q=p;r=p;s=n+8|0}else{p=n+8|0;q=c[p>>2]|0;r=d+1|0;s=p}p=e|0;d=n+4|0;t=q;u=l;while(1){if((u&1)==0){v=r}else{v=c[s>>2]|0}l=u&255;if((t|0)==(v+((l&1|0)==0?l>>>1:c[d>>2]|0)|0)){break}l=a[t]|0;w=c[p>>2]|0;do{if((w|0)!=0){x=w+24|0;y=c[x>>2]|0;if((y|0)!=(c[w+28>>2]|0)){c[x>>2]=y+1;a[y]=l;break}if((cT[c[(c[w>>2]|0)+52>>2]&63](w,l&255)|0)!=-1){break}c[p>>2]=0}}while(0);t=t+1|0;u=a[o]|0}c[b>>2]=c[p>>2];fh(n);i=j;return}}while(0);j=cy(4)|0;l4(j);bK(j|0,10072,154)}function hH(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;d=i;i=i+80|0;j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=d|0;k=d+8|0;l=d+24|0;m=d+48|0;n=d+56|0;o=d+64|0;p=d+72|0;q=j|0;a[q]=a[3648]|0;a[q+1|0]=a[3649]|0;a[q+2|0]=a[3650]|0;a[q+3|0]=a[3651]|0;a[q+4|0]=a[3652]|0;a[q+5|0]=a[3653]|0;r=j+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=r}else{a[r]=43;u=j+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;u=v+1|0;v=t&74;do{if((v|0)==64){a[u]=111}else if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else{a[u]=100}}while(0);u=k|0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);t=hI(u,12,c[3568]|0,q,(q=i,i=i+8|0,c[q>>2]=h,q)|0)|0;i=q;q=k+t|0;h=c[s>>2]&176;do{if((h|0)==32){w=q}else if((h|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=k+1|0;break}if(!((t|0)>1&s<<24>>24==48)){x=4584;break}s=a[k+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=4584;break}w=k+2|0}else{x=4584}}while(0);if((x|0)==4584){w=u}x=l|0;fB(o,f);hJ(u,w,q,x,m,n,o);eS(c[o>>2]|0)|0;c[p>>2]=c[e>>2];dA(b,p,x,c[m>>2]|0,c[n>>2]|0,f,g);i=d;return}function hI(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0;g=i;i=i+16|0;h=g|0;j=h;c[j>>2]=f;c[j+4>>2]=0;j=cf(d|0)|0;d=cg(a|0,b|0,e|0,h|0)|0;if((j|0)==0){i=g;return d|0}cf(j|0)|0;i=g;return d|0}function hJ(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;l=i;i=i+48|0;m=l|0;n=l+16|0;o=l+32|0;p=k|0;k=c[p>>2]|0;if((c[3926]|0)!=-1){c[n>>2]=15704;c[n+4>>2]=14;c[n+8>>2]=0;fc(15704,n,116)}n=(c[3927]|0)-1|0;q=c[k+8>>2]|0;if((c[k+12>>2]|0)-q>>2>>>0<=n>>>0){r=cy(4)|0;s=r;l4(s);bK(r|0,10072,154)}k=c[q+(n<<2)>>2]|0;if((k|0)==0){r=cy(4)|0;s=r;l4(s);bK(r|0,10072,154)}r=k;s=c[p>>2]|0;if((c[3830]|0)!=-1){c[m>>2]=15320;c[m+4>>2]=14;c[m+8>>2]=0;fc(15320,m,116)}m=(c[3831]|0)-1|0;p=c[s+8>>2]|0;if((c[s+12>>2]|0)-p>>2>>>0<=m>>>0){t=cy(4)|0;u=t;l4(u);bK(t|0,10072,154)}s=c[p+(m<<2)>>2]|0;if((s|0)==0){t=cy(4)|0;u=t;l4(u);bK(t|0,10072,154)}t=s;cS[c[(c[s>>2]|0)+20>>2]&127](o,t);u=o;m=o;p=d[m]|0;if((p&1|0)==0){v=p>>>1}else{v=c[o+4>>2]|0}do{if((v|0)==0){p=c[(c[k>>2]|0)+32>>2]|0;c2[p&15](r,b,f,g)|0;c[j>>2]=g+(f-b)}else{c[j>>2]=g;p=a[b]|0;if((p<<24>>24|0)==45|(p<<24>>24|0)==43){n=cT[c[(c[k>>2]|0)+28>>2]&63](r,p)|0;p=c[j>>2]|0;c[j>>2]=p+1;a[p]=n;w=b+1|0}else{w=b}do{if((f-w|0)>1){if((a[w]|0)!=48){x=w;break}n=w+1|0;p=a[n]|0;if(!((p<<24>>24|0)==120|(p<<24>>24|0)==88)){x=w;break}p=k;q=cT[c[(c[p>>2]|0)+28>>2]&63](r,48)|0;y=c[j>>2]|0;c[j>>2]=y+1;a[y]=q;q=cT[c[(c[p>>2]|0)+28>>2]&63](r,a[n]|0)|0;n=c[j>>2]|0;c[j>>2]=n+1;a[n]=q;x=w+2|0}else{x=w}}while(0);do{if((x|0)!=(f|0)){q=f-1|0;if(x>>>0<q>>>0){z=x;A=q}else{break}do{q=a[z]|0;a[z]=a[A]|0;a[A]=q;z=z+1|0;A=A-1|0;}while(z>>>0<A>>>0)}}while(0);q=cW[c[(c[s>>2]|0)+16>>2]&255](t)|0;if(x>>>0<f>>>0){n=u+1|0;p=k;y=o+4|0;B=o+8|0;C=0;D=0;E=x;while(1){F=(a[m]&1)==0;do{if((a[(F?n:c[B>>2]|0)+D|0]|0)==0){G=D;H=C}else{if((C|0)!=(a[(F?n:c[B>>2]|0)+D|0]|0)){G=D;H=C;break}I=c[j>>2]|0;c[j>>2]=I+1;a[I]=q;I=d[m]|0;G=(D>>>0<(((I&1|0)==0?I>>>1:c[y>>2]|0)-1|0)>>>0)+D|0;H=0}}while(0);F=cT[c[(c[p>>2]|0)+28>>2]&63](r,a[E]|0)|0;I=c[j>>2]|0;c[j>>2]=I+1;a[I]=F;F=E+1|0;if(F>>>0<f>>>0){C=H+1|0;D=G;E=F}else{break}}}E=g+(x-b)|0;D=c[j>>2]|0;if((E|0)==(D|0)){break}C=D-1|0;if(E>>>0<C>>>0){J=E;K=C}else{break}do{C=a[J]|0;a[J]=a[K]|0;a[K]=C;J=J+1|0;K=K-1|0;}while(J>>>0<K>>>0)}}while(0);if((e|0)==(f|0)){L=c[j>>2]|0;c[h>>2]=L;fh(o);i=l;return}else{L=g+(e-b)|0;c[h>>2]=L;fh(o);i=l;return}}function hK(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;d=i;i=i+112|0;k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=d|0;l=d+8|0;m=d+32|0;n=d+80|0;o=d+88|0;p=d+96|0;q=d+104|0;c[k>>2]=37;c[k+4>>2]=0;r=k;k=r+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=k}else{a[k]=43;u=r+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;a[v+1|0]=108;u=v+2|0;v=t&74;do{if((v|0)==64){a[u]=111}else if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else{a[u]=100}}while(0);u=l|0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);t=hI(u,22,c[3568]|0,r,(r=i,i=i+16|0,c[r>>2]=h,c[r+8>>2]=j,r)|0)|0;i=r;r=l+t|0;j=c[s>>2]&176;do{if((j|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=l+1|0;break}if(!((t|0)>1&s<<24>>24==48)){x=4667;break}s=a[l+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=4667;break}w=l+2|0}else if((j|0)==32){w=r}else{x=4667}}while(0);if((x|0)==4667){w=u}x=m|0;fB(p,f);hJ(u,w,r,x,n,o,p);eS(c[p>>2]|0)|0;c[q>>2]=c[e>>2];dA(b,q,x,c[n>>2]|0,c[o>>2]|0,f,g);i=d;return}function hL(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;d=i;i=i+80|0;j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=d|0;k=d+8|0;l=d+24|0;m=d+48|0;n=d+56|0;o=d+64|0;p=d+72|0;q=j|0;a[q]=a[3648]|0;a[q+1|0]=a[3649]|0;a[q+2|0]=a[3650]|0;a[q+3|0]=a[3651]|0;a[q+4|0]=a[3652]|0;a[q+5|0]=a[3653]|0;r=j+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=r}else{a[r]=43;u=j+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;u=v+1|0;v=t&74;do{if((v|0)==64){a[u]=111}else if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else{a[u]=117}}while(0);u=k|0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);t=hI(u,12,c[3568]|0,q,(q=i,i=i+8|0,c[q>>2]=h,q)|0)|0;i=q;q=k+t|0;h=c[s>>2]&176;do{if((h|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=k+1|0;break}if(!((t|0)>1&s<<24>>24==48)){x=4692;break}s=a[k+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=4692;break}w=k+2|0}else if((h|0)==32){w=q}else{x=4692}}while(0);if((x|0)==4692){w=u}x=l|0;fB(o,f);hJ(u,w,q,x,m,n,o);eS(c[o>>2]|0)|0;c[p>>2]=c[e>>2];dA(b,p,x,c[m>>2]|0,c[n>>2]|0,f,g);i=d;return}function hM(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;d=i;i=i+112|0;k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=d|0;l=d+8|0;m=d+32|0;n=d+80|0;o=d+88|0;p=d+96|0;q=d+104|0;c[k>>2]=37;c[k+4>>2]=0;r=k;k=r+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=k}else{a[k]=43;u=r+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;a[v+1|0]=108;u=v+2|0;v=t&74;do{if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else if((v|0)==64){a[u]=111}else{a[u]=117}}while(0);u=l|0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);v=hI(u,23,c[3568]|0,r,(r=i,i=i+16|0,c[r>>2]=h,c[r+8>>2]=j,r)|0)|0;i=r;r=l+v|0;j=c[s>>2]&176;do{if((j|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=l+1|0;break}if(!((v|0)>1&s<<24>>24==48)){x=4717;break}s=a[l+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=4717;break}w=l+2|0}else if((j|0)==32){w=r}else{x=4717}}while(0);if((x|0)==4717){w=u}x=m|0;fB(p,f);hJ(u,w,r,x,n,o,p);eS(c[p>>2]|0)|0;c[q>>2]=c[e>>2];dA(b,q,x,c[n>>2]|0,c[o>>2]|0,f,g);i=d;return}function hN(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0;d=i;i=i+152|0;k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=d|0;l=d+8|0;m=d+40|0;n=d+48|0;o=d+112|0;p=d+120|0;q=d+128|0;r=d+136|0;s=d+144|0;c[k>>2]=37;c[k+4>>2]=0;t=k;k=t+1|0;u=f+4|0;v=c[u>>2]|0;if((v&2048|0)==0){w=k}else{a[k]=43;w=t+2|0}if((v&1024|0)==0){x=w}else{a[w]=35;x=w+1|0}w=v&260;k=v>>>14;do{if((w|0)==260){if((k&1|0)==0){a[x]=97;y=0;break}else{a[x]=65;y=0;break}}else{a[x]=46;v=x+2|0;a[x+1|0]=42;if((w|0)==4){if((k&1|0)==0){a[v]=102;y=1;break}else{a[v]=70;y=1;break}}else if((w|0)==256){if((k&1|0)==0){a[v]=101;y=1;break}else{a[v]=69;y=1;break}}else{if((k&1|0)==0){a[v]=103;y=1;break}else{a[v]=71;y=1;break}}}}while(0);k=l|0;c[m>>2]=k;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);l=c[3568]|0;if(y){w=hI(k,30,l,t,(z=i,i=i+16|0,c[z>>2]=c[f+8>>2],h[z+8>>3]=j,z)|0)|0;i=z;A=w}else{w=hI(k,30,l,t,(z=i,i=i+8|0,h[z>>3]=j,z)|0)|0;i=z;A=w}do{if((A|0)>29){w=(a[16264]|0)==0;if(y){do{if(w){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);l=hO(m,c[3568]|0,t,(z=i,i=i+16|0,c[z>>2]=c[f+8>>2],h[z+8>>3]=j,z)|0)|0;i=z;B=l}else{do{if(w){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);w=hO(m,c[3568]|0,t,(z=i,i=i+16|0,c[z>>2]=c[f+8>>2],h[z+8>>3]=j,z)|0)|0;i=z;B=w}w=c[m>>2]|0;if((w|0)!=0){C=B;D=w;E=w;break}mB();w=c[m>>2]|0;C=B;D=w;E=w}else{C=A;D=0;E=c[m>>2]|0}}while(0);A=E+C|0;B=c[u>>2]&176;do{if((B|0)==32){F=A}else if((B|0)==16){u=a[E]|0;if((u<<24>>24|0)==45|(u<<24>>24|0)==43){F=E+1|0;break}if(!((C|0)>1&u<<24>>24==48)){G=4773;break}u=a[E+1|0]|0;if(!((u<<24>>24|0)==120|(u<<24>>24|0)==88)){G=4773;break}F=E+2|0}else{G=4773}}while(0);if((G|0)==4773){F=E}do{if((E|0)==(k|0)){H=n|0;I=0;J=k}else{G=mp(C<<1)|0;if((G|0)!=0){H=G;I=G;J=E;break}mB();H=0;I=0;J=c[m>>2]|0}}while(0);fB(q,f);hP(J,F,A,H,o,p,q);eS(c[q>>2]|0)|0;q=e|0;c[s>>2]=c[q>>2];dA(r,s,H,c[o>>2]|0,c[p>>2]|0,f,g);g=c[r>>2]|0;c[q>>2]=g;c[b>>2]=g;if((I|0)!=0){mq(I)}if((D|0)==0){i=d;return}mq(D);i=d;return}function hO(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=i;i=i+16|0;g=f|0;h=g;c[h>>2]=e;c[h+4>>2]=0;h=cf(b|0)|0;b=cB(a|0,d|0,g|0)|0;if((h|0)==0){i=f;return b|0}cf(h|0)|0;i=f;return b|0}function hP(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;l=i;i=i+48|0;m=l|0;n=l+16|0;o=l+32|0;p=k|0;k=c[p>>2]|0;if((c[3926]|0)!=-1){c[n>>2]=15704;c[n+4>>2]=14;c[n+8>>2]=0;fc(15704,n,116)}n=(c[3927]|0)-1|0;q=c[k+8>>2]|0;if((c[k+12>>2]|0)-q>>2>>>0<=n>>>0){r=cy(4)|0;s=r;l4(s);bK(r|0,10072,154)}k=c[q+(n<<2)>>2]|0;if((k|0)==0){r=cy(4)|0;s=r;l4(s);bK(r|0,10072,154)}r=k;s=c[p>>2]|0;if((c[3830]|0)!=-1){c[m>>2]=15320;c[m+4>>2]=14;c[m+8>>2]=0;fc(15320,m,116)}m=(c[3831]|0)-1|0;p=c[s+8>>2]|0;if((c[s+12>>2]|0)-p>>2>>>0<=m>>>0){t=cy(4)|0;u=t;l4(u);bK(t|0,10072,154)}s=c[p+(m<<2)>>2]|0;if((s|0)==0){t=cy(4)|0;u=t;l4(u);bK(t|0,10072,154)}t=s;cS[c[(c[s>>2]|0)+20>>2]&127](o,t);c[j>>2]=g;u=a[b]|0;if((u<<24>>24|0)==45|(u<<24>>24|0)==43){m=cT[c[(c[k>>2]|0)+28>>2]&63](r,u)|0;u=c[j>>2]|0;c[j>>2]=u+1;a[u]=m;v=b+1|0}else{v=b}m=f;L5595:do{if((m-v|0)>1){if((a[v]|0)!=48){w=v;x=4839;break}u=v+1|0;p=a[u]|0;if(!((p<<24>>24|0)==120|(p<<24>>24|0)==88)){w=v;x=4839;break}p=k;n=cT[c[(c[p>>2]|0)+28>>2]&63](r,48)|0;q=c[j>>2]|0;c[j>>2]=q+1;a[q]=n;n=v+2|0;q=cT[c[(c[p>>2]|0)+28>>2]&63](r,a[u]|0)|0;u=c[j>>2]|0;c[j>>2]=u+1;a[u]=q;q=n;while(1){if(q>>>0>=f>>>0){y=q;z=n;break L5595}u=a[q]|0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);if((bn(u<<24>>24|0,c[3568]|0)|0)==0){y=q;z=n;break}else{q=q+1|0}}}else{w=v;x=4839}}while(0);L5610:do{if((x|0)==4839){while(1){x=0;if(w>>>0>=f>>>0){y=w;z=v;break L5610}q=a[w]|0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);if((cp(q<<24>>24|0,c[3568]|0)|0)==0){y=w;z=v;break}else{w=w+1|0;x=4839}}}}while(0);x=o;w=o;v=d[w]|0;if((v&1|0)==0){A=v>>>1}else{A=c[o+4>>2]|0}do{if((A|0)==0){v=c[j>>2]|0;u=c[(c[k>>2]|0)+32>>2]|0;c2[u&15](r,z,y,v)|0;c[j>>2]=(c[j>>2]|0)+(y-z)}else{do{if((z|0)!=(y|0)){v=y-1|0;if(z>>>0<v>>>0){B=z;C=v}else{break}do{v=a[B]|0;a[B]=a[C]|0;a[C]=v;B=B+1|0;C=C-1|0;}while(B>>>0<C>>>0)}}while(0);q=cW[c[(c[s>>2]|0)+16>>2]&255](t)|0;if(z>>>0<y>>>0){v=x+1|0;u=o+4|0;n=o+8|0;p=k;D=0;E=0;F=z;while(1){G=(a[w]&1)==0;do{if((a[(G?v:c[n>>2]|0)+E|0]|0)>0){if((D|0)!=(a[(G?v:c[n>>2]|0)+E|0]|0)){H=E;I=D;break}J=c[j>>2]|0;c[j>>2]=J+1;a[J]=q;J=d[w]|0;H=(E>>>0<(((J&1|0)==0?J>>>1:c[u>>2]|0)-1|0)>>>0)+E|0;I=0}else{H=E;I=D}}while(0);G=cT[c[(c[p>>2]|0)+28>>2]&63](r,a[F]|0)|0;J=c[j>>2]|0;c[j>>2]=J+1;a[J]=G;G=F+1|0;if(G>>>0<y>>>0){D=I+1|0;E=H;F=G}else{break}}}F=g+(z-b)|0;E=c[j>>2]|0;if((F|0)==(E|0)){break}D=E-1|0;if(F>>>0<D>>>0){K=F;L=D}else{break}do{D=a[K]|0;a[K]=a[L]|0;a[L]=D;K=K+1|0;L=L-1|0;}while(K>>>0<L>>>0)}}while(0);L5649:do{if(y>>>0<f>>>0){L=k;K=y;while(1){z=a[K]|0;if(z<<24>>24==46){break}H=cT[c[(c[L>>2]|0)+28>>2]&63](r,z)|0;z=c[j>>2]|0;c[j>>2]=z+1;a[z]=H;H=K+1|0;if(H>>>0<f>>>0){K=H}else{M=H;break L5649}}L=cW[c[(c[s>>2]|0)+12>>2]&255](t)|0;H=c[j>>2]|0;c[j>>2]=H+1;a[H]=L;M=K+1|0}else{M=y}}while(0);c2[c[(c[k>>2]|0)+32>>2]&15](r,M,f,c[j>>2]|0)|0;r=(c[j>>2]|0)+(m-M)|0;c[j>>2]=r;if((e|0)==(f|0)){N=r;c[h>>2]=N;fh(o);i=l;return}N=g+(e-b)|0;c[h>>2]=N;fh(o);i=l;return}function hQ(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0;d=i;i=i+152|0;k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=d|0;l=d+8|0;m=d+40|0;n=d+48|0;o=d+112|0;p=d+120|0;q=d+128|0;r=d+136|0;s=d+144|0;c[k>>2]=37;c[k+4>>2]=0;t=k;k=t+1|0;u=f+4|0;v=c[u>>2]|0;if((v&2048|0)==0){w=k}else{a[k]=43;w=t+2|0}if((v&1024|0)==0){x=w}else{a[w]=35;x=w+1|0}w=v&260;k=v>>>14;do{if((w|0)==260){a[x]=76;v=x+1|0;if((k&1|0)==0){a[v]=97;y=0;break}else{a[v]=65;y=0;break}}else{a[x]=46;a[x+1|0]=42;a[x+2|0]=76;v=x+3|0;if((w|0)==256){if((k&1|0)==0){a[v]=101;y=1;break}else{a[v]=69;y=1;break}}else if((w|0)==4){if((k&1|0)==0){a[v]=102;y=1;break}else{a[v]=70;y=1;break}}else{if((k&1|0)==0){a[v]=103;y=1;break}else{a[v]=71;y=1;break}}}}while(0);k=l|0;c[m>>2]=k;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);l=c[3568]|0;if(y){w=hI(k,30,l,t,(z=i,i=i+16|0,c[z>>2]=c[f+8>>2],h[z+8>>3]=j,z)|0)|0;i=z;A=w}else{w=hI(k,30,l,t,(z=i,i=i+8|0,h[z>>3]=j,z)|0)|0;i=z;A=w}do{if((A|0)>29){w=(a[16264]|0)==0;if(y){do{if(w){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);l=hO(m,c[3568]|0,t,(z=i,i=i+16|0,c[z>>2]=c[f+8>>2],h[z+8>>3]=j,z)|0)|0;i=z;B=l}else{do{if(w){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);w=hO(m,c[3568]|0,t,(z=i,i=i+8|0,h[z>>3]=j,z)|0)|0;i=z;B=w}w=c[m>>2]|0;if((w|0)!=0){C=B;D=w;E=w;break}mB();w=c[m>>2]|0;C=B;D=w;E=w}else{C=A;D=0;E=c[m>>2]|0}}while(0);A=E+C|0;B=c[u>>2]&176;do{if((B|0)==16){u=a[E]|0;if((u<<24>>24|0)==45|(u<<24>>24|0)==43){F=E+1|0;break}if(!((C|0)>1&u<<24>>24==48)){G=4936;break}u=a[E+1|0]|0;if(!((u<<24>>24|0)==120|(u<<24>>24|0)==88)){G=4936;break}F=E+2|0}else if((B|0)==32){F=A}else{G=4936}}while(0);if((G|0)==4936){F=E}do{if((E|0)==(k|0)){H=n|0;I=0;J=k}else{G=mp(C<<1)|0;if((G|0)!=0){H=G;I=G;J=E;break}mB();H=0;I=0;J=c[m>>2]|0}}while(0);fB(q,f);hP(J,F,A,H,o,p,q);eS(c[q>>2]|0)|0;q=e|0;c[s>>2]=c[q>>2];dA(r,s,H,c[o>>2]|0,c[p>>2]|0,f,g);g=c[r>>2]|0;c[q>>2]=g;c[b>>2]=g;if((I|0)!=0){mq(I)}if((D|0)==0){i=d;return}mq(D);i=d;return}function hR(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;d=i;i=i+104|0;j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=d|0;k=d+24|0;l=d+48|0;m=d+88|0;n=d+96|0;o=d+16|0;a[o]=a[3656]|0;a[o+1|0]=a[3657]|0;a[o+2|0]=a[3658]|0;a[o+3|0]=a[3659]|0;a[o+4|0]=a[3660]|0;a[o+5|0]=a[3661]|0;p=k|0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);q=hI(p,20,c[3568]|0,o,(o=i,i=i+8|0,c[o>>2]=h,o)|0)|0;i=o;o=k+q|0;h=c[f+4>>2]&176;do{if((h|0)==32){r=o}else if((h|0)==16){s=a[p]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){r=k+1|0;break}if(!((q|0)>1&s<<24>>24==48)){t=4969;break}s=a[k+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){t=4969;break}r=k+2|0}else{t=4969}}while(0);if((t|0)==4969){r=p}fB(m,f);t=m|0;m=c[t>>2]|0;if((c[3926]|0)!=-1){c[j>>2]=15704;c[j+4>>2]=14;c[j+8>>2]=0;fc(15704,j,116)}j=(c[3927]|0)-1|0;h=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-h>>2>>>0>j>>>0){s=c[h+(j<<2)>>2]|0;if((s|0)==0){break}u=s;v=c[t>>2]|0;eS(v)|0;v=l|0;w=c[(c[s>>2]|0)+32>>2]|0;c2[w&15](u,p,o,v)|0;u=l+q|0;if((r|0)==(o|0)){x=u;y=e|0;z=c[y>>2]|0;A=n|0;c[A>>2]=z;dA(b,n,v,x,u,f,g);i=d;return}x=l+(r-k)|0;y=e|0;z=c[y>>2]|0;A=n|0;c[A>>2]=z;dA(b,n,v,x,u,f,g);i=d;return}}while(0);d=cy(4)|0;l4(d);bK(d|0,10072,154)}function hS(a){a=a|0;eQ(a|0);mw(a);return}function hT(a){a=a|0;eQ(a|0);return}function hU(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;j=i;i=i+48|0;k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=j|0;l=j+16|0;m=j+24|0;n=j+32|0;if((c[f+4>>2]&1|0)==0){o=c[(c[d>>2]|0)+24>>2]|0;c[l>>2]=c[e>>2];c1[o&63](b,d,l,f,g,h&1);i=j;return}fB(m,f);f=m|0;m=c[f>>2]|0;if((c[3828]|0)!=-1){c[k>>2]=15312;c[k+4>>2]=14;c[k+8>>2]=0;fc(15312,k,116)}k=(c[3829]|0)-1|0;g=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-g>>2>>>0>k>>>0){l=c[g+(k<<2)>>2]|0;if((l|0)==0){break}d=l;o=c[f>>2]|0;eS(o)|0;o=c[l>>2]|0;if(h){cS[c[o+24>>2]&127](n,d)}else{cS[c[o+28>>2]&127](n,d)}d=n;o=a[d]|0;if((o&1)==0){l=n+4|0;p=l;q=l;r=n+8|0}else{l=n+8|0;p=c[l>>2]|0;q=n+4|0;r=l}l=e|0;s=p;t=o;while(1){if((t&1)==0){u=q}else{u=c[r>>2]|0}o=t&255;if((o&1|0)==0){v=o>>>1}else{v=c[q>>2]|0}if((s|0)==(u+(v<<2)|0)){break}o=c[s>>2]|0;w=c[l>>2]|0;do{if((w|0)!=0){x=w+24|0;y=c[x>>2]|0;if((y|0)==(c[w+28>>2]|0)){z=cT[c[(c[w>>2]|0)+52>>2]&63](w,o)|0}else{c[x>>2]=y+4;c[y>>2]=o;z=o}if((z|0)!=-1){break}c[l>>2]=0}}while(0);s=s+4|0;t=a[d]|0}c[b>>2]=c[l>>2];fs(n);i=j;return}}while(0);j=cy(4)|0;l4(j);bK(j|0,10072,154)}function hV(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;d=i;i=i+144|0;j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=d|0;k=d+8|0;l=d+24|0;m=d+112|0;n=d+120|0;o=d+128|0;p=d+136|0;q=j|0;a[q]=a[3648]|0;a[q+1|0]=a[3649]|0;a[q+2|0]=a[3650]|0;a[q+3|0]=a[3651]|0;a[q+4|0]=a[3652]|0;a[q+5|0]=a[3653]|0;r=j+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=r}else{a[r]=43;u=j+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;u=v+1|0;v=t&74;do{if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else if((v|0)==64){a[u]=111}else{a[u]=100}}while(0);u=k|0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);v=hI(u,12,c[3568]|0,q,(q=i,i=i+8|0,c[q>>2]=h,q)|0)|0;i=q;q=k+v|0;h=c[s>>2]&176;do{if((h|0)==32){w=q}else if((h|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=k+1|0;break}if(!((v|0)>1&s<<24>>24==48)){x=5040;break}s=a[k+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=5040;break}w=k+2|0}else{x=5040}}while(0);if((x|0)==5040){w=u}x=l|0;fB(o,f);hW(u,w,q,x,m,n,o);eS(c[o>>2]|0)|0;c[p>>2]=c[e>>2];hX(b,p,x,c[m>>2]|0,c[n>>2]|0,f,g);i=d;return}function hW(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;l=i;i=i+48|0;m=l|0;n=l+16|0;o=l+32|0;p=k|0;k=c[p>>2]|0;if((c[3924]|0)!=-1){c[n>>2]=15696;c[n+4>>2]=14;c[n+8>>2]=0;fc(15696,n,116)}n=(c[3925]|0)-1|0;q=c[k+8>>2]|0;if((c[k+12>>2]|0)-q>>2>>>0<=n>>>0){r=cy(4)|0;s=r;l4(s);bK(r|0,10072,154)}k=c[q+(n<<2)>>2]|0;if((k|0)==0){r=cy(4)|0;s=r;l4(s);bK(r|0,10072,154)}r=k;s=c[p>>2]|0;if((c[3828]|0)!=-1){c[m>>2]=15312;c[m+4>>2]=14;c[m+8>>2]=0;fc(15312,m,116)}m=(c[3829]|0)-1|0;p=c[s+8>>2]|0;if((c[s+12>>2]|0)-p>>2>>>0<=m>>>0){t=cy(4)|0;u=t;l4(u);bK(t|0,10072,154)}s=c[p+(m<<2)>>2]|0;if((s|0)==0){t=cy(4)|0;u=t;l4(u);bK(t|0,10072,154)}t=s;cS[c[(c[s>>2]|0)+20>>2]&127](o,t);u=o;m=o;p=d[m]|0;if((p&1|0)==0){v=p>>>1}else{v=c[o+4>>2]|0}do{if((v|0)==0){p=c[(c[k>>2]|0)+48>>2]|0;c2[p&15](r,b,f,g)|0;c[j>>2]=g+(f-b<<2)}else{c[j>>2]=g;p=a[b]|0;if((p<<24>>24|0)==45|(p<<24>>24|0)==43){n=cT[c[(c[k>>2]|0)+44>>2]&63](r,p)|0;p=c[j>>2]|0;c[j>>2]=p+4;c[p>>2]=n;w=b+1|0}else{w=b}do{if((f-w|0)>1){if((a[w]|0)!=48){x=w;break}n=w+1|0;p=a[n]|0;if(!((p<<24>>24|0)==120|(p<<24>>24|0)==88)){x=w;break}p=k;q=cT[c[(c[p>>2]|0)+44>>2]&63](r,48)|0;y=c[j>>2]|0;c[j>>2]=y+4;c[y>>2]=q;q=cT[c[(c[p>>2]|0)+44>>2]&63](r,a[n]|0)|0;n=c[j>>2]|0;c[j>>2]=n+4;c[n>>2]=q;x=w+2|0}else{x=w}}while(0);do{if((x|0)!=(f|0)){q=f-1|0;if(x>>>0<q>>>0){z=x;A=q}else{break}do{q=a[z]|0;a[z]=a[A]|0;a[A]=q;z=z+1|0;A=A-1|0;}while(z>>>0<A>>>0)}}while(0);q=cW[c[(c[s>>2]|0)+16>>2]&255](t)|0;if(x>>>0<f>>>0){n=u+1|0;p=k;y=o+4|0;B=o+8|0;C=0;D=0;E=x;while(1){F=(a[m]&1)==0;do{if((a[(F?n:c[B>>2]|0)+D|0]|0)==0){G=D;H=C}else{if((C|0)!=(a[(F?n:c[B>>2]|0)+D|0]|0)){G=D;H=C;break}I=c[j>>2]|0;c[j>>2]=I+4;c[I>>2]=q;I=d[m]|0;G=(D>>>0<(((I&1|0)==0?I>>>1:c[y>>2]|0)-1|0)>>>0)+D|0;H=0}}while(0);F=cT[c[(c[p>>2]|0)+44>>2]&63](r,a[E]|0)|0;I=c[j>>2]|0;c[j>>2]=I+4;c[I>>2]=F;F=E+1|0;if(F>>>0<f>>>0){C=H+1|0;D=G;E=F}else{break}}}E=g+(x-b<<2)|0;D=c[j>>2]|0;if((E|0)==(D|0)){break}C=D-4|0;if(E>>>0<C>>>0){J=E;K=C}else{break}do{C=c[J>>2]|0;c[J>>2]=c[K>>2];c[K>>2]=C;J=J+4|0;K=K-4|0;}while(J>>>0<K>>>0)}}while(0);if((e|0)==(f|0)){L=c[j>>2]|0;c[h>>2]=L;fh(o);i=l;return}else{L=g+(e-b<<2)|0;c[h>>2]=L;fh(o);i=l;return}}function hX(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;k=i;i=i+16|0;l=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[l>>2];l=k|0;m=d|0;d=c[m>>2]|0;if((d|0)==0){c[b>>2]=0;i=k;return}n=g;g=e;o=n-g>>2;p=h+12|0;h=c[p>>2]|0;q=(h|0)>(o|0)?h-o|0:0;o=f;h=o-g|0;g=h>>2;do{if((h|0)>0){if((cU[c[(c[d>>2]|0)+48>>2]&63](d,e,g)|0)==(g|0)){break}c[m>>2]=0;c[b>>2]=0;i=k;return}}while(0);do{if((q|0)>0){fr(l,q,j);if((a[l]&1)==0){r=l+4|0}else{r=c[l+8>>2]|0}if((cU[c[(c[d>>2]|0)+48>>2]&63](d,r,q)|0)==(q|0)){fs(l);break}c[m>>2]=0;c[b>>2]=0;fs(l);i=k;return}}while(0);l=n-o|0;o=l>>2;do{if((l|0)>0){if((cU[c[(c[d>>2]|0)+48>>2]&63](d,f,o)|0)==(o|0)){break}c[m>>2]=0;c[b>>2]=0;i=k;return}}while(0);c[p>>2]=0;c[b>>2]=d;i=k;return}function hY(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;d=i;i=i+232|0;k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=d|0;l=d+8|0;m=d+32|0;n=d+200|0;o=d+208|0;p=d+216|0;q=d+224|0;c[k>>2]=37;c[k+4>>2]=0;r=k;k=r+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=k}else{a[k]=43;u=r+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;a[v+1|0]=108;u=v+2|0;v=t&74;do{if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else if((v|0)==64){a[u]=111}else{a[u]=100}}while(0);u=l|0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);v=hI(u,22,c[3568]|0,r,(r=i,i=i+16|0,c[r>>2]=h,c[r+8>>2]=j,r)|0)|0;i=r;r=l+v|0;j=c[s>>2]&176;do{if((j|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=l+1|0;break}if(!((v|0)>1&s<<24>>24==48)){x=5141;break}s=a[l+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=5141;break}w=l+2|0}else if((j|0)==32){w=r}else{x=5141}}while(0);if((x|0)==5141){w=u}x=m|0;fB(p,f);hW(u,w,r,x,n,o,p);eS(c[p>>2]|0)|0;c[q>>2]=c[e>>2];hX(b,q,x,c[n>>2]|0,c[o>>2]|0,f,g);i=d;return}function hZ(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;d=i;i=i+144|0;j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=d|0;k=d+8|0;l=d+24|0;m=d+112|0;n=d+120|0;o=d+128|0;p=d+136|0;q=j|0;a[q]=a[3648]|0;a[q+1|0]=a[3649]|0;a[q+2|0]=a[3650]|0;a[q+3|0]=a[3651]|0;a[q+4|0]=a[3652]|0;a[q+5|0]=a[3653]|0;r=j+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=r}else{a[r]=43;u=j+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;u=v+1|0;v=t&74;do{if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else if((v|0)==64){a[u]=111}else{a[u]=117}}while(0);u=k|0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);v=hI(u,12,c[3568]|0,q,(q=i,i=i+8|0,c[q>>2]=h,q)|0)|0;i=q;q=k+v|0;h=c[s>>2]&176;do{if((h|0)==32){w=q}else if((h|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=k+1|0;break}if(!((v|0)>1&s<<24>>24==48)){x=5166;break}s=a[k+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=5166;break}w=k+2|0}else{x=5166}}while(0);if((x|0)==5166){w=u}x=l|0;fB(o,f);hW(u,w,q,x,m,n,o);eS(c[o>>2]|0)|0;c[p>>2]=c[e>>2];hX(b,p,x,c[m>>2]|0,c[n>>2]|0,f,g);i=d;return}function h_(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;d=i;i=i+240|0;k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=d|0;l=d+8|0;m=d+32|0;n=d+208|0;o=d+216|0;p=d+224|0;q=d+232|0;c[k>>2]=37;c[k+4>>2]=0;r=k;k=r+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=k}else{a[k]=43;u=r+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;a[v+1|0]=108;u=v+2|0;v=t&74;do{if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else if((v|0)==64){a[u]=111}else{a[u]=117}}while(0);u=l|0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);v=hI(u,23,c[3568]|0,r,(r=i,i=i+16|0,c[r>>2]=h,c[r+8>>2]=j,r)|0)|0;i=r;r=l+v|0;j=c[s>>2]&176;do{if((j|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=l+1|0;break}if(!((v|0)>1&s<<24>>24==48)){x=5191;break}s=a[l+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=5191;break}w=l+2|0}else if((j|0)==32){w=r}else{x=5191}}while(0);if((x|0)==5191){w=u}x=m|0;fB(p,f);hW(u,w,r,x,n,o,p);eS(c[p>>2]|0)|0;c[q>>2]=c[e>>2];hX(b,q,x,c[n>>2]|0,c[o>>2]|0,f,g);i=d;return}function h$(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0;d=i;i=i+320|0;k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=d|0;l=d+8|0;m=d+40|0;n=d+48|0;o=d+280|0;p=d+288|0;q=d+296|0;r=d+304|0;s=d+312|0;c[k>>2]=37;c[k+4>>2]=0;t=k;k=t+1|0;u=f+4|0;v=c[u>>2]|0;if((v&2048|0)==0){w=k}else{a[k]=43;w=t+2|0}if((v&1024|0)==0){x=w}else{a[w]=35;x=w+1|0}w=v&260;k=v>>>14;do{if((w|0)==260){if((k&1|0)==0){a[x]=97;y=0;break}else{a[x]=65;y=0;break}}else{a[x]=46;v=x+2|0;a[x+1|0]=42;if((w|0)==256){if((k&1|0)==0){a[v]=101;y=1;break}else{a[v]=69;y=1;break}}else if((w|0)==4){if((k&1|0)==0){a[v]=102;y=1;break}else{a[v]=70;y=1;break}}else{if((k&1|0)==0){a[v]=103;y=1;break}else{a[v]=71;y=1;break}}}}while(0);k=l|0;c[m>>2]=k;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);l=c[3568]|0;if(y){w=hI(k,30,l,t,(z=i,i=i+16|0,c[z>>2]=c[f+8>>2],h[z+8>>3]=j,z)|0)|0;i=z;A=w}else{w=hI(k,30,l,t,(z=i,i=i+8|0,h[z>>3]=j,z)|0)|0;i=z;A=w}do{if((A|0)>29){w=(a[16264]|0)==0;if(y){do{if(w){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);l=hO(m,c[3568]|0,t,(z=i,i=i+16|0,c[z>>2]=c[f+8>>2],h[z+8>>3]=j,z)|0)|0;i=z;B=l}else{do{if(w){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);w=hO(m,c[3568]|0,t,(z=i,i=i+16|0,c[z>>2]=c[f+8>>2],h[z+8>>3]=j,z)|0)|0;i=z;B=w}w=c[m>>2]|0;if((w|0)!=0){C=B;D=w;E=w;break}mB();w=c[m>>2]|0;C=B;D=w;E=w}else{C=A;D=0;E=c[m>>2]|0}}while(0);A=E+C|0;B=c[u>>2]&176;do{if((B|0)==16){u=a[E]|0;if((u<<24>>24|0)==45|(u<<24>>24|0)==43){F=E+1|0;break}if(!((C|0)>1&u<<24>>24==48)){G=5247;break}u=a[E+1|0]|0;if(!((u<<24>>24|0)==120|(u<<24>>24|0)==88)){G=5247;break}F=E+2|0}else if((B|0)==32){F=A}else{G=5247}}while(0);if((G|0)==5247){F=E}do{if((E|0)==(k|0)){H=n|0;I=0;J=k}else{G=mp(C<<3)|0;B=G;if((G|0)!=0){H=B;I=B;J=E;break}mB();H=B;I=B;J=c[m>>2]|0}}while(0);fB(q,f);h0(J,F,A,H,o,p,q);eS(c[q>>2]|0)|0;q=e|0;c[s>>2]=c[q>>2];hX(r,s,H,c[o>>2]|0,c[p>>2]|0,f,g);g=c[r>>2]|0;c[q>>2]=g;c[b>>2]=g;if((I|0)!=0){mq(I)}if((D|0)==0){i=d;return}mq(D);i=d;return}function h0(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;l=i;i=i+48|0;m=l|0;n=l+16|0;o=l+32|0;p=k|0;k=c[p>>2]|0;if((c[3924]|0)!=-1){c[n>>2]=15696;c[n+4>>2]=14;c[n+8>>2]=0;fc(15696,n,116)}n=(c[3925]|0)-1|0;q=c[k+8>>2]|0;if((c[k+12>>2]|0)-q>>2>>>0<=n>>>0){r=cy(4)|0;s=r;l4(s);bK(r|0,10072,154)}k=c[q+(n<<2)>>2]|0;if((k|0)==0){r=cy(4)|0;s=r;l4(s);bK(r|0,10072,154)}r=k;s=c[p>>2]|0;if((c[3828]|0)!=-1){c[m>>2]=15312;c[m+4>>2]=14;c[m+8>>2]=0;fc(15312,m,116)}m=(c[3829]|0)-1|0;p=c[s+8>>2]|0;if((c[s+12>>2]|0)-p>>2>>>0<=m>>>0){t=cy(4)|0;u=t;l4(u);bK(t|0,10072,154)}s=c[p+(m<<2)>>2]|0;if((s|0)==0){t=cy(4)|0;u=t;l4(u);bK(t|0,10072,154)}t=s;cS[c[(c[s>>2]|0)+20>>2]&127](o,t);c[j>>2]=g;u=a[b]|0;if((u<<24>>24|0)==45|(u<<24>>24|0)==43){m=cT[c[(c[k>>2]|0)+44>>2]&63](r,u)|0;u=c[j>>2]|0;c[j>>2]=u+4;c[u>>2]=m;v=b+1|0}else{v=b}m=f;L6134:do{if((m-v|0)>1){if((a[v]|0)!=48){w=v;x=5302;break}u=v+1|0;p=a[u]|0;if(!((p<<24>>24|0)==120|(p<<24>>24|0)==88)){w=v;x=5302;break}p=k;n=cT[c[(c[p>>2]|0)+44>>2]&63](r,48)|0;q=c[j>>2]|0;c[j>>2]=q+4;c[q>>2]=n;n=v+2|0;q=cT[c[(c[p>>2]|0)+44>>2]&63](r,a[u]|0)|0;u=c[j>>2]|0;c[j>>2]=u+4;c[u>>2]=q;q=n;while(1){if(q>>>0>=f>>>0){y=q;z=n;break L6134}u=a[q]|0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);if((bn(u<<24>>24|0,c[3568]|0)|0)==0){y=q;z=n;break}else{q=q+1|0}}}else{w=v;x=5302}}while(0);L6149:do{if((x|0)==5302){while(1){x=0;if(w>>>0>=f>>>0){y=w;z=v;break L6149}q=a[w]|0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);if((cp(q<<24>>24|0,c[3568]|0)|0)==0){y=w;z=v;break}else{w=w+1|0;x=5302}}}}while(0);x=o;w=o;v=d[w]|0;if((v&1|0)==0){A=v>>>1}else{A=c[o+4>>2]|0}do{if((A|0)==0){v=c[j>>2]|0;u=c[(c[k>>2]|0)+48>>2]|0;c2[u&15](r,z,y,v)|0;c[j>>2]=(c[j>>2]|0)+(y-z<<2)}else{do{if((z|0)!=(y|0)){v=y-1|0;if(z>>>0<v>>>0){B=z;C=v}else{break}do{v=a[B]|0;a[B]=a[C]|0;a[C]=v;B=B+1|0;C=C-1|0;}while(B>>>0<C>>>0)}}while(0);q=cW[c[(c[s>>2]|0)+16>>2]&255](t)|0;if(z>>>0<y>>>0){v=x+1|0;u=o+4|0;n=o+8|0;p=k;D=0;E=0;F=z;while(1){G=(a[w]&1)==0;do{if((a[(G?v:c[n>>2]|0)+E|0]|0)>0){if((D|0)!=(a[(G?v:c[n>>2]|0)+E|0]|0)){H=E;I=D;break}J=c[j>>2]|0;c[j>>2]=J+4;c[J>>2]=q;J=d[w]|0;H=(E>>>0<(((J&1|0)==0?J>>>1:c[u>>2]|0)-1|0)>>>0)+E|0;I=0}else{H=E;I=D}}while(0);G=cT[c[(c[p>>2]|0)+44>>2]&63](r,a[F]|0)|0;J=c[j>>2]|0;c[j>>2]=J+4;c[J>>2]=G;G=F+1|0;if(G>>>0<y>>>0){D=I+1|0;E=H;F=G}else{break}}}F=g+(z-b<<2)|0;E=c[j>>2]|0;if((F|0)==(E|0)){break}D=E-4|0;if(F>>>0<D>>>0){K=F;L=D}else{break}do{D=c[K>>2]|0;c[K>>2]=c[L>>2];c[L>>2]=D;K=K+4|0;L=L-4|0;}while(K>>>0<L>>>0)}}while(0);L6188:do{if(y>>>0<f>>>0){L=k;K=y;while(1){z=a[K]|0;if(z<<24>>24==46){break}H=cT[c[(c[L>>2]|0)+44>>2]&63](r,z)|0;z=c[j>>2]|0;c[j>>2]=z+4;c[z>>2]=H;H=K+1|0;if(H>>>0<f>>>0){K=H}else{M=H;break L6188}}L=cW[c[(c[s>>2]|0)+12>>2]&255](t)|0;H=c[j>>2]|0;c[j>>2]=H+4;c[H>>2]=L;M=K+1|0}else{M=y}}while(0);c2[c[(c[k>>2]|0)+48>>2]&15](r,M,f,c[j>>2]|0)|0;r=(c[j>>2]|0)+(m-M<<2)|0;c[j>>2]=r;if((e|0)==(f|0)){N=r;c[h>>2]=N;fh(o);i=l;return}N=g+(e-b<<2)|0;c[h>>2]=N;fh(o);i=l;return}function h1(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0;d=i;i=i+320|0;k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=d|0;l=d+8|0;m=d+40|0;n=d+48|0;o=d+280|0;p=d+288|0;q=d+296|0;r=d+304|0;s=d+312|0;c[k>>2]=37;c[k+4>>2]=0;t=k;k=t+1|0;u=f+4|0;v=c[u>>2]|0;if((v&2048|0)==0){w=k}else{a[k]=43;w=t+2|0}if((v&1024|0)==0){x=w}else{a[w]=35;x=w+1|0}w=v&260;k=v>>>14;do{if((w|0)==260){a[x]=76;v=x+1|0;if((k&1|0)==0){a[v]=97;y=0;break}else{a[v]=65;y=0;break}}else{a[x]=46;a[x+1|0]=42;a[x+2|0]=76;v=x+3|0;if((w|0)==4){if((k&1|0)==0){a[v]=102;y=1;break}else{a[v]=70;y=1;break}}else if((w|0)==256){if((k&1|0)==0){a[v]=101;y=1;break}else{a[v]=69;y=1;break}}else{if((k&1|0)==0){a[v]=103;y=1;break}else{a[v]=71;y=1;break}}}}while(0);k=l|0;c[m>>2]=k;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);l=c[3568]|0;if(y){w=hI(k,30,l,t,(z=i,i=i+16|0,c[z>>2]=c[f+8>>2],h[z+8>>3]=j,z)|0)|0;i=z;A=w}else{w=hI(k,30,l,t,(z=i,i=i+8|0,h[z>>3]=j,z)|0)|0;i=z;A=w}do{if((A|0)>29){w=(a[16264]|0)==0;if(y){do{if(w){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);l=hO(m,c[3568]|0,t,(z=i,i=i+16|0,c[z>>2]=c[f+8>>2],h[z+8>>3]=j,z)|0)|0;i=z;B=l}else{do{if(w){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);w=hO(m,c[3568]|0,t,(z=i,i=i+8|0,h[z>>3]=j,z)|0)|0;i=z;B=w}w=c[m>>2]|0;if((w|0)!=0){C=B;D=w;E=w;break}mB();w=c[m>>2]|0;C=B;D=w;E=w}else{C=A;D=0;E=c[m>>2]|0}}while(0);A=E+C|0;B=c[u>>2]&176;do{if((B|0)==16){u=a[E]|0;if((u<<24>>24|0)==45|(u<<24>>24|0)==43){F=E+1|0;break}if(!((C|0)>1&u<<24>>24==48)){G=5399;break}u=a[E+1|0]|0;if(!((u<<24>>24|0)==120|(u<<24>>24|0)==88)){G=5399;break}F=E+2|0}else if((B|0)==32){F=A}else{G=5399}}while(0);if((G|0)==5399){F=E}do{if((E|0)==(k|0)){H=n|0;I=0;J=k}else{G=mp(C<<3)|0;B=G;if((G|0)!=0){H=B;I=B;J=E;break}mB();H=B;I=B;J=c[m>>2]|0}}while(0);fB(q,f);h0(J,F,A,H,o,p,q);eS(c[q>>2]|0)|0;q=e|0;c[s>>2]=c[q>>2];hX(r,s,H,c[o>>2]|0,c[p>>2]|0,f,g);g=c[r>>2]|0;c[q>>2]=g;c[b>>2]=g;if((I|0)!=0){mq(I)}if((D|0)==0){i=d;return}mq(D);i=d;return}function h2(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;d=i;i=i+216|0;j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=d|0;k=d+24|0;l=d+48|0;m=d+200|0;n=d+208|0;o=d+16|0;a[o]=a[3656]|0;a[o+1|0]=a[3657]|0;a[o+2|0]=a[3658]|0;a[o+3|0]=a[3659]|0;a[o+4|0]=a[3660]|0;a[o+5|0]=a[3661]|0;p=k|0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);q=hI(p,20,c[3568]|0,o,(o=i,i=i+8|0,c[o>>2]=h,o)|0)|0;i=o;o=k+q|0;h=c[f+4>>2]&176;do{if((h|0)==16){r=a[p]|0;if((r<<24>>24|0)==45|(r<<24>>24|0)==43){s=k+1|0;break}if(!((q|0)>1&r<<24>>24==48)){t=5432;break}r=a[k+1|0]|0;if(!((r<<24>>24|0)==120|(r<<24>>24|0)==88)){t=5432;break}s=k+2|0}else if((h|0)==32){s=o}else{t=5432}}while(0);if((t|0)==5432){s=p}fB(m,f);t=m|0;m=c[t>>2]|0;if((c[3924]|0)!=-1){c[j>>2]=15696;c[j+4>>2]=14;c[j+8>>2]=0;fc(15696,j,116)}j=(c[3925]|0)-1|0;h=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-h>>2>>>0>j>>>0){r=c[h+(j<<2)>>2]|0;if((r|0)==0){break}u=r;v=c[t>>2]|0;eS(v)|0;v=l|0;w=c[(c[r>>2]|0)+48>>2]|0;c2[w&15](u,p,o,v)|0;u=l+(q<<2)|0;if((s|0)==(o|0)){x=u;y=e|0;z=c[y>>2]|0;A=n|0;c[A>>2]=z;hX(b,n,v,x,u,f,g);i=d;return}x=l+(s-k<<2)|0;y=e|0;z=c[y>>2]|0;A=n|0;c[A>>2]=z;hX(b,n,v,x,u,f,g);i=d;return}}while(0);d=cy(4)|0;l4(d);bK(d|0,10072,154)}function h3(d,e,f,g,h,j,k,l,m){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0;n=i;i=i+48|0;o=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[o>>2];o=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[o>>2];o=n|0;p=n+16|0;q=n+24|0;r=n+32|0;s=n+40|0;fB(p,h);t=p|0;p=c[t>>2]|0;if((c[3926]|0)!=-1){c[o>>2]=15704;c[o+4>>2]=14;c[o+8>>2]=0;fc(15704,o,116)}o=(c[3927]|0)-1|0;u=c[p+8>>2]|0;do{if((c[p+12>>2]|0)-u>>2>>>0>o>>>0){v=c[u+(o<<2)>>2]|0;if((v|0)==0){break}w=v;x=c[t>>2]|0;eS(x)|0;c[j>>2]=0;x=f|0;L7:do{if((l|0)==(m|0)){y=67}else{z=g|0;A=v;B=v;C=v+8|0;D=e;E=r|0;F=s|0;G=q|0;H=l;I=0;L9:while(1){J=I;while(1){if((J|0)!=0){y=67;break L7}K=c[x>>2]|0;do{if((K|0)==0){L=0}else{if((c[K+12>>2]|0)!=(c[K+16>>2]|0)){L=K;break}if((cW[c[(c[K>>2]|0)+36>>2]&255](K)|0)!=-1){L=K;break}c[x>>2]=0;L=0}}while(0);K=(L|0)==0;M=c[z>>2]|0;L19:do{if((M|0)==0){y=20}else{do{if((c[M+12>>2]|0)==(c[M+16>>2]|0)){if((cW[c[(c[M>>2]|0)+36>>2]&255](M)|0)!=-1){break}c[z>>2]=0;y=20;break L19}}while(0);if(K){N=M}else{y=21;break L9}}}while(0);if((y|0)==20){y=0;if(K){y=21;break L9}else{N=0}}if((cU[c[(c[A>>2]|0)+36>>2]&63](w,a[H]|0,0)|0)<<24>>24==37){y=24;break}M=a[H]|0;if(M<<24>>24>=0){O=c[C>>2]|0;if((b[O+(M<<24>>24<<1)>>1]&8192)!=0){P=H;y=35;break}}Q=L+12|0;M=c[Q>>2]|0;R=L+16|0;if((M|0)==(c[R>>2]|0)){S=(cW[c[(c[L>>2]|0)+36>>2]&255](L)|0)&255}else{S=a[M]|0}M=cT[c[(c[B>>2]|0)+12>>2]&63](w,S)|0;if(M<<24>>24==(cT[c[(c[B>>2]|0)+12>>2]&63](w,a[H]|0)|0)<<24>>24){y=62;break}c[j>>2]=4;J=4}L37:do{if((y|0)==24){y=0;J=H+1|0;if((J|0)==(m|0)){y=25;break L9}M=cU[c[(c[A>>2]|0)+36>>2]&63](w,a[J]|0,0)|0;if((M<<24>>24|0)==69|(M<<24>>24|0)==48){T=H+2|0;if((T|0)==(m|0)){y=28;break L9}U=M;V=cU[c[(c[A>>2]|0)+36>>2]&63](w,a[T]|0,0)|0;W=T}else{U=0;V=M;W=J}J=c[(c[D>>2]|0)+36>>2]|0;c[E>>2]=L;c[F>>2]=N;c$[J&7](q,e,r,s,h,j,k,V,U);c[x>>2]=c[G>>2];X=W+1|0}else if((y|0)==35){while(1){y=0;J=P+1|0;if((J|0)==(m|0)){Y=m;break}M=a[J]|0;if(M<<24>>24<0){Y=J;break}if((b[O+(M<<24>>24<<1)>>1]&8192)==0){Y=J;break}else{P=J;y=35}}K=L;J=N;while(1){do{if((K|0)==0){Z=0}else{if((c[K+12>>2]|0)!=(c[K+16>>2]|0)){Z=K;break}if((cW[c[(c[K>>2]|0)+36>>2]&255](K)|0)!=-1){Z=K;break}c[x>>2]=0;Z=0}}while(0);M=(Z|0)==0;do{if((J|0)==0){y=48}else{if((c[J+12>>2]|0)!=(c[J+16>>2]|0)){if(M){_=J;break}else{X=Y;break L37}}if((cW[c[(c[J>>2]|0)+36>>2]&255](J)|0)==-1){c[z>>2]=0;y=48;break}else{if(M^(J|0)==0){_=J;break}else{X=Y;break L37}}}}while(0);if((y|0)==48){y=0;if(M){X=Y;break L37}else{_=0}}T=Z+12|0;$=c[T>>2]|0;aa=Z+16|0;if(($|0)==(c[aa>>2]|0)){ab=(cW[c[(c[Z>>2]|0)+36>>2]&255](Z)|0)&255}else{ab=a[$]|0}if(ab<<24>>24<0){X=Y;break L37}if((b[(c[C>>2]|0)+(ab<<24>>24<<1)>>1]&8192)==0){X=Y;break L37}$=c[T>>2]|0;if(($|0)==(c[aa>>2]|0)){aa=c[(c[Z>>2]|0)+40>>2]|0;cW[aa&255](Z)|0;K=Z;J=_;continue}else{c[T>>2]=$+1;K=Z;J=_;continue}}}else if((y|0)==62){y=0;J=c[Q>>2]|0;if((J|0)==(c[R>>2]|0)){K=c[(c[L>>2]|0)+40>>2]|0;cW[K&255](L)|0}else{c[Q>>2]=J+1}X=H+1|0}}while(0);if((X|0)==(m|0)){y=67;break L7}H=X;I=c[j>>2]|0}if((y|0)==21){c[j>>2]=4;ac=L;break}else if((y|0)==25){c[j>>2]=4;ac=L;break}else if((y|0)==28){c[j>>2]=4;ac=L;break}}}while(0);if((y|0)==67){ac=c[x>>2]|0}w=f|0;do{if((ac|0)!=0){if((c[ac+12>>2]|0)!=(c[ac+16>>2]|0)){break}if((cW[c[(c[ac>>2]|0)+36>>2]&255](ac)|0)!=-1){break}c[w>>2]=0}}while(0);x=c[w>>2]|0;v=(x|0)==0;I=g|0;H=c[I>>2]|0;L95:do{if((H|0)==0){y=77}else{do{if((c[H+12>>2]|0)==(c[H+16>>2]|0)){if((cW[c[(c[H>>2]|0)+36>>2]&255](H)|0)!=-1){break}c[I>>2]=0;y=77;break L95}}while(0);if(!v){break}ad=d|0;c[ad>>2]=x;i=n;return}}while(0);do{if((y|0)==77){if(v){break}ad=d|0;c[ad>>2]=x;i=n;return}}while(0);c[j>>2]=c[j>>2]|2;ad=d|0;c[ad>>2]=x;i=n;return}}while(0);n=cy(4)|0;l4(n);bK(n|0,10072,154)}function h4(a){a=a|0;eQ(a|0);mw(a);return}function h5(a){a=a|0;eQ(a|0);return}function h6(a){a=a|0;return 2}function h7(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0;j=i;i=i+16|0;k=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[k>>2];k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=j|0;l=j+8|0;c[k>>2]=c[d>>2];c[l>>2]=c[e>>2];h3(a,b,k,l,f,g,h,3640,3648);i=j;return}function h8(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;k=i;i=i+16|0;l=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[l>>2];l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=k|0;m=k+8|0;n=d+8|0;o=cW[c[(c[n>>2]|0)+20>>2]&255](n)|0;c[l>>2]=c[e>>2];c[m>>2]=c[f>>2];f=o;e=a[o]|0;if((e&1)==0){p=f+1|0;q=f+1|0}else{f=c[o+8>>2]|0;p=f;q=f}f=e&255;if((f&1|0)==0){r=f>>>1}else{r=c[o+4>>2]|0}h3(b,d,l,m,g,h,j,q,p+r|0);i=k;return}function h9(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;j=i;i=i+32|0;k=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[k>>2];k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=j|0;l=j+8|0;m=j+24|0;fB(m,f);f=m|0;m=c[f>>2]|0;if((c[3926]|0)!=-1){c[l>>2]=15704;c[l+4>>2]=14;c[l+8>>2]=0;fc(15704,l,116)}l=(c[3927]|0)-1|0;n=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-n>>2>>>0>l>>>0){o=c[n+(l<<2)>>2]|0;if((o|0)==0){break}p=o;o=c[f>>2]|0;eS(o)|0;o=c[e>>2]|0;q=b+8|0;r=cW[c[c[q>>2]>>2]&255](q)|0;c[k>>2]=o;o=(gQ(d,k,r,r+168|0,p,g,0)|0)-r|0;if((o|0)>=168){s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}c[h+24>>2]=((o|0)/12|0|0)%7|0;s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}}while(0);j=cy(4)|0;l4(j);bK(j|0,10072,154)}function ia(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;j=i;i=i+32|0;k=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[k>>2];k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=j|0;l=j+8|0;m=j+24|0;fB(m,f);f=m|0;m=c[f>>2]|0;if((c[3926]|0)!=-1){c[l>>2]=15704;c[l+4>>2]=14;c[l+8>>2]=0;fc(15704,l,116)}l=(c[3927]|0)-1|0;n=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-n>>2>>>0>l>>>0){o=c[n+(l<<2)>>2]|0;if((o|0)==0){break}p=o;o=c[f>>2]|0;eS(o)|0;o=c[e>>2]|0;q=b+8|0;r=cW[c[(c[q>>2]|0)+4>>2]&255](q)|0;c[k>>2]=o;o=(gQ(d,k,r,r+288|0,p,g,0)|0)-r|0;if((o|0)>=288){s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}c[h+16>>2]=((o|0)/12|0|0)%12|0;s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}}while(0);j=cy(4)|0;l4(j);bK(j|0,10072,154)}function ib(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;b=i;i=i+32|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;l=b+24|0;fB(l,f);f=l|0;l=c[f>>2]|0;if((c[3926]|0)!=-1){c[k>>2]=15704;c[k+4>>2]=14;c[k+8>>2]=0;fc(15704,k,116)}k=(c[3927]|0)-1|0;m=c[l+8>>2]|0;do{if((c[l+12>>2]|0)-m>>2>>>0>k>>>0){n=c[m+(k<<2)>>2]|0;if((n|0)==0){break}o=n;n=c[f>>2]|0;eS(n)|0;c[j>>2]=c[e>>2];n=ih(d,j,g,o,4)|0;if((c[g>>2]&4|0)!=0){p=d|0;q=c[p>>2]|0;r=a|0;c[r>>2]=q;i=b;return}if((n|0)<69){s=n+2e3|0}else{s=(n-69|0)>>>0<31>>>0?n+1900|0:n}c[h+20>>2]=s-1900;p=d|0;q=c[p>>2]|0;r=a|0;c[r>>2]=q;i=b;return}}while(0);b=cy(4)|0;l4(b);bK(b|0,10072,154)}function ic(b,d,e,f,g,h,j,k,l){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0;l=i;i=i+328|0;m=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[m>>2];m=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[m>>2];m=l|0;n=l+8|0;o=l+16|0;p=l+24|0;q=l+32|0;r=l+40|0;s=l+48|0;t=l+56|0;u=l+64|0;v=l+72|0;w=l+80|0;x=l+88|0;y=l+96|0;z=l+112|0;A=l+120|0;B=l+128|0;C=l+136|0;D=l+144|0;E=l+152|0;F=l+160|0;G=l+168|0;H=l+176|0;I=l+184|0;J=l+192|0;K=l+200|0;L=l+208|0;M=l+216|0;N=l+224|0;O=l+232|0;P=l+240|0;Q=l+248|0;R=l+256|0;S=l+264|0;T=l+272|0;U=l+280|0;V=l+288|0;W=l+296|0;X=l+304|0;Y=l+312|0;Z=l+320|0;c[h>>2]=0;fB(z,g);_=z|0;z=c[_>>2]|0;if((c[3926]|0)!=-1){c[y>>2]=15704;c[y+4>>2]=14;c[y+8>>2]=0;fc(15704,y,116)}y=(c[3927]|0)-1|0;$=c[z+8>>2]|0;do{if((c[z+12>>2]|0)-$>>2>>>0>y>>>0){aa=c[$+(y<<2)>>2]|0;if((aa|0)==0){break}ab=aa;aa=c[_>>2]|0;eS(aa)|0;L172:do{switch(k<<24>>24|0){case 97:case 65:{aa=c[f>>2]|0;ac=d+8|0;ad=cW[c[c[ac>>2]>>2]&255](ac)|0;c[x>>2]=aa;aa=(gQ(e,x,ad,ad+168|0,ab,h,0)|0)-ad|0;if((aa|0)>=168){break L172}c[j+24>>2]=((aa|0)/12|0|0)%7|0;break};case 98:case 66:case 104:{aa=c[f>>2]|0;ad=d+8|0;ac=cW[c[(c[ad>>2]|0)+4>>2]&255](ad)|0;c[w>>2]=aa;aa=(gQ(e,w,ac,ac+288|0,ab,h,0)|0)-ac|0;if((aa|0)>=288){break L172}c[j+16>>2]=((aa|0)/12|0|0)%12|0;break};case 99:{aa=d+8|0;ac=cW[c[(c[aa>>2]|0)+12>>2]&255](aa)|0;aa=e|0;c[B>>2]=c[aa>>2];c[C>>2]=c[f>>2];ad=ac;ae=a[ac]|0;if((ae&1)==0){af=ad+1|0;ag=ad+1|0}else{ad=c[ac+8>>2]|0;af=ad;ag=ad}ad=ae&255;if((ad&1|0)==0){ah=ad>>>1}else{ah=c[ac+4>>2]|0}h3(A,d,B,C,g,h,j,ag,af+ah|0);c[aa>>2]=c[A>>2];break};case 100:case 101:{aa=j+12|0;c[v>>2]=c[f>>2];ac=ih(e,v,h,ab,2)|0;ad=c[h>>2]|0;do{if((ad&4|0)==0){if((ac-1|0)>>>0>=31>>>0){break}c[aa>>2]=ac;break L172}}while(0);c[h>>2]=ad|4;break};case 68:{ac=e|0;c[E>>2]=c[ac>>2];c[F>>2]=c[f>>2];h3(D,d,E,F,g,h,j,3632,3640);c[ac>>2]=c[D>>2];break};case 70:{ac=e|0;c[H>>2]=c[ac>>2];c[I>>2]=c[f>>2];h3(G,d,H,I,g,h,j,3624,3632);c[ac>>2]=c[G>>2];break};case 72:{c[u>>2]=c[f>>2];ac=ih(e,u,h,ab,2)|0;aa=c[h>>2]|0;if((aa&4|0)==0&(ac|0)<24){c[j+8>>2]=ac;break L172}else{c[h>>2]=aa|4;break L172}break};case 73:{aa=j+8|0;c[t>>2]=c[f>>2];ac=ih(e,t,h,ab,2)|0;ae=c[h>>2]|0;do{if((ae&4|0)==0){if((ac-1|0)>>>0>=12>>>0){break}c[aa>>2]=ac;break L172}}while(0);c[h>>2]=ae|4;break};case 106:{c[s>>2]=c[f>>2];ac=ih(e,s,h,ab,3)|0;aa=c[h>>2]|0;if((aa&4|0)==0&(ac|0)<366){c[j+28>>2]=ac;break L172}else{c[h>>2]=aa|4;break L172}break};case 109:{c[r>>2]=c[f>>2];aa=(ih(e,r,h,ab,2)|0)-1|0;ac=c[h>>2]|0;if((ac&4|0)==0&(aa|0)<12){c[j+16>>2]=aa;break L172}else{c[h>>2]=ac|4;break L172}break};case 77:{c[q>>2]=c[f>>2];ac=ih(e,q,h,ab,2)|0;aa=c[h>>2]|0;if((aa&4|0)==0&(ac|0)<60){c[j+4>>2]=ac;break L172}else{c[h>>2]=aa|4;break L172}break};case 110:case 116:{c[J>>2]=c[f>>2];id(0,e,J,h,ab);break};case 112:{c[K>>2]=c[f>>2];ie(d,j+8|0,e,K,h,ab);break};case 114:{aa=e|0;c[M>>2]=c[aa>>2];c[N>>2]=c[f>>2];h3(L,d,M,N,g,h,j,3608,3619);c[aa>>2]=c[L>>2];break};case 82:{aa=e|0;c[P>>2]=c[aa>>2];c[Q>>2]=c[f>>2];h3(O,d,P,Q,g,h,j,3600,3605);c[aa>>2]=c[O>>2];break};case 83:{c[p>>2]=c[f>>2];aa=ih(e,p,h,ab,2)|0;ac=c[h>>2]|0;if((ac&4|0)==0&(aa|0)<61){c[j>>2]=aa;break L172}else{c[h>>2]=ac|4;break L172}break};case 84:{ac=e|0;c[S>>2]=c[ac>>2];c[T>>2]=c[f>>2];h3(R,d,S,T,g,h,j,3592,3600);c[ac>>2]=c[R>>2];break};case 119:{c[o>>2]=c[f>>2];ac=ih(e,o,h,ab,1)|0;aa=c[h>>2]|0;if((aa&4|0)==0&(ac|0)<7){c[j+24>>2]=ac;break L172}else{c[h>>2]=aa|4;break L172}break};case 120:{aa=c[(c[d>>2]|0)+20>>2]|0;c[U>>2]=c[e>>2];c[V>>2]=c[f>>2];cX[aa&127](b,d,U,V,g,h,j);i=l;return};case 88:{aa=d+8|0;ac=cW[c[(c[aa>>2]|0)+24>>2]&255](aa)|0;aa=e|0;c[X>>2]=c[aa>>2];c[Y>>2]=c[f>>2];ad=ac;ai=a[ac]|0;if((ai&1)==0){aj=ad+1|0;ak=ad+1|0}else{ad=c[ac+8>>2]|0;aj=ad;ak=ad}ad=ai&255;if((ad&1|0)==0){al=ad>>>1}else{al=c[ac+4>>2]|0}h3(W,d,X,Y,g,h,j,ak,aj+al|0);c[aa>>2]=c[W>>2];break};case 121:{c[n>>2]=c[f>>2];aa=ih(e,n,h,ab,4)|0;if((c[h>>2]&4|0)!=0){break L172}if((aa|0)<69){am=aa+2e3|0}else{am=(aa-69|0)>>>0<31>>>0?aa+1900|0:aa}c[j+20>>2]=am-1900;break};case 89:{c[m>>2]=c[f>>2];aa=ih(e,m,h,ab,4)|0;if((c[h>>2]&4|0)!=0){break L172}c[j+20>>2]=aa-1900;break};case 37:{c[Z>>2]=c[f>>2];ig(0,e,Z,h,ab);break};default:{c[h>>2]=c[h>>2]|4}}}while(0);c[b>>2]=c[e>>2];i=l;return}}while(0);l=cy(4)|0;l4(l);bK(l|0,10072,154)}function id(d,e,f,g,h){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;d=i;j=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[j>>2];j=e|0;e=f|0;f=h+8|0;L253:while(1){h=c[j>>2]|0;do{if((h|0)==0){k=0}else{if((c[h+12>>2]|0)!=(c[h+16>>2]|0)){k=h;break}if((cW[c[(c[h>>2]|0)+36>>2]&255](h)|0)==-1){c[j>>2]=0;k=0;break}else{k=c[j>>2]|0;break}}}while(0);h=(k|0)==0;l=c[e>>2]|0;L262:do{if((l|0)==0){m=217}else{do{if((c[l+12>>2]|0)==(c[l+16>>2]|0)){if((cW[c[(c[l>>2]|0)+36>>2]&255](l)|0)!=-1){break}c[e>>2]=0;m=217;break L262}}while(0);if(h){n=l;o=0}else{p=l;q=0;break L253}}}while(0);if((m|0)==217){m=0;if(h){p=0;q=1;break}else{n=0;o=1}}l=c[j>>2]|0;r=c[l+12>>2]|0;if((r|0)==(c[l+16>>2]|0)){s=(cW[c[(c[l>>2]|0)+36>>2]&255](l)|0)&255}else{s=a[r]|0}if(s<<24>>24<0){p=n;q=o;break}if((b[(c[f>>2]|0)+(s<<24>>24<<1)>>1]&8192)==0){p=n;q=o;break}r=c[j>>2]|0;l=r+12|0;t=c[l>>2]|0;if((t|0)==(c[r+16>>2]|0)){u=c[(c[r>>2]|0)+40>>2]|0;cW[u&255](r)|0;continue}else{c[l>>2]=t+1;continue}}o=c[j>>2]|0;do{if((o|0)==0){v=0}else{if((c[o+12>>2]|0)!=(c[o+16>>2]|0)){v=o;break}if((cW[c[(c[o>>2]|0)+36>>2]&255](o)|0)==-1){c[j>>2]=0;v=0;break}else{v=c[j>>2]|0;break}}}while(0);j=(v|0)==0;do{if(q){m=236}else{if((c[p+12>>2]|0)!=(c[p+16>>2]|0)){if(!(j^(p|0)==0)){break}i=d;return}if((cW[c[(c[p>>2]|0)+36>>2]&255](p)|0)==-1){c[e>>2]=0;m=236;break}if(!j){break}i=d;return}}while(0);do{if((m|0)==236){if(j){break}i=d;return}}while(0);c[g>>2]=c[g>>2]|2;i=d;return}function ie(a,b,e,f,g,h){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0;j=i;i=i+8|0;k=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[k>>2];k=j|0;l=a+8|0;a=cW[c[(c[l>>2]|0)+8>>2]&255](l)|0;l=d[a]|0;if((l&1|0)==0){m=l>>>1}else{m=c[a+4>>2]|0}l=d[a+12|0]|0;if((l&1|0)==0){n=l>>>1}else{n=c[a+16>>2]|0}if((m|0)==(-n|0)){c[g>>2]=c[g>>2]|4;i=j;return}c[k>>2]=c[f>>2];f=gQ(e,k,a,a+24|0,h,g,0)|0;g=f-a|0;do{if((f|0)==(a|0)){if((c[b>>2]|0)!=12){break}c[b>>2]=0;i=j;return}}while(0);if((g|0)!=12){i=j;return}g=c[b>>2]|0;if((g|0)>=12){i=j;return}c[b>>2]=g+12;i=j;return}function ig(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0;b=i;h=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[h>>2];h=d|0;d=c[h>>2]|0;do{if((d|0)==0){j=0}else{if((c[d+12>>2]|0)!=(c[d+16>>2]|0)){j=d;break}if((cW[c[(c[d>>2]|0)+36>>2]&255](d)|0)==-1){c[h>>2]=0;j=0;break}else{j=c[h>>2]|0;break}}}while(0);d=(j|0)==0;j=e|0;e=c[j>>2]|0;L336:do{if((e|0)==0){k=274}else{do{if((c[e+12>>2]|0)==(c[e+16>>2]|0)){if((cW[c[(c[e>>2]|0)+36>>2]&255](e)|0)!=-1){break}c[j>>2]=0;k=274;break L336}}while(0);if(d){l=e;m=0}else{k=275}}}while(0);if((k|0)==274){if(d){k=275}else{l=0;m=1}}if((k|0)==275){c[f>>2]=c[f>>2]|6;i=b;return}d=c[h>>2]|0;e=c[d+12>>2]|0;if((e|0)==(c[d+16>>2]|0)){n=(cW[c[(c[d>>2]|0)+36>>2]&255](d)|0)&255}else{n=a[e]|0}if((cU[c[(c[g>>2]|0)+36>>2]&63](g,n,0)|0)<<24>>24!=37){c[f>>2]=c[f>>2]|4;i=b;return}n=c[h>>2]|0;g=n+12|0;e=c[g>>2]|0;if((e|0)==(c[n+16>>2]|0)){d=c[(c[n>>2]|0)+40>>2]|0;cW[d&255](n)|0}else{c[g>>2]=e+1}e=c[h>>2]|0;do{if((e|0)==0){o=0}else{if((c[e+12>>2]|0)!=(c[e+16>>2]|0)){o=e;break}if((cW[c[(c[e>>2]|0)+36>>2]&255](e)|0)==-1){c[h>>2]=0;o=0;break}else{o=c[h>>2]|0;break}}}while(0);h=(o|0)==0;do{if(m){k=294}else{if((c[l+12>>2]|0)!=(c[l+16>>2]|0)){if(!(h^(l|0)==0)){break}i=b;return}if((cW[c[(c[l>>2]|0)+36>>2]&255](l)|0)==-1){c[j>>2]=0;k=294;break}if(!h){break}i=b;return}}while(0);do{if((k|0)==294){if(h){break}i=b;return}}while(0);c[f>>2]=c[f>>2]|2;i=b;return}function ih(d,e,f,g,h){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;j=i;k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=d|0;d=c[k>>2]|0;do{if((d|0)==0){l=0}else{if((c[d+12>>2]|0)!=(c[d+16>>2]|0)){l=d;break}if((cW[c[(c[d>>2]|0)+36>>2]&255](d)|0)==-1){c[k>>2]=0;l=0;break}else{l=c[k>>2]|0;break}}}while(0);d=(l|0)==0;l=e|0;e=c[l>>2]|0;L390:do{if((e|0)==0){m=314}else{do{if((c[e+12>>2]|0)==(c[e+16>>2]|0)){if((cW[c[(c[e>>2]|0)+36>>2]&255](e)|0)!=-1){break}c[l>>2]=0;m=314;break L390}}while(0);if(d){n=e}else{m=315}}}while(0);if((m|0)==314){if(d){m=315}else{n=0}}if((m|0)==315){c[f>>2]=c[f>>2]|6;o=0;i=j;return o|0}d=c[k>>2]|0;e=c[d+12>>2]|0;if((e|0)==(c[d+16>>2]|0)){p=(cW[c[(c[d>>2]|0)+36>>2]&255](d)|0)&255}else{p=a[e]|0}do{if(p<<24>>24>=0){e=g+8|0;if((b[(c[e>>2]|0)+(p<<24>>24<<1)>>1]&2048)==0){break}d=g;q=(cU[c[(c[d>>2]|0)+36>>2]&63](g,p,0)|0)<<24>>24;r=c[k>>2]|0;s=r+12|0;t=c[s>>2]|0;if((t|0)==(c[r+16>>2]|0)){u=c[(c[r>>2]|0)+40>>2]|0;cW[u&255](r)|0;v=q;w=h;x=n}else{c[s>>2]=t+1;v=q;w=h;x=n}while(1){y=v-48|0;q=w-1|0;t=c[k>>2]|0;do{if((t|0)==0){z=0}else{if((c[t+12>>2]|0)!=(c[t+16>>2]|0)){z=t;break}if((cW[c[(c[t>>2]|0)+36>>2]&255](t)|0)==-1){c[k>>2]=0;z=0;break}else{z=c[k>>2]|0;break}}}while(0);t=(z|0)==0;if((x|0)==0){A=z;B=0}else{do{if((c[x+12>>2]|0)==(c[x+16>>2]|0)){if((cW[c[(c[x>>2]|0)+36>>2]&255](x)|0)!=-1){C=x;break}c[l>>2]=0;C=0}else{C=x}}while(0);A=c[k>>2]|0;B=C}D=(B|0)==0;if(!((t^D)&(q|0)>0)){m=344;break}s=c[A+12>>2]|0;if((s|0)==(c[A+16>>2]|0)){E=(cW[c[(c[A>>2]|0)+36>>2]&255](A)|0)&255}else{E=a[s]|0}if(E<<24>>24<0){o=y;m=362;break}if((b[(c[e>>2]|0)+(E<<24>>24<<1)>>1]&2048)==0){o=y;m=363;break}s=((cU[c[(c[d>>2]|0)+36>>2]&63](g,E,0)|0)<<24>>24)+(y*10|0)|0;r=c[k>>2]|0;u=r+12|0;F=c[u>>2]|0;if((F|0)==(c[r+16>>2]|0)){G=c[(c[r>>2]|0)+40>>2]|0;cW[G&255](r)|0;v=s;w=q;x=B;continue}else{c[u>>2]=F+1;v=s;w=q;x=B;continue}}if((m|0)==362){i=j;return o|0}else if((m|0)==363){i=j;return o|0}else if((m|0)==344){do{if((A|0)==0){H=0}else{if((c[A+12>>2]|0)!=(c[A+16>>2]|0)){H=A;break}if((cW[c[(c[A>>2]|0)+36>>2]&255](A)|0)==-1){c[k>>2]=0;H=0;break}else{H=c[k>>2]|0;break}}}while(0);d=(H|0)==0;L449:do{if(D){m=354}else{do{if((c[B+12>>2]|0)==(c[B+16>>2]|0)){if((cW[c[(c[B>>2]|0)+36>>2]&255](B)|0)!=-1){break}c[l>>2]=0;m=354;break L449}}while(0);if(d){o=y}else{break}i=j;return o|0}}while(0);do{if((m|0)==354){if(d){break}else{o=y}i=j;return o|0}}while(0);c[f>>2]=c[f>>2]|2;o=y;i=j;return o|0}}}while(0);c[f>>2]=c[f>>2]|4;o=0;i=j;return o|0}function ii(a,b,d,e,f,g,h,j,k){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0;l=i;i=i+48|0;m=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[m>>2];m=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[m>>2];m=l|0;n=l+16|0;o=l+24|0;p=l+32|0;q=l+40|0;fB(n,f);r=n|0;n=c[r>>2]|0;if((c[3924]|0)!=-1){c[m>>2]=15696;c[m+4>>2]=14;c[m+8>>2]=0;fc(15696,m,116)}m=(c[3925]|0)-1|0;s=c[n+8>>2]|0;do{if((c[n+12>>2]|0)-s>>2>>>0>m>>>0){t=c[s+(m<<2)>>2]|0;if((t|0)==0){break}u=t;v=c[r>>2]|0;eS(v)|0;c[g>>2]=0;v=d|0;L470:do{if((j|0)==(k|0)){w=434}else{x=e|0;y=t;z=t;A=t;B=b;C=p|0;D=q|0;E=o|0;F=j;G=0;L472:while(1){H=G;while(1){if((H|0)!=0){w=434;break L470}I=c[v>>2]|0;do{if((I|0)==0){J=0}else{K=c[I+12>>2]|0;if((K|0)==(c[I+16>>2]|0)){L=cW[c[(c[I>>2]|0)+36>>2]&255](I)|0}else{L=c[K>>2]|0}if((L|0)!=-1){J=I;break}c[v>>2]=0;J=0}}while(0);I=(J|0)==0;K=c[x>>2]|0;do{if((K|0)==0){w=386}else{M=c[K+12>>2]|0;if((M|0)==(c[K+16>>2]|0)){N=cW[c[(c[K>>2]|0)+36>>2]&255](K)|0}else{N=c[M>>2]|0}if((N|0)==-1){c[x>>2]=0;w=386;break}else{if(I^(K|0)==0){O=K;break}else{w=388;break L472}}}}while(0);if((w|0)==386){w=0;if(I){w=388;break L472}else{O=0}}if((cU[c[(c[y>>2]|0)+52>>2]&63](u,c[F>>2]|0,0)|0)<<24>>24==37){w=391;break}if(cU[c[(c[z>>2]|0)+12>>2]&63](u,8192,c[F>>2]|0)|0){P=F;w=401;break}Q=J+12|0;K=c[Q>>2]|0;R=J+16|0;if((K|0)==(c[R>>2]|0)){S=cW[c[(c[J>>2]|0)+36>>2]&255](J)|0}else{S=c[K>>2]|0}K=cT[c[(c[A>>2]|0)+28>>2]&63](u,S)|0;if((K|0)==(cT[c[(c[A>>2]|0)+28>>2]&63](u,c[F>>2]|0)|0)){w=429;break}c[g>>2]=4;H=4}L504:do{if((w|0)==391){w=0;H=F+4|0;if((H|0)==(k|0)){w=392;break L472}K=cU[c[(c[y>>2]|0)+52>>2]&63](u,c[H>>2]|0,0)|0;if((K<<24>>24|0)==69|(K<<24>>24|0)==48){M=F+8|0;if((M|0)==(k|0)){w=395;break L472}T=K;U=cU[c[(c[y>>2]|0)+52>>2]&63](u,c[M>>2]|0,0)|0;V=M}else{T=0;U=K;V=H}H=c[(c[B>>2]|0)+36>>2]|0;c[C>>2]=J;c[D>>2]=O;c$[H&7](o,b,p,q,f,g,h,U,T);c[v>>2]=c[E>>2];W=V+4|0}else if((w|0)==401){while(1){w=0;H=P+4|0;if((H|0)==(k|0)){X=k;break}if(cU[c[(c[z>>2]|0)+12>>2]&63](u,8192,c[H>>2]|0)|0){P=H;w=401}else{X=H;break}}I=J;H=O;while(1){do{if((I|0)==0){Y=0}else{K=c[I+12>>2]|0;if((K|0)==(c[I+16>>2]|0)){Z=cW[c[(c[I>>2]|0)+36>>2]&255](I)|0}else{Z=c[K>>2]|0}if((Z|0)!=-1){Y=I;break}c[v>>2]=0;Y=0}}while(0);K=(Y|0)==0;do{if((H|0)==0){w=416}else{M=c[H+12>>2]|0;if((M|0)==(c[H+16>>2]|0)){_=cW[c[(c[H>>2]|0)+36>>2]&255](H)|0}else{_=c[M>>2]|0}if((_|0)==-1){c[x>>2]=0;w=416;break}else{if(K^(H|0)==0){$=H;break}else{W=X;break L504}}}}while(0);if((w|0)==416){w=0;if(K){W=X;break L504}else{$=0}}M=Y+12|0;aa=c[M>>2]|0;ab=Y+16|0;if((aa|0)==(c[ab>>2]|0)){ac=cW[c[(c[Y>>2]|0)+36>>2]&255](Y)|0}else{ac=c[aa>>2]|0}if(!(cU[c[(c[z>>2]|0)+12>>2]&63](u,8192,ac)|0)){W=X;break L504}aa=c[M>>2]|0;if((aa|0)==(c[ab>>2]|0)){ab=c[(c[Y>>2]|0)+40>>2]|0;cW[ab&255](Y)|0;I=Y;H=$;continue}else{c[M>>2]=aa+4;I=Y;H=$;continue}}}else if((w|0)==429){w=0;H=c[Q>>2]|0;if((H|0)==(c[R>>2]|0)){I=c[(c[J>>2]|0)+40>>2]|0;cW[I&255](J)|0}else{c[Q>>2]=H+4}W=F+4|0}}while(0);if((W|0)==(k|0)){w=434;break L470}F=W;G=c[g>>2]|0}if((w|0)==392){c[g>>2]=4;ad=J;break}else if((w|0)==395){c[g>>2]=4;ad=J;break}else if((w|0)==388){c[g>>2]=4;ad=J;break}}}while(0);if((w|0)==434){ad=c[v>>2]|0}u=d|0;do{if((ad|0)!=0){t=c[ad+12>>2]|0;if((t|0)==(c[ad+16>>2]|0)){ae=cW[c[(c[ad>>2]|0)+36>>2]&255](ad)|0}else{ae=c[t>>2]|0}if((ae|0)!=-1){break}c[u>>2]=0}}while(0);v=c[u>>2]|0;t=(v|0)==0;G=e|0;F=c[G>>2]|0;do{if((F|0)==0){w=447}else{z=c[F+12>>2]|0;if((z|0)==(c[F+16>>2]|0)){af=cW[c[(c[F>>2]|0)+36>>2]&255](F)|0}else{af=c[z>>2]|0}if((af|0)==-1){c[G>>2]=0;w=447;break}if(!(t^(F|0)==0)){break}ag=a|0;c[ag>>2]=v;i=l;return}}while(0);do{if((w|0)==447){if(t){break}ag=a|0;c[ag>>2]=v;i=l;return}}while(0);c[g>>2]=c[g>>2]|2;ag=a|0;c[ag>>2]=v;i=l;return}}while(0);l=cy(4)|0;l4(l);bK(l|0,10072,154)}function ij(a){a=a|0;eQ(a|0);mw(a);return}function ik(a){a=a|0;eQ(a|0);return}function il(a){a=a|0;return 2}function im(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0;j=i;i=i+16|0;k=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[k>>2];k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=j|0;l=j+8|0;c[k>>2]=c[d>>2];c[l>>2]=c[e>>2];ii(a,b,k,l,f,g,h,3560,3592);i=j;return}function io(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;k=i;i=i+16|0;l=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[l>>2];l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=k|0;m=k+8|0;n=d+8|0;o=cW[c[(c[n>>2]|0)+20>>2]&255](n)|0;c[l>>2]=c[e>>2];c[m>>2]=c[f>>2];f=a[o]|0;if((f&1)==0){p=o+4|0;q=o+4|0}else{e=c[o+8>>2]|0;p=e;q=e}e=f&255;if((e&1|0)==0){r=e>>>1}else{r=c[o+4>>2]|0}ii(b,d,l,m,g,h,j,q,p+(r<<2)|0);i=k;return}function ip(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;j=i;i=i+32|0;k=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[k>>2];k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=j|0;l=j+8|0;m=j+24|0;fB(m,f);f=m|0;m=c[f>>2]|0;if((c[3924]|0)!=-1){c[l>>2]=15696;c[l+4>>2]=14;c[l+8>>2]=0;fc(15696,l,116)}l=(c[3925]|0)-1|0;n=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-n>>2>>>0>l>>>0){o=c[n+(l<<2)>>2]|0;if((o|0)==0){break}p=o;o=c[f>>2]|0;eS(o)|0;o=c[e>>2]|0;q=b+8|0;r=cW[c[c[q>>2]>>2]&255](q)|0;c[k>>2]=o;o=(hd(d,k,r,r+168|0,p,g,0)|0)-r|0;if((o|0)>=168){s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}c[h+24>>2]=((o|0)/12|0|0)%7|0;s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}}while(0);j=cy(4)|0;l4(j);bK(j|0,10072,154)}function iq(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;j=i;i=i+32|0;k=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[k>>2];k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=j|0;l=j+8|0;m=j+24|0;fB(m,f);f=m|0;m=c[f>>2]|0;if((c[3924]|0)!=-1){c[l>>2]=15696;c[l+4>>2]=14;c[l+8>>2]=0;fc(15696,l,116)}l=(c[3925]|0)-1|0;n=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-n>>2>>>0>l>>>0){o=c[n+(l<<2)>>2]|0;if((o|0)==0){break}p=o;o=c[f>>2]|0;eS(o)|0;o=c[e>>2]|0;q=b+8|0;r=cW[c[(c[q>>2]|0)+4>>2]&255](q)|0;c[k>>2]=o;o=(hd(d,k,r,r+288|0,p,g,0)|0)-r|0;if((o|0)>=288){s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}c[h+16>>2]=((o|0)/12|0|0)%12|0;s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}}while(0);j=cy(4)|0;l4(j);bK(j|0,10072,154)}function ir(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;b=i;i=i+32|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;l=b+24|0;fB(l,f);f=l|0;l=c[f>>2]|0;if((c[3924]|0)!=-1){c[k>>2]=15696;c[k+4>>2]=14;c[k+8>>2]=0;fc(15696,k,116)}k=(c[3925]|0)-1|0;m=c[l+8>>2]|0;do{if((c[l+12>>2]|0)-m>>2>>>0>k>>>0){n=c[m+(k<<2)>>2]|0;if((n|0)==0){break}o=n;n=c[f>>2]|0;eS(n)|0;c[j>>2]=c[e>>2];n=iw(d,j,g,o,4)|0;if((c[g>>2]&4|0)!=0){p=d|0;q=c[p>>2]|0;r=a|0;c[r>>2]=q;i=b;return}if((n|0)<69){s=n+2e3|0}else{s=(n-69|0)>>>0<31>>>0?n+1900|0:n}c[h+20>>2]=s-1900;p=d|0;q=c[p>>2]|0;r=a|0;c[r>>2]=q;i=b;return}}while(0);b=cy(4)|0;l4(b);bK(b|0,10072,154)}function is(b,d,e,f,g,h,j,k,l){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0;l=i;i=i+328|0;m=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[m>>2];m=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[m>>2];m=l|0;n=l+8|0;o=l+16|0;p=l+24|0;q=l+32|0;r=l+40|0;s=l+48|0;t=l+56|0;u=l+64|0;v=l+72|0;w=l+80|0;x=l+88|0;y=l+96|0;z=l+112|0;A=l+120|0;B=l+128|0;C=l+136|0;D=l+144|0;E=l+152|0;F=l+160|0;G=l+168|0;H=l+176|0;I=l+184|0;J=l+192|0;K=l+200|0;L=l+208|0;M=l+216|0;N=l+224|0;O=l+232|0;P=l+240|0;Q=l+248|0;R=l+256|0;S=l+264|0;T=l+272|0;U=l+280|0;V=l+288|0;W=l+296|0;X=l+304|0;Y=l+312|0;Z=l+320|0;c[h>>2]=0;fB(z,g);_=z|0;z=c[_>>2]|0;if((c[3924]|0)!=-1){c[y>>2]=15696;c[y+4>>2]=14;c[y+8>>2]=0;fc(15696,y,116)}y=(c[3925]|0)-1|0;$=c[z+8>>2]|0;do{if((c[z+12>>2]|0)-$>>2>>>0>y>>>0){aa=c[$+(y<<2)>>2]|0;if((aa|0)==0){break}ab=aa;aa=c[_>>2]|0;eS(aa)|0;L647:do{switch(k<<24>>24|0){case 99:{aa=d+8|0;ac=cW[c[(c[aa>>2]|0)+12>>2]&255](aa)|0;aa=e|0;c[B>>2]=c[aa>>2];c[C>>2]=c[f>>2];ad=a[ac]|0;if((ad&1)==0){ae=ac+4|0;af=ac+4|0}else{ag=c[ac+8>>2]|0;ae=ag;af=ag}ag=ad&255;if((ag&1|0)==0){ah=ag>>>1}else{ah=c[ac+4>>2]|0}ii(A,d,B,C,g,h,j,af,ae+(ah<<2)|0);c[aa>>2]=c[A>>2];break};case 73:{aa=j+8|0;c[t>>2]=c[f>>2];ac=iw(e,t,h,ab,2)|0;ag=c[h>>2]|0;do{if((ag&4|0)==0){if((ac-1|0)>>>0>=12>>>0){break}c[aa>>2]=ac;break L647}}while(0);c[h>>2]=ag|4;break};case 97:case 65:{ac=c[f>>2]|0;aa=d+8|0;ad=cW[c[c[aa>>2]>>2]&255](aa)|0;c[x>>2]=ac;ac=(hd(e,x,ad,ad+168|0,ab,h,0)|0)-ad|0;if((ac|0)>=168){break L647}c[j+24>>2]=((ac|0)/12|0|0)%7|0;break};case 98:case 66:case 104:{ac=c[f>>2]|0;ad=d+8|0;aa=cW[c[(c[ad>>2]|0)+4>>2]&255](ad)|0;c[w>>2]=ac;ac=(hd(e,w,aa,aa+288|0,ab,h,0)|0)-aa|0;if((ac|0)>=288){break L647}c[j+16>>2]=((ac|0)/12|0|0)%12|0;break};case 84:{ac=e|0;c[S>>2]=c[ac>>2];c[T>>2]=c[f>>2];ii(R,d,S,T,g,h,j,3424,3456);c[ac>>2]=c[R>>2];break};case 119:{c[o>>2]=c[f>>2];ac=iw(e,o,h,ab,1)|0;aa=c[h>>2]|0;if((aa&4|0)==0&(ac|0)<7){c[j+24>>2]=ac;break L647}else{c[h>>2]=aa|4;break L647}break};case 100:case 101:{aa=j+12|0;c[v>>2]=c[f>>2];ac=iw(e,v,h,ab,2)|0;ad=c[h>>2]|0;do{if((ad&4|0)==0){if((ac-1|0)>>>0>=31>>>0){break}c[aa>>2]=ac;break L647}}while(0);c[h>>2]=ad|4;break};case 121:{c[n>>2]=c[f>>2];ac=iw(e,n,h,ab,4)|0;if((c[h>>2]&4|0)!=0){break L647}if((ac|0)<69){ai=ac+2e3|0}else{ai=(ac-69|0)>>>0<31>>>0?ac+1900|0:ac}c[j+20>>2]=ai-1900;break};case 89:{c[m>>2]=c[f>>2];ac=iw(e,m,h,ab,4)|0;if((c[h>>2]&4|0)!=0){break L647}c[j+20>>2]=ac-1900;break};case 37:{c[Z>>2]=c[f>>2];iv(0,e,Z,h,ab);break};case 106:{c[s>>2]=c[f>>2];ac=iw(e,s,h,ab,3)|0;aa=c[h>>2]|0;if((aa&4|0)==0&(ac|0)<366){c[j+28>>2]=ac;break L647}else{c[h>>2]=aa|4;break L647}break};case 109:{c[r>>2]=c[f>>2];aa=(iw(e,r,h,ab,2)|0)-1|0;ac=c[h>>2]|0;if((ac&4|0)==0&(aa|0)<12){c[j+16>>2]=aa;break L647}else{c[h>>2]=ac|4;break L647}break};case 77:{c[q>>2]=c[f>>2];ac=iw(e,q,h,ab,2)|0;aa=c[h>>2]|0;if((aa&4|0)==0&(ac|0)<60){c[j+4>>2]=ac;break L647}else{c[h>>2]=aa|4;break L647}break};case 110:case 116:{c[J>>2]=c[f>>2];it(0,e,J,h,ab);break};case 112:{c[K>>2]=c[f>>2];iu(d,j+8|0,e,K,h,ab);break};case 114:{aa=e|0;c[M>>2]=c[aa>>2];c[N>>2]=c[f>>2];ii(L,d,M,N,g,h,j,3480,3524);c[aa>>2]=c[L>>2];break};case 82:{aa=e|0;c[P>>2]=c[aa>>2];c[Q>>2]=c[f>>2];ii(O,d,P,Q,g,h,j,3456,3476);c[aa>>2]=c[O>>2];break};case 83:{c[p>>2]=c[f>>2];aa=iw(e,p,h,ab,2)|0;ac=c[h>>2]|0;if((ac&4|0)==0&(aa|0)<61){c[j>>2]=aa;break L647}else{c[h>>2]=ac|4;break L647}break};case 120:{ac=c[(c[d>>2]|0)+20>>2]|0;c[U>>2]=c[e>>2];c[V>>2]=c[f>>2];cX[ac&127](b,d,U,V,g,h,j);i=l;return};case 88:{ac=d+8|0;aa=cW[c[(c[ac>>2]|0)+24>>2]&255](ac)|0;ac=e|0;c[X>>2]=c[ac>>2];c[Y>>2]=c[f>>2];ag=a[aa]|0;if((ag&1)==0){aj=aa+4|0;ak=aa+4|0}else{al=c[aa+8>>2]|0;aj=al;ak=al}al=ag&255;if((al&1|0)==0){am=al>>>1}else{am=c[aa+4>>2]|0}ii(W,d,X,Y,g,h,j,ak,aj+(am<<2)|0);c[ac>>2]=c[W>>2];break};case 68:{ac=e|0;c[E>>2]=c[ac>>2];c[F>>2]=c[f>>2];ii(D,d,E,F,g,h,j,3528,3560);c[ac>>2]=c[D>>2];break};case 70:{ac=e|0;c[H>>2]=c[ac>>2];c[I>>2]=c[f>>2];ii(G,d,H,I,g,h,j,3392,3424);c[ac>>2]=c[G>>2];break};case 72:{c[u>>2]=c[f>>2];ac=iw(e,u,h,ab,2)|0;aa=c[h>>2]|0;if((aa&4|0)==0&(ac|0)<24){c[j+8>>2]=ac;break L647}else{c[h>>2]=aa|4;break L647}break};default:{c[h>>2]=c[h>>2]|4}}}while(0);c[b>>2]=c[e>>2];i=l;return}}while(0);l=cy(4)|0;l4(l);bK(l|0,10072,154)}function it(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;a=i;g=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[g>>2];g=b|0;b=d|0;d=f;L728:while(1){h=c[g>>2]|0;do{if((h|0)==0){j=1}else{k=c[h+12>>2]|0;if((k|0)==(c[h+16>>2]|0)){l=cW[c[(c[h>>2]|0)+36>>2]&255](h)|0}else{l=c[k>>2]|0}if((l|0)==-1){c[g>>2]=0;j=1;break}else{j=(c[g>>2]|0)==0;break}}}while(0);h=c[b>>2]|0;do{if((h|0)==0){m=591}else{k=c[h+12>>2]|0;if((k|0)==(c[h+16>>2]|0)){n=cW[c[(c[h>>2]|0)+36>>2]&255](h)|0}else{n=c[k>>2]|0}if((n|0)==-1){c[b>>2]=0;m=591;break}else{k=(h|0)==0;if(j^k){o=h;p=k;break}else{q=h;r=k;break L728}}}}while(0);if((m|0)==591){m=0;if(j){q=0;r=1;break}else{o=0;p=1}}h=c[g>>2]|0;k=c[h+12>>2]|0;if((k|0)==(c[h+16>>2]|0)){s=cW[c[(c[h>>2]|0)+36>>2]&255](h)|0}else{s=c[k>>2]|0}if(!(cU[c[(c[d>>2]|0)+12>>2]&63](f,8192,s)|0)){q=o;r=p;break}k=c[g>>2]|0;h=k+12|0;t=c[h>>2]|0;if((t|0)==(c[k+16>>2]|0)){u=c[(c[k>>2]|0)+40>>2]|0;cW[u&255](k)|0;continue}else{c[h>>2]=t+4;continue}}p=c[g>>2]|0;do{if((p|0)==0){v=1}else{o=c[p+12>>2]|0;if((o|0)==(c[p+16>>2]|0)){w=cW[c[(c[p>>2]|0)+36>>2]&255](p)|0}else{w=c[o>>2]|0}if((w|0)==-1){c[g>>2]=0;v=1;break}else{v=(c[g>>2]|0)==0;break}}}while(0);do{if(r){m=613}else{g=c[q+12>>2]|0;if((g|0)==(c[q+16>>2]|0)){x=cW[c[(c[q>>2]|0)+36>>2]&255](q)|0}else{x=c[g>>2]|0}if((x|0)==-1){c[b>>2]=0;m=613;break}if(!(v^(q|0)==0)){break}i=a;return}}while(0);do{if((m|0)==613){if(v){break}i=a;return}}while(0);c[e>>2]=c[e>>2]|2;i=a;return}function iu(a,b,e,f,g,h){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0;j=i;i=i+8|0;k=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[k>>2];k=j|0;l=a+8|0;a=cW[c[(c[l>>2]|0)+8>>2]&255](l)|0;l=d[a]|0;if((l&1|0)==0){m=l>>>1}else{m=c[a+4>>2]|0}l=d[a+12|0]|0;if((l&1|0)==0){n=l>>>1}else{n=c[a+16>>2]|0}if((m|0)==(-n|0)){c[g>>2]=c[g>>2]|4;i=j;return}c[k>>2]=c[f>>2];f=hd(e,k,a,a+24|0,h,g,0)|0;g=f-a|0;do{if((f|0)==(a|0)){if((c[b>>2]|0)!=12){break}c[b>>2]=0;i=j;return}}while(0);if((g|0)!=12){i=j;return}g=c[b>>2]|0;if((g|0)>=12){i=j;return}c[b>>2]=g+12;i=j;return}function iv(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;a=i;g=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[g>>2];g=b|0;b=c[g>>2]|0;do{if((b|0)==0){h=1}else{j=c[b+12>>2]|0;if((j|0)==(c[b+16>>2]|0)){k=cW[c[(c[b>>2]|0)+36>>2]&255](b)|0}else{k=c[j>>2]|0}if((k|0)==-1){c[g>>2]=0;h=1;break}else{h=(c[g>>2]|0)==0;break}}}while(0);k=d|0;d=c[k>>2]|0;do{if((d|0)==0){l=653}else{b=c[d+12>>2]|0;if((b|0)==(c[d+16>>2]|0)){m=cW[c[(c[d>>2]|0)+36>>2]&255](d)|0}else{m=c[b>>2]|0}if((m|0)==-1){c[k>>2]=0;l=653;break}else{b=(d|0)==0;if(h^b){n=d;o=b;break}else{l=655;break}}}}while(0);if((l|0)==653){if(h){l=655}else{n=0;o=1}}if((l|0)==655){c[e>>2]=c[e>>2]|6;i=a;return}h=c[g>>2]|0;d=c[h+12>>2]|0;if((d|0)==(c[h+16>>2]|0)){p=cW[c[(c[h>>2]|0)+36>>2]&255](h)|0}else{p=c[d>>2]|0}if((cU[c[(c[f>>2]|0)+52>>2]&63](f,p,0)|0)<<24>>24!=37){c[e>>2]=c[e>>2]|4;i=a;return}p=c[g>>2]|0;f=p+12|0;d=c[f>>2]|0;if((d|0)==(c[p+16>>2]|0)){h=c[(c[p>>2]|0)+40>>2]|0;cW[h&255](p)|0}else{c[f>>2]=d+4}d=c[g>>2]|0;do{if((d|0)==0){q=1}else{f=c[d+12>>2]|0;if((f|0)==(c[d+16>>2]|0)){r=cW[c[(c[d>>2]|0)+36>>2]&255](d)|0}else{r=c[f>>2]|0}if((r|0)==-1){c[g>>2]=0;q=1;break}else{q=(c[g>>2]|0)==0;break}}}while(0);do{if(o){l=677}else{g=c[n+12>>2]|0;if((g|0)==(c[n+16>>2]|0)){s=cW[c[(c[n>>2]|0)+36>>2]&255](n)|0}else{s=c[g>>2]|0}if((s|0)==-1){c[k>>2]=0;l=677;break}if(!(q^(n|0)==0)){break}i=a;return}}while(0);do{if((l|0)==677){if(q){break}i=a;return}}while(0);c[e>>2]=c[e>>2]|2;i=a;return}function iw(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0;g=i;h=b;b=i;i=i+4|0;i=i+7&-8;c[b>>2]=c[h>>2];h=a|0;a=c[h>>2]|0;do{if((a|0)==0){j=1}else{k=c[a+12>>2]|0;if((k|0)==(c[a+16>>2]|0)){l=cW[c[(c[a>>2]|0)+36>>2]&255](a)|0}else{l=c[k>>2]|0}if((l|0)==-1){c[h>>2]=0;j=1;break}else{j=(c[h>>2]|0)==0;break}}}while(0);l=b|0;b=c[l>>2]|0;do{if((b|0)==0){m=699}else{a=c[b+12>>2]|0;if((a|0)==(c[b+16>>2]|0)){n=cW[c[(c[b>>2]|0)+36>>2]&255](b)|0}else{n=c[a>>2]|0}if((n|0)==-1){c[l>>2]=0;m=699;break}else{if(j^(b|0)==0){o=b;break}else{m=701;break}}}}while(0);if((m|0)==699){if(j){m=701}else{o=0}}if((m|0)==701){c[d>>2]=c[d>>2]|6;p=0;i=g;return p|0}j=c[h>>2]|0;b=c[j+12>>2]|0;if((b|0)==(c[j+16>>2]|0)){q=cW[c[(c[j>>2]|0)+36>>2]&255](j)|0}else{q=c[b>>2]|0}b=e;if(!(cU[c[(c[b>>2]|0)+12>>2]&63](e,2048,q)|0)){c[d>>2]=c[d>>2]|4;p=0;i=g;return p|0}j=e;n=(cU[c[(c[j>>2]|0)+52>>2]&63](e,q,0)|0)<<24>>24;q=c[h>>2]|0;a=q+12|0;k=c[a>>2]|0;if((k|0)==(c[q+16>>2]|0)){r=c[(c[q>>2]|0)+40>>2]|0;cW[r&255](q)|0;s=n;t=f;u=o}else{c[a>>2]=k+4;s=n;t=f;u=o}while(1){v=s-48|0;o=t-1|0;f=c[h>>2]|0;do{if((f|0)==0){w=0}else{n=c[f+12>>2]|0;if((n|0)==(c[f+16>>2]|0)){x=cW[c[(c[f>>2]|0)+36>>2]&255](f)|0}else{x=c[n>>2]|0}if((x|0)==-1){c[h>>2]=0;w=0;break}else{w=c[h>>2]|0;break}}}while(0);f=(w|0)==0;if((u|0)==0){y=w;z=0}else{n=c[u+12>>2]|0;if((n|0)==(c[u+16>>2]|0)){A=cW[c[(c[u>>2]|0)+36>>2]&255](u)|0}else{A=c[n>>2]|0}if((A|0)==-1){c[l>>2]=0;B=0}else{B=u}y=c[h>>2]|0;z=B}C=(z|0)==0;if(!((f^C)&(o|0)>0)){break}f=c[y+12>>2]|0;if((f|0)==(c[y+16>>2]|0)){D=cW[c[(c[y>>2]|0)+36>>2]&255](y)|0}else{D=c[f>>2]|0}if(!(cU[c[(c[b>>2]|0)+12>>2]&63](e,2048,D)|0)){p=v;m=750;break}f=((cU[c[(c[j>>2]|0)+52>>2]&63](e,D,0)|0)<<24>>24)+(v*10|0)|0;n=c[h>>2]|0;k=n+12|0;a=c[k>>2]|0;if((a|0)==(c[n+16>>2]|0)){q=c[(c[n>>2]|0)+40>>2]|0;cW[q&255](n)|0;s=f;t=o;u=z;continue}else{c[k>>2]=a+4;s=f;t=o;u=z;continue}}if((m|0)==750){i=g;return p|0}do{if((y|0)==0){E=1}else{u=c[y+12>>2]|0;if((u|0)==(c[y+16>>2]|0)){F=cW[c[(c[y>>2]|0)+36>>2]&255](y)|0}else{F=c[u>>2]|0}if((F|0)==-1){c[h>>2]=0;E=1;break}else{E=(c[h>>2]|0)==0;break}}}while(0);do{if(C){m=745}else{h=c[z+12>>2]|0;if((h|0)==(c[z+16>>2]|0)){G=cW[c[(c[z>>2]|0)+36>>2]&255](z)|0}else{G=c[h>>2]|0}if((G|0)==-1){c[l>>2]=0;m=745;break}if(E^(z|0)==0){p=v}else{break}i=g;return p|0}}while(0);do{if((m|0)==745){if(E){break}else{p=v}i=g;return p|0}}while(0);c[d>>2]=c[d>>2]|2;p=v;i=g;return p|0}function ix(b){b=b|0;var d=0,e=0,f=0,g=0;d=b;e=b+8|0;f=c[e>>2]|0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);if((f|0)==(c[3568]|0)){g=b|0;eQ(g);mw(d);return}bs(c[e>>2]|0);g=b|0;eQ(g);mw(d);return}function iy(b){b=b|0;var d=0,e=0,f=0;d=b+8|0;e=c[d>>2]|0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);if((e|0)==(c[3568]|0)){f=b|0;eQ(f);return}bs(c[d>>2]|0);f=b|0;eQ(f);return}function iz(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;g=i;i=i+112|0;f=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[f>>2];f=g|0;l=g+8|0;m=l|0;n=f|0;a[n]=37;o=f+1|0;a[o]=j;p=f+2|0;a[p]=k;a[f+3|0]=0;if(k<<24>>24!=0){a[o]=k;a[p]=j}j=bJ(m|0,100,n|0,h|0,c[d+8>>2]|0)|0;d=l+j|0;l=c[e>>2]|0;if((j|0)==0){q=l;r=b|0;c[r>>2]=q;i=g;return}else{s=l;t=m}while(1){m=a[t]|0;if((s|0)==0){u=0}else{l=s+24|0;j=c[l>>2]|0;if((j|0)==(c[s+28>>2]|0)){v=cT[c[(c[s>>2]|0)+52>>2]&63](s,m&255)|0}else{c[l>>2]=j+1;a[j]=m;v=m&255}u=(v|0)==-1?0:s}m=t+1|0;if((m|0)==(d|0)){q=u;break}else{s=u;t=m}}r=b|0;c[r>>2]=q;i=g;return}function iA(b){b=b|0;var d=0,e=0,f=0,g=0;d=b;e=b+8|0;f=c[e>>2]|0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);if((f|0)==(c[3568]|0)){g=b|0;eQ(g);mw(d);return}bs(c[e>>2]|0);g=b|0;eQ(g);mw(d);return}function iB(b){b=b|0;var d=0,e=0,f=0;d=b+8|0;e=c[d>>2]|0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);if((e|0)==(c[3568]|0)){f=b|0;eQ(f);return}bs(c[d>>2]|0);f=b|0;eQ(f);return}function iC(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;f=i;i=i+408|0;e=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[e>>2];e=f|0;k=f+400|0;l=e|0;c[k>>2]=e+400;iD(b+8|0,l,k,g,h,j);j=c[k>>2]|0;k=c[d>>2]|0;if((l|0)==(j|0)){m=k;n=a|0;c[n>>2]=m;i=f;return}else{o=k;p=l}while(1){l=c[p>>2]|0;if((o|0)==0){q=0}else{k=o+24|0;d=c[k>>2]|0;if((d|0)==(c[o+28>>2]|0)){r=cT[c[(c[o>>2]|0)+52>>2]&63](o,l)|0}else{c[k>>2]=d+4;c[d>>2]=l;r=l}q=(r|0)==-1?0:o}l=p+4|0;if((l|0)==(j|0)){m=q;break}else{o=q;p=l}}n=a|0;c[n>>2]=m;i=f;return}function iD(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;j=i;i=i+120|0;k=j|0;l=j+112|0;m=i;i=i+4|0;i=i+7&-8;n=j+8|0;o=k|0;a[o]=37;p=k+1|0;a[p]=g;q=k+2|0;a[q]=h;a[k+3|0]=0;if(h<<24>>24!=0){a[p]=h;a[q]=g}g=b|0;bJ(n|0,100,o|0,f|0,c[g>>2]|0)|0;c[l>>2]=0;c[l+4>>2]=0;c[m>>2]=n;n=(c[e>>2]|0)-d>>2;f=cf(c[g>>2]|0)|0;g=lW(d,m,n,l)|0;if((f|0)!=0){cf(f|0)|0}if((g|0)==-1){jp(1216)}else{c[e>>2]=d+(g<<2);i=j;return}}function iE(a){a=a|0;eQ(a|0);mw(a);return}function iF(a){a=a|0;eQ(a|0);return}function iG(a){a=a|0;return 127}function iH(a){a=a|0;return 127}function iI(a,b){a=a|0;b=b|0;b=a;mF(b|0,0,12)|0;return}function iJ(a,b){a=a|0;b=b|0;b=a;mF(b|0,0,12)|0;return}function iK(a,b){a=a|0;b=b|0;b=a;mF(b|0,0,12)|0;return}function iL(a,b){a=a|0;b=b|0;fg(a,1,45);return}function iM(a){a=a|0;return 0}function iN(b,c){b=b|0;c=c|0;c=b;C=67109634;a[c]=C&255;C=C>>8;a[c+1|0]=C&255;C=C>>8;a[c+2|0]=C&255;C=C>>8;a[c+3|0]=C&255;return}function iO(b,c){b=b|0;c=c|0;c=b;C=67109634;a[c]=C&255;C=C>>8;a[c+1|0]=C&255;C=C>>8;a[c+2|0]=C&255;C=C>>8;a[c+3|0]=C&255;return}function iP(a){a=a|0;eQ(a|0);mw(a);return}function iQ(a){a=a|0;eQ(a|0);return}function iR(a){a=a|0;return 127}function iS(a){a=a|0;return 127}function iT(a,b){a=a|0;b=b|0;b=a;mF(b|0,0,12)|0;return}function iU(a,b){a=a|0;b=b|0;b=a;mF(b|0,0,12)|0;return}function iV(a,b){a=a|0;b=b|0;b=a;mF(b|0,0,12)|0;return}function iW(a,b){a=a|0;b=b|0;fg(a,1,45);return}function iX(a){a=a|0;return 0}function iY(b,c){b=b|0;c=c|0;c=b;C=67109634;a[c]=C&255;C=C>>8;a[c+1|0]=C&255;C=C>>8;a[c+2|0]=C&255;C=C>>8;a[c+3|0]=C&255;return}function iZ(b,c){b=b|0;c=c|0;c=b;C=67109634;a[c]=C&255;C=C>>8;a[c+1|0]=C&255;C=C>>8;a[c+2|0]=C&255;C=C>>8;a[c+3|0]=C&255;return}function i_(a){a=a|0;eQ(a|0);mw(a);return}function i$(a){a=a|0;eQ(a|0);return}function i0(a){a=a|0;return 2147483647}function i1(a){a=a|0;return 2147483647}function i2(a,b){a=a|0;b=b|0;b=a;mF(b|0,0,12)|0;return}function i3(a,b){a=a|0;b=b|0;b=a;mF(b|0,0,12)|0;return}function i4(a,b){a=a|0;b=b|0;b=a;mF(b|0,0,12)|0;return}function i5(a,b){a=a|0;b=b|0;fr(a,1,45);return}function i6(a){a=a|0;return 0}function i7(b,c){b=b|0;c=c|0;c=b;C=67109634;a[c]=C&255;C=C>>8;a[c+1|0]=C&255;C=C>>8;a[c+2|0]=C&255;C=C>>8;a[c+3|0]=C&255;return}function i8(b,c){b=b|0;c=c|0;c=b;C=67109634;a[c]=C&255;C=C>>8;a[c+1|0]=C&255;C=C>>8;a[c+2|0]=C&255;C=C>>8;a[c+3|0]=C&255;return}function i9(a){a=a|0;eQ(a|0);mw(a);return}function ja(a){a=a|0;eQ(a|0);return}function jb(a){a=a|0;return 2147483647}function jc(a){a=a|0;return 2147483647}function jd(a,b){a=a|0;b=b|0;b=a;mF(b|0,0,12)|0;return}function je(a,b){a=a|0;b=b|0;b=a;mF(b|0,0,12)|0;return}function jf(a,b){a=a|0;b=b|0;b=a;mF(b|0,0,12)|0;return}function jg(a,b){a=a|0;b=b|0;fr(a,1,45);return}function jh(a){a=a|0;return 0}function ji(b,c){b=b|0;c=c|0;c=b;C=67109634;a[c]=C&255;C=C>>8;a[c+1|0]=C&255;C=C>>8;a[c+2|0]=C&255;C=C>>8;a[c+3|0]=C&255;return}function jj(b,c){b=b|0;c=c|0;c=b;C=67109634;a[c]=C&255;C=C>>8;a[c+1|0]=C&255;C=C>>8;a[c+2|0]=C&255;C=C>>8;a[c+3|0]=C&255;return}function jk(a){a=a|0;eQ(a|0);mw(a);return}function jl(a){a=a|0;eQ(a|0);return}function jm(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0;d=i;i=i+280|0;l=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[l>>2];l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=d|0;m=d+16|0;n=d+120|0;o=d+128|0;p=d+136|0;q=d+144|0;r=d+152|0;s=d+160|0;t=d+176|0;u=n|0;c[u>>2]=m;v=n+4|0;c[v>>2]=188;w=m+100|0;fB(p,h);m=p|0;x=c[m>>2]|0;if((c[3926]|0)!=-1){c[l>>2]=15704;c[l+4>>2]=14;c[l+8>>2]=0;fc(15704,l,116)}l=(c[3927]|0)-1|0;y=c[x+8>>2]|0;do{if((c[x+12>>2]|0)-y>>2>>>0>l>>>0){z=c[y+(l<<2)>>2]|0;if((z|0)==0){break}A=z;a[q]=0;B=f|0;c[r>>2]=c[B>>2];do{if(jo(e,r,g,p,c[h+4>>2]|0,j,q,A,n,o,w)|0){C=s|0;D=c[(c[z>>2]|0)+32>>2]|0;c2[D&15](A,3376,3386,C)|0;D=t|0;E=c[o>>2]|0;F=c[u>>2]|0;G=E-F|0;do{if((G|0)>98){H=mp(G+2|0)|0;if((H|0)!=0){I=H;J=H;break}mB();I=0;J=0}else{I=D;J=0}}while(0);if((a[q]&1)==0){K=I}else{a[I]=45;K=I+1|0}if(F>>>0<E>>>0){G=s+10|0;H=s;L=K;M=F;while(1){N=C;while(1){if((N|0)==(G|0)){O=G;break}if((a[N]|0)==(a[M]|0)){O=N;break}else{N=N+1|0}}a[L]=a[3376+(O-H)|0]|0;N=M+1|0;P=L+1|0;if(N>>>0<(c[o>>2]|0)>>>0){L=P;M=N}else{Q=P;break}}}else{Q=K}a[Q]=0;M=ci(D|0,2264,(L=i,i=i+8|0,c[L>>2]=k,L)|0)|0;i=L;if((M|0)==1){if((J|0)==0){break}mq(J);break}M=cy(8)|0;eY(M,2144);bK(M|0,10104,26)}}while(0);A=e|0;z=c[A>>2]|0;do{if((z|0)==0){R=0}else{if((c[z+12>>2]|0)!=(c[z+16>>2]|0)){R=z;break}if((cW[c[(c[z>>2]|0)+36>>2]&255](z)|0)!=-1){R=z;break}c[A>>2]=0;R=0}}while(0);A=(R|0)==0;z=c[B>>2]|0;do{if((z|0)==0){S=928}else{if((c[z+12>>2]|0)!=(c[z+16>>2]|0)){if(A){break}else{S=930;break}}if((cW[c[(c[z>>2]|0)+36>>2]&255](z)|0)==-1){c[B>>2]=0;S=928;break}else{if(A^(z|0)==0){break}else{S=930;break}}}}while(0);if((S|0)==928){if(A){S=930}}if((S|0)==930){c[j>>2]=c[j>>2]|2}c[b>>2]=R;z=c[m>>2]|0;eS(z)|0;z=c[u>>2]|0;c[u>>2]=0;if((z|0)==0){i=d;return}cR[c[v>>2]&511](z);i=d;return}}while(0);d=cy(4)|0;l4(d);bK(d|0,10072,154)}function jn(a){a=a|0;return}
function jo(e,f,g,h,j,k,l,m,n,o,p){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;p=p|0;var q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0,ax=0,ay=0,az=0,aA=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0,aH=0,aI=0,aJ=0,aK=0,aL=0,aM=0,aN=0,aO=0,aP=0,aQ=0,aR=0,aS=0,aT=0,aU=0,aV=0,aW=0,aX=0,aY=0,aZ=0,a_=0,a$=0,a0=0,a1=0,a2=0,a3=0,a4=0,a5=0,a6=0,a7=0,a8=0,a9=0,ba=0,bb=0,bc=0,bd=0,be=0,bf=0,bg=0,bh=0,bi=0,bj=0,bk=0,bl=0,bm=0,bn=0,bo=0,bp=0,bq=0,br=0,bs=0,bt=0,bu=0,bv=0,bw=0,bx=0,by=0,bz=0,bA=0,bB=0,bC=0,bD=0,bE=0,bF=0,bG=0,bH=0,bI=0,bJ=0;q=i;i=i+440|0;r=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[r>>2];r=q|0;s=q+400|0;t=q+408|0;u=q+416|0;v=q+424|0;w=v;x=i;i=i+12|0;i=i+7&-8;y=i;i=i+12|0;i=i+7&-8;z=i;i=i+12|0;i=i+7&-8;A=i;i=i+12|0;i=i+7&-8;B=i;i=i+4|0;i=i+7&-8;C=i;i=i+4|0;i=i+7&-8;D=r|0;mF(w|0,0,12)|0;E=x;F=y;G=z;H=A;mF(E|0,0,12)|0;mF(F|0,0,12)|0;mF(G|0,0,12)|0;mF(H|0,0,12)|0;js(g,h,s,t,u,v,x,y,z,B);h=n|0;c[o>>2]=c[h>>2];g=e|0;e=f|0;f=m+8|0;m=z+1|0;I=z+4|0;J=z+8|0;K=y+1|0;L=y+4|0;M=y+8|0;N=(j&512|0)!=0;j=x+1|0;O=x+4|0;P=x+8|0;Q=A+1|0;R=A+4|0;S=A+8|0;T=s+3|0;U=v+4|0;V=n+4|0;n=p;p=188;W=D;X=D;D=r+400|0;r=0;Y=0;L1160:while(1){Z=c[g>>2]|0;do{if((Z|0)==0){_=0}else{if((c[Z+12>>2]|0)!=(c[Z+16>>2]|0)){_=Z;break}if((cW[c[(c[Z>>2]|0)+36>>2]&255](Z)|0)==-1){c[g>>2]=0;_=0;break}else{_=c[g>>2]|0;break}}}while(0);Z=(_|0)==0;$=c[e>>2]|0;do{if(($|0)==0){aa=956}else{if((c[$+12>>2]|0)!=(c[$+16>>2]|0)){if(Z){ab=$;break}else{ac=p;ad=W;ae=X;af=r;aa=1215;break L1160}}if((cW[c[(c[$>>2]|0)+36>>2]&255]($)|0)==-1){c[e>>2]=0;aa=956;break}else{if(Z){ab=$;break}else{ac=p;ad=W;ae=X;af=r;aa=1215;break L1160}}}}while(0);if((aa|0)==956){aa=0;if(Z){ac=p;ad=W;ae=X;af=r;aa=1215;break}else{ab=0}}L1182:do{switch(a[s+Y|0]|0){case 1:{if((Y|0)==3){ac=p;ad=W;ae=X;af=r;aa=1215;break L1160}$=c[g>>2]|0;ag=c[$+12>>2]|0;if((ag|0)==(c[$+16>>2]|0)){ah=(cW[c[(c[$>>2]|0)+36>>2]&255]($)|0)&255}else{ah=a[ag]|0}ag=ah<<24>>24;if((b4(ag|0)|0)==0){aa=983;break L1160}if((b[(c[f>>2]|0)+(ag<<1)>>1]&8192)==0){aa=983;break L1160}ag=c[g>>2]|0;$=ag+12|0;ai=c[$>>2]|0;if((ai|0)==(c[ag+16>>2]|0)){aj=(cW[c[(c[ag>>2]|0)+40>>2]&255](ag)|0)&255}else{c[$>>2]=ai+1;aj=a[ai]|0}fm(A,aj);aa=984;break};case 2:{if(!((r|0)!=0|Y>>>0<2>>>0)){if((Y|0)==2){ak=(a[T]|0)!=0}else{ak=0}if(!(N|ak)){al=0;am=D;an=X;ao=W;ap=p;aq=n;break L1182}}ai=a[E]|0;$=c[P>>2]|0;ag=(ai&1)==0?j:$;L1205:do{if((Y|0)==0){ar=ag;as=ai;at=$}else{if((d[s+(Y-1)|0]|0)>>>0>=2>>>0){ar=ag;as=ai;at=$;break}au=ai&255;L1208:do{if((((au&1|0)==0?au>>>1:c[O>>2]|0)|0)==0){av=ag;aw=ai;ax=$}else{ay=ag;while(1){az=a[ay]|0;if((b4(az|0)|0)==0){break}if((b[(c[f>>2]|0)+(az<<1)>>1]&8192)==0){break}az=ay+1|0;aA=a[E]|0;aB=c[P>>2]|0;aC=aA&255;if((az|0)==(((aA&1)==0?j:aB)+((aC&1|0)==0?aC>>>1:c[O>>2]|0)|0)){av=az;aw=aA;ax=aB;break L1208}else{ay=az}}av=ay;aw=a[E]|0;ax=c[P>>2]|0}}while(0);au=(aw&1)==0?j:ax;az=av-au|0;aB=a[H]|0;aA=aB&255;aC=(aA&1|0)==0?aA>>>1:c[R>>2]|0;if(az>>>0>aC>>>0){ar=au;as=aw;at=ax;break}aA=(aB&1)==0?Q:c[S>>2]|0;aB=aA+aC|0;if((av|0)==(au|0)){ar=av;as=aw;at=ax;break}aD=aA+(aC-az)|0;az=au;while(1){if((a[aD]|0)!=(a[az]|0)){ar=au;as=aw;at=ax;break L1205}aC=aD+1|0;if((aC|0)==(aB|0)){ar=av;as=aw;at=ax;break}else{aD=aC;az=az+1|0}}}}while(0);ag=as&255;L1222:do{if((ar|0)==(((as&1)==0?j:at)+((ag&1|0)==0?ag>>>1:c[O>>2]|0)|0)){aE=ar}else{$=ab;ai=ar;while(1){az=c[g>>2]|0;do{if((az|0)==0){aF=0}else{if((c[az+12>>2]|0)!=(c[az+16>>2]|0)){aF=az;break}if((cW[c[(c[az>>2]|0)+36>>2]&255](az)|0)==-1){c[g>>2]=0;aF=0;break}else{aF=c[g>>2]|0;break}}}while(0);az=(aF|0)==0;do{if(($|0)==0){aa=1082}else{if((c[$+12>>2]|0)!=(c[$+16>>2]|0)){if(az){aG=$;break}else{aE=ai;break L1222}}if((cW[c[(c[$>>2]|0)+36>>2]&255]($)|0)==-1){c[e>>2]=0;aa=1082;break}else{if(az){aG=$;break}else{aE=ai;break L1222}}}}while(0);if((aa|0)==1082){aa=0;if(az){aE=ai;break L1222}else{aG=0}}ay=c[g>>2]|0;aD=c[ay+12>>2]|0;if((aD|0)==(c[ay+16>>2]|0)){aH=(cW[c[(c[ay>>2]|0)+36>>2]&255](ay)|0)&255}else{aH=a[aD]|0}if(aH<<24>>24!=(a[ai]|0)){aE=ai;break L1222}aD=c[g>>2]|0;ay=aD+12|0;aB=c[ay>>2]|0;if((aB|0)==(c[aD+16>>2]|0)){au=c[(c[aD>>2]|0)+40>>2]|0;cW[au&255](aD)|0}else{c[ay>>2]=aB+1}aB=ai+1|0;ay=a[E]|0;aD=ay&255;if((aB|0)==(((ay&1)==0?j:c[P>>2]|0)+((aD&1|0)==0?aD>>>1:c[O>>2]|0)|0)){aE=aB;break}else{$=aG;ai=aB}}}}while(0);if(!N){al=r;am=D;an=X;ao=W;ap=p;aq=n;break L1182}ag=a[E]|0;ai=ag&255;if((aE|0)==(((ag&1)==0?j:c[P>>2]|0)+((ai&1|0)==0?ai>>>1:c[O>>2]|0)|0)){al=r;am=D;an=X;ao=W;ap=p;aq=n}else{aa=1095;break L1160}break};case 0:{aa=984;break};case 3:{ai=a[F]|0;ag=ai&255;$=(ag&1|0)==0?ag>>>1:c[L>>2]|0;ag=a[G]|0;aB=ag&255;aD=(aB&1|0)==0?aB>>>1:c[I>>2]|0;if(($|0)==(-aD|0)){al=r;am=D;an=X;ao=W;ap=p;aq=n;break L1182}aB=($|0)==0;$=c[g>>2]|0;ay=c[$+12>>2]|0;au=c[$+16>>2]|0;aC=(ay|0)==(au|0);if(!(aB|(aD|0)==0)){if(aC){aD=(cW[c[(c[$>>2]|0)+36>>2]&255]($)|0)&255;aA=c[g>>2]|0;aI=aD;aJ=a[F]|0;aK=aA;aL=c[aA+12>>2]|0;aM=c[aA+16>>2]|0}else{aI=a[ay]|0;aJ=ai;aK=$;aL=ay;aM=au}au=aK+12|0;aA=(aL|0)==(aM|0);if(aI<<24>>24==(a[(aJ&1)==0?K:c[M>>2]|0]|0)){if(aA){aD=c[(c[aK>>2]|0)+40>>2]|0;cW[aD&255](aK)|0}else{c[au>>2]=aL+1}au=d[F]|0;al=((au&1|0)==0?au>>>1:c[L>>2]|0)>>>0>1>>>0?y:r;am=D;an=X;ao=W;ap=p;aq=n;break L1182}if(aA){aN=(cW[c[(c[aK>>2]|0)+36>>2]&255](aK)|0)&255}else{aN=a[aL]|0}if(aN<<24>>24!=(a[(a[G]&1)==0?m:c[J>>2]|0]|0)){aa=1051;break L1160}aA=c[g>>2]|0;au=aA+12|0;aD=c[au>>2]|0;if((aD|0)==(c[aA+16>>2]|0)){aO=c[(c[aA>>2]|0)+40>>2]|0;cW[aO&255](aA)|0}else{c[au>>2]=aD+1}a[l]=1;aD=d[G]|0;al=((aD&1|0)==0?aD>>>1:c[I>>2]|0)>>>0>1>>>0?z:r;am=D;an=X;ao=W;ap=p;aq=n;break L1182}if(aB){if(aC){aB=(cW[c[(c[$>>2]|0)+36>>2]&255]($)|0)&255;aP=aB;aQ=a[G]|0}else{aP=a[ay]|0;aQ=ag}if(aP<<24>>24!=(a[(aQ&1)==0?m:c[J>>2]|0]|0)){al=r;am=D;an=X;ao=W;ap=p;aq=n;break L1182}ag=c[g>>2]|0;aB=ag+12|0;aD=c[aB>>2]|0;if((aD|0)==(c[ag+16>>2]|0)){au=c[(c[ag>>2]|0)+40>>2]|0;cW[au&255](ag)|0}else{c[aB>>2]=aD+1}a[l]=1;aD=d[G]|0;al=((aD&1|0)==0?aD>>>1:c[I>>2]|0)>>>0>1>>>0?z:r;am=D;an=X;ao=W;ap=p;aq=n;break L1182}if(aC){aC=(cW[c[(c[$>>2]|0)+36>>2]&255]($)|0)&255;aR=aC;aS=a[F]|0}else{aR=a[ay]|0;aS=ai}if(aR<<24>>24!=(a[(aS&1)==0?K:c[M>>2]|0]|0)){a[l]=1;al=r;am=D;an=X;ao=W;ap=p;aq=n;break L1182}ai=c[g>>2]|0;ay=ai+12|0;aC=c[ay>>2]|0;if((aC|0)==(c[ai+16>>2]|0)){$=c[(c[ai>>2]|0)+40>>2]|0;cW[$&255](ai)|0}else{c[ay>>2]=aC+1}aC=d[F]|0;al=((aC&1|0)==0?aC>>>1:c[L>>2]|0)>>>0>1>>>0?y:r;am=D;an=X;ao=W;ap=p;aq=n;break};case 4:{aC=0;ay=D;ai=X;$=W;aD=p;aB=n;L1309:while(1){ag=c[g>>2]|0;do{if((ag|0)==0){aT=0}else{if((c[ag+12>>2]|0)!=(c[ag+16>>2]|0)){aT=ag;break}if((cW[c[(c[ag>>2]|0)+36>>2]&255](ag)|0)==-1){c[g>>2]=0;aT=0;break}else{aT=c[g>>2]|0;break}}}while(0);ag=(aT|0)==0;au=c[e>>2]|0;do{if((au|0)==0){aa=1108}else{if((c[au+12>>2]|0)!=(c[au+16>>2]|0)){if(ag){break}else{break L1309}}if((cW[c[(c[au>>2]|0)+36>>2]&255](au)|0)==-1){c[e>>2]=0;aa=1108;break}else{if(ag){break}else{break L1309}}}}while(0);if((aa|0)==1108){aa=0;if(ag){break}}au=c[g>>2]|0;aA=c[au+12>>2]|0;if((aA|0)==(c[au+16>>2]|0)){aU=(cW[c[(c[au>>2]|0)+36>>2]&255](au)|0)&255}else{aU=a[aA]|0}aA=aU<<24>>24;do{if((b4(aA|0)|0)==0){aa=1128}else{if((b[(c[f>>2]|0)+(aA<<1)>>1]&2048)==0){aa=1128;break}au=c[o>>2]|0;if((au|0)==(aB|0)){aO=(c[V>>2]|0)!=188;aV=c[h>>2]|0;aW=aB-aV|0;aX=aW>>>0<2147483647>>>0?aW<<1:-1;aY=mr(aO?aV:0,aX)|0;if((aY|0)==0){mB()}do{if(aO){c[h>>2]=aY;aZ=aY}else{aV=c[h>>2]|0;c[h>>2]=aY;if((aV|0)==0){aZ=aY;break}cR[c[V>>2]&511](aV);aZ=c[h>>2]|0}}while(0);c[V>>2]=94;aY=aZ+aW|0;c[o>>2]=aY;a_=(c[h>>2]|0)+aX|0;a$=aY}else{a_=aB;a$=au}c[o>>2]=a$+1;a[a$]=aU;a0=aC+1|0;a1=ay;a2=ai;a3=$;a4=aD;a5=a_}}while(0);if((aa|0)==1128){aa=0;aA=d[w]|0;if((((aA&1|0)==0?aA>>>1:c[U>>2]|0)|0)==0|(aC|0)==0){break}if(aU<<24>>24!=(a[u]|0)){break}if((ai|0)==(ay|0)){aA=ai-$|0;ag=aA>>>0<2147483647>>>0?aA<<1:-1;if((aD|0)==188){a6=0}else{a6=$}aY=mr(a6,ag)|0;aO=aY;if((aY|0)==0){mB()}a7=aO+(ag>>>2<<2)|0;a8=aO+(aA>>2<<2)|0;a9=aO;ba=94}else{a7=ay;a8=ai;a9=$;ba=aD}c[a8>>2]=aC;a0=0;a1=a7;a2=a8+4|0;a3=a9;a4=ba;a5=aB}aO=c[g>>2]|0;aA=aO+12|0;ag=c[aA>>2]|0;if((ag|0)==(c[aO+16>>2]|0)){aY=c[(c[aO>>2]|0)+40>>2]|0;cW[aY&255](aO)|0;aC=a0;ay=a1;ai=a2;$=a3;aD=a4;aB=a5;continue}else{c[aA>>2]=ag+1;aC=a0;ay=a1;ai=a2;$=a3;aD=a4;aB=a5;continue}}if(($|0)==(ai|0)|(aC|0)==0){bb=ay;bc=ai;bd=$;be=aD}else{if((ai|0)==(ay|0)){ag=ai-$|0;aA=ag>>>0<2147483647>>>0?ag<<1:-1;if((aD|0)==188){bf=0}else{bf=$}aO=mr(bf,aA)|0;aY=aO;if((aO|0)==0){mB()}bg=aY+(aA>>>2<<2)|0;bh=aY+(ag>>2<<2)|0;bi=aY;bj=94}else{bg=ay;bh=ai;bi=$;bj=aD}c[bh>>2]=aC;bb=bg;bc=bh+4|0;bd=bi;be=bj}if((c[B>>2]|0)>0){aY=c[g>>2]|0;do{if((aY|0)==0){bk=0}else{if((c[aY+12>>2]|0)!=(c[aY+16>>2]|0)){bk=aY;break}if((cW[c[(c[aY>>2]|0)+36>>2]&255](aY)|0)==-1){c[g>>2]=0;bk=0;break}else{bk=c[g>>2]|0;break}}}while(0);aY=(bk|0)==0;aC=c[e>>2]|0;do{if((aC|0)==0){aa=1161}else{if((c[aC+12>>2]|0)!=(c[aC+16>>2]|0)){if(aY){bl=aC;break}else{aa=1168;break L1160}}if((cW[c[(c[aC>>2]|0)+36>>2]&255](aC)|0)==-1){c[e>>2]=0;aa=1161;break}else{if(aY){bl=aC;break}else{aa=1168;break L1160}}}}while(0);if((aa|0)==1161){aa=0;if(aY){aa=1168;break L1160}else{bl=0}}aC=c[g>>2]|0;aD=c[aC+12>>2]|0;if((aD|0)==(c[aC+16>>2]|0)){bm=(cW[c[(c[aC>>2]|0)+36>>2]&255](aC)|0)&255}else{bm=a[aD]|0}if(bm<<24>>24!=(a[t]|0)){aa=1168;break L1160}aD=c[g>>2]|0;aC=aD+12|0;$=c[aC>>2]|0;if(($|0)==(c[aD+16>>2]|0)){ai=c[(c[aD>>2]|0)+40>>2]|0;cW[ai&255](aD)|0;bn=aB;bo=bl}else{c[aC>>2]=$+1;bn=aB;bo=bl}while(1){$=c[g>>2]|0;do{if(($|0)==0){bp=0}else{if((c[$+12>>2]|0)!=(c[$+16>>2]|0)){bp=$;break}if((cW[c[(c[$>>2]|0)+36>>2]&255]($)|0)==-1){c[g>>2]=0;bp=0;break}else{bp=c[g>>2]|0;break}}}while(0);$=(bp|0)==0;do{if((bo|0)==0){aa=1184}else{if((c[bo+12>>2]|0)!=(c[bo+16>>2]|0)){if($){bq=bo;break}else{aa=1193;break L1160}}if((cW[c[(c[bo>>2]|0)+36>>2]&255](bo)|0)==-1){c[e>>2]=0;aa=1184;break}else{if($){bq=bo;break}else{aa=1193;break L1160}}}}while(0);if((aa|0)==1184){aa=0;if($){aa=1193;break L1160}else{bq=0}}aC=c[g>>2]|0;aD=c[aC+12>>2]|0;if((aD|0)==(c[aC+16>>2]|0)){br=(cW[c[(c[aC>>2]|0)+36>>2]&255](aC)|0)&255}else{br=a[aD]|0}aD=br<<24>>24;if((b4(aD|0)|0)==0){aa=1193;break L1160}if((b[(c[f>>2]|0)+(aD<<1)>>1]&2048)==0){aa=1193;break L1160}aD=c[o>>2]|0;if((aD|0)==(bn|0)){aC=(c[V>>2]|0)!=188;ai=c[h>>2]|0;ay=bn-ai|0;ag=ay>>>0<2147483647>>>0?ay<<1:-1;aA=mr(aC?ai:0,ag)|0;if((aA|0)==0){mB()}do{if(aC){c[h>>2]=aA;bs=aA}else{ai=c[h>>2]|0;c[h>>2]=aA;if((ai|0)==0){bs=aA;break}cR[c[V>>2]&511](ai);bs=c[h>>2]|0}}while(0);c[V>>2]=94;aA=bs+ay|0;c[o>>2]=aA;bt=(c[h>>2]|0)+ag|0;bu=aA}else{bt=bn;bu=aD}aA=c[g>>2]|0;aC=c[aA+12>>2]|0;if((aC|0)==(c[aA+16>>2]|0)){$=(cW[c[(c[aA>>2]|0)+36>>2]&255](aA)|0)&255;bv=$;bw=c[o>>2]|0}else{bv=a[aC]|0;bw=bu}c[o>>2]=bw+1;a[bw]=bv;aC=(c[B>>2]|0)-1|0;c[B>>2]=aC;$=c[g>>2]|0;aA=$+12|0;ai=c[aA>>2]|0;if((ai|0)==(c[$+16>>2]|0)){aO=c[(c[$>>2]|0)+40>>2]|0;cW[aO&255]($)|0}else{c[aA>>2]=ai+1}if((aC|0)>0){bn=bt;bo=bq}else{bx=bt;break}}}else{bx=aB}if((c[o>>2]|0)==(c[h>>2]|0)){aa=1213;break L1160}else{al=r;am=bb;an=bc;ao=bd;ap=be;aq=bx}break};default:{al=r;am=D;an=X;ao=W;ap=p;aq=n}}}while(0);L1465:do{if((aa|0)==984){aa=0;if((Y|0)==3){ac=p;ad=W;ae=X;af=r;aa=1215;break L1160}else{by=ab}while(1){Z=c[g>>2]|0;do{if((Z|0)==0){bz=0}else{if((c[Z+12>>2]|0)!=(c[Z+16>>2]|0)){bz=Z;break}if((cW[c[(c[Z>>2]|0)+36>>2]&255](Z)|0)==-1){c[g>>2]=0;bz=0;break}else{bz=c[g>>2]|0;break}}}while(0);Z=(bz|0)==0;do{if((by|0)==0){aa=997}else{if((c[by+12>>2]|0)!=(c[by+16>>2]|0)){if(Z){bA=by;break}else{al=r;am=D;an=X;ao=W;ap=p;aq=n;break L1465}}if((cW[c[(c[by>>2]|0)+36>>2]&255](by)|0)==-1){c[e>>2]=0;aa=997;break}else{if(Z){bA=by;break}else{al=r;am=D;an=X;ao=W;ap=p;aq=n;break L1465}}}}while(0);if((aa|0)==997){aa=0;if(Z){al=r;am=D;an=X;ao=W;ap=p;aq=n;break L1465}else{bA=0}}aD=c[g>>2]|0;ag=c[aD+12>>2]|0;if((ag|0)==(c[aD+16>>2]|0)){bB=(cW[c[(c[aD>>2]|0)+36>>2]&255](aD)|0)&255}else{bB=a[ag]|0}ag=bB<<24>>24;if((b4(ag|0)|0)==0){al=r;am=D;an=X;ao=W;ap=p;aq=n;break L1465}if((b[(c[f>>2]|0)+(ag<<1)>>1]&8192)==0){al=r;am=D;an=X;ao=W;ap=p;aq=n;break L1465}ag=c[g>>2]|0;aD=ag+12|0;ay=c[aD>>2]|0;if((ay|0)==(c[ag+16>>2]|0)){bC=(cW[c[(c[ag>>2]|0)+40>>2]&255](ag)|0)&255}else{c[aD>>2]=ay+1;bC=a[ay]|0}fm(A,bC);by=bA}}}while(0);aB=Y+1|0;if(aB>>>0<4>>>0){n=aq;p=ap;W=ao;X=an;D=am;r=al;Y=aB}else{ac=ap;ad=ao;ae=an;af=al;aa=1215;break}}L1503:do{if((aa|0)==1051){c[k>>2]=c[k>>2]|4;bD=0;bE=W;bF=p}else if((aa|0)==983){c[k>>2]=c[k>>2]|4;bD=0;bE=W;bF=p}else if((aa|0)==1095){c[k>>2]=c[k>>2]|4;bD=0;bE=W;bF=p}else if((aa|0)==1168){c[k>>2]=c[k>>2]|4;bD=0;bE=bd;bF=be}else if((aa|0)==1193){c[k>>2]=c[k>>2]|4;bD=0;bE=bd;bF=be}else if((aa|0)==1213){c[k>>2]=c[k>>2]|4;bD=0;bE=bd;bF=be}else if((aa|0)==1215){L1511:do{if((af|0)!=0){al=af;an=af+1|0;ao=af+8|0;ap=af+4|0;Y=1;L1513:while(1){r=d[al]|0;if((r&1|0)==0){bG=r>>>1}else{bG=c[ap>>2]|0}if(Y>>>0>=bG>>>0){break L1511}r=c[g>>2]|0;do{if((r|0)==0){bH=0}else{if((c[r+12>>2]|0)!=(c[r+16>>2]|0)){bH=r;break}if((cW[c[(c[r>>2]|0)+36>>2]&255](r)|0)==-1){c[g>>2]=0;bH=0;break}else{bH=c[g>>2]|0;break}}}while(0);r=(bH|0)==0;Z=c[e>>2]|0;do{if((Z|0)==0){aa=1233}else{if((c[Z+12>>2]|0)!=(c[Z+16>>2]|0)){if(r){break}else{break L1513}}if((cW[c[(c[Z>>2]|0)+36>>2]&255](Z)|0)==-1){c[e>>2]=0;aa=1233;break}else{if(r){break}else{break L1513}}}}while(0);if((aa|0)==1233){aa=0;if(r){break}}Z=c[g>>2]|0;am=c[Z+12>>2]|0;if((am|0)==(c[Z+16>>2]|0)){bI=(cW[c[(c[Z>>2]|0)+36>>2]&255](Z)|0)&255}else{bI=a[am]|0}if((a[al]&1)==0){bJ=an}else{bJ=c[ao>>2]|0}if(bI<<24>>24!=(a[bJ+Y|0]|0)){break}am=Y+1|0;Z=c[g>>2]|0;D=Z+12|0;X=c[D>>2]|0;if((X|0)==(c[Z+16>>2]|0)){aq=c[(c[Z>>2]|0)+40>>2]|0;cW[aq&255](Z)|0;Y=am;continue}else{c[D>>2]=X+1;Y=am;continue}}c[k>>2]=c[k>>2]|4;bD=0;bE=ad;bF=ac;break L1503}}while(0);if((ad|0)==(ae|0)){bD=1;bE=ae;bF=ac;break}c[C>>2]=0;jt(v,ad,ae,C);if((c[C>>2]|0)==0){bD=1;bE=ad;bF=ac;break}c[k>>2]=c[k>>2]|4;bD=0;bE=ad;bF=ac}}while(0);fh(A);fh(z);fh(y);fh(x);fh(v);if((bE|0)==0){i=q;return bD|0}cR[bF&511](bE);i=q;return bD|0}function jp(a){a=a|0;var b=0;b=cy(8)|0;eY(b,a);bK(b|0,10104,26)}function jq(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0;d=i;i=i+160|0;l=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[l>>2];l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=d|0;m=d+16|0;n=d+120|0;o=d+128|0;p=d+136|0;q=d+144|0;r=d+152|0;s=n|0;c[s>>2]=m;t=n+4|0;c[t>>2]=188;u=m+100|0;fB(p,h);m=p|0;v=c[m>>2]|0;if((c[3926]|0)!=-1){c[l>>2]=15704;c[l+4>>2]=14;c[l+8>>2]=0;fc(15704,l,116)}l=(c[3927]|0)-1|0;w=c[v+8>>2]|0;do{if((c[v+12>>2]|0)-w>>2>>>0>l>>>0){x=c[w+(l<<2)>>2]|0;if((x|0)==0){break}y=x;a[q]=0;z=f|0;A=c[z>>2]|0;c[r>>2]=A;if(jo(e,r,g,p,c[h+4>>2]|0,j,q,y,n,o,u)|0){B=k;if((a[B]&1)==0){a[k+1|0]=0;a[B]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}B=x;if((a[q]&1)!=0){fm(k,cT[c[(c[B>>2]|0)+28>>2]&63](y,45)|0)}x=cT[c[(c[B>>2]|0)+28>>2]&63](y,48)|0;y=c[o>>2]|0;B=y-1|0;C=c[s>>2]|0;while(1){if(C>>>0>=B>>>0){break}if((a[C]|0)==x<<24>>24){C=C+1|0}else{break}}jr(k,C,y)|0}x=e|0;B=c[x>>2]|0;do{if((B|0)==0){D=0}else{if((c[B+12>>2]|0)!=(c[B+16>>2]|0)){D=B;break}if((cW[c[(c[B>>2]|0)+36>>2]&255](B)|0)!=-1){D=B;break}c[x>>2]=0;D=0}}while(0);x=(D|0)==0;do{if((A|0)==0){E=1291}else{if((c[A+12>>2]|0)!=(c[A+16>>2]|0)){if(x){break}else{E=1293;break}}if((cW[c[(c[A>>2]|0)+36>>2]&255](A)|0)==-1){c[z>>2]=0;E=1291;break}else{if(x^(A|0)==0){break}else{E=1293;break}}}}while(0);if((E|0)==1291){if(x){E=1293}}if((E|0)==1293){c[j>>2]=c[j>>2]|2}c[b>>2]=D;A=c[m>>2]|0;eS(A)|0;A=c[s>>2]|0;c[s>>2]=0;if((A|0)==0){i=d;return}cR[c[t>>2]&511](A);i=d;return}}while(0);d=cy(4)|0;l4(d);bK(d|0,10072,154)}function jr(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;f=b;g=d;h=a[f]|0;i=h&255;if((i&1|0)==0){j=i>>>1}else{j=c[b+4>>2]|0}if((h&1)==0){k=10;l=h}else{h=c[b>>2]|0;k=(h&-2)-1|0;l=h&255}h=e-g|0;if((e|0)==(d|0)){return b|0}if((k-j|0)>>>0<h>>>0){fp(b,k,j+h-k|0,j,j,0,0);m=a[f]|0}else{m=l}if((m&1)==0){n=b+1|0}else{n=c[b+8>>2]|0}m=e+(j-g)|0;g=d;d=n+j|0;while(1){a[d]=a[g]|0;l=g+1|0;if((l|0)==(e|0)){break}else{g=l;d=d+1|0}}a[n+m|0]=0;m=j+h|0;if((a[f]&1)==0){a[f]=m<<1&255;return b|0}else{c[b+4>>2]=m;return b|0}return 0}function js(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0;n=i;i=i+56|0;o=n|0;p=n+16|0;q=n+32|0;r=n+40|0;s=r;t=i;i=i+12|0;i=i+7&-8;u=t;v=i;i=i+12|0;i=i+7&-8;w=v;x=i;i=i+12|0;i=i+7&-8;y=x;z=i;i=i+4|0;i=i+7&-8;A=i;i=i+12|0;i=i+7&-8;B=A;D=i;i=i+12|0;i=i+7&-8;E=D;F=i;i=i+12|0;i=i+7&-8;G=F;H=i;i=i+12|0;i=i+7&-8;I=H;if(b){b=c[d>>2]|0;if((c[4044]|0)!=-1){c[p>>2]=16176;c[p+4>>2]=14;c[p+8>>2]=0;fc(16176,p,116)}p=(c[4045]|0)-1|0;J=c[b+8>>2]|0;if((c[b+12>>2]|0)-J>>2>>>0<=p>>>0){K=cy(4)|0;L=K;l4(L);bK(K|0,10072,154)}b=c[J+(p<<2)>>2]|0;if((b|0)==0){K=cy(4)|0;L=K;l4(L);bK(K|0,10072,154)}K=b;cS[c[(c[b>>2]|0)+44>>2]&127](q,K);L=e;C=c[q>>2]|0;a[L]=C&255;C=C>>8;a[L+1|0]=C&255;C=C>>8;a[L+2|0]=C&255;C=C>>8;a[L+3|0]=C&255;L=b;cS[c[(c[L>>2]|0)+32>>2]&127](r,K);q=l;if((a[q]&1)==0){a[l+1|0]=0;a[q]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}fl(l,0);c[q>>2]=c[s>>2];c[q+4>>2]=c[s+4>>2];c[q+8>>2]=c[s+8>>2];mF(s|0,0,12)|0;fh(r);cS[c[(c[L>>2]|0)+28>>2]&127](t,K);r=k;if((a[r]&1)==0){a[k+1|0]=0;a[r]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}fl(k,0);c[r>>2]=c[u>>2];c[r+4>>2]=c[u+4>>2];c[r+8>>2]=c[u+8>>2];mF(u|0,0,12)|0;fh(t);t=b;a[f]=cW[c[(c[t>>2]|0)+12>>2]&255](K)|0;a[g]=cW[c[(c[t>>2]|0)+16>>2]&255](K)|0;cS[c[(c[L>>2]|0)+20>>2]&127](v,K);t=h;if((a[t]&1)==0){a[h+1|0]=0;a[t]=0}else{a[c[h+8>>2]|0]=0;c[h+4>>2]=0}fl(h,0);c[t>>2]=c[w>>2];c[t+4>>2]=c[w+4>>2];c[t+8>>2]=c[w+8>>2];mF(w|0,0,12)|0;fh(v);cS[c[(c[L>>2]|0)+24>>2]&127](x,K);L=j;if((a[L]&1)==0){a[j+1|0]=0;a[L]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}fl(j,0);c[L>>2]=c[y>>2];c[L+4>>2]=c[y+4>>2];c[L+8>>2]=c[y+8>>2];mF(y|0,0,12)|0;fh(x);M=cW[c[(c[b>>2]|0)+36>>2]&255](K)|0;c[m>>2]=M;i=n;return}else{K=c[d>>2]|0;if((c[4046]|0)!=-1){c[o>>2]=16184;c[o+4>>2]=14;c[o+8>>2]=0;fc(16184,o,116)}o=(c[4047]|0)-1|0;d=c[K+8>>2]|0;if((c[K+12>>2]|0)-d>>2>>>0<=o>>>0){N=cy(4)|0;O=N;l4(O);bK(N|0,10072,154)}K=c[d+(o<<2)>>2]|0;if((K|0)==0){N=cy(4)|0;O=N;l4(O);bK(N|0,10072,154)}N=K;cS[c[(c[K>>2]|0)+44>>2]&127](z,N);O=e;C=c[z>>2]|0;a[O]=C&255;C=C>>8;a[O+1|0]=C&255;C=C>>8;a[O+2|0]=C&255;C=C>>8;a[O+3|0]=C&255;O=K;cS[c[(c[O>>2]|0)+32>>2]&127](A,N);z=l;if((a[z]&1)==0){a[l+1|0]=0;a[z]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}fl(l,0);c[z>>2]=c[B>>2];c[z+4>>2]=c[B+4>>2];c[z+8>>2]=c[B+8>>2];mF(B|0,0,12)|0;fh(A);cS[c[(c[O>>2]|0)+28>>2]&127](D,N);A=k;if((a[A]&1)==0){a[k+1|0]=0;a[A]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}fl(k,0);c[A>>2]=c[E>>2];c[A+4>>2]=c[E+4>>2];c[A+8>>2]=c[E+8>>2];mF(E|0,0,12)|0;fh(D);D=K;a[f]=cW[c[(c[D>>2]|0)+12>>2]&255](N)|0;a[g]=cW[c[(c[D>>2]|0)+16>>2]&255](N)|0;cS[c[(c[O>>2]|0)+20>>2]&127](F,N);D=h;if((a[D]&1)==0){a[h+1|0]=0;a[D]=0}else{a[c[h+8>>2]|0]=0;c[h+4>>2]=0}fl(h,0);c[D>>2]=c[G>>2];c[D+4>>2]=c[G+4>>2];c[D+8>>2]=c[G+8>>2];mF(G|0,0,12)|0;fh(F);cS[c[(c[O>>2]|0)+24>>2]&127](H,N);O=j;if((a[O]&1)==0){a[j+1|0]=0;a[O]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}fl(j,0);c[O>>2]=c[I>>2];c[O+4>>2]=c[I+4>>2];c[O+8>>2]=c[I+8>>2];mF(I|0,0,12)|0;fh(H);M=cW[c[(c[K>>2]|0)+36>>2]&255](N)|0;c[m>>2]=M;i=n;return}}function jt(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;g=b;h=b;i=a[h]|0;j=i&255;if((j&1|0)==0){k=j>>>1}else{k=c[b+4>>2]|0}if((k|0)==0){return}do{if((d|0)==(e|0)){l=i}else{k=e-4|0;if(k>>>0>d>>>0){m=d;n=k}else{l=i;break}do{k=c[m>>2]|0;c[m>>2]=c[n>>2];c[n>>2]=k;m=m+4|0;n=n-4|0;}while(m>>>0<n>>>0);l=a[h]|0}}while(0);if((l&1)==0){o=g+1|0}else{o=c[b+8>>2]|0}g=l&255;if((g&1|0)==0){p=g>>>1}else{p=c[b+4>>2]|0}b=e-4|0;e=a[o]|0;g=e<<24>>24;l=e<<24>>24<1|e<<24>>24==127;L1726:do{if(b>>>0>d>>>0){e=o+p|0;h=o;n=d;m=g;i=l;while(1){if(!i){if((m|0)!=(c[n>>2]|0)){break}}k=(e-h|0)>1?h+1|0:h;j=n+4|0;q=a[k]|0;r=q<<24>>24;s=q<<24>>24<1|q<<24>>24==127;if(j>>>0<b>>>0){h=k;n=j;m=r;i=s}else{t=r;u=s;break L1726}}c[f>>2]=4;return}else{t=g;u=l}}while(0);if(u){return}u=c[b>>2]|0;if(!(t>>>0<u>>>0|(u|0)==0)){return}c[f>>2]=4;return}function ju(a){a=a|0;eQ(a|0);mw(a);return}function jv(a){a=a|0;eQ(a|0);return}function jw(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0;d=i;i=i+600|0;l=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[l>>2];l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=d|0;m=d+16|0;n=d+416|0;o=d+424|0;p=d+432|0;q=d+440|0;r=d+448|0;s=d+456|0;t=d+496|0;u=n|0;c[u>>2]=m;v=n+4|0;c[v>>2]=188;w=m+400|0;fB(p,h);m=p|0;x=c[m>>2]|0;if((c[3924]|0)!=-1){c[l>>2]=15696;c[l+4>>2]=14;c[l+8>>2]=0;fc(15696,l,116)}l=(c[3925]|0)-1|0;y=c[x+8>>2]|0;do{if((c[x+12>>2]|0)-y>>2>>>0>l>>>0){z=c[y+(l<<2)>>2]|0;if((z|0)==0){break}A=z;a[q]=0;B=f|0;c[r>>2]=c[B>>2];do{if(jx(e,r,g,p,c[h+4>>2]|0,j,q,A,n,o,w)|0){C=s|0;D=c[(c[z>>2]|0)+48>>2]|0;c2[D&15](A,3360,3370,C)|0;D=t|0;E=c[o>>2]|0;F=c[u>>2]|0;G=E-F|0;do{if((G|0)>392){H=mp((G>>2)+2|0)|0;if((H|0)!=0){I=H;J=H;break}mB();I=0;J=0}else{I=D;J=0}}while(0);if((a[q]&1)==0){K=I}else{a[I]=45;K=I+1|0}if(F>>>0<E>>>0){G=s+40|0;H=s;L=K;M=F;while(1){N=C;while(1){if((N|0)==(G|0)){O=G;break}if((c[N>>2]|0)==(c[M>>2]|0)){O=N;break}else{N=N+4|0}}a[L]=a[3360+(O-H>>2)|0]|0;N=M+4|0;P=L+1|0;if(N>>>0<(c[o>>2]|0)>>>0){L=P;M=N}else{Q=P;break}}}else{Q=K}a[Q]=0;M=ci(D|0,2264,(L=i,i=i+8|0,c[L>>2]=k,L)|0)|0;i=L;if((M|0)==1){if((J|0)==0){break}mq(J);break}M=cy(8)|0;eY(M,2144);bK(M|0,10104,26)}}while(0);A=e|0;z=c[A>>2]|0;do{if((z|0)==0){R=0}else{M=c[z+12>>2]|0;if((M|0)==(c[z+16>>2]|0)){S=cW[c[(c[z>>2]|0)+36>>2]&255](z)|0}else{S=c[M>>2]|0}if((S|0)!=-1){R=z;break}c[A>>2]=0;R=0}}while(0);A=(R|0)==0;z=c[B>>2]|0;do{if((z|0)==0){T=1460}else{M=c[z+12>>2]|0;if((M|0)==(c[z+16>>2]|0)){U=cW[c[(c[z>>2]|0)+36>>2]&255](z)|0}else{U=c[M>>2]|0}if((U|0)==-1){c[B>>2]=0;T=1460;break}else{if(A^(z|0)==0){break}else{T=1462;break}}}}while(0);if((T|0)==1460){if(A){T=1462}}if((T|0)==1462){c[j>>2]=c[j>>2]|2}c[b>>2]=R;z=c[m>>2]|0;eS(z)|0;z=c[u>>2]|0;c[u>>2]=0;if((z|0)==0){i=d;return}cR[c[v>>2]&511](z);i=d;return}}while(0);d=cy(4)|0;l4(d);bK(d|0,10072,154)}function jx(b,e,f,g,h,j,k,l,m,n,o){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;var p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0,ax=0,ay=0,az=0,aA=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0,aH=0,aI=0,aJ=0,aK=0,aL=0,aM=0,aN=0,aO=0,aP=0,aQ=0,aR=0,aS=0,aT=0,aU=0,aV=0,aW=0,aX=0,aY=0,aZ=0,a_=0,a$=0,a0=0,a1=0,a2=0,a3=0,a4=0,a5=0,a6=0,a7=0,a8=0,a9=0,ba=0,bb=0,bc=0,bd=0,be=0,bf=0,bg=0,bh=0,bi=0,bj=0,bk=0,bl=0,bm=0,bn=0,bo=0,bp=0,bq=0,br=0,bs=0,bt=0,bu=0,bv=0,bw=0,bx=0,by=0,bz=0,bA=0,bB=0,bC=0,bD=0,bE=0,bF=0,bG=0;p=i;i=i+448|0;q=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[q>>2];q=p|0;r=p+8|0;s=p+408|0;t=p+416|0;u=p+424|0;v=p+432|0;w=v;x=i;i=i+12|0;i=i+7&-8;y=i;i=i+12|0;i=i+7&-8;z=i;i=i+12|0;i=i+7&-8;A=i;i=i+12|0;i=i+7&-8;B=i;i=i+4|0;i=i+7&-8;C=i;i=i+4|0;i=i+7&-8;c[q>>2]=o;o=r|0;mF(w|0,0,12)|0;D=x;E=y;F=z;G=A;mF(D|0,0,12)|0;mF(E|0,0,12)|0;mF(F|0,0,12)|0;mF(G|0,0,12)|0;jA(f,g,s,t,u,v,x,y,z,B);g=m|0;c[n>>2]=c[g>>2];f=b|0;b=e|0;e=l;H=z+4|0;I=z+8|0;J=y+4|0;K=y+8|0;L=(h&512|0)!=0;h=x+4|0;M=x+8|0;N=A+4|0;O=A+8|0;P=s+3|0;Q=v+4|0;R=188;S=o;T=o;o=r+400|0;r=0;U=0;L1810:while(1){V=c[f>>2]|0;do{if((V|0)==0){W=1}else{X=c[V+12>>2]|0;if((X|0)==(c[V+16>>2]|0)){Y=cW[c[(c[V>>2]|0)+36>>2]&255](V)|0}else{Y=c[X>>2]|0}if((Y|0)==-1){c[f>>2]=0;W=1;break}else{W=(c[f>>2]|0)==0;break}}}while(0);V=c[b>>2]|0;do{if((V|0)==0){Z=1488}else{X=c[V+12>>2]|0;if((X|0)==(c[V+16>>2]|0)){_=cW[c[(c[V>>2]|0)+36>>2]&255](V)|0}else{_=c[X>>2]|0}if((_|0)==-1){c[b>>2]=0;Z=1488;break}else{if(W^(V|0)==0){$=V;break}else{aa=R;ab=S;ac=T;ad=r;Z=1728;break L1810}}}}while(0);if((Z|0)==1488){Z=0;if(W){aa=R;ab=S;ac=T;ad=r;Z=1728;break}else{$=0}}L1834:do{switch(a[s+U|0]|0){case 4:{V=0;X=o;ae=T;af=S;ag=R;L1835:while(1){ah=c[f>>2]|0;do{if((ah|0)==0){ai=1}else{aj=c[ah+12>>2]|0;if((aj|0)==(c[ah+16>>2]|0)){ak=cW[c[(c[ah>>2]|0)+36>>2]&255](ah)|0}else{ak=c[aj>>2]|0}if((ak|0)==-1){c[f>>2]=0;ai=1;break}else{ai=(c[f>>2]|0)==0;break}}}while(0);ah=c[b>>2]|0;do{if((ah|0)==0){Z=1636}else{aj=c[ah+12>>2]|0;if((aj|0)==(c[ah+16>>2]|0)){al=cW[c[(c[ah>>2]|0)+36>>2]&255](ah)|0}else{al=c[aj>>2]|0}if((al|0)==-1){c[b>>2]=0;Z=1636;break}else{if(ai^(ah|0)==0){break}else{break L1835}}}}while(0);if((Z|0)==1636){Z=0;if(ai){break}}ah=c[f>>2]|0;aj=c[ah+12>>2]|0;if((aj|0)==(c[ah+16>>2]|0)){am=cW[c[(c[ah>>2]|0)+36>>2]&255](ah)|0}else{am=c[aj>>2]|0}if(cU[c[(c[e>>2]|0)+12>>2]&63](l,2048,am)|0){aj=c[n>>2]|0;if((aj|0)==(c[q>>2]|0)){jB(m,n,q);an=c[n>>2]|0}else{an=aj}c[n>>2]=an+4;c[an>>2]=am;ao=V+1|0;ap=X;aq=ae;ar=af;as=ag}else{aj=d[w]|0;if((((aj&1|0)==0?aj>>>1:c[Q>>2]|0)|0)==0|(V|0)==0){break}if((am|0)!=(c[u>>2]|0)){break}if((ae|0)==(X|0)){aj=(ag|0)!=188;ah=ae-af|0;at=ah>>>0<2147483647>>>0?ah<<1:-1;if(aj){au=af}else{au=0}aj=mr(au,at)|0;av=aj;if((aj|0)==0){mB()}aw=av+(at>>>2<<2)|0;ax=av+(ah>>2<<2)|0;ay=av;az=94}else{aw=X;ax=ae;ay=af;az=ag}c[ax>>2]=V;ao=0;ap=aw;aq=ax+4|0;ar=ay;as=az}av=c[f>>2]|0;ah=av+12|0;at=c[ah>>2]|0;if((at|0)==(c[av+16>>2]|0)){aj=c[(c[av>>2]|0)+40>>2]|0;cW[aj&255](av)|0;V=ao;X=ap;ae=aq;af=ar;ag=as;continue}else{c[ah>>2]=at+4;V=ao;X=ap;ae=aq;af=ar;ag=as;continue}}if((af|0)==(ae|0)|(V|0)==0){aA=X;aB=ae;aC=af;aD=ag}else{if((ae|0)==(X|0)){at=(ag|0)!=188;ah=ae-af|0;av=ah>>>0<2147483647>>>0?ah<<1:-1;if(at){aE=af}else{aE=0}at=mr(aE,av)|0;aj=at;if((at|0)==0){mB()}aF=aj+(av>>>2<<2)|0;aG=aj+(ah>>2<<2)|0;aH=aj;aI=94}else{aF=X;aG=ae;aH=af;aI=ag}c[aG>>2]=V;aA=aF;aB=aG+4|0;aC=aH;aD=aI}aj=c[B>>2]|0;if((aj|0)>0){ah=c[f>>2]|0;do{if((ah|0)==0){aJ=1}else{av=c[ah+12>>2]|0;if((av|0)==(c[ah+16>>2]|0)){aK=cW[c[(c[ah>>2]|0)+36>>2]&255](ah)|0}else{aK=c[av>>2]|0}if((aK|0)==-1){c[f>>2]=0;aJ=1;break}else{aJ=(c[f>>2]|0)==0;break}}}while(0);ah=c[b>>2]|0;do{if((ah|0)==0){Z=1685}else{V=c[ah+12>>2]|0;if((V|0)==(c[ah+16>>2]|0)){aL=cW[c[(c[ah>>2]|0)+36>>2]&255](ah)|0}else{aL=c[V>>2]|0}if((aL|0)==-1){c[b>>2]=0;Z=1685;break}else{if(aJ^(ah|0)==0){aM=ah;break}else{Z=1691;break L1810}}}}while(0);if((Z|0)==1685){Z=0;if(aJ){Z=1691;break L1810}else{aM=0}}ah=c[f>>2]|0;V=c[ah+12>>2]|0;if((V|0)==(c[ah+16>>2]|0)){aN=cW[c[(c[ah>>2]|0)+36>>2]&255](ah)|0}else{aN=c[V>>2]|0}if((aN|0)!=(c[t>>2]|0)){Z=1691;break L1810}V=c[f>>2]|0;ah=V+12|0;ag=c[ah>>2]|0;if((ag|0)==(c[V+16>>2]|0)){af=c[(c[V>>2]|0)+40>>2]|0;cW[af&255](V)|0;aO=aM;aP=aj}else{c[ah>>2]=ag+4;aO=aM;aP=aj}while(1){ag=c[f>>2]|0;do{if((ag|0)==0){aQ=1}else{ah=c[ag+12>>2]|0;if((ah|0)==(c[ag+16>>2]|0)){aR=cW[c[(c[ag>>2]|0)+36>>2]&255](ag)|0}else{aR=c[ah>>2]|0}if((aR|0)==-1){c[f>>2]=0;aQ=1;break}else{aQ=(c[f>>2]|0)==0;break}}}while(0);do{if((aO|0)==0){Z=1708}else{ag=c[aO+12>>2]|0;if((ag|0)==(c[aO+16>>2]|0)){aS=cW[c[(c[aO>>2]|0)+36>>2]&255](aO)|0}else{aS=c[ag>>2]|0}if((aS|0)==-1){c[b>>2]=0;Z=1708;break}else{if(aQ^(aO|0)==0){aT=aO;break}else{Z=1715;break L1810}}}}while(0);if((Z|0)==1708){Z=0;if(aQ){Z=1715;break L1810}else{aT=0}}ag=c[f>>2]|0;ah=c[ag+12>>2]|0;if((ah|0)==(c[ag+16>>2]|0)){aU=cW[c[(c[ag>>2]|0)+36>>2]&255](ag)|0}else{aU=c[ah>>2]|0}if(!(cU[c[(c[e>>2]|0)+12>>2]&63](l,2048,aU)|0)){Z=1715;break L1810}if((c[n>>2]|0)==(c[q>>2]|0)){jB(m,n,q)}ah=c[f>>2]|0;ag=c[ah+12>>2]|0;if((ag|0)==(c[ah+16>>2]|0)){aV=cW[c[(c[ah>>2]|0)+36>>2]&255](ah)|0}else{aV=c[ag>>2]|0}ag=c[n>>2]|0;c[n>>2]=ag+4;c[ag>>2]=aV;ag=aP-1|0;c[B>>2]=ag;ah=c[f>>2]|0;V=ah+12|0;af=c[V>>2]|0;if((af|0)==(c[ah+16>>2]|0)){ae=c[(c[ah>>2]|0)+40>>2]|0;cW[ae&255](ah)|0}else{c[V>>2]=af+4}if((ag|0)>0){aO=aT;aP=ag}else{break}}}if((c[n>>2]|0)==(c[g>>2]|0)){Z=1726;break L1810}else{aW=r;aX=aA;aY=aB;aZ=aC;a_=aD}break};case 1:{if((U|0)==3){aa=R;ab=S;ac=T;ad=r;Z=1728;break L1810}aj=c[f>>2]|0;ag=c[aj+12>>2]|0;if((ag|0)==(c[aj+16>>2]|0)){a$=cW[c[(c[aj>>2]|0)+36>>2]&255](aj)|0}else{a$=c[ag>>2]|0}if(!(cU[c[(c[e>>2]|0)+12>>2]&63](l,8192,a$)|0)){Z=1512;break L1810}ag=c[f>>2]|0;aj=ag+12|0;af=c[aj>>2]|0;if((af|0)==(c[ag+16>>2]|0)){a0=cW[c[(c[ag>>2]|0)+40>>2]&255](ag)|0}else{c[aj>>2]=af+4;a0=c[af>>2]|0}fw(A,a0);Z=1513;break};case 0:{Z=1513;break};case 3:{af=a[E]|0;aj=af&255;ag=(aj&1|0)==0;V=a[F]|0;ah=V&255;ae=(ah&1|0)==0;if(((ag?aj>>>1:c[J>>2]|0)|0)==(-(ae?ah>>>1:c[H>>2]|0)|0)){aW=r;aX=o;aY=T;aZ=S;a_=R;break L1834}do{if(((ag?aj>>>1:c[J>>2]|0)|0)!=0){if(((ae?ah>>>1:c[H>>2]|0)|0)==0){break}X=c[f>>2]|0;av=c[X+12>>2]|0;if((av|0)==(c[X+16>>2]|0)){at=cW[c[(c[X>>2]|0)+36>>2]&255](X)|0;a1=at;a2=a[E]|0}else{a1=c[av>>2]|0;a2=af}av=c[f>>2]|0;at=av+12|0;X=c[at>>2]|0;a3=(X|0)==(c[av+16>>2]|0);if((a1|0)==(c[((a2&1)==0?J:c[K>>2]|0)>>2]|0)){if(a3){a4=c[(c[av>>2]|0)+40>>2]|0;cW[a4&255](av)|0}else{c[at>>2]=X+4}at=d[E]|0;aW=((at&1|0)==0?at>>>1:c[J>>2]|0)>>>0>1>>>0?y:r;aX=o;aY=T;aZ=S;a_=R;break L1834}if(a3){a5=cW[c[(c[av>>2]|0)+36>>2]&255](av)|0}else{a5=c[X>>2]|0}if((a5|0)!=(c[((a[F]&1)==0?H:c[I>>2]|0)>>2]|0)){Z=1578;break L1810}X=c[f>>2]|0;av=X+12|0;a3=c[av>>2]|0;if((a3|0)==(c[X+16>>2]|0)){at=c[(c[X>>2]|0)+40>>2]|0;cW[at&255](X)|0}else{c[av>>2]=a3+4}a[k]=1;a3=d[F]|0;aW=((a3&1|0)==0?a3>>>1:c[H>>2]|0)>>>0>1>>>0?z:r;aX=o;aY=T;aZ=S;a_=R;break L1834}}while(0);ah=c[f>>2]|0;ae=c[ah+12>>2]|0;a3=(ae|0)==(c[ah+16>>2]|0);if(((ag?aj>>>1:c[J>>2]|0)|0)==0){if(a3){av=cW[c[(c[ah>>2]|0)+36>>2]&255](ah)|0;a6=av;a7=a[F]|0}else{a6=c[ae>>2]|0;a7=V}if((a6|0)!=(c[((a7&1)==0?H:c[I>>2]|0)>>2]|0)){aW=r;aX=o;aY=T;aZ=S;a_=R;break L1834}av=c[f>>2]|0;X=av+12|0;at=c[X>>2]|0;if((at|0)==(c[av+16>>2]|0)){a4=c[(c[av>>2]|0)+40>>2]|0;cW[a4&255](av)|0}else{c[X>>2]=at+4}a[k]=1;at=d[F]|0;aW=((at&1|0)==0?at>>>1:c[H>>2]|0)>>>0>1>>>0?z:r;aX=o;aY=T;aZ=S;a_=R;break L1834}if(a3){a3=cW[c[(c[ah>>2]|0)+36>>2]&255](ah)|0;a8=a3;a9=a[E]|0}else{a8=c[ae>>2]|0;a9=af}if((a8|0)!=(c[((a9&1)==0?J:c[K>>2]|0)>>2]|0)){a[k]=1;aW=r;aX=o;aY=T;aZ=S;a_=R;break L1834}ae=c[f>>2]|0;a3=ae+12|0;ah=c[a3>>2]|0;if((ah|0)==(c[ae+16>>2]|0)){at=c[(c[ae>>2]|0)+40>>2]|0;cW[at&255](ae)|0}else{c[a3>>2]=ah+4}ah=d[E]|0;aW=((ah&1|0)==0?ah>>>1:c[J>>2]|0)>>>0>1>>>0?y:r;aX=o;aY=T;aZ=S;a_=R;break};case 2:{if(!((r|0)!=0|U>>>0<2>>>0)){if((U|0)==2){ba=(a[P]|0)!=0}else{ba=0}if(!(L|ba)){aW=0;aX=o;aY=T;aZ=S;a_=R;break L1834}}ah=a[D]|0;a3=(ah&1)==0?h:c[M>>2]|0;L2050:do{if((U|0)==0){bb=a3;bc=ah;bd=$}else{if((d[s+(U-1)|0]|0)>>>0<2>>>0){be=a3;bf=ah}else{bb=a3;bc=ah;bd=$;break}while(1){ae=bf&255;if((be|0)==(((bf&1)==0?h:c[M>>2]|0)+(((ae&1|0)==0?ae>>>1:c[h>>2]|0)<<2)|0)){bg=bf;break}if(!(cU[c[(c[e>>2]|0)+12>>2]&63](l,8192,c[be>>2]|0)|0)){Z=1589;break}be=be+4|0;bf=a[D]|0}if((Z|0)==1589){Z=0;bg=a[D]|0}ae=(bg&1)==0;at=be-(ae?h:c[M>>2]|0)>>2;X=a[G]|0;av=X&255;a4=(av&1|0)==0;L2060:do{if(at>>>0<=(a4?av>>>1:c[N>>2]|0)>>>0){bh=(X&1)==0;bi=(bh?N:c[O>>2]|0)+((a4?av>>>1:c[N>>2]|0)-at<<2)|0;bj=(bh?N:c[O>>2]|0)+((a4?av>>>1:c[N>>2]|0)<<2)|0;if((bi|0)==(bj|0)){bb=be;bc=bg;bd=$;break L2050}else{bk=bi;bl=ae?h:c[M>>2]|0}while(1){if((c[bk>>2]|0)!=(c[bl>>2]|0)){break L2060}bi=bk+4|0;if((bi|0)==(bj|0)){bb=be;bc=bg;bd=$;break L2050}bk=bi;bl=bl+4|0}}}while(0);bb=ae?h:c[M>>2]|0;bc=bg;bd=$}}while(0);L2067:while(1){ah=bc&255;if((bb|0)==(((bc&1)==0?h:c[M>>2]|0)+(((ah&1|0)==0?ah>>>1:c[h>>2]|0)<<2)|0)){break}ah=c[f>>2]|0;do{if((ah|0)==0){bm=1}else{a3=c[ah+12>>2]|0;if((a3|0)==(c[ah+16>>2]|0)){bn=cW[c[(c[ah>>2]|0)+36>>2]&255](ah)|0}else{bn=c[a3>>2]|0}if((bn|0)==-1){c[f>>2]=0;bm=1;break}else{bm=(c[f>>2]|0)==0;break}}}while(0);do{if((bd|0)==0){Z=1610}else{ah=c[bd+12>>2]|0;if((ah|0)==(c[bd+16>>2]|0)){bo=cW[c[(c[bd>>2]|0)+36>>2]&255](bd)|0}else{bo=c[ah>>2]|0}if((bo|0)==-1){c[b>>2]=0;Z=1610;break}else{if(bm^(bd|0)==0){bp=bd;break}else{break L2067}}}}while(0);if((Z|0)==1610){Z=0;if(bm){break}else{bp=0}}ah=c[f>>2]|0;ae=c[ah+12>>2]|0;if((ae|0)==(c[ah+16>>2]|0)){bq=cW[c[(c[ah>>2]|0)+36>>2]&255](ah)|0}else{bq=c[ae>>2]|0}if((bq|0)!=(c[bb>>2]|0)){break}ae=c[f>>2]|0;ah=ae+12|0;a3=c[ah>>2]|0;if((a3|0)==(c[ae+16>>2]|0)){af=c[(c[ae>>2]|0)+40>>2]|0;cW[af&255](ae)|0}else{c[ah>>2]=a3+4}bb=bb+4|0;bc=a[D]|0;bd=bp}if(!L){aW=r;aX=o;aY=T;aZ=S;a_=R;break L1834}a3=a[D]|0;ah=a3&255;if((bb|0)==(((a3&1)==0?h:c[M>>2]|0)+(((ah&1|0)==0?ah>>>1:c[h>>2]|0)<<2)|0)){aW=r;aX=o;aY=T;aZ=S;a_=R}else{Z=1622;break L1810}break};default:{aW=r;aX=o;aY=T;aZ=S;a_=R}}}while(0);L2103:do{if((Z|0)==1513){Z=0;if((U|0)==3){aa=R;ab=S;ac=T;ad=r;Z=1728;break L1810}else{br=$}while(1){ah=c[f>>2]|0;do{if((ah|0)==0){bs=1}else{a3=c[ah+12>>2]|0;if((a3|0)==(c[ah+16>>2]|0)){bt=cW[c[(c[ah>>2]|0)+36>>2]&255](ah)|0}else{bt=c[a3>>2]|0}if((bt|0)==-1){c[f>>2]=0;bs=1;break}else{bs=(c[f>>2]|0)==0;break}}}while(0);do{if((br|0)==0){Z=1527}else{ah=c[br+12>>2]|0;if((ah|0)==(c[br+16>>2]|0)){bu=cW[c[(c[br>>2]|0)+36>>2]&255](br)|0}else{bu=c[ah>>2]|0}if((bu|0)==-1){c[b>>2]=0;Z=1527;break}else{if(bs^(br|0)==0){bv=br;break}else{aW=r;aX=o;aY=T;aZ=S;a_=R;break L2103}}}}while(0);if((Z|0)==1527){Z=0;if(bs){aW=r;aX=o;aY=T;aZ=S;a_=R;break L2103}else{bv=0}}ah=c[f>>2]|0;a3=c[ah+12>>2]|0;if((a3|0)==(c[ah+16>>2]|0)){bw=cW[c[(c[ah>>2]|0)+36>>2]&255](ah)|0}else{bw=c[a3>>2]|0}if(!(cU[c[(c[e>>2]|0)+12>>2]&63](l,8192,bw)|0)){aW=r;aX=o;aY=T;aZ=S;a_=R;break L2103}a3=c[f>>2]|0;ah=a3+12|0;ae=c[ah>>2]|0;if((ae|0)==(c[a3+16>>2]|0)){bx=cW[c[(c[a3>>2]|0)+40>>2]&255](a3)|0}else{c[ah>>2]=ae+4;bx=c[ae>>2]|0}fw(A,bx);br=bv}}}while(0);ae=U+1|0;if(ae>>>0<4>>>0){R=a_;S=aZ;T=aY;o=aX;r=aW;U=ae}else{aa=a_;ab=aZ;ac=aY;ad=aW;Z=1728;break}}L2140:do{if((Z|0)==1726){c[j>>2]=c[j>>2]|4;by=0;bz=aC;bA=aD}else if((Z|0)==1728){L2143:do{if((ad|0)!=0){aW=ad;aY=ad+4|0;aZ=ad+8|0;a_=1;L2145:while(1){U=d[aW]|0;if((U&1|0)==0){bB=U>>>1}else{bB=c[aY>>2]|0}if(a_>>>0>=bB>>>0){break L2143}U=c[f>>2]|0;do{if((U|0)==0){bC=1}else{r=c[U+12>>2]|0;if((r|0)==(c[U+16>>2]|0)){bD=cW[c[(c[U>>2]|0)+36>>2]&255](U)|0}else{bD=c[r>>2]|0}if((bD|0)==-1){c[f>>2]=0;bC=1;break}else{bC=(c[f>>2]|0)==0;break}}}while(0);U=c[b>>2]|0;do{if((U|0)==0){Z=1747}else{r=c[U+12>>2]|0;if((r|0)==(c[U+16>>2]|0)){bE=cW[c[(c[U>>2]|0)+36>>2]&255](U)|0}else{bE=c[r>>2]|0}if((bE|0)==-1){c[b>>2]=0;Z=1747;break}else{if(bC^(U|0)==0){break}else{break L2145}}}}while(0);if((Z|0)==1747){Z=0;if(bC){break}}U=c[f>>2]|0;r=c[U+12>>2]|0;if((r|0)==(c[U+16>>2]|0)){bF=cW[c[(c[U>>2]|0)+36>>2]&255](U)|0}else{bF=c[r>>2]|0}if((a[aW]&1)==0){bG=aY}else{bG=c[aZ>>2]|0}if((bF|0)!=(c[bG+(a_<<2)>>2]|0)){break}r=a_+1|0;U=c[f>>2]|0;aX=U+12|0;o=c[aX>>2]|0;if((o|0)==(c[U+16>>2]|0)){T=c[(c[U>>2]|0)+40>>2]|0;cW[T&255](U)|0;a_=r;continue}else{c[aX>>2]=o+4;a_=r;continue}}c[j>>2]=c[j>>2]|4;by=0;bz=ab;bA=aa;break L2140}}while(0);if((ab|0)==(ac|0)){by=1;bz=ac;bA=aa;break}c[C>>2]=0;jt(v,ab,ac,C);if((c[C>>2]|0)==0){by=1;bz=ab;bA=aa;break}c[j>>2]=c[j>>2]|4;by=0;bz=ab;bA=aa}else if((Z|0)==1622){c[j>>2]=c[j>>2]|4;by=0;bz=S;bA=R}else if((Z|0)==1715){c[j>>2]=c[j>>2]|4;by=0;bz=aC;bA=aD}else if((Z|0)==1691){c[j>>2]=c[j>>2]|4;by=0;bz=aC;bA=aD}else if((Z|0)==1512){c[j>>2]=c[j>>2]|4;by=0;bz=S;bA=R}else if((Z|0)==1578){c[j>>2]=c[j>>2]|4;by=0;bz=S;bA=R}}while(0);fs(A);fs(z);fs(y);fs(x);fh(v);if((bz|0)==0){i=p;return by|0}cR[bA&511](bz);i=p;return by|0}function jy(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;d=i;i=i+456|0;l=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[l>>2];l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=d|0;m=d+16|0;n=d+416|0;o=d+424|0;p=d+432|0;q=d+440|0;r=d+448|0;s=n|0;c[s>>2]=m;t=n+4|0;c[t>>2]=188;u=m+400|0;fB(p,h);m=p|0;v=c[m>>2]|0;if((c[3924]|0)!=-1){c[l>>2]=15696;c[l+4>>2]=14;c[l+8>>2]=0;fc(15696,l,116)}l=(c[3925]|0)-1|0;w=c[v+8>>2]|0;do{if((c[v+12>>2]|0)-w>>2>>>0>l>>>0){x=c[w+(l<<2)>>2]|0;if((x|0)==0){break}y=x;a[q]=0;z=f|0;A=c[z>>2]|0;c[r>>2]=A;if(jx(e,r,g,p,c[h+4>>2]|0,j,q,y,n,o,u)|0){B=k;if((a[B]&1)==0){c[k+4>>2]=0;a[B]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}B=x;if((a[q]&1)!=0){fw(k,cT[c[(c[B>>2]|0)+44>>2]&63](y,45)|0)}x=cT[c[(c[B>>2]|0)+44>>2]&63](y,48)|0;y=c[o>>2]|0;B=y-4|0;C=c[s>>2]|0;while(1){if(C>>>0>=B>>>0){break}if((c[C>>2]|0)==(x|0)){C=C+4|0}else{break}}jz(k,C,y)|0}x=e|0;B=c[x>>2]|0;do{if((B|0)==0){D=0}else{E=c[B+12>>2]|0;if((E|0)==(c[B+16>>2]|0)){F=cW[c[(c[B>>2]|0)+36>>2]&255](B)|0}else{F=c[E>>2]|0}if((F|0)!=-1){D=B;break}c[x>>2]=0;D=0}}while(0);x=(D|0)==0;do{if((A|0)==0){G=1802}else{B=c[A+12>>2]|0;if((B|0)==(c[A+16>>2]|0)){H=cW[c[(c[A>>2]|0)+36>>2]&255](A)|0}else{H=c[B>>2]|0}if((H|0)==-1){c[z>>2]=0;G=1802;break}else{if(x^(A|0)==0){break}else{G=1804;break}}}}while(0);if((G|0)==1802){if(x){G=1804}}if((G|0)==1804){c[j>>2]=c[j>>2]|2}c[b>>2]=D;A=c[m>>2]|0;eS(A)|0;A=c[s>>2]|0;c[s>>2]=0;if((A|0)==0){i=d;return}cR[c[t>>2]&511](A);i=d;return}}while(0);d=cy(4)|0;l4(d);bK(d|0,10072,154)}function jz(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;f=b;g=d;h=a[f]|0;i=h&255;if((i&1|0)==0){j=i>>>1}else{j=c[b+4>>2]|0}if((h&1)==0){k=1;l=h}else{h=c[b>>2]|0;k=(h&-2)-1|0;l=h&255}h=e-g>>2;if((h|0)==0){return b|0}if((k-j|0)>>>0<h>>>0){fy(b,k,j+h-k|0,j,j,0,0);m=a[f]|0}else{m=l}if((m&1)==0){n=b+4|0}else{n=c[b+8>>2]|0}m=n+(j<<2)|0;if((d|0)==(e|0)){o=m}else{l=j+((e-4+(-g|0)|0)>>>2)+1|0;g=d;d=m;while(1){c[d>>2]=c[g>>2];m=g+4|0;if((m|0)==(e|0)){break}else{g=m;d=d+4|0}}o=n+(l<<2)|0}c[o>>2]=0;o=j+h|0;if((a[f]&1)==0){a[f]=o<<1&255;return b|0}else{c[b+4>>2]=o;return b|0}return 0}function jA(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0;n=i;i=i+56|0;o=n|0;p=n+16|0;q=n+32|0;r=n+40|0;s=r;t=i;i=i+12|0;i=i+7&-8;u=t;v=i;i=i+12|0;i=i+7&-8;w=v;x=i;i=i+12|0;i=i+7&-8;y=x;z=i;i=i+4|0;i=i+7&-8;A=i;i=i+12|0;i=i+7&-8;B=A;D=i;i=i+12|0;i=i+7&-8;E=D;F=i;i=i+12|0;i=i+7&-8;G=F;H=i;i=i+12|0;i=i+7&-8;I=H;if(b){b=c[d>>2]|0;if((c[4040]|0)!=-1){c[p>>2]=16160;c[p+4>>2]=14;c[p+8>>2]=0;fc(16160,p,116)}p=(c[4041]|0)-1|0;J=c[b+8>>2]|0;if((c[b+12>>2]|0)-J>>2>>>0<=p>>>0){K=cy(4)|0;L=K;l4(L);bK(K|0,10072,154)}b=c[J+(p<<2)>>2]|0;if((b|0)==0){K=cy(4)|0;L=K;l4(L);bK(K|0,10072,154)}K=b;cS[c[(c[b>>2]|0)+44>>2]&127](q,K);L=e;C=c[q>>2]|0;a[L]=C&255;C=C>>8;a[L+1|0]=C&255;C=C>>8;a[L+2|0]=C&255;C=C>>8;a[L+3|0]=C&255;L=b;cS[c[(c[L>>2]|0)+32>>2]&127](r,K);q=l;if((a[q]&1)==0){c[l+4>>2]=0;a[q]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}fv(l,0);c[q>>2]=c[s>>2];c[q+4>>2]=c[s+4>>2];c[q+8>>2]=c[s+8>>2];mF(s|0,0,12)|0;fs(r);cS[c[(c[L>>2]|0)+28>>2]&127](t,K);r=k;if((a[r]&1)==0){c[k+4>>2]=0;a[r]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}fv(k,0);c[r>>2]=c[u>>2];c[r+4>>2]=c[u+4>>2];c[r+8>>2]=c[u+8>>2];mF(u|0,0,12)|0;fs(t);t=b;c[f>>2]=cW[c[(c[t>>2]|0)+12>>2]&255](K)|0;c[g>>2]=cW[c[(c[t>>2]|0)+16>>2]&255](K)|0;cS[c[(c[b>>2]|0)+20>>2]&127](v,K);b=h;if((a[b]&1)==0){a[h+1|0]=0;a[b]=0}else{a[c[h+8>>2]|0]=0;c[h+4>>2]=0}fl(h,0);c[b>>2]=c[w>>2];c[b+4>>2]=c[w+4>>2];c[b+8>>2]=c[w+8>>2];mF(w|0,0,12)|0;fh(v);cS[c[(c[L>>2]|0)+24>>2]&127](x,K);L=j;if((a[L]&1)==0){c[j+4>>2]=0;a[L]=0}else{c[c[j+8>>2]>>2]=0;c[j+4>>2]=0}fv(j,0);c[L>>2]=c[y>>2];c[L+4>>2]=c[y+4>>2];c[L+8>>2]=c[y+8>>2];mF(y|0,0,12)|0;fs(x);M=cW[c[(c[t>>2]|0)+36>>2]&255](K)|0;c[m>>2]=M;i=n;return}else{K=c[d>>2]|0;if((c[4042]|0)!=-1){c[o>>2]=16168;c[o+4>>2]=14;c[o+8>>2]=0;fc(16168,o,116)}o=(c[4043]|0)-1|0;d=c[K+8>>2]|0;if((c[K+12>>2]|0)-d>>2>>>0<=o>>>0){N=cy(4)|0;O=N;l4(O);bK(N|0,10072,154)}K=c[d+(o<<2)>>2]|0;if((K|0)==0){N=cy(4)|0;O=N;l4(O);bK(N|0,10072,154)}N=K;cS[c[(c[K>>2]|0)+44>>2]&127](z,N);O=e;C=c[z>>2]|0;a[O]=C&255;C=C>>8;a[O+1|0]=C&255;C=C>>8;a[O+2|0]=C&255;C=C>>8;a[O+3|0]=C&255;O=K;cS[c[(c[O>>2]|0)+32>>2]&127](A,N);z=l;if((a[z]&1)==0){c[l+4>>2]=0;a[z]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}fv(l,0);c[z>>2]=c[B>>2];c[z+4>>2]=c[B+4>>2];c[z+8>>2]=c[B+8>>2];mF(B|0,0,12)|0;fs(A);cS[c[(c[O>>2]|0)+28>>2]&127](D,N);A=k;if((a[A]&1)==0){c[k+4>>2]=0;a[A]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}fv(k,0);c[A>>2]=c[E>>2];c[A+4>>2]=c[E+4>>2];c[A+8>>2]=c[E+8>>2];mF(E|0,0,12)|0;fs(D);D=K;c[f>>2]=cW[c[(c[D>>2]|0)+12>>2]&255](N)|0;c[g>>2]=cW[c[(c[D>>2]|0)+16>>2]&255](N)|0;cS[c[(c[K>>2]|0)+20>>2]&127](F,N);K=h;if((a[K]&1)==0){a[h+1|0]=0;a[K]=0}else{a[c[h+8>>2]|0]=0;c[h+4>>2]=0}fl(h,0);c[K>>2]=c[G>>2];c[K+4>>2]=c[G+4>>2];c[K+8>>2]=c[G+8>>2];mF(G|0,0,12)|0;fh(F);cS[c[(c[O>>2]|0)+24>>2]&127](H,N);O=j;if((a[O]&1)==0){c[j+4>>2]=0;a[O]=0}else{c[c[j+8>>2]>>2]=0;c[j+4>>2]=0}fv(j,0);c[O>>2]=c[I>>2];c[O+4>>2]=c[I+4>>2];c[O+8>>2]=c[I+8>>2];mF(I|0,0,12)|0;fs(H);M=cW[c[(c[D>>2]|0)+36>>2]&255](N)|0;c[m>>2]=M;i=n;return}}function jB(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;e=a+4|0;f=(c[e>>2]|0)!=188;g=a|0;a=c[g>>2]|0;h=a;i=(c[d>>2]|0)-h|0;j=i>>>0<2147483647>>>0?i<<1:-1;i=(c[b>>2]|0)-h>>2;if(f){k=a}else{k=0}a=mr(k,j)|0;k=a;if((a|0)==0){mB()}do{if(f){c[g>>2]=k;l=k}else{a=c[g>>2]|0;c[g>>2]=k;if((a|0)==0){l=k;break}cR[c[e>>2]&511](a);l=c[g>>2]|0}}while(0);c[e>>2]=94;c[b>>2]=l+(i<<2);c[d>>2]=(c[g>>2]|0)+(j>>>2<<2);return}function jC(a){a=a|0;eQ(a|0);mw(a);return}function jD(a){a=a|0;eQ(a|0);return}function jE(b,e,f,g,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;l=+l;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0;e=i;i=i+280|0;m=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[m>>2];m=e|0;n=e+120|0;o=e+232|0;p=e+240|0;q=e+248|0;r=e+256|0;s=e+264|0;t=s;u=i;i=i+12|0;i=i+7&-8;v=u;w=i;i=i+12|0;i=i+7&-8;x=w;y=i;i=i+4|0;i=i+7&-8;z=i;i=i+100|0;i=i+7&-8;A=i;i=i+4|0;i=i+7&-8;B=i;i=i+4|0;i=i+7&-8;C=i;i=i+4|0;i=i+7&-8;D=e+16|0;c[n>>2]=D;E=e+128|0;F=bT(D|0,100,2096,(D=i,i=i+8|0,h[D>>3]=l,D)|0)|0;i=D;do{if(F>>>0>99>>>0){do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);G=hO(n,c[3568]|0,2096,(D=i,i=i+8|0,h[D>>3]=l,D)|0)|0;i=D;H=c[n>>2]|0;if((H|0)==0){mB();I=c[n>>2]|0}else{I=H}H=mp(G)|0;if((H|0)!=0){J=H;K=G;L=I;M=H;break}mB();J=0;K=G;L=I;M=0}else{J=E;K=F;L=0;M=0}}while(0);fB(o,j);F=o|0;E=c[F>>2]|0;if((c[3926]|0)!=-1){c[m>>2]=15704;c[m+4>>2]=14;c[m+8>>2]=0;fc(15704,m,116)}m=(c[3927]|0)-1|0;I=c[E+8>>2]|0;do{if((c[E+12>>2]|0)-I>>2>>>0>m>>>0){D=c[I+(m<<2)>>2]|0;if((D|0)==0){break}G=D;H=c[n>>2]|0;N=H+K|0;O=c[(c[D>>2]|0)+32>>2]|0;c2[O&15](G,H,N,J)|0;if((K|0)==0){P=0}else{P=(a[c[n>>2]|0]|0)==45}mF(t|0,0,12)|0;mF(v|0,0,12)|0;mF(x|0,0,12)|0;jF(g,P,o,p,q,r,s,u,w,y);N=z|0;H=c[y>>2]|0;if((K|0)>(H|0)){O=d[x]|0;if((O&1|0)==0){Q=O>>>1}else{Q=c[w+4>>2]|0}O=d[v]|0;if((O&1|0)==0){R=O>>>1}else{R=c[u+4>>2]|0}S=(K-H<<1|1)+Q+R|0}else{O=d[x]|0;if((O&1|0)==0){T=O>>>1}else{T=c[w+4>>2]|0}O=d[v]|0;if((O&1|0)==0){U=O>>>1}else{U=c[u+4>>2]|0}S=T+2+U|0}O=S+H|0;do{if(O>>>0>100>>>0){D=mp(O)|0;if((D|0)!=0){V=D;W=D;break}mB();V=0;W=0}else{V=N;W=0}}while(0);jG(V,A,B,c[j+4>>2]|0,J,J+K|0,G,P,p,a[q]|0,a[r]|0,s,u,w,H);c[C>>2]=c[f>>2];dA(b,C,V,c[A>>2]|0,c[B>>2]|0,j,k);if((W|0)!=0){mq(W)}fh(w);fh(u);fh(s);N=c[F>>2]|0;eS(N)|0;if((M|0)!=0){mq(M)}if((L|0)==0){i=e;return}mq(L);i=e;return}}while(0);e=cy(4)|0;l4(e);bK(e|0,10072,154)}function jF(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0;n=i;i=i+40|0;o=n|0;p=n+16|0;q=n+32|0;r=q;s=i;i=i+12|0;i=i+7&-8;t=s;u=i;i=i+4|0;i=i+7&-8;v=u;w=i;i=i+12|0;i=i+7&-8;x=w;y=i;i=i+12|0;i=i+7&-8;z=y;A=i;i=i+12|0;i=i+7&-8;B=A;D=i;i=i+4|0;i=i+7&-8;E=D;F=i;i=i+12|0;i=i+7&-8;G=F;H=i;i=i+4|0;i=i+7&-8;I=H;J=i;i=i+12|0;i=i+7&-8;K=J;L=i;i=i+12|0;i=i+7&-8;M=L;N=i;i=i+12|0;i=i+7&-8;O=N;P=c[e>>2]|0;if(b){if((c[4044]|0)!=-1){c[p>>2]=16176;c[p+4>>2]=14;c[p+8>>2]=0;fc(16176,p,116)}p=(c[4045]|0)-1|0;b=c[P+8>>2]|0;if((c[P+12>>2]|0)-b>>2>>>0<=p>>>0){Q=cy(4)|0;R=Q;l4(R);bK(Q|0,10072,154)}e=c[b+(p<<2)>>2]|0;if((e|0)==0){Q=cy(4)|0;R=Q;l4(R);bK(Q|0,10072,154)}Q=e;R=c[e>>2]|0;if(d){cS[c[R+44>>2]&127](r,Q);r=f;C=c[q>>2]|0;a[r]=C&255;C=C>>8;a[r+1|0]=C&255;C=C>>8;a[r+2|0]=C&255;C=C>>8;a[r+3|0]=C&255;cS[c[(c[e>>2]|0)+32>>2]&127](s,Q);r=l;if((a[r]&1)==0){a[l+1|0]=0;a[r]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}fl(l,0);c[r>>2]=c[t>>2];c[r+4>>2]=c[t+4>>2];c[r+8>>2]=c[t+8>>2];mF(t|0,0,12)|0;fh(s)}else{cS[c[R+40>>2]&127](v,Q);v=f;C=c[u>>2]|0;a[v]=C&255;C=C>>8;a[v+1|0]=C&255;C=C>>8;a[v+2|0]=C&255;C=C>>8;a[v+3|0]=C&255;cS[c[(c[e>>2]|0)+28>>2]&127](w,Q);v=l;if((a[v]&1)==0){a[l+1|0]=0;a[v]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}fl(l,0);c[v>>2]=c[x>>2];c[v+4>>2]=c[x+4>>2];c[v+8>>2]=c[x+8>>2];mF(x|0,0,12)|0;fh(w)}w=e;a[g]=cW[c[(c[w>>2]|0)+12>>2]&255](Q)|0;a[h]=cW[c[(c[w>>2]|0)+16>>2]&255](Q)|0;w=e;cS[c[(c[w>>2]|0)+20>>2]&127](y,Q);x=j;if((a[x]&1)==0){a[j+1|0]=0;a[x]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}fl(j,0);c[x>>2]=c[z>>2];c[x+4>>2]=c[z+4>>2];c[x+8>>2]=c[z+8>>2];mF(z|0,0,12)|0;fh(y);cS[c[(c[w>>2]|0)+24>>2]&127](A,Q);w=k;if((a[w]&1)==0){a[k+1|0]=0;a[w]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}fl(k,0);c[w>>2]=c[B>>2];c[w+4>>2]=c[B+4>>2];c[w+8>>2]=c[B+8>>2];mF(B|0,0,12)|0;fh(A);S=cW[c[(c[e>>2]|0)+36>>2]&255](Q)|0;c[m>>2]=S;i=n;return}else{if((c[4046]|0)!=-1){c[o>>2]=16184;c[o+4>>2]=14;c[o+8>>2]=0;fc(16184,o,116)}o=(c[4047]|0)-1|0;Q=c[P+8>>2]|0;if((c[P+12>>2]|0)-Q>>2>>>0<=o>>>0){T=cy(4)|0;U=T;l4(U);bK(T|0,10072,154)}P=c[Q+(o<<2)>>2]|0;if((P|0)==0){T=cy(4)|0;U=T;l4(U);bK(T|0,10072,154)}T=P;U=c[P>>2]|0;if(d){cS[c[U+44>>2]&127](E,T);E=f;C=c[D>>2]|0;a[E]=C&255;C=C>>8;a[E+1|0]=C&255;C=C>>8;a[E+2|0]=C&255;C=C>>8;a[E+3|0]=C&255;cS[c[(c[P>>2]|0)+32>>2]&127](F,T);E=l;if((a[E]&1)==0){a[l+1|0]=0;a[E]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}fl(l,0);c[E>>2]=c[G>>2];c[E+4>>2]=c[G+4>>2];c[E+8>>2]=c[G+8>>2];mF(G|0,0,12)|0;fh(F)}else{cS[c[U+40>>2]&127](I,T);I=f;C=c[H>>2]|0;a[I]=C&255;C=C>>8;a[I+1|0]=C&255;C=C>>8;a[I+2|0]=C&255;C=C>>8;a[I+3|0]=C&255;cS[c[(c[P>>2]|0)+28>>2]&127](J,T);I=l;if((a[I]&1)==0){a[l+1|0]=0;a[I]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}fl(l,0);c[I>>2]=c[K>>2];c[I+4>>2]=c[K+4>>2];c[I+8>>2]=c[K+8>>2];mF(K|0,0,12)|0;fh(J)}J=P;a[g]=cW[c[(c[J>>2]|0)+12>>2]&255](T)|0;a[h]=cW[c[(c[J>>2]|0)+16>>2]&255](T)|0;J=P;cS[c[(c[J>>2]|0)+20>>2]&127](L,T);h=j;if((a[h]&1)==0){a[j+1|0]=0;a[h]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}fl(j,0);c[h>>2]=c[M>>2];c[h+4>>2]=c[M+4>>2];c[h+8>>2]=c[M+8>>2];mF(M|0,0,12)|0;fh(L);cS[c[(c[J>>2]|0)+24>>2]&127](N,T);J=k;if((a[J]&1)==0){a[k+1|0]=0;a[J]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}fl(k,0);c[J>>2]=c[O>>2];c[J+4>>2]=c[O+4>>2];c[J+8>>2]=c[O+8>>2];mF(O|0,0,12)|0;fh(N);S=cW[c[(c[P>>2]|0)+36>>2]&255](T)|0;c[m>>2]=S;i=n;return}}function jG(d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;p=p|0;q=q|0;r=r|0;var s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0,ax=0,ay=0;c[f>>2]=d;s=j;t=q;u=q+1|0;v=q+8|0;w=q+4|0;q=p;x=(g&512|0)==0;y=p+1|0;z=p+4|0;A=p+8|0;p=j+8|0;B=(r|0)>0;C=o;D=o+1|0;E=o+8|0;F=o+4|0;o=-r|0;G=h;h=0;while(1){L2500:do{switch(a[l+h|0]|0){case 1:{c[e>>2]=c[f>>2];H=cT[c[(c[s>>2]|0)+28>>2]&63](j,32)|0;I=c[f>>2]|0;c[f>>2]=I+1;a[I]=H;J=G;break};case 0:{c[e>>2]=c[f>>2];J=G;break};case 3:{H=a[t]|0;I=H&255;if((I&1|0)==0){K=I>>>1}else{K=c[w>>2]|0}if((K|0)==0){J=G;break L2500}if((H&1)==0){L=u}else{L=c[v>>2]|0}H=a[L]|0;I=c[f>>2]|0;c[f>>2]=I+1;a[I]=H;J=G;break};case 2:{H=a[q]|0;I=H&255;M=(I&1|0)==0;if(M){N=I>>>1}else{N=c[z>>2]|0}if((N|0)==0|x){J=G;break L2500}if((H&1)==0){O=y;P=y}else{H=c[A>>2]|0;O=H;P=H}if(M){Q=I>>>1}else{Q=c[z>>2]|0}I=O+Q|0;M=c[f>>2]|0;if((P|0)==(I|0)){R=M}else{H=P;S=M;while(1){a[S]=a[H]|0;M=H+1|0;T=S+1|0;if((M|0)==(I|0)){R=T;break}else{H=M;S=T}}}c[f>>2]=R;J=G;break};case 4:{S=c[f>>2]|0;H=k?G+1|0:G;I=H;while(1){if(I>>>0>=i>>>0){break}T=a[I]|0;if(T<<24>>24<0){break}if((b[(c[p>>2]|0)+(T<<24>>24<<1)>>1]&2048)==0){break}else{I=I+1|0}}T=I;if(B){if(I>>>0>H>>>0){M=H+(-T|0)|0;T=M>>>0<o>>>0?o:M;M=T+r|0;U=I;V=r;W=S;while(1){X=U-1|0;Y=a[X]|0;c[f>>2]=W+1;a[W]=Y;Y=V-1|0;Z=(Y|0)>0;if(!(X>>>0>H>>>0&Z)){break}U=X;V=Y;W=c[f>>2]|0}W=I+T|0;if(Z){_=M;$=W;aa=2075}else{ab=0;ac=M;ad=W}}else{_=r;$=I;aa=2075}if((aa|0)==2075){aa=0;ab=cT[c[(c[s>>2]|0)+28>>2]&63](j,48)|0;ac=_;ad=$}W=c[f>>2]|0;c[f>>2]=W+1;if((ac|0)>0){V=ac;U=W;while(1){a[U]=ab;Y=V-1|0;X=c[f>>2]|0;c[f>>2]=X+1;if((Y|0)>0){V=Y;U=X}else{ae=X;break}}}else{ae=W}a[ae]=m;af=ad}else{af=I}if((af|0)==(H|0)){U=cT[c[(c[s>>2]|0)+28>>2]&63](j,48)|0;V=c[f>>2]|0;c[f>>2]=V+1;a[V]=U}else{U=a[C]|0;V=U&255;if((V&1|0)==0){ag=V>>>1}else{ag=c[F>>2]|0}if((ag|0)==0){ah=af;ai=0;aj=0;ak=-1}else{if((U&1)==0){al=D}else{al=c[E>>2]|0}ah=af;ai=0;aj=0;ak=a[al]|0}while(1){do{if((ai|0)==(ak|0)){U=c[f>>2]|0;c[f>>2]=U+1;a[U]=n;U=aj+1|0;V=a[C]|0;M=V&255;if((M&1|0)==0){am=M>>>1}else{am=c[F>>2]|0}if(U>>>0>=am>>>0){an=ak;ao=U;ap=0;break}M=(V&1)==0;if(M){aq=D}else{aq=c[E>>2]|0}if((a[aq+U|0]|0)==127){an=-1;ao=U;ap=0;break}if(M){ar=D}else{ar=c[E>>2]|0}an=a[ar+U|0]|0;ao=U;ap=0}else{an=ak;ao=aj;ap=ai}}while(0);U=ah-1|0;M=a[U]|0;V=c[f>>2]|0;c[f>>2]=V+1;a[V]=M;if((U|0)==(H|0)){break}else{ah=U;ai=ap+1|0;aj=ao;ak=an}}}I=c[f>>2]|0;if((S|0)==(I|0)){J=H;break L2500}W=I-1|0;if(S>>>0<W>>>0){as=S;at=W}else{J=H;break L2500}while(1){W=a[as]|0;a[as]=a[at]|0;a[at]=W;W=as+1|0;I=at-1|0;if(W>>>0<I>>>0){as=W;at=I}else{J=H;break}}break};default:{J=G}}}while(0);H=h+1|0;if(H>>>0<4>>>0){G=J;h=H}else{break}}h=a[t]|0;t=h&255;J=(t&1|0)==0;if(J){au=t>>>1}else{au=c[w>>2]|0}if(au>>>0>1>>>0){if((h&1)==0){av=u;aw=u}else{u=c[v>>2]|0;av=u;aw=u}if(J){ax=t>>>1}else{ax=c[w>>2]|0}w=av+ax|0;ax=c[f>>2]|0;av=aw+1|0;if((av|0)==(w|0)){ay=ax}else{aw=ax;ax=av;while(1){a[aw]=a[ax]|0;av=aw+1|0;t=ax+1|0;if((t|0)==(w|0)){ay=av;break}else{aw=av;ax=t}}}c[f>>2]=ay}ay=g&176;if((ay|0)==16){return}else if((ay|0)==32){c[e>>2]=c[f>>2];return}else{c[e>>2]=d;return}}function jH(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0;e=i;i=i+64|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=e|0;m=e+16|0;n=e+24|0;o=e+32|0;p=e+40|0;q=e+48|0;r=q;s=i;i=i+12|0;i=i+7&-8;t=s;u=i;i=i+12|0;i=i+7&-8;v=u;w=i;i=i+4|0;i=i+7&-8;x=i;i=i+100|0;i=i+7&-8;y=i;i=i+4|0;i=i+7&-8;z=i;i=i+4|0;i=i+7&-8;A=i;i=i+4|0;i=i+7&-8;fB(m,h);B=m|0;C=c[B>>2]|0;if((c[3926]|0)!=-1){c[l>>2]=15704;c[l+4>>2]=14;c[l+8>>2]=0;fc(15704,l,116)}l=(c[3927]|0)-1|0;D=c[C+8>>2]|0;do{if((c[C+12>>2]|0)-D>>2>>>0>l>>>0){E=c[D+(l<<2)>>2]|0;if((E|0)==0){break}F=E;G=k;H=k;I=a[H]|0;J=I&255;if((J&1|0)==0){K=J>>>1}else{K=c[k+4>>2]|0}if((K|0)==0){L=0}else{if((I&1)==0){M=G+1|0}else{M=c[k+8>>2]|0}I=a[M]|0;L=I<<24>>24==(cT[c[(c[E>>2]|0)+28>>2]&63](F,45)|0)<<24>>24}mF(r|0,0,12)|0;mF(t|0,0,12)|0;mF(v|0,0,12)|0;jF(g,L,m,n,o,p,q,s,u,w);E=x|0;I=a[H]|0;J=I&255;N=(J&1|0)==0;if(N){O=J>>>1}else{O=c[k+4>>2]|0}P=c[w>>2]|0;if((O|0)>(P|0)){if(N){Q=J>>>1}else{Q=c[k+4>>2]|0}J=d[v]|0;if((J&1|0)==0){R=J>>>1}else{R=c[u+4>>2]|0}J=d[t]|0;if((J&1|0)==0){S=J>>>1}else{S=c[s+4>>2]|0}T=(Q-P<<1|1)+R+S|0}else{J=d[v]|0;if((J&1|0)==0){U=J>>>1}else{U=c[u+4>>2]|0}J=d[t]|0;if((J&1|0)==0){V=J>>>1}else{V=c[s+4>>2]|0}T=U+2+V|0}J=T+P|0;do{if(J>>>0>100>>>0){N=mp(J)|0;if((N|0)!=0){W=N;X=N;Y=I;break}mB();W=0;X=0;Y=a[H]|0}else{W=E;X=0;Y=I}}while(0);if((Y&1)==0){Z=G+1|0;_=G+1|0}else{I=c[k+8>>2]|0;Z=I;_=I}I=Y&255;if((I&1|0)==0){$=I>>>1}else{$=c[k+4>>2]|0}jG(W,y,z,c[h+4>>2]|0,_,Z+$|0,F,L,n,a[o]|0,a[p]|0,q,s,u,P);c[A>>2]=c[f>>2];dA(b,A,W,c[y>>2]|0,c[z>>2]|0,h,j);if((X|0)==0){fh(u);fh(s);fh(q);aa=c[B>>2]|0;ab=aa|0;ac=eS(ab)|0;i=e;return}mq(X);fh(u);fh(s);fh(q);aa=c[B>>2]|0;ab=aa|0;ac=eS(ab)|0;i=e;return}}while(0);e=cy(4)|0;l4(e);bK(e|0,10072,154)}function jI(a){a=a|0;eQ(a|0);mw(a);return}function jJ(a){a=a|0;eQ(a|0);return}function jK(b,e,f,g,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;l=+l;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0;e=i;i=i+576|0;m=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[m>>2];m=e|0;n=e+120|0;o=e+528|0;p=e+536|0;q=e+544|0;r=e+552|0;s=e+560|0;t=s;u=i;i=i+12|0;i=i+7&-8;v=u;w=i;i=i+12|0;i=i+7&-8;x=w;y=i;i=i+4|0;i=i+7&-8;z=i;i=i+400|0;A=i;i=i+4|0;i=i+7&-8;B=i;i=i+4|0;i=i+7&-8;C=i;i=i+4|0;i=i+7&-8;D=e+16|0;c[n>>2]=D;E=e+128|0;F=bT(D|0,100,2096,(D=i,i=i+8|0,h[D>>3]=l,D)|0)|0;i=D;do{if(F>>>0>99>>>0){do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);G=hO(n,c[3568]|0,2096,(D=i,i=i+8|0,h[D>>3]=l,D)|0)|0;i=D;H=c[n>>2]|0;if((H|0)==0){mB();I=c[n>>2]|0}else{I=H}H=mp(G<<2)|0;J=H;if((H|0)!=0){K=J;L=G;M=I;N=J;break}mB();K=J;L=G;M=I;N=J}else{K=E;L=F;M=0;N=0}}while(0);fB(o,j);F=o|0;E=c[F>>2]|0;if((c[3924]|0)!=-1){c[m>>2]=15696;c[m+4>>2]=14;c[m+8>>2]=0;fc(15696,m,116)}m=(c[3925]|0)-1|0;I=c[E+8>>2]|0;do{if((c[E+12>>2]|0)-I>>2>>>0>m>>>0){D=c[I+(m<<2)>>2]|0;if((D|0)==0){break}J=D;G=c[n>>2]|0;H=G+L|0;O=c[(c[D>>2]|0)+48>>2]|0;c2[O&15](J,G,H,K)|0;if((L|0)==0){P=0}else{P=(a[c[n>>2]|0]|0)==45}mF(t|0,0,12)|0;mF(v|0,0,12)|0;mF(x|0,0,12)|0;jL(g,P,o,p,q,r,s,u,w,y);H=z|0;G=c[y>>2]|0;if((L|0)>(G|0)){O=d[x]|0;if((O&1|0)==0){Q=O>>>1}else{Q=c[w+4>>2]|0}O=d[v]|0;if((O&1|0)==0){R=O>>>1}else{R=c[u+4>>2]|0}S=(L-G<<1|1)+Q+R|0}else{O=d[x]|0;if((O&1|0)==0){T=O>>>1}else{T=c[w+4>>2]|0}O=d[v]|0;if((O&1|0)==0){U=O>>>1}else{U=c[u+4>>2]|0}S=T+2+U|0}O=S+G|0;do{if(O>>>0>100>>>0){D=mp(O<<2)|0;V=D;if((D|0)!=0){W=V;X=V;break}mB();W=V;X=V}else{W=H;X=0}}while(0);jM(W,A,B,c[j+4>>2]|0,K,K+(L<<2)|0,J,P,p,c[q>>2]|0,c[r>>2]|0,s,u,w,G);c[C>>2]=c[f>>2];hX(b,C,W,c[A>>2]|0,c[B>>2]|0,j,k);if((X|0)!=0){mq(X)}fs(w);fs(u);fh(s);H=c[F>>2]|0;eS(H)|0;if((N|0)!=0){mq(N)}if((M|0)==0){i=e;return}mq(M);i=e;return}}while(0);e=cy(4)|0;l4(e);bK(e|0,10072,154)}function jL(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0;n=i;i=i+40|0;o=n|0;p=n+16|0;q=n+32|0;r=q;s=i;i=i+12|0;i=i+7&-8;t=s;u=i;i=i+4|0;i=i+7&-8;v=u;w=i;i=i+12|0;i=i+7&-8;x=w;y=i;i=i+12|0;i=i+7&-8;z=y;A=i;i=i+12|0;i=i+7&-8;B=A;D=i;i=i+4|0;i=i+7&-8;E=D;F=i;i=i+12|0;i=i+7&-8;G=F;H=i;i=i+4|0;i=i+7&-8;I=H;J=i;i=i+12|0;i=i+7&-8;K=J;L=i;i=i+12|0;i=i+7&-8;M=L;N=i;i=i+12|0;i=i+7&-8;O=N;P=c[e>>2]|0;if(b){if((c[4040]|0)!=-1){c[p>>2]=16160;c[p+4>>2]=14;c[p+8>>2]=0;fc(16160,p,116)}p=(c[4041]|0)-1|0;b=c[P+8>>2]|0;if((c[P+12>>2]|0)-b>>2>>>0<=p>>>0){Q=cy(4)|0;R=Q;l4(R);bK(Q|0,10072,154)}e=c[b+(p<<2)>>2]|0;if((e|0)==0){Q=cy(4)|0;R=Q;l4(R);bK(Q|0,10072,154)}Q=e;R=c[e>>2]|0;if(d){cS[c[R+44>>2]&127](r,Q);r=f;C=c[q>>2]|0;a[r]=C&255;C=C>>8;a[r+1|0]=C&255;C=C>>8;a[r+2|0]=C&255;C=C>>8;a[r+3|0]=C&255;cS[c[(c[e>>2]|0)+32>>2]&127](s,Q);r=l;if((a[r]&1)==0){c[l+4>>2]=0;a[r]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}fv(l,0);c[r>>2]=c[t>>2];c[r+4>>2]=c[t+4>>2];c[r+8>>2]=c[t+8>>2];mF(t|0,0,12)|0;fs(s)}else{cS[c[R+40>>2]&127](v,Q);v=f;C=c[u>>2]|0;a[v]=C&255;C=C>>8;a[v+1|0]=C&255;C=C>>8;a[v+2|0]=C&255;C=C>>8;a[v+3|0]=C&255;cS[c[(c[e>>2]|0)+28>>2]&127](w,Q);v=l;if((a[v]&1)==0){c[l+4>>2]=0;a[v]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}fv(l,0);c[v>>2]=c[x>>2];c[v+4>>2]=c[x+4>>2];c[v+8>>2]=c[x+8>>2];mF(x|0,0,12)|0;fs(w)}w=e;c[g>>2]=cW[c[(c[w>>2]|0)+12>>2]&255](Q)|0;c[h>>2]=cW[c[(c[w>>2]|0)+16>>2]&255](Q)|0;cS[c[(c[e>>2]|0)+20>>2]&127](y,Q);x=j;if((a[x]&1)==0){a[j+1|0]=0;a[x]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}fl(j,0);c[x>>2]=c[z>>2];c[x+4>>2]=c[z+4>>2];c[x+8>>2]=c[z+8>>2];mF(z|0,0,12)|0;fh(y);cS[c[(c[e>>2]|0)+24>>2]&127](A,Q);e=k;if((a[e]&1)==0){c[k+4>>2]=0;a[e]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}fv(k,0);c[e>>2]=c[B>>2];c[e+4>>2]=c[B+4>>2];c[e+8>>2]=c[B+8>>2];mF(B|0,0,12)|0;fs(A);S=cW[c[(c[w>>2]|0)+36>>2]&255](Q)|0;c[m>>2]=S;i=n;return}else{if((c[4042]|0)!=-1){c[o>>2]=16168;c[o+4>>2]=14;c[o+8>>2]=0;fc(16168,o,116)}o=(c[4043]|0)-1|0;Q=c[P+8>>2]|0;if((c[P+12>>2]|0)-Q>>2>>>0<=o>>>0){T=cy(4)|0;U=T;l4(U);bK(T|0,10072,154)}P=c[Q+(o<<2)>>2]|0;if((P|0)==0){T=cy(4)|0;U=T;l4(U);bK(T|0,10072,154)}T=P;U=c[P>>2]|0;if(d){cS[c[U+44>>2]&127](E,T);E=f;C=c[D>>2]|0;a[E]=C&255;C=C>>8;a[E+1|0]=C&255;C=C>>8;a[E+2|0]=C&255;C=C>>8;a[E+3|0]=C&255;cS[c[(c[P>>2]|0)+32>>2]&127](F,T);E=l;if((a[E]&1)==0){c[l+4>>2]=0;a[E]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}fv(l,0);c[E>>2]=c[G>>2];c[E+4>>2]=c[G+4>>2];c[E+8>>2]=c[G+8>>2];mF(G|0,0,12)|0;fs(F)}else{cS[c[U+40>>2]&127](I,T);I=f;C=c[H>>2]|0;a[I]=C&255;C=C>>8;a[I+1|0]=C&255;C=C>>8;a[I+2|0]=C&255;C=C>>8;a[I+3|0]=C&255;cS[c[(c[P>>2]|0)+28>>2]&127](J,T);I=l;if((a[I]&1)==0){c[l+4>>2]=0;a[I]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}fv(l,0);c[I>>2]=c[K>>2];c[I+4>>2]=c[K+4>>2];c[I+8>>2]=c[K+8>>2];mF(K|0,0,12)|0;fs(J)}J=P;c[g>>2]=cW[c[(c[J>>2]|0)+12>>2]&255](T)|0;c[h>>2]=cW[c[(c[J>>2]|0)+16>>2]&255](T)|0;cS[c[(c[P>>2]|0)+20>>2]&127](L,T);h=j;if((a[h]&1)==0){a[j+1|0]=0;a[h]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}fl(j,0);c[h>>2]=c[M>>2];c[h+4>>2]=c[M+4>>2];c[h+8>>2]=c[M+8>>2];mF(M|0,0,12)|0;fh(L);cS[c[(c[P>>2]|0)+24>>2]&127](N,T);P=k;if((a[P]&1)==0){c[k+4>>2]=0;a[P]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}fv(k,0);c[P>>2]=c[O>>2];c[P+4>>2]=c[O+4>>2];c[P+8>>2]=c[O+8>>2];mF(O|0,0,12)|0;fs(N);S=cW[c[(c[J>>2]|0)+36>>2]&255](T)|0;c[m>>2]=S;i=n;return}}function jM(b,d,e,f,g,h,i,j,k,l,m,n,o,p,q){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;p=p|0;q=q|0;var r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0;c[e>>2]=b;r=i;s=p;t=p+4|0;u=p+8|0;p=o;v=(f&512|0)==0;w=o+4|0;x=o+8|0;o=i;y=(q|0)>0;z=n;A=n+1|0;B=n+8|0;C=n+4|0;n=g;g=0;while(1){L2821:do{switch(a[k+g|0]|0){case 0:{c[d>>2]=c[e>>2];D=n;break};case 1:{c[d>>2]=c[e>>2];E=cT[c[(c[r>>2]|0)+44>>2]&63](i,32)|0;F=c[e>>2]|0;c[e>>2]=F+4;c[F>>2]=E;D=n;break};case 3:{E=a[s]|0;F=E&255;if((F&1|0)==0){G=F>>>1}else{G=c[t>>2]|0}if((G|0)==0){D=n;break L2821}if((E&1)==0){H=t}else{H=c[u>>2]|0}E=c[H>>2]|0;F=c[e>>2]|0;c[e>>2]=F+4;c[F>>2]=E;D=n;break};case 2:{E=a[p]|0;F=E&255;I=(F&1|0)==0;if(I){J=F>>>1}else{J=c[w>>2]|0}if((J|0)==0|v){D=n;break L2821}if((E&1)==0){K=w;L=w;M=w}else{E=c[x>>2]|0;K=E;L=E;M=E}if(I){N=F>>>1}else{N=c[w>>2]|0}F=K+(N<<2)|0;I=c[e>>2]|0;if((L|0)==(F|0)){O=I}else{E=(K+(N-1<<2)+(-M|0)|0)>>>2;P=L;Q=I;while(1){c[Q>>2]=c[P>>2];R=P+4|0;if((R|0)==(F|0)){break}P=R;Q=Q+4|0}O=I+(E+1<<2)|0}c[e>>2]=O;D=n;break};case 4:{Q=c[e>>2]|0;P=j?n+4|0:n;F=P;while(1){if(F>>>0>=h>>>0){break}if(cU[c[(c[o>>2]|0)+12>>2]&63](i,2048,c[F>>2]|0)|0){F=F+4|0}else{break}}if(y){if(F>>>0>P>>>0){E=F;I=q;do{E=E-4|0;R=c[E>>2]|0;S=c[e>>2]|0;c[e>>2]=S+4;c[S>>2]=R;I=I-1|0;T=(I|0)>0;}while(E>>>0>P>>>0&T);if(T){U=I;V=E;W=2351}else{X=0;Y=I;Z=E}}else{U=q;V=F;W=2351}if((W|0)==2351){W=0;X=cT[c[(c[r>>2]|0)+44>>2]&63](i,48)|0;Y=U;Z=V}R=c[e>>2]|0;c[e>>2]=R+4;if((Y|0)>0){S=Y;_=R;while(1){c[_>>2]=X;$=S-1|0;aa=c[e>>2]|0;c[e>>2]=aa+4;if(($|0)>0){S=$;_=aa}else{ab=aa;break}}}else{ab=R}c[ab>>2]=l;ac=Z}else{ac=F}if((ac|0)==(P|0)){_=cT[c[(c[r>>2]|0)+44>>2]&63](i,48)|0;S=c[e>>2]|0;c[e>>2]=S+4;c[S>>2]=_}else{_=a[z]|0;S=_&255;if((S&1|0)==0){ad=S>>>1}else{ad=c[C>>2]|0}if((ad|0)==0){ae=ac;af=0;ag=0;ah=-1}else{if((_&1)==0){ai=A}else{ai=c[B>>2]|0}ae=ac;af=0;ag=0;ah=a[ai]|0}while(1){do{if((af|0)==(ah|0)){_=c[e>>2]|0;c[e>>2]=_+4;c[_>>2]=m;_=ag+1|0;S=a[z]|0;E=S&255;if((E&1|0)==0){aj=E>>>1}else{aj=c[C>>2]|0}if(_>>>0>=aj>>>0){ak=ah;al=_;am=0;break}E=(S&1)==0;if(E){an=A}else{an=c[B>>2]|0}if((a[an+_|0]|0)==127){ak=-1;al=_;am=0;break}if(E){ao=A}else{ao=c[B>>2]|0}ak=a[ao+_|0]|0;al=_;am=0}else{ak=ah;al=ag;am=af}}while(0);_=ae-4|0;E=c[_>>2]|0;S=c[e>>2]|0;c[e>>2]=S+4;c[S>>2]=E;if((_|0)==(P|0)){break}else{ae=_;af=am+1|0;ag=al;ah=ak}}}F=c[e>>2]|0;if((Q|0)==(F|0)){D=P;break L2821}R=F-4|0;if(Q>>>0<R>>>0){ap=Q;aq=R}else{D=P;break L2821}while(1){R=c[ap>>2]|0;c[ap>>2]=c[aq>>2];c[aq>>2]=R;R=ap+4|0;F=aq-4|0;if(R>>>0<F>>>0){ap=R;aq=F}else{D=P;break}}break};default:{D=n}}}while(0);P=g+1|0;if(P>>>0<4>>>0){n=D;g=P}else{break}}g=a[s]|0;s=g&255;D=(s&1|0)==0;if(D){ar=s>>>1}else{ar=c[t>>2]|0}if(ar>>>0>1>>>0){if((g&1)==0){as=t;at=t;au=t}else{g=c[u>>2]|0;as=g;at=g;au=g}if(D){av=s>>>1}else{av=c[t>>2]|0}t=as+(av<<2)|0;s=c[e>>2]|0;D=at+4|0;if((D|0)==(t|0)){aw=s}else{at=((as+(av-2<<2)+(-au|0)|0)>>>2)+1|0;au=s;av=D;while(1){c[au>>2]=c[av>>2];D=av+4|0;if((D|0)==(t|0)){break}else{au=au+4|0;av=D}}aw=s+(at<<2)|0}c[e>>2]=aw}aw=f&176;if((aw|0)==32){c[d>>2]=c[e>>2];return}else if((aw|0)==16){return}else{c[d>>2]=b;return}}function jN(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0;e=i;i=i+64|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=e|0;m=e+16|0;n=e+24|0;o=e+32|0;p=e+40|0;q=e+48|0;r=q;s=i;i=i+12|0;i=i+7&-8;t=s;u=i;i=i+12|0;i=i+7&-8;v=u;w=i;i=i+4|0;i=i+7&-8;x=i;i=i+400|0;y=i;i=i+4|0;i=i+7&-8;z=i;i=i+4|0;i=i+7&-8;A=i;i=i+4|0;i=i+7&-8;fB(m,h);B=m|0;C=c[B>>2]|0;if((c[3924]|0)!=-1){c[l>>2]=15696;c[l+4>>2]=14;c[l+8>>2]=0;fc(15696,l,116)}l=(c[3925]|0)-1|0;D=c[C+8>>2]|0;do{if((c[C+12>>2]|0)-D>>2>>>0>l>>>0){E=c[D+(l<<2)>>2]|0;if((E|0)==0){break}F=E;G=k;H=a[G]|0;I=H&255;if((I&1|0)==0){J=I>>>1}else{J=c[k+4>>2]|0}if((J|0)==0){K=0}else{if((H&1)==0){L=k+4|0}else{L=c[k+8>>2]|0}H=c[L>>2]|0;K=(H|0)==(cT[c[(c[E>>2]|0)+44>>2]&63](F,45)|0)}mF(r|0,0,12)|0;mF(t|0,0,12)|0;mF(v|0,0,12)|0;jL(g,K,m,n,o,p,q,s,u,w);E=x|0;H=a[G]|0;I=H&255;M=(I&1|0)==0;if(M){N=I>>>1}else{N=c[k+4>>2]|0}O=c[w>>2]|0;if((N|0)>(O|0)){if(M){P=I>>>1}else{P=c[k+4>>2]|0}I=d[v]|0;if((I&1|0)==0){Q=I>>>1}else{Q=c[u+4>>2]|0}I=d[t]|0;if((I&1|0)==0){R=I>>>1}else{R=c[s+4>>2]|0}S=(P-O<<1|1)+Q+R|0}else{I=d[v]|0;if((I&1|0)==0){T=I>>>1}else{T=c[u+4>>2]|0}I=d[t]|0;if((I&1|0)==0){U=I>>>1}else{U=c[s+4>>2]|0}S=T+2+U|0}I=S+O|0;do{if(I>>>0>100>>>0){M=mp(I<<2)|0;V=M;if((M|0)!=0){W=V;X=V;Y=H;break}mB();W=V;X=V;Y=a[G]|0}else{W=E;X=0;Y=H}}while(0);if((Y&1)==0){Z=k+4|0;_=k+4|0}else{H=c[k+8>>2]|0;Z=H;_=H}H=Y&255;if((H&1|0)==0){$=H>>>1}else{$=c[k+4>>2]|0}jM(W,y,z,c[h+4>>2]|0,_,Z+($<<2)|0,F,K,n,c[o>>2]|0,c[p>>2]|0,q,s,u,O);c[A>>2]=c[f>>2];hX(b,A,W,c[y>>2]|0,c[z>>2]|0,h,j);if((X|0)==0){fs(u);fs(s);fh(q);aa=c[B>>2]|0;ab=aa|0;ac=eS(ab)|0;i=e;return}mq(X);fs(u);fs(s);fh(q);aa=c[B>>2]|0;ab=aa|0;ac=eS(ab)|0;i=e;return}}while(0);e=cy(4)|0;l4(e);bK(e|0,10072,154)}function jO(a){a=a|0;eQ(a|0);mw(a);return}function jP(a){a=a|0;eQ(a|0);return}function jQ(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;if((a[d]&1)==0){f=d+1|0}else{f=c[d+8>>2]|0}d=cE(f|0,1)|0;return d>>>(((d|0)!=-1|0)>>>0)|0}function jR(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;d=i;i=i+16|0;j=d|0;k=j;mF(k|0,0,12)|0;l=b;m=h;n=a[h]|0;if((n&1)==0){o=m+1|0;p=m+1|0}else{m=c[h+8>>2]|0;o=m;p=m}m=n&255;if((m&1|0)==0){q=m>>>1}else{q=c[h+4>>2]|0}h=o+q|0;do{if(p>>>0<h>>>0){q=p;do{fm(j,a[q]|0);q=q+1|0;}while(q>>>0<h>>>0);q=(e|0)==-1?-1:e<<1;if((a[k]&1)==0){r=q;s=2483;break}t=c[j+8>>2]|0;u=q}else{r=(e|0)==-1?-1:e<<1;s=2483}}while(0);if((s|0)==2483){t=j+1|0;u=r}r=bu(u|0,f|0,g|0,t|0)|0;mF(l|0,0,12)|0;l=mG(r|0)|0;t=r+l|0;if((l|0)>0){v=r}else{fh(j);i=d;return}do{fm(b,a[v]|0);v=v+1|0;}while(v>>>0<t>>>0);fh(j);i=d;return}function jS(a,b){a=a|0;b=b|0;cb(((b|0)==-1?-1:b<<1)|0)|0;return}function jT(a){a=a|0;eQ(a|0);mw(a);return}function jU(a){a=a|0;eQ(a|0);return}function jV(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;if((a[d]&1)==0){f=d+1|0}else{f=c[d+8>>2]|0}d=cE(f|0,1)|0;return d>>>(((d|0)!=-1|0)>>>0)|0}function jW(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0;d=i;i=i+224|0;j=d|0;k=d+8|0;l=d+40|0;m=d+48|0;n=d+56|0;o=d+64|0;p=d+192|0;q=d+200|0;r=d+208|0;s=r;t=i;i=i+8|0;u=i;i=i+8|0;mF(s|0,0,12)|0;v=b;w=t|0;c[t+4>>2]=0;c[t>>2]=5544;x=a[h]|0;if((x&1)==0){y=h+4|0;z=h+4|0}else{A=c[h+8>>2]|0;y=A;z=A}A=x&255;if((A&1|0)==0){B=A>>>1}else{B=c[h+4>>2]|0}h=y+(B<<2)|0;L3054:do{if(z>>>0<h>>>0){B=t;y=k|0;A=k+32|0;x=z;C=5544;while(1){c[m>>2]=x;D=(c_[c[C+12>>2]&31](w,j,x,h,m,y,A,l)|0)==2;E=c[m>>2]|0;if(D|(E|0)==(x|0)){break}if(y>>>0<(c[l>>2]|0)>>>0){D=y;do{fm(r,a[D]|0);D=D+1|0;}while(D>>>0<(c[l>>2]|0)>>>0);F=c[m>>2]|0}else{F=E}if(F>>>0>=h>>>0){break L3054}x=F;C=c[B>>2]|0}B=cy(8)|0;eY(B,1216);bK(B|0,10104,26)}}while(0);eQ(t|0);if((a[s]&1)==0){G=r+1|0}else{G=c[r+8>>2]|0}s=bu(((e|0)==-1?-1:e<<1)|0,f|0,g|0,G|0)|0;mF(v|0,0,12)|0;v=u|0;c[u+4>>2]=0;c[u>>2]=5488;G=mG(s|0)|0;g=s+G|0;if((G|0)<1){H=u|0;eQ(H);fh(r);i=d;return}G=u;f=g;e=o|0;t=o+128|0;o=s;s=5488;while(1){c[q>>2]=o;F=(c_[c[s+16>>2]&31](v,n,o,(f-o|0)>32?o+32|0:g,q,e,t,p)|0)==2;h=c[q>>2]|0;if(F|(h|0)==(o|0)){break}if(e>>>0<(c[p>>2]|0)>>>0){F=e;do{fw(b,c[F>>2]|0);F=F+4|0;}while(F>>>0<(c[p>>2]|0)>>>0);I=c[q>>2]|0}else{I=h}if(I>>>0>=g>>>0){J=2550;break}o=I;s=c[G>>2]|0}if((J|0)==2550){H=u|0;eQ(H);fh(r);i=d;return}d=cy(8)|0;eY(d,1216);bK(d|0,10104,26)}function jX(a,b){a=a|0;b=b|0;cb(((b|0)==-1?-1:b<<1)|0)|0;return}function jY(b){b=b|0;var d=0,e=0,f=0;c[b>>2]=4936;d=b+8|0;e=c[d>>2]|0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);if((e|0)==(c[3568]|0)){f=b|0;eQ(f);return}bs(c[d>>2]|0);f=b|0;eQ(f);return}function jZ(a){a=a|0;a=cy(8)|0;eT(a,2072);c[a>>2]=3872;bK(a|0,10120,38)}function j_(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0;e=i;i=i+448|0;f=e|0;g=e+16|0;h=e+32|0;j=e+48|0;k=e+64|0;l=e+80|0;m=e+96|0;n=e+112|0;o=e+128|0;p=e+144|0;q=e+160|0;r=e+176|0;s=e+192|0;t=e+208|0;u=e+224|0;v=e+240|0;w=e+256|0;x=e+272|0;y=e+288|0;z=e+304|0;A=e+320|0;B=e+336|0;C=e+352|0;D=e+368|0;E=e+384|0;F=e+400|0;G=e+416|0;H=e+432|0;c[b+4>>2]=d-1;c[b>>2]=5192;d=b+8|0;I=b+12|0;a[b+136|0]=1;J=b+24|0;K=J;c[I>>2]=K;c[d>>2]=K;c[b+16>>2]=J+112;J=28;L=K;do{if((L|0)==0){M=0}else{c[L>>2]=0;M=c[I>>2]|0}L=M+4|0;c[I>>2]=L;J=J-1|0;}while((J|0)!=0);ff(b+144|0,2040,1);J=c[d>>2]|0;d=c[I>>2]|0;if((J|0)!=(d|0)){c[I>>2]=d+(~((d-4+(-J|0)|0)>>>2)<<2)}c[3601]=0;c[3600]=4896;if((c[3846]|0)!=-1){c[H>>2]=15384;c[H+4>>2]=14;c[H+8>>2]=0;fc(15384,H,116)}j$(b,14400,(c[3847]|0)-1|0);c[3599]=0;c[3598]=4856;if((c[3844]|0)!=-1){c[G>>2]=15376;c[G+4>>2]=14;c[G+8>>2]=0;fc(15376,G,116)}j$(b,14392,(c[3845]|0)-1|0);c[3651]=0;c[3650]=5304;c[3652]=0;a[14612]=0;c[3652]=c[(br()|0)>>2];if((c[3926]|0)!=-1){c[F>>2]=15704;c[F+4>>2]=14;c[F+8>>2]=0;fc(15704,F,116)}j$(b,14600,(c[3927]|0)-1|0);c[3649]=0;c[3648]=5224;if((c[3924]|0)!=-1){c[E>>2]=15696;c[E+4>>2]=14;c[E+8>>2]=0;fc(15696,E,116)}j$(b,14592,(c[3925]|0)-1|0);c[3603]=0;c[3602]=4992;if((c[3850]|0)!=-1){c[D>>2]=15400;c[D+4>>2]=14;c[D+8>>2]=0;fc(15400,D,116)}j$(b,14408,(c[3851]|0)-1|0);c[837]=0;c[836]=4936;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);c[838]=c[3568];if((c[3848]|0)!=-1){c[C>>2]=15392;c[C+4>>2]=14;c[C+8>>2]=0;fc(15392,C,116)}j$(b,3344,(c[3849]|0)-1|0);c[3605]=0;c[3604]=5048;if((c[3852]|0)!=-1){c[B>>2]=15408;c[B+4>>2]=14;c[B+8>>2]=0;fc(15408,B,116)}j$(b,14416,(c[3853]|0)-1|0);c[3607]=0;c[3606]=5104;if((c[3854]|0)!=-1){c[A>>2]=15416;c[A+4>>2]=14;c[A+8>>2]=0;fc(15416,A,116)}j$(b,14424,(c[3855]|0)-1|0);c[3581]=0;c[3580]=4400;a[14328]=46;a[14329]=44;mF(14332,0,12)|0;if((c[3830]|0)!=-1){c[z>>2]=15320;c[z+4>>2]=14;c[z+8>>2]=0;fc(15320,z,116)}j$(b,14320,(c[3831]|0)-1|0);c[829]=0;c[828]=4352;c[830]=46;c[831]=44;mF(3328,0,12)|0;if((c[3828]|0)!=-1){c[y>>2]=15312;c[y+4>>2]=14;c[y+8>>2]=0;fc(15312,y,116)}j$(b,3312,(c[3829]|0)-1|0);c[3597]=0;c[3596]=4784;if((c[3842]|0)!=-1){c[x>>2]=15368;c[x+4>>2]=14;c[x+8>>2]=0;fc(15368,x,116)}j$(b,14384,(c[3843]|0)-1|0);c[3595]=0;c[3594]=4712;if((c[3840]|0)!=-1){c[w>>2]=15360;c[w+4>>2]=14;c[w+8>>2]=0;fc(15360,w,116)}j$(b,14376,(c[3841]|0)-1|0);c[3593]=0;c[3592]=4648;if((c[3838]|0)!=-1){c[v>>2]=15352;c[v+4>>2]=14;c[v+8>>2]=0;fc(15352,v,116)}j$(b,14368,(c[3839]|0)-1|0);c[3591]=0;c[3590]=4584;if((c[3836]|0)!=-1){c[u>>2]=15344;c[u+4>>2]=14;c[u+8>>2]=0;fc(15344,u,116)}j$(b,14360,(c[3837]|0)-1|0);c[3661]=0;c[3660]=6496;if((c[4046]|0)!=-1){c[t>>2]=16184;c[t+4>>2]=14;c[t+8>>2]=0;fc(16184,t,116)}j$(b,14640,(c[4047]|0)-1|0);c[3659]=0;c[3658]=6432;if((c[4044]|0)!=-1){c[s>>2]=16176;c[s+4>>2]=14;c[s+8>>2]=0;fc(16176,s,116)}j$(b,14632,(c[4045]|0)-1|0);c[3657]=0;c[3656]=6368;if((c[4042]|0)!=-1){c[r>>2]=16168;c[r+4>>2]=14;c[r+8>>2]=0;fc(16168,r,116)}j$(b,14624,(c[4043]|0)-1|0);c[3655]=0;c[3654]=6304;if((c[4040]|0)!=-1){c[q>>2]=16160;c[q+4>>2]=14;c[q+8>>2]=0;fc(16160,q,116)}j$(b,14616,(c[4041]|0)-1|0);c[3579]=0;c[3578]=4056;if((c[3818]|0)!=-1){c[p>>2]=15272;c[p+4>>2]=14;c[p+8>>2]=0;fc(15272,p,116)}j$(b,14312,(c[3819]|0)-1|0);c[3577]=0;c[3576]=4016;if((c[3816]|0)!=-1){c[o>>2]=15264;c[o+4>>2]=14;c[o+8>>2]=0;fc(15264,o,116)}j$(b,14304,(c[3817]|0)-1|0);c[3575]=0;c[3574]=3976;if((c[3814]|0)!=-1){c[n>>2]=15256;c[n+4>>2]=14;c[n+8>>2]=0;fc(15256,n,116)}j$(b,14296,(c[3815]|0)-1|0);c[3573]=0;c[3572]=3936;if((c[3812]|0)!=-1){c[m>>2]=15248;c[m+4>>2]=14;c[m+8>>2]=0;fc(15248,m,116)}j$(b,14288,(c[3813]|0)-1|0);c[825]=0;c[824]=4256;c[826]=4304;if((c[3826]|0)!=-1){c[l>>2]=15304;c[l+4>>2]=14;c[l+8>>2]=0;fc(15304,l,116)}j$(b,3296,(c[3827]|0)-1|0);c[821]=0;c[820]=4160;c[822]=4208;if((c[3824]|0)!=-1){c[k>>2]=15296;c[k+4>>2]=14;c[k+8>>2]=0;fc(15296,k,116)}j$(b,3280,(c[3825]|0)-1|0);c[817]=0;c[816]=5160;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);c[818]=c[3568];c[816]=4128;if((c[3822]|0)!=-1){c[j>>2]=15288;c[j+4>>2]=14;c[j+8>>2]=0;fc(15288,j,116)}j$(b,3264,(c[3823]|0)-1|0);c[813]=0;c[812]=5160;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);c[814]=c[3568];c[812]=4096;if((c[3820]|0)!=-1){c[h>>2]=15280;c[h+4>>2]=14;c[h+8>>2]=0;fc(15280,h,116)}j$(b,3248,(c[3821]|0)-1|0);c[3589]=0;c[3588]=4488;if((c[3834]|0)!=-1){c[g>>2]=15336;c[g+4>>2]=14;c[g+8>>2]=0;fc(15336,g,116)}j$(b,14352,(c[3835]|0)-1|0);c[3587]=0;c[3586]=4448;if((c[3832]|0)!=-1){c[f>>2]=15328;c[f+4>>2]=14;c[f+8>>2]=0;fc(15328,f,116)}j$(b,14344,(c[3833]|0)-1|0);i=e;return}function j$(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;eR(b|0);e=a+8|0;f=a+12|0;a=c[f>>2]|0;g=e|0;h=c[g>>2]|0;i=a-h>>2;do{if(i>>>0>d>>>0){j=h}else{k=d+1|0;if(i>>>0<k>>>0){lM(e,k-i|0);j=c[g>>2]|0;break}if(i>>>0<=k>>>0){j=h;break}l=h+(k<<2)|0;if((l|0)==(a|0)){j=h;break}c[f>>2]=a+(~((a-4+(-l|0)|0)>>>2)<<2);j=h}}while(0);h=c[j+(d<<2)>>2]|0;if((h|0)==0){m=j;n=m+(d<<2)|0;c[n>>2]=b;return}eS(h|0)|0;m=c[g>>2]|0;n=m+(d<<2)|0;c[n>>2]=b;return}function j0(a){a=a|0;j1(a);mw(a);return}function j1(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;c[b>>2]=5192;d=b+12|0;e=c[d>>2]|0;f=b+8|0;g=c[f>>2]|0;if((e|0)!=(g|0)){h=0;i=g;g=e;while(1){e=c[i+(h<<2)>>2]|0;if((e|0)==0){j=g;k=i}else{l=e|0;eS(l)|0;j=c[d>>2]|0;k=c[f>>2]|0}l=h+1|0;if(l>>>0<j-k>>2>>>0){h=l;i=k;g=j}else{break}}}fh(b+144|0);j=c[f>>2]|0;if((j|0)==0){m=b|0;eQ(m);return}f=c[d>>2]|0;if((j|0)!=(f|0)){c[d>>2]=f+(~((f-4+(-j|0)|0)>>>2)<<2)}if((j|0)==(b+24|0)){a[b+136|0]=0;m=b|0;eQ(m);return}else{mw(j);m=b|0;eQ(m);return}}function j2(){var b=0,d=0;if((a[16248]|0)!=0){b=c[3560]|0;return b|0}if((bz(16248)|0)==0){b=c[3560]|0;return b|0}do{if((a[16256]|0)==0){if((bz(16256)|0)==0){break}j_(14432,1);c[3564]=14432;c[3562]=14256}}while(0);d=c[c[3562]>>2]|0;c[3566]=d;eR(d|0);c[3560]=14264;b=c[3560]|0;return b|0}function j3(a){a=a|0;var b=0;b=c[(j2()|0)>>2]|0;c[a>>2]=b;eR(b|0);return}function j4(a,b){a=a|0;b=b|0;var d=0;d=c[b>>2]|0;c[a>>2]=d;eR(d|0);return}function j5(a){a=a|0;eS(c[a>>2]|0)|0;return}function j6(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=i;i=i+16|0;e=d|0;f=c[a>>2]|0;a=b|0;if((c[a>>2]|0)!=-1){c[e>>2]=b;c[e+4>>2]=14;c[e+8>>2]=0;fc(a,e,116)}e=(c[b+4>>2]|0)-1|0;b=c[f+8>>2]|0;if((c[f+12>>2]|0)-b>>2>>>0<=e>>>0){g=0;i=d;return g|0}g=(c[b+(e<<2)>>2]|0)!=0;i=d;return g|0}function j7(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;d=i;i=i+16|0;e=d|0;f=c[a>>2]|0;a=b|0;if((c[a>>2]|0)!=-1){c[e>>2]=b;c[e+4>>2]=14;c[e+8>>2]=0;fc(a,e,116)}e=(c[b+4>>2]|0)-1|0;b=c[f+8>>2]|0;if((c[f+12>>2]|0)-b>>2>>>0<=e>>>0){g=cy(4)|0;h=g;l4(h);bK(g|0,10072,154);return 0}f=c[b+(e<<2)>>2]|0;if((f|0)==0){g=cy(4)|0;h=g;l4(h);bK(g|0,10072,154);return 0}else{i=d;return f|0}return 0}function j8(a){a=a|0;eQ(a|0);mw(a);return}function j9(a){a=a|0;if((a|0)==0){return}cR[c[(c[a>>2]|0)+4>>2]&511](a);return}function ka(a){a=a|0;c[a+4>>2]=(I=c[3856]|0,c[3856]=I+1,I)+1;return}function kb(a){a=a|0;eQ(a|0);mw(a);return}function kc(a,d,e){a=a|0;d=d|0;e=e|0;var f=0;if(e>>>0>=128>>>0){f=0;return f|0}f=(b[(c[(br()|0)>>2]|0)+(e<<1)>>1]&d)<<16>>16!=0;return f|0}function kd(a,d,e,f){a=a|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;if((d|0)==(e|0)){g=d;return g|0}else{h=d;i=f}while(1){f=c[h>>2]|0;if(f>>>0<128>>>0){j=b[(c[(br()|0)>>2]|0)+(f<<1)>>1]|0}else{j=0}b[i>>1]=j;f=h+4|0;if((f|0)==(e|0)){g=e;break}else{h=f;i=i+2|0}}return g|0}function ke(a,d,e,f){a=a|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0;if((e|0)==(f|0)){g=e;return g|0}else{h=e}while(1){e=c[h>>2]|0;if(e>>>0<128>>>0){if((b[(c[(br()|0)>>2]|0)+(e<<1)>>1]&d)<<16>>16!=0){g=h;i=2781;break}}e=h+4|0;if((e|0)==(f|0)){g=f;i=2779;break}else{h=e}}if((i|0)==2779){return g|0}else if((i|0)==2781){return g|0}return 0}function kf(a,d,e,f){a=a|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;a=e;while(1){if((a|0)==(f|0)){g=f;h=2789;break}e=c[a>>2]|0;if(e>>>0>=128>>>0){g=a;h=2791;break}if((b[(c[(br()|0)>>2]|0)+(e<<1)>>1]&d)<<16>>16==0){g=a;h=2790;break}else{a=a+4|0}}if((h|0)==2789){return g|0}else if((h|0)==2791){return g|0}else if((h|0)==2790){return g|0}return 0}function kg(a,b){a=a|0;b=b|0;var d=0;if(b>>>0>=128>>>0){d=b;return d|0}d=c[(c[(cF()|0)>>2]|0)+(b<<2)>>2]|0;return d|0}function kh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;if((b|0)==(d|0)){e=b;return e|0}else{f=b}while(1){b=c[f>>2]|0;if(b>>>0<128>>>0){g=c[(c[(cF()|0)>>2]|0)+(b<<2)>>2]|0}else{g=b}c[f>>2]=g;b=f+4|0;if((b|0)==(d|0)){e=d;break}else{f=b}}return e|0}function ki(a,b){a=a|0;b=b|0;var d=0;if(b>>>0>=128>>>0){d=b;return d|0}d=c[(c[(cG()|0)>>2]|0)+(b<<2)>>2]|0;return d|0}function kj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;if((b|0)==(d|0)){e=b;return e|0}else{f=b}while(1){b=c[f>>2]|0;if(b>>>0<128>>>0){g=c[(c[(cG()|0)>>2]|0)+(b<<2)>>2]|0}else{g=b}c[f>>2]=g;b=f+4|0;if((b|0)==(d|0)){e=d;break}else{f=b}}return e|0}function kk(a,b){a=a|0;b=b|0;return b<<24>>24|0}function kl(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0;if((d|0)==(e|0)){g=d;return g|0}else{h=d;i=f}while(1){c[i>>2]=a[h]|0;f=h+1|0;if((f|0)==(e|0)){g=e;break}else{h=f;i=i+4|0}}return g|0}function km(a,b,c){a=a|0;b=b|0;c=c|0;return(b>>>0<128>>>0?b&255:c)|0}function kn(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0;if((d|0)==(e|0)){h=d;return h|0}b=((e-4+(-d|0)|0)>>>2)+1|0;i=d;j=g;while(1){g=c[i>>2]|0;a[j]=g>>>0<128>>>0?g&255:f;g=i+4|0;if((g|0)==(e|0)){break}else{i=g;j=j+1|0}}h=d+(b<<2)|0;return h|0}function ko(b){b=b|0;var d=0;c[b>>2]=5304;d=c[b+8>>2]|0;do{if((d|0)!=0){if((a[b+12|0]&1)==0){break}mx(d)}}while(0);eQ(b|0);mw(b);return}function kp(b){b=b|0;var d=0;c[b>>2]=5304;d=c[b+8>>2]|0;do{if((d|0)!=0){if((a[b+12|0]&1)==0){break}mx(d)}}while(0);eQ(b|0);return}function kq(a,b){a=a|0;b=b|0;var d=0;if(b<<24>>24<0){d=b;return d|0}d=c[(c[(cF()|0)>>2]|0)+((b&255)<<2)>>2]&255;return d|0}function kr(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;if((d|0)==(e|0)){f=d;return f|0}else{g=d}while(1){d=a[g]|0;if(d<<24>>24<0){h=d}else{h=c[(c[(cF()|0)>>2]|0)+(d<<24>>24<<2)>>2]&255}a[g]=h;d=g+1|0;if((d|0)==(e|0)){f=e;break}else{g=d}}return f|0}function ks(a,b){a=a|0;b=b|0;var d=0;if(b<<24>>24<0){d=b;return d|0}d=c[(c[(cG()|0)>>2]|0)+(b<<24>>24<<2)>>2]&255;return d|0}function kt(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;if((d|0)==(e|0)){f=d;return f|0}else{g=d}while(1){d=a[g]|0;if(d<<24>>24<0){h=d}else{h=c[(c[(cG()|0)>>2]|0)+(d<<24>>24<<2)>>2]&255}a[g]=h;d=g+1|0;if((d|0)==(e|0)){f=e;break}else{g=d}}return f|0}function ku(a,b){a=a|0;b=b|0;return b|0}function kv(b,c,d,e){b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0;if((c|0)==(d|0)){f=c;return f|0}else{g=c;h=e}while(1){a[h]=a[g]|0;e=g+1|0;if((e|0)==(d|0)){f=d;break}else{g=e;h=h+1|0}}return f|0}function kw(a,b,c){a=a|0;b=b|0;c=c|0;return(b<<24>>24<0?c:b)|0}function kx(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0;if((c|0)==(d|0)){g=c;return g|0}else{h=c;i=f}while(1){f=a[h]|0;a[i]=f<<24>>24<0?e:f;f=h+1|0;if((f|0)==(d|0)){g=d;break}else{h=f;i=i+1|0}}return g|0}function ky(a){a=a|0;eQ(a|0);mw(a);return}function kz(a,b,d,e,f,g,h,i){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;c[f>>2]=d;c[i>>2]=g;return 3}function kA(a,b,d,e,f,g,h,i){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;c[f>>2]=d;c[i>>2]=g;return 3}function kB(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;c[f>>2]=d;return 3}function kC(a){a=a|0;return 1}function kD(a){a=a|0;return 1}function kE(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;b=d-c|0;return(b>>>0<e>>>0?b:e)|0}function kF(a){a=a|0;return 1}function kG(a){a=a|0;jY(a);mw(a);return}function kH(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0;l=i;i=i+8|0;m=l|0;n=m;o=i;i=i+4|0;i=i+7&-8;p=e;while(1){if((p|0)==(f|0)){q=f;break}if((c[p>>2]|0)==0){q=p;break}else{p=p+4|0}}c[k>>2]=h;c[g>>2]=e;L3480:do{if((e|0)==(f|0)|(h|0)==(j|0)){r=e}else{p=d;s=j;t=b+8|0;u=o|0;v=h;w=e;x=q;while(1){y=c[p+4>>2]|0;c[m>>2]=c[p>>2];c[m+4>>2]=y;y=cf(c[t>>2]|0)|0;z=lZ(v,g,x-w>>2,s-v|0,d)|0;if((y|0)!=0){cf(y|0)|0}if((z|0)==(-1|0)){A=2913;break}else if((z|0)==0){B=1;A=2949;break}y=(c[k>>2]|0)+z|0;c[k>>2]=y;if((y|0)==(j|0)){A=2946;break}if((x|0)==(f|0)){C=f;D=y;E=c[g>>2]|0}else{y=cf(c[t>>2]|0)|0;z=lY(u,0,d)|0;if((y|0)!=0){cf(y|0)|0}if((z|0)==-1){B=2;A=2951;break}y=c[k>>2]|0;if(z>>>0>(s-y|0)>>>0){B=1;A=2952;break}L3499:do{if((z|0)!=0){F=z;G=u;H=y;while(1){I=a[G]|0;c[k>>2]=H+1;a[H]=I;I=F-1|0;if((I|0)==0){break L3499}F=I;G=G+1|0;H=c[k>>2]|0}}}while(0);y=(c[g>>2]|0)+4|0;c[g>>2]=y;z=y;while(1){if((z|0)==(f|0)){J=f;break}if((c[z>>2]|0)==0){J=z;break}else{z=z+4|0}}C=J;D=c[k>>2]|0;E=y}if((E|0)==(f|0)|(D|0)==(j|0)){r=E;break L3480}else{v=D;w=E;x=C}}if((A|0)==2913){c[k>>2]=v;L3511:do{if((w|0)==(c[g>>2]|0)){K=w}else{x=w;u=v;while(1){s=c[x>>2]|0;p=cf(c[t>>2]|0)|0;z=lY(u,s,n)|0;if((p|0)!=0){cf(p|0)|0}if((z|0)==-1){K=x;break L3511}p=(c[k>>2]|0)+z|0;c[k>>2]=p;z=x+4|0;if((z|0)==(c[g>>2]|0)){K=z;break}else{x=z;u=p}}}}while(0);c[g>>2]=K;B=2;i=l;return B|0}else if((A|0)==2946){r=c[g>>2]|0;break}else if((A|0)==2949){i=l;return B|0}else if((A|0)==2951){i=l;return B|0}else if((A|0)==2952){i=l;return B|0}}}while(0);B=(r|0)!=(f|0)|0;i=l;return B|0}function kI(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0;l=i;i=i+8|0;m=l|0;n=m;o=e;while(1){if((o|0)==(f|0)){p=f;break}if((a[o]|0)==0){p=o;break}else{o=o+1|0}}c[k>>2]=h;c[g>>2]=e;L3532:do{if((e|0)==(f|0)|(h|0)==(j|0)){q=e}else{o=d;r=j;s=b+8|0;t=h;u=e;v=p;while(1){w=c[o+4>>2]|0;c[m>>2]=c[o>>2];c[m+4>>2]=w;x=v;w=cf(c[s>>2]|0)|0;y=lV(t,g,x-u|0,r-t>>2,d)|0;if((w|0)!=0){cf(w|0)|0}if((y|0)==(-1|0)){z=2968;break}else if((y|0)==0){A=2;z=3003;break}w=(c[k>>2]|0)+(y<<2)|0;c[k>>2]=w;if((w|0)==(j|0)){z=3e3;break}y=c[g>>2]|0;if((v|0)==(f|0)){B=f;C=w;D=y}else{E=cf(c[s>>2]|0)|0;F=lU(w,y,1,d)|0;if((E|0)!=0){cf(E|0)|0}if((F|0)!=0){A=2;z=3007;break}c[k>>2]=(c[k>>2]|0)+4;F=(c[g>>2]|0)+1|0;c[g>>2]=F;E=F;while(1){if((E|0)==(f|0)){G=f;break}if((a[E]|0)==0){G=E;break}else{E=E+1|0}}B=G;C=c[k>>2]|0;D=F}if((D|0)==(f|0)|(C|0)==(j|0)){q=D;break L3532}else{t=C;u=D;v=B}}if((z|0)==2968){c[k>>2]=t;L3556:do{if((u|0)==(c[g>>2]|0)){H=u}else{v=t;r=u;while(1){o=cf(c[s>>2]|0)|0;E=lU(v,r,x-r|0,n)|0;if((o|0)!=0){cf(o|0)|0}if((E|0)==0){I=r+1|0}else if((E|0)==(-1|0)){z=2979;break}else if((E|0)==(-2|0)){z=2980;break}else{I=r+E|0}E=(c[k>>2]|0)+4|0;c[k>>2]=E;if((I|0)==(c[g>>2]|0)){H=I;break L3556}else{v=E;r=I}}if((z|0)==2979){c[g>>2]=r;A=2;i=l;return A|0}else if((z|0)==2980){c[g>>2]=r;A=1;i=l;return A|0}}}while(0);c[g>>2]=H;A=(H|0)!=(f|0)|0;i=l;return A|0}else if((z|0)==3e3){q=c[g>>2]|0;break}else if((z|0)==3003){i=l;return A|0}else if((z|0)==3007){i=l;return A|0}}}while(0);A=(q|0)!=(f|0)|0;i=l;return A|0}function kJ(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0;h=i;i=i+8|0;c[g>>2]=e;e=h|0;j=cf(c[b+8>>2]|0)|0;b=lY(e,0,d)|0;if((j|0)!=0){cf(j|0)|0}if((b|0)==(-1|0)|(b|0)==0){k=2;i=h;return k|0}j=b-1|0;b=c[g>>2]|0;if(j>>>0>(f-b|0)>>>0){k=1;i=h;return k|0}if((j|0)==0){k=0;i=h;return k|0}else{l=j;m=e;n=b}while(1){b=a[m]|0;c[g>>2]=n+1;a[n]=b;b=l-1|0;if((b|0)==0){k=0;break}l=b;m=m+1|0;n=c[g>>2]|0}i=h;return k|0}function kK(a){a=a|0;var b=0,d=0,e=0;b=a+8|0;a=cf(c[b>>2]|0)|0;d=lX(0,0,4)|0;if((a|0)!=0){cf(a|0)|0}if((d|0)!=0){e=-1;return e|0}d=c[b>>2]|0;if((d|0)==0){e=1;return e|0}b=cf(d|0)|0;if((b|0)==0){e=0;return e|0}cf(b|0)|0;e=0;return e|0}function kL(a){a=a|0;return 0}function kM(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;if((f|0)==0|(d|0)==(e|0)){g=0;return g|0}h=e;i=a+8|0;a=d;d=0;j=0;while(1){k=cf(c[i>>2]|0)|0;l=lT(a,h-a|0,b)|0;if((k|0)!=0){cf(k|0)|0}if((l|0)==0){m=1;n=a+1|0}else if((l|0)==(-1|0)|(l|0)==(-2|0)){g=d;o=3064;break}else{m=l;n=a+l|0}l=m+d|0;k=j+1|0;if(k>>>0>=f>>>0|(n|0)==(e|0)){g=l;o=3066;break}else{a=n;d=l;j=k}}if((o|0)==3064){return g|0}else if((o|0)==3066){return g|0}return 0}function kN(a){a=a|0;var b=0,d=0;b=c[a+8>>2]|0;do{if((b|0)==0){d=1}else{a=cf(b|0)|0;if((a|0)==0){d=4;break}cf(a|0)|0;d=4}}while(0);return d|0}function kO(a){a=a|0;eQ(a|0);mw(a);return}function kP(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;b=i;i=i+16|0;a=b|0;k=b+8|0;c[a>>2]=d;c[k>>2]=g;l=kQ(d,e,a,g,h,k,1114111,0)|0;c[f>>2]=d+((c[a>>2]|0)-d>>1<<1);c[j>>2]=g+((c[k>>2]|0)-g);i=b;return l|0}function kQ(d,f,g,h,i,j,k,l){d=d|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0;c[g>>2]=d;c[j>>2]=h;do{if((l&2|0)!=0){if((i-h|0)<3){m=1;return m|0}else{c[j>>2]=h+1;a[h]=-17;d=c[j>>2]|0;c[j>>2]=d+1;a[d]=-69;d=c[j>>2]|0;c[j>>2]=d+1;a[d]=-65;break}}}while(0);h=f;l=c[g>>2]|0;if(l>>>0>=f>>>0){m=0;return m|0}d=i;i=l;L3649:while(1){l=b[i>>1]|0;n=l&65535;if(n>>>0>k>>>0){m=2;o=3106;break}do{if((l&65535)>>>0<128>>>0){p=c[j>>2]|0;if((d-p|0)<1){m=1;o=3105;break L3649}c[j>>2]=p+1;a[p]=l&255}else{if((l&65535)>>>0<2048>>>0){p=c[j>>2]|0;if((d-p|0)<2){m=1;o=3103;break L3649}c[j>>2]=p+1;a[p]=(n>>>6|192)&255;p=c[j>>2]|0;c[j>>2]=p+1;a[p]=(n&63|128)&255;break}if((l&65535)>>>0<55296>>>0){p=c[j>>2]|0;if((d-p|0)<3){m=1;o=3107;break L3649}c[j>>2]=p+1;a[p]=(n>>>12|224)&255;p=c[j>>2]|0;c[j>>2]=p+1;a[p]=(n>>>6&63|128)&255;p=c[j>>2]|0;c[j>>2]=p+1;a[p]=(n&63|128)&255;break}if((l&65535)>>>0>=56320>>>0){if((l&65535)>>>0<57344>>>0){m=2;o=3112;break L3649}p=c[j>>2]|0;if((d-p|0)<3){m=1;o=3113;break L3649}c[j>>2]=p+1;a[p]=(n>>>12|224)&255;p=c[j>>2]|0;c[j>>2]=p+1;a[p]=(n>>>6&63|128)&255;p=c[j>>2]|0;c[j>>2]=p+1;a[p]=(n&63|128)&255;break}if((h-i|0)<4){m=1;o=3108;break L3649}p=i+2|0;q=e[p>>1]|0;if((q&64512|0)!=56320){m=2;o=3109;break L3649}if((d-(c[j>>2]|0)|0)<4){m=1;o=3110;break L3649}r=n&960;if(((r<<10)+65536|n<<10&64512|q&1023)>>>0>k>>>0){m=2;o=3111;break L3649}c[g>>2]=p;p=(r>>>6)+1|0;r=c[j>>2]|0;c[j>>2]=r+1;a[r]=(p>>>2|240)&255;r=c[j>>2]|0;c[j>>2]=r+1;a[r]=(n>>>2&15|p<<4&48|128)&255;p=c[j>>2]|0;c[j>>2]=p+1;a[p]=(n<<4&48|q>>>6&15|128)&255;p=c[j>>2]|0;c[j>>2]=p+1;a[p]=(q&63|128)&255}}while(0);n=(c[g>>2]|0)+2|0;c[g>>2]=n;if(n>>>0<f>>>0){i=n}else{m=0;o=3114;break}}if((o|0)==3103){return m|0}else if((o|0)==3105){return m|0}else if((o|0)==3106){return m|0}else if((o|0)==3107){return m|0}else if((o|0)==3108){return m|0}else if((o|0)==3109){return m|0}else if((o|0)==3110){return m|0}else if((o|0)==3111){return m|0}else if((o|0)==3112){return m|0}else if((o|0)==3113){return m|0}else if((o|0)==3114){return m|0}return 0}function kR(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;b=i;i=i+16|0;a=b|0;k=b+8|0;c[a>>2]=d;c[k>>2]=g;l=kS(d,e,a,g,h,k,1114111,0)|0;c[f>>2]=d+((c[a>>2]|0)-d);c[j>>2]=g+((c[k>>2]|0)-g>>1<<1);i=b;return l|0}function kS(e,f,g,h,i,j,k,l){e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;c[g>>2]=e;c[j>>2]=h;h=c[g>>2]|0;do{if((l&4|0)==0){m=h}else{if((f-h|0)<=2){m=h;break}if((a[h]|0)!=-17){m=h;break}if((a[h+1|0]|0)!=-69){m=h;break}if((a[h+2|0]|0)!=-65){m=h;break}e=h+3|0;c[g>>2]=e;m=e}}while(0);L3695:do{if(m>>>0<f>>>0){h=f;l=i;e=c[j>>2]|0;n=m;L3697:while(1){if(e>>>0>=i>>>0){o=n;break L3695}p=a[n]|0;q=p&255;if(q>>>0>k>>>0){r=2;s=3157;break}do{if(p<<24>>24>-1){b[e>>1]=p&255;c[g>>2]=(c[g>>2]|0)+1}else{if((p&255)>>>0<194>>>0){r=2;s=3165;break L3697}if((p&255)>>>0<224>>>0){if((h-n|0)<2){r=1;s=3177;break L3697}t=d[n+1|0]|0;if((t&192|0)!=128){r=2;s=3161;break L3697}u=t&63|q<<6&1984;if(u>>>0>k>>>0){r=2;s=3167;break L3697}b[e>>1]=u&65535;c[g>>2]=(c[g>>2]|0)+2;break}if((p&255)>>>0<240>>>0){if((h-n|0)<3){r=1;s=3172;break L3697}u=a[n+1|0]|0;t=a[n+2|0]|0;if((q|0)==224){if((u&-32)<<24>>24!=-96){r=2;s=3169;break L3697}}else if((q|0)==237){if((u&-32)<<24>>24!=-128){r=2;s=3171;break L3697}}else{if((u&-64)<<24>>24!=-128){r=2;s=3159;break L3697}}v=t&255;if((v&192|0)!=128){r=2;s=3166;break L3697}t=(u&255)<<6&4032|q<<12|v&63;if((t&65535)>>>0>k>>>0){r=2;s=3168;break L3697}b[e>>1]=t&65535;c[g>>2]=(c[g>>2]|0)+3;break}if((p&255)>>>0>=245>>>0){r=2;s=3170;break L3697}if((h-n|0)<4){r=1;s=3176;break L3697}t=a[n+1|0]|0;v=a[n+2|0]|0;u=a[n+3|0]|0;if((q|0)==240){if((t+112&255)>>>0>=48>>>0){r=2;s=3160;break L3697}}else if((q|0)==244){if((t&-16)<<24>>24!=-128){r=2;s=3173;break L3697}}else{if((t&-64)<<24>>24!=-128){r=2;s=3174;break L3697}}w=v&255;if((w&192|0)!=128){r=2;s=3164;break L3697}v=u&255;if((v&192|0)!=128){r=2;s=3163;break L3697}if((l-e|0)<4){r=1;s=3158;break L3697}u=q&7;x=t&255;t=w<<6;y=v&63;if((x<<12&258048|u<<18|t&4032|y)>>>0>k>>>0){r=2;s=3175;break L3697}b[e>>1]=(x<<2&60|w>>>4&3|((x>>>4&3|u<<2)<<6)+16320|55296)&65535;u=(c[j>>2]|0)+2|0;c[j>>2]=u;b[u>>1]=(y|t&960|56320)&65535;c[g>>2]=(c[g>>2]|0)+4}}while(0);q=(c[j>>2]|0)+2|0;c[j>>2]=q;p=c[g>>2]|0;if(p>>>0<f>>>0){e=q;n=p}else{o=p;break L3695}}if((s|0)==3159){return r|0}else if((s|0)==3160){return r|0}else if((s|0)==3161){return r|0}else if((s|0)==3171){return r|0}else if((s|0)==3172){return r|0}else if((s|0)==3173){return r|0}else if((s|0)==3157){return r|0}else if((s|0)==3158){return r|0}else if((s|0)==3174){return r|0}else if((s|0)==3175){return r|0}else if((s|0)==3169){return r|0}else if((s|0)==3170){return r|0}else if((s|0)==3176){return r|0}else if((s|0)==3177){return r|0}else if((s|0)==3163){return r|0}else if((s|0)==3164){return r|0}else if((s|0)==3165){return r|0}else if((s|0)==3166){return r|0}else if((s|0)==3167){return r|0}else if((s|0)==3168){return r|0}}else{o=m}}while(0);r=o>>>0<f>>>0|0;return r|0}function kT(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;c[f>>2]=d;return 3}function kU(a){a=a|0;return 0}function kV(a){a=a|0;return 0}function kW(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return kX(c,d,e,1114111,0)|0}function kX(b,c,e,f,g){b=b|0;c=c|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;do{if((g&4|0)==0){h=b}else{if((c-b|0)<=2){h=b;break}if((a[b]|0)!=-17){h=b;break}if((a[b+1|0]|0)!=-69){h=b;break}h=(a[b+2|0]|0)==-65?b+3|0:b}}while(0);L3768:do{if(h>>>0<c>>>0&(e|0)!=0){g=c;i=0;j=h;L3770:while(1){k=a[j]|0;l=k&255;if(l>>>0>f>>>0){m=j;break L3768}do{if(k<<24>>24>-1){n=j+1|0;o=i}else{if((k&255)>>>0<194>>>0){m=j;break L3768}if((k&255)>>>0<224>>>0){if((g-j|0)<2){m=j;break L3768}p=d[j+1|0]|0;if((p&192|0)!=128){m=j;break L3768}if((p&63|l<<6&1984)>>>0>f>>>0){m=j;break L3768}n=j+2|0;o=i;break}if((k&255)>>>0<240>>>0){q=j;if((g-q|0)<3){m=j;break L3768}p=a[j+1|0]|0;r=a[j+2|0]|0;if((l|0)==224){if((p&-32)<<24>>24!=-96){s=3202;break L3770}}else if((l|0)==237){if((p&-32)<<24>>24!=-128){s=3204;break L3770}}else{if((p&-64)<<24>>24!=-128){s=3206;break L3770}}t=r&255;if((t&192|0)!=128){m=j;break L3768}if(((p&255)<<6&4032|l<<12&61440|t&63)>>>0>f>>>0){m=j;break L3768}n=j+3|0;o=i;break}if((k&255)>>>0>=245>>>0){m=j;break L3768}u=j;if((g-u|0)<4){m=j;break L3768}if((e-i|0)>>>0<2>>>0){m=j;break L3768}t=a[j+1|0]|0;p=a[j+2|0]|0;r=a[j+3|0]|0;if((l|0)==240){if((t+112&255)>>>0>=48>>>0){s=3215;break L3770}}else if((l|0)==244){if((t&-16)<<24>>24!=-128){s=3217;break L3770}}else{if((t&-64)<<24>>24!=-128){s=3219;break L3770}}v=p&255;if((v&192|0)!=128){m=j;break L3768}p=r&255;if((p&192|0)!=128){m=j;break L3768}if(((t&255)<<12&258048|l<<18&1835008|v<<6&4032|p&63)>>>0>f>>>0){m=j;break L3768}n=j+4|0;o=i+1|0}}while(0);l=o+1|0;if(n>>>0<c>>>0&l>>>0<e>>>0){i=l;j=n}else{m=n;break L3768}}if((s|0)==3219){w=u-b|0;return w|0}else if((s|0)==3202){w=q-b|0;return w|0}else if((s|0)==3204){w=q-b|0;return w|0}else if((s|0)==3217){w=u-b|0;return w|0}else if((s|0)==3206){w=q-b|0;return w|0}else if((s|0)==3215){w=u-b|0;return w|0}}else{m=h}}while(0);w=m-b|0;return w|0}function kY(a){a=a|0;return 4}function kZ(a){a=a|0;eQ(a|0);mw(a);return}function k_(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;b=i;i=i+16|0;a=b|0;k=b+8|0;c[a>>2]=d;c[k>>2]=g;l=k$(d,e,a,g,h,k,1114111,0)|0;c[f>>2]=d+((c[a>>2]|0)-d>>2<<2);c[j>>2]=g+((c[k>>2]|0)-g);i=b;return l|0}function k$(b,d,e,f,g,h,i,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0;c[e>>2]=b;c[h>>2]=f;do{if((j&2|0)!=0){if((g-f|0)<3){k=1;return k|0}else{c[h>>2]=f+1;a[f]=-17;b=c[h>>2]|0;c[h>>2]=b+1;a[b]=-69;b=c[h>>2]|0;c[h>>2]=b+1;a[b]=-65;break}}}while(0);f=c[e>>2]|0;if(f>>>0>=d>>>0){k=0;return k|0}j=g;g=f;L3834:while(1){f=c[g>>2]|0;if((f&-2048|0)==55296|f>>>0>i>>>0){k=2;l=3261;break}do{if(f>>>0<128>>>0){b=c[h>>2]|0;if((j-b|0)<1){k=1;l=3260;break L3834}c[h>>2]=b+1;a[b]=f&255}else{if(f>>>0<2048>>>0){b=c[h>>2]|0;if((j-b|0)<2){k=1;l=3257;break L3834}c[h>>2]=b+1;a[b]=(f>>>6|192)&255;b=c[h>>2]|0;c[h>>2]=b+1;a[b]=(f&63|128)&255;break}b=c[h>>2]|0;m=j-b|0;if(f>>>0<65536>>>0){if((m|0)<3){k=1;l=3262;break L3834}c[h>>2]=b+1;a[b]=(f>>>12|224)&255;n=c[h>>2]|0;c[h>>2]=n+1;a[n]=(f>>>6&63|128)&255;n=c[h>>2]|0;c[h>>2]=n+1;a[n]=(f&63|128)&255;break}else{if((m|0)<4){k=1;l=3258;break L3834}c[h>>2]=b+1;a[b]=(f>>>18|240)&255;b=c[h>>2]|0;c[h>>2]=b+1;a[b]=(f>>>12&63|128)&255;b=c[h>>2]|0;c[h>>2]=b+1;a[b]=(f>>>6&63|128)&255;b=c[h>>2]|0;c[h>>2]=b+1;a[b]=(f&63|128)&255;break}}}while(0);f=(c[e>>2]|0)+4|0;c[e>>2]=f;if(f>>>0<d>>>0){g=f}else{k=0;l=3263;break}}if((l|0)==3261){return k|0}else if((l|0)==3260){return k|0}else if((l|0)==3257){return k|0}else if((l|0)==3263){return k|0}else if((l|0)==3262){return k|0}else if((l|0)==3258){return k|0}return 0}function k0(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;b=i;i=i+16|0;a=b|0;k=b+8|0;c[a>>2]=d;c[k>>2]=g;l=k1(d,e,a,g,h,k,1114111,0)|0;c[f>>2]=d+((c[a>>2]|0)-d);c[j>>2]=g+((c[k>>2]|0)-g>>2<<2);i=b;return l|0}function k1(b,e,f,g,h,i,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;c[f>>2]=b;c[i>>2]=g;g=c[f>>2]|0;do{if((k&4|0)==0){l=g}else{if((e-g|0)<=2){l=g;break}if((a[g]|0)!=-17){l=g;break}if((a[g+1|0]|0)!=-69){l=g;break}if((a[g+2|0]|0)!=-65){l=g;break}b=g+3|0;c[f>>2]=b;l=b}}while(0);L3867:do{if(l>>>0<e>>>0){g=e;k=c[i>>2]|0;b=l;L3869:while(1){if(k>>>0>=h>>>0){m=b;break L3867}n=a[b]|0;o=n&255;do{if(n<<24>>24>-1){if(o>>>0>j>>>0){p=2;q=3309;break L3869}c[k>>2]=o;c[f>>2]=(c[f>>2]|0)+1}else{if((n&255)>>>0<194>>>0){p=2;q=3311;break L3869}if((n&255)>>>0<224>>>0){if((g-b|0)<2){p=1;q=3316;break L3869}r=d[b+1|0]|0;if((r&192|0)!=128){p=2;q=3319;break L3869}s=r&63|o<<6&1984;if(s>>>0>j>>>0){p=2;q=3313;break L3869}c[k>>2]=s;c[f>>2]=(c[f>>2]|0)+2;break}if((n&255)>>>0<240>>>0){if((g-b|0)<3){p=1;q=3310;break L3869}s=a[b+1|0]|0;r=a[b+2|0]|0;if((o|0)==237){if((s&-32)<<24>>24!=-128){p=2;q=3306;break L3869}}else if((o|0)==224){if((s&-32)<<24>>24!=-96){p=2;q=3321;break L3869}}else{if((s&-64)<<24>>24!=-128){p=2;q=3315;break L3869}}t=r&255;if((t&192|0)!=128){p=2;q=3320;break L3869}r=(s&255)<<6&4032|o<<12&61440|t&63;if(r>>>0>j>>>0){p=2;q=3322;break L3869}c[k>>2]=r;c[f>>2]=(c[f>>2]|0)+3;break}if((n&255)>>>0>=245>>>0){p=2;q=3305;break L3869}if((g-b|0)<4){p=1;q=3317;break L3869}r=a[b+1|0]|0;t=a[b+2|0]|0;s=a[b+3|0]|0;if((o|0)==240){if((r+112&255)>>>0>=48>>>0){p=2;q=3314;break L3869}}else if((o|0)==244){if((r&-16)<<24>>24!=-128){p=2;q=3323;break L3869}}else{if((r&-64)<<24>>24!=-128){p=2;q=3307;break L3869}}u=t&255;if((u&192|0)!=128){p=2;q=3318;break L3869}t=s&255;if((t&192|0)!=128){p=2;q=3324;break L3869}s=(r&255)<<12&258048|o<<18&1835008|u<<6&4032|t&63;if(s>>>0>j>>>0){p=2;q=3312;break L3869}c[k>>2]=s;c[f>>2]=(c[f>>2]|0)+4}}while(0);o=(c[i>>2]|0)+4|0;c[i>>2]=o;n=c[f>>2]|0;if(n>>>0<e>>>0){k=o;b=n}else{m=n;break L3867}}if((q|0)==3305){return p|0}else if((q|0)==3314){return p|0}else if((q|0)==3315){return p|0}else if((q|0)==3316){return p|0}else if((q|0)==3311){return p|0}else if((q|0)==3312){return p|0}else if((q|0)==3313){return p|0}else if((q|0)==3317){return p|0}else if((q|0)==3318){return p|0}else if((q|0)==3319){return p|0}else if((q|0)==3320){return p|0}else if((q|0)==3321){return p|0}else if((q|0)==3306){return p|0}else if((q|0)==3307){return p|0}else if((q|0)==3322){return p|0}else if((q|0)==3323){return p|0}else if((q|0)==3324){return p|0}else if((q|0)==3309){return p|0}else if((q|0)==3310){return p|0}}else{m=l}}while(0);p=m>>>0<e>>>0|0;return p|0}function k2(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;c[f>>2]=d;return 3}function k3(a){a=a|0;return 0}function k4(a){a=a|0;return 0}function k5(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return k6(c,d,e,1114111,0)|0}function k6(b,c,e,f,g){b=b|0;c=c|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;do{if((g&4|0)==0){h=b}else{if((c-b|0)<=2){h=b;break}if((a[b]|0)!=-17){h=b;break}if((a[b+1|0]|0)!=-69){h=b;break}h=(a[b+2|0]|0)==-65?b+3|0:b}}while(0);L3938:do{if(h>>>0<c>>>0&(e|0)!=0){g=c;i=1;j=h;L3940:while(1){k=a[j]|0;l=k&255;do{if(k<<24>>24>-1){if(l>>>0>f>>>0){m=j;break L3938}n=j+1|0}else{if((k&255)>>>0<194>>>0){m=j;break L3938}if((k&255)>>>0<224>>>0){if((g-j|0)<2){m=j;break L3938}o=d[j+1|0]|0;if((o&192|0)!=128){m=j;break L3938}if((o&63|l<<6&1984)>>>0>f>>>0){m=j;break L3938}n=j+2|0;break}if((k&255)>>>0<240>>>0){p=j;if((g-p|0)<3){m=j;break L3938}o=a[j+1|0]|0;q=a[j+2|0]|0;if((l|0)==224){if((o&-32)<<24>>24!=-96){r=3349;break L3940}}else if((l|0)==237){if((o&-32)<<24>>24!=-128){r=3351;break L3940}}else{if((o&-64)<<24>>24!=-128){r=3353;break L3940}}s=q&255;if((s&192|0)!=128){m=j;break L3938}if(((o&255)<<6&4032|l<<12&61440|s&63)>>>0>f>>>0){m=j;break L3938}n=j+3|0;break}if((k&255)>>>0>=245>>>0){m=j;break L3938}t=j;if((g-t|0)<4){m=j;break L3938}s=a[j+1|0]|0;o=a[j+2|0]|0;q=a[j+3|0]|0;if((l|0)==240){if((s+112&255)>>>0>=48>>>0){r=3361;break L3940}}else if((l|0)==244){if((s&-16)<<24>>24!=-128){r=3363;break L3940}}else{if((s&-64)<<24>>24!=-128){r=3365;break L3940}}u=o&255;if((u&192|0)!=128){m=j;break L3938}o=q&255;if((o&192|0)!=128){m=j;break L3938}if(((s&255)<<12&258048|l<<18&1835008|u<<6&4032|o&63)>>>0>f>>>0){m=j;break L3938}n=j+4|0}}while(0);if(!(n>>>0<c>>>0&i>>>0<e>>>0)){m=n;break L3938}i=i+1|0;j=n}if((r|0)==3363){v=t-b|0;return v|0}else if((r|0)==3349){v=p-b|0;return v|0}else if((r|0)==3351){v=p-b|0;return v|0}else if((r|0)==3353){v=p-b|0;return v|0}else if((r|0)==3365){v=t-b|0;return v|0}else if((r|0)==3361){v=t-b|0;return v|0}}else{m=h}}while(0);v=m-b|0;return v|0}function k7(a){a=a|0;return 4}function k8(a){a=a|0;eQ(a|0);mw(a);return}function k9(a){a=a|0;eQ(a|0);mw(a);return}function la(a){a=a|0;c[a>>2]=4400;fh(a+12|0);eQ(a|0);mw(a);return}function lb(a){a=a|0;c[a>>2]=4400;fh(a+12|0);eQ(a|0);return}function lc(a){a=a|0;c[a>>2]=4352;fh(a+16|0);eQ(a|0);mw(a);return}function ld(a){a=a|0;c[a>>2]=4352;fh(a+16|0);eQ(a|0);return}function le(b){b=b|0;return a[b+8|0]|0}function lf(a){a=a|0;return c[a+8>>2]|0}function lg(b){b=b|0;return a[b+9|0]|0}function lh(a){a=a|0;return c[a+12>>2]|0}function li(a,b){a=a|0;b=b|0;fe(a,b+12|0);return}function lj(a,b){a=a|0;b=b|0;fe(a,b+16|0);return}function lk(a,b){a=a|0;b=b|0;ff(a,1664,4);return}function ll(a,b){a=a|0;b=b|0;fq(a,1640,l$(1640)|0);return}function lm(a,b){a=a|0;b=b|0;ff(a,1632,5);return}function ln(a,b){a=a|0;b=b|0;fq(a,1600,l$(1600)|0);return}function lo(b){b=b|0;var d=0;if((a[16344]|0)!=0){d=c[3686]|0;return d|0}if((bz(16344)|0)==0){d=c[3686]|0;return d|0}do{if((a[16232]|0)==0){if((bz(16232)|0)==0){break}mF(13784,0,168)|0;bf(296,0,t|0)|0}}while(0);fi(13784,2480)|0;fi(13796,2472)|0;fi(13808,2464)|0;fi(13820,2392)|0;fi(13832,2376)|0;fi(13844,2368)|0;fi(13856,2352)|0;fi(13868,2344)|0;fi(13880,2336)|0;fi(13892,2296)|0;fi(13904,2288)|0;fi(13916,2280)|0;fi(13928,2240)|0;fi(13940,2232)|0;c[3686]=13784;d=c[3686]|0;return d|0}function lp(b){b=b|0;var d=0;if((a[16288]|0)!=0){d=c[3664]|0;return d|0}if((bz(16288)|0)==0){d=c[3664]|0;return d|0}do{if((a[16208]|0)==0){if((bz(16208)|0)==0){break}mF(13040,0,168)|0;bf(170,0,t|0)|0}}while(0);ft(13040,2920)|0;ft(13052,2888)|0;ft(13064,2856)|0;ft(13076,2816)|0;ft(13088,2752)|0;ft(13100,2720)|0;ft(13112,2680)|0;ft(13124,2664)|0;ft(13136,2608)|0;ft(13148,2576)|0;ft(13160,2560)|0;ft(13172,2544)|0;ft(13184,2528)|0;ft(13196,2512)|0;c[3664]=13040;d=c[3664]|0;return d|0}function lq(b){b=b|0;var d=0;if((a[16336]|0)!=0){d=c[3684]|0;return d|0}if((bz(16336)|0)==0){d=c[3684]|0;return d|0}do{if((a[16224]|0)==0){if((bz(16224)|0)==0){break}mF(13496,0,288)|0;bf(192,0,t|0)|0}}while(0);fi(13496,392)|0;fi(13508,376)|0;fi(13520,352)|0;fi(13532,344)|0;fi(13544,336)|0;fi(13556,328)|0;fi(13568,320)|0;fi(13580,312)|0;fi(13592,216)|0;fi(13604,208)|0;fi(13616,152)|0;fi(13628,136)|0;fi(13640,120)|0;fi(13652,112)|0;fi(13664,104)|0;fi(13676,96)|0;fi(13688,336)|0;fi(13700,88)|0;fi(13712,80)|0;fi(13724,2992)|0;fi(13736,2984)|0;fi(13748,2976)|0;fi(13760,2968)|0;fi(13772,2952)|0;c[3684]=13496;d=c[3684]|0;return d|0}function lr(b){b=b|0;var d=0;if((a[16280]|0)!=0){d=c[3662]|0;return d|0}if((bz(16280)|0)==0){d=c[3662]|0;return d|0}do{if((a[16200]|0)==0){if((bz(16200)|0)==0){break}mF(12752,0,288)|0;bf(144,0,t|0)|0}}while(0);ft(12752,1040)|0;ft(12764,1e3)|0;ft(12776,976)|0;ft(12788,936)|0;ft(12800,568)|0;ft(12812,912)|0;ft(12824,864)|0;ft(12836,816)|0;ft(12848,776)|0;ft(12860,744)|0;ft(12872,704)|0;ft(12884,664)|0;ft(12896,648)|0;ft(12908,616)|0;ft(12920,600)|0;ft(12932,584)|0;ft(12944,568)|0;ft(12956,536)|0;ft(12968,520)|0;ft(12980,504)|0;ft(12992,488)|0;ft(13004,472)|0;ft(13016,456)|0;ft(13028,416)|0;c[3662]=12752;d=c[3662]|0;return d|0}function ls(b){b=b|0;var d=0;if((a[16352]|0)!=0){d=c[3688]|0;return d|0}if((bz(16352)|0)==0){d=c[3688]|0;return d|0}do{if((a[16240]|0)==0){if((bz(16240)|0)==0){break}mF(13952,0,288)|0;bf(142,0,t|0)|0}}while(0);fi(13952,1080)|0;fi(13964,1072)|0;c[3688]=13952;d=c[3688]|0;return d|0}function lt(b){b=b|0;var d=0;if((a[16296]|0)!=0){d=c[3666]|0;return d|0}if((bz(16296)|0)==0){d=c[3666]|0;return d|0}do{if((a[16216]|0)==0){if((bz(16216)|0)==0){break}mF(13208,0,288)|0;bf(268,0,t|0)|0}}while(0);ft(13208,1128)|0;ft(13220,1112)|0;c[3666]=13208;d=c[3666]|0;return d|0}function lu(b){b=b|0;if((a[16360]|0)!=0){return 14760}if((bz(16360)|0)==0){return 14760}ff(14760,1560,8);bf(288,14760,t|0)|0;return 14760}function lv(b){b=b|0;if((a[16304]|0)!=0){return 14672}if((bz(16304)|0)==0){return 14672}fq(14672,1520,l$(1520)|0);bf(216,14672,t|0)|0;return 14672}function lw(b){b=b|0;if((a[16384]|0)!=0){return 14808}if((bz(16384)|0)==0){return 14808}ff(14808,1504,8);bf(288,14808,t|0)|0;return 14808}function lx(b){b=b|0;if((a[16328]|0)!=0){return 14720}if((bz(16328)|0)==0){return 14720}fq(14720,1448,l$(1448)|0);bf(216,14720,t|0)|0;return 14720}function ly(b){b=b|0;if((a[16376]|0)!=0){return 14792}if((bz(16376)|0)==0){return 14792}ff(14792,1408,20);bf(288,14792,t|0)|0;return 14792}function lz(b){b=b|0;if((a[16320]|0)!=0){return 14704}if((bz(16320)|0)==0){return 14704}fq(14704,1304,l$(1304)|0);bf(216,14704,t|0)|0;return 14704}function lA(b){b=b|0;if((a[16368]|0)!=0){return 14776}if((bz(16368)|0)==0){return 14776}ff(14776,1288,11);bf(288,14776,t|0)|0;return 14776}function lB(b){b=b|0;if((a[16312]|0)!=0){return 14688}if((bz(16312)|0)==0){return 14688}fq(14688,1240,l$(1240)|0);bf(216,14688,t|0)|0;return 14688}function lC(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0.0,j=0,k=0,l=0.0;f=i;i=i+8|0;g=f|0;if((b|0)==(d|0)){c[e>>2]=4;h=0.0;i=f;return+h}j=b8()|0;k=c[j>>2]|0;c[j>>2]=0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);l=+mD(b,g,c[3568]|0);b=c[j>>2]|0;if((b|0)==0){c[j>>2]=k}if((c[g>>2]|0)!=(d|0)){c[e>>2]=4;h=0.0;i=f;return+h}if((b|0)!=34){h=l;i=f;return+h}c[e>>2]=4;h=l;i=f;return+h}function lD(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0.0,j=0,k=0,l=0.0;f=i;i=i+8|0;g=f|0;if((b|0)==(d|0)){c[e>>2]=4;h=0.0;i=f;return+h}j=b8()|0;k=c[j>>2]|0;c[j>>2]=0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);l=+mD(b,g,c[3568]|0);b=c[j>>2]|0;if((b|0)==0){c[j>>2]=k}if((c[g>>2]|0)!=(d|0)){c[e>>2]=4;h=0.0;i=f;return+h}if((b|0)!=34){h=l;i=f;return+h}c[e>>2]=4;h=l;i=f;return+h}function lE(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0.0,j=0,k=0,l=0.0;f=i;i=i+8|0;g=f|0;if((b|0)==(d|0)){c[e>>2]=4;h=0.0;i=f;return+h}j=b8()|0;k=c[j>>2]|0;c[j>>2]=0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);l=+mD(b,g,c[3568]|0);b=c[j>>2]|0;if((b|0)==0){c[j>>2]=k}if((c[g>>2]|0)!=(d|0)){c[e>>2]=4;h=0.0;i=f;return+h}if((b|0)==34){c[e>>2]=4}h=l;i=f;return+h}function lF(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;g=i;i=i+8|0;h=g|0;do{if((b|0)==(d|0)){c[e>>2]=4;j=0;k=0}else{if((a[b]|0)==45){c[e>>2]=4;j=0;k=0;break}l=b8()|0;m=c[l>>2]|0;c[l>>2]=0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);n=aN(b|0,h|0,f|0,c[3568]|0)|0;o=c[l>>2]|0;if((o|0)==0){c[l>>2]=m}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;k=0;break}if((o|0)!=34){j=K;k=n;break}c[e>>2]=4;j=-1;k=-1}}while(0);i=g;return(K=j,k)|0}function lG(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;g=i;i=i+8|0;h=g|0;if((b|0)==(d|0)){c[e>>2]=4;j=0;i=g;return j|0}if((a[b]|0)==45){c[e>>2]=4;j=0;i=g;return j|0}k=b8()|0;l=c[k>>2]|0;c[k>>2]=0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);m=aN(b|0,h|0,f|0,c[3568]|0)|0;f=K;b=c[k>>2]|0;if((b|0)==0){c[k>>2]=l}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;i=g;return j|0}d=0;if((b|0)==34|(f>>>0>d>>>0|f>>>0==d>>>0&m>>>0>-1>>>0)){c[e>>2]=4;j=-1;i=g;return j|0}else{j=m;i=g;return j|0}return 0}function lH(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;g=i;i=i+8|0;h=g|0;if((b|0)==(d|0)){c[e>>2]=4;j=0;i=g;return j|0}if((a[b]|0)==45){c[e>>2]=4;j=0;i=g;return j|0}k=b8()|0;l=c[k>>2]|0;c[k>>2]=0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);m=aN(b|0,h|0,f|0,c[3568]|0)|0;f=K;b=c[k>>2]|0;if((b|0)==0){c[k>>2]=l}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;i=g;return j|0}d=0;if((b|0)==34|(f>>>0>d>>>0|f>>>0==d>>>0&m>>>0>-1>>>0)){c[e>>2]=4;j=-1;i=g;return j|0}else{j=m;i=g;return j|0}return 0}function lI(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;g=i;i=i+8|0;h=g|0;if((b|0)==(d|0)){c[e>>2]=4;j=0;i=g;return j|0}if((a[b]|0)==45){c[e>>2]=4;j=0;i=g;return j|0}k=b8()|0;l=c[k>>2]|0;c[k>>2]=0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);m=aN(b|0,h|0,f|0,c[3568]|0)|0;f=K;b=c[k>>2]|0;if((b|0)==0){c[k>>2]=l}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;i=g;return j|0}d=0;if((b|0)==34|(f>>>0>d>>>0|f>>>0==d>>>0&m>>>0>65535>>>0)){c[e>>2]=4;j=-1;i=g;return j|0}else{j=m&65535;i=g;return j|0}return 0}function lJ(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0;g=i;i=i+8|0;h=g|0;if((b|0)==(d|0)){c[e>>2]=4;j=0;k=0;i=g;return(K=j,k)|0}l=b8()|0;m=c[l>>2]|0;c[l>>2]=0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);n=cq(b|0,h|0,f|0,c[3568]|0)|0;f=K;b=c[l>>2]|0;if((b|0)==0){c[l>>2]=m}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;k=0;i=g;return(K=j,k)|0}if((b|0)!=34){j=f;k=n;i=g;return(K=j,k)|0}c[e>>2]=4;e=0;b=(f|0)>(e|0)|(f|0)==(e|0)&n>>>0>0>>>0;j=b?2147483647:-2147483648;k=b?-1:0;i=g;return(K=j,k)|0}function lK(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;g=i;i=i+8|0;h=g|0;if((b|0)==(d|0)){c[e>>2]=4;j=0;i=g;return j|0}k=b8()|0;l=c[k>>2]|0;c[k>>2]=0;do{if((a[16264]|0)==0){if((bz(16264)|0)==0){break}c[3568]=a0(2147483647,2040,0)|0}}while(0);m=cq(b|0,h|0,f|0,c[3568]|0)|0;f=K;b=c[k>>2]|0;if((b|0)==0){c[k>>2]=l}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;i=g;return j|0}d=-1;h=0;if((b|0)==34|((f|0)<(d|0)|(f|0)==(d|0)&m>>>0<-2147483648>>>0)|((f|0)>(h|0)|(f|0)==(h|0)&m>>>0>2147483647>>>0)){c[e>>2]=4;e=0;j=(f|0)>(e|0)|(f|0)==(e|0)&m>>>0>0>>>0?2147483647:-2147483648;i=g;return j|0}else{j=m;i=g;return j|0}return 0}function lL(a){a=a|0;var b=0,d=0,e=0,f=0;b=a+4|0;d=(c[a>>2]|0)+(c[b+4>>2]|0)|0;a=d;e=c[b>>2]|0;if((e&1|0)==0){f=e;cR[f&511](a);return}else{f=c[(c[d>>2]|0)+(e-1)>>2]|0;cR[f&511](a);return}}function lM(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;e=b+8|0;f=b+4|0;g=c[f>>2]|0;h=c[e>>2]|0;i=g;if(h-i>>2>>>0>=d>>>0){j=d;k=g;do{if((k|0)==0){l=0}else{c[k>>2]=0;l=c[f>>2]|0}k=l+4|0;c[f>>2]=k;j=j-1|0;}while((j|0)!=0);return}j=b+16|0;k=b|0;l=c[k>>2]|0;g=i-l>>2;i=g+d|0;if(i>>>0>1073741823>>>0){jZ(0)}m=h-l|0;do{if(m>>2>>>0>536870910>>>0){n=1073741823;o=3809}else{l=m>>1;h=l>>>0<i>>>0?i:l;if((h|0)==0){p=0;q=0;break}l=b+128|0;if(!((a[l]&1)==0&h>>>0<29>>>0)){n=h;o=3809;break}a[l]=1;p=j;q=h}}while(0);if((o|0)==3809){p=mu(n<<2)|0;q=n}n=d;d=p+(g<<2)|0;do{if((d|0)==0){r=0}else{c[d>>2]=0;r=d}d=r+4|0;n=n-1|0;}while((n|0)!=0);n=p+(q<<2)|0;q=c[k>>2]|0;r=(c[f>>2]|0)-q|0;o=p+(g-(r>>2)<<2)|0;g=o;p=q;mE(g|0,p|0,r)|0;c[k>>2]=o;c[f>>2]=d;c[e>>2]=n;if((q|0)==0){return}if((q|0)==(j|0)){a[b+128|0]=0;return}else{mw(p);return}}function lN(a){a=a|0;fs(13484);fs(13472);fs(13460);fs(13448);fs(13436);fs(13424);fs(13412);fs(13400);fs(13388);fs(13376);fs(13364);fs(13352);fs(13340);fs(13328);fs(13316);fs(13304);fs(13292);fs(13280);fs(13268);fs(13256);fs(13244);fs(13232);fs(13220);fs(13208);return}function lO(a){a=a|0;fh(14228);fh(14216);fh(14204);fh(14192);fh(14180);fh(14168);fh(14156);fh(14144);fh(14132);fh(14120);fh(14108);fh(14096);fh(14084);fh(14072);fh(14060);fh(14048);fh(14036);fh(14024);fh(14012);fh(14e3);fh(13988);fh(13976);fh(13964);fh(13952);return}function lP(a){a=a|0;fs(13028);fs(13016);fs(13004);fs(12992);fs(12980);fs(12968);fs(12956);fs(12944);fs(12932);fs(12920);fs(12908);fs(12896);fs(12884);fs(12872);fs(12860);fs(12848);fs(12836);fs(12824);fs(12812);fs(12800);fs(12788);fs(12776);fs(12764);fs(12752);return}function lQ(a){a=a|0;fh(13772);fh(13760);fh(13748);fh(13736);fh(13724);fh(13712);fh(13700);fh(13688);fh(13676);fh(13664);fh(13652);fh(13640);fh(13628);fh(13616);fh(13604);fh(13592);fh(13580);fh(13568);fh(13556);fh(13544);fh(13532);fh(13520);fh(13508);fh(13496);return}function lR(a){a=a|0;fs(13196);fs(13184);fs(13172);fs(13160);fs(13148);fs(13136);fs(13124);fs(13112);fs(13100);fs(13088);fs(13076);fs(13064);fs(13052);fs(13040);return}function lS(a){a=a|0;fh(13940);fh(13928);fh(13916);fh(13904);fh(13892);fh(13880);fh(13868);fh(13856);fh(13844);fh(13832);fh(13820);fh(13808);fh(13796);fh(13784);return}function lT(a,b,c){a=a|0;b=b|0;c=c|0;return lU(0,a,b,(c|0)!=0?c:12264)|0}function lU(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0;g=i;i=i+8|0;h=g|0;c[h>>2]=b;j=((f|0)==0?12256:f)|0;f=c[j>>2]|0;L4487:do{if((d|0)==0){if((f|0)==0){k=0}else{break}i=g;return k|0}else{if((b|0)==0){l=h;c[h>>2]=l;m=l}else{m=b}if((e|0)==0){k=-2;i=g;return k|0}do{if((f|0)==0){l=a[d]|0;n=l&255;if(l<<24>>24>-1){c[m>>2]=n;k=l<<24>>24!=0|0;i=g;return k|0}else{l=n-194|0;if(l>>>0>50>>>0){break L4487}o=d+1|0;p=c[r+(l<<2)>>2]|0;q=e-1|0;break}}else{o=d;p=f;q=e}}while(0);L4505:do{if((q|0)==0){s=p}else{l=a[o]|0;n=(l&255)>>>3;if((n-16|n+(p>>26))>>>0>7>>>0){break L4487}else{t=o;u=p;v=q;w=l}while(1){t=t+1|0;u=(w&255)-128|u<<6;v=v-1|0;if((u|0)>=0){break}if((v|0)==0){s=u;break L4505}w=a[t]|0;if(((w&255)-128|0)>>>0>63>>>0){break L4487}}c[j>>2]=0;c[m>>2]=u;k=e-v|0;i=g;return k|0}}while(0);c[j>>2]=s;k=-2;i=g;return k|0}}while(0);c[j>>2]=0;c[(b8()|0)>>2]=84;k=-1;i=g;return k|0}function lV(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0;g=i;i=i+1032|0;h=g|0;j=g+1024|0;k=c[b>>2]|0;c[j>>2]=k;l=(a|0)!=0;m=l?e:256;e=l?a:h|0;L4518:do{if((k|0)==0|(m|0)==0){n=0;o=d;p=m;q=e;r=k}else{a=h|0;s=m;t=d;u=0;v=e;w=k;while(1){x=t>>>2;y=x>>>0>=s>>>0;if(!(y|t>>>0>131>>>0)){n=u;o=t;p=s;q=v;r=w;break L4518}z=y?s:x;A=t-z|0;x=lW(v,j,z,f)|0;if((x|0)==-1){break}if((v|0)==(a|0)){B=a;C=s}else{B=v+(x<<2)|0;C=s-x|0}z=x+u|0;x=c[j>>2]|0;if((x|0)==0|(C|0)==0){n=z;o=A;p=C;q=B;r=x;break L4518}else{s=C;t=A;u=z;v=B;w=x}}n=-1;o=A;p=0;q=v;r=c[j>>2]|0}}while(0);L4529:do{if((r|0)==0){D=n}else{if((p|0)==0|(o|0)==0){D=n;break}else{E=p;F=o;G=n;H=q;I=r}while(1){J=lU(H,I,F,f)|0;if((J+2|0)>>>0<3>>>0){break}A=(c[j>>2]|0)+J|0;c[j>>2]=A;B=E-1|0;C=G+1|0;if((B|0)==0|(F|0)==(J|0)){D=C;break L4529}else{E=B;F=F-J|0;G=C;H=H+4|0;I=A}}if((J|0)==0){c[j>>2]=0;D=G;break}else if((J|0)==(-1|0)){D=-1;break}else{c[f>>2]=0;D=G;break}}}while(0);if(!l){i=g;return D|0}c[b>>2]=c[j>>2];i=g;return D|0}function lW(b,e,f,g){b=b|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0;h=c[e>>2]|0;do{if((g|0)==0){i=3879}else{j=g|0;k=c[j>>2]|0;if((k|0)==0){i=3879;break}if((b|0)==0){l=k;m=h;n=f;i=3890;break}c[j>>2]=0;o=k;p=h;q=b;s=f;i=3910}}while(0);if((i|0)==3879){if((b|0)==0){t=h;u=f;i=3881}else{v=h;w=b;x=f;i=3880}}L4550:while(1){if((i|0)==3881){i=0;h=a[t]|0;do{if(((h&255)-1|0)>>>0<127>>>0){if((t&3|0)!=0){y=t;z=u;A=h;break}g=c[t>>2]|0;if(((g-16843009|g)&-2139062144|0)==0){B=u;C=t}else{y=t;z=u;A=g&255;break}do{C=C+4|0;B=B-4|0;D=c[C>>2]|0;}while(((D-16843009|D)&-2139062144|0)==0);y=C;z=B;A=D&255}else{y=t;z=u;A=h}}while(0);h=A&255;if((h-1|0)>>>0<127>>>0){t=y+1|0;u=z-1|0;i=3881;continue}g=h-194|0;if(g>>>0>50>>>0){E=z;F=b;G=y;i=3921;break}l=c[r+(g<<2)>>2]|0;m=y+1|0;n=z;i=3890;continue}else if((i|0)==3880){i=0;if((x|0)==0){H=f;i=3928;break}else{I=x;J=w;K=v}while(1){g=a[K]|0;do{if(((g&255)-1|0)>>>0<127>>>0){if((K&3|0)==0&I>>>0>3>>>0){L=I;M=J;N=K}else{O=K;P=J;Q=I;R=g;break}while(1){S=c[N>>2]|0;if(((S-16843009|S)&-2139062144|0)!=0){i=3904;break}c[M>>2]=S&255;c[M+4>>2]=d[N+1|0]|0;c[M+8>>2]=d[N+2|0]|0;T=N+4|0;U=M+16|0;c[M+12>>2]=d[N+3|0]|0;V=L-4|0;if(V>>>0>3>>>0){L=V;M=U;N=T}else{i=3905;break}}if((i|0)==3905){i=0;O=T;P=U;Q=V;R=a[T]|0;break}else if((i|0)==3904){i=0;O=N;P=M;Q=L;R=S&255;break}}else{O=K;P=J;Q=I;R=g}}while(0);W=R&255;if((W-1|0)>>>0>=127>>>0){break}c[P>>2]=W;g=Q-1|0;if((g|0)==0){H=f;i=3931;break L4550}else{I=g;J=P+4|0;K=O+1|0}}g=W-194|0;if(g>>>0>50>>>0){E=Q;F=P;G=O;i=3921;break}o=c[r+(g<<2)>>2]|0;p=O+1|0;q=P;s=Q;i=3910;continue}else if((i|0)==3910){i=0;g=d[p]|0;h=g>>>3;if((h-16|h+(o>>26))>>>0>7>>>0){i=3911;break}h=p+1|0;X=g-128|o<<6;do{if((X|0)<0){g=(d[h]|0)-128|0;if(g>>>0>63>>>0){i=3914;break L4550}k=p+2|0;Y=g|X<<6;if((Y|0)>=0){Z=Y;_=k;break}g=(d[k]|0)-128|0;if(g>>>0>63>>>0){i=3917;break L4550}Z=g|Y<<6;_=p+3|0}else{Z=X;_=h}}while(0);c[q>>2]=Z;v=_;w=q+4|0;x=s-1|0;i=3880;continue}else if((i|0)==3890){i=0;h=(d[m]|0)>>>3;if((h-16|h+(l>>26))>>>0>7>>>0){i=3891;break}h=m+1|0;do{if((l&33554432|0)==0){$=h}else{if(((d[h]|0)-128|0)>>>0>63>>>0){i=3894;break L4550}g=m+2|0;if((l&524288|0)==0){$=g;break}if(((d[g]|0)-128|0)>>>0>63>>>0){i=3897;break L4550}$=m+3|0}}while(0);t=$;u=n-1|0;i=3881;continue}}if((i|0)==3928){return H|0}else if((i|0)==3917){aa=Y;ab=p-1|0;ac=q;ad=s;i=3920}else if((i|0)==3931){return H|0}else if((i|0)==3914){aa=X;ab=p-1|0;ac=q;ad=s;i=3920}else if((i|0)==3894){aa=l;ab=m-1|0;ac=b;ad=n;i=3920}else if((i|0)==3897){aa=l;ab=m-1|0;ac=b;ad=n;i=3920}else if((i|0)==3891){aa=l;ab=m-1|0;ac=b;ad=n;i=3920}else if((i|0)==3911){aa=o;ab=p-1|0;ac=q;ad=s;i=3920}if((i|0)==3920){if((aa|0)==0){E=ad;F=ac;G=ab;i=3921}else{ae=ac;af=ab}}do{if((i|0)==3921){if((a[G]|0)!=0){ae=F;af=G;break}if((F|0)!=0){c[F>>2]=0;c[e>>2]=0}H=f-E|0;return H|0}}while(0);c[(b8()|0)>>2]=84;if((ae|0)==0){H=-1;return H|0}c[e>>2]=af;H=-1;return H|0}function lX(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0;g=i;i=i+8|0;h=g|0;c[h>>2]=b;if((e|0)==0){j=0;i=g;return j|0}do{if((f|0)!=0){if((b|0)==0){k=h;c[h>>2]=k;l=k}else{l=b}k=a[e]|0;m=k&255;if(k<<24>>24>-1){c[l>>2]=m;j=k<<24>>24!=0|0;i=g;return j|0}k=m-194|0;if(k>>>0>50>>>0){break}m=e+1|0;n=c[r+(k<<2)>>2]|0;if(f>>>0<4>>>0){if((n&-2147483648>>>(((f*6|0)-6|0)>>>0)|0)!=0){break}}k=d[m]|0;m=k>>>3;if((m-16|m+(n>>26))>>>0>7>>>0){break}m=k-128|n<<6;if((m|0)>=0){c[l>>2]=m;j=2;i=g;return j|0}n=(d[e+2|0]|0)-128|0;if(n>>>0>63>>>0){break}k=n|m<<6;if((k|0)>=0){c[l>>2]=k;j=3;i=g;return j|0}m=(d[e+3|0]|0)-128|0;if(m>>>0>63>>>0){break}c[l>>2]=m|k<<6;j=4;i=g;return j|0}}while(0);c[(b8()|0)>>2]=84;j=-1;i=g;return j|0}function lY(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;if((b|0)==0){f=1;return f|0}if(d>>>0<128>>>0){a[b]=d&255;f=1;return f|0}if(d>>>0<2048>>>0){a[b]=(d>>>6|192)&255;a[b+1|0]=(d&63|128)&255;f=2;return f|0}if(d>>>0<55296>>>0|(d-57344|0)>>>0<8192>>>0){a[b]=(d>>>12|224)&255;a[b+1|0]=(d>>>6&63|128)&255;a[b+2|0]=(d&63|128)&255;f=3;return f|0}if((d-65536|0)>>>0<1048576>>>0){a[b]=(d>>>18|240)&255;a[b+1|0]=(d>>>12&63|128)&255;a[b+2|0]=(d>>>6&63|128)&255;a[b+3|0]=(d&63|128)&255;f=4;return f|0}else{c[(b8()|0)>>2]=84;f=-1;return f|0}return 0}function lZ(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;f=i;i=i+264|0;g=f|0;h=f+256|0;j=c[b>>2]|0;c[h>>2]=j;k=(a|0)!=0;l=k?e:256;e=k?a:g|0;L4671:do{if((j|0)==0|(l|0)==0){m=0;n=d;o=l;p=e;q=j}else{a=g|0;r=l;s=d;t=0;u=e;v=j;while(1){w=s>>>0>=r>>>0;if(!(w|s>>>0>32>>>0)){m=t;n=s;o=r;p=u;q=v;break L4671}x=w?r:s;y=s-x|0;w=l_(u,h,x,0)|0;if((w|0)==-1){break}if((u|0)==(a|0)){z=a;A=r}else{z=u+w|0;A=r-w|0}x=w+t|0;w=c[h>>2]|0;if((w|0)==0|(A|0)==0){m=x;n=y;o=A;p=z;q=w;break L4671}else{r=A;s=y;t=x;u=z;v=w}}m=-1;n=y;o=0;p=u;q=c[h>>2]|0}}while(0);L4682:do{if((q|0)==0){B=m}else{if((o|0)==0|(n|0)==0){B=m;break}else{C=o;D=n;E=m;F=p;G=q}while(1){H=lY(F,c[G>>2]|0,0)|0;if((H+1|0)>>>0<2>>>0){break}y=(c[h>>2]|0)+4|0;c[h>>2]=y;z=D-1|0;A=E+1|0;if((C|0)==(H|0)|(z|0)==0){B=A;break L4682}else{C=C-H|0;D=z;E=A;F=F+H|0;G=y}}if((H|0)!=0){B=-1;break}c[h>>2]=0;B=E}}while(0);if(!k){i=f;return B|0}c[b>>2]=c[h>>2];i=f;return B|0}function l_(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;f=i;i=i+8|0;g=f|0;if((b|0)==0){h=c[d>>2]|0;j=g|0;k=c[h>>2]|0;if((k|0)==0){l=0;i=f;return l|0}else{m=0;n=h;o=k}while(1){if(o>>>0>127>>>0){k=lY(j,o,0)|0;if((k|0)==-1){l=-1;p=4023;break}else{q=k}}else{q=1}k=q+m|0;h=n+4|0;r=c[h>>2]|0;if((r|0)==0){l=k;p=4022;break}else{m=k;n=h;o=r}}if((p|0)==4022){i=f;return l|0}else if((p|0)==4023){i=f;return l|0}}L4708:do{if(e>>>0>3>>>0){o=e;n=b;m=c[d>>2]|0;while(1){q=c[m>>2]|0;if((q|0)==0){s=o;t=n;break L4708}if(q>>>0>127>>>0){j=lY(n,q,0)|0;if((j|0)==-1){l=-1;break}u=n+j|0;v=o-j|0;w=m}else{a[n]=q&255;u=n+1|0;v=o-1|0;w=c[d>>2]|0}q=w+4|0;c[d>>2]=q;if(v>>>0>3>>>0){o=v;n=u;m=q}else{s=v;t=u;break L4708}}i=f;return l|0}else{s=e;t=b}}while(0);L4720:do{if((s|0)==0){x=0}else{b=g|0;u=s;v=t;w=c[d>>2]|0;while(1){m=c[w>>2]|0;if((m|0)==0){p=4017;break}if(m>>>0>127>>>0){n=lY(b,m,0)|0;if((n|0)==-1){l=-1;p=4021;break}if(n>>>0>u>>>0){p=4013;break}o=c[w>>2]|0;lY(v,o,0)|0;y=v+n|0;z=u-n|0;A=w}else{a[v]=m&255;y=v+1|0;z=u-1|0;A=c[d>>2]|0}m=A+4|0;c[d>>2]=m;if((z|0)==0){x=0;break L4720}else{u=z;v=y;w=m}}if((p|0)==4021){i=f;return l|0}else if((p|0)==4013){l=e-u|0;i=f;return l|0}else if((p|0)==4017){a[v]=0;x=u;break}}}while(0);c[d>>2]=0;l=e-x|0;i=f;return l|0}function l$(a){a=a|0;var b=0;b=a;while(1){if((c[b>>2]|0)==0){break}else{b=b+4|0}}return b-a>>2|0}function l0(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;if((d|0)==0){return a|0}else{e=b;f=d;g=a}while(1){d=f-1|0;c[g>>2]=c[e>>2];if((d|0)==0){break}else{e=e+4|0;f=d;g=g+4|0}}return a|0}function l1(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=(d|0)==0;if(a-b>>2>>>0<d>>>0){if(e){return a|0}else{f=d}do{f=f-1|0;c[a+(f<<2)>>2]=c[b+(f<<2)>>2];}while((f|0)!=0);return a|0}else{if(e){return a|0}else{g=b;h=d;i=a}while(1){d=h-1|0;c[i>>2]=c[g>>2];if((d|0)==0){break}else{g=g+4|0;h=d;i=i+4|0}}return a|0}return 0}function l2(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;if((d|0)==0){return a|0}else{e=d;f=a}while(1){d=e-1|0;c[f>>2]=b;if((d|0)==0){break}else{e=d;f=f+4|0}}return a|0}function l3(a){a=a|0;return}function l4(a){a=a|0;c[a>>2]=3776;return}function l5(a){a=a|0;mw(a);return}function l6(a){a=a|0;return}function l7(a){a=a|0;return 1160}function l8(a){a=a|0;l3(a|0);return}function l9(a){a=a|0;return}function ma(a){a=a|0;return}function mb(a){a=a|0;l3(a|0);mw(a);return}function mc(a){a=a|0;l3(a|0);mw(a);return}function md(a){a=a|0;l3(a|0);mw(a);return}function me(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+56|0;f=e|0;if((a|0)==(b|0)){g=1;i=e;return g|0}if((b|0)==0){g=0;i=e;return g|0}h=mi(b,11712,11696,-1)|0;b=h;if((h|0)==0){g=0;i=e;return g|0}j=f;mF(j|0,0,56)|0;c[f>>2]=b;c[f+8>>2]=a;c[f+12>>2]=-1;c[f+48>>2]=1;c4[c[(c[h>>2]|0)+28>>2]&31](b,f,c[d>>2]|0,1);if((c[f+24>>2]|0)!=1){g=0;i=e;return g|0}c[d>>2]=c[f+16>>2];g=1;i=e;return g|0}function mf(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0;if((c[d+8>>2]|0)!=(b|0)){return}b=d+16|0;g=c[b>>2]|0;if((g|0)==0){c[b>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1;return}if((g|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1;c[d+24>>2]=2;a[d+54|0]=1;return}e=d+24|0;if((c[e>>2]|0)!=2){return}c[e>>2]=f;return}function mg(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0;if((b|0)!=(c[d+8>>2]|0)){g=c[b+8>>2]|0;c4[c[(c[g>>2]|0)+28>>2]&31](g,d,e,f);return}g=d+16|0;b=c[g>>2]|0;if((b|0)==0){c[g>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1;return}if((b|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1;c[d+24>>2]=2;a[d+54|0]=1;return}e=d+24|0;if((c[e>>2]|0)!=2){return}c[e>>2]=f;return}function mh(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0;if((b|0)==(c[d+8>>2]|0)){g=d+16|0;h=c[g>>2]|0;if((h|0)==0){c[g>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1;return}if((h|0)!=(e|0)){h=d+36|0;c[h>>2]=(c[h>>2]|0)+1;c[d+24>>2]=2;a[d+54|0]=1;return}h=d+24|0;if((c[h>>2]|0)!=2){return}c[h>>2]=f;return}h=c[b+12>>2]|0;g=b+16+(h<<3)|0;i=c[b+20>>2]|0;j=i>>8;if((i&1|0)==0){k=j}else{k=c[(c[e>>2]|0)+j>>2]|0}j=c[b+16>>2]|0;c4[c[(c[j>>2]|0)+28>>2]&31](j,d,e+k|0,(i&2|0)!=0?f:2);if((h|0)<=1){return}h=d+54|0;i=e;k=b+24|0;while(1){b=c[k+4>>2]|0;j=b>>8;if((b&1|0)==0){l=j}else{l=c[(c[i>>2]|0)+j>>2]|0}j=c[k>>2]|0;c4[c[(c[j>>2]|0)+28>>2]&31](j,d,e+l|0,(b&2|0)!=0?f:2);if((a[h]&1)!=0){m=4117;break}b=k+8|0;if(b>>>0<g>>>0){k=b}else{m=4115;break}}if((m|0)==4115){return}else if((m|0)==4117){return}}function mi(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;f=i;i=i+56|0;g=f|0;h=c[a>>2]|0;j=a+(c[h-8>>2]|0)|0;k=c[h-4>>2]|0;h=k;c[g>>2]=d;c[g+4>>2]=a;c[g+8>>2]=b;c[g+12>>2]=e;e=g+16|0;b=g+20|0;a=g+24|0;l=g+28|0;m=g+32|0;n=g+40|0;o=(k|0)==(d|0);d=e;mF(d|0,0,39)|0;if(o){c[g+48>>2]=1;c1[c[(c[k>>2]|0)+20>>2]&63](h,g,j,j,1,0);i=f;return((c[a>>2]|0)==1?j:0)|0}cP[c[(c[k>>2]|0)+24>>2]&7](h,g,j,1,0);j=c[g+36>>2]|0;if((j|0)==0){if((c[n>>2]|0)!=1){p=0;i=f;return p|0}if((c[l>>2]|0)!=1){p=0;i=f;return p|0}p=(c[m>>2]|0)==1?c[b>>2]|0:0;i=f;return p|0}else if((j|0)==1){do{if((c[a>>2]|0)!=1){if((c[n>>2]|0)!=0){p=0;i=f;return p|0}if((c[l>>2]|0)!=1){p=0;i=f;return p|0}if((c[m>>2]|0)==1){break}else{p=0}i=f;return p|0}}while(0);p=c[e>>2]|0;i=f;return p|0}else{p=0;i=f;return p|0}return 0}function mj(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;h=b|0;if((h|0)==(c[d+8>>2]|0)){if((c[d+4>>2]|0)!=(e|0)){return}i=d+28|0;if((c[i>>2]|0)==1){return}c[i>>2]=f;return}if((h|0)==(c[d>>2]|0)){do{if((c[d+16>>2]|0)!=(e|0)){h=d+20|0;if((c[h>>2]|0)==(e|0)){break}c[d+32>>2]=f;i=d+44|0;if((c[i>>2]|0)==4){return}j=c[b+12>>2]|0;k=b+16+(j<<3)|0;L4902:do{if((j|0)>0){l=d+52|0;m=d+53|0;n=d+54|0;o=b+8|0;p=d+24|0;q=e;r=0;s=b+16|0;t=0;L4904:while(1){a[l]=0;a[m]=0;u=c[s+4>>2]|0;v=u>>8;if((u&1|0)==0){w=v}else{w=c[(c[q>>2]|0)+v>>2]|0}v=c[s>>2]|0;c1[c[(c[v>>2]|0)+20>>2]&63](v,d,e,e+w|0,2-(u>>>1&1)|0,g);if((a[n]&1)!=0){x=t;y=r;break}do{if((a[m]&1)==0){z=t;A=r}else{if((a[l]&1)==0){if((c[o>>2]&1|0)==0){x=1;y=r;break L4904}else{z=1;A=r;break}}if((c[p>>2]|0)==1){B=4168;break L4902}if((c[o>>2]&2|0)==0){B=4168;break L4902}else{z=1;A=1}}}while(0);u=s+8|0;if(u>>>0<k>>>0){r=A;s=u;t=z}else{x=z;y=A;break}}if(y){C=x;B=4167}else{D=x;B=4164}}else{D=0;B=4164}}while(0);do{if((B|0)==4164){c[h>>2]=e;k=d+40|0;c[k>>2]=(c[k>>2]|0)+1;if((c[d+36>>2]|0)!=1){C=D;B=4167;break}if((c[d+24>>2]|0)!=2){C=D;B=4167;break}a[d+54|0]=1;if(D){B=4168}else{B=4169}}}while(0);if((B|0)==4167){if(C){B=4168}else{B=4169}}if((B|0)==4168){c[i>>2]=3;return}else if((B|0)==4169){c[i>>2]=4;return}}}while(0);if((f|0)!=1){return}c[d+32>>2]=1;return}C=c[b+12>>2]|0;D=b+16+(C<<3)|0;x=c[b+20>>2]|0;y=x>>8;if((x&1|0)==0){E=y}else{E=c[(c[e>>2]|0)+y>>2]|0}y=c[b+16>>2]|0;cP[c[(c[y>>2]|0)+24>>2]&7](y,d,e+E|0,(x&2|0)!=0?f:2,g);x=b+24|0;if((C|0)<=1){return}C=c[b+8>>2]|0;do{if((C&2|0)==0){b=d+36|0;if((c[b>>2]|0)==1){break}if((C&1|0)==0){E=d+54|0;y=e;A=x;while(1){if((a[E]&1)!=0){B=4197;break}if((c[b>>2]|0)==1){B=4202;break}z=c[A+4>>2]|0;w=z>>8;if((z&1|0)==0){F=w}else{F=c[(c[y>>2]|0)+w>>2]|0}w=c[A>>2]|0;cP[c[(c[w>>2]|0)+24>>2]&7](w,d,e+F|0,(z&2|0)!=0?f:2,g);z=A+8|0;if(z>>>0<D>>>0){A=z}else{B=4209;break}}if((B|0)==4197){return}else if((B|0)==4202){return}else if((B|0)==4209){return}}A=d+24|0;y=d+54|0;E=e;i=x;while(1){if((a[y]&1)!=0){B=4205;break}if((c[b>>2]|0)==1){if((c[A>>2]|0)==1){B=4208;break}}z=c[i+4>>2]|0;w=z>>8;if((z&1|0)==0){G=w}else{G=c[(c[E>>2]|0)+w>>2]|0}w=c[i>>2]|0;cP[c[(c[w>>2]|0)+24>>2]&7](w,d,e+G|0,(z&2|0)!=0?f:2,g);z=i+8|0;if(z>>>0<D>>>0){i=z}else{B=4203;break}}if((B|0)==4203){return}else if((B|0)==4205){return}else if((B|0)==4208){return}}}while(0);G=d+54|0;F=e;C=x;while(1){if((a[G]&1)!=0){B=4198;break}x=c[C+4>>2]|0;i=x>>8;if((x&1|0)==0){H=i}else{H=c[(c[F>>2]|0)+i>>2]|0}i=c[C>>2]|0;cP[c[(c[i>>2]|0)+24>>2]&7](i,d,e+H|0,(x&2|0)!=0?f:2,g);x=C+8|0;if(x>>>0<D>>>0){C=x}else{B=4199;break}}if((B|0)==4198){return}else if((B|0)==4199){return}}function mk(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0;h=b|0;if((h|0)==(c[d+8>>2]|0)){if((c[d+4>>2]|0)!=(e|0)){return}i=d+28|0;if((c[i>>2]|0)==1){return}c[i>>2]=f;return}if((h|0)!=(c[d>>2]|0)){h=c[b+8>>2]|0;cP[c[(c[h>>2]|0)+24>>2]&7](h,d,e,f,g);return}do{if((c[d+16>>2]|0)!=(e|0)){h=d+20|0;if((c[h>>2]|0)==(e|0)){break}c[d+32>>2]=f;i=d+44|0;if((c[i>>2]|0)==4){return}j=d+52|0;a[j]=0;k=d+53|0;a[k]=0;l=c[b+8>>2]|0;c1[c[(c[l>>2]|0)+20>>2]&63](l,d,e,e,1,g);if((a[k]&1)==0){m=0;n=4224}else{if((a[j]&1)==0){m=1;n=4224}}L5004:do{if((n|0)==4224){c[h>>2]=e;j=d+40|0;c[j>>2]=(c[j>>2]|0)+1;do{if((c[d+36>>2]|0)==1){if((c[d+24>>2]|0)!=2){n=4227;break}a[d+54|0]=1;if(m){break L5004}}else{n=4227}}while(0);if((n|0)==4227){if(m){break}}c[i>>2]=4;return}}while(0);c[i>>2]=3;return}}while(0);if((f|0)!=1){return}c[d+32>>2]=1;return}function ml(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;if((c[d+8>>2]|0)==(b|0)){if((c[d+4>>2]|0)!=(e|0)){return}g=d+28|0;if((c[g>>2]|0)==1){return}c[g>>2]=f;return}if((c[d>>2]|0)!=(b|0)){return}do{if((c[d+16>>2]|0)!=(e|0)){b=d+20|0;if((c[b>>2]|0)==(e|0)){break}c[d+32>>2]=f;c[b>>2]=e;b=d+40|0;c[b>>2]=(c[b>>2]|0)+1;do{if((c[d+36>>2]|0)==1){if((c[d+24>>2]|0)!=2){break}a[d+54|0]=1}}while(0);c[d+44>>2]=4;return}}while(0);if((f|0)!=1){return}c[d+32>>2]=1;return}function mm(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;if((b|0)!=(c[d+8>>2]|0)){i=d+52|0;j=a[i]&1;k=d+53|0;l=a[k]&1;m=c[b+12>>2]|0;n=b+16+(m<<3)|0;a[i]=0;a[k]=0;o=c[b+20>>2]|0;p=o>>8;if((o&1|0)==0){q=p}else{q=c[(c[f>>2]|0)+p>>2]|0}p=c[b+16>>2]|0;c1[c[(c[p>>2]|0)+20>>2]&63](p,d,e,f+q|0,(o&2|0)!=0?g:2,h);L5053:do{if((m|0)>1){o=d+24|0;q=b+8|0;p=d+54|0;r=f;s=b+24|0;do{if((a[p]&1)!=0){break L5053}do{if((a[i]&1)==0){if((a[k]&1)==0){break}if((c[q>>2]&1|0)==0){break L5053}}else{if((c[o>>2]|0)==1){break L5053}if((c[q>>2]&2|0)==0){break L5053}}}while(0);a[i]=0;a[k]=0;t=c[s+4>>2]|0;u=t>>8;if((t&1|0)==0){v=u}else{v=c[(c[r>>2]|0)+u>>2]|0}u=c[s>>2]|0;c1[c[(c[u>>2]|0)+20>>2]&63](u,d,e,f+v|0,(t&2|0)!=0?g:2,h);s=s+8|0;}while(s>>>0<n>>>0)}}while(0);a[i]=j;a[k]=l;return}a[d+53|0]=1;if((c[d+4>>2]|0)!=(f|0)){return}a[d+52|0]=1;f=d+16|0;l=c[f>>2]|0;if((l|0)==0){c[f>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((c[d+48>>2]|0)==1&(g|0)==1)){return}a[d+54|0]=1;return}if((l|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1;a[d+54|0]=1;return}e=d+24|0;l=c[e>>2]|0;if((l|0)==2){c[e>>2]=g;w=g}else{w=l}if(!((c[d+48>>2]|0)==1&(w|0)==1)){return}a[d+54|0]=1;return}function mn(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0;if((b|0)!=(c[d+8>>2]|0)){i=c[b+8>>2]|0;c1[c[(c[i>>2]|0)+20>>2]&63](i,d,e,f,g,h);return}a[d+53|0]=1;if((c[d+4>>2]|0)!=(f|0)){return}a[d+52|0]=1;f=d+16|0;h=c[f>>2]|0;if((h|0)==0){c[f>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((c[d+48>>2]|0)==1&(g|0)==1)){return}a[d+54|0]=1;return}if((h|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1;a[d+54|0]=1;return}e=d+24|0;h=c[e>>2]|0;if((h|0)==2){c[e>>2]=g;j=g}else{j=h}if(!((c[d+48>>2]|0)==1&(j|0)==1)){return}a[d+54|0]=1;return}function mo(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0;if((c[d+8>>2]|0)!=(b|0)){return}a[d+53|0]=1;if((c[d+4>>2]|0)!=(f|0)){return}a[d+52|0]=1;f=d+16|0;b=c[f>>2]|0;if((b|0)==0){c[f>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((c[d+48>>2]|0)==1&(g|0)==1)){return}a[d+54|0]=1;return}if((b|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1;a[d+54|0]=1;return}e=d+24|0;b=c[e>>2]|0;if((b|0)==2){c[e>>2]=g;i=g}else{i=b}if(!((c[d+48>>2]|0)==1&(i|0)==1)){return}a[d+54|0]=1;return}function mp(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0,ax=0,ay=0,az=0,aA=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0;do{if(a>>>0<245>>>0){if(a>>>0<11>>>0){b=16}else{b=a+11&-8}d=b>>>3;e=c[3070]|0;f=e>>>(d>>>0);if((f&3|0)!=0){g=(f&1^1)+d|0;h=g<<1;i=12320+(h<<2)|0;j=12320+(h+2<<2)|0;h=c[j>>2]|0;k=h+8|0;l=c[k>>2]|0;do{if((i|0)==(l|0)){c[3070]=e&~(1<<g)}else{if(l>>>0<(c[3074]|0)>>>0){co();return 0}m=l+12|0;if((c[m>>2]|0)==(h|0)){c[m>>2]=i;c[j>>2]=l;break}else{co();return 0}}}while(0);l=g<<3;c[h+4>>2]=l|3;j=h+(l|4)|0;c[j>>2]=c[j>>2]|1;n=k;return n|0}if(b>>>0<=(c[3072]|0)>>>0){o=b;break}if((f|0)!=0){j=2<<d;l=f<<d&(j|-j);j=(l&-l)-1|0;l=j>>>12&16;i=j>>>(l>>>0);j=i>>>5&8;m=i>>>(j>>>0);i=m>>>2&4;p=m>>>(i>>>0);m=p>>>1&2;q=p>>>(m>>>0);p=q>>>1&1;r=(j|l|i|m|p)+(q>>>(p>>>0))|0;p=r<<1;q=12320+(p<<2)|0;m=12320+(p+2<<2)|0;p=c[m>>2]|0;i=p+8|0;l=c[i>>2]|0;do{if((q|0)==(l|0)){c[3070]=e&~(1<<r)}else{if(l>>>0<(c[3074]|0)>>>0){co();return 0}j=l+12|0;if((c[j>>2]|0)==(p|0)){c[j>>2]=q;c[m>>2]=l;break}else{co();return 0}}}while(0);l=r<<3;m=l-b|0;c[p+4>>2]=b|3;q=p;e=q+b|0;c[q+(b|4)>>2]=m|1;c[q+l>>2]=m;l=c[3072]|0;if((l|0)!=0){q=c[3075]|0;d=l>>>3;l=d<<1;f=12320+(l<<2)|0;k=c[3070]|0;h=1<<d;do{if((k&h|0)==0){c[3070]=k|h;s=f;t=12320+(l+2<<2)|0}else{d=12320+(l+2<<2)|0;g=c[d>>2]|0;if(g>>>0>=(c[3074]|0)>>>0){s=g;t=d;break}co();return 0}}while(0);c[t>>2]=q;c[s+12>>2]=q;c[q+8>>2]=s;c[q+12>>2]=f}c[3072]=m;c[3075]=e;n=i;return n|0}l=c[3071]|0;if((l|0)==0){o=b;break}h=(l&-l)-1|0;l=h>>>12&16;k=h>>>(l>>>0);h=k>>>5&8;p=k>>>(h>>>0);k=p>>>2&4;r=p>>>(k>>>0);p=r>>>1&2;d=r>>>(p>>>0);r=d>>>1&1;g=c[12584+((h|l|k|p|r)+(d>>>(r>>>0))<<2)>>2]|0;r=g;d=g;p=(c[g+4>>2]&-8)-b|0;while(1){g=c[r+16>>2]|0;if((g|0)==0){k=c[r+20>>2]|0;if((k|0)==0){break}else{u=k}}else{u=g}g=(c[u+4>>2]&-8)-b|0;k=g>>>0<p>>>0;r=u;d=k?u:d;p=k?g:p}r=d;i=c[3074]|0;if(r>>>0<i>>>0){co();return 0}e=r+b|0;m=e;if(r>>>0>=e>>>0){co();return 0}e=c[d+24>>2]|0;f=c[d+12>>2]|0;do{if((f|0)==(d|0)){q=d+20|0;g=c[q>>2]|0;if((g|0)==0){k=d+16|0;l=c[k>>2]|0;if((l|0)==0){v=0;break}else{w=l;x=k}}else{w=g;x=q}while(1){q=w+20|0;g=c[q>>2]|0;if((g|0)!=0){w=g;x=q;continue}q=w+16|0;g=c[q>>2]|0;if((g|0)==0){break}else{w=g;x=q}}if(x>>>0<i>>>0){co();return 0}else{c[x>>2]=0;v=w;break}}else{q=c[d+8>>2]|0;if(q>>>0<i>>>0){co();return 0}g=q+12|0;if((c[g>>2]|0)!=(d|0)){co();return 0}k=f+8|0;if((c[k>>2]|0)==(d|0)){c[g>>2]=f;c[k>>2]=q;v=f;break}else{co();return 0}}}while(0);L5220:do{if((e|0)!=0){f=d+28|0;i=12584+(c[f>>2]<<2)|0;do{if((d|0)==(c[i>>2]|0)){c[i>>2]=v;if((v|0)!=0){break}c[3071]=c[3071]&~(1<<c[f>>2]);break L5220}else{if(e>>>0<(c[3074]|0)>>>0){co();return 0}q=e+16|0;if((c[q>>2]|0)==(d|0)){c[q>>2]=v}else{c[e+20>>2]=v}if((v|0)==0){break L5220}}}while(0);if(v>>>0<(c[3074]|0)>>>0){co();return 0}c[v+24>>2]=e;f=c[d+16>>2]|0;do{if((f|0)!=0){if(f>>>0<(c[3074]|0)>>>0){co();return 0}else{c[v+16>>2]=f;c[f+24>>2]=v;break}}}while(0);f=c[d+20>>2]|0;if((f|0)==0){break}if(f>>>0<(c[3074]|0)>>>0){co();return 0}else{c[v+20>>2]=f;c[f+24>>2]=v;break}}}while(0);if(p>>>0<16>>>0){e=p+b|0;c[d+4>>2]=e|3;f=r+(e+4)|0;c[f>>2]=c[f>>2]|1}else{c[d+4>>2]=b|3;c[r+(b|4)>>2]=p|1;c[r+(p+b)>>2]=p;f=c[3072]|0;if((f|0)!=0){e=c[3075]|0;i=f>>>3;f=i<<1;q=12320+(f<<2)|0;k=c[3070]|0;g=1<<i;do{if((k&g|0)==0){c[3070]=k|g;y=q;z=12320+(f+2<<2)|0}else{i=12320+(f+2<<2)|0;l=c[i>>2]|0;if(l>>>0>=(c[3074]|0)>>>0){y=l;z=i;break}co();return 0}}while(0);c[z>>2]=e;c[y+12>>2]=e;c[e+8>>2]=y;c[e+12>>2]=q}c[3072]=p;c[3075]=m}f=d+8|0;if((f|0)==0){o=b;break}else{n=f}return n|0}else{if(a>>>0>4294967231>>>0){o=-1;break}f=a+11|0;g=f&-8;k=c[3071]|0;if((k|0)==0){o=g;break}r=-g|0;i=f>>>8;do{if((i|0)==0){A=0}else{if(g>>>0>16777215>>>0){A=31;break}f=(i+1048320|0)>>>16&8;l=i<<f;h=(l+520192|0)>>>16&4;j=l<<h;l=(j+245760|0)>>>16&2;B=14-(h|f|l)+(j<<l>>>15)|0;A=g>>>((B+7|0)>>>0)&1|B<<1}}while(0);i=c[12584+(A<<2)>>2]|0;L5268:do{if((i|0)==0){C=0;D=r;E=0}else{if((A|0)==31){F=0}else{F=25-(A>>>1)|0}d=0;m=r;p=i;q=g<<F;e=0;while(1){B=c[p+4>>2]&-8;l=B-g|0;if(l>>>0<m>>>0){if((B|0)==(g|0)){C=p;D=l;E=p;break L5268}else{G=p;H=l}}else{G=d;H=m}l=c[p+20>>2]|0;B=c[p+16+(q>>>31<<2)>>2]|0;j=(l|0)==0|(l|0)==(B|0)?e:l;if((B|0)==0){C=G;D=H;E=j;break}else{d=G;m=H;p=B;q=q<<1;e=j}}}}while(0);if((E|0)==0&(C|0)==0){i=2<<A;r=k&(i|-i);if((r|0)==0){o=g;break}i=(r&-r)-1|0;r=i>>>12&16;e=i>>>(r>>>0);i=e>>>5&8;q=e>>>(i>>>0);e=q>>>2&4;p=q>>>(e>>>0);q=p>>>1&2;m=p>>>(q>>>0);p=m>>>1&1;I=c[12584+((i|r|e|q|p)+(m>>>(p>>>0))<<2)>>2]|0}else{I=E}if((I|0)==0){J=D;K=C}else{p=I;m=D;q=C;while(1){e=(c[p+4>>2]&-8)-g|0;r=e>>>0<m>>>0;i=r?e:m;e=r?p:q;r=c[p+16>>2]|0;if((r|0)!=0){p=r;m=i;q=e;continue}r=c[p+20>>2]|0;if((r|0)==0){J=i;K=e;break}else{p=r;m=i;q=e}}}if((K|0)==0){o=g;break}if(J>>>0>=((c[3072]|0)-g|0)>>>0){o=g;break}q=K;m=c[3074]|0;if(q>>>0<m>>>0){co();return 0}p=q+g|0;k=p;if(q>>>0>=p>>>0){co();return 0}e=c[K+24>>2]|0;i=c[K+12>>2]|0;do{if((i|0)==(K|0)){r=K+20|0;d=c[r>>2]|0;if((d|0)==0){j=K+16|0;B=c[j>>2]|0;if((B|0)==0){L=0;break}else{M=B;N=j}}else{M=d;N=r}while(1){r=M+20|0;d=c[r>>2]|0;if((d|0)!=0){M=d;N=r;continue}r=M+16|0;d=c[r>>2]|0;if((d|0)==0){break}else{M=d;N=r}}if(N>>>0<m>>>0){co();return 0}else{c[N>>2]=0;L=M;break}}else{r=c[K+8>>2]|0;if(r>>>0<m>>>0){co();return 0}d=r+12|0;if((c[d>>2]|0)!=(K|0)){co();return 0}j=i+8|0;if((c[j>>2]|0)==(K|0)){c[d>>2]=i;c[j>>2]=r;L=i;break}else{co();return 0}}}while(0);L5318:do{if((e|0)!=0){i=K+28|0;m=12584+(c[i>>2]<<2)|0;do{if((K|0)==(c[m>>2]|0)){c[m>>2]=L;if((L|0)!=0){break}c[3071]=c[3071]&~(1<<c[i>>2]);break L5318}else{if(e>>>0<(c[3074]|0)>>>0){co();return 0}r=e+16|0;if((c[r>>2]|0)==(K|0)){c[r>>2]=L}else{c[e+20>>2]=L}if((L|0)==0){break L5318}}}while(0);if(L>>>0<(c[3074]|0)>>>0){co();return 0}c[L+24>>2]=e;i=c[K+16>>2]|0;do{if((i|0)!=0){if(i>>>0<(c[3074]|0)>>>0){co();return 0}else{c[L+16>>2]=i;c[i+24>>2]=L;break}}}while(0);i=c[K+20>>2]|0;if((i|0)==0){break}if(i>>>0<(c[3074]|0)>>>0){co();return 0}else{c[L+20>>2]=i;c[i+24>>2]=L;break}}}while(0);do{if(J>>>0<16>>>0){e=J+g|0;c[K+4>>2]=e|3;i=q+(e+4)|0;c[i>>2]=c[i>>2]|1}else{c[K+4>>2]=g|3;c[q+(g|4)>>2]=J|1;c[q+(J+g)>>2]=J;i=J>>>3;if(J>>>0<256>>>0){e=i<<1;m=12320+(e<<2)|0;r=c[3070]|0;j=1<<i;do{if((r&j|0)==0){c[3070]=r|j;O=m;P=12320+(e+2<<2)|0}else{i=12320+(e+2<<2)|0;d=c[i>>2]|0;if(d>>>0>=(c[3074]|0)>>>0){O=d;P=i;break}co();return 0}}while(0);c[P>>2]=k;c[O+12>>2]=k;c[q+(g+8)>>2]=O;c[q+(g+12)>>2]=m;break}e=p;j=J>>>8;do{if((j|0)==0){Q=0}else{if(J>>>0>16777215>>>0){Q=31;break}r=(j+1048320|0)>>>16&8;i=j<<r;d=(i+520192|0)>>>16&4;B=i<<d;i=(B+245760|0)>>>16&2;l=14-(d|r|i)+(B<<i>>>15)|0;Q=J>>>((l+7|0)>>>0)&1|l<<1}}while(0);j=12584+(Q<<2)|0;c[q+(g+28)>>2]=Q;c[q+(g+20)>>2]=0;c[q+(g+16)>>2]=0;m=c[3071]|0;l=1<<Q;if((m&l|0)==0){c[3071]=m|l;c[j>>2]=e;c[q+(g+24)>>2]=j;c[q+(g+12)>>2]=e;c[q+(g+8)>>2]=e;break}if((Q|0)==31){R=0}else{R=25-(Q>>>1)|0}l=J<<R;m=c[j>>2]|0;while(1){if((c[m+4>>2]&-8|0)==(J|0)){break}S=m+16+(l>>>31<<2)|0;j=c[S>>2]|0;if((j|0)==0){T=4484;break}else{l=l<<1;m=j}}if((T|0)==4484){if(S>>>0<(c[3074]|0)>>>0){co();return 0}else{c[S>>2]=e;c[q+(g+24)>>2]=m;c[q+(g+12)>>2]=e;c[q+(g+8)>>2]=e;break}}l=m+8|0;j=c[l>>2]|0;i=c[3074]|0;if(m>>>0<i>>>0){co();return 0}if(j>>>0<i>>>0){co();return 0}else{c[j+12>>2]=e;c[l>>2]=e;c[q+(g+8)>>2]=j;c[q+(g+12)>>2]=m;c[q+(g+24)>>2]=0;break}}}while(0);q=K+8|0;if((q|0)==0){o=g;break}else{n=q}return n|0}}while(0);K=c[3072]|0;if(o>>>0<=K>>>0){S=K-o|0;J=c[3075]|0;if(S>>>0>15>>>0){R=J;c[3075]=R+o;c[3072]=S;c[R+(o+4)>>2]=S|1;c[R+K>>2]=S;c[J+4>>2]=o|3}else{c[3072]=0;c[3075]=0;c[J+4>>2]=K|3;S=J+(K+4)|0;c[S>>2]=c[S>>2]|1}n=J+8|0;return n|0}J=c[3073]|0;if(o>>>0<J>>>0){S=J-o|0;c[3073]=S;J=c[3076]|0;K=J;c[3076]=K+o;c[K+(o+4)>>2]=S|1;c[J+4>>2]=o|3;n=J+8|0;return n|0}do{if((c[3058]|0)==0){J=aH(30)|0;if((J-1&J|0)==0){c[3060]=J;c[3059]=J;c[3061]=-1;c[3062]=-1;c[3063]=0;c[3181]=0;c[3058]=(cN(0)|0)&-16^1431655768;break}else{co();return 0}}}while(0);J=o+48|0;S=c[3060]|0;K=o+47|0;R=S+K|0;Q=-S|0;S=R&Q;if(S>>>0<=o>>>0){n=0;return n|0}O=c[3180]|0;do{if((O|0)!=0){P=c[3178]|0;L=P+S|0;if(L>>>0<=P>>>0|L>>>0>O>>>0){n=0}else{break}return n|0}}while(0);L5410:do{if((c[3181]&4|0)==0){O=c[3076]|0;L5412:do{if((O|0)==0){T=4514}else{L=O;P=12728;while(1){U=P|0;M=c[U>>2]|0;if(M>>>0<=L>>>0){V=P+4|0;if((M+(c[V>>2]|0)|0)>>>0>L>>>0){break}}M=c[P+8>>2]|0;if((M|0)==0){T=4514;break L5412}else{P=M}}if((P|0)==0){T=4514;break}L=R-(c[3073]|0)&Q;if(L>>>0>=2147483647>>>0){W=0;break}m=b7(L|0)|0;e=(m|0)==((c[U>>2]|0)+(c[V>>2]|0)|0);X=e?m:-1;Y=e?L:0;Z=m;_=L;T=4523}}while(0);do{if((T|0)==4514){O=b7(0)|0;if((O|0)==-1){W=0;break}g=O;L=c[3059]|0;m=L-1|0;if((m&g|0)==0){$=S}else{$=S-g+(m+g&-L)|0}L=c[3178]|0;g=L+$|0;if(!($>>>0>o>>>0&$>>>0<2147483647>>>0)){W=0;break}m=c[3180]|0;if((m|0)!=0){if(g>>>0<=L>>>0|g>>>0>m>>>0){W=0;break}}m=b7($|0)|0;g=(m|0)==(O|0);X=g?O:-1;Y=g?$:0;Z=m;_=$;T=4523}}while(0);L5432:do{if((T|0)==4523){m=-_|0;if((X|0)!=-1){aa=Y;ab=X;T=4534;break L5410}do{if((Z|0)!=-1&_>>>0<2147483647>>>0&_>>>0<J>>>0){g=c[3060]|0;O=K-_+g&-g;if(O>>>0>=2147483647>>>0){ac=_;break}if((b7(O|0)|0)==-1){b7(m|0)|0;W=Y;break L5432}else{ac=O+_|0;break}}else{ac=_}}while(0);if((Z|0)==-1){W=Y}else{aa=ac;ab=Z;T=4534;break L5410}}}while(0);c[3181]=c[3181]|4;ad=W;T=4531}else{ad=0;T=4531}}while(0);do{if((T|0)==4531){if(S>>>0>=2147483647>>>0){break}W=b7(S|0)|0;Z=b7(0)|0;if(!((Z|0)!=-1&(W|0)!=-1&W>>>0<Z>>>0)){break}ac=Z-W|0;Z=ac>>>0>(o+40|0)>>>0;Y=Z?W:-1;if((Y|0)!=-1){aa=Z?ac:ad;ab=Y;T=4534}}}while(0);do{if((T|0)==4534){ad=(c[3178]|0)+aa|0;c[3178]=ad;if(ad>>>0>(c[3179]|0)>>>0){c[3179]=ad}ad=c[3076]|0;L5452:do{if((ad|0)==0){S=c[3074]|0;if((S|0)==0|ab>>>0<S>>>0){c[3074]=ab}c[3182]=ab;c[3183]=aa;c[3185]=0;c[3079]=c[3058];c[3078]=-1;S=0;do{Y=S<<1;ac=12320+(Y<<2)|0;c[12320+(Y+3<<2)>>2]=ac;c[12320+(Y+2<<2)>>2]=ac;S=S+1|0;}while(S>>>0<32>>>0);S=ab+8|0;if((S&7|0)==0){ae=0}else{ae=-S&7}S=aa-40-ae|0;c[3076]=ab+ae;c[3073]=S;c[ab+(ae+4)>>2]=S|1;c[ab+(aa-36)>>2]=40;c[3077]=c[3062]}else{S=12728;while(1){af=c[S>>2]|0;ag=S+4|0;ah=c[ag>>2]|0;if((ab|0)==(af+ah|0)){T=4546;break}ac=c[S+8>>2]|0;if((ac|0)==0){break}else{S=ac}}do{if((T|0)==4546){if((c[S+12>>2]&8|0)!=0){break}ac=ad;if(!(ac>>>0>=af>>>0&ac>>>0<ab>>>0)){break}c[ag>>2]=ah+aa;ac=c[3076]|0;Y=(c[3073]|0)+aa|0;Z=ac;W=ac+8|0;if((W&7|0)==0){ai=0}else{ai=-W&7}W=Y-ai|0;c[3076]=Z+ai;c[3073]=W;c[Z+(ai+4)>>2]=W|1;c[Z+(Y+4)>>2]=40;c[3077]=c[3062];break L5452}}while(0);if(ab>>>0<(c[3074]|0)>>>0){c[3074]=ab}S=ab+aa|0;Y=12728;while(1){aj=Y|0;if((c[aj>>2]|0)==(S|0)){T=4556;break}Z=c[Y+8>>2]|0;if((Z|0)==0){break}else{Y=Z}}do{if((T|0)==4556){if((c[Y+12>>2]&8|0)!=0){break}c[aj>>2]=ab;S=Y+4|0;c[S>>2]=(c[S>>2]|0)+aa;S=ab+8|0;if((S&7|0)==0){ak=0}else{ak=-S&7}S=ab+(aa+8)|0;if((S&7|0)==0){al=0}else{al=-S&7}S=ab+(al+aa)|0;Z=S;W=ak+o|0;ac=ab+W|0;_=ac;K=S-(ab+ak)-o|0;c[ab+(ak+4)>>2]=o|3;do{if((Z|0)==(c[3076]|0)){J=(c[3073]|0)+K|0;c[3073]=J;c[3076]=_;c[ab+(W+4)>>2]=J|1}else{if((Z|0)==(c[3075]|0)){J=(c[3072]|0)+K|0;c[3072]=J;c[3075]=_;c[ab+(W+4)>>2]=J|1;c[ab+(J+W)>>2]=J;break}J=aa+4|0;X=c[ab+(J+al)>>2]|0;if((X&3|0)==1){$=X&-8;V=X>>>3;L5497:do{if(X>>>0<256>>>0){U=c[ab+((al|8)+aa)>>2]|0;Q=c[ab+(aa+12+al)>>2]|0;R=12320+(V<<1<<2)|0;do{if((U|0)!=(R|0)){if(U>>>0<(c[3074]|0)>>>0){co();return 0}if((c[U+12>>2]|0)==(Z|0)){break}co();return 0}}while(0);if((Q|0)==(U|0)){c[3070]=c[3070]&~(1<<V);break}do{if((Q|0)==(R|0)){am=Q+8|0}else{if(Q>>>0<(c[3074]|0)>>>0){co();return 0}m=Q+8|0;if((c[m>>2]|0)==(Z|0)){am=m;break}co();return 0}}while(0);c[U+12>>2]=Q;c[am>>2]=U}else{R=S;m=c[ab+((al|24)+aa)>>2]|0;P=c[ab+(aa+12+al)>>2]|0;do{if((P|0)==(R|0)){O=al|16;g=ab+(J+O)|0;L=c[g>>2]|0;if((L|0)==0){e=ab+(O+aa)|0;O=c[e>>2]|0;if((O|0)==0){an=0;break}else{ao=O;ap=e}}else{ao=L;ap=g}while(1){g=ao+20|0;L=c[g>>2]|0;if((L|0)!=0){ao=L;ap=g;continue}g=ao+16|0;L=c[g>>2]|0;if((L|0)==0){break}else{ao=L;ap=g}}if(ap>>>0<(c[3074]|0)>>>0){co();return 0}else{c[ap>>2]=0;an=ao;break}}else{g=c[ab+((al|8)+aa)>>2]|0;if(g>>>0<(c[3074]|0)>>>0){co();return 0}L=g+12|0;if((c[L>>2]|0)!=(R|0)){co();return 0}e=P+8|0;if((c[e>>2]|0)==(R|0)){c[L>>2]=P;c[e>>2]=g;an=P;break}else{co();return 0}}}while(0);if((m|0)==0){break}P=ab+(aa+28+al)|0;U=12584+(c[P>>2]<<2)|0;do{if((R|0)==(c[U>>2]|0)){c[U>>2]=an;if((an|0)!=0){break}c[3071]=c[3071]&~(1<<c[P>>2]);break L5497}else{if(m>>>0<(c[3074]|0)>>>0){co();return 0}Q=m+16|0;if((c[Q>>2]|0)==(R|0)){c[Q>>2]=an}else{c[m+20>>2]=an}if((an|0)==0){break L5497}}}while(0);if(an>>>0<(c[3074]|0)>>>0){co();return 0}c[an+24>>2]=m;R=al|16;P=c[ab+(R+aa)>>2]|0;do{if((P|0)!=0){if(P>>>0<(c[3074]|0)>>>0){co();return 0}else{c[an+16>>2]=P;c[P+24>>2]=an;break}}}while(0);P=c[ab+(J+R)>>2]|0;if((P|0)==0){break}if(P>>>0<(c[3074]|0)>>>0){co();return 0}else{c[an+20>>2]=P;c[P+24>>2]=an;break}}}while(0);aq=ab+(($|al)+aa)|0;ar=$+K|0}else{aq=Z;ar=K}J=aq+4|0;c[J>>2]=c[J>>2]&-2;c[ab+(W+4)>>2]=ar|1;c[ab+(ar+W)>>2]=ar;J=ar>>>3;if(ar>>>0<256>>>0){V=J<<1;X=12320+(V<<2)|0;P=c[3070]|0;m=1<<J;do{if((P&m|0)==0){c[3070]=P|m;as=X;at=12320+(V+2<<2)|0}else{J=12320+(V+2<<2)|0;U=c[J>>2]|0;if(U>>>0>=(c[3074]|0)>>>0){as=U;at=J;break}co();return 0}}while(0);c[at>>2]=_;c[as+12>>2]=_;c[ab+(W+8)>>2]=as;c[ab+(W+12)>>2]=X;break}V=ac;m=ar>>>8;do{if((m|0)==0){au=0}else{if(ar>>>0>16777215>>>0){au=31;break}P=(m+1048320|0)>>>16&8;$=m<<P;J=($+520192|0)>>>16&4;U=$<<J;$=(U+245760|0)>>>16&2;Q=14-(J|P|$)+(U<<$>>>15)|0;au=ar>>>((Q+7|0)>>>0)&1|Q<<1}}while(0);m=12584+(au<<2)|0;c[ab+(W+28)>>2]=au;c[ab+(W+20)>>2]=0;c[ab+(W+16)>>2]=0;X=c[3071]|0;Q=1<<au;if((X&Q|0)==0){c[3071]=X|Q;c[m>>2]=V;c[ab+(W+24)>>2]=m;c[ab+(W+12)>>2]=V;c[ab+(W+8)>>2]=V;break}if((au|0)==31){av=0}else{av=25-(au>>>1)|0}Q=ar<<av;X=c[m>>2]|0;while(1){if((c[X+4>>2]&-8|0)==(ar|0)){break}aw=X+16+(Q>>>31<<2)|0;m=c[aw>>2]|0;if((m|0)==0){T=4629;break}else{Q=Q<<1;X=m}}if((T|0)==4629){if(aw>>>0<(c[3074]|0)>>>0){co();return 0}else{c[aw>>2]=V;c[ab+(W+24)>>2]=X;c[ab+(W+12)>>2]=V;c[ab+(W+8)>>2]=V;break}}Q=X+8|0;m=c[Q>>2]|0;$=c[3074]|0;if(X>>>0<$>>>0){co();return 0}if(m>>>0<$>>>0){co();return 0}else{c[m+12>>2]=V;c[Q>>2]=V;c[ab+(W+8)>>2]=m;c[ab+(W+12)>>2]=X;c[ab+(W+24)>>2]=0;break}}}while(0);n=ab+(ak|8)|0;return n|0}}while(0);Y=ad;W=12728;while(1){ax=c[W>>2]|0;if(ax>>>0<=Y>>>0){ay=c[W+4>>2]|0;az=ax+ay|0;if(az>>>0>Y>>>0){break}}W=c[W+8>>2]|0}W=ax+(ay-39)|0;if((W&7|0)==0){aA=0}else{aA=-W&7}W=ax+(ay-47+aA)|0;ac=W>>>0<(ad+16|0)>>>0?Y:W;W=ac+8|0;_=ab+8|0;if((_&7|0)==0){aB=0}else{aB=-_&7}_=aa-40-aB|0;c[3076]=ab+aB;c[3073]=_;c[ab+(aB+4)>>2]=_|1;c[ab+(aa-36)>>2]=40;c[3077]=c[3062];c[ac+4>>2]=27;c[W>>2]=c[3182];c[W+4>>2]=c[3183];c[W+8>>2]=c[3184];c[W+12>>2]=c[3185];c[3182]=ab;c[3183]=aa;c[3185]=0;c[3184]=W;W=ac+28|0;c[W>>2]=7;if((ac+32|0)>>>0<az>>>0){_=W;while(1){W=_+4|0;c[W>>2]=7;if((_+8|0)>>>0<az>>>0){_=W}else{break}}}if((ac|0)==(Y|0)){break}_=ac-ad|0;W=Y+(_+4)|0;c[W>>2]=c[W>>2]&-2;c[ad+4>>2]=_|1;c[Y+_>>2]=_;W=_>>>3;if(_>>>0<256>>>0){K=W<<1;Z=12320+(K<<2)|0;S=c[3070]|0;m=1<<W;do{if((S&m|0)==0){c[3070]=S|m;aC=Z;aD=12320+(K+2<<2)|0}else{W=12320+(K+2<<2)|0;Q=c[W>>2]|0;if(Q>>>0>=(c[3074]|0)>>>0){aC=Q;aD=W;break}co();return 0}}while(0);c[aD>>2]=ad;c[aC+12>>2]=ad;c[ad+8>>2]=aC;c[ad+12>>2]=Z;break}K=ad;m=_>>>8;do{if((m|0)==0){aE=0}else{if(_>>>0>16777215>>>0){aE=31;break}S=(m+1048320|0)>>>16&8;Y=m<<S;ac=(Y+520192|0)>>>16&4;W=Y<<ac;Y=(W+245760|0)>>>16&2;Q=14-(ac|S|Y)+(W<<Y>>>15)|0;aE=_>>>((Q+7|0)>>>0)&1|Q<<1}}while(0);m=12584+(aE<<2)|0;c[ad+28>>2]=aE;c[ad+20>>2]=0;c[ad+16>>2]=0;Z=c[3071]|0;Q=1<<aE;if((Z&Q|0)==0){c[3071]=Z|Q;c[m>>2]=K;c[ad+24>>2]=m;c[ad+12>>2]=ad;c[ad+8>>2]=ad;break}if((aE|0)==31){aF=0}else{aF=25-(aE>>>1)|0}Q=_<<aF;Z=c[m>>2]|0;while(1){if((c[Z+4>>2]&-8|0)==(_|0)){break}aG=Z+16+(Q>>>31<<2)|0;m=c[aG>>2]|0;if((m|0)==0){T=4664;break}else{Q=Q<<1;Z=m}}if((T|0)==4664){if(aG>>>0<(c[3074]|0)>>>0){co();return 0}else{c[aG>>2]=K;c[ad+24>>2]=Z;c[ad+12>>2]=ad;c[ad+8>>2]=ad;break}}Q=Z+8|0;_=c[Q>>2]|0;m=c[3074]|0;if(Z>>>0<m>>>0){co();return 0}if(_>>>0<m>>>0){co();return 0}else{c[_+12>>2]=K;c[Q>>2]=K;c[ad+8>>2]=_;c[ad+12>>2]=Z;c[ad+24>>2]=0;break}}}while(0);ad=c[3073]|0;if(ad>>>0<=o>>>0){break}_=ad-o|0;c[3073]=_;ad=c[3076]|0;Q=ad;c[3076]=Q+o;c[Q+(o+4)>>2]=_|1;c[ad+4>>2]=o|3;n=ad+8|0;return n|0}}while(0);c[(b8()|0)>>2]=12;n=0;return n|0}function mq(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0;if((a|0)==0){return}b=a-8|0;d=b;e=c[3074]|0;if(b>>>0<e>>>0){co()}f=c[a-4>>2]|0;g=f&3;if((g|0)==1){co()}h=f&-8;i=a+(h-8)|0;j=i;L5669:do{if((f&1|0)==0){k=c[b>>2]|0;if((g|0)==0){return}l=-8-k|0;m=a+l|0;n=m;o=k+h|0;if(m>>>0<e>>>0){co()}if((n|0)==(c[3075]|0)){p=a+(h-4)|0;if((c[p>>2]&3|0)!=3){q=n;r=o;break}c[3072]=o;c[p>>2]=c[p>>2]&-2;c[a+(l+4)>>2]=o|1;c[i>>2]=o;return}p=k>>>3;if(k>>>0<256>>>0){k=c[a+(l+8)>>2]|0;s=c[a+(l+12)>>2]|0;t=12320+(p<<1<<2)|0;do{if((k|0)!=(t|0)){if(k>>>0<e>>>0){co()}if((c[k+12>>2]|0)==(n|0)){break}co()}}while(0);if((s|0)==(k|0)){c[3070]=c[3070]&~(1<<p);q=n;r=o;break}do{if((s|0)==(t|0)){u=s+8|0}else{if(s>>>0<e>>>0){co()}v=s+8|0;if((c[v>>2]|0)==(n|0)){u=v;break}co()}}while(0);c[k+12>>2]=s;c[u>>2]=k;q=n;r=o;break}t=m;p=c[a+(l+24)>>2]|0;v=c[a+(l+12)>>2]|0;do{if((v|0)==(t|0)){w=a+(l+20)|0;x=c[w>>2]|0;if((x|0)==0){y=a+(l+16)|0;z=c[y>>2]|0;if((z|0)==0){A=0;break}else{B=z;C=y}}else{B=x;C=w}while(1){w=B+20|0;x=c[w>>2]|0;if((x|0)!=0){B=x;C=w;continue}w=B+16|0;x=c[w>>2]|0;if((x|0)==0){break}else{B=x;C=w}}if(C>>>0<e>>>0){co()}else{c[C>>2]=0;A=B;break}}else{w=c[a+(l+8)>>2]|0;if(w>>>0<e>>>0){co()}x=w+12|0;if((c[x>>2]|0)!=(t|0)){co()}y=v+8|0;if((c[y>>2]|0)==(t|0)){c[x>>2]=v;c[y>>2]=w;A=v;break}else{co()}}}while(0);if((p|0)==0){q=n;r=o;break}v=a+(l+28)|0;m=12584+(c[v>>2]<<2)|0;do{if((t|0)==(c[m>>2]|0)){c[m>>2]=A;if((A|0)!=0){break}c[3071]=c[3071]&~(1<<c[v>>2]);q=n;r=o;break L5669}else{if(p>>>0<(c[3074]|0)>>>0){co()}k=p+16|0;if((c[k>>2]|0)==(t|0)){c[k>>2]=A}else{c[p+20>>2]=A}if((A|0)==0){q=n;r=o;break L5669}}}while(0);if(A>>>0<(c[3074]|0)>>>0){co()}c[A+24>>2]=p;t=c[a+(l+16)>>2]|0;do{if((t|0)!=0){if(t>>>0<(c[3074]|0)>>>0){co()}else{c[A+16>>2]=t;c[t+24>>2]=A;break}}}while(0);t=c[a+(l+20)>>2]|0;if((t|0)==0){q=n;r=o;break}if(t>>>0<(c[3074]|0)>>>0){co()}else{c[A+20>>2]=t;c[t+24>>2]=A;q=n;r=o;break}}else{q=d;r=h}}while(0);d=q;if(d>>>0>=i>>>0){co()}A=a+(h-4)|0;e=c[A>>2]|0;if((e&1|0)==0){co()}do{if((e&2|0)==0){if((j|0)==(c[3076]|0)){B=(c[3073]|0)+r|0;c[3073]=B;c[3076]=q;c[q+4>>2]=B|1;if((q|0)!=(c[3075]|0)){return}c[3075]=0;c[3072]=0;return}if((j|0)==(c[3075]|0)){B=(c[3072]|0)+r|0;c[3072]=B;c[3075]=q;c[q+4>>2]=B|1;c[d+B>>2]=B;return}B=(e&-8)+r|0;C=e>>>3;L5772:do{if(e>>>0<256>>>0){u=c[a+h>>2]|0;g=c[a+(h|4)>>2]|0;b=12320+(C<<1<<2)|0;do{if((u|0)!=(b|0)){if(u>>>0<(c[3074]|0)>>>0){co()}if((c[u+12>>2]|0)==(j|0)){break}co()}}while(0);if((g|0)==(u|0)){c[3070]=c[3070]&~(1<<C);break}do{if((g|0)==(b|0)){D=g+8|0}else{if(g>>>0<(c[3074]|0)>>>0){co()}f=g+8|0;if((c[f>>2]|0)==(j|0)){D=f;break}co()}}while(0);c[u+12>>2]=g;c[D>>2]=u}else{b=i;f=c[a+(h+16)>>2]|0;t=c[a+(h|4)>>2]|0;do{if((t|0)==(b|0)){p=a+(h+12)|0;v=c[p>>2]|0;if((v|0)==0){m=a+(h+8)|0;k=c[m>>2]|0;if((k|0)==0){E=0;break}else{F=k;G=m}}else{F=v;G=p}while(1){p=F+20|0;v=c[p>>2]|0;if((v|0)!=0){F=v;G=p;continue}p=F+16|0;v=c[p>>2]|0;if((v|0)==0){break}else{F=v;G=p}}if(G>>>0<(c[3074]|0)>>>0){co()}else{c[G>>2]=0;E=F;break}}else{p=c[a+h>>2]|0;if(p>>>0<(c[3074]|0)>>>0){co()}v=p+12|0;if((c[v>>2]|0)!=(b|0)){co()}m=t+8|0;if((c[m>>2]|0)==(b|0)){c[v>>2]=t;c[m>>2]=p;E=t;break}else{co()}}}while(0);if((f|0)==0){break}t=a+(h+20)|0;u=12584+(c[t>>2]<<2)|0;do{if((b|0)==(c[u>>2]|0)){c[u>>2]=E;if((E|0)!=0){break}c[3071]=c[3071]&~(1<<c[t>>2]);break L5772}else{if(f>>>0<(c[3074]|0)>>>0){co()}g=f+16|0;if((c[g>>2]|0)==(b|0)){c[g>>2]=E}else{c[f+20>>2]=E}if((E|0)==0){break L5772}}}while(0);if(E>>>0<(c[3074]|0)>>>0){co()}c[E+24>>2]=f;b=c[a+(h+8)>>2]|0;do{if((b|0)!=0){if(b>>>0<(c[3074]|0)>>>0){co()}else{c[E+16>>2]=b;c[b+24>>2]=E;break}}}while(0);b=c[a+(h+12)>>2]|0;if((b|0)==0){break}if(b>>>0<(c[3074]|0)>>>0){co()}else{c[E+20>>2]=b;c[b+24>>2]=E;break}}}while(0);c[q+4>>2]=B|1;c[d+B>>2]=B;if((q|0)!=(c[3075]|0)){H=B;break}c[3072]=B;return}else{c[A>>2]=e&-2;c[q+4>>2]=r|1;c[d+r>>2]=r;H=r}}while(0);r=H>>>3;if(H>>>0<256>>>0){d=r<<1;e=12320+(d<<2)|0;A=c[3070]|0;E=1<<r;do{if((A&E|0)==0){c[3070]=A|E;I=e;J=12320+(d+2<<2)|0}else{r=12320+(d+2<<2)|0;h=c[r>>2]|0;if(h>>>0>=(c[3074]|0)>>>0){I=h;J=r;break}co()}}while(0);c[J>>2]=q;c[I+12>>2]=q;c[q+8>>2]=I;c[q+12>>2]=e;return}e=q;I=H>>>8;do{if((I|0)==0){K=0}else{if(H>>>0>16777215>>>0){K=31;break}J=(I+1048320|0)>>>16&8;d=I<<J;E=(d+520192|0)>>>16&4;A=d<<E;d=(A+245760|0)>>>16&2;r=14-(E|J|d)+(A<<d>>>15)|0;K=H>>>((r+7|0)>>>0)&1|r<<1}}while(0);I=12584+(K<<2)|0;c[q+28>>2]=K;c[q+20>>2]=0;c[q+16>>2]=0;r=c[3071]|0;d=1<<K;do{if((r&d|0)==0){c[3071]=r|d;c[I>>2]=e;c[q+24>>2]=I;c[q+12>>2]=q;c[q+8>>2]=q}else{if((K|0)==31){L=0}else{L=25-(K>>>1)|0}A=H<<L;J=c[I>>2]|0;while(1){if((c[J+4>>2]&-8|0)==(H|0)){break}M=J+16+(A>>>31<<2)|0;E=c[M>>2]|0;if((E|0)==0){N=4841;break}else{A=A<<1;J=E}}if((N|0)==4841){if(M>>>0<(c[3074]|0)>>>0){co()}else{c[M>>2]=e;c[q+24>>2]=J;c[q+12>>2]=q;c[q+8>>2]=q;break}}A=J+8|0;B=c[A>>2]|0;E=c[3074]|0;if(J>>>0<E>>>0){co()}if(B>>>0<E>>>0){co()}else{c[B+12>>2]=e;c[A>>2]=e;c[q+8>>2]=B;c[q+12>>2]=J;c[q+24>>2]=0;break}}}while(0);q=(c[3078]|0)-1|0;c[3078]=q;if((q|0)==0){O=12736}else{return}while(1){q=c[O>>2]|0;if((q|0)==0){break}else{O=q+8|0}}c[3078]=-1;return}function mr(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;if((a|0)==0){d=mp(b)|0;return d|0}if(b>>>0>4294967231>>>0){c[(b8()|0)>>2]=12;d=0;return d|0}if(b>>>0<11>>>0){e=16}else{e=b+11&-8}f=ms(a-8|0,e)|0;if((f|0)!=0){d=f+8|0;return d|0}f=mp(b)|0;if((f|0)==0){d=0;return d|0}e=c[a-4>>2]|0;g=(e&-8)-((e&3|0)==0?8:4)|0;e=g>>>0<b>>>0?g:b;mE(f|0,a|0,e)|0;mq(a);d=f;return d|0}function ms(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;d=a+4|0;e=c[d>>2]|0;f=e&-8;g=a;h=g+f|0;i=h;j=c[3074]|0;if(g>>>0<j>>>0){co();return 0}k=e&3;if(!((k|0)!=1&g>>>0<h>>>0)){co();return 0}l=g+(f|4)|0;m=c[l>>2]|0;if((m&1|0)==0){co();return 0}if((k|0)==0){if(b>>>0<256>>>0){n=0;return n|0}do{if(f>>>0>=(b+4|0)>>>0){if((f-b|0)>>>0>c[3060]<<1>>>0){break}else{n=a}return n|0}}while(0);n=0;return n|0}if(f>>>0>=b>>>0){k=f-b|0;if(k>>>0<=15>>>0){n=a;return n|0}c[d>>2]=e&1|b|2;c[g+(b+4)>>2]=k|3;c[l>>2]=c[l>>2]|1;mt(g+b|0,k);n=a;return n|0}if((i|0)==(c[3076]|0)){k=(c[3073]|0)+f|0;if(k>>>0<=b>>>0){n=0;return n|0}l=k-b|0;c[d>>2]=e&1|b|2;c[g+(b+4)>>2]=l|1;c[3076]=g+b;c[3073]=l;n=a;return n|0}if((i|0)==(c[3075]|0)){l=(c[3072]|0)+f|0;if(l>>>0<b>>>0){n=0;return n|0}k=l-b|0;if(k>>>0>15>>>0){c[d>>2]=e&1|b|2;c[g+(b+4)>>2]=k|1;c[g+l>>2]=k;o=g+(l+4)|0;c[o>>2]=c[o>>2]&-2;p=g+b|0;q=k}else{c[d>>2]=e&1|l|2;e=g+(l+4)|0;c[e>>2]=c[e>>2]|1;p=0;q=0}c[3072]=q;c[3075]=p;n=a;return n|0}if((m&2|0)!=0){n=0;return n|0}p=(m&-8)+f|0;if(p>>>0<b>>>0){n=0;return n|0}q=p-b|0;e=m>>>3;L5958:do{if(m>>>0<256>>>0){l=c[g+(f+8)>>2]|0;k=c[g+(f+12)>>2]|0;o=12320+(e<<1<<2)|0;do{if((l|0)!=(o|0)){if(l>>>0<j>>>0){co();return 0}if((c[l+12>>2]|0)==(i|0)){break}co();return 0}}while(0);if((k|0)==(l|0)){c[3070]=c[3070]&~(1<<e);break}do{if((k|0)==(o|0)){r=k+8|0}else{if(k>>>0<j>>>0){co();return 0}s=k+8|0;if((c[s>>2]|0)==(i|0)){r=s;break}co();return 0}}while(0);c[l+12>>2]=k;c[r>>2]=l}else{o=h;s=c[g+(f+24)>>2]|0;t=c[g+(f+12)>>2]|0;do{if((t|0)==(o|0)){u=g+(f+20)|0;v=c[u>>2]|0;if((v|0)==0){w=g+(f+16)|0;x=c[w>>2]|0;if((x|0)==0){y=0;break}else{z=x;A=w}}else{z=v;A=u}while(1){u=z+20|0;v=c[u>>2]|0;if((v|0)!=0){z=v;A=u;continue}u=z+16|0;v=c[u>>2]|0;if((v|0)==0){break}else{z=v;A=u}}if(A>>>0<j>>>0){co();return 0}else{c[A>>2]=0;y=z;break}}else{u=c[g+(f+8)>>2]|0;if(u>>>0<j>>>0){co();return 0}v=u+12|0;if((c[v>>2]|0)!=(o|0)){co();return 0}w=t+8|0;if((c[w>>2]|0)==(o|0)){c[v>>2]=t;c[w>>2]=u;y=t;break}else{co();return 0}}}while(0);if((s|0)==0){break}t=g+(f+28)|0;l=12584+(c[t>>2]<<2)|0;do{if((o|0)==(c[l>>2]|0)){c[l>>2]=y;if((y|0)!=0){break}c[3071]=c[3071]&~(1<<c[t>>2]);break L5958}else{if(s>>>0<(c[3074]|0)>>>0){co();return 0}k=s+16|0;if((c[k>>2]|0)==(o|0)){c[k>>2]=y}else{c[s+20>>2]=y}if((y|0)==0){break L5958}}}while(0);if(y>>>0<(c[3074]|0)>>>0){co();return 0}c[y+24>>2]=s;o=c[g+(f+16)>>2]|0;do{if((o|0)!=0){if(o>>>0<(c[3074]|0)>>>0){co();return 0}else{c[y+16>>2]=o;c[o+24>>2]=y;break}}}while(0);o=c[g+(f+20)>>2]|0;if((o|0)==0){break}if(o>>>0<(c[3074]|0)>>>0){co();return 0}else{c[y+20>>2]=o;c[o+24>>2]=y;break}}}while(0);if(q>>>0<16>>>0){c[d>>2]=p|c[d>>2]&1|2;y=g+(p|4)|0;c[y>>2]=c[y>>2]|1;n=a;return n|0}else{c[d>>2]=c[d>>2]&1|b|2;c[g+(b+4)>>2]=q|3;d=g+(p|4)|0;c[d>>2]=c[d>>2]|1;mt(g+b|0,q);n=a;return n|0}return 0}function mt(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;d=a;e=d+b|0;f=e;g=c[a+4>>2]|0;L6034:do{if((g&1|0)==0){h=c[a>>2]|0;if((g&3|0)==0){return}i=d+(-h|0)|0;j=i;k=h+b|0;l=c[3074]|0;if(i>>>0<l>>>0){co()}if((j|0)==(c[3075]|0)){m=d+(b+4)|0;if((c[m>>2]&3|0)!=3){n=j;o=k;break}c[3072]=k;c[m>>2]=c[m>>2]&-2;c[d+(4-h)>>2]=k|1;c[e>>2]=k;return}m=h>>>3;if(h>>>0<256>>>0){p=c[d+(8-h)>>2]|0;q=c[d+(12-h)>>2]|0;r=12320+(m<<1<<2)|0;do{if((p|0)!=(r|0)){if(p>>>0<l>>>0){co()}if((c[p+12>>2]|0)==(j|0)){break}co()}}while(0);if((q|0)==(p|0)){c[3070]=c[3070]&~(1<<m);n=j;o=k;break}do{if((q|0)==(r|0)){s=q+8|0}else{if(q>>>0<l>>>0){co()}t=q+8|0;if((c[t>>2]|0)==(j|0)){s=t;break}co()}}while(0);c[p+12>>2]=q;c[s>>2]=p;n=j;o=k;break}r=i;m=c[d+(24-h)>>2]|0;t=c[d+(12-h)>>2]|0;do{if((t|0)==(r|0)){u=16-h|0;v=d+(u+4)|0;w=c[v>>2]|0;if((w|0)==0){x=d+u|0;u=c[x>>2]|0;if((u|0)==0){y=0;break}else{z=u;A=x}}else{z=w;A=v}while(1){v=z+20|0;w=c[v>>2]|0;if((w|0)!=0){z=w;A=v;continue}v=z+16|0;w=c[v>>2]|0;if((w|0)==0){break}else{z=w;A=v}}if(A>>>0<l>>>0){co()}else{c[A>>2]=0;y=z;break}}else{v=c[d+(8-h)>>2]|0;if(v>>>0<l>>>0){co()}w=v+12|0;if((c[w>>2]|0)!=(r|0)){co()}x=t+8|0;if((c[x>>2]|0)==(r|0)){c[w>>2]=t;c[x>>2]=v;y=t;break}else{co()}}}while(0);if((m|0)==0){n=j;o=k;break}t=d+(28-h)|0;l=12584+(c[t>>2]<<2)|0;do{if((r|0)==(c[l>>2]|0)){c[l>>2]=y;if((y|0)!=0){break}c[3071]=c[3071]&~(1<<c[t>>2]);n=j;o=k;break L6034}else{if(m>>>0<(c[3074]|0)>>>0){co()}i=m+16|0;if((c[i>>2]|0)==(r|0)){c[i>>2]=y}else{c[m+20>>2]=y}if((y|0)==0){n=j;o=k;break L6034}}}while(0);if(y>>>0<(c[3074]|0)>>>0){co()}c[y+24>>2]=m;r=16-h|0;t=c[d+r>>2]|0;do{if((t|0)!=0){if(t>>>0<(c[3074]|0)>>>0){co()}else{c[y+16>>2]=t;c[t+24>>2]=y;break}}}while(0);t=c[d+(r+4)>>2]|0;if((t|0)==0){n=j;o=k;break}if(t>>>0<(c[3074]|0)>>>0){co()}else{c[y+20>>2]=t;c[t+24>>2]=y;n=j;o=k;break}}else{n=a;o=b}}while(0);a=c[3074]|0;if(e>>>0<a>>>0){co()}y=d+(b+4)|0;z=c[y>>2]|0;do{if((z&2|0)==0){if((f|0)==(c[3076]|0)){A=(c[3073]|0)+o|0;c[3073]=A;c[3076]=n;c[n+4>>2]=A|1;if((n|0)!=(c[3075]|0)){return}c[3075]=0;c[3072]=0;return}if((f|0)==(c[3075]|0)){A=(c[3072]|0)+o|0;c[3072]=A;c[3075]=n;c[n+4>>2]=A|1;c[n+A>>2]=A;return}A=(z&-8)+o|0;s=z>>>3;L6133:do{if(z>>>0<256>>>0){g=c[d+(b+8)>>2]|0;t=c[d+(b+12)>>2]|0;h=12320+(s<<1<<2)|0;do{if((g|0)!=(h|0)){if(g>>>0<a>>>0){co()}if((c[g+12>>2]|0)==(f|0)){break}co()}}while(0);if((t|0)==(g|0)){c[3070]=c[3070]&~(1<<s);break}do{if((t|0)==(h|0)){B=t+8|0}else{if(t>>>0<a>>>0){co()}m=t+8|0;if((c[m>>2]|0)==(f|0)){B=m;break}co()}}while(0);c[g+12>>2]=t;c[B>>2]=g}else{h=e;m=c[d+(b+24)>>2]|0;l=c[d+(b+12)>>2]|0;do{if((l|0)==(h|0)){i=d+(b+20)|0;p=c[i>>2]|0;if((p|0)==0){q=d+(b+16)|0;v=c[q>>2]|0;if((v|0)==0){C=0;break}else{D=v;E=q}}else{D=p;E=i}while(1){i=D+20|0;p=c[i>>2]|0;if((p|0)!=0){D=p;E=i;continue}i=D+16|0;p=c[i>>2]|0;if((p|0)==0){break}else{D=p;E=i}}if(E>>>0<a>>>0){co()}else{c[E>>2]=0;C=D;break}}else{i=c[d+(b+8)>>2]|0;if(i>>>0<a>>>0){co()}p=i+12|0;if((c[p>>2]|0)!=(h|0)){co()}q=l+8|0;if((c[q>>2]|0)==(h|0)){c[p>>2]=l;c[q>>2]=i;C=l;break}else{co()}}}while(0);if((m|0)==0){break}l=d+(b+28)|0;g=12584+(c[l>>2]<<2)|0;do{if((h|0)==(c[g>>2]|0)){c[g>>2]=C;if((C|0)!=0){break}c[3071]=c[3071]&~(1<<c[l>>2]);break L6133}else{if(m>>>0<(c[3074]|0)>>>0){co()}t=m+16|0;if((c[t>>2]|0)==(h|0)){c[t>>2]=C}else{c[m+20>>2]=C}if((C|0)==0){break L6133}}}while(0);if(C>>>0<(c[3074]|0)>>>0){co()}c[C+24>>2]=m;h=c[d+(b+16)>>2]|0;do{if((h|0)!=0){if(h>>>0<(c[3074]|0)>>>0){co()}else{c[C+16>>2]=h;c[h+24>>2]=C;break}}}while(0);h=c[d+(b+20)>>2]|0;if((h|0)==0){break}if(h>>>0<(c[3074]|0)>>>0){co()}else{c[C+20>>2]=h;c[h+24>>2]=C;break}}}while(0);c[n+4>>2]=A|1;c[n+A>>2]=A;if((n|0)!=(c[3075]|0)){F=A;break}c[3072]=A;return}else{c[y>>2]=z&-2;c[n+4>>2]=o|1;c[n+o>>2]=o;F=o}}while(0);o=F>>>3;if(F>>>0<256>>>0){z=o<<1;y=12320+(z<<2)|0;C=c[3070]|0;b=1<<o;do{if((C&b|0)==0){c[3070]=C|b;G=y;H=12320+(z+2<<2)|0}else{o=12320+(z+2<<2)|0;d=c[o>>2]|0;if(d>>>0>=(c[3074]|0)>>>0){G=d;H=o;break}co()}}while(0);c[H>>2]=n;c[G+12>>2]=n;c[n+8>>2]=G;c[n+12>>2]=y;return}y=n;G=F>>>8;do{if((G|0)==0){I=0}else{if(F>>>0>16777215>>>0){I=31;break}H=(G+1048320|0)>>>16&8;z=G<<H;b=(z+520192|0)>>>16&4;C=z<<b;z=(C+245760|0)>>>16&2;o=14-(b|H|z)+(C<<z>>>15)|0;I=F>>>((o+7|0)>>>0)&1|o<<1}}while(0);G=12584+(I<<2)|0;c[n+28>>2]=I;c[n+20>>2]=0;c[n+16>>2]=0;o=c[3071]|0;z=1<<I;if((o&z|0)==0){c[3071]=o|z;c[G>>2]=y;c[n+24>>2]=G;c[n+12>>2]=n;c[n+8>>2]=n;return}if((I|0)==31){J=0}else{J=25-(I>>>1)|0}I=F<<J;J=c[G>>2]|0;while(1){if((c[J+4>>2]&-8|0)==(F|0)){break}K=J+16+(I>>>31<<2)|0;G=c[K>>2]|0;if((G|0)==0){L=5121;break}else{I=I<<1;J=G}}if((L|0)==5121){if(K>>>0<(c[3074]|0)>>>0){co()}c[K>>2]=y;c[n+24>>2]=J;c[n+12>>2]=n;c[n+8>>2]=n;return}K=J+8|0;L=c[K>>2]|0;I=c[3074]|0;if(J>>>0<I>>>0){co()}if(L>>>0<I>>>0){co()}c[L+12>>2]=y;c[K>>2]=y;c[n+8>>2]=L;c[n+12>>2]=J;c[n+24>>2]=0;return}function mu(a){a=a|0;var b=0,d=0,e=0;b=(a|0)==0?1:a;while(1){d=mp(b)|0;if((d|0)!=0){e=5165;break}a=(I=c[4048]|0,c[4048]=I+0,I);if((a|0)==0){break}cZ[a&3]()}if((e|0)==5165){return d|0}d=cy(4)|0;c[d>>2]=3744;bK(d|0,10056,36);return 0}function mv(a){a=a|0;return mu(a)|0}function mw(a){a=a|0;if((a|0)==0){return}mq(a);return}function mx(a){a=a|0;mw(a);return}function my(a){a=a|0;mw(a);return}function mz(a){a=a|0;return}function mA(a){a=a|0;return 1392}function mB(){var a=0;a=cy(4)|0;c[a>>2]=3744;bK(a|0,10056,36)}function mC(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0.0,r=0,s=0,t=0,u=0,v=0.0,w=0,x=0,y=0,z=0.0,A=0.0,B=0,C=0,D=0,E=0.0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0.0,O=0,P=0,Q=0.0,R=0.0,S=0.0;e=b;while(1){f=e+1|0;if((aW(a[e]|0)|0)==0){break}else{e=f}}g=a[e]|0;if((g<<24>>24|0)==45){i=f;j=1}else if((g<<24>>24|0)==43){i=f;j=0}else{i=e;j=0}e=-1;f=0;g=i;while(1){k=a[g]|0;if(((k<<24>>24)-48|0)>>>0<10>>>0){l=e}else{if(k<<24>>24!=46|(e|0)>-1){break}else{l=f}}e=l;f=f+1|0;g=g+1|0}l=g+(-f|0)|0;i=(e|0)<0;m=((i^1)<<31>>31)+f|0;n=(m|0)>18;o=(n?-18:-m|0)+(i?f:e)|0;e=n?18:m;do{if((e|0)==0){p=b;q=0.0}else{if((e|0)>9){m=l;n=e;f=0;while(1){i=a[m]|0;r=m+1|0;if(i<<24>>24==46){s=a[r]|0;t=m+2|0}else{s=i;t=r}u=(f*10|0)-48+(s<<24>>24)|0;r=n-1|0;if((r|0)>9){m=t;n=r;f=u}else{break}}v=+(u|0)*1.0e9;w=9;x=t;y=5196}else{if((e|0)>0){v=0.0;w=e;x=l;y=5196}else{z=0.0;A=0.0}}if((y|0)==5196){f=x;n=w;m=0;while(1){r=a[f]|0;i=f+1|0;if(r<<24>>24==46){B=a[i]|0;C=f+2|0}else{B=r;C=i}D=(m*10|0)-48+(B<<24>>24)|0;i=n-1|0;if((i|0)>0){f=C;n=i;m=D}else{break}}z=+(D|0);A=v}E=A+z;do{if((k<<24>>24|0)==69|(k<<24>>24|0)==101){m=g+1|0;n=a[m]|0;if((n<<24>>24|0)==43){F=g+2|0;G=0}else if((n<<24>>24|0)==45){F=g+2|0;G=1}else{F=m;G=0}m=a[F]|0;if(((m<<24>>24)-48|0)>>>0<10>>>0){H=F;I=0;J=m}else{K=0;L=F;M=G;break}while(1){m=(I*10|0)-48+(J<<24>>24)|0;n=H+1|0;f=a[n]|0;if(((f<<24>>24)-48|0)>>>0<10>>>0){H=n;I=m;J=f}else{K=m;L=n;M=G;break}}}else{K=0;L=g;M=0}}while(0);n=o+((M|0)==0?K:-K|0)|0;m=(n|0)<0?-n|0:n;if((m|0)>511){c[(b8()|0)>>2]=34;N=1.0;O=8;P=511;y=5213}else{if((m|0)==0){Q=1.0}else{N=1.0;O=8;P=m;y=5213}}if((y|0)==5213){while(1){y=0;if((P&1|0)==0){R=N}else{R=N*+h[O>>3]}m=P>>1;if((m|0)==0){Q=R;break}else{N=R;O=O+8|0;P=m;y=5213}}}if((n|0)>-1){p=L;q=E*Q;break}else{p=L;q=E/Q;break}}}while(0);if((d|0)!=0){c[d>>2]=p}if((j|0)==0){S=q;return+S}S=-0.0-q;return+S}function mD(a,b,c){a=a|0;b=b|0;c=c|0;return+(+mC(a,b))}function mE(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;f=b|0;if((b&3)==(d&3)){while(b&3){if((e|0)==0)return f|0;a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}while((e|0)>=4){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0;e=e-4|0}}while((e|0)>0){a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}return f|0}function mF(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=b+e|0;if((e|0)>=20){d=d&255;g=b&3;h=d|d<<8|d<<16|d<<24;i=f&~3;if(g){g=b+4-g|0;while((b|0)<(g|0)){a[b]=d;b=b+1|0}}while((b|0)<(i|0)){c[b>>2]=h;b=b+4|0}}while((b|0)<(f|0)){a[b]=d;b=b+1|0}return b-e|0}function mG(b){b=b|0;var c=0;c=b;while(a[c]|0){c=c+1|0}return c-b|0}function mH(b,c,d){b=b|0;c=c|0;d=d|0;var e=0;if((c|0)<(b|0)&(b|0)<(c+d|0)){e=b;c=c+d|0;b=b+d|0;while((d|0)>0){b=b-1|0;c=c-1|0;d=d-1|0;a[b]=a[c]|0}b=e}else{mE(b,c,d)|0}return b|0}function mI(a,b,c){a=a|0;b=b|0;c=c|0;var e=0,f=0,g=0;while((e|0)<(c|0)){f=d[a+e|0]|0;g=d[b+e|0]|0;if((f|0)!=(g|0))return((f|0)>(g|0)?1:-1)|0;e=e+1|0}return 0}function mJ(b){b=b|0;var c=0;c=a[n+(b>>>24)|0]|0;if((c|0)<8)return c|0;c=a[n+(b>>16&255)|0]|0;if((c|0)<8)return c+8|0;c=a[n+(b>>8&255)|0]|0;if((c|0)<8)return c+16|0;return(a[n+(b&255)|0]|0)+24|0}function mK(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=a+c>>>0;return(K=b+d+(e>>>0<a>>>0|0)>>>0,e|0)|0}function mL(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=b-d>>>0;e=b-d-(c>>>0>a>>>0|0)>>>0;return(K=e,a-c>>>0|0)|0}function mM(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){K=b<<c|(a&(1<<c)-1<<32-c)>>>32-c;return a<<c}K=a<<c-32;return 0}function mN(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){K=b>>>c;return a>>>c|(b&(1<<c)-1)<<32-c}K=0;return b>>>c-32|0}function mO(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){K=b>>c;return a>>>c|(b&(1<<c)-1)<<32-c}K=(b|0)<0?-1:0;return b>>c-32|0}function mP(b){b=b|0;var c=0;c=a[m+(b&255)|0]|0;if((c|0)<8)return c|0;c=a[m+(b>>8&255)|0]|0;if((c|0)<8)return c+8|0;c=a[m+(b>>16&255)|0]|0;if((c|0)<8)return c+16|0;return(a[m+(b>>>24)|0]|0)+24|0}function mQ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=a&65535;d=b&65535;e=ag(d,c)|0;f=a>>>16;a=(e>>>16)+(ag(d,f)|0)|0;d=b>>>16;b=ag(d,c)|0;return(K=(a>>>16)+(ag(d,f)|0)+(((a&65535)+b|0)>>>16)|0,a+b<<16|e&65535|0)|0}function mR(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=b>>31|((b|0)<0?-1:0)<<1;f=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;g=d>>31|((d|0)<0?-1:0)<<1;h=((d|0)<0?-1:0)>>31|((d|0)<0?-1:0)<<1;i=mL(e^a,f^b,e,f)|0;b=K;a=g^e;e=h^f;f=mL((mW(i,b,mL(g^c,h^d,g,h)|0,K,0)|0)^a,K^e,a,e)|0;return(K=K,f)|0}function mS(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;i=i+8|0;g=f|0;h=b>>31|((b|0)<0?-1:0)<<1;j=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;k=e>>31|((e|0)<0?-1:0)<<1;l=((e|0)<0?-1:0)>>31|((e|0)<0?-1:0)<<1;m=mL(h^a,j^b,h,j)|0;b=K;a=mL(k^d,l^e,k,l)|0;mW(m,b,a,K,g)|0;a=mL(c[g>>2]^h,c[g+4>>2]^j,h,j)|0;j=K;i=f;return(K=j,a)|0}function mT(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=a;a=c;c=mQ(e,a)|0;f=K;return(K=(ag(b,a)|0)+(ag(d,e)|0)+f|f&0,c|0|0)|0}function mU(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=mW(a,b,c,d,0)|0;return(K=K,e)|0}function mV(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=i;i=i+8|0;g=f|0;mW(a,b,d,e,g)|0;i=f;return(K=c[g+4>>2]|0,c[g>>2]|0)|0}function mW(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,L=0,M=0;g=a;h=b;i=h;j=d;k=e;l=k;if((i|0)==0){m=(f|0)!=0;if((l|0)==0){if(m){c[f>>2]=(g>>>0)%(j>>>0);c[f+4>>2]=0}n=0;o=(g>>>0)/(j>>>0)>>>0;return(K=n,o)|0}else{if(!m){n=0;o=0;return(K=n,o)|0}c[f>>2]=a|0;c[f+4>>2]=b&0;n=0;o=0;return(K=n,o)|0}}m=(l|0)==0;do{if((j|0)==0){if(m){if((f|0)!=0){c[f>>2]=(i>>>0)%(j>>>0);c[f+4>>2]=0}n=0;o=(i>>>0)/(j>>>0)>>>0;return(K=n,o)|0}if((g|0)==0){if((f|0)!=0){c[f>>2]=0;c[f+4>>2]=(i>>>0)%(l>>>0)}n=0;o=(i>>>0)/(l>>>0)>>>0;return(K=n,o)|0}p=l-1|0;if((p&l|0)==0){if((f|0)!=0){c[f>>2]=a|0;c[f+4>>2]=p&i|b&0}n=0;o=i>>>((mP(l|0)|0)>>>0);return(K=n,o)|0}p=(mJ(l|0)|0)-(mJ(i|0)|0)|0;if(p>>>0<=30){q=p+1|0;r=31-p|0;s=q;t=i<<r|g>>>(q>>>0);u=i>>>(q>>>0);v=0;w=g<<r;break}if((f|0)==0){n=0;o=0;return(K=n,o)|0}c[f>>2]=a|0;c[f+4>>2]=h|b&0;n=0;o=0;return(K=n,o)|0}else{if(!m){r=(mJ(l|0)|0)-(mJ(i|0)|0)|0;if(r>>>0<=31){q=r+1|0;p=31-r|0;x=r-31>>31;s=q;t=g>>>(q>>>0)&x|i<<p;u=i>>>(q>>>0)&x;v=0;w=g<<p;break}if((f|0)==0){n=0;o=0;return(K=n,o)|0}c[f>>2]=a|0;c[f+4>>2]=h|b&0;n=0;o=0;return(K=n,o)|0}p=j-1|0;if((p&j|0)!=0){x=(mJ(j|0)|0)+33-(mJ(i|0)|0)|0;q=64-x|0;r=32-x|0;y=r>>31;z=x-32|0;A=z>>31;s=x;t=r-1>>31&i>>>(z>>>0)|(i<<r|g>>>(x>>>0))&A;u=A&i>>>(x>>>0);v=g<<q&y;w=(i<<q|g>>>(z>>>0))&y|g<<r&x-33>>31;break}if((f|0)!=0){c[f>>2]=p&g;c[f+4>>2]=0}if((j|0)==1){n=h|b&0;o=a|0|0;return(K=n,o)|0}else{p=mP(j|0)|0;n=i>>>(p>>>0)|0;o=i<<32-p|g>>>(p>>>0)|0;return(K=n,o)|0}}}while(0);if((s|0)==0){B=w;C=v;D=u;E=t;F=0;G=0}else{g=d|0|0;d=k|e&0;e=mK(g,d,-1,-1)|0;k=K;i=w;w=v;v=u;u=t;t=s;s=0;while(1){H=w>>>31|i<<1;I=s|w<<1;j=u<<1|i>>>31|0;a=u>>>31|v<<1|0;mL(e,k,j,a)|0;b=K;h=b>>31|((b|0)<0?-1:0)<<1;J=h&1;L=mL(j,a,h&g,(((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1)&d)|0;M=K;b=t-1|0;if((b|0)==0){break}else{i=H;w=I;v=M;u=L;t=b;s=J}}B=H;C=I;D=M;E=L;F=0;G=J}J=C;C=0;if((f|0)!=0){c[f>>2]=E;c[f+4>>2]=D}n=(J|0)>>>31|(B|C)<<1|(C<<1|J>>>31)&0|F;o=(J<<1|0>>>31)&-2|G;return(K=n,o)|0}function mX(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;cP[a&7](b|0,c|0,d|0,e|0,f|0)}function mY(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;cQ[a&7](b|0,c|0,d|0)}function mZ(a,b){a=a|0;b=b|0;cR[a&511](b|0)}function m_(a,b,c){a=a|0;b=b|0;c=c|0;cS[a&127](b|0,c|0)}function m$(a,b,c){a=a|0;b=b|0;c=c|0;return cT[a&63](b|0,c|0)|0}function m0(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return cU[a&63](b|0,c|0,d|0)|0}function m1(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=+h;cV[a&7](b|0,c|0,d|0,e|0,f|0,g|0,+h)}function m2(a,b){a=a|0;b=b|0;return cW[a&255](b|0)|0}function m3(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;cX[a&127](b|0,c|0,d|0,e|0,f|0,g|0,h|0)}function m4(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=+g;cY[a&15](b|0,c|0,d|0,e|0,f|0,+g)}function m5(a){a=a|0;cZ[a&3]()}function m6(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;return c_[a&31](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0)|0}function m7(a,b,c,d,e,f,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;c$[a&7](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0,j|0)}function m8(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;c0[a&15](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0)}function m9(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;c1[a&63](b|0,c|0,d|0,e|0,f|0,g|0)}function na(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return c2[a&15](b|0,c|0,d|0,e|0)|0}function nb(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return c3[a&31](b|0,c|0,d|0,e|0,f|0)|0}function nc(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;c4[a&31](b|0,c|0,d|0,e|0)}function nd(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;ah(0)}function ne(a,b,c){a=a|0;b=b|0;c=c|0;ah(1)}function nf(a){a=a|0;ah(2)}function ng(a,b){a=a|0;b=b|0;ah(3)}function nh(a,b){a=a|0;b=b|0;ah(4);return 0}function ni(a,b,c){a=a|0;b=b|0;c=c|0;ah(5);return 0}function nj(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=+g;ah(6)}function nk(a){a=a|0;ah(7);return 0}function nl(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;ah(8)}function nm(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=+f;ah(9)}function nn(){ah(10)}function no(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;ah(11);return 0}function np(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;ah(12)}function nq(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;ah(13)}function nr(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;ah(14)}function ns(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;ah(15);return 0}function nt(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;ah(16);return 0}function nu(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;ah(17)}
// EMSCRIPTEN_END_FUNCS
var cP=[nd,nd,mk,nd,ml,nd,mj,nd];var cQ=[ne,ne,e3,ne,gw,ne,ne,ne];var cR=[nf,nf,jT,nf,gN,nf,hT,nf,e0,nf,fE,nf,jY,nf,ka,nf,eI,nf,ev,nf,hE,nf,eU,nf,e1,nf,e_,nf,ha,nf,gD,nf,gz,nf,dH,nf,mz,nf,eV,nf,j8,nf,ko,nf,e_,nf,ik,nf,hb,nf,l4,nf,gr,nf,jP,nf,d9,nf,dv,nf,j9,nf,ed,nf,f5,nf,gO,nf,i_,nf,j1,nf,ea,nf,lb,nf,l9,nf,dJ,nf,la,nf,gx,nf,e_,nf,gJ,nf,iF,nf,ld,nf,kb,nf,mq,nf,kO,nf,mb,nf,jI,nf,k9,nf,ge,nf,eu,nf,dU,nf,gI,nf,iA,nf,eV,nf,lL,nf,hF,nf,kZ,nf,dG,nf,i$,nf,f4,nf,gl,nf,ix,nf,ij,nf,gA,nf,iP,nf,my,nf,fD,nf,lO,nf,lP,nf,j0,nf,gs,nf,fS,nf,ky,nf,l6,nf,f6,nf,gy,nf,jk,nf,em,nf,i9,nf,gt,nf,j5,nf,lR,nf,ma,nf,eB,nf,dD,nf,dV,nf,iy,nf,jv,nf,l5,nf,k8,nf,jn,nf,jJ,nf,lQ,nf,iE,nf,hS,nf,gC,nf,dF,nf,gE,nf,gg,nf,e9,nf,kG,nf,jC,nf,ju,nf,lc,nf,fs,nf,l6,nf,md,nf,gk,nf,eb,nf,dY,nf,ec,nf,fa,nf,f3,nf,eC,nf,gq,nf,jO,nf,dE,nf,ee,nf,fA,nf,gj,nf,eJ,nf,j3,nf,gB,nf,ja,nf,h4,nf,iQ,nf,eo,nf,gf,nf,fR,nf,gi,nf,lN,nf,h5,nf,mc,nf,jU,nf,en,nf,l8,nf,iB,nf,jD,nf,jl,nf,d8,nf,fh,nf,kp,nf,eZ,nf,gd,nf,lS,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf,nf];var cS=[ng,ng,lm,ng,dt,ng,jf,ng,iT,ng,lj,ng,i8,ng,li,ng,iZ,ng,ep,ng,jS,ng,fT,ng,iL,ng,ji,ng,i5,ng,iK,ng,iI,ng,jg,ng,j4,ng,jd,ng,eD,ng,ew,ng,jj,ng,ll,ng,dK,ng,iU,ng,eY,ng,du,ng,ln,ng,i7,ng,iW,ng,lk,ng,iY,ng,fF,ng,jX,ng,eK,ng,i2,ng,dx,ng,iO,ng,iN,ng,iJ,ng,i3,ng,i4,ng,dw,ng,je,ng,iV,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng,ng];var cT=[nh,nh,eN,nh,kk,nh,f0,nh,ku,nh,kq,nh,ez,nh,eG,nh,kg,nh,ej,nh,dQ,nh,ks,nh,fQ,nh,f2,nh,ki,nh,ei,nh,dR,nh,fO,nh,es,nh,nh,nh,nh,nh,nh,nh,nh,nh,nh,nh,nh,nh,nh,nh,nh,nh,nh,nh,nh,nh,nh,nh,nh,nh,nh,nh];var cU=[ni,ni,f1,ni,gH,ni,kr,ni,kj,ni,me,ni,jQ,ni,km,ni,gM,ni,e4,ni,fP,ni,fL,ni,kc,ni,fU,ni,jV,ni,kw,ni,dL,ni,kh,ni,er,ni,fZ,ni,e5,ni,kt,ni,fG,ni,eF,ni,ni,ni,ni,ni,ni,ni,ni,ni,ni,ni,ni,ni,ni,ni,ni,ni];var cV=[nj,nj,jK,nj,jE,nj,nj,nj];var cW=[nk,nk,lB,nk,i1,nk,fM,nk,kD,nk,lr,nk,fN,nk,lz,nk,iR,nk,h6,nk,lp,nk,eM,nk,f$,nk,f_,nk,k3,nk,lv,nk,lt,nk,l7,nk,e$,nk,lh,nk,le,nk,lu,nk,dO,nk,lf,nk,fJ,nk,kC,nk,jh,nk,lw,nk,eq,nk,iS,nk,kV,nk,jb,nk,lo,nk,ex,nk,k4,nk,mA,nk,gv,nk,iM,nk,ey,nk,lg,nk,fK,nk,fX,nk,eE,nk,dP,nk,kF,nk,iX,nk,lA,nk,eL,nk,kU,nk,kL,nk,fY,nk,iG,nk,lq,nk,iH,nk,eW,nk,i0,nk,kN,nk,i6,nk,ls,nk,jc,nk,kK,nk,il,nk,eh,nk,ly,nk,lx,nk,kY,nk,k7,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk,nk];var cX=[nl,nl,ib,nl,im,nl,ip,nl,jN,nl,h_,nl,hY,nl,jH,nl,h7,nl,ia,nl,iq,nl,hM,nl,hw,nl,h9,nl,hk,nl,io,nl,hK,nl,ho,nl,hg,nl,hi,nl,g7,nl,hm,nl,he,nl,hc,nl,hu,nl,hs,nl,hq,nl,ir,nl,gX,nl,h8,nl,g$,nl,gT,nl,gV,nl,gZ,nl,gR,nl,g5,nl,g3,nl,g1,nl,gP,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl,nl];var cY=[nm,nm,h1,nm,h$,nm,hQ,nm,hN,nm,nm,nm,nm,nm,nm,nm];var cZ=[nn,nn,dy,nn];var c_=[no,no,kH,no,kR,no,kP,no,k0,no,kI,no,k_,no,kz,no,kA,no,no,no,no,no,no,no,no,no,no,no,no,no,no,no];var c$=[np,np,is,np,ic,np,np,np];var c0=[nq,nq,iC,nq,iz,nq,jm,nq,jw,nq,jq,nq,jy,nq,nq,nq];var c1=[nr,nr,mm,nr,hZ,nr,hV,nr,hU,nr,mn,nr,h2,nr,jR,nr,fV,nr,dM,nr,hR,nr,hG,nr,hL,nr,hH,nr,ef,nr,mo,nr,fH,nr,jW,nr,nr,nr,nr,nr,nr,nr,nr,nr,nr,nr,nr,nr,nr,nr,nr,nr,nr,nr,nr,nr,nr,nr,nr,nr,nr,nr,nr,nr];var c2=[ns,ns,kd,ns,ke,ns,kv,ns,kl,ns,kf,ns,ns,ns,ns,ns];var c3=[nt,nt,kn,nt,kT,nt,gK,nt,k5,nt,kW,nt,kx,nt,kJ,nt,gF,nt,kB,nt,kE,nt,k2,nt,kM,nt,nt,nt,nt,nt,nt,nt];var c4=[nu,nu,eg,nu,dN,nu,mg,nu,mh,nu,mf,nu,fI,nu,gL,nu,fW,nu,gG,nu,nu,nu,nu,nu,nu,nu,nu,nu,nu,nu,nu,nu];return{_memcmp:mI,_strlen:mG,_free:mq,_main:dz,_realloc:mr,_memmove:mH,__GLOBAL__I_a:eP,_memset:mF,_malloc:mp,_memcpy:mE,_llvm_ctlz_i32:mJ,_setAppValue:dm,runPostSets:dl,stackAlloc:c5,stackSave:c6,stackRestore:c7,setThrew:c8,setTempRet0:db,setTempRet1:dc,setTempRet2:dd,setTempRet3:de,setTempRet4:df,setTempRet5:dg,setTempRet6:dh,setTempRet7:di,setTempRet8:dj,setTempRet9:dk,dynCall_viiiii:mX,dynCall_viii:mY,dynCall_vi:mZ,dynCall_vii:m_,dynCall_iii:m$,dynCall_iiii:m0,dynCall_viiiiiid:m1,dynCall_ii:m2,dynCall_viiiiiii:m3,dynCall_viiiiid:m4,dynCall_v:m5,dynCall_iiiiiiiii:m6,dynCall_viiiiiiiii:m7,dynCall_viiiiiiii:m8,dynCall_viiiiii:m9,dynCall_iiiii:na,dynCall_iiiiii:nb,dynCall_viiii:nc}})
// EMSCRIPTEN_END_ASM
({ "Math": Math, "Int8Array": Int8Array, "Int16Array": Int16Array, "Int32Array": Int32Array, "Uint8Array": Uint8Array, "Uint16Array": Uint16Array, "Uint32Array": Uint32Array, "Float32Array": Float32Array, "Float64Array": Float64Array }, { "abort": abort, "assert": assert, "asmPrintInt": asmPrintInt, "asmPrintFloat": asmPrintFloat, "min": Math_min, "invoke_viiiii": invoke_viiiii, "invoke_viii": invoke_viii, "invoke_vi": invoke_vi, "invoke_vii": invoke_vii, "invoke_iii": invoke_iii, "invoke_iiii": invoke_iiii, "invoke_viiiiiid": invoke_viiiiiid, "invoke_ii": invoke_ii, "invoke_viiiiiii": invoke_viiiiiii, "invoke_viiiiid": invoke_viiiiid, "invoke_v": invoke_v, "invoke_iiiiiiiii": invoke_iiiiiiiii, "invoke_viiiiiiiii": invoke_viiiiiiiii, "invoke_viiiiiiii": invoke_viiiiiiii, "invoke_viiiiii": invoke_viiiiii, "invoke_iiiii": invoke_iiiii, "invoke_iiiiii": invoke_iiiiii, "invoke_viiii": invoke_viiii, "_llvm_lifetime_end": _llvm_lifetime_end, "_lseek": _lseek, "_glClearColor": _glClearColor, "_sysconf": _sysconf, "__scanString": __scanString, "_fclose": _fclose, "_pthread_mutex_lock": _pthread_mutex_lock, "___cxa_end_catch": ___cxa_end_catch, "_glfwSetMouseWheelCallback": _glfwSetMouseWheelCallback, "_strtoull": _strtoull, "_glBindTexture": _glBindTexture, "_fflush": _fflush, "__isLeapYear": __isLeapYear, "_glGetString": _glGetString, "_fwrite": _fwrite, "_llvm_eh_exception": _llvm_eh_exception, "_glUniform2fv": _glUniform2fv, "_glCompileShader": _glCompileShader, "_isspace": _isspace, "_read": _read, "_glfwSetWindowTitle": _glfwSetWindowTitle, "_glfwSetMousePosCallback": _glfwSetMousePosCallback, "_fsync": _fsync, "_glGenTextures": _glGenTextures, "_newlocale": _newlocale, "___gxx_personality_v0": ___gxx_personality_v0, "_pthread_cond_wait": _pthread_cond_wait, "___cxa_rethrow": ___cxa_rethrow, "___resumeException": ___resumeException, "_glCreateShader": _glCreateShader, "_glUniform1i": _glUniform1i, "_llvm_va_end": _llvm_va_end, "_vsscanf": _vsscanf, "_glLinkProgram": _glLinkProgram, "_glDisable": _glDisable, "_fgetc": _fgetc, "_glGetProgramiv": _glGetProgramiv, "_glVertexAttribPointer": _glVertexAttribPointer, "__getFloat": __getFloat, "_atexit": _atexit, "_glGetIntegerv": _glGetIntegerv, "___cxa_free_exception": ___cxa_free_exception, "_glGetUniformLocation": _glGetUniformLocation, "_close": _close, "_glBindFramebuffer": _glBindFramebuffer, "___setErrNo": ___setErrNo, "___cxa_guard_abort": ___cxa_guard_abort, "_isxdigit": _isxdigit, "_ftell": _ftell, "_exit": _exit, "_sprintf": _sprintf, "___ctype_b_loc": ___ctype_b_loc, "_freelocale": _freelocale, "_glAttachShader": _glAttachShader, "_catgets": _catgets, "_glCheckFramebufferStatus": _glCheckFramebufferStatus, "_asprintf": _asprintf, "___cxa_is_number_type": ___cxa_is_number_type, "___cxa_does_inherit": ___cxa_does_inherit, "___cxa_guard_acquire": ___cxa_guard_acquire, "_glBindAttribLocation": _glBindAttribLocation, "___cxa_begin_catch": ___cxa_begin_catch, "_glfwTerminate": _glfwTerminate, "_recv": _recv, "__parseInt64": __parseInt64, "__ZSt18uncaught_exceptionv": __ZSt18uncaught_exceptionv, "___cxa_call_unexpected": ___cxa_call_unexpected, "_glGetShaderiv": _glGetShaderiv, "__exit": __exit, "_strftime": _strftime, "___cxa_throw": ___cxa_throw, "_glUseProgram": _glUseProgram, "_send": _send, "_glShaderSource": _glShaderSource, "_pread": _pread, "_fopen": _fopen, "_open": _open, "_glDrawArrays": _glDrawArrays, "__arraySum": __arraySum, "_snprintf": _snprintf, "_glClear": _glClear, "_glfwSetCharCallback": _glfwSetCharCallback, "_glActiveTexture": _glActiveTexture, "_glEnableVertexAttribArray": _glEnableVertexAttribArray, "_glBindBuffer": _glBindBuffer, "___cxa_find_matching_catch": ___cxa_find_matching_catch, "_glFramebufferTexture2D": _glFramebufferTexture2D, "_glfwOpenWindow": _glfwOpenWindow, "_glBufferData": _glBufferData, "__formatString": __formatString, "_pthread_cond_broadcast": _pthread_cond_broadcast, "_glGetError": _glGetError, "_isascii": _isascii, "_pthread_mutex_unlock": _pthread_mutex_unlock, "_glGenFramebuffers": _glGenFramebuffers, "_sbrk": _sbrk, "___errno_location": ___errno_location, "_strerror": _strerror, "_glfwInit": _glfwInit, "_catclose": _catclose, "_llvm_lifetime_start": _llvm_lifetime_start, "___cxa_guard_release": ___cxa_guard_release, "_ungetc": _ungetc, "_uselocale": _uselocale, "_vsnprintf": _vsnprintf, "_glDisableVertexAttribArray": _glDisableVertexAttribArray, "_sscanf": _sscanf, "_glTexImage2D": _glTexImage2D, "___assert_fail": ___assert_fail, "_glfwGetWindowSize": _glfwGetWindowSize, "_fread": _fread, "_glGetShaderInfoLog": _glGetShaderInfoLog, "_abort": _abort, "_isdigit": _isdigit, "_strtoll": _strtoll, "_glfwOpenWindowHint": _glfwOpenWindowHint, "_emscripten_asm_const": _emscripten_asm_const, "__reallyNegative": __reallyNegative, "_fseek": _fseek, "__addDays": __addDays, "_write": _write, "_glGenBuffers": _glGenBuffers, "___cxa_allocate_exception": ___cxa_allocate_exception, "_glCreateProgram": _glCreateProgram, "_ceilf": _ceilf, "_vasprintf": _vasprintf, "_glViewport": _glViewport, "_emscripten_set_main_loop": _emscripten_set_main_loop, "_catopen": _catopen, "___ctype_toupper_loc": ___ctype_toupper_loc, "___ctype_tolower_loc": ___ctype_tolower_loc, "_pwrite": _pwrite, "__ZSt9terminatev": __ZSt9terminatev, "_strerror_r": _strerror_r, "_glTexParameteri": _glTexParameteri, "_glfwSetKeyCallback": _glfwSetKeyCallback, "_glfwSetMouseButtonCallback": _glfwSetMouseButtonCallback, "_time": _time, "STACKTOP": STACKTOP, "STACK_MAX": STACK_MAX, "tempDoublePtr": tempDoublePtr, "ABORT": ABORT, "cttz_i8": cttz_i8, "ctlz_i8": ctlz_i8, "NaN": NaN, "Infinity": Infinity, "_stdin": _stdin, "__ZTVN10__cxxabiv120__si_class_type_infoE": __ZTVN10__cxxabiv120__si_class_type_infoE, "_stderr": _stderr, "___fsmu8": ___fsmu8, "_stdout": _stdout, "___dso_handle": ___dso_handle, "__ZTVN10__cxxabiv117__class_type_infoE": __ZTVN10__cxxabiv117__class_type_infoE }, buffer);
var _memcmp = Module["_memcmp"] = asm["_memcmp"];
var _strlen = Module["_strlen"] = asm["_strlen"];
var _free = Module["_free"] = asm["_free"];
var _main = Module["_main"] = asm["_main"];
var _realloc = Module["_realloc"] = asm["_realloc"];
var _memmove = Module["_memmove"] = asm["_memmove"];
var __GLOBAL__I_a = Module["__GLOBAL__I_a"] = asm["__GLOBAL__I_a"];
var _memset = Module["_memset"] = asm["_memset"];
var _malloc = Module["_malloc"] = asm["_malloc"];
var _memcpy = Module["_memcpy"] = asm["_memcpy"];
var _llvm_ctlz_i32 = Module["_llvm_ctlz_i32"] = asm["_llvm_ctlz_i32"];
var _setAppValue = Module["_setAppValue"] = asm["_setAppValue"];
var runPostSets = Module["runPostSets"] = asm["runPostSets"];
var dynCall_viiiii = Module["dynCall_viiiii"] = asm["dynCall_viiiii"];
var dynCall_viii = Module["dynCall_viii"] = asm["dynCall_viii"];
var dynCall_vi = Module["dynCall_vi"] = asm["dynCall_vi"];
var dynCall_vii = Module["dynCall_vii"] = asm["dynCall_vii"];
var dynCall_iii = Module["dynCall_iii"] = asm["dynCall_iii"];
var dynCall_iiii = Module["dynCall_iiii"] = asm["dynCall_iiii"];
var dynCall_viiiiiid = Module["dynCall_viiiiiid"] = asm["dynCall_viiiiiid"];
var dynCall_ii = Module["dynCall_ii"] = asm["dynCall_ii"];
var dynCall_viiiiiii = Module["dynCall_viiiiiii"] = asm["dynCall_viiiiiii"];
var dynCall_viiiiid = Module["dynCall_viiiiid"] = asm["dynCall_viiiiid"];
var dynCall_v = Module["dynCall_v"] = asm["dynCall_v"];
var dynCall_iiiiiiiii = Module["dynCall_iiiiiiiii"] = asm["dynCall_iiiiiiiii"];
var dynCall_viiiiiiiii = Module["dynCall_viiiiiiiii"] = asm["dynCall_viiiiiiiii"];
var dynCall_viiiiiiii = Module["dynCall_viiiiiiii"] = asm["dynCall_viiiiiiii"];
var dynCall_viiiiii = Module["dynCall_viiiiii"] = asm["dynCall_viiiiii"];
var dynCall_iiiii = Module["dynCall_iiiii"] = asm["dynCall_iiiii"];
var dynCall_iiiiii = Module["dynCall_iiiiii"] = asm["dynCall_iiiiii"];
var dynCall_viiii = Module["dynCall_viiii"] = asm["dynCall_viiii"];
Runtime.stackAlloc = function(size) { return asm['stackAlloc'](size) };
Runtime.stackSave = function() { return asm['stackSave']() };
Runtime.stackRestore = function(top) { asm['stackRestore'](top) };
// TODO: strip out parts of this we do not need
//======= begin closure i64 code =======
// Copyright 2009 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * @fileoverview Defines a Long class for representing a 64-bit two's-complement
 * integer value, which faithfully simulates the behavior of a Java "long". This
 * implementation is derived from LongLib in GWT.
 *
 */
var i64Math = (function() { // Emscripten wrapper
  var goog = { math: {} };
  /**
   * Constructs a 64-bit two's-complement integer, given its low and high 32-bit
   * values as *signed* integers.  See the from* functions below for more
   * convenient ways of constructing Longs.
   *
   * The internal representation of a long is the two given signed, 32-bit values.
   * We use 32-bit pieces because these are the size of integers on which
   * Javascript performs bit-operations.  For operations like addition and
   * multiplication, we split each number into 16-bit pieces, which can easily be
   * multiplied within Javascript's floating-point representation without overflow
   * or change in sign.
   *
   * In the algorithms below, we frequently reduce the negative case to the
   * positive case by negating the input(s) and then post-processing the result.
   * Note that we must ALWAYS check specially whether those values are MIN_VALUE
   * (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
   * a positive number, it overflows back into a negative).  Not handling this
   * case would often result in infinite recursion.
   *
   * @param {number} low  The low (signed) 32 bits of the long.
   * @param {number} high  The high (signed) 32 bits of the long.
   * @constructor
   */
  goog.math.Long = function(low, high) {
    /**
     * @type {number}
     * @private
     */
    this.low_ = low | 0;  // force into 32 signed bits.
    /**
     * @type {number}
     * @private
     */
    this.high_ = high | 0;  // force into 32 signed bits.
  };
  // NOTE: Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the
  // from* methods on which they depend.
  /**
   * A cache of the Long representations of small integer values.
   * @type {!Object}
   * @private
   */
  goog.math.Long.IntCache_ = {};
  /**
   * Returns a Long representing the given (32-bit) integer value.
   * @param {number} value The 32-bit integer in question.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromInt = function(value) {
    if (-128 <= value && value < 128) {
      var cachedObj = goog.math.Long.IntCache_[value];
      if (cachedObj) {
        return cachedObj;
      }
    }
    var obj = new goog.math.Long(value | 0, value < 0 ? -1 : 0);
    if (-128 <= value && value < 128) {
      goog.math.Long.IntCache_[value] = obj;
    }
    return obj;
  };
  /**
   * Returns a Long representing the given value, provided that it is a finite
   * number.  Otherwise, zero is returned.
   * @param {number} value The number in question.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromNumber = function(value) {
    if (isNaN(value) || !isFinite(value)) {
      return goog.math.Long.ZERO;
    } else if (value <= -goog.math.Long.TWO_PWR_63_DBL_) {
      return goog.math.Long.MIN_VALUE;
    } else if (value + 1 >= goog.math.Long.TWO_PWR_63_DBL_) {
      return goog.math.Long.MAX_VALUE;
    } else if (value < 0) {
      return goog.math.Long.fromNumber(-value).negate();
    } else {
      return new goog.math.Long(
          (value % goog.math.Long.TWO_PWR_32_DBL_) | 0,
          (value / goog.math.Long.TWO_PWR_32_DBL_) | 0);
    }
  };
  /**
   * Returns a Long representing the 64-bit integer that comes by concatenating
   * the given high and low bits.  Each is assumed to use 32 bits.
   * @param {number} lowBits The low 32-bits.
   * @param {number} highBits The high 32-bits.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromBits = function(lowBits, highBits) {
    return new goog.math.Long(lowBits, highBits);
  };
  /**
   * Returns a Long representation of the given string, written using the given
   * radix.
   * @param {string} str The textual representation of the Long.
   * @param {number=} opt_radix The radix in which the text is written.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromString = function(str, opt_radix) {
    if (str.length == 0) {
      throw Error('number format error: empty string');
    }
    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
      throw Error('radix out of range: ' + radix);
    }
    if (str.charAt(0) == '-') {
      return goog.math.Long.fromString(str.substring(1), radix).negate();
    } else if (str.indexOf('-') >= 0) {
      throw Error('number format error: interior "-" character: ' + str);
    }
    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 8));
    var result = goog.math.Long.ZERO;
    for (var i = 0; i < str.length; i += 8) {
      var size = Math.min(8, str.length - i);
      var value = parseInt(str.substring(i, i + size), radix);
      if (size < 8) {
        var power = goog.math.Long.fromNumber(Math.pow(radix, size));
        result = result.multiply(power).add(goog.math.Long.fromNumber(value));
      } else {
        result = result.multiply(radixToPower);
        result = result.add(goog.math.Long.fromNumber(value));
      }
    }
    return result;
  };
  // NOTE: the compiler should inline these constant values below and then remove
  // these variables, so there should be no runtime penalty for these.
  /**
   * Number used repeated below in calculations.  This must appear before the
   * first call to any from* function below.
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_16_DBL_ = 1 << 16;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_24_DBL_ = 1 << 24;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_32_DBL_ =
      goog.math.Long.TWO_PWR_16_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_31_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ / 2;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_48_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_64_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_32_DBL_;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_63_DBL_ =
      goog.math.Long.TWO_PWR_64_DBL_ / 2;
  /** @type {!goog.math.Long} */
  goog.math.Long.ZERO = goog.math.Long.fromInt(0);
  /** @type {!goog.math.Long} */
  goog.math.Long.ONE = goog.math.Long.fromInt(1);
  /** @type {!goog.math.Long} */
  goog.math.Long.NEG_ONE = goog.math.Long.fromInt(-1);
  /** @type {!goog.math.Long} */
  goog.math.Long.MAX_VALUE =
      goog.math.Long.fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0);
  /** @type {!goog.math.Long} */
  goog.math.Long.MIN_VALUE = goog.math.Long.fromBits(0, 0x80000000 | 0);
  /**
   * @type {!goog.math.Long}
   * @private
   */
  goog.math.Long.TWO_PWR_24_ = goog.math.Long.fromInt(1 << 24);
  /** @return {number} The value, assuming it is a 32-bit integer. */
  goog.math.Long.prototype.toInt = function() {
    return this.low_;
  };
  /** @return {number} The closest floating-point representation to this value. */
  goog.math.Long.prototype.toNumber = function() {
    return this.high_ * goog.math.Long.TWO_PWR_32_DBL_ +
           this.getLowBitsUnsigned();
  };
  /**
   * @param {number=} opt_radix The radix in which the text should be written.
   * @return {string} The textual representation of this value.
   */
  goog.math.Long.prototype.toString = function(opt_radix) {
    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
      throw Error('radix out of range: ' + radix);
    }
    if (this.isZero()) {
      return '0';
    }
    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        // We need to change the Long value before it can be negated, so we remove
        // the bottom-most digit in this base and then recurse to do the rest.
        var radixLong = goog.math.Long.fromNumber(radix);
        var div = this.div(radixLong);
        var rem = div.multiply(radixLong).subtract(this);
        return div.toString(radix) + rem.toInt().toString(radix);
      } else {
        return '-' + this.negate().toString(radix);
      }
    }
    // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 6));
    var rem = this;
    var result = '';
    while (true) {
      var remDiv = rem.div(radixToPower);
      var intval = rem.subtract(remDiv.multiply(radixToPower)).toInt();
      var digits = intval.toString(radix);
      rem = remDiv;
      if (rem.isZero()) {
        return digits + result;
      } else {
        while (digits.length < 6) {
          digits = '0' + digits;
        }
        result = '' + digits + result;
      }
    }
  };
  /** @return {number} The high 32-bits as a signed value. */
  goog.math.Long.prototype.getHighBits = function() {
    return this.high_;
  };
  /** @return {number} The low 32-bits as a signed value. */
  goog.math.Long.prototype.getLowBits = function() {
    return this.low_;
  };
  /** @return {number} The low 32-bits as an unsigned value. */
  goog.math.Long.prototype.getLowBitsUnsigned = function() {
    return (this.low_ >= 0) ?
        this.low_ : goog.math.Long.TWO_PWR_32_DBL_ + this.low_;
  };
  /**
   * @return {number} Returns the number of bits needed to represent the absolute
   *     value of this Long.
   */
  goog.math.Long.prototype.getNumBitsAbs = function() {
    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        return 64;
      } else {
        return this.negate().getNumBitsAbs();
      }
    } else {
      var val = this.high_ != 0 ? this.high_ : this.low_;
      for (var bit = 31; bit > 0; bit--) {
        if ((val & (1 << bit)) != 0) {
          break;
        }
      }
      return this.high_ != 0 ? bit + 33 : bit + 1;
    }
  };
  /** @return {boolean} Whether this value is zero. */
  goog.math.Long.prototype.isZero = function() {
    return this.high_ == 0 && this.low_ == 0;
  };
  /** @return {boolean} Whether this value is negative. */
  goog.math.Long.prototype.isNegative = function() {
    return this.high_ < 0;
  };
  /** @return {boolean} Whether this value is odd. */
  goog.math.Long.prototype.isOdd = function() {
    return (this.low_ & 1) == 1;
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long equals the other.
   */
  goog.math.Long.prototype.equals = function(other) {
    return (this.high_ == other.high_) && (this.low_ == other.low_);
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long does not equal the other.
   */
  goog.math.Long.prototype.notEquals = function(other) {
    return (this.high_ != other.high_) || (this.low_ != other.low_);
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is less than the other.
   */
  goog.math.Long.prototype.lessThan = function(other) {
    return this.compare(other) < 0;
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is less than or equal to the other.
   */
  goog.math.Long.prototype.lessThanOrEqual = function(other) {
    return this.compare(other) <= 0;
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is greater than the other.
   */
  goog.math.Long.prototype.greaterThan = function(other) {
    return this.compare(other) > 0;
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is greater than or equal to the other.
   */
  goog.math.Long.prototype.greaterThanOrEqual = function(other) {
    return this.compare(other) >= 0;
  };
  /**
   * Compares this Long with the given one.
   * @param {goog.math.Long} other Long to compare against.
   * @return {number} 0 if they are the same, 1 if the this is greater, and -1
   *     if the given one is greater.
   */
  goog.math.Long.prototype.compare = function(other) {
    if (this.equals(other)) {
      return 0;
    }
    var thisNeg = this.isNegative();
    var otherNeg = other.isNegative();
    if (thisNeg && !otherNeg) {
      return -1;
    }
    if (!thisNeg && otherNeg) {
      return 1;
    }
    // at this point, the signs are the same, so subtraction will not overflow
    if (this.subtract(other).isNegative()) {
      return -1;
    } else {
      return 1;
    }
  };
  /** @return {!goog.math.Long} The negation of this value. */
  goog.math.Long.prototype.negate = function() {
    if (this.equals(goog.math.Long.MIN_VALUE)) {
      return goog.math.Long.MIN_VALUE;
    } else {
      return this.not().add(goog.math.Long.ONE);
    }
  };
  /**
   * Returns the sum of this and the given Long.
   * @param {goog.math.Long} other Long to add to this one.
   * @return {!goog.math.Long} The sum of this and the given Long.
   */
  goog.math.Long.prototype.add = function(other) {
    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.
    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 0xFFFF;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 0xFFFF;
    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 0xFFFF;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 0xFFFF;
    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
  };
  /**
   * Returns the difference of this and the given Long.
   * @param {goog.math.Long} other Long to subtract from this.
   * @return {!goog.math.Long} The difference of this and the given Long.
   */
  goog.math.Long.prototype.subtract = function(other) {
    return this.add(other.negate());
  };
  /**
   * Returns the product of this and the given long.
   * @param {goog.math.Long} other Long to multiply with this.
   * @return {!goog.math.Long} The product of this and the other.
   */
  goog.math.Long.prototype.multiply = function(other) {
    if (this.isZero()) {
      return goog.math.Long.ZERO;
    } else if (other.isZero()) {
      return goog.math.Long.ZERO;
    }
    if (this.equals(goog.math.Long.MIN_VALUE)) {
      return other.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
      return this.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    }
    if (this.isNegative()) {
      if (other.isNegative()) {
        return this.negate().multiply(other.negate());
      } else {
        return this.negate().multiply(other).negate();
      }
    } else if (other.isNegative()) {
      return this.multiply(other.negate()).negate();
    }
    // If both longs are small, use float multiplication
    if (this.lessThan(goog.math.Long.TWO_PWR_24_) &&
        other.lessThan(goog.math.Long.TWO_PWR_24_)) {
      return goog.math.Long.fromNumber(this.toNumber() * other.toNumber());
    }
    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.
    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 0xFFFF;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 0xFFFF;
    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 0xFFFF;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 0xFFFF;
    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
  };
  /**
   * Returns this Long divided by the given one.
   * @param {goog.math.Long} other Long by which to divide.
   * @return {!goog.math.Long} This Long divided by the given one.
   */
  goog.math.Long.prototype.div = function(other) {
    if (other.isZero()) {
      throw Error('division by zero');
    } else if (this.isZero()) {
      return goog.math.Long.ZERO;
    }
    if (this.equals(goog.math.Long.MIN_VALUE)) {
      if (other.equals(goog.math.Long.ONE) ||
          other.equals(goog.math.Long.NEG_ONE)) {
        return goog.math.Long.MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
      } else if (other.equals(goog.math.Long.MIN_VALUE)) {
        return goog.math.Long.ONE;
      } else {
        // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
        var halfThis = this.shiftRight(1);
        var approx = halfThis.div(other).shiftLeft(1);
        if (approx.equals(goog.math.Long.ZERO)) {
          return other.isNegative() ? goog.math.Long.ONE : goog.math.Long.NEG_ONE;
        } else {
          var rem = this.subtract(other.multiply(approx));
          var result = approx.add(rem.div(other));
          return result;
        }
      }
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
      return goog.math.Long.ZERO;
    }
    if (this.isNegative()) {
      if (other.isNegative()) {
        return this.negate().div(other.negate());
      } else {
        return this.negate().div(other).negate();
      }
    } else if (other.isNegative()) {
      return this.div(other.negate()).negate();
    }
    // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.
    var res = goog.math.Long.ZERO;
    var rem = this;
    while (rem.greaterThanOrEqual(other)) {
      // Approximate the result of division. This may be a little greater or
      // smaller than the actual value.
      var approx = Math.max(1, Math.floor(rem.toNumber() / other.toNumber()));
      // We will tweak the approximate result by changing it in the 48-th digit or
      // the smallest non-fractional digit, whichever is larger.
      var log2 = Math.ceil(Math.log(approx) / Math.LN2);
      var delta = (log2 <= 48) ? 1 : Math.pow(2, log2 - 48);
      // Decrease the approximation until it is smaller than the remainder.  Note
      // that if it is too large, the product overflows and is negative.
      var approxRes = goog.math.Long.fromNumber(approx);
      var approxRem = approxRes.multiply(other);
      while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
        approx -= delta;
        approxRes = goog.math.Long.fromNumber(approx);
        approxRem = approxRes.multiply(other);
      }
      // We know the answer can't be zero... and actually, zero would cause
      // infinite recursion since we would make no progress.
      if (approxRes.isZero()) {
        approxRes = goog.math.Long.ONE;
      }
      res = res.add(approxRes);
      rem = rem.subtract(approxRem);
    }
    return res;
  };
  /**
   * Returns this Long modulo the given one.
   * @param {goog.math.Long} other Long by which to mod.
   * @return {!goog.math.Long} This Long modulo the given one.
   */
  goog.math.Long.prototype.modulo = function(other) {
    return this.subtract(this.div(other).multiply(other));
  };
  /** @return {!goog.math.Long} The bitwise-NOT of this value. */
  goog.math.Long.prototype.not = function() {
    return goog.math.Long.fromBits(~this.low_, ~this.high_);
  };
  /**
   * Returns the bitwise-AND of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to AND.
   * @return {!goog.math.Long} The bitwise-AND of this and the other.
   */
  goog.math.Long.prototype.and = function(other) {
    return goog.math.Long.fromBits(this.low_ & other.low_,
                                   this.high_ & other.high_);
  };
  /**
   * Returns the bitwise-OR of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to OR.
   * @return {!goog.math.Long} The bitwise-OR of this and the other.
   */
  goog.math.Long.prototype.or = function(other) {
    return goog.math.Long.fromBits(this.low_ | other.low_,
                                   this.high_ | other.high_);
  };
  /**
   * Returns the bitwise-XOR of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to XOR.
   * @return {!goog.math.Long} The bitwise-XOR of this and the other.
   */
  goog.math.Long.prototype.xor = function(other) {
    return goog.math.Long.fromBits(this.low_ ^ other.low_,
                                   this.high_ ^ other.high_);
  };
  /**
   * Returns this Long with bits shifted to the left by the given amount.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the left by the given amount.
   */
  goog.math.Long.prototype.shiftLeft = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var low = this.low_;
      if (numBits < 32) {
        var high = this.high_;
        return goog.math.Long.fromBits(
            low << numBits,
            (high << numBits) | (low >>> (32 - numBits)));
      } else {
        return goog.math.Long.fromBits(0, low << (numBits - 32));
      }
    }
  };
  /**
   * Returns this Long with bits shifted to the right by the given amount.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the right by the given amount.
   */
  goog.math.Long.prototype.shiftRight = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var high = this.high_;
      if (numBits < 32) {
        var low = this.low_;
        return goog.math.Long.fromBits(
            (low >>> numBits) | (high << (32 - numBits)),
            high >> numBits);
      } else {
        return goog.math.Long.fromBits(
            high >> (numBits - 32),
            high >= 0 ? 0 : -1);
      }
    }
  };
  /**
   * Returns this Long with bits shifted to the right by the given amount, with
   * the new top bits matching the current sign bit.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the right by the given amount, with
   *     zeros placed into the new leading bits.
   */
  goog.math.Long.prototype.shiftRightUnsigned = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var high = this.high_;
      if (numBits < 32) {
        var low = this.low_;
        return goog.math.Long.fromBits(
            (low >>> numBits) | (high << (32 - numBits)),
            high >>> numBits);
      } else if (numBits == 32) {
        return goog.math.Long.fromBits(high, 0);
      } else {
        return goog.math.Long.fromBits(high >>> (numBits - 32), 0);
      }
    }
  };
  //======= begin jsbn =======
  var navigator = { appName: 'Modern Browser' }; // polyfill a little
  // Copyright (c) 2005  Tom Wu
  // All Rights Reserved.
  // http://www-cs-students.stanford.edu/~tjw/jsbn/
  /*
   * Copyright (c) 2003-2005  Tom Wu
   * All Rights Reserved.
   *
   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the
   * "Software"), to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge, publish,
   * distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to
   * the following conditions:
   *
   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, 
   * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY 
   * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  
   *
   * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
   * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
   * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
   * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
   * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * In addition, the following condition applies:
   *
   * All redistributions must retain an intact copy of this copyright notice
   * and disclaimer.
   */
  // Basic JavaScript BN library - subset useful for RSA encryption.
  // Bits per digit
  var dbits;
  // JavaScript engine analysis
  var canary = 0xdeadbeefcafe;
  var j_lm = ((canary&0xffffff)==0xefcafe);
  // (public) Constructor
  function BigInteger(a,b,c) {
    if(a != null)
      if("number" == typeof a) this.fromNumber(a,b,c);
      else if(b == null && "string" != typeof a) this.fromString(a,256);
      else this.fromString(a,b);
  }
  // return new, unset BigInteger
  function nbi() { return new BigInteger(null); }
  // am: Compute w_j += (x*this_i), propagate carries,
  // c is initial carry, returns final carry.
  // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
  // We need to select the fastest one that works in this environment.
  // am1: use a single mult and divide to get the high bits,
  // max digit bits should be 26 because
  // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
  function am1(i,x,w,j,c,n) {
    while(--n >= 0) {
      var v = x*this[i++]+w[j]+c;
      c = Math.floor(v/0x4000000);
      w[j++] = v&0x3ffffff;
    }
    return c;
  }
  // am2 avoids a big mult-and-extract completely.
  // Max digit bits should be <= 30 because we do bitwise ops
  // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
  function am2(i,x,w,j,c,n) {
    var xl = x&0x7fff, xh = x>>15;
    while(--n >= 0) {
      var l = this[i]&0x7fff;
      var h = this[i++]>>15;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
      c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
      w[j++] = l&0x3fffffff;
    }
    return c;
  }
  // Alternately, set max digit bits to 28 since some
  // browsers slow down when dealing with 32-bit numbers.
  function am3(i,x,w,j,c,n) {
    var xl = x&0x3fff, xh = x>>14;
    while(--n >= 0) {
      var l = this[i]&0x3fff;
      var h = this[i++]>>14;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x3fff)<<14)+w[j]+c;
      c = (l>>28)+(m>>14)+xh*h;
      w[j++] = l&0xfffffff;
    }
    return c;
  }
  if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = am2;
    dbits = 30;
  }
  else if(j_lm && (navigator.appName != "Netscape")) {
    BigInteger.prototype.am = am1;
    dbits = 26;
  }
  else { // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3;
    dbits = 28;
  }
  BigInteger.prototype.DB = dbits;
  BigInteger.prototype.DM = ((1<<dbits)-1);
  BigInteger.prototype.DV = (1<<dbits);
  var BI_FP = 52;
  BigInteger.prototype.FV = Math.pow(2,BI_FP);
  BigInteger.prototype.F1 = BI_FP-dbits;
  BigInteger.prototype.F2 = 2*dbits-BI_FP;
  // Digit conversions
  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
  var BI_RC = new Array();
  var rr,vv;
  rr = "0".charCodeAt(0);
  for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
  rr = "a".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
  rr = "A".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
  function int2char(n) { return BI_RM.charAt(n); }
  function intAt(s,i) {
    var c = BI_RC[s.charCodeAt(i)];
    return (c==null)?-1:c;
  }
  // (protected) copy this to r
  function bnpCopyTo(r) {
    for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
    r.t = this.t;
    r.s = this.s;
  }
  // (protected) set from integer value x, -DV <= x < DV
  function bnpFromInt(x) {
    this.t = 1;
    this.s = (x<0)?-1:0;
    if(x > 0) this[0] = x;
    else if(x < -1) this[0] = x+DV;
    else this.t = 0;
  }
  // return bigint initialized to value
  function nbv(i) { var r = nbi(); r.fromInt(i); return r; }
  // (protected) set from string and radix
  function bnpFromString(s,b) {
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 256) k = 8; // byte array
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else { this.fromRadix(s,b); return; }
    this.t = 0;
    this.s = 0;
    var i = s.length, mi = false, sh = 0;
    while(--i >= 0) {
      var x = (k==8)?s[i]&0xff:intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-") mi = true;
        continue;
      }
      mi = false;
      if(sh == 0)
        this[this.t++] = x;
      else if(sh+k > this.DB) {
        this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
        this[this.t++] = (x>>(this.DB-sh));
      }
      else
        this[this.t-1] |= x<<sh;
      sh += k;
      if(sh >= this.DB) sh -= this.DB;
    }
    if(k == 8 && (s[0]&0x80) != 0) {
      this.s = -1;
      if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
    }
    this.clamp();
    if(mi) BigInteger.ZERO.subTo(this,this);
  }
  // (protected) clamp off excess high words
  function bnpClamp() {
    var c = this.s&this.DM;
    while(this.t > 0 && this[this.t-1] == c) --this.t;
  }
  // (public) return string representation in given radix
  function bnToString(b) {
    if(this.s < 0) return "-"+this.negate().toString(b);
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else return this.toRadix(b);
    var km = (1<<k)-1, d, m = false, r = "", i = this.t;
    var p = this.DB-(i*this.DB)%k;
    if(i-- > 0) {
      if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
      while(i >= 0) {
        if(p < k) {
          d = (this[i]&((1<<p)-1))<<(k-p);
          d |= this[--i]>>(p+=this.DB-k);
        }
        else {
          d = (this[i]>>(p-=k))&km;
          if(p <= 0) { p += this.DB; --i; }
        }
        if(d > 0) m = true;
        if(m) r += int2char(d);
      }
    }
    return m?r:"0";
  }
  // (public) -this
  function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }
  // (public) |this|
  function bnAbs() { return (this.s<0)?this.negate():this; }
  // (public) return + if this > a, - if this < a, 0 if equal
  function bnCompareTo(a) {
    var r = this.s-a.s;
    if(r != 0) return r;
    var i = this.t;
    r = i-a.t;
    if(r != 0) return (this.s<0)?-r:r;
    while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
    return 0;
  }
  // returns bit length of the integer x
  function nbits(x) {
    var r = 1, t;
    if((t=x>>>16) != 0) { x = t; r += 16; }
    if((t=x>>8) != 0) { x = t; r += 8; }
    if((t=x>>4) != 0) { x = t; r += 4; }
    if((t=x>>2) != 0) { x = t; r += 2; }
    if((t=x>>1) != 0) { x = t; r += 1; }
    return r;
  }
  // (public) return the number of bits in "this"
  function bnBitLength() {
    if(this.t <= 0) return 0;
    return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
  }
  // (protected) r = this << n*DB
  function bnpDLShiftTo(n,r) {
    var i;
    for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
    for(i = n-1; i >= 0; --i) r[i] = 0;
    r.t = this.t+n;
    r.s = this.s;
  }
  // (protected) r = this >> n*DB
  function bnpDRShiftTo(n,r) {
    for(var i = n; i < this.t; ++i) r[i-n] = this[i];
    r.t = Math.max(this.t-n,0);
    r.s = this.s;
  }
  // (protected) r = this << n
  function bnpLShiftTo(n,r) {
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<cbs)-1;
    var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
    for(i = this.t-1; i >= 0; --i) {
      r[i+ds+1] = (this[i]>>cbs)|c;
      c = (this[i]&bm)<<bs;
    }
    for(i = ds-1; i >= 0; --i) r[i] = 0;
    r[ds] = c;
    r.t = this.t+ds+1;
    r.s = this.s;
    r.clamp();
  }
  // (protected) r = this >> n
  function bnpRShiftTo(n,r) {
    r.s = this.s;
    var ds = Math.floor(n/this.DB);
    if(ds >= this.t) { r.t = 0; return; }
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<bs)-1;
    r[0] = this[ds]>>bs;
    for(var i = ds+1; i < this.t; ++i) {
      r[i-ds-1] |= (this[i]&bm)<<cbs;
      r[i-ds] = this[i]>>bs;
    }
    if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
    r.t = this.t-ds;
    r.clamp();
  }
  // (protected) r = this - a
  function bnpSubTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]-a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c -= a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c -= a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c -= a.s;
    }
    r.s = (c<0)?-1:0;
    if(c < -1) r[i++] = this.DV+c;
    else if(c > 0) r[i++] = c;
    r.t = i;
    r.clamp();
  }
  // (protected) r = this * a, r != this,a (HAC 14.12)
  // "this" should be the larger one if appropriate.
  function bnpMultiplyTo(a,r) {
    var x = this.abs(), y = a.abs();
    var i = x.t;
    r.t = i+y.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
    r.s = 0;
    r.clamp();
    if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
  }
  // (protected) r = this^2, r != this (HAC 14.16)
  function bnpSquareTo(r) {
    var x = this.abs();
    var i = r.t = 2*x.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < x.t-1; ++i) {
      var c = x.am(i,x[i],r,2*i,0,1);
      if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
        r[i+x.t] -= x.DV;
        r[i+x.t+1] = 1;
      }
    }
    if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
    r.s = 0;
    r.clamp();
  }
  // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
  // r != q, this != m.  q or r may be null.
  function bnpDivRemTo(m,q,r) {
    var pm = m.abs();
    if(pm.t <= 0) return;
    var pt = this.abs();
    if(pt.t < pm.t) {
      if(q != null) q.fromInt(0);
      if(r != null) this.copyTo(r);
      return;
    }
    if(r == null) r = nbi();
    var y = nbi(), ts = this.s, ms = m.s;
    var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
    if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
    else { pm.copyTo(y); pt.copyTo(r); }
    var ys = y.t;
    var y0 = y[ys-1];
    if(y0 == 0) return;
    var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
    var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
    var i = r.t, j = i-ys, t = (q==null)?nbi():q;
    y.dlShiftTo(j,t);
    if(r.compareTo(t) >= 0) {
      r[r.t++] = 1;
      r.subTo(t,r);
    }
    BigInteger.ONE.dlShiftTo(ys,t);
    t.subTo(y,y);	// "negative" y so we can replace sub with am later
    while(y.t < ys) y[y.t++] = 0;
    while(--j >= 0) {
      // Estimate quotient digit
      var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
      if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
        y.dlShiftTo(j,t);
        r.subTo(t,r);
        while(r[i] < --qd) r.subTo(t,r);
      }
    }
    if(q != null) {
      r.drShiftTo(ys,q);
      if(ts != ms) BigInteger.ZERO.subTo(q,q);
    }
    r.t = ys;
    r.clamp();
    if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
    if(ts < 0) BigInteger.ZERO.subTo(r,r);
  }
  // (public) this mod a
  function bnMod(a) {
    var r = nbi();
    this.abs().divRemTo(a,null,r);
    if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
    return r;
  }
  // Modular reduction using "classic" algorithm
  function Classic(m) { this.m = m; }
  function cConvert(x) {
    if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
    else return x;
  }
  function cRevert(x) { return x; }
  function cReduce(x) { x.divRemTo(this.m,null,x); }
  function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
  function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }
  Classic.prototype.convert = cConvert;
  Classic.prototype.revert = cRevert;
  Classic.prototype.reduce = cReduce;
  Classic.prototype.mulTo = cMulTo;
  Classic.prototype.sqrTo = cSqrTo;
  // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
  // justification:
  //         xy == 1 (mod m)
  //         xy =  1+km
  //   xy(2-xy) = (1+km)(1-km)
  // x[y(2-xy)] = 1-k^2m^2
  // x[y(2-xy)] == 1 (mod m^2)
  // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
  // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
  // JS multiply "overflows" differently from C/C++, so care is needed here.
  function bnpInvDigit() {
    if(this.t < 1) return 0;
    var x = this[0];
    if((x&1) == 0) return 0;
    var y = x&3;		// y == 1/x mod 2^2
    y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
    y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
    y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
    // last step - calculate inverse mod DV directly;
    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
    y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
    // we really want the negative inverse, and -DV < y < DV
    return (y>0)?this.DV-y:-y;
  }
  // Montgomery reduction
  function Montgomery(m) {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp&0x7fff;
    this.mph = this.mp>>15;
    this.um = (1<<(m.DB-15))-1;
    this.mt2 = 2*m.t;
  }
  // xR mod m
  function montConvert(x) {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t,r);
    r.divRemTo(this.m,null,r);
    if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
    return r;
  }
  // x/R mod m
  function montRevert(x) {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
  }
  // x = x/R mod m (HAC 14.32)
  function montReduce(x) {
    while(x.t <= this.mt2)	// pad x so am has enough room later
      x[x.t++] = 0;
    for(var i = 0; i < this.m.t; ++i) {
      // faster way of calculating u0 = x[i]*mp mod DV
      var j = x[i]&0x7fff;
      var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
      // use am to combine the multiply-shift-add into one call
      j = i+this.m.t;
      x[j] += this.m.am(0,u0,x,i,0,this.m.t);
      // propagate carry
      while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
    }
    x.clamp();
    x.drShiftTo(this.m.t,x);
    if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
  }
  // r = "x^2/R mod m"; x != r
  function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }
  // r = "xy/R mod m"; x,y != r
  function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
  Montgomery.prototype.convert = montConvert;
  Montgomery.prototype.revert = montRevert;
  Montgomery.prototype.reduce = montReduce;
  Montgomery.prototype.mulTo = montMulTo;
  Montgomery.prototype.sqrTo = montSqrTo;
  // (protected) true iff this is even
  function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }
  // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
  function bnpExp(e,z) {
    if(e > 0xffffffff || e < 1) return BigInteger.ONE;
    var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
    g.copyTo(r);
    while(--i >= 0) {
      z.sqrTo(r,r2);
      if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
      else { var t = r; r = r2; r2 = t; }
    }
    return z.revert(r);
  }
  // (public) this^e % m, 0 <= e < 2^32
  function bnModPowInt(e,m) {
    var z;
    if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
    return this.exp(e,z);
  }
  // protected
  BigInteger.prototype.copyTo = bnpCopyTo;
  BigInteger.prototype.fromInt = bnpFromInt;
  BigInteger.prototype.fromString = bnpFromString;
  BigInteger.prototype.clamp = bnpClamp;
  BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
  BigInteger.prototype.drShiftTo = bnpDRShiftTo;
  BigInteger.prototype.lShiftTo = bnpLShiftTo;
  BigInteger.prototype.rShiftTo = bnpRShiftTo;
  BigInteger.prototype.subTo = bnpSubTo;
  BigInteger.prototype.multiplyTo = bnpMultiplyTo;
  BigInteger.prototype.squareTo = bnpSquareTo;
  BigInteger.prototype.divRemTo = bnpDivRemTo;
  BigInteger.prototype.invDigit = bnpInvDigit;
  BigInteger.prototype.isEven = bnpIsEven;
  BigInteger.prototype.exp = bnpExp;
  // public
  BigInteger.prototype.toString = bnToString;
  BigInteger.prototype.negate = bnNegate;
  BigInteger.prototype.abs = bnAbs;
  BigInteger.prototype.compareTo = bnCompareTo;
  BigInteger.prototype.bitLength = bnBitLength;
  BigInteger.prototype.mod = bnMod;
  BigInteger.prototype.modPowInt = bnModPowInt;
  // "constants"
  BigInteger.ZERO = nbv(0);
  BigInteger.ONE = nbv(1);
  // jsbn2 stuff
  // (protected) convert from radix string
  function bnpFromRadix(s,b) {
    this.fromInt(0);
    if(b == null) b = 10;
    var cs = this.chunkSize(b);
    var d = Math.pow(b,cs), mi = false, j = 0, w = 0;
    for(var i = 0; i < s.length; ++i) {
      var x = intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-" && this.signum() == 0) mi = true;
        continue;
      }
      w = b*w+x;
      if(++j >= cs) {
        this.dMultiply(d);
        this.dAddOffset(w,0);
        j = 0;
        w = 0;
      }
    }
    if(j > 0) {
      this.dMultiply(Math.pow(b,j));
      this.dAddOffset(w,0);
    }
    if(mi) BigInteger.ZERO.subTo(this,this);
  }
  // (protected) return x s.t. r^x < DV
  function bnpChunkSize(r) { return Math.floor(Math.LN2*this.DB/Math.log(r)); }
  // (public) 0 if this == 0, 1 if this > 0
  function bnSigNum() {
    if(this.s < 0) return -1;
    else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
    else return 1;
  }
  // (protected) this *= n, this >= 0, 1 < n < DV
  function bnpDMultiply(n) {
    this[this.t] = this.am(0,n-1,this,0,0,this.t);
    ++this.t;
    this.clamp();
  }
  // (protected) this += n << w words, this >= 0
  function bnpDAddOffset(n,w) {
    if(n == 0) return;
    while(this.t <= w) this[this.t++] = 0;
    this[w] += n;
    while(this[w] >= this.DV) {
      this[w] -= this.DV;
      if(++w >= this.t) this[this.t++] = 0;
      ++this[w];
    }
  }
  // (protected) convert to radix string
  function bnpToRadix(b) {
    if(b == null) b = 10;
    if(this.signum() == 0 || b < 2 || b > 36) return "0";
    var cs = this.chunkSize(b);
    var a = Math.pow(b,cs);
    var d = nbv(a), y = nbi(), z = nbi(), r = "";
    this.divRemTo(d,y,z);
    while(y.signum() > 0) {
      r = (a+z.intValue()).toString(b).substr(1) + r;
      y.divRemTo(d,y,z);
    }
    return z.intValue().toString(b) + r;
  }
  // (public) return value as integer
  function bnIntValue() {
    if(this.s < 0) {
      if(this.t == 1) return this[0]-this.DV;
      else if(this.t == 0) return -1;
    }
    else if(this.t == 1) return this[0];
    else if(this.t == 0) return 0;
    // assumes 16 < DB < 32
    return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];
  }
  // (protected) r = this + a
  function bnpAddTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]+a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c += a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c += a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += a.s;
    }
    r.s = (c<0)?-1:0;
    if(c > 0) r[i++] = c;
    else if(c < -1) r[i++] = this.DV+c;
    r.t = i;
    r.clamp();
  }
  BigInteger.prototype.fromRadix = bnpFromRadix;
  BigInteger.prototype.chunkSize = bnpChunkSize;
  BigInteger.prototype.signum = bnSigNum;
  BigInteger.prototype.dMultiply = bnpDMultiply;
  BigInteger.prototype.dAddOffset = bnpDAddOffset;
  BigInteger.prototype.toRadix = bnpToRadix;
  BigInteger.prototype.intValue = bnIntValue;
  BigInteger.prototype.addTo = bnpAddTo;
  //======= end jsbn =======
  // Emscripten wrapper
  var Wrapper = {
    abs: function(l, h) {
      var x = new goog.math.Long(l, h);
      var ret;
      if (x.isNegative()) {
        ret = x.negate();
      } else {
        ret = x;
      }
      HEAP32[tempDoublePtr>>2] = ret.low_;
      HEAP32[tempDoublePtr+4>>2] = ret.high_;
    },
    ensureTemps: function() {
      if (Wrapper.ensuredTemps) return;
      Wrapper.ensuredTemps = true;
      Wrapper.two32 = new BigInteger();
      Wrapper.two32.fromString('4294967296', 10);
      Wrapper.two64 = new BigInteger();
      Wrapper.two64.fromString('18446744073709551616', 10);
      Wrapper.temp1 = new BigInteger();
      Wrapper.temp2 = new BigInteger();
    },
    lh2bignum: function(l, h) {
      var a = new BigInteger();
      a.fromString(h.toString(), 10);
      var b = new BigInteger();
      a.multiplyTo(Wrapper.two32, b);
      var c = new BigInteger();
      c.fromString(l.toString(), 10);
      var d = new BigInteger();
      c.addTo(b, d);
      return d;
    },
    stringify: function(l, h, unsigned) {
      var ret = new goog.math.Long(l, h).toString();
      if (unsigned && ret[0] == '-') {
        // unsign slowly using jsbn bignums
        Wrapper.ensureTemps();
        var bignum = new BigInteger();
        bignum.fromString(ret, 10);
        ret = new BigInteger();
        Wrapper.two64.addTo(bignum, ret);
        ret = ret.toString(10);
      }
      return ret;
    },
    fromString: function(str, base, min, max, unsigned) {
      Wrapper.ensureTemps();
      var bignum = new BigInteger();
      bignum.fromString(str, base);
      var bigmin = new BigInteger();
      bigmin.fromString(min, 10);
      var bigmax = new BigInteger();
      bigmax.fromString(max, 10);
      if (unsigned && bignum.compareTo(BigInteger.ZERO) < 0) {
        var temp = new BigInteger();
        bignum.addTo(Wrapper.two64, temp);
        bignum = temp;
      }
      var error = false;
      if (bignum.compareTo(bigmin) < 0) {
        bignum = bigmin;
        error = true;
      } else if (bignum.compareTo(bigmax) > 0) {
        bignum = bigmax;
        error = true;
      }
      var ret = goog.math.Long.fromString(bignum.toString()); // min-max checks should have clamped this to a range goog.math.Long can handle well
      HEAP32[tempDoublePtr>>2] = ret.low_;
      HEAP32[tempDoublePtr+4>>2] = ret.high_;
      if (error) throw 'range error';
    }
  };
  return Wrapper;
})();
//======= end closure i64 code =======
// === Auto-generated postamble setup entry stuff ===
if (memoryInitializer) {
  function applyData(data) {
    HEAPU8.set(data, STATIC_BASE);
  }
  if (ENVIRONMENT_IS_NODE || ENVIRONMENT_IS_SHELL) {
    applyData(Module['readBinary'](memoryInitializer));
  } else {
    addRunDependency('memory initializer');
    Browser.asyncLoad(memoryInitializer, function(data) {
      applyData(data);
      removeRunDependency('memory initializer');
    }, function(data) {
      throw 'could not load memory initializer ' + memoryInitializer;
    });
  }
}
function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
};
ExitStatus.prototype = new Error();
ExitStatus.prototype.constructor = ExitStatus;
var initialStackTop;
var preloadStartTime = null;
var calledMain = false;
dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!Module['calledRun'] && shouldRunNow) run();
  if (!Module['calledRun']) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
}
Module['callMain'] = Module.callMain = function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on __ATMAIN__)');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');
  args = args || [];
  if (ENVIRONMENT_IS_WEB && preloadStartTime !== null) {
    Module.printErr('preload time: ' + (Date.now() - preloadStartTime) + ' ms');
  }
  ensureInitRuntime();
  var argc = args.length+1;
  function pad() {
    for (var i = 0; i < 4-1; i++) {
      argv.push(0);
    }
  }
  var argv = [allocate(intArrayFromString("/bin/this.program"), 'i8', ALLOC_NORMAL) ];
  pad();
  for (var i = 0; i < argc-1; i = i + 1) {
    argv.push(allocate(intArrayFromString(args[i]), 'i8', ALLOC_NORMAL));
    pad();
  }
  argv.push(0);
  argv = allocate(argv, 'i32', ALLOC_NORMAL);
  initialStackTop = STACKTOP;
  try {
    var ret = Module['_main'](argc, argv, 0);
    // if we're not running an evented main loop, it's time to exit
    if (!Module['noExitRuntime']) {
      exit(ret);
    }
  }
  catch(e) {
    if (e instanceof ExitStatus) {
      // exit() throws this once it's done to make sure execution
      // has been stopped completely
      return;
    } else if (e == 'SimulateInfiniteLoop') {
      // running an evented main loop, don't immediately exit
      Module['noExitRuntime'] = true;
      return;
    } else {
      if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
      throw e;
    }
  } finally {
    calledMain = true;
  }
}
function run(args) {
  args = args || Module['arguments'];
  if (preloadStartTime === null) preloadStartTime = Date.now();
  if (runDependencies > 0) {
    Module.printErr('run() called, but dependencies remain, so not running');
    return;
  }
  preRun();
  if (runDependencies > 0) {
    // a preRun added a dependency, run will be called later
    return;
  }
  function doRun() {
    ensureInitRuntime();
    preMain();
    Module['calledRun'] = true;
    if (Module['_main'] && shouldRunNow) {
      Module['callMain'](args);
    }
    postRun();
  }
  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      if (!ABORT) doRun();
    }, 1);
  } else {
    doRun();
  }
}
Module['run'] = Module.run = run;
function exit(status) {
  ABORT = true;
  EXITSTATUS = status;
  STACKTOP = initialStackTop;
  // exit the runtime
  exitRuntime();
  // TODO We should handle this differently based on environment.
  // In the browser, the best we can do is throw an exception
  // to halt execution, but in node we could process.exit and
  // I'd imagine SM shell would have something equivalent.
  // This would let us set a proper exit status (which
  // would be great for checking test exit statuses).
  // https://github.com/kripken/emscripten/issues/1371
  // throw an exception to halt the current execution
  throw new ExitStatus(status);
}
Module['exit'] = Module.exit = exit;
function abort(text) {
  if (text) {
    Module.print(text);
    Module.printErr(text);
  }
  ABORT = true;
  EXITSTATUS = 1;
  throw 'abort() at ' + stackTrace();
}
Module['abort'] = Module.abort = abort;
// {{PRE_RUN_ADDITIONS}}
if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}
// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;
if (Module['noInitialRun']) {
  shouldRunNow = false;
}
run();
// {{POST_RUN_ADDITIONS}}
// {{MODULE_ADDITIONS}}
