document.addEventListener('DOMContentLoaded', () => {
    const convertBtn = document.getElementById('convertBtn');
    const javaInput = document.getElementById('javaInput');
    const playwrightOutput = document.getElementById('playwrightOutput');
    const statusText = document.getElementById('statusText');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    // Load saved Java input if any
    const savedInput = localStorage.getItem('javaInput');
    if (savedInput) {
        javaInput.value = savedInput;
    }

    javaInput.addEventListener('input', () => {
        localStorage.setItem('javaInput', javaInput.value);
    });

    convertBtn.addEventListener('click', async () => {
        const javaCode = javaInput.value.trim();
        if (!javaCode) {
            alert('Please enter Selenium Java code first.');
            return;
        }

        setLoading(true);
        statusText.textContent = 'Converting via Ollama (codellama)...';

        try {
            const response = await fetch('/api/convert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ java_code: javaCode })
            });

            const data = await response.json();

            if (response.ok) {
                let code = data.playwright_code;
                // Clean markdown fences
                code = code.replace(/^```typescript\s*/, '').replace(/^```\s*/, '').replace(/```$/, '');
                playwrightOutput.value = code;
                statusText.textContent = 'Conversion Complete!';
            } else {
                statusText.textContent = `Error: ${data.error}`;
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error(error);
            statusText.textContent = 'Network or Server Error';
            alert('Failed to connect to the backend.');
        } finally {
            setLoading(false);
        }
    });

    copyBtn.addEventListener('click', () => {
        if (!playwrightOutput.value) return;
        navigator.clipboard.writeText(playwrightOutput.value);
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span>Saved!</span>';
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    });

    downloadBtn.addEventListener('click', () => {
        const code = playwrightOutput.value;
        if (!code) return;
        
        const blob = new Blob([code], { type: 'text/typescript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'test.spec.ts';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    function setLoading(isLoading) {
        convertBtn.disabled = isLoading;
        javaInput.disabled = isLoading;
        if (isLoading) {
            convertBtn.innerHTML = '<span class="loader"></span> Converting...';
        } else {
            convertBtn.innerHTML = 'Convert Code';
            javaInput.disabled = false;
        }
    }
});
