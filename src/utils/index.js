export const chuckPosts = (myArray) => {
    const pageList = {};
    let pageNum = 1;
    for(let i = 0; i < myArray.length; i+=10) {
        const tempArray = myArray.slice(i, i+10);
        if(tempArray.length === 10) {
            pageList[pageNum] = tempArray;
            pageNum++;
        }

    }
    return pageList;
};