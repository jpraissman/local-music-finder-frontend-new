function get_random_image(rankingPos: number) {
  const randomNum = Math.floor(Math.random() * 3) + 1

  switch (rankingPos % 3) {
    case 0:
      return "/drumset.jpg"
    case 1:
      return "/guitar.jpg"
    case 2:
      return "/saxophone.jpg"
    default:
      return "/drumset.jpg"
  }
}

export default get_random_image;