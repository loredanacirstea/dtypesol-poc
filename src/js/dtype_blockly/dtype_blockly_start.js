import Blockly from 'blockly';
import './dtype_blockly.js';

var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var demoWorkspace = Blockly.inject(blocklyDiv,
    {media: '/media/',
     toolbox: document.getElementById('toolbox')}
);

var onresize = function(e) {
  // Compute the absolute coordinates and dimensions of blocklyArea.
  var element = blocklyArea;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = y + 'px';
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  Blockly.svgResize(demoWorkspace);
};

function myUpdateFunction(event) {
  var code = Blockly.Dtype.workspaceToCode(demoWorkspace);
  var jcode = Blockly.JavaScript.workspaceToCode(demoWorkspace);
  //console.log(code, types, optionals)
  code = code.replace(/\(/g,"")
  code = code.replace(/\)/g,"")
  // document.getElementById('dtypedefcode').value = code;
  // document.getElementById('dtypejsoncode').value = ""+jcode+"";
}

function addCustomdType() {
  var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
  //code = "let types = {};\n"+code+"\nalert('dType Definitions:\n'+JSON.stringify(types));\n";
  code = ""+code+"";
  try {
    eval(code);
  } catch (e) {
    alert(e);
  }
  updateD()
}

function xml(){
  var xml = Blockly.Xml.workspaceToDom(demoWorkspace);
  var xml_text = Blockly.Xml.domToText(xml);
  console.log(xml_text)
}

function fxml(str){
  var xml = Blockly.Xml.textToDom(str);
  Blockly.Xml.domToWorkspace(xml, demoWorkspace);
}

function updateD(){
  let dbase = ""
  for (let el in base_types){
    dbase = dbase + el + "\n"
  }
  document.getElementById("dbaselist").innerHTML = dbase

  let dcustom = ""
  for (let el in custom_types){
    dcustom = dcustom + el + "\n"
  }
  document.getElementById("dcustomlist").innerHTML = dcustom
}

function onFirstComment(event) {
  // && !event.oldValue && event.newValue
  if (event.type == Blockly.Events.CHANGE && event.name == "TYPENAME") {
    //alert('Congratulations on creating your first comment!')
    console.log(event)
    //workspace.removeChangeListener(onFirstComment);
  }
}

// fxml('<xml xmlns="https://developers.google.com/blockly/xml"><block type="dtype_def" id="LvPrTmCG*)7_^wtJ6kx7" x="4" y="5"><field name="NAME">Let</field><field name="TYPE">dtype1</field><field name="AS">be:</field><value name="NAME"><block type="dtype_op" id="p+9aSxUdy{k6|$$ia2H@"><field name="op">*</field><value name="op0"><block type="dtype_value" id="s*6EFCVm4d1dcp9r~2,="><field name="TYPENAME">uint256</field><field name="LABEL">label</field><field name="REL">TRUE</field><value name="NAME"><block type="dtype_array" id="-*1ChYO4PLx5]:7J@aU`"><field name="NAME">9</field></block></value></block></value><value name="op1"><block type="dtype_op" id="Q8FwqtXojppAlx5,-JMP"><field name="op">*</field><value name="op0"><block type="dtype_value" id="+Pv9A6*`SZH40gItwQFm"><field name="TYPENAME">uint256</field><field name="LABEL">label2</field><field name="REL">FALSE</field><value name="NAME"><block type="dtype_array" id="}*|Y(1GA*qyM+VR(PcfE"><field name="NAME">7</field></block></value></block></value><value name="op1"><block type="dtype_value" id="?N^W2*Y7CP$vA9h@E2%#"><field name="TYPENAME">dtype0</field><field name="LABEL">label3</field><field name="REL">TRUE</field><value name="NAME"><block type="dtype_array" id="4Kg=^_Mu6rbfn#m-=NXW"><field name="NAME"/></block></value></block></value></block></value></block></value></block></xml>');

fxml('<xml xmlns="https://developers.google.com/blockly/xml"><block type="dtype_def" id="|pQLRclM32d0-l%AvbQ(" x="39" y="18"><field name="NAME">Let</field><field name="TYPE">Geopoint</field><field name="AS">be:</field><value name="NAME"><block type="dtype_op" id="k1t*7c+a5/F%GqSFcE9w"><field name="op">*</field><value name="op0"><block type="dtype_value" id="pq)g[1gvtv2[o!Gw1|/s"><field name="TYPENAME">Longitude</field><field name="LABEL">longitude</field><field name="REL">FALSE</field></block></value><value name="op1"><block type="dtype_value" id="1}zgrq@7eQSl,.bY+d`Y"><field name="TYPENAME">Latitude</field><field name="LABEL">latitude</field><field name="REL">FALSE</field></block></value></block></value></block></xml>')

updateD();
window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(demoWorkspace);
demoWorkspace.addChangeListener(myUpdateFunction);
// demoWorkspace.addChangeListener(onFirstComment);

document.getElementById('addCustomdType').addEventListener('click', addCustomdType);
