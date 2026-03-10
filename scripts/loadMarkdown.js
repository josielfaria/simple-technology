async function loadMarkdown(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Erro ao carregar: ${response.status}`);

    const markdown = await response.text();
    const html = marked.parse(markdown);
    document.getElementById('content').innerHTML = html;
  } catch (error) {
    console.error('Erro:', error);
    document.getElementById('content').innerHTML =
      `<p style="color: red;">Erro ao carregar arquivo: ${error.message}</p>`;
  }
}

// Carregar arquivo ao abrir a página
// loadMarkdown('./estudo.md');
