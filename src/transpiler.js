import parser from 'solidity-parser-antlr';
import parents from 'ast-parents';
import dtypes from './assets/dtypes.js';

console.log('dtypes', dtypes);

export const transpile = (value, callback) => {
  const astorig = parser.parse(value, {tolerant: true, loc: true, range: true});
  let newValue = value;
  let structdefs = new Set();
  let rangedefs = new Set();
  let structinst = new Set();
  let rangeinst = new Set();
  let structsources = new Set();
  let functioninst = new Set();
  let rangefunctions = new Set();
  let insertIndex;  // structs in global scope

  console.log('astorig', astorig);
  window.parser = parser;
  // const parset = parser.parseType('mapping (address=>Foo)', {tolerant: true, loc: true, range: true});  // strict: true
  // console.log('parset', parset);

  const ast = parents(astorig);
  console.log('parents', ast);

  // output the path of each import found
  parser.visit(ast, {
    StructDefinition: function(node) {
      // console.log('StructDefinition', node);
      structdefs.add(node.name);
      rangedefs.add(node.range);
    },
    UserDefinedTypeName: function(node) {
      // console.log('UserDefinedTypeName', node);
      rangeinst.add(node.range);
      structinst.add(node.namePath);
    },
    ContractDefinition: function(node) {
      insertIndex = node.range[0];
    },
    FunctionCall: function(node) {
      console.log('FunctionCall', node);
      // if (node.) functions.add();
      // node.expression.name - struct, function; node.expression.type = "Identifier"; node.expression.range
      // node.expression.memberName - struct.function; node.expression.type = "MemberAccess"
      const name = node.expression.name;
      if (name && dtypes.functions[name]) {
        functioninst.add({
          name,
          args: node.arguments.map(arg => value.slice(arg.range[0], arg.range[1] + 1)),
          outTypes: node.parent.variables.map(vrb => vrb.typeName.namePath),  // todo generalize for non variable declarations
        });
        rangefunctions.add({
          funcrange: node.range,
          linerange: node.parent.range,
        });
      }
    },
  });
  console.log('structdefs', structdefs, rangedefs);
  console.log('structinst', structinst, rangeinst);
  console.log('functioninst', functioninst, rangefunctions);

  [...structinst].forEach((name) => {
    if (!structdefs.has(name))
      structsources = buildStruct(name, structsources);
  });

  // Replace end => start, so ranges remain viable
  let funcsources = new Set([...functioninst].map((funcinst) => buildFunction(funcinst)));
  // console.log('funcsources', funcsources);
  [...funcsources].reverse().forEach((fsource, i) => {
    const range = [...rangefunctions][i];
    newValue = newValue.slice(0, range.linerange[0]) + fsource.pre + '\n\n    ' + newValue.slice(range.linerange[0], range.funcrange[0]) + fsource.post + '\n' + newValue.slice(range.linerange[1] + 1);
  });

  newValue = newValue.slice(0, insertIndex) + [...structsources].join('\n\n') + '\n\n' + newValue.slice(insertIndex);

  return newValue;
}

const FUNC_TYPE = {
  1: 'delegatecall',
  2: 'delegatecall',
  3: 'staticcall',
  4: 'staticcall',
};

export const buildFunction = ({name, args, outTypes}) => {
  const funcdef = dtypes.functions[name];
  console.log('buildFunction', name, args, outTypes);
  // console.log('funcdef', funcdef);
  const funcName = `${name}Lib`;
  const addrdef = `address ${funcName} = address(${funcdef.contractAddress});`
  const signature = funcSig(funcdef);
  const funccall = `(bool success_${name}, bytes memory data_${name}) = ${funcName}.${FUNC_TYPE[funcdef.typeChoice]}(abi.encodeWithSignature("${signature}", ${args.join(', ')}));`;
  const callcheck = `require(success_${name} == true);`;
  const post = `abi.decode(data_${name}, (${outTypes.join(', ')}));`
  const pre = [addrdef, funccall, callcheck].join('\n    ');

  console.log('pre', pre);
  console.log('post', post);
  return {pre, post};
}

export const funcSig = (dtypeDef) => {
  return `${dtypeDef.name}(${dtypeDef.types.map(type => sigArgTuple(type)).join(',')})`;
}

export const sigArgTuple = (subtypeDef) => {
  if (dtypes.base[subtypeDef.name])
    return subtypeDef.name;

  if (!dtypes.custom[subtypeDef.name])
    throw new Error(`Unrecognized type: ${subtypeDef.name}`);

  const dtypeDef = dtypes.custom[subtypeDef.name];
  return `(${dtypeDef.types.map(type => sigArgTuple(type)).join(',')})`;
}

export const buildStruct = (name, structsources) => {
  if (dtypes.base[name] || !dtypes.custom[name] || structsources.has(name))
    return structsources;

  const def = dtypes.custom[name];

  const subtypes = def.types.map((def) => {
    structsources = buildStruct(def.name, structsources);
    return buildType(def);
  }).join('\n    ');

  structsources.add(`struct ${name} {\n    ${subtypes}\n}`);
  return structsources;
}

export const buildType = (def) => `${buildTypeName(def.name, def.dimensions)} ${def.label};`;
export const buildTypeName = (name, dims) => {
  let bdims = buildTypeDims(dims);
  bdims = bdims === '' ? bdims : `[${bdims}]`;
  return `${name}${bdims}`;
};
export const buildTypeDims = (dims) => dims.join('][');
