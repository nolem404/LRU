function lruPageReplacement() {
    const pages = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3];
    const frameCount = 3;
    let frames = [];
    let pageFaults = 0;
    let pageHits = 0;

    console.log("Page Reference\tFrames\t\tStatus");

    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        if (frames.includes(page)) {
            frames = frames.filter(p => p !== page);
            frames.push(page);
            pageHits++;
            console.log(`${page}\t\t[${frames.join(" ")}]\t\tHIT`);
        } else {
            if (frames.length < frameCount) {
                frames.push(page);
            } else {
                frames.shift();
                frames.push(page);
            }
            pageFaults++;
            console.log(`${page}\t\t[${frames.join(" ")}]\t\tFAULT`);
        }
    }

    console.log("\nTotal Page Faults:", pageFaults);
    console.log("Total Page Hits:", pageHits);
    console.log("Page Fault Rate:", (pageFaults / pages.length).toFixed(2));
}

lruPageReplacement();
