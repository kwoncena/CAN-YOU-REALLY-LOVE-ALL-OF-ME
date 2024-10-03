document.addEventListener('DOMContentLoaded', function () {
    loadTracksForYear(2018); // Load tracks specifically for 2016 when the page is loaded
    // Add any additional 2016-specific functionality here if needed
});

// Add event listener for the sonnet button click
document.getElementById('poem-button').addEventListener('click', async () => {
    const ts = 2018; // Replace this with the actual timestamp or year you want to use
    const trackNames = await fetchSonnetTrackNames(ts);

    if (trackNames.length > 0) {
        const sonnet = generateStructuredSonnet(trackNames);
        displaySonnetWithTypingEffect(sonnet);
    } else {
        console.log('No track names found for the sonnet.');
    }
});
// Example usage: Load IP addresses for a specific year when the page loads
document.addEventListener('DOMContentLoaded', function () {
    loadIPAddresses(2018); // Replace 2014 with the year you want to load
});
window.addEventListener('load', function() {
    const selectedYear = 2018; // You can dynamically change this year as needed
    loadIpAddressesForYear(selectedYear);
});