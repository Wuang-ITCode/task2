let tasks = [];

// Lấy công việc từ localStorage
function getTasks() {
    const tasksFromStorage = localStorage.getItem('tasks');
    return tasksFromStorage ? JSON.parse(tasksFromStorage) : [];
}

// Lưu công việc vào localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Hàm thêm công việc
function addTask() {
    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;

    if (taskName && taskDescription) {
        const newTask = {
            id: Date.now(),
            name: taskName,
            description: taskDescription
        };

        tasks.push(newTask);
        saveTasks();
        updateTaskList();

        // Đóng modal và reset form
        document.getElementById("addTaskForm").reset();
        $('#addTaskModal').modal('hide');
    } else {
        alert("Vui lòng nhập đầy đủ thông tin công việc!");
    }
}

// Cập nhật danh sách công việc
function updateTaskList() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        taskList.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${task.name}</td>
                <td>${task.description}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editTask(${task.id})">Sửa</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Xóa</button>
                </td>
            </tr>
        `;
    });
}

// Hàm xóa công việc
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    updateTaskList();
}

// Hàm chỉnh sửa công việc
function editTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        document.getElementById("editTaskId").value = task.id;
        document.getElementById("editTaskName").value = task.name;
        document.getElementById("editTaskDescription").value = task.description;

        // Hiển thị modal chỉnh sửa
        $('#editTaskModal').modal('show');
    }
}

// Cập nhật công việc
function updateTask() {
    const taskId = parseInt(document.getElementById("editTaskId").value);
    const taskName = document.getElementById("editTaskName").value;
    const taskDescription = document.getElementById("editTaskDescription").value;

    if (taskName && taskDescription) {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].name = taskName;
            tasks[taskIndex].description = taskDescription;
            saveTasks();
            updateTaskList();
            $('#editTaskModal').modal('hide');
        }
    } else {
        alert("Vui lòng nhập đầy đủ thông tin!");
    }
}

// Lắng nghe sự kiện
document.getElementById("saveTaskButton").addEventListener("click", addTask);
document.getElementById("updateTaskButton").addEventListener("click", updateTask);

// Khi trang tải lại, lấy dữ liệu từ localStorage
document.addEventListener("DOMContentLoaded", () => {
    tasks = getTasks();
    updateTaskList();
});

// Dùng JavaScript để lấy và hiển thị tên người dùng
document.addEventListener("DOMContentLoaded", function () {
    let userName = localStorage.getItem("userName") || "Guest"; // Lấy từ localStorage hoặc mặc định là "Guest"
    document.getElementById("userName").innerText = `Xin chào, ${userName}`;
});
localStorage.setItem("userName", "Tên Người Dùng");

