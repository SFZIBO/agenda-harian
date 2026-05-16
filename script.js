document.addEventListener('DOMContentLoaded', () => {
    // --- Elemen DOM Utama ---
    const taskInput = document.getElementById('taskInput');
    const categorySelect = document.getElementById('categorySelect');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    const clearCompletedBtn = document.getElementById('clearCompleted');
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const catBtns = document.querySelectorAll('.cat-btn');
    
    const totalEl = document.getElementById('total');
    const completedEl = document.getElementById('completed');
    const remainingEl = document.getElementById('remaining');
    const progressEl = document.getElementById('progress');
    const progressFill = document.getElementById('progressFill');

    // ✅ Elemen Tutorial
    const toggleTutorialBtn = document.getElementById('toggleTutorial');
    const tutorialSection = document.getElementById('tutorialSection');
    const closeTutorialBtn = document.getElementById('closeTutorial');

    let tasks = JSON.parse(localStorage.getItem('agendaTasks')) || [];
    let statusFilter = 'semua';
    let catFilter = 'semua';

    // --- Event Listeners ---
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(); });
    clearCompletedBtn.addEventListener('click', clearCompleted);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            statusFilter = btn.dataset.filter;
            renderTasks();
        });
    });

    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            catFilter = btn.dataset.cat;
            renderTasks();
        });
    });

    taskList.addEventListener('click', (e) => {
        const item = e.target.closest('.task-item');
        if (!item) return;
        const id = item.dataset.id;
        if (e.target.classList.contains('task-check')) toggleTask(id);
        else if (e.target.classList.contains('delete-btn') || e.target.closest('.delete-btn')) deleteTask(id);
    });

    // ✅ Event Listener Tutorial (Buka/Tutup)
    function toggleTutorial() { tutorialSection.classList.toggle('hidden'); }
    toggleTutorialBtn.addEventListener('click', toggleTutorial);
    closeTutorialBtn.addEventListener('click', toggleTutorial);

    // --- Fungsi Inti ---
    function addTask() {
        const text = taskInput.value.trim();
        if (!text) return;
        const newTask = { id: Date.now().toString(), text, category: categorySelect.value, completed: false };
        tasks.unshift(newTask);
        taskInput.value = '';
        saveAndRender();
    }

    function toggleTask(id) {
        const task = tasks.find(t => t.id === id);
        if (task) { task.completed = !task.completed; saveAndRender(); }
    }

    function deleteTask(id) { tasks = tasks.filter(t => t.id !== id); saveAndRender(); }
    function clearCompleted() { tasks = tasks.filter(t => !t.completed); saveAndRender(); }
    function saveAndRender() { localStorage.setItem('agendaTasks', JSON.stringify(tasks)); renderTasks(); }

    function renderTasks() {
        let filtered = tasks;
        if (statusFilter === 'aktif') filtered = filtered.filter(t => !t.completed);
        if (statusFilter === 'selesai') filtered = filtered.filter(t => t.completed);
        if (catFilter !== 'semua') filtered = filtered.filter(t => t.category === catFilter);

        taskList.innerHTML = '';
        if (filtered.length === 0) {
            taskList.innerHTML = `<li style="text-align:center; padding:1.5rem; color:#94a3b8;">Tidak ada tugas</li>`;
        } else {
            const catLabels = { kerja: '💼 Kerja', pribadi: '🙂 Pribadi', belanja: '🛒 Belanja', kesehatan: '🏃 Kesehatan', lainnya: '📌 Lainnya' };
            filtered.forEach(task => {
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;
                li.dataset.id = task.id;
                li.innerHTML = `
                    <input type="checkbox" class="task-check" ${task.completed ? 'checked' : ''}>
                    <span class="task-text">${escapeHtml(task.text)}</span>
                    <span class="task-cat">${catLabels[task.category]}</span>
                    <button class="delete-btn" title="Hapus">✕</button>
                `;
                taskList.appendChild(li);
            });
        }
        updateStats();
    }

    function updateStats() {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const remaining = total - completed;
        const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
        totalEl.textContent = total; completedEl.textContent = completed; remainingEl.textContent = remaining;
        progressEl.textContent = percent; progressFill.style.width = `${percent}%`;
    }

    function escapeHtml(text) { const div = document.createElement('div'); div.textContent = text; return div.innerHTML; }

    // Render awal
    renderTasks();
});