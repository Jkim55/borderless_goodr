// Futher refactor prePopulate() -> pull object, don't make an array of country names
// Store the object as a string in local storage.
// Therefore, do not even need to createa the country URL


// FUNCTION: consumes travelbriefing's all-countries JSON & prepopulate search options for search box:index
$(function prePopulate() {
  localStorage.removeItem('selectedCountry')
  localStorage.removeItem('countryInfo')
  let countryNames = []
  if (localStorage.getItem("allCountriesJSON") === null){
    const mainURL="https://galvanize-cors-proxy.herokuapp.com/https://travelbriefing.org/countries.json"
    $.get(mainURL)
    .then((data)=>{
      data = JSON.stringify(data);
      localStorage.setItem("allCountriesJSON", data)
      data = JSON.parse(data);
      for(let country in data) {
        countryNames.push(data[country].name)
      }
    })
    .catch((error)=>{
      console.error(error)
    })
  } else {
    let allCountriesJSON = localStorage.getItem("allCountriesJSON")
    console.log("allCountriesJSON from localStorage fetched")
    allCountriesJSON = JSON.parse(allCountriesJSON);
    for(let country in allCountriesJSON){
      countryNames.push(allCountriesJSON[country].name)
    }
  }
  $("#searchBox").autocomplete({
    source: countryNames
  })
})

// FUNCTION: pull value and store it
$("#submit").click((event)=>{
  event.preventDefault()
  selectedCountryName = $("#searchBox").val()
  // if country name isn't found with array... (make case ignorant)
  //    send an error message that input wasn't valid
  // else
  //    capitalize the value
  localStorage.setItem("selectedCountry", selectedCountryName)   // Store the object
  $(location).attr("href", "selectedCountry.html")
})
