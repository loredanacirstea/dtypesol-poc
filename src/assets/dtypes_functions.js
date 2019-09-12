export default [
  {
      "name": "calculateDistance",
      "types": [
          {"name": "Geopoint", "label": "geopoint1", "relation": 0, "dimensions":[]},
          {"name": "Geopoint", "label": "geopoint2", "relation": 0, "dimensions":[]}
      ],
      "optionals": [],
      "outputs": [
        {"name": "Distance", "label": "distance", "relation": 0, "dimensions":[]},
      ],
      "lang": 0,
      "typeChoice": 4,
      "contractAddress": "0xfffFd05c2b12cfE3c74464531f88349e159785ea",
      "source": "0x0000000000000000000000000000000000000000000000000000000000000000"
  },
  {
      "name": "geoShenanigans",
      "types": [
          {"name": "Geopoint", "label": "geopoint", "relation": 0, "dimensions":[]},
          {"name": "Distance", "label": "distance", "relation": 0, "dimensions":[]}
      ],
      "optionals": [],
      "outputs": [
        {"name": "Geopoint", "label": "geopoint", "relation": 0, "dimensions":[""]}
      ],
      "lang": 0,
      "typeChoice": 4,
      "contractAddress": "0xD32298893dD95c1Aaed8A79bc06018b8C265a279",
      "source": "0x0000000000000000000000000000000000000000000000000000000000000000"
  },
]
