export const handleAIRewrite = async () => {
    const selection = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(
      selection.from,
      selection.to
    );
    if (!selectedText) return;
    setAiTyping(true);
    const response = await fetch("http://localhost:8000/ai-edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: selectedText,
        style: "write hi",
      }),
    });

    const data = await response.json();
    const aiText = data.result;
    if (!aiText) {
      setAiTyping(false);
      return;
    }

    editor
      .chain()
      .focus()
      .deleteRange({ from: selection.from, to: selection.to })
      .run();

    let typed = "";
    for (let i = 0; i < aiText.length; i++) {
      typed += aiText[i];
      editor
        .chain()
        .focus()
        .deleteRange({
          from: selection.from,
          to: selection.from + typed.length,
        })
        .insertContentAt(
          selection.from,
          `<mark class="bg-yellow-100">${typed}</mark>`
        )
        .run();

      await new Promise((res) => setTimeout(res, 10));
    }

    setAiTyping(false);
  };