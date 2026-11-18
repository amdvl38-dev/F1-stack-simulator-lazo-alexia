class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  clear() {
    this.items = [];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const queue = new Queue();

  const dataInput = document.getElementById("dataInput");
  const enqueueBtn = document.getElementById("enqueueBtn");
  const dequeueBtn = document.getElementById("dequeueBtn");
  const peekBtn = document.getElementById("peekBtn");
  const clearBtn = document.getElementById("clearBtn");
  const queueContainer = document.getElementById("queueContainer");
  const deletedContainer = document.getElementById("deletedContainer");
  const messageBox = document.getElementById("messageBox");

  function showMessage(text) {
    messageBox.textContent = text;
  }

  function clearMessage() {
    messageBox.textContent = "";
  }

  function renderQueue() {
    queueContainer.innerHTML = "";
    queue.items.forEach((value, index) => {
      const block = document.createElement("div");
      block.classList.add("queue-block");
      block.classList.add(index % 2 === 0 ? "blue" : "green");
      block.textContent = value;
      queueContainer.appendChild(block);
    });
  }

  enqueueBtn.addEventListener("click", () => {
    const value = dataInput.value.trim();

    if (value === "") {
      showMessage("Please enter a value before enqueueing.");
      return;
    }

    clearMessage();
    queue.enqueue(value);
    renderQueue();
    dataInput.value = "";
    dataInput.focus();
  });

  dequeueBtn.addEventListener("click", () => {
    if (queue.isEmpty()) {
      showMessage("Queue is empty. Nothing to dequeue.");
      return;
    }

    clearMessage();
    const removedValue = queue.dequeue();
    renderQueue();

    const deletedBlock = document.createElement("div");
    deletedBlock.classList.add("deleted-block");
    deletedBlock.textContent = removedValue;
    deletedContainer.innerHTML = "";
    deletedContainer.appendChild(deletedBlock);
  });

  peekBtn.addEventListener("click", () => {
    if (queue.isEmpty()) {
      showMessage("Queue is empty. Nothing to peek.");
      return;
    }

    const frontValue = queue.peek();
    showMessage(`Front element is: ${frontValue}`);

    const frontBlock = queueContainer.firstElementChild;
    if (frontBlock) {
      frontBlock.classList.add("peek-highlight");
      setTimeout(() => {
        frontBlock.classList.remove("peek-highlight");
      }, 1000);
    }
  });

  clearBtn.addEventListener("click", () => {
    queue.clear();
    renderQueue();
    deletedContainer.innerHTML = "";
    dataInput.value = "";
    showMessage("Queue cleared.");
  });

  dataInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      enqueueBtn.click();
    }
  });
});

