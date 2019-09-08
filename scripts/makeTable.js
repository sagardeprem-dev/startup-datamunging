

function CreateTableFromJSON(sessions) {
    
    var table = d3.select('body').append('table')
                                    // .append('thead')
                                    // .append('tbody')
                                    // .append('tr')
                                    // .append('td')
                                    
                                    // .append('tbody');

    // create the table header
    // var thead = d3.select("thead").selectAll("th")
    var thead = table.append("thead").selectAll("th")
    .data(d3.keys(sessions[0]))
    .enter().append("th").text(function(d){return d});

    // fill the table
    // create rows
    // var tr = d3.select("tbody").selectAll("tr")
    var tr = table.append("tbody").selectAll("tr")
    .data(sessions).enter().append("tr")

    // cells
    var td = tr.selectAll("td")
      .data(function(d){return d3.values(d)})
      .enter().append("td")
      .text(function(d) {return d})
}