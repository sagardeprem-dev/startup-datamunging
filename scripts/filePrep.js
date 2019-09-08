const fs = require('fs') 
  
// Reading data in utf-8 format 
// which is a type of character set. 
// Instead of 'utf-8' it can be  
// other character set also like 'ascii' 
fs.readFile('data/startupFundingData.json', 'utf-8', (err, data) => { 
    if (err) throw err; 
    var obj = {};
    // Converting Raw Buffer to text 
    // data using tostring function. 
    arr = JSON.parse(data);
    for(var index in  arr) {
        obj[index] = arr[index];
    }
    fs.writeFile('myjsonfile.json', JSON.stringify(obj),'utf-8',(err) => {
        if (err) throw err
        console.log('The file has been saved!')})
    console.log(obj); 
}) 
// var text = JSON.parse(text)
// console.log(text)