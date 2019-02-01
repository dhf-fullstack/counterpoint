/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./VEX.ui/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./VEX.ui/main.js":
/*!************************!*\
  !*** ./VEX.ui/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

//import Vex from './static/vexflow-min'

const errors = document.getElementById('errors');

try {
  const width = 700;

  // boilerplate
  const VF = Vex.Flow;
  const div = document.getElementById('score1');
  const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
  renderer.resize(2 * width, 200);
  const context = renderer.getContext();

  // customize
  context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');

  // Staff
  const stave = new VF.Stave(10, 40, width);
  stave.addClef('treble').addTimeSignature('4/4');

  // render
  stave.setContext(context).draw();

  /* Create a voice in 4/4 and add notes
  var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
  voice.addTickables([
    new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "q" }),
    new VF.StaveNote({clef: "treble", keys: ["f/4"], duration: "q" }),
  ])
  var formatter = new VF.Formatter().joinVoices([voice]).format([voice], width);
  // Render voice
  voice.draw(context, stave);
  */
  /*
  var notes = [
    new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "q" }),
    new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
    new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" })
  ];
   var notes2 = [
    new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "w" })
  ];
   var voices = [
    new VF.Voice({num_beats: 4, beat_value: 4}).addTickables(notes),
    new VF.Voice({num_beats: 4, beat_value: 4}).addTickables(notes2)
  ];
   var formatter = new VF.Formatter().joinVoices(voices).format(voices, width);
  voices.forEach(function(v) { v.draw(context, stave) });
  */

  var notes = [new VF.StaveNote({ clef: "treble", keys: ["d/4"], duration: "h" }), new VF.StaveNote({ clef: "treble", keys: ["f/4"], duration: "h" }), new VF.StaveNote({ clef: "treble", keys: ["e/4"], duration: "h" }), new VF.StaveNote({ clef: "treble", keys: ["d/4"], duration: "h" }), new VF.StaveNote({ clef: "treble", keys: ["g/4"], duration: "h" }), new VF.StaveNote({ clef: "treble", keys: ["f/4"], duration: "h" }), new VF.StaveNote({ clef: "treble", keys: ["a/4"], duration: "h" }), new VF.StaveNote({ clef: "treble", keys: ["g/4"], duration: "h" }), new VF.StaveNote({ clef: "treble", keys: ["f/4"], duration: "h" }), new VF.StaveNote({ clef: "treble", keys: ["e/4"], duration: "h" }), new VF.StaveNote({ clef: "treble", keys: ["d/4"], duration: "w" })];

  /*var notes2 = [
    new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "w" })
  ];*/

  var voices = [new VF.Voice({ num_beats: 12, beat_value: 2 }).addTickables(notes)];

  var formatter = new VF.Formatter().joinVoices(voices).format(voices, width);
  voices.forEach(function (v) {
    v.draw(context, stave);
  });
} catch (err) {
  console.log('ERROR: ', err);
  errors.innerText = err;
}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map