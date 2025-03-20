export function makePokeURLs(maxId) {
  const base_url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/"
  const urls = []
  for(let i = 1; i <= maxId; i++) {
    const temp = base_url + i + "/";
    urls.push(temp);
  }

  return urls
}


export async function getData(urls) {
  try {
    const promises = urls.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      return await response.json();
    });


    const return_array = await Promise.all(promises);
    return return_array;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
}