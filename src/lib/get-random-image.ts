function get_random_image(rankingPos: number) {
  switch (rankingPos % 7) {
    case 0:
      return "/drumset.jpg"
    case 1:
      return "/guitar.jpg"
    case 2:
      return "/saxophone.jpg"
    case 3:
      return "/concert.jpg"
    case 4:
      return "/guitar2.jpg"
    case 5:
      return "/piano.jpg"
    case 6:
      return "/record.jpg"
    default:
      return "/drumset.jpg"
  }
}

export default get_random_image;