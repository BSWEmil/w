function changeText() {
    const demoText = document.getElementById("demoText");
    demoText.textContent = "Super! Dieser Text wurde mit JavaScript verändert.";
}

function resetText() {
    const demoText = document.getElementById("demoText");
    demoText.textContent = "Klicke auf einen Button und verändere diesen Text.";
}

let points = 0;

function addPoint() {
    const clickScore = document.getElementById("clickScore");
    points += 1;

    if (clickScore) {
        clickScore.textContent = `Du hast ${points} Punkte.`;
    }
}

function resetPoints() {
    const clickScore = document.getElementById("clickScore");
    points = 0;

    if (clickScore) {
        clickScore.textContent = "Du hast 0 Punkte.";
    }
}

function setFeedback(id, text, success) {
    const feedback = document.getElementById(id);

    if (!feedback) {
        return;
    }

    feedback.textContent = text;
    feedback.className = success ? "feedback success" : "feedback error";
}

function checkHtmlMission() {
    const openTag = document.getElementById("htmlAnswer");
    const closeTag = document.getElementById("htmlAnswerClose");

    if (!openTag || !closeTag) {
        return;
    }

    const isCorrect = openTag.value.trim().toLowerCase() === "h1"
        && closeTag.value.trim().toLowerCase() === "h1";

    setFeedback(
        "htmlFeedback",
        isCorrect
            ? "Richtig! <h1> und </h1> machen eine große Hauptüberschrift."
            : "Fast. Schreibe in beide Felder h1, weil das öffnende und schließende Tag zusammenpassen müssen.",
        isCorrect
    );
}

function checkHtmlLinkMission(isCorrect) {
    setFeedback(
        "htmlLinkFeedback",
        isCorrect
            ? "Richtig! Links baut man mit dem a-Tag und dem href-Attribut."
            : "Noch nicht. Ein echter Link braucht das Tag <a> und ein href-Attribut.",
        isCorrect
    );
}

function runHtmlPreview() {
    const htmlInput = document.getElementById("htmlInput");
    const htmlPreviewFrame = document.getElementById("htmlPreviewFrame");

    if (!htmlInput || !htmlPreviewFrame) {
        return;
    }

    const previewDocument = htmlPreviewFrame.contentDocument || htmlPreviewFrame.contentWindow.document;
    previewDocument.open();
    previewDocument.write(`
        <!DOCTYPE html>
        <html lang="de">
        <head>
            <meta charset="UTF-8">
            <style>
                body {
                    margin: 0;
                    padding: 18px;
                    font-family: Arial, sans-serif;
                    color: #05223f;
                    background: #f2fbff;
                }

                a {
                    color: #006fc9;
                    font-weight: 700;
                }
            </style>
        </head>
        <body>${htmlInput.value}</body>
        </html>
    `);
    previewDocument.close();
}

function loadHtmlExample() {
    const htmlInput = document.getElementById("htmlInput");

    if (!htmlInput) {
        return;
    }

    htmlInput.value = `<h1>Meine erste Website</h1>
<p>Hier steht mein erster Text.</p>
<a href="index.html">Zur Startseite</a>
<ul>
    <li>HTML schreibt Inhalte</li>
    <li>Tags geben dem Inhalt Bedeutung</li>
</ul>`;
    runHtmlPreview();
}

function checkCssColorMission(isCorrect) {
    setFeedback(
        "cssColorFeedback",
        isCorrect
            ? "Richtig! `color` ändert die Textfarbe."
            : "Noch nicht. `background` ist für den Hintergrund, `padding` für Innenabstand.",
        isCorrect
    );
}

function checkCssPaddingMission(isCorrect) {
    setFeedback(
        "cssPaddingFeedback",
        isCorrect
            ? "Richtig! `padding` ist der Innenabstand einer Box."
            : "Noch nicht. `border` ist der Rand und `color` ist die Textfarbe.",
        isCorrect
    );
}

function runCssMission() {
    const cssInput = document.getElementById("cssInput");
    let styleTag = document.getElementById("cssMissionStyle");

    if (!cssInput) {
        return;
    }

    if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "cssMissionStyle";
        document.head.appendChild(styleTag);
    }

    styleTag.textContent = cssInput.value;
}

function checkCssMission() {
    const cssInput = document.getElementById("cssInput");

    if (!cssInput) {
        return;
    }

    const css = cssInput.value.toLowerCase();
    const hasBackground = css.includes("background");
    const hasColor = css.includes("color");
    const hasBorder = css.includes("border");
    const isCorrect = hasBackground && hasColor && hasBorder;

    runCssMission();
    setFeedback(
        "cssFeedback",
        isCorrect
            ? "Stark! Deine CSS-Karte hat Hintergrund, Textfarbe und Rand."
            : "Noch nicht ganz. Deine Lösung braucht background, color und border.",
        isCorrect
    );
}

function checkJsMission(isCorrect) {
    setFeedback(
        "jsFeedback",
        isCorrect
            ? "Genau! textContent ist die richtige Eigenschaft, um sichtbaren Text zu ändern."
            : "Nicht ganz. Schau nach der Zeile, die `textContent` benutzt.",
        isCorrect
    );
}

function checkJsIdMission(isCorrect) {
    setFeedback(
        "jsIdFeedback",
        isCorrect
            ? "Genau! Mit document.getElementById('titel') findest du ein Element über seine ID."
            : "Nicht ganz. Suche nach der Methode, in der `Id` direkt im Namen steht.",
        isCorrect
    );
}

