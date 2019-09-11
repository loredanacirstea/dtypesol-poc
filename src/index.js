import './css/style.css'
import * as monaco from 'monaco-editor';
import {transpile} from './transpiler';
import * as contracts from './assets/contracts.js';

import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';

import './js/dtype_blockly/dtype_blockly_start.js';

var mySwiper = new Swiper ('.swiper-container', {
  loop: false,
  noSwiping: true,
  noSwipingClass: "no-swipe",
  slidesPerView: "auto",
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

monaco.editor.create(document.getElementById('editor'), {
  value: contracts.GeopointShortT,
  language: "sol",
  lineNumbers: "on",
  roundedSelection: false,
  scrollBeyondLastLine: false,
  readOnly: false,
  theme: "vs-light",
  wordWrap: "on",
});

monaco.editor.create(document.getElementById('solsource'), {
  value: '',
  language: "sol",
  lineNumbers: "on",
  roundedSelection: false,
  scrollBeyondLastLine: false,
  readOnly: false,
  theme: "vs-light",
  wordWrap: "on",
});

window.editor = monaco.editor;
const typedEditor = monaco.editor.getModels()[0];
const solEditor = monaco.editor.getModels()[1];

document.getElementById('transpile').addEventListener('click', () => {
  console.log('click');
  let value = typedEditor.getValue();
  // for removing /// comments
  value = value.replace(/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm, '');
  // const newValue = transpile(value, (newValue) => solEditor.setValue(newValue));
  const newValue = transpile(value);
  solEditor.setValue(newValue);
})

// Log message to console
logMessage('Its finished!!')

if (module.hot)       // eslint-disable-line no-undef
  module.hot.accept() // eslint-disable-line no-undef
