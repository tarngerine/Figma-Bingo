//
// Bingo
// So far only one method: `shuffleSelection`
//
// Swaps positions randomly of the selected node's children's children
//   assumes cells are grouped into rows or columns on the bingo board
// To use, select the frame that contains rows/cols, e.g. 
//   Bingo <Selection>
//     Row
//       Cell 1
//       Cell 2...
// If you name a node as "FREE" it'll be put in the middle
//   assumes those rows/columns are in order (to support freeNode)
const shuffleChildren = (freeNodeName) => {
    const children = [];
    const rows = [];
    const wrap = [];
    // Idk why I have to push a single selection into an array first
    // But typescript cries if I don't do this
    figma.currentPage.selection.forEach(n => {
        wrap.push(n);
    });
    let freeNode = null;
    wrap.forEach(w => {
        w.children.forEach(r => {
            r.children.forEach(c => {
                rows.push(r);
                if (c.name !== freeNodeName) {
                    children.push(c);
                }
                else {
                    freeNode = c;
                }
            });
        });
    });
    const newOrder = shuffle(children.slice());
    if (freeNode !== null) {
        newOrder.splice(Math.floor(newOrder.length / 2), 0, freeNode);
    }
    rows.forEach((r, i) => {
        r.appendChild(newOrder[i]);
    });
};
shuffleChildren("FREE");
figma.closePlugin();
//----------------------------------------------------------------------
// Helpers
//----------------------------------------------------------------------
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
