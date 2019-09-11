import parser from 'solidity-parser-antlr';
import dtypes from './assets/dtypes.js';

console.log('dtypes', dtypes);

export const transpile = (value, callback) => {
  const ast = parser.parse(value, {tolerant: true, loc: true, range: true});
  let newValue = value;
  let structdefs = new Set();
  let rangedefs = new Set();
  let structinst = new Set();
  let rangeinst = new Set();
  let structsources = new Set();
  let insertIndex;  // structs in global scope

  console.log(ast);

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
  });
  console.log('structdefs', structdefs, rangedefs);
  console.log('structinst', structinst, rangeinst);

  [...structinst].forEach((name) => {
    if (!structdefs.has(name))
      structsources = buildStruct(name, structsources);
  });

  newValue = newValue.slice(0, insertIndex) + [...structsources].join('\n\n') + '\n\n' + newValue.slice(insertIndex);
  return newValue;
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
