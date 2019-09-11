import dtypesBase from './dtypes_base.js';
import dtypesCustom from './dtypes_custom.js';

const dtypes = {
  base: {},
  custom: {},
}

dtypesBase.forEach((dtype) => dtypes.base[dtype.name] = dtype);
dtypesCustom.forEach((dtype) => dtypes.custom[dtype.name] = dtype);

export default dtypes;
