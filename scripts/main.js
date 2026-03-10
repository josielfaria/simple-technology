// Utility function to load and inject HTML
async function loadHTML(filePath) {
  try {
    const response = await fetch(filePath);
    const html = await response.text();
    document.getElementById("content").innerHTML = html;
  } catch (error) {
    console.error("Error loading HTML:", error);
  }
}

// Load home on page load
loadHTML("./home.html");
