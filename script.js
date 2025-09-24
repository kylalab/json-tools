function prettyPrint() {
  try {
    const input = document.getElementById("input").value;
    const obj = JSON.parse(input);
    document.getElementById("output").value = JSON.stringify(obj, null, 2);
  } catch (e) {
    alert("유효하지 않은 JSON 입니다.");
  }
}

function minify() {
  try {
    const input = document.getElementById("input").value;
    const obj = JSON.parse(input);
    document.getElementById("output").value = JSON.stringify(obj);
  } catch (e) {
    alert("유효하지 않은 JSON 입니다.");
  }
}

function validate() {
  try {
    const input = document.getElementById("input").value;
    JSON.parse(input);
    alert("✅ JSON 유효합니다!");
  } catch (e) {
    alert("❌ JSON 유효하지 않습니다: " + e.message);
  }
}

function jsonToCsv() {
  try {
    const input = document.getElementById("input").value;
    const arr = JSON.parse(input);
    if (!Array.isArray(arr)) throw new Error("JSON 배열만 CSV로 변환 가능합니다.");
    const keys = Object.keys(arr[0]);
    const delimiter = document.getElementById("delimiter").value;
    const csv = [
      keys.join(delimiter),
      ...arr.map(row => keys.map(k => row[k]).join(delimiter))
    ].join("\n");
    document.getElementById("output").value = csv;
  } catch (e) {
    alert("변환 오류: " + e.message);
  }
}

function csvToJson() {
  try {
    const input = document.getElementById("input").value;
    const delimiter = document.getElementById("delimiter").value;
    const [headerLine, ...lines] = input.split("\n");
    const headers = headerLine.split(delimiter);
    const json = lines.map(line => {
      const values = line.split(delimiter);
      return headers.reduce((obj, key, i) => {
        obj[key] = values[i];
        return obj;
      }, {});
    });
    document.getElementById("output").value = JSON.stringify(json, null, 2);
  } catch (e) {
    alert("변환 오류: " + e.message);
  }
}

function copyOutput() {
  const output = document.getElementById("output");
  output.select();
  document.execCommand("copy");
  alert("출력이 복사되었습니다.");
}

function downloadOutput() {
  const text = document.getElementById("output").value;
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "output.txt";
  a.click();
  URL.revokeObjectURL(url);
}

function clearAll() {
  document.getElementById("input").value = "";
  document.getElementById("output").value = "";
}

function toggleDarkMode() {
  const body = document.body;
  const footer = document.getElementById("site-footer");
  const btn = document.getElementById("dark-mode-btn");

  body.classList.toggle("dark");
  footer.classList.toggle("dark-footer");

  if (body.classList.contains("dark")) {
    btn.textContent = "☀️ Light Mode";
  } else {
    btn.textContent = "🌙 Dark Mode";
  }
}
