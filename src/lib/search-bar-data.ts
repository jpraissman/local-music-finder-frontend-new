async function getVenuesForSearchBar() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/venues-for-nav-bar`, {
    next: {
      revalidate: 60
    },
  });

  return response.json();
}

async function getBandsForSearchBar() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bands-for-nav-bar`, {
    next: {
      revalidate: 60
    },
  });

  return response.json();
}

export { getVenuesForSearchBar, getBandsForSearchBar };