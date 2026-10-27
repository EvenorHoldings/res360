export type InstitutionType = 'Public University' | 'TVET College' | 'Private Institution';
export type InstitutionEntry={id:string;province:string;city:string;name:string;type:InstitutionType;aliases:string[];national:boolean;locationScope:string};
export const INSTITUTION_CATALOG:InstitutionEntry[]=[
  {
    "id": "catalog-001",
    "province": "Western Cape",
    "city": "Cape Town",
    "name": "University of Cape Town",
    "type": "Public University",
    "aliases": [
      "University of Cape Town (UCT)",
      "University of Cape Town",
      "UCT"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-002",
    "province": "Western Cape",
    "city": "Cape Town",
    "name": "Cape Peninsula University of Technology",
    "type": "Public University",
    "aliases": [
      "Cape Peninsula University of Technology (CPUT)",
      "Cape Peninsula University of Technology",
      "CPUT"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-003",
    "province": "Western Cape",
    "city": "Bellville",
    "name": "University of the Western Cape",
    "type": "Public University",
    "aliases": [
      "University of the Western Cape (UWC)",
      "University of the Western Cape",
      "UWC"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-004",
    "province": "Western Cape",
    "city": "Bellville",
    "name": "CPUT Bellville campuses",
    "type": "Public University",
    "aliases": [
      "CPUT Bellville campuses"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-005",
    "province": "Western Cape",
    "city": "Stellenbosch",
    "name": "Stellenbosch University",
    "type": "Public University",
    "aliases": [
      "Stellenbosch University (SU",
      "Maties)",
      "Stellenbosch University",
      "SU",
      "Maties"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-006",
    "province": "Western Cape",
    "city": "Cape Town",
    "name": "College of Cape Town for TVET",
    "type": "TVET College",
    "aliases": [
      "College of Cape Town for TVET"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-007",
    "province": "Western Cape",
    "city": "Cape Town",
    "name": "False Bay TVET College",
    "type": "TVET College",
    "aliases": [
      "False Bay TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-008",
    "province": "Western Cape",
    "city": "Cape Town",
    "name": "Northlink TVET College",
    "type": "TVET College",
    "aliases": [
      "Northlink TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-009",
    "province": "Western Cape",
    "city": "Stellenbosch",
    "name": "Boland TVET College",
    "type": "TVET College",
    "aliases": [
      "Boland TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-010",
    "province": "Western Cape",
    "city": "George",
    "name": "South Cape TVET College",
    "type": "TVET College",
    "aliases": [
      "South Cape TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-011",
    "province": "Western Cape",
    "city": "Malmesbury",
    "name": "West Coast TVET College",
    "type": "TVET College",
    "aliases": [
      "West Coast TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-012",
    "province": "Western Cape",
    "city": "Cape Town",
    "name": "Eduvos",
    "type": "Private Institution",
    "aliases": [
      "Eduvos"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-013",
    "province": "Western Cape",
    "city": "Tyger Valley",
    "name": "Eduvos",
    "type": "Private Institution",
    "aliases": [
      "Eduvos"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-014",
    "province": "Western Cape",
    "city": "Claremont",
    "name": "Eduvos",
    "type": "Private Institution",
    "aliases": [
      "Eduvos"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-015",
    "province": "Western Cape",
    "city": "Cape Town",
    "name": "Varsity College (IIE)",
    "type": "Private Institution",
    "aliases": [
      "Varsity College (IIE)",
      "IIE"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-016",
    "province": "Western Cape",
    "city": "Tyger Valley",
    "name": "Varsity College (IIE)",
    "type": "Private Institution",
    "aliases": [
      "Varsity College (IIE)",
      "IIE"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-017",
    "province": "Western Cape",
    "city": "Claremont",
    "name": "Varsity College (IIE)",
    "type": "Private Institution",
    "aliases": [
      "Varsity College (IIE)",
      "IIE"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-018",
    "province": "Western Cape",
    "city": "Cape Town",
    "name": "Rosebank College (IIE)",
    "type": "Private Institution",
    "aliases": [
      "Rosebank College (IIE)",
      "IIE"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-019",
    "province": "Western Cape",
    "city": "Tyger Valley",
    "name": "Rosebank College (IIE)",
    "type": "Private Institution",
    "aliases": [
      "Rosebank College (IIE)",
      "IIE"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-020",
    "province": "Western Cape",
    "city": "Claremont",
    "name": "Rosebank College (IIE)",
    "type": "Private Institution",
    "aliases": [
      "Rosebank College (IIE)",
      "IIE"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-021",
    "province": "Western Cape",
    "city": "Cape Town",
    "name": "Vega School",
    "type": "Private Institution",
    "aliases": [
      "Vega School"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-022",
    "province": "Western Cape",
    "city": "Tyger Valley",
    "name": "Vega School",
    "type": "Private Institution",
    "aliases": [
      "Vega School"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-023",
    "province": "Western Cape",
    "city": "Claremont",
    "name": "Vega School",
    "type": "Private Institution",
    "aliases": [
      "Vega School"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-024",
    "province": "Western Cape",
    "city": "Cape Town",
    "name": "MANCOSA",
    "type": "Private Institution",
    "aliases": [
      "MANCOSA"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-025",
    "province": "Western Cape",
    "city": "Tyger Valley",
    "name": "MANCOSA",
    "type": "Private Institution",
    "aliases": [
      "MANCOSA"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-026",
    "province": "Western Cape",
    "city": "Claremont",
    "name": "MANCOSA",
    "type": "Private Institution",
    "aliases": [
      "MANCOSA"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-027",
    "province": "Western Cape",
    "city": "Cape Town",
    "name": "Boston City Campus",
    "type": "Private Institution",
    "aliases": [
      "Boston City Campus"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-028",
    "province": "Western Cape",
    "city": "Tyger Valley",
    "name": "Boston City Campus",
    "type": "Private Institution",
    "aliases": [
      "Boston City Campus"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-029",
    "province": "Western Cape",
    "city": "Claremont",
    "name": "Boston City Campus",
    "type": "Private Institution",
    "aliases": [
      "Boston City Campus"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-030",
    "province": "Gauteng",
    "city": "Johannesburg",
    "name": "University of the Witwatersrand",
    "type": "Public University",
    "aliases": [
      "University of the Witwatersrand (Wits)",
      "University of the Witwatersrand",
      "Wits"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-031",
    "province": "Gauteng",
    "city": "Johannesburg",
    "name": "University of Johannesburg",
    "type": "Public University",
    "aliases": [
      "University of Johannesburg (UJ)",
      "University of Johannesburg",
      "UJ"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-032",
    "province": "Gauteng",
    "city": "Pretoria",
    "name": "University of Pretoria",
    "type": "Public University",
    "aliases": [
      "University of Pretoria (UP",
      "Tuks)",
      "University of Pretoria",
      "UP",
      "Tuks"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-033",
    "province": "Gauteng",
    "city": "Pretoria",
    "name": "Tshwane University of Technology",
    "type": "Public University",
    "aliases": [
      "Tshwane University of Technology (TUT)",
      "Tshwane University of Technology",
      "TUT"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-034",
    "province": "Gauteng",
    "city": "Pretoria",
    "name": "Sefako Makgatho Health Sciences University",
    "type": "Public University",
    "aliases": [
      "Sefako Makgatho Health Sciences University (SMU)",
      "Sefako Makgatho Health Sciences University",
      "SMU"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-035",
    "province": "Gauteng",
    "city": "Vanderbijlpark",
    "name": "Vaal University of Technology",
    "type": "Public University",
    "aliases": [
      "Vaal University of Technology (VUT)",
      "Vaal University of Technology",
      "VUT"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-036",
    "province": "Gauteng",
    "city": "Johannesburg",
    "name": "Central Johannesburg TVET College",
    "type": "TVET College",
    "aliases": [
      "Central Johannesburg TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-037",
    "province": "Gauteng",
    "city": "Johannesburg",
    "name": "South West Gauteng TVET College",
    "type": "TVET College",
    "aliases": [
      "South West Gauteng TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-038",
    "province": "Gauteng",
    "city": "Pretoria",
    "name": "Tshwane North TVET College",
    "type": "TVET College",
    "aliases": [
      "Tshwane North TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-039",
    "province": "Gauteng",
    "city": "Pretoria",
    "name": "Tshwane South TVET College",
    "type": "TVET College",
    "aliases": [
      "Tshwane South TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-040",
    "province": "Gauteng",
    "city": "Ekurhuleni (Springs / Germiston)",
    "name": "Ekurhuleni East TVET College",
    "type": "TVET College",
    "aliases": [
      "Ekurhuleni East TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-041",
    "province": "Gauteng",
    "city": "Ekurhuleni (Springs / Germiston)",
    "name": "Ekurhuleni West TVET College",
    "type": "TVET College",
    "aliases": [
      "Ekurhuleni West TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-042",
    "province": "Gauteng",
    "city": "Vereeniging",
    "name": "Sedibeng TVET College",
    "type": "TVET College",
    "aliases": [
      "Sedibeng TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-043",
    "province": "Gauteng",
    "city": "Carletonville",
    "name": "Western TVET College",
    "type": "TVET College",
    "aliases": [
      "Western TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-044",
    "province": "Gauteng",
    "city": "Randfontein",
    "name": "Western TVET College",
    "type": "TVET College",
    "aliases": [
      "Western TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-045",
    "province": "Gauteng",
    "city": "Midrand",
    "name": "Eduvos",
    "type": "Private Institution",
    "aliases": [
      "Eduvos"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-046",
    "province": "Gauteng",
    "city": "Johannesburg",
    "name": "Eduvos",
    "type": "Private Institution",
    "aliases": [
      "Eduvos"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-047",
    "province": "Gauteng",
    "city": "Pretoria",
    "name": "Eduvos",
    "type": "Private Institution",
    "aliases": [
      "Eduvos"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-048",
    "province": "Gauteng",
    "city": "Bedfordview",
    "name": "Eduvos",
    "type": "Private Institution",
    "aliases": [
      "Eduvos"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-049",
    "province": "Gauteng",
    "city": "Midrand",
    "name": "Varsity College (IIE)",
    "type": "Private Institution",
    "aliases": [
      "Varsity College (IIE)",
      "IIE"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-050",
    "province": "Gauteng",
    "city": "Johannesburg",
    "name": "Varsity College (IIE)",
    "type": "Private Institution",
    "aliases": [
      "Varsity College (IIE)",
      "IIE"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-051",
    "province": "Gauteng",
    "city": "Pretoria",
    "name": "Varsity College (IIE)",
    "type": "Private Institution",
    "aliases": [
      "Varsity College (IIE)",
      "IIE"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-052",
    "province": "Gauteng",
    "city": "Bedfordview",
    "name": "Varsity College (IIE)",
    "type": "Private Institution",
    "aliases": [
      "Varsity College (IIE)",
      "IIE"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-053",
    "province": "Gauteng",
    "city": "Midrand",
    "name": "Rosebank College (IIE)",
    "type": "Private Institution",
    "aliases": [
      "Rosebank College (IIE)",
      "IIE"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-054",
    "province": "Gauteng",
    "city": "Johannesburg",
    "name": "Rosebank College (IIE)",
    "type": "Private Institution",
    "aliases": [
      "Rosebank College (IIE)",
      "IIE"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-055",
    "province": "Gauteng",
    "city": "Pretoria",
    "name": "Rosebank College (IIE)",
    "type": "Private Institution",
    "aliases": [
      "Rosebank College (IIE)",
      "IIE"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-056",
    "province": "Gauteng",
    "city": "Bedfordview",
    "name": "Rosebank College (IIE)",
    "type": "Private Institution",
    "aliases": [
      "Rosebank College (IIE)",
      "IIE"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-057",
    "province": "Gauteng",
    "city": "Midrand",
    "name": "Boston City Campus",
    "type": "Private Institution",
    "aliases": [
      "Boston City Campus"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-058",
    "province": "Gauteng",
    "city": "Johannesburg",
    "name": "Boston City Campus",
    "type": "Private Institution",
    "aliases": [
      "Boston City Campus"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-059",
    "province": "Gauteng",
    "city": "Pretoria",
    "name": "Boston City Campus",
    "type": "Private Institution",
    "aliases": [
      "Boston City Campus"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-060",
    "province": "Gauteng",
    "city": "Bedfordview",
    "name": "Boston City Campus",
    "type": "Private Institution",
    "aliases": [
      "Boston City Campus"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-061",
    "province": "Gauteng",
    "city": "Midrand",
    "name": "Stadio",
    "type": "Private Institution",
    "aliases": [
      "Stadio"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-062",
    "province": "Gauteng",
    "city": "Johannesburg",
    "name": "Stadio",
    "type": "Private Institution",
    "aliases": [
      "Stadio"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-063",
    "province": "Gauteng",
    "city": "Pretoria",
    "name": "Stadio",
    "type": "Private Institution",
    "aliases": [
      "Stadio"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-064",
    "province": "Gauteng",
    "city": "Bedfordview",
    "name": "Stadio",
    "type": "Private Institution",
    "aliases": [
      "Stadio"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-065",
    "province": "Gauteng",
    "city": "Midrand",
    "name": "Akademia",
    "type": "Private Institution",
    "aliases": [
      "Akademia"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-066",
    "province": "Gauteng",
    "city": "Johannesburg",
    "name": "Akademia",
    "type": "Private Institution",
    "aliases": [
      "Akademia"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-067",
    "province": "Gauteng",
    "city": "Pretoria",
    "name": "Akademia",
    "type": "Private Institution",
    "aliases": [
      "Akademia"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-068",
    "province": "Gauteng",
    "city": "Bedfordview",
    "name": "Akademia",
    "type": "Private Institution",
    "aliases": [
      "Akademia"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-069",
    "province": "Gauteng",
    "city": "Midrand",
    "name": "Belgium Campus iTversity",
    "type": "Private Institution",
    "aliases": [
      "Belgium Campus iTversity"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-070",
    "province": "Gauteng",
    "city": "Johannesburg",
    "name": "Belgium Campus iTversity",
    "type": "Private Institution",
    "aliases": [
      "Belgium Campus iTversity"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-071",
    "province": "Gauteng",
    "city": "Pretoria",
    "name": "Belgium Campus iTversity",
    "type": "Private Institution",
    "aliases": [
      "Belgium Campus iTversity"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-072",
    "province": "Gauteng",
    "city": "Bedfordview",
    "name": "Belgium Campus iTversity",
    "type": "Private Institution",
    "aliases": [
      "Belgium Campus iTversity"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-073",
    "province": "Gauteng",
    "city": "Midrand",
    "name": "MANCOSA",
    "type": "Private Institution",
    "aliases": [
      "MANCOSA"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-074",
    "province": "Gauteng",
    "city": "Johannesburg",
    "name": "MANCOSA",
    "type": "Private Institution",
    "aliases": [
      "MANCOSA"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-075",
    "province": "Gauteng",
    "city": "Pretoria",
    "name": "MANCOSA",
    "type": "Private Institution",
    "aliases": [
      "MANCOSA"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-076",
    "province": "Gauteng",
    "city": "Bedfordview",
    "name": "MANCOSA",
    "type": "Private Institution",
    "aliases": [
      "MANCOSA"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-077",
    "province": "KwaZulu-Natal",
    "city": "Durban",
    "name": "University of KwaZulu-Natal",
    "type": "Public University",
    "aliases": [
      "University of KwaZulu-Natal (UKZN)",
      "University of KwaZulu-Natal",
      "UKZN"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-078",
    "province": "KwaZulu-Natal",
    "city": "Durban",
    "name": "Durban University of Technology",
    "type": "Public University",
    "aliases": [
      "Durban University of Technology (DUT)",
      "Durban University of Technology",
      "DUT"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-079",
    "province": "KwaZulu-Natal",
    "city": "Pietermaritzburg",
    "name": "University of KwaZulu-Natal (Pietermaritzburg campus)",
    "type": "Public University",
    "aliases": [
      "University of KwaZulu-Natal (Pietermaritzburg campus)",
      "Pietermaritzburg campus"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-080",
    "province": "KwaZulu-Natal",
    "city": "Umlazi",
    "name": "Mangosuthu University of Technology",
    "type": "Public University",
    "aliases": [
      "Mangosuthu University of Technology (MUT)",
      "Mangosuthu University of Technology",
      "MUT"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-081",
    "province": "KwaZulu-Natal",
    "city": "KwaDlangezwa",
    "name": "University of Zululand",
    "type": "Public University",
    "aliases": [
      "University of Zululand (UniZulu)",
      "University of Zululand",
      "UniZulu"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-082",
    "province": "KwaZulu-Natal",
    "city": "Durban",
    "name": "Coastal KZN TVET College",
    "type": "TVET College",
    "aliases": [
      "Coastal KZN TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-083",
    "province": "KwaZulu-Natal",
    "city": "Durban",
    "name": "Thekwini TVET College",
    "type": "TVET College",
    "aliases": [
      "Thekwini TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-084",
    "province": "KwaZulu-Natal",
    "city": "Durban",
    "name": "Elangeni TVET College",
    "type": "TVET College",
    "aliases": [
      "Elangeni TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-085",
    "province": "KwaZulu-Natal",
    "city": "Pietermaritzburg",
    "name": "Umgungundlovu TVET College",
    "type": "TVET College",
    "aliases": [
      "Umgungundlovu TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-086",
    "province": "KwaZulu-Natal",
    "city": "Other KZN",
    "name": "Esayidi TVET College",
    "type": "TVET College",
    "aliases": [
      "Esayidi TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-087",
    "province": "KwaZulu-Natal",
    "city": "Other KZN",
    "name": "Majuba TVET College",
    "type": "TVET College",
    "aliases": [
      "Majuba TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-088",
    "province": "KwaZulu-Natal",
    "city": "Other KZN",
    "name": "Mnambithi TVET College",
    "type": "TVET College",
    "aliases": [
      "Mnambithi TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-089",
    "province": "KwaZulu-Natal",
    "city": "Other KZN",
    "name": "Mthashana TVET College",
    "type": "TVET College",
    "aliases": [
      "Mthashana TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-090",
    "province": "KwaZulu-Natal",
    "city": "Other KZN",
    "name": "Umfolozi TVET College",
    "type": "TVET College",
    "aliases": [
      "Umfolozi TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-091",
    "province": "KwaZulu-Natal",
    "city": "Durban",
    "name": "Eduvos",
    "type": "Private Institution",
    "aliases": [
      "Eduvos"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-092",
    "province": "KwaZulu-Natal",
    "city": "Durban",
    "name": "Varsity College (IIE)",
    "type": "Private Institution",
    "aliases": [
      "Varsity College (IIE)",
      "IIE"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-093",
    "province": "KwaZulu-Natal",
    "city": "Durban",
    "name": "Rosebank College (IIE)",
    "type": "Private Institution",
    "aliases": [
      "Rosebank College (IIE)",
      "IIE"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-094",
    "province": "KwaZulu-Natal",
    "city": "Durban",
    "name": "MANCOSA",
    "type": "Private Institution",
    "aliases": [
      "MANCOSA"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-095",
    "province": "KwaZulu-Natal",
    "city": "Durban",
    "name": "Boston City Campus",
    "type": "Private Institution",
    "aliases": [
      "Boston City Campus"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-096",
    "province": "Eastern Cape",
    "city": "Gqeberha (Port Elizabeth)",
    "name": "Nelson Mandela University",
    "type": "Public University",
    "aliases": [
      "Nelson Mandela University (NMU)",
      "Nelson Mandela University",
      "NMU"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-097",
    "province": "Eastern Cape",
    "city": "Makhanda (Grahamstown)",
    "name": "Rhodes University",
    "type": "Public University",
    "aliases": [
      "Rhodes University"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-098",
    "province": "Eastern Cape",
    "city": "Alice",
    "name": "University of Fort Hare",
    "type": "Public University",
    "aliases": [
      "University of Fort Hare (UFH)",
      "University of Fort Hare",
      "UFH"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-099",
    "province": "Eastern Cape",
    "city": "East London",
    "name": "University of Fort Hare",
    "type": "Public University",
    "aliases": [
      "University of Fort Hare (UFH)",
      "University of Fort Hare",
      "UFH"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-100",
    "province": "Eastern Cape",
    "city": "Bhisho",
    "name": "University of Fort Hare",
    "type": "Public University",
    "aliases": [
      "University of Fort Hare (UFH)",
      "University of Fort Hare",
      "UFH"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-101",
    "province": "Eastern Cape",
    "city": "Mthatha",
    "name": "Walter Sisulu University",
    "type": "Public University",
    "aliases": [
      "Walter Sisulu University (WSU)",
      "Walter Sisulu University",
      "WSU"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-102",
    "province": "Eastern Cape",
    "city": "East London",
    "name": "Walter Sisulu University",
    "type": "Public University",
    "aliases": [
      "Walter Sisulu University (WSU)",
      "Walter Sisulu University",
      "WSU"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-103",
    "province": "Eastern Cape",
    "city": "East London",
    "name": "Buffalo City TVET College",
    "type": "TVET College",
    "aliases": [
      "Buffalo City TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-104",
    "province": "Eastern Cape",
    "city": "Gqeberha",
    "name": "Port Elizabeth TVET College",
    "type": "TVET College",
    "aliases": [
      "Port Elizabeth TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-105",
    "province": "Eastern Cape",
    "city": "Other Eastern Cape",
    "name": "Eastcape Midlands TVET College",
    "type": "TVET College",
    "aliases": [
      "Eastcape Midlands TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-106",
    "province": "Eastern Cape",
    "city": "Other Eastern Cape",
    "name": "Ikhala TVET College",
    "type": "TVET College",
    "aliases": [
      "Ikhala TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-107",
    "province": "Eastern Cape",
    "city": "Other Eastern Cape",
    "name": "Ingwe TVET College",
    "type": "TVET College",
    "aliases": [
      "Ingwe TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-108",
    "province": "Eastern Cape",
    "city": "Other Eastern Cape",
    "name": "King Hintsa TVET College",
    "type": "TVET College",
    "aliases": [
      "King Hintsa TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-109",
    "province": "Eastern Cape",
    "city": "Other Eastern Cape",
    "name": "King Sabata Dalindyebo TVET College",
    "type": "TVET College",
    "aliases": [
      "King Sabata Dalindyebo TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-110",
    "province": "Eastern Cape",
    "city": "Other Eastern Cape",
    "name": "Lovedale TVET College",
    "type": "TVET College",
    "aliases": [
      "Lovedale TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-111",
    "province": "Eastern Cape",
    "city": "Gqeberha",
    "name": "Eduvos",
    "type": "Private Institution",
    "aliases": [
      "Eduvos"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-112",
    "province": "Eastern Cape",
    "city": "East London",
    "name": "Eduvos",
    "type": "Private Institution",
    "aliases": [
      "Eduvos"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-113",
    "province": "Eastern Cape",
    "city": "Gqeberha",
    "name": "Varsity College (IIE)",
    "type": "Private Institution",
    "aliases": [
      "Varsity College (IIE)",
      "IIE"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-114",
    "province": "Eastern Cape",
    "city": "East London",
    "name": "Varsity College (IIE)",
    "type": "Private Institution",
    "aliases": [
      "Varsity College (IIE)",
      "IIE"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-115",
    "province": "Eastern Cape",
    "city": "Gqeberha",
    "name": "Rosebank College (IIE)",
    "type": "Private Institution",
    "aliases": [
      "Rosebank College (IIE)",
      "IIE"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-116",
    "province": "Eastern Cape",
    "city": "East London",
    "name": "Rosebank College (IIE)",
    "type": "Private Institution",
    "aliases": [
      "Rosebank College (IIE)",
      "IIE"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-117",
    "province": "Free State",
    "city": "Bloemfontein",
    "name": "University of the Free State",
    "type": "Public University",
    "aliases": [
      "University of the Free State (UFS)",
      "University of the Free State",
      "UFS"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-118",
    "province": "Free State",
    "city": "Bloemfontein",
    "name": "Central University of Technology",
    "type": "Public University",
    "aliases": [
      "Central University of Technology (CUT)",
      "Central University of Technology",
      "CUT"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-119",
    "province": "Free State",
    "city": "Bloemfontein",
    "name": "Motheo TVET College",
    "type": "TVET College",
    "aliases": [
      "Motheo TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-120",
    "province": "Free State",
    "city": "Other Free State",
    "name": "Flavius Mareka TVET College",
    "type": "TVET College",
    "aliases": [
      "Flavius Mareka TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-121",
    "province": "Free State",
    "city": "Other Free State",
    "name": "Goldfields TVET College",
    "type": "TVET College",
    "aliases": [
      "Goldfields TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-122",
    "province": "Free State",
    "city": "Other Free State",
    "name": "Maluti TVET College",
    "type": "TVET College",
    "aliases": [
      "Maluti TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-123",
    "province": "Limpopo",
    "city": "Polokwane",
    "name": "University of Limpopo",
    "type": "Public University",
    "aliases": [
      "University of Limpopo (UL)",
      "University of Limpopo",
      "UL"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-124",
    "province": "Limpopo",
    "city": "Mankweng (Turfloop)",
    "name": "University of Limpopo",
    "type": "Public University",
    "aliases": [
      "University of Limpopo (UL)",
      "University of Limpopo",
      "UL"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-125",
    "province": "Limpopo",
    "city": "Thohoyandou",
    "name": "University of Venda",
    "type": "Public University",
    "aliases": [
      "University of Venda (Univen)",
      "University of Venda",
      "Univen"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-126",
    "province": "Limpopo",
    "city": "Polokwane",
    "name": "Capricorn TVET College",
    "type": "TVET College",
    "aliases": [
      "Capricorn TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-127",
    "province": "Limpopo",
    "city": "Other Limpopo",
    "name": "Lephalale TVET College",
    "type": "TVET College",
    "aliases": [
      "Lephalale TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-128",
    "province": "Limpopo",
    "city": "Other Limpopo",
    "name": "Letaba TVET College",
    "type": "TVET College",
    "aliases": [
      "Letaba TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-129",
    "province": "Limpopo",
    "city": "Other Limpopo",
    "name": "Mopani South East TVET College",
    "type": "TVET College",
    "aliases": [
      "Mopani South East TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-130",
    "province": "Limpopo",
    "city": "Other Limpopo",
    "name": "Sekhukhune TVET College",
    "type": "TVET College",
    "aliases": [
      "Sekhukhune TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-131",
    "province": "Limpopo",
    "city": "Other Limpopo",
    "name": "Vhembe TVET College",
    "type": "TVET College",
    "aliases": [
      "Vhembe TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-132",
    "province": "Limpopo",
    "city": "Other Limpopo",
    "name": "Waterberg TVET College",
    "type": "TVET College",
    "aliases": [
      "Waterberg TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-133",
    "province": "Mpumalanga",
    "city": "Nelspruit",
    "name": "University of Mpumalanga",
    "type": "Public University",
    "aliases": [
      "University of Mpumalanga (UMP)",
      "University of Mpumalanga",
      "UMP"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-134",
    "province": "Mpumalanga",
    "city": "Mbombela",
    "name": "University of Mpumalanga",
    "type": "Public University",
    "aliases": [
      "University of Mpumalanga (UMP)",
      "University of Mpumalanga",
      "UMP"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-135",
    "province": "Mpumalanga",
    "city": "Nelspruit",
    "name": "Ehlanzeni TVET College",
    "type": "TVET College",
    "aliases": [
      "Ehlanzeni TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-136",
    "province": "Mpumalanga",
    "city": "Other Mpumalanga",
    "name": "Gert Sibande TVET College",
    "type": "TVET College",
    "aliases": [
      "Gert Sibande TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-137",
    "province": "Mpumalanga",
    "city": "Other Mpumalanga",
    "name": "Nkangala TVET College",
    "type": "TVET College",
    "aliases": [
      "Nkangala TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-138",
    "province": "North West",
    "city": "Potchefstroom",
    "name": "North-West University (NWU – Potchefstroom campus)",
    "type": "Public University",
    "aliases": [
      "North-West University (NWU – Potchefstroom campus)",
      "NWU – Potchefstroom campus"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-139",
    "province": "North West",
    "city": "Mahikeng",
    "name": "North-West University (NWU – Mahikeng campus)",
    "type": "Public University",
    "aliases": [
      "North-West University (NWU – Mahikeng campus)",
      "NWU – Mahikeng campus"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-140",
    "province": "Gauteng",
    "city": "Vanderbijlpark",
    "name": "North-West University (NWU – Vaal Triangle campus)",
    "type": "Public University",
    "aliases": [
      "North-West University (NWU – Vaal Triangle campus)",
      "NWU – Vaal Triangle campus"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-141",
    "province": "North West",
    "city": "Rustenburg",
    "name": "Orbit TVET College",
    "type": "TVET College",
    "aliases": [
      "Orbit TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-142",
    "province": "North West",
    "city": "Brits",
    "name": "Orbit TVET College",
    "type": "TVET College",
    "aliases": [
      "Orbit TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-143",
    "province": "North West",
    "city": "Other North West",
    "name": "Taletso TVET College",
    "type": "TVET College",
    "aliases": [
      "Taletso TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-144",
    "province": "North West",
    "city": "Other North West",
    "name": "Vuselela TVET College",
    "type": "TVET College",
    "aliases": [
      "Vuselela TVET College"
    ],
    "national": false,
    "locationScope": "regional"
  },
  {
    "id": "catalog-145",
    "province": "Northern Cape",
    "city": "Kimberley",
    "name": "Sol Plaatje University",
    "type": "Public University",
    "aliases": [
      "Sol Plaatje University (SPU)",
      "Sol Plaatje University",
      "SPU"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-146",
    "province": "Northern Cape",
    "city": "Kimberley",
    "name": "Northern Cape Urban TVET College",
    "type": "TVET College",
    "aliases": [
      "Northern Cape Urban TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-147",
    "province": "Northern Cape",
    "city": "Kimberley",
    "name": "Northern Cape Rural TVET College",
    "type": "TVET College",
    "aliases": [
      "Northern Cape Rural TVET College"
    ],
    "national": false,
    "locationScope": "city"
  },
  {
    "id": "catalog-unisa",
    "province": "Gauteng",
    "city": "Pretoria",
    "name": "University of South Africa (Unisa)",
    "type": "Public University",
    "aliases": [
      "UNISA",
      "University of South Africa"
    ],
    "national": true,
    "locationScope": "national"
  }
];
export const PROVINCES=Array.from(new Set(INSTITUTION_CATALOG.map(i=>i.province))).sort();
export function citiesFor(province:string){return Array.from(new Set(INSTITUTION_CATALOG.filter(i=>!province||i.province===province).map(i=>i.city))).sort();}
export function institutionsFor(province='',city='',type=''){return INSTITUTION_CATALOG.filter(i=>(i.national||((!province||i.province===province)&&(!city||i.city===city)))&&(!type||i.type===type));}
export function matchingInstitutions(query:string){const q=query.trim().toLowerCase().replace(/^near\s+/,'');return q?INSTITUTION_CATALOG.filter(i=>[i.name,...i.aliases].some(a=>a.toLowerCase().includes(q))):[];}
