const tagsByGroupName = [
  { term_group: 0, label: "not assigned", position: 0, terms: [] },
  {
    term_group: 1,
    label: "partidos-politicos",
    position: 1,
    terms: [30, 55, 64, 49, 46, 32, 57, 54, 51, 48, 28, 31, 56, 53, 50, 45, 29],
  },
  { term_group: 3, label: "alertas", position: 2, terms: [39, 41, 40] },
  {
    term_group: 2,
    label: "tema-ambiental",
    position: 3,
    terms: [35, 38, 33, 63, 37, 61, 62, 60],
  },
];

export default tagsByGroupName;
