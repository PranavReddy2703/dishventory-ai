document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('upload-form');
  const forecastResultsDiv = document.getElementById('forecast-results');
  const rawMaterialsDiv = document.getElementById('raw-materials-suggested');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    forecastResultsDiv.textContent = 'Loading forecast...';
    rawMaterialsDiv.textContent = 'Loading raw materials...';

    const fileInput = document.getElementById('data-file');
    if (fileInput.files.length === 0) {
      alert('Please select a file to upload.');
      forecastResultsDiv.textContent = '';
      rawMaterialsDiv.textContent = '';
      return;
    }

    const formData = new FormData();
    formData.append('data-file', fileInput.files[0]);

    try {
      // Replace this URL with your actual backend API endpoint
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const result = await response.json();

      // Assuming your backend returns something like:
      // { forecast: "...", raw_materials: "..." }
      // Adjust these keys according to your API response

      forecastResultsDiv.textContent =
        result.forecast || 'No forecast data received.';
      rawMaterialsDiv.textContent =
        result.raw_materials || 'No raw materials data received.';
    } catch (error) {
      forecastResultsDiv.textContent = 'Error loading forecast.';
      rawMaterialsDiv.textContent = 'Error loading raw materials.';
      console.error('Error:', error);
      alert('An error occurred while fetching the forecast. Please try again.');
    }
  });
});
