// // // Read the json file from the url to confirm and understand the data architecture // // //

// URL for fetching the data
const link = '/api/salary_data';

// Use the d3.json function to read in the data from the url
const dataProm = d3.json(link)

// Print to console to confirm
console.log(dataProm)

// Use "then" method on the promised data (dataProm) to passin a function 
dataProm.then(function(data){
    console.log(data)
    console.log(Object.keys(data));
    console.log(Object.values(data));
})


// // // // Create 'initialize' function (int) to populate the dropdown menu and plot charts with first ID in 'names' // // //

// function init() {
//   // Read in the data from the url
//   dataProm.then((data => {

//     console.log('data: ' + JSON.stringify(data)) 
    
//     // Using d3, select the element with id="selDataset" for rendering/ creating  'dropdown menu' (user input)
//     var dropdown = d3.select("#selDataset");

  
//     // Populate the dropdown menu with all the participant's ID - For each name (ID) in data.names, add each name as an option to the dropdown menu 
//     data.names.forEach((name => {
//       console.log('name: ' + name)
//       var option = dropdown.append('option').text(name).property('value', name);
      
//       console.log('option: ' + JSON.stringify(option));

//     }));

//     // Get the first participant ID (initID) from 'data.names' for the initial setup of all charts/table
//     var initID = data.names[0]
    
//     // Call demographic and plotChart (bar and bubble chart) functions with initID for initial display
//     demographicInfo(initID);
//     plotChart(initID);  
//   }));
// }


// // // // Create 'changeOption' function to render/create charts with the 'selected ID' data // // //

// function optionChanged(selectedID) {
//   demographicInfo(selectedID);
//   plotChart(selectedID);
// };

// // // // Create function for plotChart (bar and bubble chart) // // //

function plotChart() {
  // Read in the data from the Link
  dataProm.then((data => {

//     // To get the test subject (selectedID), filter the 'data.samples' on ID  
//     testSubject = data.samples.filter(sample => sample.id == selectedID)[0];
//     // console.log("testSubject: " + JSON.stringify(testSubject))    

    // Extract data from dictionary for plotting
    var salary = Object.values(data);
    var title = Object.keys(data);
    
    // Horizontal Bar Chart 
    // 'text' is used to add hovertext
    var trace1 = {
      x: salary,
      y: title,    
      name: 'Salary',
      orientation: 'h',
      type: 'bar',      
      marker: {
        color: '#e377c2',
        line: {color: 'rgb(8,48,107)', width: 1.5}
      }      
    };

    var data = [trace1]
    var layout = {
      title: {text: 'Average Salary Distribution by Title', font: {family: 'Arial Black', size: 24}},
      xaxis: { title: {text: 'Average Salary', font: {family: 'Arial Black', size: 14}}},
      // yaxis: { title: {text: 'Title', font: {family: 'Arial Black', size: 14}}},
      height: 600,
      width: 900 
    };  
           
    // Plot the bar chart (@ div with id='bar' in salary.html)
    Plotly.newPlot('bar', data, layout);  

  }));    
};

// Call the 'plotChart' function //
plotChart()