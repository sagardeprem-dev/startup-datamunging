fetch('http://localhost:3000/startups')
.then(res => res.json())//response type
.then(data => {
  data = processData(data);
  CreateTableFromJSON(selectData(data));
  pieChart(iDistro(data,"count"));
  pieChart(iDistro(data,"value"));
  horizontalBarChart(getLocations(data));

}) //log the data;





// // barChart(locArr)

// //top 3 investors year-wise

// //first extract year


// for (let item in data){
//     data[item].year=parseInt(data[item].Date.match(/[0-9]{4}$/)[0]);
//     data[item].AmountInUSD = parseInt(data[item].AmountInUSD.replace(/\,/g,""));
// }
// console.log(data)
// const groupBy = (array, key) => {
//     // Return the end result
//     return array.reduce((result, currentValue) => {
//       // If an array already present for key, push it to the array. Else create an array and push the object
//       (result[currentValue[key]] = result[currentValue[key]] || []).push(
//         currentValue
//       );
//       // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
//       return result;
//     }, {}); // empty object is the initial value for result object
// };
// const groupedByYear = groupBy(Object.values(data), 'year');

// let topThree = {};
// for (let item in groupedByYear){
//     groupedByYear[`${item}`].sort((a,b)=>{return b.AmountInUSD - a.AmountInUSD});
//     topThree[item]=groupedByYear[`${item}`].slice(0,3);

// }
// console.log(topThree)

// //Preferred destination
function getLocations(data){
  let loc = [];
  for(let item in data){
      loc.push(data[item].CityLocation)
  }
  var obj1 = {};
  for (var i=0; i < loc.length; i++) {
    obj1[loc[i]] = (obj1[loc[i]] || 0) +1 ;
  }
  var locArr = [];
  for (const [key, value] of Object.entries(obj1)) {
    locArr.push({name:key, value:value});
  }
  locArr.sort((a,b)=>{return b.value - a.value});
  let others=locArr.findIndex(k => k.name=="")
  locArr.splice(locArr.length,0,locArr.splice(others,1)[0]);
  console.log(locArr.slice(0,6));
  return locArr.slice(0,6)
}

function selectData(data){
  data.sort((a,b)=>{
    return new Date(a.Date) - new Date(b.Date)
  })
  let from = data.findIndex(k => +k.Date >= new Date(2017, 01,01).toString())
  let to = data.findIndex(k => +k.Date <= new Date(2017, 08,01).toString())
  console.log(from)
  console.log(to)
  // return data.slice(from, to);
  return data
}

function iDistro(data,type) {
  let iType = [];
  for(let item in data){
      iType.push(data[item].InvestmentType);
  }
  let obj = {};
  for (let i=0; i < iType.length; i++) {
    if (type=="count") {obj[iType[i]] = (obj[iType[i]] || 0) + 1 ;}
    else if (type=="value"){obj[iType[i]] = (obj[iType[i]] || 0) + data[i].AmountInUSD ;}
  }
  console.log(obj)
  return obj
}

function processData (data){
  for (let item in data){
      data[item].year=parseInt(data[item].Date.match(/[0-9]{4}$/)[0]);
      data[item].AmountInUSD = parseInt(data[item].AmountInUSD.replace(/\,/g,""));
      date = data[item].Date.split(/\//)
      // data[item].Date = [date[1],date[0], date[2]].join('-')
      data[item].Date = new Date(date[2],date[1], date[0]).toDateString()
  }
  let unknowns = [];
  for (let item in data){
    if(isNaN(data[item].AmountInUSD)) {unknowns.push(item)}
  }
  for (var i = unknowns.length -1; i >= 0; i--){
    data.splice(unknowns[i],1)
  }
  return data;
}

