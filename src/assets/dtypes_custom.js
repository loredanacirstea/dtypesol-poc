export default [
  {
      "name": "Longitude",
      "types": [
          {"name": "int32", "label": "longitude", "relation": 0, "dimensions":[]},
      ],
      "optionals": [],
      "outputs": [],
      "lang": 0,
      "typeChoice": 0,
      "contractAddress": "0x0000000000000000000000000000000000000000",
      "source": "0x0000000000000000000000000000000000000000000000000000000000000000"
  },
  {
      "name": "Latitude",
      "types": [
          {"name": "int32", "label": "latitude", "relation": 0, "dimensions":[]},
      ],
      "optionals": [],
      "outputs": [],
      "lang": 0,
      "typeChoice": 0,
      "contractAddress": "0x0000000000000000000000000000000000000000",
      "source": "0x0000000000000000000000000000000000000000000000000000000000000000"
  },
  {
      "name": "Geopoint",
      "types": [
          {"name": "Longitude", "label": "longitude", "relation": 0, "dimensions":[]},
          {"name": "Latitude", "label": "latitude", "relation": 0, "dimensions":[]},
      ],
      "optionals": [],
      "outputs": [],
      "lang": 0,
      "typeChoice": 0,
      "contractAddress": "0x0000000000000000000000000000000000000000",
      "source": "0x0000000000000000000000000000000000000000000000000000000000000000"
  },
  {
      "name": "Area",
      "types": [
          {"name": "Geopoint", "label": "geo", "relation": 0, "dimensions":['7', '3']},
          {"name": "string", "label": "name", "relation": 0, "dimensions":[]},
      ],
      "optionals": [],
      "outputs": [],
      "lang": 0,
      "typeChoice": 0,
      "contractAddress": "0x0000000000000000000000000000000000000000",
      "source": "0x0000000000000000000000000000000000000000000000000000000000000000"
  }
];
