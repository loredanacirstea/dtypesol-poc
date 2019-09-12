import dtypesBase from './dtypes_base.js';
import dtypesCustom from './dtypes_custom.js';
import dtypesFunc from './dtypes_functions.js';

const dtypes = {
  base: {},
  custom: {},
  functions: {},
}

dtypesBase.forEach((dtype) => dtypes.base[dtype.name] = dtype);
dtypesCustom.forEach((dtype) => dtypes.custom[dtype.name] = dtype);
dtypesFunc.forEach((dtype) => dtypes.functions[dtype.name] = dtype);

export default dtypes;
