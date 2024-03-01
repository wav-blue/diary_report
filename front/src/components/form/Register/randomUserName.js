const adjective = ["거대한", "작은", "소중한", "귀여운", "열심인", "불타는"];
const noun = [
  "슈크림",
  "공룡",
  "귤",
  "감자",
  "고구마",
  "병아리",
  "종달새",
  "문어",
  "쿼카",
];

const randomUserName = () => {
  const randA = Math.floor(Math.random() * 100) % adjective.length;
  const randN = Math.floor(Math.random() * 100) % noun.length;
  return adjective[randA] + " " + noun[randN];
};

export { randomUserName };
