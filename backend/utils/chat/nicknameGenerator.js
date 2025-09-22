function generateNickname() {
  const adjectives = ["Calm", "Happy", "Brave", "Silent", "Cool", "Wise", "Swift"];
  const animals = ["Panda", "Tiger", "Eagle", "Lion", "Dolphin", "Wolf", "Fox"];

  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const number = Math.floor(100 + Math.random() * 900);

  return `${adj}${animal}${number}`;
}

module.exports = generateNickname;
