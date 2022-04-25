export function parseHTML(str) {
  let lines = str.split("\n");
  let html = "";
  for (let i = 0; i < lines.length; i++) {
    html += "<p>" + lines[i] + "</p>";
  }
  return html;
}
