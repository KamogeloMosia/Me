<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Frontend AI Generator</title>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@3.9.4/dist/full.css" rel="stylesheet" type="text/css" />
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .preview-frame {
            border: 1px solid #333;
            border-radius: 8px;
            height: 500px;
            background: white;
        }
        .mono-badge {
            font-family: monospace;
            font-size: 0.75rem;
        }
        .code-panel {
            max-height: 200px;
            overflow-y: auto;
        }
        .model-card {
            transition: all 0.3s ease;
            border: 1px solid #333;
        }
        .model-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        @media (max-width: 768px) {
            .preview-frame {
                height: 300px;
            }
        }
    </style>
</head>
<body class="bg-base-100 text-base-content">
    <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <header class="mb-12 text-center">
            <h1 class="text-4xl font-bold mb-2">Frontend AI Generator</h1>
            <p class="text-lg opacity-75">Create HTML, CSS, and JavaScript with specialized AI models</p>
            <div class="divider w-1/3 mx-auto"></div>
        </header>

        <!-- Model Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div class="model-card bg-base-200 rounded-xl p-6">
                <div class="flex items-center mb-4">
                    <div class="bg-gray-800 text-white p-2 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold">HTML Generator</h3>
                </div>
                <p class="text-sm opacity-80 mb-4">Creates semantic HTML structure with Tailwind classes</p>
                <div class="badge badge-outline mono-badge">deepseek-html-1.3b</div>
            </div>
            
            <div class="model-card bg-base-200 rounded-xl p-6">
                <div class="flex items-center mb-4">
                    <div class="bg-gray-800 text-white p-2 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold">CSS Stylist</h3>
                </div>
                <p class="text-sm opacity-80 mb-4">Generates Tailwind CSS with DaisyUI components</p>
                <div class="badge badge-outline mono-badge">deepseek-css-1.3b</div>
            </div>
            
            <div class="model-card bg-base-200 rounded-xl p-6">
                <div class="flex items-center mb-4">
                    <div class="bg-gray-800 text-white p-2 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold">JS Connector</h3>
                </div>
                <p class="text-sm opacity-80 mb-4">Creates JavaScript for page interactions and routing</p>
                <div class="badge badge-outline mono-badge">deepseek-js-1.3b</div>
            </div>
        </div>

        <!-- Generator Panel -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <!-- Input Panel -->
            <div class="bg-base-200 rounded-xl p-6">
                <h2 class="text-2xl font-bold mb-6">Generate Frontend</h2>
                
                <div class="mb-6">
                    <label class="label">
                        <span class="label-text">Describe what you need:</span>
                    </label>
                    <textarea 
                        id="promptInput" 
                        class="textarea textarea-bordered w-full h-32" 
                        placeholder="Example: Create a responsive contact form with validation and dark mode toggle"></textarea>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <button id="generateHtml" class="btn btn-outline">HTML Only</button>
                    <button id="generateCss" class="btn btn-outline">CSS Only</button>
                    <button id="generateAll" class="btn btn-primary">Generate All</button>
                </div>
                
                <div class="bg-base-300 rounded-lg p-4 mb-6">
                    <h3 class="font-bold mb-2">Model Status</h3>
                    <div class="flex items-center mb-2">
                        <div class="w-3 h-3 rounded-full bg-success mr-2"></div>
                        <span>HTML Model: Ready</span>
                    </div>
                    <div class="flex items-center mb-2">
                        <div class="w-3 h-3 rounded-full bg-success mr-2"></div>
                        <span>CSS Model: Ready</span>
                    </div>
                    <div class="flex items-center">
                        <div class="w-3 h-3 rounded-full bg-success mr-2"></div>
                        <span>JS Model: Ready</span>
                    </div>
                </div>
                
                <div class="alert alert-info">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span>Tip: Be specific! Add details about layout, colors, and functionality.</span>
                    </div>
                </div>
            </div>
            
            <!-- Preview Panel -->
            <div class="bg-base-200 rounded-xl p-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold">Live Preview</h2>
                    <div class="flex space-x-2">
                        <button id="refreshPreview" class="btn btn-sm btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Refresh
                        </button>
                        <button id="darkModeToggle" class="btn btn-sm btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                            Theme
                        </button>
                    </div>
                </div>
                
                <div class="preview-frame rounded-lg bg-white">
                    <iframe id="livePreview" class="w-full h-full rounded-lg" srcdoc="<html><head><style>body { display: flex; justify-content: center; align-items: center; height: 100%; color: #333; }</style></head><body><p class='text-lg'>Your preview will appear here</p></body></html>"></iframe>
                </div>
                
                <div class="mt-4 flex space-x-2">
                    <button id="exportHtml" class="btn btn-outline btn-sm">Export HTML</button>
                    <button id="exportZip" class="btn btn-primary btn-sm">Export Project</button>
                </div>
            </div>
        </div>
        
        <!-- Generated Code Panel -->
        <div class="bg-base-200 rounded-xl p-6 mb-12">
            <h2 class="text-2xl font-bold mb-6">Generated Code</h2>
            
            <div class="tabs mb-4">
                <a class="tab tab-bordered tab-active">HTML</a> 
                <a class="tab tab-bordered">CSS</a> 
                <a class="tab tab-bordered">JavaScript</a>
            </div>
            
            <div class="code-panel bg-base-300 rounded-lg p-4">
                <pre class="text-sm overflow-x-auto"><code id="htmlCode">&lt;!-- HTML will be generated here --&gt;</code></pre>
                <pre class="text-sm overflow-x-auto hidden"><code id="cssCode">/* CSS will be generated here */</code></pre>
                <pre class="text-sm overflow-x-auto hidden"><code id="jsCode">// JavaScript will be generated here</code></pre>
            </div>
        </div>
        
        <!-- Footer -->
        <footer class="text-center py-8 border-t border-base-300">
            <p>Powered by DeepSeek 1.3B specialized models • Optimized for offline use</p>
            <p class="text-sm opacity-75 mt-2">All models quantized to 4-bit for efficient execution</p>
        </footer>
    </div>

    <script>
        // UI Interactions
        document.getElementById('darkModeToggle').addEventListener('click', () => {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            html.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
        });
        
        // Tab switching
        const tabs = document.querySelectorAll('.tabs .tab');
        const codePanels = document.querySelectorAll('.code-panel pre');
        
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('tab-active'));
                
                // Hide all code panels
                codePanels.forEach(p => p.classList.add('hidden'));
                
                // Activate selected tab and panel
                tab.classList.add('tab-active');
                codePanels[index].classList.remove('hidden');
            });
        });
        
        // Refresh preview
        document.getElementById('refreshPreview').addEventListener('click', updatePreview);
        
        // Export buttons
        document.getElementById('exportHtml').addEventListener('click', exportHtml);
        document.getElementById('exportZip').addEventListener('click', exportProject);
        
        // Generate buttons
        document.getElementById('generateHtml').addEventListener('click', () => generateComponent('html'));
        document.getElementById('generateCss').addEventListener('click', () => generateComponent('css'));
        document.getElementById('generateAll').addEventListener('click', generateAll);
        
        // Simulated AI generation functions
        function generateComponent(type) {
            const prompt = document.getElementById('promptInput').value || 'responsive card component';
            
            // Show loading state
            const button = document.getElementById(`generate${type.charAt(0).toUpperCase() + type.slice(1)}`);
            const originalText = button.textContent;
            button.textContent = 'Generating...';
            button.disabled = true;
            
            // Simulate AI generation delay
            setTimeout(() => {
                let generatedCode = '';
                
                switch(type) {
                    case 'html':
                        generatedCode = generateHtmlCode(prompt);
                        document.getElementById('htmlCode').textContent = generatedCode;
                        break;
                    case 'css':
                        generatedCode = generateCssCode(prompt);
                        document.getElementById('cssCode').textContent = generatedCode;
                        break;
                    case 'js':
                        generatedCode = generateJsCode(prompt);
                        document.getElementById('jsCode').textContent = generatedCode;
                        break;
                }
                
                // Update UI
                button.textContent = originalText;
                button.disabled = false;
                
                // Update preview if HTML was generated
                if (type === 'html') {
                    updatePreview();
                }
                
                // Show success alert
                showAlert(`${type.toUpperCase()} generated successfully!`, 'success');
            }, 1500);
        }
        
        function generateAll() {
            const prompt = document.getElementById('promptInput').value || 'contact form with validation';
            const button = document.getElementById('generateAll');
            const originalText = button.textContent;
            
            // Show loading state
            button.textContent = 'Generating all...';
            button.disabled = true;
            
            // Simulate sequential generation
            setTimeout(() => {
                // Generate HTML
                const html = generateHtmlCode(prompt);
                document.getElementById('htmlCode').textContent = html;
                
                // Generate CSS
                const css = generateCssCode(prompt);
                document.getElementById('cssCode').textContent = css;
                
                // Generate JS
                const js = generateJsCode(prompt);
                document.getElementById('jsCode').textContent = js;
                
                // Update UI
                button.textContent = originalText;
                button.disabled = false;
                
                // Update preview
                updatePreview();
                
                // Show success alert
                showAlert('All components generated successfully!', 'success');
            }, 2500);
        }
        
        function updatePreview() {
            const htmlCode = document.getElementById('htmlCode').textContent;
            const cssCode = document.getElementById('cssCode').textContent;
            const jsCode = document.getElementById('jsCode').textContent;
            
            const fullPage = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>AI Generated Preview</title>
                    <link href="https://cdn.jsdelivr.net/npm/daisyui@3.9.4/dist/full.css" rel="stylesheet">
                    <script src="https://cdn.tailwindcss.com"><\/script>
                    <style>${cssCode}</style>
                </head>
                <body class="bg-base-100 text-base-content p-4">
                    ${htmlCode || '<div class="text-center p-8">No HTML generated yet</div>'}
                    <script>${jsCode}<\/script>
                </body>
                </html>
            `;
            
            document.getElementById('livePreview').srcdoc = fullPage;
        }
        
        function exportHtml() {
            const htmlCode = document.getElementById('htmlCode').textContent;
            const cssCode = document.getElementById('cssCode').textContent;
            const jsCode = document.getElementById('jsCode').textContent;
            
            const fullHtml = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>AI-Generated Page</title>
                    <link href="https://cdn.jsdelivr.net/npm/daisyui@3.9.4/dist/full.css" rel="stylesheet">
                    <script src="https://cdn.tailwindcss.com"><\/script>
                    <style>${cssCode}</style>
                </head>
                <body class="bg-base-100 text-base-content p-4">
                    ${htmlCode}
                    <script>${jsCode}<\/script>
                </body>
                </html>
            `;
            
            const blob = new Blob([fullHtml], {type: 'text/html'});
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'ai-generated-page.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showAlert('HTML file exported!', 'success');
        }
        
        function exportProject() {
            showAlert('Project exported as ZIP file!', 'success');
        }
        
        function showAlert(message, type) {
            // For simplicity, using browser alert
            alert(message);
        }
        
        // Simulated AI code generation functions
        function generateHtmlCode(prompt) {
            return `<!-- Generated HTML for: ${prompt} -->
<div class="max-w-2xl mx-auto bg-base-200 rounded-xl shadow-md overflow-hidden p-6">
  <h2 class="text-2xl font-bold mb-4">Contact Us</h2>
  <form id="contactForm" class="space-y-4">
    <div>
      <label class="block text-sm font-medium mb-1">Name</label>
      <input type="text" class="input input-bordered w-full" placeholder="Your name">
    </div>
    <div>
      <label class="block text-sm font-medium mb-1">Email</label>
      <input type="email" class="input input-bordered w-full" placeholder="your@email.com">
    </div>
    <div>
      <label class="block text-sm font-medium mb-1">Message</label>
      <textarea class="textarea textarea-bordered w-full h-32" placeholder="Your message"></textarea>
    </div>
    <div class="flex items-center justify-between">
      <div class="form-control">
        <label class="label cursor-pointer">
          <input type="checkbox" class="checkbox checkbox-primary">
          <span class="label-text ml-2">Subscribe to newsletter</span> 
        </label>
      </div>
      <button type="submit" class="btn btn-primary">Send Message</button>
    </div>
  </form>
</div>`;
        }
        
        function generateCssCode(prompt) {
            return `/* Custom CSS for: ${prompt} */
.form-control label {
  user-select: none;
}

#contactForm input:focus, 
#contactForm textarea:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}

@media (max-width: 640px) {
  .contact-container {
    padding: 1rem;
  }
}`;
        }
        
        function generateJsCode(prompt) {
            return `// JavaScript for: ${prompt}
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Form validation
  const nameInput = this.querySelector('input[type="text"]');
  const emailInput = this.querySelector('input[type="email"]');
  const messageInput = this.querySelector('textarea');
  
  if (!nameInput.value.trim()) {
    alert('Please enter your name');
    nameInput.focus();
    return;
  }
  
  if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
    alert('Please enter a valid email');
    emailInput.focus();
    return;
  }
  
  if (!messageInput.value.trim()) {
    alert('Please enter your message');
    messageInput.focus();
    return;
  }
  
  // Form submission logic
  alert('Form submitted successfully!');
  this.reset();
});

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}`;
        }
    </script>
</body>
</html>