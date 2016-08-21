// GLOBAL VARIABLE
let selectedCountryName


// FUNCTION: consumes travelbriefing's all-countries JSON & prepopulate search options for search box:index
$(function prePopulate() {
  localStorage.removeItem('selectedCountry')                       // localStorage.clear()
  localStorage.removeItem('countryInfo')
  let countryNames = []
  if (localStorage.getItem("allCountriesJSON") === null){
    const mainURL="https://galvanize-cors-proxy.herokuapp.com/https://travelbriefing.org/countries.json"
    $.get(mainURL)
    .then((data)=>{
      data = JSON.stringify(data);
      localStorage.setItem("allCountriesJSON", data)
      data = JSON.parse(data);
      for (let country in data) {
        countryNames.push(data[country].name)
      }
    })
    .catch((error)=> {
      console.error(error)
    })
  } else {
    let allCountriesJSON = localStorage.getItem("allCountriesJSON")
    allCountriesJSON = JSON.parse(allCountriesJSON);
    for (let country in allCountriesJSON){
      countryNames.push(allCountriesJSON[country].name)
    }
  }
  $("#searchBox").autocomplete({
    source: countryNames
  })
})

// FUNCTION: onClick "#submit", do (1-3)
$("#submit").click((event)=>{
  event.preventDefault()
  selectedCountryName = $("#searchBox").val()                   // (1)prevent default
  localStorage.setItem("selectedCountry", selectedCountryName)  // (2)save value in textbox to localStorage
  $(location).attr("href", "selectedCountry.html")              // (3) navigate to country page
})
