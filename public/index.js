const completedTask = document.getElementsByClassName('task-complete');
for (let i = 0; i < completedTask.length; i++) {
    completedTask[i].addEventListener('click', () => {
        if (completedTask[i].style.textDecoration == 'line-through') {
            completedTask[i].style.textDecoration = 'none'
        }else{
        completedTask[i].style.textDecoration = 'line-through';
        changes = true;
        };
    })
}

const submitBtn = document.getElementById('btn-submit')

submitBtn.addEventListener('click', (e) => {
    if (!changes){
        e.preventDefault();
        alert('no changes to save.')
    }
})

function showForm() {
    document.querySelector('.addTask').classList.toggle('show');
}