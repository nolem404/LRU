function lru(pages, capacity) {
  let frames = [];
  let pageFaults = 0;
  let step = 1;
  let recent = [];

  for (let page of pages) {
    if (!frames.includes(page)) {
      if (frames.length < capacity) {
        frames.push(page);
      } else {
        let lruPage = recent[0];
        let index = frames.indexOf(lruPage);
        frames[index] = page;
        recent.shift();
      }
      pageFaults++;
    } else {
      recent = recent.filter(p => p !== page);
    }

    recent.push(page);
    console.log(`Step ${step++}: Frames = [${frames.join(", ")}]`);
  }

  console.log(`Total Page Faults = ${pageFaults}`);
}

const pages = [3 ,8 ,2 ,3 ,9 ,1 ,6 ,3 ,8 ,9 ,3 ,6 ,2 ,1 ,3 ];
const capacity = 5;

lru(pages, capacity);
