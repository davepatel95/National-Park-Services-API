'use strict';

const API_KEY = 'dF5vV6GzV6Gd8UUV1aS232yrzieKhPDg9gCbJkuS';
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params){
    const queryItems = Object.keys(params).map(
        key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    );
    return queryItems.join('&');
        

}

function displayResults(data) {
    console.log(data);
    $('.results-list').empty();
    
    for (let i = 0; i < data.data.length; i++){



        $('.results-list').append(
            `<li><h3>${data.data[i].name}</h3>
            <p><span class="results-title">Description:</span> ${data.data[i].description}</p>
            <p><span class="results-title">URL:</span> <a href="${data.data[i].url}">${data.data[i].url}</a></p>
            <p><span class="results-title">Address:</span> ${data.data[i].directionsInfo}</p></li>`
        )
    }

    $('.results').removeClass('hidden');
}


function stateParkResults(query, maxResults = 10) {
    maxResults -= 1;

    const params = {
        api_key: API_KEY,
        limit: maxResults,
        stateCode: query
    };

    const queryString = formatQueryParams(params);
    const fullURL = searchURL + '?' + queryString;

    fetch(fullURL)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(data => displayResults(data))
        .catch(error => {
            $('.error-message').text(`Something went wrong: ${error.message}`);
        });
}



function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        let state = $('.state-name-input').val();
        let maxResults = $('.max-results').val();
        $('.results').empty;
        stateParkResults(state, maxResults);
    })
}

$(function() {
    console.log('App Loaded. Waiting on Submission');
    watchForm();
})