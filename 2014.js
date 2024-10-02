document.addEventListener('DOMContentLoaded', function () {
    loadTracksForYear(2014); // Load tracks specifically for 2016 when the page is loaded
    // Add any additional 2016-specific functionality here if needed
});

// Add event listener for the sonnet button click
document.getElementById('poem-button').addEventListener('click', async () => {
    const ts = 2014; // Replace this with the actual timestamp or year you want to use
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
    loadIPAddresses(2014); // Replace 2014 with the year you want to load
});

// Open ipinfo.io in a new tab
document.getElementById('open-ipinfo').addEventListener('click', function() {
    window.open('https://ipinfo.io/', '_blank');
});