function addJsConsoleLine(type, text) {
    const jsConsoleOutput = document.getElementById("jsConsoleOutput");

    if (!jsConsoleOutput) {
        return;
    }

    const line = document.createElement("p");
    line.className = type === "error" ? "console-line error" : "console-line";
    line.textContent = text;
    jsConsoleOutput.appendChild(line);
    jsConsoleOutput.scrollTop = jsConsoleOutput.scrollHeight;
}

function clearJsConsole(message = "Konsole bereit. Starte dein JavaScript.") {
    const jsConsoleOutput = document.getElementById("jsConsoleOutput");

    if (!jsConsoleOutput) {
        return;
    }

    jsConsoleOutput.innerHTML = "";
    addJsConsoleLine("log", message);
}

function runJsPlayground() {
    const jsInput = document.getElementById("jsInput");

    if (!jsInput) {
        return;
    }

    clearJsConsole("JavaScript wird ausgeführt...");

    const testConsole = {
        log: (...values) => addJsConsoleLine("log", values.join(" "))
    };

    try {
        const runner = new Function("console", "document", jsInput.value);
        runner(testConsole, document);
        addJsConsoleLine("log", "Fertig.");
    } catch (error) {
        addJsConsoleLine("error", error.message);
    }
}

function loadJsExample() {
    const jsInput = document.getElementById("jsInput");

    if (!jsInput) {
        return;
    }

    jsInput.value = `const box = document.getElementById("jsTestTarget");
box.textContent = "Das Beispiel wurde geladen!";
box.style.borderColor = "#00a6ff";
console.log("Beispiel läuft.");`;
    runJsPlayground();
}

function checkProjectPlan() {
    const topic = document.getElementById("projectTopic");
    const color = document.getElementById("projectColor");
    const page = document.getElementById("projectPage");

    if (!topic || !color || !page) {
        return;
    }

    const isReady = topic.value.trim() && color.value.trim() && page.value.trim();

    setFeedback(
        "projectFeedback",
        isReady
            ? `Mission bereit: Baue eine Website über ${topic.value.trim()} mit der Hauptfarbe ${color.value.trim()} und starte mit der Seite "${page.value.trim()}".`
            : "Fülle alle drei Felder aus, dann entsteht daraus deine Projekt-Mission.",
        Boolean(isReady)
    );
}

function runCode() {
    const htmlInput = document.getElementById("htmlInput");
    const previewFrame = document.getElementById("previewFrame");

    if (!htmlInput || !previewFrame) {
        return;
    }

    clearConsole("Live-Ausgabe neu gestartet.");

    const previewDocument = previewFrame.contentDocument || previewFrame.contentWindow.document;
    previewDocument.open();
    previewDocument.write(`
        <!DOCTYPE html>
        <html lang="de">
        <head>
            <meta charset="UTF-8">
            <style>
                body {
                    margin: 0;
                    padding: 18px;
                    font-family: Arial, sans-serif;
                    color: #05223f;
                    background: #f2fbff;
                }

                button {
                    padding: 10px 14px;
                    border: 0;
                    border-radius: 6px;
                    background: #008ee6;
                    color: white;
                    font-weight: 700;
                }
            </style>
        </head>
        <body>
            <script>
                (function () {
                    const send = function (type, values) {
                        parent.postMessage({
                            source: "emil-live-preview",
                            type: type,
                            values: Array.from(values).map(function (value) {
                                if (typeof value === "object") {
                                    try {
                                        return JSON.stringify(value);
                                    } catch (error) {
                                        return String(value);
                                    }
                                }

                                return String(value);
                            })
                        }, "*");
                    };

                    console.log = function () {
                        send("log", arguments);
                    };

                    window.onerror = function (message, file, line) {
                        send("error", [message + " (Zeile " + line + ")"]);
                    };
                })();
            <\/script>
            ${htmlInput.value}
        </body>
        </html>
    `);
    previewDocument.close();
}

function addConsoleLine(type, text) {
    const consoleOutput = document.getElementById("consoleOutput");

    if (!consoleOutput) {
        return;
    }

    const line = document.createElement("p");
    line.className = type === "error" ? "console-line error" : "console-line";
    line.textContent = text;
    consoleOutput.appendChild(line);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function clearConsole(message = "Konsole bereit. Nutze console.log(...) in deinem HTML.") {
    const consoleOutput = document.getElementById("consoleOutput");

    if (!consoleOutput) {
        return;
    }

    consoleOutput.innerHTML = "";
    addConsoleLine("log", message);
}

function loadExample() {
    const htmlInput = document.getElementById("htmlInput");

    if (!htmlInput) {
        return;
    }

    htmlInput.value = `<h1>Meine erste Mini-Seite</h1>
<p>Ich lerne gerade HTML und baue eigene Sachen.</p>
<ul>
    <li>Überschrift</li>
    <li>Text</li>
    <li>Liste</li>
</ul>
<button onclick="console.log('Du hast den Button geklickt!')">Klick mich</button>
<script>
    console.log('Hallo Emil, deine Seite läuft!');
</script>`;
    runCode();
}

window.addEventListener("message", (event) => {
    if (!event.data || event.data.source !== "emil-live-preview") {
        return;
    }

    addConsoleLine(event.data.type, event.data.values.join(" "));
});

document.addEventListener("DOMContentLoaded", () => {
    const htmlInput = document.getElementById("htmlInput");
    const cssInput = document.getElementById("cssInput");
    const jsInput = document.getElementById("jsInput");

    if (htmlInput) {
        htmlInput.addEventListener("input", runHtmlPreview);
        runHtmlPreview();
    }

    if (cssInput) {
        cssInput.addEventListener("input", runCssMission);
        runCssMission();
    }

    if (jsInput) {
        clearJsConsole();
    }

    runCode();
});
