import Blockly from 'blockly';
import './dtype_compressed';
import './javascript_compressed';
import dtypes from '../../assets/dtypes.js';

var colored = false;
var color = 998;
window.base_types = dtypes.base;
window.custom_types = dtypes.custom;

var types=[];
var optionals = [];
var dimensions = {temp:[]}

function noPara(str){
  var temp = str
  temp = temp.replace(/\(/g,"")
  temp = temp.replace(/\)/g,"")
  return temp
}


Blockly.Blocks['dtype_value'] = {
  init: function() {
    var validator = function(newValue) {
      if (!base_types[newValue] && !custom_types[newValue]) return null;
      return newValue;
    };
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField(new Blockly.FieldTextInput("uint256", validator), "TYPENAME")
        .appendField(new Blockly.FieldTextInput("label"), "LABEL")
        .appendField("Ref")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "REL");
    this.setInputsInline(false);
    this.setOutput(true, "String");
    this.setColour(color);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['dtype_array'] = {
  init: function() {
    var validator = function(newValue) {
      if (newValue == "") return "";
      var num = parseInt(newValue)
      if (!num) return null;
      return num;
    };
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("[")
        .appendField(new Blockly.FieldTextInput("", validator), "NAME")
        .appendField("]");
    this.setInputsInline(false);
    this.setOutput(true, "String");
    this.setColour(color);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['dtype_op'] = {
  init: function() {
    this.appendValueInput("op0")
        .setCheck("String");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["tuple *","*"], ["choice +","+"], ["optional","|"]]), "op");
    this.appendValueInput("op1")
        .setCheck("String");
    this.setInputsInline(false);
    this.setOutput(true, "String");
    this.setColour(color);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['dtype_def'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField(new Blockly.FieldLabelSerializable("Let"), "NAME")
        .appendField(new Blockly.FieldTextInput("dtype1"), "TYPE")
        .appendField(new Blockly.FieldLabelSerializable("be:"), "AS");
    this.setInputsInline(false);
    this.setColour(color);
 this.setTooltip("Define a new dType");
 this.setHelpUrl("https://github.com/pipeos-one/dType");
  }
};

Blockly.Dtype['dtype_def'] = function(block) {
  var text_type = block.getFieldValue('TYPE');
  var value_name = Blockly.Dtype.valueToCode(block, 'NAME', Blockly.Dtype.ORDER_ATOMIC);
  // TODO: Assemble Dtype into code variable.
  var code = text_type+':: '+value_name+';\n';
  return code;
};

Blockly.Dtype['dtype_op'] = function(block) {
  var value_op0 = Blockly.Dtype.valueToCode(block, 'op0', Blockly.Dtype.ORDER_ATOMIC);
  var dropdown_op = block.getFieldValue('op');
  var value_op1 = Blockly.Dtype.valueToCode(block, 'op1', Blockly.Dtype.ORDER_ATOMIC);
  // TODO: Assemble Dtype into code variable.
  var code = value_op0+" "+dropdown_op+' '+value_op1;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Dtype.ORDER_NONE];
};

Blockly.Dtype['dtype_value'] = function(block) {
  var text_name = block.getFieldValue('TYPENAME');
  var text_label = block.getFieldValue('LABEL');
  var checkbox_rel = block.getFieldValue('REL') == 'TRUE';
  var value_name = Blockly.Dtype.valueToCode(block, 'NAME', Blockly.Dtype.ORDER_ATOMIC);

  // TODO: Assemble Dtype into code variable.
  var code = text_name+value_name ;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Dtype.ORDER_NONE];
};

Blockly.Dtype['dtype_array'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var value_name = Blockly.Dtype.valueToCode(block, 'NAME', Blockly.Dtype.ORDER_ATOMIC);
  // TODO: Assemble Dtype into code variable.''
  var code = "["+text_name+"]"+value_name;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Dtype.ORDER_NONE];
};

Blockly.JavaScript['dtype_def'] = function(block) {
  types = []
  optionals = []
  dimensions = {temp:[]}
  var text_type = block.getFieldValue('TYPE');
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);

  var typess = ["",""]
  if (value_name) {
    var temp1 = value_name.split("ˆ")
    if (!temp1[1]) temp1[1]=""
    typess = temp1
  }
  console.log(typess)

  // TODO: Assemble JavaScript into code variable.
  var code = "custom_types[\""+text_type+'\"] = { \"name\": \"'+text_type
    +'\",'+' "types": ['+noPara(typess[0])+'], "optionals": ['+noPara(typess[1])+'], "outputs": [], "lang": 0, "typeChoice": 0, "contractAddress": "TBD in the next step", "source": "TBD in the next step"};\n';
  return code;
};

Blockly.JavaScript['dtype_op'] = function(block) {
  var value_op0 = Blockly.JavaScript.valueToCode(block, 'op0', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_op = block.getFieldValue('op');
  var value_op1 = Blockly.JavaScript.valueToCode(block, 'op1', Blockly.JavaScript.ORDER_ATOMIC);
  var code1 = "";
  var code2 = "";
  switch (dropdown_op) {
    case "*":
      code1 = value_op0+", "+value_op1;
      break;
    case "+":
      code1 = "TBD:)";
      break;
    case "|":
      code1 = ", "+value_op0;
      code2 = value_op1+", ";
      break;
  }
  // TODO: Assemble JavaScript into code variable.
  //var code = value_op0+", "+value_op1;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code1+"ˆ"+code2, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['dtype_value'] = function(block) {
  var text_name = block.getFieldValue('TYPENAME');
  var text_label = block.getFieldValue('LABEL');
  var checkbox_rel = block.getFieldValue('REL') == 'TRUE';
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);

  //var change = Blockly.Events.BLOCK_CHANGE
  //console.log(change)

  // TODO: Assemble JavaScript into code variable.
  var code = { name: text_name, label: text_label, dimensions: JSON.parse("["+noPara(value_name)+"]"), relation: checkbox_rel? 1:0 }

  // TODO: Change ORDER_NONE to the correct strength.
  return [JSON.stringify(code), Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['dtype_array'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.

  var code = '""'
  if (text_name) code = '"'+text_name+'"'
  if (value_name) code = code+", "+noPara(value_name) ;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
