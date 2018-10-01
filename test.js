var simpleChain = require('./simpleChain');
let blockchain = new simpleChain.Blockchain();

// Add another 10 blocks
for (var i = 0, p = Promise.resolve(); i < 2; i++) {
  p = p.then(_ => new Promise(resolve =>
    setTimeout(() => {
      blockchain.addBlock(new simpleChain.Block("test data " + i)).then((hash) => {
        console.log('New block added: ', hash)
        resolve();
      });
    }, Math.random() * 100)
  ));
}
// Print current chain
setTimeout(() => {
  blockchain.iterateChain(false).then(_ => {
    // Validate chain
    console.log('Validate chain: ')
    blockchain.validateChain();
  });
}, 3000);

// // Destroy all nodes
setTimeout(() => {
  blockchain.iterateChain(true).then(_ => {
    console.log('All blocks removed')
  });
}, 5000);